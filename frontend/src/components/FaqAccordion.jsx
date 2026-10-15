import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FAQ_ITEMS } from "../constants/faq";
import { IconSparkleStar } from "./MedicalIcons";

const FaqAccordion = ({ items, badgeText, title, subtitle }) => {
  const { lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0);

  const faqList = items || FAQ_ITEMS;

  const defaultBadge = {
    uz: "SAVOL VA JAVOBLAR",
    ru: "ВОПРОСЫ И ОТВЕТЫ",
    en: "FREQUENTLY ASKED QUESTIONS",
  }[lang];

  const defaultTitle = {
    uz: "Bemorlar Tomonidan Eng Ko'p Beriladigan Savollar",
    ru: "Часто Задаваемые Вопросы Пациентов",
    en: "Common Dental Questions & Doctor Answers",
  }[lang];

  const defaultSubtitle = {
    uz: "Davolash, narxlar, kafolat va xavfsizlik haqidagi barcha muhim ma'lumotlar.",
    ru: "Всё о лечении, материалах, гарантии и безопасности процедур.",
    en: "Essential details regarding pain-free treatment, warranties, and credentials.",
  }[lang];

  return (
    <section className="py-12 sm:py-16 bg-[#FFFDF9] rounded-3xl border border-amber-200 p-5 sm:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300">
            <IconSparkleStar className="w-4 h-4 text-brandOrange" />
            <span>{badgeText || defaultBadge}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
            {title || defaultTitle}
          </h2>
          <p className="text-sm text-slate-600">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-amber-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-amber-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.q[lang] || item.q.uz}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-primary font-bold transition-transform shrink-0 ${
                      isOpen ? "rotate-180 bg-primary text-white" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-amber-100/70 pt-3">
                    {item.a[lang] || item.a.uz}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
