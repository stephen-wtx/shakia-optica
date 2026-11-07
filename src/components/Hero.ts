import videoSrc from '../assets/video/video-intro.webm';
import img1Src from '../assets/imgs/img-1.jpg';
import img2Src from '../assets/imgs/img-2.jpg';
import { createTimeline, type TimelineController } from './Timeline';
import { initHeroSlider, type HeroSliderController, type SlideData } from '../animations/hero';

export function createHero(): {
  element: HTMLElement;
  sliderController: HeroSliderController;
  timelineController: TimelineController;
} {
  const heroSection = document.createElement('section');
  heroSection.id = 'hero';
  heroSection.className =
    'relative w-full h-[100svh] min-h-[550px] overflow-hidden bg-[#09090b]';

  heroSection.innerHTML = `
    <!-- Slides Media Stack -->
    <div class="slides-media-container absolute inset-0 w-full h-full z-0 overflow-hidden">
      
      <!-- Slide 01: Video -->
      <div class="slide-media-item absolute inset-0 w-full h-full overflow-hidden" data-slide="0">
        <video 
          id="hero-video" 
          src="${videoSrc}" 
          class="w-full h-full object-cover object-[center_35%] pointer-events-none" 
          autoplay 
          muted 
          loop 
          playsinline 
          preload="auto"
        ></video>
      </div>

      <!-- Slide 02: IMG-1 -->
      <div class="slide-media-item absolute inset-0 w-full h-full overflow-hidden" data-slide="1">
        <img 
          src="${img1Src}" 
          alt="Shakia Óptica" 
          class="slide-img w-full h-full object-cover object-[center_35%] select-none pointer-events-none origin-center" 
          loading="eager"
        />
      </div>

      <!-- Slide 03: IMG-2 -->
      <div class="slide-media-item absolute inset-0 w-full h-full overflow-hidden" data-slide="2">
        <img 
          src="${img2Src}" 
          alt="Shakia Óptica" 
          class="slide-img w-full h-full object-cover object-[center_30%] select-none pointer-events-none origin-center" 
          loading="lazy"
        />
      </div>
    </div>

    <!-- Very Subtle Localized Bottom Scrim (Only for minimal text readability) -->
    <div class="absolute bottom-0 left-0 w-full h-64 sm:h-72 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none z-10"></div>

    <!-- Slides Text Stack in Safe Zone -->
    <div class="slides-text-container absolute z-20 bottom-24 sm:bottom-28 md:bottom-32 left-6 sm:left-10 md:left-16 pointer-events-none w-full max-w-xl h-44">
      
      <!-- Slide 01 Text (Video) -->
      <div class="slide-text-item absolute bottom-0 left-0 w-full pointer-events-auto" data-text-slide="0">
        <h1 class="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[0.96] mb-2 sm:mb-3">
          Shakia Óptica
        </h1>
        <p class="font-sans text-sm sm:text-base font-light text-white/85 mb-5 sm:mb-6">
          Saúde no seu olhar.
        </p>
        <div class="inline-block">
          <a href="#catalogo" class="editorial-cta" aria-label="Ver catálogo">
            Ver catálogo
          </a>
        </div>
      </div>

      <!-- Slide 02 Text (IMG-1) -->
      <div class="slide-text-item absolute bottom-0 left-0 w-full pointer-events-auto" data-text-slide="1">
        <h2 class="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white leading-tight">
          Óculos para cada momento.
        </h2>
      </div>

      <!-- Slide 03 Text (IMG-2) -->
      <div class="slide-text-item absolute bottom-0 left-0 w-full pointer-events-auto" data-text-slide="2">
        <h2 class="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white leading-tight">
          Encontre o seu estilo.
        </h2>
      </div>

    </div>
  `;

  // Grab elements for slider
  const videoElement = heroSection.querySelector<HTMLVideoElement>('#hero-video');
  const mediaElements = Array.from(heroSection.querySelectorAll<HTMLElement>('.slide-media-item'));
  const textElements = Array.from(heroSection.querySelectorAll<HTMLElement>('.slide-text-item'));

  // Create Timeline
  let sliderController: HeroSliderController;

  const timelineController = createTimeline({
    onSelectSlide: (index: number) => {
      if (sliderController) {
        sliderController.goToSlide(index);
      }
    },
  });

  heroSection.appendChild(timelineController.element);

  const slidesData: SlideData[] = [
    {
      id: 0,
      type: 'video',
      mediaElement: mediaElements[0],
      textElement: textElements[0],
    },
    {
      id: 1,
      type: 'image',
      mediaElement: mediaElements[1],
      imgElement: mediaElements[1].querySelector<HTMLImageElement>('.slide-img') || undefined,
      textElement: textElements[1],
      duration: 6.5,
    },
    {
      id: 2,
      type: 'image',
      mediaElement: mediaElements[2],
      imgElement: mediaElements[2].querySelector<HTMLImageElement>('.slide-img') || undefined,
      textElement: textElements[2],
      duration: 6.5,
    },
  ];

  sliderController = initHeroSlider(slidesData, timelineController, videoElement);

  return {
    element: heroSection,
    sliderController,
    timelineController,
  };
}
