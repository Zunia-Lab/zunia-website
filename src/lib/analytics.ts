/*
 * Consent-gated Google Analytics 4, written so nothing happens until the
 * visitor says yes. This file imports nothing so the unit tests can run it
 * under plain Node with fake browser objects.
 *
 * Rules it enforces:
 *  - gtag.js is not loaded, and nothing is sent, before "Allow analytics".
 *  - Advertising consent signals are always denied; Google signals and ad
 *    personalisation are off.
 *  - Page views are sent by us, with the query string and hash dropped and
 *    anything that looks like an address or a hash replaced.
 *  - "No thanks" or a later withdrawal stops sending and clears _ga cookies.
 */

export const CONSENT_KEY = "zunia.analytics-consent.v1";
export type Choice = "granted" | "denied";

/* -------------------------------------------------------------------------- */
/* Sanitising                                                                 */
/* -------------------------------------------------------------------------- */

const HASH_RE = /(?<![0-9a-zA-Z])(?:0x)?[0-9a-fA-F]{64}(?![0-9a-zA-Z])/g;
const BECH32_RE = /\b[a-z][a-z0-9]{0,19}1[02-9ac-hj-np-z]{38,90}\b/gi;

/** Replaces 64-hex strings with ":hash" and bech32 addresses with ":address". */
export function scrub(text: string): string {
  return text.replace(HASH_RE, ":hash").replace(BECH32_RE, ":address");
}

/** Path only: no query, no hash, no addresses, no hashes. */
export function sanitizePath(pathname: string): string {
  const bare = pathname.split("#")[0].split("?")[0] || "/";
  return scrub(bare.startsWith("/") ? bare : `/${bare}`);
}

export function sanitizeTitle(title: string): string {
  return scrub(title);
}

/** Origin plus sanitised path of an absolute URL, or "" if it does not parse. */
export function sanitizeUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.origin}${sanitizePath(u.pathname)}`;
  } catch {
    return "";
  }
}

export interface PageView {
  page_location: string;
  page_path: string;
  page_title: string;
  page_referrer?: string;
}

export function buildPageView(
  loc: { origin: string; pathname: string },
  title: string,
  referrer: string,
): PageView {
  const page_path = sanitizePath(loc.pathname);
  const view: PageView = {
    page_location: `${loc.origin}${page_path}`,
    page_path,
    page_title: sanitizeTitle(title),
  };
  const ref = referrer ? sanitizeUrl(referrer) : "";
  if (ref) view.page_referrer = ref;
  return view;
}

/* -------------------------------------------------------------------------- */
/* Controller                                                                 */
/* -------------------------------------------------------------------------- */

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface Env {
  /** May throw on access (private mode, blocked site data). */
  getStorage(): StorageLike | null;
  window: {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [flag: `ga-disable-${string}`]: unknown;
    location: { origin: string; pathname: string; hostname: string };
  };
  document: {
    title: string;
    referrer: string;
    cookie: string;
    head: { appendChild(node: unknown): unknown };
    createElement(tag: string): { src: string; async: boolean };
  };
}

export function readChoice(env: Pick<Env, "getStorage">): Choice | null {
  try {
    const value = env.getStorage()?.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function writeChoice(env: Pick<Env, "getStorage">, choice: Choice): void {
  try {
    env.getStorage()?.setItem(CONSENT_KEY, choice);
  } catch {
    // Storage unavailable: the choice holds for this page view only.
  }
}

/** Removes the GA cookies (_ga, _ga_<container>) on this host and its parents. */
export function clearAnalyticsCookies(env: Pick<Env, "document" | "window">): void {
  const names = env.document.cookie
    .split(";")
    .map((part) => part.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name.startsWith("_gat"));
  const host = env.window.location.hostname;
  const parts = host.split(".");
  const domains = new Set<string | null>([null, host, `.${host}`]);
  for (let i = 1; i < parts.length - 1; i++) domains.add(`.${parts.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      env.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function createAnalytics(id: string, env: Env) {
  const w = env.window;
  const disableKey = `ga-disable-${id}` as const;
  let loaded = false;
  let active = false;

  function gtag(...args: unknown[]) {
    void args;
    // gtag.js only understands the `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    (w.dataLayer as unknown[]).push(arguments);
  }

  function load() {
    w.dataLayer = w.dataLayer ?? [];
    w.gtag = gtag;
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", id, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = env.document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    env.document.head.appendChild(script);
    loaded = true;
  }

  return {
    get active() {
      return active;
    },
    /** Switches analytics on. Loads gtag.js the first time only. */
    allow() {
      writeChoice(env, "granted");
      w[disableKey] = false;
      if (!loaded) load();
      else gtag("consent", "update", { analytics_storage: "granted" });
      active = true;
    },
    /** Switches analytics off and clears what can be cleared. Safe before allow(). */
    deny() {
      writeChoice(env, "denied");
      active = false;
      w[disableKey] = true;
      if (loaded) gtag("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies(env);
    },
    /** Sends a sanitised page_view; a no-op unless the visitor allowed analytics. */
    pageView() {
      if (!active) return;
      gtag("event", "page_view", buildPageView(w.location, env.document.title, env.document.referrer));
    },
  };
}
