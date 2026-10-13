import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Logo = ({ className = "h-11 sm:h-12", inverted = false }) => {
  const { lang } = useLanguage();

  const subtitle =
    lang === "ru"
      ? "Врач-Стоматолог"
      : lang === "en"
      ? "Dental Surgeon"
      : "Vrach Stomatolog";

  const altText =
    lang === "ru"
      ? "Д-р Озодбек Отахонов — Врач-Стоматолог"
      : lang === "en"
      ? "Dr. Ozodbek Otaxonov — Dental Surgeon"
      : "Dr. Ozodbek Otaxonov — Vrach Stomatolog";

  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3.5 select-none">
      <img
        src="/logo.png"
        alt={altText}
        width={56}
        height={56}
        decoding="async"
        className={`${className} w-auto object-contain shrink-0 rounded-xl shadow-xs`}
      />
      <div className="flex flex-col leading-none text-left min-w-0">
        <span
          className={`font-serif-classic text-[16px] sm:text-lg lg:text-xl font-bold tracking-tight truncate ${
            inverted ? "text-white" : "text-[#1A202C]"
          }`}
        >
          Dr. Ozodbek Otaxonov
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] mt-1 truncate ${
            inverted ? "text-brandCream" : "text-primary"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default Logo;
