'use client';

import { useEffect, useRef } from 'react';
import { useModalStore } from '@/store/useModalStore';

const COLLABORATION_DELAY_MS = 30_000;
const COLLABORATION_SESSION_KEY = 'vaela_collaboration_shown';

export function useCollaborationTimer() {
  const addModal = useModalStore(state => state.addModal);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(COLLABORATION_SESSION_KEY)) return;

    timerRef.current = setTimeout(() => {
      addModal('', 'collaboration', 0);
      sessionStorage.setItem(COLLABORATION_SESSION_KEY, '1');
    }, COLLABORATION_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [addModal]);
}
