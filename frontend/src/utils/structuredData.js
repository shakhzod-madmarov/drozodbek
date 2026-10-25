import { SITE_ORIGIN } from "../constants/seo";
import { localizePath } from "./language";
import { DOCTOR_INFO } from "../constants/doctor";
import { PRIMARY_CLINIC } from "../constants/clinics";

export const withTrailingSlash = (path) => (path.endsWith("/") ? path : `${path}/`);

export const urlFor = (path = "/", lang = "uz") =>
  `${SITE_ORIGIN}${withTrailingSlash(localizePath(path, lang))}`;

export const buildBreadcrumbSchema = (crumbs, lang = "uz") => ({
  "@type": "BreadcrumbList",
  "itemListElement": crumbs.map((crumb, idx) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "name": crumb.name,
    "item": urlFor(crumb.path, lang),
  })),
});

export const buildFaqSchema = (faqItems, lang = "uz") => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${urlFor("/", lang)}#faq`,
  "mainEntity": faqItems.map((item) => ({
    "@type": "Question",
    "name": item.q[lang] || item.q.uz,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a[lang] || item.a.uz,
    },
  })),
});

const SERVICE_INDICATIONS = {
  "dental-implant": {
    uz: "Yo'qotilgan yoki olingan tishlarni suyak darajasida tabiiy tiklash",
    ru: "Восстановление отсутствующих зубов без обточки соседних",
    en: "Restoration of missing or lost teeth at the bone level",
  },
  "breketlar": {
    uz: "Egri tishlar, diastema va noto'g'ri tishlash (prikus) anomaliyalari",
    ru: "Искривление зубов, скученность и аномалии прикуса",
    en: "Crooked teeth, gaps (diastema), and malocclusion correction",
  },
  "sirkon-keramika-karonkalar": {
    uz: "Yemirilgan, singan yoki qoraygan tishlarni estetik mustahkamlash",
    ru: "Разрушенные, сколотые или потемневшие зубы",
    en: "Severely decayed, chipped, or weakened teeth restoration",
  },
  "vinirlar": {
    uz: "Old tishlarning rangi o'zgarishi, emal yemirilishi va estetik nuqsonlar",
    ru: "Потемнение эмали, диастемы, трещины и эстетические дефекты зоны улыбки",
    en: "Enamel discoloration, chips, gaps, and aesthetic smile makeover",
  },
  "pratezlar": {
    uz: "Ko'p sonli yoki to'liq tishlar yo'qolishi (chaynash funksiyasini tiklash)",
    ru: "Частичная или полная потеря зубов, нарушение жевания",
    en: "Partial or complete edentulism (restoring masticatory function)",
  },
  "elaynerlar": {
    uz: "Tishlarning yengil va o'rta darajadagi egriliklari (breketsiz tekislash)",
    ru: "Неровный зубной ряд без ношения металлических брекетов",
    en: "Mild to moderate dental alignment without metal brackets",
  },
  "tish-oqartirish": {
    uz: "Kofe, choy yoki chekish oqibatida sariq yoki qoraygan tish emali",
    ru: "Желтизна зубов, пигментация от чая, кофе и курения",
    en: "Yellowing or staining of enamel from coffee, tea, and smoking",
  },
  "ogriqsiz-tish-davolash": {
    uz: "O'tkir tish og'rig'i, chuqur karies, pulpit va tushib ketgan plomba",
    ru: "Острая зубная боль, глубокий кариес, пульпит и выпавшая пломба",
    en: "Acute toothache, deep dental caries, pulpitis, and lost filling",
  },
  "ogriqsiz-tish-olish": {
    uz: "Qattiq og'riyotgan aql tishlari (sakkizliklar), ildiz sinishi va yallig'lanish",
    ru: "Болезненные зубы мудрости, ретинированные зубы и разрушенные корни",
    en: "Impacted or painful wisdom teeth, broken roots, and severe infection",
  },
};

export const buildMedicalProcedureSchema = (service, lang = "uz", breadcrumbs = []) => {
  const serviceUrl = urlFor(`/services/${service.id}`, lang);
  const breadcrumbObj = breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs, lang) : null;
  const indicationsList = service.indications?.[lang] || service.indications?.uz;
  const fallbackIndication = SERVICE_INDICATIONS[service.id]?.[lang] || SERVICE_INDICATIONS[service.id]?.uz;

  const procedure = {
    "@type": "MedicalProcedure",
    "@id": `${serviceUrl}#procedure`,
    "name": service.title[lang] || service.title.uz,
    "description": service.shortDesc[lang] || service.shortDesc.uz,
    "procedureType": service.id.includes("implant") || service.id.includes("olish")
      ? "https://schema.org/SurgicalProcedure"
      : "https://schema.org/NoninvasiveProcedure",
    "bodyLocation": "https://en.wikipedia.org/wiki/Human_mouth",
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Dentistry",
    },
    ...(Array.isArray(indicationsList) && indicationsList.length > 0
      ? {
          "indication": indicationsList.map((text) => ({
            "@type": "MedicalIndication",
            "name": text,
          })),
        }
      : fallbackIndication
      ? {
          "indication": {
            "@type": "MedicalIndication",
            "name": fallbackIndication,
          },
        }
      : {}),
    "provider": {
      "@type": ["Dentist", "MedicalBusiness"],
      "@id": `${SITE_ORIGIN}/#dentist`,
      "name": `${DOCTOR_INFO.name} — Smiles Dental Group`,
      "telephone": DOCTOR_INFO.phoneRaw,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1-kichik daha (1-mikrorayon), 8A-bino",
        "addressLocality": "Andijon",
        "addressRegion": "Andijon viloyati",
        "postalCode": "170100",
        "addressCountry": "UZ",
      },
      "hasMap": [
        "https://www.google.com/maps?cid=18369680373809674194",
        "https://share.google/cG5vFoJOH4GX6Y3qv",
        "https://yandex.uz/maps/org/smiles_dental_group/10769129756/",
        "https://yandex.uz/maps/-/CXu-iKzx",
      ],
    },
    "performer": {
      "@type": "Physician",
      "@id": `${SITE_ORIGIN}/#doctor`,
      "name": DOCTOR_INFO.name,
      "jobTitle": DOCTOR_INFO.title,
      "telephone": DOCTOR_INFO.phoneRaw,
      "url": `${SITE_ORIGIN}/`,
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": DOCTOR_INFO.education[lang] || DOCTOR_INFO.education.uz,
      },
    },
    "offers": {
      "@type": "Offer",
      "url": serviceUrl,
      "priceCurrency": "UZS",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@id": `${SITE_ORIGIN}/#dentist`,
      },
    },
  };

  const graph = [];
  if (breadcrumbObj) {
    graph.push(breadcrumbObj);
  }
  graph.push(procedure);

  if (Array.isArray(service.faq) && service.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${serviceUrl}#faq`,
      "mainEntity": service.faq.map((item) => ({
        "@type": "Question",
        "name": item.q[lang] || item.q.uz,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a[lang] || item.a.uz,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const buildServicesCatalogSchema = (services, lang = "uz", breadcrumbs = []) => {
  const catalogUrl = urlFor("/services", lang);
  const breadcrumbObj = breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs, lang) : null;

  const catalog = {
    "@type": "MedicalWebPage",
    "@id": `${catalogUrl}#catalog`,
    "url": catalogUrl,
    "name": lang === "ru" ? "Стоматологические услуги" : lang === "en" ? "Dental Services" : "Stomatologik xizmatlar",
    "about": {
      "@type": "Dentist",
      "@id": `${SITE_ORIGIN}/#dentist`,
      "name": DOCTOR_INFO.name,
      "telephone": DOCTOR_INFO.phoneRaw,
    },
    "mainEntity": {
      "@type": "OfferCatalog",
      "name": "Stomatologiya Xizmatlari",
      "itemListElement": services.map((s, idx) => ({
        "@type": "OfferCatalog",
        "position": idx + 1,
        "name": s.title[lang] || s.title.uz,
        "url": urlFor(`/services/${s.id}`, lang),
      })),
    },
  };

  if (breadcrumbObj) {
    return {
      "@context": "https://schema.org",
      "@graph": [breadcrumbObj, catalog],
    };
  }

  return {
    "@context": "https://schema.org",
    ...catalog,
  };
};

export const buildAboutPageSchema = (lang = "uz", breadcrumbs = []) => {
  const pageUrl = urlFor("/about", lang);
  const breadcrumbObj = breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs, lang) : null;

  const aboutPage = {
    "@type": "AboutPage",
    "@id": `${pageUrl}#about`,
    "url": pageUrl,
    "name": lang === "ru" ? "О враче" : lang === "en" ? "About Doctor" : "Dr. Ozodbek haqida",
    "mainEntity": {
      "@type": "Physician",
      "@id": `${SITE_ORIGIN}/#doctor`,
      "name": DOCTOR_INFO.name,
      "jobTitle": DOCTOR_INFO.title,
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": DOCTOR_INFO.education[lang] || DOCTOR_INFO.education.uz,
      },
      "telephone": DOCTOR_INFO.phoneRaw,
      "email": DOCTOR_INFO.email,
      "sameAs": [
        DOCTOR_INFO.telegramUrl,
        DOCTOR_INFO.instagramUrl,
      ],
    },
  };

  if (breadcrumbObj) {
    return {
      "@context": "https://schema.org",
      "@graph": [breadcrumbObj, aboutPage],
    };
  }

  return {
    "@context": "https://schema.org",
    ...aboutPage,
  };
};

export const buildContactPageSchema = (lang = "uz", breadcrumbs = []) => {
  const pageUrl = urlFor("/contact", lang);
  const breadcrumbObj = breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs, lang) : null;

  const contactPage = {
    "@type": "ContactPage",
    "@id": `${pageUrl}#contact`,
    "url": pageUrl,
    "name": lang === "ru" ? "Контакты" : lang === "en" ? "Contact" : "Aloqa",
    "mainEntity": {
      "@type": ["Dentist", "MedicalBusiness"],
      "@id": `${SITE_ORIGIN}/#dentist`,
      "name": `${DOCTOR_INFO.name} — Smiles Dental Group`,
      "telephone": DOCTOR_INFO.phoneRaw,
      "email": DOCTOR_INFO.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1-kichik daha (1-mikrorayon), 8A-bino",
        "addressLocality": "Andijon",
        "addressRegion": "Andijon viloyati",
        "postalCode": "170100",
        "addressCountry": "UZ",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": PRIMARY_CLINIC.coordinates.lat,
        "longitude": PRIMARY_CLINIC.coordinates.lng,
      },
      "hasMap": [
        PRIMARY_CLINIC.maps.googleFull,
        PRIMARY_CLINIC.maps.yandex,
      ],
    },
  };

  if (breadcrumbObj) {
    return {
      "@context": "https://schema.org",
      "@graph": [breadcrumbObj, contactPage],
    };
  }

  return {
    "@context": "https://schema.org",
    ...contactPage,
  };
};

export const buildPageWithBreadcrumbs = (pageType, path, title, lang = "uz", breadcrumbs = []) => {
  const pageUrl = urlFor(path, lang);
  const breadcrumbObj = breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs, lang) : null;

  const page = {
    "@type": pageType || "WebPage",
    "@id": `${pageUrl}#webpage`,
    "url": pageUrl,
    "name": title,
    "inLanguage": lang,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      "url": SITE_ORIGIN,
      "name": DOCTOR_INFO.name,
    },
  };

  if (breadcrumbObj) {
    return {
      "@context": "https://schema.org",
      "@graph": [breadcrumbObj, page],
    };
  }

  return {
    "@context": "https://schema.org",
    ...page,
  };
};

export const buildHomeSchema = (lang = "uz", faqItems = []) => {
  const homeUrl = urlFor("/", lang);
  const websiteEntity = {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    "url": `${SITE_ORIGIN}/`,
    "name": DOCTOR_INFO.name,
    "description": "Dr. Ozodbek Otaxonov — 10 yillik tajribaga ega vrach stomatolog. Ukraina Stomatologiya Tibbiyot Akademiyasi bitiruvchisi.",
    "inLanguage": ["uz", "ru", "en"],
  };

  const clinicEntity = {
    "@type": "DentalClinic",
    "@id": `${SITE_ORIGIN}/#clinic`,
    "name": "Smiles Dental Group",
    "alternateName": ["Smiles dental group", "Смайлс Дентал Групп", "SMILES DENTAL GROUP"],
    "telephone": DOCTOR_INFO.phoneRaw,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1-kichik daha (1-mikrorayon), 8A-bino",
      "addressLocality": "Andijon",
      "addressRegion": "Andijon viloyati",
      "postalCode": "170100",
      "addressCountry": "UZ",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": PRIMARY_CLINIC.coordinates.lat,
      "longitude": PRIMARY_CLINIC.coordinates.lng,
    },
    "hasMap": [
      PRIMARY_CLINIC.maps.googleFull,
      PRIMARY_CLINIC.maps.yandex,
    ],
    "areaServed": [
      { "@type": "City", "name": "Andijon" },
      { "@type": "City", "name": "Asaka" },
      { "@type": "City", "name": "Shahrixon" },
      { "@type": "AdministrativeArea", "name": "Andijon viloyati" },
      { "@type": "AdministrativeArea", "name": "Farg'ona vodiysi" },
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": DOCTOR_INFO.phoneRaw,
      "email": DOCTOR_INFO.email,
      "contactType": "emergency dental service",
      "availableLanguage": ["Uzbek", "Russian", "English"],
      "areaServed": "UZ",
    },
    "sameAs": [
      "https://g.page/r/Can7lHvF_ZNWECE/review",
      "https://www.google.com/maps?cid=18369680373809674194",
      "https://share.google/cG5vFoJOH4GX6Y3qv",
      "https://yandex.uz/maps/org/smiles_dental_group/10769129756/reviews/",
      "https://yandex.uz/maps/org/smiles_dental_group/10769129756/",
      "https://yandex.uz/maps/-/CXu-iKzx",
      DOCTOR_INFO.instagramUrl,
      DOCTOR_INFO.telegramUrl,
    ],
  };

  const dentistEntity = {
    "@type": ["Dentist", "MedicalBusiness"],
    "@id": `${SITE_ORIGIN}/#dentist`,
    "name": `${DOCTOR_INFO.name} — Smiles Dental Group`,
    "alternateName": [`${DOCTOR_INFO.name} Stomatolog`, "Dr. Ozodbek Otaxonov", "Стоматолог Озодбек Отахонов"],
    "url": `${SITE_ORIGIN}/`,
    "logo": `${SITE_ORIGIN}/logo_icon.png`,
    "image": `${SITE_ORIGIN}/dr_ozodbek_og.jpg`,
    "telephone": DOCTOR_INFO.phoneRaw,
    "email": DOCTOR_INFO.email,
    "priceRange": "$$",
    "currenciesAccepted": "UZS",
    "paymentAccepted": "Cash, Payme, Click, Uzum",
    "parentOrganization": {
      "@id": `${SITE_ORIGIN}/#clinic`,
    },
    "containedInPlace": {
      "@id": `${SITE_ORIGIN}/#clinic`,
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1-kichik daha (1-mikrorayon), 8A-bino",
      "addressLocality": "Andijon",
      "addressRegion": "Andijon viloyati",
      "postalCode": "170100",
      "addressCountry": "UZ",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": PRIMARY_CLINIC.coordinates.lat,
      "longitude": PRIMARY_CLINIC.coordinates.lng,
    },
    "hasMap": [
      PRIMARY_CLINIC.maps.googleFull,
      PRIMARY_CLINIC.maps.yandex,
    ],
    "areaServed": [
      { "@type": "City", "name": "Andijon" },
      { "@type": "City", "name": "Asaka" },
      { "@type": "City", "name": "Shahrixon" },
      { "@type": "AdministrativeArea", "name": "Andijon viloyati" },
      { "@type": "AdministrativeArea", "name": "Farg'ona vodiysi" },
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "18:30",
      },
    ],
    "medicalSpecialty": [
      "https://schema.org/Dentistry",
    ],
    "founder": {
      "@id": `${SITE_ORIGIN}/#doctor`,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "5",
      "bestRating": "5",
      "worstRating": "1",
    },
    "sameAs": [
      "https://g.page/r/Can7lHvF_ZNWECE/review",
      "https://www.google.com/maps?cid=18369680373809674194",
      "https://share.google/cG5vFoJOH4GX6Y3qv",
      "https://yandex.uz/maps/org/smiles_dental_group/10769129756/reviews/",
      "https://yandex.uz/maps/org/smiles_dental_group/10769129756/",
      "https://yandex.uz/maps/-/CXu-iKzx",
      DOCTOR_INFO.telegramUrl,
      DOCTOR_INFO.instagramUrl,
    ],
  };

  const doctorEntity = {
    "@type": "Physician",
    "@id": `${SITE_ORIGIN}/#doctor`,
    "name": DOCTOR_INFO.name,
    "jobTitle": DOCTOR_INFO.title,
    "description": `${DOCTOR_INFO.name} — 10 yillik tajribaga ega vrach stomatolog. Ukraina Stomatologiya Tibbiyot Akademiyasi bitiruvchisi. Smiles Dental Group (Andijon).`,
    "telephone": DOCTOR_INFO.phoneRaw,
    "email": DOCTOR_INFO.email,
    "url": `${SITE_ORIGIN}/`,
    "image": `${SITE_ORIGIN}/dr_ozodbek_og.jpg`,
    "worksFor": {
      "@id": `${SITE_ORIGIN}/#clinic`,
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": DOCTOR_INFO.education[lang] || DOCTOR_INFO.education.uz,
    },
    "medicalSpecialty": "https://schema.org/Dentistry",
    "knowsLanguage": ["uz", "ru", "en"],
    "knowsAbout":
      lang === "ru"
        ? [
            "Интраоральное 3D-сканирование Shining 3D IntraoralScan (без слепков)",
            "Клиническое отбеливание зубов Philips Zoom! WhiteSpeed (Zoom 4)",
            "Лечение острой зубной боли, пульпита и периодонтита",
            "Безболезненное лечение кариеса (двухэтапная анестезия)",
            "Дентальная имплантация зубов MegaGen (Южная Корея)",
            "Исправление прикуса и установка брекетов (Damon)",
            "Циркониевые и керамические коронки CAD/CAM",
            "Эстетические керамические виниры E-max",
            "Прозрачные элайнеры (капы для выравнивания)",
            "Съемное и несъемное протезирование (бюгельные и гибкие протезы)",
            "Атравматичное удаление зубов и сложных зубов мудрости",
          ]
        : lang === "en"
        ? [
            "Shining 3D Intraoral optical 3D scanning (impression-free)",
            "Philips Zoom! WhiteSpeed (Zoom 4) clinical teeth whitening",
            "Emergency toothache relief & root canal therapy (pulpitis)",
            "100% painless dental cavity & caries treatment",
            "MegaGen biocompatible titanium dental implants",
            "Orthodontic braces & bite correction (Damon system)",
            "Monolithic zirconia & ceramic crowns (CAD/CAM)",
            "Aesthetic E-max porcelain veneers (Hollywood smile)",
            "Clear orthodontic aligners",
            "Flexible Valplast & precision cast partial dentures",
            "Atraumatic tooth and wisdom tooth extraction",
          ]
        : [
            "Shining 3D Intraoral raqamli 3D optik skaneri (pastasiz o'lchov)",
            "Philips Zoom! WhiteSpeed (Zoom 4) professional tish oqartirish",
            "Tish og'rig'i (Toothache) va pulpitni tezkor davolash",
            "Kariesni 100% og'riqsiz davolash (2 bosqichli anesteziya)",
            "MegaGen biotitan dental implantatsiya (Janubiy Koreya)",
            "Ortodontik breketlar va tishlarni tekislash",
            "Sirkon va keramika karonkalar (CAD/CAM)",
            "Estetik E-max keramik vinirlar",
            "Shaffof ko'rinmas elaynerlar (kapalar)",
            "Moslashuvchan neylon va byugel tish protezlari",
            "Atravmatik tish olish va aql tishlari jarrohligi",
          ],
    "sameAs": [
      "https://g.page/r/Can7lHvF_ZNWECE/review",
      "https://www.google.com/maps?cid=18369680373809674194",
      "https://share.google/cG5vFoJOH4GX6Y3qv",
      "https://yandex.uz/maps/org/smiles_dental_group/10769129756/reviews/",
      "https://yandex.uz/maps/org/smiles_dental_group/10769129756/",
      "https://yandex.uz/maps/-/CXu-iKzx",
      DOCTOR_INFO.telegramUrl,
      DOCTOR_INFO.instagramUrl,
    ],
  };

  const graph = [websiteEntity, clinicEntity, dentistEntity, doctorEntity];

  if (Array.isArray(faqItems) && faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${homeUrl}#faq`,
      "mainEntity": faqItems.map((item) => ({
        "@type": "Question",
        "name": item.q[lang] || item.q.uz,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a[lang] || item.a.uz,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const buildBookingPageSchema = (lang = "uz", breadcrumbs = []) => {
  const pageUrl = urlFor("/booking", lang);
  const breadcrumbObj = breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs, lang) : null;

  const bookingPage = {
    "@type": "MedicalWebPage",
    "@id": `${pageUrl}#booking`,
    "url": pageUrl,
    "name": lang === "ru" ? "Онлайн запись к Д-ру Озодбеку" : lang === "en" ? "Online Appointment Booking" : "Onlayn qabulga yozilish",
    "about": {
      "@type": "Dentist",
      "@id": `${SITE_ORIGIN}/#dentist`,
      "name": DOCTOR_INFO.name,
      "telephone": DOCTOR_INFO.phoneRaw,
    },
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": pageUrl,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      "result": {
        "@type": "Reservation",
        "name": "Stomatologik qabulga yozilish",
      },
    },
  };

  if (breadcrumbObj) {
    return {
      "@context": "https://schema.org",
      "@graph": [breadcrumbObj, bookingPage],
    };
  }

  return {
    "@context": "https://schema.org",
    ...bookingPage,
  };
};

