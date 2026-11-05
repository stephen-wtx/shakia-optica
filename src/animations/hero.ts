import gsap from 'gsap';
import type { TimelineController } from '../components/Timeline';

export interface SlideData {
  id: number;
  type: 'video' | 'image';
  mediaElement: HTMLElement;
  imgElement?: HTMLImageElement;
  textElement: HTMLElement;
  duration?: number;
}

export interface HeroSliderController {
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  destroy: () => void;
}

export function initHeroSlider(
  slides: SlideData[],
  timeline: TimelineController,
  videoElement: HTMLVideoElement | null
): HeroSliderController {
  let currentIndex = 0;
  let isTransitioning = false;
  let animationFrameId: number | null = null;
  let slideStartTime = performance.now();
  let activeZoomTween: gsap.core.Tween | null = null;
  const defaultImageDuration = 6.5;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize initial visibility and transforms
  slides.forEach((slide, idx) => {
    if (idx === 0) {
      gsap.set(slide.mediaElement, {
        opacity: 1,
        visibility: 'visible',
      });
      gsap.set(slide.textElement, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
      });
    } else {
      gsap.set(slide.mediaElement, {
        opacity: 0,
        visibility: 'hidden',
      });
      gsap.set(slide.textElement, {
        opacity: 0,
        y: 12,
        visibility: 'hidden',
      });
    }

    if (slide.imgElement) {
      gsap.set(slide.imgElement, { scale: 1.0 });
    }
  });

  timeline.setActiveSlide(0);

  // Play initial video if present
  if (videoElement) {
    videoElement.currentTime = 0;
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        videoElement.muted = true;
        videoElement.play().catch(() => {});
      });
    }
  }

  function startImageZoom(slide: SlideData) {
    if (activeZoomTween) {
      activeZoomTween.kill();
      activeZoomTween = null;
    }

    if (isReducedMotion || slide.type !== 'image' || !slide.imgElement) {
      return;
    }

    const duration = slide.duration || defaultImageDuration;
    // Reset to scale 1.00 and glide very slowly to 1.048 across full slide duration
    gsap.set(slide.imgElement, { scale: 1.0 });
    activeZoomTween = gsap.to(slide.imgElement, {
      scale: 1.048,
      duration: duration,
      ease: 'none',
      overwrite: 'auto',
    });
  }

  function transitionToSlide(targetIndex: number) {
    if (targetIndex === currentIndex || isTransitioning) return;
    isTransitioning = true;

    const outgoingSlide = slides[currentIndex];
    const incomingSlide = slides[targetIndex];
    currentIndex = targetIndex;

    timeline.setActiveSlide(targetIndex);

    // Make incoming elements visible for animation
    incomingSlide.mediaElement.style.visibility = 'visible';
    incomingSlide.textElement.style.visibility = 'visible';

    // Start video or continuous subtle zoom on image
    if (incomingSlide.type === 'video' && videoElement) {
      if (activeZoomTween) {
        activeZoomTween.kill();
        activeZoomTween = null;
      }
      videoElement.currentTime = 0;
      videoElement.play().catch(() => {});
    } else if (incomingSlide.type === 'image') {
      startImageZoom(incomingSlide);
    }

    if (isReducedMotion) {
      gsap.to(outgoingSlide.mediaElement, { opacity: 0, duration: 0.2 });
      gsap.to(outgoingSlide.textElement, { opacity: 0, duration: 0.2 });
      gsap.to(incomingSlide.mediaElement, { opacity: 1, duration: 0.2 });
      gsap.to(incomingSlide.textElement, { opacity: 1, duration: 0.2 });

      if (outgoingSlide.type === 'video' && videoElement) {
        videoElement.pause();
      }

      outgoingSlide.mediaElement.style.visibility = 'hidden';
      outgoingSlide.textElement.style.visibility = 'hidden';
      if (outgoingSlide.imgElement) {
        gsap.set(outgoingSlide.imgElement, { scale: 1.0 });
      }

      isTransitioning = false;
      slideStartTime = performance.now();
      return;
    }

    // GSAP clean, synchronized transition
    const tl = gsap.timeline({
      onComplete: () => {
        outgoingSlide.mediaElement.style.visibility = 'hidden';
        outgoingSlide.textElement.style.visibility = 'hidden';

        if (outgoingSlide.imgElement) {
          gsap.set(outgoingSlide.imgElement, { scale: 1.0 });
        }

        if (outgoingSlide.type === 'video' && videoElement) {
          videoElement.pause();
        }

        isTransitioning = false;
        slideStartTime = performance.now();
      },
    });

    // 1. Outgoing text fades out and moves slightly up
    tl.to(
      outgoingSlide.textElement,
      {
        opacity: 0,
        y: -8,
        duration: 0.35,
        ease: 'power2.in',
      },
      0
    );

    // 2. Outgoing media crossfades out
    tl.to(
      outgoingSlide.mediaElement,
      {
        opacity: 0,
        duration: 0.75,
        ease: 'power2.inOut',
      },
      0
    );

    // 3. Incoming media crossfades in
    tl.fromTo(
      incomingSlide.mediaElement,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.75,
        ease: 'power2.inOut',
      },
      0.05
    );

    // 4. Incoming text reveals and stays visible
    tl.fromTo(
      incomingSlide.textElement,
      {
        opacity: 0,
        y: 12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      },
      0.2
    );
  }

  function goToNext() {
    const nextIdx = (currentIndex + 1) % slides.length;
    transitionToSlide(nextIdx);
  }

  function goToPrev() {
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
    transitionToSlide(prevIdx);
  }

  function tick(timestamp: number) {
    if (!isTransitioning) {
      const currentSlide = slides[currentIndex];

      if (currentSlide.type === 'video' && videoElement) {
        const duration = videoElement.duration;
        const currentTime = videoElement.currentTime;

        if (duration && !isNaN(duration) && duration > 0) {
          const progress = currentTime / duration;
          timeline.updateProgress(currentIndex, progress);

          if (currentTime >= duration - 0.2 || videoElement.ended) {
            goToNext();
          }
        }
      } else {
        const slideDuration = currentSlide.duration || defaultImageDuration;
        const elapsed = (timestamp - slideStartTime) / 1000;
        const progress = Math.min(1, elapsed / slideDuration);

        timeline.updateProgress(currentIndex, progress);

        if (progress >= 1.0) {
          goToNext();
        }
      }
    }

    animationFrameId = requestAnimationFrame(tick);
  }

  animationFrameId = requestAnimationFrame(tick);

  return {
    goToSlide: (index: number) => {
      if (index >= 0 && index < slides.length) {
        transitionToSlide(index);
      }
    },
    nextSlide: goToNext,
    prevSlide: goToPrev,
    destroy: () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (activeZoomTween) {
        activeZoomTween.kill();
      }
      if (videoElement) {
        videoElement.pause();
      }
    },
  };
}
