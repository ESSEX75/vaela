'use client';

import { FiMinus, FiPlus } from 'react-icons/fi';
import { clsx } from 'clsx';

interface IProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max,
  disabled = false,
  className,
}: IProps) {
  const isMin = quantity <= min;
  const isMax = max ? quantity >= max : false;

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <button
        onClick={onDecrease}
        disabled={disabled || isMin}
        className={clsx(
          'flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 p-1 transition-colors',
          disabled || isMin
            ? 'cursor-not-allowed opacity-50'
            : 'text-gray-500 hover:bg-gray-100 hover:text-black',
        )}
        aria-label="Decrease quantity"
      >
        <FiMinus className="h-3 w-3" />
      </button>

      <span className="min-w-6 text-center font-medium text-gray-900">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={disabled || isMax}
        className={clsx(
          'flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 p-1 transition-colors',
          disabled || isMax
            ? 'cursor-not-allowed opacity-50'
            : 'text-gray-500 hover:bg-gray-100 hover:text-black',
        )}
        aria-label="Increase quantity"
      >
        <FiPlus className="h-3 w-3" />
      </button>
    </div>
  );
}
