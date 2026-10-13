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
import { buildFaqSchema } from "../utils/structuredData";
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
} from "../components/MedicalIcons";

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

      <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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
            <h1 className="font-serif-classic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A202C] leading-[1.12]">
              {t.headline}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <IconClock className="w-4 h-4 text-white" />
              <span>{t.ctaBook}</span>
            </button>

            <Link
              to={to("/services")}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200/70 text-slate-800 font-semibold text-xs sm:text-sm transition-all duration-200"
            >
              <span>{t.ctaServices}</span>
              <span>→</span>
            </Link>

            <a
              href={DOCTOR_INFO.phoneHref}
              className="inline-flex items-center gap-2 px-3.5 py-3.5 rounded-xl text-primary hover:bg-primary/5 font-semibold text-xs sm:text-sm transition-colors"
            >
              <IconPhone className="w-4 h-4 text-primary" />
              <span>{DOCTOR_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-amber-100">
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/50 shadow-2xs">
              <p className="font-serif-classic text-xl sm:text-2xl font-bold text-primary">{t.stat1Num}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{t.stat1Label}</p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/50 shadow-2xs">
              <p className="font-serif-classic text-xl sm:text-2xl font-bold text-brandOrange">{t.stat2Num}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{t.stat2Label}</p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/50 shadow-2xs">
              <p className="font-serif-classic text-xl sm:text-2xl font-bold text-emerald-600">{t.stat3Num}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{t.stat3Label}</p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/50 shadow-2xs">
              <p className="font-serif-classic text-xl sm:text-2xl font-bold text-brandCyan">{t.stat4Num}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{t.stat4Label}</p>
            </div>
          </div>
        </div>

        {/* Right Visual (5 cols): Authentic Logo & Brand Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-amber-50/60 to-orange-50/40 border border-amber-200/70 p-6 sm:p-8 shadow-luxury text-center flex flex-col items-center justify-center space-y-4">
            {/* Clean, glowing emblem circle */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto flex items-center justify-center rounded-2xl bg-white shadow-xs border border-amber-100/80 p-3.5">
              <img
                src="/logo_icon.png"
                alt="Dr. Ozodbek Otaxonov — Vrach Stomatolog"
                width={140}
                height={140}
                className="w-full h-full object-contain filter drop-shadow-xs transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
                Dr. Ozodbek Otaxonov
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Vrach Stomatolog · 10 Yillik Tajriba
              </p>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed pt-1">
                Ukraina stomatologiya tibbiyot akademiyasi (bakalavr). MegaGen sertifikatlangan implantolog va ortoped.
              </p>
            </div>

            {/* Verification badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-bold">
                <IconShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>100% Steril</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-bold">
                <IconAward className="w-3 h-3 text-brandOrange" />
                <span>MegaGen 2026</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-900 border border-cyan-200/60 text-[10px] font-bold">
                <IconGraduationCap className="w-3 h-3 text-brandCyan" />
                <span>Ukraina Diplomi</span>
              </span>
            </div>

            {/* Quick direct channel links */}
            <div className="w-full pt-3.5 border-t border-amber-200/60 flex items-center justify-around text-xs font-semibold">
              <a
                href={DOCTOR_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
              >
                <span>✈ Telegram</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={DOCTOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors"
              >
                <span>📸 Instagram</span>
              </a>
            </div>
          </div>
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
            className="group bg-white rounded-3xl border border-amber-200/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 hover:border-primary/40 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
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
  const faqSchema = buildFaqSchema(FAQ_ITEMS, lang);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={PAGE_KEYWORDS[lang]}
        schemaJson={faqSchema}
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
