# Inter-session handoff — 2026-04-17

**Two Claude Code sessions are working on this repo concurrently.** Before touching anything, read this file and coordinate.

## Session A (this one)

### Already written, in working tree (NOT committed):

**Code changes:**
- `lib/types.ts` — added `ApplianceDeviceType`: sound-bar, lawn-mower, riding-mower, zero-turn-mower, chainsaw, string-trimmer, leaf-blower, snow-blower, pressure-washer, generator, tiller, robot-mower, power-tool.
- `lib/constants.ts` — added brands: Toro, Craftsman, Cub Cadet, Ariens, Stihl, Ryobi, Makita, Greenworks, EGO, Black & Decker, Echo (`echo-tools`), Troy-Bilt, Generac. Added `APPLIANCE_DEVICE_TYPES` labels for all new device types.

**Data files (16 files, ~181 codes, all schema-validated: count/miss=0/baddiff=[]):**
- `data/appliance/vizio/tv.json` (12)
- `data/appliance/craftsman/lawn-mower.json` (10)
- `data/appliance/toro/lawn-mower.json` (10)
- `data/appliance/husqvarna/chainsaw.json` (12)
- `data/appliance/stihl/chainsaw.json` (12)
- `data/appliance/john-deere/lawn-mower.json` (12)
- `data/appliance/ryobi/string-trimmer.json` (10)
- `data/appliance/ego/lawn-mower.json` (10)
- `data/appliance/greenworks/lawn-mower.json` (10)
- `data/appliance/panasonic/tv.json` (14)
- `data/appliance/toshiba/tv.json` (13)
- `data/appliance/dewalt/power-tool.json` (10)
- `data/appliance/philips/tv.json` (13)
- `data/appliance/troy-bilt/snow-blower.json` (10)
- `data/appliance/sharp/tv.json` (13)
- `data/appliance/makita/power-tool.json` (10)

### Background agents still writing these paths (may finish after this file is written):
- `data/appliance/sony/tv.json`
- `data/appliance/lg/tv.json`
- `data/appliance/samsung/tv.json`
- `data/appliance/tcl/tv.json`
- `data/appliance/hisense/tv.json`
- `data/appliance/cub-cadet/riding-mower.json`
- `data/appliance/generac/generator.json`
- `data/appliance/xbox/gaming-console.json`
- `data/appliance/nintendo/gaming-console.json`

### Design approach chosen here:
All new content (TVs, power tools, gaming consoles, routers, cameras) is filed under the existing `appliance` CodeCategory as new `deviceType` slugs — existing `/appliance/<brand>/<device>/<code>` routes pick them up automatically with no changes to pages, loaders, SEO helpers, or `CodeCategory` type. No new top-level URL prefixes, no routing changes.

## Session B (other chat) — inferred from `git status`:

Modified:
- `app/page.tsx`
- `data/hvac/rheem/water-heater.json`
- `data/printer/canon.json`, `epson.json`, `hp.json`
- `data/windows/bsod.json`, `system-errors.json`, `update-errors.json`

New files:
- `data/appliance/canon/`, `data/appliance/samsung/{air-conditioner,robot-vacuum}.json`, `data/appliance/lg/{microwave,oven}.json`
- `data/hvac/navien/`, `data/hvac/rinnai/`
- `data/obd2/p1-manufacturer.json`
- `scripts/fix-data.py`

## Rules for both sessions:

1. **Do NOT run `git add -A && git commit`.** You would claim the other session's uncommitted work.
2. **Before editing `lib/types.ts` or `lib/constants.ts`**, check with the user — both sessions can easily collide here.
3. **Do NOT touch the files listed above as belonging to the other session.** Write your own files in paths the other session isn't claiming.
4. **Before doing `npm run build` or the `prebuild` sitemap generator**, make sure all background agents from both sessions have reported done — otherwise you'll sitemap a half-written tree.
5. **When in doubt, ask the user which session should continue which task.**

## Suggested split of remaining work:

- Session A finishes: TV brands + power-tools brands + gaming consoles (paths above), plus any router/camera/sound-bar data.
- Session B finishes: Printer, Windows, HVAC (Rheem/Navien/Rinnai), OBD-II P1 manufacturer codes, any `appliance/{canon,samsung AC+robot-vacuum,lg microwave+oven}` data, `scripts/fix-data.py`, homepage copy.
- After both sessions ack "done", user picks one session to run `npm run build`, update `CLAUDE.md`, and make one consolidated commit.
