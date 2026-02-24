import { ProductColor } from '@prisma/client';

export const PRICE_RANGES = [
  { value: '1', min: 0, max: 10, labelMultiplier: 1 },
  { value: '2', min: 10, max: 100, labelMultiplier: 2 },
  { value: '3', min: 100, max: 1000000, labelMultiplier: 3 },
] as const;

export const RATING_OPTIONS = ['4.5', '4', '3'] as const;

export const COLOR_MAP: Record<ProductColor, string> = {
  [ProductColor.BLACK]: 'bg-black',
  [ProductColor.WHITE]: 'bg-white',
  [ProductColor.GRAY]: 'bg-neutral-600',
  [ProductColor.RED]: 'bg-red-700',
  [ProductColor.ORANGE]: 'bg-orange-600',
  [ProductColor.YELLOW]: 'bg-yellow-500',
  [ProductColor.GREEN]: 'bg-green-700',
  [ProductColor.PINK]: 'bg-pink-700',
  [ProductColor.BLUE]: 'bg-blue-600',
  [ProductColor.PURPLE]: 'bg-purple-700',
};
