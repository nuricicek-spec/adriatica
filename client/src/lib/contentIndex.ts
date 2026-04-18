// src/lib/contentIndex.ts
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { insights } from "@/data/insights";
import { extractTags } from "./extractTags";
import type { ContentItem } from "@/types/content";

function cleanHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ");
}

function getServiceText(service: (typeof services)[0]): string {
  return `${service.title} ${service.description} ${service.deliverables.join(" ")} ${service.outcome}`;
}

function getCaseStudyText(cs: (typeof caseStudies)[0]): string {
  return `${cs.title} ${cs.challenge} ${cs.solution} ${cs.result}`;
}

function getInsightText(insight: (typeof insights)[0]): string {
  return `${insight.title} ${insight.description} ${cleanHtml(insight.contentHtml)}`;
}

export const allContent: ContentItem[] = [
  ...services.map((service) => ({
    ...service,
    type: "service" as const,
    tags: extractTags(getServiceText(service)),
  })),
  ...caseStudies.map((cs) => ({
    ...cs,
    type: "case-study" as const,
    description: cs.challenge.substring(0, 160),
    tags: extractTags(getCaseStudyText(cs)),
  })),
  ...insights.map((insight) => ({
    ...insight,
    type: "insight" as const,
    tags: extractTags(getInsightText(insight)),
  })),
];
