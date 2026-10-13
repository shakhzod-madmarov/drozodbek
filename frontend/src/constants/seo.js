import { getYearsOfExperience } from "./doctor.js";

export const SITE_ORIGIN = "https://drozodbek.uz";

const years = getYearsOfExperience();

export const getPageSeo = (pageKey, lang = "uz") =>
  PAGE_SEO[pageKey]?.[lang] || PAGE_SEO[pageKey]?.uz || null;

export const PAGE_SEO = {
  home: {
    uz: {
      title: "Dr. Ozodbek Otaxonov — Vrach Stomatolog | 10 Yillik Tajriba",
      description: `Dr. Ozodbek Otaxonov — 10 yillik tajribaga ega vrach stomatolog. Ukraina stomatologiya tibbiyot akademiyasi bitiruvchisi. Dental implantatsiya, breketlar, sirkon va keramik karonkalar, vinirlar, pratezlar, elaynerlar va 100% og'riqsiz davolash. Tel: +998 97 833 89 97.`,
    },
    ru: {
      title: "Д-р Озодбек Отахонов — Врач-Стоматолог | 10 Лет Опыта",
      description: `Врач-стоматолог Д-р Озодбек Отахонов. 10 лет клинической практики, выпускник Украинской медицинской стоматологической академии. Имплантация MegaGen, брекеты, циркониевые коронки, виниры, элайнеры, лечение зубов без боли. +998 97 833 89 97.`,
    },
    en: {
      title: "Dr. Ozodbek Otaxonov — Modern Dentist & Implantologist | 10 Years Experience",
      description: `Dr. Ozodbek Otaxonov, restorative dentist & implantologist with 10 years experience. Graduate of Ukrainian Medical Stomatological Academy. MegaGen dental implants, brackets, zirconia crowns, veneers, aligners, painless therapy. Tel: +998 97 833 89 97.`,
    },
  },
  services: {
    uz: {
      title: "Stomatologik Xizmatlar — Dr. Ozodbek Otaxonov | 10 Yillik Tajriba",
      description:
        "Dental implantatsiya, breketlar, sirkon va keramik karonkalar, E-max vinirlar, tish protezlari, shaffof elaynerlar, tish oqartirish, og'riqsiz davolash va tish olish xizmatlari.",
    },
    ru: {
      title: "Стоматологические Услуги — Д-р Озодбек Отахонов",
      description:
        "Полный спектр услуг: имплантация MegaGen, брекеты, циркониевые и керамические коронки, виниры E-max, протезирование, элайнеры, отбеливание и удаление зубов без боли.",
    },
    en: {
      title: "Dental Services & Specialties — Dr. Ozodbek Otaxonov",
      description:
        "Comprehensive dentistry: MegaGen dental implants, orthodontic braces, zirconia crowns, E-max veneers, dentures, clear aligners, whitening, and 100% painless therapy.",
    },
  },
  about: {
    uz: {
      title: `Dr. Ozodbek Otaxonov Haqida — ${years} Yillik Tajribaga Ega Vrach Stomatolog`,
      description: `Dr. Ozodbek Otaxonov — Ukraina stomatologiya tibbiyot akademiyasi (bakalavr) bitiruvchisi, Samarqand davlat tibbiyot universiteti va MegaGen xalqaro implantologiya sertifikatlari sohibi. ${years} yillik klinik tajriba.`,
    },
    ru: {
      title: `О Докторе Озодбеке Отахонове — Врач-Стоматолог с ${years}-Летним Опытом`,
      description: `Д-р Озодбек Отахонов — выпускник Украинской медицинской стоматологической академии (бакалавр), сертифицированный специалист по имплантологии MegaGen. ${years} лет практики.`,
    },
    en: {
      title: `About Dr. Ozodbek Otaxonov — Dentist & Implantologist with ${years} Years Experience`,
      description: `Meet Dr. Ozodbek Otaxonov, graduate of Ukrainian Medical Stomatological Academy (Bachelor of Dentistry) and certified MegaGen implantologist with ${years} years of excellence.`,
    },
  },
  contact: {
    uz: {
      title: "Aloqa va Manzil — Dr. Ozodbek Otaxonov | Vrach Stomatolog",
      description:
        "Dr. Ozodbek Otaxonov qabuliga yozilish. Telefon: +998 97 833 89 97, Telegram: @Stamatolog07, Instagram: @_vrach_stomatolog.",
    },
    ru: {
      title: "Контакты и Запись на Приём — Д-р Озодбек Отахонов",
      description:
        "Запись на приём к Д-ру Озодбеку Отахонову. Телефон: +998 97 833 89 97, Telegram: @Stamatolog07, Instagram: @_vrach_stomatolog.",
    },
    en: {
      title: "Contact & Appointment Booking — Dr. Ozodbek Otaxonov",
      description:
        "Book an appointment with Dr. Ozodbek Otaxonov. Phone: +998 97 833 89 97, Telegram: @Stamatolog07, Instagram: @_vrach_stomatolog.",
    },
  },
  booking: {
    uz: {
      title: "Uchrashuv Vaqtini Tanlang — Dr. Ozodbek Otaxonov | Onlayn Qabul",
      description:
        "Dr. Ozodbek Otaxonov qabuliga onlayn yozilish. Bo'sh kun va soatni tanlang, qulay va navbatsiz ro'yxatdan o'ting. Tel: +998 97 833 89 97.",
    },
    ru: {
      title: "Онлайн Запись на Приём — Д-р Озодбек Отахонов",
      description:
        "Онлайн запись к Д-ру Озодбеку Отахонову: выберите удобный день и время приёма без очередей. Телефон: +998 97 833 89 97.",
    },
    en: {
      title: "Book Online Appointment — Dr. Ozodbek Otaxonov",
      description:
        "Book your dental visit online with Dr. Ozodbek Otaxonov. Select preferred date and time slot. Tel: +998 97 833 89 97.",
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
    "dr ozodbek otaxonov",
    "ozodbek stomatolog",
    "vrach stomatolog",
    "stomatolog 10 yil tajriba",
    "dental implant",
    "megagen implant",
    "breketlar",
    "sirkon karonka",
    "keramika karonka",
    "vinirlar",
    "pratezlar",
    "elaynerlar",
    "tish oqartirish",
    "ogriqsiz tish davolash",
    "ogriqsiz tish olish",
    "ukraina stomatologiya akademiyasi",
    "stamatolog07",
  ].join(", "),
  ru: [
    "озодбек отахонов",
    "стоматолог озодбек",
    "врач стоматолог",
    "имплантация megagen",
    "брекеты",
    "циркониевые коронки",
    "керамические коронки",
    "виниры e-max",
    "протезирование зубов",
    "элайнеры",
    "отбеливание зубов",
    "лечение зубов без боли",
    "удаление зубов без боли",
    "украинская медицинская стоматологическая академия",
  ].join(", "),
  en: [
    "dr ozodbek otaxonov",
    "dentist ozodbek",
    "dental implants megagen",
    "orthodontic braces",
    "zirconia crowns",
    "porcelain veneers",
    "dentures",
    "clear aligners",
    "teeth whitening",
    "painless dentistry",
    "wisdom tooth extraction",
    "ukrainian medical dental academy",
  ].join(", "),
};
