import { Outlet } from 'react-router-dom';
import type { DirNode } from '@/utils/read-directory-tree';
import { Menu } from '@/app/components/menu/Menu';
import { useCaseContext } from '@/context/CaseContext';
import './AppLayout.scss';

export type AppLayoutOutletContext = {
  selectedCaseHandle: FileSystemFileHandle | null;
  dirTree: DirNode | null;
};

export function AppLayout() {
  const {
    dirTree,
    setDirTree,
    rootHandle,
    importFolder,
    selectedCaseHandle,
    setSelectedCaseHandle,
  } = useCaseContext();

  return (
    <div className='app-layout'>
      <aside className='app-layout__sidebar'>
        <Menu
          dirTree={dirTree}
          setDirTree={setDirTree}
          rootHandle={rootHandle}
          importFolder={importFolder}
          onCaseJsonSelected={setSelectedCaseHandle}
        />
      </aside>

      <main className='app-layout__content'>
        <Outlet context={{ selectedCaseHandle, dirTree }} />
      </main>
    </div>
  );
}
