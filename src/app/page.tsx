import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#10214F] text-[#F4F5F7]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <span className="text-xl font-medium tracking-tight">zunia</span>
        <nav className="flex gap-6 text-sm text-[#A8BADE]">
          <Link href="https://docs.zuniawallet.com">Docs</Link>
          <Link href="https://github.com/zunialab">GitHub</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6FA8FF]">
          Cosmos multi-chain wallet
        </p>
        <h1 className="mt-6 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          One wallet for
          <br />
          <span className="text-[#6FA8FF]">every Cosmos chain.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#A8BADE]">
          Zunia is a multi-chain wallet for the Cosmos ecosystem, running as a
          browser extension and a mobile app on the same keys.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            className="rounded-full bg-[#2050C4] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3B6BFF]"
            href="https://github.com/zunialab/zunia-extension"
          >
            Browser extension
          </a>
          <a
            className="rounded-full border border-[#C7D2EA]/30 px-6 py-3 text-sm font-medium text-[#F4F5F7] transition hover:border-[#6FA8FF]"
            href="https://github.com/zunialab/zunia-mobile"
          >
            Mobile wallet
          </a>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl border-t border-white/10 px-6 py-8 text-sm text-[#6E80AE]">
        <p>
          © {new Date().getFullYear()} Zunia Lab ·{" "}
          <a href="mailto:hello@zuniawallet.com">hello@zuniawallet.com</a>
        </p>
      </footer>
    </div>
  );
}
