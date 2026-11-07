import gsap from 'gsap';

export interface MenuAnimationController {
  isOpen: () => boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function initMenuAnimation(
  menuOverlay: HTMLElement,
  links: HTMLElement[],
  hamburgerBtn: HTMLElement,
  lineTop: HTMLElement,
  lineBottom: HTMLElement
): MenuAnimationController {
  let open = false;
  let isAnimating = false;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initial hidden state of menu
  gsap.set(menuOverlay, {
    autoAlpha: 0,
    pointerEvents: 'none',
  });

  gsap.set(links, {
    y: 20,
    opacity: 0,
  });

  // Initial state of hamburger lines: perfectly centered and balanced, dark color
  gsap.set(lineTop, { y: -4, rotate: 0, backgroundColor: '#18181B' });
  gsap.set(lineBottom, { y: 4, rotate: 0, backgroundColor: '#18181B' });

  function openMenu() {
    if (open || isAnimating) return;
    open = true;
    isAnimating = true;

    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
    menuOverlay.style.pointerEvents = 'auto';

    // Animate lines to a clean, centered dark "X"
    gsap.to(lineTop, {
      y: 0,
      rotate: 45,
      backgroundColor: '#18181B',
      duration: 0.35,
      ease: 'power2.inOut',
    });
    gsap.to(lineBottom, {
      y: 0,
      rotate: -45,
      backgroundColor: '#18181B',
      duration: 0.35,
      ease: 'power2.inOut',
    });

    if (isReducedMotion) {
      gsap.to(menuOverlay, { autoAlpha: 1, duration: 0.2 });
      gsap.to(links, { opacity: 1, y: 0, duration: 0.2 });
      isAnimating = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
        const firstAnchor = links[0]?.querySelector('a');
        firstAnchor?.focus();
      },
    });

    tl.to(menuOverlay, {
      autoAlpha: 1,
      duration: 0.45,
      ease: 'power2.out',
    }).fromTo(
      links,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power3.out',
      },
      '-=0.2'
    );
  }

  function closeMenu() {
    if (!open || isAnimating) return;
    open = false;
    isAnimating = true;

    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Abrir menu');

    // Restore lines from "X" back to two parallel centered lines in #18181B
    gsap.to(lineTop, {
      y: -4,
      rotate: 0,
      backgroundColor: '#18181B',
      duration: 0.35,
      ease: 'power2.inOut',
    });
    gsap.to(lineBottom, {
      y: 4,
      rotate: 0,
      backgroundColor: '#18181B',
      duration: 0.35,
      ease: 'power2.inOut',
    });

    if (isReducedMotion) {
      gsap.to(links, { opacity: 0, duration: 0.15 });
      gsap.to(menuOverlay, {
        autoAlpha: 0,
        duration: 0.15,
        onComplete: () => {
          menuOverlay.style.pointerEvents = 'none';
          isAnimating = false;
          hamburgerBtn.focus();
        },
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        menuOverlay.style.pointerEvents = 'none';
        isAnimating = false;
        hamburgerBtn.focus();
      },
    });

    tl.to(links, {
      y: -15,
      opacity: 0,
      stagger: 0.05,
      duration: 0.25,
      ease: 'power2.in',
    }).to(
      menuOverlay,
      {
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power2.out',
      },
      '-=0.15'
    );
  }

  function toggleMenu() {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      closeMenu();
    }
  });

  return {
    isOpen: () => open,
    open: openMenu,
    close: closeMenu,
    toggle: toggleMenu,
  };
}
