@AGENTS.md

# ErrorCodeDB

Comprehensive error code database — ALL devices worldwide. Target: 50,000+ pages.

## Tech Stack
- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Vercel
- Static export (`output: "export"`), JSON data, no database

## Commands
- `npm run build` — generates sitemap + builds static export
- `npm run dev` — dev server

## Current Status (End of Session 5 — April 17, 2026, continuation)

### GRAND TOTAL: 4,738 error codes, 5,073+ static pages

| Category | Codes | Details |
|----------|-------|---------|
| OBD-II | **1,106** | P0: 7 batches (~400), P1: 215 (all major + niche makes), P2: 90, P3: 70, B: 106, C: 105, U: 124 |
| Appliances | 2,760+ | 100 brands (TVs, consoles, routers, cameras, power tools) |
| HVAC | 301 | 15 brands |
| Printers | 361 | 6 brands (HP 80, Canon 65, Epson 46, Brother 60, Xerox 45) |
| Windows | 260 | BSOD 79, Update 62, System 55, Browser 64 |

### Session 5 progress:
- **OBD-II: 395 → 1,106 codes** (+711, almost 3×)
  - B-codes: 30 → 106, C-codes: 30 → 105, U-codes: 30 → 124
  - P0: 200 → ~400 (batches 5, 6, 7 added)
  - P1: 55 → 215 (Toyota, Honda, Ford, BMW, GM, Nissan, Hyundai/Kia, VW/Audi, Subaru, Mazda, Chrysler, Mercedes, Volvo, Jaguar, Porsche, Mitsubishi, Tesla, Land Rover, Mini, Fiat/Alfa, Saab, Cadillac)
  - P2: 50 → 90, P3: new file 70 (hybrid/EV, cylinder deactivation)
- **Windows Browser**: 30 → 64, **Printers**: Brother +30, Xerox +25

### Known OBD-II nuances:
- Duplicate code numbers across manufacturers (e.g., P1128 for Honda + VW) → suffix with make slug: `P1128-HONDA`, `P1128-VW`, `P1128-SUBARU`
- Tesla uses alphanumeric: `P1A00`, `P1B00` etc.
- Always run `python3 scripts/fix-data.py` before build
- Dedupe script is inline in batch-completion flow (see git history for pattern)

### New in Session 4:
- **TVs**: Samsung 26, LG 27, Sony 21, Vizio 15, TCL 14, Hisense 15, Panasonic, Philips, Sharp, Toshiba
- **Gaming Consoles**: PlayStation 20, Xbox 17, Nintendo Switch 15
- **Routers**: Netgear 13, TP-Link 12, Linksys 10, ASUS 10
- **Cameras**: Canon 15, Nikon 15
- **Security Cameras**: Ring 10, Nest Cam 10
- **Power Tools**: John Deere 15, Husqvarna 12, DeWalt 10, Makita, Roomba 26, Craftsman, Cub Cadet, EGO, Greenworks, Generac, Troy-Bilt, Ryobi, Stihl, Toro
- **OBD-II**: +55 P1 manufacturer-specific (Toyota, Honda, Ford, BMW, GM)
- **HVAC**: +55 water heater codes (Navien, Rinnai, Rheem)
- **Windows**: +85 codes (BSOD +34, Update +26, System +25)
- **Printers**: +50 codes (HP +20, Canon +15, Epson +15)

### HVAC brands (15):
Carrier, Lennox, Trane, Goodman, Rheem, Bryant, York,
Daikin, Mitsubishi, Fujitsu, Honeywell, Nest, Ecobee, Navien, Rinnai

### Known data issues & fixes:
- Some agents use "moderate" instead of "intermediate" → `python3 scripts/fix-data.py`
- Printer files sometimes come as {codes:[...]} → fix-data.py handles it
- OBD-II codes need "mechanic" field (not "professional") → fix-data.py
- partsNeeded sometimes string[] instead of object[] → fix-data.py
- **Always run `python3 scripts/fix-data.py` before build**

### NEXT SESSION PRIORITIES (resume here):

**CONTINUE OBD-II EXPANSION FIRST** (still gaps):
- [ ] P0 batch 8: P0800+ (transfer case, transmission internal), P0900+, P1000+ gaps
- [ ] P1 remaining: Lincoln, GMC, Isuzu, Scion/Lexus extra, Acura extra (last agent took 50/82 from list)
- [ ] B-codes: TPMS Bxxxx, adaptive cruise, parking sensors
- [ ] C-codes: advanced driver assist (lane keep, collision avoidance)
- [ ] U-codes: U1500+, more manufacturer network codes
- [ ] P3 more EV codes (Rivian, Lucid, Ford F-150 Lightning, Chevy Bolt specifics)

**HOW TO RESUME (pattern works):**
1. Launch 3 parallel agents (P0 batch, P1 makes, B/C/U or P3)
2. Wait ~7-10 min per batch
3. Run `python3 scripts/fix-data.py`
4. Dedupe OBD codes with manufacturer suffix (script was inline — see commit d0ef4ce for pattern)
5. Fix severity/difficulty: sometimes agents use invalid values, need to clean before build
6. `npm run build` — should pass
7. Commit + push

**AFTER OBD IS COMPLETE (~1500-2000 codes):**
1. Windows expansion: BSOD to 150, Update to 120, System to 100, Browser to 100
2. Printers: Lexmark (almost empty), HP to 120, Epson to 80
3. Samsung/LG/Whirlpool missing device types (freezer, cooktop, microwave for whirlpool/ge)

**NEW CATEGORIES:**
- Sound bars (Sonos, Bose, JBL, Yamaha)
- Smart home (Alexa, Google Home, Philips Hue)
- 3D printers (Creality, Prusa, Bambu Lab)
- EV chargers (Tesla Wall Connector, ChargePoint)
- Drones (DJI, Autel)
- Pool/spa equipment
- Solar inverters

**DESIGN OVERHAUL** (after data):
- MOBILE FIRST — 80%+ traffic from phones
- Better visual hierarchy, color scheme per category
- Card designs, typography, hero illustrations
- Look at competitors (obd-codes.com) for inspiration

**DEPLOYMENT:**
- Vercel + domain errorcodedb.com
- Google AdSense application
- Client-side search

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
