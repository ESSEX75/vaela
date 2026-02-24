'use client';

import { usePagination } from '@/hooks';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { cn } from '@/utils';
import { Button } from './Button';

interface IProps {
  totalCount?: number;
  currentPage: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  totalCount = 1,
  currentPage,
  pageSize = 12,
  onPageChange,
  className,
}: IProps) {
  const paginationRange = usePagination({
    totalCount,
    currentPage,
    pageSize,
  });

  const lastPage = Number(
    paginationRange
      ? paginationRange[paginationRange?.length - 1]
      : currentPage,
  );

  if (totalCount <= pageSize || currentPage > lastPage) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 text-lg text-neutral-700',
        className,
      )}
    >
      <Button
        variant="icon-round"
        className="bg-white hover:bg-neutral-300"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <FiChevronLeft />
      </Button>

      {paginationRange &&
        paginationRange.map((page, index) => (
          <Button
            key={index}
            variant="icon-round"
            className={cn('text-base hover:bg-neutral-300', {
              'bg-black text-white hover:bg-black': currentPage === page,
            })}
            onClick={() => typeof page !== 'string' && onPageChange(page)}
            disabled={typeof page === 'string'}
          >
            {page}
          </Button>
        ))}

      <Button
        variant="icon-round"
        className="bg-white hover:bg-neutral-300"
        onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
      >
        <FiChevronRight />
      </Button>
    </div>
  );
}
