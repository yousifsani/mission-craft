import { create } from 'zustand';
import type {
  SpacecraftDesign,
  RocketProfile,
  MissionConfig,
  MissionResult,
} from '../types/game';

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

  missionResult: MissionResult | null;
  setMissionResult: (result: MissionResult) => void;

  resetGame: () => void;
}

const initialDesign: SpacecraftDesign = {
  componentIds: [],
  propellantKg: 50,
  activeInstrumentIds: [],
  configurationVersion: 1,
};

export const useGameStore = create<GameState>((set) => ({
  currentScreen: 'home',
  setScreen: (screen) => set({ currentScreen: screen }),

  selectedMission: null,
  setSelectedMission: (mission) => set({ selectedMission: mission }),

  design: initialDesign,

  addComponent: (componentId) =>
    set((state) => ({
      design: {
        ...state.design,
        componentIds: [...state.design.componentIds, componentId],
        configurationVersion: state.design.configurationVersion + 1,
      },
    })),

  removeComponent: (componentId) =>
    set((state) => {
      const index = state.design.componentIds.indexOf(componentId);
      if (index === -1) return state;
      const componentIds = state.design.componentIds.filter((_, i) => i !== index);
      return {
        design: {
          ...state.design,
          componentIds,
          activeInstrumentIds: state.design.activeInstrumentIds.filter((id) =>
            componentIds.includes(id),
          ),
          configurationVersion: state.design.configurationVersion + 1,
        },
      };
    }),

  setPropellant: (kg) =>
    set((state) => ({
      design: { ...state.design, propellantKg: kg },
    })),

  selectedRocket: null,
  setSelectedRocket: (rocket) => set({ selectedRocket: rocket }),

  missionResult: null,
  setMissionResult: (result) => set({ missionResult: result }),

  resetGame: () =>
    set({
      currentScreen: 'home',
      selectedMission: null,
      design: initialDesign,
      selectedRocket: null,
      missionResult: null,
    }),
}));
