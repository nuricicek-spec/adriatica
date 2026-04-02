import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

export default function About() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Adriatica D.O.O.",
    "image": "https://www.adriaticadoo.me/og-image-default.png",
    "url": "https://www.adriaticadoo.me",
    "taxID": "03612807",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Budva",
      "addressCountry": "ME"
    },
    "serviceType": [
      "Marine Engineering",
      "Regulatory Compliance",
      "MRV Reporting",
      "Biofouling Management",
      "Structural Integrity"
    ],
    "description": "Marine engineering consultancy specializing in EU MRV, IMO DCS, and Biofouling compliance.",
    "areaServed": [
      "Bar", "Budva", "Kotor", "Tivat", "Montenegro", "Adriatic Coast", "Europe"
    ]
  };

  return (
    <>
      <SEO
        title="About | Marine Engineering Consultancy | Adriatica D.O.O."
        description="Adriatica D.O.O. – independent marine engineering consultancy for superyachts and commercial vessels. Biofouling management, regulatory compliance, and technical project management in the Adriatic and Mediterranean."
        canonical="https://www.adriaticadoo.me/about"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <SectionHeading
            title="About Adriatica"
            subtitle="Marine Engineering and Consultancy"
          />

          <div className="prose prose-lg max-w-none text-muted-foreground">
            {/* Opening – Montenegro origin + global reach */}
            <p className="mb-6">
              Founded in Montenegro, Adriatica bridges the gap between complex maritime regulations and practical vessel management. You don't just get a consultant — you get an engineer who builds compliance, performance, and peace of mind for vessel operators worldwide, with a strong focus on the Adriatic and Mediterranean.
            </p>

            {/* Expertise – aligned with Core Competencies */}
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Expertise</h2>
            <p className="mb-2">Our core expertise covers five key areas:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Engineering & Technical Documentation</li>
              <li>Structural Integrity & Life Extension</li>
              <li>Sustainable Technologies & Biofouling Management</li>
              <li>Regulatory Compliance & PSC Readiness</li>
              <li>Project Management & Owner’s Representation</li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              <HashLink href="/services" className="text-primary hover:underline inline-flex items-center gap-1 mt-1">
                See all technical services →
              </HashLink>
            </p>

            {/* Operational Region */}
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Operational Region</h2>
            <p>
              We support vessels across the Adriatic Sea and the Mediterranean Basin — from commercial ports like Bar (Montenegro), Durrës (Albania), Rijeka, Split, Ploče (Croatia) to yacht destinations such as Tivat, Dubrovnik, and Monaco. Beyond the region, we provide global engineering management and technical advisory services to keep you compliant and operationally excellent anywhere.
            </p>

            {/* Why Adriatica – signature framework */}
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Why Adriatica?</h2>
            <div className="bg-primary/5 border-l-4 border-primary p-5 mb-8 rounded-sm">
              <p className="text-primary text-sm font-medium uppercase tracking-wider mb-1">Our Framework</p>
              <p className="text-xl font-display font-bold text-[#0B3B5C]">The Adriatica Integrity Cycle</p>
              <p className="text-base font-medium text-primary mt-1">Align · Execute · Verify</p>
              <p className="text-muted-foreground text-sm mt-2">
                A structured methodology that ensures compliance, efficiency, and peace of mind — from initial assessment to final documentation.
              </p>
            </div>

            {/* Benefit cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-bold text-[#0B3B5C] mb-2">Risk‑Based Approach</h3>
                <p className="text-sm">We focus on niche areas, coating condition, and your operational profile — delivering targeted, cost‑effective solutions.</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-bold text-[#0B3B5C] mb-2">Regional Expertise</h3>
                <p className="text-sm">We know Port State Control expectations in the Adriatic and Mediterranean inside out — your vessel stays compliant and disruption‑free.</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-bold text-[#0B3B5C] mb-2">Engineering Depth</h3>
                <p className="text-sm">You get management, certification, and full documentation — every project backed by rigorous engineering analysis and inspection‑ready records.</p>
              </div>
            </div>
            <p className="mb-2">
              Our philosophy is rooted in timeless principles — wisdom, resilience, and reduction to the essential.
            </p>
            <HashLink
              href="/#philosophy"
              className="inline-block text-primary hover:underline text-sm mb-6"
            >
              → Discover our Philosophy
            </HashLink>

            {/* Regulatory Alignment */}
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Regulatory Alignment</h2>
            <p className="mb-4">
              We align with international and regional maritime frameworks to protect your vessel:
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground border-t border-border/20 pt-4 mt-2">
              <span className="bg-neutral-100 px-3 py-1 rounded-full">Classification societies (DNV, BV, RINA)</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-full">IMO Guidelines (biofouling, MARPOL, etc.)</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-full">Paris MoU</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-full">EMSA</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-full">UPSUL (Montenegro)</span>
            </div>

            {/* Company Information */}
            <div className="mt-8 p-6 bg-neutral-50 border-l-2 border-primary/20 rounded-sm">
              <h3 className="font-display text-lg font-bold text-[#0B3B5C] mb-2">Company Information</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Adriatica D.O.O.</strong></p>
                <p>Podgorica, Montenegro</p>
                <p>Tax ID (PIB): 03612807</p>
                <p>Email: info@adriaticadoo.me</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 text-center rounded-sm">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Ready to align your vessel with the latest compliance expectations?
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Contact Our Team
              </HashLink>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}