import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  DentalImplantFixture,
  DentalBracesIcon,
  DentalVeneerCrown,
  DentalSurgeryExtraction,
  DentalWhiteningZoom,
  IconCheckCircle,
} from "./MedicalIcons";

const guides = [
  {
    id: "implant-care",
    icon: <DentalImplantFixture className="w-5 h-5 text-primary" />,
    tab: { uz: "Implantdan Keyin", ru: "После Имплантации", en: "Post-Implant" },
    title: {
      uz: "Dental Implantatsiyasidan Keyingi Parvarish Qoidalari",
      ru: "Памятка Пациенту После Установки Имплантата",
      en: "Post-Implant Recovery & Care Guidelines",
    },
    dos: {
      uz: [
        "Dastlabki 2–3 soat davomida yonoqqa 15 daqiqadan sovuq kompress qo'ying",
        "Shifokor tavsiya etgan dori vositalarini o'z vaqtida qabul qiling",
        "Yumshoq, iliq taomlar (sho'rva, pyure) iste'mol qiling",
        "Antiseptik og'iz vannalarini (Xlorgeksidin 0.05%) ohista bajaring",
      ],
      ru: [
        "Прикладывайте холодный компресс к щеке по 15 минут в первые часы",
        "Принимайте назначенные препараты строго по рекомендации врача",
        "Употребляйте теплую мягкую пищу в первые 3-5 дней",
        "Делайте аккуратные ротовые ванночки с антисептиком без полоскания",
      ],
      en: [
        "Apply a cold pack to cheek for 15-minute intervals during first 3 hours",
        "Take prescribed medications strictly on schedule",
        "Eat lukewarm soft meals for the first 3-5 days",
        "Use gentle antiseptic mouth baths without vigorous swirling",
      ],
    },
    donts: {
      uz: [
        "3–5 kun issiq hammom, sauna va og'ir jismoniy mashqlardan tiyiling",
        "Implant o'rnatilgan tomonda qattiq ovqat chaynamang",
        "Yarani qo'l yoki til bilan tegmang",
      ],
      ru: [
        "Исключите баню, сауну и спорт на 3-5 дней",
        "Не жуйте твердую пищу на стороне операции",
        "Не трогайте ранку языком или руками",
      ],
      en: [
        "Avoid hot baths, saunas, and strenuous workouts for 3-5 days",
        "Do not chew hard foods on the surgical side",
        "Do not disturb the surgical site with tongue or fingers",
      ],
    },
  },
  {
    id: "braces-care",
    icon: <DentalBracesIcon className="w-5 h-5 text-brandOrange" />,
    tab: { uz: "Breket & Elayner", ru: "Брекеты и Капы", en: "Braces & Aligners" },
    title: {
      uz: "Breketlar va Ko'rinmas Elaynerlarni Parvarishlash",
      ru: "Уход за Брекетами и Элайнерами",
      en: "Braces & Clear Aligners Hygiene Guide",
    },
    dos: {
      uz: [
        "Har bir ovqatlanishdan keyin maxsus ortodontik cho'tka va yorshikdan foydalaning",
        "Tishlar orasini tozalash uchun tish ipi (floss) va irrigator qo'llang",
        "Elaynerlarni har kuni iliq suv va cho'tka bilan tozalab turing",
      ],
      ru: [
        "Чистите зубы после каждого приема пищи специальной орто-щеткой",
        "Используйте зубную нить (суперфлосс) и ирригатор",
        "Промывайте элайнеры прохладной водой с мылом или спец-пастой",
      ],
      en: [
        "Clean brackets after every meal with an orthodontic toothbrush",
        "Floss daily and use a water flosser for interdental spaces",
        "Rinse and brush aligners with lukewarm water daily",
      ],
    },
    donts: {
      uz: [
        "Qattiq yong'oq, suxarik, muz yoki yopishqoq saqich va iris chaynash taqiqlanadi",
        "Olma va qattiq sabzavotlarni butunlay tishlamang, maydalab yeng",
      ],
      ru: [
        "Запрещено грызть орехи, сухарики, леденцы и жевать жвачку",
        "Нарезайте твердые фрукты на кусочки перед едой",
      ],
      en: [
        "Avoid chewing ice, nuts, hard candy, or sticky gum",
        "Cut apples and raw vegetables into small pieces before eating",
      ],
    },
  },
  {
    id: "crown-veneer-care",
    icon: <DentalVeneerCrown className="w-5 h-5 text-primary" />,
    tab: { uz: "Karonka & Vinirlar", ru: "Коронки и Виниры", en: "Crowns & Veneers" },
    title: {
      uz: "Sirkon Karonkalar va E-max Vinirlarni Uzoq Yillar Asrash",
      ru: "Уход за Циркониевыми Коронками и Винирами",
      en: "Long-term Care for Crowns and Veneers",
    },
    dos: {
      uz: [
        "Yumshoq cho'tka va abraziv bo'lmagan tish pastasi bilan kuniga 2 mahal yuving",
        "Har 6 oyda Dr. Ozodbek Otaxonov ko'rigidan va gigiyenadan o'ting",
        "Tishlar orasidagi tozalikni irrigator bilan ta'minlang",
      ],
      ru: [
        "Чистите зубы 2 раза в день мягкой щеткой и неабразивной пастой",
        "Посещайте профилактический осмотр каждые 6 месяцев",
        "Используйте ирригатор для здоровья десневого края",
      ],
      en: [
        "Brush twice daily with a soft toothbrush and low-abrasive paste",
        "Visit Dr. Ozodbek for routine checkups and polishing every 6 months",
        "Use a water flosser to maintain clean, healthy gum lines",
      ],
    },
    donts: {
      uz: [
        "Old tishlar bilan pista, yong'oq po'chog'i yoki qattiq narsalarni chaqmang",
        "Tishlar bilan ip yoki qadoqlarni ochmang",
      ],
      ru: [
        "Не разгрызайте передними зубами скорлупу орехов и семечки",
        "Не открывайте зубами упаковки и пробки",
      ],
      en: [
        "Never crack nutshells, bones, or bottle caps with front teeth",
        "Do not use teeth as scissors or tools to tear packaging",
      ],
    },
  },
  {
    id: "extraction-care",
    icon: <DentalSurgeryExtraction className="w-5 h-5 text-primary" />,
    tab: { uz: "Tish Olinganda", ru: "После Удаления", en: "Extraction Care" },
    title: {
      uz: "Tish Olingandan Keyingi Birinchi Yordam va Qoidalar",
      ru: "Рекомендации После Удаления Зуба",
      en: "Post-Extraction Recovery Care",
    },
    dos: {
      uz: [
        "Qo'yilgan dokani 20 daqiqadan so'ng ohista olib tashlang",
        "Dastlabki 2 soat davomida ovqat yemang va issiq ichimliklar ichmang",
        "Shifokor yozgan tavsiyalarga qat'iy rioya qiling",
      ],
      ru: [
        "Удалите марлевый тампон через 20 минут",
        "Не принимайте пищу и горячее питье в течение 2 часов",
        "Строго следуйте выданным назначениям врача",
      ],
      en: [
        "Gently remove the gauze compress after 20 minutes",
        "Refrain from eating and hot beverages for at least 2 hours",
        "Follow doctor instructions closely",
      ],
    },
    donts: {
      uz: [
        "Og'izni qattiq chayqash va qon quyqasini tushirib yuborish qat'iyan man etiladi",
        "Somsa, sho'rva kabi issiq ovqatlar va hammomdan saqlaning",
        "Trubochka (naycha) orqali ichmang",
      ],
      ru: [
        "Категорически запрещено интенсивно полоскать рот (сохраняйте сгусток)",
        "Избегайте горячей ванны и горячей еды в первые сутки",
        "Не пейте напитки через соломинку",
      ],
      en: [
        "Do not vigorously rinse or spit (the blood clot must be protected)",
        "Avoid hot showers, saunas, and hot soup on day one",
        "Do not drink through a straw",
      ],
    },
  },
  {
    id: "whitening-care",
    icon: <DentalWhiteningZoom className="w-5 h-5 text-brandOrange" />,
    tab: { uz: "Oqartirishdan So'ng", ru: "После Отбеливания", en: "After Whitening" },
    title: {
      uz: "Tish Oqartirishdan Keyingi «Oq Parhez» (White Diet)",
      ru: "«Белая диета» После Профессионального Отбеливания",
      en: "The «White Diet» After Teeth Whitening",
    },
    dos: {
      uz: [
        "Dastlabki 48 soat davomida faqat oq rangli ovqatlar (tuxum oqi, sut, guruch, tovuq go'shti) yeng",
        "Suvni ko'proq iching va ftorli tish pastasidan foydalaning",
      ],
      ru: [
        "Соблюдайте «белую диету» первые 48 часов (рис, курица, белая рыба, молоко)",
        "Используйте укрепляющую эмаль пасту с фтором",
      ],
      en: [
        "Stick to the 'White Diet' for 48 hours (rice, chicken, milk, egg whites)",
        "Drink plenty of water and use remineralizing fluoride toothpaste",
      ],
    },
    donts: {
      uz: [
        "Qahva, qora choy, qizil sharob, kola va lavlagi kabi bo'yoqli mahsulotlardan 3 kun tiyiling",
        "Chekishdan kamida 48 soat davomida saqlaning",
      ],
      ru: [
        "Исключите кофе, крепкий чай, колу, свеклу и красное вино на 3 дня",
        "Воздержитесь от курения минимум на 48 часов",
      ],
      en: [
        "Avoid coffee, dark tea, red wine, berries, and soy sauce for 3 days",
        "Avoid smoking for at least 48 hours",
      ],
    },
  },
];

const PatientCareGuides = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(guides[0]);

  return (
    <section className="py-12 sm:py-16 bg-white rounded-3xl border border-amber-200 p-5 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {lang === "uz" ? "BEMORLAR UCHUN ESLATMA" : lang === "ru" ? "ПАМЯТКА ПАЦИЕНТАМ" : "PATIENT AFTERCARE"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
            {lang === "uz"
              ? "Muolajadan Keyingi Foydali Qoidalar va Parvarish"
              : lang === "ru"
              ? "Рекомендации и Уход После Лечения"
              : "Post-Treatment Recovery & Care Guidelines"}
          </h2>
          <p className="text-sm text-slate-600">
            {lang === "uz"
              ? "Davolash natijasi uzoq yillar mustahkam saqlanishi uchun Dr. Ozodbek Otaxonovning klinik tavsiyalari."
              : lang === "ru"
              ? "Клинические советы Д-ра Озодбека Отахонова для сохранения идеального результата на долгие годы."
              : "Doctor recommendations to ensure optimal healing and long-lasting treatment success."}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {guides.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveTab(g)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab.id === g.id
                  ? "bg-primary text-white shadow-luxury scale-105"
                  : "bg-amber-50/80 hover:bg-amber-100/70 text-slate-700 border border-amber-200/60"
              }`}
            >
              <span>{g.icon}</span>
              <span>{g.tab[lang]}</span>
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-amber-200 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-amber-100 text-primary flex items-center justify-center">
              {activeTab.icon}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-classic">
              {activeTab.title[lang]}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* DOS */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <IconCheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{lang === "uz" ? "NIMALARNI QILISH KERAK (TAVSIYALAR):" : lang === "ru" ? "ЧТО НУЖНО ДЕЛАТЬ (РЕКОМЕНДАЦИИ):" : "WHAT TO DO (RECOMMENDED):"}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {activeTab.dos[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONTS */}
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/70 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{lang === "uz" ? "NIMALARNI QILISH MUMKIN EMAS (CHEKLOVLAR):" : lang === "ru" ? "ЧЕГО ДЕЛАТЬ НЕЛЬЗЯ (ОГРАНИЧЕНИЯ):" : "WHAT TO AVOID (RESTRICTIONS):"}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {activeTab.donts[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientCareGuides;
