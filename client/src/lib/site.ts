// Centralized site constants and helpers
export const SITE_NAME = "Ashumi Estate";
export const SITE_DOMAIN = "ashumi-estate.com";

// Returns https://ashumi-estate.com + optional path (must start with /)
export function canonicalUrl(path: string = ""): string {
  return `https://${SITE_DOMAIN}${path}`;
}

// Use on pages to compute a canonical link rel value with SSR-safe fallback
export function getCanonicalFallback(path: string): string {
  if (typeof window !== "undefined") return window.location.href;
  return canonicalUrl(path);
}