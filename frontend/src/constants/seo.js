import { getYearsOfExperience } from "./doctor.js";

export const SITE_ORIGIN = "https://drozodbek.uz";

const years = getYearsOfExperience();

export const getPageSeo = (pageKey, lang = "uz") =>
  PAGE_SEO[pageKey]?.[lang] || PAGE_SEO[pageKey]?.uz || null;

export const getPageKeywords = (pageKey, lang = "uz") =>
  PAGE_TOPIC_KEYWORDS[pageKey]?.[lang] ||
  PAGE_TOPIC_KEYWORDS[pageKey]?.uz ||
  PAGE_KEYWORDS[lang] ||
  PAGE_KEYWORDS.uz;

export const PAGE_SEO = {
  home: {
    uz: {
      title: "Andijonda Stomatolog va Tish Implantatsiyasi — Dr. Ozodbek Otaxonov",
      description: `Andijonda stomatolog va implantolog Dr. Ozodbek Otaxonov (${years} yil tajriba). Soat 22:00 gacha ochiq. Tish implantatsiyasi MegaGen, tish qo'yish, breketlar, sirkon karonkalar, E-max vinirlar va 100% og'riqsiz davolash. Tel: +998 97 833 89 97.`,
    },
    ru: {
      title: "Стоматология и Имплантация Зубов в Андижане — Д-р Озодбек Отахонов",
      description: `Стоматолог и имплантолог Д-р Озодбек Отахонов в Андижане (${years} лет опыта). Приём до 22:00. Имплантация MegaGen, вставить зуб, брекеты, циркониевые коронки, виниры E-max, лечение без боли. +998 97 833 89 97.`,
    },
    en: {
      title: "Dentist & Dental Implants in Andijan — Dr. Ozodbek Otaxonov",
      description: `Dr. Ozodbek Otaxonov, dentist & implantologist in Andijan (${years} years experience). Open until 22:00. MegaGen dental implants, braces, zirconia crowns, veneers, and 100% painless emergency care. Tel: +998 97 833 89 97.`,
    },
  },
  services: {
    uz: {
      title: "Andijonda Stomatologiya Xizmatlari: Implant, Breket, Karonka | Dr. Ozodbek",
      description:
        "Andijonda barcha stomatologiya xizmatlari: MegaGen tish implantatsiyasi, tish qo'yish, Damon breketlar, sirkon karonkalar, E-max vinirlar, elaynerlar, Philips Zoom 4 oqartirish, og'riqsiz tish olish va kechki davolash.",
    },
    ru: {
      title: "Стоматология в Андижане: Имплантация, Брекеты, Коронки, Виниры",
      description:
        "Все стоматологические услуги в Андижане: имплантация MegaGen, вставить зуб, брекеты Damon, циркониевые коронки, виниры E-max, элайнеры, отбеливание Zoom 4, удаление и лечение зубов до 22:00.",
    },
    en: {
      title: "Dental Services in Andijan: Implants, Braces, Crowns & Veneers",
      description:
        "Comprehensive dental care in Andijan by Dr. Ozodbek Otaxonov: MegaGen implants, tooth replacement, braces, zirconia crowns, E-max veneers, clear aligners, Zoom 4 whitening, painless therapy & extractions.",
    },
  },
  about: {
    uz: {
      title: `Dr. Ozodbek Otaxonov — Andijonda Stomatolog Implantolog | ${years} Yil Tajriba`,
      description: `Dr. Ozodbek Otaxonov — Andijonda ${years} yillik tajribaga ega vrach stomatolog va implantolog. Ukraina Stomatologiya Tibbiyot Akademiyasi (bakalavr), Samarqand Davlat Tibbiyot Universiteti va MegaGen xalqaro sertifikatlari sohibi.`,
    },
    ru: {
      title: `Д-р Озодбек Отахонов — Стоматолог Имплантолог в Андижане (${years} Лет)`,
      description: `Врач-стоматолог и имплантолог Д-р Озодбек Отахонов в Андижане. Выпускник Украинской Медицинской Стоматологической Академии, сертифицированный специалист по имплантации MegaGen. ${years} лет практики.`,
    },
    en: {
      title: `Dr. Ozodbek Otaxonov — Dentist & Implantologist in Andijan (${years} Yrs)`,
      description: `Meet Dr. Ozodbek Otaxonov, graduate of Ukrainian Medical Stomatological Academy and certified MegaGen dental implantologist with ${years} years of clinical excellence in Andijan.`,
    },
  },
  contact: {
    uz: {
      title: "Andijonda Stomatologiya Manzili va Aloqa — Dr. Ozodbek | Smiles Dental Group",
      description:
        "Andijonda stomatolog qabuli (soat 08:30–22:00): Dr. Ozodbek Otaxonov — Smiles Dental Group (1-kichik daha, 8A-bino, Konechka bozorchasi yaqinida). Tel: +998 97 833 89 97, Telegram: @Stamatolog07.",
    },
    ru: {
      title: "Стоматология в Андижане — Адрес и Контакты | Д-р Озодбек Отахонов",
      description:
        "Приём стоматолога Д-ра Озодбека Отахонова в клинике Smiles Dental Group (Андижан, 1-й микрорайон, 8А, ориентир Конечка). Ежедневно Пн–Сб до 22:00. Тел: +998 97 833 89 97.",
    },
    en: {
      title: "Dentist in Andijan — Location, Hours (22:00) & Contact | Dr. Ozodbek",
      description:
        "Visit Dr. Ozodbek Otaxonov at Smiles Dental Group (8A, 1st Microdistrict, near Konechka, Andijan). Mon–Sat 08:30–22:00. Tel: +998 97 833 89 97, Telegram: @Stamatolog07.",
    },
  },
  booking: {
    uz: {
      title: "Andijonda Stomatolog Qabuliga Onlayn Yozilish — Dr. Ozodbek Otaxonov",
      description:
        "Andijonda Dr. Ozodbek Otaxonov qabuliga navbatsiz onlayn yozilish (08:30–22:00). Tish implantatsiyasi, breket, karonka va shoshilinch tish og'rig'i uchun qulay vaqt tanlang. +998 97 833 89 97.",
    },
    ru: {
      title: "Онлайн Запись к Стоматологу в Андижане — Д-р Озодбек Отахонов",
      description:
        "Запишитесь к стоматологу Озодбеку Отахонову в Андижане онлайн без очередей (приём до 22:00). Выберите удобный день и время для имплантации, лечения или осмотра. +998 97 833 89 97.",
    },
    en: {
      title: "Book Dentist Appointment Online in Andijan — Dr. Ozodbek Otaxonov",
      description:
        "Schedule your dental appointment online with zero waiting in Andijan (open Mon–Sat 08:30–22:00). Implants, orthodontics, crowns, and emergency pain relief. +998 97 833 89 97.",
    },
  },
  toothacheGuide: {
    uz: {
      title: "Kechki Payt Tishim Og'riyapti — Tezkor Yordam va Sabablari | Andijon",
      description:
        "Kechki payt yoki tunda tish og'risa nima qilish kerak? Pulpit, karies, tushgan plomba, milk shishishi (flyus) va aql tishida birinchi yordam. Andijonda soat 22:00 gacha og'riqsiz qabul: +998 97 833 89 97.",
    },
    ru: {
      title: "Болит Зуб Вечером или Ночью — Что Делать и Куда Идти | Андижан",
      description:
        "Сильно болит зуб вечером или ночью в Андижане? Причины (пульпит, кариес, флюс, зуб мудрости), безопасная первая помощь дома и приём без боли до 22:00. +998 97 833 89 97.",
    },
    en: {
      title: "Severe Toothache at Night — Emergency Relief & Causes | Andijan",
      description:
        "Experiencing throbbing tooth pain in the evening? Safe temporary home relief, clinical causes (pulpitis, cavity, abscess, wisdom tooth), and urgent painless care until 22:00 in Andijan.",
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

/**
 * Page-specific keyword clusters (kept focused to 15-22 high-intent terms per page
 * to avoid Yandex/Google keyword stuffing while matching Latin, Cyrillic, and Russian searches).
 */
export const PAGE_TOPIC_KEYWORDS = {
  home: {
    uz: [
      "andijonda stomatolog",
      "andijonda tish implantatsiyasi",
      "andijonda stomatologiya",
      "eng yaxshi stomatolog andijon",
      "dr ozodbek otaxonov",
      "ozodbek stomatolog andijon",
      "tish qo'yish andijon",
      "tish breketlari andijon",
      "sirkon karonka andijon",
      "vinirlar andijon",
      "kechki stomatologiya andijon 22:00",
      "ogriqsiz tish davolash andijon",
      "ogriqsiz tish olish andijon",
      "smiles dental group andijon",
      "1-mikrorayon konechka stomatolog",
      "андижонда стоматолог",
      "тиш имплантацияси андижон",
      "тиш қўйиш андижон",
    ].join(", "),
    ru: [
      "стоматология в андижане",
      "стоматолог в андижане",
      "имплантация зубов в андижане",
      "лучший стоматолог в андижане",
      "доктор озодбек отахонов",
      "вставить зуб андижан",
      "брекеты в андижане",
      "циркониевые коронки андижан",
      "виниры e-max андижан",
      "лечение зубов без боли андижан",
      "стоматолог до 22:00 андижан",
      "удаление зуба без боли андижан",
      "smiles dental group андижан",
      "стоматология 1 микрорайон конечка андижан",
    ].join(", "),
    en: [
      "dentist in andijan",
      "dental implants in andijan",
      "best dental clinic andijan",
      "dr ozodbek otaxonov",
      "megagen implants uzbekistan",
      "orthodontic braces andijan",
      "zirconia crowns andijan",
      "e-max veneers andijan",
      "painless dentistry andijan",
      "evening dentist until 22:00 andijan",
      "smiles dental group andijan",
    ].join(", "),
  },
  services: {
    uz: [
      "andijonda stomatologiya xizmatlari",
      "andijonda tish implantatsiyasi narxi",
      "tish qo'yish narxi andijon 2026",
      "breket turlari va narxlari 2026",
      "tish karonkalari narxi andijon",
      "e-max vinirlar narxi andijon",
      "tish protezlari andijon",
      "shaffof elaynerlar andijon",
      "philips zoom 4 tish oqartirish andijon",
      "ogriqsiz tish olish narxi andijon",
      "karies va pulpit davolash andijon",
      "shining 3d skaner stomatolog",
      "андижон стоматология нархлари",
      "тиш брекетлари ва каронкалари",
    ].join(", "),
    ru: [
      "стоматологические услуги андижан цены",
      "имплантация зубов megagen андижан цена",
      "брекеты виды и цены андижан 2026",
      "коронки на зубы андижан цена",
      "виниры e-max андижан цена",
      "протезирование зубов андижан",
      "элайнеры андижан цена",
      "отбеливание зубов zoom 4 андижан",
      "удаление зуба мудрости андижан",
      "лечение кариеса и пульпита андижан",
    ].join(", "),
    en: [
      "dental services andijan prices",
      "megagen dental implant cost andijan",
      "braces and clear aligners andijan",
      "zirconia crowns and veneers andijan",
      "philips zoom 4 whitening andijan",
      "painless root canal therapy andijan",
      "wisdom tooth extraction andijan",
    ].join(", "),
  },
  about: {
    uz: [
      "dr ozodbek otaxonov",
      "stomatolog ozodbek andijon",
      "implantolog andijon",
      "andijonda tajribali stomatolog",
      "ukraina stomatologiya tibbiyot akademiyasi bitiruvchisi",
      "samarqand davlat tibbiyot universiteti stomatolog",
      "megagen xalqaro implantologiya sertifikati",
      "10 yillik tajriba stomatolog",
      "3d navigatsion implantologiya andijon",
      "shining 3d raqamli stomatologiya",
      "anti-spid anti-gepatit sterillik stomatolog",
      "стоматолог озодбек отахонов андижан",
    ].join(", "),
    ru: [
      "доктор озодбек отахонов",
      "стоматолог имплантолог андижан",
      "украинская медицинская стоматологическая академия",
      "сертификат megagen имплантология",
      "стоматолог 10 лет опыта андижан",
      "стерильность анти-спид стоматология",
      "навигационная имплантация андижан",
    ].join(", "),
    en: [
      "dr ozodbek otaxonov",
      "dentist implantologist andijan",
      "ukrainian medical stomatological academy graduate",
      "megagen certified implantologist uzbekistan",
      "10 years experience dentist andijan",
      "sterile dental clinic andijan",
    ].join(", "),
  },
  contact: {
    uz: [
      "smiles dental group andijon manzili",
      "dr ozodbek otaxonov telefoni",
      "1-mikrorayon 8a stomatolog andijon",
      "1-kichik daha konechka bozorchasi stomatolog",
      "yoyilma mahalla stomatologiya andijon",
      "kechki 22:00 gacha ochiq stomatolog andijon",
      "yandex xarita dr ozodbek otaxonov",
      "stamatolog07 telegram",
      "_vrach_stomatolog instagram",
      "asaka shahrixon marhamat stomatolog",
    ].join(", "),
    ru: [
      "smiles dental group андижан адрес",
      "стоматология 1 микрорайон 8а андижан",
      "стоматолог рынок конечка андижан",
      "телефон стоматолога озодбека отахонова",
      "часы работы стоматологии до 22:00 андижан",
      "яндекс карты стоматолог андижан",
    ].join(", "),
    en: [
      "smiles dental group andijan address",
      "dentist 1st microdistrict konechka andijan",
      "dr ozodbek otaxonov phone location",
      "dental clinic open until 22:00 andijan",
    ].join(", "),
  },
  booking: {
    uz: [
      "andijonda stomatolog qabuliga yozilish",
      "onlayn stomatolog navbat andijon",
      "dr ozodbek qabuliga yozilish",
      "navbatsiz stomatolog andijon",
      "tish doktoriga onlayn bron",
      "implantatsiya konsultatsiyasiga yozilish",
      "андижонда стоматологга ёзилиш",
    ].join(", "),
    ru: [
      "онлайн запись к стоматологу андижан",
      "записаться к доктору озодбеку отахонову",
      "приём стоматолога без очередей андижан",
      "консультация имплантолога андижан запись",
    ].join(", "),
    en: [
      "book dentist online andijan",
      "schedule dental consultation dr ozodbek",
      "zero queue dental appointment andijan",
    ].join(", "),
  },
  toothacheGuide: {
    uz: [
      "kechki payt tishim ogriyapti",
      "kechasi tish og'risa nima qilish kerak",
      "tish og'rig'iga nima yaxshi uy sharoitida",
      "tish og'rig'ini qoldirish yo'llari",
      "andijonda kechki stomatolog 22:00 gacha",
      "tish teshildi nima qilish kerak",
      "plombam tushib ketdi nima qilsam boladi",
      "milk shishib ketdi flyus nima qilish kerak",
      "issiq sovuqqa tish zirqirashi sabablari",
      "aql tishi chiqishi og'rig'i",
      "milk qonashi va og'izdan noxush hid",
      "homiladorlikda tish og'risa nima qilish kerak",
      "tish oldirishdan qo'rqish stomatofobiya",
      "кечки пайт тишим оғрияпти",
      "тиш оғриғига нима яхши",
    ].join(", "),
    ru: [
      "вечером болит зуб что делать",
      "сильно болит зуб ночью андижан",
      "стоматология до 22:00 андижан",
      "первая помощь при зубной боли дома",
      "выпала пломба болит зуб что делать",
      "опухла десна флюс лечение андижан",
      "болит зуб на холодное и горячее",
      "режется зуб мудрости болит десна",
      "кровоточат десны и запах изо рта",
      "лечение зубов при беременности андижан",
    ].join(", "),
    en: [
      "severe toothache at night what to do",
      "emergency toothache relief at home",
      "dentist open late 22:00 andijan",
      "lost filling tooth hurts",
      "swollen gum abscess treatment andijan",
      "impacted wisdom tooth pain relief",
      "tooth sensitive to cold water and sweets",
      "dental care during pregnancy",
    ].join(", "),
  },
};

export const PAGE_KEYWORDS = PAGE_TOPIC_KEYWORDS.home;
