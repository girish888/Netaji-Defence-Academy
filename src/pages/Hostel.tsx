import { BedDouble, Utensils, Home, ArrowUpRight } from 'lucide-react';

export default function Hostel() {
  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PLAN YOUR STAY</p>
          <h2>
            Know the details.
            <br />
            Prepare with confidence.
          </h2>
        </div>
        <p className="section-aside">
          Accommodation and meal arrangements must be confirmed directly with the academy
          before admission.
        </p>
      </div>
      <div className="three-grid values-cards">
        {[
          {
            icon: Home,
            name: 'Accommodation & rooms',
            text: 'Room photographs, occupancy and availability are awaiting academy confirmation.',
          },
          {
            icon: BedDouble,
            name: 'Beds & student facilities',
            text: 'Bed arrangements and the final facilities list are awaiting confirmation.',
          },
          {
            icon: Utensils,
            name: 'Dining & food',
            text: 'Dining photographs, meal schedules and food arrangements are awaiting confirmation.',
          },
        ].map(({ icon: Icon, name, text }) => (
          <article key={name}>
            <Icon size={32} strokeWidth={1.3} />
            <span className="tag">Details pending</span>
            <h3>{name}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <a className="button" href="/registration">
        Enquire about hostel availability <ArrowUpRight size={18} />
      </a>
    </section>
  );
}
