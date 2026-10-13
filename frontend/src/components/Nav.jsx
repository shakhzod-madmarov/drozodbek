import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { stripLangPrefix } from "../utils/language";
import { IconPhone } from "./MedicalIcons";
import { useModalA11y } from "../hooks/useModalA11y";
import { getA11yLabels } from "../constants/a11yLabels";
import { DOCTOR_INFO } from "../constants/doctor";

const Nav = ({ topOffset = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, changeLanguage } = useLanguage();
  const to = useLocalizedPath();
  const a11y = getA11yLabels(lang);
  const closeDrawer = () => setShowMenu(false);
  const drawerRef = useModalA11y(showMenu, closeDrawer);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: { uz: "Bosh Sahifa", ru: "Главная", en: "Home" } },
    { path: "/services", label: { uz: "Xizmatlar", ru: "Услуги", en: "Services" } },
    { path: "/about", label: { uz: "Shifokor Haqida", ru: "О Враче", en: "About Doctor" } },
    { path: "/contact", label: { uz: "Aloqa", ru: "Контакты", en: "Contact" } },
  ];

  const isBookingActive =
    stripLangPrefix(location.pathname) === "/booking" ||
    stripLangPrefix(location.pathname) === "/qabul";

  return (
    <>
      <header
        style={{ top: `${topOffset}px` }}
        className={`fixed left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100 py-2.5"
            : "bg-[#FFFDF9] border-b border-amber-100/80 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Logo */}
          <NavLink
            to={to("/")}
            aria-label={
              lang === "ru"
                ? "Д-р Озодбек Отахонов — На главную"
                : lang === "en"
                ? "Dr. Ozodbek Otaxonov — Go to homepage"
                : "Dr. Ozodbek Otaxonov — Bosh sahifaga o'tish"
            }
            className="flex items-center gap-2 sm:gap-3 shrink-0"
          >
            <Logo className="h-10 sm:h-12" />
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav
            aria-label={a11y.mainNavigation}
            className="hidden lg:flex items-center gap-1.5"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={to(link.path)}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "text-slate-700 hover:text-primary hover:bg-primary-light/60"
                  }`
                }
              >
                {link.label[lang]}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Actions: Language Switcher + Phone + Book CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div
              role="group"
              aria-label={a11y.languageSwitcher}
              className="flex items-center bg-amber-50/80 p-0.5 rounded-xl border border-amber-200/60"
            >
              {["uz", "ru", "en"].map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l)}
                  aria-pressed={lang === l}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all duration-150 ${
                    lang === l
                      ? "bg-white text-primary shadow-xs"
                      : "text-slate-600 hover:text-primary"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Direct Phone Link (Desktop) */}
            <a
              href={DOCTOR_INFO.phoneHref}
              className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-primary px-3 py-2 rounded-xl bg-amber-50/60 border border-amber-200/50 transition-colors"
            >
              <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <IconPhone className="w-3.5 h-3.5 text-primary" />
              </span>
              <span>{DOCTOR_INFO.phoneDisplay}</span>
            </a>

            {/* Book CTA Button */}
            <button
              onClick={() => {
                navigate(to("/booking"));
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold shadow-md transition-all duration-150 cursor-pointer ${
                isBookingActive
                  ? "bg-primary text-white ring-2 ring-primary/40 ring-offset-1"
                  : "bg-primary hover:bg-primary-hover text-white shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5"
              }`}
            >
              <span>
                {lang === "uz"
                  ? "Qabulga Yozilish"
                  : lang === "ru"
                  ? "Запись на Приём"
                  : "Book Visit"}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setShowMenu(true)}
              aria-label={a11y.openMenu}
              aria-expanded={showMenu}
              aria-controls="mobile-navigation-drawer"
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-amber-100/50 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {showMenu && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={a11y.mobileNavigation}
          ref={drawerRef}
          id="mobile-navigation-drawer"
          tabIndex={-1}
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white outline-none"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-amber-100 bg-[#FFFDF9]">
            <Logo className="h-9" />
            <button
              onClick={closeDrawer}
              aria-label={a11y.closeMenu}
              className="p-2 rounded-xl text-slate-500 hover:bg-amber-100/60 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto p-5 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={to(link.path)}
                end={link.path === "/"}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-2xl text-base font-bold transition-colors ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "text-slate-700 hover:bg-amber-50"
                  }`
                }
              >
                {link.label[lang]}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-amber-100 space-y-3">
              <a
                href={DOCTOR_INFO.phoneHref}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-50/80 text-slate-800 font-bold text-sm"
              >
                <span className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center">
                  <IconPhone className="w-4 h-4 text-white" />
                </span>
                <span>{DOCTOR_INFO.phoneDisplay}</span>
              </a>

              <a
                href={DOCTOR_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-sky-50 text-sky-800 font-bold text-sm"
              >
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center">
                  ✈
                </span>
                <span>Telegram: @Stamatolog07</span>
              </a>

              <a
                href={DOCTOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-pink-50 text-pink-800 font-bold text-sm"
              >
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                  📸
                </span>
                <span>Instagram: @_vrach_stomatolog</span>
              </a>
            </div>
          </div>

          {/* Drawer Footer Book Button */}
          <div className="p-4 border-t border-amber-100 bg-[#FFFDF9]">
            <button
              onClick={() => {
                closeDrawer();
                navigate(to("/booking"));
              }}
              className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-center font-bold text-sm shadow-luxury"
            >
              {lang === "uz"
                ? "Qabulga Yozilish"
                : lang === "ru"
                ? "Записаться на Приём"
                : "Book Appointment"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
