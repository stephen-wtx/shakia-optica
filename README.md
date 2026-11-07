# Shakia Óptica, Lda.

Website institucional e catálogo digital da Shakia Óptica, desenvolvido com uma abordagem editorial, minimalista e responsiva.

## Stack Tecnológica

- **Vite** — Build tool e bundler de alta performance
- **TypeScript** — Tipagem estática e segurança de código
- **HTML5 & CSS3** — Estrutura semântica e estilização moderna
- **Tailwind CSS** — Utilitários de design e responsividade
- **GSAP (GreenSock)** — Core de animações e sequenciamento timeline
- **GSAP ScrollTrigger** — Gatilhos de animação sincronizados com o viewport
- **Lenis** — Rolagem suave (smooth scroll) de precisão

## Estrutura do Projecto

```text
src/
├── assets/          # Imagens, tipografias e vídeos cinematográficos
│   ├── imgs/        # Fotografias editoriais, logotipo e catálogo
│   └── video/       # Vídeos do hero e encerramento
├── animations/      # Controladores GSAP (hero, intro, catálogo, contacto, menu, scroll)
├── components/      # Componentes modulares (Hero, Intro, Catalog, Contact, EndingVideo, Footer, Navbar)
├── styles/          # Folhas de estilo globais e configuração Tailwind
└── main.ts          # Ponto de entrada da aplicação e orquestração do ciclo de vida
```

## Desenvolvimento Local

Instalar dependências:

```bash
npm install
```

Iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

## Compilação (Build de Produção)

Gerar a versão optimizada para produção:

```bash
npm run build
```

## Pré-visualização do Build

Visualizar localmente a versão gerada em `dist/`:

```bash
npm run preview
```

---

© 2026 Shakia Óptica, Lda. Todos os direitos reservados.
