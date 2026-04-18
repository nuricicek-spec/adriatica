export interface CaseStudy {
  slug: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "biofouling-management-mediterranean",
    title: "Biofouling Management for Mediterranean Entry",
    challenge:
      "A 50‑meter superyacht relocated from high‑fouling zones (Dubai, Maldives) to the Mediterranean. The vessel faced potential Port State Control delays due to uncertain biofouling history and lack of documented niche‑area inspections.",
    solution:
      "Adriatica conducted a quantified risk assessment, developed a vessel‑specific Biofouling Management Plan (BFMP), and integrated a Biofouling Record Book (BFRB) with photographic evidence. The framework was implemented prior to departure.",
    result:
      "The yacht transited to Montenegro with full documentation, enabling seamless Port State Control clearance, avoiding emergency cleaning fees (typically €5,000–€15,000), and maintaining charter continuity.",
  },
  {
    slug: "managed-in-water-cleaning",
    title: "Managed In‑Water Cleaning vs. Unscheduled Dry‑Docking",
    challenge:
      "A 35‑meter motor yacht in the Mediterranean required urgent biofouling removal during peak charter season. Unscheduled dry‑docking would have caused 4 days of downtime and high costs.",
    solution:
      "Adriatica managed an in‑water cleaning operation using certified divers with debris capture systems. The cleaning was completed within one day during guest turnaround.",
    result:
      "Cost savings of 80% compared to dry‑docking (€6,000 vs. €30,000) and zero charter disruption. Full photographic documentation was logged in the vessel’s Biofouling Record Book.",
  },
  {
    slug: "refit-supervision-shipyard",
    title: "Refit Supervision at Shipyard",
    challenge:
      "A 55‑meter motor yacht scheduled a 6‑week refit in Bijela. The owner needed technical oversight to ensure coating specifications, shaft alignment, and niche‑area documentation were properly executed.",
    solution:
      "Adriatica provided full‑time on‑site engineering supervision, coordinating with the shipyard and acting as Owner’s Technical Representative.",
    result:
      "The project was completed two days ahead of schedule (≈5% time saving on a 6‑week schedule), with all technical records accepted by the classification society and local Port Authority.",
  },
];
