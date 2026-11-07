import './styles/main.css';
import { initSmoothScroll } from './animations/smoothScroll';
import { createNavbar } from './components/Navbar';
import { createHero } from './components/Hero';
import { createIntro } from './components/Intro';
import { createCatalog } from './components/Catalog';
import { createContact } from './components/Contact';
import { createEndingVideo, initEndingVideoAnimation } from './components/EndingVideo';
import { createFooter } from './components/Footer';
import { initIntroAnimation } from './animations/intro';
import { initCatalogAnimation } from './animations/catalog';
import { initContactAnimation } from './animations/contact';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

function initApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    console.error('Root element #app not found');
    return;
  }

  // Clear any existing contents
  app.innerHTML = '';

  // Initialize smooth scrolling with Lenis and GSAP ScrollTrigger
  initSmoothScroll();

  // Create components
  const navbar = createNavbar();
  const hero = createHero();
  const intro = createIntro();
  const catalog = createCatalog();
  const contact = createContact();
  const endingVideo = createEndingVideo();
  const footer = createFooter();

  // Mount components to the DOM in exact editorial order
  app.appendChild(navbar.element);
  app.appendChild(hero.element);
  app.appendChild(intro.element);
  app.appendChild(catalog.element);
  app.appendChild(contact.element);
  app.appendChild(endingVideo.element);
  app.appendChild(footer.element);

  // Initialise animations AFTER DOM mounting
  initIntroAnimation(intro.element);
  initCatalogAnimation(catalog.element);
  initContactAnimation(contact.element);
  initEndingVideoAnimation(endingVideo.element);

  // Refresh ScrollTrigger after images and assets have loaded
  const allImages = app.querySelectorAll('img');
  let loadedCount = 0;
  const totalImages = allImages.length;

  if (totalImages === 0) {
    ScrollTrigger.refresh();
  } else {
    allImages.forEach((img) => {
      const onLoaded = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          ScrollTrigger.refresh();
        }
      };
      if (img.complete) {
        onLoaded();
      } else {
        img.addEventListener('load', onLoaded, { once: true });
        img.addEventListener('error', onLoaded, { once: true });
      }
    });
  }
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
