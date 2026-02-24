'use client';

import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import { SizeFilter } from './filters/SizeFilter';
import { PriceFilter } from './filters/PriceFilter';
import { RatingFilter } from './filters/RatingFilter';
import { ColorFilter } from './filters/ColorFilter';
import { Button } from '@/components/ui';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterPanel({ isOpen, onClose }: IProps) {
  const t = useTranslations('common');

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-50 flex justify-end">
        <DialogPanel
          transition
          className="pointer-events-auto w-screen max-w-md transform transition duration-300 ease-in-out data-closed:translate-x-full sm:duration-500"
        >
          <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
            {/* Заголовок */}
            <div className="flex items-center justify-between px-4 py-6 sm:px-6">
              <DialogTitle className="text-lg font-medium text-gray-900 uppercase">
                {t('filters')}
              </DialogTitle>

              <Button
                type="button"
                variant="icon-ghost"
                className="-mr-2 h-10 w-10 p-2"
                onClick={onClose}
              >
                <span className="sr-only">{t('closeMenu')}</span>
                <FiX className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>

            {/* Контент */}
            <div className="flex flex-col gap-8 px-4 py-6 sm:px-6">
              <SizeFilter />
              <PriceFilter />
              <RatingFilter />
              <ColorFilter />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
