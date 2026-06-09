// UK practical riding test: motorcycle vehicle-safety questions.

const SHOW_ME_TELL_ME = [
  {
    id: 1,
    type: "tell",
    questionFa: "چگونه عمق آج و وضعیت لاستیک‌های موتورسیکلت را بررسی می‌کنید؟",
    questionEn: "How would you check motorcycle tyre tread and condition?",
    answerFa: "هر دو لاستیک را در تمام محیط از نظر بریدگی، ترک، برآمدگی، جسم خارجی و فرسودگی نامنظم بررسی می‌کنم. برای موتورسیکلت بالای ۵۰ سی‌سی، عمق آج باید دست‌کم ۱ میلی‌متر در سه‌چهارم میانی پهنای آج و در تمام محیط لاستیک باشد. در موپد، نقش آج باید قابل مشاهده باشد.",
    answerEn: "Inspect both tyres around their full circumference for cuts, cracks, bulges, embedded objects and uneven wear. On a motorcycle over 50cc, tread must be at least 1 mm across the central three-quarters of the tread width and around the entire circumference. On a moped, the tread pattern must remain visible.",
    tipFa: "لاستیک آسیب‌دیده یا فرسوده مستقیماً تعادل و چسبندگی موتورسیکلت را کاهش می‌دهد.",
    tipEn: "A damaged or worn tyre directly reduces motorcycle balance and grip."
  },
  {
    id: 2,
    type: "tell",
    questionFa: "چگونه فشار باد لاستیک‌های موتورسیکلت را بررسی می‌کنید؟",
    questionEn: "How would you check motorcycle tyre pressures?",
    answerFa: "فشار توصیه‌شده برای حالت تک‌سرنشین، ترک‌نشین یا بار را از دفترچه سازنده پیدا می‌کنم. وقتی لاستیک‌ها سرد هستند، با فشارسنج دقیق فشار هر دو لاستیک را می‌سنجم و تنظیم می‌کنم، والوها را از نظر نشتی بررسی می‌کنم و درپوش آن‌ها را می‌بندم.",
    answerEn: "Find the manufacturer's recommended pressures for solo riding, a pillion or luggage. With the tyres cold, use an accurate gauge to measure and adjust both tyres, check the valves for leaks and refit their caps.",
    tipFa: "برای حمل ترک‌نشین یا بار ممکن است فشار توصیه‌شده متفاوت باشد.",
    tipEn: "The recommended pressure may differ when carrying a pillion or luggage."
  },
  {
    id: 3,
    type: "tell",
    questionFa: "چگونه کشش و روغن‌کاری زنجیر را بررسی می‌کنید؟",
    questionEn: "How would you check chain tension and lubrication?",
    answerFa: "موتورسیکلت را طبق دفترچه روی پایه مناسب و در حالت خاموش قرار می‌دهم. میزان حرکت آزاد زنجیر را در نقطه تعیین‌شده بین چرخ‌زنجیرها اندازه می‌گیرم و چند قسمت زنجیر را با چرخاندن چرخ عقب بررسی می‌کنم تا نقطه سفت پیدا شود. زنجیر باید تمیز، به‌اندازه کافی روغن‌کاری‌شده و بدون حلقه سفت، زنگ‌زدگی یا آسیب باشد.",
    answerEn: "With the engine off, support the motorcycle as instructed in the handbook. Measure chain free play at the specified point between the sprockets and check several sections by rotating the rear wheel to find any tight spot. The chain should be clean, correctly lubricated and free from stiff links, corrosion or damage.",
    tipFa: "زنجیر بیش از حد سفت به یاتاقان‌ها فشار می‌آورد و زنجیر شل ممکن است از چرخ‌زنجیر خارج شود.",
    tipEn: "An over-tight chain strains bearings; a loose chain may leave the sprocket."
  },
  {
    id: 4,
    type: "tell",
    questionFa: "چگونه سطح مایع ترمز موتورسیکلت را بررسی می‌کنید؟",
    questionEn: "How would you check the brake-fluid level?",
    answerFa: "موتورسیکلت را صاف و طبق دستور سازنده نگه می‌دارم، سپس سطح مایع مخزن ترمز جلو و در صورت وجود مخزن جداگانه ترمز عقب را بررسی می‌کنم. سطح باید بین علامت‌های حداقل و حداکثر باشد. پایین‌بودن سطح یا حالت اسفنجی اهرم و پدال باید فوراً بررسی شود.",
    answerEn: "Hold the motorcycle upright as specified by the manufacturer, then inspect the front-brake reservoir and the separate rear reservoir if fitted. Fluid must be between the minimum and maximum marks. A low level or spongy lever or pedal must be investigated immediately.",
    tipFa: "مایع ترمز به رنگ و قطعات رنگ‌شده آسیب می‌زند و کمبود آن ممکن است نشانه نشتی باشد.",
    tipEn: "Brake fluid damages paint, and a low level may indicate a leak."
  },
  {
    id: 5,
    type: "tell",
    questionFa: "چگونه سطح روغن موتور موتورسیکلت را بررسی می‌کنید؟",
    questionEn: "How would you check the engine oil level?",
    answerFa: "موتورسیکلت را روی سطح صاف و در وضعیت تعیین‌شده سازنده، معمولاً عمودی، قرار می‌دهم و موتور را خاموش می‌کنم. پس از زمان انتظار توصیه‌شده، سطح را از شیشه بازدید یا با گیج روغن بررسی می‌کنم؛ روغن باید بین علامت‌های حداقل و حداکثر باشد. در صورت نیاز فقط روغن مناسب را کم‌کم اضافه می‌کنم.",
    answerEn: "Place the motorcycle on level ground in the manufacturer's specified position, usually upright, and switch off the engine. After the recommended wait, check the sight glass or dipstick; oil must be between the minimum and maximum marks. Add only the correct oil gradually if required.",
    tipFa: "روش اندازه‌گیری با جک بغل، جک وسط یا موتور گرم در مدل‌های مختلف فرق می‌کند؛ دفترچه را رعایت کنید.",
    tipEn: "The required stand position and engine temperature vary by model; follow the handbook."
  },
  {
    id: 6,
    type: "tell",
    questionFa: "چگونه فرمان و بلبرینگ‌های کله‌گی فرمان را بررسی می‌کنید؟",
    questionEn: "How would you check the steering and head bearings?",
    answerFa: "با خاموش‌بودن موتور و سبک‌کردن چرخ جلو طبق روش ایمن سازنده، فرمان را آرام از یک قفل تا قفل دیگر می‌چرخانم؛ حرکت باید نرم، آزاد و بدون گیرکردن باشد و کابل‌ها کشیده نشوند. سپس ترمز جلو را می‌گیرم و موتورسیکلت را آرام جلو و عقب می‌دهم؛ تقه یا لقی در کله‌گی می‌تواند نشانه فرسودگی بلبرینگ باشد.",
    answerEn: "With the engine off and the front wheel safely unloaded as instructed, move the handlebars gently from lock to lock. Movement should be smooth and free, without tight spots or stretched cables. Apply the front brake and rock the motorcycle gently; knocking or play at the steering head may indicate worn bearings.",
    tipFa: "اگر روش بالا آوردن چرخ جلو را نمی‌دانید، بررسی تخصصی را به تعمیرکار بسپارید.",
    tipEn: "If you cannot unload the front wheel safely, have a technician perform the bearing check."
  },
  {
    id: 7,
    type: "tell",
    questionFa: "چگونه مقدار سوخت موتورسیکلت را بررسی می‌کنید؟",
    questionEn: "How would you check the motorcycle fuel level?",
    answerFa: "نشانگر سوخت یا چراغ هشدار را با سوئیچ روشن بررسی می‌کنم. اگر موتورسیکلت نشانگر ندارد، طبق دفترچه از شیر بنزین و وضعیت ذخیره استفاده می‌کنم یا فقط در حالت ایمن و موتور سرد مقدار سوخت را بررسی می‌کنم. پیش از سفر سوخت کافی و نبود نشتی را کنترل می‌کنم.",
    answerEn: "With the ignition on, check the fuel gauge or warning light. If no gauge is fitted, follow the handbook for the fuel tap and reserve setting, or check the level only by an approved safe method with the engine cold. Ensure there is enough fuel and no leak before riding.",
    tipFa: "برای دیدن داخل باک هرگز از شعله یا فندک استفاده نکنید.",
    tipEn: "Never use a flame or lighter to look inside the tank."
  },
  {
    id: 8,
    type: "show",
    questionFa: "نشان دهید چگونه کشش زنجیر را بررسی می‌کنید.",
    questionEn: "Show how you would check the chain tension.",
    answerFa: "موتور را خاموش می‌کنم، موتورسیکلت را طبق دفترچه روی پایه مناسب قرار می‌دهم و دنده را در حالت توصیه‌شده می‌گذارم. در نقطه مشخص‌شده، زنجیر را با انگشت به بالا و پایین حرکت می‌دهم و میزان حرکت آزاد را با مقدار دفترچه مقایسه می‌کنم. با چرخاندن چرخ عقب، چند نقطه زنجیر را نیز کنترل می‌کنم.",
    answerEn: "Switch off the engine, support the motorcycle as specified in the handbook and select the recommended gear position. At the specified point, move the chain up and down and compare its free play with the handbook figure. Rotate the rear wheel and check several chain positions.",
    tipFa: "در حالی که موتور روشن است هرگز دست را نزدیک زنجیر نبرید.",
    tipEn: "Never put your hands near the chain while the engine is running."
  },
  {
    id: 9,
    type: "show",
    questionFa: "نشان دهید چگونه چراغ ترمز را بررسی می‌کنید.",
    questionEn: "Show how you would check the brake lights.",
    answerFa: "سوئیچ را روشن می‌کنم و ابتدا اهرم ترمز جلو و سپس پدال ترمز عقب را جداگانه به کار می‌اندازم. از شخص دیگری می‌خواهم روشن‌شدن چراغ ترمز را ببیند یا بازتاب آن را روی سطح مناسب بررسی می‌کنم. هر دو کنترل باید چراغ ترمز را روشن کنند.",
    answerEn: "Turn on the ignition and operate the front-brake lever and rear-brake pedal separately. Ask another person to observe the brake light or check its reflection on a suitable surface. Both controls should illuminate the brake light.",
    tipFa: "اگر یکی از کلیدهای ترمز چراغ را روشن نمی‌کند، پیش از حرکت آن را تعمیر کنید.",
    tipEn: "If either brake switch fails to illuminate the light, repair it before riding."
  },
  {
    id: 10,
    type: "show",
    questionFa: "نشان دهید چگونه چراغ جلو و راهنماها را بررسی می‌کنید.",
    questionEn: "Show how you would check the headlight and indicators.",
    answerFa: "سوئیچ و چراغ‌ها را روشن می‌کنم، نورپایین و نوربالا را فعال می‌کنم و نشانگر نوربالا را بررسی می‌کنم. سپس راهنمای چپ و راست و در صورت وجود فلاشر چهارطرفه را روشن می‌کنم و دور موتورسیکلت بررسی می‌کنم که تمام چراغ‌ها تمیز، سالم و با سرعت عادی چشمک می‌زنند.",
    answerEn: "Switch on the ignition and lights, operate dipped and main beam, and check the main-beam warning lamp. Then operate left and right indicators and hazards if fitted, walking around to confirm every lamp is clean, undamaged and flashing normally.",
    tipFa: "چشمک‌زدن سریع معمولاً نشانه خرابی یک لامپ یا مدار راهنماست.",
    tipEn: "Rapid flashing commonly indicates a failed indicator lamp or circuit fault."
  },
  {
    id: 11,
    type: "show",
    questionFa: "نشان دهید چگونه بوق را به کار می‌اندازید.",
    questionEn: "Show how you would operate the horn.",
    answerFa: "در حالی که موتورسیکلت ثابت است و مزاحمتی ایجاد نمی‌شود، سوئیچ را در وضعیت لازم قرار می‌دهم و دکمه بوق روی فرمان را کوتاه فشار می‌دهم. بوق باید صدایی واضح و پیوسته داشته باشد.",
    answerEn: "With the motorcycle stationary and without causing a nuisance, turn on the ignition if required and briefly press the horn button on the handlebar. It should give a clear, continuous sound.",
    tipFa: "جای دکمه بوق را پیش از حرکت بشناسید تا هنگام نیاز بدون نگاه‌کردن آن را پیدا کنید.",
    tipEn: "Know the horn-button position before riding so you can find it without looking."
  },
  {
    id: 12,
    type: "show",
    questionFa: "نشان دهید چگونه تعادل و حرکت آزاد فرمان را بررسی می‌کنید.",
    questionEn: "Show how you would demonstrate steering balance and free movement.",
    answerFa: "کنار موتورسیکلت می‌ایستم، هر دو دست را روی فرمان می‌گذارم و آن را عمودی و متعادل نگه می‌دارم. سپس فرمان را آرام به چپ و راست تا محدوده کامل حرکت می‌دهم و بررسی می‌کنم حرکت نرم است، گیر نمی‌کند و کابل‌ها، شلنگ‌ها یا کنترل‌ها کشیده نمی‌شوند. هنگام حرکت‌دادن موتورسیکلت نیز نباید تمایل غیرعادی به یک سمت داشته باشد.",
    answerEn: "Stand beside the motorcycle, hold both handlebars and keep it upright and balanced. Move the steering gently through its full range, checking for smooth movement, no tight spots, and no stretched cables, hoses or controls. When wheeling it, it should not pull abnormally to one side.",
    tipFa: "موتورسیکلت سنگین را فقط با روش صحیح و در محل صاف جابه‌جا کنید.",
    tipEn: "Handle a heavy motorcycle using the correct technique and on level ground."
  }
];

window.SHOW_ME_TELL_ME = SHOW_ME_TELL_ME;
