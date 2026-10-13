/**
 * Prerender every indexable route to static HTML.
 *
 * Runs after `vite build` and `vite build --ssr`.
 * Routes come from site-config.mjs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTES, SITE_ORIGIN, LANGS, DEFAULT_LANG, localizePath } from "./site-config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const templatePath = path.join(distDir, "index.html");

/* ── helpers ─────────────────────────────────────────────────────────────── */

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const replaceContent = (html, matcher, value) => {
  if (value == null) return html;
  return html.replace(matcher, (tag) =>
    tag.replace(/content="[^"]*"/, `content="${escapeAttr(value)}"`)
  );
};

const setMetaName = (html, name, value) =>
  replaceContent(html, new RegExp(String.raw`<meta\s+name="${name}"[^>]*>`), value);

const setMetaProperty = (html, property, value) =>
  replaceContent(html, new RegExp(String.raw`<meta\s+property="${property}"[^>]*>`), value);

const setTitle = (html, value) =>
  value == null
    ? html
    : html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(value)}</title>`);

const setCanonical = (html, value) =>
  value == null
    ? html.replace(/<link\s+rel="canonical"[^>]*>\s*/, "")
    : html.replace(/<link\s+rel="canonical"[^>]*>/, (tag) =>
        tag.replace(/href="[^"]*"/, `href="${escapeAttr(value)}"`)
      );

const setHtmlLang = (html, lang) =>
  html.replace(/<html([^>]*)\s+lang="[^"]*"/, `<html$1 lang="${lang}"`);

const injectAlternates = (html, alternates) => {
  let cleaned = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\s*\n?/gi, "");
  if (!alternates || alternates.length === 0) return cleaned;
  const tags = alternates
    .map((a) => `    <link rel="alternate" hreflang="${a.hreflang}" href="${escapeAttr(a.href)}" />`)
    .join("\n");
  return cleaned.replace(/(<link\s+rel="canonical"[^>]*>)/, `$1\n${tags}`);
};

const setNoindex = (html) =>
  html
    .replace(/<meta\s+name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow" />')
    .replace(/<meta\s+name="googlebot"[^>]*>/, '<meta name="googlebot" content="noindex, follow" />');

const injectSchema = (html, json) => {
  if (!json) return html;
  const safe = (typeof json === "string" ? json : JSON.stringify(json)).split("<").join(String.raw`\u003c`);
  return html.replace(
    "</head>",
    `  <script type="application/ld+json" data-prerendered="true">${safe}</script>\n  </head>`
  );
};

/* ── main ────────────────────────────────────────────────────────────────── */

const { render } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);
const template = fs.readFileSync(templatePath, "utf-8");

if (!template.includes('<div id="root"></div>')) {
  console.error("prerender: could not find the empty #root div in dist/index.html");
  process.exit(1);
}

const NOT_FOUND_ROUTE = "/__not-found__";

const routes = [
  ...ROUTES.flatMap((r) => LANGS.map((lang) => localizePath(r.path, lang))),
  NOT_FOUND_ROUTE,
];
console.log(`prerender: ${routes.length} routes (pages x languages + 404)\n`);

let failed = 0;

for (const route of routes) {
  let rendered;
  try {
    rendered = await render(route);
  } catch (error) {
    console.error(`  FAIL  ${route}  - ${error.message.split("\n")[0]}`);
    failed++;
    continue;
  }

  const { html, seo } = rendered;
  const textLength = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().length;

  if (textLength < 200) {
    console.error(`  FAIL  ${route}  - rendered only ${textLength} chars of text`);
    failed++;
    continue;
  }
  if (!/<h1[\s>]/.test(html)) {
    console.error(`  FAIL  ${route}  - no <h1> in the render; the page body is missing`);
    failed++;
    continue;
  }

  const canonical =
    route === NOT_FOUND_ROUTE
      ? null
      : seo?.canonical || SITE_ORIGIN + (route.endsWith("/") ? route : route + "/");

  let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  page = setTitle(page, seo?.title);
  page = setMetaName(page, "description", seo?.description);
  page = setMetaName(page, "keywords", seo?.keywords);
  page = setCanonical(page, canonical);
  page = setMetaProperty(page, "og:title", seo?.title);
  page = setMetaProperty(page, "og:description", seo?.description);
  page = setMetaProperty(page, "og:url", canonical);
  page = setMetaProperty(page, "og:image", seo?.ogImage);
  page = setMetaName(page, "twitter:title", seo?.title);
  page = setMetaName(page, "twitter:description", seo?.description);
  page = setMetaName(page, "twitter:image", seo?.ogImage);
  if (seo?.noindex) page = setNoindex(page);
  page = setHtmlLang(page, seo?.lang || DEFAULT_LANG);
  page = injectAlternates(page, seo?.alternates);
  page = injectSchema(page, seo?.schemaJson);

  const outPath =
    route === "/"
      ? templatePath
      : route === NOT_FOUND_ROUTE
        ? path.join(distDir, "404.html")
        : path.join(distDir, route, "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page, "utf-8");

  const rel = path.relative(distDir, outPath).split(path.sep).join("/");
  console.log(
    `  ok    ${route.padEnd(35)} ${String(textLength).padStart(6)} chars  ->  dist/${rel}`
  );
}

if (failed > 0) {
  console.error(`\nprerender: ${failed} route(s) failed - not shipping a half-rendered build.`);
  process.exit(1);
}

console.log(`\nprerender: ${routes.length} routes written successfully.`);
