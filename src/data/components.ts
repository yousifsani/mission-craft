import type { SpacecraftComponent } from '../types/game';

export const componentCatalog: SpacecraftComponent[] = [
  { id: 'bus-standard', name: 'Standard Bus', category: 'bus', massKg: 80, costCredits: 100, powerConsumptionW: 20, modelKey: 'bus-standard', description: 'The main body. Every spacecraft needs one.' },
  { id: 'engine-main', name: 'Orbit Engine', category: 'propulsion', massKg: 30, costCredits: 80, modelKey: 'engine-main', description: 'Burns fuel to reach and enter lunar orbit.' },
  { id: 'inst-camera', name: 'Lunar Camera', category: 'instrument', massKg: 15, costCredits: 60, powerConsumptionW: 25, scienceValue: 40, modelKey: 'inst-camera', description: 'Takes photos of the Moon surface.' },
  { id: 'inst-spectrometer', name: 'Spectrometer', category: 'instrument', massKg: 25, costCredits: 90, powerConsumptionW: 35, scienceValue: 70, modelKey: 'inst-spectrometer', description: 'Measures what the Moon surface is made of.' },
  { id: 'panel-small', name: 'Small Solar Panel', category: 'power', massKg: 12, costCredits: 50, powerGenerationWAt1AU: 150, solarAreaM2: 1, efficiency: 0.3, modelKey: 'panel-small', description: 'Turns sunlight into electricity (150 W).' },
  { id: 'panel-large', name: 'Large Solar Panel', category: 'power', massKg: 25, costCredits: 90, powerGenerationWAt1AU: 300, solarAreaM2: 2, efficiency: 0.3, modelKey: 'panel-large', description: 'More electricity (300 W), but heavier.' },
  { id: 'battery-small', name: 'Small Battery', category: 'battery', massKg: 10, costCredits: 40, batteryCapacityWh: 200, modelKey: 'battery-small', description: 'Stores 200 Wh for when the Moon blocks the Sun.' },
  { id: 'battery-large', name: 'Large Battery', category: 'battery', massKg: 25, costCredits: 80, batteryCapacityWh: 500, modelKey: 'battery-large', description: 'Stores 500 Wh of energy.' },
  { id: 'comm-antenna', name: 'Basic Antenna', category: 'communication', massKg: 8, costCredits: 50, powerConsumptionW: 15, dataRateBps: 100000, modelKey: 'comm-antenna', description: 'Sends data to Earth slowly.' },
  { id: 'comm-dish', name: 'High-Gain Dish', category: 'communication', massKg: 15, costCredits: 90, powerConsumptionW: 30, dataRateBps: 250000, modelKey: 'comm-dish', description: 'Sends data to Earth much faster.' },
];

export function getComponent(id: string): SpacecraftComponent | undefined {
  return componentCatalog.find((c) => c.id === id);
}
