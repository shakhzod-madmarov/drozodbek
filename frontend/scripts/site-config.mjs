/**
 * Single source of truth for the public route table.
 *
 * Consumed by:
 *   - scripts/generate-sitemap.mjs (writes dist/sitemap.xml after `vite build`)
 *   - scripts/prerender.mjs        (renders each route × language to static HTML)
 *
 * `image.src` is a project-relative path (`src/assets/...` or `public/...`)
 * that the sitemap generator resolves to its final `/assets/<name>-<hash>.ext`
 * URL via Vite's build manifest.
 */

export const SITE_ORIGIN = "https://drozodbek.uz";

export const LANGS = ["uz", "ru", "en"];
export const DEFAULT_LANG = "uz";

/** Turn a canonical (Uzbek) path into its equivalent in `lang`. */
export const localizePath = (routePath = "/", lang = DEFAULT_LANG) => {
  const clean = routePath.startsWith("/") ? routePath : `/${routePath}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
};

export const ROUTES = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    image: {
      src: "public/dr_ozodbek_og.jpg",
      title: "Dr. Ozodbek Otaxonov — Vrach Stomatolog (10 Yillik Tajriba)",
      caption:
        "Ukraina Stomatologiya Tibbiyot Akademiyasi bakalavri, implantolog va estetik stomatolog Dr. Ozodbek Otaxonov",
    },
  },
  {
    path: "/services",
    changefreq: "weekly",
    priority: "0.9",
    image: {
      src: "src/assets/clinic_room.webp",
      title: "Stomatologik Xizmatlar — Dr. Ozodbek Otaxonov",
      caption:
        "Dental implant, breketlar, sirkon karonkalar, vinirlar, pratezlar, elaynerlar, oqartirish va og'riqsiz davolash",
    },
  },
  {
    path: "/about",
    changefreq: "monthly",
    priority: "0.9",
    image: {
      src: "src/assets/hero_smile.webp",
      title: "Dr. Ozodbek Otaxonov Haqida — 10 Yillik Klinik Tajriba",
      caption:
        "Ukraina Stomatologiya Tibbiyot Akademiyasi bitiruvchisi, xalqaro MegaGen sertifikatlari egasi",
    },
  },
  {
    path: "/contact",
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    path: "/booking",
    changefreq: "weekly",
    priority: "0.85",
  },
  {
    path: "/qabul",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/services/dental-implant",
    changefreq: "monthly",
    priority: "0.85",
    image: {
      src: "src/assets/treatment_implant.webp",
      title: "Dental Implantatsiya (MegaGen Biotitan) — Dr. Ozodbek",
      caption: "MegaGen biotitan implantlari bilan yo'qotilgan tishlarni og'riqsiz tiklash",
    },
  },
  {
    path: "/services/breketlar",
    changefreq: "monthly",
    priority: "0.85",
    image: {
      src: "src/assets/treatment_braces.webp",
      title: "Breket Tizimlari (Metall, Keramika, Sapfir) — Dr. Ozodbek",
      caption: "Tish qatorini to'g'irlash va ideal tishlash tizimi",
    },
  },
  {
    path: "/services/sirkon-keramika-karonkalar",
    changefreq: "monthly",
    priority: "0.8",
    image: {
      src: "src/assets/treatment_crowns.webp",
      title: "Sirkon va Keramika Karonkalar — Dr. Ozodbek",
      caption: "Tabiiy va mustahkam sirkoniy qoplamalar",
    },
  },
  {
    path: "/services/vinirlar",
    changefreq: "monthly",
    priority: "0.8",
    image: {
      src: "src/assets/treatment_veneers.webp",
      title: "Keramik E-max Vinirlar va Gollivud Tabassumi — Dr. Ozodbek",
      caption: "Tishlarning shakli va rangini mukammallashtirish",
    },
  },
  {
    path: "/services/pratezlar",
    changefreq: "monthly",
    priority: "0.8",
    image: {
      src: "src/assets/treatment_dentures.webp",
      title: "Zamonaviy Tish Pratezlari (Byugel, Neylon) — Dr. Ozodbek",
      caption: "Qulay va chidamli olinadigan hamda olinmaydigan protezlar",
    },
  },
  {
    path: "/services/elaynerlar",
    changefreq: "monthly",
    priority: "0.8",
    image: {
      src: "src/assets/treatment_aligners.webp",
      title: "Shaffof Elaynerlar (Ko'rinmas Kapalar) — Dr. Ozodbek",
      caption: "Breketsiz tishlarni to'g'irlashning zamonaviy usuli",
    },
  },
  {
    path: "/services/tish-oqartirish",
    changefreq: "monthly",
    priority: "0.8",
    image: {
      src: "src/assets/treatment_whitening.webp",
      title: "Lazerli Tish Oqartirish (AirFlow) — Dr. Ozodbek",
      caption: "Emalga zarar yetkazmasdan tishlarni oqartirish",
    },
  },
  {
    path: "/services/ogriqsiz-tish-davolash",
    changefreq: "monthly",
    priority: "0.8",
    image: {
      src: "src/assets/treatment_therapy.webp",
      title: "Og'riqsiz Tish Davolash va Plombalash — Dr. Ozodbek",
      caption: "Karies va asab kanallarini 100% og'riqsiz davolash",
    },
  },
  {
    path: "/services/ogriqsiz-tish-olish",
    changefreq: "monthly",
    priority: "0.75",
    image: {
      src: "src/assets/treatment_surgery.webp",
      title: "Og'riqsiz Tish Olish va Jarrohlik — Dr. Ozodbek",
      caption: "Atravmatik tish olish va aql tishlarini og'riqsiz bartaraf etish",
    },
  },
];
