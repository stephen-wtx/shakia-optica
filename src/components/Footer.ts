import { Icons } from './Icons';

export function createFooter(): { element: HTMLElement } {
  const footer = document.createElement('footer');
  footer.className = 'w-full bg-[#fafafa] text-[#18181b] border-t border-[#e4e4e7]';

  footer.innerHTML = `
    <div class="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-14 border-b border-[#e4e4e7]">
        <!-- Brand & Locations -->
        <div class="md:col-span-5 space-y-4">
          <span class="font-serif text-2xl sm:text-3xl text-[#18181b] tracking-tight block">
            Shakia Óptica, Lda.
          </span>
          <p class="font-sans text-xs uppercase tracking-[0.22em] text-[#71717a]">
            Maputo · Tete · Moçambique
          </p>
          <p class="font-sans text-xs sm:text-sm text-[#52525b] font-light max-w-sm leading-relaxed pt-2">
            Curadoria óptica contemporânea dedicada à harmonia, precisão e bem-estar visual.
          </p>
        </div>

        <!-- Links Rápidos -->
        <div class="md:col-span-3 space-y-4">
          <span class="text-[11px] uppercase tracking-[0.2em] text-[#71717a] font-medium block">
            Navegação
          </span>
          <ul class="space-y-2.5 font-sans text-sm">
            <li>
              <a href="#catalogo" class="text-[#52525b] hover:text-[#18181b] transition-colors">
                Catálogo
              </a>
            </li>
            <li>
              <a href="#contacto" class="text-[#52525b] hover:text-[#18181b] transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <!-- Contactos & Redes -->
        <div class="md:col-span-4 space-y-4">
          <span class="text-[11px] uppercase tracking-[0.2em] text-[#71717a] font-medium block">
            Atendimento
          </span>
          <ul class="space-y-3 font-sans text-xs sm:text-sm text-[#52525b]">
            <li>
              <a href="tel:870360036" class="inline-flex items-center gap-2.5 hover:text-[#18181b] transition-colors">
                <span class="opacity-75 select-none">${Icons.phone}</span>
                <span>87 036 0036</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/258846300215?text=Ol%C3%A1%2C%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20Shakia%20%C3%93ptica."
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2.5 hover:text-[#18181b] transition-colors"
              >
                <span class="opacity-75 select-none">${Icons.whatsapp}</span>
                <span>+258 84 630 0215</span>
              </a>
            </li>
            <li>
              <a href="mailto:shakiaoptica@gmail.com" class="inline-flex items-center gap-2.5 hover:text-[#18181b] transition-colors">
                <span class="opacity-75 select-none">${Icons.mail}</span>
                <span>shakiaoptica@gmail.com</span>
              </a>
            </li>
          </ul>

          <!-- Redes Sociais com Font Awesome -->
          <div class="pt-3 flex items-center gap-5">
            <a
              href="https://www.instagram.com/shakia_optica_Ida/"
              target="_blank"
              rel="noopener noreferrer"
              class="fa-instagram-link inline-flex items-center gap-2 text-xs text-[#52525b] hover:text-[#18181b] transition-colors"
              aria-label="Instagram"
            >
              <i class="fa-brands fa-instagram fa-instagram-icon text-base select-none"></i>
              <span>@shakia_optica_Ida</span>
            </a>
            <a
              href="https://www.facebook.com/search/top?q=Shakia%20%C3%93ptica"
              target="_blank"
              rel="noopener noreferrer"
              class="fa-facebook-link inline-flex items-center gap-2 text-xs text-[#52525b] hover:text-[#18181b] transition-colors"
              aria-label="Facebook"
            >
              <i class="fa-brands fa-facebook-f fa-facebook-icon text-sm select-none"></i>
              <span>Shakia Óptica</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#71717a] font-light">
        <p>© 2026 Shakia Óptica, Lda. Todos os direitos reservados.</p>
        <p class="tracking-wider uppercase text-[10px] text-[#a1a1aa]">Maputo · Tete</p>
      </div>
    </div>
  `;

  return { element: footer };
}
