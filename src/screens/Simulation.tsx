import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { componentCatalog } from '../data/components';
import { calculateSnapshot } from '../lib/calculateSnapshot';
import { runMission } from '../lib/runMission';
import type { MissionDecision, MissionPhase } from '../types/game';

const phases: { id: MissionPhase; title: string; text: string }[] = [
  { id: 'launch', title: 'Launch', text: 'Your rocket lifts off from Earth.' },
  { id: 'deployment', title: 'Deployment', text: 'The spacecraft separates and opens its solar panels.' },
  { id: 'transfer', title: 'Transfer', text: 'You coast toward the Moon.' },
  { id: 'lunar-insertion', title: 'Lunar insertion', text: 'The engine fires to enter lunar orbit.' },
  { id: 'operations', title: 'Operations', text: 'Your instruments collect science data.' },
  { id: 'communication', title: 'Communication', text: 'Your antenna sends the data to Earth.' },
];

export default function Simulation() {
  const { design, selectedRocket, selectedMission, setMissionResult, setScreen } = useGameStore();
  const [step, setStep] = useState(0);
  const [decisions, setDecisions] = useState<MissionDecision[]>([]);

  if (!selectedMission) {
    return (
      <main className="p-8">
        <button onClick={() => setScreen('home')} className="rounded bg-blue-600 px-4 py-2">
          Home
        </button>
      </main>
    );
  }

  const current = phases[step];
  const needsDecision = current.id === 'operations' && decisions.length === 0;

  const decide = (choiceId: string) => {
    setDecisions([{ eventId: 'power-mode', choiceId, missionTimeSeconds: step * 3600 }]);
  };

  const next = () => {
    if (step < phases.length - 1) {
      setStep(step + 1);
      return;
    }
    const snapshot = calculateSnapshot(design, componentCatalog, selectedRocket, selectedMission);
    setMissionResult(runMission(design, componentCatalog, snapshot, selectedMission, decisions));
    setScreen('debrief');
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-10">
      <h2 className="text-3xl font-bold">Mission Control</h2>

      <ol className="flex flex-wrap gap-2">
        {phases.map((p, i) => (
          <li
            key={p.id}
            className={`rounded px-3 py-1 text-sm ${
              i < step ? 'bg-green-700' : i === step ? 'bg-blue-600' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {p.title}
          </li>
        ))}
      </ol>

      <div className="rounded-lg bg-slate-800 p-5">
        <div className="text-xl font-semibold">{current.title}</div>
        <p className="mt-1 text-slate-300">{current.text}</p>
      </div>

      {needsDecision ? (
        <div className="rounded-lg border border-yellow-600 bg-yellow-950 p-4">
          <div className="mb-2 font-semibold">Mission Control decision</div>
          <p className="mb-3 text-sm text-yellow-100">
            You can run the instruments at full power for more data, or save power to stay safe.
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => decide('boost')} className="rounded bg-orange-600 px-4 py-2 hover:bg-orange-500">
              Full power (more data, more risk)
            </button>
            <button onClick={() => decide('conserve')} className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500">
              Save power (safer)
            </button>
          </div>
        </div>
      ) : (
        <button onClick={next} className="self-start rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
          {step < phases.length - 1 ? 'Next phase' : 'Finish mission'}
        </button>
      )}
    </main>
  );
}
