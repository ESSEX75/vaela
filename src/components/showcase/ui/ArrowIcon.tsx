import { FiArrowRight } from 'react-icons/fi';
import { cn } from '@/utils';

interface IProps {
  className?: string;
}

export function ArrowIcon({ className }: IProps) {
  return (
    <FiArrowRight
      className={cn(
        'h-5 w-5 text-black transition-transform duration-300 group-hover:translate-x-2',
        className,
      )}
    />
  );
}
