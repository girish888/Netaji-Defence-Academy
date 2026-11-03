import { ArrowUpRight } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/site';

export default function Courses() {
  return (
    <section className="section container">
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <div className="course-details">
        {courses
          .filter((course) => course.id !== 'others')
          .map((course) => (
            <article className="course-detail" id={course.id} key={course.id}>
              <span className="detail-number">{course.number}</span>
              <div>
                <p className="eyebrow">PREPARATION PATHWAY</p>
                <h2>{course.name}</h2>
                <p>{course.description}</p>
                <p className="subject-line">{course.subjects}</p>
                <p className="fine-print">
                  Topics are an orientation guide. Confirm the actual academy syllabus,
                  batch availability and applicable official eligibility before admission.
                </p>
                {course.id === 'police' && (
                  <p className="verification-note">
                    The 10 previously approved police information points were not
                    supplied. They have not been recreated. Point 11: State Police —
                    Andhra Pradesh (AP) and Telangana (TG).
                  </p>
                )}
                <a className="text-link" href={`/registration?course=${course.id}`}>
                  Enquire about this pathway <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
