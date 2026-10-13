import React from "react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import Seo from "../components/Seo";
import { PAGE_SEO } from "../constants/seo";

const NotFound = () => {
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const seo = PAGE_SEO.notFound[lang] || PAGE_SEO.notFound.uz;

  return (
    <div className="py-20 text-center space-y-6 max-w-xl mx-auto">
      <Seo
        title={seo.title}
        description={seo.description}
        noindex={true}
      />

      <div className="text-7xl font-bold text-primary font-serif-classic">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic">
          {lang === "uz" ? "Sahifa Topilmadi" : lang === "ru" ? "Страница Не Найдена" : "Page Not Found"}
        </h1>
        <p className="text-sm text-slate-600">
          {seo.description}
        </p>
      </div>

      <div>
        <Link
          to={to("/")}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-luxury"
        >
          {lang === "uz" ? "Bosh Sahifaga Qaytish" : lang === "ru" ? "На Главную" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
