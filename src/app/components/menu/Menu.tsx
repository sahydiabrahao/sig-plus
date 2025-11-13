import { useEffect, useState } from 'react';
import './Menu.scss';
import { scanDirectoryTree } from '@/utils/read-directory-tree';
import type { DirNode } from '@/utils/read-directory-tree';
import { ButtonIcon } from '@/app/components/button-icon/ButtonIcon';
import { TreeView } from '@/app/components/tree-view/TreeView';
import { ImportIcon, ExpandIcon, CollapseIcon } from '@/icons';
import { loadDirectoryHandle, saveDirectoryHandle } from '@/storage';

export function Menu() {
  const [dirTree, setDirTree] = useState<DirNode | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const handle = await loadDirectoryHandle();
      if (!handle) return;
      const permission = await handle.queryPermission?.({ mode: 'read' as const });
      if (permission === 'denied') return;
      if (permission !== 'granted') {
        const requestResult = await handle.requestPermission?.({ mode: 'read' as const });
        if (requestResult !== 'granted') return;
      }
      const tree = await scanDirectoryTree(handle);
      setDirTree(tree);
      const initialExpanded = new Set<string>();
      initialExpanded.add(tree.path);
      setExpanded(initialExpanded);
    })();
  }, []);

  async function handleImportFolder() {
    const dir = await window.showDirectoryPicker!({ mode: 'read' });
    await saveDirectoryHandle(dir);
    const tree = await scanDirectoryTree(dir);
    setDirTree(tree);
    const expanded = new Set<string>();
    expanded.add(tree.path);
    setExpanded(expanded);
  }

  function handleToggle(path: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }

  function collectAllDirPaths(node: DirNode, acc: Set<string>) {
    acc.add(node.path);
    for (const child of node.children) {
      if (child.type === 'directory') {
        collectAllDirPaths(child, acc);
      }
    }
  }

  function handleExpandAll() {
    if (!dirTree) return;
    const all = new Set<string>();
    collectAllDirPaths(dirTree, all);
    setExpanded(all);
  }

  function handleCollapseAll() {
    setExpanded(new Set());
  }

  return (
    <div className='menu'>
      <div className='menu__actions'>
        <ButtonIcon icon={ImportIcon} onClick={handleImportFolder} size='lg' />
        <ButtonIcon icon={ExpandIcon} onClick={handleExpandAll} size='lg' />
        <ButtonIcon icon={CollapseIcon} onClick={handleCollapseAll} size='lg' />
      </div>

      <div className='menu__list'>
        {!dirTree && <div className='menu__item menu__item--empty'>Nenhuma pasta importada</div>}

        {dirTree && (
          <TreeView
            root={dirTree}
            expanded={expanded}
            onToggle={handleToggle}
            onFileClick={async (handle) => {
              const file = await handle.getFile();
              const url = URL.createObjectURL(file);
              window.open(url, '_blank');
              setTimeout(() => URL.revokeObjectURL(url), 5000);
            }}
          />
        )}
      </div>
    </div>
  );
}
