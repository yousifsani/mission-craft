import { useGameStore } from '../store/gameStore';
import { componentCatalog } from '../data/components';
import { calculateSnapshot, isReady } from '../lib/calculateSnapshot';

function Check({ label, pass, detail }: { label: string; pass: boolean; detail: string }) {
  return (
    <li className="flex items-center gap-3 rounded-lg bg-slate-800 p-3">
      <span className={`h-4 w-4 shrink-0 rounded-full ${pass ? 'bg-green-500' : 'bg-red-500'}`} />
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-sm text-slate-400">{detail}</div>
      </div>
    </li>
  );
}

export default function Readiness() {
  const { design, selectedRocket, selectedMission, setScreen } = useGameStore();

  if (!selectedMission) {
    return (
      <main className="p-8">
        <p className="mb-4">Start from the Home screen first.</p>
        <button onClick={() => setScreen('home')} className="rounded bg-blue-600 px-4 py-2">
          Home
        </button>
      </main>
    );
  }

  const s = calculateSnapshot(design, componentCatalog, selectedRocket, selectedMission);
  const ready = isReady(s, selectedMission);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-10">
      <h2 className="text-3xl font-bold">Launch readiness</h2>

      <ul className="flex flex-col gap-2">
        <Check
          label="Weight fits the rocket"
          pass={s.payloadPass}
          detail={`${Math.round(s.launchMassKg)} kg launch mass, rocket lifts ${selectedRocket?.payloadCapacityKg ?? 0} kg`}
        />
        <Check
          label="Enough delta-v"
          pass={s.deltaVPass}
          detail={`${s.availableDeltaVKmPerS.toFixed(2)} km/s, need ${selectedMission.requiredDeltaVKmPerS} km/s`}
        />
        <Check
          label="Power balance"
          pass={s.powerMarginW >= 0 && s.generatedPowerW > 0}
          detail={`Make ${s.generatedPowerW} W, use ${s.activeLoadW} W`}
        />
        <Check
          label="Battery survives the Moon shadow"
          pass={s.batteryPass}
          detail={`${Math.round(s.usableBatteryWh)} Wh usable, need ${Math.round(s.eclipseEnergyRequiredWh)} Wh`}
        />
        <Check
          label="Data can reach Earth"
          pass={
            s.estimatedDataCapacityMB >=
            selectedMission.requiredScienceDataMB * selectedMission.requiredDataReturnFraction
          }
          detail={`Can send about ${Math.round(s.estimatedDataCapacityMB)} MB per day`}
        />
        <Check
          label="Within budget"
          pass={s.budgetPass}
          detail={`${s.estimatedCostCredits} of ${selectedMission.budgetCredits} credits`}
        />
      </ul>

      {s.warnings.length > 0 && (
        <div className="rounded-lg border border-yellow-600 bg-yellow-950 p-4">
          <div className="mb-1 font-semibold">Things to fix</div>
          <ul className="list-disc pl-5 text-sm text-yellow-100">
            {s.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={() => setScreen('designer')} className="rounded bg-slate-700 px-4 py-2">
          Back to designer
        </button>
        <button
          onClick={() => setScreen('simulation')}
          disabled={!ready}
          className="rounded-lg bg-green-600 px-6 py-2 font-semibold hover:bg-green-500 disabled:opacity-40"
        >
          Launch!
        </button>
      </div>
    </main>
  );
}
