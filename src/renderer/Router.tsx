import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/src/renderer/pages/login/Login';
import Dashboard from '@/src/renderer/pages/dashboard/Dashboard';

function RouterList() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default RouterList;
