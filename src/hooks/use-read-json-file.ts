import { useEffect, useState } from 'react';
import type { CaseJson } from '@/types/json-default';

type UseReadJsonFileParams = {
  handle: FileSystemFileHandle | null;
};

type UseReadJsonFileResult = {
  data: CaseJson | null;
  loading: boolean;
  error: string | null;
};

export function useReadJsonFile({ handle }: UseReadJsonFileParams): UseReadJsonFileResult {
  const [data, setData] = useState<CaseJson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!handle) {
        setData(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const file = await handle.getFile();
        const text = await file.text();
        const parsed = JSON.parse(text) as CaseJson;

        if (cancelled) return;

        setData(parsed);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar JSON do caso:', err);
        if (cancelled) return;

        setError('Não foi possível ler o arquivo do caso.');
        setData(null);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { data, loading, error };
}
