import type { FC } from 'react';
import './ButtonIcon.scss';

interface ButtonIconProps {
  icon: FC<{ size: number }>;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const sizeMap = {
  sm: 20,
  md: 24,
  lg: 28,
} as const;

export function ButtonIcon({
  icon: Icon,
  onClick,
  size = 'md',
  disabled = false,
}: ButtonIconProps) {
  return (
    <button className={`button-icon button-icon--${size}`} onClick={onClick} disabled={disabled}>
      <Icon size={sizeMap[size]} />
    </button>
  );
}
