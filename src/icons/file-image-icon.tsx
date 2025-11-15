import { IconProps } from './types';

export function FileImageIcon({ size = 32, color = 'white' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='4' y='4' width='24' height='24' rx='4' stroke={color} strokeWidth='2' fill='none' />

      <circle cx='12' cy='12' r='2' fill={color} />

      <path d='M9 23L14 17L18 21L21 18L25 23H9Z' fill={color} />
    </svg>
  );
}
