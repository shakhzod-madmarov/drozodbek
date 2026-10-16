import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

// Official verified Google Review link & Yandex short URL for Dr. Ozodbek Otaxonov
const GOOGLE_URL = 'https://g.page/r/Can7lHvF_ZNWECE/review';
const YANDEX_URL = 'https://yandex.uz/maps/-/CXu-iKzx';

const BRAND_COLOR = '#DF301C'; // Dr. Ozodbek's primary signature brand red

async function generateBrandedQr(url, filenamePrefix, isGoogle = true) {
  // Generate base SVG with Level H error correction (tolerates up to 30% center overlay)
  const rawSvg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: BRAND_COLOR,
      light: '#FFFFFF',
    },
  });

  // Extract viewBox from rawSvg
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 37 37';
  const parts = viewBox.split(' ').map(Number);
  const size = parts[2] || 37;
  const center = size / 2;
  const radiusOuter = size * 0.11; // 11% radius leaves plenty of error correction margin
  const iconSize = radiusOuter * 1.55;
  const offset = center - iconSize / 2;

  let centerIcon = '';
  if (isGoogle) {
    centerIcon = `
    <g id="center-badge">
      <circle cx="${center}" cy="${center}" r="${radiusOuter}" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="0.25" />
      <svg x="${offset}" y="${offset}" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10.5" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="0.8"/>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    </g>`;
  } else {
    centerIcon = `
    <g id="center-badge">
      <circle cx="${center}" cy="${center}" r="${radiusOuter}" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="0.25" />
      <svg x="${offset}" y="${offset}" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10.5" fill="#FC3F1D" />
        <path fill="#FFFFFF" d="M13.8 17h-1.8l-2.7-4.9-1.2 1.3v3.6H6.9V6.5h2.2v5.4l3.6-5.4h2.4l-3.8 5.5 3.7 5.5z"/>
      </svg>
    </g>`;
  }

  const finalSvg = rawSvg.replace('</svg>', `${centerIcon}\n</svg>`);
  fs.writeFileSync(path.join(publicDir, `${filenamePrefix}.svg`), finalSvg);
  console.log(`Saved ${filenamePrefix}.svg`);

  // Also save standard high-res PNG for download
  await QRCode.toFile(path.join(publicDir, `${filenamePrefix}.png`), url, {
    errorCorrectionLevel: 'H',
    width: 1024,
    margin: 2,
    color: {
      dark: BRAND_COLOR,
      light: '#FFFFFF',
    },
  });
  console.log(`Saved ${filenamePrefix}.png`);
}

async function run() {
  await generateBrandedQr(GOOGLE_URL, 'qr-google-branded', true);
  await generateBrandedQr(YANDEX_URL, 'qr-yandex-branded', false);
  console.log('All branded QR codes generated successfully!');
}

run().catch(console.error);
