import { ApplianceDeviceType, HVACDeviceType, OBDSystem } from "./types";

// ── Site Constants ──

export const SITE_NAME = "ErrorCodeDB";
export const SITE_URL = "https://errorcodedb.com";
export const SITE_DESCRIPTION =
  "The most comprehensive error code database. Find meanings, causes, and step-by-step fixes for error codes on cars, appliances, HVAC systems, printers, and computers.";

// ── OBD-II ──

export const OBD_SYSTEMS: Record<OBDSystem, { label: string; description: string }> = {
  powertrain: {
    label: "Powertrain (P)",
    description: "Engine, transmission, and emissions system codes",
  },
  body: {
    label: "Body (B)",
    description: "Body electronics, climate control, and seat codes",
  },
  chassis: {
    label: "Chassis (C)",
    description: "ABS, suspension, and steering codes",
  },
  network: {
    label: "Network (U)",
    description: "CAN bus and module communication codes",
  },
};

export const CAR_MAKES = [
  { name: "Toyota", slug: "toyota" },
  { name: "Honda", slug: "honda" },
  { name: "Ford", slug: "ford" },
  { name: "Chevrolet", slug: "chevrolet" },
  { name: "BMW", slug: "bmw" },
  { name: "Mercedes-Benz", slug: "mercedes-benz" },
  { name: "Nissan", slug: "nissan" },
  { name: "Hyundai", slug: "hyundai" },
  { name: "Kia", slug: "kia" },
  { name: "Volkswagen", slug: "volkswagen" },
  { name: "Subaru", slug: "subaru" },
  { name: "Jeep", slug: "jeep" },
  { name: "Ram", slug: "ram" },
  { name: "GMC", slug: "gmc" },
  { name: "Dodge", slug: "dodge" },
  { name: "Mazda", slug: "mazda" },
  { name: "Audi", slug: "audi" },
  { name: "Lexus", slug: "lexus" },
  { name: "Acura", slug: "acura" },
  { name: "Buick", slug: "buick" },
  { name: "Cadillac", slug: "cadillac" },
  { name: "Chrysler", slug: "chrysler" },
  { name: "Infiniti", slug: "infiniti" },
  { name: "Lincoln", slug: "lincoln" },
  { name: "Volvo", slug: "volvo" },
  { name: "Porsche", slug: "porsche" },
  { name: "Land Rover", slug: "land-rover" },
  { name: "Mitsubishi", slug: "mitsubishi" },
  { name: "Tesla", slug: "tesla" },
  { name: "Mini", slug: "mini" },
] as const;

// ── Appliance Brands ──

export const APPLIANCE_BRANDS = [
  { name: "Samsung", slug: "samsung", country: "South Korea" },
  { name: "LG", slug: "lg", country: "South Korea" },
  { name: "Whirlpool", slug: "whirlpool", country: "USA" },
  { name: "Maytag", slug: "maytag", country: "USA" },
  { name: "KitchenAid", slug: "kitchenaid", country: "USA" },
  { name: "Bosch", slug: "bosch", country: "Germany" },
  { name: "GE", slug: "ge", country: "USA" },
  { name: "Frigidaire", slug: "frigidaire", country: "USA" },
  { name: "Electrolux", slug: "electrolux", country: "Sweden" },
  { name: "Kenmore", slug: "kenmore", country: "USA" },
  { name: "Miele", slug: "miele", country: "Germany" },
  { name: "Amana", slug: "amana", country: "USA" },
  { name: "Speed Queen", slug: "speed-queen", country: "USA" },
] as const;

export const APPLIANCE_DEVICE_TYPES: Record<
  ApplianceDeviceType,
  { label: string; labelPlural: string }
> = {
  washer: { label: "Washer", labelPlural: "Washers" },
  dryer: { label: "Dryer", labelPlural: "Dryers" },
  dishwasher: { label: "Dishwasher", labelPlural: "Dishwashers" },
  refrigerator: { label: "Refrigerator", labelPlural: "Refrigerators" },
  microwave: { label: "Microwave", labelPlural: "Microwaves" },
  oven: { label: "Oven", labelPlural: "Ovens" },
  freezer: { label: "Freezer", labelPlural: "Freezers" },
  "air-conditioner": { label: "Air Conditioner", labelPlural: "Air Conditioners" },
  "range-hood": { label: "Range Hood", labelPlural: "Range Hoods" },
};

// ── HVAC Brands ──

export const HVAC_BRANDS = [
  { name: "Carrier", slug: "carrier" },
  { name: "Lennox", slug: "lennox" },
  { name: "Trane", slug: "trane" },
  { name: "Goodman", slug: "goodman" },
  { name: "Rheem", slug: "rheem" },
  { name: "Bryant", slug: "bryant" },
  { name: "York", slug: "york" },
  { name: "Daikin", slug: "daikin" },
  { name: "Mitsubishi Electric", slug: "mitsubishi" },
  { name: "Fujitsu", slug: "fujitsu" },
  { name: "Honeywell", slug: "honeywell" },
  { name: "Nest", slug: "nest" },
  { name: "Ecobee", slug: "ecobee" },
] as const;

export const HVAC_DEVICE_TYPES: Record<HVACDeviceType, { label: string; labelPlural: string }> = {
  furnace: { label: "Furnace", labelPlural: "Furnaces" },
  ac: { label: "Air Conditioner", labelPlural: "Air Conditioners" },
  "heat-pump": { label: "Heat Pump", labelPlural: "Heat Pumps" },
  "mini-split": { label: "Mini-Split", labelPlural: "Mini-Splits" },
  "water-heater": { label: "Water Heater", labelPlural: "Water Heaters" },
  thermostat: { label: "Thermostat", labelPlural: "Thermostats" },
};

// ── Printer Brands ──

export const PRINTER_BRANDS = [
  { name: "HP", slug: "hp" },
  { name: "Canon", slug: "canon" },
  { name: "Epson", slug: "epson" },
  { name: "Brother", slug: "brother" },
  { name: "Xerox", slug: "xerox" },
  { name: "Lexmark", slug: "lexmark" },
] as const;

// ── Windows Categories ──

export const WINDOWS_CATEGORIES = [
  { name: "Blue Screen (BSOD)", slug: "bsod", description: "Blue Screen of Death stop codes" },
  { name: "Windows Update", slug: "update", description: "Windows Update error codes" },
  { name: "System Errors", slug: "system", description: "System and application errors" },
  { name: "Browser & Network", slug: "browser", description: "Browser and network error codes" },
] as const;

// ── Severity Labels ──

export const SEVERITY_CONFIG = {
  high: { label: "High", color: "bg-severity-high text-white" },
  medium: { label: "Medium", color: "bg-severity-medium text-white" },
  low: { label: "Low", color: "bg-severity-low text-white" },
  info: { label: "Info", color: "bg-severity-info text-white" },
} as const;

export const DIFFICULTY_CONFIG = {
  easy: { label: "Easy", color: "bg-difficulty-easy text-white" },
  intermediate: { label: "Intermediate", color: "bg-difficulty-intermediate text-white" },
  advanced: { label: "Advanced", color: "bg-difficulty-advanced text-white" },
  professional: { label: "Professional", color: "bg-difficulty-professional text-white" },
} as const;

// ── Navigation ──

export const MAIN_NAV_ITEMS = [
  { label: "OBD-II Codes", href: "/obd2" },
  { label: "Appliances", href: "/appliance" },
  { label: "HVAC", href: "/hvac" },
  { label: "Printers", href: "/printer" },
  { label: "Windows", href: "/windows" },
] as const;
