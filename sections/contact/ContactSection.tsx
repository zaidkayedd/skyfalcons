import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfoCards } from "@/components/ContactInfoCards";
import { StrategicAllianceMap } from "@/components/StrategicAllianceMap";

/**
 * CONTACT PAGE BODY
 * - Send Us a Message form matches the Charter table width system (max-w-5xl).
 * - The three info boxes sit UNDER the form (row on desktop, stacked mobile).
 * - Strategic Alliance section is redesigned around the (unchanged) map.
 */
export function ContactSection() {
  return (
    <>
      {/* Send Us a Message */}
      <section className="py-14 sm:py-20">
        <Container className="max-w-5xl">
          <SectionHeading
            title={
              <>
                Send us a <span className="text-gold">message</span>
              </>
            }
          />
          <p className="mt-4 max-w-2xl text-slate">
            Whether you&apos;re buying, selling or chartering, our team responds
            within one business day — and around the clock for charter requests.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>

          {/* Three boxes UNDER the form */}
          <div className="mt-6">
            <ContactInfoCards />
          </div>
        </Container>
      </section>

      {/* Strategic Alliance Landscape — matches live site (light, centered) */}
      <section className="bg-porcelain py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            title={
              <>
                Strategic <span className="text-gold">Alliance Landscape</span>
              </>
            }
            subtitle="Our worldwide network connects aviation professionals across continents, providing seamless service wherever your journey takes you."
          />
          <Reveal className="mt-12">
            <StrategicAllianceMap />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
