// src/types/game.ts
// Shared data contracts for MissionCraft 

export type ComponentCategory = 
  | "bus" 
  | "instrument" 
  | "power" 
  | "battery" 
  | "communication" 
  | "propulsion";

export interface SpacecraftComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  massKg: number;
  costCredits: number;
  powerConsumptionW?: number;
  powerGenerationWAt1AU?: number;
  solarAreaM2?: number;
  efficiency?: number;
  batteryCapacityWh?: number;
  dataRateBps?: number;
  scienceValue?: number;
  mountingPoint?: string;
  modelKey: string;
  description: string;
}

export interface SpacecraftDesign {
  componentIds: string[];
  propellantKg: number;
  activeInstrumentIds: string[];
  configurationVersion: number;
}

export interface RocketProfile {
  id: string;
  name: string;
  payloadCapacityKg: number;
  costCredits: number;
  missionCapabilityLabel: string;
}

export interface MissionConfig {
  id: string;
  name: string;
  destination: "moon" | "mars";
  missionType: "orbiter";
  budgetCredits: number;
  requiredDeltaVKmPerS: number;
  eclipseDurationHours: number;
  requiredScienceDataMB: number;
  requiredDataReturnFraction: number;
  eventSeed: number;
}

export interface EngineeringSnapshot {
  dryMassKg: number;
  propellantMassKg: number;
  launchMassKg: number;
  payloadPass: boolean;
  availableDeltaVKmPerS: number;
  deltaVPass: boolean;
  generatedPowerW: number;
  activeLoadW: number;
  powerMarginW: number;
  usableBatteryWh: number;
  eclipseEnergyRequiredWh: number;
  batteryPass: boolean;
  estimatedDataCapacityMB: number;
  estimatedCostCredits: number;
  budgetPass: boolean;
  warnings: string[];
}

export type MissionPhase = 
  | "launch" 
  | "deployment" 
  | "transfer" 
  | "lunar-insertion" 
  | "operations" 
  | "communication" 
  | "completed" 
  | "failed";

export interface MissionDecision {
  eventId: string;
  choiceId: string;
  missionTimeSeconds: number;
}

export interface MissionResult {
  missionId: string;
  outcome: "success" | "partial" | "failure";
  phaseReached: MissionPhase;
  decisions: MissionDecision[];
  eventSeed: number;
  scienceDataGeneratedMB: number;
  scienceDataReturnedMB: number;
  failureReasons: string[];
  score: {
    science: number;
    engineering: number;
    cost: number;
    reliability: number;
    safety: number;
    total: number;
  };
}
