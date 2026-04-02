import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";
import { useRoute } from "wouter";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";

export default function ProjectManagement() {
  const [match] = useRoute("/services/project-management");
  const service = services.find(s => s.slug === "project-management");

  return (
    <>
      <SEO
        title="Project Management & Owner’s Representation"
        description="Full technical management of dry‑dockings, refits, and modifications. Acting as Owner’s Technical Representative to supervise yard works, ensure quality, and deliver on schedule."
        canonical="https://www.adriaticadoo.me/services/project-management"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Project Management & Owner’s Representation
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              You get full technical management of dry‑dockings, refits, and complex modifications. As your Owner's Technical Representative, we coordinate with shipyards, supervise works, and ensure quality control – delivering your project on schedule with complete engineering documentation.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Owner's Rep & Refit Supervision</li>
              <li>Dry‑Docking Specification & Management</li>
              <li>On‑site Technical Troubleshooting</li>
              <li>Cost & Schedule Control</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>You receive on‑time, on‑budget project delivery with verified quality and complete as‑built records.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>Industry best practices, IACS UR Z10</p>

            {/* SVG Şeması – 4 aşamalı proje akışı */}
            <div className="flex justify-center my-6">
              <img
                src="/images/services/project-management-schema.svg"
                alt="Project management 4-phase process: brief, planning, execution, documentation"
                className="w-full max-w-2xl mx-auto"
                loading="lazy"
              />
            </div>

            {/* Detailed sections – enhanced depth */}
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Owner's Rep & Refit Supervision</h3>
                <p className="text-muted-foreground">
                  We act as your dedicated technical representative, present on‑site to oversee all phases of the refit. Our role includes attending daily progress meetings, reviewing contractor work, and ensuring that specifications are met. We document all activities, flag deviations, and provide you with daily or weekly reports. Our presence ensures your interests are protected throughout the project.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A fully managed refit with transparent communication, quality assurance, and no surprises.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Dry‑Docking Specification & Management</h3>
                <p className="text-muted-foreground">
                  We prepare detailed dry‑docking specifications that clearly define the scope of work, acceptance criteria, and responsibilities. We then coordinate with shipyards, manage the tender process, and assist in contract negotiations. During the docking, we oversee the work, verify block arrangements, and manage the critical path to minimise your vessel’s off‑hire time.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A well‑planned, efficiently executed dry‑docking that returns your vessel to service on time.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">On‑site Technical Troubleshooting</h3>
                <p className="text-muted-foreground">
                  When unexpected issues arise – such as hidden structural damage, machinery malfunctions, or installation problems – our engineers are there to analyse the problem, propose solutions, and manage the necessary repairs. We bring engineering expertise to the yard, helping to resolve technical challenges quickly without compromising safety or quality.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Swift, informed decision‑making that keeps your project on track.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Cost & Schedule Control</h3>
                <p className="text-muted-foreground">
                  We monitor project costs and schedules against the baseline plan, identifying deviations early and implementing corrective actions. Our detailed reporting gives you full visibility into budget performance and timeline status, allowing informed decisions throughout the project. We also manage change orders and ensure that any additional work is properly justified and documented.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Predictable outcomes with no cost overruns or schedule slippages.
                </p>
              </div>
            </div>

            {/* Yacht Survey Services – yeni blok (Cost & Schedule Control altına eklendi) */}
            <div className="mt-12 p-8 bg-neutral-50 border-l-4 border-primary rounded-sm">
              <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-3">
                Yacht Survey & Inspection
              </h3>
              <p className="text-muted-foreground mb-4">
                In addition to project management, we offer independent technical surveys for yachts: pre-purchase, damage assessment, insurance valuation, charter inspection, and off-hire surveys. All reports are IACS‑aligned and accepted by class societies and insurers.
              </p>
              <HashLink
                href="/services/yacht-survey"
                className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
              >
                Learn more about our yacht survey services →
              </HashLink>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Planning a refit or dry‑docking? Let’s talk.
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request Technical Assessment
              </HashLink>
            </div>
          </div>

          {service && (
            <RelatedContent
              serviceSlugs={service.relatedServices}
              caseStudySlugs={service.relatedCaseStudies}
              insightSlugs={service.relatedInsights}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}