import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import {
  DOCTOR_INFO,
  getYearsOfExperience,
  getHeroTag,
} from "../constants/doctor";
import { PAGE_SEO, PAGE_KEYWORDS } from "../constants/seo";
import Seo from "../components/Seo";
import InlineBookingSection from "../components/InlineBookingSection";
import ClinicLocationMap from "../components/ClinicLocationMap";
import FaqAccordion from "../components/FaqAccordion";
import { FAQ_ITEMS } from "../constants/faq";
import { buildHomeSchema } from "../utils/structuredData";
import { SERVICES_CATALOG } from "../constants/servicesCatalog";
import CertificatesShowcase from "../components/CertificatesShowcase";
import Interactive3DCostCalculator from "../components/Interactive3DCostCalculator";
import SmileAssessmentWizard from "../components/SmileAssessmentWizard";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import PatientCareGuides from "../components/PatientCareGuides";
import {
  IconShieldCheck,
  IconSparkleStar,
  IconAward,
  IconClock,
  IconPhone,
  IconCheckCircle,
  IconGraduationCap,
  IconTelegram,
} from "../components/MedicalIcons";
import Doctor3DCard from "../components/Doctor3DCard";

/* ═══════════════════════════════════════════════════════════════════
   1. EDITORIAL HERO — DR. OZODBEK OTAXONOV
   ═══════════════════════════════════════════════════════════════════ */
const HeroSection = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();

  const T = {
    uz: {
      badge: "Vrach-Stomatolog · 10 Yillik Tajriba",
      doctorName: DOCTOR_INFO.name,
      specialtyTitle: "Implantolog · Ortoped · Ortodont · Terapevt",
      headline: "Tabiiy va Sog'lom Tabassum Uchun 100% Og'riqsiz Zamonaviy Stomatologiya",
      subtitle:
        "Ukraina stomatologiya tibbiyot akademiyasi bitiruvchisi. MegaGen biotitan implantlari, breketlar, tsirkoniy karonkalar, E-max vinirlar, ko'rinmas elaynerlar va og'riqsiz davolash.",
      ctaBook: "Qabulga Yozilish",
      ctaServices: "Barcha Xizmatlar",
      stat1Num: "10 Yil",
      stat1Label: "Klinik Tajriba",
      stat2Num: "1,000+",
      stat2Label: "Mamnun Bemorlar",
      stat3Num: "100%",
      stat3Label: "Steril va Og'riqsiz",
      stat4Num: "MegaGen",
      stat4Label: "Xalqaro Sertifikat",
    },
    ru: {
      badge: "Врач-Стоматолог · 10 Лет Опыта",
      doctorName: DOCTOR_INFO.name,
      specialtyTitle: "Имплантолог · Ортопед · Ортодонт · Терапевт",
      headline: "Современная Стоматология Без Боли для Вашей Безупречной Улыбки",
      subtitle:
        "Выпускник Украинской медицинской стоматологической академии. Дентальная имплантация MegaGen, брекеты, циркониевые коронки, виниры E-max, элайнеры и бережное лечение зубов.",
      ctaBook: "Записаться на Приём",
      ctaServices: "Все Услуги",
      stat1Num: "10 Лет",
      stat1Label: "Клинического Опыта",
      stat2Num: "1,000+",
      stat2Label: "Довольных Пациентов",
      stat3Num: "100%",
      stat3Label: "Без Боли и Чисто",
      stat4Num: "MegaGen",
      stat4Label: "Сертификация",
    },
    en: {
      badge: "Dental Surgeon · 10 Years Experience",
      doctorName: DOCTOR_INFO.name,
      specialtyTitle: "Implantologist · Prosthodontist · Orthodontist",
      headline: "Gentle & 100% Painless Modern Dental Care for Your Natural Smile",
      subtitle:
        "Graduate of Ukrainian Medical Stomatological Academy. MegaGen dental implants, orthodontic braces, monolithic zirconia crowns, E-max veneers, and gentle tooth therapy.",
      ctaBook: "Book Appointment",
      ctaServices: "Explore Services",
      stat1Num: "10 Yrs",
      stat1Label: "Clinical Experience",
      stat2Num: "1,000+",
      stat2Label: "Treated Patients",
      stat3Num: "100%",
      stat3Label: "Painless & Sterile",
      stat4Num: "MegaGen",
      stat4Label: "Certified Specialist",
    },
  };
  const t = T[lang] || T.uz;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white border border-amber-200/90 shadow-luxury mt-3">
      {/* Brand Accent Top Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-brandOrange to-brandCyan" />

      <div className="p-5 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Copy (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-primary border border-red-200/60 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/80 text-amber-900 border border-amber-200/60 text-[11px] font-semibold">
              <IconGraduationCap className="w-3.5 h-3.5 text-brandOrange shrink-0" />
              <span>Ukraina Stomatologiya Akademiyasi</span>
            </span>
          </div>

          {/* Title & Headline */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brandOrange">
              {t.specialtyTitle}
            </p>
            <h1 className="font-serif-classic text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A202C] leading-[1.14] break-words">
              {t.headline}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3 pt-1">
            <button
              onClick={() => onOpenBooking()}
              className="relative overflow-hidden inline-flex justify-center items-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/25 -translate-x-full group-hover:animate-shimmer-sweep pointer-events-none" />
              <IconClock className="w-4 h-4 text-white relative z-10" />
              <span className="relative z-10">{t.ctaBook}</span>
            </button>

            <Link
              to={to("/services")}
              className="inline-flex justify-center items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200/70 text-slate-800 font-semibold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs"
            >
              <span>{t.ctaServices}</span>
              <span>→</span>
            </Link>

            <a
              href={DOCTOR_INFO.phoneHref}
              className="inline-flex justify-center items-center gap-2 px-3.5 py-3 rounded-xl text-primary hover:bg-primary/5 font-semibold text-xs sm:text-sm transition-colors hover:scale-105 duration-200"
            >
              <IconPhone className="w-4 h-4 text-primary" />
              <span>{DOCTOR_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* 4 Stats Grid with Interactive 3D Depth Motion */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-amber-100 [perspective:800px]">
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/50 shadow-2xs hover:-translate-y-1.5 hover:scale-[1.03] hover:border-amber-300 hover:shadow-lg transition-all duration-300 cursor-default">
              <p className="font-serif-classic text-xl sm:text-2xl font-bold text-primary">{t.stat1Num}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{t.stat1Label}</p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/50 shadow-2xs hover:-translate-y-1.5 hover:scale-[1.03] hover:border-amber-300 hover:shadow-lg transition-all duration-300 cursor-default">
              <p className="font-serif-classic text-xl sm:text-2xl font-bold text-brandOrange">{t.stat2Num}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{t.stat2Label}</p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/50 shadow-2xs hover:-translate-y-1.5 hover:scale-[1.03] hover:border-amber-300 hover:shadow-lg transition-all duration-300 cursor-default">
              <p className="font-serif-classic text-xl sm:text-2xl font-bold text-emerald-600">{t.stat3Num}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{t.stat3Label}</p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/50 shadow-2xs hover:-translate-y-1.5 hover:scale-[1.03] hover:border-amber-300 hover:shadow-lg transition-all duration-300 cursor-default">
              <p className="font-serif-classic text-xl sm:text-2xl font-bold text-brandCyan">{t.stat4Num}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{t.stat4Label}</p>
            </div>
          </div>
        </div>

        {/* Right Visual (5 cols): Interactive 3D Perspective Doctor Card */}
        <div className="lg:col-span-5 relative flex justify-center">
          <Doctor3DCard lang={lang} />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   2. 9 CORE SPECIALITIES SHOWCASE
   ═══════════════════════════════════════════════════════════════════ */
const SpecialitiesSection = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();

  return (
    <section className="py-12 sm:py-16 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-red-50 text-primary border border-red-200/60">
          <IconShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>{lang === "uz" ? "9 Ta Asosiy Stomatologik Yo'nalish" : lang === "ru" ? "9 Основных Направлений" : "9 Core Dental Specialties"}</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
          {lang === "uz"
            ? "Dr. Ozodbek Otaxonovning Stomatologik Xizmatlari"
            : lang === "ru"
            ? "Клинические Услуги Д-ра Озодбека Отахонова"
            : "Clinical Specialties & Smile Procedures"}
        </h2>
        <p className="text-sm text-slate-600">
          {lang === "uz"
            ? "10 yillik tajriba, Ukraina akademiyasi bilimlari hamda Koreya va Germaniyaning eng yuqori sifatli materiallari."
            : lang === "ru"
            ? "10 лет практики, классическая академическая школа и передовые технологии имплантации и ортодонтии."
            : "A decade of dental mastery combining academic knowledge with genuine German and South Korean materials."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_CATALOG.map((s) => (
          <div
            key={s.id}
            className="group bg-white rounded-3xl border border-amber-200/80 p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 relative overflow-hidden flex flex-col justify-between space-y-5 [transform-style:preserve-3d]"
          >
            {/* 3D Corner Hover Flare */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-gradient-to-br from-amber-400/25 to-primary/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-2xs">
                  {s.icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60">
                  {s.category[lang]}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                  {s.title[lang]}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {s.shortDesc[lang]}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-amber-100 text-xs">
                {s.highlights[lang].slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-[11px] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-amber-100 flex items-center justify-between gap-3">
              <Link
                to={to(`/services/${s.id}`)}
                className="text-xs font-bold text-slate-700 hover:text-primary transition-colors"
              >
                {lang === "uz" ? "Batafsil →" : lang === "ru" ? "Подробнее →" : "Learn more →"}
              </Link>
              <button
                onClick={() => onOpenBooking(s.id)}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {lang === "uz" ? "Yozilish" : lang === "ru" ? "Запись" : "Book"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   3. BEFORE & AFTER GALLERY SHOWCASE
   ═══════════════════════════════════════════════════════════════════ */
const BeforeAfterSection = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-12 sm:py-16 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300">
          <IconSparkleStar className="w-4 h-4 text-brandOrange" />
          <span>{lang === "uz" ? "NATIJALAR VA TAQQOSLASH" : lang === "ru" ? "РЕЗУЛЬТАТЫ ДО И ПОСЛЕ" : "BEFORE & AFTER GALLERY"}</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
          {lang === "uz"
            ? "Muvaffaqiyatli Tabassum Restavratsiyalari"
            : lang === "ru"
            ? "Примеры Преображения Улыбки"
            : "Smile Transformation Results"}
        </h2>
        <p className="text-sm text-slate-600">
          {lang === "uz"
            ? "Slayderni o'ngga va chapga surib, davolashdan oldingi va keyingi natijalarni taqqoslang."
            : lang === "ru"
            ? "Перемещайте ползунок, чтобы сравнить состояние зубов до и после лечения."
            : "Drag the slider handle to inspect authentic clinical smile improvements."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BeforeAfterSlider
          beforeImg={assets.treatment_implant}
          afterImg={assets.hero_smile}
          title={lang === "uz" ? "Dental Implantatsiya & Tsirkoniy" : "Имплантация и Цирконий"}
          subtitle={lang === "uz" ? "MegaGen implant va CAD/CAM karonka" : "MegaGen и коронка CAD/CAM"}
        />
        <BeforeAfterSlider
          beforeImg={assets.treatment_crowns}
          afterImg={assets.treatment_veneers}
          title={lang === "uz" ? "E-max Estetik Vinirlar" : "Виниры E-max"}
          subtitle={lang === "uz" ? "Gollivud tabassumi dizayni" : "Дизайн Голливудской улыбки"}
        />
        <BeforeAfterSlider
          beforeImg={assets.treatment_therapy}
          afterImg={assets.treatment_whitening}
          title={lang === "uz" ? "Tish Oqartirish & Restavratsiya" : "Отбеливание и Реставрация"}
          subtitle={lang === "uz" ? "AirFlow va fotopolimer restavratsiya" : "AirFlow и нано-композиты"}
        />
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN HOME PAGE
   ═══════════════════════════════════════════════════════════════════ */
const Home = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const seo = PAGE_SEO.home[lang] || PAGE_SEO.home.uz;
  const homeSchema = buildHomeSchema(lang, FAQ_ITEMS);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={PAGE_KEYWORDS[lang]}
        schemaJson={homeSchema}
      />

      {/* 1. Hero */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. 9 Specialties */}
      <SpecialitiesSection onOpenBooking={onOpenBooking} />

      {/* 3. Interactive Treatment & Cost Calculator */}
      <Interactive3DCostCalculator />

      {/* 4. Verified Diplomas & MegaGen Certificates */}
      <CertificatesShowcase />

      {/* 5. Before & After */}
      <BeforeAfterSection />

      {/* 6. Online Smile Assessment Wizard */}
      <SmileAssessmentWizard />

      {/* 7. Patient Aftercare Guides */}
      <PatientCareGuides />

      {/* 8. Inline Booking Section */}
      <InlineBookingSection />

      {/* 9. FAQ Accordion */}
      <FaqAccordion />

      {/* 10. Clinic Contact & Location */}
      <ClinicLocationMap />
    </div>
  );
};

export default Home;
