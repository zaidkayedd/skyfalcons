import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { pillars } from "@/data/site";

/** Three service pillars — confirmed brand content. */
export function Pillars() {
  return (
    <section className="border-b border-mist bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-px overflow-hidden rounded-card border border-mist bg-mist md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 100}
              className="bg-white p-8 sm:p-10"
            >
              <span className="font-display text-3xl text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-2xl text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
