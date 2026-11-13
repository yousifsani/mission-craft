// TEMPORARY stand-in. Shahzaman's real engine replaces this file.
// Agreed signature: calculateSnapshot(design, catalog, rocket, mission) => EngineeringSnapshot
import type {
  SpacecraftComponent,
  SpacecraftDesign,
  RocketProfile,
  MissionConfig,
  EngineeringSnapshot,
} from '../types/game';

const ISP_SECONDS = 320;
const G0 = 9.80665;

export function calculateSnapshot(
  design: SpacecraftDesign,
  catalog: SpacecraftComponent[],
  rocket: RocketProfile | null,
  mission: MissionConfig,
): EngineeringSnapshot {
  const parts = design.componentIds
    .map((id) => catalog.find((c) => c.id === id))
    .filter((c): c is SpacecraftComponent => c !== undefined);

  const sum = (pick: (c: SpacecraftComponent) => number | undefined) =>
    parts.reduce((total, c) => total + (pick(c) ?? 0), 0);
  const has = (category: SpacecraftComponent['category']) =>
    parts.some((c) => c.category === category);

  const dryMassKg = sum((c) => c.massKg);
  const propellantMassKg = design.propellantKg;
  const launchMassKg = dryMassKg + propellantMassKg;
  const payloadPass = rocket !== null && launchMassKg <= rocket.payloadCapacityKg;

  const availableDeltaVKmPerS =
    dryMassKg > 0 && has('propulsion')
      ? ((ISP_SECONDS * G0) / 1000) * Math.log(launchMassKg / dryMassKg)
      : 0;
  const deltaVPass = availableDeltaVKmPerS >= mission.requiredDeltaVKmPerS;

  const generatedPowerW = sum((c) => c.powerGenerationWAt1AU);
  const activeLoadW = sum((c) => c.powerConsumptionW);
  const powerMarginW = generatedPowerW - activeLoadW;

  const usableBatteryWh = sum((c) => c.batteryCapacityWh) * 0.8;
  const eclipseEnergyRequiredWh = activeLoadW * mission.eclipseDurationHours;
  const batteryPass = usableBatteryWh >= eclipseEnergyRequiredWh;

  const estimatedDataCapacityMB = (sum((c) => c.dataRateBps) * 86400) / 8 / 1_000_000;
  const estimatedCostCredits = sum((c) => c.costCredits) + (rocket?.costCredits ?? 0);
  const budgetPass = estimatedCostCredits <= mission.budgetCredits;

  const warnings: string[] = [];
  if (!has('bus')) warnings.push('Add a bus. Your spacecraft needs a main body.');
  if (!has('propulsion')) warnings.push('Add an engine, or you cannot reach the Moon.');
  if (!has('instrument')) warnings.push('Add at least one science instrument.');
  if (!has('communication')) warnings.push('Add an antenna, or you cannot send data home.');
  if (!has('power')) warnings.push('Add a solar panel, or you will have no power.');
  if (rocket === null) warnings.push('Pick a rocket.');
  if (rocket !== null && !payloadPass) warnings.push('Too heavy for this rocket. Remove parts or fuel, or pick a bigger rocket.');
  if (has('propulsion') && !deltaVPass) warnings.push('Not enough delta-v. Add more fuel or remove weight.');
  if (generatedPowerW > 0 && powerMarginW < 0) warnings.push('You use more power than you make. Add a solar panel.');
  if (has('power') && !batteryPass) warnings.push('Battery is too small to survive the Moon shadow.');
  if (
    estimatedDataCapacityMB <
    mission.requiredScienceDataMB * mission.requiredDataReturnFraction
  ) {
    warnings.push('Communication capacity is too low to return the required science data.');
  }
  if (!budgetPass) warnings.push('Over budget.');

  return {
    dryMassKg,
    propellantMassKg,
    launchMassKg,
    payloadPass,
    availableDeltaVKmPerS,
    deltaVPass,
    generatedPowerW,
    activeLoadW,
    powerMarginW,
    usableBatteryWh,
    eclipseEnergyRequiredWh,
    batteryPass,
    estimatedDataCapacityMB,
    estimatedCostCredits,
    budgetPass,
    warnings,
  };
}

export function isReady(s: EngineeringSnapshot, mission: MissionConfig): boolean {
  return (
    s.payloadPass &&
    s.deltaVPass &&
    s.powerMarginW >= 0 &&
    s.generatedPowerW > 0 &&
    s.batteryPass &&
    s.budgetPass &&
    s.estimatedDataCapacityMB >= mission.requiredScienceDataMB * mission.requiredDataReturnFraction &&
    s.warnings.length === 0
  );
}
