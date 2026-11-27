import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  Activity,
  Target,
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/site';
import AdmissionsYear from '../components/AdmissionsYear';
import { NoticeList } from './Notifications';
import LocationMap from '../components/LocationMap';

export default function Home() {
  const homeOrder = ['nda', 'navy', 'air-force', 'army', 'police', 'ssc-gd', 'others'];

  return (
    <>
      <section className="hero">
        <div
          className="hero-image"
          role="img"
          aria-label="Supplied Netaji Defence Academy reference artwork"
        />
        <div className="hero-overlay" />
        <div className="hero-content container">
          <p className="eyebrow light">
            <span /> BUILT ON DISCIPLINE. DRIVEN BY PURPOSE.
          </p>
          <h1>
            Your dream.
            <br />
            Our mission.
            <br />
            <em>One nation.</em>
          </h1>
          <p className="hero-description">
            The journey to a life in uniform starts with
            <br className="desktop-break" /> the decision to prepare.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="/courses">
              Explore our courses <ArrowUpRight size={18} />
            </a>
            <a className="hero-secondary" href="/about">
              Discover the academy <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <ShieldCheck size={17} /> Defence & police preparation
            </span>
            <span>
              <span className="status-dot" /> Admissions <AdmissionsYear />
            </span>
          </div>
        </div>
        <div className="hero-index">
          <span>01 / YOUR JOURNEY STARTS HERE</span>
          <a href="#pathways" aria-label="Explore courses below">
            <ArrowDown size={20} />
          </a>
        </div>
      </section>
      <div className="values-strip">
        <span>DISCIPLINE</span>
        <i />
        <span>COURAGE</span>
        <i />
        <span>COMMITMENT</span>
        <i />
        <span>EXCELLENCE</span>
      </div>
      <section id="pathways" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CHOOSE YOUR DIRECTION</p>
            <h2>
              One ambition.
              <br />
              <span>Many ways to serve.</span>
            </h2>
          </div>
          <div className="section-aside">
            <p>
              Find a preparation pathway that aligns with your goals and take the next
              step with clarity.
            </p>
            <a className="text-link" href="/courses">
              All courses <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="course-grid">
          {homeOrder.map((id) => (
            <CourseCard key={id} course={courses.find((course) => course.id === id)!} />
          ))}
        </div>
        <p className="fine-print">
          Eligibility, age limits and selection stages depend on the official recruitment
          notification.
        </p>
      </section>
      <section className="purpose-section">
        <div className="container purpose-grid">
          <div className="purpose-art">
            <img
              src="/images/optimized/NDA3.jpeg"
              alt="Academy reference artwork supplied by the client"
              loading="lazy"
              width="1280"
              height="960"
            />
            <span>ACADEMY REFERENCE · CLIENT-SUPPLIED IMAGE</span>
          </div>
          <div className="purpose-copy">
            <p className="eyebrow">PREPARATION WITH PURPOSE</p>
            <h2>
              A stronger you.
              <br />A clearer direction.
            </h2>
            <p>
              Academic preparation and physical readiness go hand in hand. Explore a
              training approach built around steady effort, learning and personal
              discipline.
            </p>
            <div className="purpose-points">
              <span>
                <BookOpen size={21} /> Focused learning
              </span>
              <span>
                <Activity size={21} /> Physical readiness
              </span>
              <span>
                <Target size={21} /> Purposeful preparation
              </span>
            </div>
            <a className="text-link" href="/training">
              Explore the training program <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">KEEP YOUR NEXT STEP IN SIGHT</p>
            <h2>Recruitment updates.</h2>
          </div>
          <a className="text-link" href="/notifications">
            All notifications <ArrowUpRight size={17} />
          </a>
        </div>
        <NoticeList limit={3} />
      </section>
      <section className="enquiry-band container">
        <div>
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h2>
            Turn your ambition
            <br />
            into a starting point.
          </h2>
          <p>Tell us about yourself and the course you’re interested in.</p>
        </div>
        <a className="button button-gold" href="/registration">
          Begin your enquiry <ArrowUpRight size={19} />
        </a>
        <ShieldCheck className="enquiry-watermark" size={210} strokeWidth={0.6} />
      </section>
      <section className="section home-location-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">VISIT US</p>
              <h2>Find your way to the academy.</h2>
            </div>
          </div>
          <LocationMap compact />
        </div>
      </section>
    </>
  );
}
