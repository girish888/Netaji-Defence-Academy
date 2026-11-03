import { useState } from 'react';
import { Menu, Shield, X, ArrowUpRight } from 'lucide-react';
import { academy, pages } from '../data/site';
import AdmissionsYear from './AdmissionsYear';

export default function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span className="status-dot" />
        Admissions Open <AdmissionsYear />
        <span className="announcement-divider">|</span>
        <span>Begin your journey to serve the nation.</span>
        <a href="/registration">
          Enquire now <ArrowUpRight size={13} />
        </a>
      </div>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Netaji Defence Academy home">
          <span className="brand-emblem">
            <Shield size={31} strokeWidth={1.5} />
            <b>N</b>
          </span>
          <span>
            <strong>NETAJI</strong>
            <small>DEFENCE ACADEMY</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          className={open ? 'navigation is-open' : 'navigation'}
          aria-label="Main navigation"
        >
          {pages
            .filter((page) => !['/courses/others', '/registration'].includes(page.path))
            .map((page) => (
              <a
                key={page.path}
                href={page.path}
                aria-current={path === page.path ? 'page' : undefined}
              >
                {page.label === 'Our Training Program' ? 'Training' : page.label}
              </a>
            ))}
          <a className="button button-small" href="/registration">
            Register <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <div className="brand-rule" aria-hidden="true" />
      <span className="sr-only">{academy.tagline}</span>
    </>
  );
}
