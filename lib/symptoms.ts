/**
 * Symptom-based entry points. Each symptom has a unique slug, an intro,
 * and a list of the most relevant error codes to check. Plus a walk-through
 * of the diagnostic steps a reader should take in order.
 */

export interface SymptomDef {
  slug: string;
  category: "Automotive" | "Appliance" | "HVAC" | "Windows" | "Printer";
  title: string;
  h1: string;
  description: string;
  intro: string;
  checkFirst: string[];
  relatedCodes: { code: string; url: string; label: string; why: string }[];
  whenToCallPro: string;
  ogCategory: "obd2" | "appliance" | "hvac" | "windows" | "printer" | "default";
}

export const SYMPTOMS: Record<string, SymptomDef> = {
  "check-engine-light": {
    slug: "check-engine-light",
    category: "Automotive",
    title: "Check engine light is on — what it means & how to diagnose",
    h1: "Check engine light is on",
    description:
      "The check engine light (MIL) can indicate hundreds of different error codes. Learn how to read the code and what the most common culprits are.",
    intro:
      "The malfunction indicator lamp (MIL) — &ldquo;check engine&rdquo; on most dashes — comes on when the ECM has logged an emissions-related diagnostic trouble code that persisted across at least two drive cycles. The lamp itself tells you almost nothing specific; the code behind it tells you everything. Read the code first. A flashing MIL means an active misfire damaging the catalyst — reduce load and drive to a shop soon.",
    checkFirst: [
      "Pull the code with any OBD-II scanner (cheap ones work for generic P0XXX codes)",
      "Write down the freeze-frame data — RPM, speed, coolant temp, fuel trim at moment of fault",
      "Check if the MIL is solid (non-urgent) or flashing (active misfire, drive gently)",
      "Note any accompanying symptoms — rough idle, hesitation, smell, smoke",
    ],
    relatedCodes: [
      { code: "P0420", url: "/obd2/p0420", label: "Catalyst Efficiency Below Threshold", why: "Most common MIL code — catalytic converter or O2 sensor" },
      { code: "P0300", url: "/obd2/p0300", label: "Random Multiple Cylinder Misfire", why: "Usually accompanied by rough idle" },
      { code: "P0171", url: "/obd2/p0171", label: "System Too Lean (Bank 1)", why: "Vacuum leak or fuel delivery" },
      { code: "P0128", url: "/obd2/p0128", label: "Coolant Temp Below Thermostat", why: "Stuck-open thermostat, frequent in 100K+ mile cars" },
      { code: "P0456", url: "/obd2/p0456", label: "EVAP Small Leak", why: "Loose gas cap or cracked evap line" },
      { code: "P0442", url: "/obd2/p0442", label: "EVAP Medium Leak", why: "Bigger evap leak than P0456" },
    ],
    whenToCallPro:
      "If the code involves transmission (P07XX), catalytic converter replacement, or you see an actively flashing MIL and can&rsquo;t get home safely. Otherwise, start with the cheapest likely fix and work up.",
    ogCategory: "obd2",
  },

  "car-wont-start": {
    slug: "car-wont-start",
    category: "Automotive",
    title: "Car won't start — diagnose no-crank, no-start, intermittent start",
    h1: "Car won't start",
    description:
      "Whether it won't crank, cranks but won't fire, or starts only sometimes — these are the error codes and checks behind each scenario.",
    intro:
      "&ldquo;Won&rsquo;t start&rdquo; covers three distinct problems: won&rsquo;t crank (no starter motor engagement), cranks but won&rsquo;t fire (no combustion), and intermittent. Each has a different diagnostic path. The first question is which one you have — listen carefully the next time you turn the key.",
    checkFirst: [
      "Is it cranking? If no click, no turnover → battery / starter / ignition switch",
      "If it cranks but won't fire → fuel, spark, or timing issue",
      "Check battery voltage with engine off (should be 12.4V+), during crank (above 9.6V)",
      "Scan for codes — some no-start conditions set P0335 (CKP) or P0340 (CMP) before stalling",
    ],
    relatedCodes: [
      { code: "P0335", url: "/obd2/p0335", label: "Crankshaft Position Sensor Circuit", why: "Common no-start on modern cars — ECM has no RPM reference" },
      { code: "P0340", url: "/obd2/p0340", label: "Camshaft Position Sensor Circuit", why: "CMP fault can cause no-start or intermittent start" },
      { code: "P0600", url: "/obd2/p0600", label: "Serial Communication Link", why: "Loss of communication between modules during start" },
      { code: "P0230", url: "/obd2/p0230", label: "Fuel Pump Primary Circuit", why: "No fuel pressure = no start" },
      { code: "P0513", url: "/obd2/p0513", label: "Invalid SKIM (immobilizer)", why: "Key not recognized — security-related no-start" },
    ],
    whenToCallPro:
      "If the starter motor is audibly grinding (engagement issue), there's a smell of fuel during cranking (injector stuck), or the immobilizer warning lamp is solid during cranking. These need proper diagnosis before guessing.",
    ogCategory: "obd2",
  },

  "car-stalls": {
    slug: "car-stalls",
    category: "Automotive",
    title: "Car stalls, hesitates, or idles rough — diagnose the cause",
    h1: "Car stalls or hesitates",
    description: "Engine dies at idle, hesitates under throttle, or surges. These codes and checks narrow it down fast.",
    intro: "Stalling and hesitation usually come from one of three camps: air (vacuum leak, dirty MAF), fuel (failing pump, clogged injector), or spark (coil, plug). Codes help separate them.",
    checkFirst: [
      "Scan for codes — even if no MIL, pending codes often reveal the cause",
      "Check fuel pressure at the rail (should be 45-60 PSI on most modern cars)",
      "Smoke-test the intake for vacuum leaks",
      "Inspect the PCV system and EGR valve for sticking",
    ],
    relatedCodes: [
      { code: "P0171", url: "/obd2/p0171", label: "System Too Lean (Bank 1)", why: "Vacuum leak or weak fuel pump = lean = stall" },
      { code: "P0174", url: "/obd2/p0174", label: "System Too Lean (Bank 2)", why: "Bank 2 version of the above" },
      { code: "P0505", url: "/obd2/p0505", label: "Idle Air Control System", why: "Faulty IAC causes low or surging idle" },
      { code: "P0300", url: "/obd2/p0300", label: "Random Cylinder Misfire", why: "Misfire often mistaken for stall" },
      { code: "P0101", url: "/obd2/p0101", label: "MAF Sensor Range/Performance", why: "Dirty/failed MAF reports wrong air mass" },
    ],
    whenToCallPro: "If stalling happens on the highway at speed (safety risk), or the vehicle can't maintain idle long enough to diagnose.",
    ogCategory: "obd2",
  },

  "car-misfiring": {
    slug: "car-misfiring",
    category: "Automotive",
    title: "Car is misfiring — rough idle, P03XX codes",
    h1: "Car is misfiring",
    description: "Rough idle, shaking at stoplights, flashing check engine — classic misfire symptoms and the codes behind them.",
    intro: "A misfire is when the ECM detects a cylinder failing to produce expected power. The cheapest fix (spark plug) and the most expensive (internal engine damage) look the same from the driver's seat. Codes narrow which cylinder and the root cause.",
    checkFirst: [
      "Pull codes — P030X tells you which cylinder (P0301=cyl 1, P0302=cyl 2...)",
      "If flashing MIL = active severe misfire, reduce engine load immediately to protect catalyst",
      "Pull that cylinder's spark plug and coil, swap to a known-good cylinder, drive and re-check codes",
      "If misfire follows the coil → coil is bad. If stays at cylinder → deeper issue (compression, injector)",
    ],
    relatedCodes: [
      { code: "P0300", url: "/obd2/p0300", label: "Random/Multiple Cylinder Misfire", why: "No specific cylinder — check vacuum leak, fuel pressure, MAF" },
      { code: "P0301", url: "/obd2/p0301", label: "Cylinder 1 Misfire", why: "Specific-cylinder misfire" },
      { code: "P0302", url: "/obd2/p0302", label: "Cylinder 2 Misfire", why: "Specific-cylinder misfire" },
      { code: "P0303", url: "/obd2/p0303", label: "Cylinder 3 Misfire", why: "Specific-cylinder misfire" },
      { code: "P0304", url: "/obd2/p0304", label: "Cylinder 4 Misfire", why: "Specific-cylinder misfire" },
      { code: "P0171", url: "/obd2/p0171", label: "System Too Lean", why: "Often accompanies misfires caused by vacuum leak" },
    ],
    whenToCallPro: "Persistent misfire (flashing MIL) that doesn't resolve with plugs/coils — low compression, burned valve, or head gasket could be behind it.",
    ogCategory: "obd2",
  },

  "transmission-rough-shift": {
    slug: "transmission-rough-shift",
    category: "Automotive",
    title: "Transmission shifts rough — slipping, banging, stuck",
    h1: "Transmission shifts rough or slips",
    description: "Rough shifts, flaring, slipping, or getting stuck in gear — the codes and diagnostics before a $3,000 rebuild quote.",
    intro: "Transmission problems rarely come from catastrophic internal damage. Most shift-quality issues trace to low/burnt fluid, a failing solenoid pack ($200-500), or a faulty sensor (pennies). Rebuilds are the nuclear option. Don't authorize one before ruling out the cheap stuff.",
    checkFirst: [
      "Check ATF level and color with the engine warm (or per manufacturer spec)",
      "Scan for transmission codes (P07XX range) — many shift issues set specific codes",
      "Note when the problem happens — cold only, hot only, specific gear, under load",
      "Check if limp mode is active (stuck in 3rd, no shifting)",
    ],
    relatedCodes: [
      { code: "P0700", url: "/obd2/p0700", label: "Transmission Control Module Fault", why: "Generic TCM fault — check fluid first" },
      { code: "P0750", url: "/obd2/p0750", label: "Shift Solenoid A Malfunction", why: "Specific solenoid = $200-500 fix, not rebuild" },
      { code: "P0740", url: "/obd2/p0740", label: "Torque Converter Clutch Circuit", why: "TCC lock-up issues = shudder or no lockup" },
      { code: "P0720", url: "/obd2/p0720", label: "Output Speed Sensor Circuit", why: "OSS failure = erratic shift or limp" },
    ],
    whenToCallPro: "If ATF is burnt black and smells scorched, rebuild may be unavoidable. Get 2-3 quotes — transmission work varies wildly in price.",
    ogCategory: "obd2",
  },

  "washer-wont-drain": {
    slug: "washer-wont-drain",
    category: "Appliance",
    title: "Washer won't drain — error codes & how to fix",
    h1: "Washer won't drain",
    description: "Standing water in the drum, drain pump issues, coin filter clogs — the most common error codes across Samsung, LG, Whirlpool, Bosch.",
    intro: "Washer drain failures are the #1 appliance error. 80% are not the pump — they're the coin filter (which most owners don't know exists), a kinked drain hose, or a clog at the standpipe. Check these before spending $100 on a new pump.",
    checkFirst: [
      "Unplug the washer, bail out standing water with a cup",
      "Find and clean the coin/pump filter (usually front-bottom behind a small panel)",
      "Check the drain hose for kinks — it should curve smoothly up to the standpipe",
      "Pull the drain hose out of the standpipe and flush it with hot water",
    ],
    relatedCodes: [
      { code: "5E", url: "/appliance/samsung/washer/5e", label: "Samsung Drain Error", why: "Universal Samsung drain fault — start at filter" },
      { code: "OE", url: "/appliance/lg/washer/oe", label: "LG Drain Error", why: "Most common LG washer code" },
      { code: "F9E1", url: "/appliance/whirlpool/washer/f9e1", label: "Whirlpool Long Drain", why: "Took >8 minutes to drain → restriction" },
      { code: "E18", url: "/appliance/bosch/washer/e18", label: "Bosch Pump Error", why: "Standard Bosch drain code" },
    ],
    whenToCallPro: "If the coin filter is clean, drain hose is clear, and the pump makes no noise when it should activate — the pump may be dead. Replacement is doable (30 min, $40-120 part), but if you're not comfortable with water-adjacent repairs, call a tech.",
    ogCategory: "appliance",
  },

  "washer-wont-spin": {
    slug: "washer-wont-spin",
    category: "Appliance",
    title: "Washer won't spin — codes, lid switch, bearings",
    h1: "Washer won't spin",
    description: "Clothes come out soaked after a full cycle. Here's how to narrow lid switch, drive belt, motor, or bearing.",
    intro: "Spin failures split into 'won't start spin' (lid switch, unbalanced, drive system) and 'spins weakly' (worn belt, tub bearings). Narrow first which one, then check the right parts.",
    checkFirst: [
      "Does it start spin but abort? → unbalanced load or lid switch",
      "Silent during spin cycle? → lid switch or motor control",
      "Loud/grinding when trying to spin? → bearings or drive coupling",
      "Pull codes and check lid/door lock with a multimeter",
    ],
    relatedCodes: [
      { code: "UE", url: "/appliance/lg/washer/ue", label: "LG Unbalance", why: "Load distribution error — redistribute clothes" },
      { code: "UB", url: "/appliance/samsung/washer/ub", label: "Samsung Unbalance", why: "Same principle, Samsung branding" },
      { code: "F8E1", url: "/appliance/whirlpool/washer/f8e1", label: "Whirlpool Water Supply", why: "Also prevents spin" },
      { code: "dL", url: "/appliance/lg/washer/dl", label: "LG Door Lock Error", why: "Washer won't spin until door latches securely" },
    ],
    whenToCallPro: "Bearings are a major teardown — often not worth it on washers over 7-8 years old. Get an estimate before authorizing.",
    ogCategory: "appliance",
  },

  "dryer-not-heating": {
    slug: "dryer-not-heating",
    category: "Appliance",
    title: "Dryer not heating — thermal fuse, heating element, gas valve",
    h1: "Dryer not heating",
    description: "Dryer runs but clothes stay damp. The #1 cause is a tripped thermal fuse from blocked venting, not a dead heating element.",
    intro: "If your dryer spins but doesn't heat, the culprit is almost always a thermal fuse that popped because the vent is clogged with lint. Replace the fuse without clearing the vent and it'll pop again within a week. Check the full vent path first — it saves money and prevents house fires.",
    checkFirst: [
      "Unplug the dryer and pull the back panel off",
      "Check the thermal fuse with a multimeter (should read continuity)",
      "Check the lint trap and the full vent hose to outside — remove all lint",
      "If gas dryer, check that the igniter glows and gas valve solenoids click",
    ],
    relatedCodes: [
      { code: "E1", url: "/appliance/samsung/dryer/e1", label: "Samsung Dryer Temp Sensor", why: "Thermistor or thermal fuse" },
      { code: "E3", url: "/appliance/lg/dryer/e3", label: "LG Dryer Heater Error", why: "Element or thermal fuse tripped" },
      { code: "F01", url: "/appliance/whirlpool/dryer/f01", label: "Whirlpool Control Board", why: "Board fault can masquerade as no-heat" },
    ],
    whenToCallPro: "Gas dryers with a dead igniter or gas valve — improper gas connection is a fire/CO risk. Call a pro or have a gas utility tech verify.",
    ogCategory: "appliance",
  },

  "dishwasher-not-draining": {
    slug: "dishwasher-not-draining",
    category: "Appliance",
    title: "Dishwasher not draining — standing water fix guide",
    h1: "Dishwasher not draining",
    description: "Standing water at the bottom after every cycle. Usually drain hose kinked, air gap clogged, or garbage disposal knockout plug not removed.",
    intro: "Dishwashers share drain lines with kitchen plumbing, so the cause is often not inside the machine. First check whether the drain hose goes under the sink — if so, verify the air gap is clear and the connection at the disposal/drain isn't clogged. The infamous knockout plug inside a new garbage disposal is the #1 cause of 'won't drain' on newly installed dishwashers.",
    checkFirst: [
      "If newly installed + connected to new disposal: check if the disposal knockout plug was removed",
      "Clean the dishwasher filter (bottom of tub) — 30 seconds, fixes half of cases",
      "Detach drain hose at disposal connection and check for grease/food clog",
      "Run the disposal for 15 seconds to clear any backup, then run dishwasher drain cycle",
    ],
    relatedCodes: [
      { code: "LE", url: "/appliance/lg/dishwasher/le", label: "LG Motor/Pump Error", why: "Pump inoperable — often just clogged filter" },
      { code: "E24", url: "/appliance/bosch/dishwasher/e24", label: "Bosch Drain Pump Error", why: "Bosch variant of drain issue" },
      { code: "F1E2", url: "/appliance/whirlpool/dishwasher/f1e2", label: "Whirlpool Drain Pump Fault", why: "Whirlpool drain electrical fault" },
    ],
    whenToCallPro: "If kitchen sink backs up when dishwasher runs, your main drain is partially clogged. Call a plumber, not an appliance tech.",
    ogCategory: "appliance",
  },

  "fridge-not-cooling": {
    slug: "fridge-not-cooling",
    category: "Appliance",
    title: "Fridge not cooling — compressor, condenser, defrost fix",
    h1: "Fridge not cooling",
    description: "Fridge warm but freezer cold, or both warm. The diagnostic path is very different for each scenario.",
    intro: "'Fridge not cooling' has two distinct patterns: fridge warm + freezer cold (defrost or air-flow problem), or both warm (compressor or sealed system). Identify which first — saves hours.",
    checkFirst: [
      "Is freezer still cold? → air-flow / defrost fault, likely evaporator or damper",
      "Both warm? → compressor, condenser fan, or refrigerant (sealed system)",
      "Check if condenser coils (bottom or back) are dusty — clean them first",
      "Listen for compressor running. Silent = compressor issue. Running but warm = sealed system",
    ],
    relatedCodes: [
      { code: "22E", url: "/appliance/samsung/refrigerator/22e", label: "Samsung Fridge Fan Error", why: "Evaporator fan failure prevents cold air circulation" },
      { code: "dH", url: "/appliance/lg/refrigerator/dh", label: "LG Defrost Error", why: "Defrost system failure causes ice buildup blocking air flow" },
      { code: "PO", url: "/appliance/whirlpool/refrigerator/po", label: "Whirlpool Power Outage", why: "Appears after power loss; resets are needed" },
    ],
    whenToCallPro: "If the sealed refrigerant circuit is involved (compressor, condenser coil leak) — EPA certification required. Call a licensed refrigeration tech.",
    ogCategory: "appliance",
  },

  "furnace-wont-ignite": {
    slug: "furnace-wont-ignite",
    category: "HVAC",
    title: "Furnace won't ignite — flash codes & fix",
    h1: "Furnace won't ignite",
    description: "No heat, pilot won't stay lit, igniter glows but no flame — read the LED flash code first, then work through the gas path.",
    intro: "Modern furnaces have a diagnostic LED near the control board that flashes a pattern encoding the fault. Don't skip reading this — it narrows diagnosis from an hour to minutes. Count the flashes, cross-reference your brand, then start troubleshooting.",
    checkFirst: [
      "Find the diagnostic LED (through the blower compartment window or inside the cabinet)",
      "Count the flash pattern (X flashes, pause, repeat) and look it up for your brand",
      "Check if the flame sensor is dirty (most common cause of short-cycle ignition)",
      "Verify gas is on (other gas appliances working?)",
    ],
    relatedCodes: [
      { code: "3-flashes", url: "/hvac/carrier/furnace/3-flashes", label: "Carrier Pressure Switch Open", why: "Draft inducer or pressure switch fault" },
      { code: "4-flashes", url: "/hvac/carrier/furnace/4-flashes", label: "Carrier Limit Switch Open", why: "Overheating or airflow problem" },
      { code: "E1", url: "/hvac/goodman/furnace/e1", label: "Goodman Open Pressure", why: "Pressure switch stuck or blocked" },
    ],
    whenToCallPro: "ANY time you smell gas, hear a gas leak, or the furnace fails to shut off normally. Carbon monoxide risk — also evacuate if CO detector alarms.",
    ogCategory: "hvac",
  },

  "ac-not-cooling": {
    slug: "ac-not-cooling",
    category: "HVAC",
    title: "AC not cooling — low refrigerant, frozen coil, capacitor fix",
    h1: "AC not cooling",
    description: "AC runs but no cold air, blows warm, or freezes up. Narrow to airflow, refrigerant, or capacitor.",
    intro: "'AC not cooling' has three main causes: restricted airflow (dirty filter, iced coil), failed capacitor (compressor doesn't start), or low refrigerant (leak in the sealed system). DIY covers the first two; the third requires EPA-certified refrigerant handling.",
    checkFirst: [
      "Change the air filter if it's been more than 3 months",
      "Check the outdoor unit — fan spinning? coils frosted? weeds/debris around it?",
      "Listen for compressor humming then clicking off — classic bad capacitor symptom",
      "If evaporator coil is frozen solid — shut off, wait 4 hours, then run FAN ONLY for 2 hours",
    ],
    relatedCodes: [
      { code: "E1", url: "/hvac/lennox/ac/e1", label: "Lennox AC General Fault", why: "Run initial diagnostic" },
      { code: "E5", url: "/hvac/carrier/ac/e5", label: "Carrier Compressor Issue", why: "Capacitor or compressor windings" },
      { code: "E7", url: "/hvac/trane/ac/e7", label: "Trane Low Refrigerant", why: "Leak in sealed system — professional recharge needed" },
    ],
    whenToCallPro: "Any refrigerant issue — leak-testing, recharging, line-set replacement. Federal law requires EPA 608 certification. Also any high-voltage capacitor replacement if you're uncomfortable with stored charge safety.",
    ogCategory: "hvac",
  },

  "pc-wont-boot": {
    slug: "pc-wont-boot",
    category: "Windows",
    title: "PC won't boot / stuck on BSOD — recovery guide",
    h1: "PC won't boot or blue-screens",
    description: "Blue screen at startup, boot loop, INACCESSIBLE_BOOT_DEVICE — the recovery ladder from least to most invasive.",
    intro: "Boot failures on Windows 10/11 have a structured recovery ladder: quick Startup Repair, then Safe Mode, then SFC/DISM, then System Restore, then reset. Work through in order — don't jump to reinstall without trying the earlier options first.",
    checkFirst: [
      "Note the exact BSOD code (0x000000XX) — drives diagnosis",
      "Try booting 2-3 times; Windows auto-triggers Recovery after failed attempts",
      "From Recovery → Advanced Options → Startup Repair (first try)",
      "If that fails → Safe Mode → run SFC /scannow and DISM /Online /Cleanup-Image /RestoreHealth",
    ],
    relatedCodes: [
      { code: "0x0000007B", url: "/windows/bsod/0x0000007b", label: "INACCESSIBLE_BOOT_DEVICE", why: "Storage controller driver mismatch or bad cable" },
      { code: "0x000000ED", url: "/windows/bsod/0x000000ed", label: "UNMOUNTABLE_BOOT_VOLUME", why: "File system corruption — CHKDSK often fixes" },
      { code: "0x000000F4", url: "/windows/bsod/0x000000f4", label: "CRITICAL_PROCESS_DIED", why: "System process crashed — usually driver" },
      { code: "0xC000021A", url: "/windows/system/0xc000021a", label: "STATUS_SYSTEM_PROCESS_TERMINATED", why: "Winlogon/csrss crash" },
    ],
    whenToCallPro: "If SMART warnings appear (drive physically dying), or all recovery options fail and you have data to preserve. A data-recovery specialist costs less than replacing lost business files.",
    ogCategory: "windows",
  },

  "windows-update-fails": {
    slug: "windows-update-fails",
    category: "Windows",
    title: "Windows Update fails — 0x80070002 and other stuck updates",
    h1: "Windows Update keeps failing",
    description: "Update stuck at X%, rollback, error 0x8007XXXX — the troubleshooter, reset commands, and manual fix.",
    intro: "Windows Update failures are almost always fixable without a reinstall. Three tools do 90% of the work: the built-in Update Troubleshooter, the wuauserv/cryptSvc reset commands, and a clean SoftwareDistribution folder rebuild.",
    checkFirst: [
      "Run Settings → Update → Troubleshooter first (cheap, easy)",
      "Verify you have 20+ GB free disk space on C:",
      "Disable third-party antivirus temporarily (it commonly blocks update writes)",
      "Run Windows Update Reset commands (stop wuauserv, rename SoftwareDistribution, restart)",
    ],
    relatedCodes: [
      { code: "0x80070002", url: "/windows/update/0x80070002", label: "File Not Found", why: "Most common — SoftwareDistribution corrupt" },
      { code: "0x80073712", url: "/windows/update/0x80073712", label: "Component Store Corruption", why: "DISM /RestoreHealth usually fixes" },
      { code: "0x800F0922", url: "/windows/update/0x800f0922", label: "Feature Update Install Failed", why: "Often reserved partition too small" },
      { code: "0xC1900101", url: "/windows/update/0xc1900101", label: "Driver Migration Failed", why: "Incompatible driver blocks upgrade" },
    ],
    whenToCallPro: "If repeated reset commands don't fix it and you need enterprise features (Group Policy, WSUS) — corporate IT or MSP.",
    ogCategory: "windows",
  },

  "printer-paper-jam": {
    slug: "printer-paper-jam",
    category: "Printer",
    title: "Printer paper jam — recurring jams fix guide",
    h1: "Printer keeps jamming",
    description: "Paper jams on every job, phantom jams (jam message with no paper), feed issues. Here's what to check in order.",
    intro: "Recurring paper jams almost always come down to one of three things: worn feed rollers, wrong paper specification, or a stuck paper fragment still inside the machine. Almost nobody's printer is truly &ldquo;broken&rdquo; from jams — the fix usually takes 10 minutes.",
    checkFirst: [
      "Open every panel (front, back, duplexer, tray) and look for paper fragments — even tiny shreds stop the printer",
      "Check paper weight — most printers spec 20-24 lb / 75-90 gsm. Heavier paper jams",
      "Clean or replace the pickup rollers if they're shiny/worn (rubber wear = slip)",
      "Fan the paper stack and reload — don't overfill the tray",
    ],
    relatedCodes: [
      { code: "13.20.00", url: "/printer/hp/13.20.00", label: "HP Fuser Jam", why: "Paper stuck in fuser area" },
      { code: "5100", url: "/printer/canon/5100", label: "Canon Paper Feed Error", why: "Feed mechanism issue" },
      { code: "E-11", url: "/printer/epson/e-11", label: "Epson Paper Jam", why: "Standard Epson jam code" },
      { code: "Paper Jam (Rear)", url: "/printer/brother/paper-jam-(rear)", label: "Brother Rear Jam", why: "Paper stuck near rear tray" },
    ],
    whenToCallPro: "If the printer is out of warranty and the fuser/rollers are worn — replacement rollers are $30-80 but require disassembly. Worth a pro visit if you value the printer.",
    ogCategory: "printer",
  },

  "printer-wont-print": {
    slug: "printer-wont-print",
    category: "Printer",
    title: "Printer won't print — offline, queue stuck, connectivity",
    h1: "Printer won't print",
    description: "Printer shows offline, jobs stuck in queue, wireless printing fails — the ladder of fixes from quick-resets to driver reinstall.",
    intro: "90% of 'won't print' problems are software, not hardware. Power cycle, clear queue, restart print spooler, reconnect wireless — do these in order before blaming the printer.",
    checkFirst: [
      "Power cycle: unplug printer 60 seconds, unplug router, restart PC",
      "Clear the print queue (Settings → Printers → open queue → cancel all)",
      "Restart Print Spooler service (services.msc → Print Spooler → restart)",
      "Reinstall printer driver if still offline after above",
    ],
    relatedCodes: [
      { code: "Offline", url: "/printer/brother/offline", label: "Brother Offline Error", why: "Most common 'won't print' symptom" },
      { code: "0xC19A0020", url: "/printer/hp/0xc19a0020", label: "HP Ink System Failure", why: "HP-specific hardware error blocks printing" },
    ],
    whenToCallPro: "If print spooler won't start (service errors), network share printing for an office, or enterprise printer management.",
    ogCategory: "printer",
  },
};
