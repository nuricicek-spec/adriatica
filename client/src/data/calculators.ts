// C:\Adriatica\client\src\data\calculators.ts

// --- GEMİ TİPLERİ VE KATSAYILARI ---
export const VESSEL_TYPES = [
  { value: "bulkCarrier", label: "Bulk Carrier", fi: 1.0, fc: 1.0 },
  { value: "tanker", label: "Oil/Gas Tanker", fi: 1.0, fc: 1.0 },
  { value: "containerShip", label: "Container Ship", fi: 1.0, fc: 1.0 },
  { value: "roRoCargo", label: "Ro-Ro Cargo/Vehicle", fi: 1.2, fc: 1.0 },
  { value: "roRoPax", label: "Ro-Ro Passenger", fi: 1.2, fc: 1.0 },
  { value: "generalCargo", label: "General Cargo Ship", fi: 1.0, fc: 1.0 },
  { value: "yacht", label: "Yacht (>400 GT)", fi: 1.2, fc: 0.7 },
  { value: "fishing", label: "Fishing Vessel", fi: 1.0, fc: 0.7 },
] as const;

// --- YAKIT TÜRLERİ VE KARBON EMİSYON FAKTÖRLERİ (MEPC.344(78)) ---
export const FUEL_TYPES = [
  { value: "HFO", label: "Heavy Fuel Oil (HFO/LFO)", cf: 3.206 },
  { value: "LNG", label: "Liquefied Natural Gas (LNG)", cf: 2.750 },
  { value: "Methanol", label: "Methanol", cf: 1.375 },
  { value: "Ethanol", label: "Ethanol", cf: 1.521 },
] as const;

// --- EEXI IÇİN GEREKLİ VERİLER ---
export const DEFAULT_SFC_ME = 190; // g/kWh (Ana Makine için varsayılan)
export const DEFAULT_SFC_AUX = 215; // g/kWh (Yardımcı makine için varsayılan - değişken yük nedeniyle daha yüksektir)
export const FW_FACTOR = 1.0; // Deniz durumu katsayısı

// EEDI Baseline Formülü için 'a' ve 'c' katsayıları (MEPC.308(73) Tablo 2)
// EEXI Required limiti, geminin EEDI'sine göre hesaplanır. Web aracında EEDI yoksa 
// bu baseline formülünden DWT'ye göre backward hesaplama yapıyoruz.
const EEDI_BASELINE = [
  { type: "bulkCarrier", a: 961.79, c: 0.477 },
  { type: "tanker", a: 1124.29, c: 0.488 },
  { type: "containerShip", a: 1746.94, c: 0.466 },
  { type: "roRoCargo", a: 1371.87, c: 0.493 },
  { type: "roRoPax", a: 5520.34, c: 0.437 },
  { type: "generalCargo", a: 1071.18, c: 0.484 },
  { type: "yacht", a: 1071.18, c: 0.484 }, // Genel kargo formülü baz alınır
  { type: "fishing", a: 891.34, c: 0.491 },
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

// --- CII IÇİN GEREKLİ VERİLER (MEPC.364(79) Tablo 1) ---
// CII Reference Formülü: CII_ref = a * DWT^(-c)
export const CII_COEFFICIENTS = [
  { type: "bulkCarrier", a: 1079.2, c: 0.616 },
  { type: "tanker", a: 1579.9, c: 0.619 },
  { type: "containerShip", a: 2362.6, c: 0.599 },
  { type: "roRoCargo", a: 3513.6, c: 0.559 },
  { type: "roRoPax", a: 4897.4, c: 0.516 },
  { type: "generalCargo", a: 1965.1, c: 0.617 },
  { type: "yacht", a: 1965.1, c: 0.617 },
  { type: "fishing", a: 1220.5, c: 0.614 },
] as const;

// CII Azaltma Faktörleri (Z)
export const CII_REDUCTION_FACTORS: Record<number, number> = {
  2023: 0.05,
  2024: 0.07,
  2025: 0.09,
  2026: 0.11, // C ve altı sınırı
  2027: 0.13,
};

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