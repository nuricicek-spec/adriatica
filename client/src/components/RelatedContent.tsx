import { Link } from "wouter";
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { insights } from "@/data/insights";

interface RelatedContentProps {
  serviceSlugs?: string[];
  caseStudySlugs?: string[];
  insightSlugs?: string[];
}

export function RelatedContent({ serviceSlugs, caseStudySlugs, insightSlugs }: RelatedContentProps) {
  const relatedServices = serviceSlugs
    ?.map(slug => services.find(s => s.slug === slug))
    .filter(Boolean) as typeof services;

  const relatedCaseStudies = caseStudySlugs
    ?.map(slug => caseStudies.find(c => c.slug === slug))
    .filter(Boolean) as typeof caseStudies;

  const relatedInsights = insightSlugs
    ?.map(slug => insights.find(i => i.slug === slug))
    .filter(Boolean) as typeof insights;

  if (!relatedServices?.length && !relatedCaseStudies?.length && !relatedInsights?.length) {
    return null;
  }

  return (
    <div className="mt-12 border-t pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedServices && relatedServices.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Related services you can use</h3>
            <ul className="space-y-2">
              {relatedServices.map(service => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    <a className="text-primary hover:underline">{service.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {relatedCaseStudies && relatedCaseStudies.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-bold mb-4">See how we solved similar challenges</h3>
            <ul className="space-y-2">
              {relatedCaseStudies.map(cs => (
                <li key={cs.slug}>
                  <Link href={`/case-studies/${cs.slug}`}>
                    <a className="text-primary hover:underline">{cs.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {relatedInsights && relatedInsights.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Read more insights</h3>
            <ul className="space-y-2">
              {relatedInsights.map(insight => (
                <li key={insight.slug}>
                  <Link href={`/insights/${insight.slug}`}>
                    <a className="text-primary hover:underline">{insight.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}