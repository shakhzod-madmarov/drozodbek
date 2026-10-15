/**
 * Single source of truth for Dr. Ozodbek Otaxonov's career facts, credentials, and clinic hours.
 */
export const DOCTOR_INFO = {
  name: "Dr. Ozodbek Otaxonov",
  title: "Vrach Stomatolog",
  specialtiesText: "Dental implant · Breket · Sirkon & Keramika · Vinirlar · Pratezlar · Elaynerlar · Oqartirish",
  careerStartYear: 2016, // 10 years of clinical experience in 2026
  education: {
    uz: "Ukraina Stomatologiya Tibbiyot Akademiyasi (Bakalavr)",
    ru: "Украинская Медицинская Стоматологическая Академия (Бакалавр)",
    en: "Ukrainian Medical Stomatological Academy (Bachelor of Dentistry)",
  },
  degree: "Bakalavr",
  phone: "+998 (97) 833-89-97",
  phoneDisplay: "+998 97 833 89 97",
  phoneHref: "tel:+998978338997",
  phoneRaw: "+998978338997",
  telegramUrl: "https://t.me/Stamatolog07",
  telegramHandle: "@Stamatolog07",
  instagramUrl: "https://www.instagram.com/_vrach_stomatolog/",
  instagramHandle: "@_vrach_stomatolog",
};

export const getYearsOfExperience = () => 10;

export const OPENING_HOURS = {
  weekdays: { opens: "08:30", closes: "18:30" },
  labels: {
    uz: {
      days: "Dushanba – Shanba",
      hours: "08:30 – 18:30",
      full: "Dushanba – Shanba: 08:30 – 18:30",
      sunday: "Yakshanba — oldindan yozilish bo'yicha",
    },
    ru: {
      days: "Понедельник – Суббота",
      hours: "08:30 – 18:30",
      full: "Понедельник – Суббота: 08:30 – 18:30",
      sunday: "Воскресенье — по предварительной записи",
    },
    en: {
      days: "Monday – Saturday",
      hours: "08:30 – 18:30",
      full: "Monday – Saturday: 08:30 – 18:30",
      sunday: "Sunday — by prior appointment",
    },
  },
};

export const getExperienceText = (lang = "uz") => {
  const years = getYearsOfExperience();
  if (lang === "ru") return `${years} лет клинического опыта`;
  if (lang === "en") return `${years} Years of Clinical Excellence`;
  return `${years} yillik klinik tajriba`;
};

export const getExperienceBadge = (lang = "uz") => {
  const years = getYearsOfExperience();
  if (lang === "ru") return `${years} Лет Опыта`;
  if (lang === "en") return `${years} Years Experience`;
  return `${years} Yillik Tajriba`;
};

export const getHeroTag = (lang = "uz") => {
  const years = getYearsOfExperience();
  if (lang === "ru") return `Врач-Стоматолог · ${years} лет практики · Украинская Медицинская Стоматологическая Академия`;
  if (lang === "en") return `Dentist & Implantologist · ${years} Years Experience · Ukrainian Medical Stomatological Academy`;
  return `Vrach-Stomatolog · ${years} Yillik Tajriba · Ukraina Stomatologiya Tibbiyot Akademiyasi`;
};

export const getServicesTag = (lang = "uz") => {
  const years = getYearsOfExperience();
  if (lang === "ru") return `${years} ЛЕТ КЛИНИЧЕСКОГО ОПЫТА · ВСЕ ВИДЫ СТОМАТОЛОГИИ`;
  if (lang === "en") return `${years} YEARS CLINICAL EXCELLENCE · ALL SPECIALTIES`;
  return `${years} YILLIK KLINIK TAJRIBA · BARCHA STOMATOLOGIK XIZMATLAR`;
};
