import { useGameStore } from './store/gameStore';
import type { Screen } from './store/gameStore';
import Home from './screens/Home';
import Briefing from './screens/Briefing';

const screens: Screen[] = [
  'home',
  'briefing',
  'designer',
  'rocket',
  'readiness',
  'simulation',
  'debrief',
];

function Placeholder({ name }: { name: string }) {
  return <div className="p-8 text-2xl capitalize">{name} screen (coming soon)</div>;
}

export default function App() {
  const { currentScreen, setScreen } = useGameStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex flex-wrap gap-2 bg-slate-900 p-3">
        {screens.map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s)}
            className={`rounded px-3 py-1 capitalize ${
              currentScreen === s ? 'bg-blue-600' : 'bg-slate-700'
            }`}
          >
            {s}
          </button>
        ))}
      </nav>
      {currentScreen === 'home' && <Home />}
      {currentScreen === 'briefing' && <Briefing />}
      {currentScreen !== 'home' && currentScreen !== 'briefing' && (
        <Placeholder name={currentScreen} />
      )}
    </div>
  );
}
