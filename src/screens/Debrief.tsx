import { useGameStore } from '../store/gameStore';

const labels = {
  success: 'Mission success!',
  partial: 'Partial success',
  failure: 'Mission failed',
} as const;

export default function Debrief() {
  const { missionResult, resetGame } = useGameStore();

  if (!missionResult) {
    return (
      <main className="p-8">
        <p className="mb-4">No mission has been flown yet.</p>
        <button onClick={resetGame} className="rounded bg-blue-600 px-4 py-2">
          Home
        </button>
      </main>
    );
  }

  const r = missionResult;
  const rows: [string, number][] = [
    ['Science', r.score.science],
    ['Engineering', r.score.engineering],
    ['Cost', r.score.cost],
    ['Reliability', r.score.reliability],
    ['Safety', r.score.safety],
  ];

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-10">
      <h2 className="text-4xl font-bold">{labels[r.outcome]}</h2>
      <p className="text-slate-300">
        Science generated: {Math.round(r.scienceDataGeneratedMB)} MB. Science
        returned to Earth: {Math.round(r.scienceDataReturnedMB)} MB.
      </p>

      <ul className="flex flex-col gap-2">
        {rows.map(([name, value]) => (
          <li key={name} className="rounded-lg bg-slate-800 p-3">
            <div className="mb-1 flex justify-between text-sm">
              <span>{name}</span>
              <span>{value}/100</span>
            </div>
            <div className="h-2 rounded bg-slate-700">
              <div className="h-2 rounded bg-blue-500" style={{ width: `${value}%` }} />
            </div>
          </li>
        ))}
      </ul>

      <div className="text-2xl font-semibold">Total score: {r.score.total}</div>

      {r.failureReasons.length > 0 && (
        <ul className="list-disc pl-5 text-sm text-yellow-200">
          {r.failureReasons.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}

      <button onClick={resetGame} className="self-start rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
        Play again
      </button>
    </main>
  );
}
