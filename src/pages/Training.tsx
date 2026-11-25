import { ArrowUpRight, Activity } from 'lucide-react';
import { facilities } from '../data/site';

export default function Training() {
  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">MIND AND BODY, MOVING FORWARD</p>
          <h2>
            Every session.
            <br />A step towards readiness.
          </h2>
        </div>
        <p className="section-aside">
          Explore the six training areas in the academy brief. Schedules, coaching and
          facility photographs await confirmation.
        </p>
      </div>
      <div className="training-list">
        {facilities.map((facility, index) => (
          <article key={facility.name}>
            <span className="detail-number">0{index + 1}</span>
            <Activity size={30} strokeWidth={1.2} />
            <div>
              <h3>{facility.name}</h3>
              <p>{facility.description}</p>
            </div>
            <span className="tag">Photo pending</span>
          </article>
        ))}
      </div>
      <div className="information-panel">
        <h2>Train with the right guidance.</h2>
        <p>
          Physical test standards differ by recruitment entry. Follow the applicable
          official notification and seek suitable coaching for your fitness level.
        </p>
        <a className="text-link" href="/registration">
          Ask about the training program <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
