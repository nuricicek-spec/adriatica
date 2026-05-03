// ─── Scenario Definitions ───────────────────────────────────────────────────
// Her senaryo: hangi alanları değiştirir, label, açıklama

import { VesselProfile } from "./vesselProfile";

export interface ScenarioDef {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: "fuel" | "speed" | "power" | "propulsion" | "blend";
  // Değişen alanlar — undefined = değişmiyor
  changes: Partial<VesselProfile>;
  // Ek hesaplama (örn: Vref %10 düşünce yeni değer)
  compute?: (base: VesselProfile) => Partial<VesselProfile>;
}

export const SCENARIOS: ScenarioDef[] = [
  {
    id: "current",
    label: "Current Configuration",
    shortLabel: "Current",
    description: "Existing vessel setup as baseline",
    icon: "fuel",
    changes: {},
  },
  {
    id: "fuel-lng",
    label: "Switch to LNG",
    shortLabel: "LNG",
    description: "Replace VLSFO with liquefied natural gas",
    icon: "fuel",
    changes: { meFuel: "LNG" },
  },
  {
    id: "fuel-methanol",
    label: "Switch to Methanol",
    shortLabel: "Methanol",
    description: "Replace fossil fuel with green methanol",
    icon: "fuel",
    changes: { meFuel: "Methanol" },
  },
  {
    id: "slow-10",
    label: "10% Slow Steaming",
    shortLabel: "-10% Speed",
    description: "Reduce service speed by 10%",
    icon: "speed",
    changes: {},
    compute: (base) => ({ vref: base.vref * 0.9 }),
  },
  {
    id: "slow-15",
    label: "15% Slow Steaming",
    shortLabel: "-15% Speed",
    description: "Reduce service speed by 15%",
    icon: "speed",
    changes: {},
    compute: (base) => ({ vref: base.vref * 0.85 }),
  },
  {
    id: "epl-standard",
    label: "EPL (Standard)",
    shortLabel: "EPL Std",
    description: "Apply Engine Power Limitation per MEPC.338(76)",
    icon: "power",
    changes: {},
    // EPL hesabı runtime'da yapılır (EEXI sonucuna bağlı)
  },
  {
    id: "pto-add",
    label: "Add Shaft Generator (PTO)",
    shortLabel: "+PTO",
    description: "Install shaft generator for auxiliary power",
    icon: "propulsion",
    changes: { hasPto: true, ptoPower: 500, ptoEff: 0.95 },
  },
  {
    id: "hull-upgrade",
    label: "Hull Coating Upgrade",
    shortLabel: "Hull Upgr",
    description: "Silicone-based coating reducing frictional resistance",
    icon: "propulsion",
    changes: {},
    compute: (base) => ({ meSfc: base.meSfc * 0.97 }), // ~3% SFC improvement
  },
];