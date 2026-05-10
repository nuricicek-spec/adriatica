// ─── Fleet & Advanced Analysis Data Models ──────────────────────────────────

export interface FleetVessel {
  id: string;
  name: string;
  vesselType: string;
  dwt: number;
  meMcr: number;
  meFuel: string;
  annualFuel: number;
  annualDistance: number;
  targetYear: number;
}

export interface FuelBlendInput {
  fuelType: string;
  annualMt: number;
}

export interface FuelEuProResult {
  attainedGhg: number;
  requiredGhg: number;
  totalEnergyMj: number;
  penaltyEur: number;
  isCompliant: boolean;
  surplus: number;
  blendDetails: { fuelType: string; annualMt: number; energyMj: number; ghgContribution: number }[];
}

export interface EtsFleetVesselResult {
  vesselId: string;
  vesselName: string;
  co2: number;
  requiredEua: number;
  cost: number;
}

export interface EtsFleetResult {
  vessels: EtsFleetVesselResult[];
  totalCo2: number;
  totalEua: number;
  totalCost: number;
  hedgingCost: number;
  netCost: number;
}

export interface CiiImprovementMeasure {
  id: string;
  label: string;
  costMin: number;
  costMax: number;
  ciiImprovementPercent: number;
  description: string;
}

export interface BiofoulingRiskInput {
  idleDays: number;
  tradingRegion: "tropical" | "temperate" | "cold";
  hullCoatingAge: number;
  lastInwaterCleaning: number;
  nicheAreasCleaned: boolean;
  vesselType: string;
}

export interface BiofoulingResult {
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  complianceReady: boolean;
  ghgImpactPercent: number;
  recommendations: string[];
}

export interface DryDockScopeItem {
  id: string;
  label: string;
  mandatory: boolean;
  estimatedDays: number;
  costMin: number;
  costMax: number;
  regulation: string;
}

export interface HealthScoreItem {
  toolId: string;
  label: string;
  score: number;
  status: "pass" | "warn" | "fail";
  weight: number;
}

export interface VesselHealthResult {
  items: HealthScoreItem[];
  overall: number;
  status: "excellent" | "good" | "fair" | "poor";
  priorities: string[];
}