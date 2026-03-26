import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

export default function SustainableTech() {
  return (
    <>
      <SEO
        title="Sustainable Technologies & Compliance"
        description="Biofouling management plans (IMO MEPC.378(80)), eco‑friendly coating advisory, energy audits, MRV monitoring plans – helping vessels meet environmental regulations."
        canonical="https://www.adriaticadoo.me/services/sustainable-technologies"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Sustainable Technologies & Compliance
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Advisory and planning services to help vessels meet environmental regulations while improving efficiency. We work with operators to implement practical, cost‑effective solutions that reduce emissions and biosecurity risks.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Biofouling Management Plan (IMO MEPC.378(80))</li>
              <li>Eco‑friendly Coating Advisory</li>
              <li>Energy Audit & Efficiency Surveys</li>
              <li>MRV Monitoring Plan (EU MRV Regulation)</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>IMO‑compliant plans, reduced fuel consumption, and lower environmental risk.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>IMO, EU MRV, Paris MoU</p>

            {/* Detailed biofouling block */}
            <div className="mt-8 bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C]">
                  Biofouling & In‑Water Cleaning
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  IMO 2026 Priority
                </span>
              </div>

              <p className="text-muted-foreground mb-2">
                Adriatica does not perform physical cleaning operations. We provide independent engineering management, coordination, and compliance oversight.
              </p>
              <p className="text-muted-foreground mb-3">
                Without proper management, in-water cleaning can lead to non‑compliance with port regulations, environmental penalties, and coating damage. Adriatica ensures controlled, compliant, and documented operations.
              </p>
              <p className="text-muted-foreground mb-3">
                When you work with us on biofouling management, you receive a complete compliance package:
              </p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Vessel‑specific biofouling assessment (coating condition, niche areas)</li>
                <li>Cleaning execution plan with method selection (non‑abrasive, vacuum‑supported)</li>
                <li>Certified diver coordination & operation management</li>
                <li>Environmental compliance verification (debris containment, local regulations)</li>
                <li>Before/after photographic evidence and inspection records</li>
                <li>Biofouling Record Book (BFRB) entry support</li>
                <li>Post‑operation technical summary with compliance status</li>
              </ul>
              <p className="mt-4 text-primary font-medium">
                Typical outcome: A structured, compliance‑ready documentation package and fully managed in‑water cleaning operation with verifiable records suitable for PSC inspection.
              </p>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-4 border-primary text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Ready to reduce your vessel’s environmental footprint?
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request Technical Assessment
              </HashLink>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}