// C:\Adriatica\client\src\data\calculators.ts

export const VESSEL_TYPES = [
  { value: "bulkCarrier", label: "Bulk Carrier", fi: 1.0, fc: 1.0 },
  { value: "tanker", label: "Oil/Gas Tanker", fi: 1.0, fc: 1.0 },
  { value: "containerShip", label: "Container Ship", fi: 1.0, fc: 1.0 },
  { value: "roRo", label: "Ro-Ro Ship", fi: 1.2, fc: 1.0 }, // fi farklı
  { value: "yacht", label: "Yacht (>400 GT)", fi: 1.2, fc: 0.7 }, // Yatlar için özel katsayılar
  // ... diğer tipler
] as const;

export const FUEL_TYPES = [
  { value: "HFO", label: "Heavy Fuel Oil (HFO)", cf: 3.206 },
  { value: "LFO", label: "Light Fuel Oil (LFO/MDO)", cf: 3.151 },
  { value: "LNG", label: "Liquefied Natural Gas (LNG)", cf: 2.750 },
] as const;

export const DEFAULT_SFC = 190; // g/kWh (IMO varsayılan)