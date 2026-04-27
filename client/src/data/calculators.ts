// C:\Adriatica\client\src\data\calculators.ts

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
// FIX: VLSFO eklendi — 2020 IMO Sulphur Cap sonrası filoların %90'ı
// VLSFO kullanıyor. CF = 3.106 (IMO MEPC.344(78) Table 1).
// HFO seçmek zorunda kalan kullanıcılar gerçek değerden ~%3–4 yüksek
// sonuç alıyordu; bu ekleme doğruluğu artırır.
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