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
  IconShieldCheck,
} from "./MedicalIcons";

const ClinicLocationMap = ({ compact = false }) => {
  const { lang } = useLanguage();
  const c = PRIMARY_CLINIC;
  const hours = OPENING_HOURS.labels[lang] || OPENING_HOURS.labels.uz;

  return (
    <section className={compact ? "py-4" : "py-10 sm:py-14"}>
      {!compact && (
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-red-50 text-primary border border-red-200/60">
            <IconLocationPin className="w-3.5 h-3.5 text-primary" />
            <span>{c.badge[lang]}</span>
          </span>
          <h2 className="font-serif-classic text-3xl sm:text-4xl font-bold text-slate-900">
            {lang === "uz"
              ? "Smiles Dental Group — Dr. Ozodbek Otaxonov Qabuli"
              : lang === "ru"
              ? "Smiles Dental Group — Приём Д-ра Озодбека Отахонова"
              : "Smiles Dental Group — Dr. Ozodbek Otaxonov"}
          </h2>
          <p className="text-sm text-slate-600">
            {lang === "uz"
              ? "Klinikamizga kelishdan oldin navbatsiz qabul uchun onlayn yoki telefon orqali yozilishni tavsiya etamiz."
              : lang === "ru"
              ? "Для визита без ожидания рекомендуем предварительно записаться онлайн или по телефону."
              : "Book online or via phone to ensure your preferred time slot with zero waiting."}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white rounded-3xl p-5 sm:p-7 border border-amber-200 shadow-luxury">
        {/* Left Info Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#1A202C] text-white space-y-6">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-white border border-primary/40 text-xs font-bold">
              <IconLocationPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{c.badge[lang]}</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif-classic text-2xl sm:text-3xl font-bold">
                {c.name[lang]}
              </h3>
              <p className="text-xs text-amber-300 font-semibold">
                {c.dentistOffice[lang]}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                📍 {c.address[lang]}
              </p>
              <p className="text-[11px] text-slate-400">
                Mo'ljal: {c.landmark[lang]}
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

              {/* Doctor direct phone */}
              <div className="flex items-center gap-3">
                <IconPhone className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-400 block">{lang === "uz" ? "Shifokor telefoni:" : "Телефон врача:"}</span>
                  <a
                    href={DOCTOR_INFO.phoneHref}
                    className="font-bold text-base text-white hover:text-brandOrange transition-colors"
                  >
                    {DOCTOR_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Clinic reception phone */}
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="text-slate-400">🏥 {lang === "uz" ? "Klinika resepshni:" : "Ресепшн клиники:"}</span>
                <a
                  href={`tel:${c.clinicPhoneRaw}`}
                  className="font-bold text-white hover:text-brandOrange transition-colors"
                >
                  {c.clinicPhoneDisplay}
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

        {/* Right Map Embed & Direct Navigation Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl overflow-hidden bg-amber-50/50 border border-amber-200 p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <IconShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Smiles Dental Group · Andijon</span>
              </span>
              <span className="text-xs font-semibold text-slate-500">
                1-kichik daha, 8A
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif-classic">
              {lang === "uz"
                ? "Xarita orqali oson topib kelish"
                : lang === "ru"
                ? "Удобная навигация и проезд к клинике"
                : "Easy Navigation & Map Directions"}
            </h4>
          </div>

          {/* Interactive Map Iframe */}
          <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs relative bg-slate-100">
            <iframe
              src="https://yandex.uz/map-widget/v1/org/smiles_dental_group/10769129756/?ll=72.335613%2C40.744372&z=17"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              loading="lazy"
              title="Smiles Dental Group Joylashuvi"
              className="w-full h-full"
            />
          </div>

          {/* Direct Map Action Buttons (Google + Yandex + Route) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <a
              href={c.maps.googleFull}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold shadow-2xs transition-all hover:shadow-xs"
            >
              <span>📍 Google Maps ↗</span>
            </a>

            <a
              href={c.maps.yandex}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FC3F1D]/10 hover:bg-[#FC3F1D]/20 border border-[#FC3F1D]/30 text-[#FC3F1D] text-xs font-bold transition-all"
            >
              <span>🗺 Yandex Xarita ↗</span>
            </a>

            <a
              href={`https://yandex.uz/maps/?rtext=~${c.coordinates.lat},${c.coordinates.lng}&rtt=auto`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all"
            >
              <span>🚗 {lang === "uz" ? "Marshrut" : "Маршрут"} ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicLocationMap;
