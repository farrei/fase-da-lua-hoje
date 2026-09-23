# 🌙 Fase da Lua Hoje

Aplicativo web moderno e responsivo para acompanhar a **fase atual da Lua** em tempo real.

![PWA](https://img.shields.io/badge/PWA-Ready-43ff64?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Funcionalidades

- **Fase lunar em tempo real** com cálculo local (sem API externa)
- **Lua animada em SVG** desenhada dinamicamente conforme a fase
- **Percentual de iluminação**, idade da Lua, signo lunar e distância aproximada
- **Horários de nascer e pôr** da Lua (aproximados para fuso de Brasília)
- **Linha do tempo interativa** — navegue até ±60 dias
- **Próximas fases** principais (Nova, Quarto Crescente, Cheia, Quarto Minguante)
- **PWA completo** — instale no Android e iPhone, funciona offline
- Design **mobile-first** inspirado em painéis de observatório espacial
- Tema escuro com **verde neon** (#43ff64) e fundo preto profundo

---

## 🛠️ Stack

| Tecnologia       | Uso                          |
|------------------|------------------------------|
| React 18         | Interface                    |
| Vite 5           | Build e dev server           |
| Tailwind CSS 3   | Estilização                  |
| vite-plugin-pwa  | Progressive Web App          |
| gh-pages         | Deploy no GitHub Pages       |

---

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/farrei/fase-da-lua-hoje.git
cd fase-da-lua-hoje

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra `http://localhost:5173/fase-da-lua-hoje/` no navegador.

---

## 📦 Build e Deploy

### Build de produção

```bash
npm run build
```

Os arquivos ficam em `dist/`.

### Deploy manual no GitHub Pages

```bash
npm run deploy
```

> Requer que o repositório esteja configurado com GitHub Pages na branch `gh-pages`.

### Deploy automático (GitHub Actions)

1. Faça push na branch `main`
2. Vá em **Settings → Pages**
3. Em **Source**, selecione **GitHub Actions**
4. O workflow `.github/workflows/deploy.yml` fará o build e deploy automaticamente

**URL final:**  
`https://farrei.github.io/fase-da-lua-hoje/`

---

## 📁 Estrutura do projeto

```
fase-da-lua-hoje/
├── .github/workflows/deploy.yml   # CI/CD GitHub Pages
├── public/
│   ├── favicon.svg
│   └── icons/
│       ├── icon-192.svg
│       └── icon-512.svg
├── src/
│   ├── components/
│   │   ├── MoonSVG.jsx            # Lua SVG dinâmica
│   │   ├── Timeline.jsx           # Slider de datas
│   │   └── NextPhases.jsx         # Lista de próximas fases
│   ├── utils/
│   │   └── moonCalculations.js    # Cálculos astronômicos
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js                 # base: /fase-da-lua-hoje/
├── tailwind.config.js
├── postcss.config.js
├── LICENSE
└── README.md
```

---

## 🎨 Design

- Fundo: `#050505`
- Verde neon: `#43ff64`
- Cartões escuros com bordas sutis
- Tipografia: Inter + Orbitron
- Animações suaves de fade, float e glow
- Layout idêntico a aplicativos Android modernos

---

## 📱 Instalar como App

### Android (Chrome)
1. Abra o site
2. Menu → **Instalar app** ou **Adicionar à tela inicial**

### iPhone (Safari)
1. Abra o site
2. Botão Compartilhar → **Adicionar à Tela de Início**

O app funciona **offline** após a primeira visita.

---

## 🧮 Sobre os cálculos

Os dados lunares são calculados **localmente** no navegador:

- Ciclo sinódico médio: **29,530588853 dias**
- Fase, iluminação e idade derivadas da idade da Lua
- Signo lunar por longitude eclíptica aproximada
- Distância com variação elíptica simplificada
- Nascer/pôr da Lua: aproximação para lat/lon de Brasília

> Valores de nascer/pôr e distância são **aproximados**. Para uso científico, consulte efemérides oficiais (NASA/JPL).

---

## 📄 Licença

MIT © 2026 — veja o arquivo [LICENSE](LICENSE).

---

Feito com 🌑 para observadores da noite.
