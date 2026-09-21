import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Container } from "./Container";
import { brand, contact } from "@/data/site";

const services = [
  { label: "Sales & Acquisition", href: "/marketplace" },
  { label: "Charter", href: "/charter" },
  { label: "Marketplace", href: "/marketplace" },
];

const company = [
  { label: "Strategic Consultation", href: "/contact" },
  { label: "Global Network", href: "/#network" },
  { label: "Historical Transactions", href: "/#transactions" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const tel = contact.phone.replace(/[^+\d]/g, "");
  return (
    <footer className="bg-[#1f1f1f] text-white/70">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[7fr_1fr_1fr] lg:gap-2 lg:grid-cols-[7fr_2fr_1fr_1.2fr] lg:[&>div:nth-child(n+2)]:translate-x-32">
      
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logos/whiteFooterLogo.png"
                alt="Sky Falcons. Beyond Limits"
                width={220}
                height={58}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-white/60">
              Excellence in Aviation Brokerage. Sales &amp; Acquisition,
              Marketplace, Global Charter, and Strategic Consultation for
              discerning clients worldwide.
            </p>
            <div className="mt-6 flex items-center gap-3">
            
              <a
                href="https://www.linkedin.com/company/skyfalcons/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="https://twitter.com/your-twitter-handle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/skyfalcons_ltd?stkn=MWk0NHVidnZscnhybw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>

  
              <a
                href="https://www.facebook.com/SkyFalcons.ltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

    
          <div className="hidden md:block">
            <FooterCol title="Services">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="transition-colors hover:text-gold"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </FooterCol>
          </div>

          <div className="hidden md:block">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5 font-sans text-sm">
              <li>
                <a
                  href={`tel:${tel}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-gold" />
                {contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 font-sans text-[0.7rem] sm:text-[0.75rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. All rights reserved. Developed by{" "}
            <a
              href="https://www.artlstudio.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold"
            >
              Artl Studio, LLC
            </a>
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-gold">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 font-sans text-sm">{children}</ul>
    </div>
  );
}
