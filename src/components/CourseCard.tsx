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

export default function CourseCard({ course }: { course: (typeof courses)[number] }) {
  const Icon = icons[course.icon as keyof typeof icons];
  const href = course.id === 'others' ? '/courses/others' : `/courses#${course.id}`;

  return (
    <a className="course-card" href={href}>
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
