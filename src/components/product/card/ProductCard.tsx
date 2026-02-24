'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import type { TProduct } from '@/types';
import { ProductCardGallery } from './ProductCardGallery';
import { ProductCardInfo } from './ProductCardInfo';
import { ProductCardThumbnails } from './ProductCardThumbnails';
import { getT } from '@/utils/i18n';

interface IProps {
  product: TProduct;
  rootCategory: string;
  locale?: string;
}

export function ProductCard({
  product,
  rootCategory,
  locale: propLocale,
}: IProps) {
  const { slug, price, images } = product;
  const hookLocale = useLocale();
  const locale = propLocale || hookLocale;
  const [currentImage, setCurrentImage] = useState(images[0].imageURL);

  const productLink = `/${locale}/${rootCategory}/${slug}`;

  return (
    <div className="group relative flex flex-col gap-3">
      <ProductCardGallery
        product={{ ...product, name: getT(product.name, locale) }}
        productLink={productLink}
        currentImage={currentImage}
      />

      <div className="flex flex-col gap-2 px-6">
        <ProductCardInfo name={getT(product.name, locale)} price={price} />

        <ProductCardThumbnails
          images={images}
          currentImage={currentImage}
          onSelect={setCurrentImage}
        />
      </div>
    </div>
  );
}
