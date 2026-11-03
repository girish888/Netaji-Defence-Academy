# Netaji Defence Academy

Ten-page React, Vite, TypeScript and Tailwind website. Source files remain readable; only generated build assets are minified.

## Run in VS Code

Open this folder with **File → Open Folder** in VS Code. Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

The terminal prints the local preview URL. To preview the production output with security headers and real 404 responses:

```sh
npm run build
node scripts/serve.mjs
```

Open `http://127.0.0.1:4173`. Stop the server with Ctrl+C.

## Checks

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
node scripts/check-build.mjs
```

`node scripts/browser-qa.mjs` tests a running production preview using installed Google Chrome. It uses synthetic form data and never sends WhatsApp messages. Screenshots and results are placed in the ignored `artifacts` directory.

## Source map

- `src/pages`: ten separate page components.
- `src/components`: shared header, footer, page introduction and course cards.
- `src/data/site.ts`: editable academy configuration, courses, facilities and image metadata.
- `src/data/notifications.json`: the single notice dataset used by Home and Notifications.
- `src/lib/logic.ts`: admissions-year, notification validation/status and WhatsApp helpers.
- `scripts/prerender.mjs`: ten static HTML documents, metadata, security headers, sitemap and robots generation.
- `public/images/originals`: two untouched supplied JPG images.
- `public/images/optimized`: separate WebP derivatives.
- `ASSET-INVENTORY.json`: original dimensions, byte counts and SHA-256 hashes.

Ordinary anchors and prerendered route directories provide direct navigation and refresh support. No SPA fallback is required. The build has a custom 404 page.

## Required before public launch

1. Confirm phone, international WhatsApp number (digits only, country code included), business email, address and exact map location in `src/data/site.ts`.
2. Provide the official logo. The current shield is a neutral text-brand device, not a claimed official logo.
3. Approve academy history, mission/vision wording, actual course syllabus, hostel details and additional course list.
4. Supply the 10 previously approved police-course points. They were absent from the attachment and have not been invented.
5. Confirm permission to use the classroom reference: its clothing and board show **Indian Defence Academy**, rather than Netaji. It appears only as a labeled reference in Gallery. The building image is used on Home and About.
6. Provide original approved assets from any earlier project. Only two image files were attached here.
7. Confirm the production domain and set `SITE_URL` in `.env.local` or the build environment. Copy `.env.example` if needed. Use an HTTPS origin without a path.
8. Run all checks, review all pending content and approve deployment.

Canonical URLs, social image URLs and `sitemap.xml` are generated only when the real domain is set. No domain has been guessed. Local output is not a fully configured production SEO deployment.

## Registration and privacy

The form validates required fields, Indian mobile-number format, future date of birth and consent. It prepares a readable message for review. With a verified academy number configured, the student can open WhatsApp, then manually press Send. Until then, sending is disabled and copying is available.

No database, account, password, analytics tracking or browser persistence is used. Student details remain in page memory. Click to Chat encodes those details into a WhatsApp URL, which can be handled or retained by the browser and WhatsApp; the privacy notice explains that transfer. Avoid entering sensitive information in the optional message. The honeypot is a limited frontend safeguard, not a complete bot defence.

## Notifications

See [NOTIFICATIONS.md](NOTIFICATIONS.md). The dataset is deliberately empty. The daily workflow validates data; it does **not** claim to collect official announcements. No reliable permitted official-source collector has been verified or enabled.

## Deployment and search setup

See [HANDOVER.md](HANDOVER.md). No repository, domain, email account or public deployment has been created. No DNS was changed. Source is portable and the GitHub workflows are supplied for an authorized repository.

## Image preservation

The originals are unchanged. To reproduce optimized copies:

```sh
node scripts/optimize-images.mjs
```

No extra stock photographs were needed. No invented facility photographs, testimonials, awards, government affiliations or success rates are used.
