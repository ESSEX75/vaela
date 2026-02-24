'use client';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { cn } from '@/utils';
import { Button } from '@/components/ui';

interface IProps {
  productId: string | number;
  className?: string;
  iconSize?: number;
}

export function AddToFavorites({
  productId,
  className,
  iconSize = 24,
}: IProps) {
  const idStr = String(productId);
  const toggleItem = useFavoritesStore(state => state.toggleItem);
  const isFavorite = useFavoritesStore(state => state.items.includes(idStr));

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(idStr);
  };

  return (
    <Button
      variant="icon-ghost"
      onClick={handleToggle}
      className={cn(
        'transition-transform hover:scale-110 active:scale-95',
        className,
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <AiFillHeart size={iconSize} className="text-brand" />
      ) : (
        <AiOutlineHeart
          size={iconSize}
          className="hover:text-brand text-gray-900"
        />
      )}
    </Button>
  );
}
