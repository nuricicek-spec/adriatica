import { services } from '@/data/services';
import { caseStudies } from '@/data/caseStudies';
import { insights } from '@/data/insights';
import { extractTags } from './extractTags';
import type { ContentItem } from '@/types/content';

function cleanHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ');
}

function getServiceText(service: typeof services[0]): string {
  return `${service.title} ${service.description} ${service.deliverables.join(' ')} ${service.outcome}`;
}

function getCaseStudyText(cs: typeof caseStudies[0]): string {
  return `${cs.title} ${cs.challenge} ${cs.solution} ${cs.result}`;
}

function getInsightText(insight: typeof insights[0]): string {
  return `${insight.title} ${insight.description} ${cleanHtml(insight.contentHtml)}`;
}

export const allContent: ContentItem[] = [
  ...services.map(service => ({
    slug: service.slug,
    type: 'service' as const,
    title: service.title,
    description: service.description,
    tags: extractTags(getServiceText(service)),
    ...service
  })),
  ...caseStudies.map(cs => ({
    slug: cs.slug,
    type: 'case-study' as const,
    title: cs.title,
    description: cs.challenge.substring(0, 160),
    tags: extractTags(getCaseStudyText(cs)),
    ...cs
  })),
  ...insights.map(insight => ({
    slug: insight.slug,
    type: 'insight' as const,
    title: insight.title,
    description: insight.description,
    tags: extractTags(getInsightText(insight)),
    ...insight
  }))
];