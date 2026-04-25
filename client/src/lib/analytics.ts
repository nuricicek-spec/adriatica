// lib/analytics.ts

type EventParams = Record<string, any>;
const GA_ID = "G-WPWD3K7JHR";

// gtag güvenlik wrapper'ı
const gtag = (...args: any[]) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  window.gtag(...args);
};

// ==========================
// GENERIC EVENT TRACKER
// ==========================
export const trackEvent = (eventName: string, params?: EventParams) => {
  gtag("event", eventName, {
    ...params,
    send_to: GA_ID,
  });
};

// ==========================
// STANDARDIZED EVENTS
// ==========================

// 1. Email kaydı (Ana sayfa "Begin Your Voyage")
export const trackEmailSignup = (source: string = "homepage") => {
  trackEvent("email_signup", { source });
};

// 2. Danışmanlık talebi (Request Consultation)
export const trackConsultationRequest = (source: string = "request_consultation") => {
  trackEvent("consultation_request", { source });
};

// 3. Tool kullanımı (sayfa açıldığında)
export const trackToolUsage = (tool: string) => {
  trackEvent("tool_used", { tool });
};

// 4. PDF başarıyla oluşturulduğunda
export const trackPdfGenerated = (tool: string) => {
  trackEvent("generate_pdf", { tool });
};

// 5. Uyumsuzluk (compliance fail) durumunda
export const trackComplianceFail = (tool: string) => {
  trackEvent("compliance_fail", { tool });
};

// 6. Genel CTA tıklamaları (isteğe bağlı)
export const trackCTA = (label: string) => {
  trackEvent("cta_click", { label });
};