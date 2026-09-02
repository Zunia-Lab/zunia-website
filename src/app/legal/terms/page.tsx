import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service (Draft)",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
        DRAFT — not in force
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-6 text-neutral-600 leading-relaxed">
        This is a placeholder Terms of Service for Zunia. It is not legal advice
        and is not binding until counsel review and formal publication. See the
        fuller draft in{" "}
        <a
          className="underline"
          href="https://docs.zuniawallet.com/legal/terms"
        >
          Zunia Docs
        </a>
        .
      </p>
      <p className="mt-4 text-neutral-600 leading-relaxed">
        Zunia wallet software is intended to be non-custodial. You control your
        keys. Contact hello@zuniawallet.com with questions.
      </p>
    </main>
  );
}
