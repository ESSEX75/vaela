import type { IconType } from 'react-icons/lib';
import { FaVk, FaYandex } from 'react-icons/fa';

export interface IProvider {
  id: string;
  nameKey: string;
  icon: IconType;
  className: string;
}

export const AUTH_PROVIDERS: IProvider[] = [
  {
    id: 'vk',
    nameKey: 'auth.vk',
    icon: FaVk,
    className: 'bg-[#0077FF] text-white hover:bg-[#0066EE]',
  },
  {
    id: 'yandex',
    nameKey: 'auth.yandex',
    icon: FaYandex,
    className: 'bg-[#FC3F1D] text-white hover:bg-[#E3391A]',
  },
];
