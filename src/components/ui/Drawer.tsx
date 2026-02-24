'use client';

import type { ReactNode } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import { cn } from '@/utils';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  position?: 'left' | 'right';
  className?: string;
  overlayClassName?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  className,
  overlayClassName,
}: IProps) {
  const isRight = position === 'right';

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Оверлей */}
      <DialogBackdrop
        transition
        className={cn(
          'fixed inset-0 transition-opacity duration-500 ease-in-out',
          'data-closed:opacity-0',
          overlayClassName ?? 'bg-gray-500/75',
        )}
      />

      {/* Контейнер */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              'pointer-events-none fixed inset-y-0 flex max-w-full',
              isRight ? 'right-0 pl-10' : 'left-0 pr-10',
            )}
          >
            {/* Панель */}
            <DialogPanel
              transition
              className={cn(
                'pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700',
                isRight
                  ? 'data-closed:translate-x-full'
                  : 'data-closed:-translate-x-full',
                className,
              )}
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                {/* Основной контент */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    {title && (
                      <DialogTitle className="text-lg font-medium text-gray-900 uppercase">
                        {title}
                      </DialogTitle>
                    )}
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">Закрыть</span>
                        <FiX className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">{children}</div>
                </div>

                {/* Футер */}
                {footer && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    {footer}
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
