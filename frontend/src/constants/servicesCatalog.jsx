import {
  DentalImplantFixture,
  DentalBracesIcon,
  DentalVeneerCrown,
  DentalToothMolar,
  DentalDenturesIcon,
  DentalAlignersIcon,
  DentalWhiteningZoom,
  DentalSurgeryExtraction,
} from "../components/MedicalIcons";
import { assets } from "../assets/assets";

export const SERVICES_CATALOG = [
  {
    id: "dental-implant",
    icon: <DentalImplantFixture className="w-7 h-7 text-primary" />,
    image: assets.treatment_implant,
    category: {
      uz: "Dental Implantologiya",
      ru: "Дентальная Имплантология",
      en: "Dental Implantology",
    },
    title: {
      uz: "Dental Implantatsiya (MegaGen & Biotitan)",
      ru: "Дентальная Имплантация Зубов (MegaGen)",
      en: "Dental Implants (MegaGen & Titanium Systems)",
    },
    shortDesc: {
      uz: "Yo'qotilgan tishlarni qo'shni tishlarni charxlamasdan, Janubiy Koreyaning MegaGen premium biotitan implantlari bilan 15-20 daqiqada og'riqsiz tiklash.",
      ru: "Восстановление утраченных зубов без обточки соседних за 15-20 минут с корейскими имплантатами MegaGen и пожизненной гарантией.",
      en: "Restore missing teeth gently in 15-20 minutes with world-class MegaGen titanium implants without grinding adjacent healthy teeth.",
    },
    duration: { uz: "20 daqiqa (1 qabul)", ru: "20 минут (1 визит)", en: "20 mins (1 visit)" },
    warranty: { uz: "Umrbod rasmiy kafolat", ru: "Пожизненная гарантия", en: "Lifetime warranty" },
    highlights: {
      uz: [
        "Samarqand Davlat Tibbiyot Universiteti & MegaGen International xalqaro sertifikati",
        "Navigatsion jarrohlik va suyak-plastik shablonlar asosida aniq o'rnatish",
        "2 bosqichli mikro-anesteziya: muolaja davomida 0% og'riq",
        "10 yillik klinik tajriba va 100% biotitan biomoslashuvchanlik",
      ],
      ru: [
        "Международные сертификаты СамГМУ и MegaGen International",
        "Навигационная хирургия и костно-пластические протоколы от А до Я",
        "Двухэтапная анестезия: абсолютно без боли и дискомфорта",
        "10 лет клинической практики и приживаемость свыше 99.5%",
      ],
      en: [
        "Certified in MegaGen Surgical & Prosthodontic protocols & Samarkand State Medical University",
        "Guided navigation surgery & precision bone regeneration",
        "Two-stage gentle anesthesia: completely zero pain",
        "10 years of clinical mastery and premium biocompatible titanium",
      ],
    },
  },
  {
    id: "breketlar",
    icon: <DentalBracesIcon className="w-7 h-7 text-brandOrange" />,
    image: assets.treatment_braces,
    category: {
      uz: "Ortodontiya",
      ru: "Ортодонтия",
      en: "Orthodontics",
    },
    title: {
      uz: "Ortodontik Breketlar (Metall va Keramik)",
      ru: "Ортодонтические Брекеты (Металл и Керамика)",
      en: "Orthodontic Brackets (Metal & Ceramic Braces)",
    },
    shortDesc: {
      uz: "Egri tishlar, orasi ochiqliklar va noto'g'ri tishlash (prikus) holatlarini zamonaviy metall va ko'rinmas estetik sapfir/keramik breketlar yordamida to'g'rilash.",
      ru: "Исправление прикуса и выравнивание зубного ряда металлическими и эстетическими керамическими брекет-системами.",
      en: "Comprehensive smile straightening and bite alignment using precision metal and discreet ceramic brackets.",
    },
    duration: { uz: "Individual davolash rejasi", ru: "Индивидуальный план", en: "Personalized plan" },
    warranty: { uz: "Mustahkam natija", ru: "Устойчивый результат", en: "Permanent alignment" },
    highlights: {
      uz: [
        "Klassik metall, o'z-o'zini ligaturlaydigan (Damon) va estetik keramik breketlar",
        "3D raqamli modellashtirish orqali tish harakatini nazorat qilish",
        "Bolalar va kattalar uchun tishlash nuqsonlarini to'g'rilash",
        "Davolash davomida har oylik muntazam professional nazorat",
      ],
      ru: [
        "Металлические, самолигирующие и незаметные керамические брекеты",
        "Цифровой расчет перемещения каждого зуба с микронной точностью",
        "Исправление скученности и сложных дефектов прикуса у взрослых и подростков",
        "Регулярное сопровождение и наблюдение на каждом этапе",
      ],
      en: [
        "Traditional metal, self-ligating and aesthetic ceramic options",
        "Digital arch analysis and gradual biomechanical alignment",
        "Treating bite crowding and misalignment across all age groups",
        "Continuous clinical monitoring throughout the treatment course",
      ],
    },
  },
  {
    id: "sirkon-keramika-karonkalar",
    icon: <DentalVeneerCrown className="w-7 h-7 text-primary" />,
    image: assets.treatment_crowns,
    category: {
      uz: "Ortopedik Stomatologiya",
      ru: "Ортопедия",
      en: "Prosthodontics",
    },
    title: {
      uz: "Sirkon va Keramika Karonkalar (CAD/CAM)",
      ru: "Циркониевые и Керамические Коронки (CAD/CAM)",
      en: "Zirconia & Ceramic Crowns (CAD/CAM Precision)",
    },
    shortDesc: {
      uz: "Sinib ketgan yoki yemirilgan tishlarni metall-siz, milkka mutlaqo zarar bermaydigan monolit tsirkoniy va press-keramika qoplamalar bilan tabiiy tiklash.",
      ru: "Эстетическое восстановление зубов безметалловыми циркониевыми коронками и керамикой без тёмного ободка у десны.",
      en: "Restore fractured or damaged teeth with monolithic zirconia and press-ceramic crowns for superior strength and natural luster.",
    },
    duration: { uz: "2 – 3 kun", ru: "2 – 3 дня", en: "2 – 3 days" },
    warranty: { uz: "10 yilgacha kafolat", ru: "Гарантия до 10 лет", en: "Up to 10-year warranty" },
    highlights: {
      uz: [
        "100% biomoslashuvchan tsirkoniy: milk qorayishi va metall ta'mi yo'q",
        "CAD/CAM 3D raqamli frezerlash orqali mukammal jipslashish",
        "Old va orqa (chaynash) tishlar uchun yuqori mustahkamlik",
        "Vaqtinchalik qoplamalar orqali muolaja davomida to'liq qulaylik",
      ],
      ru: [
        "Биосовместимый диоксид циркония: никакого посинения десны",
        "CAD/CAM 3D моделирование для идеального прилегания",
        "Максимальная прочность для жевательных и передних зубов",
        "Эстетичные временные коронки на период изготовления",
      ],
      en: [
        "100% biocompatible monolithic zirconia with zero dark gum lines",
        "CAD/CAM digital milling for micron-accurate margin fit",
        "Exceptional chewing load durability and lifelike translucency",
        "Temporary crowns provided to ensure immediate aesthetic comfort",
      ],
    },
  },
  {
    id: "vinirlar",
    icon: <DentalVeneerCrown className="w-7 h-7 text-brandCyan" />,
    image: assets.treatment_veneers,
    category: {
      uz: "Estetik Stomatologiya",
      ru: "Эстетическая Стоматология",
      en: "Aesthetic Dentistry",
    },
    title: {
      uz: "E-max Estetik Vinirlar (Gollivud Tabassumi)",
      ru: "Керамические Виниры E-max (Голливудская Улыбка)",
      en: "E-max Aesthetic Veneers (Hollywood Smile)",
    },
    shortDesc: {
      uz: "Old tishlarning shakli, rangi va nuqsonlarini minimal yonish orqali ultra-yupqa (0.3 mm) Shveysariya/Germaniya E-max keramik vinirlari bilan mukammallashtirish.",
      ru: "Идеальная зона улыбки: ультратонкие виниры E-max для коррекции цвета, сколов и диастем с минимальной обработкой эмали.",
      en: "Transform your smile with ultra-thin E-max ceramic veneers, correcting discolorations, chips, and gaps with minimal prep.",
    },
    duration: { uz: "1 – 2 ta tashrif", ru: "1 – 2 визита", en: "1 – 2 visits" },
    warranty: { uz: "10–15 yil xizmat muddati", ru: "Срок службы 10–15 лет", en: "10–15+ years lifespan" },
    highlights: {
      uz: [
        "Yuz tuzilishingiz va tabassumingizga mos individual Smile Design",
        "Tish emalini maksimal asrab qoluvchi nozik ishlov berish",
        "Qahva, choy va chekishdan rangini o'zgartirmaydigan doimiy yaltiroqlik",
        "Tabiiy emalning yorug'lik o'tkazuvchanligi va shaffofligi",
      ],
      ru: [
        "Индивидуальный цифровой дизайн улыбки (Digital Smile Design)",
        "Максимальное сохранение живых тканей зуба",
        "Устойчивость к красящим напиткам: цвет не тускнеет со временем",
        "Полная светопроницаемость и глубина живой эмали",
      ],
      en: [
        "Bespoke digital smile architecture calibrated to facial aesthetics",
        "Minimally invasive enamel preservation techniques",
        "Stain-resistant porcelain impervious to coffee and tea",
        "Natural depth and optical translucency matching authentic teeth",
      ],
    },
  },
  {
    id: "pratezlar",
    icon: <DentalDenturesIcon className="w-7 h-7 text-primary" />,
    image: assets.treatment_dentures,
    category: {
      uz: "Protezlash",
      ru: "Протезирование Зубов",
      en: "Dentures & Prosthetics",
    },
    title: {
      uz: "Zamonaviy Tish Protezlari (Olinadigan & Olinmaydigan)",
      ru: "Зубные Протезы (Съемные и Несъемные)",
      en: "Modern Dental Prosthetics (Removable & Fixed Dentures)",
    },
    shortDesc: {
      uz: "Bir nechta yoki barcha tishlar yo'qolganda qulay, yengil va mustahkam byugel, elastik neylon (Acry-Free) hamda to'liq protezlar orqali chaynashni tiklash.",
      ru: "Легкие и надежные бюгельные, нейлоновые и безакриловые протезы для полного восстановления жевательной функции.",
      en: "Restore comfortable chewing and speech with lightweight бюгель, flexible nylon, and full precision dentures.",
    },
    duration: { uz: "3 – 5 kun", ru: "3 – 5 дней", en: "3 – 5 days" },
    warranty: { uz: "Kafolatlangan qulaylik", ru: "Гарантия удобства", en: "Comfort warranty" },
    highlights: {
      uz: [
        "Elastik neylon va byugel protezlar: tanglayni to'liq yopmaydi, nutqni buzmaydi",
        "Tishlarga mahkam o'rnashuvchi zamonaviy ko'rinmas qulflar (ataчmenlar)",
        "Allergiya chaqirmaydigan zamonaviy termoplastik materiallar",
        "Bemorning yoshiga va qulayligiga qarab individual moslashuv",
      ],
      ru: [
        "Бюгельные и нейлоновые протезы: комфортны, не нарушают дикцию",
        "Современные незаметные замковые крепления",
        "Гипоаллергенные инновационные полимерные материалы",
        "Индивидуальная подгонка без натирания десен",
      ],
      en: [
        "Flexible nylon and cast-metal partials designed for natural speech",
        "Precision attachment clasps hidden from sight",
        "Hypoallergenic biocompatible polymers",
        "Custom contouring to eliminate pressure points and gum irritation",
      ],
    },
  },
  {
    id: "elaynerlar",
    icon: <DentalAlignersIcon className="w-7 h-7 text-brandCyan" />,
    image: assets.treatment_aligners,
    category: {
      uz: "Shaffof Ortodontiya",
      ru: "Элайнеры",
      en: "Clear Aligners",
    },
    title: {
      uz: "Ko'rinmas Shaffof Elaynerlar (Aligners / Kapalar)",
      ru: "Прозрачные Элайнеры (Невидимые Капы)",
      en: "Clear Invisible Aligners (Smile Straightening)",
    },
    shortDesc: {
      uz: "Temir simlarsiz va breketsiz, atrofdagilarga mutlaqo ko'rinmaydigan shaffof kapalar yordamida tishlarni tekislash va tabassumni go'zallashtirish.",
      ru: "Незаметное и комфортное исправление зубного ряда прозрачными капами без металлических замочков и дуг.",
      en: "Straighten teeth discreetly without metal wires or brackets using custom clear aligners that are virtually undetectable.",
    },
    duration: { uz: "Bosqichma-bosqich kapalar", ru: "Серия кап", en: "Sequential trays" },
    warranty: { uz: "3D Reja bo'yicha natija", ru: "Результат по 3D плану", en: "Predictable 3D results" },
    highlights: {
      uz: [
        "100% shaffof va ko'rinmas: suhbatdoshlaringiz sezmaydi",
        "Ovqatlanish va tish yuvishda oson yechib qo'yish imkoniyati",
        "Og'iz shilliq qavatini tilmaydi va yaralamaydi",
        "Oldindan 3D kompyuter modelida yakuniy natijani ko'rish",
      ],
      ru: [
        "100% прозрачность: окружающие не заметят процесс лечения",
        "Легко снимаются во время еды и чистки зубов",
        "Абсолютно гладкие: не травмируют слизистую полости рта",
        "3D визуализация конечного результата еще до начала ношения",
      ],
      en: [
        "100% transparent and discreet for everyday confidence",
        "Removable for effortless eating and oral hygiene",
        "Smooth medical-grade polymer with zero irritation to cheeks or lips",
        "3D digital treatment simulation showing end results in advance",
      ],
    },
  },
  {
    id: "tish-oqartirish",
    icon: <DentalWhiteningZoom className="w-7 h-7 text-brandOrange" />,
    image: assets.treatment_whitening,
    category: {
      uz: "Profilaktika va Estetika",
      ru: "Отбеливание и Гигиена",
      en: "Whitening & Hygiene",
    },
    title: {
      uz: "Professional Tish Oqartirish & AirFlow Gigiyena",
      ru: "Профессиональное Отбеливание Зубов и AirFlow",
      en: "Professional Teeth Whitening & AirFlow Hygiene",
    },
    shortDesc: {
      uz: "Emalga zarracha ziyon yetkazmagan holda tishlarni 4–8 tongacha oqartirish hamda ultratovush va AirFlow yordamida tish toshlari va karashlarni tozalash.",
      ru: "Безопасное осветление эмали на 4–8 тонов и бережная ультразвуковая чистка AirFlow от зубного камня и налета.",
      en: "Safely brighten your teeth by 4–8 shades without harming enamel, combined with gentle ultrasonic and AirFlow stain removal.",
    },
    duration: { uz: "40 – 50 daqiqa", ru: "40 – 50 минут", en: "40 – 50 mins" },
    warranty: { uz: "Uzoq muddatli yorqinlik", ru: "Длительный эффект", en: "Long-lasting brightness" },
    highlights: {
      uz: [
        "Emalni yemirmaydigan va sezgirlik chaqirmaydigan xavfsiz fotootbelivaniye",
        "Qahva, choy va sigareta oqibatidagi qora dog'larni 100% tozalash",
        "Milklarning qonashini to'xtatuvchi professional profilaktika",
        "Muolaja yakunida minerallashtiruvchi va mustahkamlovchi ftor-gel qo'llash",
      ],
      ru: [
        "Безопасная система, не повреждающая структуру эмали",
        "Полное удаление пигментного налета от кофе, чая и курения",
        "Снятие поддесневого камня и профилактика кровоточивости десен",
        "Реминерализация и укрепление эмали специальным гелем",
      ],
      en: [
        "Non-abrasive whitening chemistry preserving enamel crystal integrity",
        "Thorough elimination of stubborn tobacco, coffee, and tea stains",
        "Ultrasonic tartar scaling reducing gum inflammation and bleeding",
        "Post-treatment fluoride remineralization for sensitive enamel",
      ],
    },
  },
  {
    id: "ogriqsiz-tish-davolash",
    icon: <DentalToothMolar className="w-7 h-7 text-primary" />,
    image: assets.treatment_therapy,
    category: {
      uz: "Terapiya va Endodontiya",
      ru: "Терапия и Эндодонтия",
      en: "Restorative Therapy",
    },
    title: {
      uz: "Og'riqsiz Tish Davolash & Fotopolimer Restavratsiya",
      ru: "Безболезненное Лечение Зубов и Нано-Пломбы",
      en: "Painless Tooth Care & Nano-Composite Restorations",
    },
    shortDesc: {
      uz: "O'tkir tish og'rig'ini zudlik bilan to'xtatish, karies, pulpit va ildiz kanallarini Germaniya (3M Filtek) va Yaponiya (Estelite) fotopolimer plombalari bilan davolash.",
      ru: "Снятие острой боли за 1 визит, лечение кариеса и корневых каналов с нанокомпозитами из Германии (3M Filtek) и Японии (Estelite).",
      en: "Immediate relief from acute toothache and microscopic cavity treatment using authentic German and Japanese nano-composites.",
    },
    duration: { uz: "30 – 45 daqiqa", ru: "30 – 45 минут", en: "30 – 45 mins" },
    warranty: { uz: "5 yilgacha rasmiy kafolat", ru: "Гарантия до 5 лет", en: "Up to 5-year warranty" },
    highlights: {
      uz: [
        "Germaniya (3M Filtek) va Yaponiya (Estelite) xameleon plombalari",
        "2 bosqichli mikro-anesteziya: avval gel surtiladi, ukol ham sezilmaydi",
        "Apekslokator va raqamli rentgen nazorati ostida ildiz kanallarini tozalash",
        "Tishning tabiiy anatomiyasi, rangi va chaynash relyefini 100% tiklash",
      ],
      ru: [
        "Оригинальные фотополимеры 3M Filtek (Германия) и Estelite (Япония)",
        "Двухэтапная анестезия: предварительное нанесение замораживающего геля",
        "Эндодонтия под контролем апекслокатора и рентгена",
        "Точная анатомическая реставрация естественных бугров и цвета",
      ],
      en: [
        "Authentic 3M Filtek (Germany) & Tokuyama Estelite (Japan) composites",
        "Two-stage anesthesia: topical numbing gel eliminates needle sensation",
        "Precision root canal cleaning verified by digital apex locators",
        "Complete restoration of natural enamel translucency and chewing cusp anatomy",
      ],
    },
  },
  {
    id: "ogriqsiz-tish-olish",
    icon: <DentalSurgeryExtraction className="w-7 h-7 text-primary" />,
    image: assets.treatment_surgery,
    category: {
      uz: "Atravmatik Jarrohlik",
      ru: "Бережная Хирургия",
      en: "Oral Surgery",
    },
    title: {
      uz: "Og'riqsiz Tish Olish & Atravmatik Xirurgiya",
      ru: "Бережное Безболезненное Удаление Зубов и Хирургия",
      en: "Gentle Tooth Extraction & Oral Surgery",
    },
    shortDesc: {
      uz: "Murakkab, sinib qolgan tishlar hamda aql tishlarini (donolik tishlari) suyak va milk to'qimalarini asragan holda mutlaqo og'riqsiz va tez sug'urish.",
      ru: "Атравматичное удаление зубов мудрости и разрушенных корней без боли с сохранением костной лунки для будущей имплантации.",
      en: "Atraumatic extraction of wisdom teeth and fractured roots, conserving surrounding bone for swift recovery or future implants.",
    },
    duration: { uz: "10 – 20 daqiqa", ru: "10 – 20 минут", en: "10 – 20 mins" },
    warranty: { uz: "Asoratsiz tez bitish", ru: "Быстрое заживление", en: "Rapid complication-free healing" },
    highlights: {
      uz: [
        "Atravmatik texnika: tish suyak devorini shikastlamasdan ohista olinadi",
        "Aql tishlarini (donolik tishlari) yotgan yoki qiyshiq bo'lsa ham oson olish",
        "Yevropaning yuqori samarali xavfsiz anestetiklari",
        "Tish olingan joyga regeneratsiyani tezlashtiruvchi preparatlar qo'yish",
      ],
      ru: [
        "Атравматичная методика сохранения стенок альвеолярной лунки",
        "Удаление ретенированных и дистопированных «восьмерок» (зубов мудрости)",
        "Глубокая надежная анестезия европейскими препаратами",
        "Антисептическая защита и рекомендации для быстрого заживления",
      ],
      en: [
        "Atraumatic socket-preservation extraction protocol",
        "Surgical expertise in impacted and misaligned wisdom teeth",
        "High-grade European local anesthetics guaranteeing zero discomfort",
        "Biocompatible healing agents placed in the socket for rapid recovery",
      ],
    },
  },
];
