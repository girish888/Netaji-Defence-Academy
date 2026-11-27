import { Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { academy } from '../data/site';
import LocationMap from '../components/LocationMap';

export default function Contact() {
  const contacts = [
    {
      icon: Phone,
      title: 'Anjaneyulu Sir',
      value: academy.phone,
      href: `tel:${academy.phone}`,
    },
    {
      icon: Phone,
      title: 'Krishna Sir',
      value: academy.secondaryPhone,
      href: `tel:${academy.secondaryPhone}`,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp — Anjaneyulu Sir',
      value: academy.whatsapp,
      href: `https://wa.me/${academy.whatsapp}`,
    },
    {
      icon: Mail,
      title: 'Business email',
      value: academy.email,
      href: `mailto:${academy.email}`,
    },
    {
      icon: MapPin,
      title: 'Visit the academy',
      value: academy.address,
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
        <LocationMap />
      </div>
    </section>
  );
}
