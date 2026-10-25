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
 * Simple classic medical UI/UX matching the rest of the website.
 * Features Dr. Ozodbek Otaxonov's authentic operatory,
 * Shining 3D Intraoral Scanner, and Philips Zoom! WhiteSpeed system.
 */
export default function ClinicEquipmentShowcase() {
  const { lang } = useLanguage();
  const [activeModalItem, setActiveModalItem] = useState(null);

  const T = {
    uz: {
      badge: "ZAMONAVIY TEXNOLOGIYALAR VA KLINIKA",
      title: "Raqamli Stomatologiya va Premium Jihozlar",
      subtitle:
        "Dr. Ozodbek Otaxonov qabulxonasida qo'llaniladigan yuqori texnologiyali apparatlar — pastasiz 3D skanerlash, dunyo tan olgan Philips Zoom! oqartirishi va mutlaq steril muhit.",
      viewPhoto: "Suratni ko'rish",
      items: [
        {
          id: "scanner",
          category: "3D Raqamli Skaner",
          warrantyBadge: "Mikron Aniq",
          pill: "Pastasiz · 3D Skan",
          icon: <IconSparkleStar className="w-6 h-6 text-brandCyan" />,
          title: "Shining 3D IntraoralScan 3D Skaneri",
          desc: "Bemorlarda ko'ngil aynishini chaqiruvchi noqulay silikon va gips 'slepok' (pasta) massalarisiz, 2 daqiqada butun jag'ni rangli 3D formatda optik skanerlash.",
          image: assets.scanner_3d,
          specs: [
            "Mikron darajasidagi o'ta yuqori CAD/CAM aniqligi",
            "Sirkon karonka, E-max vinir va elaynerlar uchun ideal zichlik",
            "Bemor o'z jag'ining 3D modelini darhol ekranda ko'ra oladi",
            "Slepok pastasiz — 100% qusish refleksisiz va qulay",
          ],
        },
        {
          id: "zoom",
          category: "Philips Zoom! 4",
          warrantyBadge: "AQSH Texnologiyasi",
          pill: "6–8 Ton Oqartirish",
          icon: <IconAward className="w-6 h-6 text-brandOrange" />,
          title: "Philips Zoom! WhiteSpeed Oqartirish",
          desc: "Dunyodagi eng nufuzli va xavfsiz fototish oqartirish stansiyasi. 45 daqiqada tishlarni 6–8 tongacha oqartiradi, sovuq LED nuri esa emalga ziyon yetkazmaydi.",
          image: assets.philips_zoom,
          specs: [
            "1 seansda (45 daqiqa) 6–8 tongacha oqarish kafolati",
            "Emal emirilishiga 0% ziyon (Cold LED sovuq nuri)",
            "Relief ACP maxsus geli yordamida sezuvchanliksiz natija",
            "Xalqaro xavfsizlik va uzoq muddatli oqlik sertifikati",
          ],
        },
        {
          id: "room",
          category: "Shaxsiy Kabinet",
          warrantyBadge: "Anti-SPID/Gepatit",
          pill: "100% Steril Muhit",
          icon: <IconShieldCheck className="w-6 h-6 text-primary" />,
          title: "Dr. Ozodbek Otaxonovning Shaxsiy Kabineti",
          desc: "Ergonomik qulay bemor kreslosi, toza va salqin Sitronic mikroiqlimi, zamonaviy shifokor stansiyasi hamda ko'z o'ngingizda ochiladigan steril kraft-paketlar.",
          image: assets.clinic_room,
          specs: [
            "Anatomik bosh suyanchig'iga ega relaks bemor kreslosi",
            "100% Anti-SPID / Anti-Gepatit avtoklav sterilizatsiyasi",
            "MegaGen xalqaro implantologiya sertifikatlari bilan jihozlangan",
            "Salqin mikroiqlim va zamonaviy sanitariya sharoiti",
          ],
        },
      ],
    },
    ru: {
      badge: "СОВРЕМЕННЫЕ ТЕХНОЛОГИИ И КЛИНИКА",
      title: "Цифровая Стоматология и Премиальное Оснащение",
      subtitle:
        "Высокотехнологичное оборудование в кабинете Д-ра Озодбека Отахонова — 3D-сканирование без слепков, легендарное отбеливание Philips Zoom! и абсолютная стерильность.",
      viewPhoto: "Смотреть фото",
      items: [
        {
          id: "scanner",
          category: "3D-Сканирование",
          warrantyBadge: "Высокая точность",
          pill: "Без слепков",
          icon: <IconSparkleStar className="w-6 h-6 text-brandCyan" />,
          title: "Интраоральный 3D-Сканер Shining 3D",
          desc: "Забудьте о неприятных слепочных массах и рвотном рефлексе. Оптический 3D-сканер за 2 минуты создаёт сверхточную трёхмерную цифровую модель зубов и челюсти.",
          image: assets.scanner_3d,
          specs: [
            "Микронная точность для моделирования коронок CAD/CAM",
            "Идеальная посадка циркония, виниров и прозрачных элайнеров",
            "Мгновенный просмотр 3D-модели на мониторе в присутствии пациента",
            "100% комфорт без слепочной массы и паст",
          ],
        },
        {
          id: "zoom",
          category: "Philips Zoom! 4",
          warrantyBadge: "Стандарт США",
          pill: "Осветление 6–8 тонов",
          icon: <IconAward className="w-6 h-6 text-brandOrange" />,
          title: "Philips Zoom! WhiteSpeed (Zoom 4)",
          desc: "Золотой мировой стандарт клинического отбеливания зубов. Осветляет эмаль на 6–8 тонов всего за 45 минут. Холодный LED-свет абсолютно безопасен для эмали и дентина.",
          image: assets.philips_zoom,
          specs: [
            "Осветление на 6–8 тонов за одну процедуру (45 мин)",
            "Холодный свет LED не нагревает эмаль и пульпу (0% вреда)",
            "Защитный гель Relief ACP предотвращает чувствительность",
            "Международная сертификация безопасности и долговечный результат",
          ],
        },
        {
          id: "room",
          category: "Кабинет Врача",
          warrantyBadge: "Анти-СПИД / Гепатит",
          pill: "100% Стерильность",
          icon: <IconShieldCheck className="w-6 h-6 text-primary" />,
          title: "Персональный Кабинет Д-ра Озодбека Отахонова",
          desc: "Современное эргономичное кресло с анатомической поддержкой, климат-контроль Sitronic, цифровое рабочее место и вскрытие индивидуальных крафт-пакетов при вас.",
          image: assets.clinic_room,
          specs: [
            "Анатомическое кресло для максимального расслабления",
            "100% стерильность по европейским протоколам Анти-СПИД / Гепатит",
            "Официальные дипломы и сертификаты имплантологии MegaGen",
            "Чистый микроклимат и премиальные санитарные условия",
          ],
        },
      ],
    },
    en: {
      badge: "ADVANCED TECHNOLOGY & CLINIC TOUR",
      title: "Digital Dentistry & State-of-the-Art Equipment",
      subtitle:
        "Cutting-edge clinical hardware in Dr. Ozodbek Otaxonov's operatory — impression-free optical 3D scanning, world-renowned Philips Zoom! whitening, and hospital-grade sterility.",
      viewPhoto: "Inspect photo",
      items: [
        {
          id: "scanner",
          category: "3D Optical Scanner",
          warrantyBadge: "Micron Precision",
          pill: "Impression-Free",
          icon: <IconSparkleStar className="w-6 h-6 text-brandCyan" />,
          title: "Shining 3D Intraoral Optical Scanner",
          desc: "Eliminates gagging and messy impression trays. In just 2 minutes, high-speed optical scanning captures your full dental arch in true-color 3D with micron precision.",
          image: assets.scanner_3d,
          specs: [
            "Micron-level CAD/CAM accuracy for digital crown milling",
            "Flawless fit for monolithic zirconia, E-max veneers & aligners",
            "Instant 3D arch visualization directly on the digital monitor",
            "Zero messy silicone paste — effortless, comfortable experience",
          ],
        },
        {
          id: "zoom",
          category: "Philips Zoom! 4",
          warrantyBadge: "US Technology",
          pill: "6–8 Shades Whiter",
          icon: <IconAward className="w-6 h-6 text-brandOrange" />,
          title: "Philips Zoom! WhiteSpeed (Zoom 4)",
          desc: "The world's most prestigious clinical whitening technology. Brightens teeth by 6–8 shades in a 45-minute appointment with cold LED light that protects enamel and dental pulp.",
          image: assets.philips_zoom,
          specs: [
            "6–8 shades brighter in a single 45-minute treatment",
            "Cold LED photo-activation prevents thermal enamel stress",
            "Relief ACP formula protects against post-treatment sensitivity",
            "Internationally certified for safety and enamel longevity",
          ],
        },
        {
          id: "room",
          category: "Private Operatory",
          warrantyBadge: "Hospital-Grade",
          pill: "100% Sterile",
          icon: <IconShieldCheck className="w-6 h-6 text-primary" />,
          title: "Dr. Ozodbek Otaxonov's Clinical Operatory",
          desc: "Ergonomic dental chair with anatomical support, Sitronic microclimate air purification, computerized diagnostics, and sterile kraft pouches unsealed right in front of you.",
          image: assets.clinic_room,
          specs: [
            "Anatomical relaxation dental chair with multi-axis headrest",
            "100% sterile Class B vacuum autoclaving (Anti-HIV & Hepatitis)",
            "Decorated with verified MegaGen international credentials",
            "Pristine climate-controlled, hygienic clinical operatory",
          ],
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
          <IconShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>{t.badge}</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 3-Card Grid Matching Simple Classic UI/UX */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]">
        {t.items.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl border border-amber-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2.5 hover:border-primary/50 overflow-hidden flex flex-col justify-between [transform-style:preserve-3d]"
          >
            <div>
              {/* Photo Banner with Zoom Depth & Simple Classic Clean Stickers */}
              <div
                onClick={() => setActiveModalItem(item)}
                className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950 cursor-pointer [transform-style:preserve-3d]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                {/* Visual Depth Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Clean, Refined Top Stickers: Category & Verification */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[10px] font-semibold tracking-wide text-white/95 border border-white/20 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{item.category}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[10px] font-semibold tracking-wide text-emerald-300 border border-emerald-400/30 shadow-xs">
                    <IconShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{item.warrantyBadge}</span>
                  </span>
                </div>
              </div>

              {/* Floating Medical Icon Disc & Clean Clinical Pill */}
              <div className="px-5 -mt-6 relative z-20 flex justify-between items-end">
                <span className="w-12 h-12 rounded-2xl bg-white shadow-xl border-2 border-amber-200/90 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-full shadow-2xs mb-1">
                  {item.pill}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-5 pt-3 space-y-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug font-serif-classic">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Clinical Specs */}
                <div className="space-y-1.5 pt-2 border-t border-amber-100 text-xs">
                  {item.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-[11px] leading-snug">{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simple Classic Footer Button */}
            <div className="p-5 pt-0 border-t border-amber-100/60 mt-2">
              <button
                onClick={() => setActiveModalItem(item)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-primary/5 hover:text-primary border border-slate-200/80 text-slate-700 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer group/btn"
              >
                <span>{t.viewPhoto}</span>
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for High-Resolution Inspection */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg font-bold backdrop-blur-md transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="max-h-[75vh] w-full flex items-center justify-center bg-black">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-6 bg-slate-900 border-t border-white/10 text-white space-y-1">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                {activeModalItem.category} · {activeModalItem.warrantyBadge}
              </span>
              <h4 className="text-lg font-bold font-serif-classic">
                {activeModalItem.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {activeModalItem.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
