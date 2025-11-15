import { useCallback, useEffect, useRef, useState } from 'react';
import type { CaseRecord } from '@/types/json-default';
import { ButtonText } from '@/app/components/button-text/ButtonText';
import './RecordCard.scss';

type RecordCardProps = {
  record: CaseRecord;
  onChange?: (updated: CaseRecord) => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
};

export function RecordCard({
  record,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: RecordCardProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const update = useCallback(
    (patch: Partial<CaseRecord>) => {
      onChange?.({ ...record, ...patch });
    },
    [record, onChange]
  );

  const handleTarget = (e: React.ChangeEvent<HTMLInputElement>) =>
    update({ target: e.target.value });

  function autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  const handleDetails = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoResize(e.target);
    update({ details: e.target.value });
  };

  // fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleDelete = () => {
    if (confirm('Deseja excluir este registro?')) {
      onDelete?.();
      setMenuOpen(false);
    }
  };

  const handleMoveUpClick = () => {
    if (onMoveUp && !isFirst) {
      onMoveUp();
    }
    setMenuOpen(false);
  };

  const handleMoveDownClick = () => {
    if (onMoveDown && !isLast) {
      onMoveDown();
    }
    setMenuOpen(false);
  };

  return (
    <article className='record-card'>
      <div className='record-card__header'>
        <h2 className='record-card__label'>#</h2>

        <input
          className='record-card__target'
          value={record.target}
          onChange={handleTarget}
          placeholder='Ex: CPF, Telefone, PIX...'
        />

        <div className='record-card__header-actions'>
          <ButtonText
            text={collapsed ? '▾' : '▴'}
            size='sm'
            variant='outline'
            onClick={() => setCollapsed((prev) => !prev)}
          />

          <div className='record-card__menu' ref={menuRef}>
            <ButtonText
              text='⋯'
              size='sm'
              variant='outline'
              onClick={() => setMenuOpen((prev) => !prev)}
            />

            {menuOpen && (
              <div className='record-card__menu-dropdown'>
                <button
                  type='button'
                  className='record-card__menu-item'
                  onClick={handleMoveUpClick}
                  disabled={isFirst}
                >
                  🔺 Mover para cima
                </button>

                <button
                  type='button'
                  className='record-card__menu-item'
                  onClick={handleMoveDownClick}
                  disabled={isLast}
                >
                  🔻 Mover para baixo
                </button>

                <button
                  type='button'
                  className='record-card__menu-item record-card__menu-item--danger'
                  onClick={handleDelete}
                >
                  🗑️ Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {!collapsed && (
        <div className='record-card__section'>
          <textarea
            className='record-card__details'
            value={record.details}
            onChange={handleDetails}
            placeholder='[✔️] # OFÍCIO: Nome;'
            rows={1}
          />
        </div>
      )}
    </article>
  );
}
