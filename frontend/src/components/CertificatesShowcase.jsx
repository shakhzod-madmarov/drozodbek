import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { IconAward, IconCheckCircle, IconGraduationCap } from "./MedicalIcons";
import { useModalA11y } from "../hooks/useModalA11y";
import { getA11yLabels } from "../constants/a11yLabels";

const certificates = [
  {
    id: "cert-samarkand",
    year: "2026",
    org: "Samarkand State Medical University & MegaGen International",
    badge: {
      uz: "IMPLANTOLOGY & PROSTHODONTICS",
      ru: "ИМПЛАНТОЛОГИЯ И ОРТОПЕДИЯ",
      en: "IMPLANTOLOGY & PROSTHODONTICS",
    },
    title: {
      uz: "Implantology & Prosthodontics: From Surgery to Final Restoration",
      ru: "Имплантология и Ортопедия: От Хирургии до Финальной Реставрации",
      en: "Implantology & Prosthodontics: From Surgery to Final Restoration",
    },
    desc: {
      uz: "Samarqand Davlat Tibbiyot Universiteti hamda MegaGen International tomonidan o'tkazilgan xalqaro amaliy o'quv kursi sertifikati.",
      ru: "Сертификат международного курса Самаркандского государственного медицинского университета и MegaGen International.",
      en: "Certification of completion in surgical and prosthodontic restoration protocols from Samarkand State Medical University & MegaGen.",
    },
    image: "/certificates/cert_samarkand.webp",
  },
  {
    id: "cert-protocols",
    year: "2026",
    org: "MegaGen For Lifetime Smiles",
    badge: {
      uz: "XALQARO PRODVIJIK KURSI",
      ru: "ПРОДВИНУТЫЙ КУРС MEGAGEN",
      en: "ADVANCED SURGICAL PROTOCOLS",
    },
    title: {
      uz: "MegaGen Xirurgik va Ortopedik Protokollari: A dan Ya gacha",
      ru: "Хирургические и ортопедические протоколы MegaGen от А до Я",
      en: "MegaGen Surgical & Prosthetic Protocols from A to Z",
    },
    desc: {
      uz: "Biotitan implantlarni o'rnatish, yuklama berish va yakuniy restavratsiya protokollari bo'yicha xalqaro amaliy kurs sertifikati.",
      ru: "Международный сертификат продвинутого уровня по имплантологическим и ортопедическим протоколам MegaGen.",
      en: "Advanced masterclass certificate in complete surgical and prosthetic MegaGen protocols.",
    },
    image: "/certificates/cert_protocols.webp",
  },
  {
    id: "cert-navigation",
    year: "2025",
    org: "MegaGen International Clinical Network",
    badge: {
      uz: "NAVIGATSION JARROHLIK",
      ru: "НАВИГАЦИОННАЯ ХИРУРГИЯ",
      en: "GUIDED NAVIGATION SURGERY",
    },
    title: {
      uz: "Navigatsion Jarrohlik va Suyak-Plastik Shablonlar Master-Klassi",
      ru: "Курс по навигационной хирургии и костно-пластическим шаблонам",
      en: "Guided Navigation Surgery & Bone Grafting Templates",
    },
    desc: {
      uz: "3D kompyuter shablonlari asosida mikron aniqlikda minimal invaziv implant o'rnatish va suyak plastikasi sertifikati.",
      ru: "Сертификат по малоинвазивной точной установке имплантатов по 3D хирургическим шаблонам.",
      en: "Certification in computer-guided 3D navigation surgery and bone grafting template protocols.",
    },
    image: "/certificates/cert_navigation.webp",
  },
  {
    id: "cert-seminar",
    year: "2024",
    org: "MegaGen Uzbekistan",
    badge: {
      uz: "IMPLANTATSIYA SEMINARI",
      ru: "СЕМИНАР ПО ИМПЛАНТАЦИИ",
      en: "SEMINAR ON IMPLANTATION",
    },
    title: {
      uz: "Dental Implantologiya va Zamonaviy Xirurgiya Seminari",
      ru: "Семинар по дентальной имплантации и хирургии",
      en: "Specialized Seminar on Dental Implantation",
    },
    desc: {
      uz: "MegaGen Uzbekistan o'quv markazida biotitan implantatsiya bo'yicha intensiv seminar diplomi.",
      ru: "Диплом участника интенсивного семинара по дентальной имплантации MegaGen.",
      en: "Certificate of appreciation for successful completion of clinical seminar on implantation.",
    },
    image: "/certificates/cert_seminar.webp",
  },
];

const CertificatesShowcase = () => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const [activeCert, setActiveCert] = useState(null);
  const closeCert = () => setActiveCert(null);
  const modalRef = useModalA11y(Boolean(activeCert), closeCert);

  return (
    <section className="py-12 sm:py-16 bg-[#FFFDF9] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-100/70 text-amber-900 border border-amber-300/60">
            <IconAward className="w-4 h-4 text-brandOrange" />
            <span>
              {lang === "uz"
                ? "DIPLOM VA XALQARO SERTIFIKATLAR"
                : lang === "ru"
                ? "ДИПЛОМЫ И МЕЖДУНАРОДНЫЕ СЕРТИФИКАТЫ"
                : "DIPLOMAS & CLINICAL CERTIFICATIONS"}
            </span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A202C] tracking-tight font-serif-classic">
            {lang === "uz"
              ? "Tasdiqlangan Tibbiy Malaka & Xalqaro Diplomlar"
              : lang === "ru"
              ? "Подтверждённая Квалификация и Международные Сертификаты"
              : "Verified Medical Credentials & Honors"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {lang === "uz"
              ? "Dr. Ozodbek Otaxonov — Ukraina stomatologiya tibbiyot akademiyasi bakalavri hamda MegaGen xalqaro implantologiya markazlarining sertifikatlangan amaliyotchi vrachidir."
              : lang === "ru"
              ? "Д-р Озодбек Отахонов — выпускник Украинской медицинской стоматологической академии и сертифицированный специалист международных программ MegaGen."
              : "Dr. Ozodbek Otaxonov holds a Bachelor's degree from the Ukrainian Medical Stomatological Academy and verified MegaGen international surgical certifications."}
          </p>
        </div>

        {/* Education Highlight Banner */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
            <IconGraduationCap className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white border border-amber-200 text-[10px] font-black uppercase tracking-wider text-primary mb-1">
              {lang === "uz" ? "ASOSIY OLIY TIBBIY MA'LUMOT" : lang === "ru" ? "ВЫСШЕЕ МЕДИЦИНСКОЕ ОБРАЗОВАНИЕ" : "PRIMARY MEDICAL DEGREE"}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {lang === "uz"
                ? "Ukraina stomatologiya tibbiyot akademiyasi (Bakalavr)"
                : lang === "ru"
                ? "Украинская медицинская стоматологическая академия (Бакалавр)"
                : "Ukrainian Medical Stomatological Academy (Bachelor of Dentistry)"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {lang === "uz"
                ? "10 yillik tinimsiz amaliy klinik tajriba, 1,000+ muvaffaqiyatli restavratsiya va implantatsiya ishlari."
                : lang === "ru"
                ? "10 лет клинической практики, более 1 000 успешных реставраций и операций по имплантации."
                : "10 years of dedicated clinical dentistry practice and over 1,000 successful smile restorations."}
            </p>
          </div>
        </div>

        {/* 4 Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              onClick={() => setActiveCert(cert)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveCert(cert);
                }
              }}
              className="group bg-white rounded-3xl p-5 border border-amber-200/70 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {/* Brand Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-brandOrange to-brandCyan" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 truncate">
                    {cert.badge[lang]}
                  </span>
                  <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-0.5 rounded-full shrink-0">
                    {cert.year}
                  </span>
                </div>

                {/* Certificate Thumbnail Preview */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-4 group-hover:scale-[1.02] transition-transform">
                  <img
                    src={cert.image}
                    alt={cert.title[lang]}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <span className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                    🔍 {lang === "uz" ? "Ko'rish" : lang === "ru" ? "Открыть" : "View"}
                  </span>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wider text-brandOrange mb-1">
                  {cert.org}
                </p>
                <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                  {cert.title[lang]}
                </h4>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {cert.desc[lang]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
                <span>{lang === "uz" ? "Tasdiqlangan hujjat" : lang === "ru" ? "Подтверждён" : "Verified"}</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <IconCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>MegaGen</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox for Full-Size Certificate Inspection */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={a11y.certificateModal}
          ref={modalRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeCert}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {activeCert.org} ({activeCert.year})
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {activeCert.title[lang]}
                </h3>
              </div>
              <button
                onClick={closeCert}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-900 border flex items-center justify-center">
              <img
                src={activeCert.image}
                alt={activeCert.title[lang]}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeCert.desc[lang]}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesShowcase;
