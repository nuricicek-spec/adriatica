# Adriatica Project Guide for AI Agents

**Project**: Adriatica D.O.O. — Maritime engineering & compliance platform  
**Stack**: React 18 + TypeScript 5.6 + Vite + Tailwind CSS + Wouter (router)  
**Key Feature**: Built-in AI assistant framework (currently mock, ready for Gemini integration)

---

## 🚀 Quick Start

### Development Environment
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build → dist/
```

- **Entry point**: [client/src/main.tsx](client/src/main.tsx)
- **App shell**: [client/src/App.tsx](client/src/App.tsx) (routing + provider setup)
- **Build config**: [vite.config.ts](vite.config.ts) with manual chunk splitting for performance

### Key Paths
```
client/src/
├── components/     # React UI components (Radix UI + Tailwind)
│   └── assistant/  # AI assistant UI components (panel, input, messages)
├── pages/         # Page components (lazy-loaded via React.lazy)
├── hooks/         # Custom hooks (useAssistant, useScrollCompact, etc.)
├── lib/           # Utilities (assistant client, search, analytics)
├── data/          # Static data (services, case studies, calculators)
└── types/         # TypeScript definitions
```

---

## 🤖 AI Provider Integration Guide

The assistant framework is **production-ready for any LLM provider**. No provider code currently exists — clean state. Choose your preferred provider below.

### Current State
- **Config**: [client/src/lib/assistantConfig.ts](client/src/lib/assistantConfig.ts) — `USE_MOCK: true`
- **API client**: [client/src/lib/assistantClient.ts](client/src/lib/assistantClient.ts) — fetches `/api/assistant`
- **Message format**: [client/src/lib/assistantTypes.ts](client/src/lib/assistantTypes.ts) (supports attachments, history)
- **Mock fallback**: [client/src/mocks/assistantMock.ts](client/src/mocks/assistantMock.ts) — keyword-based maritime responses
- **UI**: [client/src/components/assistant/](client/src/components/assistant/) — 7 component system (provider, panel, input, messages)

### Request/Response Shapes (Provider-Agnostic)
**Request** (from client to backend):
```json
{
  "messages": [
    { "role": "user", "content": "What is PSC readiness?" },
    { "role": "assistant", "content": "..." }
  ],
  "attachment": { "name": "doc.pdf", "type": "application/pdf", "size": 12345, "preview": "base64..." }
}
```

**Response** (from backend):
```json
{ "message": "Response text" }
```

---

### 🔵 Gemini Integration

**Setup Steps:**
1. **Prepare backend** — Create `/api/assistant` endpoint that handles the request/response shapes above
   - Use `@google/generative-ai` library or REST API calls
   - System prompt: Maritime engineering domain context (vessel compliance, technical assessments)
   - Handle file attachments via `Files` API for PDF/document analysis
2. **Update config** — [assistantConfig.ts](client/src/lib/assistantConfig.ts): Set `USE_MOCK: false`, optionally update `ENDPOINT`
3. **Test** — Open `/` → bottom-right assistant icon sends to Gemini backend; falls back to mock on failure

**Key Details:**
- Gemini's multimodal strength: Excellent for analyzing vessel documentation, certificates, inspection reports
- Streaming support: Can adapt [assistantClient.ts](client/src/lib/assistantClient.ts) for streaming responses if needed
- File handling: Base64 preview in request; backend handles full file processing

---

### 🟦 Deepseek Integration

**Setup Steps:**
1. **Prepare backend** — Create `/api/assistant` endpoint using Deepseek API
   - Install Deepseek client: `npm install @deepseek-ai/sdk` (or use REST API)
   - System prompt: Maritime engineering domain context
   - Deepseek's strengths: Cost-effective, strong reasoning for technical diagnostics
2. **Update config** — [assistantConfig.ts](client/src/lib/assistantConfig.ts): Set `USE_MOCK: false`, optionally update `ENDPOINT`
3. **Test** — Same as Gemini; assistant auto-routes to Deepseek backend

**Key Details:**
- Deepseek API endpoint: `https://api.deepseek.com/v1/chat/completions` (OpenAI-compatible)
- Model recommendation: `deepseek-chat` (balanced) or `deepseek-coder` (technical tasks)
- Cost advantage: Significantly cheaper than Gemini for high-volume conversations
- No native file API: Handle file preprocessing in backend (extract text, create context windows)

---

### Multiple Provider Strategy

For failover or A/B testing, extend [assistantClient.ts](client/src/lib/assistantClient.ts):
```typescript
// Example: Try Deepseek first, fallback to Gemini
const tryDeepseek = async () => { /* ... */ };
const tryGemini = async () => { /* ... */ };
const response = await tryDeepseek().catch(tryGemini);
```

---

### Key Files for All Providers
| File | Purpose |
|------|---------|
| [assistantConfig.ts](client/src/lib/assistantConfig.ts) | Toggle `USE_MOCK`, set endpoint, tune timeouts |
| [assistantClient.ts](client/src/lib/assistantClient.ts) | HTTP client — adapter layer for any provider |
| [assistantTypes.ts](client/src/lib/assistantTypes.ts) | Message/attachment TS types |
| [AssistantProvider.tsx](client/src/components/assistant/AssistantProvider.tsx) | State + message handling |

---

## 📐 Architecture & Patterns

### Component Structure
- **Radix UI + Tailwind**: All UI components use headless Radix primitives + Tailwind classes
- **Type-first React**: Props destructured, fully typed interfaces
- **Context + Hooks**: State managed via React Context; consumed via `useAssistant()` hook
- **Lazy code splitting**: Pages loaded on-demand; vendor chunks split (react, animation, router, UI, forms)

### Data Layer
- **Static content**: [data/](client/src/data/) (services, case studies, calculators, taxonomy)
- **Search/Recommendations**: [contentIndex.ts](client/src/lib/contentIndex.ts) + [recommendationEngine.ts](client/src/lib/recommendationEngine.ts)
  - BM25 full-text search algorithm
  - Hybrid scoring (taxonomy + text + recency + Jaccard similarity)
- **React Query**: Installed; minimal use (can prefetch content if needed)

### Routing
- **Router**: Wouter (lightweight, hook-based)
- **Pattern**: File-based routing in [App.tsx](client/src/App.tsx), not directory structure
- **Dynamic routing**: [InsightDetail.tsx](client/src/pages/InsightDetail.tsx) example — slug-based content lookup

### Styling
- **Framework**: Tailwind CSS 3.4 with @tailwindcss/typography plugin
- **Dark mode**: Configured but not actively used in current design
- **Colors**: HSL CSS variables (`--primary`, `--gold`, etc.) + Tailwind classes
- **Animations**: Framer Motion for scroll-triggered effects ([FeatureCard.tsx](client/src/components/FeatureCard.tsx))

### Form Handling
- **Library**: React Hook Form + Zod validation
- **Example**: [RequestConsultation.tsx](client/src/pages/RequestConsultation.tsx) — form with submission handling
- **Submission**: Fetch POST or form action (e.g., Netlify Forms)

---

## ✅ Development Conventions

### TypeScript
- **Strict mode enabled** (tsconfig.json)
- **Path alias**: `@/` maps to `client/src/`
- **Naming**: PascalCase components, camelCase functions/hooks
- **Props**: Always type-first interfaces, destructure parameters
- **Exports**: Default for pages (`export default function Page()`), named for utilities (`export function useHook()`)

### React Patterns
```typescript
// Hook pattern
export function useAssistant(): AssistantContextType {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used within <AssistantProvider>");
  return ctx;
}

// Component pattern
interface Props { title: string; onClick?: () => void }
export default function MyComponent({ title, onClick }: Props) {
  return <button onClick={onClick}>{title}</button>;
}
```

### Imports
- Order: external libs, local components/utils, types
- Use `@/` alias: `import { useAssistant } from "@/hooks/useAssistant";`
- Group related imports together

### Common Tasks

#### Add a New Page
1. Create `.tsx` file in [pages/](client/src/pages/)
2. Add route to [App.tsx](client/src/App.tsx#L14-L42) (use `React.lazy()` for code splitting)
3. Use `<SEO />` component for meta tags ([SEO.tsx](client/src/components/SEO.tsx))
4. Reference in navigation if public-facing

#### Add a Calculator Tool
1. Create component in [components/tools/](client/src/components/tools/) ([BwtsCalculator.tsx](client/src/components/tools/BwtsCalculator.tsx) example)
2. Add metadata to [data/calculators.ts](client/src/data/calculators.ts)
3. Register on [Tools.tsx](client/src/pages/Tools.tsx)

#### Update Assistant Responses
- **For mock**: Edit [mocks/assistantMock.ts](client/src/mocks/assistantMock.ts)
- **For any provider** (Gemini, Deepseek, etc.): Implement backend adapter with system prompt (e.g., maritime engineering domain context), context injection, error handling

#### Deploy
- **Build**: `npm run build` → `dist/`
- **Host**: Netlify (configured; see `_headers`, `_redirects` in [public/](client/public/))
- **Env vars**: Set in build tool or CI/CD

---

## 🔍 SEO & Analytics

### SEO
- **react-helmet-async**: Per-page meta tags and structured data (JSON-LD)
- **Sitemap**: [public/sitemap.xml](client/public/sitemap.xml) (static, update manually or via build)
- **robots.txt**: [public/robots.txt](client/public/robots.txt)
- **Canonical links**: Set in [SEO.tsx](client/src/components/SEO.tsx) per page

### Analytics
- **GA4 tracking**: [lib/analytics.ts](client/src/lib/analytics.ts) wrapper
- **Events**: Track form submissions, page views, calculator usage
- **Tag Manager**: GTM snippet loaded in [index.html](client/index.html) (GTM ID: `G-WPWD3K7JHR`)

---

## 📦 Dependencies & Tooling

### Core
- React 18 + React Router (Wouter)
- TypeScript 5.6 (strict mode)
- Vite (build tool, HMR dev server)

### UI & Styling
- Radix UI (headless components)
- Tailwind CSS 3.4 + @tailwindcss/typography
- Framer Motion (scroll animations)
- Lucide React (icons)

### Forms & Validation
- React Hook Form
- Zod (schema validation)

### Utilities
- React Query (caching/prefetching)
- React Helmet Async (SEO)
- clsx / class-variance-authority (class merging)
- date-fns (date handling)
- html2pdf.js (PDF export for calculators)
- DOMPurify (sanitize HTML)

### Build & Dev
- ESBuild (minification)
- PostCSS + Autoprefixer (CSS processing)
- ANALYZE=true flag for bundle stats visualization

---

## 🎯 Productivity Tips

1. **Use the `@/` alias** — Always. Cleaner imports, easier refactors.
2. **Leverage Radix UI components** — Pre-built accessibility + keyboard support.
3. **Follow the component pattern** — Type props first, then destructure.
4. **Check [client/src/types/](client/src/types/) before defining new types** — Avoid duplication.
5. **Use Tailwind's @apply directive sparingly** — Prefer utility classes inline.
6. **Test with `npm run build`** — Catches TypeScript errors early.
7. **Build analysis**: `ANALYZE=true npm run build` to see chunk sizes.

---

## 🤔 Common Pitfalls

- **Gemini backend not ready?** Set `USE_MOCK: true` temporarily — assistant still works with mock data.
- **Missing `@/` imports?** Check [vite.config.ts](vite.config.ts#L20-L22) alias definition and [tsconfig.json](tsconfig.json) path mapping.
- **Styling not applying?** Ensure Tailwind class is in your template (dynamic classes won't be found by JIT).
- **Context hook error?** Make sure component is wrapped in `<AssistantProvider>` (done in [App.tsx](client/src/App.tsx#L55)).

---

## 📚 Related Documentation
- [README.md](README.md) — Project overview, features, tech stack
- See [CONTRIBUTING.md](CONTRIBUTING.md) if it exists (not found; create if needed for team workflows)
