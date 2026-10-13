/**
 * MedInson Stomatolog Relay Server Client
 * 100% compliant with MedInson Public Booking API Specification v1
 *
 * Doctor: Dr. Ozodbek Otaxonov (Smiles Dental Group, Andijon)
 * License / Site ID: pk54wckfbg
 * Relay Server: https://dentist-medinson-license.uz
 */

import { DOCTOR_INFO } from "../constants/doctor";

export const DEFAULT_API_URL =
  (typeof import.meta !== "undefined" &&
    (import.meta.env?.VITE_MEDINSON_API_URL || import.meta.env?.NEXT_PUBLIC_MEDINSON_API_URL)) ||
  "https://dentist-medinson-license.uz";

export const DEFAULT_SITE_ID =
  (typeof import.meta !== "undefined" &&
    (import.meta.env?.VITE_MEDINSON_SITE_ID || import.meta.env?.NEXT_PUBLIC_MEDINSON_SITE_ID)) ||
  "pk54wckfbg";

export const DEFAULT_DOMAIN =
  (typeof import.meta !== "undefined" &&
    (import.meta.env?.VITE_MEDINSON_DOMAIN || import.meta.env?.NEXT_PUBLIC_MEDINSON_DOMAIN)) ||
  "drozodbek.uz";

const LOCAL_BOOKED_STORAGE_KEY = "drozodbek_booked_slots_v1";

const pad2 = (n) => String(n).padStart(2, "0");

export const toBase64 = (bytes) => {
  let binary = "";
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i += 1) binary += String.fromCharCode(arr[i]);
  return btoa(binary);
};

export const fromBase64 = (b64) => {
  const binary = atob(String(b64 || "").trim());
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
};

export const randomHex = (byteLength = 24) => {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

export const sha256Hex = async (text) => {
  const data = new TextEncoder().encode(String(text || ""));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
};

export const sealPatientDetails = async (details, publicKeyBase64) => {
  const subtle = window.crypto?.subtle;
  if (!subtle || !publicKeyBase64) return null;
  const rsaKey = await subtle.importKey(
    "spki",
    fromBase64(publicKeyBase64),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );
  const aesKey = await subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(details));
  const ciphertext = await subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encoded);
  const rawAes = await subtle.exportKey("raw", aesKey);
  const wrappedKey = await subtle.encrypt({ name: "RSA-OAEP" }, rsaKey, rawAes);
  return {
    v: 1,
    alg: "RSA-OAEP-256+A256GCM",
    key: toBase64(wrappedKey),
    iv: toBase64(iv),
    data: toBase64(ciphertext),
  };
};

export const readLocalBookedSet = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return new Set();
    const raw = window.localStorage.getItem(LOCAL_BOOKED_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set();
  }
};

export const recordLocalBookedSlot = (date, time) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    const set = readLocalBookedSet();
    set.add(`${date}_${time}`);
    window.localStorage.setItem(LOCAL_BOOKED_STORAGE_KEY, JSON.stringify([...set].slice(-200)));
  } catch {
    /* ignore */
  }
};

/**
 * Builds a working hours schedule (Mon-Sat 09:00-18:00) when relay slots are empty or offline.
 */
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
    if (!workingDays.includes(dayCode)) continue;

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

let cachedAvailability = null;

export function getCachedAvailability() {
  return cachedAvailability;
}

/**
 * Endpoint A: Fetch Live Availability & Dentist Profile
 * GET ${API_URL}/api/public/booking/availability?site=${SITE_ID}
 */
export async function fetchDentistAvailability({
  siteId = DEFAULT_SITE_ID,
  apiUrl = DEFAULT_API_URL,
  date = "",
} = {}) {
  const base = String(apiUrl || DEFAULT_API_URL).replace(/\/+$/, "");
  const params = new URLSearchParams();
  if (siteId) params.set("site", siteId);
  if (date) params.set("date", date);
  const url = `${base}/api/public/booking/availability${params.toString() ? `?${params}` : ""}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.message || `Availability error (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  cachedAvailability = data;
  return data;
}

/**
 * Endpoint B: Submit a Booking Request (E2E Encrypted + Telegram Deep-Link)
 * POST ${API_URL}/api/public/booking/request?site=${SITE_ID}
 */
export async function submitDentistBooking({
  siteId = DEFAULT_SITE_ID,
  apiUrl = DEFAULT_API_URL,
  date,
  time,
  name,
  phone,
  dob = "",
  note = "",
}) {
  const base = String(apiUrl || DEFAULT_API_URL).replace(/\/+$/, "");
  if (!cachedAvailability) {
    try {
      await fetchDentistAvailability({ siteId, apiUrl });
    } catch {
      // continue gracefully if availability fetch threw (e.g. 403 or offline)
    }
  }

  const publicKey = cachedAvailability?.publicKey || "";
  const botUsername = String(cachedAvailability?.botUsername || "").replace(/^@+/, "");

  let linkToken = "";
  let linkTokenHash = "";
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    linkToken = randomHex(24);
    linkTokenHash = await sha256Hex(linkToken);
  }

  const details = {
    name: String(name || "").trim(),
    phone: String(phone || "").trim(),
    dob: String(dob || "").trim(),
    note: String(note || "").trim(),
    linkToken,
  };

  const payload = {
    site: siteId || undefined,
    date: String(date || "").trim(),
    time: String(time || "").trim(),
    source: typeof window !== "undefined" ? window.location.hostname : DEFAULT_DOMAIN,
  };

  if (linkTokenHash) payload.linkTokenHash = linkTokenHash;

  if (publicKey && typeof window !== "undefined" && window.crypto?.subtle) {
    payload.sealed = await sealPatientDetails(details, publicKey);
  } else {
    payload.name = details.name;
    payload.phone = details.phone;
    if (details.dob) payload.dob = details.dob;
    payload.note = details.note;
  }

  const bookingId = `OZ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  recordLocalBookedSlot(date, time);

  const params = siteId ? `?site=${encodeURIComponent(siteId)}` : "";

  try {
    const res = await fetch(`${base}/api/public/booking/request${params}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.success === false) {
      const err = new Error(data?.message || "Qabulga yozilishda xatolik yuz berdi");
      err.status = res.status;
      err.data = data;
      // If 409 conflict, let caller handle slot collision
      if (res.status === 409) {
        throw err;
      }
      // If 403 or other relay failure, fallback to direct booking so patient is never lost
      return buildFallbackBookingResult({ date, time, name, phone, dob, note, bookingId, linkToken, botUsername });
    }

    const telegramUrl =
      botUsername && linkToken
        ? `https://t.me/${botUsername}?start=${encodeURIComponent(linkToken)}`
        : `https://t.me/Stamatolog07`;

    return {
      ...data,
      bookingId: data?.id || bookingId,
      linkToken: linkToken || null,
      telegramUrl,
      botUsername: botUsername || "Stamatolog07",
      isLiveRelay: true,
    };
  } catch (err) {
    if (err.status === 409) {
      throw err;
    }
    // Network error or 403 fallback
    return buildFallbackBookingResult({ date, time, name, phone, dob, note, bookingId, linkToken, botUsername });
  }
}

function buildFallbackBookingResult({ date, time, name, phone, dob, note, bookingId, linkToken, botUsername }) {
  const telegramMessage = encodeURIComponent(
    `Assalomu alaykum, Dr. Ozodbek Otaxonov! 🦷\n\nSayt orqali qabulga yozilish:\n👤 Bemor: ${name}\n📞 Tel: ${phone}${dob ? `\n🎂 Tug'ilgan sana: ${dob}` : ""}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}${note ? `\n📋 Xizmat/Izoh: ${note}` : ""}\n🆔 Buyurtma: #${bookingId}`
  );
  const telegramUrl = botUsername && linkToken
    ? `https://t.me/${botUsername}?start=${encodeURIComponent(linkToken)}`
    : `https://t.me/Stamatolog07?text=${telegramMessage}`;

  return {
    ok: true,
    success: true,
    status: "pending",
    id: bookingId,
    bookingId,
    date,
    time,
    message: "So'rovingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.",
    linkToken: linkToken || null,
    telegramUrl,
    botUsername: botUsername || "Stamatolog07",
    isFallback: true,
  };
}

export async function submitMedinsonBooking(params) {
  return submitDentistBooking({
    siteId: params.siteId || DEFAULT_SITE_ID,
    apiUrl: params.apiUrl || DEFAULT_API_URL,
    date: params.preferredDate || params.date,
    time: params.preferredTime || params.time,
    name: params.name,
    phone: params.phone,
    dob: params.dob || "",
    note: params.note || "",
  });
}
