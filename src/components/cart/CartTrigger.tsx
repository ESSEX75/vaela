import { useCartStore } from '@/store/useCartStore';
import { FiShoppingBag } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';

export function CartTrigger() {
  const { openCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  if (!mounted) {
    return (
      <Button
        variant="icon-ghost"
        className="transition-transform hover:scale-105"
      >
        <FiShoppingBag className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="icon-ghost"
      onClick={openCart}
      className="relative transition-transform hover:scale-105"
    >
      <FiShoppingBag className="h-5 w-5" />

      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
          {totalItems}
        </span>
      )}
    </Button>
  );
}
