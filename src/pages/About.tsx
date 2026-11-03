import { Target, Compass, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <section className="section container">
      <div className="about-grid">
        <div>
          <p className="eyebrow">YOUR DREAM, OUR MISSION, ONE NATION</p>
          <h2>
            Preparation begins
            <br />
            with a sense of purpose.
          </h2>
          <p className="large-copy">
            Netaji Defence Academy’s website brings together defence and police
            preparation pathways, training information and official recruitment resources.
          </p>
          <p>
            Explore the available pathways and contact the academy to confirm batch
            schedules, teaching arrangements and admission details before making a
            decision.
          </p>
        </div>
        <figure className="about-image">
          <img
            src="/images/optimized/1000666717.webp"
            alt="Client-supplied reference for the academy"
            width="1280"
            height="960"
          />
          <figcaption>Client-supplied academy reference.</figcaption>
        </figure>
      </div>
      <div className="three-grid values-cards">
        {[
          {
            icon: Target,
            title: 'Mission',
            text: 'Support purposeful preparation for students who aspire to serve.',
          },
          {
            icon: Compass,
            title: 'Vision',
            text: 'Encourage informed choices, discipline and a sustained commitment to learning.',
          },
          {
            icon: ShieldCheck,
            title: 'Our approach',
            text: 'Bring academic preparation and physical readiness into the same conversation.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <Icon size={30} strokeWidth={1.4} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="information-panel">
        <h2>Academy background</h2>
        <p>
          The academy’s history, faculty profiles and confirmed facilities await client
          approval. No affiliations, results or success rates are claimed.
        </p>
      </div>
    </section>
  );
}
