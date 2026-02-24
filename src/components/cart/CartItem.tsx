'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2 } from 'react-icons/fi';
import {
  useCartStore,
  type CartItem as CartItemType,
} from '@/store/useCartStore';
import { Price } from '@/components/ui/Price';
import { QuantitySelector } from './QuantitySelector';
import { Button } from '@/components/ui';
import { getT } from '@/utils/i18n';

interface IProps {
  item: CartItemType;
  locale: string;
}

export function CartItem({ item, locale }: IProps) {
  const t = useTranslations('product');
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity, size, color, itemKey } = item;
  const name = getT(product.name, locale);

  return (
    <div className="flex gap-4">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={product.images[0]?.imageURL || ''}
          blurDataURL={product.images[0]?.imageBlur || ''}
          alt={name}
          fill
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <Link
              href={`/${locale}/${product.collection?.slug || 'shop'}/${
                product.slug
              }`}
            >
              {name}
            </Link>
          </h3>
          <Price amount={product.price * quantity} className="ml-4" />
        </div>

        {(size || color) && (
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            {item.size && (
              <span>
                {t('size')}: <span className="font-medium">{size}</span>
              </span>
            )}
            {size && color && <span className="text-gray-300">|</span>}
            {item.color && (
              <span>
                {t('color')}: <span className="font-medium">{color}</span>
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between text-sm">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => updateQuantity(itemKey, quantity + 1)}
            onDecrease={() => updateQuantity(itemKey, quantity - 1)}
            min={1}
          />

          <Button
            type="button"
            variant="danger"
            onClick={() => removeItem(itemKey)}
            aria-label={`Remove ${name} from cart`}
          >
            <FiTrash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
