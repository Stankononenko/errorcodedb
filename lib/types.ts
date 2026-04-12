// ── Shared Types ──

export type Severity = "high" | "medium" | "low" | "info";
export type Likelihood = "high" | "medium" | "low";
export type Difficulty = "easy" | "intermediate" | "advanced" | "professional";

export type CodeCategory = "obd2" | "appliance" | "hvac" | "printer" | "windows";

export interface CostRange {
  min: number;
  max: number;
}

export interface FAQ {
  q: string;
  a: string;
}

// ── OBD-II Types ──

export type OBDCodeLetter = "P" | "B" | "C" | "U";
export type OBDSystem = "powertrain" | "body" | "chassis" | "network";
export type OBDCodeType = "generic" | "manufacturer-specific";

export interface OBDCause {
  cause: string;
  likelihood: Likelihood;
}

export interface OBDFixStep {
  step: number;
  title: string;
  instruction: string;
  tools: string[];
  difficulty: Difficulty;
}

export interface OBDCode {
  code: string;
  codeType: OBDCodeType;
  letter: OBDCodeLetter;
  system: OBDSystem;
  subcategory: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  severity: Severity;
  safetyImpact: string;
  causes: OBDCause[];
  symptoms: string[];
  fixSteps: OBDFixStep[];
  estimatedCost: { diy: CostRange; mechanic: CostRange };
  diyDifficulty: Difficulty;
  repairTime: string;
  relatedCodes: string[];
  faq: FAQ[];
}

// ── Appliance Types ──

export type ApplianceDeviceType =
  | "washer"
  | "dryer"
  | "dishwasher"
  | "refrigerator"
  | "microwave"
  | "oven"
  | "freezer"
  | "air-conditioner"
  | "range-hood"
  | "cooktop"
  | "wine-cooler"
  | "ice-maker"
  | "garbage-disposal"
  | "water-purifier"
  | "dehumidifier"
  | "humidifier"
  | "air-purifier"
  | "vacuum"
  | "robot-vacuum"
  | "coffee-machine"
  | "espresso-machine"
  | "food-processor"
  | "blender"
  | "pressure-cooker"
  | "slow-cooker"
  | "bread-maker"
  | "rice-cooker"
  | "induction-cooktop"
  | "washer-dryer-combo"
  | "steam-oven"
  | "warming-drawer";

export interface ApplianceCause {
  cause: string;
  likelihood: Likelihood;
  fixDifficulty: Difficulty;
}

export interface ApplianceFixStep {
  step: number;
  title: string;
  instruction: string;
  tools: string[];
  difficulty: Difficulty;
  timeMinutes: number;
}

export interface AppliancePart {
  part: string;
  partNumber: string;
  estimatedCost: CostRange;
}

export interface ApplianceCode {
  id: string;
  brand: string;
  brandSlug: string;
  deviceType: string;
  deviceTypeSlug: ApplianceDeviceType;
  code: string;
  displayCode: string;
  alternativeCodes: string[];
  title: string;
  shortDescription: string;
  fullDescription: string;
  causes: ApplianceCause[];
  symptoms: string[];
  fixSteps: ApplianceFixStep[];
  affectedModels: string[];
  partsNeeded: AppliancePart[];
  estimatedCost: { diy: CostRange; professional: CostRange };
  diyDifficulty: Difficulty;
  repairTime: string;
  whenToCallPro: string;
  relatedCodes: string[];
  videoSearchQuery: string;
  faq: FAQ[];
}

// ── HVAC Types ──

export type HVACDeviceType =
  | "furnace"
  | "ac"
  | "heat-pump"
  | "mini-split"
  | "water-heater"
  | "thermostat";

export interface HVACCode {
  id: string;
  brand: string;
  brandSlug: string;
  deviceType: string;
  deviceTypeSlug: HVACDeviceType;
  code: string;
  displayCode: string;
  isBlinkCode: boolean;
  blinkCount?: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  safetyWarning?: string;
  causes: ApplianceCause[];
  symptoms: string[];
  fixSteps: ApplianceFixStep[];
  estimatedCost: { diy: CostRange; professional: CostRange };
  diyDifficulty: Difficulty;
  repairTime: string;
  whenToCallPro: string;
  relatedCodes: string[];
  faq: FAQ[];
}

// ── Printer Types ──

export type PrinterErrorType = "paper" | "ink" | "hardware" | "connectivity" | "software";

export interface PrinterCode {
  id: string;
  brand: string;
  brandSlug: string;
  code: string;
  displayCode: string;
  errorType: PrinterErrorType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  causes: ApplianceCause[];
  symptoms: string[];
  fixSteps: ApplianceFixStep[];
  affectedSeries: string[];
  estimatedCost: { diy: CostRange; professional: CostRange };
  diyDifficulty: Difficulty;
  repairTime: string;
  whenToCallPro: string;
  relatedCodes: string[];
  faq: FAQ[];
}

// ── Windows Types ──

export type WindowsErrorCategory = "bsod" | "update" | "system" | "browser";

export interface WindowsCode {
  id: string;
  category: WindowsErrorCategory;
  code: string;
  displayCode: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  affectedVersions: string[];
  causes: ApplianceCause[];
  symptoms: string[];
  fixSteps: ApplianceFixStep[];
  estimatedCost: { diy: CostRange; professional: CostRange };
  diyDifficulty: Difficulty;
  repairTime: string;
  whenToCallPro: string;
  relatedCodes: string[];
  faq: FAQ[];
}

// ── Unified Code Type (for shared components) ──

export interface UnifiedCode {
  category: CodeCategory;
  code: string;
  displayCode: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  severity?: Severity;
  safetyImpact?: string;
  safetyWarning?: string;
  causes: { cause: string; likelihood: Likelihood; fixDifficulty?: Difficulty }[];
  symptoms: string[];
  fixSteps: {
    step: number;
    title: string;
    instruction: string;
    tools: string[];
    difficulty: Difficulty;
    timeMinutes?: number;
  }[];
  estimatedCost: { diy: CostRange; professional: CostRange };
  diyDifficulty: Difficulty;
  repairTime: string;
  whenToCallPro?: string;
  relatedCodes: string[];
  faq: FAQ[];
  // Category-specific
  brand?: string;
  brandSlug?: string;
  deviceType?: string;
  deviceTypeSlug?: string;
  affectedModels?: string[];
  affectedSeries?: string[];
  affectedVersions?: string[];
  partsNeeded?: AppliancePart[];
  alternativeCodes?: string[];
  isBlinkCode?: boolean;
  blinkCount?: number;
  errorType?: PrinterErrorType;
  windowsCategory?: WindowsErrorCategory;
  obdSystem?: OBDSystem;
  obdLetter?: OBDCodeLetter;
  obdCodeType?: OBDCodeType;
  videoSearchQuery?: string;
}

// ── Breadcrumb ──

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// ── Search ──

export interface SearchIndexItem {
  code: string;
  title: string;
  category: CodeCategory;
  brand?: string;
  deviceType?: string;
  url: string;
}
