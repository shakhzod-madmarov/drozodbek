import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { DOCTOR_INFO } from "../constants/doctor";
import { IconTelegram, IconInstagram, IconPhone } from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const FloatingActionHub = () => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const [expanded, setExpanded] = useState(false);
  const hubRef = useRef(null);

  useEffect(() => {
    if (!expanded) return;
    const handleClickOutside = (e) => {
      if (hubRef.current && !hubRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("pointerdown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  return (
    <div
      ref={hubRef}
      role="region"
      aria-label={a11y.quickActions}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] z-40 flex flex-col items-end gap-2.5 no-print [perspective:1000px]"
    >
      {/* 3D Staggered Cascade Menu */}
      {expanded && (
        <div
          id="floating-action-menu"
          className="flex flex-col items-end gap-2.5 mb-2 transition-all duration-300 [transform-style:preserve-3d] animate-fadeIn"
        >
          {/* Telegram */}
          <a
            href={DOCTOR_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-gradient-to-r from-[#0088cc] to-[#0099e6] hover:brightness-110 text-white px-4 py-2.5 rounded-2xl shadow-luxury-lg text-xs font-bold transition-all duration-300 hover:scale-105 hover:-translate-x-1 border border-white/25"
          >
            <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <IconTelegram className="w-4 h-4 text-white" />
            </span>
            <span>Telegram (@Stamatolog07)</span>
          </a>

          {/* Instagram */}
          <a
            href={DOCTOR_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:brightness-110 text-white px-4 py-2.5 rounded-2xl shadow-luxury-lg text-xs font-bold transition-all duration-300 hover:scale-105 hover:-translate-x-1 border border-white/25"
          >
            <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <IconInstagram className="w-4 h-4 text-white" />
            </span>
            <span>Instagram (@_vrach_stomatolog)</span>
          </a>

          {/* Direct Phone */}
          <a
            href={DOCTOR_INFO.phoneHref}
            className="flex items-center gap-2.5 bg-gradient-to-r from-[#DF301C] to-[#FF4530] hover:brightness-110 text-white px-4 py-2.5 rounded-2xl shadow-luxury-lg text-xs font-bold transition-all duration-300 hover:scale-105 hover:-translate-x-1 border border-white/25"
          >
            <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <IconPhone className="w-4 h-4 text-white" />
            </span>
            <span>{DOCTOR_INFO.phoneDisplay}</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Bar */}
      <div className="flex items-center gap-2 [transform-style:preserve-3d]">
        {/* Desktop Quick Phone Pill */}
        <a
          href={DOCTOR_INFO.phoneHref}
          className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-slate-800 hover:text-primary px-4 py-3 rounded-2xl shadow-luxury border border-amber-200/80 text-xs font-bold transition-all hover:shadow-luxury-lg hover:-translate-y-0.5"
        >
          <span className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <IconPhone className="w-3.5 h-3.5 text-primary" />
          </span>
          <span>{DOCTOR_INFO.phoneDisplay}</span>
        </a>

        {/* 3D Floating Hub Button */}
        <div className="relative">
          {/* Subtle pulse aura ring when closed */}
          {!expanded && (
            <div className="absolute inset-0 rounded-2xl bg-primary/40 animate-ping pointer-events-none" />
          )}

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? a11y.closeQuickActions : a11y.openQuickActions}
            aria-expanded={expanded}
            aria-controls="floating-action-menu"
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-[#FF5540] hover:brightness-105 text-white shadow-luxury-lg flex items-center justify-center text-lg font-bold cursor-pointer transition-all duration-300 hover:scale-105 border-2 border-white/40 active:scale-95 shadow-[0_10px_25px_-5px_rgba(223,48,28,0.4)]"
          >
            {expanded ? (
              <span className="text-xl transition-transform duration-300 rotate-90">✕</span>
            ) : (
              <span className="flex items-center justify-center">
                <IconPhone className="w-6 h-6 text-white" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionHub;
