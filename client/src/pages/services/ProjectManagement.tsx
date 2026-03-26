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