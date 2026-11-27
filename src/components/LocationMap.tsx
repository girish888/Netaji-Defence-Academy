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
        <a
          className="button button-outline"
          href={academy.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps <ArrowUpRight size={17} />
        </a>
      </div>
    </div>
  );
}
