import { ButtonStatus } from '@/app/components';
import { useCaseContext } from '@/context/CaseContext';
import { useCaseSummary } from '@/hooks';

export default function Overview() {
  const { dirTree, setSelectedCaseHandle, setViewMode } = useCaseContext();
  const { summaries, loading, error } = useCaseSummary(dirTree);

  if (loading) return <div>Carregando casos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='overview'>
      <div className='overview__header'>
        <div>
          <h1 className='overview__title'>Casos</h1>
          <p className='overview__subtitle'>{summaries.length} casos encontrados</p>
        </div>
        <div className='overview__actions'></div>
      </div>

      <div className='overview__grid'>
        {summaries.map((s) => (
          <button
            key={s.fileName}
            className='overview__card'
            onClick={() => {
              setSelectedCaseHandle(s.handle);
              setViewMode('dashboard');
            }}
          >
            <div className='overview__card-header'>
              <span className='overview__id'>{s.id}</span>
              <div className='overview__status'>
                <ButtonStatus status={s.status} size='sm' />
              </div>
            </div>

            <div className='overview__meta-row'>
              <span>
                <span className='overview__meta-label'>Crime: </span>
                <span className='overview__meta-value'>{s.crime}</span>
              </span>
              <span>
                <span className='overview__meta-label'>Vítima: </span>
                <span className='overview__meta-value'>{s.victim}</span>
              </span>
              <span>
                <span className='overview__meta-label'>Data: </span>
                <span className='overview__meta-value'>{s.date}</span>
              </span>
            </div>

            {s.resume && <p className='overview__resume'>{s.resume}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}
