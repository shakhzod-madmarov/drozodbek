import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useBooking } from "../context/BookingContext";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import {
  IconPhone,
  IconTelegram,
} from "./MedicalIcons";
import { DOCTOR_INFO } from "../constants/doctor";
import {
  fetchDentistAvailability,
  submitDentistBooking,
  buildWorkingHoursSchedule,
  filterAvailabilitySchedule,
  getClinicTodayStr,
  useClinicHours,
} from "../lib/medinsonBooking";
import {
  formatUzPhone,
  isUzPhoneComplete,
} from "../utils/phone";
import {
  sanitizePatientName,
  sanitizeNote,
  checkRateLimit,
  isBotSubmission,
} from "../utils/security";
import { CLASSIC_SERVICES } from "../constants/bookingServices";

const pad2 = (n) => String(n).padStart(2, "0");

const WEEKDAY_SHORT = {
  uz: ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"],
  ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const parseYmd = (s) => {
  const [y, m, d] = String(s || "").split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const formatDayPill = (ymd, lang) => {
  const date = parseYmd(ymd);
  if (!date) return ymd;
  const wds = WEEKDAY_SHORT[lang] || WEEKDAY_SHORT.uz;
  return `${wds[date.getDay()]} ${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}`;
};

const formatDmy = (ymd) => {
  const [y, m, d] = String(ymd || "").split("-");
  if (!y || !m || !d) return ymd;
  return `${d}.${m}.${y}`;
};

const TEXT = {
  uz: {
    kicker: "Onlayn qabul · Dr. Ozodbek Otaxonov",
    heading: "Uchrashuv vaqtini tanlang",
    sub: "Bo'sh kun va soatni tanlab, Dr. Ozodbek Otaxonov qabuliga navbatsiz yoziling.",
    defaultDaysLabel: "Dushanba - Shanba (08:30 – 18:30)",
    serviceLabel: "Xizmat yo'nalishi",
    dayGroupLabel: "1-qadam: Qabul kunini tanlang",
    timeGroupLabel: "2-qadam: Bo'sh vaqtni tanlang",
    selectedSlotLabel: "Tanlangan vaqt:",
    nameLabel: "Ism va familiya *",
    phoneLabel: "Telefon raqami *",
    dobLabel: "Tug'ilgan sana (ixtiyoriy)",
    dobHint: "Bir xil telefon raqamidan oila a'zolari yozilganda bemorlarni farqlash uchun yordam beradi.",
    noteLabel: "Shikoyat yoki izoh (ixtiyoriy)",
    namePlaceholder: "Masalan: Shaxzod Madmarov",
    phonePlaceholder: "+998 97 833 89 97",
    dobFormat: "kun-oy-yil",
    dobPlaceholder: "kun-oy-yil",
    notePlaceholder: "Implant, breket, karonka, vinir yoki og'riqsiz davolash bo'yicha...",
    submit: "Qabulga Yozilishni Tasdiqlash",
    submitting: "Yuborilmoqda...",
    needName: "Iltimos, ism va familiyangizni kiriting",
    needPhone: "Iltimos, to'liq telefon raqamini kiriting",
    needTime: "Iltimos, sana va vaqtni tanlang",
    conflictError: "Bu vaqt band qilingan. Iltimos, boshqa vaqtni tanlang.",
    failed: "So'rovni yuborib bo'lmadi. Iltimos, telefon orqali bog'laning.",
    pausedNotice: "Onlayn qabul vaqtlari yangilanmoqda. To'g'ridan-to'g'ri telefon orqali ham yozilishingiz mumkin:",
    successBadge: "Qabul so'rovi qabul qilindi",
    successTitle: "Qabulingiz muvaffaqiyatli ro'yxatga olindi!",
    successBody: "So‘rovingiz qabul qilindi. Klinika tez orada siz bilan bog‘lanadi.",
    summaryPatient: "Bemor",
    summaryPhone: "Telefon",
    summaryDob: "Tug'ilgan sana",
    summaryService: "Xizmat",
    summaryWhen: "Qabul vaqti",
    telegramCardTitle: "📲 Telegram eslatmani yoqing",
    telegramCardDesc: "Qabul vaqti yaqinlashganda Telegram orqali avtomatik eslatma olish uchun quyidagi tugmani bosing va botda START tugmasini bosing.",
    telegramCardBtn: "Telegram botga ulanish ↗",
    callBtn: "Klinikaga qo'ng'iroq qilish",
    bookAnother: "← Yangi qabulga yozilish",
    leadNoticeTitle: "Adolatli qabul va navbat tartibi",
    leadNotice: "Jonli navbatdagi bemorlar huquqini hurmat qilgan holda, onlayn qabul kamida 2 soat oldindan band qilinadi (masalan, hozir soat 08:00 bo'lsa, eng yaqin bo'sh vaqt 10:00 dan boshlanadi).",
    leadNoticeEmergency: "Shoshilinch og'riq bo'lsa, to'g'ridan-to'g'ri qo'ng'iroq qiling:",
    slotsFullToday: "Bugun to'lgan",
    slotsFullOther: "Bo'sh joy yo'q",
    slotsLabel: "bo'sh soat",
    noSlotsTodayMessage: "Bugun uchun barcha onlayn vaqtlar to'lgan yoki 2 soatlik navbat buferi sababli yopilgan. Iltimos, keyingi sanalardan birini tanlang:",
    nextAvailableDayBtn: "Keyingi bo'sh kunga o'tish →",
  },
  ru: {
    kicker: "Онлайн приём · Д-р Озодбек Отахонов",
    heading: "Выберите удобное время визита",
    sub: "Выберите свободный день и время для записи на приём к Д-ру Озодбеку Отахонову без очереди.",
    defaultDaysLabel: "Понедельник - Суббота (08:30 – 18:30)",
    serviceLabel: "Направление лечения",
    dayGroupLabel: "Шаг 1: Выберите день приёма",
    timeGroupLabel: "Шаг 2: Выберите свободное время",
    selectedSlotLabel: "Выбранное время:",
    nameLabel: "Имя и фамилия *",
    phoneLabel: "Номер телефона *",
    dobLabel: "Дата рождения (необязательно)",
    dobHint: "Помогает клинике различать членов семьи при записи с одного номера телефона.",
    noteLabel: "Жалоба или комментарий (необязательно)",
    namePlaceholder: "Например: Шахзод Мадмаров",
    phonePlaceholder: "+998 97 833 89 97",
    dobFormat: "день-месяц-год",
    dobPlaceholder: "день-месяц-год",
    notePlaceholder: "Имплантация, брекеты, коронки, виниры или зубная боль...",
    submit: "Подтвердить запись на приём",
    submitting: "Отправка...",
    needName: "Пожалуйста, введите имя и фамилию",
    needPhone: "Пожалуйста, введите полный номер телефона",
    needTime: "Пожалуйста, выберите дату и время",
    conflictError: "Это время уже занято. Пожалуйста, выберите другое время.",
    failed: "Не удалось отправить заявку. Пожалуйста, позвоните нам.",
    pausedNotice: "Онлайн слоты обновляются. Записаться можно также напрямую по телефону:",
    successBadge: "Заявка успешно зарегистрирована",
    successTitle: "Вы записаны на приём!",
    successBody: "Ваша заявка принята. Клиника свяжется с вами в ближайшее время.",
    summaryPatient: "Пациент",
    summaryPhone: "Телефон",
    summaryDob: "Дата рождения",
    summaryService: "Услуга",
    summaryWhen: "Дата и время",
    telegramCardTitle: "📲 Включите напоминание в Telegram",
    telegramCardDesc: "Чтобы получить напоминание о визите, нажмите кнопку ниже и запустите Telegram-бота (START).",
    telegramCardBtn: "Подключить Telegram-бота ↗",
    callBtn: "Позвонить в клинику",
    bookAnother: "← Записаться ещё раз",
    leadNoticeTitle: "Правило справедливой очереди",
    leadNotice: "С уважением к пациентам в клинике и живой очереди, онлайн-запись открыта минимум за 2 часа до приёма (например, если сейчас 08:00, ближайшее свободное время — с 10:00).",
    leadNoticeEmergency: "При острой боли звоните в клинику напрямую:",
    slotsFullToday: "На сегодня мест нет",
    slotsFullOther: "Мест нет",
    slotsLabel: "мест",
    noSlotsTodayMessage: "На сегодня все онлайн-слоты заняты либо закрыты по правилу 2-часового буфера очереди. Пожалуйста, выберите следующую дату:",
    nextAvailableDayBtn: "Перейти к ближайшей свободной дате →",
  },
  en: {
    kicker: "Online Appointment · Dr. Ozodbek Otaxonov",
    heading: "Select your visit time",
    sub: "Choose an available date and time slot to reserve your appointment with Dr. Ozodbek Otaxonov.",
    defaultDaysLabel: "Monday - Saturday (08:30 – 18:30)",
    serviceLabel: "Service Specialty",
    dayGroupLabel: "Step 1: Choose appointment date",
    timeGroupLabel: "Step 2: Choose available time",
    selectedSlotLabel: "Selected slot:",
    nameLabel: "Full Name *",
    phoneLabel: "Phone Number *",
    dobLabel: "Date of Birth (optional)",
    dobHint: "Helps distinguish family members sharing the same contact phone number.",
    noteLabel: "Complaint or Note (optional)",
    namePlaceholder: "e.g. Shaxzod Madmarov",
    phonePlaceholder: "+998 97 833 89 97",
    dobFormat: "day-month-year",
    dobPlaceholder: "day-month-year",
    notePlaceholder: "Implants, braces, crowns, veneers or toothache...",
    submit: "Confirm Appointment Booking",
    submitting: "Submitting...",
    needName: "Please enter your full name",
    needPhone: "Please enter a complete phone number",
    needTime: "Please choose a date and time slot",
    conflictError: "This slot is already booked. Please choose another time.",
    failed: "Submission failed. Please call us directly.",
    pausedNotice: "Online slots are refreshing. You can also book directly by phone:",
    successBadge: "Appointment Request Confirmed",
    successTitle: "Your visit has been registered!",
    successBody: "Your request has been received. The clinic will contact you shortly.",
    summaryPatient: "Patient",
    summaryPhone: "Phone",
    summaryDob: "Date of Birth",
    summaryService: "Service",
    summaryWhen: "Date & Time",
    telegramCardTitle: "📲 Enable Telegram Reminders",
    telegramCardDesc: "To receive an automated reminder as your appointment approaches, tap below and press START in our Telegram bot.",
    telegramCardBtn: "Connect Telegram Bot ↗",
    callBtn: "Call Clinic Directly",
    bookAnother: "← Book another appointment",
    leadNoticeTitle: "Fair Queue & Booking Notice",
    leadNotice: "To respect walk-in patients already waiting in the clinic, online appointments require at least 2 hours advance notice (e.g. at 08:00, earliest booking starts from 10:00).",
    leadNoticeEmergency: "For emergency pain, please call directly:",
    slotsFullToday: "Full today",
    slotsFullOther: "Fully booked",
    slotsLabel: "slots",
    noSlotsTodayMessage: "All online slots for today are booked or closed under the 2-hour queue buffer policy. Please select an upcoming date:",
    nextAvailableDayBtn: "Jump to next available date →",
  },
};

const InlineBookingSection = ({ initialService = null }) => {
  const { lang } = useLanguage();
  const { bookingRequest } = useBooking();
  const [searchParams] = useSearchParams();
  const t = TEXT[lang] || TEXT.uz;
  const clinicHours = useClinicHours(lang);

  const [days, setDays] = useState(() => buildWorkingHoursSchedule(10, 2));
  const [selectedDate, setSelectedDate] = useState(() => {
    const initDays = buildWorkingHoursSchedule(10, 2);
    const available = initDays.find((d) => d.times.length > 0) || initDays[0];
    return available ? available.date : "";
  });
  const [selectedTime, setSelectedTime] = useState(() => {
    const initDays = buildWorkingHoursSchedule(10, 2);
    const available = initDays.find((d) => d.times.length > 0) || initDays[0];
    return available?.times?.[0] || "";
  });
  const resolveTargetService = (req, init, sp) => {
    const target = req?.service || init || sp?.get("service") || sp?.get("serviceId");
    if (!target) return null;
    return (
      CLASSIC_SERVICES.find(
        (s) =>
          s.id === target ||
          s.id.toLowerCase() === String(target).toLowerCase() ||
          s.id.includes(target) ||
          String(target).includes(s.id),
      )?.id || null
    );
  };

  const [service, setService] = useState(() => resolveTargetService(bookingRequest, initialService, searchParams) || CLASSIC_SERVICES[0].id);
  const [name, setName] = useState(() => bookingRequest?.name || "");
  const [phone, setPhone] = useState(() => (bookingRequest?.phone ? formatUzPhone(bookingRequest.phone) : "+998 "));
  const [dob, setDob] = useState("");
  const [note, setNote] = useState(() => bookingRequest?.note || "");
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const formMountTimeRef = useRef(0);
  const prevBookingRequestRef = useRef(bookingRequest);

  useEffect(() => {
    formMountTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (bookingRequest && bookingRequest !== prevBookingRequestRef.current) {
      prevBookingRequestRef.current = bookingRequest;
      if (bookingRequest.service) {
        const match = CLASSIC_SERVICES.find(
          (s) =>
            s.id === bookingRequest.service ||
            s.id.toLowerCase() === String(bookingRequest.service).toLowerCase() ||
            s.id.includes(bookingRequest.service) ||
            String(bookingRequest.service).includes(s.id),
        );
        if (match) setService(match.id);
      }
      if (bookingRequest.name) setName(bookingRequest.name);
      if (bookingRequest.phone) setPhone(formatUzPhone(bookingRequest.phone));
      if (bookingRequest.note) setNote(bookingRequest.note);
    }
  }, [bookingRequest]);

  const [isRelayEnabled, setIsRelayEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [botQr, setBotQr] = useState("");

  const applyScheduleData = useCallback((rawDays) => {
    const filtered = filterAvailabilitySchedule(rawDays, 2);
    const validDays = filtered.length > 0 ? filtered : buildWorkingHoursSchedule(10, 2);
    setDays(validDays);
    setSelectedDate((cur) => {
      const match =
        validDays.find((d) => d.times.length > 0 && d.date === cur) ||
        validDays.find((d) => d.times.length > 0) ||
        validDays[0];
      if (match) {
        setSelectedTime((curT) => (match.times.includes(curT) ? curT : match.times[0] || ""));
      }
      return match ? match.date : "";
    });
  }, []);

  const loadAvailability = useCallback(async () => {
    try {
      const data = await fetchDentistAvailability();
      if (data?.enabled === false) {
        setIsRelayEnabled(false);
        applyScheduleData(buildWorkingHoursSchedule(10, 2));
        return;
      }
      if (Array.isArray(data?.days)) {
        setIsRelayEnabled(true);
        applyScheduleData(data.days);
        return;
      }
      setIsRelayEnabled(false);
      applyScheduleData(buildWorkingHoursSchedule(10, 2));
    } catch {
      setIsRelayEnabled(false);
      applyScheduleData(buildWorkingHoursSchedule(10, 2));
    }
  }, [applyScheduleData]);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  const todayStr = useMemo(() => getClinicTodayStr(), []);

  const firstDayWithSlots = useMemo(
    () => days.find((d) => d.times && d.times.length > 0) || null,
    [days],
  );

  const activeDay = useMemo(
    () => days.find((d) => d.date === selectedDate) || firstDayWithSlots || days[0] || null,
    [days, selectedDate, firstDayWithSlots],
  );

  const serviceObj = CLASSIC_SERVICES.find((s) => s.id === service) || CLASSIC_SERVICES[0];
  const serviceLabel = serviceObj[lang] || serviceObj.uz;

  const handlePhoneChange = (e) => {
    const formatted = formatUzPhone(e.target.value, phone);
    setPhone(formatted);
    if (errors.phone && isUzPhoneComplete(formatted)) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Anti-Bot Honeypot Protection
    if (isBotSubmission(honeypot)) {
      // Fake success to trap automated bot scrapers without calling backend relay
      setIsSuccess(true);
      return;
    }

    // 2. Velocity check: human patient takes at least 1.2s to fill the form
    if (Date.now() - formMountTimeRef.current < 1200) {
      toast.warn(lang === "uz" ? "Iltimos, ma'lumotlarni tekshirib qayta bosing." : "Пожалуйста, проверьте данные.");
      return;
    }

    // 3. Client session rate-limiting (10-second cooldown)
    const rateStatus = checkRateLimit("booking_submission", 10);
    if (!rateStatus.allowed) {
      toast.warn(rateStatus.message);
      return;
    }

    // 4. Input sanitization & validation
    const cleanName = sanitizePatientName(name);
    const nextErrors = {};
    if (cleanName.length < 2) nextErrors.name = t.needName;
    if (!phone.trim() || !isUzPhoneComplete(phone)) {
      nextErrors.phone = t.needPhone;
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error(nextErrors.name || nextErrors.phone);
      return;
    }
    if (!selectedDate || !selectedTime) {
      toast.error(t.needTime);
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanNote = sanitizeNote(note, 300);
      const combinedNote = cleanNote ? `${serviceLabel} — ${cleanNote}` : serviceLabel;
      const res = await submitDentistBooking({
        date: selectedDate,
        time: selectedTime,
        name: cleanName,
        phone: phone.trim(),
        dob: dob.trim(),
        note: combinedNote,
      });

      setBookingResult(res);

      if (res.telegramUrl) {
        import("qrcode")
          .then((mod) =>
            (mod.default || mod).toDataURL(res.telegramUrl, {
              margin: 2,
              width: 180,
              color: { dark: "#0088cc", light: "#ffffff" },
            }),
          )
          .then(setBotQr)
          .catch(() => setBotQr(""));
      }

      setIsSuccess(true);
      // Automatically re-fetch availability so the booked time slot is immediately removed
      loadAvailability();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#DF301C", "#FF9100", "#00B7CD"],
      });
    } catch (err) {
      if (err?.status === 409) {
        toast.error(t.conflictError);
        loadAvailability();
        return;
      }
      toast.error(err?.message || t.failed);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && bookingResult) {
    return (
      <section id="booking" className="py-12 bg-white rounded-3xl border border-amber-200 shadow-luxury p-6 sm:p-10 text-center max-w-3xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black">
          ✓
        </div>
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200">
            {t.successBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-classic">
            {t.successTitle}
          </h3>
          <p className="text-sm text-slate-600">
            {t.successBody}
          </p>
        </div>

        {/* Appointment Summary */}
        <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-amber-200 text-left space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-amber-100 pb-2">
            <span className="text-slate-500">{t.summaryPatient}:</span>
            <span className="font-bold text-slate-900">{name}</span>
          </div>
          <div className="flex justify-between border-b border-amber-100 pb-2">
            <span className="text-slate-500">{t.summaryPhone}:</span>
            <span className="font-bold text-slate-900">{phone}</span>
          </div>
          {dob && (
            <div className="flex justify-between border-b border-amber-100 pb-2">
              <span className="text-slate-500">{t.summaryDob}:</span>
              <span className="font-medium text-slate-700">{dob}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-amber-100 pb-2">
            <span className="text-slate-500">{t.summaryService}:</span>
            <span className="font-bold text-primary">{serviceLabel}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">{t.summaryWhen}:</span>
            <span className="font-black text-emerald-700 text-sm sm:text-base">{formatDmy(selectedDate)} — {selectedTime}</span>
          </div>
        </div>

        {/* Telegram Action Card */}
        {bookingResult.telegramUrl && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50/50 border border-emerald-200/80 space-y-4 text-left shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                <span>{t.telegramCardTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {t.telegramCardDesc}
              </p>
            </div>

            {botQr && (
              <div className="flex justify-center pt-1">
                <img src={botQr} alt="Telegram QR" className="w-36 h-36 rounded-xl border border-sky-200 shadow-xs bg-white p-1.5" />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start pt-2">
              <a
                href={bookingResult.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs sm:text-sm font-bold shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <IconTelegram className="w-4 h-4 text-white" />
                <span>{t.telegramCardBtn}</span>
              </a>

              <a
                href={DOCTOR_INFO.phoneHref}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <IconPhone className="w-4 h-4 text-primary" />
                <span>{DOCTOR_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setIsSuccess(false);
            setBookingResult(null);
          }}
          className="text-xs font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer"
        >
          {t.bookAnother}
        </button>
      </section>
    );
  }

  return (
    <section id="booking" className="py-12 bg-white rounded-3xl border border-amber-200 shadow-luxury p-5 sm:p-8 lg:p-10 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {t.kicker}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-serif-classic">
            {t.heading}
          </h2>
          <p className="text-sm text-slate-600">
            {t.sub}
          </p>
        </div>

        {/* Fallback polite banner if online booking paused on relay */}
        {!isRelayEnabled && (
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-base">📞</span>
              <span>{t.pausedNotice}</span>
            </div>
            <a
              href={DOCTOR_INFO.phoneHref}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover transition-colors whitespace-nowrap"
            >
              {DOCTOR_INFO.phoneDisplay}
            </a>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Anti-Bot Honeypot Trap (invisible to humans and screen-readers) */}
          <div
            aria-hidden="true"
            className="opacity-0 pointer-events-none absolute -left-[9999px] -top-[9999px] w-0 h-0 overflow-hidden"
            tabIndex={-1}
          >
            <label htmlFor="patient_hp_fax">Do not fill this field</label>
            <input
              id="patient_hp_fax"
              type="text"
              name="patient_hp_fax"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Service Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.serviceLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {CLASSIC_SERVICES.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setService(s.id)}
                  className={`p-3 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer flex items-center justify-between ${
                    service === s.id
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-[#FFFDF9] text-slate-800 border-amber-200/80 hover:bg-amber-50/60"
                  }`}
                >
                  <span className="truncate">{s[lang] || s.uz}</span>
                  {service === s.id && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Step 1: Select Day */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.dayGroupLabel}
              </label>
              <span className="text-[11px] text-slate-500 font-medium">{clinicHours.days} ({clinicHours.hours})</span>
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 px-1 -mx-2 sm:mx-0 no-scrollbar scroll-touch">
              {days.map((d) => {
                const isToday = d.date === todayStr;
                const isSelected = selectedDate === d.date;
                const count = d.times?.length || 0;
                const isFull = count === 0;

                return (
                  <button
                    type="button"
                    key={d.date}
                    onClick={() => {
                      setSelectedDate(d.date);
                      if (count > 0 && (!selectedTime || !d.times.includes(selectedTime))) {
                        setSelectedTime(d.times[0]);
                      }
                    }}
                    className={`px-4 py-3 rounded-2xl text-xs font-bold shrink-0 border transition-all cursor-pointer text-left ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-luxury scale-105"
                        : isFull
                        ? "bg-slate-50/90 text-slate-400 border-slate-200/90 hover:bg-slate-100"
                        : "bg-[#FFFDF9] text-slate-700 border-amber-200/80 hover:bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{formatDayPill(d.date, lang)}</span>
                      {isToday && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wide border ${
                            isSelected
                              ? "bg-white/20 text-white border-white/30"
                              : isFull
                              ? "bg-slate-200 text-slate-600 border-slate-300"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {lang === "uz" ? "Bugun" : lang === "ru" ? "Сегодня" : "Today"}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] font-normal opacity-90 mt-1">
                      {isFull
                        ? (isToday ? t.slotsFullToday : t.slotsFullOther)
                        : `${count} ${t.slotsLabel}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Time Slot */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.timeGroupLabel}
              </label>
              {selectedDate && selectedTime && activeDay && activeDay.times?.includes(selectedTime) && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{t.selectedSlotLabel} {formatDmy(selectedDate)} — {selectedTime}</span>
                </span>
              )}
            </div>

            {activeDay && activeDay.times?.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-11 gap-2 pt-1">
                {activeDay.times.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedTime === slot
                        ? "bg-primary text-white border-primary shadow-xs scale-102"
                        : "bg-[#FFFDF9] text-slate-800 border-amber-200/80 hover:bg-amber-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {selectedDate === todayStr ? t.noSlotsTodayMessage : t.slotsFullOther}
                </p>
                {firstDayWithSlots && firstDayWithSlots.date !== selectedDate && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDate(firstDayWithSlots.date);
                      setSelectedTime(firstDayWithSlots.times[0]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>{t.nextAvailableDayBtn}</span>
                    <span className="opacity-80 font-normal">({formatDmy(firstDayWithSlots.date)})</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Step 3: Patient Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-100">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                maxLength={70}
                autoComplete="name"
                spellCheck={false}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {t.phoneLabel}
              </label>
              <input
                type="tel"
                required
                maxLength={22}
                autoComplete="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder={t.phonePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              />
            </div>

            {/* Date of Birth (dob) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  {t.dobLabel}
                </label>
                <span className="text-[10px] text-slate-400 font-medium">{t.dobFormat}</span>
              </div>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                min="1920-01-01"
                max={todayStr}
                placeholder={t.dobPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                {t.dobHint}
              </p>
            </div>

            {/* Note / Complaint */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {t.noteLabel}
              </label>
              <input
                type="text"
                maxLength={300}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t.notePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-bold text-sm uppercase tracking-wider shadow-luxury transition-all cursor-pointer hover:shadow-luxury-lg hover:-translate-y-0.5"
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default InlineBookingSection;
