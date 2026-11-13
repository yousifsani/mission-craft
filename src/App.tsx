import { useGameStore } from './store/gameStore';
import type { Screen } from './store/gameStore';
import Home from './screens/Home';
import Briefing from './screens/Briefing';
import Designer from './screens/Designer';
import Rocket from './screens/Rocket';
import Readiness from './screens/Readiness';
import Simulation from './screens/Simulation';
import Debrief from './screens/Debrief';

const screens: Screen[] = [
  'home',
  'briefing',
  'designer',
  'rocket',
  'readiness',
  'simulation',
  'debrief',
];

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
      {currentScreen === 'designer' && <Designer />}
      {currentScreen === 'rocket' && <Rocket />}
      {currentScreen === 'readiness' && <Readiness />}
      {currentScreen === 'simulation' && <Simulation />}
      {currentScreen === 'debrief' && <Debrief />}
    </div>
  );
}
