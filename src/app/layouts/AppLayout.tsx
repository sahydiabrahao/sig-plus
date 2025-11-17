import { Outlet } from 'react-router-dom';
import { Menu, Sidebar } from '@/app/components';
import './AppLayout.scss';

export function AppLayout() {
  return (
    <div className='app-layout'>
      <aside className='app-layout__sidebar'>
        <Sidebar />
      </aside>

      <aside className='app-layout__menu'>
        <Menu />
      </aside>

      <main className='app-layout__content'>
        <Outlet />
      </main>
    </div>
  );
}
