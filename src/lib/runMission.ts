// TEMPORARY stand-in. Zara's real simulation replaces this file.
// Agreed signature: runMission(design, catalog, snapshot, mission, decisions) => MissionResult
import type {
  SpacecraftComponent,
  SpacecraftDesign,
  EngineeringSnapshot,
  MissionConfig,
  MissionDecision,
  MissionResult,
} from '../types/game';
import { isReady } from './calculateSnapshot';

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function runMission(
  design: SpacecraftDesign,
  catalog: SpacecraftComponent[],
  snapshot: EngineeringSnapshot,
  mission: MissionConfig,
  decisions: MissionDecision[],
): MissionResult {
  const parts = design.componentIds
    .map((id) => catalog.find((c) => c.id === id))
    .filter((c): c is SpacecraftComponent => c !== undefined);

  const boosted = decisions.some((d) => d.choiceId === 'boost');
  const ready = isReady(snapshot, mission);

  const baseScience = parts.reduce((t, c) => t + (c.scienceValue ?? 0), 0) * 10;
  const scienceDataGeneratedMB = ready ? baseScience * (boosted ? 1.3 : 1) : 0;
  const scienceDataReturnedMB = Math.min(scienceDataGeneratedMB, snapshot.estimatedDataCapacityMB);

  const failureReasons = [...snapshot.warnings];
  const needed = mission.requiredScienceDataMB * mission.requiredDataReturnFraction;

  let outcome: MissionResult['outcome'] = 'failure';
  if (ready) {
    outcome = scienceDataReturnedMB >= needed ? 'success' : 'partial';
    if (outcome === 'partial') failureReasons.push('Not enough science data reached Earth.');
  }

  const science = clamp((scienceDataReturnedMB / mission.requiredScienceDataMB) * 100);
  const engineering = ready ? 90 : 40;
  const cost = clamp((1 - snapshot.estimatedCostCredits / mission.budgetCredits) * 100 + 50);
  const reliability = ready ? 85 : 30;
  const safety = boosted ? 70 : 90;
  const total = Math.round((science + engineering + cost + reliability + safety) / 5);

  return {
    missionId: mission.id,
    outcome,
    phaseReached: ready ? 'completed' : 'failed',
    decisions,
    eventSeed: mission.eventSeed,
    scienceDataGeneratedMB,
    scienceDataReturnedMB,
    failureReasons,
    score: { science, engineering, cost, reliability, safety, total },
  };
}
