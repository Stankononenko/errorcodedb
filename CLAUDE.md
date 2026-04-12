@AGENTS.md

# ErrorCodeDB

Comprehensive error code database — ALL devices worldwide. Target: 50,000+ pages.

## Tech Stack
- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Vercel
- Static export (`output: "export"`), JSON data files, no database

## Architecture
- Unified `CodePageLayout.tsx` template for all categories
- Data in `data/{obd2,appliance,hvac,printer,windows}/`
- Data loader: `lib/data-loader.ts` with converters for each category
- 75+ global brands, 30+ device types in `lib/constants.ts`

## Commands
- `npm run build` — generates sitemap + builds static export
- `npm run dev` — dev server

## Current Status (Session 2 — April 12, 2026)

### GRAND TOTAL: ~2,810 error codes, 3,069 sitemap URLs

| Category | Codes | Brands/Subcats |
|----------|-------|----------------|
| OBD-II | 290 | P, B, C, U codes |
| Appliances | 1,885 | 54 brands |
| HVAC | 246 | 13 brands |
| Printers | 248 | 6 brands (HP, Canon, Epson, Brother, Xerox, Lexmark) |
| Windows | 141 | BSOD (45), Update (36), System (30), Browser (30) |

### Appliance brands with data (54):
Samsung (182), Whirlpool (89), LG (88), Frigidaire (83), Miele (81),
Bosch (77), Maytag (70), GE (61), Panasonic (52), Haier (51), Beko (50),
Siemens (40), Amana (35), KitchenAid (30), De'Longhi (25), Speed Queen (25),
Kenmore (20), Ninja (16), + AEG, Neff, Smeg, Gorenje, Asko, Ariston,
Hotpoint, Indesit, Candy, Hoover, Zanussi, Grundig, Fisher & Paykel,
Electrolux, Toshiba, Sharp, Xiaomi, TCL, Midea, Hisense, Hitachi,
Godrej, IFB, Voltas, Cuckoo, Sub-Zero, Wolf, Viking, Jenn-Air,
Thermador, Dacor, Gaggenau, Liebherr, iRobot, Roborock, Ecovacs, Dyson

### HVAC brands with data (13):
Carrier, Lennox, Trane, Goodman, Rheem, Bryant, York, Daikin,
Mitsubishi, Fujitsu, Honeywell, Nest, Ecobee

### Brands still WITHOUT data (from constants):
Blomberg, Blue Star, Breville, Chigo, Cuisinart, Galanz, Gree,
Keurig, Nespresso, Instant Pot, Philips, Navien, Rinnai, Roomba,
Tineco, Vitamix (some may have partial data from running agents)

### NEXT SESSION PRIORITIES:
1. Add remaining brands: Breville, Keurig, Nespresso, Instant Pot, Philips
2. Expand OBD-II: add P2 codes, more P1 manufacturer-specific codes
3. Expand HVAC: more mini-split codes (Daikin/Mitsubishi are huge), water heaters
4. Expand Printers: more specific model codes
5. Expand Windows: more browser errors, Event Viewer codes
6. Phase 6: TVs (Samsung, LG, Sony, Vizio, TCL, Hisense)
7. Phase 7: Garden/Power Tools (John Deere, Husqvarna)
8. Deploy to Vercel (need custom domain errorcodedb.com)
9. Apply for Google AdSense

## Data Quality Rules
Every code: 4+ causes, 4+ symptoms, 4+ fix steps, cost estimates, 3+ FAQ, real model numbers.

## Known Issues
- Some agent-generated data had "moderate" instead of "intermediate" for difficulty — fixed with global script
- Printer JSON files sometimes come as {codes:[...]} instead of [...] — fix script in place
- HVAC thermostat data sometimes missing brandSlug — auto-fix script handles it

## Conventions
- kebab-case filenames, PascalCase components, camelCase functions
- No `any`, no component libraries, no images
- Conventional commits: feat:, fix:, data:, seo:, style:, refactor:
