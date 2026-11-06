import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CONSENT_KEY,
  buildPageView,
  createAnalytics,
  readChoice,
  sanitizePath,
  sanitizeTitle,
  sanitizeUrl,
  type Env,
} from "./analytics.ts";

const ID = "G-TEST123";
const ADDR = "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu";
const HASH = "A".repeat(64).toLowerCase().replace(/a/g, "e");

function fakeEnv(opts: { storage?: "ok" | "throws" | "none"; cookie?: string } = {}) {
  const store = new Map<string, string>();
  const scripts: { src: string; async: boolean }[] = [];
  const cookieWrites: string[] = [];
  const env: Env = {
    getStorage() {
      if (opts.storage === "throws") throw new Error("blocked");
      if (opts.storage === "none") return null;
      return {
        getItem: (k) => store.get(k) ?? null,
        setItem: (k, v) => void store.set(k, v),
      };
    },
    window: { location: { origin: "https://zunialab.com", pathname: "/", hostname: "www.zunialab.com" } },
    document: {
      title: "Zunia",
      referrer: "",
      get cookie() {
        return opts.cookie ?? "";
      },
      set cookie(v: string) {
        cookieWrites.push(v);
      },
      head: { appendChild: (n: unknown) => void scripts.push(n as { src: string; async: boolean }) },
      createElement: () => ({ src: "", async: false }),
    },
  };
  return { env, store, scripts, cookieWrites };
}

describe("sanitizer", () => {
  it("drops query string and hash", () => {
    assert.equal(sanitizePath("/support?utm_source=x&addr=1#top"), "/support");
    assert.equal(sanitizePath("/#chains"), "/");
  });
  it("replaces bech32 addresses", () => {
    assert.equal(sanitizePath(`/account/${ADDR}`), "/account/:address");
    assert.equal(sanitizeTitle(`Account ${ADDR} · Zunia`), "Account :address · Zunia");
  });
  it("replaces 64-hex strings, with or without 0x", () => {
    assert.equal(sanitizePath(`/tx/${HASH}`), "/tx/:hash");
    assert.equal(sanitizePath(`/tx/0x${HASH}`), "/tx/:hash");
    assert.equal(sanitizePath(`/tx/${HASH.toUpperCase()}`), "/tx/:hash");
  });
  it("leaves ordinary paths and short hex alone", () => {
    assert.equal(sanitizePath("/legal/privacy"), "/legal/privacy");
    assert.equal(sanitizePath("/tx/deadbeef"), "/tx/deadbeef");
  });
  it("sanitises urls and rejects garbage", () => {
    assert.equal(sanitizeUrl(`https://a.example/p/${ADDR}?q=1#h`), "https://a.example/p/:address");
    assert.equal(sanitizeUrl("not a url"), "");
  });
  it("builds a page view with a clean referrer", () => {
    const v = buildPageView({ origin: "https://zunialab.com", pathname: `/a/${ADDR}` }, "T", "https://x.example/?s=1");
    assert.deepEqual(v, {
      page_location: "https://zunialab.com/a/:address",
      page_path: "/a/:address",
      page_title: "T",
      page_referrer: "https://x.example/",
    });
  });
});

describe("before consent", () => {
  it("loads no script, sends nothing, and page views are no-ops", () => {
    const { env, scripts } = fakeEnv();
    const ga = createAnalytics(ID, env);
    ga.pageView();
    assert.equal(scripts.length, 0);
    assert.equal(env.window.dataLayer, undefined);
    assert.equal(env.window.gtag, undefined);
    assert.equal(readChoice(env), null);
  });
});

describe("allow", () => {
  it("loads gtag.js once with consent mode v2 and private config", () => {
    const { env, scripts } = fakeEnv();
    const ga = createAnalytics(ID, env);
    ga.allow();
    ga.allow();
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${ID}`);
    const calls = (env.window.dataLayer as ArrayLike<unknown>[]).map((a) => Array.from(a));
    assert.deepEqual(calls[0], [
      "consent",
      "default",
      { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" },
    ]);
    assert.deepEqual(calls[1], ["consent", "update", { analytics_storage: "granted" }]);
    const config = calls.find((c) => c[0] === "config");
    assert.deepEqual(config, [
      "config",
      ID,
      { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false },
    ]);
  });

  it("sends a sanitised page_view", () => {
    const { env } = fakeEnv();
    env.window.location.pathname = `/a/${ADDR}`;
    env.document.title = `Hi ${ADDR}`;
    const ga = createAnalytics(ID, env);
    ga.allow();
    ga.pageView();
    const calls = (env.window.dataLayer as ArrayLike<unknown>[]).map((a) => Array.from(a));
    const pv = calls.filter((c) => c[0] === "event");
    assert.equal(pv.length, 1);
    assert.equal(pv[0][1], "page_view");
    assert.deepEqual(pv[0][2], {
      page_location: "https://zunialab.com/a/:address",
      page_path: "/a/:address",
      page_title: "Hi :address",
    });
  });
});

describe("choice persistence", () => {
  it("stores and reads both choices under the versioned key", () => {
    const a = fakeEnv();
    createAnalytics(ID, a.env).allow();
    assert.equal(a.store.get(CONSENT_KEY), "granted");
    assert.equal(readChoice(a.env), "granted");
    const b = fakeEnv();
    createAnalytics(ID, b.env).deny();
    assert.equal(readChoice(b.env), "denied");
  });
  it("ignores junk values and survives throwing or missing storage", () => {
    const a = fakeEnv();
    a.store.set(CONSENT_KEY, "yes");
    assert.equal(readChoice(a.env), null);
    for (const storage of ["throws", "none"] as const) {
      const { env } = fakeEnv({ storage });
      assert.equal(readChoice(env), null);
      const ga = createAnalytics(ID, env);
      assert.doesNotThrow(() => ga.deny());
      assert.doesNotThrow(() => ga.allow());
    }
  });
});

describe("withdrawal", () => {
  it("stops sending, flags GA disabled, denies storage and clears cookies", () => {
    const { env, cookieWrites } = fakeEnv({ cookie: "_ga=GA1.1.1; _ga_ABC=GS1; theme=dark" });
    const ga = createAnalytics(ID, env);
    ga.allow();
    ga.pageView();
    ga.deny();
    ga.pageView();
    const calls = (env.window.dataLayer as ArrayLike<unknown>[]).map((a) => Array.from(a));
    assert.equal(calls.filter((c) => c[0] === "event").length, 1);
    assert.deepEqual(calls.at(-1), ["consent", "update", { analytics_storage: "denied" }]);
    assert.equal(env.window[`ga-disable-${ID}`], true);
    assert.ok(cookieWrites.some((w) => w.startsWith("_ga=;") && w.includes("domain=.zunialab.com")));
    assert.ok(cookieWrites.some((w) => w.startsWith("_ga_ABC=;")));
    assert.ok(!cookieWrites.some((w) => w.startsWith("theme=")));
  });
  it("denying before ever allowing loads nothing", () => {
    const { env, scripts } = fakeEnv();
    createAnalytics(ID, env).deny();
    assert.equal(scripts.length, 0);
    assert.equal(env.window.dataLayer, undefined);
  });
  it("re-allowing after withdrawal resumes without a second script", () => {
    const { env, scripts } = fakeEnv();
    const ga = createAnalytics(ID, env);
    ga.allow();
    ga.deny();
    ga.allow();
    assert.equal(scripts.length, 1);
    assert.equal(env.window[`ga-disable-${ID}`], false);
  });
});
