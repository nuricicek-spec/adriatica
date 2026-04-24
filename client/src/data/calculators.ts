// C:\Adriatica\client\src\data\calculators.ts

// --- EEXI VE CII İÇİN ORTAK VERİLER ---

export const VESSEL_TYPES = [
  { value: "bulkCarrier", label: "Bulk Carrier", fi: 1.0, fc: 1.0 },
  { value: "tanker", label: "Oil/Gas Tanker", fi: 1.0, fc: 1.0 },
  { value: "containerShip", label: "Container Ship", fi: 1.0, fc: 1.0 },
  { value: "roRo", label: "Ro-Ro Ship (Vehicle)", fi: 1.2, fc: 1.0 },
  { value: "roRoCargo", label: "Ro-Ro Cargo", fi: 1.2, fc: 1.0 },
  { value: "generalCargo", label: "General Cargo Ship", fi: 1.0, fc: 1.0 },
  { value: "yacht", label: "Yacht (>400 GT)", fi: 1.2, fc: 0.7 }, // Yatlar için özel katsayılar
  { value: "fishing", label: "Fishing Vessel", fi: 1.0, fc: 0.7 },
] as const;

export const FUEL_TYPES = [
  { value: "HFO", label: "Heavy Fuel Oil (HFO)", cf: 3.206 },
  { value: "LFO", label: "Light Fuel Oil (LFO/MDO)", cf: 3.151 },
  { value: "LNG", label: "Liquefied Natural Gas (LNG)", cf: 2.750 },
  { value: "Methanol", label: "Methanol", cf: 1.375 },
] as const;

export const DEFAULT_SFC = 190; // g/kWh (IMO Varsayılan)
export const FW_FACTOR = 1; // Deniz durumu katsayısı (standart hesaplamada 1 alınır)

// --- EEXI İÇİN GEREKLİ VERİLER ---

// EEXI Required Limitleri (DWT aralıklarına göre sadeleştirilmiş tablo - Phase 3)
// Not: Gerçek projede gemi tipine göre değişir, burada genel bir hesaplama için sadeleştirilmiştir.
export const EEXI_LIMITS_BULK_TANKER = [
  { minDwt: 0, maxDwt: 20000, limit: 4.50 },
  { minDwt: 20001, maxDwt: 40000, limit: 3.50 },
  { minDwt: 40001, maxDwt: 80000, limit: 2.70 },
  { minDwt: 80001, maxDwt: 120000, limit: 2.30 },
  { minDwt: 120001, maxDwt: 200000, limit: 2.00 },
  { minDwt: 200001, maxDwt: Infinity, limit: 1.80 },
];

export const EEXI_LIMITS_CONTAINER = [
  { minDwt: 0, maxDwt: 40000, limit: 6.50 },
  { minDwt: 40001, maxDwt: 80000, limit: 4.50 },
  { minDwt: 80001, maxDwt: 120000, limit: 3.50 },
  { minDwt: 120001, maxDwt: 200000, limit: 2.80 },
  { minDwt: 200001, maxDwt: Infinity, limit: 2.30 },
];

export const EEXI_LIMITS_GENERAL = [
  { minDwt: 0, maxDwt: 20000, limit: 5.50 },
  { minDwt: 20001, maxDwt: 40000, limit: 4.50 },
  { minDwt: 40001, maxDwt: 80000, limit: 3.50 },
  { minDwt: 80001, maxDwt: 120000, limit: 3.00 },
  { minDwt: 120001, maxDwt: Infinity, limit: 2.50 },
];

// --- CII İÇİN GEREKLİ VERİLER ---

// CII Azaltma Faktörleri (Yıllara göre)
export const CII_REDUCTION_FACTORS: Record<number, number> = {
  2023: 0.05,
  2024: 0.07,
  2025: 0.09,
  2026: 0.11, // 2026 sınırı
  2027: 0.13,
};

// CII Base Değerleri (DWT'ye göre - DWT/speed fonksiyonunun sadeleştirilmiş hali)
export const CII_BASE_VALUES = [
  { minDwt: 0, maxDwt: 5000, base: 110 },
  { minDwt: 5001, maxDwt: 20000, base: 75 },
  { minDwt: 20001, maxDwt: 50000, base: 50 },
  { minDwt: 50001, maxDwt: 100000, base: 35 },
  { minDwt: 100001, maxDwt: Infinity, base: 25 },
];

// Yardımcı Fonksiyon: DWT'ye göre tablodan doğru limiti bulur
export function getLimitFromTable(dwt: number, table: { minDwt: number; maxDwt: number; limit: number }[]): number {
  const row = table.find(r => dwt >= r.minDwt && dwt <= r.maxDwt);
  return row ? row.limit : 0;
}