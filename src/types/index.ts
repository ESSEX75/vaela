import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { type AppRouter } from '@/server/api/root';

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

/**
 * Список всех корневых коллекций (для меню и оверлеев).
 * Возвращается процедурой `collection.all`.
 */
export type TCollections = RouterOutputs['collection']['all'];

/**
 * Полная информация о коллекции (включая витрину, дочерние элементы и метаданные).
 * Возвращается процедурой `collection.bySlug`.
 */
export type TCollection = NonNullable<RouterOutputs['collection']['bySlug']>;

/**
 * Список товаров с пагинацией.
 * Часть ответа процедуры `product.all`.
 */
export type TProducts = RouterOutputs['product']['all']['products'];

/**
 * Тип отдельного товара (используется в списках и карточках).
 */
export type TProduct = TProducts[number];

/**
 * Данные витрины коллекции (баннеры, списки коллекций и товаров).
 */
export type TShowcase = NonNullable<TCollection['showcase']>;

/**
 * Элемент коллекции внутри витрины (например, Hero, Primary, Secondary).
 */
export type TShowcaseCollection = TShowcase['showcaseCollections'][number];

/**
 * Товар внутри витрины.
 */
export type TShowcaseProduct = TShowcase['showcaseProducts'][number];

/**
 * Базовые параметры с локалью.
 */
export type TLocaleParams = Promise<{ locale: string }>;

export interface IBasePageProps<TParams = Record<string, unknown>> {
  params: Promise<TParams & { locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface IBaseLayoutProps {
  children: React.ReactNode;
  params: TLocaleParams;
}

export interface IBaseErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
