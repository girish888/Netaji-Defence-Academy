# Verification report

## Local checks

| Check                                       | Result     | Evidence / scope                                                                                                                                                                 |
| ------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prettier source formatting                  | PASS       | All supported source/configuration files formatted                                                                                                                               |
| ESLint                                      | PASS       | Project lint completed without errors                                                                                                                                            |
| TypeScript                                  | PASS       | Strict type check included in production build                                                                                                                                   |
| Production build                            | PASS       | Vite output plus 10 prerendered HTML documents                                                                                                                                   |
| Critical logic tests                        | PASS       | Five tests: India year boundary, closing-day boundary, stale verification, invalid/duplicate notices, Unicode WhatsApp encoding                                                  |
| Chrome route/layout checks                  | PASS       | All 10 routes at 320, 375, 390, 430, 768, 1024, 1366 and 1920 pixels                                                                                                             |
| Browser interactions                        | PASS       | Mobile menu, gallery filters, lightbox, Escape, required form fields, review message, Unicode, no browser persistence, disabled send without contact, search empty state and 404 |
| Browser suite total                         | PASS       | 81 checks; no page errors                                                                                                                                                        |
| Automated accessibility                     | PASS       | axe WCAG 2 A/AA and 2.1 AA scan: zero detected violations on all 10 routes at mobile width after contrast fixes                                                                  |
| Static HTML / internal links                | PASS       | One H1, unique titles, descriptions, parseable Organization JSON-LD, local image/source/navigation paths, generated CSP hash                                                     |
| Dependency audit                            | PASS       | Full npm audit reported zero known vulnerabilities at check time                                                                                                                 |
| Original assets                             | PASS       | Both supplied JPG originals retained with SHA-256 inventory; WebP files are separate derivatives                                                                                 |
| Manual visual review                        | PASS       | Desktop and mobile homepage screenshots inspected                                                                                                                                |
| Microsoft Edge                              | BLOCKED    | Headless browser exited during launch with Windows profile/pipe errors                                                                                                           |
| Firefox and Safari                          | NOT TESTED | Not available in this session                                                                                                                                                    |
| Physical Android / iPhone devices           | NOT TESTED | Viewport emulation is not a physical-device test                                                                                                                                 |
| Concurrent traffic / 5,000 monthly visitors | NOT TESTED | Static architecture supplied; no capacity guarantee made                                                                                                                         |

Automated accessibility tools cannot establish complete accessibility compliance. Manual keyboard, screen-reader and real-device acceptance review remains advisable.

## Lighthouse mobile baseline

Measured locally in Google Chrome using Lighthouse's mobile settings, before the final contrast and hero-preload improvements:

| Metric                   | Measured result                           |
| ------------------------ | ----------------------------------------- |
| Performance              | 91 / 100                                  |
| Accessibility            | 96 / 100                                  |
| Best practices           | 96 / 100                                  |
| SEO                      | 100 / 100                                 |
| Largest Contentful Paint | 3.0 seconds — above the 2.5-second target |
| Cumulative Layout Shift  | 0                                         |
| Total Blocking Time      | 10 ms                                     |
| Field INP                | NOT TESTED; TBT is not INP                |

The contrast issues were subsequently corrected and all-page axe scans passed. A high-priority hero preload was added. No improved final Lighthouse score is claimed. Local measurements do not predict production mobile-network performance. The Lighthouse SEO score does not mean a domain, sitemap submission or search indexing is configured.

## Launch and integration checks

| Item                                        | Result     | Reason                                                                                 |
| ------------------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| Actual WhatsApp transmission                | BLOCKED    | Academy number not confirmed; no message sent                                          |
| Live map and directions                     | BLOCKED    | Exact address and approved Google Maps location missing                                |
| Business email and contact links            | BLOCKED    | Client values missing                                                                  |
| Final additional course list / hostel facts | BLOCKED    | Client details not supplied                                                            |
| Previously approved 10 police points        | BLOCKED    | Original content not supplied                                                          |
| Automatic official recruitment collection   | BLOCKED    | Permitted reliable official-source integration not verified; scheduled validation only |
| Live recruitment record accuracy            | BLOCKED    | Dataset contains no published records                                                  |
| Production canonical URLs and sitemap       | BLOCKED    | Real domain not confirmed; generator supplied                                          |
| Domain, DNS, HTTPS                          | BLOCKED    | No approved domain/hosting account configured                                          |
| Public deployment and production headers    | NOT TESTED | No public deployment performed                                                         |
| Search Console / Bing / Business Profile    | BLOCKED    | Owner verification/access not provided                                                 |
| VS Code launch                              | BLOCKED    | Windows launcher denied access; folder is ready to open manually                       |

## Intentional implementation limits

- Page navigation uses ordinary anchors and prerendered route directories. The initial JavaScript bundle contains all page components; route-level lazy loading is not implemented.
- The daily notification workflow validates existing data and never presents unverified data as open. It does not scrape or publish new notices.
- No student accounts, payments, database, admin dashboard or excluded management modules were introduced.
- The classroom photo is explicitly labeled as a reference with other-academy branding; it is not presented as a Netaji facility.
- No public launch is represented as complete. Follow `README.md`, `NOTIFICATIONS.md` and `HANDOVER.md` for the remaining work.
