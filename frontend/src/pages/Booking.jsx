import React from "react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import Seo from "../components/Seo";
import InlineBookingSection from "../components/InlineBookingSection";
import { DOCTOR_INFO, getYearsOfExperience } from "../constants/doctor";
import { useClinicHours } from "../lib/medinsonBooking";
import { buildBookingPageSchema } from "../utils/structuredData";
import { PAGE_SEO } from "../constants/seo";
import {
  IconPhone,
  IconTelegram,
  IconInstagram,
  IconShieldCheck,
  IconGraduationCap,
} from "../components/MedicalIcons";

const Booking = () => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const years = getYearsOfExperience();
  const seo = PAGE_SEO.booking[lang] || PAGE_SEO.booking.uz;
  const hours = useClinicHours(lang);

  const breadcrumbs = [
    { name: lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa", path: "/" },
    { name: lang === "ru" ? "Запись на приём" : lang === "en" ? "Appointment Booking" : "Qabulga yozilish", path: "/booking" },
  ];
  const bookingSchema = buildBookingPageSchema(lang, breadcrumbs);

  return (
    <div className="py-6 sm:py-10 space-y-10">
      <Seo
        title={seo.title}
        description={seo.description}
        schemaJson={bookingSchema}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2">
        <Link to={to("/")} className="hover:text-primary transition-colors">
          {lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa"}
        </Link>
        <span>/</span>
        <span className="text-primary font-bold" aria-current="page">
          {lang === "ru" ? "Запись на приём" : lang === "en" ? "Appointment Booking" : "Qabulga yozilish"}
        </span>
      </nav>

      {/* Doctor Summary Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase">
              {DOCTOR_INFO.name}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              {years} {lang === "uz" ? "Yillik Tajriba" : "Лет Опыта"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz" ? "Dr. Ozodbek Otaxonov Qabuliga Onlayn Yozilish" : "Онлайн Запись на Приём к Д-ру Озодбеку"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {lang === "uz"
              ? "Ukraina stomatologiya tibbiyot akademiyasi bitiruvchisi. MegaGen biotitan implantlari, breketlar, tsirkoniy karonkalar, vinirlar va 100% og'riqsiz davolash."
              : "Выпускник Украинской медицинской стоматологической академии. Запишитесь на удобный день и время без очереди."}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
            <span className="flex items-center gap-1.5">
              <IconGraduationCap className="w-4 h-4 text-primary" />
              <span>Ukraina Akademiyasi</span>
            </span>
            <span className="flex items-center gap-1.5">
              <IconShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Sterillik & Kafolat</span>
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2 shrink-0 text-center sm:text-left">
          <p className="font-bold text-slate-900">{hours.full}</p>
          <p className="text-slate-500">{hours.sunday}</p>
          <a
            href={DOCTOR_INFO.phoneHref}
            className="inline-flex items-center gap-2 font-bold text-primary hover:underline pt-1 text-sm"
          >
            <IconPhone className="w-4 h-4 text-primary" />
            <span>{DOCTOR_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Main Interactive Booking Section */}
      <InlineBookingSection />
    </div>
  );
};

export default Booking;
