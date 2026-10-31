import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { DOCTOR_INFO, getExperienceBadge, getExperienceText } from "../constants/doctor";
import { useClinicHours } from "../lib/medinsonBooking";
import {
  IconShieldCheck,
  IconAward,
  IconPhone,
  IconTelegram,
  IconInstagram,
  IconGraduationCap,
  IconClock,
  IconMail,
} from "./MedicalIcons";

const Footer = () => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const clinicHours = useClinicHours(lang);

  const hoursDisplay = clinicHours.full;

  const quickLinks = [
    { path: "/", label: { uz: "Bosh Sahifa", ru: "Главная", en: "Home" } },
    { path: "/services", label: { uz: "Stomatologik Xizmatlar", ru: "Стоматологические Услуги", en: "Dental Services" } },
    { path: "/about", label: { uz: "Dr. Ozodbek Haqida", ru: "О Докторе Озодбеке", en: "About Dr. Ozodbek" } },
    { path: "/booking", label: { uz: "Onlayn Qabulga Yozilish", ru: "Онлайн Запись на Приём", en: "Book Appointment" } },
    { path: "/contact", label: { uz: "Aloqa va Manzil", ru: "Контакты и Адрес", en: "Contact & Location" } },
  ];

  const specialtyLinks = [
    { path: "/services/dental-implant", label: { uz: "Dental Implant (MegaGen)", ru: "Имплантация Зубов (MegaGen)", en: "Dental Implants (MegaGen)" } },
    { path: "/services/breketlar", label: { uz: "Ortodontik Breketlar", ru: "Брекет-Системы", en: "Orthodontic Brackets" } },
    { path: "/services/sirkon-keramika-karonkalar", label: { uz: "Sirkon va Keramika Karonkalar", ru: "Циркониевые Коронки", en: "Zirconia & Ceramic Crowns" } },
    { path: "/services/vinirlar", label: { uz: "E-max Estetik Vinirlar", ru: "Виниры E-max", en: "E-max Aesthetic Veneers" } },
    { path: "/services/pratezlar", label: { uz: "Zamonaviy Tish Protezlari", ru: "Протезирование Зубов", en: "Dental Prosthetics" } },
    { path: "/services/elaynerlar", label: { uz: "Ko'rinmas Shaffof Elaynerlar", ru: "Прозрачные Элайнеры", en: "Clear Aligners" } },
    { path: "/services/tish-oqartirish", label: { uz: "Professional Tish Oqartirish", ru: "Отбеливание Зубов", en: "Teeth Whitening" } },
    { path: "/services/ogriqsiz-tish-davolash", label: { uz: "Og'riqsiz Tish Davolash & Plomba", ru: "Лечение Зубов Без Боли", en: "Painless Dental Care" } },
    { path: "/services/ogriqsiz-tish-olish", label: { uz: "Og'riqsiz Tish Olish & Xirurgiya", ru: "Удаление Зубов Без Боли", en: "Gentle Tooth Extraction" } },
  ];

  return (
    <footer className="bg-[#1A202C] text-slate-300 pt-16 pb-12 border-t border-amber-900/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Doctor Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link
              to={to("/")}
              aria-label="Dr. Ozodbek Otaxonov - Bosh sahifa"
              className="inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
            >
              <Logo className="h-12" inverted={true} />
            </Link>

            <p className="text-sm text-slate-300/90 leading-relaxed max-w-md">
              {lang === "uz"
                ? `Dr. Ozodbek Otaxonov — Ukraina Stomatologiya Tibbiyot Akademiyasi (bakalavr) bitiruvchisi, ${getExperienceText("uz").toLowerCase()}. Dental implantatsiya, breketlar, tsirkoniy karonkalar, vinirlar va 100% og'riqsiz davolash.`
                : lang === "ru"
                ? `Д-р Озодбек Отахонов — выпускник Украинской Медицинской Стоматологической Академии (бакалавр), ${getExperienceText("ru").toLowerCase()}. Имплантация MegaGen, брекеты, циркониевые коронки, виниры и безболезненное лечение.`
                : `Dr. Ozodbek Otaxonov — Graduate of Ukrainian Medical Stomatological Academy, ${getExperienceText("en")}. MegaGen dental implants, orthodontic braces, zirconia crowns, veneers, and 100% painless dental care.`}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-lg bg-white/10 text-white border border-white/15">
                <IconShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {lang === "uz" ? "100% Steril & Og'riqsiz" : lang === "ru" ? "100% Стерильно & Без Боли" : "100% Sterile & Painless"}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-lg bg-primary/30 text-white border border-primary/50">
                <IconAward className="w-3.5 h-3.5 text-brandOrange" />
                <span>{getExperienceBadge(lang)}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-lg bg-cyan-900/40 text-cyan-200 border border-cyan-500/40">
                <IconGraduationCap className="w-3.5 h-3.5 text-cyan-300" />
                <span>
                  {lang === "ru"
                    ? "Украинская Медицинская Стоматологическая Академия"
                    : lang === "en"
                    ? "Ukrainian Medical Stomatological Academy"
                    : "Ukraina Stomatologiya Tibbiyot Akademiyasi"}
                </span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-brandOrange">
              {lang === "uz" ? "Sahifalar" : lang === "ru" ? "Разделы" : "Pages"}
            </p>
            <ul className="space-y-2.5 text-xs font-medium text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={to(link.path)}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialties (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-brandCyan">
              {lang === "uz" ? "Xizmat Yo'nalishlari" : lang === "ru" ? "Специализация" : "Specialties"}
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              {specialtyLinks.slice(0, 7).map((link) => (
                <li key={link.path}>
                  <Link
                    to={to(link.path)}
                    className="hover:text-white hover:underline transition-colors block truncate"
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              {lang === "uz" ? "Bog'lanish" : lang === "ru" ? "Контакты" : "Contact"}
            </p>
            <div className="space-y-3 text-xs">
              <a
                href={DOCTOR_INFO.phoneHref}
                className="flex items-center gap-2 text-white font-bold hover:text-brandOrange transition-colors"
              >
                <IconPhone className="w-4 h-4 text-primary shrink-0" />
                <span>{DOCTOR_INFO.phoneDisplay}</span>
              </a>

              <a
                href={DOCTOR_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sky-300 hover:text-sky-200 transition-colors"
              >
                <IconTelegram className="w-4 h-4 text-sky-400 shrink-0" />
                <span>@Stamatolog07</span>
              </a>

              <a
                href={DOCTOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-300 hover:text-pink-200 transition-colors"
              >
                <IconInstagram className="w-4 h-4 text-pink-400 shrink-0" />
                <span>@_vrach_stomatolog</span>
              </a>

              <a
                href={DOCTOR_INFO.emailHref}
                className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors truncate"
                title={DOCTOR_INFO.email}
              >
                <IconMail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{DOCTOR_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400 pt-1 text-[11px] leading-relaxed">
                <IconClock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{hoursDisplay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {DOCTOR_INFO.name}. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={DOCTOR_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Telegram
            </a>
            <span>•</span>
            <a
              href={DOCTOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <span>•</span>
            <a
              href={DOCTOR_INFO.phoneHref}
              className="hover:text-white transition-colors"
            >
              Tel: {DOCTOR_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
