import logoSrc from '../assets/imgs/logo.png';
import { initMenuAnimation, type MenuAnimationController } from '../animations/menu';

export function createNavbar(): {
  element: HTMLElement;
  menuController: MenuAnimationController;
} {
  const navContainer = document.createElement('header');
  navContainer.className = 'fixed top-0 left-0 w-full z-50 pointer-events-none';

  navContainer.innerHTML = `
    <!-- Minimal Navigation Bar -->
    <nav class="relative z-50 w-full px-6 sm:px-10 md:px-16 py-6 sm:py-8 flex items-center justify-end">
      
      <!-- Centered Logo (Mathematically Centered in Viewport) -->
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <a href="#" aria-label="Shakia Óptica, Lda." class="flex items-center gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#18181B]/50">
          <img 
            src="${logoSrc}" 
            alt="Shakia Óptica, Lda." 
            class="h-8 sm:h-9 md:h-10 w-auto object-contain pointer-events-none select-none" 
          />
          <span class="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.12em] text-[#18181B] font-normal">
            Shakia Óptica, Lda.
          </span>
        </a>
      </div>

      <!-- Right 2-Line Hamburger Button (Escuro: #18181B) -->
      <div class="pointer-events-auto flex items-center justify-center">
        <button 
          id="hamburger-btn" 
          type="button" 
          aria-label="Abrir menu" 
          aria-expanded="false" 
          class="relative w-10 h-10 flex items-center justify-center p-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#18181B]/60 bg-transparent border-0 group"
        >
          <span class="hamburger-line-top block w-6 h-[1.5px] bg-[#18181B] rounded-full absolute left-1/2 -translate-x-1/2 transition-colors duration-300"></span>
          <span class="hamburger-line-bottom block w-6 h-[1.5px] bg-[#18181B] rounded-full absolute left-1/2 -translate-x-1/2 transition-colors duration-300"></span>
        </button>
      </div>
    </nav>

    <!-- Subtle Minimalist Fullscreen Glass Menu -->
    <div 
      id="menu-overlay" 
      class="fixed inset-0 z-40 subtle-glass-menu flex items-center justify-center pointer-events-none opacity-0 invisible"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <!-- Menu Links (Pure, Minimal, Generous Space) -->
      <nav class="flex flex-col items-center space-y-10 sm:space-y-12 text-center pointer-events-auto" aria-label="Navegação principal">
        <div class="menu-item-wrapper">
          <a 
            href="#catalogo" 
            class="menu-link font-serif text-5xl sm:text-6xl md:text-7xl font-light text-white/90 hover:text-white no-underline transition-colors duration-300"
          >
            Catálogo
          </a>
        </div>

        <div class="menu-item-wrapper">
          <a 
            href="#contacto" 
            class="menu-link font-serif text-5xl sm:text-6xl md:text-7xl font-light text-white/90 hover:text-white no-underline transition-colors duration-300"
          >
            Contacto
          </a>
        </div>
      </nav>
    </div>
  `;

  // Grab elements
  const hamburgerBtn = navContainer.querySelector<HTMLButtonElement>('#hamburger-btn')!;
  const lineTop = navContainer.querySelector<HTMLElement>('.hamburger-line-top')!;
  const lineBottom = navContainer.querySelector<HTMLElement>('.hamburger-line-bottom')!;
  const menuOverlay = navContainer.querySelector<HTMLElement>('#menu-overlay')!;
  const links = Array.from(navContainer.querySelectorAll<HTMLElement>('.menu-item-wrapper'));

  const menuController = initMenuAnimation(
    menuOverlay,
    links,
    hamburgerBtn,
    lineTop,
    lineBottom
  );

  // Bind clicks
  hamburgerBtn.addEventListener('click', () => {
    menuController.toggle();
  });

  menuOverlay.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).tagName !== 'A') {
      menuController.close();
    }
  });

  navContainer.querySelectorAll('.menu-link').forEach((link) => {
    link.addEventListener('click', () => {
      menuController.close();
    });
  });

  return {
    element: navContainer,
    menuController,
  };
}
