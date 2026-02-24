'use client';

import { useModalStore } from '@/store/useModalStore';
import { Modal } from './Modal';
import { useCollaborationTimer } from './useCollaborationTimer';

export function ModalContainer() {
  const modals = useModalStore(state => state.modals);

  useCollaborationTimer();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-99"
    >
      {modals.map(modal => (
        <Modal key={modal.id} modal={modal} />
      ))}
    </div>
  );
}
