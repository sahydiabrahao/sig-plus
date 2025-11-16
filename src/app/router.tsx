import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/app/pages/dashboard/Dashboard';
import { AppLayout } from '@/app/layouts/AppLayout';
import { CaseProvider } from '@/context/CaseContext';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route
          element={
            <CaseProvider>
              <AppLayout />
            </CaseProvider>
          }
        >
          <Route index element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
