import React from "react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { DOCTOR_INFO } from "../constants/doctor";
import { PRIMARY_CLINIC } from "../constants/clinics";
import { useClinicHours } from "../lib/medinsonBooking";
import { PAGE_SEO, PAGE_KEYWORDS } from "../constants/seo";
import Seo from "../components/Seo";
import { buildContactPageSchema } from "../utils/structuredData";
import ClinicLocationMap from "../components/ClinicLocationMap";
import {
  IconPhone,
  IconTelegram,
  IconInstagram,
  IconLocationPin,
  IconMail,
} from "../components/MedicalIcons";

const Contact = () => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const seo = PAGE_SEO.contact[lang] || PAGE_SEO.contact.uz;
  const hours = useClinicHours(lang);

  const breadcrumbs = [
    { name: lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa", path: "/" },
    { name: lang === "ru" ? "Контакты" : lang === "en" ? "Contact" : "Aloqa va Manzil", path: "/contact" },
  ];
  const contactSchema = buildContactPageSchema(lang, breadcrumbs);

  return (
    <div className="py-6 sm:py-10 space-y-12">
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={PAGE_KEYWORDS[lang]}
        schemaJson={contactSchema}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2">
        <Link to={to("/")} className="hover:text-primary transition-colors">
          {lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa"}
        </Link>
        <span>/</span>
        <span className="text-primary font-bold" aria-current="page">
          {lang === "ru" ? "Контакты" : lang === "en" ? "Contact" : "Aloqa va Manzil"}
        </span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          {lang === "uz" ? "BEVOSITA ALOQA" : lang === "ru" ? "ПРЯМАЯ СВЯЗЬ" : "DIRECT CONTACT"}
        </p>
        <h1 className="font-serif-classic text-3xl sm:text-5xl font-bold text-slate-900">
          {lang === "uz" ? "Aloqa va Qabulga Yozilish" : "Контакты и Запись на Приём"}
        </h1>
        <p className="text-sm text-slate-600">
          {lang === "uz"
            ? "Dr. Ozodbek Otaxonov qabuliga telefon, Telegram, Instagram yoki onlayn jadval orqali yozilishingiz mumkin."
            : lang === "ru"
            ? "Свяжитесь с нами по телефону, через Telegram, Instagram или запишитесь через онлайн-расписание."
            : "Connect with Dr. Ozodbek Otaxonov via phone, Telegram, Instagram, or our online appointment scheduler."}
        </p>
        <div className="pt-2">
          <Link
            to={to("/booking")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-luxury hover:-translate-y-0.5 transition-all"
          >
            <span>{lang === "uz" ? "Onlayn Jadvaldan Vaqt Tanlash" : lang === "ru" ? "Онлайн Расписание и Запись" : "Book Online via Schedule"}</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* 5 Contact & Location Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
        {/* Phone */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <IconPhone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === "uz" ? "Shifokor Telefoni" : "Телефон Врача"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {hours.full}
              </p>
            </div>
          </div>
          <a
            href={DOCTOR_INFO.phoneHref}
            className="inline-block text-sm sm:text-base font-bold text-primary hover:underline"
          >
            {DOCTOR_INFO.phoneDisplay}
          </a>
        </div>

        {/* Telegram */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <IconTelegram className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Telegram Chat
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === "uz" ? "Savollar va konsultatsiya uchun:" : "Для вопросов и консультаций:"}
              </p>
            </div>
          </div>
          <a
            href={DOCTOR_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm sm:text-base font-bold text-sky-600 hover:underline"
          >
            @Stamatolog07 ↗
          </a>
        </div>

        {/* Instagram */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <IconInstagram className="w-6 h-6 text-pink-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Instagram Profil
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === "uz" ? "Klinik ishlar va natijalar videosi:" : "Фото и видео до/после лечения:"}
              </p>
            </div>
          </div>
          <a
            href={DOCTOR_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm sm:text-base font-bold text-pink-600 hover:underline"
          >
            @_vrach_stomatolog ↗
          </a>
        </div>

        {/* Official Email */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IconMail className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === "uz" ? "Rasmiy Email" : lang === "ru" ? "Эл. Почта" : "Official Email"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === "uz" ? "Xatlar va murojaatlar uchun:" : lang === "ru" ? "Для официальных запросов:" : "For official inquiries:"}
              </p>
            </div>
          </div>
          <a
            href={DOCTOR_INFO.emailHref}
            className="inline-block text-xs sm:text-sm font-bold text-emerald-700 hover:underline truncate"
            title={DOCTOR_INFO.email}
          >
            {DOCTOR_INFO.email}
          </a>
        </div>

        {/* Clinic Location Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <IconLocationPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Smiles Dental Group
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {PRIMARY_CLINIC.shortAddress[lang]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold pt-1">
            <a
              href={PRIMARY_CLINIC.maps.google}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google
            </a>
            <span className="text-slate-300">•</span>
            <a
              href={PRIMARY_CLINIC.maps.yandex}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Yandex
            </a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <ClinicLocationMap />
    </div>
  );
};

export default Contact;
