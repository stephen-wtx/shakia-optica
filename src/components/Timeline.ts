export interface TimelineCallbacks {
  onSelectSlide: (index: number) => void;
}

export interface TimelineController {
  element: HTMLElement;
  updateProgress: (slideIndex: number, progress: number) => void;
  setActiveSlide: (slideIndex: number) => void;
}

export function createTimeline(callbacks: TimelineCallbacks): TimelineController {
  const container = document.createElement('div');
  container.className =
    'absolute bottom-8 sm:bottom-10 md:bottom-12 left-0 w-full z-30 px-6 sm:px-10 md:px-16 pointer-events-auto select-none';

  container.innerHTML = `
    <div class="max-w-xs sm:max-w-sm md:max-w-md" role="tablist" aria-label="Slides">
      <!-- 3 Minimal Thin Line Segments -->
      <div class="flex items-center gap-2.5 sm:gap-3">
        ${[0, 1, 2]
          .map(
            (idx) => `
          <button
            type="button"
            role="tab"
            aria-selected="${idx === 0 ? 'true' : 'false'}"
            aria-label="Slide ${idx + 1}"
            data-slide-index="${idx}"
            class="timeline-segment group relative flex-1 h-5 flex items-center cursor-pointer focus:outline-none"
          >
            <!-- 1px Thin Track Line -->
            <div class="relative w-full h-[1.5px] bg-white/20 overflow-hidden transition-colors duration-300 group-hover:bg-white/40">
              <div 
                class="segment-progress absolute inset-0 bg-white origin-left"
                style="transform: scaleX(0);"
              ></div>
            </div>
          </button>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  const segmentButtons = container.querySelectorAll<HTMLButtonElement>('.timeline-segment');
  const progressBars = container.querySelectorAll<HTMLElement>('.segment-progress');

  segmentButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.slideIndex);
      if (!isNaN(idx)) {
        callbacks.onSelectSlide(idx);
      }
    });
  });

  function setActiveSlide(slideIndex: number) {
    segmentButtons.forEach((btn, idx) => {
      const isCurrent = idx === slideIndex;
      btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');

      if (progressBars[idx]) {
        if (idx < slideIndex) {
          progressBars[idx].style.transform = 'scaleX(1)';
        } else if (idx > slideIndex) {
          progressBars[idx].style.transform = 'scaleX(0)';
        }
      }
    });
  }

  function updateProgress(slideIndex: number, progress: number) {
    const clamped = Math.max(0, Math.min(1, progress));

    progressBars.forEach((bar, idx) => {
      if (idx === slideIndex) {
        bar.style.transform = `scaleX(${clamped})`;
      } else if (idx < slideIndex) {
        bar.style.transform = 'scaleX(1)';
      } else {
        bar.style.transform = 'scaleX(0)';
      }
    });
  }

  return {
    element: container,
    setActiveSlide,
    updateProgress,
  };
}
