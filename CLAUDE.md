@AGENTS.md

# ErrorCodeDB

Comprehensive error code database website. Target: 50,000+ pages covering OBD-II, appliances, HVAC, printers, Windows.

## Tech Stack
- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Vercel
- Static export (`output: "export"` in next.config.ts)
- JSON data files in `/data/` — no database
- All pages are statically generated at build time

## Architecture
- One unified template (`CodePageLayout.tsx`) for all error code pages
- Data loaded via `lib/data-loader.ts` from JSON files
- SEO helpers in `lib/seo-helpers.ts` generate titles, descriptions, JSON-LD
- Types in `lib/types.ts`, constants in `lib/constants.ts`

## URL Structure
- `/obd2/[code]` — OBD-II codes (lowercase, e.g. `/obd2/p0300`)
- `/appliance/[brand]/[deviceType]/[code]` — Appliance codes
- `/hvac/[brand]/[deviceType]/[code]` — HVAC codes
- `/printer/[brand]/[code]` — Printer codes
- `/windows/[category]/[code]` — Windows codes

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Build static export
- `npm run lint` — Run ESLint

## Data Quality Rules
Every error code must have: 3+ causes with likelihood, 3+ symptoms, 3+ fix steps with tools/difficulty, cost estimates (DIY + pro), 2+ related codes, 3+ FAQ items.

## Current Status
- Phase 1: Foundation + OBD-II MVP (in progress)
- 200+ P0 generic codes + 30 B codes + 30 C codes + 30 U codes
- All layout components, legal pages, SEO complete

## Conventions
- kebab-case filenames, PascalCase components, camelCase functions
- Files < 200 lines — decompose if larger
- No `any` types, no component libraries, no images in MVP
- Conventional commits: feat:, fix:, data:, seo:, style:, refactor:
