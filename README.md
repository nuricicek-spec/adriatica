
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
client/
├── public/
│   ├── images/
│   │   ├── deliverables/        (15 adet SVG)
│   │   ├── insights/            (2 dosya)
│   │   └── services/            (6 adet SVG)
│   ├── js/
│   │   └── pdf.worker.min.js
│   ├── logos/                   (5 adet logo)
│   ├── pdfs/
│   │   ├── deliverables/        (3 PDF)
│   │   └── insights/            (4 PDF)
│   ├── favicon.svg
│   ├── logo.svg
│   ├── map.svg
│   ├── og-image-default.png
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── _headers
│   └── _redirects
├── src/
│   ├── components/
│   │   ├── assistant/
│   │   │   ├── AssistantActions.tsx
│   │   │   ├── AssistantBar.tsx
│   │   │   ├── AssistantHeader.tsx
│   │   │   ├── AssistantInput.tsx
│   │   │   ├── AssistantMessageItem.tsx
│   │   │   ├── AssistantMessages.tsx
│   │   │   ├── AssistantPanel.tsx
│   │   │   └── AssistantProvider.tsx
│   │   ├── ui/                  (53 adet shadcn/ui bileşeni)
│   │   ├── CookieConsent.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── Footer.tsx
│   │   ├── HashLink.tsx
│   │   ├── InsightCard.tsx
│   │   ├── Navigation.tsx
│   │   ├── PDFViewer.tsx
│   │   ├── ProcessWheel.tsx
│   │   ├── RelatedContent.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── SectionHeading.tsx
│   │   └── SEO.tsx
│   ├── config/
│   │   └── trustMetrics.ts
│   ├── data/
│   │   ├── insights/
│   │   │   ├── biofouling-compliance.ts
│   │   │   ├── index.ts
│   │   │   ├── sustainable-cleaning.ts
│   │   │   ├── technical-operations.ts
│   │   │   └── zero-emission-zone.ts
│   │   ├── caseStudies.ts
│   │   ├── deliverables.ts
│   │   ├── recommended.ts
│   │   └── services.ts
│   ├── hooks/
│   │   ├── useAssistant.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollCompact.ts
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   ├── lib/
│   │   ├── assistantClient.ts
│   │   ├── assistantConfig.ts
│   │   ├── assistantTypes.ts
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── mocks/
│   │   └── assistantMock.ts
│   ├── pages/
│   │   ├── services/
│   │   │   ├── EngineeringDocs.tsx
│   │   │   ├── EngineeringPlans.tsx
│   │   │   ├── ProjectManagement.tsx
│   │   │   ├── RegulatoryCompliance.tsx
│   │   │   ├── StructuralIntegrity.tsx
│   │   │   ├── SustainableTech.tsx
│   │   │   └── YachtSurvey.tsx
│   │   ├── About.tsx
│   │   ├── Careers.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── CaseStudyDetail.tsx
│   │   ├── CookiePolicy.tsx
│   │   ├── Deliverables.tsx
│   │   ├── Home.tsx
│   │   ├── InsightDetail.tsx
│   │   ├── Insights.tsx
│   │   ├── News.tsx
│   │   ├── not-found.tsx
│   │   ├── Philosophy.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── RequestConsultation.tsx
│   │   ├── Services.tsx
│   │   └── TermsOfService.tsx
│   ├── style/
│   │   └── (belirtilmemiş, ancak mevcut olabilir)
│   ├── types/
│   │   └── global.d.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
└── (diğer kök dosyalar: package.json, vite.config.ts, tailwind.config.ts, README.md)

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
- Marine Engineering
- Marine Consultancy
- IMO Regulatory Compliance