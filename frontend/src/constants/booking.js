export const MEDINSON_API_URL = (
  (typeof import.meta !== "undefined" && (import.meta.env?.VITE_MEDINSON_API_URL || import.meta.env?.NEXT_PUBLIC_MEDINSON_API_URL)) ||
  "https://dentist-medinson-license.uz"
).replace(/\/+$/, "");

export const MEDINSON_SITE_ID =
  (typeof import.meta !== "undefined" && (import.meta.env?.VITE_MEDINSON_SITE_ID || import.meta.env?.NEXT_PUBLIC_MEDINSON_SITE_ID)) ||
  "pk54wckfbg";

export const MEDINSON_DOMAIN =
  (typeof import.meta !== "undefined" && (import.meta.env?.VITE_MEDINSON_DOMAIN || import.meta.env?.NEXT_PUBLIC_MEDINSON_DOMAIN)) ||
  "drozodbek.uz";
