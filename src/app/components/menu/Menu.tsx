import { ButtonIcon } from '@/app/components/button-icon/ButtonIcon';
import { ImportIcon, ExpandIcon, CollapseIcon } from '@/icons';
import './Menu.scss';

export function Menu() {
  return (
    <div className='menu'>
      <div className='menu__actions'>
        <ButtonIcon icon={ImportIcon} size='lg' />
        <ButtonIcon icon={ExpandIcon} size='lg' />
        <ButtonIcon icon={CollapseIcon} size='lg' />
      </div>
      <div className='menu__label'>
        <span className='menu__label-icon'>📁</span>
        <span className='menu__label-text'>1-investigando</span>
      </div>
      <div className='menu__list'>
        <div className='menu__item'>oc12-2025-31dp</div>
        <div className='menu__item'>oc12-2025-31dp</div>
        <div className='menu__item'>oc12-2025-31dp.pdf</div>
        <div className='menu__item'>oc12-2025-31dp</div>
      </div>
    </div>
  );
}
