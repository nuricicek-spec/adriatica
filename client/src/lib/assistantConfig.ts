// ─── Assistant configuration ─────────────────────────────────────────────────
// When AI backend is ready, update ASSISTANT_ENDPOINT and set USE_MOCK to false.

export const ASSISTANT_CONFIG = {
  /** Toggle mock mode — set false when AnythingLLM / Ollama is ready */
  USE_MOCK: true,

  /** API endpoint — replace with your backend URL when ready */
  ENDPOINT: "/api/assistant",

  /** HTTP method */
  METHOD: "POST" as const,

  /** Panel opening greeting */
  GREETING:
    "Hi! Need help with your vessel? Let's assess it together.",

  /** Brand name shown in panel header */
  ASSISTANT_NAME: "Adriatica Technical Assistant",

  /** Tagline shown below name */
  ASSISTANT_TAGLINE: "Marine engineering & compliance support",

  /** Scroll threshold (px) before bar goes compact */
  SCROLL_THRESHOLD: 100,

  /** Debounce delay for scroll handler (ms) */
  SCROLL_DEBOUNCE: 120,

  /** Delay before mock response appears (ms) */
  MOCK_RESPONSE_DELAY: 700,
} as const;