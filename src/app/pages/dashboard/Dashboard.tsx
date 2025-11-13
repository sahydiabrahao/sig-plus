import { useOutletContext } from 'react-router-dom';
import type { AppLayoutOutletContext } from '@/app/layouts/AppLayout';
import { useReadJsonFile } from '@/hooks';
import type { CaseJson } from '@/types/json-default';
import './Dashboard.scss';

export default function Dashboard() {
  const { selectedCaseHandle } = useOutletContext<AppLayoutOutletContext>();

  const { data, loading, error } = useReadJsonFile({
    handle: selectedCaseHandle,
  });

  if (!selectedCaseHandle) {
    return (
      <div className='dashboard'>
        <p className='dashboard__empty'>
          Selecione um arquivo de caso (.json) na barra lateral para visualizar aqui.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='dashboard'>
        <p>Carregando dados do caso...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='dashboard'>
        <p className='dashboard__error'>{error ?? 'Erro ao carregar dados do caso.'}</p>
      </div>
    );
  }

  const caseData: CaseJson = data;

  return (
    <div className='dashboard'>
      <header className='dashboard__header'>
        <h1 className='dashboard__title'>{caseData.case.id}</h1>
        <div className='dashboard__meta'>
          <span>
            Crime: <strong>{caseData.case.crime}</strong>
          </span>
          <span>
            Vítima: <strong>{caseData.case.victim}</strong>
          </span>
          <span>
            Atualizado em: <strong>{new Date(caseData.updatedAt).toLocaleString()}</strong>
          </span>
        </div>
      </header>

      <section className='dashboard__section'>
        <h2 className='dashboard__section-title'>Registros</h2>
        {caseData.records.length === 0 && (
          <p className='dashboard__muted'>Nenhum registro ainda.</p>
        )}

        {caseData.records.length > 0 && (
          <ul className='dashboard__records'>
            {caseData.records.map((record) => (
              <li key={record.id} className='dashboard__record'>
                <div className='dashboard__record-header'>
                  <span className='dashboard__record-id'>{record.id}</span>
                  <span className='dashboard__record-status'>
                    {record.status || '(sem status)'}
                  </span>
                </div>
                <div className='dashboard__record-value'>
                  {record.value || <span className='dashboard__muted'>(vazio)</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
