import Header from './components/Header';
import Footer from './components/Footer';
import PageIntro from './components/PageIntro';
import { pages } from './data/site';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Courses = lazy(() => import('./pages/Courses'));
const OtherCourses = lazy(() => import('./pages/OtherCourses'));
const Training = lazy(() => import('./pages/Training'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Hostel = lazy(() => import('./pages/Hostel'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Registration = lazy(() => import('./pages/Registration'));
const Contact = lazy(() => import('./pages/Contact'));
const Achievements = lazy(() => import('./pages/Achievements'));
const CoursesPoster = lazy(() => import('./pages/CoursesPoster'));

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
  // GitHub Pages project sites include the repository name in the browser path.
  // Strip Vite's configured base before resolving the application's route.
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const appPath =
    basePath && path.startsWith(`${basePath}/`)
      ? path.slice(basePath.length)
      : path === basePath
        ? '/'
        : path;
  const normalized =
    appPath
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
        <Suspense
          fallback={
            <section className="section container route-loading" aria-live="polite">
              <span className="route-loading-spinner" aria-hidden="true" />
              <span>Loading page…</span>
            </section>
          }
        >
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
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
