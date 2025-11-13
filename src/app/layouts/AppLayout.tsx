import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from '@/app/components/menu/Menu';
import './AppLayout.scss';

export type AppLayoutOutletContext = {
  selectedCaseHandle: FileSystemFileHandle | null;
};

export function AppLayout() {
  const [selectedCaseHandle, setSelectedCaseHandle] = useState<FileSystemFileHandle | null>(null);

  function handleCaseJsonSelected(handle: FileSystemFileHandle) {
    setSelectedCaseHandle(handle);
  }

  return (
    <div className='app-layout'>
      <aside className='app-layout__sidebar'>
        <Menu onCaseJsonSelected={handleCaseJsonSelected} />
      </aside>
      <main className='app-layout__content'>
        <Outlet context={{ selectedCaseHandle } satisfies AppLayoutOutletContext} />
      </main>
    </div>
  );
}
