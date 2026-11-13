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
      title: "Stomatologik Xizmatlar — Ozodbek Stomatolog | Dr. Ozodbek Otaxonov Andijon",
      description:
        "Ozodbek Stomatolog xizmatlari: dental implantatsiya MegaGen, breketlar, sirkon va keramik karonkalar, E-max vinirlar, tish protezlari, elaynerlar, Philips Zoom 4 oqartirish va og'riqsiz davolash.",
    },
    ru: {
      title: "Стоматологические Услуги — Стоматолог Озодбек Отахонов | Андижан",
      description:
        "Все стоматологические услуги в Андижане: имплантация MegaGen, брекеты, циркониевые коронки, виниры E-max, протезирование, элайнеры, отбеливание Zoom 4 и удаление зубов без боли.",
    },
    en: {
      title: "Dental Services & Treatments — Dr. Ozodbek Otaxonov | Andijan",
      description:
        "Comprehensive dentistry by Dr. Ozodbek Otaxonov in Andijan: MegaGen dental implants, braces, zirconia crowns, E-max veneers, dentures, clear aligners, whitening, and 100% painless therapy.",
    },
  },
  about: {
    uz: {
      title: `Dr. Ozodbek Otaxonov Haqida — Ozodbek Stomatolog Andijon | ${years} Yillik Tajriba`,
      description: `Dr. Ozodbek Otaxonov (Ozodbek Stomatolog) — Ukraina Stomatologiya Tibbiyot Akademiyasi (bakalavr) bitiruvchisi, Samarqand davlat tibbiyot universiteti va MegaGen xalqaro implantologiya sertifikatlari sohibi. ${years} yillik klinik tajriba.`,
    },
    ru: {
      title: `О Докторе Озодбеке Отахонове — Стоматолог в Андижане | ${years} Лет Опыта`,
      description: `Врач-стоматолог Д-р Озодбек Отахонов в Андижане. Выпускник Украинской Медицинской Стоматологической Академии (бакалавр), сертифицированный специалист по имплантологии MegaGen. ${years} лет практики.`,
    },
    en: {
      title: `About Dr. Ozodbek Otaxonov — Dentist & Implantologist (${years} Years Experience)`,
      description: `Meet Dr. Ozodbek Otaxonov, graduate of Ukrainian Medical Stomatological Academy (Bachelor of Dentistry) and certified MegaGen implantologist with ${years} years of dental practice in Andijan.`,
    },
  },
  contact: {
    uz: {
      title: "Aloqa va Manzil — Ozodbek Stomatolog | Dr. Ozodbek Otaxonov Andijon",
      description:
        "Ozodbek Stomatolog (Dr. Ozodbek Otaxonov) qabuli — Smiles Dental Group (Andijon, 1-kichik daha, 8A-bino). Telefon: +998 97 833 89 97, Telegram: @Stamatolog07, Instagram: @_vrach_stomatolog.",
    },
    ru: {
      title: "Контакты и Адрес — Стоматолог Озодбек Отахонов | Андижан",
      description:
        "Приём Стоматолога Озодбека Отахонова в клинике Smiles Dental Group (г. Андижан, 1-й микрорайон, 8A). Телефон: +998 97 833 89 97, Telegram: @Stamatolog07.",
    },
    en: {
      title: "Contact & Location — Dr. Ozodbek Otaxonov | Dentist in Andijan",
      description:
        "Book visit with Dr. Ozodbek Otaxonov at Smiles Dental Group (8A, 1st Microdistrict, Andijan). Tel: +998 97 833 89 97, Telegram: @Stamatolog07.",
    },
  },
  booking: {
    uz: {
      title: "Qabulga Yozilish — Ozodbek Stomatolog | Onlayn Qabul Andijon",
      description:
        "Dr. Ozodbek Otaxonov (Ozodbek Stomatolog) qabuliga onlayn yozilish. Bo'sh kun va soatni tanlang, qulay va navbatsiz ro'yxatdan o'ting. Tel: +998 97 833 89 97.",
    },
    ru: {
      title: "Запись на Приём — Стоматолог Озодбек Отахонов | Онлайн Запись Андижан",
      description:
        "Онлайн запись к Стоматологу Озодбеку Отахонову в Андижане: выберите удобный день и время приёма без очередей. Телефон: +998 97 833 89 97.",
    },
    en: {
      title: "Book Dental Appointment — Dr. Ozodbek Otaxonov | Andijan",
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
    "andijonda stomatolog",
    "andijonda stomatologiya",
    "andijondagi stomatologiya",
    "andijon stomatologiya klinikalari",
    "andijonda stomatologiya narxlari",
    "andijonda tish davolash",
    "andijonda eng yaxshi stomatolog",
    "andijonda tish klinikasi",
    "andijonda tish shifokori",
    "andijonda implantat",
    "andijonda breket",
    "ozodbek stomatolog",
    "stomatolog ozodbek",
    "dr ozodbek otaxonov",
    "dr ozodbek",
    "ozodbek stomatolog andijon",
    "stomatolog ozodbek andijon",
    "vrach stomatolog ozodbek",
    "vrach stomatolog andijon",
    "stomatolog andijon",
    "yaxshi stomatolog andijon",
    "eng yaxshi stomatolog andijon",
    "andijon stomatolog tavsiya",
    "tish og'rig'i",
    "tishim ogriyapti",
    "tish qattiq ogrisa",
    "tish og'rig'ini davolash andijon",
    "tish kariesini davolash",
    "konechka bozorchasi stomatolog",
    "konechka stomatolog",
    "1-kichik daha stomatolog",
    "smiles dental group",
    "smiles dental group andijon",
    "andijon implantat",
    "dental implant andijon",
    "megagen implant andijon",
    "breketlar andijon",
    "damon breket andijon",
    "sirkon karonka narxi",
    "keramika karonka",
    "vinirlar andijon",
    "tish protezlari andijon",
    "elaynerlar andijon",
    "tish oqartirish andijon",
    "philips zoom 4 andijon",
    "shining 3d skaner stomatolog",
    "ogriqsiz tish davolash",
    "ogriqsiz tish olish andijon",
    "plomba tushishi nima qilish kerak",
    "stomatolog 10 yil tajriba",
    "ukraina stomatologiya tibbiyot akademiyasi",
    "ukraina stomatologiya akademiyasi",
    "stamatolog07",
  ].join(", "),
  ru: [
    "стоматология в андижане",
    "стоматолог в андижане",
    "стоматология андижан",
    "клиники андижана стоматология",
    "стоматологические клиники андижана",
    "лучшая стоматология в андижане",
    "стоматология в андижане цены",
    "стоматолог озодбек",
    "озодбек стоматолог",
    "озодбек отахонов",
    "стоматолог озодбек андижан",
    "врач стоматолог озодбек",
    "врач стоматолог андижан",
    "стоматолог андижан",
    "хороший стоматолог андижан",
    "лучший стоматолог в андижане",
    "стоматолог в андижане отзывы",
    "зубная боль андижан",
    "болит зуб андижан",
    "сильная зубная боль",
    "где вылечить зуб в андижане",
    "лечение зубов в андижане",
    "лечение кариеса андижан",
    "стоматология 1 микрорайон андижан",
    "стоматология конечка андижан",
    "smiles dental group",
    "смайлс дентал групп",
    "смайлс дентал групп андижан",
    "имплантация megagen андижан",
    "брекеты в андижане",
    "циркониевые коронки андижан",
    "керамические коронки",
    "виниры e-max андижан",
    "протезирование зубов андижан",
    "элайнеры андижан",
    "отбеливание зубов андижан",
    "отбеливание philips zoom 4 андижан",
    "интраоральный 3d сканер андижан",
    "лечение зубов без боли",
    "удаление зубов без боли андижан",
    "удаление зуба мудрости андижан",
    "украинская медицинская стоматологическая академия",
  ].join(", "),
  en: [
    "dentist in andijan",
    "dental clinic in andijan",
    "dental clinics andijan",
    "dentistry in andijan",
    "best dentist in andijan",
    "ozodbek dentist",
    "dentist ozodbek",
    "dr ozodbek otaxonov",
    "dr ozodbek",
    "best dentist in andijan uzbekistan",
    "best dental clinic andijan",
    "dental clinic andijan",
    "dental clinic near me andijan",
    "toothache treatment andijan",
    "toothache andijan",
    "smiles dental group",
    "smiles dental group andijan",
    "dental implants megagen andijan",
    "orthodontic braces andijan",
    "zirconia crowns andijan",
    "porcelain veneers andijan",
    "dentures andijan",
    "clear aligners andijan",
    "teeth whitening andijan",
    "philips zoom whitening andijan",
    "intraoral 3d scan andijan",
    "painless dentistry andijan",
    "wisdom tooth extraction andijan",
    "emergency dentist andijan",
    "dental care uzbekistan",
    "ukrainian medical stomatological academy",
    "ukrainian medical dental academy",
  ].join(", "),
};
