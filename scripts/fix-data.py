#!/usr/bin/env python3
"""Global data fixer — run before every build.
Fixes known issues across all JSON data files."""

import json
import os
import glob
import sys

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
fixes_applied = 0

def fix_difficulty_values(obj):
    """Replace 'moderate' with 'intermediate' in all difficulty fields."""
    global fixes_applied
    if isinstance(obj, dict):
        for key in obj:
            if key in ("difficulty", "diyDifficulty", "fixDifficulty") and obj[key] == "moderate":
                obj[key] = "intermediate"
                fixes_applied += 1
            else:
                fix_difficulty_values(obj[key])
    elif isinstance(obj, list):
        for item in obj:
            fix_difficulty_values(item)

def fix_obd_mechanic_field(obj):
    """Ensure OBD codes have 'mechanic' field in estimatedCost."""
    global fixes_applied
    if isinstance(obj, dict) and "estimatedCost" in obj:
        cost = obj["estimatedCost"]
        if "professional" in cost and "mechanic" not in cost:
            cost["mechanic"] = cost["professional"]
            fixes_applied += 1
    if isinstance(obj, list):
        for item in obj:
            fix_obd_mechanic_field(item)

def fix_parts_needed(obj):
    """Fix partsNeeded with missing estimatedCost min/max."""
    global fixes_applied
    if isinstance(obj, dict) and "partsNeeded" in obj:
        for part in obj.get("partsNeeded", []):
            if isinstance(part, dict):
                ec = part.get("estimatedCost")
                if ec is None:
                    part["estimatedCost"] = {"min": 0, "max": 0}
                    fixes_applied += 1
                elif isinstance(ec, dict):
                    if "min" not in ec:
                        ec["min"] = 0
                        fixes_applied += 1
                    if "max" not in ec:
                        ec["max"] = 0
                        fixes_applied += 1
    if isinstance(obj, list):
        for item in obj:
            fix_parts_needed(item)

def fix_missing_brand_slug(data, filepath):
    """Auto-derive brandSlug/deviceTypeSlug from directory structure."""
    global fixes_applied
    parts = filepath.replace(DATA_DIR, "").strip("/").split("/")
    if len(parts) >= 3:  # category/brand/device.json
        brand_slug = parts[1]
        device_slug = parts[2].replace(".json", "")
        for item in data if isinstance(data, list) else []:
            if isinstance(item, dict):
                if not item.get("brandSlug"):
                    item["brandSlug"] = brand_slug
                    fixes_applied += 1
                if not item.get("deviceTypeSlug"):
                    item["deviceTypeSlug"] = device_slug
                    fixes_applied += 1

def unwrap_codes_object(data):
    """If data is {codes: [...]} instead of [...], extract the array."""
    global fixes_applied
    if isinstance(data, dict) and "codes" in data and isinstance(data["codes"], list):
        fixes_applied += 1
        return data["codes"]
    return data

def process_file(filepath):
    """Apply all fixes to a single JSON file."""
    try:
        with open(filepath, "r") as f:
            data = json.load(f)
    except (json.JSONDecodeError, Exception) as e:
        print(f"  SKIP {filepath}: {e}")
        return

    original = json.dumps(data)

    data = unwrap_codes_object(data)
    fix_difficulty_values(data)
    fix_parts_needed(data)
    fix_missing_brand_slug(data, filepath)

    # OBD-specific fixes
    if "/obd2/" in filepath:
        fix_obd_mechanic_field(data)

    if json.dumps(data) != original:
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")

def main():
    global fixes_applied
    json_files = glob.glob(os.path.join(DATA_DIR, "**/*.json"), recursive=True)
    print(f"Scanning {len(json_files)} JSON files...")

    for filepath in sorted(json_files):
        process_file(filepath)

    print(f"Done! Applied {fixes_applied} fixes across {len(json_files)} files.")
    return 0 if True else 1

if __name__ == "__main__":
    sys.exit(main())
