import { useGameStore } from '../store/gameStore';
import { moonOrbiter } from '../data/missions';

export default function Home() {
  const { setSelectedMission, setScreen } = useGameStore();

  const start = () => {
    setSelectedMission(moonOrbiter);
    setScreen('briefing');
  };

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-16 text-center">
      <h1 className="text-4xl font-bold sm:text-5xl">MissionCraft</h1>
      <p className="text-lg text-slate-300">
        Design a spacecraft, pick a rocket, and guide it to the Moon.
        Every choice you make changes how your mission ends.
      </p>
      <button
        onClick={start}
        className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold hover:bg-blue-500"
      >
        Start Mission
      </button>
    </main>
  );
}
