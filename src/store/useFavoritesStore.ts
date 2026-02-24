import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IFavoritesState {
  items: string[];
  toggleItem: (id: string) => void;
}

export const useFavoritesStore = create<IFavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: id => {
        const { items } = get();
        if (items.includes(id)) {
          set({ items: items.filter(item => item !== id) });
        } else {
          set({ items: [...items, id] });
        }
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
