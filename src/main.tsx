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

// Vite prefixes built assets, but application-authored links and image paths
// also need the repository base when hosted on a GitHub Pages project site.
// Keep this active after hydration so React rerenders cannot restore root URLs.
const basePath = new URL(import.meta.env.BASE_URL, window.location.origin).pathname.replace(/\/+$/, '');

function applyGitHubPagesBase(element: Element) {
  if (!basePath) return;

  for (const attribute of ['href', 'src']) {
    const value = element.getAttribute(attribute);
    if (
      value &&
      value.startsWith('/') &&
      !value.startsWith('//') &&
      value !== basePath &&
      !value.startsWith(`${basePath}/`)
    ) {
      element.setAttribute(attribute, `${basePath}${value}`);
    }
  }
}

function applyToTree(node: Node) {
  if (!(node instanceof Element)) return;
  applyGitHubPagesBase(node);
  node.querySelectorAll('[href], [src]').forEach(applyGitHubPagesBase);
}

applyToTree(document.documentElement);

const baseObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'attributes' && mutation.target instanceof Element) {
      applyGitHubPagesBase(mutation.target);
    }
    for (const addedNode of mutation.addedNodes) {
      applyToTree(addedNode);
    }
  }
});

baseObserver.observe(document.documentElement, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ['href', 'src'],
});
