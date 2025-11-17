// Sidebar.tsx
import { ButtonIcon } from '@/app/components/button-icon/ButtonIcon';
import { ImportIcon, FileJsonIcon, RefreshIcon } from '@/icons';
import { useCaseContext } from '@/context/CaseContext';
import { useCreateJsonFile } from '@/hooks';
import { scanDirectoryTree } from '@/utils/read-directory-tree';
import './Sidebar.scss';

export function Sidebar() {
  const { dirTree, setDirTree, rootHandle, importFolder, currentDirPath } = useCaseContext();

  const { createJsonFile } = useCreateJsonFile({
    rootHandle,
    dirTree,
    currentDirPath,
    setDirTree,
  });

  async function handleRefreshTree() {
    if (!rootHandle) return;
    const updatedTree = await scanDirectoryTree(rootHandle);
    setDirTree(updatedTree);
  }

  return (
    <div className='sidebar'>
      <ButtonIcon icon={ImportIcon} onClick={importFolder} size='lg' />
      <ButtonIcon icon={FileJsonIcon} onClick={createJsonFile} size='lg' />
      <ButtonIcon icon={RefreshIcon} onClick={handleRefreshTree} size='lg' />
    </div>
  );
}
