// C:\Adriatica\client\src\data\calculators.ts

import { VesselProfile } from "./vesselProfile"; // ← EKLENMESİ GEREKEN SATIR

// --- GEMİ TİPLERİ VE KATSAYILARI ---
export const VESSEL_TYPES = [
  { value: "bulkCarrier",  label: "Bulk Carrier",             fi: 1.0, fc: 1.0 },
  { value: "tanker",       label: "Oil/Gas Tanker",           fi: 1.0, fc: 1.0 },
  { value: "containerShip",label: "Container Ship",           fi: 1.0, fc: 1.0 },
  { value: "roRoCargo",    label: "Ro-Ro Cargo/Vehicle",      fi: 1.2, fc: 1.0 },
  { value: "roRoPax",      label: "Ro-Ro Passenger",          fi: 1.2, fc: 1.0 },
  { value: "generalCargo", label: "General Cargo Ship",       fi: 1.0, fc: 1.0 },
  { value: "yacht",        label: "Yacht (>400 GT)",          fi: 1.2, fc: 0.7 },
  { value: "fishing",      label: "Fishing Vessel",           fi: 1.0, fc: 0.7 },
] as const;

// --- YAKIT TÜRLERİ VE KARBON EMİSYON FAKTÖRLERİ (MEPC.344(78)) ---
export const FUEL_TYPES = [
  { value: "VLSFO",    label: "VLSFO (0.5% Sulphur) — IMO 2020",    cf: 3.106 },
  { value: "HFO",      label: "Heavy Fuel Oil (HFO/LFO)",            cf: 3.206 },
  { value: "LNG",      label: "Liquefied Natural Gas (LNG)",         cf: 2.750 },
  { value: "Methanol", label: "Methanol",                            cf: 1.375 },
  { value: "Ethanol",  label: "Ethanol",                             cf: 1.521 },
] as const;

// --- EEXI İÇİN GEREKLİ VERİLER ---
export const DEFAULT_SFC_ME  = 190; // g/kWh (Ana Makine için varsayılan)
export const DEFAULT_SFC_AUX = 215; // g/kWh (Yardımcı makine — değişken yük nedeniyle daha yüksek)
export const FW_FACTOR = 1.0;       // Deniz durumu katsayısı

// EEDI Baseline Formülü için 'a' ve 'c' katsayıları (MEPC.308(73) Tablo 2)
const EEDI_BASELINE = [
  { type: "bulkCarrier",   a: 961.79,  c: 0.477 },
  { type: "tanker",        a: 1124.29, c: 0.488 },
  { type: "containerShip", a: 1746.94, c: 0.466 },
  { type: "roRoCargo",     a: 1371.87, c: 0.493 },
  { type: "roRoPax",       a: 5520.34, c: 0.437 },
  { type: "generalCargo",  a: 1071.18, c: 0.484 },
  { type: "yacht",         a: 1071.18, c: 0.484 }, // Genel kargo formülü baz alınır
  { type: "fishing",       a: 891.34,  c: 0.491 },
] as const;

// EEXI Azaltma Faktörleri (Yıllara Göre)
export const EEXI_REDUCTION_FACTORS: Record<number, number> = {
  2023: 0.02,
  2024: 0.04,
  2025: 0.06,
  2026: 0.08,
  2027: 0.10,
  2028: 0.12,
  2029: 0.14,
  2030: 0.16,
};

// --- CII İÇİN GEREKLİ VERİLER (MEPC.364(79) Tablo 1) ---
// CII Reference Formülü: CII_ref = a × DWT^(-c)
export const CII_COEFFICIENTS = [
  { type: "bulkCarrier",   a: 1079.2, c: 0.616 },
  { type: "tanker",        a: 1579.9, c: 0.619 },
  { type: "containerShip", a: 2362.6, c: 0.599 },
  { type: "roRoCargo",     a: 3513.6, c: 0.559 },
  { type: "roRoPax",       a: 4897.4, c: 0.516 },
  { type: "generalCargo",  a: 1965.1, c: 0.617 },
  { type: "yacht",         a: 1965.1, c: 0.617 },
  { type: "fishing",       a: 1220.5, c: 0.614 },
] as const;

// CII Azaltma Faktörleri (Z)
export const CII_REDUCTION_FACTORS: Record<number, number> = {
  2023: 0.05,
  2024: 0.07,
  2025: 0.09,
  2026: 0.11,
  2027: 0.13,
};

// --- EU ETS IÇİN GEREKLİ VERİLER ---
export const ETS_PHASE_IN_RATES: Record<number, number> = {
  2024: 0.40, 2025: 0.70, 2026: 1.00,
  2027: 1.00, 2028: 1.00, 2029: 1.00, 2030: 1.00,
};

// --- FUELEU MARITIME IÇİN GEREKLİ VERİLER ---
export const FUELEU_WTW_FACTORS: Record<string, number> = {
  HFO: 94.5, VLSFO: 94.5, LNG: 93.2, MGO: 94.8, Methanol: 66.3,
};

export const FUELEU_NCV_FACTORS: Record<string, number> = {
  HFO: 40200, VLSFO: 40200, LNG: 48000, MGO: 42700, Methanol: 19800,
};

export const FUELEU_BASELINE = 91.16;

export const FUELEU_REDUCTION_FACTORS: Record<number, number> = {
  2025: 0.02, 2030: 0.06, 2035: 0.145, 2040: 0.31, 2045: 0.52, 2050: 0.80,
};

// DÜZELTİLMİŞ FUELEU CEZA KATSAYISI
const VLSFO_CO2_PER_TON = (FUELEU_NCV_FACTORS.VLSFO * FUELEU_WTW_FACTORS.VLSFO) / 1_000_000;
export const FUELEU_PENALTY_PER_TON_CO2 = 2400 / VLSFO_CO2_PER_TON; // ≈ 631.8

// Yardımcı Fonksiyonlar
export function getEediBaseline(dwt: number, vesselType: string): number {
  const data = EEDI_BASELINE.find(b => b.type === vesselType);
  if (!data) return 0;
  return data.a * Math.pow(dwt, -data.c);
}

export function getCiiReference(dwt: number, vesselType: string): number {
  const data = CII_COEFFICIENTS.find(b => b.type === vesselType);
  if (!data) return 0;
  return data.a * Math.pow(dwt, -data.c);
}

// ============================================
// SHAPOLI (Shaft Power Limitation) — MEPC.350(78)
// ============================================

export interface ShaPoLiResult {
  isCompliant: boolean;
  measuredShaftPower: number;      // kW
  limitValue: number;              // kW
  overridable: boolean;
  maxOverridePower: number;        // kW (110% of limit)
  requiredLogAccuracy: string;     // % tolerance
}

export const SHAPOLI_GUIDANCE = {
  overridable: {
    title: "Overridable ShaPoLi",
    description: "Master can override limit in safety situations. Requires power reserve documentation and alarm system.",
    requirements: ["Alarm at 100% limit", "Override log entry", "Power reserve justification"],
  },
  nonOverridable: {
    title: "Non-Overridable ShaPoLi",
    description: "Fixed limit, no override possible. Stricter but simpler compliance.",
    requirements: ["Fixed power cap", "No override mechanism", "Annual verification"],
  },
} as const;

export function calculateShaPoLi(
  vesselType: string,
  dwt: number,
  meMcr: number,
  shaftPower: number,
  isOverridable: boolean
): ShaPoLiResult {
  // Size factor: larger vessels get lower limit percentage
  const sizeFactor = dwt > 50000 ? 0.75 : dwt > 10000 ? 0.80 : 0.85;
  
  const limitValue = meMcr * sizeFactor;
  const maxOverride = isOverridable ? limitValue * 1.10 : limitValue;
  
  const isCompliant = shaftPower <= maxOverride;
  
  return {
    isCompliant,
    measuredShaftPower: shaftPower,
    limitValue,
    overridable: isOverridable,
    maxOverridePower: maxOverride,
    requiredLogAccuracy: isOverridable ? "±2%" : "±1%",
  };
}

// ============================================
// SCENARIO ENGINE HESAPLAMALARI (GERÇEK FORMÜLLER)
// ============================================

export function calculateEEXI(profile: VesselProfile) {
  const {
    vesselType,
    dwt,
    targetYear,
    meMcr,
    meFuel,
    meSfc,
    vref,
    hasPto,
    ptoPower,
    ptoEff,
    auxPower,
    auxSfc,
  } = profile;

  const typeData = VESSEL_TYPES.find(v => v.value === vesselType);
  const fuelData = FUEL_TYPES.find(f => f.value === meFuel);
  if (!typeData || !fuelData) {
    return { attained: 0, required: 0, compliant: false };
  }

  const ptoReduction = hasPto ? (ptoEff * ptoPower * meSfc * fuelData.cf) : 0;
  const meEmissions  = meSfc * fuelData.cf * meMcr;
  const auxEmissions = auxSfc * fuelData.cf * auxPower;
  const totalEmissions = Math.max(0, meEmissions - ptoReduction + auxEmissions);

  const attained = totalEmissions / (typeData.fi * typeData.fc * dwt * vref);
  const baseline = getEediBaseline(dwt, vesselType);
  const reductionFactor = EEXI_REDUCTION_FACTORS[targetYear] || 0.08;
  const required = baseline * (1 - reductionFactor);

  return {
    attained: parseFloat(attained.toFixed(4)),
    required: parseFloat(required.toFixed(4)),
    compliant: attained <= required,
  };
}

export function calculateCII(profile: VesselProfile) {
  const { vesselType, dwt, targetYear, annualFuel, meFuel, annualDistance } = profile;
  const fuelData = FUEL_TYPES.find(f => f.value === meFuel);
  if (!fuelData || annualDistance <= 0) {
    return { rating: "E", attained: 0, required: 0 };
  }

  const attained = (annualFuel * fuelData.cf * 1e6) / (dwt * annualDistance);
  const reference = getCiiReference(dwt, vesselType);
  const reductionFactor = CII_REDUCTION_FACTORS[targetYear] || 0.11;
  const required = reference * (1 - reductionFactor);

  let rating = "E";
  if (attained <= required * 0.80) rating = "A";
  else if (attained <= required * 0.90) rating = "B";
  else if (attained <= required) rating = "C";
  else if (attained <= required * 1.10) rating = "D";

  return {
    rating,
    attained: parseFloat(attained.toFixed(2)),
    required: parseFloat(required.toFixed(2)),
  };
}

export function calculateETS(profile: VesselProfile, euaPrice: number = 65) {
  const { targetYear, annualFuel, meFuel } = profile;
  const fuelData = FUEL_TYPES.find(f => f.value === meFuel);
  if (!fuelData) return { cost: 0, co2: 0 };

  const phaseInRate = ETS_PHASE_IN_RATES[targetYear] || 1.0;
  const totalCo2 = annualFuel * fuelData.cf;
  const requiredEua = totalCo2 * phaseInRate;
  const cost = requiredEua * euaPrice;

  return {
    cost: Math.round(cost),
    co2: Math.round(totalCo2),
  };
}

export function calculateFuelEU(profile: VesselProfile) {
  const { targetYear, annualFuel, meFuel } = profile;
  const wtw = FUELEU_WTW_FACTORS[meFuel];
  const ncv = FUELEU_NCV_FACTORS[meFuel];
  if (!wtw || !ncv) return { penalty: 0, compliant: true };

  const reductionFactor = FUELEU_REDUCTION_FACTORS[targetYear] || 0.02;
  const totalEnergyMj = annualFuel * ncv;
  const attainedGhg = wtw;
  const requiredGhg = FUELEU_BASELINE * (1 - reductionFactor);

  let penalty = 0;
  let compliant = true;
  if (attainedGhg > requiredGhg) {
    compliant = false;
    const excessCO2_t = ((attainedGhg - requiredGhg) * totalEnergyMj) / 1_000_000;
    penalty = excessCO2_t * FUELEU_PENALTY_PER_TON_CO2;
  }

  return {
    penalty: Math.round(penalty),
    compliant,
  };
}