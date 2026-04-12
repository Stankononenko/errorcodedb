import fs from "fs";
import path from "path";
import { OBDCode, ApplianceCode, HVACCode, PrinterCode, WindowsCode, UnifiedCode } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function readJsonSafe<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) return [];
  return readJson<T[]>(filePath);
}

function getDirsIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isDirectory());
}

function getJsonFilesIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
}

// ── OBD-II ──

export function getAllOBDCodes(): OBDCode[] {
  const dir = path.join(DATA_DIR, "obd2");
  const allCodes: OBDCode[] = [];
  for (const file of getJsonFilesIn(dir)) {
    allCodes.push(...readJsonSafe<OBDCode>(path.join(dir, file)));
  }
  return allCodes;
}

export function getOBDCodeBySlug(slug: string): OBDCode | undefined {
  return getAllOBDCodes().find((c) => c.code.toLowerCase() === slug.toLowerCase());
}

// ── Appliance ──

export function getApplianceCodes(brand?: string, deviceType?: string): ApplianceCode[] {
  const baseDir = path.join(DATA_DIR, "appliance");
  if (!fs.existsSync(baseDir)) return [];

  const allCodes: ApplianceCode[] = [];
  const brands = brand ? [brand] : getDirsIn(baseDir);

  for (const b of brands) {
    const brandDir = path.join(baseDir, b);
    for (const file of getJsonFilesIn(brandDir)) {
      if (deviceType && file !== `${deviceType}.json`) continue;
      allCodes.push(...readJsonSafe<ApplianceCode>(path.join(brandDir, file)));
    }
  }
  return allCodes;
}

export function getApplianceCode(brand: string, deviceType: string, code: string): ApplianceCode | undefined {
  return getApplianceCodes(brand, deviceType).find((c) => c.code.toLowerCase() === code.toLowerCase());
}

// ── HVAC ──

export function getHVACCodes(brand?: string, deviceType?: string): HVACCode[] {
  const baseDir = path.join(DATA_DIR, "hvac");
  if (!fs.existsSync(baseDir)) return [];

  const allCodes: HVACCode[] = [];
  const brands = brand ? [brand] : getDirsIn(baseDir);

  for (const b of brands) {
    const brandDir = path.join(baseDir, b);
    for (const file of getJsonFilesIn(brandDir)) {
      if (deviceType && file !== `${deviceType}.json`) continue;
      allCodes.push(...readJsonSafe<HVACCode>(path.join(brandDir, file)));
    }
  }
  return allCodes;
}

export function getHVACCode(brand: string, deviceType: string, code: string): HVACCode | undefined {
  return getHVACCodes(brand, deviceType).find((c) => c.code.toLowerCase() === code.toLowerCase());
}

// ── Printer ──

export function getPrinterCodes(brand?: string): PrinterCode[] {
  const dir = path.join(DATA_DIR, "printer");
  if (!fs.existsSync(dir)) return [];

  const allCodes: PrinterCode[] = [];
  for (const file of getJsonFilesIn(dir)) {
    if (brand && file !== `${brand}.json`) continue;
    allCodes.push(...readJsonSafe<PrinterCode>(path.join(dir, file)));
  }
  return allCodes;
}

export function getPrinterCode(brand: string, code: string): PrinterCode | undefined {
  return getPrinterCodes(brand).find((c) => c.code.toLowerCase() === code.toLowerCase());
}

// ── Windows ──

// Maps category slugs to possible filenames
const WINDOWS_FILE_MAP: Record<string, string[]> = {
  bsod: ["bsod.json"],
  update: ["update-errors.json", "update.json"],
  system: ["system-errors.json", "system.json"],
  browser: ["browser-errors.json", "browser.json"],
};

export function getWindowsCodes(category?: string): WindowsCode[] {
  const dir = path.join(DATA_DIR, "windows");
  if (!fs.existsSync(dir)) return [];

  const allCodes: WindowsCode[] = [];

  if (category) {
    const possibleFiles = WINDOWS_FILE_MAP[category] || [`${category}.json`];
    for (const file of possibleFiles) {
      const filePath = path.join(dir, file);
      if (fs.existsSync(filePath)) {
        allCodes.push(...readJsonSafe<WindowsCode>(filePath));
        break;
      }
    }
  } else {
    for (const file of getJsonFilesIn(dir)) {
      allCodes.push(...readJsonSafe<WindowsCode>(path.join(dir, file)));
    }
  }
  return allCodes;
}

export function getWindowsCode(category: string, code: string): WindowsCode | undefined {
  return getWindowsCodes(category).find((c) => c.code.toLowerCase() === code.toLowerCase());
}

// ── Unified Converters ──

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

export function hvacToUnified(h: HVACCode): UnifiedCode {
  return {
    category: "hvac",
    code: h.code,
    displayCode: h.displayCode,
    title: h.title,
    shortDescription: h.shortDescription,
    fullDescription: h.fullDescription,
    safetyWarning: h.safetyWarning,
    causes: h.causes,
    symptoms: h.symptoms,
    fixSteps: h.fixSteps,
    estimatedCost: h.estimatedCost,
    diyDifficulty: h.diyDifficulty,
    repairTime: h.repairTime,
    whenToCallPro: h.whenToCallPro,
    relatedCodes: h.relatedCodes,
    faq: h.faq,
    brand: h.brand,
    brandSlug: h.brandSlug,
    deviceType: h.deviceType,
    deviceTypeSlug: h.deviceTypeSlug,
    isBlinkCode: h.isBlinkCode,
    blinkCount: h.blinkCount,
  };
}

export function printerToUnified(p: PrinterCode): UnifiedCode {
  return {
    category: "printer",
    code: p.code,
    displayCode: p.displayCode,
    title: p.title,
    shortDescription: p.shortDescription,
    fullDescription: p.fullDescription,
    causes: p.causes,
    symptoms: p.symptoms,
    fixSteps: p.fixSteps,
    estimatedCost: p.estimatedCost,
    diyDifficulty: p.diyDifficulty,
    repairTime: p.repairTime,
    whenToCallPro: p.whenToCallPro,
    relatedCodes: p.relatedCodes,
    faq: p.faq,
    brand: p.brand,
    brandSlug: p.brandSlug,
    affectedSeries: p.affectedSeries,
    errorType: p.errorType,
  };
}

export function windowsToUnified(w: WindowsCode): UnifiedCode {
  return {
    category: "windows",
    code: w.code,
    displayCode: w.displayCode,
    title: w.title,
    shortDescription: w.shortDescription,
    fullDescription: w.fullDescription,
    causes: w.causes,
    symptoms: w.symptoms,
    fixSteps: w.fixSteps,
    estimatedCost: w.estimatedCost,
    diyDifficulty: w.diyDifficulty,
    repairTime: w.repairTime,
    whenToCallPro: w.whenToCallPro,
    relatedCodes: w.relatedCodes,
    faq: w.faq,
    affectedVersions: w.affectedVersions,
    windowsCategory: w.category,
  };
}
