$readmeContent = @"
# ⚓ Adriatica D.O.O. - Marine Engineering & Consultancy

This repository contains the web application and technical documentation framework for Adriatica D.O.O., focusing on maritime compliance and engineering solutions in the Adriatic and EU regions.

Built with **React**, **TypeScript**, **Vite** and **Tailwind CSS**.  
The site features a clean, professional design, smooth hash‑based navigation, and full mobile responsiveness.

---

## ✨ Key Feature

- ⚡ **Fast & modern** – React + Vite + TypeScript stack.
- 📱 **Fully responsive** – Optimised for mobile, tablet and desktop.
- 🧭 **Smart navigation** – Custom `HashLink` component for smooth scrolling and cross‑page anchors.
- 🔍 **SEO ready** – `react-helmet-async` for per‑page meta tags; `sitemap.xml` and `robots.txt` included.
- 📄 **Technical insights** – Downloadable PDF articles (biofouling, compliance, etc.) stored in `public/pdfs/`.
- 🎨 **Consistent branding** – Tailored colour palette (`#0B3B5C`, `#3A74A0`), custom fonts, and SVG logo.
- 📬 **Contact form** – Prepared for Netlify Forms or external service integration.
- 🚀 **Easy deployment** – One‑click deploy on Netlify (or any static host).

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Routing:** Wouter (lightweight, hook‑based)
- **Styling:** Tailwind CSS + custom CSS variables
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **SEO:** React Helmet Async
- **Build tool:** Vite
- **Package manager:** npm

---

## 📁 Project Structure (simplified)

```
adriatica/
├── client/                 # Frontend source
│   ├── public/             # Static assets (favicon, logo)
│   └── src/
│       ├── components/     # Reusable UI components
│       │   ├── Navigation.tsx
│       │   ├── Footer.tsx
│       │   ├── HashLink.tsx
│       │   ├── FeatureCard.tsx
│       │   └── ...
│       ├── pages/          # Page components
│       │   ├── Home.tsx
│       │   ├── Insights.tsx
│       │   ├── Careers.tsx
│       │   ├── News.tsx
│       │   └── legal/*.tsx
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utilities & config
│       └── App.tsx         # Main router
├── public/                 # Public root (pdfs, sitemap, robots)
│   └── pdfs/               # Technical insight PDFs
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```
## 🚀 Quick Start

1. Clone the repository:
   git clone https://github.com/nuricicek-spec/adriatica.git
   cd adriatica

2. Install dependencies:
   npm install

3. Start development server:
   npm run dev

4. Access the site:
   Then open http://localhost:5173 in your browser.

## 🌐 Deployment

### Netlify (recommended)

1. Push the code to your GitHub repository.
2. Log in to Netlify (https://netlify.com).
3. Click "Add new site" -> "Import an existing project".
4. Select your GitHub repository.
5. Build settings:
   - Build command: npm run build
   - Publish directory: dist
6. Click "Deploy site".

Your site will be live in seconds.

## 📄 License

Free to use and modify for personal or commercial projects. No warranty provided.

## 🛠️ Technical Focus
- EU MRV / IMO DCS Compliance
- Biofouling Management Plans
- Maritime Technical Consultancy
- Adriatic Coastal Compliance