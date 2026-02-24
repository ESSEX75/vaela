'use client';

import { cn } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import type { TProduct } from '@/types';
import { AddToFavorites } from '@/components/product/features/AddToFavorites';
import { AddToCart } from '@/components/product/features/AddToCart';

interface IProps {
  product: TProduct;
  productLink: string;
  currentImage: string;
}

export function ProductCardGallery({
  product,
  productLink,
  currentImage,
}: IProps) {
  const { id, name, images } = product;

  return (
    <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100">
      <Link href={productLink} className="relative block h-full w-full">
        {images.map(({ imageURL, imageBlur }, index) => (
          <Image
            key={index}
            src={imageURL}
            alt={`${name} image`}
            className={cn(
              'absolute h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105',
              {
                'opacity-100': currentImage === imageURL,
                'opacity-0': currentImage !== imageURL,
              },
            )}
            width={500}
            height={700}
            placeholder="blur"
            blurDataURL={imageBlur}
          />
        ))}
      </Link>

      <AddToFavorites
        productId={id}
        className="absolute top-2 right-2 z-10 flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-white text-black transition-all hover:scale-110"
        iconSize={20}
      />
    </div>
  );
}
