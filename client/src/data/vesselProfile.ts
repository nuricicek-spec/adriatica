// src/data/vesselProfile.ts

export interface VesselProfile {
  vesselType: string;
  dwt: number;
  targetYear: number;
  meMcr: number;
  meFuel: string;
  meSfc: number;
  vref: number;
  hasPto: boolean;
  ptoPower: number;
  ptoEff: number;
  auxPower: number;
  auxSfc: number;
  annualFuel: number;
  annualDistance: number;
}

export const DEFAULT_PROFILE: VesselProfile = {
  vesselType: "yacht",
  dwt: 500,
  targetYear: 2026,
  meMcr: 2000,
  meFuel: "VLSFO",
  meSfc: 195,
  vref: 14,
  hasPto: false,
  ptoPower: 0,
  ptoEff: 1.0,
  auxPower: 300,
  auxSfc: 215,
  annualFuel: 450,
  annualDistance: 15000,
};

const STORAGE_KEY = "adriatica_vessel_profile";

export function loadProfile(): VesselProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VesselProfile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: VesselProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}