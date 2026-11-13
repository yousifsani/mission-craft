import { useGameStore } from '../store/gameStore';
import { rockets } from '../data/missions';

export default function Rocket() {
  const { selectedRocket, setSelectedRocket, setScreen, design } = useGameStore();

  const hasSpacecraftParts = design.componentIds.length > 0;

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-10">
      <h2 className="text-3xl font-bold">Choose a rocket</h2>
      <p className="text-slate-300">
        The rocket carries your spacecraft into space. A bigger rocket lifts more
        weight, but costs more credits.
        {!hasSpacecraftParts && ' (Tip: build your spacecraft first.)'}
      </p>

      <ul className="grid gap-3 sm:grid-cols-3">
        {rockets.map((r) => {
          const active = selectedRocket?.id === r.id;
          return (
            <li
              key={r.id}
              className={`flex flex-col gap-2 rounded-lg border p-4 ${
                active ? 'border-blue-500 bg-slate-800' : 'border-slate-700 bg-slate-900'
              }`}
            >
              <div className="text-xl font-semibold">{r.name}</div>
              <div className="text-sm text-slate-300">Lifts up to {r.payloadCapacityKg} kg</div>
              <div className="text-sm text-slate-300">Costs {r.costCredits} credits</div>
              <p className="text-xs text-slate-400">{r.missionCapabilityLabel}</p>
              <button
                onClick={() => setSelectedRocket(r)}
                className="mt-auto rounded bg-blue-600 px-3 py-1 hover:bg-blue-500"
              >
                {active ? 'Selected' : 'Select'}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex gap-3">
        <button onClick={() => setScreen('designer')} className="rounded bg-slate-700 px-4 py-2">
          Back
        </button>
        <button
          onClick={() => setScreen('readiness')}
          disabled={!selectedRocket}
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold hover:bg-blue-500 disabled:opacity-40"
        >
          Check readiness
        </button>
      </div>
    </main>
  );
}
