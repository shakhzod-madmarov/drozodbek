import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import {
  IconClock,
  IconCheckCircle,
  IconPhone,
  IconTelegram,
  IconShieldCheck,
} from "./MedicalIcons";
import { DOCTOR_INFO } from "../constants/doctor";
import {
  fetchDentistAvailability,
  submitDentistBooking,
  buildWorkingHoursSchedule,
} from "../lib/bookingRelay";
import {
  formatUzPhone,
  PHONE_PLACEHOLDER,
  isUzPhoneComplete,
} from "../utils/phone";
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
    defaultDaysLabel: "Dushanba - Shanba",
    serviceLabel: "Xizmat yo'nalishi",
    dayGroupLabel: "1-qadam: Qabul kunini tanlang",
    timeGroupLabel: "2-qadam: Bo'sh vaqtni tanlang",
    selectedSlotLabel: "Tanlangan vaqt:",
    nameLabel: "Ism-sharif *",
    phoneLabel: "Telefon raqami *",
    noteLabel: "Shikoyat yoki tanlangan xizmat",
    namePlaceholder: "Masalan: Sardorbek Karimov",
    phonePlaceholder: "+998 97 833 89 97",
    notePlaceholder: "Implant, breket, karonka, vinir yoki og'riqsiz davolash bo'yicha...",
    submit: "Tasdiqlash va Qabulga Yozilish",
    submitting: "Yuborilmoqda...",
    needName: "Iltimos, ism-sharifingiz va telefon raqamingizni kiriting",
    needTime: "Iltimos, sana va vaqtni tanlang",
    taken: "Bu vaqt band qilingan. Iltimos, boshqa soatni tanlang.",
    failed: "So'rovni yuborib bo'lmadi. Iltimos, telefon orqali bog'laning.",
    successBadge: "Qabul so'rovi muvaffaqiyatli qabul qilindi",
    successTitle: "Navbatingiz ro'yxatga olindi!",
    successBody:
      "So'rovingiz Dr. Ozodbek Otaxonovga yetkazildi. Telegram orqali 1-bosishda tasdiqlashingiz mumkin:",
    summaryPatient: "Bemor",
    summaryPhone: "Telefon",
    summaryService: "Xizmat",
    summaryWhen: "Sana va soat",
    botTitle: "📲 Telegram orqali tasdiqlash va eslatma",
    botDesc:
      "Qabul vaqti haqida xabar berish uchun Telegram tugmasini bosing:",
    botBtn: "Telegram orqali xabar yuborish (@Stamatolog07) ↗",
    callBtn: "Telefon orqali qo'ng'iroq qilish",
  },
  ru: {
    kicker: "Онлайн приём · Д-р Озодбек Отахонов",
    heading: "Выберите удобное время визита",
    sub: "Выберите свободный день и время для записи на приём к Д-ру Озодбеку Отахонову без очереди.",
    defaultDaysLabel: "Понедельник - Суббота",
    serviceLabel: "Направление лечения",
    dayGroupLabel: "Шаг 1: Выберите день",
    timeGroupLabel: "Шаг 2: Выберите свободное время",
    selectedSlotLabel: "Выбранное время:",
    nameLabel: "Ваше имя *",
    phoneLabel: "Номер телефона *",
    noteLabel: "Жалоба или пожелание",
    namePlaceholder: "Например: Сардор Каримов",
    phonePlaceholder: "+998 97 833 89 97",
    notePlaceholder: "Имплантация, брекеты, коронки, виниры или острая боль...",
    submit: "Подтвердить Запись на Приём",
    submitting: "Отправка...",
    needName: "Пожалуйста, введите имя и номер телефона",
    needTime: "Пожалуйста, выберите дату и время",
    taken: "Это время уже занято. Пожалуйста, выберите другое.",
    failed: "Не удалось отправить заявку. Пожалуйста, позвоните нам.",
    successBadge: "Заявка успешно зарегистрирована",
    successTitle: "Вы записаны на приём!",
    successBody:
      "Ваша запись зарегистрирована. Подтвердите её в Telegram одним нажатием:",
    summaryPatient: "Пациент",
    summaryPhone: "Телефон",
    summaryService: "Услуга",
    summaryWhen: "Дата и время",
    botTitle: "📲 Подтверждение и напоминание в Telegram",
    botDesc:
      "Нажмите кнопку Telegram для быстрой отправки деталей доктору:",
    botBtn: "Отправить в Telegram (@Stamatolog07) ↗",
    callBtn: "Позвонить по телефону",
  },
  en: {
    kicker: "Online Appointment · Dr. Ozodbek Otaxonov",
    heading: "Select your visit time",
    sub: "Choose an available date and time slot to reserve your appointment with Dr. Ozodbek Otaxonov.",
    defaultDaysLabel: "Monday - Saturday",
    serviceLabel: "Service Specialty",
    dayGroupLabel: "Step 1: Choose appointment date",
    timeGroupLabel: "Step 2: Choose available time",
    selectedSlotLabel: "Selected slot:",
    nameLabel: "Full Name *",
    phoneLabel: "Phone Number *",
    noteLabel: "Concern or Notes",
    namePlaceholder: "e.g. Sardor Karimov",
    phonePlaceholder: "+998 97 833 89 97",
    notePlaceholder: "Implants, braces, crowns, veneers or toothache...",
    submit: "Confirm Appointment Booking",
    submitting: "Submitting...",
    needName: "Please enter your name and phone number",
    needTime: "Please choose a date and time slot",
    taken: "This slot is already booked. Please choose another slot.",
    failed: "Submission failed. Please call us directly.",
    successBadge: "Appointment Request Confirmed",
    successTitle: "Your visit has been registered!",
    successBody:
      "Your appointment has been registered. Confirm with Dr. Ozodbek via Telegram:",
    summaryPatient: "Patient",
    summaryPhone: "Phone",
    summaryService: "Service",
    summaryWhen: "Date & Time",
    botTitle: "📲 Telegram Confirmation & Reminder",
    botDesc:
      "Click the Telegram button below to send details directly to the doctor:",
    botBtn: "Open Telegram Chat (@Stamatolog07) ↗",
    callBtn: "Call Doctor Directly",
  },
};

const InlineBookingSection = () => {
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.uz;

  const [days, setDays] = useState(() => buildWorkingHoursSchedule(10));
  const [selectedDate, setSelectedDate] = useState(() => (days[0] ? days[0].date : ""));
  const [selectedTime, setSelectedTime] = useState(() => (days[0]?.times[0] || ""));
  const [service, setService] = useState(CLASSIC_SERVICES[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [botQr, setBotQr] = useState("");

  const loadAvailability = useCallback(() => {
    fetchDentistAvailability()
      .then((data) => {
        if (Array.isArray(data?.days) && data.days.length > 0) {
          setDays(data.days);
          setSelectedDate((cur) => {
            const match = data.days.find((d) => d.date === cur) || data.days[0];
            if (match) {
              setSelectedTime((curT) => (match.times.includes(curT) ? curT : match.times[0] || ""));
            }
            return match ? match.date : "";
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  const activeDay = useMemo(
    () => days.find((d) => d.date === selectedDate) || days[0] || null,
    [days, selectedDate],
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
    const nextErrors = {};
    if (name.trim().length < 2) nextErrors.name = t.needName;
    if (!phone.trim() || !isUzPhoneComplete(phone)) {
      nextErrors.phone = lang === "ru" ? "Неверный номер телефона" : "Telefon raqami to'liq kiritilishi kerak";
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
      const combinedNote = note.trim() ? `${serviceLabel} — ${note.trim()}` : serviceLabel;
      const res = await submitDentistBooking({
        date: selectedDate,
        time: selectedTime,
        name: name.trim(),
        phone: phone.trim(),
        note: combinedNote,
      });

      setBookingResult(res);

      if (res.telegramUrl) {
        import("qrcode")
          .then((mod) =>
            (mod.default || mod).toDataURL(res.telegramUrl, {
              margin: 2,
              width: 180,
              color: { dark: "#DF301C", light: "#ffffff" },
            }),
          )
          .then(setBotQr)
          .catch(() => setBotQr(""));
      }

      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#DF301C", "#FF9100", "#00B7CD"],
      });
    } catch {
      toast.error(t.failed);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && bookingResult) {
    return (
      <section id="booking" className="py-12 bg-white rounded-3xl border border-amber-200 shadow-luxury p-6 sm:p-10 text-center max-w-3xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
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
        <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-amber-200 text-left space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">{t.summaryPatient}:</span>
            <span className="font-bold text-slate-900">{name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">{t.summaryPhone}:</span>
            <span className="font-bold text-slate-900">{phone}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">{t.summaryService}:</span>
            <span className="font-bold text-primary">{serviceLabel}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">{t.summaryWhen}:</span>
            <span className="font-bold text-emerald-700">{formatDmy(selectedDate)} — {selectedTime}</span>
          </div>
        </div>

        {/* Telegram Direct Action Box */}
        <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-sky-950">{t.botTitle}</h4>
            <p className="text-xs text-sky-800">{t.botDesc}</p>
          </div>

          {botQr && (
            <div className="flex justify-center">
              <img src={botQr} alt="Telegram QR" className="w-36 h-36 rounded-xl border border-sky-200 shadow-xs" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={bookingResult.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <IconTelegram className="w-4 h-4 text-white" />
              <span>{t.botBtn}</span>
            </a>

            <a
              href={DOCTOR_INFO.phoneHref}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <IconPhone className="w-4 h-4 text-primary" />
              <span>{DOCTOR_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        <button
          onClick={() => {
            setIsSuccess(false);
            setBookingResult(null);
          }}
          className="text-xs font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer"
        >
          ← {lang === "uz" ? "Yangi qabulga yozilish" : lang === "ru" ? "Записаться ещё раз" : "Book another appointment"}
        </button>
      </section>
    );
  }

  return (
    <section id="booking" className="py-12 bg-white rounded-3xl border border-amber-200 shadow-luxury p-5 sm:p-8 lg:p-10">
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

        <form onSubmit={handleSubmit} className="space-y-8">
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
              <span className="text-[11px] text-slate-500 font-medium">{t.defaultDaysLabel}</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scroll-touch">
              {days.map((d) => (
                <button
                  type="button"
                  key={d.date}
                  onClick={() => {
                    setSelectedDate(d.date);
                    if (d.times?.length > 0 && !d.times.includes(selectedTime)) {
                      setSelectedTime(d.times[0]);
                    }
                  }}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold shrink-0 border transition-all cursor-pointer ${
                    selectedDate === d.date
                      ? "bg-primary text-white border-primary shadow-luxury scale-105"
                      : "bg-[#FFFDF9] text-slate-700 border-amber-200/80 hover:bg-amber-50"
                  }`}
                >
                  <div>{formatDayPill(d.date, lang)}</div>
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">
                    {d.times?.length || 0} {lang === "uz" ? "bo'sh soat" : lang === "ru" ? "мест" : "slots"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Time Slot */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.timeGroupLabel}
              </label>
              {selectedDate && selectedTime && (
                <span className="text-xs font-bold text-emerald-700">
                  {t.selectedSlotLabel} {formatDmy(selectedDate)} — {selectedTime}
                </span>
              )}
            </div>

            {activeDay && activeDay.times?.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                {activeDay.times.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedTime === slot
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-[#FFFDF9] text-slate-800 border-amber-200/80 hover:bg-amber-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {lang === "uz" ? "Ushbu kunda bo'sh soat qolmagan." : "На эту дату нет свободных мест."}
              </p>
            )}
          </div>

          {/* Step 3: Patient Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-100">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {t.phoneLabel}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={handlePhoneChange}
                placeholder={t.phonePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {t.noteLabel}
              </label>
              <input
                type="text"
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
