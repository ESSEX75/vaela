import { cn } from '@/utils';

interface IProps {
  className?: string;
}

export function Skeleton({ className }: IProps) {
  const shimmer =
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent';

  return <div className={cn('bg-neutral-200', shimmer, className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="group relative">
      {/* Image placeholder matching aspect-3/4 ratio */}
      <Skeleton className="aspect-3/4 w-full" />

      {/* Content placeholder */}
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-2/3 rounded-sm" />
          <Skeleton className="h-3 w-12 rounded-sm" />
        </div>

        {/* Color swatches placeholder */}
        <div className="flex gap-1">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-3 w-3 rounded-full" />
            ))}
        </div>
      </div>
    </div>
  );
}
