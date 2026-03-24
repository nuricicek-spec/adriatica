import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Adriatica D.O.O. – marine engineering consultancy specializing in biofouling management, in‑water cleaning, and regulatory compliance for superyachts and commercial vessels in the Adriatic and Mediterranean."
        canonical="https://www.adriaticadoo.me/about"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <SectionHeading
            title="About Adriatica"
            subtitle="Maritime Engineering Consultancy"
          />

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">
              Adriatica is a specialised maritime engineering consultancy providing engineering management,
              regulatory compliance, and technical advisory services for vessels operating in the Adriatic
              and Mediterranean regions.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Expertise</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Biofouling Management Planning (IMO MEPC.378(80))</li>
              <li>In‑Water Cleaning Coordination & Supervision</li>
              <li>Hull Performance Assessment & CII Advisory</li>
              <li>Drydock & Refit Technical Supervision</li>
              <li>Regulatory Compliance (EU MRV, IMO DCS, MARPOL)</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Operational Region</h2>
            <p>
              We operate primarily in the <strong>Adriatic Sea</strong> and the <strong>Mediterranean Basin</strong>,
              supporting vessels calling at ports such as Tivat, Dubrovnik, Monaco, and other major yacht destinations.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Regulatory Alignment</h2>
            <p>
              Our services are developed in accordance with international and regional maritime frameworks:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IMO MEPC.378(80) – Biofouling Guidelines</li>
              <li>Paris Memorandum of Understanding (Paris MoU) – Port State Control inspection frameworks</li>
              <li>Classification society rules (DNV, BV, RINA)</li>
              <li>EU MRV Regulation & IMO DCS</li>
              <li>Montenegrin Maritime Safety Administration (UPSUL)</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Our Approach</h2>
            <p>
              Our logo, the Sumerian pinecone, symbolises wisdom and resilience. We approach every engineering
              challenge as an opportunity to create lasting value. Our work is reductive: we remove the unnecessary
              to reveal the essential structure, delivering engineering that is not only functional but resilient
              and timeless.
            </p>

            <div className="mt-12 p-8 bg-neutral-50 border-l-4 border-primary">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Ready to discuss your vessel’s technical requirements?
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request Technical Consultation
              </HashLink>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}