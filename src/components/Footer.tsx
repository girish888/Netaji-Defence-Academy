import { ArrowUpRight } from 'lucide-react';
import { academy } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div>
          <div className="footer-brand">
            <img src="/images/optimized/NDA-2.jpeg" alt="Netaji Defence Academy emblem" />
            <span>
              NETAJI<small>DEFENCE ACADEMY</small>
            </span>
          </div>
          <p>{academy.tagline}</p>
          <p className="footer-caption">
            Prepare with purpose.
            <br />
            Move forward with discipline.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <a href="/about">About the academy</a>
          <a href="/courses">Our courses</a>
          <a href="/training">Training program</a>
          <a href="/achievements">Achievements</a>
          <a href="/gallery">Gallery</a>
        </div>
        <div>
          <h2>Student resources</h2>
          <a href="/notifications">Recruitment notifications</a>
          <a href="/hostel">Hostel & food</a>
          <a href="/registration">Student registration</a>
          <a href="/contact">Contact & directions</a>
        </div>
        <div className="footer-enquiry">
          <h2>Your future starts with a step.</h2>
          <p>Explore your options. Ask your questions. Start preparing.</p>
          {academy.phone && <a href={`tel:${academy.phone}`}>Call {academy.phone}</a>}
          <a href="/registration">
            Make an enquiry <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Netaji Defence Academy.</span>
        <span>Discipline. Courage. Commitment.</span>
        <a href="/registration#privacy">Registration privacy</a>
      </div>
    </footer>
  );
}
