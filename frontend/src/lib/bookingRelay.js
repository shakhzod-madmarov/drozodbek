import { DOCTOR_INFO } from "../constants/doctor";
import { MEDINSON_API_URL, MEDINSON_SITE_ID } from "../constants/booking";

const LOCAL_BOOKED_STORAGE_KEY = "drozodbek_booked_slots_v1";

const pad2 = (n) => String(n).padStart(2, "0");

const readLocalBookedSet = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return new Set();
    const raw = window.localStorage.getItem(LOCAL_BOOKED_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set();
  }
};

const recordLocalBookedSlot = (date, time) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    const set = readLocalBookedSet();
    set.add(`${date}_${time}`);
    window.localStorage.setItem(LOCAL_BOOKED_STORAGE_KEY, JSON.stringify([...set].slice(-200)));
  } catch {
    /* ignore */
  }
};

export const buildWorkingHoursSchedule = (daysCount = 10) => {
  const workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const bookedSet = readLocalBookedSet();
  const DAY_CODES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const out = [];

  const base = new Date();
  for (let i = 0; out.length < daysCount && i < 30; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const dayCode = DAY_CODES[d.getDay()];
    if (!workingDays.includes(dayCode)) continue; // skip non-working days (e.g. Sunday)

    const yyyy = d.getFullYear();
    const mm = pad2(d.getMonth() + 1);
    const dd = pad2(d.getDate());
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const slots = [
      "09:00", "09:45", "10:30", "11:15", "12:00",
      "14:00", "14:45", "15:30", "16:15", "17:00", "17:45"
    ].filter((t) => !bookedSet.has(`${dateStr}_${t}`));

    out.push({
      date: dateStr,
      times: slots,
      slots,
      isClosed: slots.length === 0,
    });
  }

  return out;
};

export async function fetchDentistAvailability() {
  const fallbackSchedule = buildWorkingHoursSchedule(10);
  const fallbackData = {
    ok: true,
    success: true,
    dentist: {
      name: DOCTOR_INFO.name,
      phone: DOCTOR_INFO.phoneRaw,
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      workingHours: { start: "08:30", end: "18:30" },
      telegramHandle: DOCTOR_INFO.telegramHandle,
    },
    days: fallbackSchedule,
  };

  try {
    const url = `${MEDINSON_API_URL}/api/public/booking/availability?site=${encodeURIComponent(MEDINSON_SITE_ID)}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("Unavailable");
    const data = await res.json();
    if (Array.isArray(data?.days) && data.days.length > 0) {
      return data;
    }
    return fallbackData;
  } catch {
    return fallbackData;
  }
}

export async function submitDentistBooking({
  date,
  time,
  name,
  phone,
  dob = "",
  note = "",
}) {
  const bookingId = `OZ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  recordLocalBookedSlot(date, time);

  // Compose Telegram prefilled direct message for Dr. Ozodbek
  const telegramMessage = encodeURIComponent(
    `Assalomu alaykum, Dr. Ozodbek Otaxonov! 🦷\n\nSayt orqali qabulga yozilish:\n👤 Bemor: ${name}\n📞 Tel: ${phone}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}${note ? `\n📋 Xizmat/Izoh: ${note}` : ""}\n🆔 Buyurtma: #${bookingId}`
  );

  const telegramUrl = `https://t.me/Stamatolog07?text=${telegramMessage}`;

  // Try background relay post if server configured, ignore network failures gracefully
  try {
    const payload = {
      site: MEDINSON_SITE_ID,
      date,
      time,
      name,
      phone,
      dob,
      note,
      bookingId,
    };
    await fetch(`${MEDINSON_API_URL}/api/public/booking/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    /* non-blocking */
  }

  return {
    ok: true,
    success: true,
    bookingId,
    slotDate: date,
    slotTime: time,
    telegramUrl,
    directTelegramHandle: "@Stamatolog07",
    phone: DOCTOR_INFO.phoneDisplay,
  };
}

export async function submitMedinsonBooking(params) {
  return submitDentistBooking({
    date: params.preferredDate || params.date,
    time: params.preferredTime || params.time,
    name: params.name,
    phone: params.phone,
    dob: params.dob,
    note: [params.serviceTitle, params.note].filter(Boolean).join(" — "),
  });
}
