import { ASSISTANT_CONFIG } from "../lib/assistantConfig";

// ─── Mock responses ───────────────────────────────────────────────────────────
// Replace / extend these when the real AI backend is connected.

const OFFLINE_RESPONSE =
  "The technical assistant is currently offline. Please submit a consultation request and our engineers will respond within 24 hours.";

const KEYWORD_RESPONSES: Record<string, string> = {
  psc: "PSC (Port State Control) inspections require up-to-date documentation including BWMP, SoPEP, SEEMP, and Emergency Response Manuals. Would you like to discuss your vessel's readiness?",
  biofouling:
    "Biofouling compliance is becoming a priority under IMO MEPC.378(80). We can prepare a vessel-specific Biofouling Management Plan. Shall I outline what's involved?",
  structural:
    "Structural integrity assessments cover hull condition analysis, fatigue life studies, and modification consultancy. What vessel type and age are we working with?",
  compliance:
    "Regulatory compliance covers MARPOL, IMO conventions, and flag state requirements. Which specific regulation or inspection are you preparing for?",
  drydock:
    "Dry-docking projects require detailed specifications, tender management, and critical path oversight. We provide Owner's Representative services throughout the process.",
  survey:
    "We offer pre-purchase, damage, insurance valuation, and condition surveys. What type of survey do you need?",
};

/**
 * Returns a contextual mock response based on keyword matching.
 * Falls back to the offline message when no keyword matches.
 */
export function getMockResponse(userMessage: string): Promise<string> {
  const lower = userMessage.toLowerCase();

  for (const [keyword, response] of Object.entries(KEYWORD_RESPONSES)) {
    if (lower.includes(keyword)) {
      return new Promise(resolve =>
        setTimeout(() => resolve(response), ASSISTANT_CONFIG.MOCK_RESPONSE_DELAY)
      );
    }
  }

  return new Promise(resolve =>
    setTimeout(() => resolve(OFFLINE_RESPONSE), ASSISTANT_CONFIG.MOCK_RESPONSE_DELAY)
  );
}