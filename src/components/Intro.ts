import img3Src from '../assets/imgs/img-3.jpg';
import img4Src from '../assets/imgs/img-4.jpg';

function splitIntoChars(text: string): string {
  return text
    .split(' ')
    .map(
      (word) =>
        `<span class="inline-block whitespace-nowrap">${Array.from(word)
          .map(
            (char) =>
              `<span class="intro-char inline-block will-change-transform origin-bottom">${char}</span>`
          )
          .join('')}</span>`
    )
    .join('<span class="inline-block">&nbsp;</span>');
}

function splitIntoWords(text: string): string {
  return text
    .split(' ')
    .map(
      (word) =>
        `<span class="intro-word inline-block will-change-transform mr-[0.27em]">${word}</span>`
    )
    .join('');
}

export function createIntro(): { element: HTMLElement } {
  const introSection = document.createElement('section');
  introSection.id = 'intro';
  introSection.className = 'relative w-full bg-[#fafafa] text-[#18181b]';

  const headerTitle = 'A essência do olhar.';
  const b1Title = 'Curadoria de autor.';
  const b1Para = 'Cada modelo é escolhido pelo seu equilíbrio entre matéria, proporção e leveza, concebido para acompanhar o quotidiano com naturalidade e distinção.';
  const headerPara = 'Óptica contemporânea com curadoria dedicada à harmonia entre o rosto e a armação.';
  const b2Title = 'Precisão em cada detalhe.';
  const b2Para = 'Ajustes milimétricos e consultoria individualizada para assegurar que cada peça reflete a sua identidade com conforto absoluto.';

  introSection.innerHTML = `
    <!-- 1. Cabeçalho da Secção -->
    <div class="intro-header w-full pt-40 sm:pt-52 md:pt-64 pb-28 sm:pb-40 md:pb-52 px-6 sm:px-10 text-center">
      <div class="max-w-2xl mx-auto">
        <h2
          class="intro-title-chars font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#18181b] leading-[1.05] tracking-tight mb-6 sm:mb-8"
          aria-label="${headerTitle}"
        >${splitIntoChars(headerTitle)}</h2>
        <p
          class="intro-para-words font-sans text-sm sm:text-base md:text-lg font-light text-[#52525b] max-w-md sm:max-w-lg mx-auto leading-relaxed"
          aria-label="${headerPara}"
        >${splitIntoWords(headerPara)}</p>
      </div>
    </div>

    <!-- 2. Primeiro Bloco: img-3 à Esquerda + Texto à Direita -->
    <div class="intro-block-1 w-full max-w-[1700px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 mb-40 sm:mb-56 md:mb-72">
      <div class="flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16 md:gap-16 lg:gap-24">

        <!-- Imagem -->
        <div class="intro-b1-media w-full md:w-7/12 lg:w-3/5 overflow-hidden bg-[#f0f0f2]">
          <div class="w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] overflow-hidden">
            <img
              src="${img3Src}"
              alt="Shakia Óptica — Curadoria de Autor"
              class="intro-b1-img w-full h-full object-cover object-[center_35%] select-none pointer-events-none will-change-transform"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Texto -->
        <div class="intro-b1-text w-full md:w-5/12 lg:w-2/5 md:pl-8 lg:pl-16 flex flex-col justify-center">
          <div class="max-w-sm sm:max-w-md">
            <h3
              class="intro-title-chars font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#18181b] leading-tight mb-5 sm:mb-7"
              aria-label="${b1Title}"
            >${splitIntoChars(b1Title)}</h3>
            <p
              class="intro-para-words font-sans text-sm sm:text-base font-light text-[#52525b] leading-relaxed"
              aria-label="${b1Para}"
            >${splitIntoWords(b1Para)}</p>
          </div>
        </div>

      </div>
    </div>

    <!-- 3. Segundo Bloco: Texto à Esquerda + img-4 à Direita -->
    <div class="intro-block-2 w-full max-w-[1700px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 pb-44 sm:pb-60 md:pb-80">
      <div class="flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16 md:gap-16 lg:gap-24">

        <!-- Texto (desktop: left; mobile: after image) -->
        <div class="intro-b2-text order-2 md:order-1 w-full md:w-5/12 lg:w-2/5 md:pr-8 lg:pr-16 flex flex-col justify-center">
          <div class="max-w-sm sm:max-w-md">
            <h3
              class="intro-title-chars font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#18181b] leading-tight mb-5 sm:mb-7"
              aria-label="${b2Title}"
            >${splitIntoChars(b2Title)}</h3>
            <p
              class="intro-para-words font-sans text-sm sm:text-base font-light text-[#52525b] leading-relaxed"
              aria-label="${b2Para}"
            >${splitIntoWords(b2Para)}</p>
          </div>
        </div>

        <!-- Imagem (desktop: right; mobile: first) -->
        <div class="intro-b2-media order-1 md:order-2 w-full md:w-7/12 lg:w-3/5 overflow-hidden bg-[#f0f0f2]">
          <div class="w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] overflow-hidden">
            <img
              src="${img4Src}"
              alt="Shakia Óptica — Precisão e Detalhe"
              class="intro-b2-img w-full h-full object-cover object-[center_35%] select-none pointer-events-none will-change-transform"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  `;

  return {
    element: introSection,
  };
}
