'use client';

import Image from 'next/image';
import type { TProduct } from '@/types';
import { cn } from '@/utils';

interface IProps {
  images: TProduct['images'];
  productName: string;
}

export function ProductGallery({ images, productName }: IProps) {
  return (
    <div className="w-full bg-white lg:w-1/2 lg:flex-none">
      {/* Мобильная галерея */}
      <div className="scrollbar-hide flex w-full snap-x snap-mandatory overflow-x-auto lg:hidden">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-3/4 w-full flex-none snap-center overflow-hidden bg-gray-100"
          >
            <Image
              src={img.imageURL}
              alt={`${productName} - view ${idx + 1}`}
              fill
              className="object-cover object-top"
              priority={idx === 0}
              placeholder="blur"
              blurDataURL={img.imageBlur}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/*Десктопная сетка */}
      <div className="hidden w-full grid-cols-2 gap-1 lg:grid">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={cn(
              'relative aspect-3/4 w-full overflow-hidden bg-gray-100',
              idx % 3 === 0 ? 'col-span-2' : 'col-span-1',
            )}
          >
            <Image
              src={img.imageURL}
              alt={`${productName} - view ${idx + 1}`}
              fill
              className="object-cover object-center"
              priority={idx === 0}
              placeholder="blur"
              blurDataURL={img.imageBlur}
              sizes="(max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
