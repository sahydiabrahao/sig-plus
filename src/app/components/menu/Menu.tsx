import { ButtonIcon } from '@/app/components/button-icon/ButtonIcon';
import { ImportIcon, ExpandIcon, CollapseIcon } from '@/icons';
import './Menu.scss';

export function Menu() {
  return (
    <div className='menu'>
      <ButtonIcon icon={ImportIcon} size='lg' />
      <ButtonIcon icon={ExpandIcon} size='md' />
      <ButtonIcon icon={CollapseIcon} size='md' />
    </div>
  );
}
