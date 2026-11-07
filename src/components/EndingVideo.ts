import endingVideoSrc from '../assets/video/ending.webm';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createEndingVideo(): { element: HTMLElement } {
  const section = document.createElement('section');
  section.id = 'video-final';
  section.className = 'relative w-full bg-[#18181b] overflow-hidden';

  section.innerHTML = `
    <div class="ending-video-wrap relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
      <video
        class="ending-video-player w-full h-full object-cover pointer-events-none select-none will-change-transform"
        src="${endingVideoSrc}"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      ></video>
    </div>
  `;

  return { element: section };
}

export function initEndingVideoAnimation(container: HTMLElement): void {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrap = container.querySelector<HTMLElement>('.ending-video-wrap');
  const video = container.querySelector<HTMLVideoElement>('.ending-video-player');

  if (!wrap || !video) return;

  if (isReducedMotion) {
    gsap.set(wrap, { opacity: 1 });
    gsap.set(video, { scale: 1 });
    return;
  }

  gsap.set(wrap, { opacity: 0 });
  gsap.set(video, { scale: 1.05 });

  ScrollTrigger.create({
    trigger: wrap,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      // Trigger cinematic entrance
      gsap.to(wrap, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
      });
      gsap.to(video, {
        scale: 1,
        duration: 1.8,
        ease: 'power2.out',
      });

      // Ensure playback starts on viewport enter
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay policy handled silently
        });
      }
    },
  });
}
