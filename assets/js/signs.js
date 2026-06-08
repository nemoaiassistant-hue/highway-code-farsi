// ===== UK ROAD SIGNS — FA/EN VISUAL DATA =====
// Inline SVG road signs for Highway Code Farsi learning app
// Each sign: id, category, svg (inline), bilingual names & descriptions, ruleId

const ROAD_SIGN_VISUALS = {

  // ─────────────── REGULATORY SIGNS ───────────────

  'stop': {
    id: 'stop',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="25,10 75,10 90,25 90,75 75,90 25,90 10,75 10,25" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <text x="50" y="42" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold" font-family="Arial,sans-serif">STOP</text>
  <polygon points="25,14 75,14 86,25 86,75 75,86 25,86 14,75 14,25" fill="none" stroke="#fff" stroke-width="1.5"/>
</svg>`,
    nameFa: 'توقف',
    nameEn: 'Stop',
    descriptionFa: 'باید کاملاً توقف کنید و سپس با احتیاط حرکت کنید.',
    descriptionEn: 'You must come to a complete stop, then proceed when safe.',
    ruleId: 'road-signs',
    keywords: ['stop', 'stop', 'توقف'],
  },

  'give-way': {
    id: 'give-way',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,22 80,78 20,78" fill="#fff"/>
</svg>`,
    nameFa: 'حق‌تقدم بدهید',
    nameEn: 'Give Way',
    descriptionFa: 'به وسایل نقلیه‌ای که در جاده اصلی هستند حق تقدم بدهید.',
    descriptionEn: 'Give priority to vehicles on the main road.',
    ruleId: 'road-signs',
    keywords: ['give way', 'give way', 'حق‌تقدم بدهید'],
  },

  'no-entry': {
    id: 'no-entry',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <rect x="20" y="44" width="60" height="12" rx="2" fill="#fff"/>
</svg>`,
    nameFa: 'ورود ممنوع',
    nameEn: 'No Entry',
    descriptionFa: 'ورود به این جاده یا خیابان از این سمت ممنوع است.',
    descriptionEn: 'Vehicles must not enter this road from this direction.',
    ruleId: 'road-signs',
    keywords: ['no entry', 'no entry', 'ورود ممنوع'],
  },

  'no-u-turn': {
    id: 'no-u-turn',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <path d="M36,60 Q36,30 64,30" fill="none" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
  <polygon points="64,24 72,30 64,36" fill="#1a1a1a"/>
  <line x1="36" y1="55" x2="36" y2="68" stroke="#DC2626" stroke-width="4"/>
</svg>`,
    nameFa: 'دور ممنوع',
    nameEn: 'No U-Turn',
    descriptionFa: 'در اینجا دور زدن (U-turn) ممنوع است.',
    descriptionEn: 'U-turns are prohibited at this location.',
    ruleId: 'road-signs',
    keywords: ['no u-turn', 'no u turn', 'دور ممنوع'],
  },

  'speed-limit-20': {
    id: 'speed-limit-20',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="32" fill="#fff"/>
  <text x="50" y="58" text-anchor="middle" fill="#1a1a1a" font-size="28" font-weight="bold" font-family="Arial,sans-serif">20</text>
</svg>`,
    nameFa: 'حدود سرعت ۲۰',
    nameEn: 'Speed Limit 20 mph',
    descriptionFa: 'حداکثر سرعت مجاز ۲۰ مایل بر ساعت.',
    descriptionEn: 'Maximum speed limit of 20 miles per hour.',
    ruleId: 'road-signs',
    keywords: ['speed limit 20 mph', 'speed limit 20', 'حدود سرعت ۲۰'],
  },

  'speed-limit-30': {
    id: 'speed-limit-30',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="32" fill="#fff"/>
  <text x="50" y="58" text-anchor="middle" fill="#1a1a1a" font-size="28" font-weight="bold" font-family="Arial,sans-serif">30</text>
</svg>`,
    nameFa: 'حدود سرعت ۳۰',
    nameEn: 'Speed Limit 30 mph',
    descriptionFa: 'حداکثر سرعت مجاز ۳۰ مایل بر ساعت.',
    descriptionEn: 'Maximum speed limit of 30 miles per hour.',
    ruleId: 'road-signs',
    keywords: ['speed limit 30 mph', 'speed limit 30', 'حدود سرعت ۳۰'],
  },

  'speed-limit-40': {
    id: 'speed-limit-40',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="32" fill="#fff"/>
  <text x="50" y="58" text-anchor="middle" fill="#1a1a1a" font-size="28" font-weight="bold" font-family="Arial,sans-serif">40</text>
</svg>`,
    nameFa: 'حدود سرعت ۴۰',
    nameEn: 'Speed Limit 40 mph',
    descriptionFa: 'حداکثر سرعت مجاز ۴۰ مایل بر ساعت.',
    descriptionEn: 'Maximum speed limit of 40 miles per hour.',
    ruleId: 'road-signs',
    keywords: ['speed limit 40 mph', 'speed limit 40', 'حدود سرعت ۴۰'],
  },

  'speed-limit-50': {
    id: 'speed-limit-50',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="32" fill="#fff"/>
  <text x="50" y="58" text-anchor="middle" fill="#1a1a1a" font-size="28" font-weight="bold" font-family="Arial,sans-serif">50</text>
</svg>`,
    nameFa: 'حدود سرعت ۵۰',
    nameEn: 'Speed Limit 50 mph',
    descriptionFa: 'حداکثر سرعت مجاز ۵۰ مایل بر ساعت.',
    descriptionEn: 'Maximum speed limit of 50 miles per hour.',
    ruleId: 'road-signs',
    keywords: ['speed limit 50 mph', 'speed limit 50', 'حدود سرعت ۵۰'],
  },

  'speed-limit-60': {
    id: 'speed-limit-60',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="32" fill="#fff"/>
  <text x="50" y="58" text-anchor="middle" fill="#1a1a1a" font-size="28" font-weight="bold" font-family="Arial,sans-serif">60</text>
</svg>`,
    nameFa: 'حدود سرعت ۶۰',
    nameEn: 'Speed Limit 60 mph',
    descriptionFa: 'حداکثر سرعت مجاز ۶۰ مایل بر ساعت.',
    descriptionEn: 'Maximum speed limit of 60 miles per hour.',
    ruleId: 'road-signs',
    keywords: ['speed limit 60 mph', 'speed limit 60', 'حدود سرعت ۶۰'],
  },

  'speed-limit-70': {
    id: 'speed-limit-70',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="32" fill="#fff"/>
  <text x="50" y="58" text-anchor="middle" fill="#1a1a1a" font-size="28" font-weight="bold" font-family="Arial,sans-serif">70</text>
</svg>`,
    nameFa: 'حدود سرعت ۷۰',
    nameEn: 'Speed Limit 70 mph',
    descriptionFa: 'حداکثر سرعت مجاز ۷۰ مایل بر ساعت.',
    descriptionEn: 'Maximum speed limit of 70 miles per hour.',
    ruleId: 'road-signs',
    keywords: ['speed limit 70 mph', 'speed limit 70', 'حدود سرعت ۷۰'],
  },

  'national-speed-limit': {
    id: 'national-speed-limit',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="32" fill="#fff"/>
  <line x1="68" y1="20" x2="32" y2="80" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
  <line x1="72" y1="18" x2="36" y2="78" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
</svg>`,
    nameFa: 'حدود سرعت ملی',
    nameEn: 'National Speed Limit',
    descriptionFa: 'حدود سرعت ملی برقرار است. در مناطق مسکونی: ۳۰، جاده‌های تک‌خطه: ۶۰، دوخطه: ۷۰.',
    descriptionEn: 'National speed limit applies. Built-up: 30, single carriageway: 60, dual carriageway/motorway: 70 mph.',
    ruleId: 'road-signs',
    keywords: ['national speed limit', 'national speed limit', 'حدود سرعت ملی'],
  },

  'end-of-speed-limit': {
    id: 'end-of-speed-limit',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#fff" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="32" fill="#1a1a1a"/>
  <line x1="32" y1="20" x2="68" y2="80" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
  <line x1="28" y1="18" x2="64" y2="78" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
</svg>`,
    nameFa: 'پایان حدود سرعت',
    nameEn: 'End of Speed Limit',
    descriptionFa: 'پایان محدودیت سرعت قبلی. حدود سرعت ملی برقرار می‌شود.',
    descriptionEn: 'Previous speed restriction ends. National speed limit now applies.',
    ruleId: 'road-signs',
    keywords: ['end of speed limit', 'end of speed limit', 'پایان حدود سرعت'],
  },

  'no-overtaking': {
    id: 'no-overtaking',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <rect x="32" y="35" width="22" height="30" rx="3" fill="#1a1a1a"/>
  <rect x="56" y="38" width="20" height="24" rx="3" fill="#1a1a1a"/>
  <line x1="56" y1="50" x2="74" y2="40" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
</svg>`,
    nameFa: 'سبقت ممنوع',
    nameEn: 'No Overtaking',
    descriptionFa: 'سبقت گرفتن از وسایل نقلیه دیگر ممنوع است.',
    descriptionEn: 'Overtaking other vehicles is prohibited.',
    ruleId: 'road-signs',
    keywords: ['no overtaking', 'no overtaking', 'سبقت ممنوع'],
  },

  'no-hgvs': {
    id: 'no-hgvs',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <rect x="26" y="38" width="30" height="22" rx="2" fill="#1a1a1a"/>
  <rect x="30" y="60" width="10" height="8" rx="1" fill="#1a1a1a"/>
  <rect x="42" y="60" width="10" height="8" rx="1" fill="#1a1a1a"/>
  <circle cx="33" cy="70" r="4" fill="none" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="70" r="4" fill="none" stroke="#1a1a1a" stroke-width="2"/>
  <path d="M56,42 L68,42 L68,60 L56,60 Z" fill="#1a1a1a"/>
</svg>`,
    nameFa: 'ورود کامیون‌ها ممنوع',
    nameEn: 'No Heavy Goods Vehicles',
    descriptionFa: 'ورود وسایل نقلیه سنگین (کامیون) ممنوع است.',
    descriptionEn: 'Heavy goods vehicles (HGVs) are prohibited from using this road.',
    ruleId: 'road-signs',
    keywords: ['no heavy goods vehicles', 'no hgvs', 'ورود کامیون‌ها ممنوع'],
  },

  'one-way': {
    id: 'one-way',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="84" height="84" rx="6" fill="#2563EB" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="55,30 75,50 55,70" fill="#fff"/>
  <rect x="22" y="44" width="36" height="12" rx="1" fill="#fff"/>
</svg>`,
    nameFa: 'خیابان یک‌طرفه',
    nameEn: 'One Way',
    descriptionFa: 'این خیابان فقط یک‌طرفه است. جهت تردد مشخص شده.',
    descriptionEn: 'Traffic may only travel in one direction on this road.',
    ruleId: 'road-signs',
    keywords: ['one way', 'one way', 'خیابان یک‌طرفه'],
  },

  'bus-lane': {
    id: 'bus-lane',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="84" height="84" rx="6" fill="#2563EB" stroke="#1a1a1a" stroke-width="2"/>
  <rect x="22" y="30" width="48" height="30" rx="4" fill="#fff"/>
  <rect x="26" y="60" width="12" height="10" rx="2" fill="#fff"/>
  <rect x="44" y="60" width="12" height="10" rx="2" fill="#fff"/>
  <circle cx="32" cy="74" r="5" fill="#fff"/>
  <circle cx="50" cy="74" r="5" fill="#fff"/>
  <circle cx="32" cy="74" r="2" fill="#2563EB"/>
  <circle cx="50" cy="74" r="2" fill="#2563EB"/>
  <text x="78" y="56" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold" font-family="Arial,sans-serif">></text>
</svg>`,
    nameFa: 'خط اتوبوس',
    nameEn: 'Bus Lane',
    descriptionFa: 'این خط مخصوص اتوبوس‌هاست. فقط اتوبوس‌ها می‌توانند از آن استفاده کنند.',
    descriptionEn: 'This lane is reserved for buses only during displayed hours.',
    ruleId: 'road-signs',
    keywords: ['bus lane', 'bus lane', 'خط اتوبوس'],
  },

  'no-pedestrians': {
    id: 'no-pedestrians',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <circle cx="50" cy="30" r="7" fill="#1a1a1a"/>
  <line x1="50" y1="37" x2="50" y2="58" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <line x1="40" y1="46" x2="60" y2="46" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <line x1="50" y1="58" x2="40" y2="74" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <line x1="50" y1="58" x2="60" y2="74" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
</svg>`,
    nameFa: 'ورود عابران ممنوع',
    nameEn: 'No Pedestrians',
    descriptionFa: 'ورود عابران پیاده ممنوع است.',
    descriptionEn: 'Pedestrians are not permitted beyond this point.',
    ruleId: 'road-signs',
    keywords: ['no pedestrians', 'no pedestrians', 'ورود عابران ممنوع'],
  },

  'no-cyclists': {
    id: 'no-cyclists',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <circle cx="38" cy="62" r="9" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <circle cx="62" cy="62" r="9" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <polyline points="38,62 50,42 62,42 62,62" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
  <line x1="50" y1="42" x2="48" y2="30" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
</svg>`,
    nameFa: 'ورود دوچرخه‌سواران ممنوع',
    nameEn: 'No Cyclists',
    descriptionFa: 'سواری دوچرخه در این مکان ممنوع است.',
    descriptionEn: 'Cycling is prohibited beyond this point.',
    ruleId: 'road-signs',
    keywords: ['no cyclists', 'no cyclists', 'ورود دوچرخه‌سواران م'],
  },

  'clearway': {
    id: 'clearway',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="84" height="84" rx="6" fill="#2563EB" stroke="#1a1a1a" stroke-width="2"/>
  <rect x="18" y="18" width="64" height="64" rx="2" fill="#fff"/>
  <line x1="38" y1="24" x2="38" y2="76" stroke="#DC2626" stroke-width="5"/>
  <line x1="62" y1="24" x2="62" y2="76" stroke="#DC2626" stroke-width="5"/>
  <rect x="44" y="40" width="12" height="4" fill="#DC2626"/>
</svg>`,
    nameFa: 'توقف ممنوع',
    nameEn: 'Clearway (No Stopping)',
    descriptionFa: 'توقف و پارک در این مسیر کاملاً ممنوع است.',
    descriptionEn: 'No stopping or parking on this road at any time.',
    ruleId: 'parking',
    keywords: ['clearway (no stopping)', 'clearway', 'توقف ممنوع'],
  },

  'parking': {
    id: 'parking',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="84" height="84" rx="6" fill="#2563EB" stroke="#1a1a1a" stroke-width="2"/>
  <text x="50" y="66" text-anchor="middle" fill="#fff" font-size="48" font-weight="bold" font-family="Arial,sans-serif">P</text>
</svg>`,
    nameFa: 'پارکینگ',
    nameEn: 'Parking',
    descriptionFa: 'ناحیه پارک مجاز. شرایط ممکن است روی تابلو ذکر شده باشد.',
    descriptionEn: 'Designated parking area. Check for time restrictions on the sign.',
    ruleId: 'parking',
    keywords: ['parking', 'parking', 'پارکینگ'],
  },

  // ─────────────── WARNING SIGNS ───────────────

  'roundabout-ahead': {
    id: 'roundabout-ahead',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <circle cx="50" cy="58" r="14" fill="none" stroke="#1a1a1a" stroke-width="3.5"/>
  <line x1="30" y1="58" x2="36" y2="58" stroke="#1a1a1a" stroke-width="3.5"/>
  <polyline points="64,54 70,50 70,58" fill="none" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="50" y1="74" x2="50" y2="68" stroke="#1a1a1a" stroke-width="3.5"/>
</svg>`,
    nameFa: 'میدان ترافیکی (راندآبوت)',
    nameEn: 'Roundabout Ahead',
    descriptionFa: 'به زودی یک میدان ترافیکی (راندآبوت) وجود دارد. آمادگی بدهید.',
    descriptionEn: 'A roundabout is ahead. Prepare to enter and give way to traffic from the right.',
    ruleId: 'roundabouts',
    keywords: ['roundabout ahead', 'roundabout ahead', 'میدان ترافیکی (راندآ'],
  },

  'crossroads': {
    id: 'crossroads',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <line x1="50" y1="28" x2="50" y2="72" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <line x1="28" y1="55" x2="72" y2="55" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <polygon points="44,28 50,22 56,28" fill="#1a1a1a"/>
</svg>`,
    nameFa: 'چهارراه',
    nameEn: 'Crossroads',
    descriptionFa: 'یک تقاطع چهارراه نزدیک است. مراقب باشید.',
    descriptionEn: 'A crossroads junction is ahead. Watch for cross traffic.',
    ruleId: 'junctions',
    keywords: ['crossroads', 'crossroads', 'چهارراه'],
  },

  't-junction': {
    id: 't-junction',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <line x1="50" y1="55" x2="50" y2="72" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <line x1="28" y1="55" x2="72" y2="55" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <polygon points="44,55 50,62 56,55" fill="#1a1a1a"/>
</svg>`,
    nameFa: 'سه‌راهی',
    nameEn: 'T-Junction',
    descriptionFa: 'یک تقاطع سه‌راهی نزدیک است.',
    descriptionEn: 'A T-junction is ahead. Be prepared to turn or stop.',
    ruleId: 'junctions',
    keywords: ['t-junction', 't junction', 'سه‌راهی'],
  },

  'steep-hill-down': {
    id: 'steep-hill-down',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <line x1="28" y1="62" x2="72" y2="40" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <polygon points="68,40 76,36 72,44" fill="#1a1a1a"/>
</svg>`,
    nameFa: 'سراشیبی تند',
    nameEn: 'Steep Hill Downward',
    descriptionFa: 'به زودی یک سراشیبی تند وجود دارد. سرعت را کم کنید.',
    descriptionEn: 'Steep descent ahead. Reduce speed and use a lower gear.',
    ruleId: 'general-driving',
    keywords: ['steep hill downward', 'steep hill down', 'سراشیبی تند'],
  },

  'steep-hill-up': {
    id: 'steep-hill-up',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <line x1="28" y1="40" x2="72" y2="62" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <polygon points="28,36 24,44 32,44" fill="#1a1a1a"/>
</svg>`,
    nameFa: 'تپه شیب‌دار',
    nameEn: 'Steep Hill Upward',
    descriptionFa: 'به زودی یک تپه شیب‌دار وجود دارد. آمادگی بگیرید.',
    descriptionEn: 'Steep ascent ahead. Consider using a lower gear.',
    ruleId: 'general-driving',
    keywords: ['steep hill upward', 'steep hill up', 'تپه شیب‌دار'],
  },

  'pedestrian-crossing': {
    id: 'pedestrian-crossing',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <circle cx="50" y="30" cy="30" r="5" fill="#1a1a1a"/>
  <line x1="50" y1="35" x2="50" y2="52" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <line x1="44" y1="42" x2="56" y2="42" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="52" x2="42" y2="65" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="52" x2="58" y2="65" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
</svg>`,
    nameFa: 'گذرگاه عابران پیاده',
    nameEn: 'Pedestrian Crossing',
    descriptionFa: 'به زودی یک گذرگاه عابران پیاده وجود دارد. مراقب باشید.',
    descriptionEn: 'Pedestrian crossing ahead. Be prepared to slow down and stop.',
    ruleId: 'pedestrians',
    keywords: ['pedestrian crossing', 'pedestrian crossing', 'گذرگاه عابران پیاده'],
  },

  'school-zone': {
    id: 'school-zone',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <circle cx="50" cy="32" r="5" fill="#1a1a1a"/>
  <line x1="50" y1="37" x2="50" y2="54" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <line x1="44" y1="43" x2="56" y2="43" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="54" x2="42" y2="66" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="54" x2="58" y2="66" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <text x="50" y="74" text-anchor="middle" fill="#1a1a1a" font-size="8" font-weight="bold" font-family="Arial,sans-serif">SCHOOL</text>
</svg>`,
    nameFa: 'ناحیه مدرسه',
    nameEn: 'School Zone',
    descriptionFa: 'ناحیه مدرسه — سرعت را کم کنید و مراقب کودکان باشید.',
    descriptionEn: 'School zone — reduce speed and watch for children crossing.',
    ruleId: 'pedestrians',
    keywords: ['school zone', 'school zone', 'ناحیه مدرسه'],
  },

  'animals-cows': {
    id: 'animals-cows',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <ellipse cx="50" cy="52" rx="16" ry="11" fill="#1a1a1a"/>
  <circle cx="43" cy="42" r="4" fill="#1a1a1a"/>
  <circle cx="57" cy="42" r="4" fill="#1a1a1a"/>
  <line x1="43" y1="38" x2="43" y2="34" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="57" y1="38" x2="57" y2="34" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="38" y1="63" x2="38" y2="72" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="50" y1="63" x2="50" y2="72" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="62" y1="63" x2="62" y2="72" stroke="#1a1a1a" stroke-width="3"/>
</svg>`,
    nameFa: 'احتمال حضور حیوانات',
    nameEn: 'Animals (Cattle/Sheep)',
    descriptionFa: 'مراقب حیوانات (گاو یا گوسفند) در جاده باشید.',
    descriptionEn: 'Watch for cattle or sheep on or near the road.',
    ruleId: 'road-signs',
    keywords: ['animals (cattle/sheep)', 'animals cows', 'احتمال حضور حیوانات'],
  },

  'road-works': {
    id: 'road-works',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <rect x="38" y="42" width="24" height="6" rx="1" fill="#1a1a1a"/>
  <rect x="36" y="48" width="28" height="4" rx="1" fill="#1a1a1a"/>
  <rect x="34" y="52" width="32" height="4" rx="1" fill="#1a1a1a"/>
  <rect x="32" y="56" width="36" height="4" rx="1" fill="#1a1a1a"/>
  <rect x="40" y="32" width="8" height="10" rx="1" fill="#1a1a1a"/>
  <rect x="52" y="36" width="8" height="6" rx="1" fill="#1a1a1a"/>
</svg>`,
    nameFa: 'عملیات راهسازی',
    nameEn: 'Road Works',
    descriptionFa: 'عملیات راهسازی در جریان است. سرعت را کم کنید.',
    descriptionEn: 'Road works ahead. Reduce speed and watch for workers.',
    ruleId: 'road-signs',
    keywords: ['road works', 'road works', 'عملیات راهسازی'],
  },

  'slippery-road': {
    id: 'slippery-road',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <circle cx="50" cy="52" r="12" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <path d="M40,40 Q44,44 40,48" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M58,56 Q62,60 58,64" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M44,38 Q48,34 52,38" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,
    nameFa: 'جاده لغزنده',
    nameEn: 'Slippery Road',
    descriptionFa: 'جاده ممکن است لغزنده باشد. مراقب باشید، به خصوص در باران.',
    descriptionEn: 'Road may be slippery, especially when wet or icy.',
    ruleId: 'weather',
    keywords: ['slippery road', 'slippery road', 'جاده لغزنده'],
  },

  'low-bridge': {
    id: 'low-bridge',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <line x1="28" y1="58" x2="72" y2="58" stroke="#1a1a1a" stroke-width="4"/>
  <path d="M28,58 L28,42 Q28,32 38,32 L62,32 Q72,32 72,42 L72,58" fill="none" stroke="#1a1a1a" stroke-width="4"/>
  <text x="50" y="72" text-anchor="middle" fill="#1a1a1a" font-size="10" font-weight="bold" font-family="Arial,sans-serif">HGT</text>
</svg>`,
    nameFa: 'پل با ارتفاع کم',
    nameEn: 'Low Bridge',
    descriptionFa: 'پل با ارتفاع کم. مراقب وسایل نقلیه بلند باشید.',
    descriptionEn: 'Low bridge ahead — check vehicle height before proceeding.',
    ruleId: 'road-signs',
    keywords: ['low bridge', 'low bridge', 'پل با ارتفاع کم'],
  },

  'double-bend': {
    id: 'double-bend',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <path d="M30,66 Q30,48 46,48 Q60,48 60,36" fill="none" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
  <polygon points="56,36 60,30 64,38" fill="#1a1a1a"/>
</svg>`,
    nameFa: 'پیچ دوگانه',
    nameEn: 'Double Bend',
    descriptionFa: 'به زودی دو پیچ متوالی وجود دارد. سرعت را کم کنید.',
    descriptionEn: 'Double bend ahead. Reduce speed and proceed with caution.',
    ruleId: 'general-driving',
    keywords: ['double bend', 'double bend', 'پیچ دوگانه'],
  },

  'mini-roundabout': {
    id: 'mini-roundabout',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <circle cx="50" cy="55" r="14" fill="#1a1a1a"/>
  <circle cx="50" cy="55" r="7" fill="#fff"/>
  <circle cx="50" cy="55" r="2" fill="#1a1a1a"/>
  <line x1="28" y1="55" x2="34" y2="55" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="66" y1="55" x2="72" y2="55" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="50" y1="30" x2="50" y2="38" stroke="#1a1a1a" stroke-width="3"/>
</svg>`,
    nameFa: 'مینی راندآبوت',
    nameEn: 'Mini Roundabout',
    descriptionFa: 'یک مینی میدان ترافیکی. حق تقدم را به سمت راست بدهید.',
    descriptionEn: 'Mini roundabout ahead. Give way to traffic from the right.',
    ruleId: 'roundabouts',
    keywords: ['mini roundabout', 'mini roundabout', 'مینی راندآبوت'],
  },

  'traffic-lights': {
    id: 'traffic-lights',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <rect x="42" y="30" width="16" height="38" rx="4" fill="#1a1a1a"/>
  <circle cx="50" cy="38" r="4" fill="#DC2626"/>
  <circle cx="50" cy="49" r="4" fill="#FBBF24"/>
  <circle cx="50" cy="60" r="4" fill="#16A34A"/>
</svg>`,
    nameFa: 'چراغ راهنمایی',
    nameEn: 'Traffic Lights',
    descriptionFa: 'چراغ راهنمایی در جلو. آماده توقف باشید.',
    descriptionEn: 'Traffic lights ahead. Be prepared to stop.',
    ruleId: 'signals',
    keywords: ['traffic lights', 'traffic lights', 'چراغ راهنمایی'],
  },

  // ─────────────── MOTORWAY SIGNS ───────────────

  'motorway': {
    id: 'motorway',
    category: 'motorway',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="15" width="84" height="70" rx="4" fill="#16A34A" stroke="#1a1a1a" stroke-width="2"/>
  <rect x="14" y="21" width="72" height="58" rx="2" fill="#fff"/>
  <text x="50" y="58" text-anchor="middle" fill="#16A34A" font-size="38" font-weight="bold" font-family="Arial,sans-serif">M1</text>
</svg>`,
    nameFa: 'بزرگراه (موتور‌وی)',
    nameEn: 'Motorway',
    descriptionFa: 'ورود به بزرگراه. قوانین خاص موتوروی اعمال می‌شود.',
    descriptionEn: 'Motorway ahead. Motorway-specific rules apply (no pedestrians, no L-plates).',
    ruleId: 'motorways',
    keywords: ['motorway', 'motorway', 'بزرگراه (موتور‌وی)'],
  },

  // ─────────────── PEDESTRIAN SIGNS ───────────────

  'zebra-crossing': {
    id: 'zebra-crossing',
    category: 'pedestrian',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="84" height="84" rx="6" fill="#2563EB" stroke="#1a1a1a" stroke-width="2"/>
  <rect x="18" y="20" width="8" height="60" rx="1" fill="#fff"/>
  <rect x="30" y="20" width="8" height="60" rx="1" fill="#fff"/>
  <rect x="42" y="20" width="8" height="60" rx="1" fill="#fff"/>
  <rect x="54" y="20" width="8" height="60" rx="1" fill="#fff"/>
  <rect x="66" y="20" width="8" height="60" rx="1" fill="#fff"/>
  <circle cx="50" cy="26" r="5" fill="#FFD700"/>
</svg>`,
    nameFa: 'گذرگاه خط‌دار (زبرا)',
    nameEn: 'Zebra Crossing',
    descriptionFa: 'گذرگاه عابران پیاده. رانندگان باید توقف کنند.',
    descriptionEn: 'Zebra crossing — drivers must stop for pedestrians waiting to cross.',
    ruleId: 'pedestrians',
    keywords: ['zebra crossing', 'zebra crossing', 'گذرگاه خط‌دار (زبرا)'],
  },

  'cycle-lane': {
    id: 'cycle-lane',
    category: 'pedestrian',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="84" height="84" rx="6" fill="#fff" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="38" cy="58" r="9" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <circle cx="62" cy="58" r="9" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <polyline points="38,58 50,38 62,38 62,58" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
  <line x1="50" y1="38" x2="48" y2="26" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
</svg>`,
    nameFa: 'مسیر دوچرخه',
    nameEn: 'Cycle Lane',
    descriptionFa: 'مسیر اختصاصی دوچرخه‌سواران.',
    descriptionEn: 'Dedicated cycle lane. Only cyclists may use this path.',
    ruleId: 'cyclists',
    keywords: ['cycle lane', 'cycle lane', 'مسیر دوچرخه'],
  },

  // ─────────────── ADDITIONAL SIGNS ───────────────

  'no-right-turn': {
    id: 'no-right-turn',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <path d="M50,38 L50,62" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
  <path d="M50,38 L62,38" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
  <path d="M50,38 L50,30 L62,30" fill="none" stroke="#DC2626" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    nameFa: 'پیچ به راست ممنوع',
    nameEn: 'No Right Turn',
    descriptionFa: 'پیچ به راست ممنوع است.',
    descriptionEn: 'Right turns are prohibited at this junction.',
    ruleId: 'junctions',
    keywords: ['no right turn', 'no right turn', 'پیچ به راست ممنوع'],
  },

  'no-left-turn': {
    id: 'no-left-turn',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <path d="M50,38 L50,62" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
  <path d="M50,38 L38,38" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
  <path d="M50,38 L50,30 L38,30" fill="none" stroke="#DC2626" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    nameFa: 'پیچ به چپ ممنوع',
    nameEn: 'No Left Turn',
    descriptionFa: 'پیچ به چپ ممنوع است.',
    descriptionEn: 'Left turns are prohibited at this junction.',
    ruleId: 'junctions',
    keywords: ['no left turn', 'no left turn', 'پیچ به چپ ممنوع'],
  },

  'no-horns': {
    id: 'no-horns',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <path d="M42,42 L42,58 L48,58 L56,66 L56,34 L48,42 Z" fill="#1a1a1a"/>
  <line x1="58" y1="40" x2="68" y2="36" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="58" y1="44" x2="68" y2="44" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="58" y1="48" x2="68" y2="52" stroke="#1a1a1a" stroke-width="2"/>
</svg>`,
    nameFa: 'بوق زدن ممنوع',
    nameEn: 'No Horns',
    descriptionFa: 'بوق زدن در این ناحیه ممنوع است.',
    descriptionEn: 'Sounding your horn is prohibited in this area.',
    ruleId: 'road-signs',
    keywords: ['no horns', 'no horns', 'بوق زدن ممنوع'],
  },

  'weight-limit': {
    id: 'weight-limit',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <text x="50" y="44" text-anchor="middle" fill="#1a1a1a" font-size="12" font-weight="bold" font-family="Arial,sans-serif">W</text>
  <text x="50" y="66" text-anchor="middle" fill="#1a1a1a" font-size="24" font-weight="bold" font-family="Arial,sans-serif">7.5</text>
  <text x="50" y="76" text-anchor="middle" fill="#1a1a1a" font-size="10" font-weight="bold" font-family="Arial,sans-serif">t</text>
</svg>`,
    nameFa: 'حداکثر وزن',
    nameEn: 'Weight Limit 7.5t',
    descriptionFa: 'وسایل نقلیه سنگین‌تر از ۷.۵ تن حق عبور ندارند.',
    descriptionEn: 'Vehicles exceeding 7.5 tonnes gross weight are prohibited.',
    ruleId: 'road-signs',
    keywords: ['weight limit 7.5t', 'weight limit', 'حداکثر وزن'],
  },

  'minimum-speed': {
    id: 'minimum-speed',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#2563EB" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <polygon points="38,35 38,65 60,50" fill="#1a1a1a"/>
  <text x="50" y="58" text-anchor="middle" fill="#2563EB" font-size="16" font-weight="bold" font-family="Arial,sans-serif">30</text>
</svg>`,
    nameFa: 'حداقل سرعت',
    nameEn: 'Minimum Speed 30 mph',
    descriptionFa: 'سرعت شما نباید کمتر از حداقل تعیین‌شده باشد.',
    descriptionEn: 'Do not drive below the minimum speed indicated unless impeded.',
    ruleId: 'motorways',
    keywords: ['minimum speed 30 mph', 'minimum speed', 'حداقل سرعت'],
  },

  'narrow-bridge': {
    id: 'narrow-bridge',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <line x1="30" y1="30" x2="30" y2="70" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="70" y1="30" x2="70" y2="70" stroke="#1a1a1a" stroke-width="3"/>
  <path d="M30,30 Q30,24 36,24 L64,24 Q70,24 70,30" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <path d="M30,70 Q30,76 36,76 L64,76 Q70,76 70,70" fill="none" stroke="#1a1a1a" stroke-width="3"/>
</svg>`,
    nameFa: 'پل باریک',
    nameEn: 'Narrow Bridge',
    descriptionFa: 'پل باریک. مراقب وسایل نقلیه مقابل باشید.',
    descriptionEn: 'Narrow bridge ahead. Give way to oncoming traffic if necessary.',
    ruleId: 'road-signs',
    keywords: ['narrow bridge', 'narrow bridge', 'پل باریک'],
  },

  'side-wind': {
    id: 'side-wind',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <path d="M36,46 Q42,40 36,34" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <path d="M44,52 Q50,46 44,40" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <path d="M52,58 Q58,52 52,46" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
  <path d="M60,64 Q66,58 60,52" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
</svg>`,
    nameFa: 'باد شدید جانبی',
    nameEn: 'Side Wind',
    descriptionFa: 'مراقب باد شدید جانبی باشید، به خصوص برای وسایل نقلیه بلند.',
    descriptionEn: 'Risk of strong crosswinds. Reduce speed and keep both hands on the wheel.',
    ruleId: 'weather',
    keywords: ['side wind', 'side wind', 'باد شدید جانبی'],
  },

  'pedestrian-priority': {
    id: 'pedestrian-priority',
    category: 'pedestrian',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="84" height="84" rx="6" fill="#2563EB" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="30" r="7" fill="#fff"/>
  <line x1="50" y1="37" x2="50" y2="55" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <line x1="40" y1="45" x2="60" y2="45" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <line x1="50" y1="55" x2="40" y2="72" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <line x1="50" y1="55" x2="60" y2="72" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
</svg>`,
    nameFa: 'اولویت عابران پیاده',
    nameEn: 'Pedestrians Have Priority',
    descriptionFa: 'عابران پیاده حق تقدم دارند.',
    descriptionEn: 'Pedestrians have priority. Give way to people on foot.',
    ruleId: 'pedestrians',
    keywords: ['pedestrians have priority', 'pedestrian priority', 'اولویت عابران پیاده'],
  },

  'no-waiting': {
    id: 'no-waiting',
    category: 'regulatory',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="42" fill="#DC2626" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="#fff"/>
  <line x1="32" y1="50" x2="68" y2="50" stroke="#DC2626" stroke-width="4"/>
  <rect x="38" y="38" width="24" height="24" rx="2" fill="none" stroke="#1a1a1a" stroke-width="3"/>
</svg>`,
    nameFa: 'انتظار ممنوع',
    nameEn: 'No Waiting',
    descriptionFa: 'پارک کردن و انتظار در اینجا ممنوع است.',
    descriptionEn: 'No waiting or parking at any time. Look for time plates for exceptions.',
    ruleId: 'parking',
    keywords: ['no waiting', 'no waiting', 'انتظار ممنوع'],
  },

  'two-way-traffic': {
    id: 'two-way-traffic',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <polygon points="38,32 24,42 38,52" fill="#1a1a1a"/>
  <polygon points="62,52 76,42 62,32" fill="#1a1a1a"/>
  <line x1="22" y1="42" x2="12" y2="42" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="78" y1="42" x2="88" y2="42" stroke="#1a1a1a" stroke-width="3"/>
</svg>`,
    nameFa: 'دوطرفه بودن ترافیک',
    nameEn: 'Two-Way Traffic',
    descriptionFa: 'ترافیک دوطرفه. مراقب وسایل نقلیه مقابل باشید.',
    descriptionEn: 'Two-way traffic ahead. The road switches from one-way to two-way.',
    ruleId: 'general-driving',
    keywords: ['two-way traffic', 'two way traffic', 'دوطرفه بودن ترافیک'],
  },

  'trams': {
    id: 'trams',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <rect x="24" y="42" width="52" height="18" rx="4" fill="#1a1a1a"/>
  <rect x="28" y="46" width="8" height="10" rx="1" fill="#fff"/>
  <rect x="40" y="46" width="8" height="10" rx="1" fill="#fff"/>
  <rect x="52" y="46" width="8" height="10" rx="1" fill="#fff"/>
  <circle cx="32" cy="66" r="4" fill="none" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="68" cy="66" r="4" fill="none" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="26" y1="34" x2="26" y2="42" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="74" y1="34" x2="74" y2="42" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="26" y1="34" x2="74" y2="34" stroke="#1a1a1a" stroke-width="2"/>
</svg>`,
    nameFa: 'خط تراموا',
    nameEn: 'Tram Crossing Ahead',
    descriptionFa: 'خط تراموا در جلو. مراقب ترامواها باشید.',
    descriptionEn: 'Tramway crossing ahead. Watch for trams and do not block the tracks.',
    ruleId: 'road-signs',
    keywords: ['tram crossing ahead', 'trams', 'خط تراموا'],
  },

  'level-crossing': {
    id: 'level-crossing',
    category: 'warning',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,8 92,85 8,85" fill="#FBBF24" stroke="#1a1a1a" stroke-width="2"/>
  <polygon points="50,20 82,78 18,78" fill="#fff"/>
  <line x1="20" y1="52" x2="80" y2="52" stroke="#1a1a1a" stroke-width="4"/>
  <line x1="50" y1="36" x2="50" y2="68" stroke="#1a1a1a" stroke-width="4"/>
  <line x1="32" y1="44" x2="50" y2="52" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="68" y1="44" x2="50" y2="52" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="32" y1="60" x2="50" y2="52" stroke="#1a1a1a" stroke-width="3"/>
  <line x1="68" y1="60" x2="50" y2="52" stroke="#1a1a1a" stroke-width="3"/>
</svg>`,
    nameFa: 'عرض راه‌آهن',
    nameEn: 'Level Crossing',
    descriptionFa: 'عرض راه‌آهن بدون مانع. مراقب قطار باشید.',
    descriptionEn: 'Level crossing without barriers. Stop, look, and listen for trains.',
    ruleId: 'road-signs',
    keywords: ['level crossing', 'level crossing', 'عرض راه‌آهن'],
  },

};

// Convert object to array for app.js compatibility
window.ROAD_SIGN_VISUALS = Object.values(ROAD_SIGN_VISUALS);
