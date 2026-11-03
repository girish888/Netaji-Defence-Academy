# Launch and maintenance handover

## Hosting decision

GitHub's Pages limits state that Pages is not intended or allowed as free hosting to run an online business or a site primarily facilitating commercial transactions. Review the academy's exact use against current policy before selecting Pages. This enquiry-focused client site has not been assumed eligible. A Cloudflare Pages manual deployment workflow is provided as an alternative, subject to the client's account, current plan terms and approval.

Official references checked during preparation:

- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://developers.cloudflare.com/pages/configuration/serving-pages/
- https://developers.cloudflare.com/pages/configuration/headers/

## Repository and deployment

Create or select a repository only with the owner's authorization. Initialize version control in this folder, review files, commit the source and push without force. Never commit `.env.local`, credentials or `node_modules`. The quality workflow checks formatting, lint, tests and build.

For Cloudflare Pages, connect the authorized repository or use the manual `deploy-cloudflare.yml` workflow. Set repository variables `SITE_URL` and `CLOUDFLARE_PROJECT`. Store the scoped Pages API token and account ID as `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets. Use a protected `production` environment with reviewer approval. The workflow builds `dist` and deploys only when manually dispatched. It has not been run.

The static host must serve directory index files and a real 404. Upload the full `dist` output, including `_headers` and `404.html`. Do not upload only the root HTML. Test direct routes and refreshes. Header support is host-dependent; GitHub Pages does not honor Cloudflare `_headers`.

## Domain, HTTPS and business email

Purchase the selected `.com` domain only after owner approval. No purchase is included or performed. Add the domain in the chosen host's dashboard first, then apply only the exact DNS records that dashboard supplies. Have the domain owner authorize the changes. Avoid changing unrelated MX/TXT records.

Select one primary domain, redirect www/non-www to it, set `SITE_URL`, rebuild and verify HTTPS, assets, all route directories, canonical links and sitemap. Nameserver changes and propagation vary by provider; do not promise a fixed completion time. Enable available secure HTTPS redirects after the certificate is active.

For business email, select a mailbox provider separately and confirm its cost. Add that provider's verified MX, SPF, DKIM and DMARC records without exposing passwords. The website does not create a mailbox or imply email is included in a domain plan.

## Search engines

1. Publish the approved site using the real domain and HTTPS.
2. Confirm all 10 pages return meaningful HTML, unique titles and descriptions; inspect canonical links, robots and sitemap.
3. In Google Search Console, add the domain or URL-prefix property. Have the owner complete the provided DNS TXT or supported ownership method. Do not invent a verification token.
4. Submit the actual `/sitemap.xml`. Use URL Inspection for important pages; monitor indexing, Core Web Vitals and search performance.
5. In Bing Webmaster Tools, add the site and complete its supplied verification method. Submit the same sitemap and inspect crawl diagnostics. IndexNow is not configured.
6. For Google Business Profile, locate any existing listing before creating one. Enter only confirmed name, address, phone, category, hours, website and genuine photos. The business owner must complete Google's required verification.

Search Console, Bing and Business Profile are not connected. No indexing, first-page position or immediate ranking is promised. Private/local previews are not public search deployments.

## Security

No passwords, database, frontend API keys, third-party analytics or admin routes are introduced. Generated host headers restrict scripts, frames, browser permissions and referrers. JSON-LD is permitted by a generated CSP hash. The preview server applies these headers for local checks; production enforcement must be verified at the real host.

Use repository two-factor authentication and least-privilege access. Check dependency advisories during maintenance. Readable public source is expected for a static website; frontend environment variables are not a secret store. Frontend validation and robots.txt do not provide a network firewall or DDoS guarantee.

## Maintenance and rollback

Keep the source archive and original images. For normal updates: branch, change content, run checks, review, commit, build and deploy. Use a previously successful host deployment or known Git commit to roll back; rebuild with the corresponding domain configuration. Do not delete source history or force-push. Verify all 10 routes after rollback.

## Remaining acceptance items

Confirmed contact data, map embed, logo, academy text, hostel facilities, missing police points, approved additional courses, official-source notification collector, real domain SEO, repository creation, hosting approval, public deployment, search verification and real-device Safari/Android checks remain outstanding. The implementation does not claim those integrations are complete.
