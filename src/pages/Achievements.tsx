import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Achievements() {
  return (
    <section className="section container achievements-page">
      <div className="empty-state achievement-empty">
        <ShieldCheck size={42} aria-hidden="true" />
        <div>
          <p className="eyebrow">VERIFIED RECORDS ONLY</p>
          <h2>Achievements will be published here.</h2>
          <p>
            No verified selections, awards, rankings or testimonials were supplied for
            publication. This page will be updated when the academy provides confirmed
            records.
          </p>
          <a className="text-link" href="/registration">
            Make an enquiry <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
