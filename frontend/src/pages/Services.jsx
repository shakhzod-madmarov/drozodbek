import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { DOCTOR_INFO, getServicesTag } from "../constants/doctor";
import { PAGE_SEO, PAGE_KEYWORDS } from "../constants/seo";
import { SERVICES_CATALOG } from "../constants/servicesCatalog";
import Seo from "../components/Seo";
import { buildServicesCatalogSchema } from "../utils/structuredData";
import Interactive3DCostCalculator from "../components/Interactive3DCostCalculator";
import SmileAssessmentWizard from "../components/SmileAssessmentWizard";
import PatientCareGuides from "../components/PatientCareGuides";
import {
  IconCheckCircle,
  IconClock,
  IconShieldCheck,
} from "../components/MedicalIcons";

const Services = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const seo = PAGE_SEO.services[lang] || PAGE_SEO.services.uz;

  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: { uz: "Barcha Xizmatlar", ru: "Все Услуги", en: "All Services" } },
    { id: "implant", label: { uz: "Dental Implant", ru: "Имплантация", en: "Implants" } },
    { id: "ortho", label: { uz: "Breket & Elayner", ru: "Брекеты и Элайнеры", en: "Orthodontics" } },
    { id: "prostho", label: { uz: "Karonka & Vinirlar", ru: "Коронки и Виниры", en: "Prosthetics" } },
    { id: "care", label: { uz: "Davolash & Jarrohlik", ru: "Лечение и Хирургия", en: "Therapy & Surgery" } },
  ];

  const filteredServices = SERVICES_CATALOG.filter((s) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "implant") return s.id.includes("implant");
    if (activeCategory === "ortho") return s.id.includes("breket") || s.id.includes("elayner");
    if (activeCategory === "prostho") return s.id.includes("karonka") || s.id.includes("vinir") || s.id.includes("pratez");
    if (activeCategory === "care") return s.id.includes("davolash") || s.id.includes("olish") || s.id.includes("oqartirish");
    return true;
  });

  const breadcrumbs = [
    { name: lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa", path: "/" },
    { name: lang === "ru" ? "Услуги" : lang === "en" ? "Services" : "Xizmatlar", path: "/services" },
  ];
  const catalogSchema = buildServicesCatalogSchema(SERVICES_CATALOG, lang, breadcrumbs);

  return (
    <div className="py-6 sm:py-10 space-y-12">
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={PAGE_KEYWORDS[lang]}
        schemaJson={catalogSchema}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2">
        <Link to={to("/")} className="hover:text-primary transition-colors">
          {lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa"}
        </Link>
        <span>/</span>
        <span className="text-primary font-bold" aria-current="page">
          {lang === "ru" ? "Услуги" : lang === "en" ? "Services" : "Xizmatlar"}
        </span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-red-50 text-primary border border-red-200/60">
          <IconShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>{getServicesTag(lang)}</span>
        </span>
        <h1 className="font-serif-classic text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
          {lang === "uz"
            ? "Stomatologik Xizmatlar Katalogi"
            : lang === "ru"
            ? "Каталог Стоматологических Услуг"
            : "Dental Services & Specialties"}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {lang === "uz"
            ? "Dr. Ozodbek Otaxonov tomonidan Germaniya, Yaponiya va Janubiy Koreya (MegaGen) texnologiyalari asosida 100% og'riqsiz va kafolatli muolajalar."
            : lang === "ru"
            ? "Все виды современного безболезненного лечения, протезирования, ортодонтии и имплантации у Д-ра Озодбека Отахонова."
            : "All dental procedures performed by Dr. Ozodbek Otaxonov using genuine certified German, Japanese, and South Korean materials."}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 pb-1 px-1 -mx-2 sm:mx-0 no-scrollbar scroll-touch">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === c.id
                ? "bg-primary text-white shadow-xs"
                : "bg-white text-slate-700 border border-amber-200/70 hover:bg-amber-50"
            }`}
          >
            {c.label[lang]}
          </button>
        ))}
      </div>

      {/* Services Grid with 3D Perspective Elevation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 [perspective:1200px]">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-amber-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 flex flex-col justify-between overflow-hidden group [transform-style:preserve-3d]"
          >
            <div>
              {/* Photo Banner with Zoom Depth */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title[lang]}
                  width={900}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-black uppercase tracking-wider text-primary shadow-sm">
                    {service.category[lang]}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h3 className="text-lg sm:text-xl font-bold font-serif-classic leading-snug">
                    {service.title[lang]}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.shortDesc[lang]}
                </p>

                <div className="space-y-2 pt-2 border-t border-amber-100">
                  {service.highlights[lang].map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <IconCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <IconClock className="w-3.5 h-3.5 text-brandOrange" />
                    <span>{service.duration[lang]}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <IconShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{service.warranty[lang]}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-slate-50">
              <Link
                to={to(`/services/${service.id}`)}
                className="text-xs font-bold text-slate-700 hover:text-primary transition-colors"
              >
                {lang === "uz" ? "Batafsil ma'lumot →" : lang === "ru" ? "Подробнее →" : "Full details →"}
              </Link>
              <button
                onClick={() => onOpenBooking(service.id)}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                {lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Записаться" : "Book"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Cost Calculator */}
      <Interactive3DCostCalculator />

      {/* Smile Assessment Wizard */}
      <SmileAssessmentWizard />

      {/* Patient Care Guides */}
      <PatientCareGuides />
    </div>
  );
};

export default Services;
