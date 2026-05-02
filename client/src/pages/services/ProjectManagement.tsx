import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";
import { Link, Redirect } from "wouter";
import { allContent } from "@/lib/contentIndex";

export default function ProjectManagement() {
  const service = services.find((s) => s.slug === "project-management");
  if (!service) return <Redirect to="/404" />;

  const currentItem = allContent.find(
    (item) => item.slug === service.slug && item.type === "service",
  );
  if (!currentItem) return <Redirect to="/404" />;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.adriaticadoo.com/#organization",
        name: "Adriatica D.O.O.",
        url: "https://www.adriaticadoo.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.adriaticadoo.com/logo.svg",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        url: "https://www.adriaticadoo.com/",
        name: "Adriatica D.O.O.",
        description:
          "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        inLanguage: "en",
        publisher: { "@id": "https://www.adriaticadoo.com/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.adriaticadoo.com/services/project-management/#webpage",
        url: "https://www.adriaticadoo.com/services/project-management",
        name: "Project Management & Owner's Representation | Adriatica D.O.O.",
        description:
          "Technical management of dry-dockings and refits as Owner's Technical Representative. Yard supervision, quality control and on-schedule delivery.",
        isPartOf: { "@id": "https://www.adriaticadoo.com/#website" },
        about: { "@id": "https://www.adriaticadoo.com/#organization" },
        inLanguage: "en",
        datePublished: "2025-01-01",
        dateModified: "2025-03-15",
      },
      {
        "@type": "Service",
        "@id": "https://www.adriaticadoo.com/services/project-management/#service",
        name: "Project Management & Owner's Representation",
        description:
          "Full technical management of dry-dockings, refits, and complex modifications. Acting as Owner's Technical Representative to coordinate shipyards, supervise works, and deliver on schedule with complete engineering documentation.",
        url: "https://www.adriaticadoo.com/services/project-management",
        provider: { "@id": "https://www.adriaticadoo.com/#organization" },
        isPartOf: {
          "@id": "https://www.adriaticadoo.com/services/project-management/#webpage",
        },
        areaServed: [
          { "@type": "Place", name: "Montenegro" },
          { "@type": "Place", name: "Adriatic Sea" },
          { "@type": "Place", name: "Mediterranean Sea" },
          { "@type": "Place", name: "Europe" },
        ],
        serviceType: "Marine Project Management",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Project Management Deliverables",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Owner's Rep & Refit Supervision",
                description:
                  "On-site technical representation overseeing all refit phases, attending progress meetings, and ensuring specifications are met.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Dry-Docking Specification & Management",
                description:
                  "Detailed dry-docking specifications, shipyard coordination, tender management, and critical path oversight.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "On-site Technical Troubleshooting",
                description:
                  "Engineering analysis and management of unexpected structural, machinery, or installation issues during yard periods.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Cost & Schedule Control",
                description:
                  "Budget and timeline monitoring against baseline plan, change order management, and detailed progress reporting.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      {/* Description: 144 karakter — limit içinde */}
      <SEO
        title="Project Management & Owner's Representation"
        description="Technical management of dry-dockings and refits as Owner's Technical Representative. Yard supervision, quality control and on-schedule delivery."
        canonical="https://www.adriaticadoo.com/services/project-management"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema).replace(/</g, "\\u003c")}
        </script>
      </Helmet>
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
              Unmanaged yard periods are the single largest source of budget
              overruns and schedule delays for vessel owners. As your dedicated
              Owner's Representative, we bridge the gap between shipyard
              capabilities and owner expectations — ensuring work is done right,
              on time, and without costly surprises.
            </p>
            <p className="text-lg mb-6">{service.description}</p>
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
                src="/images/services/project-management-schema.svg"
                alt="Project management lifecycle"
                className="w-full max-w-2xl"
                loading="lazy"
                width={672}
                height={400}
              />
            </div>
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Owner's Rep &amp; Refit Supervision
                </h3>
                <p className="text-muted-foreground">
                  We act as your dedicated technical representative, present
                  on‑site to oversee all phases of the refit. Our role includes
                  attending daily progress meetings, reviewing contractor work,
                  and ensuring that specifications are met. We document all
                  activities, flag deviations, and provide you with daily or
                  weekly reports. Our presence ensures your interests are
                  protected throughout the project.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A fully managed refit with transparent communication, quality
                  assurance, and no surprises.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Dry‑Docking Specification &amp; Management
                </h3>
                <p className="text-muted-foreground">
                  We prepare detailed dry‑docking specifications that clearly
                  define the scope of work, acceptance criteria, and
                  responsibilities. We then coordinate with shipyards, manage
                  the tender process, and assist in contract negotiations.
                  During the docking, we oversee the work, verify block
                  arrangements, and manage the critical path to minimise your
                  vessel's off‑hire time.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A well‑planned, efficiently executed dry‑docking that returns
                  your vessel to service on time.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  On‑site Technical Troubleshooting
                </h3>
                <p className="text-muted-foreground">
                  When unexpected issues arise – such as hidden structural
                  damage, machinery malfunctions, or installation problems – our
                  engineers are there to analyse the problem, propose solutions,
                  and manage the necessary repairs. We bring engineering
                  expertise to the yard, helping to resolve technical challenges
                  quickly without compromising safety or quality.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  Swift, informed decision‑making that keeps your project on
                  track.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Cost &amp; Schedule Control
                </h3>
                <p className="text-muted-foreground">
                  We monitor project costs and schedules against the baseline
                  plan, identifying deviations early and implementing corrective
                  actions. Our detailed reporting gives you full visibility into
                  budget performance and timeline status, allowing informed
                  decisions throughout the project. We also manage change orders
                  and ensure that any additional work is properly justified and
                  documented.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  Predictable outcomes with no cost overruns or schedule
                  slippages.
                </p>
              </div>
            </div>
            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm">
              <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-3">
                Yacht Survey &amp; Inspection
              </h3>
              <p className="text-muted-foreground mb-4">
                In addition to project management, we offer independent
                technical surveys for yachts: pre-purchase, damage assessment,
                insurance valuation, charter inspection, and off-hire surveys.
                All reports are IACS‑aligned and accepted by class societies and
                insurers.
              </p>
              <Link
                href="/services/yacht-survey"
                className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
              >
                Learn more about our yacht survey services →
              </Link>
            </div>
            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Planning a refit or dry‑docking? Let's talk.
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