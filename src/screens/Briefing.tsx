import { useGameStore } from '../store/gameStore';

export default function Briefing() {
  const { selectedMission, setScreen } = useGameStore();

  if (!selectedMission) {
    return (
      <main className="p-8">
        <p className="mb-4">No mission selected yet.</p>
        <button
          onClick={() => setScreen('home')}
          className="rounded bg-blue-600 px-4 py-2"
        >
          Back to Home
        </button>
      </main>
    );
  }

  const m = selectedMission;

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-5 px-4 py-10">
      <h2 className="text-3xl font-bold">{m.name}</h2>
      <p className="text-slate-300">
        Your goal: build a spacecraft that reaches lunar orbit, survives the
        Moon&apos;s shadow, and sends science data back to Earth.
      </p>

      <ul className="grid gap-3 sm:grid-cols-2">
        <li className="rounded-lg bg-slate-800 p-4">
          <div className="text-sm text-slate-400">Budget</div>
          <div className="text-xl font-semibold">{m.budgetCredits} credits</div>
        </li>
        <li className="rounded-lg bg-slate-800 p-4">
          <div className="text-sm text-slate-400">Fuel power needed (delta-v)</div>
          <div className="text-xl font-semibold">{m.requiredDeltaVKmPerS} km/s</div>
        </li>
        <li className="rounded-lg bg-slate-800 p-4">
          <div className="text-sm text-slate-400">Time in the Moon&apos;s shadow</div>
          <div className="text-xl font-semibold">{m.eclipseDurationHours} hours</div>
        </li>
        <li className="rounded-lg bg-slate-800 p-4">
          <div className="text-sm text-slate-400">Science data to collect</div>
          <div className="text-xl font-semibold">{m.requiredScienceDataMB} MB</div>
        </li>
      </ul>

      <p className="text-sm text-slate-400">
        Delta-v is how much your spacecraft can change its speed. More fuel
        means more delta-v, but also more weight.
      </p>

      <button
        onClick={() => setScreen('designer')}
        className="self-start rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
      >
        Go to Designer
      </button>
    </main>
  );
}
