import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initContactAnimation(container: HTMLElement): void {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = container.querySelector<HTMLElement>('.contact-header');
  const titleChars = header ? Array.from(header.querySelectorAll<HTMLElement>('.contact-char')) : [];
  const subtitleWords = header ? Array.from(header.querySelectorAll<HTMLElement>('.contact-word')) : [];

  const stores = Array.from(container.querySelectorAll<HTMLElement>('.contact-store-item'));
  const directChannels = Array.from(container.querySelectorAll<HTMLElement>('.contact-channel-item'));
  const socials = Array.from(container.querySelectorAll<HTMLElement>('.contact-social-item'));

  if (isReducedMotion) {
    if (titleChars.length) gsap.set(titleChars, { opacity: 1, y: 0, rotate: 0 });
    if (subtitleWords.length) gsap.set(subtitleWords, { opacity: 1, y: 0 });
    [...stores, ...directChannels, ...socials].forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
    return;
  }

  // Initial hidden states
  gsap.set(titleChars, { opacity: 0, y: 70, rotate: 12 });
  gsap.set(subtitleWords, { opacity: 0, y: 18 });
  [...stores, ...directChannels, ...socials].forEach((el) => {
    gsap.set(el, { opacity: 0, y: 22 });
  });

  // Header animation — Stagger Letters on "Contacto" + Stagger Words on subtitle
  if (header && titleChars.length > 0) {
    ScrollTrigger.create({
      trigger: header,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.to(titleChars, {
          opacity: 1,
          y: 0,
          rotate: 0,
          stagger: 0.04,
          duration: 0.95,
          ease: 'back.out(1.7)',
        });

        if (subtitleWords.length > 0) {
          tl.to(
            subtitleWords,
            {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              duration: 0.65,
              ease: 'power2.out',
            },
            '-=0.3'
          );
        }
      },
    });
  }

  // Content animation — Stores & Channels sequential entrance
  const contentBody = container.querySelector<HTMLElement>('.contact-content-body');
  if (contentBody) {
    ScrollTrigger.create({
      trigger: contentBody,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        if (stores.length > 0) {
          tl.to(stores, {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power2.out',
          });
        }

        if (directChannels.length > 0) {
          tl.to(
            directChannels,
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.65,
              ease: 'power2.out',
            },
            '-=0.35'
          );
        }

        if (socials.length > 0) {
          tl.to(
            socials,
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: 'power2.out',
            },
            '-=0.25'
          );
        }
      },
    });
  }
}

