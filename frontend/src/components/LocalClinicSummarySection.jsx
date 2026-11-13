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
        "Janubiy Koreya MegaGen biotitan implantlari, Damon breketlari, Germaniya va Yaponiya sirkon karonkalari, Ivoclar E-max vinirlar, shaffof elaynerlar, Philips Zoom! 4 oqartirish, Shining 3D optik skanerlash hamda karies va tish asabini 100% og'riqsiz davolash.",
      emergencyTitle: "Shoshilinch Tish Og'rig'i (24/7 Maslahat)",
      emergencyDesc:
        "O'tkir tish og'rig'i, pulpit yoki plomba tushib ketganda 2 bosqichli mikro-anesteziya qo'llaniladi (avval mevali muzlatuvchi gel surtiladi, igna sezilmaydi). Og'riq qabulning ilk daqiqalaridayoq to'liq qoldiriladi.",
      hoursTitle: "Qabul Vaqti va Onlayn Yozilish",
      hoursDesc:
        "Dushanba – Shanba: 08:30 – 18:30. Yakshanba: oldindan yozilish orqali. Saytimiz orqali navbatsiz, qulay kun va soatni oldindan tanlab yozilish imkoniyati mavjud.",
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
        "Имплантация MegaGen (Южная Корея), брекеты Damon, монолитные коронки из циркония CAD/CAM, виниры E-max, элайнеры, клиническое отбеливание Philips Zoom! 4, 3D-сканирование Shining 3D и лечение зубов без боли.",
      emergencyTitle: "Неотложная Помощь при Зубной Боли",
      emergencyDesc:
        "При острой зубной боли (пульпит, периодонтит, скол зуба) применяется бережная двухэтапная анестезия (обезболивающий гель перед уколом, 100% без боли).",
      hoursTitle: "Часы Приёма и Онлайн Запись",
      hoursDesc:
        "Понедельник – Суббота: 08:30 – 18:30. Воскресенье: по предварительной записи. Доступна удобная онлайн-запись на приём без очередей.",
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
        "MegaGen biocompatible titanium implants, Damon orthodontic braces, monolithic zirconia crowns, Ivoclar E-max veneers, clear aligners, Philips Zoom! 4 whitening, and Shining 3D optical scanning.",
      emergencyTitle: "Emergency Dental Pain Relief",
      emergencyDesc:
        "Two-stage gentle anesthesia (topical numbing gel prior to gentle micro-injection) for immediate toothache relief, deep caries, and pulpitis treatments.",
      hoursTitle: "Operating Hours & Online Booking",
      hoursDesc:
        "Monday to Saturday: 08:30 – 18:30. Sunday: By appointment. Direct online scheduling available with zero waiting.",
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
