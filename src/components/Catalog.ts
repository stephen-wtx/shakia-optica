import oc1 from '../assets/imgs/catalog/oc-1.jpg';
import oc2 from '../assets/imgs/catalog/oc-2.jpg';
import oc3 from '../assets/imgs/catalog/oc-3.jpg';
import oc4 from '../assets/imgs/catalog/oc-4.jpg';
import oc5 from '../assets/imgs/catalog/oc-5.jpg';
import oc6 from '../assets/imgs/catalog/oc-6.jpg';

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const catalogProducts: ProductItem[] = [
  {
    id: 'oc-1',
    name: 'Aura Noir',
    price: 450,
    image: oc1,
  },
  {
    id: 'oc-2',
    name: 'Linha Óptica I',
    price: 550,
    image: oc2,
  },
  {
    id: 'oc-3',
    name: 'Vértice Minimal',
    price: 650,
    image: oc3,
  },
  {
    id: 'oc-4',
    name: 'Silhueta Havana',
    price: 750,
    image: oc4,
  },
  {
    id: 'oc-5',
    name: 'Espectro Prata',
    price: 850,
    image: oc5,
  },
  {
    id: 'oc-6',
    name: 'Ébano Singular',
    price: 950,
    image: oc6,
  },
];

const WHATSAPP_PHONE = '258846300215';

function getWhatsAppOrderUrl(productName: string): string {
  const message = `Olá, gostaria de encomendar o modelo ${productName}.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createCatalog(): { element: HTMLElement } {
  const section = document.createElement('section');
  section.id = 'catalogo';
  section.className = 'relative w-full bg-[#fafafa] text-[#18181b]';

  section.innerHTML = `
    <!-- Cabeçalho do Catálogo -->
    <div class="catalog-header w-full pt-32 sm:pt-44 md:pt-56 pb-20 sm:pb-28 md:pb-36 px-6 sm:px-10 text-center">
      <div class="max-w-xl mx-auto">
        <h2 class="catalog-header-title font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#18181b] leading-[1.05] tracking-tight mb-4 sm:mb-6">
          Catálogo
        </h2>
        <p class="catalog-header-subtitle font-sans text-sm sm:text-base font-light text-[#52525b] max-w-sm mx-auto leading-relaxed">
          Selecção de armações
        </p>
      </div>
    </div>

    <!-- Galeria Editorial de Produtos (3 col desktop, 2 col tablet, 1 col mobile) -->
    <div class="w-full max-w-[1700px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-44 sm:pb-56 md:pb-72">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-20 sm:gap-y-24 lg:gap-y-32">
        ${catalogProducts
          .map(
            (product) => `
          <article class="catalog-product-item flex flex-col items-center text-center group" data-product-id="${product.id}">
            
            <!-- Área da Imagem com Efeito Óptico / Glass Reflection e Micro-interacção -->
            <div class="product-media-container relative w-full aspect-square bg-[#f0f0f2] overflow-hidden flex items-center justify-center p-6 sm:p-8 cursor-pointer">
              <!-- Reflexo Óptico de Lente -->
              <div class="lens-reflection-sheen" aria-hidden="true"></div>

              <!-- Imagem da Armação -->
              <img 
                src="${product.image}" 
                alt="Armação Shakia Óptica — ${product.name}" 
                class="product-media-img w-full h-full object-contain pointer-events-none select-none"
                loading="lazy"
              />
            </div>

            <!-- Informações do Produto (Hierarquia Visual: Nome -> Preço -> Encomendar) -->
            <div class="w-full mt-7 flex flex-col items-center">
              <!-- Nome do Produto -->
              <h3 class="product-name font-serif text-2xl sm:text-3xl font-light text-[#18181b] tracking-normal mb-2 leading-snug">
                ${product.name}
              </h3>

              <!-- Preço Claro -->
              <p class="product-price font-sans text-sm sm:text-base font-medium text-[#52525b] tracking-wider mb-6">
                ${product.price} MZN
              </p>

              <!-- Botão Encomendar (Transparente, borda fina preta, redireciona para WhatsApp com modelo) -->
              <a 
                href="${getWhatsAppOrderUrl(product.name)}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="catalog-order-btn"
                aria-label="Encomendar o modelo ${product.name} via WhatsApp"
              >
                Encomendar
              </a>
            </div>

          </article>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  return {
    element: section,
  };
}

