export const MEDINSON_API_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDINSON_API_URL) || "https://dentist-medinson-license.uz"
).replace(/\/+$/, "");

export const MEDINSON_SITE_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDINSON_SITE_ID) || "drozodbek";

export const MEDINSON_DOMAIN =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDINSON_DOMAIN) || "drozodbek.uz";
