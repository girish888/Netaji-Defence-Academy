import { ArrowUpRight } from 'lucide-react';
import { academy } from '../data/site';
import AdmissionsYear from './AdmissionsYear';

export default function Header({ path }: { path: string }) {
  const navigation = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Courses', href: '/courses' },
    { label: 'Training & Facilities', href: '/training' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Hostel & Food', href: '/hostel' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Notifications', href: '/notifications' },
    { label: 'Contact Us', href: '/contact' },
  ];

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
            <img src="/images/optimized/NDA-2.jpeg" alt="Netaji Defence Academy emblem" />
          </span>
          <span>
            <strong>NETAJI</strong>
            <small>DEFENCE ACADEMY</small>
          </span>
        </a>
        <nav className="navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={path === item.href ? 'page' : undefined}
            >
              {item.label}
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
