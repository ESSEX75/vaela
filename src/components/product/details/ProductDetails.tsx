'use client';

import { useState } from 'react';
import type { TProduct } from '@/types';
import { ProductSize, ProductColor } from '@prisma/client';
import { getT } from '@/utils/i18n';

import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductVariants } from './ProductVariants';
import { AddToCart } from '../features/AddToCart';
import { AddToFavorites } from '../features/AddToFavorites';

type IProps = {
  product: TProduct;
  locale: string;
};

export function ProductDetails({ product, locale }: IProps) {
  const { name, price, rate, description, images, sizes, colors } = product;

  const translatedName = getT(name, locale);
  const translatedDesc = getT(description, locale);

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    sizes && sizes.length > 0 ? sizes[0] : null,
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    colors && colors.length > 0 ? colors[0] : null,
  );

  return (
    <div className="bg-white">
      <div className="bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Изображения */}
          <ProductGallery images={images} productName={translatedName} />

          {/* Информация */}
          <div className="relative w-full bg-white px-4 py-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:items-center lg:justify-center lg:py-0">
            <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
              <ProductInfo
                name={translatedName}
                price={price}
                rate={rate}
                description={translatedDesc}
              />

              <ProductVariants
                sizes={sizes}
                colors={colors}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSelectSize={setSelectedSize}
                onSelectColor={setSelectedColor}
              />

              <div className="flex gap-4">
                <AddToCart
                  product={product}
                  className="flex-1"
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                />
                <AddToFavorites
                  productId={product.id}
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 bg-white text-black transition-colors hover:bg-gray-100"
                  iconSize={24}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
