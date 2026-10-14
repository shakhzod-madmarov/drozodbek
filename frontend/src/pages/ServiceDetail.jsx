import React from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { SERVICES_CATALOG } from "../constants/servicesCatalog";
import { DOCTOR_INFO, getExperienceBadge } from "../constants/doctor";
import { PAGE_KEYWORDS, SITE_ORIGIN } from "../constants/seo";
import Seo from "../components/Seo";
import { buildMedicalProcedureSchema } from "../utils/structuredData";
import {
  IconCheckCircle,
  IconClock,
  IconShieldCheck,
  IconPhone,
  IconTelegram,
  IconAward,
  IconSparkleStar,
} from "../components/MedicalIcons";
import { useBooking } from "../context/BookingContext";

const ServiceDetail = () => {
  const { serviceId, slug } = useParams();
  const activeServiceId = serviceId || slug;
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const { openBooking } = useBooking();

  const service =
    SERVICES_CATALOG.find((s) => s.id === activeServiceId) || SERVICES_CATALOG[0];

  const steps = {
    uz: [
      {
        num: "01",
        title: "Ko'rik va Raqamli Diagnostika",
        desc: "Dr. Ozodbek Otaxonov tish holatini diqqat bilan tekshiradi va aniq individual davolash rejasini tuzadi.",
      },
      {
        num: "02",
        title: "2 Bosqichli Og'riqsiz Anesteziya",
        desc: "Avval milk muzlatuvchi gel bilan og'riqsizlantiriladi, so'ng Yevropa anestetigi yuboriladi — bemor ignani ham sezmaydi.",
      },
      {
        num: "03",
        title: "Mikroskopik Aniqlikda Asosiy Muolaja",
        desc: "Janubiy Koreya (MegaGen), Germaniya va Yaponiyaning original sertifikatlangan materiallari yordamida tiklash.",
      },
      {
        num: "04",
        title: "Sifat Nazorati va Kafolat",
        desc: "Muolaja yakunida chaynash balansi tekshiriladi, sayqallanadi va rasmiy klinik kafolat beriladi.",
      },
    ],
    ru: [
      {
        num: "01",
        title: "Осмотр и Цифровая Диагностика",
        desc: "Д-р Озодбек Отахонов проводит детальный осмотр и составляет прозрачный индивидуальный план лечения.",
      },
      {
        num: "02",
        title: "Двухэтапная Анестезия Без Боли",
        desc: "Десна предварительно обрабатывается гелем, после чего мягко вводится современный европейский анестетик.",
      },
      {
        num: "03",
        title: "Основной Этап Лечения / Реставрации",
        desc: "Работа выполняется с использованием сертифицированных материалов из Южной Кореи (MegaGen), Германии и Японии.",
      },
      {
        num: "04",
        title: "Контроль Качества и Гарантия",
        desc: "Проверка прикуса, полировка до естественного блеска эмали и выдача официальной гарантии.",
      },
    ],
    en: [
      {
        num: "01",
        title: "Consultation & Digital Diagnostics",
        desc: "Dr. Ozodbek Otaxonov performs a comprehensive clinical exam and formulates a transparent procedure plan.",
      },
      {
        num: "02",
        title: "Two-Stage Painless Anesthesia",
        desc: "Topical numbing gel is applied to the gum before gentle local anesthesia so you never feel the needle.",
      },
      {
        num: "03",
        title: "Precision Restorative Procedure",
        desc: "Treatment is performed using genuine materials from South Korea (MegaGen), Germany, and Japan.",
      },
      {
        num: "04",
        title: "Quality Verification & Warranty",
        desc: "Bite calibration, high-gloss enamel finishing, and formal clinical warranty.",
      },
    ],
  }[lang];

  const seoSuffix = {
    uz: "Dr. Ozodbek Otaxonov | Vrach Stomatolog",
    ru: "Д-р Озодбек Отахонов | Врач-Стоматолог",
    en: "Dr. Ozodbek Otaxonov | Dental Surgeon",
  }[lang];

  const breadcrumbs = [
    { name: lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa", path: "/" },
    { name: lang === "ru" ? "Услуги" : lang === "en" ? "Services" : "Xizmatlar", path: "/services" },
    { name: service.title[lang] || service.title.uz, path: `/services/${service.id}` },
  ];

  const procedureSchema = buildMedicalProcedureSchema(service, lang, breadcrumbs);

  return (
    <div className="py-6 sm:py-10 space-y-10">
      <Seo
        title={`${service.title[lang]} — ${seoSuffix}`}
        description={`${service.shortDesc[lang]} Dr. Ozodbek Otaxonov, 10 yillik tajriba. Tel: ${DOCTOR_INFO.phoneDisplay}.`}
        keywords={PAGE_KEYWORDS[lang]}
        schemaJson={procedureSchema}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2 flex-wrap">
        <Link to={to("/")} className="hover:text-primary transition-colors">
          {lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa"}
        </Link>
        <span>/</span>
        <Link to={to("/services")} className="hover:text-primary transition-colors">
          {lang === "ru" ? "Услуги" : lang === "en" ? "Services" : "Xizmatlar"}
        </Link>
        <span>/</span>
        <span className="text-primary font-bold truncate" aria-current="page">
          {service.title[lang]}
        </span>
      </nav>

      {/* Hero Service Showcase — Editorial Split with Full Clinical Photo Visibility */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-10 text-white shadow-luxury border border-amber-500/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Clinical Information & CTA */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-400/25 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{service.badge?.[lang] || service.category[lang]}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-[11px] font-medium uppercase tracking-wider border border-white/15">
                {service.category[lang]}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] font-medium tracking-wide border border-emerald-400/25">
                <IconShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{service.warranty[lang]}</span>
              </span>
            </div>

            <h1 className="font-serif-classic text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              {service.title[lang]}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {service.shortDesc[lang]}
            </p>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">{lang === "uz" ? "Tizim" : "Система"}</span>
                <span className="text-xs sm:text-sm font-bold text-amber-300 block mt-0.5 truncate">{service.techTag?.[lang] || "Klinik"}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">{lang === "uz" ? "Davomiyligi" : "Время"}</span>
                <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 truncate">{service.duration[lang]}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">{lang === "uz" ? "Kafolat" : "Гарантия"}</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-0.5 truncate">{service.warranty[lang]}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => openBooking(service.id)}
                className="px-7 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-luxury cursor-pointer hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                {lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Записаться на Приём" : "Book Procedure"}
              </button>
              <a
                href={DOCTOR_INFO.phoneHref}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-2 backdrop-blur-xs border border-white/10 hover:-translate-y-0.5 transition-all"
              >
                <IconPhone className="w-4 h-4 text-primary" />
                <span>{DOCTOR_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right: Dedicated High-Res Clinical Photography Showcase */}
          <div className="lg:col-span-5">
            <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-300/30 shadow-2xl [transform-style:preserve-3d]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title[lang]}
                  width={800}
                  height={600}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Clean Top Chips */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[10.5px] font-semibold tracking-wide text-white/95 border border-white/20 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{service.badge?.[lang] || service.category[lang]}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-emerald-300 border border-emerald-400/30 text-[10.5px] font-semibold tracking-wide shadow-xs">
                    {service.warranty[lang]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz" ? "Muolajaning Asosiy Afzalliklari" : lang === "ru" ? "Преимущества Методики" : "Clinical Highlights"}
          </h2>
          <div className="space-y-3 pt-2">
            {service.highlights[lang].map((hl, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/50">
                <IconCheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
              {lang === "uz" ? "Klinik Kafolat & Muddat" : lang === "ru" ? "Сроки и Гарантия" : "Timeline & Warranty"}
            </h2>
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF9] border border-amber-200">
                <span className="text-xs text-slate-600 font-semibold">{lang === "uz" ? "Davomiyligi:" : "Время приёма:"}</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{service.duration[lang]}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF9] border border-amber-200">
                <span className="text-xs text-slate-600 font-semibold">{lang === "uz" ? "Rasmiy Kafolat:" : "Гарантия:"}</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-700">{service.warranty[lang]}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF9] border border-amber-200">
                <span className="text-xs text-slate-600 font-semibold">{lang === "uz" ? "Shifokor:" : "Врач:"}</span>
                <span className="text-xs sm:text-sm font-bold text-primary">{DOCTOR_INFO.name}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openBooking(service.id)}
            className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-luxury cursor-pointer"
          >
            {lang === "uz" ? "Ushbu Xizmatga Navbat Olish" : "Записаться на эту процедуру"}
          </button>
        </div>
      </div>

      {/* 4 Steps */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {lang === "uz" ? "MUOLAJA BOSQICHLARI" : lang === "ru" ? "ЭТАПЫ ЛЕЧЕНИЯ" : "PROCEDURE PHASES"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz" ? "Muolaja Qanday Amalga Oshiriladi?" : lang === "ru" ? "Как Проходит Лечение?" : "How the Treatment Works"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [perspective:1000px]">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-5 rounded-3xl bg-white border border-amber-200 shadow-2xs space-y-2 hover:-translate-y-1.5 hover:shadow-md hover:border-amber-300 transition-all duration-300 [transform-style:preserve-3d]"
            >
              <span className="w-8 h-8 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {st.num}
              </span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
