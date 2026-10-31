/**
 * Security and Data Sanitization Utilities
 * Protects against XSS, HTML injection, spam flooding, and data leakage.
 */

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_REGEX = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
const HTML_TAGS_REGEX = /<[^>]*>?/gm;

/**
 * Strips HTML tags, null bytes, and non-printable control characters.
 * Limits the length to prevent payload buffer overflow or memory attacks.
 */
export const sanitizeText = (raw = "", maxLength = 500) => {
  if (typeof raw !== "string") return "";
  return raw
    .replace(CONTROL_CHARS_REGEX, "")
    .replace(HTML_TAGS_REGEX, "")
    .trim()
    .slice(0, maxLength);
};

/**
 * Sanitizes and validates a patient full name.
 * Allows letters, spaces, hyphens, and apostrophes (standard for Uzbek names e.g. O'ktam, G'ofur).
 */
export const sanitizePatientName = (name = "") => {
  const cleaned = sanitizeText(name, 80);
  // Remove any remaining dangerous characters like brackets, quotes, slashes, or symbols
  return cleaned.replace(/[<>{}[\]\\/~`!@#$%^*+=|;:"?]/g, "").trim();
};

/**
 * Sanitizes medical notes and patient complaints.
 */
export const sanitizeNote = (note = "", maxLength = 400) => {
  return sanitizeText(note, maxLength);
};

/**
 * Validates ISO date format YYYY-MM-DD within realistic medical bounds.
 */
export const isValidIsoDate = (dateStr = "") => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [year, month, day] = dateStr.split("-").map(Number);
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const parsed = new Date(dateStr);
  return !isNaN(parsed.getTime());
};

/**
 * Client-side session submission rate limiter (cooldown).
 * Prevents rapid automated form spamming or accidental double-submissions.
 */
const submissionTimestamps = new Map();

export const checkRateLimit = (actionKey = "booking_submit", cooldownSeconds = 12) => {
  const now = Date.now();
  const lastTime = submissionTimestamps.get(actionKey) || 0;
  const elapsed = (now - lastTime) / 1000;

  if (elapsed < cooldownSeconds) {
    const remaining = Math.ceil(cooldownSeconds - elapsed);
    return {
      allowed: false,
      remainingSeconds: remaining,
      message: `Iltimos, ${remaining} soniya kuting (Пожалуйста, подождите ${remaining} сек).`,
    };
  }

  submissionTimestamps.set(actionKey, now);
  return { allowed: true, remainingSeconds: 0 };
};

/**
 * Validates honeypot field. If filled, the request is from an automated bot.
 */
export const isBotSubmission = (honeypotValue = "") => {
  return typeof honeypotValue === "string" && honeypotValue.trim().length > 0;
};
