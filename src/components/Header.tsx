import { useRef, type PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { academy } from '../data/site';
import AdmissionsYear from './AdmissionsYear';

export default function Header({ path }: { path: string }) {
  const navigationRef = useRef<HTMLElement>(null);

  const handleNavigationPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !navigationRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    const tiltX = (0.5 - y) * 5;
    const tiltY = (x - 0.5) * 7;

    navigationRef.current.style.setProperty('--bubble-glow-x', `${x * 100}%`);
    navigationRef.current.style.setProperty('--bubble-glow-y', `${y * 100}%`);
    navigationRef.current.style.setProperty('--bubble-tilt-x', `${tiltX}deg`);
    navigationRef.current.style.setProperty('--bubble-tilt-y', `${tiltY}deg`);
    navigationRef.current.style.setProperty(
      '--bubble-scale-x',
      `${1 + (x - 0.5) * 0.012}`,
    );
    navigationRef.current.style.setProperty(
      '--bubble-scale-y',
      `${1 + (0.5 - y) * 0.012}`,
    );
  };

  const resetNavigationBubble = () => {
    if (!navigationRef.current) return;

    navigationRef.current.style.setProperty('--bubble-glow-x', '50%');
    navigationRef.current.style.setProperty('--bubble-glow-y', '0%');
    navigationRef.current.style.setProperty('--bubble-tilt-x', '0deg');
    navigationRef.current.style.setProperty('--bubble-tilt-y', '0deg');
    navigationRef.current.style.setProperty('--bubble-scale-x', '1');
    navigationRef.current.style.setProperty('--bubble-scale-y', '1');
  };

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
        <nav
          ref={navigationRef}
          className="navigation"
          aria-label="Main navigation"
          onPointerMove={handleNavigationPointerMove}
          onPointerLeave={resetNavigationBubble}
        >
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
