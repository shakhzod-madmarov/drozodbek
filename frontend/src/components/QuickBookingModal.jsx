import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useModalA11y } from "../hooks/useModalA11y";
import { getA11yLabels } from "../constants/a11yLabels";
import { DOCTOR_INFO } from "../constants/doctor";
import { CLASSIC_SERVICES } from "../constants/bookingServices";
import {
  fetchDentistAvailability,
  submitDentistBooking,
  buildWorkingHoursSchedule,
} from "../lib/medinsonBooking";
import { formatUzPhone, isUzPhoneComplete } from "../utils/phone";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { IconTelegram, IconPhone } from "./MedicalIcons";

const formatDmy = (ymd) => {
  const [y, m, d] = String(ymd || "").split("-");
  if (!y || !m || !d) return ymd;
  return `${d}.${m}.${y}`;
};

const QuickBookingModal = ({
  isOpen,
  initialService = null,
  initialName = "",
  initialPhone = "",
  initialNote = "",
  onClose,
}) => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const modalRef = useModalA11y(isOpen, onClose);

  const [days, setDays] = useState(() => buildWorkingHoursSchedule(7));
  const [selectedDate, setSelectedDate] = useState(() => (days[0] ? days[0].date : ""));
  const [selectedTime, setSelectedTime] = useState(() => (days[0]?.times[0] || "09:00"));
  const [service, setService] = useState(initialService || CLASSIC_SERVICES[0].id);
  const [name, setName] = useState(initialName || "");
  const [phone, setPhone] = useState(initialPhone || "+998 ");
  const [dob, setDob] = useState("");
  const [note, setNote] = useState(initialNote || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const loadAvailability = useCallback(async () => {
    try {
      const data = await fetchDentistAvailability();
      if (Array.isArray(data?.days)) {
        const validDays = data.days.filter((d) => Array.isArray(d.times) && d.times.length > 0);
        if (validDays.length > 0) {
          setDays(validDays);
          setSelectedDate((cur) => {
            const match = validDays.find((d) => d.date === cur) || validDays[0];
            if (match) {
              setSelectedTime((curT) => (match.times.includes(curT) ? curT : match.times[0] || "09:00"));
            }
            return match ? match.date : "";
          });
          return;
        }
      }
      setDays(buildWorkingHoursSchedule(7));
    } catch {
      setDays(buildWorkingHoursSchedule(7));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadAvailability();
    }
  }, [isOpen, loadAvailability]);

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialName) setName(initialName);
    if (initialPhone) setPhone(formatUzPhone(initialPhone));
    if (initialNote) setNote(initialNote);
  }, [initialService, initialName, initialPhone, initialNote]);

  const activeDay = days.find((d) => d.date === selectedDate) || days[0];
  const serviceObj = CLASSIC_SERVICES.find((s) => s.id === service) || CLASSIC_SERVICES[0];
  const serviceLabel = serviceObj[lang] || serviceObj.uz;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error(lang === "ru" ? "Введите ваше имя" : "Iltimos, ismingizni kiriting");
      return;
    }
    if (!phone.trim() || !isUzPhoneComplete(phone)) {
      toast.error(lang === "ru" ? "Введите номер телефона" : "Iltimos, telefon raqamingizni to'liq kiriting");
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
        dob: dob.trim(),
        note: combinedNote,
      });

      setBookingResult(res);
      setIsSuccess(true);
      loadAvailability();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#DF301C", "#FF9100", "#00B7CD"],
      });
    } catch (err) {
      if (err?.status === 409) {
        toast.error("Bu vaqt band qilingan. Iltimos, boshqa vaqtni tanlang.");
        loadAvailability();
        return;
      }
      toast.error(err?.message || (lang === "ru" ? "Ошибка отправки" : "Xatolik yuz berdi"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={a11y.quickBookingModal}
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-primary">
              {lang === "uz" ? "ONLAYN QABUL" : lang === "ru" ? "ОНЛАЙН ЗАПИСЬ" : "APPOINTMENT"}
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-serif-classic">
              {DOCTOR_INFO.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {isSuccess && bookingResult ? (
          <div className="text-center space-y-5 py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-900 font-serif-classic">
                {lang === "uz" ? "Qabulingiz Muvaffaqiyatli Ro'yxatga Olindi!" : "Вы успешно записаны!"}
              </h4>
              <p className="text-xs text-slate-600">
                {lang === "uz"
                  ? `${formatDmy(selectedDate)} kuni soat ${selectedTime} da Dr. Ozodbek qabuliga kutilasiz.`
                  : `Ждём вас ${formatDmy(selectedDate)} в ${selectedTime}.`}
              </p>
            </div>

            {/* Telegram Action Card */}
            {bookingResult.telegramUrl && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50/50 border border-emerald-200/80 space-y-3 text-left">
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>📲 Telegram eslatmani yoqing</span>
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Qabul vaqti yaqinlashganda Telegram orqali avtomatik eslatma olish uchun quyidagi tugmani bosing va botda START tugmasini bosing.
                  </p>
                </div>
                <a
                  href={bookingResult.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <IconTelegram className="w-4 h-4 text-white" />
                  <span>Telegram botga ulanish ↗</span>
                </a>
              </div>
            )}

            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer"
            >
              {lang === "uz" ? "Oynani yopish" : "Закрыть"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {lang === "uz" ? "Xizmat yo'nalishi:" : "Направление услуги:"}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CLASSIC_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s[lang] || s.uz}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and time grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {lang === "uz" ? "Kun:" : "День:"}
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    const match = days.find((d) => d.date === e.target.value);
                    if (match?.times?.length > 0) setSelectedTime(match.times[0]);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {days.map((d) => (
                    <option key={d.date} value={d.date}>
                      {formatDmy(d.date)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {lang === "uz" ? "Bo'sh soat:" : "Время:"}
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {activeDay?.times?.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {lang === "uz" ? "Ism va familiya *:" : "Имя и фамилия *:"}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Sardorbek Karimov"
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {lang === "uz" ? "Telefon raqami *:" : "Номер телефона *:"}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatUzPhone(e.target.value, phone))}
                placeholder="+998 97 833 89 97"
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Date of Birth (dob) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  {lang === "uz" ? "Tug'ilgan sana (ixtiyoriy):" : "Дата рождения (необязательно):"}
                </label>
                <span className="text-[10px] text-slate-400">YYYY-MM-DD</span>
              </div>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                min="1920-01-01"
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-[10px] text-slate-500">
                {lang === "uz"
                  ? "Bitta raqamdan bir nechta oila a'zolari yozilganda bemorlarni farqlash uchun."
                  : "Помогает различать членов семьи при записи с одного номера."}
              </p>
            </div>

            {/* Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {lang === "uz" ? "Shikoyat yoki izoh (ixtiyoriy):" : "Жалоба или комментарий:"}
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tish og'rig'i, implant, breket yoki vinir..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider shadow-luxury transition-all cursor-pointer"
            >
              {isSubmitting
                ? (lang === "ru" ? "Отправка..." : "Yuborilmoqda...")
                : (lang === "ru" ? "Подтвердить запись" : "Qabulga Yozilishni Tasdiqlash")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuickBookingModal;
