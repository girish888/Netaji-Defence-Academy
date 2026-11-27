import { ArrowUpRight, MapPin } from 'lucide-react';
import { academy } from '../data/site';

export default function LocationMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`location-map ${compact ? 'location-map-compact' : ''}`}>
      <div className="location-map-frame">
        <iframe
          title="Netaji Defence Academy location on Google Maps"
          src={academy.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="location-map-info">
        <div>
          <p className="eyebrow">FIND THE ACADEMY</p>
          <h3>
            <MapPin size={20} /> Netaji Defence Academy
          </h3>
          <p>{academy.address}</p>
        </div>
        <a className="button button-outline" href={academy.mapUrl}>
          <svg
            className="google-maps-logo"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            role="img"
            aria-label="Google Maps"
          >
            <path
              fill="#4285f4"
              d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"
            />
            <path
              fill="#34a853"
              d="M5.65 5.05A6.96 6.96 0 0 0 5 9c0 2.27 1.65 5.16 3.3 7.54l3.7-3.7V9.5L5.65 5.05Z"
            />
            <path
              fill="#fbbc04"
              d="m8.3 16.54 3.7 5.46s2.1-2.33 3.9-5.23l-3.9-3.93-3.7 3.7Z"
            />
            <circle cx="12" cy="9" r="2.6" fill="#ea4335" />
          </svg>
          Open in Google Maps <ArrowUpRight size={17} />
        </a>
      </div>
    </div>
  );
}
