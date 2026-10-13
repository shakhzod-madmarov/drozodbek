import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FAQ_ITEMS } from "../constants/faq";
import { IconSparkleStar } from "./MedicalIcons";

const FaqAccordion = () => {
  const { lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-12 sm:py-16 bg-[#FFFDF9] rounded-3xl border border-amber-200 p-5 sm:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300">
            <IconSparkleStar className="w-4 h-4 text-brandOrange" />
            <span>{lang === "uz" ? "SAVOL VA JAVOBLAR" : lang === "ru" ? "ВОПРОСЫ И ОТВЕТЫ" : "FREQUENTLY ASKED QUESTIONS"}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz"
              ? "Bemorlar Tomonidan Eng Ko'p Beriladigan Savollar"
              : lang === "ru"
              ? "Часто Задаваемые Вопросы Пациентов"
              : "Common Dental Questions & Doctor Answers"}
          </h2>
          <p className="text-sm text-slate-600">
            {lang === "uz"
              ? "Davolash, narxlar, kafolat va xavfsizlik haqidagi barcha muhim ma'lumotlar."
              : lang === "ru"
              ? "Всё о лечении, материалах, гарантии и безопасности процедур."
              : "Essential details regarding pain-free treatment, warranties, and credentials."}
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-amber-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-amber-50/50"
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
