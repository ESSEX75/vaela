'use client';

import { useCartStore } from '@/store/useCartStore';
import { useModalStore } from '@/store/useModalStore';
import type { TProduct } from '@/types';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';
import { ProductSize, ProductColor } from '@prisma/client';
import { Button } from '@/components/ui';
import { cn } from '@/utils';

interface IProps {
  product: TProduct;
  className?: string;
  iconOnly?: boolean;
  selectedSize?: ProductSize | null;
  selectedColor?: ProductColor | null;
}

export function AddToCart({
  product,
  className,
  iconOnly = false,
  selectedSize,
  selectedColor,
}: IProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();
  const { addModal } = useModalStore();
  const t = useTranslations('product');

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const hasSizes = product.sizes && product.sizes.length > 0;
      const hasColors = product.colors && product.colors.length > 0;

      if (hasSizes && !selectedSize) {
        addModal(t('selectSize') || 'Please select a size', 'error');
        return;
      }

      if (hasColors && !selectedColor) {
        addModal(t('selectColor') || 'Please select a color', 'error');
        return;
      }

      addItem(product, selectedSize, selectedColor);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    },
    [addItem, product, selectedSize, selectedColor, t],
  );

  if (iconOnly) {
    return (
      <Button
        onClick={handleAddToCart}
        variant="icon-round"
        className={cn(className, { 'bg-black text-white': isAdded })}
        aria-label={t('addToCart')}
      >
        {isAdded ? (
          <FiCheck className="h-5 w-5" />
        ) : (
          <FiShoppingBag className="h-5 w-5" />
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant="primary"
      fullWidth
      className={cn(className, {
        'bg-green-600 hover:bg-green-700': isAdded,
      })}
    >
      {isAdded ? (
        <>
          <FiCheck className="h-5 w-5" />
          {t('addedToCart') || 'Added'}
        </>
      ) : (
        <>
          <FiShoppingBag className="h-5 w-5" />
          {t('addToCart') || 'Add to Cart'}
        </>
      )}
    </Button>
  );
}
