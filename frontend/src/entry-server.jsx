import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./context/LanguageProvider";
import { PrerenderContext, SEO_MARKER_TYPE } from "./context/SeoCollector";
import "./index.css";

const MARKER = new RegExp(
  "<script type=\"" + SEO_MARKER_TYPE + "\">([^]*?)</script>",
  "g"
);

export function render(url) {
  const raw = renderToString(
    <PrerenderContext.Provider value={true}>
      <StaticRouter location={url}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </StaticRouter>
    </PrerenderContext.Provider>
  );

  let seo = {};
  for (const match of raw.matchAll(MARKER)) {
    try {
      seo = { ...seo, ...JSON.parse(match[1]) };
    } catch {
      /* ignore */
    }
  }

  return { html: raw.replace(MARKER, ""), seo };
}
