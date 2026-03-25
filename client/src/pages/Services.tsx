import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import ProcessWheel from "@/components/ProcessWheel";

const services = [
  {
    title: "Engineering Plans",
    description:
      "Detailed engineering drawings and plan sets for new constructions, conversions, and refits. We produce documentation in accordance with classification society rules and flag state requirements, supporting both regulatory approval and operational safety. Our deliverables are suitable for yachts, commercial vessels, and fishing boats.",
    deliverables: [
      "Structural Drawings",
      "As‑Built Drawing Sets",
      "Arrangement Plans",
      "Fire & Safety Plans",
      "General Arrangement (optional)",
    ],
    outcome: "Class‑approved plan sets, reduced approval delays, and a clear basis for construction or modification.",
    references: "Class society rules (RINA, BV, DNV), flag state regulations",
  },
  {
    title: "Engineering Documentation",
    description:
      "Development of vessel‑specific technical manuals and analyses, ensuring completeness and alignment with IMO conventions, EU MRV, and class requirements. We prepare documents to facilitate crew training, maintenance planning, and port state control inspections.",
    deliverables: [
      "As‑Built P&ID / System Manuals",
      "Electrical Load Analysis (EAB)",
      "Fuel Management & Quality Booklet",
      "Inventory of Hazardous Materials (IHM)",
    ],
    outcome: "Audit‑ready documentation, improved crew familiarity, and smoother port state control inspections.",
    references: "IMO, EU MRV, MARPOL",
  },
  {
    title: "Structural Integrity",
    description:
      "Comprehensive hull condition assessments, life extension studies, modification consultancy, and vibration/noise diagnostics. Using advanced engineering methods and IACS unified requirements, we evaluate structural performance and recommend targeted repairs or reinforcements.",
    deliverables: [
      "Structural Integrity & Life Extension Studies",
      "Hull Condition Analysis",
      "Modification Consultancy",
      "Vibration & Noise Diagnostic",
    ],
    outcome: "Clear repair priorities, extended operational life, and classification society acceptance.",
    references: "IACS UR Z10, classification societies",
  },
  {
    title: "Sustainable Technologies & Compliance",
    description:
      "Advisory and planning services to help vessels meet environmental regulations while improving efficiency. We work with operators to implement practical, cost‑effective solutions that reduce emissions and biosecurity risks.",
    deliverables: [
      "Biofouling Management Plan (IMO MEPC.378(80))",
      "Eco‑friendly Coating Advisory",
      "Energy Audit & Efficiency Surveys",
      "MRV Monitoring Plan (EU MRV Regulation)",
    ],
    outcome: "IMO‑compliant plans, reduced fuel consumption, and lower environmental risk.",
    references: "IMO, EU MRV, Paris MoU",
  },
  {
    title: "Regulatory Compliance",
    description:
      "Preparation and periodic updating of mandatory shipboard plans and manuals, tailored to the vessel's configuration and operational profile. We ensure documents meet the latest IMO, MARPOL, and flag state requirements.",
    deliverables: [
      "Ballast Water Management Plan (BWMP)",
      "Shipboard Oil Pollution Emergency Plan (SoPEP)",
      "Ship Energy Efficiency Management Plan (SEEMP)",
      "Garbage Management Plan",
      "Emergency Response Manuals",
    ],
    outcome: "PSC‑ready documentation, reduced inspection risk, and full compliance with current regulations.",
    references: "IMO, MARPOL, flag state administrations",
  },
  {
    title: "Project Management & Owner's Representation",
    description:
      "Full technical management of dry‑dockings, refits, and complex modifications. Acting as Owner's Technical Representative, we coordinate with shipyards, supervise works, and ensure quality control, delivering projects on schedule with complete engineering documentation.",
    deliverables: [
      "Owner's Rep & Refit Supervision",
      "Dry‑Docking Specification & Management",
      "On‑site Technical Troubleshooting",
      "Cost & Schedule Control",
    ],
    outcome: "On‑time, on‑budget project delivery with verified quality and complete as‑built records.",
    references: "Industry best practices, IACS UR Z10",
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Adriatica D.O.O. provides marine engineering services: engineering plans, documentation, structural integrity, sustainable technologies, regulatory compliance, and project management for all vessel types."
        canonical="https://www.adriaticadoo.me/services"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

          {/* Page heading */}
          <SectionHeading
            title="Engineering Services"
            subtitle="Marine Engineering & Consultancy"
          />

          {/* Interactive process diagram */}
          <ProcessWheel />

          {/* ========== NEW: Specific deliverables for biofouling / in-water cleaning ========== */}
          <div className="mt-12 bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
            <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
              For Biofouling & In‑Water Cleaning Engagements
            </h3>
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
          </div>

          {/* ========== Generic deliverables + How we work + Positioning ========== */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What you get (Deliverables) */}
            <div className="border-l-2 border-primary/20 pl-6">
              <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                What You Get
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Technical Report (findings, analysis, recommendations)</li>
                <li>Engineering Documentation (plans, drawings, manuals)</li>
                <li>Action Plan (clear next steps and timelines)</li>
                <li>Ongoing Support (follow‑up, implementation assistance)</li>
              </ul>
            </div>

            {/* How we work (Client journey) */}
            <div className="border-l-2 border-primary/20 pl-6">
              <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                How We Work
              </h3>
              <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                <li>Brief & Information Gathering – share vessel details and concerns</li>
                <li>Analysis & Planning – technical assessment, risk identification, scope definition</li>
                <li>Execution / Coordination – engineering supervision, contractor management, quality control</li>
                <li>Documentation & Handover – complete records ready for audits or class submission</li>
              </ol>
            </div>
          </div>

          {/* Positioning statement */}
          <div className="mt-10 p-6 bg-neutral-50 border border-border/50 rounded-sm text-center">
            <p className="text-lg text-[#0B3B5C] font-medium">
              Adriatica provides independent engineering management, technical oversight, and compliance assurance – from initial assessment to final documentation. We don’t just advise; we deliver actionable, auditable results.
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {services.map((service, idx) => (
              <div key={idx} className="border-l-2 border-primary/20 pl-6 py-2">
                <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {service.description}
                </p>
                <ul className="list-disc pl-5 mb-2 text-muted-foreground space-y-1 text-sm">
                  {service.deliverables.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-primary font-medium mt-3">
                  Outcome: {service.outcome}
                </p>
                <p className="text-sm text-primary/70 font-mono mt-1 italic">
                  References: {service.references}
                </p>
              </div>
            ))}
          </div>

        </main>

        <Footer />
      </div>
    </>
  );
}