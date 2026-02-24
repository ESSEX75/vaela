'use client';

import { cn } from '@/utils';
import type { TProduct } from '@/types';

interface IProps {
  images: TProduct['images'];
  currentImage: string;
  onSelect: (url: string) => void;
}

export function ProductCardThumbnails({
  images,
  currentImage,
  onSelect,
}: IProps) {
  return (
    <div className="flex gap-1">
      {images.slice(0, 3).map(({ imageURL }, index) => (
        <button
          key={index}
          className={cn(
            'h-6 w-6 rounded-full border border-gray-300 bg-cover bg-center transition-all hover:scale-110 md:h-4 md:w-4',
            {
              'ring-1 ring-black': currentImage === imageURL,
            },
          )}
          style={{ backgroundImage: `url(${imageURL})` }}
          onClick={() => onSelect(imageURL)}
          aria-label={`View variant ${index + 1}`}
        />
      ))}
    </div>
  );
}
