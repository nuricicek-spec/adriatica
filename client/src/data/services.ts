export interface Service {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  outcome: string;
  references: string;
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
}

export const services: Service[] = [
  {
    slug: "engineering-plans",
    title: "Engineering Plans",
    description: "Detailed engineering drawings and plan sets for new constructions, conversions, and refits. We produce documentation in accordance with classification society rules and flag state requirements, supporting both regulatory approval and operational safety. Our deliverables are suitable for yachts, commercial vessels, and fishing boats.",
    deliverables: [
      "Structural Drawings",
      "As‑Built Drawing Sets",
      "Arrangement Plans",
      "Fire & Safety Plans",
      "General Arrangement (optional)",
    ],
    outcome: "Class‑approved plan sets, reduced approval delays, and a clear basis for construction or modification.",
    references: "Class society rules (RINA, BV, DNV), flag state regulations",
    relatedCaseStudies: ["refit-supervision-shipyard"],
    relatedInsights: ["technical-operations-montenegro"], // Değiştirildi (daha ilgili)
  },
  {
    slug: "engineering-documentation",
    title: "Engineering Documentation",
    description: "Development of vessel‑specific technical manuals and analyses, ensuring completeness and alignment with IMO conventions, EU MRV, and class requirements. We prepare documents to facilitate crew training, maintenance planning, and port state control inspections.",
    deliverables: [
      "As‑Built P&ID / System Manuals",
      "Electrical Load Analysis (EAB)",
      "Fuel Management & Quality Booklet",
      "Inventory of Hazardous Materials (IHM)",
    ],
    outcome: "Audit‑ready documentation, improved crew familiarity, and smoother port state control inspections.",
    references: "IMO, EU MRV, MARPOL",
    relatedCaseStudies: ["refit-supervision-shipyard"], // Aynı case study (refit sırasında dokümantasyon önemli)
    relatedInsights: ["technical-operations-montenegro"], // Aynı insight (yerel operasyonlar ve dokümantasyon)
  },
  {
    slug: "structural-integrity",
    title: "Structural Integrity",
    description: "Comprehensive hull condition assessments, life extension studies, modification consultancy, and vibration/noise diagnostics. Using advanced engineering methods and IACS unified requirements, we evaluate structural performance and recommend targeted repairs or reinforcements.",
    deliverables: [
      "Structural Integrity & Life Extension Studies",
      "Hull Condition Analysis",
      "Modification Consultancy",
      "Vibration & Noise Diagnostic",
    ],
    outcome: "Clear repair priorities, extended operational life, and classification society acceptance.",
    references: "IACS UR Z10, classification societies",
    relatedCaseStudies: ["refit-supervision-shipyard"], // Aynı case study (refit sırasında yapısal denetim)
    relatedInsights: ["technical-operations-montenegro"], // Aynı insight (yerel operasyonlar, tersane süreçleri)
  },
  {
    slug: "sustainable-technologies",
    title: "Sustainable Technologies & Compliance",
    description: "Advisory and planning services to help vessels meet environmental regulations while improving efficiency. We work with operators to implement practical, cost‑effective solutions that reduce emissions and biosecurity risks.",
    deliverables: [
      "Biofouling Management Plan (IMO MEPC.378(80))",
      "Eco‑friendly Coating Advisory",
      "Energy Audit & Efficiency Surveys",
      "MRV Monitoring Plan (EU MRV Regulation)",
    ],
    outcome: "IMO‑compliant plans, reduced fuel consumption, and lower environmental risk.",
    references: "IMO, EU MRV, Paris MoU",
    relatedCaseStudies: ["biofouling-management-mediterranean", "managed-in-water-cleaning"],
    relatedInsights: ["biofouling-compliance-imo-2026", "sustainable-in-water-cleaning-yacht"],
  },
  {
    slug: "regulatory-compliance",
    title: "Regulatory Compliance",
    description: "Preparation and periodic updating of mandatory shipboard plans and manuals, tailored to the vessel's configuration and operational profile. We ensure documents meet the latest IMO, MARPOL, and flag state requirements.",
    deliverables: [
      "Ballast Water Management Plan (BWMP)",
      "Shipboard Oil Pollution Emergency Plan (SoPEP)",
      "Ship Energy Efficiency Management Plan (SEEMP)",
      "Garbage Management Plan",
      "Emergency Response Manuals",
    ],
    outcome: "PSC‑ready documentation, reduced inspection risk, and full compliance with current regulations.",
    references: "IMO, MARPOL, flag state administrations",
    relatedCaseStudies: [], // Doğrudan bir case study yok (ancak biofouling case study'leri ile ilgili olabilir, ancak zorlama olmasın)
    relatedInsights: ["biofouling-compliance-imo-2026"], // IMO 2026 uyumu ile bağlantılı
  },
  {
    slug: "project-management",
    title: "Project Management & Owner's Representation",
    description: "Full technical management of dry‑dockings, refits, and complex modifications. Acting as Owner's Technical Representative, we coordinate with shipyards, supervise works, and ensure quality control, delivering projects on schedule with complete engineering documentation.",
    deliverables: [
      "Owner's Rep & Refit Supervision",
      "Dry‑Docking Specification & Management",
      "On‑site Technical Troubleshooting",
      "Cost & Schedule Control",
    ],
    outcome: "On‑time, on‑budget project delivery with verified quality and complete as‑built records.",
    references: "Industry best practices, IACS UR Z10",
    relatedCaseStudies: ["refit-supervision-shipyard"],
    relatedInsights: ["technical-operations-montenegro"], // Yerel operasyonlar ve tersane yönetimi ile ilgili
  },
];