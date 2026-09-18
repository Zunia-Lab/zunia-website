import { Container, Eyebrow, Glow, Section } from "@/components/site/Layout";
import { FaqList } from "@/components/site/Faq";
import { FAQ } from "@/content/site";

export function FaqSection() {
  return (
    <Section id="faq" label="Frequently asked questions">
      <Glow className="bottom-[-280px] right-[-240px]" size={820} strength={0.32} />

      <Container className="relative max-w-[900px]">
        <div className="mb-11 text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="zw-block-title m-0 mt-6 font-medium text-fg">Questions</h2>
        </div>
        <FaqList items={FAQ} />
      </Container>
    </Section>
  );
}
