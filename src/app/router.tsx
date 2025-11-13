// src/app/router.tsx
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/app/pages/dashboard/Dashboard';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' replace />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </HashRouter>
  );
}
