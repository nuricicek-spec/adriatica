import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { useRoute, Link } from "wouter";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";

export default function EngineeringPlans() {
  const [match] = useRoute("/services/engineering-plans");
  const service = services.find(s => s.slug === "engineering-plans");

  if (!service) return <div>Service not found</div>;

  return (
    <>
      <SEO
        title={`${service.title} | Adriatica D.O.O.`}
        description={service.description}
        canonical={`https://www.adriaticadoo.me/services/${service.slug}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@type": "Organization", name: "Adriatica D.O.O." },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-4">
            <Link href="/services" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              ← Back to all services
            </Link>
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">{service.title}</h1>
          <p className="text-muted-foreground text-lg mb-6">{service.description}</p>

          <h2 className="text-2xl font-display font-bold mt-8 mb-4">Deliverables</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {service.deliverables.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-display font-bold mt-8 mb-4">Outcome</h2>
          <p className="text-muted-foreground">{service.outcome}</p>

          <h2 className="text-2xl font-display font-bold mt-8 mb-4">References</h2>
          <p className="text-muted-foreground italic">{service.references}</p>

          <RelatedContent
            serviceSlugs={[]}
            caseStudySlugs={service.relatedCaseStudies}
            insightSlugs={service.relatedInsights}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}