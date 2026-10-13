import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { DOCTOR_INFO, OPENING_HOURS } from "../constants/doctor";
import { PRIMARY_CLINIC } from "../constants/clinics";
import {
  IconLocationPin,
  IconClock,
  IconPhone,
  IconTelegram,
  IconInstagram,
} from "./MedicalIcons";

const ClinicLocationMap = ({ compact = false }) => {
  const { lang } = useLanguage();
  const c = PRIMARY_CLINIC;
  const hours = OPENING_HOURS.labels[lang] || OPENING_HOURS.labels.uz;

  return (
    <section className={compact ? "py-4" : "py-10 sm:py-14"}>
      {!compact && (
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            {lang === "uz" ? "BOG'LANISH VA QABUL" : lang === "ru" ? "КОНТАКТЫ И ЗАПИСЬ" : "LOCATION & CONTACT"}
          </p>
          <h2 className="font-serif-classic text-3xl sm:text-4xl font-bold text-slate-900">
            {lang === "uz"
              ? "Dr. Ozodbek Otaxonov Qabuliga Tashrif"
              : lang === "ru"
              ? "Визит к Д-ру Озодбеку Отахонову"
              : "Visit Dr. Ozodbek Otaxonov"}
          </h2>
          <p className="text-sm text-slate-600">
            {lang === "uz"
              ? "Klinikamizga kelishdan oldin Telegram yoki telefon orqali oldindan yozilishni tavsiya etamiz."
              : lang === "ru"
              ? "Рекомендуем предварительно записаться по телефону или в Telegram."
              : "We recommend reserving your preferred appointment slot in advance."}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white rounded-3xl p-5 sm:p-7 border border-amber-200 shadow-luxury">
        {/* Left Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#1A202C] text-white space-y-6">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-white border border-primary/40 text-xs font-bold">
              <IconLocationPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{c.badge[lang]}</span>
            </div>

            <div>
              <h3 className="font-serif-classic text-2xl sm:text-3xl font-bold">
                {c.name[lang]}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {c.address[lang]}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <IconClock className="w-4 h-4 text-brandOrange shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{hours.full}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{hours.sunday}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <IconPhone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={DOCTOR_INFO.phoneHref}
                  className="font-bold text-base text-white hover:text-brandOrange transition-colors"
                >
                  {DOCTOR_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Social Connect Shortcuts */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {lang === "uz" ? "Tezkor aloqa kanallari:" : lang === "ru" ? "Прямая связь с врачом:" : "Direct channels:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={DOCTOR_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors"
              >
                <IconTelegram className="w-4 h-4 text-white" />
                <span>Telegram</span>
              </a>
              <a
                href={DOCTOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs transition-colors"
              >
                <IconInstagram className="w-4 h-4 text-white" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Visual / Map Column */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-amber-50 border border-amber-200 relative min-h-[300px] flex flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-amber-200 text-xs font-bold text-primary">
              ⭐ {lang === "uz" ? "10 Yillik Tajriba & Xalqaro Standartlar" : lang === "ru" ? "10 Лет Опыта & Стандарты Качества" : "10 Years Experience & Standards"}
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
              {lang === "uz"
                ? "Bemorlar Uchun Qulay Sharoit va Zamonaviy Texnologiyalar"
                : lang === "ru"
                ? "Комфортные Условия и Передовое Оборудование"
                : "Comfortable Modern Facilities & Advanced Dental Tech"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === "uz"
                ? "Klinikamizda steril xonalar, Yevropa va Janubiy Koreya (MegaGen) original materiallari hamda to'liq og'riqsiz davolash uchun barcha zarur sharoitlar yaratilgan."
                : lang === "ru"
                ? "Стерильные кабинеты, оригинальные сертифицированные материалы из Германии, Японии и Южной Кореи (MegaGen)."
                : "Sterile clinical suites, authentic German, Japanese, and South Korean (MegaGen) materials with 100% gentle treatment."}
            </p>
          </div>

          <div className="pt-6 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500">
              📞 {DOCTOR_INFO.phoneDisplay} · @Stamatolog07
            </span>
            <a
              href={DOCTOR_INFO.phoneHref}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-luxury transition-all"
            >
              {lang === "uz" ? "Hozir Qo'ng'iroq Qilish" : lang === "ru" ? "Позвонить Сейчас" : "Call Now"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicLocationMap;
