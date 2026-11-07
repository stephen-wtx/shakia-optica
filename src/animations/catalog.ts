import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Catalog animations — PLAY ON ENTER (Independent of scroll).
 *
 * Sequence:
 *   Product card enters viewport (start: 'top 85%')
 *   1. Media: opacity 0 -> 1, y 30 -> 0, scale 0.98 -> 1
 *   2. Name: opacity 0 -> 1, y 15 -> 0
 *   3. Price: opacity 0 -> 1, y 15 -> 0
 *   4. Button: opacity 0 -> 1, y 15 -> 0
 *
 * Zero scrub. Zero reverse. Once: true.
 * After completion, items remain 100% normal and stable.
 */
export function initCatalogAnimation(container: HTMLElement): void {
  const isReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const header = container.querySelector<HTMLElement>('.catalog-header');
  const headerTitle = container.querySelector<HTMLElement>('.catalog-header-title');
  const headerSubtitle = container.querySelector<HTMLElement>('.catalog-header-subtitle');
  const productCards = Array.from(
    container.querySelectorAll<HTMLElement>('.catalog-product-item')
  );

  if (isReducedMotion) {
    if (headerTitle) gsap.set(headerTitle, { opacity: 1, y: 0 });
    if (headerSubtitle) gsap.set(headerSubtitle, { opacity: 1, y: 0 });
    productCards.forEach((card) => {
      const media = card.querySelector<HTMLElement>('.product-media-container');
      const name = card.querySelector<HTMLElement>('.product-name');
      const price = card.querySelector<HTMLElement>('.product-price');
      const btn = card.querySelector<HTMLElement>('.catalog-order-btn');
      if (media) gsap.set(media, { opacity: 1, y: 0, scale: 1 });
      if (name) gsap.set(name, { opacity: 1, y: 0 });
      if (price) gsap.set(price, { opacity: 1, y: 0 });
      if (btn) gsap.set(btn, { opacity: 1, y: 0 });
    });
    return;
  }

  // Initial hidden state for header
  if (headerTitle) gsap.set(headerTitle, { opacity: 0, y: 40 });
  if (headerSubtitle) gsap.set(headerSubtitle, { opacity: 0, y: 15 });

  // Header animation on enter
  if (header) {
    ScrollTrigger.create({
      trigger: header,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        if (headerTitle) {
          tl.to(headerTitle, { opacity: 1, y: 0, duration: 0.9 });
        }
        if (headerSubtitle) {
          tl.to(headerSubtitle, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
        }
      },
    });
  }

  // Individual product cards animation on enter
  productCards.forEach((card) => {
    const media = card.querySelector<HTMLElement>('.product-media-container');
    const name = card.querySelector<HTMLElement>('.product-name');
    const price = card.querySelector<HTMLElement>('.product-price');
    const btn = card.querySelector<HTMLElement>('.catalog-order-btn');

    // Initial hidden states
    if (media) gsap.set(media, { opacity: 0, y: 30, scale: 0.98 });
    if (name) gsap.set(name, { opacity: 0, y: 15 });
    if (price) gsap.set(price, { opacity: 0, y: 15 });
    if (btn) gsap.set(btn, { opacity: 0, y: 15 });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const cardTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        // 1. Image appears softly with subtle scale settlement
        if (media) {
          cardTl.to(media, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
          });
        }

        // 2. Product name enters smoothly
        if (name) {
          cardTl.to(
            name,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
            },
            '-=0.45'
          );
        }

        // 3. Price enters softly
        if (price) {
          cardTl.to(
            price,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.35'
          );
        }

        // 4. Order button enters and stabilizes
        if (btn) {
          cardTl.to(
            btn,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.35'
          );
        }
      },
    });
  });
}

