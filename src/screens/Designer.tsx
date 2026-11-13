import { useGameStore } from '../store/gameStore';
import { componentCatalog, getComponent } from '../data/components';

export default function Designer() {
  const { design, addComponent, removeComponent, setPropellant, setScreen } = useGameStore();

  const totalMass = design.componentIds.reduce(
    (t, id) => t + (getComponent(id)?.massKg ?? 0),
    0,
  );

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
      <section className="md:col-span-1">
        <h2 className="mb-3 text-2xl font-bold">Parts tray</h2>
        <p className="mb-3 text-sm text-slate-400">
          Click a part to add it. You need a bus, an engine, a science
          instrument, a solar panel and an antenna.
        </p>
        <ul className="flex flex-col gap-2">
          {componentCatalog.map((c) => (
            <li key={c.id} className="rounded-lg bg-slate-800 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-slate-400">
                    {c.category} - {c.massKg} kg - {c.costCredits} credits
                  </div>
                </div>
                <button
                  onClick={() => addComponent(c.id)}
                  className="rounded bg-blue-600 px-3 py-1 text-sm hover:bg-blue-500"
                >
                  Add
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-300">{c.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4 md:col-span-2">
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-600 text-slate-400">
          3D spacecraft view goes here (Alisha)
        </div>

        <div>
          <h3 className="mb-2 text-xl font-semibold">Your spacecraft</h3>
          {design.componentIds.length === 0 ? (
            <p className="text-slate-400">Nothing added yet.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {design.componentIds.map((id, i) => (
                <li
                  key={`${id}-${i}`}
                  className="flex items-center gap-2 rounded bg-slate-800 px-3 py-1"
                >
                  <span>{getComponent(id)?.name ?? id}</span>
                  <button
                    onClick={() => removeComponent(id)}
                    className="text-red-400 hover:text-red-300"
                    aria-label={`Remove ${id}`}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <label className="block font-semibold" htmlFor="fuel">
            Fuel: {design.propellantKg} kg
          </label>
          <input
            id="fuel"
            type="range"
            min={0}
            max={800}
            step={10}
            value={design.propellantKg}
            onChange={(e) => setPropellant(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <p className="mt-2 text-sm text-slate-400">
            More fuel gives more delta-v, but makes the spacecraft heavier.
            Parts weigh {totalMass} kg.
          </p>
        </div>

        <button
          onClick={() => setScreen('rocket')}
          className="self-start rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
        >
          Choose a rocket
        </button>
      </section>
    </main>
  );
}
