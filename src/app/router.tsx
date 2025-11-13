import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/app/pages/dashboard/Dashboard';
import { AppLayout } from '@/app/layouts/AppLayout';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
