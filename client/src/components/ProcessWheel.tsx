// client/src/components/ProcessWheel.tsx
// Interactive 4-step Engineering Management Process Wheel
// SVG geometry built in React JSX – no external libraries required.

import React from 'react'; // Eklendi
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
      "We start every project with a thorough evaluation of your vessel's condition, regulatory requirements, and operational constraints — giving you a precise, compliance‑ready work plan.",
    bullets: [
      "Vessel inspection & condition survey",
      "IMO / port‑state regulatory mapping",
      "Work scope definition & budget estimation",
    ],
  },
  {
    phase: "Phase 2 of 4",
    title: "Certified Partner Coordination",
    description:
      "We engage and manage only vetted, certified contractors and service providers — so you get technical competence and regulatory compliance at every stage.",
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
      "Our engineers supervise on‑site, performing real‑time quality checks and managing deviations immediately — ensuring your project stays exactly to specification.",
    bullets: [
      "On‑site engineering supervision",
      "Coating / equipment compliance checks",
      "Non‑conformity management & sign‑off",
    ],
  },
  {
    phase: "Phase 4 of 4",
    title: "Documentation & Reporting",
    description:
      "You receive comprehensive, class‑ready records at project close — feeding directly into the next risk assessment cycle and your long‑term compliance readiness.",
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

const CX    = 200;  // viewBox centre x
const CY    = 200;  // viewBox centre y
const R_OUT = 178;  // outer radius
const R_IN  = 72;   // inner radius (hole)
const GAP   = 1.4;  // degrees of gap between segments

/** Convert polar coords to Cartesian */
function polar(
  cx: number, cy: number,
  r: number, angleDeg: number
): [number, number] {
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
  const r    = 190;
  const span = 13;
  const [tx, ty]   = polar(CX, CY, r, angleDeg + span);
  const sz         = 5;
  const [bx1, by1] = polar(tx, ty, sz, angleDeg + span + 90 - 155);
  const [bx2, by2] = polar(tx, ty, sz, angleDeg + span + 90 + 155);
  return (
    <polygon
      points={`${tx},${ty} ${bx1},${by1} ${bx2},${by2}`}
      fill="rgba(255,255,255,0.50)"
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProcessWheel() {
  const [active,  setActive]  = useState(0);
  const [visible, setVisible] = useState(true); // drives panel fade
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerFade = useCallback(() => {
    setVisible(false);
    setTimeout(() => setVisible(true), 40);
  }, []);

  const stopAuto = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % 4);
      triggerFade();
    }, 3800);
  }, [triggerFade]);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  const select = useCallback((idx: number) => {
    stopAuto();
    triggerFade();
    setActive(idx);
  }, [stopAuto, triggerFade]);

  const handleKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(idx);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section className="w-full py-16 px-6">
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto">

        {/* ── Wheel ──────────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 w-[336px] md:w-[432px]">
          <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Engineering Management Process Wheel"
            className="w-full h-auto overflow-visible"
          >
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
                  <path
                    d={arcPath(CX, CY, R_OUT, R_IN, seg.start, seg.end)}
                    fill={SEG_COLORS[i]}
                    opacity={isActive ? 1 : 0.82}
                    style={{
                      transition: "opacity 0.22s ease, filter 0.22s ease",
                      filter: isActive
                        ? "brightness(1.12) drop-shadow(0 4px 14px rgba(11,59,92,0.28))"
                        : "drop-shadow(0 2px 5px rgba(11,59,92,0.18))",
                    }}
                  />

                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.92)"
                    fontFamily="var(--font-body, 'Inter', sans-serif)"
                    fontSize="11"
                    fontWeight="600"
                    letterSpacing="1.8"
                    style={{ pointerEvents: "none", textTransform: "uppercase" }}
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
              style={{ filter: "drop-shadow(0 2px 5px rgba(11,59,92,0.18))" }} />
            <circle cx={CX} cy={CY} r={R_IN - 4} fill="#F8FAFB" />

            {/* Centre text */}
            <text x={CX} y={CY + 6} textAnchor="middle"
              fill="#0B3B5C"
              fontFamily="var(--font-display, 'Playfair Display', serif)"
              fontSize="17" fontWeight="600">
              MANAGEMENT
            </text>
          </svg>
        </div>

        {/* ── Panel ──────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <div
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.26s ease, transform 0.26s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-3 h-px flex-shrink-0"
                style={{ background: SEG_COLORS[active], transition: "background 0.3s" }}
              />
              <span className="text-sm font-light tracking-wide uppercase text-muted-foreground">
                {STEPS[active].phase}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-primary mb-3 leading-snug">
              {STEPS[active].title}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-5">
              {STEPS[active].description}
            </p>

            <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-sm">
              {STEPS[active].bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            {/* Nav dots */}
            <div className="flex gap-2 mt-8">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to ${STEPS[i].title}`}
                  onClick={() => select(i)}
                  className="h-[3px] rounded-sm transition-all duration-300 cursor-pointer"
                  style={{
                    width:      i === active ? "40px" : "28px",
                    background: i === active ? "#0B3B5C" : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm font-light text-muted-foreground/60 italic">
            Click any segment or use the indicators to explore
          </p>
        </div>
      </div>
    </section>
  );
}