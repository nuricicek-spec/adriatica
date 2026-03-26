import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

export default function ProjectManagement() {
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
              Full technical management of dry‑dockings, refits, and complex modifications. Acting as Owner's Technical Representative, we coordinate with shipyards, supervise works, and ensure quality control, delivering projects on schedule with complete engineering documentation.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Owner's Rep & Refit Supervision</li>
              <li>Dry‑Docking Specification & Management</li>
              <li>On‑site Technical Troubleshooting</li>
              <li>Cost & Schedule Control</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>On‑time, on‑budget project delivery with verified quality and complete as‑built records.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>Industry best practices, IACS UR Z10</p>

            {/* Detailed sections for each deliverable */}
            <div className="mt-8 space-y-6">
              <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Owner's Rep & Refit Supervision</h3>
                <p className="text-muted-foreground">
                  We act as your dedicated technical representative, present on‑site to oversee all phases of the refit. Our role includes attending daily progress meetings, reviewing contractor work, and ensuring that specifications are met. We document all activities and report back to you with transparent progress updates.
                </p>
              </div>

              <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Dry‑Docking Specification & Management</h3>
                <p className="text-muted-foreground">
                  We prepare detailed dry‑docking specifications, coordinate with shipyards, and manage the entire docking process – from block arrangement to final sea trials. Our involvement ensures that work is carried out efficiently, minimising off‑hire time and avoiding costly surprises.
                </p>
              </div>

              <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">On‑site Technical Troubleshooting</h3>
                <p className="text-muted-foreground">
                  When unexpected issues arise, our engineers are there to analyse the problem, propose solutions, and manage the necessary repairs. We bring engineering expertise to the yard, helping to resolve technical challenges quickly and without compromising safety or quality.
                </p>
              </div>

              <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Cost & Schedule Control</h3>
                <p className="text-muted-foreground">
                  We monitor project costs and schedules against the baseline plan, identifying deviations early and implementing corrective actions. Our detailed reporting gives you full visibility into budget performance and timeline status, allowing informed decisions throughout the project.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-4 border-primary text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Planning a refit or dry‑docking?
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