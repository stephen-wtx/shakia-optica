import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Intro section animations — PLAY ON ENTER (Independent of scroll).
 *
 * Architecture:
 *   SCROLL = GATILHO (detecta quando o elemento entra no viewport)
 *   GSAP   = ANIMAÇÃO (timeline normal, suave, contínua)
 *   FINAL  = O elemento atinge 100% e PERMANECE ESTÁVEL E VISÍVEL.
 *
 * Zero scrub. Zero reverse on leave. Once: true.
 * O scroll nunca controla o progresso nem volta atrás a animação.
 */
export function initIntroAnimation(container: HTMLElement): void {
  const isReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // ----- Elementos estritamente contidos dentro do container Intro -----

  const header = container.querySelector<HTMLElement>('.intro-header');
  const headerChars = header
    ? Array.from(header.querySelectorAll<HTMLElement>('.intro-char'))
    : [];
  const headerWords = header
    ? Array.from(header.querySelectorAll<HTMLElement>('.intro-word'))
    : [];

  const block1 = container.querySelector<HTMLElement>('.intro-block-1');
  const b1Media = block1?.querySelector<HTMLElement>('.intro-b1-media') ?? null;
  const b1Img = block1?.querySelector<HTMLElement>('.intro-b1-img') ?? null;
  const b1Text = block1?.querySelector<HTMLElement>('.intro-b1-text') ?? null;
  const b1Chars = b1Text
    ? Array.from(b1Text.querySelectorAll<HTMLElement>('.intro-char'))
    : [];
  const b1Words = b1Text
    ? Array.from(b1Text.querySelectorAll<HTMLElement>('.intro-word'))
    : [];

  const block2 = container.querySelector<HTMLElement>('.intro-block-2');
  const b2Media = block2?.querySelector<HTMLElement>('.intro-b2-media') ?? null;
  const b2Img = block2?.querySelector<HTMLElement>('.intro-b2-img') ?? null;
  const b2Text = block2?.querySelector<HTMLElement>('.intro-b2-text') ?? null;
  const b2Chars = b2Text
    ? Array.from(b2Text.querySelectorAll<HTMLElement>('.intro-char'))
    : [];
  const b2Words = b2Text
    ? Array.from(b2Text.querySelectorAll<HTMLElement>('.intro-word'))
    : [];

  // ----- Reduced motion: mostra tudo imediatamente sem animação -----

  if (isReducedMotion) {
    const allChars = [...headerChars, ...b1Chars, ...b2Chars];
    const allWords = [...headerWords, ...b1Words, ...b2Words];
    gsap.set(allChars, { opacity: 1, y: 0, rotate: 0 });
    gsap.set(allWords, { opacity: 1, y: 0 });
    [b1Media, b2Media].forEach((m) => {
      if (m) gsap.set(m, { opacity: 1, y: 0 });
    });
    [b1Img, b2Img].forEach((img) => {
      if (img) gsap.set(img, { scale: 1, filter: 'blur(0px)' });
    });
    return;
  }

  // ----- Estados iniciais antes de o elemento entrar no viewport -----

  gsap.set(headerChars, { opacity: 0, y: 60, rotate: 10 });
  gsap.set(headerWords, { opacity: 0, y: 18 });

  if (b1Media) gsap.set(b1Media, { opacity: 0, y: 25 });
  if (b1Img) gsap.set(b1Img, { scale: 0.97, filter: 'blur(6px)' });
  gsap.set(b1Chars, { opacity: 0, y: 60, rotate: 10 });
  gsap.set(b1Words, { opacity: 0, y: 18 });

  if (b2Media) gsap.set(b2Media, { opacity: 0, y: 25 });
  if (b2Img) gsap.set(b2Img, { scale: 0.97, filter: 'blur(6px)' });
  gsap.set(b2Chars, { opacity: 0, y: 60, rotate: 10 });
  gsap.set(b2Words, { opacity: 0, y: 18 });

  // =====================================================================
  // SEQUÊNCIA 01 — CABEÇALHO (PLAY ON ENTER)
  // "A essência do olhar." (Stagger Letters)
  // ↓
  // Texto de apoio (Stagger Words, sem blur)
  // ↓
  // Termina e fica 100% estável e legível para sempre
  // =====================================================================

  if (header && headerChars.length > 0) {
    ScrollTrigger.create({
      trigger: header,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const headerTl = gsap.timeline({
          defaults: { ease: 'power2.out' },
        });

        // 1. Título — Stagger Letters
        headerTl.to(headerChars, {
          opacity: 1,
          y: 0,
          rotate: 0,
          stagger: 0.04,
          duration: 0.9,
          ease: 'back.out(1.7)',
        });

        // 2. Parágrafo — Stagger Words (sem blur, entra suavemente logo a seguir)
        if (headerWords.length > 0) {
          headerTl.to(
            headerWords,
            {
              opacity: 1,
              y: 0,
              stagger: 0.025,
              duration: 0.7,
              ease: 'power2.out',
            },
            '-=0.3'
          );
        }
      },
    });
  }

  // =====================================================================
  // SEQUÊNCIA 02 — BLOCO 1 (PLAY ON ENTER)
  // img-3 (Soft Blur + Scale + suave y)
  // ↓
  // "Curadoria de autor." (Stagger Letters)
  // ↓
  // Parágrafo (Stagger Words, sem blur)
  // ↓
  // Termina e fica 100% estável e legível para sempre
  // =====================================================================

  if (block1) {
    ScrollTrigger.create({
      trigger: block1,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const b1Tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
        });

        // 1. Imagem img-3: Soft Blur + Scale
        if (b1Media && b1Img) {
          b1Tl
            .to(b1Media, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power2.out',
            }, 0)
            .to(b1Img, {
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.3,
              ease: 'power2.out',
            }, 0);
        }

        // 2. Título — Stagger Letters
        if (b1Chars.length > 0) {
          b1Tl.to(
            b1Chars,
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              stagger: 0.04,
              duration: 0.9,
              ease: 'back.out(1.7)',
            },
            0.2
          );
        }

        // 3. Parágrafo — Stagger Words
        if (b1Words.length > 0) {
          b1Tl.to(
            b1Words,
            {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              duration: 0.65,
              ease: 'power2.out',
            },
            '-=0.3'
          );
        }
      },
    });
  }

  // =====================================================================
  // SEQUÊNCIA 03 — BLOCO 2 (PLAY ON ENTER)
  // img-4 (Soft Blur + Scale + suave y)
  // ↓
  // "Precisão em cada detalhe." (Stagger Letters)
  // ↓
  // Parágrafo (Stagger Words, sem blur)
  // ↓
  // Termina e fica 100% estável e legível para sempre
  // =====================================================================

  if (block2) {
    ScrollTrigger.create({
      trigger: block2,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const b2Tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
        });

        // 1. Imagem img-4: Soft Blur + Scale
        if (b2Media && b2Img) {
          b2Tl
            .to(b2Media, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power2.out',
            }, 0)
            .to(b2Img, {
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.3,
              ease: 'power2.out',
            }, 0);
        }

        // 2. Título — Stagger Letters
        if (b2Chars.length > 0) {
          b2Tl.to(
            b2Chars,
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              stagger: 0.04,
              duration: 0.9,
              ease: 'back.out(1.7)',
            },
            0.2
          );
        }

        // 3. Parágrafo — Stagger Words
        if (b2Words.length > 0) {
          b2Tl.to(
            b2Words,
            {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              duration: 0.65,
              ease: 'power2.out',
            },
            '-=0.3'
          );
        }
      },
    });
  }
}
