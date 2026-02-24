'use client';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useEffect, useState } from 'react';

export function FavoritesCount() {
  const items = useFavoritesStore(state => state.items);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(items.length);
  }, [items]);

  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
      {count}
    </span>
  );
}
