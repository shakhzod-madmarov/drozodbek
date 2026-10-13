import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  DentalImplantFixture,
  DentalBracesIcon,
  DentalVeneerCrown,
  DentalToothMolar,
  DentalDenturesIcon,
  DentalAlignersIcon,
  DentalWhiteningZoom,
  DentalSurgeryExtraction,
  IconShieldCheck,
  IconClock,
  IconSparkleStar,
} from "./MedicalIcons";
import { useBooking } from "../context/BookingContext";

const concerns = [
  {
    id: "pain",
    serviceId: "ogriqsiz-tish-davolash",
    icon: <DentalToothMolar className="w-5 h-5 text-primary" />,
    tag: { uz: "Terapiya & Karies", ru: "Терапия и Кариес", en: "Restorative" },
    title: {
      uz: "Tish og'rig'i, karies yoki plomba tushishi",
      ru: "Острая боль, кариес или выпала пломба",
      en: "Toothache, cavity, or lost filling",
    },
    recommendation: {
      uz: "Mikroskopik Davolash & Fotopolimer Restavratsiya",
      ru: "Лечение Каналов и Нанокомпозитная Пломба",
      en: "Root Canal Therapy & Nano-Composite Restoration",
    },
    summary: {
      uz: "Karies va nerv shamollashini 100% og'riqsiz mikro-anesteziya ostida tozalab, Germaniya (3M Filtek) yoki Yaponiya (Estelite) plombasi bilan tish anatomiyasini tiklaymiz.",
      ru: "Обезболивание гелем и восстановление анатомии зуба фотополимерными пломбами из Германии и Японии.",
      en: "100% painless therapy using topical numbing gel and German 3M Filtek nano-composites.",
    },
    duration: { uz: "30–45 daqiqa", ru: "30–45 минут", en: "30–45 mins" },
  },
  {
    id: "missing",
    serviceId: "dental-implant",
    icon: <DentalImplantFixture className="w-5 h-5 text-primary" />,
    tag: { uz: "Dental Implant", ru: "Имплантация", en: "Implantology" },
    title: {
      uz: "Bir yoki bir nechta tish yo'qolgan (tish qo'yish)",
      ru: "Отсутствует один или несколько зубов",
      en: "One or more missing teeth",
    },
    recommendation: {
      uz: "Janubiy Koreya MegaGen Biotitan Implantatsiyasi",
      ru: "Биотитановая Имплантация MegaGen (Южная Корея)",
      en: "MegaGen Biocompatible Titanium Implants",
    },
    summary: {
      uz: "Qo'shni tishlarni charxlamasdan, Janubiy Koreya MegaGen premium titan implantini 15-20 daqiqada og'riqsiz o'rnatish hamda ustiga mustahkam karonka qo'yish.",
      ru: "Восстановление утраченного зуба за 20 минут без обточки соседних с гарантией приживаемости.",
      en: "Restore missing teeth gently in 20 minutes with South Korean MegaGen titanium implants.",
    },
    duration: { uz: "20 daqiqa", ru: "20 минут", en: "20 mins" },
  },
  {
    id: "crooked",
    serviceId: "breketlar",
    icon: <DentalBracesIcon className="w-5 h-5 text-brandOrange" />,
    tag: { uz: "Ortodontiya", ru: "Ортодонтия", en: "Orthodontics" },
    title: {
      uz: "Qiyshiq tishlar yoki noto'g'ri tishlash (prikus)",
      ru: "Неровные зубы или неправильный прикус",
      en: "Crooked teeth or bite misalignment",
    },
    recommendation: {
      uz: "Zamonaviy Breketlar yoki Ko'rinmas Elaynerlar",
      ru: "Брекет-Системы или Прозрачные Элайнеры",
      en: "Orthodontic Brackets or Clear Aligners",
    },
    summary: {
      uz: "10 yillik tajribaga ega vrach stomatolog nazoratida metall, estetik keramik breketlar yoki shaffof kapalar yordamida tabassumni tekislash.",
      ru: "Индивидуальный расчет выравнивания зубного ряда брекетами или съемными прозрачными капами.",
      en: "Personalized digital alignment with metal/ceramic brackets or invisible trays.",
    },
    duration: { uz: "Bosqichma-bosqich", ru: "Поэтапно", en: "Custom course" },
  },
  {
    id: "aesthetic",
    serviceId: "vinirlar",
    icon: <DentalVeneerCrown className="w-5 h-5 text-brandCyan" />,
    tag: { uz: "Estetik Tabassum", ru: "Эстетика Улыбки", en: "Cosmetic" },
    title: {
      uz: "Old tishlar rangi, shakli yoki orasi ochiqligi",
      ru: "Цвет передних зубов, сколы или диастема",
      en: "Front teeth shape, color, or gaps",
    },
    recommendation: {
      uz: "E-max Keramik Vinirlar (Gollivud Tabassumi)",
      ru: "Керамические Виниры E-max",
      en: "E-max Porcelain Veneers (Smile Makeover)",
    },
    summary: {
      uz: "Yuzingizga mos individual tabassum arxitekturasi: ultra-yupqa (0.3 mm) E-max vinirlari bilan mukammal tabiiy yorqinlik.",
      ru: "Идеальная зона улыбки ультратонкими винирами с естественной полупрозрачностью эмали.",
      en: "Ultra-thin porcelain veneers creating seamless color harmony and natural translucency.",
    },
    duration: { uz: "1–2 ta tashrif", ru: "1–2 визита", en: "1–2 visits" },
  },
];

const SmileAssessmentWizard = () => {
  const { lang } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedConcern, setSelectedConcern] = useState(concerns[0]);

  return (
    <section className="py-12 sm:py-16 bg-[#FFFDF9] rounded-3xl border border-amber-200 p-5 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300">
            <IconSparkleStar className="w-4 h-4 text-brandOrange" />
            <span>{lang === "uz" ? "ONLAYN TABASSUM TAHLILI" : lang === "ru" ? "ОНЛАЙН-ПОДБОР ЛЕЧЕНИЯ" : "ONLINE SMILE ASSESSMENT"}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz"
              ? "Sizni Nima Bezovta Qilmoqda? Mos Yechimni Aniqlang"
              : lang === "ru"
              ? "Что Вас Беспокоит? Подберите Оптимальное Решение"
              : "What is Your Main Dental Concern?"}
          </h2>
          <p className="text-sm text-slate-600">
            {lang === "uz"
              ? "Shikoyatingizni tanlang va shifokorimiz qanday professional yordam ko'rsatishini bilib oling."
              : lang === "ru"
              ? "Выберите вашу ситуацию и узнайте рекомендуемый план профессионального лечения."
              : "Choose your primary symptom to see Dr. Ozodbek's customized clinical approach."}
          </p>
        </div>

        {/* Concerns Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {concerns.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedConcern(item)}
              className={`p-5 rounded-3xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                selectedConcern.id === item.id
                  ? "bg-white border-primary shadow-luxury scale-[1.02] ring-2 ring-primary/20"
                  : "bg-white/80 border-amber-200/80 hover:bg-white hover:border-amber-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-900">
                    {item.tag[lang]}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title[lang]}
                </h4>
              </div>
              <p className="text-xs font-bold text-primary mt-3">
                {lang === "uz" ? "Tavsiya →" : lang === "ru" ? "Решение →" : "Solution →"}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Recommendation Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {lang === "uz" ? "TAVSIYA ETILADIGAN MUOLAJA:" : lang === "ru" ? "РЕКОМЕНДОВАННОЕ ЛЕЧЕНИЕ:" : "RECOMMENDED PROCEDURE:"}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
              {selectedConcern.recommendation[lang]}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedConcern.summary[lang]}
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-700 pt-1">
              <span className="flex items-center gap-1.5">
                <IconClock className="w-4 h-4 text-brandOrange" />
                <span>{selectedConcern.duration[lang]}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <IconShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{lang === "uz" ? "100% Og'riqsiz" : lang === "ru" ? "100% Без боли" : "100% Painless"}</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => openBooking(selectedConcern.serviceId)}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider shadow-luxury transition-all cursor-pointer hover:shadow-luxury-lg shrink-0"
          >
            {lang === "uz" ? "Dr. Ozodbek Qabuliga Yozilish" : lang === "ru" ? "Записаться к Д-ру Озодбеку" : "Book with Dr. Ozodbek"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SmileAssessmentWizard;
