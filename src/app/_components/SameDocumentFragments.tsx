"use client";

import { useEffect } from "react";

/**
 * Keeps in-page fragment links same-document when the URL carries a query.
 *
 * The header and footer render on /legal/* as well as on /, so their section
 * links are written root-relative ("/#chains") rather than bare ("#chains").
 * The cost is that on the home page they stop being fragment jumps the moment
 * the URL carries anything else: the HTML navigation algorithm compares the
 * target and current URLs with fragments excluded, so a visitor who arrived on
 * "/?utm_source=twitter" and clicks "Chains" gets a full document navigation.
 * The page reloads, the query string is dropped, and every zw-reveal/zw-rise
 * entrance animation replays.
 *
 * This restores the same-document behaviour for exactly that case: same origin,
 * same path, differing only in query and fragment. It is an enhancement, not a
 * dependency: without JavaScript the link still reaches the right section, it
 * just reloads on the way.
 */
export function SameDocumentFragments() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Leave anything the browser or another handler treats specially alone:
      // new tab, download, middle click, an already-handled click.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const node = event.target;
      if (!(node instanceof Element)) return;
      const anchor = node.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const target = new URL(href, window.location.href);
      if (
        target.origin !== window.location.origin ||
        target.pathname !== window.location.pathname ||
        target.hash === "" ||
        // Same query means the browser already treats this as a fragment jump.
        target.search === window.location.search
      ) {
        return;
      }

      const id = decodeURIComponent(target.hash.slice(1));
      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      // Keep the query the visitor arrived with; only the fragment changes.
      const next = `${window.location.pathname}${window.location.search}${target.hash}`;
      window.history.pushState(null, "", next);
      // A native fragment jump moves focus as well as the viewport. Without
      // this a keyboard user would scroll to the section but keep tabbing from
      // the header. scroll-margin-top on the section is honoured by both.
      element.setAttribute("tabindex", "-1");
      element.focus({ preventScroll: true });
      element.scrollIntoView({ block: "start" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
