// UK large-vehicle practical test: vehicle-safety questions.

const SHOW_ME_TELL_ME = [
  {
    id: 1,
    type: "tell",
    questionFa: "چگونه ترمز سرویس خودرو سنگین را بررسی می‌کنید؟",
    questionEn: "How would you check the service brake?",
    answerFa: "پیش از حرکت، فشار هوای سیستم را تا محدوده کاری بالا می‌برم و مطمئن می‌شوم هشدار فشار کم خاموش شده است. پدال ترمز را فشار می‌دهم؛ نباید حالت اسفنجی، حرکت بیش از حد یا افت غیرعادی فشار وجود داشته باشد. سپس در محل امن و با سرعت کم ترمز می‌کنم؛ خودرو باید مستقیم، مؤثر و بدون کشیدن به یک سمت متوقف شود.",
    answerEn: "Before moving, build the air pressure to its operating range and ensure the low-pressure warning has cleared. Apply the brake pedal; it should not feel spongy, travel excessively or cause abnormal pressure loss. Then brake at low speed in a safe area; the vehicle should stop effectively and in a straight line.",
    tipFa: "با هشدار فشار هوای کم یا ترمز معیوب هرگز حرکت نکنید.",
    tipEn: "Never move with a low-air-pressure warning or defective brakes."
  },
  {
    id: 2,
    type: "tell",
    questionFa: "چگونه ترمز پارک خودرو سنگین را بررسی می‌کنید؟",
    questionEn: "How would you check the parking brake?",
    answerFa: "در محل امن، ترمز پارک را کامل درگیر می‌کنم و بررسی می‌کنم کنترل آن در وضعیت قفل می‌ماند. با انتخاب دنده مناسب و واردکردن نیروی بسیار ملایم، آزمون کشش کنترل‌شده انجام می‌دهم؛ خودرو نباید حرکت کند. برای تریلر، ترمز پارک تریلر نیز باید طبق روش سازنده بررسی شود.",
    answerEn: "In a safe area, fully apply the parking brake and check that its control remains locked in position. Select an appropriate gear and apply very gentle drive for a controlled tug test; the vehicle must not move. Where applicable, test the trailer parking brake using the manufacturer's procedure.",
    tipFa: "پیش از آزمون مطمئن شوید اطراف خودرو خالی است و از نیروی زیاد استفاده نکنید.",
    tipEn: "Ensure the area is clear before testing and do not use excessive power."
  },
  {
    id: 3,
    type: "tell",
    questionFa: "چگونه فشارسنج‌های هوای ترمز را بررسی می‌کنید؟",
    questionEn: "How would you check the air-pressure gauges?",
    answerFa: "موتور را روشن می‌کنم و بالا رفتن فشار هر مدار را روی فشارسنج‌ها زیر نظر می‌گیرم تا به محدوده کاری تعیین‌شده سازنده برسد. هشدار دیداری یا شنیداری فشار کم باید در فشار صحیح خاموش شود. پس از خاموش‌کردن موتور و اعمال ترمز، افت فشار را طبق حدود مجاز دفترچه یا رویه شرکت بررسی می‌کنم.",
    answerEn: "Start the engine and watch each circuit gauge rise to the manufacturer's operating range. The visual or audible low-pressure warning must cancel at the correct pressure. After stopping the engine and applying the brakes, check pressure loss against the handbook or operator's permitted limits.",
    tipFa: "زمان طولانی برای پرشدن یا افت سریع فشار نشانه نشتی یا عیب سیستم است.",
    tipEn: "Slow pressure build-up or rapid pressure loss indicates a leak or system fault."
  },
  {
    id: 4,
    type: "tell",
    questionFa: "چگونه از ایمن‌بودن اتصال تریلر مطمئن می‌شوید؟",
    questionEn: "How would you check trailer coupling security?",
    answerFa: "پس از اتصال، قفل‌شدن مکانیزم را با بازدید مستقیم و نشانگر ایمنی بررسی می‌کنم و آزمون کشش آرام انجام می‌دهم. پایه‌های تریلر باید کاملاً بالا و محکم باشند، دستگیره و قفل‌ها در جای خود قرار گیرند و شلنگ‌های هوا و کابل برق درست متصل، بدون پیچ‌خوردگی و با فضای کافی برای گردش باشند. ترمز تریلر و چراغ‌ها را نیز آزمایش می‌کنم.",
    answerEn: "After coupling, visually confirm the mechanism and safety indicator are locked, then perform a gentle tug test. Landing legs must be fully raised and secured, handles and locks stowed, and air lines and electrical leads correctly connected, untwisted and free to turn. Also test the trailer brakes and lights.",
    tipFa: "فقط به صدای قفل‌شدن اعتماد نکنید؛ اتصال را از نزدیک و با آزمون کشش تأیید کنید.",
    tipEn: "Do not rely only on the locking sound; visually inspect and tug-test the coupling."
  },
  {
    id: 5,
    type: "tell",
    questionFa: "چگونه اتصال صفحه پنجم را بررسی می‌کنید؟",
    questionEn: "How would you check a fifth-wheel coupling?",
    answerFa: "پیش از کوپل‌کردن، صفحه پنجم و کینگ‌پین را از نظر آسیب، آلودگی و روغن‌کاری مناسب بررسی می‌کنم و ارتفاع تریلر را طوری تنظیم می‌کنم که تماس صحیح برقرار شود. پس از کوپل، از پشت و با چراغ‌قوه بررسی می‌کنم فک‌ها کاملاً دور کینگ‌پین بسته‌اند، ضامن ایمنی درگیر است و بین صفحه تریلر و صفحه پنجم فاصله‌ای وجود ندارد؛ سپس آزمون کشش انجام می‌دهم.",
    answerEn: "Before coupling, inspect the fifth wheel and kingpin for damage, contamination and correct lubrication, and set the trailer height for proper contact. After coupling, inspect from behind with a torch to confirm the jaws fully enclose the kingpin, the safety lock is engaged and there is no gap between the plates; then perform a tug test.",
    tipFa: "هرگز برای بازدید به زیر تریلر بدون ایمن‌سازی مناسب نخزید.",
    tipEn: "Never crawl beneath a trailer unless it has been properly secured."
  },
  {
    id: 6,
    type: "tell",
    questionFa: "چگونه بازتابنده‌ها و نشانگرهای خودرو را بررسی می‌کنید؟",
    questionEn: "How would you check reflectors and marker lights?",
    answerFa: "دور خودرو و تریلر راه می‌روم و بازتابنده‌ها، نوارهای شب‌نما، چراغ‌های جانبی، چراغ‌های تعیین عرض و علائم عقب را بررسی می‌کنم. همه باید مطابق محل مقرر نصب، تمیز، سالم، محکم و بدون پوشیدگی توسط گل، برزنت یا بار باشند. رنگ و جهت آن‌ها نیز باید صحیح باشد.",
    answerEn: "Walk around the vehicle and trailer, checking reflectors, conspicuity markings, side markers, outline lights and rear markings. They must be correctly positioned, clean, undamaged, secure and unobscured by dirt, sheets or the load. Their colour and orientation must also be correct.",
    tipFa: "کثیفی روی علائم بازتابنده می‌تواند خودرو بزرگ را در شب تقریباً نامرئی کند.",
    tipEn: "Dirt on reflective markings can make a large vehicle very difficult to see at night."
  },
  {
    id: 7,
    type: "tell",
    questionFa: "چگونه وضعیت لاستیک‌های خودرو سنگین را بررسی می‌کنید؟",
    questionEn: "How would you check HGV tyre condition?",
    answerFa: "تمام لاستیک‌ها، از جمله جفت‌چرخ‌ها، را از نظر بریدگی عمیق، برآمدگی، نمایان‌شدن سیم، جسم خارجی، فرسودگی نامنظم و فشار نامناسب بررسی می‌کنم. حداقل معمول آج برای خودرو سنگین ۱ میلی‌متر در سه‌چهارم میانی پهنا و در تمام محیط است. بین جفت‌چرخ‌ها نباید سنگ یا جسم گیر کرده باشد و تایرهای یک محور باید از نظر نوع و اندازه سازگار باشند.",
    answerEn: "Inspect every tyre, including twin wheels, for deep cuts, bulges, exposed cord, embedded objects, uneven wear and incorrect pressure. The normal legal minimum for large vehicles is 1 mm across the central three-quarters and around the entire circumference. Nothing should be trapped between twins, and tyres on an axle must be compatible in type and size.",
    tipFa: "کناره داخلی جفت‌چرخ‌ها را با دقت ببینید؛ عیب آن قسمت به‌راحتی پنهان می‌ماند.",
    tipEn: "Inspect the inner faces of twin tyres carefully; defects there are easily missed."
  },
  {
    id: 8,
    type: "tell",
    questionFa: "چگونه کالیبراسیون تاخوگراف را بررسی می‌کنید؟",
    questionEn: "How would you check tachograph calibration?",
    answerFa: "پلاک یا برچسب کالیبراسیون را بررسی می‌کنم تا تاریخ آخرین کالیبراسیون، مشخصات خودرو و اندازه مؤثر لاستیک‌ها با خودرو مطابقت داشته باشد و مهلت بازرسی نگذشته باشد. پلمب‌ها باید سالم باشند و دستگاه نباید خطا نشان دهد. پس از تغییراتی مانند اندازه لاستیک یا پلاک خودرو ممکن است کالیبراسیون مجدد لازم باشد.",
    answerEn: "Check the calibration plaque or label to confirm the last calibration date, vehicle details and effective tyre size match the vehicle and that inspection is not overdue. Seals must be intact and the unit must show no fault. Recalibration may be required after changes such as tyre size or registration details.",
    tipFa: "برای بازه دقیق کالیبراسیون و بازرسی، مقررات جاری و رویه بهره‌بردار را بررسی کنید.",
    tipEn: "Check current regulations and operator procedures for the exact calibration and inspection interval."
  },
  {
    id: 9,
    type: "tell",
    questionFa: "چگونه ایمن‌بودن بار را بررسی می‌کنید؟",
    questionEn: "How would you check load security?",
    answerFa: "بررسی می‌کنم وزن کل و بار هر محور از حدود مجاز بیشتر نباشد و بار به‌طور متعادل، با مرکز ثقل تا حد ممکن پایین، چیده شده باشد. تسمه‌ها، زنجیرها، قفل‌ها، پرده‌ها و نقاط مهار باید مناسب بار، سالم و محکم باشند و هیچ بخشی نتواند حرکت کند، بریزد یا از خودرو بیرون بزند. پس از شروع سفر و در توقف‌های مناسب مهارها را دوباره بررسی می‌کنم.",
    answerEn: "Confirm gross and axle weights are within limits and the load is evenly distributed with its centre of gravity as low as practicable. Straps, chains, locks, curtains and anchorage points must suit the load, be undamaged and secure, with nothing able to move, fall or project dangerously. Recheck restraints after setting off and at suitable stops.",
    tipFa: "پرده کناری معمولاً به‌تنهایی وسیله مهار بار نیست، مگر اینکه برای این کار تأیید شده باشد.",
    tipEn: "A curtain side is not normally load restraint unless specifically rated for that purpose."
  },
  {
    id: 10,
    type: "show",
    questionFa: "نشان دهید چگونه تمام چراغ‌های خودرو را بررسی می‌کنید.",
    questionEn: "Show how you would check all vehicle lights.",
    answerFa: "چراغ‌ها و فلاشر چهارطرفه را روشن می‌کنم و دور کشنده و تریلر راه می‌روم. نورپایین، نوربالا، چراغ‌های جلو و عقب، راهنماها، چراغ ترمز، چراغ دنده‌عقب، چراغ پلاک، چراغ‌های جانبی و تعیین عرض را بررسی می‌کنم. برای چراغ ترمز و دنده‌عقب از کمک شخص دیگر یا روش آزمون مورد تأیید بهره‌بردار استفاده می‌کنم.",
    answerEn: "Switch on the lights and hazards and walk around the tractor and trailer. Check dipped and main beam, front and rear lamps, indicators, brake lights, reversing lights, number-plate lights, side markers and outline lights. Use another person or an approved operator test method for brake and reversing lights.",
    tipFa: "پیش از حرکت، چراغ‌های کثیف را تمیز و هر عیب را ثبت و گزارش کنید.",
    tipEn: "Clean dirty lamps and record and report every defect before moving."
  },
  {
    id: 11,
    type: "show",
    questionFa: "نشان دهید چگونه مکانیزم اتصال تریلر را به کار می‌اندازید.",
    questionEn: "Show how you would operate the coupling mechanism.",
    answerFa: "خودرو و تریلر را روی سطح محکم و صاف قرار می‌دهم، ترمزهای پارک را درگیر و اطراف را بررسی می‌کنم. طبق روش سازنده، ارتفاع را تنظیم می‌کنم، به‌آرامی هم‌راستا می‌شوم و اتصال را درگیر می‌کنم. سپس بازدید مستقیم، درگیری ضامن ایمنی و آزمون کشش را انجام می‌دهم؛ بعد شلنگ‌ها و کابل‌ها را وصل و پایه‌ها را کاملاً بالا می‌برم.",
    answerEn: "Position vehicle and trailer on firm, level ground, apply parking brakes and check the area. Following the manufacturer's procedure, set the height, align slowly and engage the coupling. Visually inspect it, secure the safety lock and tug-test it; then connect lines and leads and fully raise the landing legs.",
    tipFa: "ترتیب دقیق اتصال و جداسازی را همیشه طبق سازنده و رویه شرکت انجام دهید.",
    tipEn: "Always follow the manufacturer's and operator's exact coupling and uncoupling sequence."
  },
  {
    id: 12,
    type: "show",
    questionFa: "نشان دهید چگونه مهره‌های چرخ را بررسی می‌کنید.",
    questionEn: "Show how you would check the wheel nuts.",
    answerFa: "دور هر چرخ را نگاه می‌کنم و وجود همه مهره‌ها، محکم‌بودن ظاهری و نبود ترک، زنگ‌زدگی یا رد حرکت اطراف مهره و سوراخ‌ها را بررسی می‌کنم. نشانگرهای مهره باید در آرایش تعیین‌شده باشند. اگر مهره شل به نظر برسد، با خودرو حرکت نمی‌کنم و سفت‌کردن با گشتاور صحیح را به فرد مجاز می‌سپارم.",
    answerEn: "Inspect every wheel for all nuts being present, apparently secure, and free from cracks, corrosion or movement marks around nuts and holes. Wheel-nut indicators should remain in their set pattern. If a nut appears loose, do not drive; have an authorised person tighten it to the correct torque.",
    tipFa: "با لگدزدن یا ضربه‌زدن نمی‌توان گشتاور صحیح مهره چرخ را تأیید کرد.",
    tipEn: "Kicking or striking a wheel nut does not confirm correct torque."
  },
  {
    id: 13,
    type: "show",
    questionFa: "نشان دهید چگونه آزمون ترمز بادی را انجام می‌دهید.",
    questionEn: "Show how you would carry out an air-brake test.",
    answerFa: "خودرو را ایمن و ثابت می‌کنم، فشار هوا را تا محدوده کاری بالا می‌برم و خاموش‌شدن هشدار فشار کم را بررسی می‌کنم. موتور را خاموش می‌کنم، ترمز پارک را طبق روش آزمون آزاد یا درگیر نگه می‌دارم و پدال ترمز را فشار می‌دهم؛ افت فشار در زمان تعیین‌شده نباید از حد سازنده یا بهره‌بردار بیشتر باشد. سپس با چند بار فشردن پدال، عملکرد هشدار فشار کم را تأیید می‌کنم و پیش از حرکت دوباره فشار را کامل بالا می‌برم.",
    answerEn: "Secure the stationary vehicle, build air pressure to the operating range and confirm the low-pressure warning clears. Stop the engine, set the parking brake as required by the test procedure and apply the footbrake; pressure loss over the specified time must remain within the manufacturer's or operator's limit. Pump the pedal to confirm the low-pressure warning operates, then fully rebuild pressure before moving.",
    tipFa: "حدود افت فشار و ترتیب آزمون بین خودروها فرق دارد؛ روش همان خودرو را دنبال کنید.",
    tipEn: "Pressure-loss limits and test sequences vary; follow the procedure for that vehicle."
  },
  {
    id: 14,
    type: "show",
    questionFa: "نشان دهید چگونه تنظیم آینه‌ها را بررسی می‌کنید.",
    questionEn: "Show how you would check mirror adjustment.",
    answerFa: "ابتدا صندلی و وضعیت رانندگی را درست تنظیم می‌کنم، سپس آینه‌های اصلی، زاویه‌باز، نزدیک و جلو را طوری تنظیم می‌کنم که نواحی مورد نظر اطراف خودرو دیده شوند و نقاط کور تا حد ممکن کاهش یابند. شیشه آینه‌ها و دوربین‌ها باید تمیز، سالم و محکم باشند. تنظیم را پیش از حرکت انجام می‌دهم.",
    answerEn: "First set the seat and driving position correctly, then adjust the main, wide-angle, close-proximity and front mirrors to cover their intended areas and minimise blind spots. Mirror glass and cameras must be clean, undamaged and secure. Make adjustments before moving.",
    tipFa: "آینه‌ها نقاط کور را کم می‌کنند، اما بازدید مستقیم و استفاده درست از دوربین‌ها همچنان لازم است.",
    tipEn: "Mirrors reduce blind spots, but direct observation and correct camera use are still necessary."
  },
  {
    id: 15,
    type: "show",
    questionFa: "نشان دهید چگونه سیستم سوخت را از نظر نشتی بررسی می‌کنید.",
    questionEn: "Show how you would check the fuel system for leaks.",
    answerFa: "با موتور خاموش، از فاصله ایمن مخزن، درپوش، بست‌ها، لوله‌ها و محل زیر خودرو را از نظر خیسی، چکه، لکه تازه یا بوی سوخت بررسی می‌کنم. پس از روشن‌کردن موتور نیز بدون لمس قطعات یا رفتن زیر خودرو، دوباره نشتی قابل مشاهده را کنترل می‌کنم. هر نشتی را فوراً گزارش می‌کنم، موتور را خاموش نگه می‌دارم و خودرو را حرکت نمی‌دهم.",
    answerEn: "With the engine off, inspect the tank, cap, mountings, visible lines and ground beneath from a safe position for wetness, drips, fresh stains or fuel smell. After starting, recheck for visible leakage without touching components or going beneath the vehicle. Report any leak immediately, keep the engine off and do not move the vehicle.",
    tipFa: "نزدیک سوخت سیگار نکشید و از شعله یا وسیله جرقه‌زا استفاده نکنید.",
    tipEn: "Do not smoke or use flames or spark-producing equipment near fuel."
  }
];

window.SHOW_ME_TELL_ME = SHOW_ME_TELL_ME;
