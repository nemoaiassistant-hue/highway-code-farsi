// ===== UK MOTORCYCLE THEORY TEST DATA — FA/EN =====
// Motorcycle-focused revision content based on The Highway Code and DVSA riding guidance.

const CATEGORIES = [
  { id: 'safety-gear', icon: '🪖', title: 'تجهیزات ایمنی', titleEn: 'Safety Gear', count: 8, color: '#ef4444' },
  { id: 'pre-ride-checks', icon: '🔧', title: 'بازرسی پیش از حرکت', titleEn: 'Pre-Ride Checks', count: 8, color: '#f59e0b' },
  { id: 'controls', icon: '🎛️', title: 'کنترل‌های موتورسیکلت', titleEn: 'Motorcycle Controls', count: 8, color: '#8b5cf6' },
  { id: 'riding-position', icon: '🏍️', title: 'حالت و موقعیت سواری', titleEn: 'Riding Position', count: 8, color: '#4361ee' },
  { id: 'junctions', icon: '🔀', title: 'تقاطع‌ها', titleEn: 'Junctions', count: 8, color: '#f97316' },
  { id: 'roundabouts', icon: '🔄', title: 'میدان‌ها', titleEn: 'Roundabouts', count: 8, color: '#14b8a6' },
  { id: 'overtaking', icon: '↗️', title: 'سبقت گرفتن', titleEn: 'Overtaking', count: 8, color: '#ec4899' },
  { id: 'motorways', icon: '🛣️', title: 'بزرگراه‌ها', titleEn: 'Motorways', count: 8, color: '#0ea5e9' },
  { id: 'hazard-awareness', icon: '⚠️', title: 'آگاهی از خطر', titleEn: 'Hazard Awareness', count: 8, color: '#dc2626' },
  { id: 'weather', icon: '🌧️', title: 'آب‌وهوا', titleEn: 'Weather', count: 8, color: '#64748b' },
  { id: 'night-riding', icon: '🌙', title: 'موتورسواری در شب', titleEn: 'Night Riding', count: 8, color: '#6366f1' },
  { id: 'passengers-loads', icon: '🧳', title: 'سرنشین و بار', titleEn: 'Passengers & Loads', count: 8, color: '#22c55e' },
];

const RULES = {
  'safety-gear': {
    title: 'تجهیزات ایمنی',
    titleEn: 'Safety Gear',
    rules: [
      { num: 1, fa: 'در هر سفر، راکب و ترک‌نشین باید کلاه ایمنی تأییدشده بپوشند و بند آن را محکم ببندند؛ تنها استثنای قانونی، پیرو آیین سیک است که عمامه دارد.', en: 'On every journey, the rider and pillion passenger MUST wear an approved, securely fastened helmet. The legal exception is a Sikh follower wearing a turban.', warningFa: 'کلاه باز یا با بند شل، حفاظت لازم را فراهم نمی‌کند.', warningEn: 'An unfastened or loose helmet will not provide proper protection.' },
      { num: 2, fa: 'پیش از هر سفر، پوسته، بند و قفل کلاه را بررسی کنید. پس از ضربه شدید، کلاه را تعویض کنید حتی اگر آسیب بیرونی دیده نشود.', en: 'Before every journey, inspect the helmet shell, strap and fastener. Replace a helmet after a severe impact even if no external damage is visible.' },
      { num: 3, fa: 'شیشه کلاه یا محافظ چشم باید تمیز، سالم و بدون خراش مزاحم باشد. محافظ چشمِ مورد استفاده باید با مقررات مطابقت داشته باشد.', en: 'Your visor or eye protector should be clean, undamaged and free from distracting scratches. Any eye protector used MUST comply with the regulations.' },
      { num: 4, fa: 'کاپشن و شلوار مقاوم با محافظ مناسب، آسیب ناشی از ساییدگی و ضربه را کم می‌کند. لباس باید حرکت شما را محدود نکند.', en: 'Abrasion-resistant jacket and trousers with suitable armour reduce impact and abrasion injuries. Clothing should not restrict movement.' },
      { num: 5, fa: 'دستکش محکم از دست‌ها محافظت می‌کند و در هوای سرد به حفظ کنترل اهرم‌ها کمک می‌کند.', en: 'Strong gloves protect your hands and help you retain control of the levers in cold weather.' },
      { num: 6, fa: 'چکمه محکم و مناسب که قوزک پا را بپوشاند انتخاب کنید. بند کفش یا لباس گشاد نباید به زنجیر یا چرخ گیر کند.', en: 'Choose strong, well-fitting boots that cover the ankles. Loose laces or clothing must not become caught in the chain or wheels.' },
      { num: 7, fa: 'در روز، لباس روشن یا فلورسنت و در تاریکی، نوار یا لباس بازتابنده باعث می‌شود زودتر دیده شوید.', en: 'In daylight, bright or fluorescent clothing helps conspicuity; in darkness, reflective material helps others see you sooner.', tipFa: 'روشن برای روز؛ بازتابنده برای شب.', tipEn: 'Bright for daylight; reflective for darkness.' },
      { num: 8, fa: 'محافظ گوش می‌تواند آسیب ناشی از صدای باد را کاهش دهد، اما نباید آگاهی شما از صداهای مهم ترافیک را مختل کند.', en: 'Hearing protection can reduce wind-noise damage, but it must not prevent awareness of important traffic sounds.' },
    ],
    quiz: [
      { q: 'چه کسی در سفر با موتورسیکلت باید کلاه ایمنی تأییدشده بپوشد؟', qEn: 'Who must wear an approved helmet on a motorcycle journey?', options: [{ letter: 'A', fa: 'فقط راکب', en: 'Only the rider' }, { letter: 'B', fa: 'راکب و ترک‌نشین', en: 'The rider and pillion passenger' }, { letter: 'C', fa: 'فقط افراد زیر ۲۱ سال', en: 'Only people under 21' }], answer: 'B', explanation: 'راکب و ترک‌نشین باید کلاه تأییدشده و محکم‌بسته داشته باشند. // Both rider and pillion must wear an approved, securely fastened helmet.', difficulty: 'easy' },
      { q: 'پس از ضربه شدید به کلاه ایمنی چه باید کرد؟', qEn: 'What should you do after a severe impact to your helmet?', options: [{ letter: 'A', fa: 'فقط آن را تمیز کنید', en: 'Only clean it' }, { letter: 'B', fa: 'آن را تعویض کنید', en: 'Replace it' }, { letter: 'C', fa: 'بند را شل کنید', en: 'Loosen the strap' }], answer: 'B', explanation: 'آسیب داخلی ممکن است دیده نشود؛ کلاه ضربه‌خورده را تعویض کنید. // Internal damage may be invisible; replace an impacted helmet.', difficulty: 'medium' },
      { q: 'کدام پوشش در تاریکی بیشتر به دیده‌شدن کمک می‌کند؟', qEn: 'Which clothing most improves visibility in darkness?', options: [{ letter: 'A', fa: 'لباس بازتابنده', en: 'Reflective clothing' }, { letter: 'B', fa: 'لباس کاملاً مشکی', en: 'All-black clothing' }, { letter: 'C', fa: 'لباس گشاد', en: 'Loose clothing' }], answer: 'A', explanation: 'مواد بازتابنده نور چراغ خودروها را بازمی‌گردانند. // Reflective material returns vehicle headlamp light.', difficulty: 'easy' },
      { q: 'چرا چکمه باید قوزک پا را بپوشاند؟', qEn: 'Why should motorcycle boots cover the ankles?', options: [{ letter: 'A', fa: 'برای محافظت بیشتر', en: 'For greater protection' }, { letter: 'B', fa: 'برای افزایش سرعت', en: 'To increase speed' }, { letter: 'C', fa: 'برای کاهش مصرف سوخت', en: 'To reduce fuel use' }], answer: 'A', explanation: 'چکمه محکم از پا و قوزک در برخورد و لغزش محافظت می‌کند. // Strong boots protect feet and ankles in impacts and slides.', difficulty: 'medium' },
    ],
  },

  'pre-ride-checks': {
    title: 'بازرسی پیش از حرکت',
    titleEn: 'Pre-Ride Checks',
    rules: [
      { num: 9, fa: 'فشار باد لاستیک‌ها را در حالت سرد با مقدار توصیه‌شده سازنده تنظیم کنید؛ فشار نامناسب بر فرمان‌پذیری و ترمز اثر می‌گذارد.', en: 'Check tyre pressures when cold and set them to the manufacturer’s recommendation; incorrect pressure affects handling and braking.' },
      { num: 10, fa: 'لاستیک‌ها را از نظر بریدگی، برآمدگی، جسم خارجی و عمق آج بررسی کنید. برای موتورسیکلت بالای ۵۰ سی‌سی، حداقل آج قانونی ۱ میلی‌متر در سه‌چهارم میانی پهناست.', en: 'Check tyres for cuts, bulges, embedded objects and tread. For motorcycles over 50cc, the legal minimum is 1 mm across the central three-quarters of the tread.', warningFa: 'برای موپد، نقش آج باید در سراسر سطح قابل مشاهده باشد.', warningEn: 'For a moped, the tread pattern must remain visible across the tyre.' },
      { num: 11, fa: 'ترمز جلو و عقب را جداگانه آزمایش کنید. اهرم یا پدال نباید اسفنجی باشد و ترمز نباید گیر کند.', en: 'Test front and rear brakes separately. The lever or pedal should not feel spongy and the brakes must not bind.' },
      { num: 12, fa: 'چراغ جلو، چراغ عقب، چراغ ترمز، راهنماها، بوق و بازتابنده‌ها را بررسی کنید و آن‌ها را تمیز نگه دارید.', en: 'Check the headlamp, rear lamp, brake light, indicators, horn and reflectors, and keep them clean.' },
      { num: 13, fa: 'کشش و روغن‌کاری زنجیر را طبق دفترچه سازنده بررسی کنید. زنجیر بیش از حد شل، سفت یا خشک خطرناک است.', en: 'Check chain tension and lubrication against the manufacturer’s handbook. A chain that is too loose, tight or dry is dangerous.' },
      { num: 14, fa: 'سطح روغن، سوخت، مایع خنک‌کننده و مایع ترمز را بررسی و هرگونه نشتی زیر موتورسیکلت را بررسی کنید.', en: 'Check oil, fuel, coolant and brake-fluid levels and investigate any leak beneath the motorcycle.' },
      { num: 15, fa: 'فرمان باید آزادانه حرکت کند؛ کابل‌ها، اهرم‌ها و دریچه گاز باید نرم کار کنند و گاز پس از رهاشدن برگردد.', en: 'Steering should move freely; cables, levers and throttle should operate smoothly, and the throttle should return when released.' },
      { num: 16, fa: 'آینه‌ها را تمیز و برای دید مناسب تنظیم کنید. پلاک، بست‌های بار و پایه‌های موتورسیکلت را نیز کنترل کنید.', en: 'Clean and adjust mirrors for a useful view. Also check the number plate, load fastenings and motorcycle stands.' },
    ],
    quiz: [
      { q: 'فشار باد لاستیک را چه زمانی بهتر است بررسی کنید؟', qEn: 'When is it best to check tyre pressure?', options: [{ letter: 'A', fa: 'وقتی لاستیک سرد است', en: 'When the tyre is cold' }, { letter: 'B', fa: 'پس از سواری سریع', en: 'After a fast ride' }, { letter: 'C', fa: 'فقط هنگام پنچری', en: 'Only after a puncture' }], answer: 'A', explanation: 'مقدار توصیه‌شده سازنده معمولاً برای لاستیک سرد است. // Manufacturer pressure figures normally apply to cold tyres.', difficulty: 'medium' },
      { q: 'حداقل قانونی آج موتورسیکلت بالای ۵۰ سی‌سی چقدر است؟', qEn: 'What is the legal minimum tread for a motorcycle over 50cc?', options: [{ letter: 'A', fa: '۱ میلی‌متر در سه‌چهارم میانی', en: '1 mm across the central three-quarters' }, { letter: 'B', fa: '۱٫۶ میلی‌متر در تمام پهنا', en: '1.6 mm across the full width' }, { letter: 'C', fa: '۳ میلی‌متر فقط در مرکز', en: '3 mm only in the centre' }], answer: 'A', explanation: 'حداقل قانونی ۱ میلی‌متر در سه‌چهارم میانی آج است. // The legal minimum is 1 mm across the central three-quarters.', difficulty: 'hard' },
      { q: 'دریچه گاز سالم پس از رهاشدن باید چه کند؟', qEn: 'What should a sound throttle do when released?', options: [{ letter: 'A', fa: 'باز بماند', en: 'Stay open' }, { letter: 'B', fa: 'به حالت بسته برگردد', en: 'Return closed' }, { letter: 'C', fa: 'فرمان را قفل کند', en: 'Lock the steering' }], answer: 'B', explanation: 'گاز باید نرم کار کند و با رهاشدن به حالت بسته برگردد. // The throttle should operate smoothly and return closed.', difficulty: 'medium' },
      { q: 'کدام مورد باید پیش از حرکت آزمایش شود؟', qEn: 'Which item should be tested before setting off?', options: [{ letter: 'A', fa: 'ترمز جلو و عقب', en: 'Front and rear brakes' }, { letter: 'B', fa: 'فقط کیلومترشمار', en: 'Only the speedometer' }, { letter: 'C', fa: 'فقط گرم‌کن دست', en: 'Only heated grips' }], answer: 'A', explanation: 'هر دو ترمز باید جداگانه بررسی شوند. // Both brakes should be checked separately.', difficulty: 'easy' },
    ],
  },

  controls: {
    title: 'کنترل‌های موتورسیکلت',
    titleEn: 'Motorcycle Controls',
    rules: [
      { num: 17, fa: 'پیش از حرکت، محل و عملکرد همه کنترل‌ها را بشناسید؛ چیدمان بعضی موتورسیکلت‌ها متفاوت است.', en: 'Before riding, know the location and operation of every control; layouts can differ between motorcycles.' },
      { num: 18, fa: 'گاز را نرم باز و بسته کنید. تغییر ناگهانی گاز، به‌ویژه در پیچ یا سطح لغزنده، می‌تواند تعادل و چسبندگی را برهم بزند.', en: 'Open and close the throttle smoothly. Sudden throttle changes, especially while cornering or on slippery surfaces, can upset balance and grip.' },
      { num: 19, fa: 'برای ترمزگیری مؤثر، معمولاً هر دو ترمز را نرم و تدریجی به‌کار ببرید؛ ترمز جلو بیشترین نیروی توقف را فراهم می‌کند.', en: 'For effective braking, normally use both brakes smoothly and progressively; the front brake provides most stopping power.' },
      { num: 20, fa: 'در پیچ، پیش از خم‌شدن سرعت و دنده مناسب را انتخاب کنید. ترمز شدید یا تعویض دنده ناگهانی در پیچ می‌تواند باعث لغزش شود.', en: 'Before leaning into a bend, select the correct speed and gear. Harsh braking or sudden gear changes in a bend can cause a skid.' },
      { num: 21, fa: 'کلاچ را نرم رها کنید و نقطه درگیری آن را بشناسید. نیم‌کلاچ طولانی باعث فرسودگی و کنترل ضعیف می‌شود.', en: 'Release the clutch smoothly and know its biting point. Prolonged clutch slipping causes wear and poor control.' },
      { num: 22, fa: 'هنگام تعویض دنده، سرعت، گاز و دنده را هماهنگ کنید تا موتورسیکلت تکان ناگهانی نخورد.', en: 'Coordinate road speed, throttle and gear changes so the motorcycle does not jerk suddenly.' },
      { num: 23, fa: 'با فشار ملایم روی فرمان در جهت موردنظر، موتورسیکلت را هدایت کنید و نگاهتان را به مسیر خروجی ببرید.', en: 'Steer with gentle handlebar input in the intended direction and look towards your path of travel.' },
      { num: 24, fa: 'ترمز ضدقفل احتمال قفل‌شدن چرخ را کم می‌کند، اما جایگزین فاصله ایمن و ترمزگیری برنامه‌ریزی‌شده نیست.', en: 'ABS reduces the chance of wheel lock, but it does not replace safe following distances or planned braking.' },
    ],
    quiz: [
      { q: 'برای توقف معمول و مؤثر چه روشی مناسب است؟', qEn: 'What is the normal effective braking method?', options: [{ letter: 'A', fa: 'استفاده نرم و تدریجی از هر دو ترمز', en: 'Use both brakes smoothly and progressively' }, { letter: 'B', fa: 'فقط ترمز عقب', en: 'Rear brake only' }, { letter: 'C', fa: 'خاموش‌کردن موتور', en: 'Switch off the engine' }], answer: 'A', explanation: 'هر دو ترمز را نرم و تدریجی به‌کار ببرید. // Use both brakes smoothly and progressively.', difficulty: 'medium' },
      { q: 'چه زمانی باید سرعت و دنده مناسب پیچ را انتخاب کنید؟', qEn: 'When should you select the correct speed and gear for a bend?', options: [{ letter: 'A', fa: 'پیش از ورود به پیچ', en: 'Before entering the bend' }, { letter: 'B', fa: 'در وسط پیچ', en: 'Halfway through the bend' }, { letter: 'C', fa: 'پس از خروج', en: 'After leaving it' }], answer: 'A', explanation: 'تنظیم سرعت و دنده پیش از خم‌شدن، پایداری را حفظ می‌کند. // Set speed and gear before leaning to preserve stability.', difficulty: 'hard' },
      { q: 'ABS چه کاری انجام می‌دهد؟', qEn: 'What does ABS do?', options: [{ letter: 'A', fa: 'احتمال قفل‌شدن چرخ را کم می‌کند', en: 'Reduces the chance of wheel lock' }, { letter: 'B', fa: 'همیشه فاصله توقف را نصف می‌کند', en: 'Always halves stopping distance' }, { letter: 'C', fa: 'نیاز به فاصله ایمن را حذف می‌کند', en: 'Removes the need for a safe gap' }], answer: 'A', explanation: 'ABS به جلوگیری از قفل چرخ کمک می‌کند، اما قوانین ایمنی همچنان لازم‌اند. // ABS helps prevent wheel lock, but normal safety margins remain essential.', difficulty: 'easy' },
      { q: 'تغییر ناگهانی گاز در سطح لغزنده چه خطری دارد؟', qEn: 'What can sudden throttle changes cause on a slippery surface?', options: [{ letter: 'A', fa: 'از دست‌رفتن چسبندگی', en: 'Loss of grip' }, { letter: 'B', fa: 'بهبود دید', en: 'Improved visibility' }, { letter: 'C', fa: 'کاهش باد جانبی', en: 'Reduced crosswind' }], answer: 'A', explanation: 'ورودی ناگهانی می‌تواند تعادل و چسبندگی را برهم بزند. // Abrupt input can upset balance and grip.', difficulty: 'medium' },
    ],
  },

  'riding-position': {
    title: 'حالت و موقعیت سواری',
    titleEn: 'Riding Position',
    rules: [
      { num: 25, fa: 'آرام و متعادل بنشینید، بازوها کمی خم و دست‌ها سبک روی فرمان باشند. فشار زیاد روی فرمان کنترل را ضعیف می‌کند.', en: 'Sit relaxed and balanced, with slightly bent arms and a light grip on the handlebars. Excess pressure on the bars reduces control.' },
      { num: 26, fa: 'پاها را هنگام حرکت روی جاپایی نگه دارید و زانوها را نزدیک باک قرار دهید؛ پا را بی‌دلیل روی زمین نکشید.', en: 'Keep your feet on the footrests while moving and your knees near the tank; do not trail a foot unnecessarily.' },
      { num: 27, fa: 'به جایی که می‌خواهید بروید نگاه کنید، نه به خطری که می‌خواهید از آن دوری کنید. نگاه دورتر، برنامه‌ریزی را بهتر می‌کند.', en: 'Look where you want to go, not at the hazard you want to avoid. Looking well ahead improves planning.' },
      { num: 28, fa: 'موقعیتی انتخاب کنید که دید خوبی بدهد و شما را در دید دیگران قرار دهد، اما از چاله، آلودگی و مرکز لغزنده خط دور نگه دارد.', en: 'Choose a road position that gives a good view and helps others see you, while avoiding potholes, debris and slippery contamination.' },
      { num: 29, fa: 'در نقطه کور خودروها نمانید. اگر چهره راننده را در آینه‌اش نمی‌بینید، ممکن است او نیز شما را نبیند.', en: 'Do not remain in another vehicle’s blind spot. If you cannot see the driver’s face in their mirror, they may not see you.' },
      { num: 30, fa: 'حداقل فاصله دوثانیه‌ای با وسیله جلو حفظ کنید؛ در جاده خیس دست‌کم آن را دو برابر و روی یخ بسیار بیشتر کنید.', en: 'Keep at least a two-second following gap; double it in wet conditions and allow much more on ice.', tipFa: 'فقط یک احمق قانون دو ثانیه را می‌شکند.', tipEn: 'Only a fool breaks the two-second rule.' },
      { num: 31, fa: 'در صف ترافیک طوری قرار بگیرید که راننده جلویی شما را در آینه ببیند و راه فرار احتمالی داشته باشید.', en: 'In queued traffic, position so the driver ahead can see you in their mirror and leave yourself a possible escape route.' },
      { num: 32, fa: 'در پیچ‌ها برای دید بهتر از موقعیت مناسب استفاده کنید، اما هرگز از خط وسط عبور نکنید یا وارد مسیر ترافیک روبه‌رو نشوید.', en: 'Use an appropriate position for a better view through bends, but never cross the centre line or enter oncoming traffic.' },
    ],
    quiz: [
      { q: 'در شرایط خشک، حداقل فاصله زمانی معمول با وسیله جلو چقدر است؟', qEn: 'In dry conditions, what is the normal minimum following gap?', options: [{ letter: 'A', fa: 'یک ثانیه', en: 'One second' }, { letter: 'B', fa: 'دو ثانیه', en: 'Two seconds' }, { letter: 'C', fa: 'ده ثانیه', en: 'Ten seconds' }], answer: 'B', explanation: 'در جاده خشک حداقل دو ثانیه فاصله نگه دارید. // Keep at least a two-second gap on a dry road.', difficulty: 'easy' },
      { q: 'در جاده خیس با فاصله دوثانیه‌ای چه باید کرد؟', qEn: 'What should you do with the two-second gap on a wet road?', options: [{ letter: 'A', fa: 'آن را نصف کنید', en: 'Halve it' }, { letter: 'B', fa: 'آن را دست‌کم دو برابر کنید', en: 'At least double it' }, { letter: 'C', fa: 'تغییری ندهید', en: 'Leave it unchanged' }], answer: 'B', explanation: 'در جاده خیس فاصله توقف بیشتر است؛ فاصله را دست‌کم دو برابر کنید. // Wet roads increase stopping distance; at least double the gap.', difficulty: 'medium' },
      { q: 'کجا نباید برای مدت طولانی حرکت کنید؟', qEn: 'Where should you avoid riding for long?', options: [{ letter: 'A', fa: 'در نقطه کور خودرو', en: 'In a vehicle’s blind spot' }, { letter: 'B', fa: 'جایی که راننده شما را می‌بیند', en: 'Where the driver can see you' }, { letter: 'C', fa: 'با فاصله ایمن', en: 'At a safe distance' }], answer: 'A', explanation: 'از نقطه کور خارج شوید تا دیده شوید. // Move out of blind spots so you can be seen.', difficulty: 'medium' },
      { q: 'هنگام عبور از پیچ به کجا نگاه کنید؟', qEn: 'Where should you look when riding through a bend?', options: [{ letter: 'A', fa: 'به مسیر خروجی', en: 'Towards the exit path' }, { letter: 'B', fa: 'فقط به چرخ جلو', en: 'Only at the front wheel' }, { letter: 'C', fa: 'به کنار جاده', en: 'At the roadside' }], answer: 'A', explanation: 'نگاهتان را به مسیر موردنظر ببرید. // Look towards your intended path.', difficulty: 'medium' },
    ],
  },

  junctions: {
    title: 'تقاطع‌ها',
    titleEn: 'Junctions',
    rules: [
      { num: 33, fa: 'زودتر آینه‌ها را بررسی، موقعیت و سرعت را تنظیم و در صورت نیاز علامت دهید. پیش از ورود، دوباره اطراف و نقطه کور را نگاه کنید.', en: 'Check mirrors early, adjust position and speed, and signal when needed. Before entering, look again around you and into blind spots.' },
      { num: 34, fa: 'در خط توقفِ تابلوی STOP باید کاملاً متوقف شوید. در خط Give Way باید به ترافیک جاده اصلی راه بدهید.', en: 'At a STOP sign you MUST stop completely at the stop line. At a Give Way line you MUST give way to traffic on the main road.' },
      { num: 35, fa: 'فرض نکنید راننده‌ای که به شما نگاه می‌کند شما را دیده یا سرعتتان را درست سنجیده است؛ برای توقف آماده باشید.', en: 'Do not assume a driver looking towards you has seen you or judged your speed correctly; be ready to stop.' },
      { num: 36, fa: 'در تقاطع‌هایی با دید محدود، آهسته جلو بروید تا دید پیدا کنید، بدون آنکه مسیر دیگران را مسدود کنید.', en: 'At junctions with restricted visibility, edge forward slowly until you can see, without obstructing other traffic.' },
      { num: 37, fa: 'هنگام پیچیدن به جاده فرعی، به عابرانی که در حال عبور یا منتظر عبورند راه بدهید و مسیر دوچرخه‌سواران را قطع نکنید.', en: 'When turning into a side road, give way to pedestrians crossing or waiting to cross, and do not cut across cyclists going ahead.' },
      { num: 38, fa: 'پیش از گردش راست، ترافیک روبه‌رو، موتورسواران، دوچرخه‌سواران و فاصله مناسب را بررسی کنید؛ مسیر را قطع نکنید.', en: 'Before turning right, check oncoming traffic, motorcyclists, cyclists and the available gap; do not cut across their path.' },
      { num: 39, fa: 'کنار خودروهای بزرگ در تقاطع قرار نگیرید؛ ممکن است برای پیچیدن به فضای زیادی نیاز داشته باشند و شما را نبینند.', en: 'Do not position alongside large vehicles at junctions; they may need extra turning room and may not see you.' },
      { num: 40, fa: 'در تقاطع‌های جعبه زرد وارد نشوید مگر اینکه خروجی شما باز باشد؛ برای گردش راست، استثنای محدود قانونی وجود دارد.', en: 'Do not enter a yellow box junction unless your exit is clear; there is a limited legal exception when turning right.' },
    ],
    quiz: [
      { q: 'در تابلوی STOP چه کاری الزامی است؟', qEn: 'What is compulsory at a STOP sign?', options: [{ letter: 'A', fa: 'کاهش سرعت کافی است', en: 'Slowing is enough' }, { letter: 'B', fa: 'توقف کامل در خط', en: 'Stop completely at the line' }, { letter: 'C', fa: 'فقط بوق بزنید', en: 'Only sound the horn' }], answer: 'B', explanation: 'در تابلوی STOP باید کاملاً متوقف شوید. // You MUST stop completely at a STOP sign.', difficulty: 'easy' },
      { q: 'راننده‌ای در تقاطع به سمت شما نگاه می‌کند. چه فرضی درست است؟', qEn: 'A driver at a junction looks towards you. What should you assume?', options: [{ letter: 'A', fa: 'حتماً شما را دیده است', en: 'They have definitely seen you' }, { letter: 'B', fa: 'ممکن است شما را ندیده باشد', en: 'They may not have seen you' }, { letter: 'C', fa: 'حتماً به شما راه می‌دهد', en: 'They will definitely give way' }], answer: 'B', explanation: 'تماس چشمی تضمین دیده‌شدن یا سنجش درست سرعت نیست. // Eye contact does not guarantee you were seen or your speed judged correctly.', difficulty: 'medium' },
      { q: 'هنگام پیچیدن به جاده فرعی باید به چه کسی راه بدهید؟', qEn: 'When turning into a side road, who should you give way to?', options: [{ letter: 'A', fa: 'عابران در حال عبور یا منتظر عبور', en: 'Pedestrians crossing or waiting to cross' }, { letter: 'B', fa: 'هیچ‌کس', en: 'Nobody' }, { letter: 'C', fa: 'فقط خودروهای پشت سر', en: 'Only vehicles behind' }], answer: 'A', explanation: 'هنگام گردش به جاده فرعی، به عابران راه بدهید. // Give way to pedestrians when turning into a side road.', difficulty: 'medium' },
      { q: 'چرا نباید کنار کامیونِ در حال پیچیدن قرار بگیرید؟', qEn: 'Why should you avoid being alongside a turning lorry?', options: [{ letter: 'A', fa: 'ممکن است شما را نبیند و فضای زیادی بخواهد', en: 'It may not see you and may need extra room' }, { letter: 'B', fa: 'همیشه سریع‌تر است', en: 'It is always faster' }, { letter: 'C', fa: 'چراغ راهنما ندارد', en: 'It has no indicators' }], answer: 'A', explanation: 'خودروهای بزرگ نقطه کور دارند و برای گردش فضای بیشتری می‌خواهند. // Large vehicles have blind spots and need more turning room.', difficulty: 'hard' },
    ],
  },

  roundabouts: {
    title: 'میدان‌ها',
    titleEn: 'Roundabouts',
    rules: [
      { num: 41, fa: 'در میدان معمولی، به ترافیکی که از سمت راست نزدیک می‌شود راه بدهید، مگر تابلو، چراغ یا خط‌کشی دستور دیگری بدهد.', en: 'At a normal roundabout, give priority to traffic approaching from the right unless signs, signals or markings direct otherwise.' },
      { num: 42, fa: 'سرعت را زود کم کنید، خط مناسب را از روی تابلو و خط‌کشی انتخاب کنید و مراقب سطح لغزنده نزدیک ورودی باشید.', en: 'Reduce speed early, select the correct lane using signs and markings, and watch for slippery surfaces near the approach.' },
      { num: 43, fa: 'برای خروج اول، معمولاً علامت چپ بدهید و در خط چپ نزدیک شوید، مگر علائم خلاف آن را نشان دهند.', en: 'For the first exit, normally signal left and approach in the left lane unless signs or markings say otherwise.' },
      { num: 44, fa: 'برای خروج سمت راست، معمولاً علامت راست بدهید و در خط راست نزدیک شوید؛ پس از گذشتن از خروجی پیش از مقصد، علامت چپ بدهید.', en: 'For an exit to the right, normally signal right and approach in the right lane; signal left after passing the exit before yours.' },
      { num: 45, fa: 'برای خروج میانی، خط مناسب را انتخاب کنید و معمولاً هنگام نزدیک‌شدن علامت ندهید؛ پیش از خروج، علامت چپ بدهید.', en: 'For an intermediate exit, use the appropriate lane and normally do not signal on approach; signal left before leaving.' },
      { num: 46, fa: 'در میدان مراقب خودروهایی باشید که بدون علامت خط عوض می‌کنند یا مستقیم از مسیر شما عبور می‌کنند. فضای فرار نگه دارید.', en: 'On a roundabout, watch for vehicles changing lanes without signalling or cutting across your path. Preserve an escape space.' },
      { num: 47, fa: 'در مینی‌میدان باید از دور علامت مرکزی عبور کنید؛ از روی علامت رنگ‌شده نرانید مگر اندازه وسیله این کار را اجتناب‌ناپذیر کند.', en: 'At a mini-roundabout you MUST pass around the central marking; do not drive over it unless your vehicle size makes this unavoidable.' },
      { num: 48, fa: 'هنگام خروج، آینه و نقطه کور چپ را بررسی کنید تا دوچرخه‌سوار یا موتورسوار دیگری در کنار شما نباشد.', en: 'Before leaving, check the left mirror and blind spot for a cyclist or another motorcyclist alongside.' },
    ],
    quiz: [
      { q: 'در میدان معمولی معمولاً به ترافیک کدام سمت راه می‌دهید؟', qEn: 'At a normal roundabout, which traffic normally has priority?', options: [{ letter: 'A', fa: 'ترافیک نزدیک‌شونده از راست', en: 'Traffic approaching from the right' }, { letter: 'B', fa: 'ترافیک پشت سر', en: 'Traffic behind' }, { letter: 'C', fa: 'ترافیک از چپ', en: 'Traffic from the left' }], answer: 'A', explanation: 'مگر علائم خلاف آن را بگویند، به ترافیک سمت راست راه بدهید. // Unless directed otherwise, give priority to traffic from the right.', difficulty: 'easy' },
      { q: 'برای خروج اول از میدان معمولاً چه علامتی می‌دهید؟', qEn: 'What signal do you normally give for the first exit?', options: [{ letter: 'A', fa: 'چپ', en: 'Left' }, { letter: 'B', fa: 'راست', en: 'Right' }, { letter: 'C', fa: 'چراغ خطر', en: 'Hazard lights' }], answer: 'A', explanation: 'برای خروج اول معمولاً از نزدیک‌شدن علامت چپ بدهید. // Normally signal left on approach for the first exit.', difficulty: 'easy' },
      { q: 'در مینی‌میدان با علامت مرکزی چه باید کرد؟', qEn: 'What must you do at a mini-roundabout central marking?', options: [{ letter: 'A', fa: 'از دور آن عبور کنید', en: 'Pass around it' }, { letter: 'B', fa: 'همیشه از روی آن بروید', en: 'Always ride over it' }, { letter: 'C', fa: 'روی آن توقف کنید', en: 'Stop on it' }], answer: 'A', explanation: 'باید از دور علامت مرکزی عبور کنید، مگر اندازه وسیله مانع شود. // You MUST pass around it unless vehicle size makes that unavoidable.', difficulty: 'hard' },
      { q: 'پیش از خروج از میدان چه نقطه‌ای را باید بررسی کنید؟', qEn: 'What should you check before leaving a roundabout?', options: [{ letter: 'A', fa: 'آینه و نقطه کور چپ', en: 'Left mirror and blind spot' }, { letter: 'B', fa: 'فقط کیلومترشمار', en: 'Only the speedometer' }, { letter: 'C', fa: 'فقط آینه راست', en: 'Only the right mirror' }], answer: 'A', explanation: 'ممکن است کاربر آسیب‌پذیری در سمت چپ شما باشد. // A vulnerable road user may be alongside on your left.', difficulty: 'medium' },
    ],
  },

  overtaking: {
    title: 'سبقت گرفتن',
    titleEn: 'Overtaking',
    rules: [
      { num: 49, fa: 'فقط وقتی سبقت بگیرید که قانونی، ضروری و کاملاً ایمن باشد و بتوانید بدون وادارکردن دیگران به تغییر سرعت یا مسیر بازگردید.', en: 'Overtake only when it is legal, necessary and completely safe, and when you can return without making others change speed or direction.' },
      { num: 50, fa: 'پیش از سبقت، آینه‌ها، نقطه کور، مسیر روبه‌رو، تقاطع‌ها و فاصله بازگشت را بررسی کنید؛ سپس در صورت نیاز علامت دهید.', en: 'Before overtaking, check mirrors, blind spot, the road ahead, junctions and your return gap; then signal if needed.' },
      { num: 51, fa: 'از خط سفید ممتدِ نزدیک خود عبور نکنید، مگر در استثناهای محدود قانون و وقتی ایمن باشد.', en: 'You MUST NOT cross or straddle a solid white line nearest you, except in limited legal circumstances and when safe.' },
      { num: 52, fa: 'نزدیک پیچ، قله تپه، تقاطع، گذرگاه عابر، محل باریک‌شدن جاده یا هرجا دید کافی ندارید سبقت نگیرید.', en: 'Do not overtake near bends, brows of hills, junctions, pedestrian crossings, road narrowings or anywhere visibility is inadequate.' },
      { num: 53, fa: 'هنگام سبقت از دوچرخه‌سوار، در سرعت تا ۳۰ مایل بر ساعت دست‌کم ۱٫۵ متر فاصله بدهید و در سرعت بالاتر فاصله بیشتری بگذارید.', en: 'When overtaking a cyclist, leave at least 1.5 metres at speeds up to 30 mph and allow more space at higher speeds.' },
      { num: 54, fa: 'از اسب‌سوار با سرعت کمتر از ۱۰ مایل بر ساعت و دست‌کم ۲ متر فاصله عبور کنید؛ موتور را گاز ندهید و صدای ناگهانی ایجاد نکنید.', en: 'Pass horse riders at under 10 mph and allow at least 2 metres of space; do not rev the engine or make sudden noise.' },
      { num: 55, fa: 'فیلترکردن میان ترافیک کند مجاز است، اما سرعت را پایین نگه دارید و مراقب عابر، درهای خودرو، تغییر خط و تقاطع باشید.', en: 'Filtering through slow-moving traffic is permitted, but keep speed low and watch for pedestrians, opening doors, lane changes and junctions.' },
      { num: 56, fa: 'پس از سبقت، خیلی زود جلوی وسیله دیگر نپیچید. وقتی آن را در آینه می‌بینید و فاصله کافی دارید، نرم به چپ برگردید.', en: 'After overtaking, do not cut in too soon. Return smoothly to the left when you can see the vehicle in your mirror and have enough space.' },
    ],
    quiz: [
      { q: 'در سرعت تا ۳۰ مایل بر ساعت، حداقل فاصله توصیه‌شده هنگام سبقت از دوچرخه‌سوار چقدر است؟', qEn: 'At up to 30 mph, what minimum space should you leave when overtaking a cyclist?', options: [{ letter: 'A', fa: '۰٫۵ متر', en: '0.5 metre' }, { letter: 'B', fa: '۱٫۵ متر', en: '1.5 metres' }, { letter: 'C', fa: '۵ متر', en: '5 metres' }], answer: 'B', explanation: 'دست‌کم ۱٫۵ متر در سرعت تا ۳۰ mph و در سرعت بیشتر، فضای بیشتر. // At least 1.5 metres up to 30 mph, and more at higher speeds.', difficulty: 'hard' },
      { q: 'هنگام عبور از اسب‌سوار چه سرعتی مناسب است؟', qEn: 'At what speed should you pass a horse rider?', options: [{ letter: 'A', fa: 'کمتر از ۱۰ مایل بر ساعت', en: 'Under 10 mph' }, { letter: 'B', fa: '۳۰ مایل بر ساعت', en: '30 mph' }, { letter: 'C', fa: 'حداکثر سرعت جاده', en: 'The road speed limit' }], answer: 'A', explanation: 'با سرعت کمتر از ۱۰ mph و حداقل ۲ متر فاصله عبور کنید. // Pass at under 10 mph with at least 2 metres of space.', difficulty: 'hard' },
      { q: 'هنگام فیلترکردن در صف ترافیک چه خطری مهم است؟', qEn: 'What is an important hazard when filtering through traffic?', options: [{ letter: 'A', fa: 'عابرانی که بین خودروها عبور می‌کنند', en: 'Pedestrians crossing between vehicles' }, { letter: 'B', fa: 'فقط باد پشت سر', en: 'Only a tailwind' }, { letter: 'C', fa: 'نبود چراغ خیابان در روز', en: 'No street lights in daylight' }], answer: 'A', explanation: 'عابر، در خودرو و تغییر خط ناگهانی از خطرهای اصلی فیلترکردن‌اند. // Pedestrians, opening doors and sudden lane changes are key filtering hazards.', difficulty: 'medium' },
      { q: 'چه زمانی باید پس از سبقت به چپ برگردید؟', qEn: 'When should you return left after overtaking?', options: [{ letter: 'A', fa: 'وقتی فاصله کافی دارید و وسیله را در آینه می‌بینید', en: 'When there is enough space and you can see it in your mirror' }, { letter: 'B', fa: 'بلافاصله کنار آن', en: 'Immediately alongside it' }, { letter: 'C', fa: 'بدون بررسی آینه', en: 'Without checking mirrors' }], answer: 'A', explanation: 'خیلی زود جلوی وسیله دیگر نپیچید. // Do not cut in too soon.', difficulty: 'medium' },
    ],
  },

  motorways: {
    title: 'بزرگراه‌ها',
    titleEn: 'Motorways',
    rules: [
      { num: 57, fa: 'دارنده گواهینامه موقت موتورسیکلت اجازه ورود به بزرگراه را ندارد. فقط راکب دارای گواهینامه کامل می‌تواند وارد شود.', en: 'A provisional motorcycle licence holder MUST NOT use a motorway. Only a rider with a full licence may enter.' },
      { num: 58, fa: 'از رمپ ورودی برای تطبیق ایمن سرعت استفاده کنید و به ترافیکِ داخل بزرگراه راه بدهید؛ ترافیک بزرگراه مجبور به جابه‌جایی نیست.', en: 'Use the slip road to match speed safely and give way to traffic already on the motorway; motorway traffic is not required to move over.' },
      { num: 59, fa: 'در خط چپ حرکت کنید مگر هنگام سبقت. پس از سبقت، وقتی ایمن است به خط چپ بازگردید.', en: 'Keep in the left lane unless overtaking. Return to the left lane when it is safe after overtaking.' },
      { num: 60, fa: 'حداکثر سرعت ملی برای موتورسیکلت در بزرگراه ۷۰ مایل بر ساعت است، مگر محدودیت پایین‌تری نشان داده شود؛ سرعت باید با شرایط مناسب باشد.', en: 'The national motorway speed limit for motorcycles is 70 mph unless a lower limit is shown; your speed must still suit the conditions.' },
      { num: 61, fa: 'خط زیر علامت X قرمز بسته است و نباید در آن حرکت کنید. محدودیت سرعت داخل دایره قرمز نیز اجباری است.', en: 'A lane beneath a red X is closed and you MUST NOT use it. A speed limit shown in a red circle is mandatory.' },
      { num: 62, fa: 'روی شانه سخت یا محدوده اضطراری توقف نکنید مگر در وضعیت اضطراری واقعی. برای استراحت از محل خدمات استفاده کنید.', en: 'Do not stop on a hard shoulder or in an emergency area except in a genuine emergency. Use a service area for rest.' },
      { num: 63, fa: 'اگر خراب شدید، در صورت امکان از بزرگراه خارج شوید. اگر نمی‌توانید، تا حد ممکن چپ توقف کنید، چراغ خطر را روشن کنید و پشت مانع ایمنی منتظر بمانید.', en: 'If you break down, leave the motorway if possible. If you cannot, stop as far left as possible, use hazard lights and wait behind the safety barrier.' },
      { num: 64, fa: 'در باد جانبی، کنار خودروهای بزرگ و روی پل‌ها انتظار تغییر ناگهانی نیرو را داشته باشید؛ سرعت و موقعیت را طوری تنظیم کنید که فضای کافی بماند.', en: 'Expect sudden crosswind changes beside large vehicles and on bridges; adjust speed and position to preserve space.' },
    ],
    quiz: [
      { q: 'آیا دارنده گواهینامه موقت موتورسیکلت می‌تواند وارد بزرگراه شود؟', qEn: 'May a provisional motorcycle licence holder use a motorway?', options: [{ letter: 'A', fa: 'خیر', en: 'No' }, { letter: 'B', fa: 'بله، در خط چپ', en: 'Yes, in the left lane' }, { letter: 'C', fa: 'فقط شب', en: 'Only at night' }], answer: 'A', explanation: 'راکب با گواهینامه موقت اجازه استفاده از بزرگراه ندارد. // Provisional motorcycle licence holders MUST NOT use motorways.', difficulty: 'easy' },
      { q: 'X قرمز بالای یک خط به چه معناست؟', qEn: 'What does a red X above a lane mean?', options: [{ letter: 'A', fa: 'خط بسته است', en: 'The lane is closed' }, { letter: 'B', fa: 'حداقل سرعت', en: 'Minimum speed' }, { letter: 'C', fa: 'فقط موتورسیکلت مجاز است', en: 'Motorcycles only' }], answer: 'A', explanation: 'حرکت در خط زیر X قرمز ممنوع است. // You MUST NOT use a lane beneath a red X.', difficulty: 'easy' },
      { q: 'هنگام ورود از رمپ، چه کسی حق تقدم دارد؟', qEn: 'Who has priority when you join from a slip road?', options: [{ letter: 'A', fa: 'ترافیک داخل بزرگراه', en: 'Traffic already on the motorway' }, { letter: 'B', fa: 'وسیله روی رمپ', en: 'Traffic on the slip road' }, { letter: 'C', fa: 'وسیله سریع‌تر', en: 'The faster vehicle' }], answer: 'A', explanation: 'هنگام پیوستن باید به ترافیک داخل بزرگراه راه بدهید. // Give way to traffic already on the motorway.', difficulty: 'medium' },
      { q: 'حداکثر سرعت ملی موتورسیکلت در بزرگراه چقدر است؟', qEn: 'What is the national motorway speed limit for a motorcycle?', options: [{ letter: 'A', fa: '۶۰ مایل بر ساعت', en: '60 mph' }, { letter: 'B', fa: '۷۰ مایل بر ساعت', en: '70 mph' }, { letter: 'C', fa: '۸۰ مایل بر ساعت', en: '80 mph' }], answer: 'B', explanation: 'حد ملی ۷۰ mph است، مگر محدودیت پایین‌تری اعلام شود. // The national limit is 70 mph unless a lower limit is shown.', difficulty: 'easy' },
    ],
  },

  'hazard-awareness': {
    title: 'آگاهی از خطر',
    titleEn: 'Hazard Awareness',
    rules: [
      { num: 65, fa: 'خطر در حال شکل‌گیری چیزی است که ممکن است شما را مجبور به تغییر سرعت یا مسیر کند. آن را زود تشخیص دهید و پیش از بحرانی‌شدن واکنش نشان دهید.', en: 'A developing hazard is something that may make you change speed or direction. Identify it early and respond before it becomes critical.' },
      { num: 66, fa: 'دور و نزدیک را پیوسته اسکن کنید و آینه‌ها را مرتب بررسی کنید؛ فقط به وسیله جلویی خیره نشوید.', en: 'Continuously scan near and far and check mirrors regularly; do not stare only at the vehicle ahead.' },
      { num: 67, fa: 'تقاطع‌ها، ورودی خانه‌ها، خودروهای پارک‌شده، ایستگاه اتوبوس و صف ترافیک محل‌های رایج خطر برای موتورسوارند.', en: 'Junctions, driveways, parked vehicles, bus stops and traffic queues are common hazard areas for motorcyclists.' },
      { num: 68, fa: 'کنار خودروهای پارک‌شده فضای کافی برای بازشدن در، حرکت ناگهانی خودرو یا بیرون‌آمدن عابر و کودک بگذارید.', en: 'Leave enough space beside parked vehicles for opening doors, sudden movement, or pedestrians and children emerging.' },
      { num: 69, fa: 'مراقب گازوئیل، روغن، برگ خیس، شن، درپوش فلزی و خط‌کشی جاده باشید؛ این سطوح به‌ویژه در حالت خیس لغزنده‌اند.', en: 'Watch for diesel, oil, wet leaves, gravel, metal covers and road markings; these surfaces are especially slippery when wet.' },
      { num: 70, fa: 'در نزدیکی مدارس، محل بازی، عابر سالمند یا فرد دارای معلولیت سرعت را کم کنید و برای توقف آماده باشید.', en: 'Near schools, play areas, older pedestrians or disabled people, reduce speed and be ready to stop.' },
      { num: 71, fa: 'به نشانه‌های پنهان خطر توجه کنید: چرخ جلوی خودرو که می‌چرخد، سایه زیر خودرو، چراغ ترمز یا نگاه راننده.', en: 'Use clues to hidden hazards: a vehicle’s front wheel turning, shadows beneath it, brake lights or the driver’s head movement.' },
      { num: 72, fa: 'خستگی، حواس‌پرتی، الکل، مواد مخدر و برخی داروها توان تشخیص خطر را کم می‌کنند. در صورت اثرگذاری، موتورسواری نکنید.', en: 'Tiredness, distraction, alcohol, drugs and some medicines reduce hazard awareness. Do not ride when affected.' },
    ],
    quiz: [
      { q: 'خطر در حال شکل‌گیری چیست؟', qEn: 'What is a developing hazard?', options: [{ letter: 'A', fa: 'چیزی که ممکن است شما را مجبور به تغییر سرعت یا مسیر کند', en: 'Something that may make you change speed or direction' }, { letter: 'B', fa: 'هر تابلوی جاده', en: 'Any road sign' }, { letter: 'C', fa: 'فقط تصادف رخ‌داده', en: 'Only a collision that has happened' }], answer: 'A', explanation: 'خطر در حال شکل‌گیری نیاز احتمالی به واکنش را ایجاد می‌کند. // A developing hazard may require you to alter speed or direction.', difficulty: 'medium' },
      { q: 'چرا کنار خودروهای پارک‌شده فاصله می‌گذارید؟', qEn: 'Why should you leave space beside parked vehicles?', options: [{ letter: 'A', fa: 'ممکن است در باز شود یا عابر بیرون بیاید', en: 'A door may open or a pedestrian may emerge' }, { letter: 'B', fa: 'برای افزایش سرعت', en: 'To increase speed' }, { letter: 'C', fa: 'برای نزدیک‌شدن به جدول', en: 'To move closer to the kerb' }], answer: 'A', explanation: 'درِ خودرو، حرکت ناگهانی و عابر از خطرهای رایج‌اند. // Opening doors, sudden movement and pedestrians are common hazards.', difficulty: 'medium' },
      { q: 'کدام سطح در حالت خیس می‌تواند بسیار لغزنده باشد؟', qEn: 'Which surface can be especially slippery when wet?', options: [{ letter: 'A', fa: 'درپوش فلزی', en: 'A metal cover' }, { letter: 'B', fa: 'آسفالت خشک و تمیز', en: 'Clean dry asphalt' }, { letter: 'C', fa: 'شن خشک خارج جاده', en: 'Dry gravel off the road' }], answer: 'A', explanation: 'فلز و خط‌کشی خیس چسبندگی کمی دارند. // Wet metal and road markings offer little grip.', difficulty: 'medium' },
      { q: 'کدام نشانه می‌تواند حرکت احتمالی خودروی پارک‌شده را نشان دهد؟', qEn: 'Which clue may show that a parked vehicle could move?', options: [{ letter: 'A', fa: 'چرخ جلوی در حال چرخش', en: 'A front wheel beginning to turn' }, { letter: 'B', fa: 'پلاک تمیز', en: 'A clean number plate' }, { letter: 'C', fa: 'رنگ خودرو', en: 'The vehicle colour' }], answer: 'A', explanation: 'حرکت چرخ جلو نشانه زودهنگام تغییر مسیر است. // Front-wheel movement is an early clue of changing direction.', difficulty: 'medium' },
    ],
  },

  weather: {
    title: 'موتورسواری در آب‌وهوای نامساعد',
    titleEn: 'Riding in Adverse Weather',
    rules: [
      { num: 73, fa: 'در باران سرعت را کم، فاصله را دست‌کم دو برابر و ورودی‌های گاز، ترمز و فرمان را نرم کنید.', en: 'In rain, reduce speed, at least double your following gap, and make throttle, braking and steering inputs smoothly.' },
      { num: 74, fa: 'باران پس از دوره خشکی می‌تواند روغن و آلودگی را روی سطح جاده فعال کند؛ دقایق نخست بارندگی به‌ویژه لغزنده است.', en: 'Rain after a dry spell can lift oil and contamination on the road surface; the first part of rainfall can be especially slippery.' },
      { num: 75, fa: 'از آب ایستاده با احتیاط دوری کنید؛ آب می‌تواند چاله را پنهان کند و باعث آکواپلنینگ یا کاهش شدید کنترل شود.', en: 'Avoid standing water where possible; it can hide potholes and cause aquaplaning or a serious loss of control.' },
      { num: 76, fa: 'در یخ یا برف فقط در صورت ضرورت حرکت کنید. سرعت بسیار کم، فاصله بسیار زیاد و کنترل‌های نرم لازم است.', en: 'Ride in ice or snow only when essential. Use very low speed, a very large gap and extremely gentle controls.' },
      { num: 77, fa: 'در باد شدید مراقب شکاف ساختمان‌ها، پل‌ها، جاده باز و هنگام عبور از کنار خودروهای بزرگ باشید؛ تندباد می‌تواند شما را جابه‌جا کند.', en: 'In strong winds, take care at gaps in buildings, bridges, exposed roads and beside large vehicles; gusts can move you sideways.' },
      { num: 78, fa: 'در مه، چراغ جلو را روشن کنید و سرعتی داشته باشید که در فاصله قابل‌دید توقف کنید. اگر دید به‌شدت کم و معمولاً کمتر از ۱۰۰ متر است، می‌توانید از چراغ مه‌شکنِ نصب‌شده استفاده کنید.', en: 'In fog, use headlights and ride at a speed that lets you stop within the visible distance. You may use fitted fog lights when visibility is seriously reduced, generally below 100 metres.' },
      { num: 79, fa: 'لباس ضدآب و لایه‌های گرم تمرکز و کنترل را حفظ می‌کند. سرما و خیس‌شدن واکنش را کند و خستگی را بیشتر می‌کند.', en: 'Waterproof clothing and warm layers preserve concentration and control. Cold and wet conditions slow reactions and increase fatigue.' },
      { num: 80, fa: 'در آفتاب کم‌ارتفاع، شیشه کلاه را تمیز نگه دارید و سرعت را کم کنید. اگر دیدتان مختل شده، در محل امن توقف کنید.', en: 'In low sun, keep the visor clean and reduce speed. If your view is impaired, stop in a safe place.' },
    ],
    quiz: [
      { q: 'در باران با فاصله دوثانیه‌ای چه باید کرد؟', qEn: 'What should you do with the two-second gap in rain?', options: [{ letter: 'A', fa: 'دست‌کم دو برابرش کنید', en: 'At least double it' }, { letter: 'B', fa: 'نصفش کنید', en: 'Halve it' }, { letter: 'C', fa: 'حذفش کنید', en: 'Remove it' }], answer: 'A', explanation: 'سطح خیس فاصله توقف را افزایش می‌دهد. // Wet surfaces increase stopping distance.', difficulty: 'medium' },
      { q: 'چرا آب ایستاده خطرناک است؟', qEn: 'Why is standing water dangerous?', options: [{ letter: 'A', fa: 'ممکن است چاله را پنهان کند و کنترل را کم کند', en: 'It may hide potholes and reduce control' }, { letter: 'B', fa: 'همیشه چسبندگی را زیاد می‌کند', en: 'It always increases grip' }, { letter: 'C', fa: 'ترمزها را قوی‌تر می‌کند', en: 'It makes brakes stronger' }], answer: 'A', explanation: 'آب ایستاده می‌تواند چاله را پنهان و باعث آکواپلنینگ شود. // Standing water can hide potholes and cause aquaplaning.', difficulty: 'hard' },
      { q: 'در چه دیدی می‌توان چراغ مه‌شکنِ نصب‌شده را به‌کار برد؟', qEn: 'When may fitted fog lights be used?', options: [{ letter: 'A', fa: 'وقتی دید به‌شدت کم و معمولاً زیر ۱۰۰ متر است', en: 'When visibility is seriously reduced, generally below 100 metres' }, { letter: 'B', fa: 'در هر باران سبک', en: 'In every light shower' }, { letter: 'C', fa: 'همیشه در روز', en: 'Always in daylight' }], answer: 'A', explanation: 'چراغ مه‌شکن برای کاهش شدید دید است و پس از بهبود باید خاموش شود. // Fog lights are for seriously reduced visibility and should be switched off when visibility improves.', difficulty: 'hard' },
    ],
  },

  'night-riding': {
    title: 'موتورسواری در شب',
    titleEn: 'Night Riding',
    rules: [
      { num: 81, fa: 'در تاریکی باید چراغ‌های لازم روشن و سالم باشند. چراغ‌ها، شیشه کلاه، آینه‌ها و بازتابنده‌ها را تمیز نگه دارید.', en: 'In darkness, required lights must be on and working. Keep lamps, visor, mirrors and reflectors clean.' },
      { num: 82, fa: 'لباس یا نوار بازتابنده بپوشید تا نور چراغ خودروها شما را از فاصله بیشتری نمایان کند.', en: 'Wear reflective clothing or strips so vehicle headlights make you visible from farther away.' },
      { num: 83, fa: 'سرعتی انتخاب کنید که بتوانید در فاصله‌ای که روشن و قابل‌دید است توقف کنید؛ چراغ جلو توان دید نامحدود نمی‌دهد.', en: 'Ride at a speed that lets you stop within the distance you can see to be clear; your headlamp does not provide unlimited vision.' },
      { num: 84, fa: 'وقتی ممکن است دیگران را خیره کنید، از نور پایین استفاده کنید. پس از عبور وسیله روبه‌رو، در صورت ایمن‌بودن دوباره نور مناسب را انتخاب کنید.', en: 'Use dipped headlights when you could dazzle others. After oncoming traffic passes, select the appropriate beam again when safe.' },
      { num: 85, fa: 'اگر نور چراغ روبه‌رو خیره‌تان کرد، سرعت را کم کنید و به لبه چپ مسیر نگاه کنید؛ اگر لازم است در محل امن توقف کنید.', en: 'If dazzled by oncoming lights, slow down and look towards the left edge of your lane; stop safely if necessary.' },
      { num: 86, fa: 'در شب تشخیص سرعت و فاصله دشوارتر است. فاصله بیشتری نگه دارید و برای عابر، دوچرخه یا حیوان بدون نور آماده باشید.', en: 'Speed and distance are harder to judge at night. Leave more space and expect unlit pedestrians, cyclists or animals.' },
      { num: 87, fa: 'خستگی در شب بیشتر است. اگر تمرکز یا هوشیاری کم شد، در محل امن توقف و استراحت کنید؛ ادامه‌دادن با خستگی خطرناک است.', en: 'Fatigue is greater at night. If concentration or alertness falls, stop somewhere safe and rest; continuing while tired is dangerous.' },
      { num: 88, fa: 'در شب روی جاده خیس، بازتاب نور می‌تواند خط‌کشی و خطرها را پنهان کند؛ سرعت را بیشتر کاهش دهید و نرم برانید.', en: 'At night on wet roads, reflections can hide markings and hazards; reduce speed further and ride smoothly.' },
    ],
    quiz: [
      { q: 'در تاریکی سرعت را بر چه اساسی انتخاب می‌کنید؟', qEn: 'How should you choose speed in darkness?', options: [{ letter: 'A', fa: 'بتوانید در فاصله قابل‌دید توقف کنید', en: 'Be able to stop within the visible clear distance' }, { letter: 'B', fa: 'فقط بر اساس حد سرعت', en: 'Only by the speed limit' }, { letter: 'C', fa: 'سرعت وسیله پشت سر', en: 'The speed of traffic behind' }], answer: 'A', explanation: 'باید بتوانید در فاصله روشن و قابل‌دید توقف کنید. // You must be able to stop within the distance you can see to be clear.', difficulty: 'medium' },
      { q: 'اگر چراغ روبه‌رو خیره‌تان کرد چه کنید؟', qEn: 'What should you do if dazzled by oncoming headlights?', options: [{ letter: 'A', fa: 'سرعت را کم و به لبه چپ مسیر نگاه کنید', en: 'Slow down and look towards the left edge' }, { letter: 'B', fa: 'سرعت را زیاد کنید', en: 'Speed up' }, { letter: 'C', fa: 'چشم‌ها را ببندید', en: 'Close your eyes' }], answer: 'A', explanation: 'سرعت را کم کنید و در صورت نیاز ایمن توقف کنید. // Slow down and stop safely if necessary.', difficulty: 'hard' },
      { q: 'چه چیزی در شب به دیده‌شدن بیشتر کمک می‌کند؟', qEn: 'What helps you be seen more clearly at night?', options: [{ letter: 'A', fa: 'مواد بازتابنده', en: 'Reflective material' }, { letter: 'B', fa: 'خاموش‌کردن چراغ', en: 'Switching off lights' }, { letter: 'C', fa: 'لباس گشاد تیره', en: 'Loose dark clothing' }], answer: 'A', explanation: 'مواد بازتابنده نور چراغ دیگران را بازمی‌تاباند. // Reflective material returns the light from other vehicles.', difficulty: 'easy' },
    ],
  },

  'passengers-loads': {
    title: 'سرنشین و بار',
    titleEn: 'Passengers & Loads',
    rules: [
      { num: 89, fa: 'بیش از یک ترک‌نشین حمل نکنید. موتورسیکلت باید برای ترک‌نشین طراحی شده و صندلی و جاپایی مناسب داشته باشد.', en: 'You MUST NOT carry more than one pillion passenger. The motorcycle must be designed for a pillion and have a proper seat and footrests.' },
      { num: 90, fa: 'دارنده گواهینامه موقت اجازه حمل ترک‌نشین ندارد. ترک‌نشین نیز باید کلاه ایمنی تأییدشده و محکم‌بسته بپوشد.', en: 'A provisional licence holder MUST NOT carry a pillion passenger. The pillion must also wear an approved, securely fastened helmet.' },
      { num: 91, fa: 'ترک‌نشین باید رو به جلو و دوپا در دو سوی موتور بنشیند و هر دو پا را روی جاپایی نگه دارد.', en: 'A pillion passenger MUST sit astride facing forward and should keep both feet on the footrests.' },
      { num: 92, fa: 'پیش از حرکت به ترک‌نشین توضیح دهید آرام بنشیند، همراه شما خم شود، حرکت ناگهانی نکند و هنگام توقف پاها را روی جاپایی نگه دارد.', en: 'Before moving off, tell the pillion to sit still, lean with you, avoid sudden movement and keep feet on the rests when stopped.' },
      { num: 93, fa: 'سرنشین و بار، شتاب، ترمز، فرمان و فاصله توقف را تغییر می‌دهند. فشار باد و تنظیم تعلیق را طبق دفترچه سازنده اصلاح کنید.', en: 'A passenger and luggage affect acceleration, braking, steering and stopping distance. Adjust tyre pressures and suspension as the handbook directs.' },
      { num: 94, fa: 'بار را محکم، متعادل و تا حد ممکن پایین و نزدیک مرکز موتورسیکلت ببندید. بار نباید چراغ، پلاک یا دید شما را بپوشاند.', en: 'Secure luggage firmly, evenly, and as low and close to the motorcycle’s centre as possible. It must not obscure lights, number plate or your view.' },
      { num: 95, fa: 'از حداکثر وزن مجاز سازنده تجاوز نکنید. بار آویزان، طناب شل یا وزن نامتقارن می‌تواند کنترل را مختل کند.', en: 'Do not exceed the manufacturer’s maximum permitted weight. Hanging loads, loose straps or uneven weight can seriously affect control.' },
      { num: 96, fa: 'پس از طی مسافت کوتاه، بست‌های بار را دوباره بررسی کنید. بار نباید روی اگزوز داغ، زنجیر، چرخ یا کنترل‌ها تماس داشته باشد.', en: 'After a short distance, recheck luggage fastenings. Loads must not contact the hot exhaust, chain, wheels or controls.' },
    ],
    quiz: [
      { q: 'حداکثر چند ترک‌نشین می‌توان حمل کرد؟', qEn: 'What is the maximum number of pillion passengers allowed?', options: [{ letter: 'A', fa: 'یک نفر', en: 'One' }, { letter: 'B', fa: 'دو نفر', en: 'Two' }, { letter: 'C', fa: 'هر تعداد با کلاه', en: 'Any number wearing helmets' }], answer: 'A', explanation: 'حمل بیش از یک ترک‌نشین ممنوع است و موتور باید برای آن طراحی شده باشد. // No more than one pillion may be carried, and the motorcycle must be designed for one.', difficulty: 'easy' },
      { q: 'آیا دارنده گواهینامه موقت می‌تواند ترک‌نشین حمل کند؟', qEn: 'May a provisional licence holder carry a pillion?', options: [{ letter: 'A', fa: 'خیر', en: 'No' }, { letter: 'B', fa: 'بله، با کلاه', en: 'Yes, with a helmet' }, { letter: 'C', fa: 'فقط در شهر', en: 'Only in town' }], answer: 'A', explanation: 'دارنده گواهینامه موقت نباید ترک‌نشین حمل کند. // A provisional licence holder MUST NOT carry a pillion.', difficulty: 'easy' },
      { q: 'بار سنگین را کجا باید قرار داد؟', qEn: 'Where should heavy luggage be carried?', options: [{ letter: 'A', fa: 'پایین و نزدیک مرکز موتور', en: 'Low and close to the motorcycle’s centre' }, { letter: 'B', fa: 'بالا و یک‌طرفه', en: 'High and to one side' }, { letter: 'C', fa: 'آویزان نزدیک چرخ', en: 'Hanging near a wheel' }], answer: 'A', explanation: 'بار را محکم، متعادل، پایین و نزدیک مرکز قرار دهید. // Secure luggage evenly, low and near the centre.', difficulty: 'medium' },
    ],
  },
};
