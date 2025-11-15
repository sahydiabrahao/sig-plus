import { IconProps } from './types';

export function FileVideoIcon({ size = 32, color = 'white' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='5' y='5' width='22' height='22' rx='3' fill={color} />

      <circle cx='8.5' cy='10' r='1.5' fill='black' />
      <circle cx='8.5' cy='16' r='1.5' fill='black' />
      <circle cx='8.5' cy='22' r='1.5' fill='black' />

      <circle cx='23.5' cy='10' r='1.5' fill='black' />
      <circle cx='23.5' cy='16' r='1.5' fill='black' />
      <circle cx='23.5' cy='22' r='1.5' fill='black' />

      <rect x='11' y='9' width='10' height='14' rx='1' fill='black' />
    </svg>
  );
}
