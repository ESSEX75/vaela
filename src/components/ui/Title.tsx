import { cn } from '@/utils';
import type { ElementType, ReactNode } from 'react';

type TitleSize = 'default' | 'hero';

interface IProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: TitleSize;
}

export function Title({
  children,
  className,
  as: Component = 'h3',
  size = 'default',
}: IProps) {
  return (
    <Component
      className={cn(
        'text-black uppercase',
        {
          'text-sm font-normal tracking-wide': size === 'default',
          'text-3xl leading-none font-bold md:text-4xl': size === 'hero',
        },
        className,
      )}
    >
      {children}
    </Component>
  );
}
