/**
 * Centralized search normalization for the MDW customer website.
 *
 * These rules MUST stay in sync with:
 *   - MDWBackend/utils/searchNormalize.js   (authoritative for DB matching)
 *   - MDWFrontendDashboard/src/lib/search-normalize.ts
 *
 * Backend matching is authoritative; this client copy is used for request
 * hardening (skipping pointless pure-punctuation requests) and to keep every
 * project on the same normalization rules.
 */

/** All Unicode dash / hyphen variants humans type interchangeably. */
const DASH_VARIANTS =
  /[\u002d\u00ad\u2010\u2011\u2012\u2013\u2014\u2015\u2212\ufe58\ufe63\uff0d]/g;

/** Combining diacritical marks (stripped after NFKD normalisation). */
const COMBINING_MARKS = /[\u0300-\u036f]/g;

/** Anything left over after normalisation is removed entirely. */
const NON_ALPHANUMERIC = /[^a-z0-9]+/g;

/**
 * Escape every regex metacharacter so arbitrary user input is treated as a
 * literal string (used by client-side filters).
 */
export function escapeRegExp(value: unknown): string {
  return String(value ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Normalize a search term so different punctuation/spacing/case/dash
 * representations of the same text compare equal.
 *   "Crocin-650" / "CROcin 650" / "Crocin—650" -> "crocin650"
 */
export function normalizeSearchTerm(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .trim()
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .replace(DASH_VARIANTS, "-")
    .toLowerCase()
    .replace(NON_ALPHANUMERIC, "");
}

/**
 * Split a raw query into its normalized alphanumeric tokens.
 *   "Dolo-650 tablet" -> ["dolo", "650", "tablet"]
 */
export function normalizeSearchTokens(value: unknown): string[] {
  if (value === null || value === undefined) return [];
  return String(value)
    .trim()
    .split(/[\s,;:()/+&|.=_\-]+/)
    .map((token) => normalizeSearchTerm(token))
    .filter((token) => token.length > 0);
}