import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  LANGS,
  DEFAULT_LANG,
  localizePath,
  stripLangPrefix,
} from "../utils/language";
import { getPageSeo, PAGE_KEYWORDS, SITE_ORIGIN } from "../constants/seo";
import { PrerenderContext, SEO_MARKER_TYPE } from "../context/SeoCollector";

const withTrailingSlash = (path) => (path.endsWith("/") ? path : path + "/");

const urlFor = (path, lang) =>
  SITE_ORIGIN + withTrailingSlash(localizePath(path, lang));

const ROBOTS_INDEXABLE = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const GOOGLEBOT_INDEXABLE = "index, follow, max-image-preview:large";
const ROBOTS_NOINDEX = "noindex, follow";

const Seo = ({
  page,
  path,
  title,
  description,
  keywords,
  canonical,
  ogImage = `${SITE_ORIGIN}/dr_ozodbek_og.jpg`,
  schemaJson,
  noindex = false,
}) => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  const effectivePath = path || (noindex ? null : stripLangPrefix(pathname));
  const copy = page ? getPageSeo(page, lang) : null;
  const resolvedTitle = title || copy?.title;
  const resolvedDescription = description || copy?.description;
  const resolvedKeywords = keywords || PAGE_KEYWORDS[lang];
  const resolvedCanonical = canonical || (effectivePath ? urlFor(effectivePath, lang) : undefined);

  const alternates = effectivePath
    ? LANGS.map((code) => ({ hreflang: code, href: urlFor(effectivePath, code) }))
        .concat([{ hreflang: "x-default", href: urlFor(effectivePath, DEFAULT_LANG) }])
    : null;

  const schemaKey = schemaJson ? JSON.stringify(schemaJson) : null;
  const isPrerender = useContext(PrerenderContext);

  useEffect(() => {
    document.documentElement.lang = lang;

    if (resolvedTitle) {
      document.title = resolvedTitle;
    }

    if (resolvedDescription) {
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) descMeta.setAttribute("content", resolvedDescription);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", resolvedDescription);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", resolvedDescription);
    }

    if (resolvedKeywords) {
      const kwMeta = document.querySelector('meta[name="keywords"]');
      if (kwMeta) kwMeta.setAttribute("content", resolvedKeywords);
    }

    if (resolvedCanonical) {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) canonicalLink.setAttribute("href", resolvedCanonical);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", resolvedCanonical);
    }

    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute("content", ogImage);
      const twImg = document.querySelector('meta[name="twitter:image"]');
      if (twImg) twImg.setAttribute("content", ogImage);
    }

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute("content", noindex ? ROBOTS_NOINDEX : ROBOTS_INDEXABLE);
    }
    const googlebotMeta = document.querySelector('meta[name="googlebot"]');
    if (googlebotMeta) {
      googlebotMeta.setAttribute("content", noindex ? ROBOTS_NOINDEX : GOOGLEBOT_INDEXABLE);
    }

    let scriptTag = document.getElementById("seo-schema-json");
    if (schemaJson) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "seo-schema-json";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaJson);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [
    lang,
    resolvedTitle,
    resolvedDescription,
    resolvedKeywords,
    resolvedCanonical,
    ogImage,
    schemaKey,
    noindex,
  ]);

  if (isPrerender) {
    const payload = {
      title: resolvedTitle,
      description: resolvedDescription,
      keywords: resolvedKeywords,
      canonical: resolvedCanonical,
      ogImage,
      alternates,
      noindex,
      schemaJson,
    };
    return (
      <script
        type={SEO_MARKER_TYPE}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
      />
    );
  }

  return null;
};

export default Seo;
