import { create } from 'zustand';
import type { SpacecraftDesign, RocketProfile, MissionConfig } from '../types/game';

export type Screen =
  | 'home'
  | 'briefing'
  | 'designer'
  | 'rocket'
  | 'readiness'
  | 'simulation'
  | 'debrief';

interface GameState {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;

  selectedMission: MissionConfig | null;
  setSelectedMission: (mission: MissionConfig) => void;

  design: SpacecraftDesign;
  addComponent: (componentId: string) => void;
  removeComponent: (componentId: string) => void;
  setPropellant: (kg: number) => void;

  selectedRocket: RocketProfile | null;
  setSelectedRocket: (rocket: RocketProfile) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentScreen: 'home',
  setScreen: (screen) => set({ currentScreen: screen }),

  selectedMission: null,
  setSelectedMission: (mission) => set({ selectedMission: mission }),

  design: {
    componentIds: [],
    propellantKg: 50,
    activeInstrumentIds: [],
    configurationVersion: 1,
  },

  addComponent: (componentId) =>
    set((state) => ({
      design: {
        ...state.design,
        componentIds: [...state.design.componentIds, componentId],
        configurationVersion: state.design.configurationVersion + 1,
      },
    })),

  removeComponent: (componentId) =>
    set((state) => ({
      design: {
        ...state.design,
        componentIds: state.design.componentIds.filter((id) => id !== componentId),
        activeInstrumentIds: state.design.activeInstrumentIds.filter((id) => id !== componentId),
        configurationVersion: state.design.configurationVersion + 1,
      },
    })),

  setPropellant: (kg) =>
    set((state) => ({
      design: { ...state.design, propellantKg: kg },
    })),

  selectedRocket: null,
  setSelectedRocket: (rocket) => set({ selectedRocket: rocket }),
}));
