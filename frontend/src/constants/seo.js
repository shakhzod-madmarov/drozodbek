import { getYearsOfExperience } from "./doctor.js";

export const SITE_ORIGIN = "https://drozodbek.uz";

const years = getYearsOfExperience();

export const getPageSeo = (pageKey, lang = "uz") =>
  PAGE_SEO[pageKey]?.[lang] || PAGE_SEO[pageKey]?.uz || null;

export const PAGE_SEO = {
  home: {
    uz: {
      title: "Andijonda Stomatolog — Dr. Ozodbek Otaxonov | Stomatologiya Klinikasi",
      description: `Andijonda stomatologiya va vrach stomatolog qabuli: Dr. Ozodbek Otaxonov (10 yillik tajriba). Ukraina Stomatologiya Tibbiyot Akademiyasi bitiruvchisi. Dental implantatsiya MegaGen, breketlar, sirkon va keramik karonkalar, E-max vinirlar, pratezlar, elaynerlar va 100% og'riqsiz davolash. Tel: +998 97 833 89 97.`,
    },
    ru: {
      title: "Стоматология в Андижане — Стоматолог Озодбек Отахонов | Лечение Без Боли",
      description: `Стоматология в Андижане и приём врача-стоматолога: Д-р Озодбек Отахонов. 10 лет клинической практики, выпускник Украинской Медицинской Стоматологической Академии. Имплантация MegaGen, брекеты, циркониевые коронки, виниры, элайнеры, лечение зубов без боли. +998 97 833 89 97.`,
    },
    en: {
      title: "Dentist in Andijan — Dr. Ozodbek Otaxonov | Modern Dental Clinic",
      description: `Modern dental clinic in Andijan, Uzbekistan: Dr. Ozodbek Otaxonov, restorative dentist & implantologist with 10 years experience. Graduate of Ukrainian Medical Stomatological Academy. MegaGen dental implants, brackets, zirconia crowns, veneers, aligners, painless therapy. Tel: +998 97 833 89 97.`,
    },
  },
  services: {
    uz: {
      title: "Andijonda Stomatologiya Xizmatlari — Dr. Ozodbek Otaxonov | Barcha Xizmatlar",
      description:
        "Andijonda stomatologiya xizmatlari: dental implantatsiya MegaGen, breketlar, sirkon va keramik karonkalar, E-max vinirlar, tish protezlari, elaynerlar, Philips Zoom 4 oqartirish va 100% og'riqsiz davolash.",
    },
    ru: {
      title: "Стоматология в Андижане — Услуги и Цены | Стоматолог Озодбек Отахонов",
      description:
        "Все стоматологические услуги в Андижане: имплантация MegaGen, брекеты, циркониевые коронки, виниры E-max, протезирование, элайнеры, отбеливание Zoom 4 и удаление зубов без боли.",
    },
    en: {
      title: "Dental Services in Andijan — Dr. Ozodbek Otaxonov | Modern Clinic",
      description:
        "Comprehensive dentistry by Dr. Ozodbek Otaxonov in Andijan: MegaGen dental implants, braces, zirconia crowns, E-max veneers, dentures, clear aligners, whitening, and 100% painless therapy.",
    },
  },
  about: {
    uz: {
      title: `Dr. Ozodbek Otaxonov — Andijonda Vrach Stomatolog | ${years} Yillik Tajriba`,
      description: `Dr. Ozodbek Otaxonov — Andijonda 10 yillik tajribaga ega vrach stomatolog. Ukraina Stomatologiya Tibbiyot Akademiyasi (bakalavr) bitiruvchisi, Samarqand davlat tibbiyot universiteti va MegaGen xalqaro implantologiya sertifikatlari sohibi.`,
    },
    ru: {
      title: `О Докторе Озодбеке Отахонове — Стоматолог в Андижане | ${years} Лет Опыта`,
      description: `Врач-стоматолог Д-р Озодбек Отахонов в Андижане. Выпускник Украинской Медицинской Стоматологической Академии (бакалавр), сертифицированный специалист по имплантологии MegaGen. ${years} лет практики.`,
    },
    en: {
      title: `About Dr. Ozodbek Otaxonov — Dentist in Andijan (${years} Years Experience)`,
      description: `Meet Dr. Ozodbek Otaxonov, graduate of Ukrainian Medical Stomatological Academy (Bachelor of Dentistry) and certified MegaGen implantologist with ${years} years of dental practice in Andijan.`,
    },
  },
  contact: {
    uz: {
      title: "Andijonda Stomatologiya Manzili va Aloqa — Dr. Ozodbek Otaxonov | Smiles Dental Group",
      description:
        "Andijonda stomatolog qabuli: Dr. Ozodbek Otaxonov — Smiles Dental Group (1-kichik daha, 8A-bino, Konechka bozorchasi yaqinida). Telefon: +998 97 833 89 97, Telegram: @Stamatolog07, Instagram: @_vrach_stomatolog.",
    },
    ru: {
      title: "Стоматология в Андижане — Адрес и Контакты | Стоматолог Озодбек Отахонов",
      description:
        "Приём Стоматолога Озодбека Отахонова в клинике Smiles Dental Group (г. Андижан, 1-й микрорайон, 8A). Телефон: +998 97 833 89 97, Telegram: @Stamatolog07.",
    },
    en: {
      title: "Dentist in Andijan — Location & Contact | Dr. Ozodbek Otaxonov",
      description:
        "Book visit with Dr. Ozodbek Otaxonov at Smiles Dental Group (8A, 1st Microdistrict, Andijan). Tel: +998 97 833 89 97, Telegram: @Stamatolog07.",
    },
  },
  booking: {
    uz: {
      title: "Andijonda Stomatolog Qabuliga Yozilish — Dr. Ozodbek Otaxonov | Onlayn Bron",
      description:
        "Andijonda Dr. Ozodbek Otaxonov qabuliga onlayn yozilish. Bo'sh kun va soatni tanlang, qulay va navbatsiz ro'yxatdan o'ting. Tel: +998 97 833 89 97.",
    },
    ru: {
      title: "Запись к Стоматологу в Андижане — Д-р Озодбек Отахонов | Онлайн Запись",
      description:
        "Онлайн запись к Стоматологу Озодбеку Отахонову в Андижане: выберите удобный день и время приёма без очередей. Телефон: +998 97 833 89 97.",
    },
    en: {
      title: "Book Dentist Appointment in Andijan — Dr. Ozodbek Otaxonov",
      description:
        "Book your dental visit online with Dr. Ozodbek Otaxonov in Andijan. Select preferred date and time slot. Tel: +998 97 833 89 97.",
    },
  },
  notFound: {
    uz: {
      title: "Sahifa topilmadi (404) — Dr. Ozodbek Otaxonov",
      description: "Siz qidirgan sahifa topilmadi. Bosh sahifaga qaytishingiz mumkin.",
    },
    ru: {
      title: "Страница не найдена (404) — Д-р Озодбек Отахонов",
      description: "Запрошенная страница не найдена. Вернитесь на главную страницу.",
    },
    en: {
      title: "Page Not Found (404) — Dr. Ozodbek Otaxonov",
      description: "The page you are looking for does not exist. Please return to the homepage.",
    },
  },
};

export const PAGE_KEYWORDS = {
  uz: [
    // 1. Asosiy Qidiruv So'rovlari (Core Locative Queries)
    "andijonda stomatolog",
    "andijonda stomatologiya",
    "andijondagi stomatologiya",
    "andijondagi stomatologiya klinikalari",
    "andijon stomatologiya klinikalari",
    "andijonda stomatologiya narxlari",
    "andijonda eng yaxshi stomatolog",
    "andijonda yaxshi stomatolog",
    "andijonda tish davolash",
    "andijonda tish klinikasi",
    "andijonda tish shifokori",
    "andijonda tish dohtir",
    "andijon tish klinikasi",
    "stomatolog andijon",
    "vrach stomatolog andijon",
    "eng yaxshi stomatolog andijon",
    "yaxshi stomatolog andijon",
    "andijon stomatolog tavsiya",
    "andijon stomatologiya markazi",

    // 2. Shifokor Shaxsiyati va Brend (About Dentist & Identity)
    "dr ozodbek otaxonov",
    "doktor ozodbek otaxonov",
    "ozodbek otaxonov",
    "ozodbek stomatolog",
    "stomatolog ozodbek",
    "dr ozodbek",
    "doktor ozodbek",
    "shifokor ozodbek andijon",
    "ozodbek stomatolog andijon",
    "stomatolog ozodbek andijon",
    "vrach stomatolog ozodbek",
    "stamatolog07",
    "stomatolog 10 yil tajriba andijon",
    "ukraina stomatologiya tibbiyot akademiyasi bitiruvchisi",
    "ukraina stomatologiya akademiyasi poltava",
    "samarqand davlat tibbiyot universiteti stomatolog",
    "megagen xalqaro implantologiya sertifikati",
    "shaxsiy stomatolog andijon",

    // 3. Xizmatlar: Dental Implantatsiya (MegaGen)
    "andijonda dental implantat",
    "andijon implantat",
    "dental implant andijon",
    "tish implantatsiyasi andijon",
    "tish ekish andijon",
    "andijonda implant narxi",
    "tish ekish andijon narxlari",
    "megagen implant andijon",
    "megagen anyridge andijon",
    "megagen anyone",
    "biotitan implant andijon",
    "suyak plastikasi andijon",
    "sinus lifting andijon",
    "ogriqsiz implantatsiya andijon",
    "bir kunda tish ekish andijon",

    // 4. Xizmatlar: Breketlar va Ortodontiya (Damon)
    "andijonda breket",
    "andijonda breketlar",
    "breketlar andijon",
    "damon breket andijon",
    "andijonda breket narxlari",
    "breket qoydirish andijon narxi",
    "metall breketlar andijon",
    "keramik breket andijon",
    "sapfir breketlar andijon",
    "tishlarni tekislash andijon",
    "egri tishlarni togirlash andijon",
    "diastema tish orasi ochiqligi",
    "notogri prikus davolash andijon",
    "prikus togirlash andijon",

    // 5. Xizmatlar: Sirkon va Keramika Karonkalar (CAD/CAM)
    "sirkon karonka narxi",
    "andijonda sirkon karonka narxi",
    "tsirkoniy tish qoplama andijon",
    "sirkon karonka andijon",
    "keramika karonka",
    "monolit sirkon karonka",
    "cad cam sirkon karonka andijon",
    "nemis sirkoni andijon",
    "yaponiya sirkoni katano",
    "metallsiz qoplama andijon",
    "singan tishni qoplash andijon",
    "old tishga sirkon karonka",

    // 6. Xizmatlar: Vinirlar (E-max Gollivud Tabassumi)
    "vinirlar andijon",
    "andijonda vinirlar narxi",
    "e-max vinirlar andijon",
    "keramik vinir andijon",
    "gollivud tabassumi andijon",
    "hollywood smile andijon",
    "old tishlarga vinir qoydirish",
    "shpon tishlar andijon",
    "tabassumni gozallashtirish andijon",

    // 7. Xizmatlar: Tish Protezlari (Pratezlar)
    "tish protezlari andijon",
    "andijonda tish protezlari narxi",
    "yasama tish andijon",
    "byugel protez andijon",
    "valplast yumshoq protez andijon",
    "akril protez andijon",
    "butun jag tish protezi",
    "olinadigan tish protezi andijon",

    // 8. Xizmatlar: Elaynerlar (Shaffof Kapalar)
    "elaynerlar andijon",
    "andijonda elaynerlar narxi",
    "shaffof kapalar andijon",
    "breketsiz tish tekislash andijon",
    "3d korinmas kapalar andijon",
    "ortodontik kapalar andijon",

    // 9. Xizmatlar: Tish Oqartirish (Philips Zoom 4)
    "tish oqartirish andijon",
    "philips zoom 4 andijon",
    "zoom 4 oqartirish andijon narxi",
    "klinik tish oqartirish andijon",
    "sariq tishlarni oqartirish andijon",
    "tish toshini tozalash andijon",
    "air flow tozalash andijon",
    "tishlarni zararsiz oqartirish",

    // 10. Xizmatlar: Og'riqsiz Davolash va Karies Terapiyasi
    "ogriqsiz tish davolash",
    "ogriqsiz tish davolash andijon",
    "tish kariesini davolash",
    "karies davolash andijon",
    "pulpit davolash andijon",
    "tish nervini ogriqsiz olish",
    "ildiz kanallarini davolash andijon",
    "estetik plomba andijon",
    "nurli plomba andijon",
    "tushgan plombani yangilash andijon",
    "plomba tushishi nima qilish kerak",
    "2 bosqichli ogriqsiz mikro anesteziya",
    "mevali gel bilan ogriqsizlantirish",

    // 11. Xizmatlar: Og'riqsiz Tish Olish va Jarrohlik
    "ogriqsiz tish olish andijon",
    "aql tishini oldirish andijon",
    "sakkizlik tishni olish andijon",
    "atravmatik tish olish andijon",
    "ildiz qolib ketganda tish olish",

    // 12. Zamonaviy Texnologiyalar (Equipment)
    "shining 3d skaner stomatolog",
    "shining 3d intraoralscan andijon",
    "optik skaner tish olchami",
    "slepok pastasiz tish olchami olish",
    "raqamli stomatologiya andijon",
    "philips zoom whitespeed 4 andijon",

    // 13. Lokatsiya va Mo'ljallar (Neighborhood & Landmarks)
    "smiles dental group",
    "smiles dental group andijon",
    "1-kichik daha stomatolog",
    "1-mikrorayon stomatologiya andijon",
    "konechka bozorchasi stomatolog",
    "konechka stomatolog",
    "turqat kochasi stomatolog",
    "yoyilma mahalla stomatolog",
    "andijon shahar stomatolog",
    "asaka stomatolog",
    "shahrixon stomatolog",
    "marhamat stomatolog",
    "paxtaobod stomatolog",
    "farg'ona vodiysi stomatologiya",

    // 14. FAQ va Sun'iy Intellekt Savollari (AI & User Questions)
    "tish og'rig'i",
    "tishim ogriyapti",
    "tish qattiq ogrisa nima qilish kerak",
    "kechasi tish og'risa nima qilish kerak andijon",
    "tish og'rig'ini davolash andijon",
    "tishim teshildi nima qilish kerak",
    "andijonda qaysi stomatolog yaxshi",
    "andijonda eng yaxshi stomatologiya qaysi",
    "andijonda 24 soat stomatolog maslahat",
    "navbatsiz stomatolog qabuli andijon",
    "onlayn stomatolog qabuliga yozilish andijon",
    "stomatologiya narxlari 2026 andijon",
  ].join(", "),
  ru: [
    // 1. Основные поисковые запросы (Core Locative Queries)
    "стоматология в андижане",
    "стоматолог в андижане",
    "стоматология андижан",
    "клиники андижана стоматология",
    "стоматологические клиники андижана",
    "лучшая стоматология в андижане",
    "хорошая стоматология в андижане",
    "стоматология в андижане цены",
    "стоматолог в андижане отзывы",
    "зубной врач андижан",
    "зубная клиника андижан",
    "врач стоматолог андижан",
    "стоматолог андижан",
    "хороший стоматолог андижан",
    "лучший стоматолог в андижане",

    // 2. Личность врача и клиника (About Dentist & Brand)
    "стоматолог озодбек",
    "озодбек стоматолог",
    "озодбек отахонов",
    "доктор озодбек",
    "доктор озодбек отахонов",
    "стоматолог озодбек андижан",
    "врач стоматолог озодбек",
    "украинская медицинская стоматологическая академия выпускник",
    "украинская медицинская стоматологическая академия полтава",
    "самаркандский медицинский университет стоматолог",
    "сертификат megagen имплантология",
    "стоматолог 10 лет опыта андижан",
    "smiles dental group",
    "смайлс дентал групп",
    "смайлс дентал групп андижан",

    // 3. Имплантация зубов (MegaGen)
    "имплантация зубов в андижане",
    "имплантация megagen андижан",
    "импланты мегаджен андижан",
    "установка импланта андижан цена",
    "дентальная имплантация андижан",
    "megagen anyridge андижан",
    "биотитановые импланты андижан",
    "синус лифтинг андижан",
    "костная пластика андижан",
    "вживление зуба андижан",
    "имплантация зубов без боли",

    // 4. Брекеты и ортодонтия (Damon)
    "брекеты в андижане",
    "брекеты в андижане цена",
    "установка брекетов андижан",
    "брекеты damon андижан",
    "металлические брекеты андижан",
    "керамические брекеты андижан",
    "сапфировые брекеты андижан",
    "исправление прикуса андижан",
    "выравнивание зубов андижан",
    "диастема лечение андижан",

    // 5. Циркониевые и керамические коронки (CAD/CAM)
    "циркониевые коронки андижан",
    "циркониевые коронки в андижане",
    "коронка на зуб андижан",
    "керамические коронки",
    "монолитный диоксид циркония андижан",
    "cad cam коронки андижан",
    "безметалловые коронки андижан",
    "реставрация сломанного зуба",
    "немецкий цирконий андижан",

    // 6. Виниры E-max (Голливудская улыбка)
    "виниры e-max андижан",
    "виниры в андижане",
    "виниры андижан цена",
    "керамические виниры андижан",
    "голливудская улыбка андижан",
    "эстетическая реставрация зоны улыбки",

    // 7. Протезирование зубов (Протезы)
    "протезирование зубов андижан",
    "протезирование зубов в андижане",
    "бюгельный протез андижан",
    "съемные протезы андижан",
    "нейлоновые протезы valplast",
    "акриловые протезы андижан",
    "полный съемный протез цена андижан",

    // 8. Элайнеры (Прозрачные каппы)
    "элайнеры андижан",
    "прозрачные каппы андижан",
    "выравнивание зубов без брекетов",
    "элайнеры в андижане цена",
    "невидимые каппы для зубов",

    // 9. Отбеливание зубов (Philips Zoom 4)
    "отбеливание зубов андижан",
    "отбеливание philips zoom 4 андижан",
    "клиническое отбеливание zoom 4 андижан",
    "чистка зубов от камня андижан",
    "профессиональная гигиена полости рта",
    "air flow чистка зубов андижан",

    // 10. Лечение зубов без боли и кариес
    "лечение зубов без боли",
    "лечение зубов в андижане",
    "где вылечить зуб в андижане",
    "лечение кариеса андижан",
    "лечение пульпита андижан",
    "удаление нерва зуба без боли",
    "лечение корневых каналов андижан",
    "световая пломба андижан цена",
    "выпала пломба что делать андижан",
    "двухэтапная анестезия с гелем",

    // 11. Удаление зубов без боли и хирургия
    "удаление зубов без боли андижан",
    "удаление зуба мудрости андижан",
    "удаление зуба мудрости в андижане",
    "атравматичное удаление зубов",
    "удаление корней зубов андижан",

    // 12. Оборудование и локация
    "интраоральный 3d сканер андижан",
    "shining 3d aoralscan андижан",
    "цифровые слепки без слепочной массы",
    "стоматология 1 микрорайон андижан",
    "стоматология конечка андижан",
    "рынок конечка стоматолог",
    "стоматология асака",
    "стоматология шахрихан",

    // 13. Вопросы пациентов и ИИ (AI Prompts & FAQ)
    "зубная боль андижан",
    "болит зуб андижан",
    "сильная зубная боль",
    "острая зубная боль куда обращаться в андижане",
    "какая лучшая стоматология в андижане",
    "круглосуточная консультация стоматолога андижан",
    "онлайн запись к стоматологу андижан без очередей",
    "цены на стоматологию в андижане 2026",
  ].join(", "),
  en: [
    // 1. Core Locative Queries
    "dentist in andijan",
    "dental clinic in andijan",
    "dental clinics andijan",
    "dentistry in andijan",
    "best dentist in andijan",
    "best dental clinic andijan",
    "best dentist in andijan uzbekistan",
    "dental clinic near me andijan",
    "top rated dentist in andijan",
    "english speaking dentist andijan",

    // 2. Doctor Identity & Brand
    "ozodbek dentist",
    "dentist ozodbek",
    "dr ozodbek otaxonov",
    "doctor ozodbek otaxonov",
    "dr ozodbek",
    "dr ozodbek dentist andijan",
    "ukrainian medical stomatological academy graduate",
    "samarkand state medical university dentist",
    "megagen certified dental surgeon",
    "dentist 10 years experience andijan",
    "smiles dental group",
    "smiles dental group andijan",

    // 3. Dental Implants (MegaGen)
    "dental implants andijan",
    "dental implants megagen andijan",
    "megagen anyridge andijan",
    "titanium dental implants uzbekistan",
    "single visit dental implants andijan",
    "bone grafting dentist andijan",
    "sinus lift surgery andijan",
    "dental implant price andijan",

    // 4. Braces & Orthodontics (Damon)
    "orthodontic braces andijan",
    "damon braces andijan",
    "metal braces andijan",
    "ceramic braces andijan",
    "sapphire braces andijan",
    "teeth straightening andijan",
    "malocclusion treatment andijan",
    "orthodontist in andijan",

    // 5. Zirconia & Ceramic Crowns (CAD/CAM)
    "zirconia crowns andijan",
    "cad cam dental crowns andijan",
    "monolithic zirconia crowns",
    "porcelain crowns andijan",
    "metal free dental crowns",
    "german zirconia crowns andijan",
    "broken tooth restoration andijan",

    // 6. Aesthetic Veneers (E-max)
    "porcelain veneers andijan",
    "e-max veneers andijan",
    "hollywood smile andijan",
    "smile makeover andijan",
    "cosmetic dentistry andijan",
    "dental veneers cost andijan",

    // 7. Dentures & Prosthetics
    "dentures andijan",
    "removable dentures andijan",
    "clasp dentures andijan",
    "valplast flexible dentures",
    "complete dentures andijan",

    // 8. Clear Aligners
    "clear aligners andijan",
    "invisible braces andijan",
    "teeth aligners without braces andijan",
    "3d clear aligners uzbekistan",

    // 9. Teeth Whitening & Hygiene
    "teeth whitening andijan",
    "philips zoom whitening andijan",
    "philips zoom 4 whitespeed andijan",
    "professional dental cleaning andijan",
    "ultrasonic scale and polish andijan",
    "air flow teeth cleaning andijan",

    // 10. Painless Therapy & Caries Treatment
    "painless dentistry andijan",
    "toothache treatment andijan",
    "emergency dentist andijan",
    "dental fillings andijan",
    "composite light cure filling andijan",
    "root canal treatment andijan",
    "pulpitis treatment andijan",
    "two stage painless anesthesia gel",

    // 11. Painless Tooth Extractions & Surgery
    "wisdom tooth extraction andijan",
    "painless tooth extraction andijan",
    "atraumatic tooth extraction",
    "broken root surgical removal andijan",

    // 12. Equipment & Location
    "shining 3d intraoral scanner andijan",
    "digital impressions without mold",
    "1st microdistrict dental clinic andijan",
    "konechka market dentist andijan",
    "dentist fergana valley uzbekistan",

    // 13. FAQ & AI Search Triggers
    "toothache andijan",
    "severe toothache relief andijan",
    "where to treat toothache in andijan",
    "best dental clinic in andijan reviews",
    "book dentist appointment online andijan",
    "dental prices andijan 2026",
    "emergency dental care uzbekistan",
  ].join(", "),
};
