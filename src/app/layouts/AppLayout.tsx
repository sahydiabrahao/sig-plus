import { Outlet } from 'react-router-dom';
import { Menu } from '@/app/components/menu/Menu';
import './AppLayout.scss';

export function AppLayout() {
  return (
    <div className='app-layout'>
      <aside className='app-layout__sidebar'>
        <Menu />
      </aside>
      <main className='app-layout__content'>
        <Outlet />
      </main>
    </div>
  );
}
