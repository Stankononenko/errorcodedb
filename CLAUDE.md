@AGENTS.md

# ErrorCodeDB

Comprehensive error code database website. Target: 50,000+ pages covering ALL devices worldwide.

## Tech Stack
- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Vercel
- Static export (`output: "export"` in next.config.ts)
- JSON data files in `/data/` — no database
- All pages statically generated at build time

## Architecture
- One unified template (`CodePageLayout.tsx`) for all error code pages
- Data loaded via `lib/data-loader.ts` from JSON files
- SEO helpers in `lib/seo-helpers.ts` generate titles, descriptions, JSON-LD
- Types in `lib/types.ts`, constants in `lib/constants.ts`
- 75+ global appliance brands in constants, 30+ device types

## URL Structure
- `/obd2/[code]` — OBD-II codes (lowercase, e.g. `/obd2/p0300`)
- `/appliance/[brand]/[deviceType]/[code]` — Appliance codes
- `/hvac/[brand]/[deviceType]/[code]` — HVAC codes (routes exist, no data yet)
- `/printer/[brand]/[code]` — Printer codes (routes exist, no data yet)
- `/windows/[category]/[code]` — Windows codes (routes exist, no data yet)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Build static export (runs sitemap gen + next build)
- `npm run lint` — Run ESLint

## Current Status (Session 1 — April 12, 2026)

### COMPLETED:
- Phase 1: OBD-II — 290 codes (200 P0 + 30 B + 30 C + 30 U)
- Phase 2 (partial): 954 appliance codes across 17 brands
- All page routes created for: OBD-II, Appliances, HVAC, Printers, Windows
- All legal pages: About, Privacy, Terms, Disclaimer, Contact
- Homepage with category cards
- Full SEO: JSON-LD, sitemap, robots.txt, Open Graph
- Deployed to GitHub: Stankononenko/errorcodedb

### GRAND TOTAL: 1,244 error codes

### Appliance brands DONE (17):
Samsung (182), Whirlpool (89), LG (88), Frigidaire (83), Maytag (70),
Bosch (67), Panasonic (52), Haier (51), Beko (50), Siemens (40),
Amana (35), GE (31), KitchenAid (30), De'Longhi (25), Speed Queen (25),
Kenmore (20), Ninja (16)

### Appliance brands STILL NEED DATA (agents hit rate limit):
- Miele (washer, dishwasher)
- GE (oven, dryer — only washer/dishwasher/fridge done)
- Bosch (oven already done, needs fridge)
- Frigidaire (washer/dryer/dishwasher/oven/fridge done — complete)
- Hotpoint, Ariston, Indesit, Candy, Hoover (European brands)
- Hitachi, Toshiba, Sharp (Japanese brands)
- Midea (only have some data), Hisense, TCL, Xiaomi, Galanz, Gree, Chigo
- Sub-Zero, Wolf, Viking, Jenn-Air, Dacor, Thermador (US premium)
- AEG, Neff, Gaggenau, Liebherr, Grundig, Blomberg, Zanussi, Smeg, Gorenje, Asko
- Dyson (vacuum, air purifier), Fisher & Paykel, Philips, Breville
- iRobot/Roomba, Roborock, Ecovacs, Tineco (robot vacuums)
- Nespresso, Keurig, Cuisinart, Instant Pot, Vitamix
- IFB, Godrej, Voltas, Blue Star (Indian brands)
- Cuckoo, Navien (Korean brands)

### NEXT SESSION PRIORITIES:
1. Finish remaining appliance brands (especially Miele, GE oven/dryer, European brands)
2. Add Xiaomi, Philips, iRobot/Roomba, Dyson, Nespresso, Keurig
3. Phase 3: HVAC — Carrier, Lennox, Trane, Goodman, Rheem, Daikin, Mitsubishi, Honeywell, Nest, Ecobee
4. Phase 4: Printers — HP, Canon, Epson, Brother, Xerox
5. Phase 5: Windows — BSOD, Update errors, System errors, Browser errors
6. Phase 6: TVs, Electronics, Garden/Power tools

## Data Quality Rules
Every error code must have: 4+ causes with likelihood, 4+ symptoms, 4+ fix steps with tools/difficulty/time, cost estimates (DIY + pro), 2+ related codes, 3+ FAQ items, real model numbers, real part numbers.

## Conventions
- kebab-case filenames, PascalCase components, camelCase functions
- Files < 200 lines — decompose if larger
- No `any` types, no component libraries, no images in MVP
- Conventional commits: feat:, fix:, data:, seo:, style:, refactor:
