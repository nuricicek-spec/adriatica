// client/src/components/ProcessWheel.tsx
// Interactive 4-step Engineering Management Process Wheel
// SVG geometry built in React JSX – no external libraries required.

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  title: string;
  phase: string;
  description: string;
  bullets: string[];
}

// ─── Content data ─────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    phase: "Phase 1 of 4",
    title: "Risk Assessment & Planning",
    description:
      "Every project begins with a thorough evaluation of vessel condition, regulatory requirements, and operational constraints — forming the foundation for a precise, compliance-ready work plan.",
    bullets: [
      "Vessel inspection & condition survey",
      "IMO / port-state regulatory mapping",
      "Work scope definition & budget estimation",
    ],
  },
  {
    phase: "Phase 2 of 4",
    title: "Certified Partner Coordination",
    description:
      "We engage and manage only vetted, certified contractors and service providers — ensuring technical competence and regulatory compliance at every stage of execution.",
    bullets: [
      "Contractor qualification & approval",
      "Method statement & safety plan review",
      "Schedule alignment with port windows",
    ],
  },
  {
    phase: "Phase 3 of 4",
    title: "Execution & Quality Control",
    description:
      "On-site supervision ensures work is carried out exactly to specification. Our engineers oversee each phase, performing real-time quality checks and managing deviations immediately.",
    bullets: [
      "On-site engineering supervision",
      "Coating / equipment compliance checks",
      "Non-conformity management & sign-off",
    ],
  },
  {
    phase: "Phase 4 of 4",
    title: "Documentation & Reporting",
    description:
      "Comprehensive, class-ready records are produced at project close — feeding directly into the next risk assessment cycle and ensuring long-term compliance readiness.",
    bullets: [
      "Class society submission packages",
      "Biofouling & maintenance record updates",
      "Lessons learned → next planning cycle",
    ],
  },
];

// Brand colour per segment (navy → lighter blue)
const SEG_COLORS = ["#0B3B5C", "#1E5F8C", "#3A74A0", "#5B9EC9"] as const;

// Short two-line labels rendered inside each wheel segment
const SEG_LABELS = [
  ["RISK", "ASSESSMENT"],
  ["PARTNER", "COORDINATION"],
  ["EXECUTION &", "QUALITY"],
  ["DOCUMENTATION", "& REPORTING"],
] as const;

// ─── SVG geometry helpers ─────────────────────────────────────────────────────

const CX = 200;   // viewBox centre x
const CY = 200;   // viewBox centre y
const R_OUT = 178; // outer radius
const R_IN  = 72;  // inner radius (hole)
const GAP   = 1.4; // degrees of gap between segments

/** Convert polar coords to Cartesian */
function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/**
 * Build an SVG donut-arc path string.
 * startDeg / endDeg are in standard SVG degrees (0 = right, clockwise).
 */
function arcPath(
  cx: number, cy: number,
  rOuter: number, rInner: number,
  startDeg: number, endDeg: number
): string {
  const s = startDeg + GAP;
  const e = endDeg   - GAP;
  const [x1, y1] = polar(cx, cy, rOuter, s);
  const [x2, y2] = polar(cx, cy, rOuter, e);
  const [x3, y3] = polar(cx, cy, rInner, e);
  const [x4, y4] = polar(cx, cy, rInner, s);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M${x4},${y4}`,
    `L${x1},${y1}`,
    `A${rOuter},${rOuter} 0 ${large},1 ${x2},${y2}`,
    `L${x3},${y3}`,
    `A${rInner},${rInner} 0 ${large},0 ${x4},${y4}`,
    "Z",
  ].join(" ");
}

// 4 equal segments of 90°, starting from top (−90°)
const SEGMENTS = [
  { start: -90, end:   0 }, // top-right
  { start:   0, end:  90 }, // bottom-right
  { start:  90, end: 180 }, // bottom-left
  { start: 180, end: 270 }, // top-left
];

/** Small clockwise-arrow triangle drawn at each 90° boundary */
function ArrowMarker({ angleDeg }: { angleDeg: number }) {
  const r   = 190; // just outside outer ring
  const span = 13;
  const [tx, ty] = polar(CX, CY, r, angleDeg + span); // tip
  const perpBase = angleDeg + span + 90;
  const sz = 5;
  const [bx1, by1] = polar(tx, ty, sz, perpBase - 155);
  const [bx2, by2] = polar(tx, ty, sz, perpBase + 155);
  return (
    <polygon
      points={`${tx},${ty} ${bx1},${by1} ${bx2},${by2}`}
      fill="rgba(255,255,255,0.50)"
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProcessWheel() {
  const [active, setActive]     = useState(0);
  const [visible, setVisible]   = useState(true); // drives fade animation
  const autoRef                 = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Auto-rotation ──────────────────────────────────────────────────────────
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % 4);
      triggerFade();
    }, 3800);
  }, []);

  const stopAuto = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  // ── Panel fade helper ──────────────────────────────────────────────────────
  const triggerFade = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), 40);
  };

  // ── Manual selection ───────────────────────────────────────────────────────
  const select = (idx: number) => {
    stopAuto();
    triggerFade();
    setActive(idx);
  };

  // ── Keyboard handler for segments ─────────────────────────────────────────
  const handleKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(idx);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section className="w-full pt-0 pb-8 px-6">
      {/* Section header – no more "Engineering Management" eyebrow */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2
          className="text-2xl md:text-3xl font-semibold text-[#0B3B5C] mb-4 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          A Continuous, Iterative Process
        </h2>
        <p className="text-sm text-[#4A6070] leading-relaxed font-light">
          Our engineering management follows a closed-loop cycle — each completed
          phase informs the next, ensuring continuous compliance readiness and
          operational excellence.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto">

        {/* ── Wheel ──────────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 w-[280px] md:w-[360px]">
          <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Engineering Management Process Wheel"
            className="w-full h-auto overflow-visible"
          >
            <defs>
              <filter id="seg-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="5"
                  floodColor="rgba(11,59,92,0.20)" />
              </filter>
            </defs>

            {/* Segments */}
            {SEGMENTS.map((seg, i) => {
              const isActive  = i === active;
              const midAngle  = (seg.start + seg.end) / 2;
              const midRadius = (R_OUT + R_IN) / 2;
              const [lx, ly]  = polar(CX, CY, midRadius, midAngle);
              const [line1, line2] = SEG_LABELS[i];

              return (
                <g
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={`${STEPS[i].title} – ${isActive ? "currently selected" : "click to select"}`}
                  aria-pressed={isActive}
                  className="cursor-pointer outline-none"
                  onClick={() => select(i)}
                  onKeyDown={e => handleKey(e, i)}
                >
                  {/* Segment path */}
                  <path
                    d={arcPath(CX, CY, R_OUT, R_IN, seg.start, seg.end)}
                    fill={SEG_COLORS[i]}
                    filter="url(#seg-shadow)"
                    opacity={isActive ? 1 : 0.82}
                    style={{
                      transition: "opacity 0.22s ease, filter 0.22s ease",
                      filter: isActive
                        ? "brightness(1.12) drop-shadow(0 4px 14px rgba(11,59,92,0.28))"
                        : "url(#seg-shadow)",
                    }}
                  />

                  {/* Two-line label */}
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.92)"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "9.5px",
                      fontWeight: 600,
                      letterSpacing: "1.8px",
                      pointerEvents: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    <tspan x={lx} dy="-7">{line1}</tspan>
                    <tspan x={lx} dy="13">{line2}</tspan>
                  </text>
                </g>
              );
            })}

            {/* Clockwise arrow markers at segment boundaries */}
            {[0, 90, 180, 270].map(a => (
              <ArrowMarker key={a} angleDeg={a} />
            ))}

            {/* Separation rings */}
            <circle cx={CX} cy={CY} r={R_OUT} fill="none" stroke="white"
              strokeWidth="2.5" opacity="0.35" />
            <circle cx={CX} cy={CY} r={R_IN}  fill="none" stroke="white"
              strokeWidth="2"   opacity="0.35" />

            {/* Centre disc */}
            <circle cx={CX} cy={CY} r={R_IN} fill="white"
              filter="url(#seg-shadow)" />
            <circle cx={CX} cy={CY} r={R_IN - 4} fill="#F8FAFB" />

            <text x={CX} y={CY - 14} textAnchor="middle"
              fill="#8FA8BC" style={{ fontFamily:"'Inter',sans-serif",
              fontSize:"8px", fontWeight:500, letterSpacing:"2px" }}>
              ENGINEERING
            </text>
            <text x={CX} y={CY + 2} textAnchor="middle"
              fill="#0B3B5C" style={{ fontFamily:"'Playfair Display',serif",
              fontSize:"13px", fontWeight:600 }}>
              MANAGEMENT
            </text>
            <text x={CX} y={CY + 17} textAnchor="middle"
              fill="#8FA8BC" style={{ fontFamily:"'Inter',sans-serif",
              fontSize:"8px", fontWeight:300, letterSpacing:"1.5px" }}>
              CYCLE
            </text>
          </svg>
        </div>

        {/* ── Panel ──────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.26s ease, transform 0.26s ease",
            }}
          >
            {/* Phase badge row */}
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  background: SEG_COLORS[active],
                  transition: "background 0.3s",
                }}
              />
              <span className="text-[10px] tracking-[2.5px] uppercase text-[#8FA8BC] font-medium">
                {STEPS[active].phase}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-xl md:text-2xl font-semibold text-[#0B3B5C] mb-4 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {STEPS[active].title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#4A6070] leading-relaxed font-light mb-6">
              {STEPS[active].description}
            </p>

            {/* Bullet list */}
            <ul className="border-t border-[#E2ECF3]">
              {STEPS[active].bullets.map((b, i) => (
                <li
                  key={i}
                  className="relative pl-4 py-2.5 text-[12.5px] text-[#4A6070]
                             border-b border-[#E2ECF3] leading-relaxed"
                >
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2
                               w-1 h-1 rounded-full"
                    style={{ background: SEG_COLORS[active] }}
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* Nav dots */}
            <div className="flex gap-2 mt-7">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to ${STEPS[i].title}`}
                  onClick={() => select(i)}
                  className="h-[3px] rounded-sm transition-all duration-300"
                  style={{
                    width: i === active ? "40px" : "28px",
                    background: i === active ? "#0B3B5C" : "#E2ECF3",
                  }}
                />
              ))}
            </div>
          </div>

          <p className="mt-3 text-[11px] text-[#8FA8BC] italic">
            Click any segment or use the indicators to explore
          </p>
        </div>
      </div>
    </section>
  );
}