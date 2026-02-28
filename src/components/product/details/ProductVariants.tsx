'use client';

import { cn } from '@/utils';
import { ProductSize, ProductColor } from '@prisma/client';

import { useTranslations } from 'next-intl';

interface IProps {
  sizes?: ProductSize[];
  colors?: ProductColor[];
  selectedSize: ProductSize | null;
  selectedColor: ProductColor | null;
  onSelectSize: (size: ProductSize) => void;
  onSelectColor: (color: ProductColor) => void;
}

export function ProductVariants({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSelectSize,
  onSelectColor,
}: IProps) {
  const t = useTranslations('product');
  const hasSizes = sizes && sizes.length > 0;
  const hasColors = colors && colors.length > 0;

  if (!hasSizes && !hasColors) return null;

  return (
    <div className="flex flex-col gap-8 border-t border-gray-100 pt-8">
      {/* Размеры */}
      {hasSizes && (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium tracking-wide text-gray-900 uppercase">
            {t('size')}
          </h3>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-4">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => onSelectSize(size)}
                className={cn(
                  'flex items-center justify-center rounded-md border py-3 text-sm font-medium transition-all duration-200',
                  selectedSize === size
                    ? 'border-black bg-black text-white shadow-lg'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50',
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Цвета */}
      {hasColors && (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium tracking-wide text-gray-900 uppercase">
            {t('color')}
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => onSelectColor(color)}
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all duration-200 hover:scale-105',
                  selectedColor === color
                    ? 'ring-2 ring-black ring-offset-2'
                    : '',
                )}
                aria-label={t('selectColor', {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  color: t(`colors.${color}` as any),
                })}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                title={t(`colors.${color}` as any)}
              >
                <span
                  className="h-8 w-8 rounded-full border border-black/5 shadow-sm"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
