# VAELA Shop 🛍️

Full-stack e-commerce платформа на базе **T3 Stack**.

![homepage](public/screenshots/homepage.jpg)
![products](public/screenshots/products.jpg)
![tests](public/screenshots/test.png)

## 🚀 Основной стек технологий

- **Фреймворк:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **API:** [tRPC v11](https://trpc.io/) (Полная типизация запросов)
- **База данных:** [PostgreSQL](https://www.postgresql.org/) через [Prisma 7](https://prisma.io/)
- **Стилизация:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Аутентификация:** [NextAuth.js](https://next-auth.js.org/)
- **Интернационализация:** [next-intl](https://next-intl-docs.vercel.app/)
- **Управление состоянием:** [Zustand](https://github.com/pmndrs/zustand)
- **Тестирование:** [Cypress](https://www.cypress.io/)

## ✨ Особенности

- 🌍 **Многоязычность:** Полная поддержка локализации через `next-intl`.
- ⚡ **Производительность:** Использование Server Components и оптимизированных изображений через `sharp`.
- 🛡️ **Безопасность:** Типизация всех API-эндпоинтов и валидация данных через `Zod`.
- 📱 **Responsive Design:** Адаптивная верстка, отлично работающая на всех устройствах.
- 🐳 **Docker:** Настроенный `docker-compose` для быстрой развертки окружения.

## 🛠️ Переменные окружения

Создайте файл `.env` и заполните следующие данные:

```bash
# База данных (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"

# Next Auth
# Сгенерировать секрет можно командой: openssl rand -base64 32
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# VK OAuth (https://dev.vk.com/ru/mini-apps/management/creating-new-apps?ref=old_admin_panel)
VK_CLIENT_ID="your_vk_client_id"
VK_CLIENT_SECRET="your_vk_client_secret"

# Yandex OAuth (https://oauth.yandex.ru/client/new)
YANDEX_CLIENT_ID="your_yandex_client_id"
YANDEX_CLIENT_SECRET="your_yandex_client_secret"

# Корневая категория по умолчанию для редиректов
DEFAULT_ROOT_CATEGORY="women"
```

## 💻 Локальная разработка

1.  **Клонируйте репозиторий:**

    ```bash
    git clone https://github.com/ESSEX75/vaela.git
    cd vaela-shop
    ```

2.  **Установите зависимости:**

    ```bash
    pnpm install
    ```

3.  **Настройте базу данных:**

    ```bash
    # Применить миграции
    pnpm migrate-dev

    # Наполнить базу тестовыми данными
    pnpm db-seed
    ```

4.  **Запустите сервер разработки:**
    ```bash
    pnpm dev
    ```

## 📜 Основные скрипты

- `pnpm dev` — Запуск Next.js в режиме разработки
- `pnpm build` — Сборка проекта для продакшена (без генерации Prisma и БД миграций)
- `pnpm deploy` — Полный цикл деплоя (генерация, накат миграций, сборка)
- `pnpm migrate` — Запуск последней миграции базы данных
- `pnpm lint` — Проверка кода линтером
- `pnpm prisma-studio` — Графический интерфейс для управления базой данных
- `pnpm db-seed` — Наполнение БД начальными данными
- `pnpm test` — Запуск E2E тестов Cypress

---

Разработано [Кислицыным Егором](https://t.me/KislitsynEgor)
