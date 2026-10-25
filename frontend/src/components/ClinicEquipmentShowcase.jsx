import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useLanguage } from "../context/LanguageContext";
import {
  IconShieldCheck,
  IconSparkleStar,
  IconAward,
  IconCheckCircle,
} from "./MedicalIcons";

/**
 * ClinicEquipmentShowcase:
 * Highlights Dr. Ozodbek Otaxonov's authentic modern operatory,
 * Shining 3D Intraoral Scanner, and Philips Zoom! WhiteSpeed system.
 */
export default function ClinicEquipmentShowcase() {
  const { lang } = useLanguage();
  const [activeModalImage, setActiveModalImage] = useState(null);

  const T = {
    uz: {
      badge: "ZAMONAVIY TEXNOLOGIYALAR VA KLINIKA",
      title: "Raqamli Stomatologiya va Premium Jihozlar",
      subtitle:
        "Dr. Ozodbek Otaxonov qabulxonasida qo'llaniladigan yuqori texnologiyali apparatlar — pastasiz 3D skanerlash, dunyo tan olgan Philips Zoom! oqartirishi va mutlaq steril muhit.",
      zoomTip: "Rasmni kattalashtirish uchun bosing",
      items: [
        {
          id: "scanner",
          badge: "3D RAQAMLI SKANERLASH · 0% SLEPOK",
          title: "Shining 3D IntraoralScan — Raqamli 3D Skaner",
          desc: "Bemorlarda noqulaylik va ko'ngil aynishini keltirib chiqaradigan yopishqoq silikon 'slepok' (pasta) massalariga chek qo'yildi. 2 daqiqada butun jag' rangli 3D formatda mikron aniqlikda skanerlanadi.",
          image: assets.scanner_3d,
          aspect: "aspect-[4/5]",
          specs: [
            "Mikron darajasidagi o'ta yuqori CAD/CAM aniqligi",
            "Sirkon karonka, E-max vinir va elaynerlar uchun ideal zichlik",
            "Bemor o'z jag'ining 3D modelini darhol ekranda ko'ra oladi",
            "Slepok pastasiz — 100% qusish refleksisiz va qulay",
          ],
          tag: "Raqamli Texnologiya",
        },
        {
          id: "zoom",
          badge: "PHILIPS ZOOM! 4 · WHITESPEED",
          title: "Philips Zoom! WhiteSpeed — Dunyo №1 Oqartirish",
          desc: "Dunyodagi eng nufuzli va xavfsiz fototish oqartirish stansiyasi. 45 daqiqada tishlarni 6–8 tongacha oqartiradi, sovuq LED nuri esa emalni qizdirmaydi va ziyon yetkazmaydi.",
          image: assets.philips_zoom,
          aspect: "aspect-[4/3]",
          specs: [
            "1 seansda (45 daqiqa) 6–8 tongacha oqarish kafolati",
            "Emal emirilishiga 0% ziyon (Cold LED nuri)",
            "Relief ACP maxsus geli yordamida sezuvchanliksiz natija",
            "AQSH va Niderlandiya xalqaro xavfsizlik sertifikatiga ega",
          ],
          tag: "Dunyodagi Eng Nufuzli Oqartirish",
        },
        {
          id: "room",
          badge: "KLINIK KABINET · 100% STERIL",
          title: "Dr. Ozodbek Otaxonovning Shaxsiy Kabineti",
          desc: "Ergonomik qulay kreslo, toza va salqin Sitronic mikroiqlimi, zamonaviy kompyuterlashtirilgan shifokor stansiyasi hamda ko'z o'ngingizda ochiladigan steril kraft-paketlar.",
          image: assets.clinic_room,
          aspect: "aspect-[4/3]",
          specs: [
            "Anatomik bosh suyanchig'iga ega relaks bemor kreslosi",
            "100% Anti-SPID / Anti-Gepatit avtoklav sterilizatsiyasi",
            "MegaGen xalqaro implantologiya sertifikatlari bilan jihozlangan",
            "Toza mikroiqlim va zamonaviy ergonomik sharoit",
          ],
          tag: "Steril va Qulay Muhit",
        },
      ],
    },
    ru: {
      badge: "СОВРЕМЕННЫЕ ТЕХНОЛОГИИ И КЛИНИКА",
      title: "Цифровая Стоматология и Премиальное Оснащение",
      subtitle:
        "Высокотехнологичное оборудование в кабинете Д-ра Озодбека Отахонова — 3D-сканирование без слепков, легендарное отбеливание Philips Zoom! и абсолютная стерильность.",
      zoomTip: "Нажмите для увеличения фото",
      items: [
        {
          id: "scanner",
          badge: "ИНТРАОРАЛЬНЫЙ 3D СКАНЕР · БЕЗ СЛЕПКОВ",
          title: "Интраоральный 3D-Сканер Shining 3D",
          desc: "Забудьте о неприятных слепочных массах и рвотном рефлексе. Оптический 3D-сканер за 2 минуты создаёт сверхточную трёхмерную цифровую модель зубов и челюсти.",
          image: assets.scanner_3d,
          aspect: "aspect-[4/5]",
          specs: [
            "Микронная точность для моделирования коронок CAD/CAM",
            "Идеальная посадка циркония, виниров и прозрачных элайнеров",
            "Мгновенный просмотр 3D-модели на мониторе в присутствии пациента",
            "100% комфорт без слепочной массы и паст",
          ],
          tag: "Цифровая Стоматология",
        },
        {
          id: "zoom",
          badge: "PHILIPS ZOOM! 4 · WHITESPEED",
          title: "Philips Zoom! WhiteSpeed — Отбеливание №1 в Мире",
          desc: "Золотой мировой стандарт клинического отбеливания зубов. Осветляет эмаль на 6–8 тонов всего за 45 минут. Холодный LED-свет абсолютно безопасен для эмали и дентина.",
          image: assets.philips_zoom,
          aspect: "aspect-[4/3]",
          specs: [
            "Осветление на 6–8 тонов за одну процедуру (45 мин)",
            "Холодный свет LED не нагревает эмаль и пульпу (0% вреда)",
            "Защитный гель Relief ACP предотвращает чувствительность",
            "Международная сертификация безопасности (США / Нидерланды)",
          ],
          tag: "Мировой Стандарт Отбеливания",
        },
        {
          id: "room",
          badge: "КАБИНЕТ ВРАЧА · 100% СТЕРИЛЬНОСТЬ",
          title: "Персональный Кабинет Д-ра Озодбека Отахонова",
          desc: "Современное эргономичное кресло с анатомической поддержкой, климат-контроль Sitronic, цифровое рабочее место и вскрытие индивидуальных крафт-пакетов при вас.",
          image: assets.clinic_room,
          aspect: "aspect-[4/3]",
          specs: [
            "Анатомическое кресло для максимального расслабления",
            "100% стерильность по европейским протоколам Анти-СПИД / Гепатит",
            "Официальные дипломы и сертификаты имплантологии MegaGen",
            "Чистый микроклимат и премиальные санитарные условия",
          ],
          tag: "Стерильная Зона Комфорта",
        },
      ],
    },
    en: {
      badge: "ADVANCED TECHNOLOGY & CLINIC TOUR",
      title: "Digital Dentistry & State-of-the-Art Equipment",
      subtitle:
        "Cutting-edge clinical hardware in Dr. Ozodbek Otaxonov's operatory — impression-free optical 3D scanning, world-renowned Philips Zoom! whitening, and hospital-grade sterility.",
      zoomTip: "Click to inspect high-resolution photography",
      items: [
        {
          id: "scanner",
          badge: "3D INTRAORAL SCANNER · NO IMPRESSION PASTE",
          title: "Shining 3D IntraoralScan — Optical 3D Scanner",
          desc: "Eliminates gagging and messy impression trays. In just 2 minutes, high-speed optical scanning captures your full dental arch in true-color 3D with micron precision.",
          image: assets.scanner_3d,
          aspect: "aspect-[4/5]",
          specs: [
            "Micron-level CAD/CAM accuracy for digital crown milling",
            "Flawless fit for monolithic zirconia, E-max veneers & aligners",
            "Instant 3D arch visualization directly on the digital monitor",
            "Zero messy silicone paste — effortless, comfortable experience",
          ],
          tag: "Digital Dentistry",
        },
        {
          id: "zoom",
          badge: "PHILIPS ZOOM! 4 · WHITESPEED",
          title: "Philips Zoom! WhiteSpeed — Global #1 Whitening",
          desc: "The world's most prestigious clinical whitening technology. Brightens teeth by 6–8 shades in a 45-minute appointment with cold LED light that protects enamel and dental pulp.",
          image: assets.philips_zoom,
          aspect: "aspect-[4/3]",
          specs: [
            "6–8 shades brighter in a single 45-minute treatment",
            "Cold LED photo-activation prevents thermal enamel stress",
            "Relief ACP formula protects against post-treatment sensitivity",
            "Internationally certified for safety and enamel longevity",
          ],
          tag: "Gold Standard Whitening",
        },
        {
          id: "room",
          badge: "TREATMENT OPERATORY · 100% STERILE",
          title: "Dr. Ozodbek Otaxonov's Treatment Room",
          desc: "Ergonomic dental chair with anatomical support, Sitronic microclimate air purification, computerized diagnostics, and sterile kraft pouches unsealed right in front of you.",
          image: assets.clinic_room,
          aspect: "aspect-[4/3]",
          specs: [
            "Anatomical relaxation dental chair with multi-axis headrest",
            "100% sterile Class B vacuum autoclaving (Anti-HIV & Hepatitis)",
            "Decorated with verified MegaGen international credentials",
            "Pristine climate-controlled, hygienic clinical operatory",
          ],
          tag: "Hospital-Grade Sterility",
        },
      ],
    },
  };

  const t = T[lang] || T.uz;

  return (
    <section className="py-12 sm:py-16 space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-primary/5 text-primary border border-primary/20 shadow-2xs">
          <IconSparkleStar className="w-3.5 h-3.5 text-primary" />
          <span>{t.badge}</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 3-Card Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 [perspective:1200px]">
        {t.items.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl border border-amber-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden [transform-style:preserve-3d]"
          >
            <div>
              {/* Photo Showcase with Click-to-Zoom */}
              <div
                onClick={() => setActiveModalImage(item)}
                className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 cursor-pointer [transform-style:preserve-3d]"
                title={t.zoomTip}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-[10px] font-bold tracking-wider text-amber-300 border border-amber-400/30 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>{item.badge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white border border-white/20 shadow-xs">
                    <span>🔍</span>
                  </span>
                </div>

                {/* Bottom Tag on Image */}
                <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-semibold border border-white/15">
                    <IconShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.tag}</span>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors font-serif-classic leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* 4 Clinical Specs */}
                <div className="space-y-2 pt-2 border-t border-amber-100/70">
                  {item.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <IconCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveModalImage(item)}
                className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/70 text-slate-800 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🔍 {t.zoomTip}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for High-Resolution View */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg font-bold backdrop-blur-md transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="max-h-[75vh] w-full flex items-center justify-center bg-black">
              <img
                src={activeModalImage.image}
                alt={activeModalImage.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-6 bg-slate-900 border-t border-white/10 text-white space-y-1">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                {activeModalImage.badge}
              </span>
              <h4 className="text-lg font-bold font-serif-classic">
                {activeModalImage.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {activeModalImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
