import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BRAND_FILES, BRAND_ZIP } from "@/content/brand";
import { LINKS } from "@/content/site";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Zunia marks and lockups. Download each file, or take the full set as one zip. Clear space, minimum sizes, and the colors that are actually ours.",
  alternates: { canonical: "/brand" },
  robots: { index: true, follow: true },
};

const groups = ["Mark", "Symbol", "Lockup"] as const;

export default function BrandPage() {
  return (
    <>
      <a
        href="#main"
        className="zw-skip rounded-full bg-accent px-5 py-3 text-[13px] font-medium text-accent-fg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <article className="mx-auto w-full max-w-[1100px] px-5 py-20 sm:px-8 lg:py-28">
          <p className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-dim">
            Brand
          </p>
          <h1 className="m-0 mt-5 max-w-[16ch] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] text-fg sm:text-[56px]">
            Marks, lockups, and the files.
          </h1>
          <p className="m-0 mt-6 max-w-[62ch] text-[17px] leading-relaxed text-fg-muted">
            These are the official Zunia marks. Download one file, or take every SVG in a single
            zip. The wordmark is set in Space Grotesk. The product mark is red #FF1B0C. The
            website uses a quieter crimson, #C81018, for buttons. Do not recolor the mark to
            match the buttons.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BRAND_ZIP}
              download
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-[14px] font-medium text-accent-fg"
            >
              Download all (zip)
            </a>
            <a
              href={LINKS.brand}
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-[var(--z-line-strong)] px-5 text-[14px] text-fg"
            >
              Source repository
            </a>
            <a href={LINKS.brandEmail} className="inline-flex h-11 items-center px-2 text-[14px] text-fg-muted">
              brand@zunialab.com
            </a>
          </div>

          <section className="mt-16">
            <h2 className="m-0 text-[28px] font-medium tracking-[-0.03em] text-fg">Downloads</h2>
            <p className="m-0 mt-3 max-w-[68ch] text-[15.5px] leading-relaxed text-fg-muted">
              Each card is one file. White and red marks sit on the dark ground. Black marks sit
              on paper. Use the file whose ground matches the place you are putting it.
            </p>
            {groups.map((group) => (
              <div key={group} className="mt-10">
                <h3 className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-dim">
                  {group}
                </h3>
                <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {BRAND_FILES.filter((item) => item.group === group).map((item) => (
                    <li
                      key={item.file}
                      className="flex flex-col overflow-hidden rounded-[20px] border border-[var(--z-line)]"
                    >
                      <div
                        className="flex h-40 items-center justify-center px-6"
                        style={{ background: item.surface === "paper" ? "#F1F0EE" : "#0B0A09" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/brand/${item.file}`}
                          alt=""
                          className="max-h-24 max-w-full"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <div>
                          <p className="m-0 text-[14px] text-fg">{item.name}</p>
                          <p className="m-0 font-mono text-[11px] text-fg-dim">{item.file}</p>
                        </div>
                        <a
                          href={`/brand/${item.file}`}
                          download
                          className="shrink-0 text-[13px] text-fg underline decoration-[var(--z-line-strong)] underline-offset-4"
                        >
                          SVG
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mt-20 max-w-[760px] text-[16.5px] leading-[1.75] text-fg-muted">
            <h2 className="m-0 text-[28px] font-medium tracking-[-0.03em] text-fg">How to use them</h2>
            <h3 className="m-0 mt-8 text-[18px] font-medium text-fg">Clear space and size</h3>
            <p className="m-0 mt-3">
              Leave clear space around the symbol equal to the height of one chevron in the mark.
              Do not put type, a rule, or another logo inside that space. The symbol should not
              appear smaller than 16 pixels. A horizontal lockup should not appear narrower than
              88 pixels. Below those sizes, use the symbol alone.
            </p>
            <h3 className="m-0 mt-8 text-[18px] font-medium text-fg">Color</h3>
            <p className="m-0 mt-3">
              The product red is #FF1B0C. Paper is #F1F0EE. Void, the dark ground, is #0B0A09.
              On dark grounds use the white or red lockup. On paper use the black lockup. Do not
              put the red mark on a red ground. Do not add a shadow, a gradient, or an outline to
              the symbol. Do not rotate it, stretch it, or redraw the chevrons.
            </p>
            <p className="m-0 mt-3">
              The marketing site uses #C81018 for buttons and links so large areas of red stay
              readable. That crimson is a surface color. It is not a replacement for the mark.
              When you export a logo, export the files on this page, not a screenshot of a button.
            </p>
            <h3 className="m-0 mt-8 text-[18px] font-medium text-fg">Name</h3>
            <p className="m-0 mt-3">
              The product name is Zunia. The lab name is Zunia Lab. Write Zunia with a capital Z
              and the rest lowercase, including in a sentence. Do not write ZUNIA, Zunia Wallet
              as a second brand, or Zunia Token. There is no token.
            </p>
            <h3 className="m-0 mt-8 text-[18px] font-medium text-fg">What you may do</h3>
            <p className="m-0 mt-3">
              You may use the mark to link to zunialab.com, to name the software in an article,
              or to show compatibility in a way that is true. A &quot;works with Zunia&quot; line is fine
              when it works with Zunia. You may not use the mark as your own app icon, in an ad
              for a token, or in a way that suggests Zunia Lab operates your product, your
              validator, or your fund.
            </p>
            <p className="m-0 mt-3">
              Sub-brand files in the source repository, for products that are not shipping, are
              not on this page on purpose. Do not invent a Zunia Pay or Zunia Explorer lockup
              for a public page. If you need a use that this page does not cover, write to{" "}
              <a href={LINKS.brandEmail}>brand@zunialab.com</a> before you publish it.
            </p>
            <h3 className="m-0 mt-8 text-[18px] font-medium text-fg">The zip</h3>
            <p className="m-0 mt-3">
              The zip contains the same SVG files as the cards above, in a folder named
              zunia-brand. It does not contain the wordmark font. Space Grotesk is a separate
              typeface. Install it if you are setting the name in type. If you only need the
              lockup, you do not need the font: the lettering is already drawn in the SVG.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
