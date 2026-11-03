import { ArrowUpRight, Compass } from 'lucide-react';

export default function OtherCourses() {
  return (
    <section className="section container">
      <div className="empty-state">
        <Compass size={40} strokeWidth={1.2} />
        <div>
          <h2>Additional course list awaiting confirmation.</h2>
          <p>
            The academy has not supplied its final list of other courses. Contact the
            academy to discuss your interests.
          </p>
          <a className="text-link" href="/registration">
            Prepare an enquiry <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
