// ===== UK ROAD SIGNS — FA/EN VISUAL DATA =====
// Inline SVG road signs for Highway Code Farsi learning app
// Each sign: id, category, svg (inline), bilingual names & descriptions, ruleId

const ROAD_SIGN_VISUALS = {

  // ─────────────── REGULATORY SIGNS ───────────────

  'stop': {
    id: 'stop',
    category: 'regulatory',
    img: 'assets/img/signs/stop.jpg',
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
    img: 'assets/img/signs/give-way.jpg',
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
    img: 'assets/img/signs/no-entry.jpg',
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
    img: 'assets/img/signs/no-u-turn.jpg',
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
    img: 'assets/img/signs/speed-limit-20.jpg',
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
    img: 'assets/img/signs/speed-limit-30.jpg',
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
    img: 'assets/img/signs/speed-limit-40.jpg',
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
    img: 'assets/img/signs/speed-limit-50.jpg',
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
    img: 'assets/img/signs/speed-limit-60.jpg',
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
    img: 'assets/img/signs/national-speed-limit.jpg',
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
    img: 'assets/img/signs/end-of-speed-limit.jpg',
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
    img: 'assets/img/signs/no-overtaking.jpg',
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
    img: 'assets/img/signs/no-hgvs.jpg',
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
    img: 'assets/img/signs/one-way.jpg',
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
    img: 'assets/img/signs/bus-lane.jpg',
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
    img: 'assets/img/signs/no-pedestrians.jpg',
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
    img: 'assets/img/signs/no-cyclists.jpg',
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
    img: 'assets/img/signs/clearway.jpg',
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
    img: 'assets/img/signs/parking.jpg',
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
    img: 'assets/img/signs/roundabout-ahead.jpg',
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
    img: 'assets/img/signs/crossroads.jpg',
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
    img: 'assets/img/signs/t-junction.jpg',
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
    img: 'assets/img/signs/steep-hill-down.jpg',
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
    img: 'assets/img/signs/steep-hill-up.jpg',
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
    img: 'assets/img/signs/pedestrian-crossing.jpg',
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
    img: 'assets/img/signs/school-zone.jpg',
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
    img: 'assets/img/signs/animals-cows.jpg',
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
    img: 'assets/img/signs/road-works.jpg',
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
    img: 'assets/img/signs/slippery-road.jpg',
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
    img: 'assets/img/signs/low-bridge.jpg',
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
    img: 'assets/img/signs/double-bend.jpg',
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
    img: 'assets/img/signs/traffic-lights.jpg',
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
    img: 'assets/img/signs/motorway.jpg',
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
    img: 'assets/img/signs/zebra-crossing.jpg',
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
    img: 'assets/img/signs/cycle-lane.jpg',
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
    img: 'assets/img/signs/no-right-turn.jpg',
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
    img: 'assets/img/signs/no-left-turn.jpg',
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
    img: 'assets/img/signs/no-horns.jpg',
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
    img: 'assets/img/signs/weight-limit.jpg',
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
    img: 'assets/img/signs/minimum-speed.jpg',
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
    img: 'assets/img/signs/narrow-bridge.jpg',
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
    img: 'assets/img/signs/side-wind.jpg',
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
    img: 'assets/img/signs/pedestrian-priority.jpg',
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
    img: 'assets/img/signs/no-waiting.jpg',
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
    img: 'assets/img/signs/two-way-traffic.jpg',
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
    img: 'assets/img/signs/trams.jpg',
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
    img: 'assets/img/signs/level-crossing.jpg',
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
