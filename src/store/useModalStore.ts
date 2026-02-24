import { create } from 'zustand';

export type ModalType = 'success' | 'error' | 'info' | 'collaboration';

export interface Modal {
  id: string;
  message: string;
  type: ModalType;
  duration?: number;
}

interface ModalStore {
  modals: Modal[];
  addModal: (message: string, type?: ModalType, duration?: number) => void;
  removeModal: (id: string) => void;
}

export const useModalStore = create<ModalStore>(set => ({
  modals: [],
  addModal: (
    message,
    type = 'info',
    duration = type === 'collaboration' ? 0 : 3000,
  ) => {
    const id =
      Date.now().toString() + Math.random().toString(36).substring(2, 9);
    set(state => ({
      modals: [...state.modals, { id, message, type, duration }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set(state => ({
          modals: state.modals.filter(m => m.id !== id),
        }));
      }, duration);
    }
  },
  removeModal: id =>
    set(state => ({
      modals: state.modals.filter(m => m.id !== id),
    })),
}));
