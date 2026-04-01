// src/data/deliverables.ts

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  category: 'Engineering' | 'Compliance' | 'Operations';
  serviceSlug: string;
  previewImage?: string; // SVG ikon yolu
}

export const deliverables: Deliverable[] = [
  // ==================== ENGINEERING ====================
  {
    id: 'structural-drawings',
    title: 'Structural Drawings',
    description: 'Complete structural steelwork drawings covering hull frames, plates, bulkheads — prepared per IACS UR Z10 and class society rules.',
    category: 'Engineering',
    serviceSlug: 'engineering-plans',
    previewImage: '/images/deliverables/drawing.svg',
  },
  {
    id: 'as-built-drawings',
    title: 'As-Built Drawing Sets',
    description: 'Post-construction documentation reflecting the actual built condition of the vessel, verified on-site.',
    category: 'Engineering',
    serviceSlug: 'engineering-plans',
    previewImage: '/images/deliverables/drawing.svg',
  },
  {
    id: 'arrangement-plans',
    title: 'Arrangement Plans',
    description: 'General arrangement, machinery arrangement, piping isometrics, and accommodation layouts with proper labelling.',
    category: 'Engineering',
    serviceSlug: 'engineering-plans',
    previewImage: '/images/deliverables/drawing.svg',
  },
  {
    id: 'fire-safety-plans',
    title: 'Fire & Safety Plans',
    description: 'SOLAS‑compliant fire control plans, emergency escape routes, and safety equipment location drawings.',
    category: 'Engineering',
    serviceSlug: 'engineering-plans',
    previewImage: '/images/deliverables/drawing.svg',
  },
  {
    id: 'as-built-pid',
    title: 'As‑Built P&ID / System Manuals',
    description: 'Complete piping and instrumentation diagrams reflecting final installed systems, with operational descriptions and troubleshooting guides.',
    category: 'Engineering',
    serviceSlug: 'engineering-documentation',
    previewImage: '/images/deliverables/document.svg',
  },
  {
    id: 'electrical-load-analysis',
    title: 'Electrical Load Analysis (EAB)',
    description: 'Detailed assessment of vessel’s electrical power balance, generator sizing, and distribution system capacity.',
    category: 'Engineering',
    serviceSlug: 'engineering-documentation',
    previewImage: '/images/deliverables/analysis.svg',
  },
  {
    id: 'fuel-management-booklet',
    title: 'Fuel Management & Quality Booklet',
    description: 'Structured guide to fuel handling, bunkering procedures, and quality control to ensure MARPOL compliance.',
    category: 'Engineering',
    serviceSlug: 'engineering-documentation',
    previewImage: '/images/deliverables/document.svg',
  },
  {
    id: 'ihm',
    title: 'Inventory of Hazardous Materials (IHM)',
    description: 'Comprehensive list of hazardous materials on board, prepared per Hong Kong Convention and EU Ship Recycling Regulation.',
    category: 'Engineering',
    serviceSlug: 'engineering-documentation',
    previewImage: '/images/deliverables/list.svg',
  },
  {
    id: 'life-extension-study',
    title: 'Structural Integrity & Life Extension Studies',
    description: 'Fatigue life analysis, stress concentration mapping, and a detailed roadmap of reinforcements with cost estimates.',
    category: 'Engineering',
    serviceSlug: 'structural-integrity',
    previewImage: '/images/deliverables/analysis.svg',
  },
  {
    id: 'hull-condition-analysis',
    title: 'Hull Condition Analysis',
    description: 'Thickness measurements, corrosion assessment, and structural audits with a "wastage plan".',
    category: 'Engineering',
    serviceSlug: 'structural-integrity',
    previewImage: '/images/deliverables/analysis.svg',
  },
  {
    id: 'vibration-diagnostic',
    title: 'Vibration & Noise Diagnostic',
    description: 'On‑board measurements to identify root causes of excessive vibration and noise, with practical mitigation measures.',
    category: 'Engineering',
    serviceSlug: 'structural-integrity',
    previewImage: '/images/deliverables/diagnostic.svg',
  },

  // ==================== COMPLIANCE ====================
  {
    id: 'biofouling-management-plan',
    title: 'Biofouling Management Plan (BFMP)',
    description: 'Vessel‑specific plan aligned with IMO MEPC.378(80), including risk assessment, cleaning methods, and record-keeping.',
    category: 'Compliance',
    serviceSlug: 'sustainable-technologies',
    previewImage: '/images/deliverables/plan.svg',
  },
  {
    id: 'coating-advisory',
    title: 'Eco‑friendly Coating Advisory',
    description: 'Selection of anti‑fouling coatings based on operational profile, trading area, and environmental regulations.',
    category: 'Compliance',
    serviceSlug: 'sustainable-technologies',
    previewImage: '/images/deliverables/advisory.svg',
  },
  {
    id: 'energy-audit',
    title: 'Energy Audit & Efficiency Surveys',
    description: 'Comprehensive assessment of energy consumption, identification of inefficiencies, and cost‑benefit analysis of retrofits.',
    category: 'Compliance',
    serviceSlug: 'sustainable-technologies',
    previewImage: '/images/deliverables/analysis.svg',
  },
  {
    id: 'mrv-monitoring-plan',
    title: 'MRV Monitoring Plan',
    description: 'Plan for Monitoring, Reporting, and Verification in full compliance with EU Regulation 2015/757.',
    category: 'Compliance',
    serviceSlug: 'sustainable-technologies',
    previewImage: '/images/deliverables/plan.svg',
  },
  {
    id: 'bwmp',
    title: 'Ballast Water Management Plan (BWMP)',
    description: 'Plan describing ballast water management system, operational procedures, and record-keeping.',
    category: 'Compliance',
    serviceSlug: 'regulatory-compliance',
    previewImage: '/images/deliverables/plan.svg',
  },
  {
    id: 'sopep',
    title: 'Shipboard Oil Pollution Emergency Plan (SoPEP)',
    description: 'IMO‑compliant plan outlining actions in the event of an oil spill, with contact lists and response strategies.',
    category: 'Compliance',
    serviceSlug: 'regulatory-compliance',
    previewImage: '/images/deliverables/plan.svg',
  },
  {
    id: 'seemp',
    title: 'Ship Energy Efficiency Management Plan (SEEMP)',
    description: 'Structured plan to improve energy efficiency, supporting IMO DCS and EU MRV requirements.',
    category: 'Compliance',
    serviceSlug: 'regulatory-compliance',
    previewImage: '/images/deliverables/plan.svg',
  },
  {
    id: 'garbage-management-plan',
    title: 'Garbage Management Plan',
    description: 'Procedures for garbage handling, segregation, storage, and disposal in accordance with MARPOL Annex V.',
    category: 'Compliance',
    serviceSlug: 'regulatory-compliance',
    previewImage: '/images/deliverables/plan.svg',
  },
  {
    id: 'emergency-response-manuals',
    title: 'Emergency Response Manuals',
    description: 'Customised manuals covering fire, flooding, man overboard, and cargo spills with checklists and communication protocols.',
    category: 'Compliance',
    serviceSlug: 'regulatory-compliance',
    previewImage: '/images/deliverables/document.svg',
  },

  // ==================== OPERATIONS ====================
  {
    id: 'refit-supervision',
    title: 'Owner’s Rep & Refit Supervision',
    description: 'On‑site technical representation, daily progress meetings, and quality control during refits.',
    category: 'Operations',
    serviceSlug: 'project-management',
    previewImage: '/images/deliverables/supervision.svg',
  },
  {
    id: 'dry-docking-spec',
    title: 'Dry‑Docking Specification & Management',
    description: 'Detailed specifications, tender management, and critical path oversight to minimise off‑hire time.',
    category: 'Operations',
    serviceSlug: 'project-management',
    previewImage: '/images/deliverables/specification.svg',
  },
  {
    id: 'onsite-troubleshooting',
    title: 'On‑site Technical Troubleshooting',
    description: 'Immediate engineering support for unexpected issues, including structural damage, machinery malfunctions, or installation problems.',
    category: 'Operations',
    serviceSlug: 'project-management',
    previewImage: '/images/deliverables/troubleshooting.svg',
  },
  {
    id: 'cost-schedule-control',
    title: 'Cost & Schedule Control',
    description: 'Continuous monitoring of budget and timeline, deviation identification, and change order management.',
    category: 'Operations',
    serviceSlug: 'project-management',
    previewImage: '/images/deliverables/control.svg',
  },
];