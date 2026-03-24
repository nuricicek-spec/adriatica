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
      "Preparation and periodic updating of mandatory shipboard plans and manuals, tailored to the vessel’s configuration and operational profile. We ensure documents meet the latest IMO, MARPOL, and flag state requirements.",
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
    title: "Project Management & Owner’s Representation",
    description:
      "Full technical management of dry‑dockings, refits, and complex modifications. Acting as Owner’s Technical Representative, we coordinate with shipyards, supervise works, and ensure quality control, delivering projects on schedule with complete engineering documentation.",
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
          {/* Main heading with new subtitle */}
          <SectionHeading
            title="Engineering Services"
            subtitle="Engineering Management"
          />

          {/* Interactive Process Wheel */}
          <ProcessWheel />

          {/* New section heading for the detailed services */}
          <h2 className="font-display text-2xl font-bold text-[#0B3B5C] border-l-2 border-primary/20 pl-6 mt-12 mb-6">
            Marine Engineering & Consultancy
          </h2>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {service.description}
                </p>
                <ul className="list-disc pl-5 mb-2 text-muted-foreground space-y-1">
                  {service.deliverables.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-primary font-medium mt-2">
                  Outcome: {service.outcome}
                </p>
                <p className="text-sm text-primary/70 font-mono mt-1">
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