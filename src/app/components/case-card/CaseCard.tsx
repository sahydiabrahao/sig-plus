import { ButtonStatus } from '@/app/components';
import { CaseSummary } from '@/types/json-default';
import './CaseCard.scss';

interface CaseCardProps {
  summary: CaseSummary;
  onSelect: (handle: FileSystemFileHandle) => void;
}

export const CaseCard = ({ summary, onSelect }: CaseCardProps) => {
  const { id, crime, victim, date, notes, status, handle } = summary;

  return (
    <button className='case-card' onClick={() => onSelect(handle)}>
      <div className='case-card__content'>
        <div className='case-card__row'>
          <ButtonStatus status={status} size='md' />
          <span className='case-card__id'>{id}</span>

          <span className='case-card__item'>
            <span className='case-card__label'>Data:</span>
            <span className='case-card__value'>{date}</span>
          </span>

          <span className='case-card__item'>
            <span className='case-card__label'>Crime:</span>
            <span className='case-card__value'>{crime}</span>
          </span>

          <span className='case-card__item'>
            <span className='case-card__label'>Vítima:</span>
            <span className='case-card__value'>{victim}</span>
          </span>
        </div>

        {notes && <span className='case-card__notes'>{notes}</span>}
      </div>
    </button>
  );
};
