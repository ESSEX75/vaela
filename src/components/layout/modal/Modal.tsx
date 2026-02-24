'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiX,
  FiSend,
} from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { useModalStore, type Modal as ModalType } from '@/store/useModalStore';
import { cn } from '@/utils';
import { Button } from '@/components/ui';

interface IProps {
  modal: ModalType;
}

export function Modal({ modal }: IProps) {
  const { removeModal } = useModalStore();
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('collaboration');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      removeModal(modal.id);
    }, 300);
  };

  const icons = {
    success: <FiCheckCircle className="h-6 w-6 text-green-500" />,
    error: <FiAlertCircle className="text-brand h-6 w-6" />,
    info: <FiInfo className="h-6 w-6 text-blue-500" />,
    collaboration: null,
  };

  const accentColors = {
    success: 'border-l-4 border-green-500',
    error: 'border-l-4 border-brand',
    info: 'border-l-4 border-blue-500',
    collaboration: '',
  };

  const isCollaboration = modal.type === 'collaboration';

  return (
    <>
      {/* Оверлей */}
      <div
        className={cn(
          'pointer-events-auto fixed inset-0 z-99 bg-black/40 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Попап */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={isCollaboration ? t('title') : tCommon('notification')}
        className={cn(
          'pointer-events-auto fixed top-1/2 left-1/2 z-100 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
          'overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10',
          'transition-all duration-300 ease-out',
          isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
          accentColors[modal.type],
        )}
      >
        {isCollaboration ? (
          <div className="flex flex-col">
            <div className="relative h-64 w-full shrink-0 overflow-hidden">
              <Image
                src="/assets/kitten.avif"
                alt={t('kitten')}
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="relative p-6 pt-5">
              <Button
                variant="icon-ghost"
                className="absolute top-4 right-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-gray-300 focus:ring-inset"
                onClick={handleClose}
                aria-label={tCommon('close') || 'Close'}
              >
                <FiX className="h-5 w-5" aria-hidden="true" />
              </Button>

              <h2 className="mb-1.5 pr-6 text-xl font-bold text-gray-900">
                {t('title')}
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-gray-500">
                {t('description')}
              </p>

              <Button
                href="https://t.me/KislitsynEgor"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                fullWidth
                className={cn(
                  'bg-telegram rounded-xl px-5 py-3 shadow-md shadow-sky-200',
                  'hover:bg-telegram-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-300',
                  'focus:ring-sky-400 focus:ring-offset-2',
                )}
              >
                <FiSend className="h-4 w-4" aria-hidden="true" />
                {t('button')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0">{icons[modal.type]}</div>

              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900">
                  {modal.message}
                </p>
              </div>

              <Button
                variant="icon-ghost"
                className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-gray-300 focus:ring-inset"
                onClick={handleClose}
                aria-label={tCommon('close') || 'Close'}
              >
                <FiX className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
