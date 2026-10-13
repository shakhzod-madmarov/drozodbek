import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { DOCTOR_INFO, getYearsOfExperience, getExperienceBadge } from "../constants/doctor";
import { PAGE_SEO, PAGE_KEYWORDS, SITE_ORIGIN } from "../constants/seo";
import Seo from "../components/Seo";
import { buildAboutPageSchema } from "../utils/structuredData";
import ClinicLocationMap from "../components/ClinicLocationMap";
import CertificatesShowcase from "../components/CertificatesShowcase";
import {
  IconAward,
  IconShieldCheck,
  IconSparkleStar,
  IconPhone,
  IconTelegram,
  IconInstagram,
  IconGraduationCap,
  IconCheckCircle,
} from "../components/MedicalIcons";

const About = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const seo = PAGE_SEO.about[lang] || PAGE_SEO.about.uz;
  const years = getYearsOfExperience();

  const timeline = [
    {
      year: {
        uz: "2016 – Hozirgacha",
        ru: "2016 – По настоящее время",
        en: "2016 – Present",
      },
      title: {
        uz: `Vrach-Stomatolog, Implantolog va Ortoped (${years} Yillik Tajriba)`,
        ru: `Врач-Стоматолог, Имплантолог и Ортопед (${years} Лет Практики)`,
        en: `Dental Surgeon & Implantologist (${years} Years Clinical Practice)`,
      },
      desc: {
        uz: "1,000+ dan ortiq bemorlarning tishlarini og'riqsiz davolash, biotitan implantlar, sirkon karonka va E-max vinirlar bilan estetik tiklash.",
        ru: "Более 1 000 успешно вылеченных пациентов: имплантация, циркониевые коронки, виниры E-max и ортодонтия.",
        en: "Over 1,000 treated patients across dental implants, orthodontic braces, zirconia crowns, and aesthetic veneers.",
      },
    },
    {
      year: {
        uz: "Asosiy Ta'lim",
        ru: "Высшее Образование",
        en: "Medical Education",
      },
      title: {
        uz: "Ukraina Stomatologiya Tibbiyot Akademiyasi (Bakalavr)",
        ru: "Украинская Медицинская Стоматологическая Академия (Бакалавр)",
        en: "Ukrainian Medical Stomatological Academy (Bachelor of Dentistry)",
      },
      desc: {
        uz: "Stomatologiya sohasida Yevropa akademik tibbiy ta'limi va fundamental klinik tayyorgarlik.",
        ru: "Фундаментальное академическое медицинское образование европейского уровня по специальности «Стоматология».",
        en: "Fundamental academic medical education and clinical dentistry training.",
      },
    },
    {
      year: {
        uz: "2024 – 2026",
        ru: "2024 – 2026",
        en: "2024 – 2026",
      },
      title: {
        uz: "MegaGen Xalqaro Implantologiya & Navigatsion Jarrohlik",
        ru: "Международная Имплантология MegaGen & Навигационная Хирургия",
        en: "MegaGen International Implantology & Guided Surgery",
      },
      desc: {
        uz: "Samarqand Davlat Tibbiyot Universiteti va Janubiy Koreyaning MegaGen International markazida jarrohlik va ortopediya protokollari bo'yicha amaliy malaka oshirish.",
        ru: "Повышение квалификации в СамГМУ и MegaGen по навигационной хирургии, костно-пластическим протоколам и протезированию.",
        en: "Advanced surgical fellowships in computer-guided implantology and prosthodontic restoration protocols.",
      },
    },
  ];

  const values = [
    {
      icon: <IconShieldCheck className="w-6 h-6 text-primary" />,
      title: {
        uz: "100% Sterillik (Anti-SPID / Anti-Gepatit)",
        ru: "100% Стерильность (Анти-СПИД / Гепатит)",
        en: "100% Sterility (Anti-HIV / Hepatitis)",
      },
      desc: {
        uz: "Har bir bemor uchun alohida kraft-paketda avtoklavlangan steril asboblar ko'z oldingizda ochiladi.",
        ru: "Индивидуальный крафт-пакет со стерильными инструментами вскрывается прямо перед пациентом.",
        en: "Autoclaved sterile instrument pouches are unsealed right in front of every patient.",
      },
    },
    {
      icon: <IconSparkleStar className="w-6 h-6 text-brandOrange" />,
      title: {
        uz: "Ikki Bosqichli Og'riqsiz Anesteziya",
        ru: "Двухэтапная Анестезия Без Боли",
        en: "Two-Stage Painless Anesthesia",
      },
      desc: {
        uz: "Avval milk maxsus gel bilan muzlatiladi, so'ng Yevropa anestetigi yuboriladi — ukol og'rig'i mutlaqo sezilmaydi.",
        ru: "Десна предварительно обезболивается гелем, поэтому вы не почувствуете даже укола.",
        en: "Topical numbing gel is applied before gentle European anesthesia so you never feel the needle.",
      },
    },
    {
      icon: <IconAward className="w-6 h-6 text-brandCyan" />,
      title: {
        uz: "MegaGen (Koreya), Germaniya va Yaponiya Materiallari",
        ru: "Материалы из Кореи (MegaGen), Германии и Японии",
        en: "MegaGen (Korea), German & Japanese Materials",
      },
      desc: {
        uz: "MegaGen titan implantlari, 3M Filtek (Germaniya), Estelite (Yaponiya) va Ivoclar E-max original mahsulotlari.",
        ru: "Оригинальные имплантаты MegaGen, фотополимеры 3M Filtek (Германия), Estelite (Япония) и керамика E-max.",
        en: "Authentic MegaGen implants, 3M Filtek composites, Tokuyama Estelite, and Ivoclar E-max ceramics.",
      },
    },
  ];

  const breadcrumbs = [
    { name: lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa", path: "/" },
    { name: lang === "ru" ? "О враче" : lang === "en" ? "About Doctor" : "Dr. Ozodbek haqida", path: "/about" },
  ];
  const aboutSchema = buildAboutPageSchema(lang, breadcrumbs);

  return (
    <div className="py-4 sm:py-8 space-y-12">
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={PAGE_KEYWORDS[lang]}
        ogImage={`${SITE_ORIGIN}/dr_ozodbek_og.jpg`}
        schemaJson={aboutSchema}
      />

      {/* Semantic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2">
        <Link to={to("/")} className="hover:text-primary transition-colors">
          {lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa"}
        </Link>
        <span>/</span>
        <span className="text-primary font-bold" aria-current="page">
          {lang === "ru" ? "О враче" : lang === "en" ? "About Doctor" : "Dr. Ozodbek haqida"}
        </span>
      </nav>

      {/* Doctor Bio Editorial Header */}
      <div className="relative overflow-hidden bg-white rounded-3xl border border-amber-200/90 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-5 sm:p-10 lg:p-12">
        {/* Brand Accent Top Strip */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-brandOrange to-brandCyan absolute top-0 left-0 right-0" />

        <div className="lg:col-span-7 space-y-6 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-50 text-primary border border-red-200/60 text-[11px] font-semibold">
              {getExperienceBadge(lang)}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-[11px] font-semibold">
              Ukraina Akademiyasi Bakalavri
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif-classic text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight break-words">
              Dr. Ozodbek Otaxonov
            </h1>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brandOrange">
              Vrach Stomatolog · Implantolog · Ortoped · Ortodont
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === "uz"
              ? "Dr. Ozodbek Otaxonov 10 yillik amaliy tajribaga ega bo'lib, Ukraina stomatologiya tibbiyot akademiyasida tahsil olgan. U Janubiy Koreyaning MegaGen xalqaro implantologiya tizimlari, raqamli 3D navigatsion jarrohlik, estetik E-max vinirlar, tsirkoniy karonkalar hamda zamonaviy breketlar bo'yicha ixtisoslashgan mutaxassisdir."
              : lang === "ru"
              ? "Д-р Озодбек Отахонов обладает 10-летним практическим опытом. Выпускник Украинской медицинской стоматологической академии. Специализируется на дентальной имплантации MegaGen, навигационной хирургии, эстетических винирах E-max, циркониевых коронках и выравнивании прикуса брекетами."
              : "Dr. Ozodbek Otaxonov brings a decade of clinical dentistry practice. A graduate of the Ukrainian Medical Stomatological Academy, he specializes in MegaGen dental implants, 3D guided surgery, E-max veneers, monolithic zirconia crowns, and orthodontic alignment."}
          </p>

          <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3 pt-1">
            <button
              onClick={() => onOpenBooking()}
              className="relative overflow-hidden inline-flex justify-center items-center px-5 sm:px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/25 -translate-x-full group-hover:animate-shimmer-sweep pointer-events-none" />
              <span className="relative z-10">{lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Записаться на Приём" : "Book Visit"}</span>
            </button>
            <a
              href={DOCTOR_INFO.phoneHref}
              className="inline-flex justify-center items-center px-4 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/70 border border-amber-200/70 text-slate-800 text-xs sm:text-sm font-semibold gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs"
            >
              <IconPhone className="w-4 h-4 text-primary" />
              <span>{DOCTOR_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Right Visual (5 cols): Pure High-Def Doctor Portrait with Ambient Lighting Motion */}
        <div className="lg:col-span-5 relative flex justify-center pt-2">
          {/* Ambient Breathing Lighting Glow behind portrait */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-amber-300/30 via-orange-200/20 to-cyan-300/20 rounded-[3rem] blur-2xl -z-10 opacity-70 animate-pulse-glow pointer-events-none" />

          <div className="relative w-full max-w-sm sm:max-w-md rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#FFF8EC] to-[#FFF1D1]/60 border-2 border-amber-200/80 shadow-luxury-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-amber-300/90 group">
            {/* Pure, Clean High-Definition Doctor Portrait (Zero text overlays on image) */}
            <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-gradient-to-b from-slate-100/40 via-amber-50/20 to-amber-100/30">
              <picture>
                <source srcSet="/dr_ozodbek_portrait_pro.webp" type="image/webp" />
                <img
                  src="/dr_ozodbek_portrait_pro.jpg"
                  alt={
                    lang === "ru"
                      ? "Д-р Озодbek Отахонов — Врач-Стоматолог"
                      : lang === "en"
                      ? "Dr. Ozodbek Otaxonov — Dental Surgeon"
                      : "Dr. Ozodbek Otaxonov — Vrach Stomatolog"
                  }
                  width={600}
                  height={675}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_top] filter transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </picture>
            </div>

            {/* Sleek Minimalist Luxury Footer */}
            <div className="px-5 py-3.5 bg-white/95 backdrop-blur-md border-t border-amber-200/60 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-serif-classic text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                  Dr. Ozodbek Otaxonov
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary truncate">
                  {lang === "ru" ? "Врач-Стоматолог · Имплантолог" : lang === "en" ? "Dental Surgeon · Implantologist" : "Vrach Stomatolog · Implantolog"}
                </p>
              </div>

              {/* Direct Quick Channel Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={DOCTOR_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-9 h-9 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200/60 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xs"
                  title="Telegram: @Stamatolog07"
                >
                  <IconTelegram className="w-4 h-4 text-sky-500" />
                </a>
                <a
                  href={DOCTOR_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200/60 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xs"
                  title="Instagram: @_vrach_stomatolog"
                >
                  <IconInstagram className="w-4 h-4 text-pink-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Certificates Showcase */}
      <CertificatesShowcase />

      {/* Clinical Values & Standards */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {lang === "uz" ? "KLINIK STANDARTLAR" : lang === "ru" ? "СТАНДАРТЫ КАЧЕСТВА" : "CLINICAL EXCELLENCE"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz" ? "Bizning Qat'iy Tibbiy Tamoyillarimiz" : lang === "ru" ? "Наши Принципы и Стандарты" : "Our Core Clinical Standards"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-3">
              <span className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                {val.icon}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {val.title[lang]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {val.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Career Timeline */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {lang === "uz" ? "TAJRIBA VA BOSHQICHLAR" : lang === "ru" ? "ОПЫТ И ЭТАПЫ" : "CAREER MILESTONES"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz" ? "Kasbiy Yo'l va Malaka Oshirish" : lang === "ru" ? "Профессиональный Путь" : "Professional Journey"}
          </h2>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {timeline.map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-amber-200 shadow-2xs space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                {item.year[lang]}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-classic">
                {item.title[lang]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Location & Map */}
      <ClinicLocationMap />
    </div>
  );
};

export default About;
