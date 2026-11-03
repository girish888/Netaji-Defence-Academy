import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const container = document.getElementById('root');

if (!container) throw new Error('Application root is missing.');

const app = <App path={window.location.pathname} />;

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
