// ===== UK LGV / PCV THEORY TEST DATA — FA/EN =====
// Farsi-first bilingual study content for lorry, bus and coach drivers.

const CATEGORIES = [
  { id: 'vehicle-safety', icon: '🔧', title: 'ایمنی وسیله نقلیه', titleEn: 'Vehicle Safety', count: 8, color: '#2563eb' },
  { id: 'loading-cargo', icon: '📦', title: 'بارگیری و محموله', titleEn: 'Loading & Cargo', count: 8, color: '#16a34a' },
  { id: 'weight-dimensions', icon: '⚖️', title: 'وزن و ابعاد', titleEn: 'Weight & Dimensions', count: 8, color: '#d97706' },
  { id: 'driver-hours-tachographs', icon: '⏱️', title: 'ساعات رانندگی و تاخوگراف', titleEn: 'Drivers’ Hours & Tachographs', count: 8, color: '#7c3aed' },
  { id: 'speed-limits-hgv', icon: '🚛', title: 'محدودیت سرعت وسایل سنگین', titleEn: 'LGV/PCV Speed Limits', count: 8, color: '#dc2626' },
  { id: 'motorways-hgv', icon: '🛣️', title: 'بزرگراه برای وسایل بزرگ', titleEn: 'Motorways for Large Vehicles', count: 8, color: '#0284c7' },
  { id: 'junctions-large', icon: '🔀', title: 'تقاطع‌ها با وسیله بزرگ', titleEn: 'Junctions & Large Vehicles', count: 8, color: '#ea580c' },
  { id: 'reversing-manoeuvring', icon: '↩️', title: 'دنده‌عقب و مانور', titleEn: 'Reversing & Manoeuvring', count: 8, color: '#0891b2' },
  { id: 'hazard-awareness', icon: '⚠️', title: 'درک خطر', titleEn: 'Hazard Awareness', count: 8, color: '#ca8a04' },
  { id: 'adverse-weather', icon: '🌧️', title: 'آب‌وهوای نامساعد', titleEn: 'Adverse Weather', count: 8, color: '#64748b' },
  { id: 'fuel-efficiency', icon: '🌱', title: 'رانندگی کم‌مصرف', titleEn: 'Fuel Efficiency', count: 8, color: '#059669' },
  { id: 'breakdowns-emergencies', icon: '🆘', title: 'خرابی و شرایط اضطراری', titleEn: 'Breakdowns & Emergencies', count: 8, color: '#b91c1c' },
  { id: 'professional-rules', icon: '🪪', title: 'قوانین راننده حرفه‌ای', titleEn: 'Professional Rules', count: 8, color: '#4f46e5' },
  { id: 'documentation', icon: '📋', title: 'مدارک و اسناد', titleEn: 'Documentation', count: 8, color: '#475569' },
];

const r = (num, fa, en, tipFa = null, tipEn = null, warningFa = null, warningEn = null) => ({
  num, fa, en, tipFa, tipEn, warningFa, warningEn,
});

const q = (fa, en, choices, answer, explanation, difficulty) => ({
  q: fa,
  qEn: en,
  options: choices.map((choice, index) => ({
    letter: String.fromCharCode(65 + index), fa: choice[0], en: choice[1],
  })),
  answer,
  explanation,
  difficulty,
});

const RULES = {
  'vehicle-safety': {
    title: 'ایمنی وسیله نقلیه',
    titleEn: 'Vehicle Safety',
    rules: [
      r(1, 'پیش از شروع کار، بازدید روزانه انجام دهید و عیب‌هایی را که ممکن است بر ایمنی اثر بگذارند ثبت و گزارش کنید.', 'Before driving, complete a daily walkaround check and record and report any defect that could affect safety.'),
      r(2, 'لاستیک‌ها را از نظر بریدگی، برآمدگی، فشار و عمق آج بررسی کنید. حداقل آج قانونی برای بیشتر وسایل بزرگ ۱ میلی‌متر در سه‌چهارم مرکزی عرض لاستیک است.', 'Check tyres for cuts, bulges, pressure and tread. The legal minimum for most large vehicles is 1 mm across the central three-quarters of the tread.'),
      r(3, 'ترمز سرویس، ترمز دستی، هشدار فشار هوا و تمام چراغ‌ها باید درست کار کنند. با هشدار فشار هوای کم حرکت نکنید.', 'Service brake, parking brake, air-pressure warning and all lights must work correctly. Do not move with a low-air-pressure warning.', null, null, 'افت فشار هوا می‌تواند ترمزها را از کار بیندازد.', 'Loss of air pressure can prevent the brakes working correctly.'),
      r(4, 'آینه‌ها، شیشه‌ها و دوربین‌ها را تمیز و تنظیم کنید. هیچ بار یا برچسبی نباید دید راننده را محدود کند.', 'Keep mirrors, windows and cameras clean and correctly adjusted. Loads and stickers must not obstruct the driver’s view.'),
      r(5, 'مایعات، نشتی سوخت یا روغن، باتری، درپوش سوخت، اگزوز و سامانه AdBlue را بررسی کنید.', 'Check fluid levels, fuel or oil leaks, battery security, fuel cap, exhaust and AdBlue system.'),
      r(6, 'اتصال تریلر، قفل صفحه پنجم، پایه‌ها، کابل‌ها و شلنگ‌های ترمز را بررسی کنید و پس از کوپل‌کردن آزمون کشش انجام دهید.', 'Check the trailer coupling, fifth-wheel lock, landing legs, electrical leads and brake lines; carry out a tug test after coupling.'),
      r(7, 'پلاک‌های نشانگر، علائم بازتابنده، گلگیرها و محافظ‌های جانبی و عقب باید سالم، تمیز و محکم باشند.', 'Plates, reflective markings, spray suppression, sideguards and rear underrun protection must be secure, clean and serviceable.'),
      r(8, 'راننده مسئول است مطمئن شود وسیله در تمام سفر ایمن می‌ماند؛ پس از توقف یا تعویض راننده دوباره بررسی کنید.', 'The driver remains responsible for roadworthiness throughout the journey; recheck after stops or a change of driver.'),
    ],
    quiz: [
      q('حداقل عمق آج بیشتر لاستیک‌های وسیله بزرگ چقدر است؟', 'What is the minimum tread depth for most large-vehicle tyres?', [['۱ میلی‌متر', '1 mm'], ['۱٫۶ میلی‌متر', '1.6 mm'], ['۳ میلی‌متر', '3 mm']], 'A', 'حداقل معمول ۱ میلی‌متر در سه‌چهارم مرکزی است. // Normally 1 mm across the central three-quarters.', 'medium'),
      q('اگر هشدار فشار هوای ترمز روشن بماند چه می‌کنید؟', 'What should you do if the brake air-pressure warning stays on?', [['آرام حرکت کنید', 'Drive slowly'], ['حرکت نکنید و عیب را رفع کنید', 'Do not move; have the defect fixed'], ['فقط ترمز دستی را امتحان کنید', 'Only test the parking brake']], 'B', 'با فشار هوای ناکافی حرکت نکنید. // Do not move with insufficient air pressure.', 'medium'),
      q('پس از اتصال تریلر چه آزمونی مفید است؟', 'Which test is useful after coupling a trailer?', [['آزمون کشش', 'Tug test'], ['آزمون بوق', 'Horn test'], ['آزمون سرعت', 'Speed test']], 'A', 'آزمون کشش تأیید می‌کند قفل اتصال درگیر است. // A tug test helps confirm the coupling is locked.', 'medium'),
      q('چه کسی طی سفر مسئول ایمن‌بودن وسیله است؟', 'Who is responsible for the vehicle remaining safe during the journey?', [['فقط مالک', 'Only the owner'], ['فقط تعمیرکار', 'Only the mechanic'], ['راننده و بهره‌بردار', 'The driver and operator']], 'C', 'راننده و بهره‌بردار هر دو مسئولیت دارند. // Both driver and operator have responsibilities.', 'medium'),
    ],
  },

  'loading-cargo': {
    title: 'بارگیری و محموله',
    titleEn: 'Loading & Cargo',
    rules: [
      r(9, 'بار باید طوری توزیع و مهار شود که در ترمز، پیچ یا شتاب‌گیری حرکت نکند و موجب ناپایداری نشود.', 'Distribute and secure the load so it cannot move under braking, cornering or acceleration, or make the vehicle unstable.'),
      r(10, 'اجسام سنگین را تا حد ممکن پایین و نزدیک خط مرکزی قرار دهید و وزن را روی محورها درست پخش کنید.', 'Place heavy items as low and near the centre line as possible, with weight correctly distributed across the axles.'),
      r(11, 'تسمه، زنجیر، قفل و نقاط مهار باید مناسب بار، سالم و به تعداد کافی باشند؛ پوشش یا پرده جانبی به‌تنهایی مهار بار نیست.', 'Restraints and anchor points must be suitable, undamaged and sufficient; curtains or sheets alone are not load restraint.'),
      r(12, 'پس از شروع سفر و در فواصل مناسب، به‌ویژه پس از ترمز شدید، مهار بار را دوباره بررسی کنید.', 'Recheck load security shortly after setting off and at suitable intervals, especially after heavy braking.'),
      r(13, 'بار نباید چراغ‌ها، پلاک، علائم یا دید راننده را بپوشاند و درها و دریچه‌ها باید ایمن باشند.', 'A load must not obscure lights, plates, markings or the driver’s view, and doors and tailgates must be secure.'),
      r(14, 'هنگام بارگیری یا تخلیه، ترمز دستی را بکشید، موتور را در صورت لزوم خاموش کنید و از حرکت ناخواسته جلوگیری کنید.', 'During loading or unloading, apply the parking brake, switch off when appropriate and prevent unintended movement.'),
      r(15, 'حمل مواد خطرناک تابع مقررات ویژه، علائم، تجهیزات، آموزش و اسناد ADR است.', 'Dangerous goods require the correct ADR training, placards, equipment and documentation.'),
      r(16, 'در PCV، بار و چمدان را طوری قرار دهید که راهرو، خروج اضطراری و دسترسی مسافران مسدود نشود.', 'On a PCV, stow luggage so aisles, emergency exits and passenger access remain clear.'),
    ],
    quiz: [
      q('بهترین محل برای بار سنگین کجاست؟', 'Where is the best place for a heavy load?', [['بالا و عقب', 'High and rearward'], ['پایین و نزدیک مرکز', 'Low and near the centre'], ['فقط روی یک محور', 'On one axle only']], 'B', 'مرکز ثقل پایین‌تر پایداری را بهتر می‌کند. // A lower centre of gravity improves stability.', 'medium'),
      q('آیا پرده جانبی به‌تنهایی مهار بار است؟', 'Is a curtain side alone adequate load restraint?', [['بله', 'Yes'], ['فقط در شهر', 'Only in towns'], ['خیر', 'No']], 'C', 'پرده یا پوشش جای مهار مناسب را نمی‌گیرد. // Curtains and sheets do not replace proper restraint.', 'easy'),
      q('مهار بار چه زمانی دوباره بررسی شود؟', 'When should load security be rechecked?', [['فقط پایان سفر', 'Only at journey end'], ['پس از حرکت و در فواصل مناسب', 'Soon after setting off and periodically'], ['فقط هنگام باران', 'Only in rain']], 'B', 'بار ممکن است پس از حرکت جا بیفتد و تسمه‌ها شل شوند. // Loads can settle and restraints loosen.', 'medium'),
      q('در اتوبوس، چمدان نباید چه چیزی را مسدود کند؟', 'On a bus, luggage must not obstruct what?', [['خروج اضطراری', 'Emergency exits'], ['رادیو', 'Radio'], ['نمای بیرونی بدنه', 'Exterior paintwork']], 'A', 'خروج‌ها و راهروها باید باز بمانند. // Exits and aisles must remain clear.', 'easy'),
    ],
  },

  'weight-dimensions': {
    title: 'وزن و ابعاد',
    titleEn: 'Weight & Dimensions',
    rules: [
      r(17, 'هیچ‌گاه وزن مجاز ناخالص، وزن قطار یا حد وزن هر محور روی پلاک سازنده یا پلاک وزارت را تجاوز نکنید.', 'Never exceed the plated gross, train or individual axle weights shown on the manufacturer’s or ministry plate.'),
      r(18, 'وزن مجاز ناخالص شامل وسیله، راننده، مسافر، سوخت و بار است؛ وزن قطار شامل وسیله و تریلرهای آن است.', 'Gross weight includes vehicle, driver, passengers, fuel and load; train weight includes the vehicle and its trailers.'),
      r(19, 'حداکثر وزن معمول بسیاری از ترکیب‌های شش‌محوره واجد شرایط در بریتانیا ۴۴ تن است؛ شرایط محور و تعلیق نیز باید رعایت شود.', 'The normal maximum for many qualifying six-axle combinations in Great Britain is 44 tonnes; axle and suspension conditions also apply.'),
      r(20, 'حداکثر عرض معمول وسیله ۲٫۵۵ متر است. بار یا وسیله عریض‌تر ممکن است به مقررات بار غیرعادی و اعلام قبلی نیاز داشته باشد.', 'The normal maximum vehicle width is 2.55 metres. Wider vehicles or loads may require abnormal-load rules and advance notification.'),
      r(21, 'حداکثر طول معمول کامیون صلب ۱۲ متر، کشنده مفصلی ۱۶٫۵ متر و ترکیب drawbar برابر ۱۸٫۷۵ متر است.', 'Normal maximum lengths are 12 metres for a rigid vehicle, 16.5 metres for an articulated vehicle and 18.75 metres for a drawbar combination.'),
      r(22, 'در بریتانیا حد ارتفاع عمومی واحدی وجود ندارد، اما اگر ارتفاع کلی بیش از ۳ متر باشد باید اعلان ارتفاع در کابین نصب شود.', 'Great Britain has no single general height limit, but vehicles over 3 metres overall must display an in-cab height notice.'),
      r(23, 'قبل از مسیر، ارتفاع واقعی وسیله و بار را بدانید و آن را با محدودیت پل‌ها، تونل‌ها و کابل‌ها مقایسه کنید.', 'Know the actual travelling height before setting off and compare it with bridge, tunnel and overhead restrictions.'),
      r(24, 'اضافه‌بار ترمز و فرمان را بدتر، لاستیک‌ها را داغ و وسیله را ناپایدار می‌کند؛ وزن را با باسکول معتبر کنترل کنید.', 'Overloading harms braking and steering, overheats tyres and reduces stability; use a suitable weighbridge when needed.'),
    ],
    quiz: [
      q('وزن مجاز ناخالص شامل چیست؟', 'What does gross vehicle weight include?', [['فقط بار', 'Load only'], ['وسیله و همه محتویات آن', 'Vehicle and everything carried'], ['فقط وسیله خالی', 'Empty vehicle only']], 'B', 'راننده، سوخت، مسافر و بار همگی جزو وزن ناخالص‌اند. // Driver, fuel, passengers and load all count.', 'medium'),
      q('حداکثر عرض معمول وسیله چقدر است؟', 'What is the normal maximum vehicle width?', [['۲٫۵۵ متر', '2.55 metres'], ['۳ متر', '3 metres'], ['۴٫۴ متر', '4.4 metres']], 'A', 'عرض معمول حداکثر ۲٫۵۵ متر است. // The normal maximum width is 2.55 metres.', 'medium'),
      q('اعلان ارتفاع کابین معمولاً از چه ارتفاعی لازم است؟', 'When is an in-cab height notice normally required?', [['بیش از ۲ متر', 'Over 2 metres'], ['بیش از ۳ متر', 'Over 3 metres'], ['بیش از ۵ متر', 'Over 5 metres']], 'B', 'برای ارتفاع کلی بیش از ۳ متر اعلان کابین لازم است. // It is required when overall height exceeds 3 metres.', 'medium'),
      q('حداکثر معمول بسیاری از ترکیب‌های شش‌محوره واجد شرایط چیست؟', 'What is the normal maximum for many qualifying six-axle combinations?', [['۳۲ تن', '32 tonnes'], ['۴۰ تن', '40 tonnes'], ['۴۴ تن', '44 tonnes']], 'C', 'در صورت رعایت شرایط، ۴۴ تن. // 44 tonnes where all conditions are met.', 'medium'),
    ],
  },

  'driver-hours-tachographs': {
    title: 'ساعات رانندگی و تاخوگراف',
    titleEn: 'Drivers’ Hours & Tachographs',
    rules: [
      r(25, 'طبق مقررات assimilated/AETR، پس از حداکثر ۴٫۵ ساعت رانندگی باید ۴۵ دقیقه استراحت کنید؛ می‌توان آن را ۱۵ دقیقه و سپس ۳۰ دقیقه تقسیم کرد.', 'Under assimilated/AETR rules, take 45 minutes’ break after no more than 4.5 hours’ driving; it may be split into 15 minutes followed by 30 minutes.'),
      r(26, 'رانندگی روزانه معمولاً حداکثر ۹ ساعت است و حداکثر دو بار در هفته می‌تواند به ۱۰ ساعت افزایش یابد.', 'Daily driving is normally limited to 9 hours and may be extended to 10 hours no more than twice in a week.'),
      r(27, 'حد رانندگی هفتگی ۵۶ ساعت و مجموع دو هفته متوالی ۹۰ ساعت است.', 'The weekly driving limit is 56 hours and the total for any two consecutive weeks is 90 hours.'),
      r(28, 'استراحت روزانه منظم حداقل ۱۱ ساعت است؛ کاهش قانونی تا ۹ ساعت فقط تحت شرایط و محدودیت‌های مقرر مجاز است.', 'Regular daily rest is at least 11 hours; a reduced 9-hour rest is allowed only within the specified conditions and limits.'),
      r(29, 'استراحت هفتگی منظم حداقل ۴۵ ساعت است. استراحت کاهش‌یافته باید طبق قواعد جبران شود و استراحت منظم هفتگی را در کابین نگیرید.', 'Regular weekly rest is at least 45 hours. Reduced weekly rest must be compensated as required, and regular weekly rest must not be taken in the cab.'),
      r(30, 'کارت راننده دیجیتال شخصی است. پیش از حرکت آن را وارد کنید و رانندگی، کار دیگر، آماده‌باش و استراحت را درست ثبت کنید.', 'A digital driver card is personal. Insert it before driving and correctly record driving, other work, availability and rest.'),
      r(31, 'اگر تاخوگراف یا کارت خراب شد، ثبت دستی و چاپ‌های لازم را انجام دهید، مشخصات را امضا کنید و در اولین فرصت قانونی تعمیر کنید.', 'If the tachograph or card fails, make the required manual records and printouts, sign them and arrange repair within the legal timescale.'),
      r(32, 'دستکاری تاخوگراف، استفاده از کارت دیگری یا ثبت استراحت هنگام انجام کار، جرم جدی است.', 'Tampering with a tachograph, using another person’s card or recording rest while working is a serious offence.'),
    ],
    quiz: [
      q('پس از حداکثر چند ساعت رانندگی، ۴۵ دقیقه استراحت لازم است؟', 'After no more than how much driving is a 45-minute break required?', [['۴ ساعت', '4 hours'], ['۴٫۵ ساعت', '4.5 hours'], ['۶ ساعت', '6 hours']], 'B', 'حداکثر دوره رانندگی پیش از استراحت ۴٫۵ ساعت است. // The maximum driving spell before the break is 4.5 hours.', 'hard'),
      q('استراحت ۴۵ دقیقه‌ای چگونه قابل تقسیم است؟', 'How may the 45-minute break be split?', [['۳۰ سپس ۱۵', '30 then 15'], ['۱۵ سپس ۳۰', '15 then 30'], ['سه بخش ۱۵ دقیقه‌ای', 'Three 15-minute parts']], 'B', 'ترتیب قانونی ۱۵ دقیقه و سپس ۳۰ دقیقه است. // The permitted order is 15 minutes followed by 30.', 'hard'),
      q('حد رانندگی در دو هفته متوالی چقدر است؟', 'What is the two-consecutive-week driving limit?', [['۸۰ ساعت', '80 hours'], ['۹۰ ساعت', '90 hours'], ['۱۱۲ ساعت', '112 hours']], 'B', 'مجموع دو هفته متوالی نباید از ۹۰ ساعت بیشتر شود. // The total must not exceed 90 hours.', 'hard'),
    ],
  },

  'speed-limits-hgv': {
    title: 'محدودیت سرعت وسایل سنگین',
    titleEn: 'LGV/PCV Speed Limits',
    rules: [
      r(33, 'تابلوهای محدودیت سرعت برای همه وسایل اعمال می‌شوند؛ سرعت وسیله بزرگ باید حتی کمتر باشد اگر شرایط، بار یا دید ایجاب کند.', 'Signed speed limits apply to all vehicles; a large vehicle must travel slower when conditions, load or visibility require it.'),
      r(34, 'در انگلستان و ولز، وسیله باری بیش از ۷٫۵ تن معمولاً در جاده تک‌مسیره ۵۰، دو‌مسیره ۶۰ و بزرگراه ۶۰ مایل‌برساعت محدود است.', 'In England and Wales, a goods vehicle over 7.5 tonnes is normally limited to 50 mph on single carriageways, 60 mph on dual carriageways and 60 mph on motorways.'),
      r(35, 'در اسکاتلند، وسیله باری بیش از ۷٫۵ تن معمولاً در تک‌مسیره ۴۰، دو‌مسیره ۵۰ و بزرگراه ۶۰ مایل‌برساعت محدود است.', 'In Scotland, a goods vehicle over 7.5 tonnes is normally limited to 40 mph on single carriageways, 50 mph on dual carriageways and 60 mph on motorways.'),
      r(36, 'اتوبوس یا کوچ بیش از ۱۲ متر معمولاً در بزرگراه حداکثر ۶۰ مایل‌برساعت دارد؛ محدودیت دقیق را برای نوع وسیله بدانید.', 'A bus or coach over 12 metres is normally limited to 60 mph on a motorway; know the limit for the exact vehicle type.'),
      r(37, 'محدودکننده سرعت جای کنترل راننده را نمی‌گیرد؛ در سرازیری ممکن است سرعت از مقدار تنظیم‌شده بیشتر شود.', 'A speed limiter does not replace driver control; speed may rise above its setting downhill.'),
      r(38, 'سرعت بیشتر، فاصله توقف و شدت برخورد را به‌شدت افزایش می‌دهد؛ وزن بالا نیز کنترل وسیله را دشوارتر می‌کند.', 'Higher speed greatly increases stopping distance and collision severity; greater mass also makes the vehicle harder to control.'),
      r(39, 'پیش از پیچ یا سرازیری سرعت را کم و دنده مناسب را انتخاب کنید؛ در میانه پیچ ترمز شدید نکنید.', 'Reduce speed and select the correct gear before a bend or descent; avoid harsh braking mid-bend.'),
      r(40, 'تابلوی محدودیت پایین‌تر، کار جاده‌ای و محدودیت محلی همیشه بر حد ملی مقدم است.', 'A lower signed, roadworks or local limit always overrides the national limit.'),
    ],
    quiz: [
      q('حد معمول HGV بیش از ۷٫۵ تن در تک‌مسیره انگلستان و ولز چیست؟', 'What is the normal limit for an HGV over 7.5 tonnes on an England/Wales single carriageway?', [['۴۰ mph', '40 mph'], ['۵۰ mph', '50 mph'], ['۶۰ mph', '60 mph']], 'B', 'حد معمول ۵۰ mph است؛ در اسکاتلند معمولاً ۴۰ mph. // Normally 50 mph; Scotland is normally 40 mph.', 'hard'),
      q('حد معمول آن وسیله در بزرگراه چیست؟', 'What is its normal motorway limit?', [['۵۰ mph', '50 mph'], ['۶۰ mph', '60 mph'], ['۷۰ mph', '70 mph']], 'B', 'برای HGV بیش از ۷٫۵ تن معمولاً ۶۰ mph است. // It is normally 60 mph.', 'easy'),
      q('آیا محدودکننده سرعت در سرازیری سرعت را تضمین می‌کند؟', 'Does a speed limiter guarantee speed downhill?', [['بله', 'Yes'], ['خیر', 'No'], ['فقط در باران', 'Only in rain']], 'B', 'راننده باید با ترمز و دنده سرعت را کنترل کند. // The driver must control speed with braking and gearing.', 'medium'),
    ],
  },

  'motorways-hgv': {
    title: 'بزرگراه برای وسایل بزرگ',
    titleEn: 'Motorways for Large Vehicles',
    rules: [
      r(41, 'پیش از ورود به بزرگراه، سوخت، بار، لاستیک و مسیر را بررسی کنید و از لاین شتاب برای هماهنگ‌شدن با جریان استفاده کنید.', 'Before joining a motorway, check fuel, load, tyres and route, and use the slip road to match the traffic flow.'),
      r(42, 'وسیله باری بیش از ۷٫۵ تن، وسیله با تریلر و بیشتر کوچ‌ها نباید از راست‌ترین لاین بزرگراه سه‌لاین یا بیشتر استفاده کنند، مگر دستور دیگری باشد.', 'Goods vehicles over 7.5 tonnes, vehicles towing trailers and most coaches must not use the right-hand lane of a motorway with three or more lanes unless directed.'),
      r(43, 'لاین چپ را نگه دارید مگر برای سبقت؛ پس از ایجاد فاصله کافی و بررسی آینه و نقطه کور، به چپ برگردید.', 'Keep left unless overtaking; return left after creating enough clearance and checking mirrors and blind spots.'),
      r(44, 'فاصله بیشتری نگه دارید؛ در باران حداقل فاصله زمانی معمول را دو برابر کنید و در یخ بسیار بیشتر.', 'Leave a greater following distance; at least double the normal time gap in rain and increase it much more on ice.'),
      r(45, 'علامت X قرمز بالای لاین یعنی لاین بسته است. وارد آن نشوید یا فوراً در صورت ایمن‌بودن خارج شوید.', 'A red X above a lane means it is closed. Do not enter it, or leave it as soon as safely possible.'),
      r(46, 'شانه سخت فقط برای اضطرار است، مگر علائم آن را به‌عنوان لاین باز نشان دهند؛ برای توقف معمول از محل خدمات استفاده کنید.', 'The hard shoulder is for emergencies only unless signs show it open as a running lane; use services for routine stops.'),
      r(47, 'باد جانبی هنگام عبور از پل‌ها، شکاف حفاظ‌ها یا سبقت از وسیله بزرگ ناگهان اثر می‌کند؛ فرمان را محکم و سرعت را مناسب نگه دارید.', 'Crosswinds can strike suddenly on bridges, through gaps or when passing large vehicles; hold the wheel firmly and adjust speed.'),
      r(48, 'خروجی را زود برنامه‌ریزی کنید؛ هرگز برای رسیدن به خروجی به‌طور ناگهانی چند لاین را قطع نکنید.', 'Plan exits early; never cut suddenly across several lanes to reach an exit.'),
    ],
    quiz: [
      q('HGV بیش از ۷٫۵ تن در بزرگراه سه‌لاین معمولاً از کدام لاین نباید استفاده کند؟', 'Which lane must an HGV over 7.5 tonnes normally not use on a three-lane motorway?', [['لاین چپ', 'Left lane'], ['لاین وسط', 'Middle lane'], ['لاین راست', 'Right-hand lane']], 'C', 'این وسایل معمولاً از راست‌ترین لاین منع شده‌اند. // These vehicles are normally prohibited from the right-hand lane.', 'hard'),
      q('X قرمز بالای لاین یعنی چه؟', 'What does a red X above a lane mean?', [['لاین بسته است', 'Lane closed'], ['حداقل سرعت', 'Minimum speed'], ['لاین فقط HGV', 'HGV-only lane']], 'A', 'رانندگی در لاین X قرمز ممنوع است. // You must not drive in a red-X lane.', 'easy'),
      q('شانه سخت چه زمانی برای توقف است؟', 'When should you stop on the hard shoulder?', [['برای تماس تلفنی', 'For a phone call'], ['فقط اضطرار واقعی', 'Only in a genuine emergency'], ['برای استراحت تاخوگراف', 'For a tachograph break']], 'B', 'برای توقف عادی از خدمات بزرگراه استفاده کنید. // Use motorway services for routine stops.', 'easy'),
    ],
  },

  'junctions-large': {
    title: 'تقاطع‌ها با وسیله بزرگ',
    titleEn: 'Junctions & Large Vehicles',
    rules: [
      r(49, 'خیلی زود آینه‌ها را بررسی و علامت دهید؛ برای چرخش وسیله بلند فضای بیشتری لازم است.', 'Check mirrors and signal early; a long vehicle needs more room to turn.'),
      r(50, 'هنگام گردش چپ مراقب دوچرخه‌سواران و عابران در سمت چپ باشید؛ پیش از گردش دوباره نقطه کور را بررسی کنید.', 'When turning left, watch for cyclists and pedestrians on the nearside; recheck the blind spot before turning.'),
      r(51, 'برای بازکردن گردش ممکن است موقعیت وسیع‌تری لازم باشد، اما نباید کاربران دیگر را دعوت کنید وارد فضای کنار وسیله شوند.', 'You may need a wider position to turn, but must not encourage other road users into the space beside the vehicle.'),
      r(52, 'قسمت عقب وسیله هنگام گردش به بیرون می‌چرخد؛ مراقب عابر، خودرو، تابلو و مبلمان خیابان باشید.', 'The rear of a large vehicle swings outward during a turn; watch pedestrians, vehicles, signs and street furniture.'),
      r(53, 'در میدان، لاین و خروجی را زود انتخاب کنید، به ترافیک از راست راه دهید و هنگام خروج نقاط کور را بررسی کنید.', 'At roundabouts, choose lane and exit early, give way to traffic from the right and check blind spots when leaving.'),
      r(54, 'اگر خروجی تقاطع مسدود است وارد آن نشوید؛ وسیله بلند می‌تواند کل تقاطع را ببندد.', 'Do not enter a junction unless the exit is clear; a long vehicle can block the entire junction.'),
      r(55, 'زیر پل یا محدودیت وزن و طول وارد نشوید مگر مطمئن باشید وسیله و بار شما مجاز است.', 'Do not pass a height, weight or length restriction unless you know the vehicle and load comply.'),
      r(56, 'برای کاربران آسیب‌پذیر زمان و فضای بیشتر بدهید؛ حرکت ناگهانی آنان را پیش‌بینی کنید.', 'Give vulnerable road users extra time and space, and anticipate unexpected movement.'),
    ],
    quiz: [
      q('هنگام گردش چپ بزرگ‌ترین خطر نزدیک چیست؟', 'What is a major nearside danger when turning left?', [['دوچرخه‌سوار در نقطه کور', 'A cyclist in the blind spot'], ['تابلوی پشت سر', 'A sign behind'], ['خودروی روبه‌رو در فاصله دور', 'A distant oncoming car']], 'A', 'پیش از گردش آینه و نقطه کور چپ را دوباره بررسی کنید. // Recheck the nearside mirror and blind spot.', 'medium'),
      q('چرا عقب وسیله در گردش خطر ایجاد می‌کند؟', 'Why can the rear of a large vehicle be dangerous in a turn?', [['به بیرون می‌چرخد', 'It swings outward'], ['همیشه بالا می‌رود', 'It always rises'], ['چراغ‌ها خاموش می‌شوند', 'Lights switch off']], 'A', 'rear swing می‌تواند به اشیا یا افراد برخورد کند. // Rear swing can strike objects or people.', 'medium'),
      q('اگر خروجی تقاطع بسته است چه کنید؟', 'What should you do if the junction exit is blocked?', [['وارد شوید و بوق بزنید', 'Enter and sound the horn'], ['پشت خط منتظر بمانید', 'Wait before the junction'], ['از پیاده‌رو عبور کنید', 'Use the pavement']], 'B', 'تا بازشدن خروجی وارد نشوید. // Do not enter until the exit is clear.', 'medium'),
    ],
  },

  'reversing-manoeuvring': {
    title: 'دنده‌عقب و مانور',
    titleEn: 'Reversing & Manoeuvring',
    rules: [
      r(57, 'تا حد امکان مسیر را طوری برنامه‌ریزی کنید که نیاز به دنده‌عقب کم شود؛ دنده‌عقب همیشه آخرین انتخاب است.', 'Plan routes and sites to minimise reversing; reversing should be the last option.'),
      r(58, 'پیش از مانور پیاده شوید و محل را بررسی کنید: ارتفاع، سطح، عابر، مانع و فضای فرار را ببینید.', 'Before manoeuvring, get out and inspect the area for overhead hazards, surface conditions, people, obstacles and escape space.'),
      r(59, 'از کمک‌راهنمای آموزش‌دیده استفاده کنید و علائم را پیشاپیش توافق کنید؛ اگر او را گم کردید فوراً توقف کنید.', 'Use a trained banksman and agree signals beforehand; stop immediately if you lose sight of them.'),
      r(60, 'آرام حرکت کنید، مرتب همه آینه‌ها و دوربین‌ها را بررسی کنید و آماده توقف فوری باشید.', 'Move slowly, scan all mirrors and cameras repeatedly, and be ready to stop immediately.'),
      r(61, 'هشدار دنده‌عقب و دوربین کمک می‌کنند اما جای مشاهده و کنترل راننده را نمی‌گیرند.', 'Reversing alarms and cameras assist but do not replace the driver’s observations and control.'),
      r(62, 'هنگام دنده‌عقب تریلر، فرمان را با حرکات کوچک اصلاح کنید؛ زاویه زیاد می‌تواند به jack-knife منجر شود.', 'When reversing a trailer, use small steering corrections; excessive angle can cause a jack-knife.'),
      r(63, 'در شیب، وسیله را با ترمز کنترل و پس از توقف ایمن کنید؛ هرگز فقط به دنده متکی نباشید.', 'On a slope, control the vehicle with the brakes and secure it after stopping; never rely on gear alone.'),
      r(64, 'هیچ‌کس نباید میان وسیله در حال مانور و مانع ثابت بایستد؛ منطقه مانور را از افراد خالی نگه دارید.', 'Nobody should stand between a manoeuvring vehicle and a fixed object; keep the manoeuvring area clear.'),
    ],
    quiz: [
      q('اگر کمک‌راهنما را در آینه گم کردید چه کنید؟', 'What should you do if you lose sight of the banksman?', [['ادامه دهید', 'Continue'], ['فوراً توقف کنید', 'Stop immediately'], ['سریع‌تر حرکت کنید', 'Speed up']], 'B', 'تا برقراری دوباره ارتباط توقف کنید. // Stop until communication is restored.', 'medium'),
      q('بهترین کار پیش از دنده‌عقب در محل ناآشنا چیست؟', 'What is best before reversing in an unfamiliar area?', [['پیاده شوید و بررسی کنید', 'Get out and inspect'], ['فقط بوق بزنید', 'Only sound the horn'], ['چراغ‌ها را خاموش کنید', 'Switch off lights']], 'A', 'بررسی پیاده خطرهای پنهان را آشکار می‌کند. // A walkaround reveals hidden hazards.', 'medium'),
      q('آیا دوربین عقب جای آینه‌ها را می‌گیرد؟', 'Does a reversing camera replace mirrors?', [['بله', 'Yes'], ['خیر', 'No'], ['فقط شب', 'Only at night']], 'B', 'همه وسایل کمک فقط مکمل مشاهده راننده‌اند. // Aids only supplement driver observation.', 'easy'),
    ],
  },

  'hazard-awareness': {
    title: 'درک خطر',
    titleEn: 'Hazard Awareness',
    rules: [
      r(65, 'به‌دلیل وزن و اندازه، برای توقف و تغییر مسیر زمان بیشتری لازم دارید؛ جلوتر را نگاه و خطر را زود شناسایی کنید.', 'Because of size and mass, you need more time to stop and change direction; scan well ahead and identify hazards early.'),
      r(66, 'فاصله ایمن را حفظ کنید؛ حداقل قانون دو ثانیه در شرایط خشک فقط نقطه شروع است و وسیله سنگین اغلب فضای بیشتری می‌خواهد.', 'Keep a safe gap; the two-second dry-road rule is only a starting point and a heavy vehicle often needs more space.'),
      r(67, 'نقاط کور بزرگ در جلو، کنارها و عقب را بشناسید و پیش از هر تغییر موقعیت چندبار آینه‌ها را بررسی کنید.', 'Know the large blind areas to the front, sides and rear, and check mirrors repeatedly before changing position.'),
      r(68, 'در نزدیکی مدرسه، ایستگاه اتوبوس، عابر، دوچرخه و موتورسیکلت سرعت را کم و فضای بیشتری ایجاد کنید.', 'Slow down and create more space near schools, bus stops, pedestrians, cyclists and motorcyclists.'),
      r(69, 'نشانه‌های خطر در حال شکل‌گیری را ببینید: توپ در خیابان، در باز خودرو، چرخ جلوی خودرو یا نگاه عابر.', 'Read developing clues such as a ball in the road, an opening car door, a turning front wheel or a pedestrian’s glance.'),
      r(70, 'خستگی واکنش و قضاوت را مختل می‌کند؛ در محل امن توقف و استراحت کنید، نه روی نوشیدنی کافئین‌دار تکیه.', 'Fatigue harms reaction and judgement; stop and rest safely rather than relying on caffeinated drinks.'),
      r(71, 'تلفن، غذا، کاغذبازی و تنظیم دستگاه‌ها حواس‌پرتی‌اند؛ پیش از حرکت همه‌چیز را تنظیم کنید.', 'Phones, food, paperwork and device adjustments are distractions; set everything before moving.'),
      r(72, 'فضای فرار نگه دارید و از رانندگی کنار وسیله دیگر برای مدت طولانی خودداری کنید.', 'Maintain an escape space and avoid driving alongside another vehicle for long periods.'),
    ],
    quiz: [
      q('چرا باید خطر را زودتر شناسایی کنید؟', 'Why must a large-vehicle driver identify hazards early?', [['وسیله برای توقف زمان بیشتری می‌خواهد', 'The vehicle needs longer to stop'], ['بوق ضعیف‌تر است', 'The horn is quieter'], ['چراغ‌ها کوچک‌ترند', 'Lights are smaller']], 'A', 'جرم و اندازه زیاد واکنش زودهنگام را ضروری می‌کند. // Greater size and mass demand early action.', 'medium'),
      q('قانون دو ثانیه در جاده خشک چیست؟', 'What is the two-second rule on a dry road?', [['حداقل نقطه شروع فاصله', 'A minimum starting point for following distance'], ['حداکثر زمان توقف', 'Maximum stopping time'], ['زمان تعویض دنده', 'Gear-change time']], 'A', 'با وسیله سنگین یا شرایط بد فاصله بیشتری لازم است. // More space is needed for heavy vehicles or poor conditions.', 'easy'),
      q('هنگام خستگی بهترین اقدام چیست؟', 'What is the best action when tired?', [['پنجره را باز کنید', 'Open a window'], ['در محل امن توقف و استراحت کنید', 'Stop safely and rest'], ['سرعت را زیاد کنید', 'Increase speed']], 'B', 'راه‌حل واقعی خستگی استراحت است. // Rest is the effective answer to fatigue.', 'easy'),
    ],
  },

  'adverse-weather': {
    title: 'آب‌وهوای نامساعد',
    titleEn: 'Adverse Weather',
    rules: [
      r(73, 'در باران سرعت را کم و حداقل فاصله زمانی را دو برابر کنید؛ آب‌پاشی وسیله بزرگ دید دیگران را نیز کم می‌کند.', 'In rain, reduce speed and at least double the time gap; spray from a large vehicle also reduces others’ visibility.'),
      r(74, 'در یخ و برف فاصله توقف ممکن است تا ده برابر شود؛ بسیار آرام برانید و از فرمان یا ترمز ناگهانی پرهیز کنید.', 'In ice and snow, stopping distances can be up to ten times greater; drive very slowly and avoid sudden steering or braking.'),
      r(75, 'پیش از حرکت برف و یخ روی سقف، چراغ‌ها و شیشه‌ها را پاک کنید تا روی دیگران نریزد.', 'Before setting off, clear snow and ice from the roof, lights and windows so it cannot fall onto others.'),
      r(76, 'در باد شدید، وسیله بلند یا خالی آسیب‌پذیرتر است؛ سرعت را کم و از پل‌ها و محل‌های باز با احتیاط عبور کنید.', 'In strong winds, tall or empty vehicles are more vulnerable; slow down and take extra care on bridges and exposed roads.'),
      r(77, 'در مه از چراغ مناسب استفاده کنید، فاصله را زیاد کنید و به چراغ عقب وسیله جلو وابسته نشوید.', 'In fog, use appropriate lights, increase the gap and do not rely on the rear lights of the vehicle ahead.'),
      r(78, 'اگر آب عمیق است وارد نشوید؛ عمق، جریان و خطر آسیب ترمز یا موتور را ارزیابی کنید.', 'Do not enter deep floodwater; assess depth, current and the risk of brake or engine damage.'),
      r(79, 'پس از عبور از آب، ترمزها را در محل امن و با فشار ملایم آزمایش کنید.', 'After driving through water, test the brakes gently when safe.'),
      r(80, 'گرمای زیاد فشار لاستیک و خطر خرابی را بالا می‌برد؛ توقف‌های بازرسی را رعایت و ترمزها را بیش‌ازحد گرم نکنید.', 'High temperatures increase tyre pressure and failure risk; make inspection stops and avoid overheating brakes.'),
    ],
    quiz: [
      q('فاصله توقف روی یخ ممکن است چند برابر شود؟', 'How much greater can stopping distance be on ice?', [['دو برابر', 'Twice'], ['پنج برابر', 'Five times'], ['تا ده برابر', 'Up to ten times']], 'C', 'روی یخ فاصله توقف ممکن است تا ده برابر شود. // It can be up to ten times greater.', 'hard'),
      q('کدام وسیله در باد شدید آسیب‌پذیرتر است؟', 'Which vehicle is more vulnerable in strong winds?', [['وسیله بلند و خالی', 'A tall empty vehicle'], ['وسیله کوتاه و پر', 'A low fully laden vehicle'], ['خودروی پارک‌شده', 'A parked car']], 'A', 'سطح جانبی بالا و وزن کمتر اثر باد را افزایش می‌دهد. // A large side area and lower mass increase wind effect.', 'medium'),
      q('پس از عبور از آب چه کنید؟', 'What should you do after driving through water?', [['ترمز را در محل امن آزمایش کنید', 'Test brakes safely'], ['فوراً موتور را خاموش کنید', 'Stop engine immediately'], ['سرعت را زیاد کنید', 'Increase speed']], 'A', 'آب می‌تواند کارایی ترمز را کم کند. // Water can reduce braking efficiency.', 'medium'),
    ],
  },

  'fuel-efficiency': {
    title: 'رانندگی کم‌مصرف',
    titleEn: 'Fuel Efficiency',
    rules: [
      r(81, 'مسیر را برنامه‌ریزی و از ازدحام، راه اشتباه و توقف غیرضروری دوری کنید.', 'Plan the route to avoid congestion, wrong turns and unnecessary stops.'),
      r(82, 'با نگاه دوردست سرعت را یکنواخت نگه دارید و به‌جای ترمز و شتاب شدید، زود واکنش نشان دهید.', 'Look well ahead, maintain steady speed and respond early instead of braking and accelerating harshly.'),
      r(83, 'از دنده مناسب استفاده کنید و موتور را بی‌دلیل با دور بالا نرانید؛ توصیه سازنده را رعایت کنید.', 'Use the correct gear and avoid unnecessary high engine speed; follow manufacturer guidance.'),
      r(84, 'فشار درست لاستیک‌ها مصرف، کنترل و عمر لاستیک را بهتر می‌کند.', 'Correct tyre pressures improve fuel economy, handling and tyre life.'),
      r(85, 'بار را درست توزیع کنید و تجهیزات یا بار غیرضروری را حمل نکنید؛ وزن بیشتر مصرف را بالا می‌برد.', 'Distribute loads correctly and do not carry unnecessary equipment or load; extra weight increases consumption.'),
      r(86, 'موتور را هنگام توقف طولانی بی‌دلیل روشن نگذارید، مگر برای ایمنی یا عملکرد ضروری وسیله.', 'Avoid unnecessary idling during long stops unless required for safety or essential vehicle operation.'),
      r(87, 'نقص فنی، فیلتر کثیف و آیرودینامیک ضعیف مصرف و آلایندگی را افزایش می‌دهد؛ وسیله را نگهداری کنید.', 'Mechanical defects, dirty filters and poor aerodynamics raise fuel use and emissions; maintain the vehicle.'),
      r(88, 'ترمز موتور یا ریتاردر را طبق راهنمای سازنده استفاده کنید، اما کنترل نرم و ایمن را بر صرفه‌جویی مقدم بدانید.', 'Use engine braking or a retarder as recommended, but always prioritise smooth, safe control over economy.'),
    ],
    quiz: [
      q('کدام روش معمولاً مصرف را کم می‌کند؟', 'Which method normally reduces fuel use?', [['نگاه دور و سرعت یکنواخت', 'Looking ahead and maintaining steady speed'], ['شتاب شدید', 'Harsh acceleration'], ['فشار کم لاستیک', 'Low tyre pressure']], 'A', 'پیش‌بینی، ترمز و شتاب غیرضروری را کم می‌کند. // Anticipation reduces needless braking and acceleration.', 'medium'),
      q('فشار کم لاستیک چه اثری دارد؟', 'What effect does low tyre pressure have?', [['مصرف را بیشتر می‌کند', 'Increases fuel use'], ['مصرف را کم می‌کند', 'Reduces fuel use'], ['هیچ اثری ندارد', 'Has no effect']], 'A', 'مقاومت غلتشی و مصرف بالا می‌رود. // Rolling resistance and fuel use increase.', 'easy'),
      q('در توقف طولانی چه کنید؟', 'What should you do during a long stop?', [['بی‌دلیل موتور را روشن نگذارید', 'Avoid unnecessary idling'], ['دور موتور را بالا نگه دارید', 'Keep engine speed high'], ['ترمز دستی را آزاد کنید', 'Release parking brake']], 'A', 'خاموش‌کردن ایمن موتور مصرف و آلایندگی را کم می‌کند. // Safely switching off reduces fuel use and emissions.', 'easy'),
    ],
  },

  'breakdowns-emergencies': {
    title: 'خرابی و شرایط اضطراری',
    titleEn: 'Breakdowns & Emergencies',
    rules: [
      r(89, 'در خرابی، تا جای امن دور از جریان ترافیک بروید، چراغ خطر را روشن و ترمز دستی را اعمال کنید.', 'If you break down, move to a safe place away from traffic, switch on hazard lights and apply the parking brake.'),
      r(90, 'در بزرگراه، اگر می‌توانید از خروجی یا محل اضطراری خارج شوید؛ از سمت دور از ترافیک پیاده و پشت حفاظ منتظر بمانید.', 'On a motorway, leave at an exit or emergency area if possible; exit away from traffic and wait behind the barrier.'),
      r(91, 'در لاین زنده توقف کرده‌اید و خروج امن ممکن نیست: کمربند را ببندید، چراغ خطر را روشن و فوراً با ۹۹۹ تماس بگیرید.', 'If stopped in a live lane and you cannot exit safely, keep seat belts on, use hazard lights and call 999 immediately.'),
      r(92, 'مثلث هشدار را روی سواره‌روی بزرگراه نگذارید. در جاده دیگر فقط اگر ایمن است، حداقل ۴۵ متر پشت وسیله قرار دهید.', 'Never place a warning triangle on a motorway carriageway. On other roads, place it at least 45 metres behind only when safe.'),
      r(93, 'در آتش‌سوزی، افراد را دور کنید، با ۹۹۹ تماس بگیرید و فقط اگر آموزش دیده و راه فرار دارید از خاموش‌کننده استفاده کنید.', 'In a fire, move people away, call 999 and use an extinguisher only if trained and you have an escape route.'),
      r(94, 'در تصادف توقف کنید، محل را ایمن کنید، به مصدومان کمک و در صورت نیاز با اورژانس تماس بگیرید؛ جزئیات لازم را مبادله کنید.', 'After a collision, stop, make the scene safe, assist casualties, call emergency services when needed and exchange required details.'),
      r(95, 'مواد خطرناک ریخته‌شده را لمس نکنید؛ اسناد و اطلاعات بار را از فاصله امن به خدمات اضطراری بدهید.', 'Do not touch spilled dangerous goods; provide load documents and information to emergency services from a safe distance.'),
      r(96, 'وسیله یا تریلر خراب را فقط با تجهیزات و روش مجاز بازیابی کنید؛ خطر وزن، ترمز و اتصال را ارزیابی کنید.', 'Recover a disabled vehicle or trailer only with suitable equipment and an authorised method, considering weight, brakes and coupling.'),
    ],
    quiz: [
      q('آیا مثلث هشدار را روی سواره‌روی بزرگراه می‌گذارید؟', 'Should you place a warning triangle on a motorway carriageway?', [['بله', 'Yes'], ['خیر', 'No'], ['فقط شب', 'Only at night']], 'B', 'این کار بسیار خطرناک است. // It is extremely dangerous.', 'easy'),
      q('اگر در لاین زنده گیر کرده و خروج امن ممکن نیست چه کنید؟', 'What should you do if stranded in a live lane and unable to exit safely?', [['پیاده شوید', 'Get out'], ['کمربند بسته و با ۹۹۹ تماس بگیرید', 'Stay belted and call 999'], ['زیر وسیله بروید', 'Go under the vehicle']], 'B', 'داخل بمانید، چراغ خطر و تماس فوری. // Stay inside, use hazards and call immediately.', 'hard'),
      q('با نشت مواد خطرناک چه کنید؟', 'What should you do with a dangerous-goods spill?', [['لمس و بررسی کنید', 'Touch and inspect it'], ['از فاصله امن گزارش دهید', 'Report it from a safe distance'], ['با آب بشویید', 'Wash it away']], 'B', 'از ماده دور بمانید و اطلاعات را به اورژانس بدهید. // Keep away and inform emergency services.', 'hard'),
    ],
  },

  'professional-rules': {
    title: 'قوانین راننده حرفه‌ای',
    titleEn: 'Professional Rules',
    rules: [
      r(97, 'برای رانندگی حرفه‌ای LGV یا PCV معمولاً گواهینامه مناسب و Driver CPC معتبر لازم است، مگر معافیت مشخص اعمال شود.', 'Professional LGV or PCV driving normally requires the correct licence and valid Driver CPC unless a specific exemption applies.'),
      r(98, 'برای حفظ Driver CPC باید در هر دوره پنج‌ساله ۳۵ ساعت آموزش دوره‌ای مناسب انجام دهید.', 'To maintain Driver CPC, complete 35 hours of suitable periodic training in each five-year period.'),
      r(99, 'اگر فقط در بریتانیا رانندگی حرفه‌ای می‌کنید، National یا ترکیبی از National و International CPC ممکن است مناسب باشد؛ برای اروپا International CPC لازم است.', 'For UK-only professional driving, National or mixed National/International CPC training may qualify; driving professionally in Europe requires International CPC.'),
      r(100, 'الکل، مواد مخدر، بعضی داروها و خستگی توان رانندگی را مختل می‌کنند؛ مسئولیت بررسی آمادگی با راننده است.', 'Alcohol, drugs, some medicines and fatigue impair driving; the driver is responsible for being fit to drive.'),
      r(101, 'استفاده دستی از تلفن هنگام رانندگی ممنوع است؛ حتی hands-free اگر حواس‌پرت کند می‌تواند موجب پیگرد شود.', 'Hand-held phone use while driving is illegal; even hands-free use can lead to prosecution if it distracts you.'),
      r(102, 'بهره‌بردار و راننده باید از وسیله ایمن، بار قانونی، ساعات درست و نگهداری اسناد اطمینان حاصل کنند.', 'Operator and driver must ensure roadworthiness, legal loading, hours compliance and proper records.'),
      r(103, 'در PCV، ایمنی و آسایش مسافران را در سوارشدن، حرکت و پیاده‌شدن حفظ کنید و ظرفیت مجاز را تجاوز نکنید.', 'On a PCV, protect passenger safety and comfort while boarding, travelling and alighting, and do not exceed permitted capacity.'),
      r(104, 'با مأموران DVSA و پلیس همکاری کنید؛ ممکن است وسیله، وزن، اسناد و سوابق ساعات را بررسی کنند.', 'Cooperate with DVSA examiners and police, who may inspect the vehicle, weight, documents and hours records.'),
    ],
    quiz: [
      q('Driver CPC دوره‌ای معمولاً چند ساعت در پنج سال است؟', 'How much periodic Driver CPC training is normally required in five years?', [['۷ ساعت', '7 hours'], ['۲۱ ساعت', '21 hours'], ['۳۵ ساعت', '35 hours']], 'C', 'برای حفظ صلاحیت معمولاً ۳۵ ساعت در پنج سال لازم است. // Normally 35 hours every five years.', 'hard'),
      q('برای رانندگی حرفه‌ای در اروپا کدام CPC لازم است؟', 'Which CPC is required for professional driving in Europe?', [['National CPC', 'National CPC'], ['International CPC', 'International CPC'], ['هیچ‌کدام', 'Neither']], 'B', 'National CPC برای رانندگی فقط در بریتانیا است. // National CPC is for UK-only driving.', 'medium'),
      q('چه کسی باید آمادگی جسمی و ذهنی راننده را بررسی کند؟', 'Who must ensure the driver is fit to drive?', [['خود راننده', 'The driver'], ['مسافر', 'A passenger'], ['راننده دیگر', 'Another driver']], 'A', 'راننده مسئول است در حالت نامناسب رانندگی نکند. // The driver must not drive while unfit.', 'easy'),
    ],
  },

  documentation: {
    title: 'مدارک و اسناد',
    titleEn: 'Documentation',
    rules: [
      r(105, 'گواهینامه باید دسته درست وسیله را پوشش دهد: مانند C1، C، C1E، CE برای بار و D1، D، D1E، DE برای مسافر.', 'Your licence must include the correct category, such as C1, C, C1E or CE for goods and D1, D, D1E or DE for passenger vehicles.'),
      r(106, 'در رانندگی حرفه‌ای، کارت Driver CPC یا مدرک معتبر مربوط را همراه داشته باشید، مگر قانوناً معاف باشید.', 'When driving professionally, carry the relevant valid Driver CPC card or evidence unless legally exempt.'),
      r(107, 'کارت راننده تاخوگراف را همراه و فقط خودتان استفاده کنید؛ سوابق لازم روز جاری و دوره مقرر قبلی باید قابل ارائه باشد.', 'Carry and use only your own tachograph driver card, and be able to produce the required current-day and preceding-period records.'),
      r(108, 'وسیله باید بیمه، مالیات و در صورت نیاز MOT/آزمون سالانه معتبر داشته باشد؛ بهره‌بردار نیز باید مجوز مناسب داشته باشد.', 'The vehicle must have valid insurance, tax and, where required, MOT/annual test; the operator must also hold the appropriate licence.'),
      r(109, 'پلاک وزن وزارت یا گواهی plating حدود قانونی وزن وسیله باری بالای ۳۵۰۰ کیلوگرم را نشان می‌دهد.', 'The ministry plate or plating certificate shows legal weight limits for goods vehicles over 3,500 kg.'),
      r(110, 'گزارش بازدید روزانه و عیب‌ها را دقیق تکمیل کنید؛ عیب ایمنی باید پیش از استفاده رفع شود.', 'Complete daily-check and defect reports accurately; safety-critical defects must be rectified before use.'),
      r(111, 'برای سفر بین‌المللی، گذرنامه، مجوزها، بیمه، اسناد گمرکی، بارنامه و الزامات کشور مقصد را پیشاپیش بررسی کنید.', 'For international journeys, check passports, permits, insurance, customs papers, consignment notes and destination-country requirements in advance.'),
      r(112, 'اسناد بار و مسافر را محافظت و اطلاعات را درست نگه دارید؛ هرگز سند را جعل یا اطلاعات نادرست ثبت نکنید.', 'Protect load and passenger documentation and keep records accurate; never falsify documents or entries.'),
    ],
    quiz: [
      q('کدام دسته معمولاً برای کامیون مفصلی بزرگ لازم است؟', 'Which category is normally needed for a large articulated lorry?', [['CE', 'CE'], ['D1', 'D1'], ['B', 'B']], 'A', 'CE وسایل دسته C همراه تریلر را پوشش می‌دهد. // CE covers category C vehicles with a trailer.', 'medium'),
      q('پلاک وزارت چه چیزی را نشان می‌دهد؟', 'What does the ministry plate show?', [['حدود وزن قانونی', 'Legal weight limits'], ['ساعات راننده', 'Driver hours'], ['قیمت بار', 'Load value']], 'A', 'وزن محور، ناخالص و قطار را باید با پلاک تطبیق دهید. // Check axle, gross and train weights against the plate.', 'medium'),
      q('با عیب ایمنی مهم چه کنید؟', 'What should you do with a safety-critical defect?', [['تا هفته بعد صبر کنید', 'Wait until next week'], ['پیش از استفاده رفع شود', 'Have it fixed before use'], ['فقط شفاهی بگویید', 'Only mention it verbally']], 'B', 'وسیله ناایمن نباید استفاده شود. // An unsafe vehicle must not be used.', 'medium'),
    ],
  },
};
