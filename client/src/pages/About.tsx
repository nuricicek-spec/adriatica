import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

export default function About() {
  // Organisation-level structured data (same as homepage)
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
      "Bar",
      "Budva",
      "Kotor",
      "Tivat",
      "Montenegro",
      "Adriatic Coast",
      "Europe"
    ]
  };

  return (
    <>
      <SEO
        title="About"
        description="Adriatica D.O.O. – marine engineering consultancy specializing in biofouling management, in‑water cleaning, and regulatory compliance for superyachts and commercial vessels in the Adriatic and Mediterranean."
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
              Adriatica was founded in Montenegro to bridge the gap between complex maritime regulations and practical vessel management. We don’t just consult – we engineer compliance, performance, and peace of mind for vessel operators around the world, with a strong focus on the Adriatic and Mediterranean.
            </p>

            {/* Expertise – with intro, representative note, and link to Services */}
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Expertise</h2>
            <p className="mb-2">Our core expertise includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Biofouling Management Planning (IMO MEPC.378(80))</li>
              <li>In‑Water Cleaning Coordination & Supervision</li>
              <li>Hull Performance Assessment & CII Advisory</li>
              <li>Drydock & Refit Technical Supervision</li>
              <li>Regulatory Compliance (EU MRV, IMO DCS, MARPOL)</li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              This is a representative selection; we also support related engineering and compliance needs.
              <br />
              <HashLink href="/services" className="text-primary hover:underline inline-flex items-center gap-1 mt-1">
                For a complete overview of our technical services, visit our Services page →
              </HashLink>
            </p>

            {/* Operational Region – broader ports + global hint */}
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Operational Region</h2>
            <p>
              We operate across the Adriatic Sea and the Mediterranean Basin, supporting both yachts and commercial vessels at key maritime hubs. Our regional presence includes ports such as Bar (Montenegro), Durrës (Albania), Rijeka, Split, Ploče (Croatia), as well as renowned yacht destinations like Tivat, Dubrovnik, Monaco, and others. Beyond the region, we provide engineering management and technical advisory services globally, ensuring compliance and operational excellence wherever your vessel operates.
            </p>

            {/* Why Choose Adriatica – benefit cards + link to homepage philosophy */}
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Why Adriatica?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-bold text-[#0B3B5C] mb-2">Risk‑Based Approach</h3>
                <p className="text-sm">We prioritise what matters – focusing on niche areas, coating condition, and operational profile to deliver targeted, cost‑effective solutions.</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-bold text-[#0B3B5C] mb-2">Regional Expertise</h3>
                <p className="text-sm">We understand Port State Control expectations in the Adriatic and Mediterranean, ensuring your vessel stays compliant and disruption‑free.</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-bold text-[#0B3B5C] mb-2">Engineering Depth</h3>
                <p className="text-sm">We don’t just advise – we manage, certify, and document. Every project is backed by thorough engineering analysis and inspection‑ready records.</p>
              </div>
            </div>
            <p className="mb-2">
              Our philosophy is rooted in timeless principles – wisdom, resilience, and reduction to the essential.
            </p>
            <HashLink
              href="/#philosophy"
              className="inline-block text-primary hover:underline text-sm mb-6"
            >
              → Discover our Philosophy
            </HashLink>

            {/* Regulatory Alignment – simplified badges */}
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Regulatory Alignment</h2>
            <p className="mb-4">
              Our work is aligned with international and regional maritime frameworks, including:
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground border-t border-border/20 pt-4 mt-2">
              <span className="bg-neutral-100 px-3 py-1 rounded-full">Classification society rules (DNV, BV, RINA)</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-full">IMO Guidelines (biofouling, MARPOL, etc.)</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-full">Paris Memorandum of Understanding (Paris MoU)</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-full">EMSA – European Maritime Safety Agency</span>
              <span className="bg-neutral-100 px-3 py-1 rounded-full">UPSUL – Montenegrin Maritime Safety Administration</span>
            </div>

            {/* Company Information Block */}
            <div className="mt-8 p-6 bg-neutral-50 border-l-4 border-primary rounded-sm">
              <h3 className="font-display text-lg font-bold text-[#0B3B5C] mb-2">Company Information</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Adriatica D.O.O.</strong></p>
                <p>Podgorica, Montenegro</p>
                <p>Tax ID (PIB): 03612807</p>
                <p>Email: info@adriaticadoo.me</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-neutral-50 border-l-4 border-primary text-center">
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