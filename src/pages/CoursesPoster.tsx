import { ArrowRight, BookOpen, Dumbbell, MapPin, ShieldCheck, Users } from 'lucide-react';
import { academy } from '../data/site';

const categories = [
  {
    title: 'AFTER 10TH AND 10TH WITH ITI',
    groups: [
      {
        age: 'AGE LIMIT: 17.5 TO 21 YEARS',
        items: [
          'Indian Army GD',
          'Indian Navy (MR)',
          'Indian Coast Guard Navik (DB)',
          'Army Tradesman',
        ],
      },
      {
        age: 'AGE LIMIT: 18 TO 25 YEARS',
        items: [
          'CISF Constable (GD)',
          'CRPF Constable',
          'CRPF Tradesman',
          'ITBP Constable',
          'BSF Constable',
          'BSF Head Constable',
          'BSF Head Constable (Radio Operator)',
        ],
      },
    ],
  },
  {
    title: 'AFTER INTER MPC',
    groups: [
      {
        age: 'AGE LIMIT: 17.5 TO 21 YEARS',
        items: [
          'Indian Air Force (Technical)',
          'Indian Air Force (Non Technical)',
          'Indian Navy (AA)',
          'Indian Navy (SSR)',
          'Indian Navy (MR)',
          'Indian Coast Guard (Yantrik)',
          'Indian Coast Guard Navik (DB)',
          'Indian Army (General Duty)',
          'Indian Army Tradesman',
          'Army Technical',
        ],
      },
      {
        age: 'AGE LIMIT: 18 TO 25 YEARS',
        items: [
          'CISF Constable (GD)',
          'CRPF ASI',
          'CRPF HC (General)',
          'CRPF HC (Technical)',
          'CRPF Constable',
          'CRPF Tradesman',
          'RPF Constable',
          'ITBP Constable',
          'BSF Constable',
          'BSF Head Constable',
          'BSF HC (Radio Operator)',
        ],
      },
    ],
  },
  {
    title: 'AFTER INTER ANY GROUP',
    groups: [
      {
        age: 'AGE LIMIT: 17.5 TO 21 YEARS',
        items: [
          'Indian Air Force (Non Technical)',
          'Indian Navy (MR)',
          'Indian Coast Guard (NAVIK DB)',
          'Indian Army Clerk / Store Keeper',
          'Indian Army General Duty',
          'Indian Army Tradesman',
        ],
      },
      {
        age: 'AGE LIMIT: 18 TO 25 YEARS',
        items: [
          'CISF Constable (GD)',
          'CRPF ASI',
          'CRPF HC (General)',
          'CRPF Tradesman',
          'RPF Constable',
          'ITBP Constable',
          'BSF Constable',
          'BSF Head Constable',
        ],
      },
    ],
  },
];

const features = [
  {
    title: 'EXPERT FACULTY',
    text: 'Experienced and dedicated faculty for your success.',
    icon: Users,
  },
  {
    title: 'PHYSICAL TRAINING',
    text: 'Regular physical training to build strength and stamina.',
    icon: Dumbbell,
  },
  {
    title: 'WRITTEN GUIDANCE',
    text: 'Complete study material and exam-oriented guidance.',
    icon: BookOpen,
  },
  {
    title: 'PERSONALITY DEVELOPMENT',
    text: 'Personality development classes to build confidence and leadership.',
    icon: ShieldCheck,
  },
];

export default function CoursesPoster() {
  return (
    <section className="poster-page">
      <div className="poster-hero">
        <img
          className="poster-logo"
          src="/images/optimized/NDA-2.jpeg"
          alt="Netaji Defence Academy emblem"
        />
        <div>
          <p className="poster-kicker">NETAJI DEFENCE ACADEMY</p>
          <h2>COURSES</h2>
          <p>
            Defence, paramilitary, police and central government recruitment preparation.
          </p>
        </div>
      </div>

      <div className="poster-layout">
        <div className="poster-course-column">
          {categories.map((category) => (
            <section className="poster-category" key={category.title}>
              <h3>{category.title}</h3>
              <div className="poster-age-grid">
                {category.groups.map((group) => (
                  <article
                    className="poster-age-card"
                    key={`${category.title}-${group.age}`}
                  >
                    <h4>{group.age}</h4>
                    <ol>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="poster-features">
          {features.map(({ title, text, icon: Icon }) => (
            <article key={title}>
              <Icon size={26} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </aside>
      </div>

      <section className="poster-selection">
        <p className="eyebrow">PREPARE WITH PURPOSE</p>
        <h2>SELECTION PROCESS</h2>
        <div className="selection-steps">
          {[
            'WRITTEN EXAM',
            'PHYSICAL EFFICIENCY TEST',
            'MAIN EXAM',
            'DOCUMENT VERIFICATION',
            'MEDICAL EXAM',
          ].map((step, index) => (
            <div className="selection-step" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
              {index < 4 && (
                <ArrowRight className="selection-arrow" size={22} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="poster-contact">
        <div>
          <p className="poster-kicker">JOIN NOW</p>
          <h2>
            Discipline today,
            <br />
            Success tomorrow.
          </h2>
          <p>Serve the nation with pride.</p>
        </div>
        <div className="poster-contact-details">
          {academy.phone && <a href={`tel:${academy.phone}`}>{academy.phone}</a>}
          {academy.address ? (
            <p>
              <MapPin size={21} /> {academy.address}
            </p>
          ) : (
            <p>Contact details will appear after academy confirmation.</p>
          )}
        </div>
      </section>
      <div className="poster-footer">YOUR DREAM ★ OUR MISSION ★ NATION&apos;S PRIDE</div>
    </section>
  );
}
