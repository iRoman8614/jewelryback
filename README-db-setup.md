# Развёртывание БД без миграций

Схема теперь создаётся из **моделей Sequelize** (они уже отражают финальное
состояние после всех старых миграций: в `homepage_config` нет `imageN_alt`,
в `delivery_options` есть `allowsPaymentOnDelivery`). Миграции и сидеры
sequelize-cli больше не используются — вместо них два скрипта.

## Изменённые / новые файлы

| Файл | Что |
|---|---|
| `src/models/associations.js` | **новый** — единый модуль: импорт всех моделей + объявление ассоциаций (FK). Используется сервером и обоими db-скриптами. |
| `src/scripts/db-create.js` | **новый** — создаёт БД (`CREATE DATABASE IF NOT EXISTS`, utf8mb4) и все таблицы через `sync()`. Флаг `--force` дропает и пересоздаёт всё. |
| `src/scripts/db-seed.js` | **новый** — идемпотентное наполнение (5 категорий, singleton-строки конфигов, админ из env). Повторный запуск не создаёт дублей. |
| `src/server.js` | inline-ассоциации и `sequelize.sync({alter})` убраны; теперь `defineAssociations()`. Сервер при старте схему НЕ трогает. |
| `src/config/database.js` | `port` из `DB_PORT`, явный `charset: utf8mb4`. |
| `config/config.cjs` | добавлен `port`, убраны хардкод-креды `root`/`12345678`. |
| `package.json` | новые скрипты `db:*`. |

## Первое развёртывание (с нуля)

```bash
# dev (из src/)
npm run db:setup        # = db:create + db:seed

# production (из dist/, после npm run build)
npm run build
npm run db:setup:prod
npm start
```

## Полный сброс (ВНИМАНИЕ: удаляет данные)

```bash
npm run db:reset        # db-create --force + db-seed
```

## Требуемые переменные окружения

```
DB_HOST=...
DB_PORT=3306            # опционально, по умолчанию 3306
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
ADMIN_EMAIL=...         # для сидера админа
ADMIN_PASSWORD=...
```

## Что можно удалить (необязательно)

После перехода на скрипты эти артефакты sequelize-cli больше не задействованы
приложением и могут быть удалены, когда убедишься, что всё работает:

- `src/migrations/` (все 3 файла)
- `src/seeders/` (все файлы)
- `models/index.js` (корневой автоген cli)
- `.sequelizerc`
- зависимость `sequelize-cli` в devDependencies

Сервер их не импортирует, так что оставление их на месте ничего не ломает —
это вопрос чистоты.

## Важно про будущее

`sync()` рассчитан на создание схемы на ПУСТОЙ базе. Когда в проде появятся
реальные данные, менять схему через `sync({alter/force})` опасно (потеря
данных). Для изменений схемы на живой БД позже стоит вернуть миграции —
структура `src/scripts/` этому не мешает.
