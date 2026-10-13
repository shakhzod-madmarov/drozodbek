import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { useBooking } from "../context/BookingContext";
import { DOCTOR_INFO, OPENING_HOURS } from "../constants/doctor";
import { PRIMARY_CLINIC } from "../constants/clinics";
import { PAGE_SEO, PAGE_KEYWORDS } from "../constants/seo";
import Seo from "../components/Seo";
import { buildContactPageSchema } from "../utils/structuredData";
import ClinicLocationMap from "../components/ClinicLocationMap";
import {
  IconPhone,
  IconTelegram,
  IconInstagram,
  IconClock,
  IconLocationPin,
} from "../components/MedicalIcons";

const Contact = () => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const { openBooking } = useBooking();
  const seo = PAGE_SEO.contact[lang] || PAGE_SEO.contact.uz;
  const hours = OPENING_HOURS.labels[lang] || OPENING_HOURS.labels.uz;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [message, setMessage] = useState("");

  const handleQuickSend = (e) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 7) return;

    openBooking({
      name,
      phone,
      note: message,
    });
  };

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
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          {lang === "uz" ? "BEVOSITA ALOQA" : lang === "ru" ? "ПРЯМАЯ СВЯЗЬ" : "DIRECT CONTACT"}
        </p>
        <h1 className="font-serif-classic text-3xl sm:text-5xl font-bold text-slate-900">
          {lang === "uz" ? "Aloqa va Qabulga Yozilish" : "Контакты и Запись на Приём"}
        </h1>
        <p className="text-sm text-slate-600">
          {lang === "uz"
            ? "Dr. Ozodbek Otaxonov qabuliga telefon, Telegram, Instagram yoki onlayn forma orqali yozilishingiz mumkin."
            : "Свяжитесь с нами по телефону, через Telegram, Instagram или оставьте заявку на приём."}
        </p>
      </div>

      {/* 4 Contact & Location Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Phone */}
        <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between">
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
            className="inline-block text-base font-bold text-primary hover:underline"
          >
            {DOCTOR_INFO.phoneDisplay}
          </a>
        </div>

        {/* Telegram */}
        <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between">
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
            className="inline-block text-base font-bold text-sky-600 hover:underline"
          >
            @Stamatolog07 ↗
          </a>
        </div>

        {/* Instagram */}
        <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between">
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
            className="inline-block text-base font-bold text-pink-600 hover:underline"
          >
            @_vrach_stomatolog ↗
          </a>
        </div>

        {/* Clinic Location Card */}
        <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between">
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

      {/* Quick Message Form */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-amber-200 shadow-luxury max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz" ? "Tezkor Xabar Qoldirish" : "Оставить Заявку на Приём"}
          </h2>
          <p className="text-xs text-slate-600">
            {lang === "uz"
              ? "Ismingiz va raqamingizni qoldiring, biz siz bilan tez fursatda bog'lanamiz."
              : "Оставьте ваше имя и телефон, и мы свяжемся с вами в ближайшее время."}
          </p>
        </div>

        <form onSubmit={handleQuickSend} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === "uz" ? "Ismingiz:" : "Ваше имя:"}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sardor Karimov"
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === "uz" ? "Telefon raqamingiz:" : "Телефон:"}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 97 833 89 97"
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === "uz" ? "Savol yoki izohingiz:" : "Ваш вопрос или пожелание:"}
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tish og'rig'i, implant, breket yoki vinir bo'yicha..."
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-luxury cursor-pointer"
          >
            {lang === "uz" ? "Qabulga Yozilishni Davom Ettirish" : "Продолжить Запись"}
          </button>
        </form>
      </div>

      {/* Map Section */}
      <ClinicLocationMap />
    </div>
  );
};

export default Contact;
