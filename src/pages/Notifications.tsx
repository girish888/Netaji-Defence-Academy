import { useState } from 'react';
import { ExternalLink, Search, Bell, ArrowUpRight } from 'lucide-react';
import dataset from '../data/notifications.json';
import { noticeStatus, validateNotices } from '../lib/logic';

const notices = validateNotices(dataset.notices);
export const categories = [
  'Indian Army',
  'Indian Navy',
  'Indian Air Force',
  'NDA',
  'Paramilitary',
  'Andhra Pradesh Police',
  'Telangana Police',
];

export function NoticeList({
  limit,
  query = '',
  category = 'All',
  status = 'Active',
}: {
  limit?: number;
  query?: string;
  category?: string;
  status?: string;
}) {
  const filtered = notices
    .filter(
      (notice) =>
        (!query ||
          `${notice.title} ${notice.organization} ${notice.eligibility}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (category === 'All' || notice.category === category) &&
        (status === 'All' || noticeStatus(notice) === status),
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const visible = limit ? filtered.slice(0, limit) : filtered;

  if (!visible.length)
    return (
      <div className="empty-state">
        <span className="empty-icon">
          <Bell size={26} strokeWidth={1.4} />
        </span>
        <div>
          <h3>
            {notices.length
              ? 'No notices match these filters.'
              : 'Verified updates will appear here.'}
          </h3>
          <p>
            No unverified recruitment announcements are displayed. Check the recruiting
            authority’s official website before applying.
          </p>
          <a
            className="text-link"
            href="https://upsc.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit UPSC <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    );

  return (
    <div className="notice-list">
      {visible.map((notice) => (
        <article className="notice-card" key={notice.id}>
          <span className="tag">{notice.category}</span>
          <span className="notice-status">{noticeStatus(notice)}</span>
          <h3>{notice.title}</h3>
          <p>{notice.organization}</p>
          <p>{notice.eligibility}</p>
          <dl>
            <dt>Published</dt>
            <dd>{notice.publishedAt}</dd>
            <dt>Applications open</dt>
            <dd>{notice.opensAt}</dd>
            <dt>Applications close</dt>
            <dd>{notice.closesAt}</dd>
            <dt>Last verified</dt>
            <dd>{notice.verifiedAt}</dd>
          </dl>
          <a
            className="text-link"
            href={notice.notificationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Official notification <ExternalLink size={15} />
          </a>
          {notice.applicationUrl && (
            <a
              className="text-link"
              href={notice.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official application <ExternalLink size={15} />
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

export default function Notifications() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('Active');

  return (
    <section className="section container">
      <p className="verification-note">
        Last successful verification:{' '}
        {dataset.lastVerifiedAt ?? 'No verification completed yet'}
      </p>
      <div className="filter-bar">
        <label className="search-field">
          <Search size={18} />
          <span className="sr-only">Search notifications</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search recruitment notices…"
          />
        </label>
        <label>
          <span className="sr-only">Recruitment category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="All">All categories</option>
            {categories.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Notification status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {['Active', 'Upcoming', 'Expired', 'Needs verification', 'All'].map(
              (name) => (
                <option key={name}>{name}</option>
              ),
            )}
          </select>
        </label>
      </div>
      <div aria-live="polite">
        <NoticeList query={query} category={category} status={status} />
      </div>
      <div className="information-panel">
        <h2>Always verify at the source.</h2>
        <p>
          Application dates and eligibility can change. Official notifications take
          precedence over any summary. The academy does not issue government recruitment
          notices.
        </p>
      </div>
    </section>
  );
}
