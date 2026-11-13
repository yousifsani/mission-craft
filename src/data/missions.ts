import type { MissionConfig, RocketProfile } from '../types/game';

export const moonOrbiter: MissionConfig = {
  id: 'moon-orbiter-1',
  name: 'Lunar Science Orbiter',
  destination: 'moon',
  missionType: 'orbiter',
  budgetCredits: 1000,
  requiredDeltaVKmPerS: 3.0,
  eclipseDurationHours: 0.75,
  requiredScienceDataMB: 500,
  requiredDataReturnFraction: 0.8,
  eventSeed: 2026,
};

export const rockets: RocketProfile[] = [
  {
    id: 'rocket-small',
    name: 'Falcon Lite',
    payloadCapacityKg: 300,
    costCredits: 200,
    missionCapabilityLabel: 'Cheap, but only carries a light spacecraft',
  },
  {
    id: 'rocket-medium',
    name: 'Atlas Mid',
    payloadCapacityKg: 600,
    costCredits: 350,
    missionCapabilityLabel: 'Balanced choice for a Moon orbiter',
  },
  {
    id: 'rocket-heavy',
    name: 'Titan Heavy',
    payloadCapacityKg: 1200,
    costCredits: 600,
    missionCapabilityLabel: 'Carries a lot, but eats most of your budget',
  },
];
