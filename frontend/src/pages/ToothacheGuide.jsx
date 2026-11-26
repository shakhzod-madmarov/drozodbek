import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { DOCTOR_INFO } from "../constants/doctor";
import { PRIMARY_CLINIC } from "../constants/clinics";
import { PAGE_SEO, getPageKeywords } from "../constants/seo";
import Seo from "../components/Seo";
import FaqAccordion from "../components/FaqAccordion";
import ClinicLocationMap from "../components/ClinicLocationMap";
import { useBooking } from "../context/BookingContext";
import { buildToothacheGuideSchema } from "../utils/structuredData";
import {
  IconPhone,
  IconClock,
  IconShieldCheck,
  IconCheckCircle,
  IconSparkleStar,
  IconLocationPin,
} from "../components/MedicalIcons";

const SYMPTOM_CASES = [
  {
    serviceId: "ogriqsiz-tish-davolash",
    uz: {
      symptom: "Kechki payt yoki tunda tish qattiq zirqirab og'riyapti",
      cause: "O'tkir pulpit (tish nervi yallig'lanishi)",
      explanation:
        "Karies emal va dentindan o'tib tish nerviga yetganda boshlanadi. Kechasi gorizontal yotganingizda boshdagi qon bosimi ortib, shishgan nervni bosadi va og'riq kuchayadi.",
      action: "2 bosqichli anesteziyada nerv kanallarini 0% og'riq bilan tozalab davolash (soat 22:00 gacha qabul).",
    },
    ru: {
      symptom: "Зуб ноет или пульсирует вечером и ночью",
      cause: "Острый пульпит (воспаление зубного нерва)",
      explanation:
        "Инфекция из глубокого кариеса дошла до пульпы. Вечером и в положении лёжа приток крови усиливает давление внутри зуба, вызывая нестерпимую боль.",
      action: "Безболезненное лечение каналов под двухэтапной анестезией (приём до 22:00).",
    },
    en: {
      symptom: "Throbbing toothache that worsens in the evening or when lying down",
      cause: "Acute Pulpitis (Dental Nerve Inflammation)",
      explanation:
        "Deep decay has reached the dental pulp. Lying down increases cranial blood pressure around the inflamed nerve.",
      action: "Gentle root canal relief under two-stage anesthesia (open until 22:00).",
    },
  },
  {
    serviceId: "ogriqsiz-tish-davolash",
    uz: {
      symptom: "Muzdek suv, issiq choy yoki shirinlik yeganda keskin og'riq",
      cause: "Boshlang'ich yoki o'rta karies, emal yorilishi",
      explanation:
        "Tishning himoya emali yemirilganda tashqi harorat va shirin ta'm ochiq dentin kanallari orqali to'g'ridan-to'g'ri nervga uzatiladi.",
      action: "30 daqiqada kariesni tozalab 3M Filtek / Estelite plomba qo'yish (nervni saqlab qolish).",
    },
    ru: {
      symptom: "Резкая боль от холодной воды, горячего или сладкого",
      cause: "Поверхностный/средний кариес или микротрещина эмали",
      explanation:
        "Истончение эмали обнажает дентинные канальцы, мгновенно передающие температурный раздражитель к нерву.",
      action: "Щадящая очистка кариеса и эстетическая нано-пломба за 30 минут.",
    },
    en: {
      symptom: "Sharp pain triggered by cold drinks, hot tea, or sweets",
      cause: "Dental Caries (Cavity) or Micro-fracture",
      explanation:
        "Eroded enamel exposes sensitive dentin tubules directly to thermal and sugary triggers.",
      action: "30-minute decay excavation and German/Japanese composite restoration.",
    },
  },
  {
    serviceId: "sirkon-keramika-karonkalar",
    uz: {
      symptom: "Plomba tushib ketdi yoki oldingi/chaynash tishi sinib qoldi",
      cause: "Plomba ostida ikkilamchi karies yoki tish devori sinishi",
      explanation:
        "Ochiq qolgan tish bo'shlig'iga ovqat qoldiqlari va bakteriyalar kirib, tezda yallig'lanish va o'tkir og'riq chaqiradi.",
      action: "Kichik sinishda 1 kunda tiklash; katta yemirilishda Shining 3D skanerida sirkon karonka.",
    },
    ru: {
      symptom: "Выпала пломба или откололся кусочек зуба",
      cause: "Вторичный кариес или скол ослабленной стенки",
      explanation:
        "Открытая полость быстро накапливает бактерии и может расколоть корень при жевании.",
      action: "Художественная реставрация за 1 визит или прочная циркониевая коронка.",
    },
    en: {
      symptom: "Lost filling or chipped front / chewing tooth",
      cause: "Secondary decay or weakened enamel fracture",
      explanation:
        "Exposed inner dentin traps bacteria and risks deeper tooth fracture when chewing.",
      action: "Same-day bonding repair or Shining 3D scanned zirconia crown.",
    },
  },
  {
    serviceId: "ogriqsiz-tish-olish",
    uz: {
      symptom: "Milk shishib ketdi (flyus), tishga bosganda qattiq og'riyapti",
      cause: "Periodontit, yiringli kista yoki yotgan aql tishi (perikoronit)",
      explanation:
        "Infeksiya tish ildizi uchidan suyak va milkka o'tgan. Issiq bosish yoki uyda kutish yiring tarqalishi xavfini oshiradi!",
      action: "Zudlik bilan shifokor ko'rigi: kanal drenaji yoki 0% og'riqsiz atravmatik davolash/olish.",
    },
    ru: {
      symptom: "Опухла десна или щека (флюс), больно накусывать на зуб",
      cause: "Периодонтит, киста корня или воспаление зуба мудрости",
      explanation:
        "Воспаление вышло за пределы корня. Согревание щеки категорически опасно и ускоряет распространение инфекции!",
      action: "Срочный осмотр врача: снятие отека, лечение или атравматичное удаление без боли.",
    },
    en: {
      symptom: "Swollen gum/cheek (dental abscess) or pain when biting down",
      cause: "Periodontitis, periapical abscess, or impacted wisdom tooth",
      explanation:
        "Infection has spread beyond the root tip. Applying heat can worsen swelling rapidly.",
      action: "Immediate exam: safe drainage, root retreatment, or atraumatic extraction.",
    },
  },
  {
    serviceId: "tish-oqartirish",
    uz: {
      symptom: "Tish yuvganda milk qonayapti va og'izdan noxush hid kelyapti",
      cause: "Milk osti tish toshlari va gingivit / parodontit",
      explanation:
        "Qotib qolgan toshlar milkni doimiy tirnab, bakteriya ko'payishiga va tishlarning qimirlab qolishiga sabab bo'ladi.",
      action: "Ultratovush + AirFlow bilan 30 daqiqada og'riqsiz professional tozalash.",
    },
    ru: {
      symptom: "Кровоточат десны при чистке, появился неприятный запах изо рта",
      cause: "Зубной камень, гингивит или начальный пародонтит",
      explanation:
        "Поддесневые отложения вызывают хроническое воспаление и со временем приводят к расшатыванию зубов.",
      action: "Ультразвуковая чистка и AirFlow за 30 минут без повреждения эмали.",
    },
    en: {
      symptom: "Bleeding gums when brushing and persistent bad breath",
      cause: "Subgingival tartar buildup and gingivitis",
      explanation:
        "Calcified plaque irritates gums continuously, causing inflammation and eventual tooth loosening.",
      action: "30-minute gentle ultrasonic scaling & AirFlow polishing.",
    },
  },
  {
    serviceId: "dental-implant",
    uz: {
      symptom: "Tish olingan yoki tushib qolgan — o'rniga mustahkam tish qo'ydirmoqchisiz",
      cause: "Adentiya (bo'sh qolgan tish o'rni va chaynash bosimi buzilishi)",
      explanation:
        "Bo'sh joy qancha uzoq qolsa, jag' suyagi shuncha tez eriydi va yonidagi sog'lom tishlar egila boshlaydi.",
      action: "Qo'shni tishlarni yo'nmasdan MegaGen biotitan tish implanti o'rnatish (umrbod kafolat).",
    },
    ru: {
      symptom: "Отсутствует зуб — нужно надежно вставить зуб без обточки соседних",
      cause: "Потеря зуба и риск смещения зубного ряда",
      explanation:
        "Без жевательной нагрузки кость челюсти постепенно истончается, а соседние зубы наклоняются.",
      action: "Установка корейского импланта MegaGen за 20 минут с пожизненной гарантией.",
    },
    en: {
      symptom: "Missing tooth causing chewing trouble or smile gaps",
      cause: "Tooth loss risking bone atrophy and shifting teeth",
      explanation:
        "Without a root in the jawbone, bone volume shrinks and neighboring teeth tilt inward.",
      action: "15–20 minute MegaGen biocompatible titanium implant with lifetime warranty.",
    },
  },
];

const TOOTHACHE_FAQS = [
  {
    q: {
      uz: "Kechki payt tishim qattiq og'rib qolsa, Andijonda soat nechigacha stomatologga borsa bo'ladi?",
      ru: "До скольких часов в Андижане принимает стоматолог при острой вечерней боли?",
      en: "Until how late is Dr. Ozodbek Otaxonov's dental clinic open for evening toothaches in Andijan?",
    },
    a: {
      uz: "Dr. Ozodbek Otaxonov klinikasi (Smiles Dental Group, 1-mikrorayon, 8A-bino) Dushanbadan Shanbagacha kechki soat 22:00 gacha ochiq! Kechki og'riq boshlansa +998 97 833 89 97 raqamiga darhol qo'ng'iroq qiling yoki saytimizda navbatsiz vaqtni band qiling.",
      ru: "Клиника Д-ра Озодбека Отахонова (1-й микрорайон, 8А, Конечка) открыта с понедельника по субботу до 22:00! При вечерней боли звоните напрямую +998 97 833 89 97.",
      en: "Our clinic at Smiles Dental Group (8A, 1st Microdistrict, near Konechka) is open Monday through Saturday until 22:00 (10:00 PM). Call +998 97 833 89 97 immediately for urgent evening care.",
    },
  },
  {
    q: {
      uz: "Tish og'riganda uyda vaqtincha qanday dori ichish mumkin va nimalar qat'iyan mumkin emas?",
      ru: "Какие обезболивающие можно принять до врача и что делать категорически запрещено?",
      en: "What temporary home remedies are safe before seeing a dentist, and what must I avoid?",
    },
    a: {
      uz: "MUMKIN: Shifokorga borguncha ibuprofen yoki paratsetamol ichish (agar allergiyangiz va oshqozon yarasida qarshi ko'rsatma bo'lmasa) va og'izni iliq tuzli suvda ohista chayish. QAT'IYAN TAQIQLANGAN: Og'riyotgan tish yoki milkka aspirin tabletkasi, spirt, aroq, uksus yoki issiq grelka bosish — bular milkni kuydiradi va yiring shishini (flyusni) kuchaytiradi!",
      ru: "МОЖНО: Принять ибупрофен или парацетамол (при отсутствии противопоказаний), аккуратно прополоскать тёплым солевым раствором. ЗАПРЕЩЕНО: Прикладывать к десне таблетку аспирина, спирт, чеснок или греть щёку тёплой грелкой — это вызывает химический ожог и усиливает отёк!",
      en: "SAFE: Over-the-counter ibuprofen or acetaminophen (if medically safe for you) and lukewarm salt-water rinses. NEVER DO: Do not place aspirin, alcohol, garlic, or hot compresses on your gum/cheek — this causes severe tissue burns and accelerates swelling.",
    },
  },
  {
    q: {
      uz: "Homiladorlik davrida tish og'risa davolash mumkinmi?",
      ru: "Можно ли лечить зубы при беременности, если возникла острая боль?",
      en: "Can toothaches be safely treated during pregnancy?",
    },
    a: {
      uz: "Ha, o'tkir og'riq va infeksiyani sabr qilib yurish homila uchun xavfliroq. Klinikamizda homilador ayollar uchun xavfsiz, adrenalin-siz yoki minimal konsentratsiyali maxsus anestetiklar qo'llaniladi va shifokor homiladorlik muddatiga mos eng xavfsiz davolashni amalga oshiradi.",
      ru: "Да! Терпеть острую боль и инфекцию опаснее для малыша. В нашей клинике используются специальные щадящие анестетики без адреналина, безопасные для будущих мам.",
      en: "Yes! Enduring untreated pain or oral infection carries greater risk. We utilize gentle, epinephrine-free local anesthetics safe for expectant mothers after careful trimester assessment.",
    },
  },
  {
    q: {
      uz: "Yosh bolaning tishi kechki payt og'risa nima qilish kerak?",
      ru: "Что делать, если зуб разболелся у ребёнка вечером?",
      en: "What should I do if my child develops an evening toothache?",
    },
    a: {
      uz: "Avvalo bolaning og'zini ovqat qoldiqlaridan tozalash uchun iliq suvda chayish, shish bo'lsa tashqaridan sovuq kompress qo'yish va yoshiga mos bolalar siropini berish kerak. So'ng kechki soat 22:00 gacha +998 97 833 89 97 orqali bog'lanib, mevali muzlatuvchi gel yordamida qo'rqitmasdan og'riqsiz ko'rikka olib kelishingiz mumkin.",
      ru: "Аккуратно прополощите рот тёплой водой, чтобы убрать остатки пищи, и приложите прохладный компресс при отеке. Запишитесь к нам до 22:00 — аппликационный фруктовый гель позволяет оказать помощь без страха и слёз.",
      en: "Rinse gently with warm water to clear trapped food and apply a cool compress externally if swollen. Visit us before 22:00 — our fruit-flavored numbing gel ensures gentle, tear-free care.",
    },
  },
];

export default function ToothacheGuide() {
  const { lang } = useLanguage();
  const to = useLocalizedPath();
  const { openBooking } = useBooking();

  const seo = PAGE_SEO.toothacheGuide[lang] || PAGE_SEO.toothacheGuide.uz;

  const breadcrumbs = [
    { name: lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa", path: "/" },
    {
      name:
        lang === "ru"
          ? "Боль в зубе вечером: помощь"
          : lang === "en"
          ? "Evening Toothache Guide"
          : "Kechki tish og'rig'i va yordam",
      path: "/tish-ogrigi-yordam",
    },
  ];

  const guideSchema = buildToothacheGuideSchema(TOOTHACHE_FAQS, lang, breadcrumbs);

  const T = {
    uz: {
      badge: "KECHKI SHOSHILINCH STOMATOLOGIYA · SOAT 22:00 GACHA OCHIQ",
      h1: "Kechki Payt Tishim Og'riyapti — Sabablari, Birinchi Yordam va Tezkor Davolash",
      subtitle:
        "Tish og'rig'i ayniqsa kechki payt va tunda kuchayadimi? Quyida uy sharoitida xavfsiz birinchi yordam, nimalar qat'iyan taqiqlangani hamda Andijonda kechki soat 22:00 gacha Dr. Ozodbek Otaxonovning 100% og'riqsiz qabuli haqida aniq qo'llanma.",
      safeTitle: "Uyda Vaqtincha Nima Qilish Mumkin?",
      safeList: [
        "Og'izni 1 stakan iliq qaynatilgan suv + 1 choy qoshiq tuz eritmasi bilan ohista chaying — bu milk shishini kamaytiradi.",
        "Tish orasiga kirib qolgan ovqat qoldiqlarini tish ipi (floss) bilan ehtiyotkorlik bilan tozalang.",
        "Agar og'riq chidab bo'lmas bo'lsa, shifokor qabuligacha ruxsat etilgan og'riq qoldiruvchi (ibuprofen / paratsetamol) iching.",
        "Yonoq tashqarisidan 10–15 daqiqa sovuq (muz o'ralgan sochiq) qo'ying — shishni pasaytiradi.",
      ],
      dangerTitle: "QAT'IYAN TAQIQLANGAN XATOLAR!",
      dangerList: [
        "Milk yoki tish teshigi ustiga ASPIRIN tabletkasi, spirt, aroq, uksus yoki sarimsoq bosmang — bu shilliq qavatda og'ir KIMYOVIY KUYISH chaqiradi!",
        "Yonoqqa issiq grelka, issiq tuz yoki sharf boylab ISITMANG — issiqlik yiringni (flyusni) tez tarqatib yuboradi!",
        "Antibiotiklarni o'zboshimchalik bilan ichib og'riqni bosib yurmang — bu sababni davolamaydi va kistani kattalashtiradi.",
      ],
      symptomsHeading: "Alomatlar Bo'yicha Tish Muammosini Aniqlang",
      symptomsSub: "Tishingiz qanday og'riyotganiga qarab sababi va yechimini ko'ring:",
      causeLabel: "Asosiy sababi:",
      solutionLabel: "Klinik yechim:",
      btnDetail: "Muolajani ko'rish",
      btnBook: "22:00 gacha Qabulga Yozilish",
    },
    ru: {
      badge: "ВЕЧЕРНЯЯ НЕОТЛОЖНАЯ ПОМОЩЬ · ОТКРЫТО ДО 22:00 В АНДИЖАНЕ",
      h1: "Болит Зуб Вечером или Ночью — Что Делать, Первая Помощь и Лечение Без Боли",
      subtitle:
        "Зубная боль резко усиливается к вечеру? Подробное руководство врача-стоматолога Д-ра Озодбека Отахонова: безопасная помощь дома, частые ошибки и экстренный приём без боли в Андижане до 22:00.",
      safeTitle: "Что Безопасно Сделать Дома До Визита к Врачу?",
      safeList: [
        "Аккуратно прополощите рот тёплым раствором соли и соды (по 0.5 ч. л. на стакан тёплой воды) — снимает воспаление.",
        "Осторожно удалите застрявшие остатки пищи зубной нитью.",
        "При сильной боли примите безрецептурное обезболивающее (ибупрофен или парацетамол, если нет противопоказаний).",
        "При отёке приложите холод к щеке через полотенце на 10–15 минут.",
      ],
      dangerTitle: "КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО!",
      dangerList: [
        "НЕ прикладывайте к десне или зубу таблетку аспирина, спирт, водку или чеснок — это вызывает сильнейший ХИМИЧЕСКИЙ ОЖОГ слизистой!",
        "НЕ грейте больную щёку тёплой грелкой или компрессом — тепло мгновенно усиливает гнойный флюс!",
        "НЕ заглушайте проблему антибиотиками без осмотра врача — инфекция продолжает разрушать кость вокруг корня.",
      ],
      symptomsHeading: "Расшифровка Симптомов: Почему Болит Ваш Зуб?",
      symptomsSub: "Определите причину по характеру боли и выберите правильное решение:",
      causeLabel: "Вероятная причина:",
      solutionLabel: "Решение в клинике:",
      btnDetail: "Подробнее",
      btnBook: "Записаться до 22:00",
    },
    en: {
      badge: "EVENING EMERGENCY DENTISTRY · OPEN UNTIL 22:00 IN ANDIJAN",
      h1: "Throbbing Toothache at Night — Safe First Aid, Causes & Fast Pain Relief",
      subtitle:
        "Tooth pain often spikes in the evening due to lying-down blood pressure. Follow Dr. Ozodbek Otaxonov's safe temporary first-aid steps and visit our clinic open until 22:00 in Andijan.",
      safeTitle: "Safe Temporary Steps Before Your Appointment",
      safeList: [
        "Rinse gently with warm salt water (1/2 tsp salt in a glass of warm water) to soothe irritated gum tissue.",
        "Gently floss around the aching tooth to dislodge trapped food particles.",
        "Take an over-the-counter pain reliever such as ibuprofen or acetaminophen if medically safe for you.",
        "Apply a cold compress on the outside cheek for 10–15 minutes to reduce swelling.",
      ],
      dangerTitle: "DANGEROUS MYTHS TO STRICTLY AVOID!",
      dangerList: [
        "NEVER place crushed aspirin, alcohol, vinegar, or garlic directly onto the tooth or gum — this causes severe CHEMICAL BURNS.",
        "NEVER apply heat packs to a swollen jaw — heat rapidly worsens dental abscesses and spreading infection.",
        "Do not delay treatment by relying solely on leftover antibiotics.",
      ],
      symptomsHeading: "Symptom Decoder: Identify Your Dental Issue",
      symptomsSub: "Match what you are feeling to understand the cause and clinical cure:",
      causeLabel: "Likely Cause:",
      solutionLabel: "Clinical Treatment:",
      btnDetail: "View Treatment",
      btnBook: "Book Urgent Visit (Until 22:00)",
    },
  }[lang];

  return (
    <div className="py-6 sm:py-10 space-y-10">
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={getPageKeywords("toothacheGuide", lang)}
        schemaJson={guideSchema}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2 flex-wrap">
        <Link to={to("/")} className="hover:text-primary transition-colors">
          {lang === "ru" ? "Главная" : lang === "en" ? "Home" : "Bosh sahifa"}
        </Link>
        <span>/</span>
        <span className="text-primary font-bold" aria-current="page">
          {breadcrumbs[1].name}
        </span>
      </nav>

      {/* Emergency Hero Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-10 text-white shadow-luxury border border-amber-500/25 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/35 text-[11px] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{T.badge}</span>
          </span>
          <time dateTime="2026-11-26" className="text-xs text-slate-400 font-medium">
            {lang === "ru" ? "Обновлено: 26.11.2026" : lang === "en" ? "Updated: 2026-11-26" : "Yangilangan: 26.11.2026"}
          </time>
        </div>

        <h1 className="font-serif-classic text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.16]">
          {T.h1}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          {T.subtitle}
        </p>

        {/* Quick Hours & Address Bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-200 pt-1">
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{PRIMARY_CLINIC.hours[lang]}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconLocationPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{PRIMARY_CLINIC.address[lang]} ({PRIMARY_CLINIC.landmark[lang]})</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              {lang === "uz"
                ? "2 bosqichli 0% og'riqsiz anesteziya"
                : lang === "ru"
                ? "Двухэтапная анестезия (0% боли)"
                : "Two-stage painless anesthesia"}
            </span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={DOCTOR_INFO.phoneHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-luxury transition-all"
          >
            <IconPhone className="w-4 h-4 text-white" />
            <span>{DOCTOR_INFO.phoneDisplay}</span>
          </a>
          <button
            type="button"
            onClick={() => openBooking("ogriqsiz-tish-davolash")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <span>{T.btnBook}</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* Safe First Aid vs Forbidden Mistakes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-950 font-serif-classic flex items-center gap-2">
            <IconCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{T.safeTitle}</span>
          </h2>
          <ul className="space-y-3">
            {T.safeList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/75 border border-rose-200 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-rose-950 font-serif-classic flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black shrink-0">!</span>
            <span>{T.dangerTitle}</span>
          </h2>
          <ul className="space-y-3">
            {T.dangerList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Symptom Matrix Table / Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/5 text-primary border border-primary/20">
            <IconSparkleStar className="w-3.5 h-3.5 text-primary" />
            <span>
              {lang === "ru" ? "ДИАГНОСТИКА СИМПТОМОВ" : lang === "en" ? "SYMPTOM MATRIX" : "ALOMATLAR TAHLILI"}
            </span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic">
            {T.symptomsHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">{T.symptomsSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SYMPTOM_CASES.map((item, idx) => {
            const c = item[lang] || item.uz;
            return (
              <article
                key={idx}
                className="p-6 rounded-3xl bg-white border border-amber-200/90 shadow-sm hover:shadow-luxury hover:border-primary/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-classic leading-snug">
                    {c.symptom}
                  </h3>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1 text-xs">
                    <p className="font-bold text-primary uppercase tracking-wide text-[10px]">
                      {T.causeLabel}
                    </p>
                    <p className="font-bold text-slate-900">{c.cause}</p>
                    <p className="text-slate-600 leading-relaxed pt-0.5">{c.explanation}</p>
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-emerald-700 uppercase tracking-wide text-[10px]">
                      {T.solutionLabel}
                    </p>
                    <p className="text-slate-700 font-medium leading-relaxed">{c.action}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-100 flex items-center justify-between gap-2">
                  <Link
                    to={to(`/services/${item.serviceId}`)}
                    className="text-xs font-bold text-slate-700 hover:text-primary transition-colors"
                  >
                    {T.btnDetail} →
                  </Link>
                  <button
                    type="button"
                    onClick={() => openBooking(item.serviceId)}
                    className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold cursor-pointer transition-all"
                  >
                    {lang === "uz" ? "Yozilish" : lang === "ru" ? "Запись" : "Book"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Emergency Toothache FAQs */}
      <FaqAccordion
        items={TOOTHACHE_FAQS}
        badgeText={
          lang === "uz"
            ? "TISH OG'RIG'I — SAVOL-JAVOB"
            : lang === "ru"
            ? "ЗУБНАЯ БОЛЬ — ВОПРОСЫ И ОТВЕТЫ"
            : "EMERGENCY TOOTHACHE FAQ"
        }
        title={
          lang === "uz"
            ? "Kechki Tish Og'rig'i Bo'yicha Eng Ko'p Beriladigan Savollar"
            : lang === "ru"
            ? "Частые Вопросы При Острой Зубной Боли Вечером"
            : "Evening Toothache Frequently Asked Questions"
        }
      />

      {/* Location Map */}
      <ClinicLocationMap />
    </div>
  );
}
