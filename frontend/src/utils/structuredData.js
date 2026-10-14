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

export const buildMedicalProcedureSchema = (service, lang = "uz", breadcrumbs = []) => {
  const serviceUrl = urlFor(`/services/${service.id}`, lang);
  const breadcrumbObj = breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs, lang) : null;

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
    "provider": {
      "@id": `${SITE_ORIGIN}/#dentist`,
    },
    "performer": {
      "@id": `${SITE_ORIGIN}/#doctor`,
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

  if (breadcrumbObj) {
    return {
      "@context": "https://schema.org",
      "@graph": [breadcrumbObj, procedure],
    };
  }

  return {
    "@context": "https://schema.org",
    ...procedure,
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
    "description": "Dr. Ozodbek Otaxonov — 10 yillik tajribaga ega vrach stomatolog. Ukraina stomatologiya tibbiyot akademiyasi bitiruvchisi.",
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
      "contactType": "emergency dental service",
      "availableLanguage": ["Uzbek", "Russian", "English"],
      "areaServed": "UZ",
    },
    "sameAs": [
      "https://www.google.com/maps?cid=18369680373809674194",
      "https://share.google/cG5vFoJOH4GX6Y3qv",
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
      "https://www.google.com/maps?cid=18369680373809674194",
      "https://share.google/cG5vFoJOH4GX6Y3qv",
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
    "description": `${DOCTOR_INFO.name} — 10 yillik tajribaga ega vrach stomatolog. Ukraina stomatologiya tibbiyot akademiyasi bitiruvchisi. Smiles Dental Group (Andijon).`,
    "telephone": DOCTOR_INFO.phoneRaw,
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
    "knowsAbout": [
      "Tish og'rig'i (Toothache) davolash",
      "Tish kariesi va pulpyit terapiyasi",
      "Dental implantatsiya MegaGen (Janubiy Koreya)",
      "Ortodontik breketlar va tishlarni tekislash",
      "Sirkon va keramika karonkalar (CAD/CAM)",
      "Estetik vinirlar E-max",
      "Shaffof elaynerlar (kapalar)",
      "Tish protezlari (byugel va neylon)",
      "Professional tish oqartirish",
      "Og'riqsiz tish olish va jarrohlik",
    ],
    "sameAs": [
      "https://www.google.com/maps?cid=18369680373809674194",
      "https://share.google/cG5vFoJOH4GX6Y3qv",
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

