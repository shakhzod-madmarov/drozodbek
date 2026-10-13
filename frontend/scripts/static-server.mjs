import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const dist = process.argv[2] || "./dist";
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};

const send = (res, status, file) => {
  res.writeHead(status, {
    "Content-Type": types[path.extname(file)] || "application/octet-stream",
  });
  res.end(fs.readFileSync(file));
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    for (const candidate of [
      path.join(dist, urlPath),
      path.join(dist, urlPath, "index.html"),
    ]) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        send(res, 200, candidate);
        return;
      }
    }
    const notFound = path.join(dist, "404.html");
    if (fs.existsSync(notFound)) {
      send(res, 404, notFound);
      return;
    }
    res.writeHead(404);
    res.end("not found");
  })
  .listen(4174, () => console.log("Static test server running at http://localhost:4174"));
