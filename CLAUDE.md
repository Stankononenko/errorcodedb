@AGENTS.md

# ErrorCodeDB

Comprehensive error code database — ALL devices worldwide. Target: 50,000+ pages.

## Tech Stack
- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Vercel
- Static export (`output: "export"`), JSON data, no database

## Commands
- `npm run build` — generates sitemap + builds static export
- `npm run dev` — dev server

## Current Status (End of Session 4 — April 17, 2026)

### GRAND TOTAL: 3,911 error codes, 4,252 static pages

| Category | Codes | Details |
|----------|-------|---------|
| OBD-II | 345 | 200 P0, 50 P2, 55 P1-manufacturer, 30 B, 30 C, 30 U |
| Appliances | 2,720+ | 90+ brands (TVs, consoles, routers, cameras, power tools added) |
| HVAC | 301 | 15 brands (added Navien 20, Rinnai 20, Rheem water heater 15) |
| Printers | 256 | 6 brands (HP 80, Canon 65, Epson 46) |
| Windows | 226 | BSOD 79, Update 62, System 55, Browser 30 |

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

### NEXT SESSION PRIORITIES:
1. **DESIGN OVERHAUL** — current design feels generic/bland. Needs:
   - Better visual hierarchy, more polished look
   - Improved color scheme (not just default Tailwind grays/blues)
   - Better card designs, spacing, typography
   - Category pages need visual identity (icons, colors per category)
   - Code detail pages need better layout (too text-heavy, needs visual breaks)
   - Mobile experience review
   - Consider: hero illustrations, brand logos, severity color coding improvements
   - Look at competitors (obd-codes.com, samsung support pages) for inspiration
2. Deploy to Vercel with custom domain errorcodedb.com
3. Apply for Google AdSense once 50+ pages indexed
4. Client-side search functionality
5. More OBD-II expansion (P3/P4 codes, more manufacturer codes)
6. More HVAC (mini-split expansion, boiler codes)
7. Sound bars (Sonos, Bose, JBL, Samsung, LG)
8. Smart home devices (Alexa, Google Home, Hue, SmartThings)
9. 3D printers (Creality, Prusa, Bambu Lab)
10. EV chargers (Tesla Wall Connector, ChargePoint, Emporia)
11. Internal linking optimization

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
