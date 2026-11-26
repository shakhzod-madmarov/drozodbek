import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { DOCTOR_INFO } from "../constants/doctor";
import {
  IconShieldCheck,
  IconClock,
  IconLocationPin,
  IconPhone,
  IconSparkleStar,
} from "./MedicalIcons";
import { Link } from "react-router-dom";

export default function LocalClinicSummarySection() {
  const { lang } = useLanguage();
  const to = useLocalizedPath();

  const T = {
    uz: {
      badge: "ANDIJONDA STOMATOLOGIYA · TEZKOR QABUL",
      title: "Andijonda Stomatologiya va Vrach Stomatolog Qabuli",
      subtitle:
        "Andijon shahrida 10 yillik tajribaga ega vrach stomatolog Dr. Ozodbek Otaxonov qabulxonasi — zamonaviy stomatologik xizmatlar, tish davolash, dental implantatsiya va shoshilinch yordam haqidagi asosiy ma'lumotlar.",
      servicesTitle: "Klinik Xizmatlar",
      servicesDesc:
        "Tish qo'yish, Janubiy Koreya MegaGen biotitan implantlari, tish breketlari, sirkon karonkalari, E-max vinirlar, tish olish, shaffof elaynerlar, Philips Zoom! 4 oqartirish, Shining 3D optik skanerlash hamda karies va tish asabini 100% og'riqsiz davolash.",
      emergencyTitle: "Kechki Payt Tish Og'rig'i (Soat 22:00 Gacha Tezkor Qabul)",
      emergencyDesc:
        "«Kechki payt tishim ogriyapti» deb murojaat qiluvchi bemorlar uchun klinikamiz soat 22:00 gacha ochiq. O'tkir tish og'rig'i, pulpit yoki plomba tushib ketganda 2 bosqichli mikro-anesteziya qo'llaniladi (avval mevali muzlatuvchi gel surtiladi, igna sezilmaydi). Og'riq qabulning ilk daqiqalaridayoq to'liq qoldiriladi.",
      hoursTitle: "Qabul Vaqti va Onlayn Yozilish",
      hoursDesc:
        "Dushanba – Shanba: 08:30 – 22:00. Yakshanba: oldindan yozilish orqali. Saytimiz orqali navbatsiz, qulay kun va soatni oldindan tanlab yozilish imkoniyati mavjud.",
      locationTitle: "Manzil va Mo'ljal (Andijon)",
      locationDesc:
        "Andijon shahri, 1-kichik daha (1-mikrorayon), 8A-bino («Smiles Dental Group» markazi). Asosiy mo'ljal: Konechka bozorchasi yaqinida.",
      ctaBook: "Onlayn Qabulga Yozilish",
      ctaCall: "Qo'ng'iroq Qilish",
    },
    ru: {
      badge: "СТОМАТОЛОГИЯ В АНДИЖАНЕ · ПРИЁМ ВРАЧА",
      title: "Стоматология в Андижане и Приём Стоматолога Озодбека Отахонова",
      subtitle:
        "Кабинет врача-стоматолога Д-ра Озодбека Отахонова с 10-летним клиническим опытом в Андижане — современная стоматология, имплантация, брекеты и лечение острой зубной боли.",
      servicesTitle: "Стоматологические Услуги",
      servicesDesc:
        "Вставить зуб, имплантация MegaGen (Южная Корея), брекеты на зубы, коронки из циркония CAD/CAM, виниры E-max, удаление зубов без боли, элайнеры, отбеливание Zoom! 4 и лечение кариеса без боли.",
      emergencyTitle: "Острая Зубная Боль Вечером (Приём до 22:00)",
      emergencyDesc:
        "Для пациентов с запросом «вечером болит зуб» клиника открыта до 22:00. При острой зубной боли (пульпит, периодонтит, скол зуба) применяется бережная двухэтапная анестезия (обезболивающий гель перед уколом, 100% без боли).",
      hoursTitle: "Часы Приёма и Онлайн Запись",
      hoursDesc:
        "Понедельник – Суббота: 08:30 – 22:00. Воскресенье: по предварительной записи. Доступна удобная онлайн-запись на приём без очередей.",
      locationTitle: "Адрес и Ориентир в Андижане",
      locationDesc:
        "г. Андижан, 1-й микрорайон, д. 8А (клиника «Smiles Dental Group»). Ориентир: базарчик «Конечка».",
      ctaBook: "Записаться Онлайн",
      ctaCall: "Позвонить Врачу",
    },
    en: {
      badge: "DENTISTRY IN ANDIJAN · APPOINTMENTS",
      title: "Dentistry in Andijan — Dr. Ozodbek Otaxonov Dental Practice",
      subtitle:
        "Comprehensive dental care in Andijan, Uzbekistan by Dr. Ozodbek Otaxonov (10 years experience) — restorative dentistry, MegaGen implants, orthodontic braces, and emergency toothache relief.",
      servicesTitle: "Dental Specialties & Treatments",
      servicesDesc:
        "Tooth replacement, MegaGen biocompatible titanium implants, Damon braces, zirconia crowns, Ivoclar E-max veneers, painless extractions, and Philips Zoom! 4 whitening.",
      emergencyTitle: "Emergency Evening Toothache Relief (Open Until 22:00)",
      emergencyDesc:
        "Severe toothache in the evening? We are open Monday to Saturday until 22:00. Two-stage gentle anesthesia (topical numbing gel prior to micro-injection) guarantees immediate, 100% painless relief.",
      hoursTitle: "Operating Hours & Online Booking",
      hoursDesc:
        "Monday to Saturday: 08:30 – 22:00. Sunday: By appointment. Direct online scheduling available with zero waiting.",
      locationTitle: "Address & Landmarks (Andijan)",
      locationDesc:
        "8A, 1st Microdistrict, Andijan, Uzbekistan (Smiles Dental Group center). Landmark: near Konechka market.",
      ctaBook: "Book Appointment Online",
      ctaCall: "Call Practice",
    },
  }[lang];

  return (
    <section
      aria-labelledby="andijan-stomatologiya-heading"
      className="py-10 sm:py-14 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 rounded-3xl border border-amber-200/90 p-5 sm:p-8 lg:p-10 shadow-luxury"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shadow-2xs">
            <IconSparkleStar className="w-3.5 h-3.5 text-primary" />
            <span>{T.badge}</span>
          </span>
          <h2
            id="andijan-stomatologiya-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-serif-classic leading-tight"
          >
            {T.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {T.subtitle}
          </p>
        </div>

        {/* 4 Semantic Knowledge Cards matching AI Overview Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Services */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-2.5 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <IconShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>{T.servicesTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {T.servicesDesc}
            </p>
            <div className="pt-1">
              <Link
                to={to("/services/dental-implant")}
                className="text-xs font-bold text-primary hover:underline"
              >
                {lang === "uz"
                  ? "Tish implantatsiyasi & bosqichlari →"
                  : lang === "ru"
                  ? "Имплантация зубов и этапы →"
                  : "Dental Implants Guide →"}
              </Link>
            </div>
          </div>

          {/* Card 2: Emergency Relief */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-2.5 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-2 text-brandOrange font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{T.emergencyTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {T.emergencyDesc}
            </p>
            <div className="pt-1">
              <Link
                to={to("/tish-ogrigi-yordam")}
                className="text-xs font-bold text-brandOrange hover:underline"
              >
                {lang === "uz"
                  ? "Kechki tish og'rig'ida birinchi yordam →"
                  : lang === "ru"
                  ? "Первая помощь при боли вечером →"
                  : "Evening Toothache Emergency Guide →"}
              </Link>
            </div>
          </div>

          {/* Card 3: Hours & Booking */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-2.5 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <IconClock className="w-4 h-4 text-brandCyan shrink-0" />
              <span>{T.hoursTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {T.hoursDesc}
            </p>
          </div>

          {/* Card 4: Location */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-2.5 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <IconLocationPin className="w-4 h-4 text-primary shrink-0" />
              <span>{T.locationTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {T.locationDesc}
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={to("/booking")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all"
          >
            <IconClock className="w-4 h-4 text-white" />
            <span>{T.ctaBook}</span>
          </Link>
          <a
            href={DOCTOR_INFO.phoneHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs transition-all"
          >
            <IconPhone className="w-4 h-4 text-primary" />
            <span>{DOCTOR_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
