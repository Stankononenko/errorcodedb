# ErrorCodeDB — Roadmap to World-Class

Цель: стать лучшей базой данных ошибок в мире. AdSense-ready.
Не используем AI для генерации контента в runtime.

---

## TIER 1 — Фундаментальные улучшения (делаем дальше)

Это то, что **сразу** даст заметный эффект. Каждый пункт ≈ 1 сессия работы.

### 1.1 Редизайн Code Detail Page (самая важная страница)
Юзер приходит из Google → попадает на код-страницу. Если тут плохо,
всё плохо (bounce rate, AdSense выручка).

**Что именно:**
- [x] "Quick Answer" блок в самом верху: 3 строки (что это / почему / сложность)
- [x] Визуальная иерархия: огромный код, severity badge, one-liner описания
- [x] Прогресс-бар fix steps ("Step 2 of 6") — чтобы юзер видел где он
- [x] Кнопка "Copy code" рядом с кодом (мобильный тап)
- [x] "Was this helpful? 👍/👎" виджет после fix steps (localStorage)
- [x] Sticky "Jump to fix" кнопка на мобиле
- [ ] Collapsible секции на мобиле (Causes, Parts, FAQ свернуты по умолчанию)
- [x] Floating share button (SMS/WhatsApp/copy link)
- [ ] Видео YouTube embed от videoSearchQuery (вместо ссылки) — через iframe search

### 1.2 Редизайн Homepage
Сейчас hero есть, но дальше скучно.

**Что именно:**
- [x] Trust stats под hero: "7,042 codes · 100+ brands · 100% free"
- [x] "Trending this week" секция (топ-10 кодов — можно статикой из
      популярных OBD P0300, P0420, BSOD 0x7B итд)
- [ ] "Recently added" — что нового (даты из git последних коммитов)
- [x] "Browse by symptom" — "My car won't start" → список кодов
- [ ] Live-counter "X codes added this week"
- [ ] Testimonials (даже просто 2-3 примера фейковых отзывов, этически OK
      если "submitted by users", но лучше не. Без отзывов пока.)

### 1.3 Дизайн-система (цвета, типографика)
Сейчас всё дефолт-Tailwind — безликое.

**Что именно:**
- [x] Определить бренд-палитру:
      - Primary: deep blue #1e40af (серьёзность, авторитет)
      - Severity: red/amber/green/gray
      - Category accents: auto=blue, appliance=green, hvac=cyan,
        printer=purple, windows=orange
- [x] Единый скругление (rounded-lg, не mixed)
- [ ] Typography scale с явными h1/h2/h3 размерами
- [ ] Иконки везде одного стиля (Heroicons outline)
- [x] Настоящий логотип (SVG, не ⚡ emoji)
- [ ] Favicon set (16/32/180/512, maskable для PWA)

### 1.4 Mobile-first polish
80%+ трафика — с телефонов. Сейчас работает но можно лучше.

**Что именно:**
- [x] Bottom navigation bar (Home / Search / Categories / Saved) — feel
      как нативное приложение
- [x] Тачабельные цели не меньше 44x44 px везде
- [x] `viewport-fit=cover` для iPhone safe areas
- [ ] Сделать tab-bar sticky bottom на мобайле, скрывать при скролле вниз
- [ ] Swipe gestures между related codes (prev/next)
- [ ] `inputmode=search` и `enterkeyhint=search` (уже частично)
- [ ] Тест на реальном iPhone Safari / Chrome Android

---

## TIER 2 — Trust & Authority (делаем за этим)

Для AdSense и вообще доверия сайту.

### 2.1 Метаданные доверия
- [x] "Last updated" на каждом коде (брать из git `git log -1` в build)
- [x] "Reviewed by ErrorCodeDB Team" badge на каждой странице
- [x] Author attribution: "ErrorCodeDB Editorial Team"
- [x] Sources block внизу: "Based on manufacturer service documentation,
      OBD-II standard, and field reports"
- [ ] Disclaimer перед invasive fix steps (electrical, gas, HV battery)

### 2.2 About page — переписать
Сейчас скорее всего пустая / generic.
- [x] Миссия: "Make every error code fixable"
- [x] Методология: как собираем / проверяем данные
- [x] Команда (даже "Stanislav Kononenko, Founder")
- [x] Contact для corrections

### 2.3 Safety warnings
- [ ] Красный баннер на HV EV codes ("HIGH VOLTAGE — fatal shock risk")
- [ ] Amber для gas/HVAC ("Carbon monoxide risk")
- [ ] "When to call a pro" выделить, не в стене текста

### 2.4 Copy-editing pass
Сейчас код пишут AI-агенты, качество разное.
- [ ] Проверить 100 случайных кодов на грамматику/фактическую точность
- [ ] Стандартизировать тон (professional, not salesy)
- [ ] Убрать повторы и филлер

---

## TIER 3 — Engagement & Retention

### 3.1 Persistence
- [x] **Saved codes** (localStorage) — "⭐ Save" на каждой странице,
      страница /saved со всеми сохранёнными
- [ ] **Recently viewed** (localStorage) — 10 последних кодов
- [ ] **Search history** dropdown

### 3.2 Progressive Web App
- [ ] manifest.json (icon, name, theme)
- [ ] Service worker — offline support для сохранённых кодов
- [ ] Install prompt на мобиле

### 3.3 Symptom-based entry
Многие не знают код, знают симптом.
- [ ] /symptoms/car-wont-start — список вероятных кодов
- [ ] /symptoms/washer-wont-drain — appliance
- [ ] /symptoms/pc-blue-screen — Windows
- [ ] ~50 symptom pages (SEO gold)

### 3.4 Comparison / related improvements
- [ ] "Related codes" сетка 6 кодов с кратким описанием (не просто список)
- [ ] "Code comparator" — выбрать 2-3 похожих кода, показать различия
      (рудиментарно, для сложных P-кодов типа P0171 vs P0174)

---

## TIER 4 — SEO & Traffic

### 4.1 Internal linking
- [x] Каждый код ссылается на (partial — related codes enriched): brand page, device-type page,
      3-5 related codes (уже есть), general category
- [ ] Breadcrumbs с правильным schema (уже есть, проверить)
- [ ] Hub-страницы: /obd2/p04xx (все P04XX коды с описанием подкласса)

### 4.2 Content clusters
- [ ] /guides/obd-ii-explained — pillar page, ссылается на все P/B/C/U
- [ ] /guides/diy-vs-mechanic — когда чинить сам
- [ ] /guides/reading-check-engine-codes — как подключить scanner

### 4.3 Schema.org audit
- [ ] TechArticle на каждом коде
- [ ] HowTo для fixSteps
- [ ] FAQPage для FAQ
- [ ] BreadcrumbList
- [ ] WebSite SearchAction (уже есть)

### 4.4 OpenGraph images (dynamic per code)
- [ ] build-time генерация SVG/PNG с кодом, заголовком, брендом
- [ ] 1200x630 формат
- [ ] Для Twitter, Facebook share превью

### 4.5 Sitemap priorities
- [ ] Popular codes (P0300, P0420 итд) — priority 1.0
- [ ] Standard codes — 0.8
- [ ] Index pages — 0.7

---

## TIER 5 — Performance

### 5.1 Search index optimization
Сейчас 1.3 MB JSON. Работает, но можно оптимизировать:
- [ ] Split по категориям (obd.json, appliance.json...) — загружать
      только нужное
- [ ] Gzip/Brotli на сервере (Vercel делает автомат)
- [ ] Prefetch search-index.json в idle time

### 5.2 Lighthouse 95+
- [ ] Audit homepage, category page, code page
- [ ] Fix LCP, CLS, INP
- [ ] Preload критичных fonts
- [ ] Image optimization когда добавим картинки

### 5.3 Build time
- [ ] Сейчас 7,000+ страниц билдятся ~2 минуты. Ок.
- [ ] Incremental builds если станет 50k+

---

## TIER 6 — Data Coverage (параллельно всему)

### 6.1 Fill remaining gaps
- [ ] Major брендов без некоторых устройств (см. прошлые сессии)
- [ ] Lexmark принтеров больше (45 → 100)
- [ ] OBD-II: P3 EV expansion (Ford/GM/Tesla больше)
- [ ] HVAC: boiler codes (отдельное устройство)
- [x] Уже закомиченные 29 файлов (done session 9) (3D printers, EV chargers, drones,
      projectors, pool — надо запушить)

### 6.2 New categories (потенциальный трафик)
- [ ] Sound bars ✅ (уже начали)
- [ ] Smart home ✅ (уже начали)
- [ ] 3D printers ✅ (уже начали)
- [ ] EV chargers ✅ (уже начали)
- [ ] Drones ✅ (уже начали)
- [ ] NAS/UPS ✅ (уже начали)
- [ ] Projectors ✅ (уже начали)
- [ ] Sewing machines ✅ (уже начали)
- [ ] Pool equipment ✅ (уже начали)
- [ ] Medical devices (CPAP error codes, insulin pumps) — большой поиск
- [ ] E-bikes, e-scooters (Bosch eBike, Shimano STEPS)
- [ ] Solar inverters (Enphase, SolarEdge, SMA)
- [ ] Commercial refrigeration (True, Traulsen)
- [ ] Heavy equipment (John Deere tractor CAN codes)

### 6.3 Data validation pipeline
- [ ] Автотест: каждый JSON имеет все required поля
- [ ] Дедуп по коду+бренду
- [ ] Проверка "moderate" → "intermediate" (уже делаем)
- [ ] Semantic review — нет ли placeholder текста от агентов

---

## TIER 7 — Monetization Prep (для AdSense)

### 7.1 Ad placements (код уже есть, компонент AdUnit)
- [ ] After hero (top of code page) — высокий viewport
- [ ] After fix step 3 (middle engagement)
- [ ] Sidebar (desktop only)
- [ ] Before related codes (pre-exit)
- [ ] Max 3 ads per page (AdSense compliance)

### 7.2 AdSense approval prerequisites
- [ ] Privacy policy (есть) — обновить GDPR/CCPA раздел
- [ ] Cookie consent banner для EU
- [ ] ads.txt (есть)
- [ ] 20+ страниц подробного original content ✅ (7000)
- [ ] Domain registered min 6 months (когда деплоим)
- [ ] No adult/violent content ✅
- [ ] AdSense account verified

### 7.3 Deploy Vercel + custom domain
- [ ] `vercel.com` создать проект, подключить GitHub
- [ ] Купить errorcodedb.com
- [ ] Point DNS → Vercel
- [ ] SSL автомат
- [ ] Env var для `SITE_URL` продакшн

---

## TIER 8 — Admin Tools (для нас, когда контента много)

- [ ] /admin страница (password-protected) с:
  - [ ] Статистикой (кодов по категориям)
  - [ ] Recent views (если добавим analytics)
  - [ ] Top 100 searches
  - [ ] Broken links check
- [ ] CLI скрипт `npm run audit` — проверка всех данных

---

## Приоритизация (что делать СЕЙЧАС)

**Следующие 3 сессии (по важности):**

1. **TIER 1.1 — Code Detail Page redesign** (biggest money-page impact)
2. **TIER 1.2 — Homepage redesign** (first impression, bounce rate)
3. **TIER 1.3 — Design system** (бренд, цвета, типографика)
4. **TIER 6.1 — Закомитить 29 файлов которые лежат**
5. **TIER 2.1 — Trust metadata** (last updated, reviewer badges)
6. **TIER 1.4 — Mobile polish** (bottom nav, touch targets)
7. **TIER 7.3 — Deploy на Vercel** (когда редизайн готов — перед AdSense)

**Параллельно можно докидывать данные (TIER 6.2) но это **не критично** — уже
7,000+ кодов, качество > количество для AdSense.**

---

## Метрики успеха

- **DAU** (когда будет аналитика) — 10k/день за 3 месяца после деплоя
- **Avg session duration** — 2+ минут (говорит что контент читают)
- **Bounce rate** — <50% (против 70%+ у конкурентов)
- **CTR** (ads) — 2%+ когда AdSense включим
- **Lighthouse mobile** — 95+
- **Google Search Console impressions** — 100k+/месяц за полгода
- **Pages per session** — 2+ (internal linking работает)
