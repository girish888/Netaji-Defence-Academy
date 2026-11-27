import { Anchor, Plane, Flag, Badge, Compass, Shield, ArrowUpRight } from 'lucide-react';
import { courses } from '../data/site';

const icons = {
  anchor: Anchor,
  plane: Plane,
  flag: Flag,
  badge: Badge,
  compass: Compass,
  shield: Shield,
};

const courseImages: Record<string, { src: string; alt: string }> = {
  nda: { src: '/images/optimized/nda.jpg', alt: 'National Defence Academy cadets' },
  navy: { src: '/images/originals/navy.jpg', alt: 'Indian Navy personnel' },
  'air-force': {
    src: '/images/optimized/air.jpg',
    alt: 'Indian Air Force personnel and aircraft',
  },
  army: { src: '/images/optimized/army.jpg', alt: 'Indian Army soldier' },
  police: { src: '/images/optimized/police.jpg', alt: 'Police and defence cadets' },
  'ssc-gd': { src: '/images/optimized/ssc gd.jpg', alt: 'SSC GD preparation reference' },
  others: { src: '/images/optimized/para.jpg', alt: 'Paramilitary forces reference' },
};

export default function CourseCard({ course }: { course: (typeof courses)[number] }) {
  const Icon = icons[course.icon as keyof typeof icons];
  const href = course.id === 'others' ? '/courses/others' : `/courses#${course.id}`;
  const image = courseImages[course.id];

  return (
    <a className="course-card" href={href}>
      <img className="course-card-image" src={image.src} alt={image.alt} loading="lazy" />
      <div className="course-card-top">
        <Icon size={31} strokeWidth={1.4} />
        <span>{course.number}</span>
      </div>
      <h3>{course.short}</h3>
      <p>
        {course.id === 'others'
          ? 'Explore more possibilities'
          : 'Explore the preparation pathway'}
      </p>
      <span className="course-link">
        View course <ArrowUpRight size={17} />
      </span>
    </a>
  );
}
