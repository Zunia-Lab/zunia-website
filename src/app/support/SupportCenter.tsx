"use client";

import { useMemo, useState } from "react";
import { cn } from "@zunialab/ui";
import {
  SUPPORT_ARTICLES,
  SUPPORT_CONTACTS,
  SUPPORT_TOPICS,
  type SupportTopic,
} from "@/content/support";

export function SupportCenter() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<SupportTopic | "all">("all");

  const articles = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return SUPPORT_ARTICLES.filter((article) => {
      if (topic !== "all" && article.topic !== topic) return false;
      if (!needle) return true;
      const haystack = [article.title, article.summary, ...article.body].join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, topic]);

  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
      <p className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-dim">
        Support
      </p>
      <h1 className="m-0 mt-5 max-w-[16ch] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] text-fg sm:text-[56px]">
        Help with Zunia
      </h1>
      <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-fg-muted">
        Search the guides below, or write to us. There is no Zunia account. We never ask for a
        recovery phrase, and we never start the conversation.
      </p>

      <label className="mt-10 block">
        <span className="sr-only">Search support topics</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search keys, Safari, fees, a lost phrase"
          className={cn(
            "w-full rounded-[16px] border border-[var(--z-line)] bg-[var(--z-glass)] px-5 py-4",
            "text-[16px] text-fg placeholder:text-fg-dim",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)]",
          )}
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {SUPPORT_TOPICS.map((item) => {
          const selected = topic === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setTopic(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)]",
                selected
                  ? "border-transparent bg-accent text-accent-fg"
                  : "border-[var(--z-line)] bg-[var(--z-glass)] text-fg-muted hover:text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="m-0 mt-6 font-mono text-[12px] text-fg-dim" aria-live="polite">
        {articles.length === 0
          ? "No matching guides"
          : `${articles.length} ${articles.length === 1 ? "guide" : "guides"}`}
      </p>

      {articles.length === 0 ? (
        <p className="m-0 mt-4 max-w-[520px] text-[15px] leading-relaxed text-fg-muted">
          Nothing in these guides matches that search. Write to{" "}
          <a href="mailto:dev@zunialab.com" className="text-fg underline underline-offset-4">
            dev@zunialab.com
          </a>{" "}
          or{" "}
          <a href="mailto:zunialab@gmail.com" className="text-fg underline underline-offset-4">
            zunialab@gmail.com
          </a>{" "}
          and include the browser, the chain, and what you expected to happen. Do not include a
          recovery phrase.
        </p>
      ) : (
        <ul className="mt-4 grid list-none gap-3 p-0 lg:grid-cols-2">
          {articles.map((article) => (
            <li key={article.id}>
              <details className="group h-full rounded-[16px] border border-[var(--z-line)] bg-[var(--z-glass)] open:border-[var(--z-line-strong)]">
                <summary
                  className={cn(
                    "cursor-pointer list-none p-5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)]",
                    "[&::-webkit-details-marker]:hidden",
                  )}
                >
                  <span className="flex items-start gap-3">
                    <span>
                      <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-fg-dim">
                        {SUPPORT_TOPICS.find((item) => item.id === article.topic)?.label}
                      </span>
                      <span className="mt-2 block text-[16px] font-medium tracking-[-0.02em] text-fg">
                        {article.title}
                      </span>
                      <span className="mt-2 block text-[13.5px] leading-relaxed text-fg-muted group-open:hidden">
                        {article.summary}
                      </span>
                    </span>
                    <span aria-hidden className="ml-auto font-mono text-[12px] text-fg-dim group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <div className="flex flex-col gap-3 px-5 pb-5 text-[14.5px] leading-relaxed text-fg-muted">
                  {article.body.map((paragraph) => (
                    <p key={paragraph} className="m-0">
                      {paragraph}
                    </p>
                  ))}
                  {article.href ? (
                    <a
                      href={article.href}
                      rel="noreferrer"
                      className="text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
                    >
                      {article.linkLabel ?? article.href}
                    </a>
                  ) : null}
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}

      <h2 className="m-0 mt-16 text-[28px] font-medium tracking-[-0.03em] text-fg">Contact</h2>
      <p className="m-0 mt-3 max-w-[520px] text-[14.5px] leading-relaxed text-fg-muted">
        These are the only two addresses we answer. Wallet help and vulnerability reports go to
        dev@zunialab.com. Everything else goes to zunialab@gmail.com.
      </p>
      <ul className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {SUPPORT_CONTACTS.map((contact) => (
          <li key={contact.label}>
            <a
              href={contact.href}
              rel="noreferrer"
              className={cn(
                "flex h-full flex-col gap-2 rounded-[16px] border border-[var(--z-line)] bg-[var(--z-glass)] p-5",
                "transition-[transform,border-color] duration-[var(--z-duration-slow)] ease-[var(--z-ease)]",
                "hover:-translate-y-1 hover:border-[var(--z-line-strong)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)]",
              )}
            >
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-fg-dim">
                {contact.label}
              </span>
              <span className="text-[15px] font-medium text-fg">{contact.value}</span>
              <span className="text-[13px] leading-relaxed text-fg-muted">{contact.detail}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
