import React, { useState, useRef, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../assets/assets";
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
  IconSparkleStar,
} from "./MedicalIcons";
import { useBooking } from "../context/BookingContext";

const treatments = [
  {
    id: "implant",
    serviceId: "dental-implant",
    image: assets.treatment_implant,
    unitLabel: { uz: "implant dona", ru: "имплант(ов)", en: "implant unit(s)" },
    maxUnits: 10,
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
      ru: "Восстановление утраченных зубов без обточки соседних титановыми имплантатами MegaGen (Южная Корея). Установка за 20 минут без боли с пожизненной гарантией.",
      en: "Gentle 20-minute placement of premium South Korean MegaGen titanium implants with lifetime clinical warranty.",
    },
    options: [
      { name: "MegaGen Anyridge (Premium)", desc: { uz: "Yuqori suyak integratsiyasi, tezkor yuklama", ru: "Премиум приживаемость и ранняя нагрузка", en: "Top osseointegration & early loading" } },
      { name: "MegaGen Anyone (Universal)", desc: { uz: "Klassik mustahkam biotitan tizim", ru: "Классическая проверенная система", en: "Classic durable titanium system" } },
    ],
    durationPerUnit: 20,
    warranty: { uz: "Umrbod rasmiy kafolat", ru: "Пожизненная гарантия", en: "Lifetime warranty" },
    features: [
      { uz: "Qo'shni tishlar charxlanmaydi", ru: "Без обточки соседних зубов", en: "Adjacent teeth preserved" },
      { uz: "100% og'riqsiz anesteziya", ru: "100% безболезненно", en: "100% painless anesthesia" },
      { uz: "3D navigatsion aniqlik", ru: "3D навигационная точность", en: "3D guided precision" },
    ],
  },
  {
    id: "braces",
    serviceId: "breketlar",
    image: assets.treatment_braces,
    unitLabel: { uz: "jag' (yuqori/pastki)", ru: "челюсть (верх/низ)", en: "dental arch" },
    maxUnits: 2,
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
    durationPerUnit: 45,
    warranty: { uz: "Doimiy to'g'ri natija", ru: "Пожизненный результат", en: "Stable alignment" },
    features: [
      { uz: "Tishlash nuqsonlarini to'g'irlash", ru: "Коррекция любого прикуса", en: "Complete bite correction" },
      { uz: "Estetik ko'rinish", ru: "Эстетичные материалы", en: "Aesthetic finish" },
      { uz: "Oylik professional nazorat", ru: "Ежемесячный контроль", en: "Monthly check-ups" },
    ],
  },
  {
    id: "crowns",
    serviceId: "sirkon-keramika-karonkalar",
    image: assets.treatment_crowns,
    unitLabel: { uz: "karonka dona", ru: "коронка(и)", en: "crown unit(s)" },
    maxUnits: 14,
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
    durationPerUnit: 30,
    warranty: { uz: "10 yilgacha rasmiy kafolat", ru: "Гарантия до 10 лет", en: "Up to 10-year warranty" },
    features: [
      { uz: "Metall qorayishi yo'q", ru: "Без темных ободков у десны", en: "No dark metallic edges" },
      { uz: "Mikron aniqlikdagi CAD/CAM", ru: "Фрезеровка CAD/CAM", en: "CAD/CAM precision fit" },
      { uz: "Tabiiy emal yaltiroqligi", ru: "Блеск натуральной эмали", en: "Natural enamel gloss" },
    ],
  },
  {
    id: "veneers",
    serviceId: "vinirlar",
    image: assets.treatment_veneers,
    unitLabel: { uz: "vinir dona", ru: "винир(ов)", en: "veneer unit(s)" },
    maxUnits: 12,
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
    durationPerUnit: 35,
    warranty: { uz: "10–15 yil xizmat muddati", ru: "Срок службы 10–15 лет", en: "10–15+ years lifespan" },
    features: [
      { uz: "0.3 mm ultra-yupqa qatlam", ru: "Толщина всего 0.3 мм", en: "Ultra-thin 0.3 mm design" },
      { uz: "Rangini doimiy saqlaydi", ru: "Не тускнеет от кофе и чая", en: "Stain-resistant porcelain" },
      { uz: "Gollivud tabassumi arxitekturasi", ru: "Голливудская гармония", en: "Hollywood smile design" },
    ],
  },
  {
    id: "aligners",
    serviceId: "elaynerlar",
    image: assets.treatment_aligners,
    unitLabel: { uz: "bosqich to'plam", ru: "этапный курс", en: "alignment course" },
    maxUnits: 3,
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
    durationPerUnit: 30,
    warranty: { uz: "3D reja bo'yicha kafolat", ru: "Гарантия по плану", en: "Predicted outcome warranty" },
    features: [
      { uz: "Mutlaqo ko'rinmas", ru: "100% незаметны на зубах", en: "Virtually invisible" },
      { uz: "Ovqatlanishda yechiladi", ru: "Снимаются во время еды", en: "Removable for meals" },
      { uz: "3D modellashtirish", ru: "3D моделирование итога", en: "3D digital simulation" },
    ],
  },
  {
    id: "dentures",
    serviceId: "pratezlar",
    image: assets.treatment_dentures,
    unitLabel: { uz: "jag' protez", ru: "протез челюсти", en: "prosthetic arch" },
    maxUnits: 2,
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
    durationPerUnit: 40,
    warranty: { uz: "To'liq qulaylik kafolati", ru: "Гарантия комфорта", en: "Comfort warranty" },
    features: [
      { uz: "Yengil va elastik", ru: "Легкие и удобные", en: "Lightweight and elastic" },
      { uz: "Chaynashni to'liq tiklaydi", ru: "Восстановление жевания", en: "Full chewing function" },
      { uz: "Milkka bosim qilmaydi", ru: "Без натирания десен", en: "Gentle on gums" },
    ],
  },
  {
    id: "whitening",
    serviceId: "tish-oqartirish",
    image: assets.treatment_whitening,
    unitLabel: { uz: "seans (2 ta jag')", ru: "сеанс (2 челюсти)", en: "session (both arches)" },
    maxUnits: 3,
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
    durationPerUnit: 45,
    warranty: { uz: "Uzoq muddatli yorqinlik", ru: "Длительный эффект", en: "Long-lasting shine" },
    features: [
      { uz: "Emal strukturasi saqlanadi", ru: "Безопасно для эмали", en: "Enamel safe" },
      { uz: "4-8 ton oqarish", ru: "Осветление на 4-8 тонов", en: "4-8 shades whiter" },
      { uz: "Bakteriya va toshlardan tozalash", ru: "Удаление зубного камня", en: "Tartar and plaque removed" },
    ],
  },
  {
    id: "therapy",
    serviceId: "ogriqsiz-tish-davolash",
    image: assets.treatment_therapy,
    unitLabel: { uz: "tish dona", ru: "зуб(а)", en: "tooth / teeth" },
    maxUnits: 6,
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
    durationPerUnit: 35,
    warranty: { uz: "5 yilgacha rasmiy kafolat", ru: "Гарантия до 5 лет", en: "Up to 5-year warranty" },
    features: [
      { uz: "2 bosqichli og'riqsizlantirish", ru: "Двухэтапная анестезия", en: "Two-stage numbing" },
      { uz: "Tabiiy rang uyg'unligi", ru: "Идеальный подбор цвета", en: "Exact shade matching" },
      { uz: "Karies qaytalanishidan himoya", ru: "Защита от рецидива", en: "Recurrence prevention" },
    ],
  },
  {
    id: "surgery",
    serviceId: "ogriqsiz-tish-olish",
    image: assets.treatment_surgery,
    unitLabel: { uz: "tish dona", ru: "зуб(а)", en: "tooth / teeth" },
    maxUnits: 4,
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
    durationPerUnit: 20,
    warranty: { uz: "Asoratsiz tez bitish", ru: "Быстрое заживление", en: "Rapid socket healing" },
    features: [
      { uz: "Suyak to'qimasi saqlanadi", ru: "Сохранение костной лунки", en: "Bone socket preserved" },
      { uz: "Tiklanish tez va oson", ru: "Быстрое восстановление", en: "Fast easy recovery" },
      { uz: "Mutlaqo og'riqsiz", ru: "100% безболезненно", en: "100% gentle & sterile" },
    ],
  },
];

const Interactive3DCostCalculator = () => {
  const { lang } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedId, setSelectedId] = useState("implant");
  const [units, setUnits] = useState(1);

  // 3D Card Tilt State
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });

  const activeTreatment = treatments.find((t) => t.id === selectedId) || treatments[0];

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 4;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  }, []);

  const handleTreatmentChange = (id) => {
    setSelectedId(id);
    setUnits(1);
  };

  const estimatedMinutes = activeTreatment.durationPerUnit * units;
  const formattedDuration =
    estimatedMinutes < 60
      ? `${estimatedMinutes} ${lang === "uz" ? "daqiqa" : lang === "ru" ? "минут" : "mins"}`
      : `${Math.floor(estimatedMinutes / 60)} ${lang === "uz" ? "soat" : lang === "ru" ? "ч" : "hr"}${
          estimatedMinutes % 60 > 0
            ? ` ${estimatedMinutes % 60} ${lang === "uz" ? "daq" : lang === "ru" ? "мин" : "m"}`
            : ""
        }`;

  return (
    <section className="py-12 sm:py-16 bg-white rounded-3xl border border-amber-200/90 shadow-luxury p-4 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-red-50 text-primary border border-red-200/60 shadow-2xs">
            <IconShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>{lang === "uz" ? "Interaktiv 3D Muolajalar Rejasi" : lang === "ru" ? "Интерактивный 3D План Лечения" : "3D Interactive Treatment Plan"}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1A202C] font-serif-classic">
            {lang === "uz"
              ? "Muolajani Tanlang va 3D Rejani Hisoblang"
              : lang === "ru"
              ? "Выберите Услугу и Рассчитайте 3D План"
              : "Select a Specialty & Calculate 3D Treatment Plan"}
          </h2>
          <p className="text-sm text-slate-600">
            {lang === "uz"
              ? "Har bir yo'nalish bo'yicha tishlar sonini tanlang, davomiylik va kafolat parametrlarini real vaqtda ko'ring."
              : lang === "ru"
              ? "Укажите количество единиц или зубов и оцените точные сроки, протокол и официальную гарантию."
              : "Adjust units and explore surgical protocols, materials, and certified warranties in real time."}
          </p>
        </div>

        {/* 9 Specialty 3D Tabs */}
        <div className="flex overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-2 pb-2 px-1 -mx-2 sm:mx-0 no-scrollbar scroll-touch">
          {treatments.map((t) => {
            const isSelected = selectedId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTreatmentChange(t.id)}
                className={`flex shrink-0 whitespace-nowrap items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white shadow-luxury scale-105 ring-2 ring-primary/20"
                    : "bg-amber-50/70 hover:bg-amber-100/70 text-slate-700 border border-amber-200/50 hover:scale-[1.02]"
                }`}
              >
                <span className={`transition-transform duration-300 ${isSelected ? "scale-110" : ""}`}>
                  {t.icon}
                </span>
                <span>{t.shortTitle[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Perspective Treatment Stage */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: tilt.active ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
          className="relative bg-gradient-to-br from-[#FFFDF9] via-amber-50/40 to-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-amber-200/90 shadow-luxury-lg [transform-style:preserve-3d] overflow-hidden"
        >
          {/* Dynamic Specular Holographic Glare */}
          {tilt.active && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
              style={{
                background: `radial-gradient(circle 450px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.55), transparent 70%)`,
              }}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 [transform-style:preserve-3d]">
            {/* Left Info Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6 [transform-style:preserve-3d]">
              {/* Luxury Gradient Sticker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-500/15 via-amber-500/15 to-transparent text-primary text-[11px] font-black uppercase tracking-wider border border-primary/25 translate-z-20 shadow-xs">
                <IconSparkleStar className="w-3.5 h-3.5 text-brandOrange" />
                <span>{activeTreatment.badgeTitle[lang]}</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 translate-z-20">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic leading-tight">
                  {activeTreatment.title[lang]}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {activeTreatment.desc[lang]}
                </p>
              </div>

              {/* Interactive Unit Stepper Slider */}
              <div className="p-4 rounded-2xl bg-white/90 border border-amber-200/80 shadow-2xs space-y-3 translate-z-30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-bold text-slate-800">
                    {lang === "uz" ? "Hisoblash Miqdori:" : lang === "ru" ? "Количество единиц:" : "Procedure Units:"}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setUnits((u) => Math.max(1, u - 1))}
                      disabled={units <= 1}
                      className="w-8 h-8 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-slate-800 font-bold flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer"
                    >
                      –
                    </button>
                    <span className="font-serif-classic text-xl font-bold text-primary min-w-[2.5rem] text-center">
                      {units}
                    </span>
                    <button
                      onClick={() => setUnits((u) => Math.min(activeTreatment.maxUnits, u + 1))}
                      disabled={units >= activeTreatment.maxUnits}
                      className="w-8 h-8 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-slate-800 font-bold flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                    <span className="text-xs text-slate-500 font-medium">
                      {activeTreatment.unitLabel[lang]}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-amber-100/60 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-brandOrange h-full rounded-full transition-all duration-300"
                    style={{ width: `${(units / activeTreatment.maxUnits) * 100}%` }}
                  />
                </div>
              </div>

              {/* Certified Materials / Options Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 translate-z-20">
                {activeTreatment.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-amber-200/70 shadow-2xs space-y-1 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
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

              {/* Clinical Features Strip */}
              <div className="flex flex-wrap items-center gap-2 pt-2 translate-z-10">
                {activeTreatment.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/90 border border-amber-200/60 text-[11px] font-semibold text-slate-700 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{feat[lang]}</span>
                  </span>
                ))}
              </div>

              {/* Metrics (Duration & Warranty) */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-amber-200/60 text-xs translate-z-20">
                <div className="flex items-center gap-2 text-slate-700">
                  <IconClock className="w-4 h-4 text-brandOrange" />
                  <span className="font-semibold">{lang === "uz" ? "Klinik Vaqt:" : lang === "ru" ? "Время приёма:" : "Estimated Time:"}</span>
                  <span className="font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/50">
                    {formattedDuration}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <IconShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">{lang === "uz" ? "Rasmiy Kafolat:" : lang === "ru" ? "Клиническая Гарантия:" : "Warranty:"}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/50">
                    {activeTreatment.warranty[lang]}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action 3D Box (4 cols) with Clinical Photo & Stickers */}
            <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white border border-amber-200 shadow-luxury flex flex-col justify-between space-y-5 text-center translate-z-30 hover:scale-[1.02] transition-transform duration-300">
              <div className="space-y-3.5">
                {/* Clinical Photo Preview with Frosted Glass Badges */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-amber-200/90 shadow-md group">
                  <img
                    src={activeTreatment.image}
                    alt={activeTreatment.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-300/40 text-[9px] font-black uppercase tracking-wider shadow-sm">
                      {activeTreatment.shortTitle[lang]}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3 text-left z-10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                        {lang === "uz" ? "Dr. Ozodbek Otaxonov" : lang === "ru" ? "Д-р Озодбек Отахонов" : "Dr. Ozodbek Otaxonov"}
                      </p>
                      <p className="text-xs font-bold text-white truncate">
                        {units} {activeTreatment.unitLabel[lang]} · {formattedDuration}
                      </p>
                    </div>
                    <span className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md text-primary flex items-center justify-center shrink-0 shadow-sm">
                      {activeTreatment.icon}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-left space-y-1">
                  <p className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <IconShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{activeTreatment.warranty[lang]}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 leading-snug">
                    {lang === "uz"
                      ? "Navbatsiz bepul dastlabki ko'rik va to'liq 3D muolaja rejasi."
                      : lang === "ru"
                      ? "Бесплатная первичная консультация и наглядный расчет."
                      : "Zero queue consultation and transparent clinical roadmap."}
                  </p>
                </div>
              </div>

              <button
                onClick={() => openBooking(activeTreatment.serviceId)}
                className="relative overflow-hidden w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider shadow-luxury transition-all cursor-pointer hover:shadow-luxury-lg hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-white/25 -translate-x-full group-hover:animate-shimmer-sweep pointer-events-none" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>{lang === "uz" ? "Shu Xizmatga Yozilish" : lang === "ru" ? "Записаться на Услугу" : "Book This Service"}</span>
                  <span>→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DCostCalculator;
