import { useEffect, useState } from 'react';
import type { DirNode, NodeItem } from '@/utils/read-directory-tree';
import type { CaseJson, CaseSummary } from '@/types/json-default';
import { makeCaseSummary } from '@/utils/make-case-summary';

type CaseFileMeta = {
  folderPath: string;
  folderName: string;
  fileName: string;
  handle: FileSystemFileHandle;
};

function isDirectory(node: NodeItem): node is DirNode {
  return node.type === 'directory';
}

function collectCaseFiles(root: DirNode): CaseFileMeta[] {
  const results: CaseFileMeta[] = [];

  function visit(dir: DirNode) {
    const baseName = dir.name;

    const jsonChild = dir.children.find(
      (child) =>
        child.type === 'file' && child.name.toLowerCase() === `${baseName.toLowerCase()}.json`
    ) as (NodeItem & { handle: FileSystemFileHandle }) | undefined;

    if (jsonChild) {
      results.push({
        folderPath: dir.path,
        folderName: dir.name,
        fileName: jsonChild.name,
        handle: jsonChild.handle,
      });
    }

    for (const child of dir.children) {
      if (isDirectory(child)) {
        visit(child);
      }
    }
  }

  visit(root);
  return results;
}

type UseCaseSummariesResult = {
  summaries: CaseSummary[];
  loading: boolean;
  error: string | null;
};

export function useCaseSummary(dirTree: DirNode | null): UseCaseSummariesResult {
  const [summaries, setSummaries] = useState<CaseSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!dirTree) {
        setSummaries([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const caseFiles = collectCaseFiles(dirTree);

        const summariesPromises = caseFiles.map(async (meta) => {
          try {
            const file = await meta.handle.getFile();
            const text = await file.text();
            const json = JSON.parse(text) as CaseJson;

            return makeCaseSummary({
              json,
              handle: meta.handle,
              folderPath: meta.folderPath,
              folderName: meta.folderName,
              fileName: meta.fileName,
            });
          } catch (err) {
            console.error('Erro ao ler JSON do caso:', err);
            return null;
          }
        });

        const loaded = (await Promise.all(summariesPromises)).filter(
          (s): s is CaseSummary => s !== null
        );

        if (!cancelled) {
          setSummaries(loaded);
        }
      } catch (err) {
        console.error('Erro ao carregar resumos de casos:', err);
        if (!cancelled) {
          setError('Erro ao carregar casos.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [dirTree]);

  return {
    summaries,
    loading,
    error,
  };
}
