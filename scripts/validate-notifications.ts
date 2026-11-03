import { readFile } from 'node:fs/promises';
import { validateNotices, noticeStatus } from '../src/lib/logic';

const dataset = JSON.parse(await readFile('src/data/notifications.json', 'utf8'));
const notices = validateNotices(dataset.notices);

console.log(`Validated ${notices.length} records. No remote collection is configured.`);
for (const notice of notices) {
  console.log(`${notice.id}: ${noticeStatus(notice)}`);
}
if (!dataset.lastVerifiedAt) {
  console.warn('No official-source verification has been completed. Dataset unchanged.');
}
