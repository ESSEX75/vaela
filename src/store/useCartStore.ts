import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TProduct } from '@/types';
import { ProductSize, ProductColor } from '@prisma/client';

export interface CartItem {
  itemKey: string;
  product: TProduct;
  quantity: number;
  size?: ProductSize | null;
  color?: ProductColor | null;
}

interface ICartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (
    product: TProduct,
    size?: ProductSize | null,
    color?: ProductColor | null,
  ) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const generateItemKey = (
  productId: number | string,
  size?: ProductSize | null,
  color?: ProductColor | null,
) => {
  return `${productId}-${size || 'nosize'}-${color || 'nocolor'}`;
};

export const useCartStore = create<ICartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size = null, color = null) => {
        const { items } = get();
        const itemKey = generateItemKey(product.id, size, color);
        const existingItem = items.find(item => item.itemKey === itemKey);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.itemKey === itemKey
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, { itemKey, product, quantity: 1, size, color }],
            isOpen: true,
          });
        }
      },

      removeItem: itemKey => {
        const { items } = get();
        set({
          items: items.filter(item => item.itemKey !== itemKey),
        });
      },

      updateQuantity: (itemKey, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(itemKey);
          return;
        }
        set({
          items: items.map(item =>
            item.itemKey === itemKey ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ items: state.items }),
    },
  ),
);
