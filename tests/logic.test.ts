import test from 'node:test';
import assert from 'node:assert/strict';
import {
  admissionsYear,
  noticeStatus,
  validateNotices,
  whatsappMessage,
  whatsappUrl,
  type Notice,
} from '../src/lib/logic';

const notice: Notice = {
  id: 'test-only',
  title: 'Synthetic test record, not a published recruitment notice',
  organization: 'Test authority',
  category: 'NDA',
  publishedAt: '2026-12-01',
  opensAt: '2026-12-10',
  closesAt: '2026-12-31',
  eligibility: 'Test only',
  notificationUrl: 'https://upsc.gov.in/',
  verifiedAt: '2026-12-30',
};

test('admissions year changes exactly at midnight in India', () => {
  assert.equal(admissionsYear(new Date('2026-12-31T18:29:59Z')), '2026–27');
  assert.equal(admissionsYear(new Date('2026-12-31T18:30:00Z')), '2027–28');
});

test('closing date remains active through its last day in India', () => {
  assert.equal(noticeStatus(notice, new Date('2026-12-31T18:29:59Z')), 'Active');
  assert.equal(noticeStatus(notice, new Date('2026-12-31T18:30:00Z')), 'Expired');
});

test('stale or future verifications cannot display as active', () => {
  assert.equal(
    noticeStatus({ ...notice, verifiedAt: '2026-12-01' }, new Date('2026-12-30T12:00Z')),
    'Needs verification',
  );
  assert.equal(
    noticeStatus({ ...notice, verifiedAt: '2027-01-01' }, new Date('2026-12-30T12:00Z')),
    'Needs verification',
  );
});

test('rejects malformed, missing, duplicated and unofficial records', () => {
  assert.deepEqual(validateNotices([]), []);
  assert.equal(validateNotices([notice]).length, 1);
  assert.throws(() => validateNotices({}));
  assert.throws(() => validateNotices([{}]));
  assert.throws(() => validateNotices([notice, notice]));
  assert.throws(() => validateNotices([{ ...notice, closesAt: '2026-02-30' }]));
  assert.throws(() =>
    validateNotices([
      { ...notice, notificationUrl: 'https://upsc.gov.in.fake.example/' },
    ]),
  );
});

test('WhatsApp message preserves punctuation and non-English text', () => {
  const message = whatsappMessage({
    Name: 'Test & sample',
    Message: 'తెలుగు + हिंदी?',
    Empty: ' ',
  });
  const link = whatsappUrl('919999999999', message);
  assert.equal(new URL(link).searchParams.get('text'), message);
  assert.ok(message.includes('తెలుగు + हिंदी?'));
  assert.ok(!message.includes('Empty'));
  assert.throws(() => whatsappUrl('', message));
});
