# VAELA Shop 🛍️

Full-stack e-commerce платформа на базе **T3 Stack**.

🌐 **Сайт:** [vaela.kislitsyn-portfolio.pro](https://vaela.kislitsyn-portfolio.pro)

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

### � Использование Docker (альтернатива)

Если вы предпочитаете использовать Docker для локальной разработки и запуска БД:

```bash
# Запустить базу данных и приложение
docker-compose up -d
```

## �📜 Основные скрипты

- `pnpm dev` — Запуск Next.js в режиме разработки
- `pnpm build` — Сборка проекта для продакшена
- `pnpm deploy` — Полный цикл деплоя (генерация Prisma, накат миграций, сборка)
- `pnpm prisma-generate` — Генерация клиента Prisma
- `pnpm migrate` — Запуск накопленных миграций в БД
- `pnpm migrate-dev` — Создание и запуск миграций в режиме разработки
- `pnpm db-reset` — Очистка и перезапуск базы данных
- `pnpm db-seed` — Наполнение БД тестовыми данными
- `pnpm prisma-studio` — Графический интерфейс для БД
- `pnpm lint` — Проверка кода линтером (`eslint`)
- `pnpm test` — Запуск E2E тестов Cypress в консоли
- `pnpm test:e2e:open` — Запуск Cypress с графическим интерфейсом

---

Разработано [Кислицыным Егором](https://t.me/KislitsynEgor)
