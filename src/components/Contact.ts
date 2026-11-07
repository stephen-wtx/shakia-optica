import { Icons } from './Icons';

function splitIntoContactChars(text: string): string {
  return text
    .split(' ')
    .map(
      (word) =>
        `<span class="inline-block whitespace-nowrap">${Array.from(word)
          .map(
            (char) =>
              `<span class="contact-char inline-block will-change-transform origin-bottom">${char}</span>`
          )
          .join('')}</span>`
    )
    .join('<span class="inline-block">&nbsp;</span>');
}

function splitIntoContactWords(text: string): string {
  return text
    .split(' ')
    .map(
      (word) =>
        `<span class="contact-word inline-block will-change-transform mr-[0.27em]">${word}</span>`
    )
    .join('');
}

export function createContact(): { element: HTMLElement } {
  const contactSection = document.createElement('section');
  contactSection.id = 'contacto';
  contactSection.className = 'relative w-full bg-[#fafafa] text-[#18181b] py-28 sm:py-36 md:py-44 px-6 sm:px-10 lg:px-16 border-t border-[#e4e4e7]';

  const titleText = 'Contacto';
  const subtitleText = 'Visite-nos ou fale connosco.';

  contactSection.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <!-- Cabeçalho da Secção -->
      <div class="contact-header text-center mb-20 sm:mb-28">
        <h2
          class="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#18181b] leading-[1.05] tracking-tight mb-4 sm:mb-6"
          aria-label="${titleText}"
        >${splitIntoContactChars(titleText)}</h2>
        <p
          class="font-sans text-sm sm:text-base md:text-lg font-light text-[#52525b] max-w-md mx-auto leading-relaxed"
          aria-label="${subtitleText}"
        >${splitIntoContactWords(subtitleText)}</p>
      </div>

      <!-- Corpo de Conteúdo: Lojas & Canais -->
      <div class="contact-content-body grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        <!-- Coluna 1: As Nossas Lojas (7 colunas) -->
        <div class="lg:col-span-7 space-y-10 sm:space-y-12">
          <div class="border-b border-[#e4e4e7] pb-4">
            <span class="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#71717a] font-medium">As Nossas Lojas</span>
          </div>

          <div class="space-y-8 sm:space-y-10">
            <!-- Loja 1 -->
            <article class="contact-store-item flex items-start gap-4 sm:gap-5 group">
              <div class="text-[#18181b] opacity-80 pt-1 shrink-0 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
                ${Icons.location}
              </div>
              <div class="space-y-1">
                <span class="inline-block text-[11px] uppercase tracking-wider text-[#71717a] font-normal">Maputo · Albasine</span>
                <h3 class="font-serif text-xl sm:text-2xl text-[#18181b] font-normal">Av. Dom Alexandre</h3>
                <p class="font-sans text-xs sm:text-sm text-[#52525b] font-light leading-relaxed">
                  Em frente aos Prédios Militares, Albasine.
                </p>
              </div>
            </article>

            <!-- Loja 2 -->
            <article class="contact-store-item flex items-start gap-4 sm:gap-5 group">
              <div class="text-[#18181b] opacity-80 pt-1 shrink-0 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
                ${Icons.location}
              </div>
              <div class="space-y-1">
                <span class="inline-block text-[11px] uppercase tracking-wider text-[#71717a] font-normal">Cidade de Maputo</span>
                <h3 class="font-serif text-xl sm:text-2xl text-[#18181b] font-normal">Av. Angola</h3>
                <p class="font-sans text-xs sm:text-sm text-[#52525b] font-light leading-relaxed">
                  Em frente ao Cinema Império, cidade de Maputo.
                </p>
              </div>
            </article>

            <!-- Loja 3 -->
            <article class="contact-store-item flex items-start gap-4 sm:gap-5 group">
              <div class="text-[#18181b] opacity-80 pt-1 shrink-0 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
                ${Icons.location}
              </div>
              <div class="space-y-1">
                <span class="inline-block text-[11px] uppercase tracking-wider text-[#71717a] font-normal">Cidade de Tete</span>
                <h3 class="font-serif text-xl sm:text-2xl text-[#18181b] font-normal">Av. da Liberdade</h3>
                <p class="font-sans text-xs sm:text-sm text-[#52525b] font-light leading-relaxed">
                  Em frente ao Pavilhão do Conselho Municipal, cidade de Tete.
                </p>
              </div>
            </article>
          </div>
        </div>

        <!-- Coluna 2: Canais Diretos & Redes Sociais (5 colunas) -->
        <div class="lg:col-span-5 space-y-10 sm:space-y-12">
          <!-- Canais Diretos -->
          <div>
            <div class="border-b border-[#e4e4e7] pb-4 mb-6">
              <span class="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#71717a] font-medium">Fale Connosco</span>
            </div>

            <div class="space-y-4">
              <!-- Telefone -->
              <a
                href="tel:870360036"
                class="contact-channel-item flex items-center justify-between p-4 rounded-lg bg-white/70 hover:bg-white border border-[#e4e4e7]/70 hover:border-[#18181b]/30 transition-all duration-300 group"
              >
                <div class="flex items-center gap-3.5">
                  <span class="text-[#18181b] opacity-75 group-hover:opacity-100 transition-opacity select-none">${Icons.phone}</span>
                  <div>
                    <span class="block text-[11px] uppercase tracking-wider text-[#71717a]">Telefone</span>
                    <span class="font-sans text-sm sm:text-base text-[#18181b] font-medium">87 036 0036</span>
                  </div>
                </div>
                <span class="text-xs text-[#71717a] group-hover:text-[#18181b] transition-colors">Ligar</span>
              </a>

              <!-- WhatsApp -->
              <a
                href="https://wa.me/258846300215?text=Ol%C3%A1%2C%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20Shakia%20%C3%93ptica."
                target="_blank"
                rel="noopener noreferrer"
                class="contact-channel-item flex items-center justify-between p-4 rounded-lg bg-white/70 hover:bg-white border border-[#e4e4e7]/70 hover:border-[#18181b]/30 transition-all duration-300 group"
              >
                <div class="flex items-center gap-3.5">
                  <span class="text-[#18181b] opacity-75 group-hover:opacity-100 transition-opacity select-none">${Icons.whatsapp}</span>
                  <div>
                    <span class="block text-[11px] uppercase tracking-wider text-[#71717a]">WhatsApp</span>
                    <span class="font-sans text-sm sm:text-base text-[#18181b] font-medium">+258 84 630 0215</span>
                  </div>
                </div>
                <span class="text-xs text-[#71717a] group-hover:text-[#18181b] transition-colors">Conversar</span>
              </a>

              <!-- Email -->
              <a
                href="mailto:shakiaoptica@gmail.com"
                class="contact-channel-item flex items-center justify-between p-4 rounded-lg bg-white/70 hover:bg-white border border-[#e4e4e7]/70 hover:border-[#18181b]/30 transition-all duration-300 group"
              >
                <div class="flex items-center gap-3.5">
                  <span class="text-[#18181b] opacity-75 group-hover:opacity-100 transition-opacity select-none">${Icons.mail}</span>
                  <div>
                    <span class="block text-[11px] uppercase tracking-wider text-[#71717a]">Email</span>
                    <span class="font-sans text-sm sm:text-base text-[#18181b] font-medium">shakiaoptica@gmail.com</span>
                  </div>
                </div>
                <span class="text-xs text-[#71717a] group-hover:text-[#18181b] transition-colors">Escrever</span>
              </a>
            </div>
          </div>

          <!-- Redes Sociais com Font Awesome -->
          <div>
            <div class="border-b border-[#e4e4e7] pb-4 mb-6">
              <span class="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#71717a] font-medium">Redes Sociais</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <!-- Instagram -->
              <a
                href="https://www.instagram.com/shakia_optica_Ida/"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-social-item fa-instagram-link flex items-center gap-3.5 p-3.5 rounded-lg bg-white/70 hover:bg-white border border-[#e4e4e7]/70 hover:border-[#18181b]/30 transition-all duration-300 group"
              >
                <i class="fa-brands fa-instagram fa-instagram-icon text-lg select-none"></i>
                <div class="min-w-0">
                  <span class="block text-[10px] uppercase tracking-wider text-[#71717a]">Instagram</span>
                  <span class="font-sans text-xs sm:text-sm text-[#18181b] font-medium truncate block">@shakia_optica_Ida</span>
                </div>
              </a>

              <!-- Facebook -->
              <a
                href="https://www.facebook.com/search/top?q=Shakia%20%C3%93ptica"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-social-item fa-facebook-link flex items-center gap-3.5 p-3.5 rounded-lg bg-white/70 hover:bg-white border border-[#e4e4e7]/70 hover:border-[#18181b]/30 transition-all duration-300 group"
              >
                <i class="fa-brands fa-facebook-f fa-facebook-icon text-base select-none"></i>
                <div class="min-w-0">
                  <span class="block text-[10px] uppercase tracking-wider text-[#71717a]">Facebook</span>
                  <span class="font-sans text-xs sm:text-sm text-[#18181b] font-medium truncate block">Shakia Óptica</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return { element: contactSection };
}
