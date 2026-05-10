// lib/analytics.ts

type EventParams = Record<string, string | number | boolean>;
const GA_ID = "G-WPWD3K7JHR";

// ─── Desteklenen Tool ID'leri ───────────────────────────────────────────────
// Yeni araç eklendiğinde buraya ekle. Type safety sağlar.

export type ToolId =
  // Quick Check
  | "eexi"
  | "cii"
  | "bwts"
  | "ets"
  | "fueleu"
  | "shapoli"
  | "changeover"
  // Deep Analysis
  | "fueleu-pro"
  | "ets-fleet"
  | "cii-optimize"
  | "biofouling"
  // Strategic Planning
  | "scenario"
  | "drydock"
  | "health-score";

// ─── gtag Güvenlik Wrapper'ı ────────────────────────────────────────────────
const gtag = (...args: unknown[]) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  (window as any).gtag(...args);
};

// ─── Generic Event Tracker ──────────────────────────────────────────────────
export const trackEvent = (eventName: string, params?: EventParams) => {
  gtag("event", eventName, {
    ...params,
    send_to: GA_ID,
  });
};

// ─── Standardized Events ────────────────────────────────────────────────────

/** Email kaydı (Ana sayfa "Begin Your Voyage") */
export const trackEmailSignup = (source: string = "homepage") => {
  trackEvent("email_signup", { source });
};

/** Danışmanlık talebi (Request Consultation) */
export const trackConsultationRequest = (source: string = "request_consultation") => {
  trackEvent("consultation_request", { source });
};

/** Tool kullanımı — sayfa/araç açıldığında */
export const trackToolUsage = (tool: ToolId) => {
  trackEvent("tool_used", { tool });
};

/** PDF başarıyla oluşturulduğunda */
export const trackPdfGenerated = (tool: ToolId) => {
  trackEvent("generate_pdf", { tool });
};

/** Uyumsuzluk (compliance fail) durumunda */
export const trackComplianceFail = (tool: ToolId) => {
  trackEvent("compliance_fail", { tool });
};

/** Genel CTA tıklamaları */
export const trackCTA = (label: string) => {
  trackEvent("cta_click", { label });
};