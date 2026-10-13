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
  IconCheckCircle,
} from "./MedicalIcons";
import { useBooking } from "../context/BookingContext";

const treatments = [
  {
    id: "implant",
    serviceId: "dental-implant",
    shortTitle: { uz: "Dental Implant", ru: "Имплантация", en: "Dental Implants" },
    icon: <DentalImplantFixture className="w-5 h-5" />,
    badgeTitle: {
      uz: "MEGAGEN & JANUBIY KOREYA BIOTITAN IMPLANTLARI",
      ru: "MEGAGEN & БИОТИТАНОВЫЕ ИМПЛАНТАТЫ (ЮЖНАЯ КОРЕЯ)",
      en: "MEGAGEN & SOUTH KOREAN TITANIUM IMPLANTS",
    },
    title: {
      uz: "Dental Implantatsiya & Suyak Tiklash",
      ru: "Дентальная Имплантация и Восстановление",
      en: "Dental Implantation & Restoration",
    },
    desc: {
      uz: "Yo'qotilgan tishlarni qo'shni tishlarga ziyon yetkazmasdan, Janubiy Koreyaning MegaGen premium biotitan implantlari bilan 15-20 daqiqada og'riqsiz o'rnatish. Umrbod rasmiy kafolat bilan.",
      ru: "Восстановление утраченных зубов без обточки соседних титановыми имплантатами MegaGen (Южная Корея). Установка за 20 минут без боли.",
      en: "Gentle 20-minute placement of premium South Korean MegaGen titanium implants with lifetime clinical warranty.",
    },
    options: [
      { name: "MegaGen Anyridge (Premium)", desc: { uz: "Yuqori suyak integratsiyasi, tezkor yuklama", ru: "Премиум приживаемость и ранняя нагрузка", en: "Top osseointegration & early loading" } },
      { name: "MegaGen Anyone (Universal)", desc: { uz: "Klassik mustahkam biotitan tizim", ru: "Классическая проверенная система", en: "Classic durable titanium system" } },
    ],
    duration: { uz: "15–20 daqiqa", ru: "15–20 минут", en: "15–20 mins" },
    warranty: { uz: "Umrbod kafolat", ru: "Пожизненная гарантия", en: "Lifetime warranty" },
  },
  {
    id: "braces",
    serviceId: "breketlar",
    shortTitle: { uz: "Breketlar", ru: "Брекеты", en: "Braces" },
    icon: <DentalBracesIcon className="w-5 h-5" />,
    badgeTitle: {
      uz: "METALL · KERAMIK · SAPFIR BREKET TIZIMLARI",
      ru: "МЕТАЛЛИЧЕСКИЕ · КЕРАМИЧЕСКИЕ · САПФИРОВЫЕ БРЕКЕТЫ",
      en: "METAL · CERAMIC · SAPPHIRE BRACES",
    },
    title: {
      uz: "Ortodontik Breketlar & Tishlashni To'g'rilash",
      ru: "Брекет-Системы и Исправление Прикуса",
      en: "Orthodontic Brackets & Bite Alignment",
    },
    desc: {
      uz: "Tishlarning qiyshiqligi, orasi ochiqligi (diastema) va murakkab prikus nuqsonlarini 10 yillik tajribaga ega shifokor nazorati ostida tekislash.",
      ru: "Выравнивание скученности, закрытие щелей и коррекция дефектов прикуса надежными брекет-системами.",
      en: "Comprehensive smile straightening and bite alignment using metal and aesthetic ceramic brackets.",
    },
    options: [
      { name: "Metall Breketlar", desc: { uz: "Klassik mustahkam va tezkor tekislash", ru: "Классическая прочность и быстрый эффект", en: "Classic strength & fastest alignment" } },
      { name: "Keramik / Sapfir", desc: { uz: "Estetik va tish rangida ko'rinmas", ru: "Незаметны на зубах, эстетичны", en: "Aesthetic tooth-colored discretion" } },
    ],
    duration: { uz: "Individual reja", ru: "Индивидуальный курс", en: "Custom duration" },
    warranty: { uz: "Doimiy to'g'ri natija", ru: "Пожизненный результат", en: "Stable alignment" },
  },
  {
    id: "crowns",
    serviceId: "sirkon-keramika-karonkalar",
    shortTitle: { uz: "Sirkon Karonkalar", ru: "Цирконий Коронки", en: "Zirconia Crowns" },
    icon: <DentalVeneerCrown className="w-5 h-5" />,
    badgeTitle: {
      uz: "CAD/CAM MONOLIT TSIRKONIY & KERAMIKA",
      ru: "МОНОЛИТНЫЙ ДИОКСИД ЦИРКОНИЯ & КЕРАМИКА",
      en: "MONOLITHIC ZIRCONIA & CAD/CAM CERAMICS",
    },
    title: {
      uz: "Sirkon va Keramika Karonkalar (CAD/CAM)",
      ru: "Циркониевые и Керамические Коронки",
      en: "Zirconia & Ceramic Crowns",
    },
    desc: {
      uz: "Sinib ketgan yoki yemirilgan tishlarni metall-siz, milkka 100% zararsiz mustahkam tsirkoniy va E-max qoplamalar bilan tabiiy tiklash.",
      ru: "Эстетичные и сверхпрочные коронки из диоксида циркония без темного ободка и без аллергии.",
      en: "Biocompatible metal-free zirconia and ceramic crowns engineered for chewing durability and lifelike aesthetics.",
    },
    options: [
      { name: "Monolit Zirconia (CAD/CAM)", desc: { uz: "Yuqori chaynash yuklamasiga chidamli", ru: "Максимальная прочность для жевательных зубов", en: "Supreme fracture resistance" } },
      { name: "Keramika E-max", desc: { uz: "Old tishlar uchun yorqin tabiiylik", ru: "Идеальная эстетика передних зубов", en: "Optimal front teeth translucency" } },
    ],
    duration: { uz: "2–3 kun", ru: "2–3 дня", en: "2–3 days" },
    warranty: { uz: "10 yilgacha kafolat", ru: "Гарантия до 10 лет", en: "Up to 10-year warranty" },
  },
  {
    id: "veneers",
    serviceId: "vinirlar",
    shortTitle: { uz: "Vinirlar", ru: "Виниры E-max", en: "Veneers" },
    icon: <DentalVeneerCrown className="w-5 h-5" />,
    badgeTitle: {
      uz: "E-MAX KERAMIK VINIRLAR · GOLLIVUD TABASSUMI",
      ru: "КЕРАМИЧЕСКИЕ ВИНИРЫ E-MAX · ГОЛЛИВУДСКАЯ УЛЫБКА",
      en: "E-MAX PORCELAIN VENEERS · HOLLYWOOD SMILE",
    },
    title: {
      uz: "E-max Estetik Vinirlar (Gollivud Tabassumi)",
      ru: "Керамические Виниры E-max",
      en: "E-max Aesthetic Porcelain Veneers",
    },
    desc: {
      uz: "Old tishlar shakli, rangi va o'lchamini minimal yonish bilan mukammallashtiruvchi ultra-yupqa (0.3 mm) estetik vinirlar.",
      ru: "Ультратонкие керамические виниры для создания идеальной белизны и гармонии улыбки без агрессивной обточки.",
      en: "Ultra-thin porcelain veneers creating a dazzling celebrity smile with minimal tooth preparation.",
    },
    options: [
      { name: "E-max Press (Shveysariya/Germaniya)", desc: { uz: "Ultra-yupqa, emalni asrab qoladi", ru: "Ультратонкие с сохранением эмали", en: "Ultra-thin enamel preserving" } },
      { name: "Badiiy Kompozit Vinir", desc: { uz: "1 qabulda tezkor tabassum dizayni", ru: "Дизайн улыбки за 1 визит", en: "Same-day direct bonding" } },
    ],
    duration: { uz: "1–2 ta qabul", ru: "1–2 визита", en: "1–2 visits" },
    warranty: { uz: "10–15 yil xizmat muddati", ru: "Срок службы 10–15 лет", en: "10–15+ years lifespan" },
  },
  {
    id: "aligners",
    serviceId: "elaynerlar",
    shortTitle: { uz: "Elaynerlar", ru: "Элайнеры", en: "Aligners" },
    icon: <DentalAlignersIcon className="w-5 h-5" />,
    badgeTitle: {
      uz: "KO'RINMAS SHAFFOF KAPALAR (ALIGNERS)",
      ru: "НЕВИДИМЫЕ ПРОЗРАЧНЫЕ КАПЫ (ЭЛАЙНЕРЫ)",
      en: "CLEAR INVISIBLE ALIGNERS",
    },
    title: {
      uz: "Ko'rinmas Shaffof Elaynerlar",
      ru: "Прозрачные Элайнеры",
      en: "Clear Invisible Aligners",
    },
    desc: {
      uz: "Temir simlarsiz va breketsiz, atrofdagilarga mutlaqo ko'rinmaydigan shaffof kapalar yordamida tishlarni tekislash.",
      ru: "Инновационное выравнивание зубов съемными незаметными капами без металлических замков.",
      en: "Modern wireless smile straightening with transparent aligners that nobody will notice.",
    },
    options: [
      { name: "3D Raqamli Elaynerlar To'plami", desc: { uz: "Kompyuterda rejalashtirilgan bosqichlar", ru: "Пошаговый цифровой расчет", en: "Digitally planned stages" } },
    ],
    duration: { uz: "Bosqichma-bosqich", ru: "Поэтапно", en: "Step-by-step" },
    warranty: { uz: "3D natija kafolati", ru: "Гарантия по плану", en: "Predicted outcome" },
  },
  {
    id: "dentures",
    serviceId: "pratezlar",
    shortTitle: { uz: "Protezlar", ru: "Протезы", en: "Dentures" },
    icon: <DentalDenturesIcon className="w-5 h-5" />,
    badgeTitle: {
      uz: "ZAMONAVIY OLINADIGAN VA OLINMAYDIGAN PROTEZLAR",
      ru: "СЪЕМНЫЕ И НЕСЪЕМНЫЕ ЗУБНЫЕ ПРОТЕЗЫ",
      en: "MODERN REMOVABLE & FIXED DENTURES",
    },
    title: {
      uz: "Zamonaviy Tish Protezlari",
      ru: "Зубное Протезирование",
      en: "Modern Dental Prosthetics",
    },
    desc: {
      uz: "Byugel, elastik neylon va zamonaviy protezlar yordamida to'liq va qisman tishsizlikni 100% qulay tiklash.",
      ru: "Бюгельные и эластичные нейлоновые протезы для полного восстановления жевательной функции без дискомфорта.",
      en: "Flexible nylon, precision clasp, and full dentures designed for comfortable eating and confident speaking.",
    },
    options: [
      { name: "Byugel Protez (Qulflar bilan)", desc: { uz: "Yengil, tanglayni yopmaydi", ru: "Легкий, не закрывает нёбо", en: "Lightweight, palate-free" } },
      { name: "Elastik Neylon (Acry-Free)", desc: { uz: "Yumshoq, milkni qismaydi", ru: "Мягкий и комфортный", en: "Gentle and non-rubbing" } },
    ],
    duration: { uz: "3–5 kun", ru: "3–5 дней", en: "3–5 days" },
    warranty: { uz: "To'liq qulaylik kafolati", ru: "Гарантия комфорта", en: "Comfort warranty" },
  },
  {
    id: "whitening",
    serviceId: "tish-oqartirish",
    shortTitle: { uz: "Oqartirish", ru: "Отбеливание", en: "Whitening" },
    icon: <DentalWhiteningZoom className="w-5 h-5" />,
    badgeTitle: {
      uz: "PROFESSIONAL TISH OQARTIRISH & AIRFLOW GIGIYENA",
      ru: "ПРОФЕССИОНАЛЬНОЕ ОТБЕЛИВАНИЕ & AIRFLOW",
      en: "PROFESSIONAL WHITENING & AIRFLOW",
    },
    title: {
      uz: "Professional Tish Oqartirish & AirFlow",
      ru: "Профессиональное Отбеливание Зубов",
      en: "Professional Teeth Whitening",
    },
    desc: {
      uz: "Emalga zarar yetkazmagan holda tishlarni 4–8 tongacha oqartirish hamda ultratovush va AirFlow bilan toshlarni tozalash.",
      ru: "Безопасное осветление на 4–8 тонов и чистка AirFlow от налета и зубного камня.",
      en: "Non-damaging whitening by 4–8 shades combined with ultrasonic AirFlow tartar removal.",
    },
    options: [
      { name: "Kabinet Fotootbelivaniye", desc: { uz: "40 daqiqada yorqin oqlik", ru: "Белоснежная улыбка за 40 минут", en: "Instant 40-min shade lift" } },
      { name: "AirFlow + Ultratovush", desc: { uz: "Kofe dog'lari va toshlarni tozalash", ru: "Удаление налета от кофе и камня", en: "Complete stain & plaque scale" } },
    ],
    duration: { uz: "40–50 daqiqa", ru: "40–50 минут", en: "40–50 mins" },
    warranty: { uz: "Uzoq muddatli yorqinlik", ru: "Длительный эффект", en: "Long-lasting shine" },
  },
  {
    id: "therapy",
    serviceId: "ogriqsiz-tish-davolash",
    shortTitle: { uz: "Tish Davolash", ru: "Лечение Зубов", en: "Tooth Care" },
    icon: <DentalToothMolar className="w-5 h-5" />,
    badgeTitle: {
      uz: "OG'RIQSIZ DAVOLASH · GERMANIYA & YAPONIYA PLOMBALARI",
      ru: "ЛЕЧЕНИЕ БЕЗ БОЛИ · ПЛОМБЫ ГЕРМАНИЯ & ЯПОНИЯ",
      en: "PAINLESS CARE · GERMAN & JAPANESE FILLINGS",
    },
    title: {
      uz: "Og'riqsiz Tish Davolash & Plombalar",
      ru: "Лечение Зубов и Фотополимерные Пломбы",
      en: "Painless Tooth Care & Nano-Fillings",
    },
    desc: {
      uz: "Karies, pulpit va nerv shamollashini 2 bosqichli og'riqsiz mikro-anesteziya ostida davolash. Germaniya (3M Filtek) va Yaponiya (Estelite) plombalari.",
      ru: "Лечение кариеса и каналов под аппликационной анестезией без боли. Пломбы из Германии и Японии.",
      en: "Immediate relief from cavities and root canals with numbing gel and German 3M Filtek nano-composites.",
    },
    options: [
      { name: "3M Filtek (Germaniya)", desc: { uz: "Premium nano-keramika, uzoq kafolat", ru: "Премиум нанокомпозит", en: "Premium German nano-composite" } },
      { name: "Estelite (Yaponiya)", desc: { uz: "Xameleon tabiiy emal jilosi", ru: "Хамелеон эффект живой эмали", en: "Japanese chameleon shade blend" } },
    ],
    duration: { uz: "30–45 daqiqa", ru: "30–45 минут", en: "30–45 mins" },
    warranty: { uz: "5 yilgacha kafolat", ru: "Гарантия до 5 лет", en: "Up to 5-year warranty" },
  },
  {
    id: "surgery",
    serviceId: "ogriqsiz-tish-olish",
    shortTitle: { uz: "Tish Olish", ru: "Удаление Зубов", en: "Extraction" },
    icon: <DentalSurgeryExtraction className="w-5 h-5" />,
    badgeTitle: {
      uz: "OG'RIQSIZ TISH OLISH & ATRAVMATIK XIRURGIYA",
      ru: "БЕРЕЖНОЕ УДАЛЕНИЕ ЗУБОВ И ХИРУРГИЯ",
      en: "PAINLESS ATRAUMATIC EXTRACTION",
    },
    title: {
      uz: "Og'riqsiz Tish Olish & Aql Tishlari",
      ru: "Бережное Удаление Зубов Мудрости",
      en: "Gentle Tooth Extraction & Wisdom Teeth",
    },
    desc: {
      uz: "Murakkab aql tishlari va singan ildizlarni suyakni shikastlamasdan, 10–15 daqiqada mutlaqo og'riqsiz va asoratsiz sug'urish.",
      ru: "Атравматичное удаление разрушенных зубов и ретенированных восьмерок без боли и с быстрым заживлением.",
      en: "Atraumatic socket-preserving extraction of damaged roots and wisdom teeth in 10-15 minutes.",
    },
    options: [
      { name: "Atravmatik Oddiy Olish", desc: { uz: "Tezkor, og'riqsiz mikro-texnika", ru: "Быстро и без боли", en: "Swift painless extraction" } },
      { name: "Murakkab Aql Tishi (Donolik)", desc: { uz: "Yotgan yoki qiyshiq tishlarni nozik olish", ru: "Сложные ретенированные восьмерки", en: "Impacted wisdom tooth surgery" } },
    ],
    duration: { uz: "10–20 daqiqa", ru: "10–20 минут", en: "10–20 mins" },
    warranty: { uz: "Asoratsiz tez bitish", ru: "Быстрое заживление", en: "Rapid recovery" },
  },
];

const Interactive3DCostCalculator = () => {
  const { lang } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedId, setSelectedId] = useState("implant");
  const [units, setUnits] = useState(1);

  const activeTreatment = treatments.find((t) => t.id === selectedId) || treatments[0];

  return (
    <section className="py-12 sm:py-16 bg-white rounded-3xl border border-amber-200/80 shadow-luxury p-5 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-red-50 text-primary border border-red-200/60">
            <IconShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>{lang === "uz" ? "Interaktiv Muolajalar Rejasi" : lang === "ru" ? "Интерактивный План Лечения" : "Interactive Treatment Plan"}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1A202C] font-serif-classic">
            {lang === "uz"
              ? "Muolajani Tanlang va Tafsilotlar Bilan Tanishib Chiqing"
              : lang === "ru"
              ? "Выберите Услугу и Узнайте Детали Лечения"
              : "Select a Specialty and Review Treatment Details"}
          </h2>
          <p className="text-sm text-slate-600">
            {lang === "uz"
              ? "Dr. Ozodbek Otaxonovning barcha 9 ta asosiy yo'nalishi bo'yicha materiallar, davomiylik va rasmiy kafolat bilan tanishing."
              : lang === "ru"
              ? "Ознакомьтесь с материалами, сроками и клинической гарантией по всем 9 направлениям Д-ра Озодбека Отахонова."
              : "Explore clinical protocols, genuine certified materials, and formal warranties for all 9 key dental specialties."}
          </p>
        </div>

        {/* Specialty Tabs Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pb-2">
          {treatments.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedId === t.id
                  ? "bg-primary text-white shadow-luxury scale-105"
                  : "bg-amber-50/70 hover:bg-amber-100/60 text-slate-700 border border-amber-200/50"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.shortTitle[lang]}</span>
            </button>
          ))}
        </div>

        {/* Treatment Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#FFFDF9] via-amber-50/30 to-white rounded-3xl p-6 sm:p-8 border border-amber-200">
          {/* Left Info Column */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider">
              {activeTreatment.badgeTitle[lang]}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic">
              {activeTreatment.title[lang]}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {activeTreatment.desc[lang]}
            </p>

            {/* Options list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeTreatment.options.map((opt, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-amber-200/70 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <IconCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{opt.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {opt.desc[lang]}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-amber-200/60 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <IconClock className="w-4 h-4 text-brandOrange" />
                <span className="font-semibold">{lang === "uz" ? "Vaqt:" : lang === "ru" ? "Время:" : "Duration:"}</span>
                <span className="font-bold text-slate-900">{activeTreatment.duration[lang]}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <IconShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold">{lang === "uz" ? "Kafolat:" : lang === "ru" ? "Гарантия:" : "Warranty:"}</span>
                <span className="font-bold text-slate-900">{activeTreatment.warranty[lang]}</span>
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-amber-200 shadow-md flex flex-col justify-between space-y-6 text-center">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                {activeTreatment.icon}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brandOrange">
                {lang === "uz" ? "Tezkor Yozilish" : lang === "ru" ? "Быстрая Запись" : "Instant Booking"}
              </p>
              <h4 className="text-lg font-bold text-slate-900">
                {activeTreatment.shortTitle[lang]}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === "uz"
                  ? "Dr. Ozodbek Otaxonov qabuliga ushbu xizmat bo'yicha to'g'ridan-to'g'ri navbatsiz yoziling."
                  : lang === "ru"
                  ? "Запишитесь на прием к Д-ру Озодбеку Отахонову без очередей по этой услуге."
                  : "Book directly with Dr. Ozodbek Otaxonov with zero waiting time."}
              </p>
            </div>

            <button
              onClick={() => openBooking(activeTreatment.serviceId)}
              className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider shadow-luxury transition-all cursor-pointer hover:shadow-luxury-lg hover:-translate-y-0.5"
            >
              {lang === "uz"
                ? "Shu Xizmatga Yozilish"
                : lang === "ru"
                ? "Записаться на Услугу"
                : "Book This Service"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DCostCalculator;
