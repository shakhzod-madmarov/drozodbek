import { useParams, Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { SERVICES_CATALOG } from "../constants/servicesCatalog";
import { SERVICE_GUIDES } from "../constants/serviceGuides";
import { DOCTOR_INFO } from "../constants/doctor";
import { PRIMARY_CLINIC } from "../constants/clinics";
import Seo from "../components/Seo";
import { buildMedicalProcedureSchema } from "../utils/structuredData";
import {
  IconCheckCircle,
  IconShieldCheck,
  IconPhone,
  IconSparkleStar,
  IconLocationPin,
  IconClock,
} from "../components/MedicalIcons";
import { useBooking } from "../context/BookingContext";
import FaqAccordion from "../components/FaqAccordion";

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

  const guide = SERVICE_GUIDES[service.id] || null;
  const allFaqs = [
    ...(Array.isArray(service.faq) ? service.faq : []),
    ...(Array.isArray(guide?.extraFaqs) ? guide.extraFaqs : []),
  ];

  const seoSuffix = {
    uz: "Andijonda — Dr. Ozodbek Otaxonov | Vrach Stomatolog",
    ru: "в Андижане — Д-р Озодбек Отахонов | Врач-Стоматолог",
    en: "in Andijan — Dr. Ozodbek Otaxonov | Dental Specialist",
  }[lang];

  const resolvedTitle =
    guide?.seoTitle?.[lang] || `${service.title[lang]} — ${seoSuffix}`;
  const resolvedDescription =
    guide?.seoDescription?.[lang] ||
    `${service.shortDesc[lang]} Andijonda Dr. Ozodbek Otaxonov, 10 yillik tajriba (08:30–22:00). Tel: ${DOCTOR_INFO.phoneDisplay}.`;
  const resolvedKeywords =
    guide?.keywords?.[lang] ||
    [service.title[lang], service.category[lang], service.badge?.[lang], service.techTag?.[lang]]
      .filter(Boolean)
      .join(", ");

  const breadcrumbs = [
    { name: lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa", path: "/" },
    { name: lang === "ru" ? "Услуги" : lang === "en" ? "Services" : "Xizmatlar", path: "/services" },
    { name: service.title[lang] || service.title.uz, path: `/services/${service.id}` },
  ];

  const procedureSchema = buildMedicalProcedureSchema(service, lang, breadcrumbs, guide);

  return (
    <div className="py-6 sm:py-10 space-y-10">
      <Seo
        title={resolvedTitle}
        description={resolvedDescription}
        keywords={resolvedKeywords}
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
              {guide?.h1Title?.[lang] || service.title[lang]}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {service.shortDesc[lang]}
            </p>

            {/* Location, Hours & Freshness Bar for Local & AI Signals */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <IconLocationPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{PRIMARY_CLINIC.shortAddress[lang]} ({PRIMARY_CLINIC.landmark[lang]})</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconClock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{PRIMARY_CLINIC.hours[lang]}</span>
              </span>
            </div>

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
                type="button"
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
            type="button"
            onClick={() => openBooking(service.id)}
            className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-luxury cursor-pointer"
          >
            {lang === "uz" ? "Ushbu Xizmatga Navbat Olish" : "Записаться на эту процедуру"}
          </button>
        </div>
      </div>

      {/* Clinical Indications Section */}
      {service.indications?.[lang] && service.indications[lang].length > 0 && (
        <section className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#FFFDF9] border border-amber-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300">
                <IconSparkleStar className="w-3.5 h-3.5 text-brandOrange" />
                <span>
                  {lang === "uz"
                    ? "KLINIK KO'RSATMALAR"
                    : lang === "ru"
                    ? "ПОКАЗАНИЯ К ЛЕЧЕНИЮ"
                    : "CLINICAL INDICATIONS"}
                </span>
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 font-serif-classic">
                {lang === "uz"
                  ? "Qachon Ushbu Muolajaga Murojaat Qilish Zarur?"
                  : lang === "ru"
                  ? "В Каких Случаях Необходима Данная Процедура?"
                  : "When Is This Dental Procedure Indicated?"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === "uz"
                  ? "Quyidagi holatlar tishlaringizda kuzatilsa, asoratlarning oldini olish uchun ko'rikdan o'tish tavsiya etiladi."
                  : lang === "ru"
                  ? "Если у вас наблюдаются следующие симптомы, запишитесь на своевременный осмотр во избежание осложнений."
                  : "If you experience any of the following symptoms, schedule an examination to prevent complications."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openBooking(service.id)}
              className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-luxury transition-all cursor-pointer shrink-0"
            >
              {lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Записаться" : "Book Visit"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {service.indications[lang].map((ind, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {ind}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4 Steps */}
      <section className="space-y-6">
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
      </section>

      {/* Clinical Guide: Overview, Comparison Table & Buyer Checklist (for Patients, Search Engines & AI) */}
      {guide && (
        <section className="space-y-8">
          {/* Overview Article Block */}
          <article className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-amber-200/90 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/5 text-primary border border-primary/20">
                <IconSparkleStar className="w-3.5 h-3.5 text-primary" />
                <span>
                  {lang === "ru"
                    ? "КЛИНИЧЕСКОЕ РУКОВОДСТВО"
                    : lang === "en"
                    ? "CLINICAL GUIDE"
                    : "KLINIK QO'LLANMA"}
                </span>
              </span>
              <time
                dateTime={guide.updatedDate}
                className="text-[11px] font-semibold text-slate-500"
              >
                {lang === "ru"
                  ? `Обновлено: ${guide.updatedDate}`
                  : lang === "en"
                  ? `Updated: ${guide.updatedDate}`
                  : `Yangilangan: ${guide.updatedDate}`}
              </time>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 font-serif-classic leading-snug">
              {guide.overviewTitle[lang]}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
              {guide.overview[lang]}
            </p>
          </article>

          {/* Structured Comparison Table */}
          {guide.comparisonRows?.[lang] && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-amber-200 shadow-2xs space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
                {guide.comparisonTitle[lang]}
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-amber-200 bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-amber-50/80 border-b border-amber-200 text-slate-900">
                      {guide.comparisonHeaders[lang].map((head, i) => (
                        <th key={i} className="p-3.5 sm:p-4 font-bold whitespace-nowrap">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    {guide.comparisonRows[lang].map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-amber-50/30 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3.5 sm:p-4 leading-snug ${
                              cIdx === 0
                                ? "font-bold text-slate-900 bg-slate-50/40"
                                : cIdx === 1
                                ? "font-semibold text-primary"
                                : "text-slate-600"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Decision Checklist */}
          {guide.selectionChecklist?.[lang] && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
                {guide.selectionTitle[lang]}
              </h2>
              <ul className="space-y-3">
                {guide.selectionChecklist[lang].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/60"
                  >
                    <IconCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Service-Specific FAQ Section */}
      {allFaqs.length > 0 && (
        <FaqAccordion
          items={allFaqs}
          badgeText={
            lang === "uz"
              ? `${service.title[lang]} — Savol-Javob`
              : lang === "ru"
              ? `${service.title[lang]} — Вопросы и Ответы`
              : `${service.title[lang]} — FAQ`
          }
          title={
            lang === "uz"
              ? "Ushbu Muolaja Bo'yicha Eng Ko'p Beriladigan Savollar"
              : lang === "ru"
              ? "Частые Вопросы Пациентов по Этой Процедуре"
              : "Frequently Asked Questions About This Treatment"
          }
          subtitle={
            lang === "uz"
              ? "Dr. Ozodbek Otaxonovning klinik tajribasidan kelib chiqqan javoblar va amaliy tavsiyalar."
              : lang === "ru"
              ? "Практические ответы и клинические рекомендации врача-стоматолога Д-ра Озодбека Отахонова."
              : "Clinical answers and expert guidance directly from Dr. Ozodbek Otaxonov."
          }
        />
      )}

      {/* Bottom Urgent CTA Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz"
              ? "Savollaringiz bormi yoki kechki payt tishingiz bezovta qilyaptimi?"
              : lang === "ru"
              ? "Беспокоит зубная боль или остались вопросы?"
              : "Experiencing a toothache or need advice?"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === "uz"
              ? `Dr. Ozodbek Otaxonov qabuli soat 22:00 gacha ochiq. Onlayn yoziling yoki qo'ng'iroq qiling: ${DOCTOR_INFO.phoneDisplay}`
              : lang === "ru"
              ? `Приём Д-ра Озодбека Отахонова открыт до 22:00. Запишитесь онлайн или звоните: ${DOCTOR_INFO.phoneDisplay}`
              : `Open Mon–Sat until 22:00. Book online with Dr. Ozodbek Otaxonov or call: ${DOCTOR_INFO.phoneDisplay}`}
          </p>
          <div className="pt-1">
            <Link
              to={to("/tish-ogrigi-yordam")}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>
                {lang === "uz"
                  ? "Tish og'riganda birinchi yordam va kechki qabul qo'llanmasi →"
                  : lang === "ru"
                  ? "Что делать при зубной боли вечером: памятка пациента →"
                  : "Evening Toothache Emergency & Symptom Guide →"}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openBooking(service.id)}
            className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-luxury cursor-pointer transition-all"
          >
            {lang === "uz" ? "Onlayn Band Qilish" : lang === "ru" ? "Записаться Онлайн" : "Book Online"}
          </button>
          <a
            href={DOCTOR_INFO.phoneHref}
            className="px-4 py-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 border border-amber-200 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <IconPhone className="w-4 h-4 text-primary" />
            <span>{DOCTOR_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
