export const LANGS = ["uz", "ru", "en"];
export const DEFAULT_LANG = "uz";

export const langFromPath = (pathname = "/") => {
  const segment = pathname.split("/")[1];
  return LANGS.includes(segment) && segment !== DEFAULT_LANG ? segment : DEFAULT_LANG;
};

export const localizePath = (path = "/", lang = DEFAULT_LANG) => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
};

export const stripLangPrefix = (pathname = "/") => {
  const segment = pathname.split("/")[1];
  if (!LANGS.includes(segment) || segment === DEFAULT_LANG) return pathname || "/";
  const rest = pathname.slice(segment.length + 1);
  return rest === "" ? "/" : rest;
};
