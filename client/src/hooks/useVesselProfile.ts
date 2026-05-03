import { useState, useCallback, useEffect } from "react";
import {
  VesselProfile,
  DEFAULT_PROFILE,
  loadProfile,
  saveProfile,
  clearProfile,
} from "@/data/vesselProfile";

export function useVesselProfile() {
  const [profile, setProfileState] = useState<VesselProfile>(() => {
    return loadProfile() || { ...DEFAULT_PROFILE };
  });

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const setProfile = useCallback((updates: Partial<VesselProfile>) => {
    setProfileState((prev: VesselProfile) => ({ ...prev, ...updates }));  // ✅ prev tipi eklendi
  }, []);

  const resetProfile = useCallback(() => {
    setProfileState({ ...DEFAULT_PROFILE });
    clearProfile();
  }, []);

  const setField = useCallback(<K extends keyof VesselProfile>(
    key: K,
    value: VesselProfile[K]
  ) => {
    setProfileState((prev: VesselProfile) => ({ ...prev, [key]: value }));  // ✅ prev tipi eklendi
  }, []);

  return {
    profile,
    setProfile,
    setField,
    resetProfile,
  };
}