declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

interface TrackEventParams {
  action: string;
  category: string;
  label: string;
  value?: number;
}

/**
 * Check if the user has granted analytics consent
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("analytics_consent") === "true";
}

/**
 * Track a custom event in Google Analytics 4
 */
export function trackEvent({ action, category, label, value }: TrackEventParams) {
  if (typeof window === "undefined" || !hasAnalyticsConsent() || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    ...(value !== undefined && { value }),
  });
}
