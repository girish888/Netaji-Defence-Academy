export function admissionsYear(date = new Date()): string {
  const year = Number(
    new Intl.DateTimeFormat('en', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(
      date,
    ),
  );
  return `${year}–${String(year + 1).slice(-2)}`;
}

export type Notice = {
  id: string;
  title: string;
  organization: string;
  category: string;
  publishedAt: string;
  opensAt: string;
  closesAt: string;
  eligibility: string;
  notificationUrl: string;
  applicationUrl?: string;
  verifiedAt: string;
};

export const officialHosts = [
  'upsc.gov.in',
  'ssc.gov.in',
  'joinindianarmy.nic.in',
  'joinindiannavy.gov.in',
  'agnipathvayu.cdac.in',
  'slprb.ap.gov.in',
  'tgprb.in',
];

export function isOfficialUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && officialHosts.includes(url.hostname);
  } catch {
    return false;
  }
}

export function validateNotices(value: unknown): Notice[] {
  if (!Array.isArray(value)) throw new Error('Notices must be an array.');
  const seen = new Set<string>();
  for (const item of value) {
    if (!item || typeof item !== 'object') throw new Error('Invalid notice.');
    const notice = item as Notice;
    for (const key of [
      'id',
      'title',
      'organization',
      'category',
      'eligibility',
    ] as const) {
      if (typeof notice[key] !== 'string' || !notice[key].trim())
        throw new Error(`Missing ${key}.`);
    }
    for (const key of ['publishedAt', 'opensAt', 'closesAt', 'verifiedAt'] as const) {
      const date = notice[key];
      if (
        typeof date !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(Date.parse(date)) ||
        new Date(date).toISOString().slice(0, 10) !== date
      )
        throw new Error(`Invalid ${key}.`);
    }
    if (notice.opensAt > notice.closesAt || seen.has(notice.id))
      throw new Error('Duplicate or invalid date range.');
    if (
      !isOfficialUrl(notice.notificationUrl) ||
      (notice.applicationUrl && !isOfficialUrl(notice.applicationUrl))
    )
      throw new Error('Official HTTPS source required.');
    seen.add(notice.id);
  }
  return value as Notice[];
}

export function noticeStatus(
  notice: Notice,
  date = new Date(),
): 'Active' | 'Expired' | 'Upcoming' | 'Needs verification' {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
  if (notice.closesAt < today) return 'Expired';
  // Open notices must have been checked within seven days; never imply stale data is current.
  if (
    notice.verifiedAt > today ||
    Date.parse(today) - Date.parse(notice.verifiedAt) > 7 * 86400000
  )
    return 'Needs verification';
  return notice.opensAt > today ? 'Upcoming' : 'Active';
}

export function whatsappMessage(fields: Record<string, string>): string {
  return [
    'Netaji Defence Academy — Admission Enquiry',
    '',
    ...Object.entries(fields)
      .filter(([, value]) => value.trim())
      .map(([label, value]) => `${label}: ${value.trim()}`),
  ].join('\n');
}

export function whatsappUrl(number: string, message: string): string {
  if (!/^[1-9]\d{9,14}$/.test(number))
    throw new Error('A verified international WhatsApp number is required.');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
