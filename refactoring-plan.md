# План рефакторинга компонентов (Эволюционный подход)

Этот план направлен на поэтапное улучшение структуры проекта `vaela-shop` без кардинального изменения парадигмы (отказ от переусложненного FSD в пользу чистого Domain-Driven Design). Все шаги разбиты на логические этапы, чтобы минимизировать риски сломать приложение.

---

## Этап 1: Очистка корня компонентов (Уровень приложения)

_Цель: Отделить конфигурацию и глобальный контекст от визуальных компонентов._

1. **Создание папки провайдеров**:
   - Создать `src/providers` (или `src/app/providers`).
2. **Перенос файлов**:
   - Переместить `src/components/Providers.tsx` в `src/providers/Providers.tsx`.
   - Переместить `src/components/TrpcProvider.tsx` в `src/providers/TrpcProvider.tsx`.
3. **Обновление импортов**:
   - Обновить пути импорта провайдеров в точке входа приложения (`src/app/layout.tsx` или аналогичном файле корня).
4. **Проверка**: Убедиться, что приложение собирается и работает локально (tRPC, аутентификация, темы).

---

## Этап 2: Выделение глобальных слоев (Layouts)

_Цель: Отделить каркас страниц (шапка, подвал, глобальные модалки) от предметных областей._

1. **Создание структуры Layout**:
   - Создать папку `src/components/layout`.
2. **Перенос Header**:
   - Переместить папку `src/components/header` в `src/components/layout/header`.
3. **Перенос Footer**:
   - Переместить папку `src/components/footer` в `src/components/layout/footer`.
4. **Перенос глобальных UI элементов**:
   - Переместить папку `src/components/modal` в `src/components/layout/modal` (если эти модалки используются везде, например, для логина/корзины).
5. **Обновление импортов**:
   - Исправить пути к Header, Footer и Modal во всех страницах (`app/page.tsx`, `app/[locale]/layout.tsx` и т.д.).

---

## Этап 3: Реорганизация бизнес-логики (Предметные области)

_Цель: Избавиться от чрезмерной вложенности `features` внутри компонентов шапки и сделать самостоятельные, независимые бизнес-модули._

1. **Выделение модуля Корзины (Cart)**:
   - Сейчас логика корзины застряла в `header/features/cart`. Корзина — это отдельный бизнес-домен!
   - Создать папку корня: `src/components/cart`.
   - Перенести всё из `src/components/layout/header/features/cart/` в `src/components/cart/`.
     - _Пример новой структуры:_ `src/components/cart/CartDrawer.tsx`, `cart/CartItem.tsx`, `cart/CartTrigger.tsx`.
   - Обновить импорты: теперь Header будет импортировать условный `<CartTrigger />` из модуля `cart`.

2. **Выделение модуля Поиска (Search)**:
   - Аналогично, поиск — глобальная фича. Перенести `header/features/search` в `src/components/search`.
   - _Пример:_ `src/components/search/SearchDrawer.tsx`, `search/SearchInput.tsx`, `search/SearchResults.tsx`.
   - Обновить импорты в Header.

3. **Очистка Header**:
   - Теперь `header` будет содержать только навигацию (`mega-menu`, `mobile-menu`, `Navigation`, `TopBar`) и ссылки на независимые модули (Cart, Search, UserProfile(Auth)). Вложенная папка `features` внутри Header может быть упразднена за ненадобностью.

---

## Этап 4: Внедрение Public API (index.ts)

_Цель: Строгие контракты (инкапсуляция). Компоненты других доменов не должны лезть во внутренности друг друга._

1. **Создание индексов (Barrel files)**:
   - В каждой крупной папке домена (`product`, `collection`, `cart`, `auth`, `search`, `showcase`) создать файл `index.ts`.
2. **Настройка экспортов**:
   - **Пример для `src/components/product/index.ts`**:
     ```typescript
     export { ProductCard } from './card/ProductCard';
     export { ProductDetails } from './details/ProductDetails';
     // Внутренние компоненты, вроде ProductVariants или ProductCardGallery НЕ экспортируем!
     ```
   - **Пример для `src/components/cart/index.ts`**:
     ```typescript
     export { CartDrawer } from './CartDrawer';
     export { CartTrigger } from './CartTrigger';
     ```
3. **Рефакторинг импортов в приложении**:
   - Заменить все глубокие импорты (вида `import { ProductCard } from '@/components/product/card/ProductCard'`) на короткие (вида `import { ProductCard } from '@/components/product'`).
   - _Важно: Этот шаг потребует аккуратности и прогона TypeScript линтера._

---

## Этап 5: Ревизия UI (Дизайн-система)

_Цель: Убедиться, что базовые элементы чисты от бизнес-логики._

1. **Аудит папки `src/components/ui`**:
   - Проверить все файлы внутри (кнопки, инпуты, селекты, бейджи).
   - Если какой-то UI-компонент делает запросы к БД, знает про корзину или использует `useTranslations('product')` (специфику конкретного домена, кроме общих переводов 'common') — его нужно **вынести** в соотвествующий бизнес-домен.
   - UI должны быть "глупыми" (получать всё через Props).
2. **Очистка**: Удаление неиспользуемых компонентов (если такие найдутся).

---

## Порядок выполнения

Для безопасности процесса рекомендую двигаться строго по этапам:

1. Выполняем Этап 1 -> Проверка (pnpm run dev) -> `git commit`
2. Выполняем Этап 2 -> Проверка (pnpm run dev) -> `git commit`
   ...и так далее.

Если план устраивает, скажи: **"Начинаем с Этапа 1"**!
