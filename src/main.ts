import './styles/main.css';
import { initSmoothScroll } from './animations/smoothScroll';
import { createNavbar } from './components/Navbar';
import { createHero } from './components/Hero';

function initApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    console.error('Root element #app not found');
    return;
  }

  // Clear any existing contents
  app.innerHTML = '';

  // Initialize smooth scrolling with Lenis
  initSmoothScroll();

  // Create Navbar (with Logo & 2-line Hamburger & Liquid Glass Menu)
  const navbar = createNavbar();

  // Create Hero (with Video, IMG-1, IMG-2, and Timeline)
  const hero = createHero();

  // Mount components
  app.appendChild(navbar.element);
  app.appendChild(hero.element);
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
