import React, { useState, useRef, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { IconAward, IconCheckCircle, IconGraduationCap, IconSparkleStar } from "./MedicalIcons";
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

// Single 3D Certificate Card with Cursor-Following Holographic Gold Sheen
const Certificate3DCard = ({ cert, lang, onSelect }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 7;
    const rotateX = -((y - centerY) / centerY) * 6;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  }, []);

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={() => onSelect(cert)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(cert);
        }
      }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.active ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className="group relative bg-white rounded-3xl p-5 border border-amber-300/80 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary [transform-style:preserve-3d]"
    >
      {/* Golden metallic accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

      {/* Holographic Gold Sheen Glare */}
      {tilt.active && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl z-20"
          style={{
            background: `radial-gradient(circle 250px at ${tilt.glareX}% ${tilt.glareY}%, rgba(253, 230, 138, 0.45), transparent 75%)`,
          }}
        />
      )}

      <div className="[transform-style:preserve-3d]">
        <div className="flex items-center justify-between gap-2 mb-3 pt-1 translate-z-20">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 truncate">
            {cert.badge[lang]}
          </span>
          <span className="text-[11px] font-black text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-lg shrink-0 border border-amber-300/60 shadow-2xs">
            {cert.year}
          </span>
        </div>

        {/* Certificate Thumbnail Preview Frame */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-amber-200/90 mb-4 group-hover:scale-[1.02] transition-transform duration-300 translate-z-30 shadow-md">
          <img
            src={cert.image}
            alt={cert.title[lang]}
            width={600}
            height={450}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
          <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-xs text-amber-200 text-[10px] font-bold border border-amber-300/30 flex items-center gap-1 shadow-md">
            <span>🔍</span>
            <span>{lang === "uz" ? "Kattalashtirish" : lang === "ru" ? "Открыть 3D" : "Inspect"}</span>
          </span>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-wider text-brandOrange mb-1 translate-z-10">
          {cert.org}
        </p>
        <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors translate-z-20">
          {cert.title[lang]}
        </h4>
        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
          {cert.desc[lang]}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-primary translate-z-20">
        <span className="text-slate-600 text-[11px]">
          {lang === "uz" ? "Rasmiy akkreditatsiya" : lang === "ru" ? "Официальный диплом" : "Official credential"}
        </span>
        <span className="text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/50">
          <IconCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>MegaGen</span>
        </span>
      </div>
    </div>
  );
};

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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200/60 shadow-2xs">
            <IconAward className="w-3.5 h-3.5 text-brandOrange" />
            <span>
              {lang === "uz"
                ? "Diplom va Xalqaro Sertifikatlar"
                : lang === "ru"
                ? "Дипломы и Сертификаты"
                : "Diplomas & Certifications"}
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
              ? "Dr. Ozodbek Otaxonov — Ukraina Stomatologiya Tibbiyot Akademiyasi bakalavri hamda MegaGen xalqaro implantologiya markazlarining sertifikatlangan amaliyotchi vrachidir."
              : lang === "ru"
              ? "Д-р Озодбек Отахонов — выпускник Украинской Медицинской Стоматологической Академии и сертифицированный специалист международных программ MegaGen."
              : "Dr. Ozodbek Otaxonov holds a Bachelor's degree from the Ukrainian Medical Stomatological Academy and verified MegaGen international surgical certifications."}
          </p>
        </div>

        {/* Education Highlight Banner with 3D Depth */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left [transform-style:preserve-3d]">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-brandOrange text-white flex items-center justify-center shrink-0 shadow-lg border border-white/40">
            <IconGraduationCap className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-red-50 border border-red-200/60 text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">
              {lang === "uz" ? "Asosiy Oliy Tibbiy Ma'lumot" : lang === "ru" ? "Высшее Медицинское Образование" : "Primary Medical Degree"}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-classic">
              {lang === "uz"
                ? "Ukraina Stomatologiya Tibbiyot Akademiyasi (Bakalavr)"
                : lang === "ru"
                ? "Украинская Медицинская Стоматологическая Академия (Бакалавр)"
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

        {/* 4 Interactive 3D Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:1200px]">
          {certificates.map((cert) => (
            <Certificate3DCard
              key={cert.id}
              cert={cert}
              lang={lang}
              onSelect={setActiveCert}
            />
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={closeCert}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative border border-amber-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {activeCert.org} ({activeCert.year})
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-classic">
                  {activeCert.title[lang]}
                </h3>
              </div>
              <button
                onClick={closeCert}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-amber-200/50 flex items-center justify-center p-2 shadow-inner">
              <img
                src={activeCert.image}
                alt={activeCert.title[lang]}
                className="max-h-[65vh] w-auto object-contain mx-auto rounded-lg"
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
