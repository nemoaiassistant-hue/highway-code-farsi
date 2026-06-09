// UK practical driving test: car "show me, tell me" vehicle-safety questions.

const SHOW_ME_TELL_ME = [
  {
    id: 1,
    type: "tell",
    questionFa: "چگونه سطح روغن موتور را بررسی می‌کنید؟",
    questionEn: "How would you check the engine oil level?",
    answerFa: "خودرو را روی سطح صاف پارک می‌کنم، موتور را خاموش می‌کنم و چند دقیقه صبر می‌کنم. گیج روغن را بیرون می‌آورم، تمیز می‌کنم، دوباره تا انتها جا می‌زنم و سپس بیرون می‌آورم. سطح روغن باید بین علامت‌های حداقل و حداکثر باشد. در صورت نیاز، روغن مناسب را کم‌کم از درپوش روغن اضافه می‌کنم.",
    answerEn: "Park on level ground, switch off the engine and wait a few minutes. Remove the dipstick, wipe it clean, reinsert it fully, then remove it again. The oil should be between the minimum and maximum marks. Add the correct oil gradually through the filler cap if needed.",
    tipFa: "روغن را بیش از علامت حداکثر پر نکنید و دستورالعمل سازنده را رعایت کنید.",
    tipEn: "Do not fill above the maximum mark; follow the manufacturer's handbook."
  },
  {
    id: 2,
    type: "tell",
    questionFa: "چگونه سطح مایع خنک‌کننده موتور را بررسی می‌کنید؟",
    questionEn: "How would you check the engine coolant level?",
    answerFa: "وقتی موتور کاملاً سرد است، مخزن انبساط مایع خنک‌کننده را پیدا می‌کنم و از بیرون بررسی می‌کنم که سطح مایع بین علامت‌های حداقل و حداکثر باشد. اگر کم باشد، مخلوط مناسب ضدیخ و آب را طبق دفترچه خودرو اضافه می‌کنم و علت کم‌شدن را نیز بررسی می‌کنم.",
    answerEn: "With the engine completely cold, locate the coolant expansion tank and check externally that the level is between the minimum and maximum marks. If low, add the correct coolant mixture specified in the handbook and investigate why the level dropped.",
    tipFa: "درپوش سیستم خنک‌کننده را هرگز روی موتور داغ باز نکنید؛ مایع تحت فشار می‌تواند باعث سوختگی شود.",
    tipEn: "Never remove the cooling-system cap while the engine is hot; pressurised coolant can cause burns."
  },
  {
    id: 3,
    type: "tell",
    questionFa: "چگونه سطح مایع ترمز را بررسی می‌کنید؟",
    questionEn: "How would you check the brake fluid level?",
    answerFa: "مخزن مایع ترمز را در محفظه موتور پیدا می‌کنم و بدون بازکردن درپوش، سطح آن را از روی بدنه شفاف مخزن بررسی می‌کنم. سطح باید بین علامت‌های حداقل و حداکثر باشد. اگر سطح پایین باشد، چون ممکن است نشتی یا فرسودگی لنت وجود داشته باشد، خودرو باید توسط تعمیرکار واجد صلاحیت بررسی شود.",
    answerEn: "Locate the brake-fluid reservoir in the engine bay and check the level through its translucent body without removing the cap. It should be between the minimum and maximum marks. A low level may indicate a leak or worn pads, so the vehicle should be checked by a qualified technician.",
    tipFa: "کمبود مایع ترمز را فقط با پرکردن مخزن نادیده نگیرید؛ علت آن باید پیدا شود.",
    tipEn: "Do not simply top up and ignore low brake fluid; the cause must be found."
  },
  {
    id: 4,
    type: "tell",
    questionFa: "چگونه سطح روغن فرمان هیدرولیک را بررسی می‌کنید؟",
    questionEn: "How would you check the power-steering fluid level?",
    answerFa: "اگر خودرو فرمان هیدرولیک داشته باشد، مخزن روغن فرمان را با استفاده از دفترچه خودرو پیدا می‌کنم. روی سطح صاف و طبق دستور سازنده، سطح روغن را از روی علامت‌های مخزن یا گیج متصل به درپوش بررسی می‌کنم؛ سطح باید در محدوده مشخص‌شده باشد. کمبود روغن می‌تواند نشانه نشتی باشد.",
    answerEn: "If the vehicle has hydraulic power steering, use the handbook to locate its reservoir. On level ground and following the manufacturer's procedure, check the level against the reservoir marks or cap dipstick; it must be within the specified range. A low level may indicate a leak.",
    tipFa: "بسیاری از خودروهای جدید فرمان برقی دارند و مخزن روغن فرمان ندارند.",
    tipEn: "Many modern cars have electric power steering and no fluid reservoir."
  },
  {
    id: 5,
    type: "tell",
    questionFa: "چگونه مطمئن می‌شوید عمق آج و وضعیت لاستیک‌ها قانونی و ایمن است؟",
    questionEn: "How would you check that tyre tread depth and condition are legal and safe?",
    answerFa: "تمام سطح و دیواره هر لاستیک را از نظر بریدگی، برآمدگی و آسیب بررسی می‌کنم. عمق آج را با عمق‌سنج می‌سنجم؛ حداقل قانونی ۱٫۶ میلی‌متر در سه‌چهارم میانی پهنای آج و در تمام محیط لاستیک است. همچنین مطمئن می‌شوم هیچ جسم خارجی در لاستیک فرو نرفته باشد.",
    answerEn: "Inspect the tread and sidewalls of every tyre for cuts, bulges and damage. Use a tread-depth gauge; the legal minimum is 1.6 mm across the central three-quarters of the tread breadth and around the entire circumference. Also check for embedded objects.",
    tipFa: "لاستیک زاپاس را نیز، اگر خودرو دارد، مرتب بررسی کنید.",
    tipEn: "Check the spare tyre regularly too, if the vehicle has one."
  },
  {
    id: 6,
    type: "tell",
    questionFa: "چگونه فشار باد لاستیک‌ها را بررسی می‌کنید؟",
    questionEn: "How would you check the tyre pressures?",
    answerFa: "مقدار توصیه‌شده را از دفترچه خودرو یا برچسب داخل ستون در یا درپوش سوخت پیدا می‌کنم. وقتی لاستیک‌ها سرد هستند، با فشارسنج مطمئن فشار هر لاستیک را اندازه می‌گیرم و تنظیم می‌کنم. درپوش والوها را دوباره می‌بندم و فشار را متناسب با بار خودرو تنظیم می‌کنم.",
    answerEn: "Find the recommended pressures in the handbook or on the door-pillar or fuel-flap label. When the tyres are cold, use a reliable gauge to measure and adjust each tyre. Refit the valve caps and use the pressure specified for the vehicle's load.",
    tipFa: "فشار لاستیک گرم بالاتر است؛ اندازه‌گیری اصلی را در حالت سرد انجام دهید.",
    tipEn: "Warm tyres read higher; make the main pressure check when they are cold."
  },
  {
    id: 7,
    type: "tell",
    questionFa: "چگونه بررسی می‌کنید چراغ‌های ترمز کار می‌کنند؟",
    questionEn: "How would you check that the brake lights are working?",
    answerFa: "سوئیچ را در وضعیت لازم قرار می‌دهم و پدال ترمز را فشار می‌دهم. از شخص دیگری می‌خواهم چراغ‌ها را بررسی کند، یا بازتاب آن‌ها را روی دیوار، درِ گاراژ یا سطح بازتابنده می‌بینم. هر دو چراغ اصلی و چراغ ترمز سوم باید روشن، تمیز و سالم باشند.",
    answerEn: "Turn on the ignition if required and press the brake pedal. Ask someone to check the lights, or use their reflection in a wall, garage door or reflective surface. Both main brake lights and the high-level brake light should illuminate and be clean and undamaged.",
    tipFa: "چراغ ترمز معیوب را پیش از رانندگی تعمیر کنید.",
    tipEn: "Have a faulty brake light repaired before driving."
  },
  {
    id: 8,
    type: "tell",
    questionFa: "چگونه بررسی می‌کنید چراغ‌های جلو و عقب کار می‌کنند؟",
    questionEn: "How would you check that the headlights and tail lights are working?",
    answerFa: "چراغ‌ها را با کلید مربوط روشن می‌کنم، دور خودرو راه می‌روم و کارکرد چراغ‌های جلو و عقب، چراغ پلاک و در صورت لزوم نوربالا را بررسی می‌کنم. شیشه چراغ‌ها باید تمیز، سالم و بدون ترک باشد.",
    answerEn: "Operate the light switch, walk around the vehicle and check the headlights, tail lights, number-plate lights and, where appropriate, main beam. The lenses should be clean, secure and free from cracks.",
    tipFa: "بازتاب چراغ‌ها کمک‌کننده است، اما بازدید مستقیم دور خودرو مطمئن‌تر است.",
    tipEn: "Reflections can help, but a direct walkaround check is more reliable."
  },
  {
    id: 9,
    type: "tell",
    questionFa: "چگونه بررسی می‌کنید راهنماها کار می‌کنند؟",
    questionEn: "How would you check that the indicators are working?",
    answerFa: "فلاشر چهارطرفه را روشن می‌کنم و دور خودرو راه می‌روم تا تمام چراغ‌های راهنما را بررسی کنم. سپس در صورت نیاز راهنمای چپ و راست را جداگانه آزمایش می‌کنم و به سرعت غیرعادی چشمک‌زدن که می‌تواند نشانه خرابی لامپ باشد توجه می‌کنم.",
    answerEn: "Switch on the hazard warning lights and walk around the vehicle to inspect every indicator. If needed, test left and right indicators separately and note any unusually fast flashing that may indicate a failed bulb.",
    tipFa: "چراغ‌های راهنما باید تمیز، سالم و به‌وضوح قابل مشاهده باشند.",
    tipEn: "Indicators must be clean, undamaged and clearly visible."
  },
  {
    id: 10,
    type: "tell",
    questionFa: "چگونه بررسی می‌کنید بوق کار می‌کند؟",
    questionEn: "How would you check that the horn is working?",
    answerFa: "در حالی که خودرو ثابت است و مزاحم دیگران نمی‌شوم، دکمه بوق را کوتاه فشار می‌دهم و مطمئن می‌شوم صدایی پیوسته و کافی تولید می‌کند. بوق را در منطقه مسکونی بین ساعت ۱۱:۳۰ شب تا ۷ صبح، مگر در خطر، آزمایش نمی‌کنم.",
    answerEn: "With the vehicle stationary and without causing a nuisance, press the horn briefly and confirm it gives a continuous, adequate sound. Do not test it in a built-up area between 11:30 pm and 7 am unless there is danger.",
    tipFa: "بوق وسیله هشدار خطر است، نه ابراز نارضایتی.",
    tipEn: "The horn is a warning device, not a way to express annoyance."
  },
  {
    id: 11,
    type: "tell",
    questionFa: "چگونه سطح مایع شیشه‌شوی را بررسی می‌کنید؟",
    questionEn: "How would you check the windscreen-washer fluid level?",
    answerFa: "مخزن شیشه‌شوی را با علامت مخصوص روی درپوش پیدا می‌کنم. در خودروهایی که مخزن شفاف است سطح را از بیرون می‌بینم؛ در غیر این صورت درپوش را باز می‌کنم و طبق دفترچه خودرو بررسی می‌کنم. آن را با مایع شیشه‌شوی مناسب پر می‌کنم و در هوای سرد از محلول ضدیخ مناسب استفاده می‌کنم.",
    answerEn: "Locate the washer reservoir by its marked cap. Check through the side if it is translucent; otherwise open it and follow the handbook procedure. Top up with suitable screenwash, using an appropriate winter-strength mixture in cold weather.",
    tipFa: "از ضدیخ رادیاتور در مخزن شیشه‌شوی استفاده نکنید.",
    tipEn: "Never put engine coolant antifreeze in the washer reservoir."
  },
  {
    id: 12,
    type: "tell",
    questionFa: "چگونه ترمز دستی را از نظر بالا آمدن بیش از حد بررسی می‌کنید؟",
    questionEn: "How would you check the parking brake for excessive travel?",
    answerFa: "پدال ترمز را محکم نگه می‌دارم، سپس ترمز دستی را به‌آرامی می‌کشم. ترمز باید پیش از رسیدن اهرم به انتهای مسیر، خودرو را محکم نگه دارد و مقداری مسیر باقی بماند. اگر اهرم بیش از حد بالا بیاید یا خودرو را نگه ندارد، باید تنظیم و تعمیر شود.",
    answerEn: "Keep firm pressure on the footbrake, then apply the parking brake gradually. It should secure the vehicle before the lever reaches the end of its travel, leaving some reserve movement. If it travels too far or does not hold the vehicle, it needs adjustment or repair.",
    tipFa: "این آزمایش را در محل امن و با کنترل کامل خودرو انجام دهید.",
    tipEn: "Carry out this check in a safe place while keeping full control of the vehicle."
  },
  {
    id: 13,
    type: "show",
    questionFa: "نشان دهید چگونه هنگام رانندگی شیشه جلو را می‌شویید و پاک‌کن‌ها را به کار می‌اندازید.",
    questionEn: "Show how you would wash and clean the windscreen using the controls.",
    answerFa: "در حالی که کنترل خودرو و نگاه به مسیر را حفظ می‌کنم، اهرم یا دکمه شیشه‌شوی جلو را فعال می‌کنم تا مایع روی شیشه پاشیده شود و برف‌پاک‌کن‌ها شیشه را تمیز کنند. پس از رهاکردن کنترل، مطمئن می‌شوم دید واضح است.",
    answerEn: "While maintaining control and observation of the road, operate the front-washer control so fluid sprays onto the windscreen and the wipers clean it. Release the control and make sure the view is clear.",
    tipFa: "برای پیدا کردن کنترل، نگاه خود را برای مدت طولانی از جاده برندارید.",
    tipEn: "Do not look away from the road for an extended period to find the control."
  },
  {
    id: 14,
    type: "show",
    questionFa: "نشان دهید چگونه گرم‌کن شیشه عقب را روشن می‌کنید.",
    questionEn: "Show how you would operate the rear-window demister.",
    answerFa: "دکمه گرم‌کن شیشه عقب را که معمولاً علامت یک شیشه مستطیلی با خطوط موج‌دار دارد فشار می‌دهم. روشن‌شدن چراغ نشانگر را بررسی می‌کنم و پس از پاک‌شدن بخار، برای کاهش مصرف برق آن را خاموش می‌کنم.",
    answerEn: "Press the rear-window demister button, normally marked with a rectangular window and rising wavy lines. Check its indicator illuminates and switch it off once the window is clear to reduce electrical load.",
    tipFa: "علامت گرم‌کن شیشه عقب را با بادگیر شیشه جلو اشتباه نگیرید.",
    tipEn: "Do not confuse the rear demister symbol with the front windscreen demist control."
  },
  {
    id: 15,
    type: "show",
    questionFa: "نشان دهید چگونه چراغ‌های نورپایین را روشن می‌کنید.",
    questionEn: "Show how you would switch on the dipped headlights.",
    answerFa: "کلید چراغ‌ها را به وضعیت نورپایین می‌برم و نشانگر مربوط روی صفحه آمپر را بررسی می‌کنم. در خودرو دارای حالت خودکار، در صورت درخواست آزمون مستقیماً نورپایین را انتخاب می‌کنم تا روشن‌بودن آن قطعی باشد.",
    answerEn: "Move the lighting control to the dipped-headlight position and check the relevant dashboard indication. On a vehicle with automatic lights, select dipped headlights directly when asked so their operation is certain.",
    tipFa: "نشانگر آبی مربوط به نوربالاست؛ نورپایین معمولاً نشانگر سبز دارد.",
    tipEn: "The blue warning light indicates main beam; dipped beam is normally shown in green."
  },
  {
    id: 16,
    type: "show",
    questionFa: "نشان دهید چگونه چراغ مه‌شکن عقب را روشن می‌کنید.",
    questionEn: "Show how you would switch on the rear fog lights.",
    answerFa: "ابتدا چراغ‌های لازم، معمولاً نورپایین، را روشن می‌کنم و سپس کلید مه‌شکن عقب را فعال می‌کنم. روشن‌شدن نشانگر زرد یا کهربایی روی صفحه آمپر را بررسی می‌کنم و پس از بهبود دید، چراغ مه‌شکن را خاموش می‌کنم.",
    answerEn: "First switch on the required lights, usually dipped headlights, then operate the rear-fog-light control. Check the amber dashboard warning light and switch the fog light off when visibility improves.",
    tipFa: "مه‌شکن عقب فقط وقتی دید به‌شدت کاهش یافته، معمولاً کمتر از ۱۰۰ متر، استفاده می‌شود.",
    tipEn: "Use rear fog lights only when visibility is seriously reduced, generally below 100 metres."
  },
  {
    id: 17,
    type: "show",
    questionFa: "نشان دهید چگونه چراغ‌های ترمز را فعال می‌کنید.",
    questionEn: "Show how you would operate the brake lights.",
    answerFa: "با حفظ کنترل خودرو، پدال ترمز را به نرمی فشار می‌دهم؛ این کار چراغ‌های ترمز عقب را روشن می‌کند. برای بررسی واقعی عملکرد چراغ‌ها باید از کمک شخص دیگر یا بازتاب چراغ‌ها استفاده شود.",
    answerEn: "While maintaining control of the vehicle, press the brake pedal smoothly; this illuminates the rear brake lights. To confirm their actual operation, use another person or observe their reflection.",
    tipFa: "در آزمون حین حرکت، ترمز را ناگهانی و شدید فشار ندهید.",
    tipEn: "During the on-road test, do not brake suddenly or harshly."
  },
  {
    id: 18,
    type: "show",
    questionFa: "نشان دهید چگونه بوق را به کار می‌اندازید.",
    questionEn: "Show how you would operate the horn.",
    answerFa: "پس از اطمینان از اینکه استفاده از بوق ایمن و قانونی است، قسمت مشخص‌شده روی فرمان را کوتاه فشار می‌دهم. دست‌ها را در وضعیت کنترل‌شده روی فرمان نگه می‌دارم و بی‌دلیل بوق نمی‌زنم.",
    answerEn: "After ensuring it is safe and legal to use the horn, briefly press the marked area on the steering wheel. Keep the vehicle under control and do not sound it unnecessarily.",
    tipFa: "در آزمون، فقط وقتی ممتحن درخواست می‌کند و مزاحمتی ایجاد نمی‌شود بوق بزنید.",
    tipEn: "On test, sound it only when asked and when it will not cause a nuisance."
  },
  {
    id: 19,
    type: "show",
    questionFa: "نشان دهید چگونه عملکرد فرمان کمکی را بررسی می‌کنید.",
    questionEn: "Show how you would check the power-assisted steering.",
    answerFa: "پیش از روشن‌کردن موتور، فشار ملایمی روی فرمان وارد می‌کنم؛ با روشن‌شدن موتور باید حرکت فرمان به‌طور محسوسی سبک‌تر شود. راه دیگر این است که بلافاصله پس از شروع حرکت، در محل امن بررسی کنم فرمان نرم و پاسخ‌گو است. سنگینی غیرعادی یا چراغ هشدار نشانه عیب است.",
    answerEn: "Apply gentle pressure to the steering wheel before starting the engine; when the engine starts, the steering should become noticeably lighter. Alternatively, check immediately after moving off in a safe place that the steering feels light and responsive. Unusual heaviness or a warning light indicates a fault.",
    tipFa: "فرمان را هنگام توقف برای مدت طولانی تا انتها نگه ندارید.",
    tipEn: "Do not hold the steering on full lock for an extended time while stationary."
  }
];

window.SHOW_ME_TELL_ME = SHOW_ME_TELL_ME;
