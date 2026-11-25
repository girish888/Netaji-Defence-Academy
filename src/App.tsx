import Header from './components/Header';
import Footer from './components/Footer';
import PageIntro from './components/PageIntro';
import { pages } from './data/site';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import OtherCourses from './pages/OtherCourses';
import Training from './pages/Training';
import Gallery from './pages/Gallery';
import Hostel from './pages/Hostel';
import Notifications from './pages/Notifications';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import Achievements from './pages/Achievements';
import CoursesPoster from './pages/CoursesPoster';

const components = {
  '/': Home,
  '/about': About,
  '/courses': Courses,
  '/courses/others': OtherCourses,
  '/training': Training,
  '/gallery': Gallery,
  '/hostel': Hostel,
  '/notifications': Notifications,
  '/registration': Registration,
  '/contact': Contact,
  '/achievements': Achievements,
  '/courses-poster': CoursesPoster,
};

export default function App({ path }: { path: string }) {
  const normalized =
    path
      .replace(/^\/dist(?:\/index\.html)?/, '')
      .replace(/\/index\.html$/, '')
      .replace(/\/$/, '') || '/';
  const page = pages.find((item) => item.path === normalized);
  const Content = components[normalized as keyof typeof components];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={normalized} />
      <main id="main">
        {page && Content ? (
          <>
            {normalized !== '/' && (
              <PageIntro
                eyebrow={page.label.toUpperCase()}
                title={page.title}
                description={page.description}
              />
            )}
            <Content />
          </>
        ) : (
          <section className="section container">
            <h1>Page not found</h1>
            <p>This page is not available.</p>
            <a className="button" href="/">
              Return home
            </a>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
