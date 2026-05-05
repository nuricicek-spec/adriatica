// ─── Scenario Definitions ───────────────────────────────────────────────────

import { VesselProfile } from "./vesselProfile";

export interface ScenarioDef {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: "fuel" | "speed" | "power" | "propulsion" | "blend";
  changes: Partial<VesselProfile>;
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
    description: "Replace VLSFO with liquefied natural gas — lower carbon factor, higher energy density",
    icon: "fuel",
    changes: { meFuel: "LNG" },
    compute: (base) => {
      const vlsfoNcv = 40200;
      const lngNcv = 48000;
      return {
        annualFuel: Math.round(base.annualFuel * (vlsfoNcv / lngNcv)),
      };
    },
  },
  {
    id: "fuel-methanol",
    label: "Switch to Methanol",
    shortLabel: "Methanol",
    description: "Replace fossil fuel with green methanol — significantly lower carbon factor",
    icon: "fuel",
    changes: { meFuel: "Methanol" },
    compute: (base) => {
      const vlsfoNcv = 40200;
      const methanolNcv = 19800;
      return {
        annualFuel: Math.round(base.annualFuel * (vlsfoNcv / methanolNcv)),
      };
    },
  },
  {
    id: "slow-10",
    label: "10% Slow Steaming",
    shortLabel: "-10% Speed",
    description: "Reduce service speed by 10% — fuel consumption drops cubically (~23% reduction)",
    icon: "speed",
    changes: {},
    compute: (base) => {
      const speedRatio = 0.90;
      const fuelRatio = Math.pow(speedRatio, 2.5);
      return {
        vref: parseFloat((base.vref * speedRatio).toFixed(1)),
        annualFuel: Math.round(base.annualFuel * fuelRatio),
      };
    },
  },
  {
    id: "slow-15",
    label: "15% Slow Steaming",
    shortLabel: "-15% Speed",
    description: "Reduce service speed by 15% — fuel consumption drops cubically (~33% reduction)",
    icon: "speed",
    changes: {},
    compute: (base) => {
      const speedRatio = 0.85;
      const fuelRatio = Math.pow(speedRatio, 2.5);
      return {
        vref: parseFloat((base.vref * speedRatio).toFixed(1)),
        annualFuel: Math.round(base.annualFuel * fuelRatio),
      };
    },
  },
  {
    id: "epl-standard",
    label: "EPL (Standard)",
    shortLabel: "EPL Std",
    description: "Apply Engine Power Limitation per MEPC.338(76) — 15% MCR reduction for EEXI compliance only. Does not affect operational fuel consumption.",
    icon: "power",
    changes: {},
    compute: (base) => {
      const eplRatio = 0.85;
      const newMcr = base.meMcr * eplRatio;
      const newVref = base.vref * Math.pow(eplRatio, 1 / 3);
      return {
        meMcr: Math.round(newMcr),
        vref: parseFloat(newVref.toFixed(1)),
        // annualFuel KALDIRILDI — EPL operasyonel yakıt tüketimini değiştirmez,
        // sadece maksimum gücü sınırlar. Operasyonel verimlilik slow steaming ile ayrıca modellenir.
      };
    },
  },
  {
    id: "pto-add",
    label: "Add Shaft Generator (PTO)",
    shortLabel: "+PTO",
    description: "Install shaft generator for auxiliary power — reduces EEXI via PTO credit",
    icon: "propulsion",
    changes: { hasPto: true, ptoPower: 500, ptoEff: 0.95 },
  },
  {
    id: "hull-upgrade",
    label: "Hull Coating Upgrade",
    shortLabel: "Hull Upgr",
    description: "Silicone-based coating reducing frictional resistance ~3% — lower power demand",
    icon: "propulsion",
    changes: {},
    compute: (base) => ({
      meMcr: Math.round(base.meMcr * 0.97),
    }),
  },
];