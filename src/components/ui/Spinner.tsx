import { useTranslations } from 'next-intl';
import { cn } from '@/utils';

interface IProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
}

export function Spinner({ className, size = 'md', centered = false }: IProps) {
  const t = useTranslations('system');
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  const spinner = (
    <div
      role="status"
      className={cn(
        'animate-spin rounded-full border-gray-200 border-t-gray-900',
        sizeClasses[size],
        !centered && className,
      )}
    >
      <span className="sr-only">{t('loading')}</span>
    </div>
  );

  if (centered) {
    return (
      <div
        className={cn(
          'flex min-h-[50vh] w-full items-center justify-center',
          className,
        )}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
