import { Link } from "wouter";
import { getRelatedContent } from "@/lib/recommendationEngine";
import type { ContentItem } from "@/types/content";

interface RelatedContentProps {
  currentItem: ContentItem;
}

export function RelatedContent({ currentItem }: RelatedContentProps) {
  const related = getRelatedContent(currentItem, 4);

  if (related.length === 0) return null;

  const services = related.filter((r) => r.type === "service");
  const caseStudies = related.filter((r) => r.type === "case-study");
  const insights = related.filter((r) => r.type === "insight");

  return (
    <div className="mt-12 border-t pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              Related services you can use
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    <a className="text-primary hover:underline">
                      {service.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {caseStudies.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              See how we solved similar challenges
            </h3>
            <ul className="space-y-2">
              {caseStudies.map((cs) => (
                <li key={cs.slug}>
                  <Link href={`/case-studies/${cs.slug}`}>
                    <a className="text-primary hover:underline">{cs.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {insights.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              Read more insights
            </h3>
            <ul className="space-y-2">
              {insights.map((insight) => (
                <li key={insight.slug}>
                  <Link href={`/insights/${insight.slug}`}>
                    <a className="text-primary hover:underline">
                      {insight.title}
                    </a>
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
