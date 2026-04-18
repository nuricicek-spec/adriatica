import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";
import { Link, Redirect } from "wouter";
import { allContent } from "@/lib/contentIndex";

export default function RegulatoryCompliance() {
  const service = services.find((s) => s.slug === "regulatory-compliance");
  if (!service) return <Redirect to="/404" />;

  const currentItem = allContent.find(
    (item) => item.slug === service.slug && item.type === "service",
  );
  if (!currentItem) return <Redirect to="/404" />;

  return (
    <>
      <SEO
        title="Regulatory Compliance"
        description="Preparation and updating of mandatory shipboard plans and manuals: BWMP, SoPEP, SEEMP, Garbage Management Plan, Emergency Response Manuals, Polar Water Operational Manual – tailored to your vessel's configuration."
        canonical="https://www.adriaticadoo.com/services/regulatory-compliance"
      />
      <Helmet>{/* schema */}</Helmet>
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center text-sm text-primary hover:underline mb-4"
          >
            ← Back to all services
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            {service.title}
          </h1>
          <div className="max-w-none text-muted-foreground">
            <p className="text-lg font-medium text-primary italic border-l-4 border-primary pl-6 mb-6">
              Most PSC deficiencies originate from outdated or poorly structured
              documentation. We prepare and maintain vessel-specific compliance
              documentation aligned with IMO, MARPOL, and flag state
              requirements.
            </p>
            <p className="text-lg mb-6">{service.description}</p>
            <p className="text-lg font-medium text-primary mb-6 italic border-l-4 border-primary pl-6">
              We don't just fill forms; we de-risk your PSC inspections through
              proactive gap analysis and a deep understanding of IMO, MARPOL,
              and Port State Control expectations.
            </p>
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">
              Deliverables
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">
              Outcome
            </h2>
            <p>{service.outcome}</p>
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">
              References
            </h2>
            <p>{service.references}</p>
            <div className="flex justify-center my-6">
              <img
                src="/images/services/regulatory-compliance-schema.svg"
                alt="Regulatory compliance framework"
                className="w-full max-w-2xl"
                loading="lazy"
                width={672}
                height={400}
              />
            </div>
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Ballast Water Management Plan (BWMP)
                </h3>
                <p className="text-muted-foreground">
                  A comprehensive plan that describes your vessel's ballast
                  water management system, operational procedures, and
                  record‑keeping. It is prepared in accordance with the Ballast
                  Water Management Convention and your specific ballast water
                  treatment system (BWTS) or exchange method. We include
                  detailed instructions for crew, maintenance schedules, and
                  contingency measures.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A ready‑to‑use plan that passes PSC inspections and ensures
                  compliance with ballast water discharge standards.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Shipboard Oil Pollution Emergency Plan (SoPEP)
                </h3>
                <p className="text-muted-foreground">
                  An IMO‑compliant plan that outlines the actions to be taken in
                  the event of an oil spill. It includes contact lists,
                  reporting procedures, and spill response strategies tailored
                  to your vessel's specific equipment and operational area. We
                  also provide a simplified flow chart for quick reference by
                  the crew.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A clear, actionable plan that minimises response time and
                  demonstrates your preparedness to flag state and port
                  authorities.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Ship Energy Efficiency Management Plan (SEEMP)
                </h3>
                <p className="text-muted-foreground">
                  A structured plan to improve your vessel's energy efficiency,
                  covering technical and operational measures. We assist with
                  the required data collection for the IMO Data Collection
                  System (DCS) and EU MRV, and help you develop a
                  company‑specific improvement plan. The SEEMP is an essential
                  tool for managing CII ratings and reducing fuel costs.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A practical plan that not only meets regulatory requirements
                  but also drives tangible fuel savings.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Garbage Management Plan
                </h3>
                <p className="text-muted-foreground">
                  A plan that details garbage handling, segregation, storage,
                  and disposal procedures in accordance with MARPOL Annex V. It
                  includes a Garbage Record Book template and instructions for
                  crew training. We also address specific requirements for
                  special areas such as the Mediterranean.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  Clear procedures that help you avoid fines and demonstrate
                  responsible waste management.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Emergency Response Manuals
                </h3>
                <p className="text-muted-foreground">
                  Customised manuals covering emergency scenarios such as fire,
                  flooding, man overboard, and cargo spills. They are written in
                  clear, actionable language and include checklists, muster
                  lists, and communication protocols. We also provide quick
                  reference cards for each type of emergency.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A comprehensive set of response tools that empower your crew
                  to act swiftly and effectively in critical situations.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Polar Water Operational Manual (PWOM)
                </h3>
                <p className="text-muted-foreground">
                  A vessel‑specific operational manual required for navigation
                  in polar waters (Arctic and Antarctic), prepared in strict
                  compliance with the IMO Polar Code (MSC.385(94)). It documents
                  operational limitations, cold climate procedures, ice
                  management, emergency response plans, equipment inventory
                  (life-saving, communication, navigation), and crew training
                  requirements. The PWOM must be approved by the vessel's
                  classification society and endorsed by the flag state.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A fully compliant, class‑ready PWOM that enables your vessel
                  to obtain the mandatory Polar Ship Certificate and operate
                  safely in polar waters.
                </p>
              </div>
            </div>
            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Concerned about Port State Control readiness? Let's fix that.
              </p>
              <Link
                href="/request-consultation"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request Technical Assessment
              </Link>
            </div>
          </div>
          <RelatedContent currentItem={currentItem} />
        </main>
        <Footer />
      </div>
    </>
  );
}
