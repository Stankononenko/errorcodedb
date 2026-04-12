import fs from "fs";
import path from "path";
import { OBDCode, ApplianceCode, UnifiedCode } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

// ── OBD-II ──

export function getAllOBDCodes(): OBDCode[] {
  const dir = path.join(DATA_DIR, "obd2");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const allCodes: OBDCode[] = [];
  for (const file of files) {
    const data = readJson<OBDCode[]>(path.join(dir, file));
    allCodes.push(...data);
  }
  return allCodes;
}

export function getOBDCodeBySlug(slug: string): OBDCode | undefined {
  const codes = getAllOBDCodes();
  return codes.find((c) => c.code.toLowerCase() === slug.toLowerCase());
}

// ── Appliance ──

export function getApplianceCodes(brand?: string, deviceType?: string): ApplianceCode[] {
  const baseDir = path.join(DATA_DIR, "appliance");
  if (!fs.existsSync(baseDir)) return [];

  const allCodes: ApplianceCode[] = [];
  const brands = brand ? [brand] : fs.readdirSync(baseDir).filter((f) => {
    return fs.statSync(path.join(baseDir, f)).isDirectory();
  });

  for (const b of brands) {
    const brandDir = path.join(baseDir, b);
    if (!fs.existsSync(brandDir)) continue;
    const files = fs.readdirSync(brandDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      if (deviceType && file !== `${deviceType}.json`) continue;
      const data = readJson<ApplianceCode[]>(path.join(brandDir, file));
      allCodes.push(...data);
    }
  }
  return allCodes;
}

export function getApplianceCode(
  brand: string,
  deviceType: string,
  code: string
): ApplianceCode | undefined {
  const codes = getApplianceCodes(brand, deviceType);
  return codes.find((c) => c.code.toLowerCase() === code.toLowerCase());
}

// ── Unified Converter ──

export function obdToUnified(obd: OBDCode): UnifiedCode {
  return {
    category: "obd2",
    code: obd.code,
    displayCode: obd.code,
    title: obd.title,
    shortDescription: obd.shortDescription,
    fullDescription: obd.fullDescription,
    severity: obd.severity,
    safetyImpact: obd.safetyImpact,
    causes: obd.causes,
    symptoms: obd.symptoms,
    fixSteps: obd.fixSteps,
    estimatedCost: { diy: obd.estimatedCost.diy, professional: obd.estimatedCost.mechanic },
    diyDifficulty: obd.diyDifficulty,
    repairTime: obd.repairTime,
    relatedCodes: obd.relatedCodes,
    faq: obd.faq,
    obdSystem: obd.system,
    obdLetter: obd.letter,
    obdCodeType: obd.codeType,
  };
}

export function applianceToUnified(a: ApplianceCode): UnifiedCode {
  return {
    category: "appliance",
    code: a.code,
    displayCode: a.displayCode,
    title: a.title,
    shortDescription: a.shortDescription,
    fullDescription: a.fullDescription,
    causes: a.causes,
    symptoms: a.symptoms,
    fixSteps: a.fixSteps,
    estimatedCost: a.estimatedCost,
    diyDifficulty: a.diyDifficulty,
    repairTime: a.repairTime,
    whenToCallPro: a.whenToCallPro,
    relatedCodes: a.relatedCodes,
    faq: a.faq,
    brand: a.brand,
    brandSlug: a.brandSlug,
    deviceType: a.deviceType,
    deviceTypeSlug: a.deviceTypeSlug,
    affectedModels: a.affectedModels,
    partsNeeded: a.partsNeeded,
    alternativeCodes: a.alternativeCodes,
    videoSearchQuery: a.videoSearchQuery,
  };
}
