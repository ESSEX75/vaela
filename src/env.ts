import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Серверные переменные окружения.
   * Доступны только на стороне сервера.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // Позволяет автоматически использовать VERCEL_URL при деплое на Vercel
      str => process.env.VERCEL_URL ?? str,
      // VERCEL_URL не включает протокол, поэтому валидируем как строку
      process.env.VERCEL ? z.string().min(1) : z.string().url(),
    ),
    VK_CLIENT_ID: z.string().min(1),
    VK_CLIENT_SECRET: z.string().min(1),
    YANDEX_CLIENT_ID: z.string().min(1),
    YANDEX_CLIENT_SECRET: z.string().min(1),
    DEFAULT_ROOT_CATEGORY: z.string().min(1).default('women'),
  },

  /**
   * Клиентские переменные окружения.
   * Для доступа к ним на клиенте они должны начинаться с NEXT_PUBLIC_.
   */
  client: {},

  /**
   * Маппинг всех переменных для обеспечения корректной работы в Edge runtime и на клиенте.
   * Next.js требует явного обращения к process.env.NEXT_PUBLIC_*.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    VK_CLIENT_ID: process.env.VK_CLIENT_ID,
    VK_CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
    YANDEX_CLIENT_ID: process.env.YANDEX_CLIENT_ID,
    YANDEX_CLIENT_SECRET: process.env.YANDEX_CLIENT_SECRET,
    DEFAULT_ROOT_CATEGORY: process.env.DEFAULT_ROOT_CATEGORY,
  },

  /**
   * Пустые строки считаются отсутствующими переменными.
   */
  emptyStringAsUndefined: true,

  /**
   * Пропускать валидацию при сборке на CI или если установлена переменная SKIP_ENV_VALIDATION.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
