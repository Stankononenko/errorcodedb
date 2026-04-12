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
  // ── USA ──
  { name: "Samsung", slug: "samsung", country: "South Korea" },
  { name: "LG", slug: "lg", country: "South Korea" },
  { name: "Whirlpool", slug: "whirlpool", country: "USA" },
  { name: "Maytag", slug: "maytag", country: "USA" },
  { name: "KitchenAid", slug: "kitchenaid", country: "USA" },
  { name: "GE", slug: "ge", country: "USA" },
  { name: "Frigidaire", slug: "frigidaire", country: "USA" },
  { name: "Kenmore", slug: "kenmore", country: "USA" },
  { name: "Amana", slug: "amana", country: "USA" },
  { name: "Speed Queen", slug: "speed-queen", country: "USA" },
  { name: "Sub-Zero", slug: "sub-zero", country: "USA" },
  { name: "Wolf", slug: "wolf", country: "USA" },
  { name: "Viking", slug: "viking", country: "USA" },
  { name: "Jenn-Air", slug: "jenn-air", country: "USA" },
  { name: "Dacor", slug: "dacor", country: "USA" },
  { name: "Thermador", slug: "thermador", country: "USA" },
  // ── Europe ──
  { name: "Bosch", slug: "bosch", country: "Germany" },
  { name: "Siemens", slug: "siemens", country: "Germany" },
  { name: "Miele", slug: "miele", country: "Germany" },
  { name: "Electrolux", slug: "electrolux", country: "Sweden" },
  { name: "AEG", slug: "aeg", country: "Germany" },
  { name: "Neff", slug: "neff", country: "Germany" },
  { name: "Gaggenau", slug: "gaggenau", country: "Germany" },
  { name: "Liebherr", slug: "liebherr", country: "Switzerland" },
  { name: "Grundig", slug: "grundig", country: "Turkey" },
  { name: "Beko", slug: "beko", country: "Turkey" },
  { name: "Blomberg", slug: "blomberg", country: "Turkey" },
  { name: "Ariston", slug: "ariston", country: "Italy" },
  { name: "Hotpoint", slug: "hotpoint", country: "Italy" },
  { name: "Indesit", slug: "indesit", country: "Italy" },
  { name: "Candy", slug: "candy", country: "Italy" },
  { name: "Hoover", slug: "hoover", country: "Italy" },
  { name: "Zanussi", slug: "zanussi", country: "Italy" },
  { name: "Smeg", slug: "smeg", country: "Italy" },
  { name: "Gorenje", slug: "gorenje", country: "Slovenia" },
  { name: "De'Longhi", slug: "delonghi", country: "Italy" },
  { name: "Asko", slug: "asko", country: "Sweden" },
  { name: "Dyson", slug: "dyson", country: "UK" },
  { name: "Breville", slug: "breville", country: "Australia" },
  { name: "Philips", slug: "philips", country: "Netherlands" },
  // ── Asia ──
  { name: "Panasonic", slug: "panasonic", country: "Japan" },
  { name: "Hitachi", slug: "hitachi", country: "Japan" },
  { name: "Toshiba", slug: "toshiba", country: "Japan" },
  { name: "Sharp", slug: "sharp", country: "Japan" },
  { name: "Daikin", slug: "daikin", country: "Japan" },
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", country: "Japan" },
  { name: "Rinnai", slug: "rinnai", country: "Japan" },
  { name: "Haier", slug: "haier", country: "China" },
  { name: "Midea", slug: "midea", country: "China" },
  { name: "Hisense", slug: "hisense", country: "China" },
  { name: "TCL", slug: "tcl", country: "China" },
  { name: "Xiaomi", slug: "xiaomi", country: "China" },
  { name: "Galanz", slug: "galanz", country: "China" },
  { name: "Gree", slug: "gree", country: "China" },
  { name: "Chigo", slug: "chigo", country: "China" },
  // ── India ──
  { name: "IFB", slug: "ifb", country: "India" },
  { name: "Godrej", slug: "godrej", country: "India" },
  { name: "Voltas", slug: "voltas", country: "India" },
  { name: "Blue Star", slug: "blue-star", country: "India" },
  // ── New Zealand / Australia ──
  { name: "Fisher & Paykel", slug: "fisher-paykel", country: "New Zealand" },
  // ── Korea ──
  { name: "Cuckoo", slug: "cuckoo", country: "South Korea" },
  { name: "Navien", slug: "navien", country: "South Korea" },
  // ── Specialty / Kitchen ──
  { name: "Ninja", slug: "ninja", country: "USA" },
  { name: "Cuisinart", slug: "cuisinart", country: "USA" },
  { name: "KitchenAid Stand Mixer", slug: "kitchenaid-mixer", country: "USA" },
  { name: "Instant Pot", slug: "instant-pot", country: "Canada" },
  { name: "Vitamix", slug: "vitamix", country: "USA" },
  { name: "Nespresso", slug: "nespresso", country: "Switzerland" },
  { name: "Keurig", slug: "keurig", country: "USA" },
  { name: "iRobot", slug: "irobot", country: "USA" },
  { name: "Roomba", slug: "roomba", country: "USA" },
  { name: "Roborock", slug: "roborock", country: "China" },
  { name: "Ecovacs", slug: "ecovacs", country: "China" },
  { name: "Tineco", slug: "tineco", country: "China" },
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
  cooktop: { label: "Cooktop", labelPlural: "Cooktops" },
  "wine-cooler": { label: "Wine Cooler", labelPlural: "Wine Coolers" },
  "ice-maker": { label: "Ice Maker", labelPlural: "Ice Makers" },
  "garbage-disposal": { label: "Garbage Disposal", labelPlural: "Garbage Disposals" },
  "water-purifier": { label: "Water Purifier", labelPlural: "Water Purifiers" },
  dehumidifier: { label: "Dehumidifier", labelPlural: "Dehumidifiers" },
  humidifier: { label: "Humidifier", labelPlural: "Humidifiers" },
  "air-purifier": { label: "Air Purifier", labelPlural: "Air Purifiers" },
  vacuum: { label: "Vacuum", labelPlural: "Vacuums" },
  "robot-vacuum": { label: "Robot Vacuum", labelPlural: "Robot Vacuums" },
  "coffee-machine": { label: "Coffee Machine", labelPlural: "Coffee Machines" },
  "espresso-machine": { label: "Espresso Machine", labelPlural: "Espresso Machines" },
  "food-processor": { label: "Food Processor", labelPlural: "Food Processors" },
  blender: { label: "Blender", labelPlural: "Blenders" },
  "pressure-cooker": { label: "Pressure Cooker", labelPlural: "Pressure Cookers" },
  "slow-cooker": { label: "Slow Cooker", labelPlural: "Slow Cookers" },
  "bread-maker": { label: "Bread Maker", labelPlural: "Bread Makers" },
  "rice-cooker": { label: "Rice Cooker", labelPlural: "Rice Cookers" },
  "induction-cooktop": { label: "Induction Cooktop", labelPlural: "Induction Cooktops" },
  "washer-dryer-combo": { label: "Washer-Dryer Combo", labelPlural: "Washer-Dryer Combos" },
  "steam-oven": { label: "Steam Oven", labelPlural: "Steam Ovens" },
  "warming-drawer": { label: "Warming Drawer", labelPlural: "Warming Drawers" },
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
