import { Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { academy } from '../data/site';

export default function Contact() {
  const contacts = [
    {
      icon: Phone,
      title: 'Call the academy',
      value: academy.phone || 'Phone number awaiting confirmation',
      href: academy.phone ? `tel:${academy.phone}` : '',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: academy.whatsapp || 'WhatsApp number awaiting confirmation',
      href: academy.whatsapp ? `https://wa.me/${academy.whatsapp}` : '',
    },
    {
      icon: Mail,
      title: 'Business email',
      value: academy.email || 'Business email awaiting confirmation',
      href: academy.email ? `mailto:${academy.email}` : '',
    },
    {
      icon: MapPin,
      title: 'Visit the academy',
      value: academy.address || 'Exact academy address awaiting confirmation',
      href: academy.mapUrl,
    },
  ];

  return (
    <section className="section container">
      <div className="contact-grid">
        <div>
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>
            A conversation
            <br />
            can be the first step.
          </h2>
          <div className="contact-details">
            {contacts.map(({ icon: Icon, title, value, href }) => (
              <div key={title}>
                <Icon size={22} />
                <div>
                  <h3>{title}</h3>
                  {href ? <a href={href}>{value}</a> : <p>{value}</p>}
                </div>
              </div>
            ))}
          </div>
          <a className="button" href="/registration">
            Prepare an admission enquiry <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="map-placeholder">
          <MapPin size={52} strokeWidth={1} />
          <h3>Find us here — soon.</h3>
          <p>
            The exact map location must be confirmed by the academy. A map is not shown to
            avoid directing you to the wrong place.
          </p>
          {academy.mapUrl && (
            <a
              className="button button-outline"
              href={academy.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
