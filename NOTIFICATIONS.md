# Recruitment notice maintenance

## Current status

No live collector is enabled. No official-source automated retrieval permissions, feed contracts or parsers have been validated. The scheduled workflow runs at 01:30 UTC daily (07:00 IST) and validates the existing dataset without changing it. It preserves data on failure because it performs no writes.

This is a deliberately limited implementation, not a completed automatic recruitment collection system. A site owner must verify and enter notices manually until a permitted reliable source integration is implemented and tested.

## Manual update

1. Open the recruiting authority's official portal. Follow the notice from that authority, not an aggregator.
2. Read the original notice and any amendments. Confirm title, organization, entry/category, publication, opening and closing dates, eligibility summary and application URL.
3. Add one record to `src/data/notifications.json` with `id`, `title`, `organization`, `category`, `publishedAt`, `opensAt`, `closesAt`, `eligibility`, `notificationUrl`, optional `applicationUrl` and `verifiedAt`.
4. Use ISO calendar dates (`YYYY-MM-DD`). Assign a unique stable ID. Do not add an assumed deadline or eligibility condition.
5. Set `verifiedAt` only after actually checking that record. Set top-level `lastVerifiedAt` only after a successful review of the dataset.
6. Run `npx tsx scripts/validate-notifications.ts`, `npm test` and `npm run build`. Review the result before deploying.
7. For corrections, edit the record with the same ID and document the reason in version control. Preserve expired notices for the Expired filter.

Categories: Indian Army, Indian Navy, Indian Air Force, NDA, Paramilitary, Andhra Pradesh Police, Telangana Police.

Only HTTPS links on the exact allowlisted official hostnames are accepted by the validator. The allowlist is a safety constraint, not proof that a specific notice was verified. If an authority changes its portal or uses an official subdomain, verify it independently before updating the allowlist in `src/lib/logic.ts`.

## Freshness rules

The website calculates the date in Asia/Kolkata. An application stays active through its closing day. A record older than seven days since verification is labeled Needs verification. Future verification dates are also rejected as fresh. Home shows up to three Active records, sorted by publication date; the full page supports search, category and status filters.

## Adding automation later

For each authority separately, verify the current official URL, terms and retrieval permission. Inspect its actual feed/API or HTML contract. Respect robots guidance, CAPTCHA, authentication and rate limits. Test parsers against authentic saved fixtures, changes, malformed responses and downtime.

Fetch into a candidate dataset, validate all fields and official links, deduplicate by stable IDs and only then atomically replace the last valid file. Never mark a failed request as successfully verified. Use read-only workflows until a reviewed collector genuinely needs repository write access. Rebuild/deploy after approved data changes; this static website does not poll a server database.
