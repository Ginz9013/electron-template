import { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from '@/src/renderer/pages/login/Login';
import Dashboard from '@/src/renderer/pages/dashboard/Dashboard';
import Weight from '@/src/renderer/pages/Return/Weight/Weight';

const RouterList = () => (
  <Router>
    <RouterSwitcher />
  </Router>
);

const RouterSwitcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onNavigation = (_: any, { path }: { path: string }) => navigate(path);
    window.electron.ipcRenderer.onNavigate(onNavigation);
    return () => {
      window.electron.ipcRenderer.removeListener('on-navigate', onNavigation);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/return/weight" element={<Weight />} />
      <Route path="/return/scan_log" element={<TemporaryTemplate title="return/scan_log" />} />
    </Routes>
  )
};

const TemporaryTemplate = ({ title }: { title: string }) => {
  return (
    <h1 className="text-2xl text-white text-center">{title}</h1>
  );
};

export default RouterList;
