import React from "react";
import {
  DentalImplantFixture,
  DentalBracesIcon,
  DentalVeneerCrown,
  DentalToothMolar,
  DentalDenturesIcon,
  DentalAlignersIcon,
  DentalWhiteningZoom,
  DentalSurgeryExtraction,
} from "../components/MedicalIcons";
import { assets } from "../assets/assets";

export const SERVICES_CATALOG = [
  {
    id: "dental-implant",
    icon: <DentalImplantFixture className="w-7 h-7 text-primary" />,
    image: assets.treatment_implant,
    badge: {
      uz: "MEGAGEN BIOTITAN",
      ru: "MEGAGEN BIOTITAN",
      en: "MEGAGEN BIOTITAN",
    },
    techTag: {
      uz: "Janubiy Koreya",
      ru: "Южная Корея",
      en: "South Korea",
    },
    featurePill: {
      uz: "Suyak Integratsiyasi 99.5%",
      ru: "Приживаемость 99.5%",
      en: "99.5% Integration",
    },
    badgeTheme: {
      badgeBg: "bg-amber-950/85 text-amber-300 border-amber-400/50",
      warrantyBg: "bg-emerald-950/85 text-emerald-300 border-emerald-400/50",
      accentGlow: "hover:shadow-amber-500/10",
    },
    category: {
      uz: "Dental Implantologiya",
      ru: "Дентальная Имплантология",
      en: "Dental Implantology",
    },
    title: {
      uz: "Dental Implantatsiya (MegaGen & Biotitan)",
      ru: "Дентальная Имплантация Зубов (MegaGen)",
      en: "Dental Implants (MegaGen & Titanium Systems)",
    },
    shortDesc: {
      uz: "Yo'qotilgan tishlarni qo'shni tishlarni charxlamasdan, Janubiy Koreyaning MegaGen premium biotitan implantlari bilan 15-20 daqiqada og'riqsiz tiklash.",
      ru: "Восстановление утраченных зубов без обточки соседних за 15-20 минут с корейскими имплантатами MegaGen и пожизненной гарантией.",
      en: "Restore missing teeth gently in 15-20 minutes with world-class MegaGen titanium implants without grinding adjacent healthy teeth.",
    },
    duration: { uz: "20 daqiqa (1 qabul)", ru: "20 минут (1 визит)", en: "20 mins (1 visit)" },
    warranty: { uz: "Umrbod rasmiy kafolat", ru: "Пожизненная гарантия", en: "Lifetime warranty" },
    highlights: {
      uz: [
        "Samarqand Davlat Tibbiyot Universiteti & MegaGen International xalqaro sertifikati",
        "Navigatsion jarrohlik va suyak-plastik shablonlar asosida aniq o'rnatish",
        "2 bosqichli mikro-anesteziya: muolaja davomida 0% og'riq",
        "10 yillik klinik tajriba va 100% biotitan biomoslashuvchanlik",
      ],
      ru: [
        "Международные сертификаты СамГМУ и MegaGen International",
        "Навигационная хирургия и костно-пластические протоколы от А до Я",
        "Двухэтапная анестезия: абсолютно без боли и дискомфорта",
        "10 лет клинической практики и приживаемость свыше 99.5%",
      ],
      en: [
        "Certified in MegaGen Surgical & Prosthodontic protocols & Samarkand State Medical University",
        "Guided navigation surgery & precision bone regeneration",
        "Two-stage gentle anesthesia: completely zero pain",
        "10 years of clinical mastery and premium biocompatible titanium",
      ],
    },
    indications: {
      uz: [
        "Bir yoki bir nechta tish yo'qolishi va chaynash noqulayligi",
        "Qo'shni sog'lom tishlarni charxlamasdan tish tiklash istagi",
        "Noqulay olinadigan protezlar o'rniga mustahkam tish kerakligi",
        "Tish olingandan keyin jag' suyagi yupqalashishining oldini olish",
      ],
      ru: [
        "Отсутствие одного или нескольких зубов, дискомфорт при жевании",
        "Желание восстановить зуб без обточки соседних здоровых зубов",
        "Замена неудобных съемных протезов на надежные постоянные зубы",
        "Предотвращение атрофии и убыли костной ткани челюсти",
      ],
      en: [
        "Loss of one or more teeth causing chewing difficulty",
        "Desire to replace a tooth without grinding down adjacent healthy teeth",
        "Replacing loose or uncomfortable removable dentures with permanent teeth",
        "Preventing jawbone resorption and facial contour collapse after tooth loss",
      ],
    },
    faq: [
      {
        q: {
          uz: "Dental implant o'rnatish og'riqlimi va qancha vaqt davom etadi?",
          ru: "Больно ли ставить имплант и сколько времени занимает операция?",
          en: "Is dental implant placement painful and how long does it take?",
        },
        a: {
          uz: "Muolaja mutlaqo og'riqsiz o'tadi! Ikki bosqichli mikro-anesteziya qo'llaniladi (avval milkka mevali muzlatuvchi gel surtiladi, so'ng Yevropa anestetigi yuboriladi). Bitta implantni o'rnatish atigi 15–20 daqiqa vaqt oladi.",
          ru: "Процедура на 100% безболезненна! Десна предварительно обезболивается гелем, после чего вводится мягкий анестетик. Установка одного имплантата занимает всего 15–20 минут.",
          en: "The procedure is completely painless! We use two-stage anesthesia: a topical numbing gel is applied first, so you don't even feel the injection. Placing one implant takes just 15–20 minutes.",
        },
      },
      {
        q: {
          uz: "MegaGen implantlariga qanday kafolat beriladi va qancha xizmat qiladi?",
          ru: "Какая гарантия на импланты MegaGen и сколько они служат?",
          en: "What warranty is provided for MegaGen implants and how long do they last?",
        },
        a: {
          uz: "Janubiy Koreyaning MegaGen AnyRidge va AnyOne biotitan tizimlari 99.5% suyak integratsiyasiga ega va ularga ishlab chiqaruvchi tomonidan rasmiy umrbod kafolat beriladi.",
          ru: "Южнокорейские премиальные имплантаты MegaGen AnyRidge и AnyOne имеют приживаемость более 99.5% и пожизненную официальную гарантию производителя.",
          en: "South Korean MegaGen AnyRidge and AnyOne systems have an osseointegration rate exceeding 99.5% and are backed by a lifetime manufacturer warranty.",
        },
      },
    ],
  },
  {
    id: "breketlar",
    icon: <DentalBracesIcon className="w-7 h-7 text-brandOrange" />,
    image: assets.treatment_braces,
    badge: {
      uz: "METALL & KERAMIKA",
      ru: "МЕТАЛЛ И КЕРАМИКА",
      en: "METAL & CERAMIC",
    },
    techTag: {
      uz: "Damon System",
      ru: "Система Damon",
      en: "Damon System",
    },
    featurePill: {
      uz: "To'g'ri Prikus",
      ru: "Идеальный Прикус",
      en: "Precise Bite",
    },
    badgeTheme: {
      badgeBg: "bg-orange-950/85 text-orange-300 border-orange-400/50",
      warrantyBg: "bg-blue-950/85 text-blue-300 border-blue-400/50",
      accentGlow: "hover:shadow-orange-500/10",
    },
    category: {
      uz: "Ortodontiya",
      ru: "Ортодонтия",
      en: "Orthodontics",
    },
    title: {
      uz: "Ortodontik Breketlar (Metall va Keramik)",
      ru: "Ортодонтические Брекеты (Металл и Керамика)",
      en: "Orthodontic Brackets (Metal & Ceramic Braces)",
    },
    shortDesc: {
      uz: "Egri tishlar, orasi ochiqliklar va noto'g'ri tishlash (prikus) holatlarini zamonaviy metall va ko'rinmas estetik sapfir/keramik breketlar yordamida to'g'rilash.",
      ru: "Исправление прикуса и выравнивание зубного ряда металлическими и эстетическими керамическими брекет-системами.",
      en: "Comprehensive smile straightening and bite alignment using precision metal and discreet ceramic brackets.",
    },
    duration: { uz: "Individual davolash rejasi", ru: "Индивидуальный план", en: "Personalized plan" },
    warranty: { uz: "To'g'ri prikus kafolati", ru: "Гарантия ровного прикуса", en: "Stable bite warranty" },
    highlights: {
      uz: [
        "Klassik metall, o'z-o'zini ligaturlaydigan (Damon) va estetik keramik breketlar",
        "3D raqamli modellashtirish orqali tish harakatini nazorat qilish",
        "Bolalar va kattalar uchun tishlash nuqsonlarini to'g'rilash",
        "Davolash davomida har oylik muntazam professional nazorat",
      ],
      ru: [
        "Металлические, самолигирующие и незаметные керамические брекеты",
        "Цифровой расчет перемещения каждого зуба с микронной точностью",
        "Исправление скученности и сложных дефектов прикуса у взрослых и подростков",
        "Регулярное сопровождение и наблюдение на каждом этапе",
      ],
      en: [
        "Traditional metal, self-ligating and aesthetic ceramic options",
        "Digital arch analysis and gradual biomechanical alignment",
        "Treating bite crowding and misalignment across all age groups",
        "Continuous clinical monitoring throughout the treatment course",
      ],
    },
    indications: {
      uz: [
        "Tishlarning egriligi, qiyshiqligi yoki bir-birining ustiga chiqishi",
        "Tishlar orasidagi tirqishlar (diastema va tremalar)",
        "Noto'g'ri tishlash (prikus) va ovqat chaynash qiyinligi",
        "Jag' bo'g'imida chertish yoki noqulaylik sezilishi",
      ],
      ru: [
        "Искривление, скученность или неправильное положение зубов",
        "Промежутки и щели между зубами (диастемы и тремы)",
        "Патологии прикуса и затрудненное пережевывание пищи",
        "Щелчки и напряжение в височно-нижнечелюстном суставе",
      ],
      en: [
        "Crooked, rotated, or overcrowded teeth",
        "Noticeable gaps between teeth (diastema and spacing)",
        "Overbite, underbite, crossbite, or chewing difficulties",
        "Jaw tension or clicking in the temporomandibular joint",
      ],
    },
    faq: [
      {
        q: {
          uz: "Kattalar ham breket taqishi mumkinmi?",
          ru: "Можно ли ставить брекеты взрослым?",
          en: "Can adults wear orthodontic braces?",
        },
        a: {
          uz: "Albatta! Breket taqish uchun yosh chegarasi yo'q. Bugungi kunda zamonaviy Damon tizimlari va estetik keramik breketlar yordamida 30, 40 va hatto 50 yoshdan keyin ham tishlarni mukammal tekislash mumkin.",
          ru: "Конечно! Возрастных ограничений нет. Современные самолигирующие системы Damon и эстетическая керамика позволяют эффективно выравнивать зубы в 30, 40 и 50+ лет.",
          en: "Absolutely! There is no age limit for braces. Modern self-ligating Damon systems and aesthetic ceramic brackets effectively straighten teeth in patients of any age.",
        },
      },
      {
        q: {
          uz: "Breket bilan davolanish qancha vaqt davom etadi?",
          ru: "Сколько длится ортодонтическое лечение брекетами?",
          en: "How long does orthodontic treatment take?",
        },
        a: {
          uz: "Tishlarning dastlabki holatiga qarab o'rtacha 8 oydan 18 oygacha davom etadi. Dastlabki ko'rinadigan natijalar esa 2–3 oydayoq yaqqol seziladi.",
          ru: "В зависимости от сложности клинического случая курс занимает от 8 до 18 месяцев. Первые заметные изменения видны уже через 2–3 месяца.",
          en: "Depending on the complexity of your bite, treatment typically takes between 8 to 18 months, with noticeable improvements within the first 2–3 months.",
        },
      },
    ],
  },
  {
    id: "sirkon-keramika-karonkalar",
    icon: <DentalVeneerCrown className="w-7 h-7 text-primary" />,
    image: assets.treatment_crowns,
    badge: {
      uz: "CAD/CAM TSIRKONIY",
      ru: "CAD/CAM ДИОКСИД ЦИРКОНИЯ",
      en: "CAD/CAM ZIRCONIA",
    },
    techTag: {
      uz: "Germaniya & Yaponiya",
      ru: "Германия и Япония",
      en: "Germany & Japan",
    },
    featurePill: {
      uz: "Milk Qoraymaydi",
      ru: "Без темных ободков",
      en: "Zero Dark Margins",
    },
    badgeTheme: {
      badgeBg: "bg-sky-950/85 text-sky-300 border-sky-400/50",
      warrantyBg: "bg-emerald-950/85 text-emerald-300 border-emerald-400/50",
      accentGlow: "hover:shadow-sky-500/10",
    },
    category: {
      uz: "Ortopedik Stomatologiya",
      ru: "Ортопедия",
      en: "Prosthodontics",
    },
    title: {
      uz: "Sirkon va Keramika Karonkalar (CAD/CAM)",
      ru: "Циркониевые и Керамические Коронки (CAD/CAM)",
      en: "Zirconia & Ceramic Crowns (CAD/CAM Precision)",
    },
    shortDesc: {
      uz: "Sinib ketgan yoki yemirilgan tishlarni metall-siz, milkka mutlaqo zarar bermaydigan monolit tsirkoniy va press-keramika qoplamalar bilan tabiiy tiklash.",
      ru: "Эстетическое восстановление зубов безметалловыми циркониевыми коронками и керамикой без тёмного ободка у десны.",
      en: "Restore fractured or damaged teeth with monolithic zirconia and press-ceramic crowns for superior strength and natural luster.",
    },
    duration: { uz: "2 – 3 kun", ru: "2 – 3 дня", en: "2 – 3 days" },
    warranty: { uz: "10 yilgacha rasmiy kafolat", ru: "Гарантия до 10 лет", en: "Up to 10-year warranty" },
    highlights: {
      uz: [
        "100% biomoslashuvchan tsirkoniy: milk qorayishi va metall ta'mi yo'q",
        "CAD/CAM 3D raqamli frezerlash orqali mukammal jipslashish",
        "Old va orqa (chaynash) tishlar uchun yuqori mustahkamlik",
        "Vaqtinchalik qoplamalar orqali muolaja davomida to'liq qulaylik",
      ],
      ru: [
        "Биосовместимый диоксид циркония: никакого посинения десны",
        "CAD/CAM 3D моделирование для идеального прилегания",
        "Максимальная прочность для жевательных и передних зубов",
        "Эстетичные временные коронки на период изготовления",
      ],
      en: [
        "100% biocompatible monolithic zirconia with zero dark gum lines",
        "CAD/CAM digital milling for micron-accurate margin fit",
        "Exceptional chewing load durability and lifelike translucency",
        "Temporary crowns provided to ensure immediate aesthetic comfort",
      ],
    },
    indications: {
      uz: [
        "Tish toji 50% dan ortiq yemirilgan, singan yoki plomba ushlamaydigan holatlar",
        "Asabi (nervi) olingan va vaqt o'tishi bilan qorayib qolgan tishlar",
        "Eski temir-keramika (metall) qoplamalarni zamonaviy sirkoniyga almashtirish",
        "Milk qorayishidan xalos bo'lish va tabiiy emal yaltiroqligini tiklash",
      ],
      ru: [
        "Разрушение коронковой части зуба более чем на 50%, сколы и трещины",
        "Депульпированные (мертвые) потемневшие зубы",
        "Замена старых металлокерамических коронок с темной каймой у десны",
        "Желание получить идеальную белизну и прочность без аллергии на металл",
      ],
      en: [
        "Tooth structure broken or decayed by more than 50% where fillings cannot hold",
        "Discolored, weakened teeth following root canal therapy",
        "Replacing outdated metal-fused crowns that cause dark gum lines",
        "Restoring full chewing power with biocompatible, metal-free materials",
      ],
    },
    faq: [
      {
        q: {
          uz: "Sirkon karonkaning oddiy metall-keramikadan asosiy farqi nima?",
          ru: "В чем главное отличие оксида циркония от металлокерамики?",
          en: "What is the key advantage of Zirconia over porcelain-fused-to-metal crowns?",
        },
        a: {
          uz: "Sirkoniy tarkibida hech qanday qora metall bo'lmaydi. U milkni aslo qoraytirmaydi, metall ta'mini keltirib chiqarmaydi va yorug'likni tabiiy tish emalidek o'tkazadi.",
          ru: "В диоксиде циркония полностью отсутствует металл. Он не окисляется, не дает серо-синей каймы на десне и выглядит абсолютно как живой зуб.",
          en: "Zirconia is 100% metal-free. It never produces a dark line along the gum margin, eliminates metallic taste, and reflects light just like natural tooth enamel.",
        },
      },
      {
        q: {
          uz: "Sirkon karonkalar qancha yil xizmat qiladi?",
          ru: "Какой срок службы у циркониевых коронок?",
          en: "How long do monolithic zirconia crowns last?",
        },
        a: {
          uz: "To'g'ri gigiyenaga rioya qilinganda sirkoniy qoplamalar 15–20 yildan ortiq mustahkam xizmat qiladi. Klinikamizda 10 yilgacha rasmiy kafolat beriladi.",
          ru: "При надлежащей гигиене циркониевые коронки служат более 15–20 лет. Мы предоставляем официальную гарантию до 10 лет.",
          en: "With proper oral hygiene, zirconia crowns last 15 to 20+ years. Our clinic provides an official warranty of up to 10 years.",
        },
      },
    ],
  },
  {
    id: "vinirlar",
    icon: <DentalVeneerCrown className="w-7 h-7 text-brandCyan" />,
    image: assets.treatment_veneers,
    badge: {
      uz: "0.3 MM E-MAX GOLLIVUD",
      ru: "0.3 ММ E-MAX ГОЛЛИВУД",
      en: "0.3 MM E-MAX HOLLYWOOD",
    },
    techTag: {
      uz: "Ivoclar Vivadent",
      ru: "Ivoclar Vivadent",
      en: "Ivoclar Vivadent",
    },
    featurePill: {
      uz: "O'chmas Gollivud Jilosi",
      ru: "Голливудский Блеск",
      en: "Hollywood Luster",
    },
    badgeTheme: {
      badgeBg: "bg-emerald-950/85 text-emerald-300 border-emerald-400/50",
      warrantyBg: "bg-amber-950/85 text-amber-300 border-amber-400/50",
      accentGlow: "hover:shadow-emerald-500/10",
    },
    category: {
      uz: "Estetik Stomatologiya",
      ru: "Эстетическая Стоматология",
      en: "Aesthetic Dentistry",
    },
    title: {
      uz: "E-max Estetik Vinirlar (Gollivud Tabassumi)",
      ru: "Керамические Виниры E-max (Голливудская Улыбка)",
      en: "E-max Aesthetic Veneers (Hollywood Smile)",
    },
    shortDesc: {
      uz: "Old tishlarning shakli, rangi va nuqsonlarini minimal yonish orqali ultra-yupqa (0.3 mm) Shveysariya/Germaniya E-max keramik vinirlari bilan mukammallashtirish.",
      ru: "Идеальная зона улыбки: ультратонкие виниры E-max для коррекции цвета, сколов и диастем с минимальной обработкой эмали.",
      en: "Transform your smile with ultra-thin E-max ceramic veneers, correcting discolorations, chips, and gaps with minimal prep.",
    },
    duration: { uz: "1 – 2 ta tashrif", ru: "1 – 2 визита", en: "1 – 2 visits" },
    warranty: { uz: "10–15 yil xizmat muddati", ru: "Срок службы 10–15 лет", en: "10–15+ years lifespan" },
    highlights: {
      uz: [
        "Yuz tuzilishingiz va tabassumingizga mos individual Smile Design",
        "Tish emalini maksimal asrab qoluvchi nozik ishlov berish",
        "Qahva, choy va chekishdan rangini o'zgartirmaydigan doimiy yaltiroqlik",
        "Tabiiy emalning yorug'lik o'tkazuvchanligi va shaffofligi",
      ],
      ru: [
        "Индивидуальный цифровой дизайн улыбки (Digital Smile Design)",
        "Максимальное сохранение живых тканей зуба",
        "Устойчивость к красящим напиткам: цвет не тускнеет со временем",
        "Полная светопроницаемость и глубина живой эмали",
      ],
      en: [
        "Bespoke digital smile architecture calibrated to facial aesthetics",
        "Minimally invasive enamel preservation techniques",
        "Stain-resistant porcelain impervious to coffee and tea",
        "Natural depth and optical translucency matching authentic teeth",
      ],
    },
    indications: {
      uz: [
        "Old tishlarning sarg'ayishi, dog'lar va oqartirishga berilmaydigan pigmentatsiya",
        "Tishlar orasidagi tirqish (diastema va trema) mavjudligi",
        "Old tishlarning chetlari sinishi, yorilishi yoki notekis shakli",
        "Mukammal va jozibador Gollivud tabassumiga ega bo'lish istagi",
      ],
      ru: [
        "Стойкое потемнение эмали, пятна, устойчивые к отбеливанию",
        "Щель между передними зубами (диастема)",
        "Сколы, микротрещины и неэстетичная форма передних зубов",
        "Желание обрести безупречную и сияющую «Голливудскую улыбку»",
      ],
      en: [
        "Deep enamel discoloration resistant to chemical bleaching",
        "Gap between the front teeth (diastema) and irregular tooth shapes",
        "Chipped, worn down, or uneven edges in the smile line",
        "Desire for a flawless, long-lasting Hollywood smile makeover",
      ],
    },
    faq: [
      {
        q: {
          uz: "E-max vinirlar uchun tishni ko'p yonish kerakmi?",
          ru: "Сильно ли обтачиваются зубы под виниры E-max?",
          en: "Does placing E-max veneers require aggressive tooth shaving?",
        },
        a: {
          uz: "Yo'q! E-max vinirlarining qalinligi atigi 0.3 – 0.5 mm bo'lib, tish emalining faqat yuzaki qatlami mikro-darajada sayqallanadi. 90% dan ortiq tabiiy tish to'qimasi to'liq saqlab qolinadi.",
          ru: "Нет! Толщина виниров E-max составляет всего 0.3–0.5 мм. Обработка эмали минимальна и щадящая — более 90% живой ткани зуба сохраняется нетронутой.",
          en: "No! Ultra-thin E-max veneers are only 0.3 to 0.5 mm thick. Enamel preparation is minimal and conservative, preserving over 90% of your natural tooth structure.",
        },
      },
      {
        q: {
          uz: "Vinirlar kofe yoki choydan rangini o'zgartiradimi?",
          ru: "Окрашиваются ли виниры от кофе, чая или сигарет?",
          en: "Do porcelain veneers stain from coffee, tea, or smoking?",
        },
        a: {
          uz: "Aslo yo'q! E-max shisha-keramikasi g'ovaksiz silliq tuzilishga ega bo'lib, hech qanday oziq-ovqat bo'yoqlarini yoki tamaki tutunini o'ziga singdirmaydi va 15 yil davomida yaltiroqligini saqlaydi.",
          ru: "Ни в коем случае! Прессованная керамика E-max не имеет пор, поэтому не впитывает красящие пигменты и сохраняет первоначальный цвет и блеск более 15 лет.",
          en: "Not at all! Non-porous E-max lithium disilicate glass-ceramic resists all food pigments, coffee, and tobacco stains, retaining its pristine shade for 15+ years.",
        },
      },
    ],
  },
  {
    id: "pratezlar",
    icon: <DentalDenturesIcon className="w-7 h-7 text-primary" />,
    image: assets.treatment_dentures,
    badge: {
      uz: "BYUGEL & ACRY-FREE",
      ru: "БЮГЕЛЬ И ACRY-FREE",
      en: "BYUGEL & ACRY-FREE",
    },
    techTag: {
      uz: "Shveytsariya Material",
      ru: "Швейцария",
      en: "Swiss Materials",
    },
    featurePill: {
      uz: "100% Qulay Chaynash",
      ru: "100% Удобное Жевание",
      en: "100% Easy Chewing",
    },
    badgeTheme: {
      badgeBg: "bg-purple-950/85 text-purple-300 border-purple-400/50",
      warrantyBg: "bg-indigo-950/85 text-indigo-300 border-indigo-400/50",
      accentGlow: "hover:shadow-purple-500/10",
    },
    category: {
      uz: "Protezlash",
      ru: "Протезирование Зубов",
      en: "Dentures & Prosthetics",
    },
    title: {
      uz: "Zamonaviy Tish Protezlari (Olinadigan & Olinmaydigan)",
      ru: "Зубные Протезы (Съемные и Несъемные)",
      en: "Modern Dental Prosthetics (Removable & Fixed Dentures)",
    },
    shortDesc: {
      uz: "Bir nechta yoki barcha tishlar yo'qolganda qulay, yengil va mustahkam byugel, elastik neylon (Acry-Free) hamda to'liq protezlar orqali chaynashni tiklash.",
      ru: "Легкие и надежные бюгельные, нейлоновые и безакриловые протезы для полного восстановления жевательной функции.",
      en: "Restore comfortable chewing and speech with lightweight бюгель, flexible nylon, and full precision dentures.",
    },
    duration: { uz: "3 – 5 kun", ru: "3 – 5 дней", en: "3 – 5 days" },
    warranty: { uz: "100% Qulaylik kafolati", ru: "100% Гарантия удобства", en: "Comfort warranty" },
    highlights: {
      uz: [
        "Elastik neylon va byugel protezlar: tanglayni to'liq yopmaydi, nutqni buzmaydi",
        "Tishlarga mahkam o'rnashuvchi zamonaviy ko'rinmas qulflar (atachmenlar)",
        "Allergiya chaqirmaydigan zamonaviy termoplastik materiallar",
        "Bemorning yoshiga va qulayligiga qarab individual moslashuv",
      ],
      ru: [
        "Бюгельные и нейлоновые протезы: комфортны, не нарушают дикцию",
        "Современные незаметные замковые крепления",
        "Гипоаллергенные инновационные полимерные материалы",
        "Индивидуальная подгонка без натирания десен",
      ],
      en: [
        "Flexible nylon and cast-metal partials designed for natural speech",
        "Precision attachment clasps hidden from sight",
        "Hypoallergenic biocompatible polymers",
        "Custom contouring to eliminate pressure points and gum irritation",
      ],
    },
    indications: {
      uz: [
        "Ko'p sonli yoki barcha tishlar yo'qolishi (chaynash funksiyasining buzilishi)",
        "Implant qo'yishga suyak yetishmovchiligi yoki vaqtinchalik qarshi ko'rsatma",
        "Yuz terisi osilishi va lab atrofida ajinlar paydo bo'lishining oldini olish",
        "Qulay, yengil va elastik tish protezlariga ehtiyoj",
      ],
      ru: [
        "Потеря большого количества или всех зубов, нарушение жевания",
        "Невозможность немедленной имплантации или временные ограничения",
        "Предотвращение западения щек и преждевременного старения лица",
        "Потребность в легких, гибких и эстетичных съемных конструкциях",
      ],
      en: [
        "Multiple or complete tooth loss resulting in compromised chewing",
        "Need for cost-effective functional rehabilitation when implants are deferred",
        "Preventing facial muscle sagging and speech articulation difficulties",
        "Requirement for lightweight, comfortable, and natural-looking dental prosthetics",
      ],
    },
    faq: [
      {
        q: {
          uz: "Moslashuvchan neylon (Valplast) protezlari og'izda tushib ketmaydimi?",
          ru: "Надежно ли держатся гибкие нейлоновые протезы Valplast во рту?",
          en: "Do flexible nylon (Valplast) dentures stay securely in place?",
        },
        a: {
          uz: "Neylon va byugel protezlar milkka va tishlarga mikron aniqlikda moslanadi. Ular yumshoq, milkni qismaydi, elastik ushlagichlari tufayli og'izda juda mustahkam o'tiradi va ko'rinmaydi.",
          ru: "Нейлоновые и бюгельные протезы точно повторяют анатомию десен. Они легкие, не натирают и фиксируются незаметными эластичными кламмерами без металлического блеска.",
          en: "Custom flexible nylon and byugel dentures fit snugly against your natural gum line. They feature invisible gum-colored clasps that prevent slipping without irritation.",
        },
      },
      {
        q: {
          uz: "Protezga qancha vaqtda ko'nikiladi?",
          ru: "Сколько времени занимает привыкание к протезам?",
          en: "How long does it take to adapt to new dentures?",
        },
        a: {
          uz: "Zamonaviy yupqa materiallar tufayli bemorlarimiz o'rtacha 3–7 kun ichida to'liq ko'nikishadi va bemalol taomlarni chaynashadi.",
          ru: "Благодаря тонким и легким полимерам адаптация проходит комфортно и занимает в среднем от 3 до 7 дней.",
          en: "Thanks to lightweight biocompatible polymers, adaptation is smooth and typically takes only 3 to 7 days.",
        },
      },
    ],
  },
  {
    id: "elaynerlar",
    icon: <DentalAlignersIcon className="w-7 h-7 text-brandCyan" />,
    image: assets.treatment_aligners,
    badge: {
      uz: "3D SHAFFOF KAPA",
      ru: "3D НЕВИДИМЫЕ КАПЫ",
      en: "3D CLEAR ALIGNERS",
    },
    techTag: {
      uz: "Digital Ortho 3D",
      ru: "Digital Ortho 3D",
      en: "Digital Ortho 3D",
    },
    featurePill: {
      uz: "100% Ko'rinmas",
      ru: "100% Невидимо",
      en: "100% Undetectable",
    },
    badgeTheme: {
      badgeBg: "bg-cyan-950/85 text-cyan-300 border-cyan-400/50",
      warrantyBg: "bg-teal-950/85 text-teal-300 border-teal-400/50",
      accentGlow: "hover:shadow-cyan-500/10",
    },
    category: {
      uz: "Shaffof Ortodontiya",
      ru: "Элайнеры",
      en: "Clear Aligners",
    },
    title: {
      uz: "Ko'rinmas Shaffof Elaynerlar (Aligners / Kapalar)",
      ru: "Прозрачные Элайнеры (Невидимые Капы)",
      en: "Clear Invisible Aligners (Smile Straightening)",
    },
    shortDesc: {
      uz: "Temir simlarsiz va breketsiz, atrofdagilarga mutlaqo ko'rinmaydigan shaffof kapalar yordamida tishlarni tekislash va tabassumni go'zallashtirish.",
      ru: "Незаметное и комфортное исправление зубного ряда прозрачными капами без металлических замочков и дуг.",
      en: "Straighten teeth discreetly without metal wires or brackets using custom clear aligners that are virtually undetectable.",
    },
    duration: { uz: "Bosqichma-bosqich kapalar", ru: "Серия кап", en: "Sequential trays" },
    warranty: { uz: "3D reja bo'yicha kafolat", ru: "Результат по 3D плану", en: "Predictable 3D results" },
    highlights: {
      uz: [
        "100% shaffof va ko'rinmas: suhbatdoshlaringiz sezmaydi",
        "Ovqatlanish va tish yuvishda oson yechib qo'yish imkoniyati",
        "Og'iz shilliq qavatini tilmaydi va yaralamaydi",
        "Oldindan 3D kompyuter modelida yakuniy natijani ko'rish",
      ],
      ru: [
        "100% прозрачность: окружающие не заметят процесс лечения",
        "Легко снимаются во время еды и чистки зубов",
        "Абсолютно гладкие: не травмируют слизистую полости рта",
        "3D визуализация конечного результата еще до начала ношения",
      ],
      en: [
        "100% transparent and discreet for everyday confidence",
        "Removable for effortless eating and oral hygiene",
        "Smooth medical-grade polymer with zero irritation to cheeks or lips",
        "3D digital treatment simulation showing end results in advance",
      ],
    },
    indications: {
      uz: [
        "Tishlarning yengil va o'rta darajadagi egriliklari",
        "Breket taqishni istamaydigan yoki ommaviy sohada ishlovchi bemorlar",
        "Tishlar orasidagi tirqishlarni bildirmasdan yopish",
        "Breket yechilgandan keyin tishlar siljishining oldini olish",
      ],
      ru: [
        "Легкая и средняя степень скученности или неровности зубов",
        "Желание выровнять зубы незаметно для окружающих без брекетов",
        "Устранение межзубных щелей и диастем",
        "Люди публичных профессий, ценящие эстетику и максимальный комфорт",
      ],
      en: [
        "Mild to moderate teeth crowding and misalignment",
        "Desire for discreet orthodontic correction without visible metal brackets",
        "Closing aesthetic gaps between anterior teeth",
        "Professionals and active individuals who prefer removable trays",
      ],
    },
    faq: [
      {
        q: {
          uz: "Elaynerlarni kuniga necha soat taqish kerak?",
          ru: "Сколько часов в сутки нужно носить элайнеры?",
          en: "How many hours a day should clear aligners be worn?",
        },
        a: {
          uz: "Kutilgan natijaga erishish uchun elaynerlar kuniga 20–22 soat taqiladi. Ularni faqat ovqatlanish va tish tozalash paytida yechiladi.",
          ru: "Для максимального эффекта капы необходимо носить 20–22 часа в сутки, снимая только во время приема пищи и чистки зубов.",
          en: "For optimal teeth movement, clear aligners should be worn for 20 to 22 hours daily, removing them only when eating and brushing.",
        },
      },
      {
        q: {
          uz: "Elaynerlar og'izda atrofdagilarga seziladimi?",
          ru: "Заметны ли элайнеры для окружающих во время разговора?",
          en: "Are clear aligners noticeable to other people when talking?",
        },
        a: {
          uz: "Umuman sezilmaydi! Ular 100% shaffof tibbiy polimerdan tayyorlanadi va hatto yaqin masofadan suhbatlashganda ham ko'rinmaydi.",
          ru: "Практически незаметны! Капы изготовлены из кристально прозрачного биополимера и остаются невидимыми даже при близком общении.",
          en: "Virtually invisible! Crafted from crystal-clear medical polymer, they hug teeth closely and are imperceptible even in close conversation.",
        },
      },
    ],
  },
  {
    id: "tish-oqartirish",
    icon: <DentalWhiteningZoom className="w-7 h-7 text-brandOrange" />,
    image: assets.treatment_whitening,
    badge: {
      uz: "ZOOM! & AIRFLOW",
      ru: "ZOOM! И AIRFLOW",
      en: "ZOOM! & AIRFLOW",
    },
    techTag: {
      uz: "Philips Zoom! 4",
      ru: "Philips Zoom! 4",
      en: "Philips Zoom! 4",
    },
    featurePill: {
      uz: "Emalga 0% Ziyon",
      ru: "0% Вреда Эмали",
      en: "0% Enamel Damage",
    },
    badgeTheme: {
      badgeBg: "bg-amber-950/85 text-amber-200 border-amber-300/40",
      warrantyBg: "bg-emerald-950/85 text-emerald-300 border-emerald-400/50",
      accentGlow: "hover:shadow-amber-500/10",
    },
    category: {
      uz: "Profilaktika va Estetika",
      ru: "Отбеливание и Гигиена",
      en: "Whitening & Hygiene",
    },
    title: {
      uz: "Professional Tish Oqartirish & AirFlow Gigiyena",
      ru: "Профессиональное Отбеливание Зубов и AirFlow",
      en: "Professional Teeth Whitening & AirFlow Hygiene",
    },
    shortDesc: {
      uz: "Emalga zarracha ziyon yetkazmagan holda tishlarni 4–8 tongacha oqartirish hamda ultratovush va AirFlow yordamida tish toshlari va karashlarni tozalash.",
      ru: "Безопасное осветление эмали на 4–8 тонов и бережная ультразвуковая чистка AirFlow от зубного камня и налета.",
      en: "Safely brighten your teeth by 4–8 shades without harming enamel, combined with gentle ultrasonic and AirFlow stain removal.",
    },
    duration: { uz: "40 – 50 daqiqa", ru: "40 – 50 минут", en: "40 – 50 mins" },
    warranty: { uz: "4–8 ton oqarish kafolati", ru: "Осветление на 4–8 тонов", en: "4–8 shades brighter" },
    highlights: {
      uz: [
        "Emalni yemirmaydigan va sezgirlik chaqirmaydigan xavfsiz fotootbelivaniye",
        "Qahva, choy va sigareta oqibatidagi qora dog'larni 100% tozalash",
        "Milklarning qonashini to'xtatuvchi professional profilaktika",
        "Muolaja yakunida minerallashtiruvchi va mustahkamlovchi ftor-gel qo'llash",
      ],
      ru: [
        "Безопасная система, не повреждающая структуру эмали",
        "Полное удаление пигментного налета от кофе, чая и курения",
        "Снятие поддесневого камня и профилактика кровоточивости десен",
        "Реминерализация и укрепление эмали специальным гелем",
      ],
      en: [
        "Non-abrasive whitening chemistry preserving enamel crystal integrity",
        "Thorough elimination of stubborn tobacco, coffee, and tea stains",
        "Ultrasonic tartar scaling reducing gum inflammation and bleeding",
        "Post-treatment fluoride remineralization for sensitive enamel",
      ],
    },
    indications: {
      uz: [
        "Qahva, choy, tamaki yoki rangli ichimliklar ta'sirida emal sarg'ayishi",
        "Yosh o'tishi bilan tishlarning tabiiy yaltiroqligi pasayishi",
        "To'y, bayram yoki muhim tadbir oldidan tabassumni 4-8 tonga oqartirish",
        "Emalga zarar yetkazmasdan professional tozalash va jilolash",
      ],
      ru: [
        "Пожелтение эмали от частого употребления чая, кофе или курения",
        "Возрастное потемнение твердых тканей зуба",
        "Подготовка к свадьбе, фотосессии или важному событию",
        "Желание осветлить зубы на 4–8 тонов безопасно для здоровья эмали",
      ],
      en: [
        "Enamel stained by coffee, tea, red wine, or tobacco use",
        "Age-related loss of natural tooth brightness",
        "Desire for an instant 4–8 shades brighter smile before weddings or public events",
        "Safe clinical treatment without damaging tooth surface integrity",
      ],
    },
    faq: [
      {
        q: {
          uz: "Professional tish oqartirish emalga zarar yetkazadimi?",
          ru: "Вредит ли профессиональное отбеливание зубной эмали?",
          en: "Does professional clinical whitening harm tooth enamel?",
        },
        a: {
          uz: "Zararsiz! Klinikamizda kislotasiz, xavfsiz nemis va yapon preparatlari hamda maxsus nurlantiruvchi chiroq qo'llaniladi. Muolaja so'ngida emalni minerallashtiruvchi gel surtiladi.",
          ru: "Абсолютно безопасно! Мы используем щадящие сертифицированные гели и холодный свет LED-лампы, а после процедуры проводим фторирование для защиты эмали.",
          en: "Completely safe! We apply pH-neutral clinical whitening formulas with controlled LED light, followed by deep remineralizing fluoride protection.",
        },
      },
      {
        q: {
          uz: "Oqartirish natijasi qancha vaqt saqlanadi?",
          ru: "Как долго сохраняется результат отбеливания зубов?",
          en: "How long does teeth whitening results last?",
        },
        a: {
          uz: "To'g'ri gigiyena va «oq parhez»ga (dastlabki kunlarda rangli ichimliklarni kamaytirish) rioya qilinganda oqlik 1.5–2 yilgacha saqlanadi.",
          ru: "При соблюдении рекомендаций и качественной гигиене результат сохраняется от 1.5 до 2 лет.",
          en: "With regular brushing and moderate consumption of staining beverages, results remain luminous for 1.5 to 2 years.",
        },
      },
    ],
  },
  {
    id: "ogriqsiz-tish-davolash",
    icon: <DentalToothMolar className="w-7 h-7 text-primary" />,
    image: assets.treatment_therapy,
    badge: {
      uz: "3M FILTEK & ESTELITE",
      ru: "3M FILTEK И ESTELITE",
      en: "3M FILTEK & ESTELITE",
    },
    techTag: {
      uz: "Germaniya & Yaponiya",
      ru: "Германия и Япония",
      en: "Germany & Japan",
    },
    featurePill: {
      uz: "Xameleon Rang Uygunligi",
      ru: "Хамелеон Эффект",
      en: "Chameleon Blend",
    },
    badgeTheme: {
      badgeBg: "bg-teal-950/85 text-teal-300 border-teal-400/50",
      warrantyBg: "bg-emerald-950/85 text-emerald-300 border-emerald-400/50",
      accentGlow: "hover:shadow-teal-500/10",
    },
    category: {
      uz: "Terapiya va Endodontiya",
      ru: "Терапия и Эндодонтия",
      en: "Restorative Therapy",
    },
    title: {
      uz: "Og'riqsiz Tish Davolash & Fotopolimer Restavratsiya",
      ru: "Безболезненное Лечение Зубов и Нано-Пломбы",
      en: "Painless Tooth Care & Nano-Composite Restorations",
    },
    shortDesc: {
      uz: "O'tkir tish og'rig'ini zudlik bilan to'xtatish, karies, pulpit va ildiz kanallarini Germaniya (3M Filtek) va Yaponiya (Estelite) fotopolimer plombalari bilan davolash.",
      ru: "Снятие острой боли за 1 визит, лечение кариеса и корневых каналов с нанокомпозитами из Германии (3M Filtek) и Японии (Estelite).",
      en: "Immediate relief from acute toothache and microscopic cavity treatment using authentic German and Japanese nano-composites.",
    },
    duration: { uz: "30 – 45 daqiqa", ru: "30 – 45 минут", en: "30 – 45 mins" },
    warranty: { uz: "5 yilgacha rasmiy kafolat", ru: "Гарантия до 5 лет", en: "Up to 5-year warranty" },
    highlights: {
      uz: [
        "Germaniya (3M Filtek) va Yaponiya (Estelite) xameleon plombalari",
        "2 bosqichli mikro-anesteziya: avval gel surtiladi, ukol ham sezilmaydi",
        "Apekslokator va raqamli rentgen nazorati ostida ildiz kanallarini tozalash",
        "Tishning tabiiy anatomiyasi, rangi va chaynash relyefini 100% tiklash",
      ],
      ru: [
        "Оригинальные фотополимеры 3M Filtek (Германия) и Estelite (Япония)",
        "Двухэтапная анестезия: предварительное нанесение замораживающего геля",
        "Эндодонтия под контролем апекслокатора и рентгена",
        "Точная анатомическая реставрация естественных бугров и цвета",
      ],
      en: [
        "Authentic 3M Filtek (Germany) & Tokuyama Estelite (Japan) composites",
        "Two-stage anesthesia: topical numbing gel eliminates needle sensation",
        "Precision root canal cleaning verified by digital apex locators",
        "Complete restoration of natural enamel translucency and chewing cusp anatomy",
      ],
    },
    indications: {
      uz: [
        "Kechasi bezovta qiluvchi, simillovchi yoki o'tkir pulsatsiyalanuvchi tish og'rig'i",
        "Sovuq, issiq yoki shirin yeguliklardan so'ng paydo bo'ladigan og'riq",
        "Tishda karies qora dog'lari paydo bo'lishi, plomba tushib ketishi yoki tish sinishi",
        "Chaynash paytida tish tagiga og'riq berishi va ovqat tiqilib qolishi",
      ],
      ru: [
        "Острая пульсирующая или ноющая зубная боль, усиливающаяся ночью",
        "Чувствительность и боль от горячего, холодного или сладкого",
        "Выпадение старой пломбы, скол зуба или темные кариозные полости",
        "Боль при накусывании, застревание пищи и воспаление зубного нерва (пульпит)",
      ],
      en: [
        "Severe, sharp, throbbing, or continuous toothache that peaks at night",
        "Sudden pain triggered by hot, cold, or sugary drinks and food",
        "Lost, cracked, or loose fillings, visible cavities, and dark decay spots",
        "Pain when chewing or pressing on the tooth caused by pulpitis or infection",
      ],
    },
    faq: [
      {
        q: {
          uz: "Tish qattiq og'riganda og'riqni bitta tashrifda butunlay qoldirsa bo'ladimi?",
          ru: "Можно ли полностью снять острую зубную боль за один визит?",
          en: "Can severe acute tooth pain be completely resolved in a single visit?",
        },
        a: {
          uz: "Ha! Dr. Ozodbek Otaxonov 2 bosqichli og'riqsiz mikro-anesteziya yordamida birinchi daqiqalardanoq og'riqni to'liq bloklaydi va kanalni tozalab, tishni tinchlantiradi.",
          ru: "Да! Д-р Озодбек Отахонов с помощью двухэтапной анестезии мгновенно блокирует болевой синдром и проводит бережное лечение канала за один приём.",
          en: "Yes! Utilizing a two-stage numbing protocol, Dr. Ozodbek immediately blocks all pain receptors, treats the inflamed pulp or cavity, and provides instant relief.",
        },
      },
      {
        q: {
          uz: "3M Filtek va Estelite plombalari qancha yil xizmat qiladi?",
          ru: "Сколько служат фотополимерные пломбы 3M Filtek и Estelite?",
          en: "How durable are 3M Filtek and Estelite nano-composite restorations?",
        },
        a: {
          uz: "Nemis va yapon nanokompozitlari emal bilan mikro-darajada birikib ketadi, rangi o'zgarmaydi va 7–10 yildan ortiq mustahkam turadi. 5 yilgacha rasmiy kafolat beramiz.",
          ru: "Немецкие и японские нанокомпозиты обладают непревзойденной прочностью, эффектом хамелеона и служат более 7–10 лет с гарантией до 5 лет.",
          en: "German and Japanese nano-hybrid composites fuse micro-mechanically with tooth enamel, blending seamlessly and lasting 7 to 10+ years.",
        },
      },
    ],
  },
  {
    id: "ogriqsiz-tish-olish",
    icon: <DentalSurgeryExtraction className="w-7 h-7 text-primary" />,
    image: assets.treatment_surgery,
    badge: {
      uz: "ATRAVMATIK XIRURGIYA",
      ru: "АТРАВМАТИЧНАЯ ХИРУРГИЯ",
      en: "ATRAUMATIC SURGERY",
    },
    techTag: {
      uz: "Yevropa Anestetiklari",
      ru: "Европейская Анестезия",
      en: "European Anesthesia",
    },
    featurePill: {
      uz: "0% Og'riq & Tez Bitish",
      ru: "0% Боли & Быстро",
      en: "0% Pain & Rapid Healing",
    },
    badgeTheme: {
      badgeBg: "bg-rose-950/85 text-rose-300 border-rose-400/50",
      warrantyBg: "bg-red-950/85 text-red-300 border-red-400/50",
      accentGlow: "hover:shadow-rose-500/10",
    },
    category: {
      uz: "Atravmatik Jarrohlik",
      ru: "Бережная Хирургия",
      en: "Oral Surgery",
    },
    title: {
      uz: "Og'riqsiz Tish Olish & Atravmatik Xirurgiya",
      ru: "Бережное Безболезненное Удаление Зубов и Хирургия",
      en: "Gentle Tooth Extraction & Oral Surgery",
    },
    shortDesc: {
      uz: "Murakkab, sinib qolgan tishlar hamda aql tishlarini (donolik tishlari) suyak va milk to'qimalarini asragan holda mutlaqo og'riqsiz va tez sug'urish.",
      ru: "Атравматичное удаление зубов мудрости и разрушенных корней без боли с сохранением костной лунки для будущей имплантации.",
      en: "Atraumatic extraction of wisdom teeth and fractured roots, conserving surrounding bone for swift recovery or future implants.",
    },
    duration: { uz: "10 – 20 daqiqa", ru: "10 – 20 минут", en: "10 – 20 mins" },
    warranty: { uz: "Asoratsiz tez bitish", ru: "Быстрое заживление", en: "Rapid complication-free healing" },
    highlights: {
      uz: [
        "Atravmatik texnika: tish suyak devorini shikastlamasdan ohista olinadi",
        "Aql tishlarini (donolik tishlari) yotgan yoki qiyshiq bo'lsa ham oson olish",
        "Yevropaning yuqori samarali xavfsiz anestetiklari",
        "Tish olingan joyga regeneratsiyani tezlashtiruvchi preparatlar qo'yish",
      ],
      ru: [
        "Атравматичная методика сохранения стенок альвеолярной лунки",
        "Удаление ретенированных и дистопированных «восьмерок» (зубов мудрости)",
        "Глубокая надежная анестезия европейскими препаратами",
        "Антисептическая защита и рекомендации для быстрого заживления",
      ],
      en: [
        "Atraumatic socket-preservation extraction protocol",
        "Surgical expertise in impacted and misaligned wisdom teeth",
        "High-grade European local anesthetics guaranteeing zero discomfort",
        "Biocompatible healing agents placed in the socket for rapid recovery",
      ],
    },
    indications: {
      uz: [
        "Noto'g'ri o'sayotgan, yonoqqa urilayotgan yoki tish qatorini siqayotgan aql tishlari (sakkizliklar)",
        "Qattiq yiringlagan, ildizi singan va davolab bo'lmaydigan darajada yemirilgan tishlar",
        "Milk shishishi, periostit (flyus) xavfi va tish ildizi atrofidagi kista",
        "Ortodontik davolashdan oldin shifokor ko'rsatmasi bo'yicha tish olish",
      ],
      ru: [
        "Ретинированные и дистопированные зубы мудрости («восьмерки»), травмирующие щеку",
        "Полное разрушение коронки и корня, не подлежащее терапевтическому лечению",
        "Отек десны, риск флюса, периодонтит и кисты на верхушке корня",
        "Плановое удаление по направлению ортодонта перед установкой брекетов",
      ],
      en: [
        "Impacted, partially erupted, or misaligned wisdom teeth (third molars)",
        "Severe subgingival root fractures or unrestorable extensive decay",
        "Recurrent gum swelling, abscess, cysts, or risk of periostitis (flux)",
        "Strategic extractions required prior to orthodontic braces therapy",
      ],
    },
    faq: [
      {
        q: {
          uz: "Aql tishini oldirish og'riqlimi?",
          ru: "Больно ли удалять зуб мудрости?",
          en: "Is wisdom tooth extraction painful?",
        },
        a: {
          uz: "Mutlaqo og'riqsiz! Biz kuchli zamonaviy Yevropa anestetiklaridan foydalanamiz. Atravmatik usul tufayli suyak ziyon ko'rmaydi va muolajadan keyin ham asoratlar bo'lmaydi.",
          ru: "Совершенно без боли! Применяется мощная европейская анестезия. Атравматичная методика сохраняет костные стенки лунки, обеспечивая быстрое заживление.",
          en: "Not painful at all! With advanced European local anesthesia and atraumatic luxation techniques, bone structure is preserved and healing is fast and gentle.",
        },
      },
      {
        q: {
          uz: "Tish olingandan keyin bitish jarayoni qancha vaqt oladi?",
          ru: "Сколько времени заживает десна после удаления зуба?",
          en: "How long does healing take after a tooth extraction?",
        },
        a: {
          uz: "Dastlabki bitish 2–3 kunda sodir bo'ladi, to'liq shifo topishi esa 7–10 kun davom etadi. Shifokorimiz muolajadan so'ng barcha zarur parvarish tavsiyalarini beradi.",
          ru: "Первичное затягивание лунки происходит за 2–3 дня, полное восстановление — за 7–10 дней. Мы даем подробные рекомендации по домашнему уходу.",
          en: "Initial gum closure takes 2 to 3 days, with full tissue recovery within 7 to 10 days. Comprehensive aftercare instructions are provided.",
        },
      },
    ],
  },
];
