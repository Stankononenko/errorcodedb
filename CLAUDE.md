@AGENTS.md

# ErrorCodeDB

Comprehensive error code database — ALL devices worldwide. Target: 50,000+ pages.

## Tech Stack
- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Vercel
- Static export (`output: "export"`), JSON data, no database

## Commands
- `npm run build` — generates sitemap + builds static export
- `npm run dev` — dev server

## Current Status (End of Session 3 — April 12, 2026)

### GRAND TOTAL: 2,882 error codes, 3,115 static pages

| Category | Codes | Details |
|----------|-------|---------|
| OBD-II | 290 | 200 P0, 30 B, 30 C, 30 U |
| Appliances | 1,999 | 60 brands |
| HVAC | 246 | 13 brands |
| Printers | 206 | 6 brands |
| Windows | 141 | BSOD 45, Update 36, System 30, Browser 30 |

### Appliance brands with data (60):
Samsung 182, Whirlpool 89, LG 88, Frigidaire 83, Miele 81, Bosch 77,
Maytag 70, GE 61, Panasonic 52, Haier 51, Beko 50, Siemens 40,
Amana 35, iRobot 33, KitchenAid 30, Roborock 28, De'Longhi 25,
Speed Queen 25, Fisher & Paykel 34, AEG 33, Neff 30, Ariston 34,
Hotpoint 31, Indesit 31, Candy 28, Hoover 18, Zanussi 28,
Kenmore 20, Ninja 16, Nespresso 15, Ecovacs 15, Asko 22, Smeg 20,
Gorenje 15, Grundig 12, Electrolux 52, Keurig 12, Breville 10,
Instant Pot 12, Philips 20, Dyson 20, Xiaomi 8+, TCL 8+,
Midea, Hisense, Hitachi, Toshiba, Sharp, Sub-Zero 15, Wolf 12,
Viking 22, Jenn-Air 22, Thermador 24, Dacor 10, Gaggenau 12,
Liebherr 10, Godrej 18, IFB 15, Cuckoo, Blomberg

### HVAC brands (13):
Carrier, Lennox, Trane, Goodman, Rheem, Bryant, York,
Daikin, Mitsubishi, Fujitsu, Honeywell, Nest, Ecobee

### Brands still without data (~15):
Blomberg (partial?), Blue Star, Cuisinart, Galanz, Gree,
KitchenAid Mixer, Navien, Rinnai, Roomba, Tineco, Vitamix, Voltas
(Agents were running when session ended — some may have partial data)

### Known data issues & fixes:
- Some agents use "moderate" instead of "intermediate" → fix with global script
- Printer files sometimes come as {codes:[...]} → extract array
- OBD-II codes need "mechanic" field (not "professional") in estimatedCost
- HVAC thermostat data sometimes missing brandSlug → auto-fix
- Run global fix script before each build (see session history)

### NEXT SESSION PRIORITIES:
1. Check if remaining 15 brands got data from running agents
2. Add P2 OBD-II codes (50 new codes were being generated)
3. Expand browser errors (30 codes were being generated)
4. Fill in missing brands: Navien, Rinnai water heaters, Gree AC, etc.
5. Phase 6: TVs (Samsung, LG, Sony, Vizio, TCL, Hisense)
6. Phase 7: Garden/Power Tools (John Deere, Husqvarna)
7. Deploy to Vercel with custom domain
8. Apply for Google AdSense once 50+ pages indexed

## Architecture Quick Reference
- Data: `data/{obd2,appliance,hvac,printer,windows}/`
- Pages: `app/{obd2,appliance,hvac,printer,windows}/`
- Shared template: `components/code-page/CodePageLayout.tsx`
- Data loader: `lib/data-loader.ts` (converters for each category)
- Constants: `lib/constants.ts` (75+ brands, 30+ device types)
- Sitemap: `scripts/generate-sitemap.ts` (runs as prebuild)

## Conventions
- kebab-case files, PascalCase components, camelCase functions
- No `any`, no libs, no images. Conventional commits.
