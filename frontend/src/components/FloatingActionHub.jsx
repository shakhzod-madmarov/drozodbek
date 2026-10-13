import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { DOCTOR_INFO } from "../constants/doctor";
import { IconTelegram, IconInstagram, IconPhone } from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const FloatingActionHub = () => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expanded]);

  return (
    <div
      role="region"
      aria-label={a11y.quickActions}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] z-40 flex flex-col items-end gap-2 no-print"
    >
      {expanded && (
        <div
          id="floating-action-menu"
          className="flex flex-col items-end gap-2.5 mb-1.5 transition-all duration-200"
        >
          {/* Telegram */}
          <a
            href={DOCTOR_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#0088cc] hover:bg-[#0077b5] text-white px-4 py-2.5 rounded-2xl shadow-lg text-xs font-bold transition-transform hover:scale-105"
          >
            <IconTelegram className="w-4 h-4 text-white" />
            <span>Telegram (@Stamatolog07)</span>
          </a>

          {/* Instagram */}
          <a
            href={DOCTOR_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white px-4 py-2.5 rounded-2xl shadow-lg text-xs font-bold transition-transform hover:scale-105"
          >
            <IconInstagram className="w-4 h-4 text-white" />
            <span>Instagram (@_vrach_stomatolog)</span>
          </a>

          {/* Phone */}
          <a
            href={DOCTOR_INFO.phoneHref}
            className="flex items-center gap-2.5 bg-[#DF301C] hover:bg-[#C52412] text-white px-4 py-2.5 rounded-2xl shadow-lg text-xs font-bold transition-transform hover:scale-105"
          >
            <IconPhone className="w-4 h-4 text-white" />
            <span>{DOCTOR_INFO.phoneDisplay}</span>
          </a>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Desktop Quick Phone Pill */}
        <a
          href={DOCTOR_INFO.phoneHref}
          className="hidden sm:flex items-center gap-2 bg-white text-slate-800 hover:text-primary px-4 py-2.5 rounded-2xl shadow-luxury border border-amber-200/80 text-xs font-bold transition-all hover:shadow-luxury-lg"
        >
          <span className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <IconPhone className="w-3 h-3 text-primary" />
          </span>
          <span>{DOCTOR_INFO.phoneDisplay}</span>
        </a>

        {/* Toggle Hub Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? a11y.closeQuickActions : a11y.openQuickActions}
          aria-expanded={expanded}
          aria-controls="floating-action-menu"
          className="w-13 h-13 rounded-2xl bg-primary hover:bg-primary-hover text-white shadow-luxury-lg flex items-center justify-center text-lg font-bold cursor-pointer transition-transform hover:scale-105 border-2 border-white/30"
        >
          {expanded ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="flex items-center justify-center">
              <IconPhone className="w-5 h-5 text-white animate-bounce" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingActionHub;
