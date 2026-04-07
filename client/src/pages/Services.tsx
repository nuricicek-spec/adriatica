import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import ProcessWheel from "@/components/ProcessWheel";
import { HashLink } from "@/components/HashLink";

// ─── Organisation-level structured data ──────────────────────────────────────
const organizationData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Adriatica D.O.O.",
  "image": "https://www.adriaticadoo.com/og-image-default.png",
  "url": "https://www.adriaticadoo.com",
  "taxID": "03612807",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Budva",
    "addressCountry": "ME",
  },
  "serviceType": [
    "Marine Engineering",
    "Regulatory Compliance",
    "MRV Reporting",
    "Biofouling Management",
    "Structural Integrity",
  ],
  "description": "Marine engineering consultancy specializing in EU MRV, IMO DCS, and Biofouling compliance.",
  "areaServed": [
    "Bar", "Budva", "Kotor", "Tivat",
    "Montenegro", "Adriatic Coast", "Europe",
  ],
};

// ─── Service data ─────────────────────────────────────────────────────────────
const services = [
  {
    title: "Engineering Plans",
    slug: "engineering-plans",
    description:
      "You get detailed engineering drawings and plan sets for new constructions, conversions, and refits. All documentation is produced in accordance with classification society rules and flag state requirements – supporting your regulatory approval and operational safety. Our deliverables suit yachts, commercial vessels, and fishing boats.",
    deliverables: [
      "Structural Drawings",
      "As‑Built Drawing Sets",
      "Arrangement Plans",
      "Fire & Safety Plans",
      "General Arrangement (optional)",
    ],
    outcome: "Class‑approved plan sets, reduced approval delays, and a clear basis for construction or modification.",
    references: "Class society rules (RINA, BV, DNV), flag state regulations",
  },
  {
    title: "Engineering Documentation",
    slug: "engineering-documentation",
    description:
      "You receive vessel‑specific technical manuals and analyses, fully aligned with IMO conventions, EU MRV, and class requirements. These documents facilitate crew training, maintenance planning, and port state control inspections – keeping you audit‑ready.",
    deliverables: [
      "As‑Built P&ID / System Manuals",
      "Electrical Load Analysis (EAB)",
      "Fuel Management & Quality Booklet",
      "Inventory of Hazardous Materials (IHM)",
    ],
    outcome: "Audit‑ready documentation, improved crew familiarity, and smoother port state control inspections.",
    references: "IMO, EU MRV, MARPOL",
  },
  {
    title: "Structural Integrity",
    slug: "structural-integrity",
    description:
      "Your vessel benefits from comprehensive hull condition assessments, life extension studies, modification consultancy, and vibration/noise diagnostics. Using advanced engineering methods and IACS unified requirements, we evaluate structural performance and recommend targeted repairs or reinforcements.",
    deliverables: [
      "Structural Integrity & Life Extension Studies",
      "Hull Condition Analysis",
      "Modification Consultancy",
      "Vibration & Noise Diagnostic",
    ],
    outcome: "Clear repair priorities, extended operational life, and classification society acceptance.",
    references: "IACS UR Z10, classification societies",
  },
  {
    title: "Sustainable Technologies & Compliance",
    slug: "sustainable-technologies",
    description:
      "Advisory and planning services that help your vessel meet environmental regulations while improving efficiency. We work with you to implement practical, cost‑effective solutions that reduce emissions and biosecurity risks – giving you peace of mind.",
    deliverables: [
      "Biofouling Management Plan (IMO MEPC.378(80))",
      "Eco‑friendly Coating Advisory",
      "Energy Audit & Efficiency Surveys",
      "MRV Monitoring Plan (EU MRV Regulation)",
    ],
    outcome: "IMO‑compliant plans, reduced fuel consumption, and lower environmental risk.",
    references: "IMO, EU MRV, Paris MoU",
  },
  {
    title: "Regulatory Compliance",
    slug: "regulatory-compliance",
    description:
      "You get preparation and periodic updating of mandatory shipboard plans and manuals, tailored to your vessel's configuration and operational profile. All documents meet the latest IMO, MARPOL, and flag state requirements – so you stay ahead of inspections.",
    deliverables: [
      "Ballast Water Management Plan (BWMP)",
      "Shipboard Oil Pollution Emergency Plan (SoPEP)",
      "Ship Energy Efficiency Management Plan (SEEMP)",
      "Garbage Management Plan",
      "Emergency Response Manuals",
    ],
    outcome: "PSC‑ready documentation, reduced inspection risk, and full compliance with current regulations.",
    references: "IMO, MARPOL, flag state administrations",
  },
  {
    title: "Project Management & Owner's Representation",
    slug: "project-management",
    description:
      "Full technical management of dry‑dockings, refits, and complex modifications. As your Owner's Technical Representative, we coordinate with shipyards, supervise works, and ensure quality control – delivering your project on schedule with complete engineering documentation.",
    deliverables: [
      "Owner's Rep & Refit Supervision",
      "Dry‑Docking Specification & Management",
      "On‑site Technical Troubleshooting",
      "Cost & Schedule Control",
      "Yacht Survey & Inspection",
    ],
    outcome: "On‑time, on‑budget project delivery with verified quality and complete as‑built records.",
    references: "Industry best practices, IACS UR Z10",
  },
];

type Service = typeof services[number];

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="border-l-2 border-primary/20 pl-6 py-2">
      <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-2">
        {service.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-3">
        {service.description}
      </p>
      <ul className="list-disc pl-5 mb-2 text-muted-foreground space-y-1 text-sm">
        {service.deliverables.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p className="text-sm text-primary font-medium mt-3">
        Outcome: {service.outcome}
      </p>
      <p className="text-sm text-primary/70 font-mono mt-1 italic">
        References: {service.references}
      </p>
      <div className="mt-3">
        <HashLink
          href={`/services/${service.slug}`}
          className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
        >
          Learn more →
        </HashLink>
      </div>
    </div>
  );
}

// ─── Diagram A: Structural Life‑Cycle Timeline ───────────────────────────────
function StructuralTimelineDiagram() {
  const milestones = [
    { year: "Yr 0",   label: "Newbuild /\nBaseline Survey",  sub: "Initial condition\nestablished" },
    { year: "Yr 2.5", label: "Intermediate\nSurvey",         sub: "Hull & coating\ncondition check" },
    { year: "Yr 5",   label: "Special Survey\n(1st)",         sub: "Class renewal,\nfull inspection" },
    { year: "Yr 10",  label: "Special Survey\n(2nd)",         sub: "Structural assessment\n& repair scope" },
    { year: "Yr 15+", label: "Life Extension\nStudy",         sub: "Integrity analysis,\nclass acceptance" },
  ];

  const W         = 500;
  const H         = 230;
  const lineY     = 130;
  const startX    = 52;
  const endX      = W - 52;
  const step      = (endX - startX) / (milestones.length - 1);
  const nodeR     = 10;
  const accentCol = "#3A74A0";
  const navyCol   = "#0B3B5C";
  const muteCol   = "#8FA8BC";

  return (
    <div className="border-l-2 border-primary/20 pl-6 py-2 flex flex-col justify-between h-full">
      <div>
        <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-2">
          Structural Life‑Cycle Milestones
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
          Structural integrity management is a continuous process. Key intervention
          points align with class survey schedules — allowing targeted assessment,
          repair, and life extension decisions at each milestone.
        </p>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        aria-label="Structural Life-Cycle Inspection Timeline"
      >
        <line
          x1={startX} y1={lineY} x2={endX} y2={lineY}
          stroke={accentCol} strokeWidth="2" strokeLinecap="round"
        />

        {milestones.map((m, i) => {
          const x          = startX + i * step;
          const isLast     = i === milestones.length - 1;
          const above      = i % 2 === 0;
          const labelY     = above ? lineY - 34 : lineY + 28;
          const subY       = above ? lineY - 68 : lineY + 56;
          const labelLines = m.label.split("\n");
          const subLines   = m.sub.split("\n");

          return (
            <g key={i}>
              <line
                x1={x} y1={above ? lineY - nodeR : lineY + nodeR}
                x2={x} y2={above ? labelY + 14 : lineY + nodeR + 8}
                stroke={accentCol} strokeWidth="1.5" strokeDasharray="3 2"
              />
              <circle
                cx={x} cy={lineY} r={nodeR}
                fill={isLast ? navyCol : accentCol}
                stroke="white" strokeWidth="2"
              />
              <text
                x={x} y={lineY + 1}
                textAnchor="middle" dominantBaseline="middle"
                fill="white"
                fontFamily="var(--font-body, 'Inter', sans-serif)"
                fontSize="6" fontWeight="700"
              >
                {m.year}
              </text>
              {labelLines.map((line, li) => (
                <text
                  key={li}
                  x={x} y={labelY + li * 13}
                  textAnchor="middle"
                  fill={navyCol}
                  fontFamily="var(--font-display, 'Playfair Display', serif)"
                  fontSize="9.5" fontWeight="600"
                >
                  {line}
                </text>
              ))}
              {subLines.map((line, li) => (
                <text
                  key={li}
                  x={x} y={subY + li * 11}
                  textAnchor="middle"
                  fill={muteCol}
                  fontFamily="var(--font-body, 'Inter', sans-serif)"
                  fontSize="7.5" fontWeight="400"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        <polygon
          points={`${endX - 22},${lineY} ${endX - 32},${lineY - 5} ${endX - 32},${lineY + 5}`}
          fill={accentCol}
        />
        <text
          x={W / 2} y={H - 6}
          textAnchor="middle"
          fill={muteCol}
          fontFamily="var(--font-body, 'Inter', sans-serif)"
          fontSize="7" fontStyle="italic"
        >
          Intervention points aligned with IACS UR Z10 & class survey schedules
        </text>
      </svg>
    </div>
  );
}

// ─── Diagram B: Operating Model Venn ─────────────────────────────────────────
function OperatingModelDiagram() {
  const CX    = 200;
  const CY    = 190;
  const R     = 90;
  const OFF   = 48;
  const SQRT3 = Math.sqrt(3);

  // label/labelDy alanları kaldırıldı — render'da kullanılmıyordu
  const circles = [
    { cx: CX,                  cy: CY - OFF         },
    { cx: CX - OFF * SQRT3 / 2, cy: CY + OFF / 2    },
    { cx: CX + OFF * SQRT3 / 2, cy: CY + OFF / 2    },
  ];

  const navyCol   = "#0B3B5C";
  const muteCol   = "#6B8FA8";
  const fillCol   = "rgba(58,116,160,0.10)";
  const strokeCol = "#3A74A0";

  const intersections = [
    { x: CX - 34,  y: CY - 28,           text: "Technical\nCompliance" },
    { x: CX + 34,  y: CY - 28,           text: "Regulatory\nOversight" },
    { x: CX,       y: CY + OFF / 2 + 14, text: "Execution\nControl"   },
  ];

  return (
    <div className="border-l-2 border-primary/20 pl-6 py-2 flex flex-col justify-between h-full">
      <div>
        <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-2">
          Our Operating Model
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
          Engineering, compliance, and operations work as one integrated system —
          delivering engineering‑led solutions from concept to completion, with no
          gaps between disciplines.
        </p>
      </div>

      <svg
        viewBox="0 0 400 340"
        className="w-full h-auto"
        aria-label="Adriatica Operating Model – Engineering, Compliance, Operations"
      >
        {circles.map((c, i) => (
          <circle
            key={i}
            cx={c.cx} cy={c.cy} r={R}
            fill={fillCol}
            stroke={strokeCol} strokeWidth="1.5"
          />
        ))}

        {/* Engineering — top */}
        <text
          x={CX} y={CY - OFF - R + 18}
          textAnchor="middle" fill={navyCol}
          fontFamily="var(--font-display, 'Playfair Display', serif)"
          fontSize="13" fontWeight="600"
        >
          Engineering
        </text>

        {/* Compliance — bottom left */}
        <text
          x={CX - OFF * SQRT3 / 2 - R + 18} y={CY + OFF / 2 + R - 12}
          textAnchor="middle" fill={navyCol}
          fontFamily="var(--font-display, 'Playfair Display', serif)"
          fontSize="13" fontWeight="600"
        >
          Compliance
        </text>

        {/* Operations — bottom right */}
        <text
          x={CX + OFF * SQRT3 / 2 + R - 18} y={CY + OFF / 2 + R - 12}
          textAnchor="middle" fill={navyCol}
          fontFamily="var(--font-display, 'Playfair Display', serif)"
          fontSize="13" fontWeight="600"
        >
          Operations
        </text>

        {intersections.map((n, i) => {
          const lines = n.text.split("\n");
          return (
            <text
              key={i}
              x={n.x} y={n.y}
              textAnchor="middle" fill={muteCol}
              fontFamily="var(--font-body, 'Inter', sans-serif)"
              fontSize="8" fontWeight="500"
            >
              {lines.map((line, li) => (
                <tspan key={li} x={n.x} dy={li === 0 ? 0 : 11}>{line}</tspan>
              ))}
            </text>
          );
        })}

        {/* Centre label */}
        <text
          x={CX} y={CY + 4}
          textAnchor="middle" fill={navyCol}
          fontFamily="var(--font-display, 'Playfair Display', serif)"
          fontSize="12" fontWeight="700"
        >
          <tspan x={CX} dy="-8">Integrated</tspan>
          <tspan x={CX} dy="18">Management</tspan>
        </text>

        <text
          x={CX} y={330}
          textAnchor="middle" fill={muteCol}
          fontFamily="var(--font-body, 'Inter', sans-serif)"
          fontSize="8" fontStyle="italic"
        >
          One point of contact across all three disciplines
        </text>
      </svg>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Adriatica D.O.O. provides marine engineering services: engineering plans, documentation, structural integrity, sustainable technologies, regulatory compliance, and project management for all vessel types."
        canonical="https://www.adriaticadoo.com/services"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

          <SectionHeading
            title="Engineering Services"
            subtitle="Marine Engineering & Consultancy"
          />

          <ProcessWheel />

          {/* What You Get / How We Work */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-2 border-primary/20 pl-6">
              <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                What You Get
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Technical Report – findings, analysis, recommendations</li>
                <li>Engineering Documentation – plans, drawings, manuals</li>
                <li>Action Plan – clear next steps and timelines</li>
                <li>Ongoing Support – follow‑up and implementation assistance</li>
              </ul>
            </div>
            <div className="border-l-2 border-primary/20 pl-6">
              <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                How We Work
              </h3>
              <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                <li>You share vessel details and concerns – we listen.</li>
                <li>We analyse and plan – technical assessment, risk identification, scope definition.</li>
                <li>We execute and coordinate – engineering supervision, contractor management, quality control.</li>
                <li>You receive documentation – complete records ready for audits or class submission.</li>
              </ol>
            </div>
          </div>

          {/* Positioning statement */}
          <div className="mt-10 p-6 bg-neutral-50 border border-border/50 rounded-sm text-center">
            <p className="text-lg text-[#0B3B5C] font-medium">
              You get independent engineering management, technical oversight, and compliance assurance – from initial assessment to final documentation. We don't just advise; we deliver actionable, auditable results.
            </p>
          </div>

          {/* Engineering */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-4 border-l-2 border-primary/20 pl-4">
              Engineering
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ServiceCard service={services[0]} />
              <ServiceCard service={services[1]} />
              <ServiceCard service={services[2]} />
              <StructuralTimelineDiagram />
            </div>
          </div>

          {/* Compliance & Regulatory */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-4 border-l-2 border-primary/20 pl-4">
              Compliance & Regulatory
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ServiceCard service={services[3]} />
              <ServiceCard service={services[4]} />
            </div>
          </div>

          {/* Operations */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-4 border-l-2 border-primary/20 pl-4">
              Operations
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ServiceCard service={services[5]} />
              <OperatingModelDiagram />
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </>
  );
}
