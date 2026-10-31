import { useLanguage } from "../context/LanguageContext";

const Logo = ({ className = "h-8 sm:h-9", inverted = false }) => {
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
    <div className="inline-flex items-center gap-2 sm:gap-2.5 select-none">
      <img
        src="/logo_icon.png"
        alt={altText}
        width={38}
        height={38}
        decoding="async"
        className={`${className} w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
      />
      <div className="flex flex-col leading-tight text-left min-w-0">
        <span
          className={`font-serif-classic text-[15px] sm:text-[16px] font-bold tracking-tight truncate ${
            inverted ? "text-white" : "text-[#1A202C]"
          }`}
        >
          Dr. Ozodbek Otaxonov
        </span>
        <span
          className={`text-[8.5px] sm:text-[9px] font-bold uppercase tracking-[0.14em] truncate mt-0.5 ${
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
