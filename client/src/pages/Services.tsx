import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";

const services = [
  {
    title: "Biofouling Management & Compliance",
    description:
      "Adriatica provides technical consultancy for biofouling management planning in accordance with IMO MEPC.378(80) Guidelines. Services include vessel risk assessment, development of Biofouling Management Plans (BFMP), and implementation of Biofouling Record Books (BFRB) aligned with classification society expectations.",
    refs: "IMO, Paris MoU, RINA / BV / DNV",
  },
  {
    title: "In-Water Cleaning Management",
    description:
      "Adriatica designs and manages in-water cleaning operations for superyachts operating in the Adriatic and Mediterranean regions. Our role focuses on engineering supervision, regulatory compliance verification, and coordination of certified underwater service providers with debris capture systems.",
    refs: "IMO MEPC.378(80), HELCOM, Paris MoU",
  },
  {
    title: "Superyacht Technical Consultancy",
    description:
      "Independent technical advisory services for superyacht operators including hull performance assessment, maintenance strategy development, and operational compliance with international maritime environmental regulations (EU MRV, IMO DCS, CII).",
    refs: "EU MRV, IMO DCS, CII",
  },
  {
    title: "Drydock & Refit Technical Supervision",
    description:
      "Technical oversight and coordination of shipyard works including coating inspection, hull maintenance planning, and engineering documentation during drydock and refit operations. On‑site presence ensures quality control and timeline optimisation.",
    refs: "IACS UR Z10, UPSUL, Paris MoU",
  },
  {
    title: "Regulatory Documentation & Compliance",
    description:
      "Preparation of vessel‑specific plans and manuals: Ballast Water Management Plan (BWMP), Shipboard Oil Pollution Emergency Plan (SoPEP), Ship Energy Efficiency Management Plan (SEEMP), Garbage Management Plan, and Emergency Response Manuals.",
    refs: "IMO, MARPOL, EU MRV",
  },
  {
    title: "Project Management & Owner’s Representation",
    description:
      "Full project management during refits, dry‑dockings, and technical modifications. Acting as Owner’s Technical Representative to ensure engineering specifications are met and projects are delivered on time and within budget.",
    refs: "Industry best practices",
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Adriatica D.O.O. provides marine engineering services: biofouling management, in-water cleaning coordination, superyacht technical consultancy, drydock supervision, and regulatory compliance."
        canonical="https://www.adriaticadoo.me/services"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SectionHeading
            title="Engineering Services"
            subtitle="Yacht Compliance & Maintenance"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {services.map((service, idx) => (
              <div key={idx} className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  {service.description}
                </p>
                <p className="text-sm text-primary/70 font-mono">
                  References: {service.refs}
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