import 'tailwindcss/tailwind.css';
import '@/src/renderer/App.css';
import RouterList from '@/src/renderer/Router';

export default function App() {
  return (
    <div className="w-screen h-screen bg-slate-800">
      <RouterList />
    </div>
  );
}
