import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft)",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
        DRAFT — not in force
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-6 text-neutral-600 leading-relaxed">
        Draft policy: seed phrases and private keys never leave your device and
        are never uploaded to Zunia servers. The web dashboard does not accept
        signing keys in the browser.
      </p>
      <p className="mt-4 text-neutral-600 leading-relaxed">
        Fuller draft and GDPR data map live in{" "}
        <a
          className="underline"
          href="https://docs.zuniawallet.com/legal/privacy"
        >
          Zunia Docs
        </a>
        . Contact hello@zuniawallet.com.
      </p>
    </main>
  );
}
