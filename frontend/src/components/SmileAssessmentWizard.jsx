import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import {
  DentalImplantFixture,
  DentalBracesIcon,
  DentalVeneerCrown,
  DentalToothMolar,
  IconShieldCheck,
  IconClock,
  IconSparkleStar,
  IconCheckCircle,
} from "./MedicalIcons";
import { useBooking } from "../context/BookingContext";

const concerns = [
  {
    id: "pain",
    serviceId: "ogriqsiz-tish-davolash",
    image: assets.treatment_therapy,
    icon: <DentalToothMolar className="w-5 h-5 text-rose-500" />,
    badgeColor: "bg-slate-950/70 text-white/95 border-white/20",
    tag: { uz: "Terapiya & Karies", ru: "Терапия и Кариес", en: "Restorative" },
    title: {
      uz: "Tish og'rig'i, karies yoki plomba tushishi",
      ru: "Острая боль, кариес или выпала пломба",
      en: "Toothache, cavity, or lost filling",
    },
    recommendation: {
      uz: "Mikroskopik Davolash & Germaniya Plombalari",
      ru: "Лечение Каналов и Нанокомпозитная Пломба",
      en: "Root Canal Therapy & Nano-Composite Restoration",
    },
    summary: {
      uz: "Karies va nerv shamollashini 100% og'riqsiz mikro-anesteziya ostida tozalab, Germaniya (3M Filtek) yoki Yaponiya (Estelite) plombasi bilan tish anatomiyasini tiklaymiz.",
      ru: "Обезболивание гелем и восстановление анатомии зуба фотополимерными пломбами из Германии и Японии.",
      en: "100% painless therapy using topical numbing gel and German 3M Filtek nano-composites.",
    },
    steps: [
      { uz: "Mikro-anesteziya gel bilan", ru: "Аппликационная анестезия", en: "Gentle topical numbing" },
      { uz: "Kariesni tozalash", ru: "Очистка кариеса", en: "Caries excavation" },
      { uz: "3M Filtek anatomik plomba", ru: "Пломба 3M Filtek", en: "3M Filtek nano-filling" },
    ],
    duration: { uz: "30–45 daqiqa", ru: "30–45 минут", en: "30–45 mins" },
    matchScore: "99%",
  },
  {
    id: "missing",
    serviceId: "dental-implant",
    image: assets.treatment_implant,
    icon: <DentalImplantFixture className="w-5 h-5 text-primary" />,
    badgeColor: "bg-slate-950/70 text-white/95 border-white/20",
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
    steps: [
      { uz: "3D tomografiya tahlili", ru: "3D томография и план", en: "3D scan planning" },
      { uz: "MegaGen biotitan o'rnatish", ru: "Установка MegaGen", en: "MegaGen placement" },
      { uz: "CAD/CAM tsirkoniy karonka", ru: "Циркониевая коронка", en: "Zirconia crown fitting" },
    ],
    duration: { uz: "15–20 daqiqa", ru: "15–20 минут", en: "15–20 mins" },
    matchScore: "100%",
  },
  {
    id: "crooked",
    serviceId: "breketlar",
    image: assets.treatment_braces,
    icon: <DentalBracesIcon className="w-5 h-5 text-brandOrange" />,
    badgeColor: "bg-slate-950/70 text-white/95 border-white/20",
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
    steps: [
      { uz: "Raqamli prikus diagnostikasi", ru: "Диагностика прикуса", en: "Digital bite diagnosis" },
      { uz: "Breket/elayner o'rnatish", ru: "Фиксация брекетов", en: "Bracket fixation" },
      { uz: "Mukammal tekis tabassum", ru: "Ровные зубы и прикус", en: "Harmonious straight smile" },
    ],
    duration: { uz: "Individual reja", ru: "Поэтапно", en: "Custom course" },
    matchScore: "98%",
  },
  {
    id: "aesthetic",
    serviceId: "vinirlar",
    image: assets.treatment_veneers,
    icon: <DentalVeneerCrown className="w-5 h-5 text-brandCyan" />,
    badgeColor: "bg-slate-950/70 text-white/95 border-white/20",
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
    steps: [
      { uz: "Tabassum 3D dizayni", ru: "3D дизайн улыбки", en: "3D smile mock-up" },
      { uz: "Minimal 0.3mm ishlov", ru: "Минимальная обработка", en: "Minimal 0.3mm prep" },
      { uz: "E-max keramik fiksatsiya", ru: "Фиксация E-max", en: "E-max bonding" },
    ],
    duration: { uz: "1–2 ta tashrif", ru: "1–2 визита", en: "1–2 visits" },
    matchScore: "100%",
  },
];

const SmileAssessmentWizard = () => {
  const { lang } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedConcern, setSelectedConcern] = useState(concerns[0]);

  return (
    <section className="py-12 sm:py-16 bg-[#FFFDF9] rounded-3xl border border-amber-200/90 shadow-luxury p-5 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-amber-100/30 via-orange-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200/60 shadow-2xs">
            <IconSparkleStar className="w-3.5 h-3.5 text-brandOrange" />
            <span>{lang === "uz" ? "Onlayn Tabassum Tahlili" : lang === "ru" ? "Онлайн-Подбор Лечения" : "Online Smile Assessment"}</span>
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
              ? "Holatingizni tanlang va shifokorimizning individual davolash rejasi bilan darhol tanishing."
              : lang === "ru"
              ? "Выберите вашу ситуацию и получите персональный план лечения от Д-ра Озодбека Отахонова."
              : "Select your primary symptom to preview Dr. Ozodbek's customized clinical approach."}
          </p>
        </div>

        {/* 4 Concern Cards with Visual Thumbnail Images & Luxury Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [perspective:1000px]">
          {concerns.map((item) => {
            const isSelected = selectedConcern.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedConcern(item)}
                className={`p-4 rounded-3xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden [transform-style:preserve-3d] ${
                  isSelected
                    ? "bg-white border-primary shadow-luxury-lg scale-[1.03] ring-2 ring-primary/30 -translate-y-1"
                    : "bg-white/90 border-amber-200/80 hover:bg-white hover:border-amber-300 hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Visual Clinical Thumbnail Image with Floating Badge */}
                  <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-3 bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    
                    {/* Category Floating Sticker */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className={`px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-semibold tracking-wide border shadow-xs ${item.badgeColor}`}>
                        {item.tag[lang]}
                      </span>
                    </div>

                    {/* Floating Icon Disc */}
                    <div className="absolute bottom-2 right-2 z-10">
                      <span className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center">
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.title[lang]}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-amber-100/70">
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    <span>{lang === "uz" ? "Yechim" : lang === "ru" ? "Решение" : "Solution"}</span>
                    <span>→</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs">
                    {item.matchScore} {lang === "uz" ? "moslik" : lang === "ru" ? "совпадение" : "match"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Recommendation Details with 3D Depth Card & Clinical Photo */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-amber-200/90 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center [transform-style:preserve-3d]">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-primary bg-red-50 px-3.5 py-1 rounded-full border border-red-200/60 shadow-2xs">
                {lang === "uz" ? "TAVSIYA ETILADIGAN MUOLAJA" : lang === "ru" ? "РЕКОМЕНДОВАННОЕ ЛЕЧЕНИЕ" : "RECOMMENDED PROCEDURE"}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1 shadow-2xs">
                <IconCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === "uz" ? "100% Og'riqsiz Zamonaviy Texnologiya" : lang === "ru" ? "100% Без боли и страха" : "100% Painless Tech"}</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic leading-tight">
              {selectedConcern.recommendation[lang]}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {selectedConcern.summary[lang]}
            </p>

            {/* 3 Step Protocol */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              {selectedConcern.steps.map((st, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-brandOrange">
                    {lang === "uz" ? `Bosqich 0${idx + 1}` : lang === "ru" ? `Шаг 0${idx + 1}` : `Step 0${idx + 1}`}
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {st[lang]}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 text-xs font-bold text-slate-700 pt-3 border-t border-amber-100">
              <span className="flex items-center gap-1.5">
                <IconClock className="w-4 h-4 text-brandOrange" />
                <span>{selectedConcern.duration[lang]}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <IconShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{lang === "uz" ? "Rasmiy Kafolat" : lang === "ru" ? "Официальная Гарантия" : "Clinical Warranty"}</span>
              </span>
            </div>
          </div>

          {/* Right Action Column with Clinical Treatment Photo & Direct Booking */}
          <div className="lg:col-span-4 flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-50/30 border border-amber-200/90 shadow-md space-y-4">
            {/* Visual Recommendation Image Preview */}
            <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-amber-200/80 shadow-md group">
              <img
                src={selectedConcern.image}
                alt={selectedConcern.recommendation[lang]}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <span className={`px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-semibold tracking-wide border shadow-xs ${selectedConcern.badgeColor}`}>
                  {selectedConcern.tag[lang]}
                </span>
              </div>
              <div className="absolute bottom-2 left-3 right-3 text-left">
                <p className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                  {lang === "uz" ? "Klinik Natija" : lang === "ru" ? "Клинический Результат" : "Clinical Result"}
                </p>
                <p className="text-xs font-bold text-white truncate">
                  {selectedConcern.duration[lang]} · 100% Og'riqsiz
                </p>
              </div>
            </div>

            <button
              onClick={() => openBooking(selectedConcern.serviceId)}
              className="relative overflow-hidden w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider shadow-luxury transition-all cursor-pointer hover:shadow-luxury-lg hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/25 -translate-x-full group-hover:animate-shimmer-sweep pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>{lang === "uz" ? "Dr. Ozodbek Qabuliga Yozilish" : lang === "ru" ? "Записаться к Д-ру Озодбеку" : "Book with Dr. Ozodbek"}</span>
                <span>→</span>
              </span>
            </button>

            <p className="text-[11px] text-slate-500 leading-snug text-center">
              {lang === "uz"
                ? "Navbatsiz, qulay vaqtda qabul qilinadi. Bepul dastlabki konsultatsiya."
                : lang === "ru"
                ? "Без очередей в удобное для вас время. Бесплатный первичный осмотр."
                : "No queues, scheduled at your preferred time. Free initial checkup."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmileAssessmentWizard;
