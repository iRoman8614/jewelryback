# Dockerfile
# --- ЭТАП 1: СБОРКА (Builder) ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# build транспилирует src -> dist, собирает компоненты и ПРЕКОМПИЛИРУЕТ
# AdminJS-бандл в dist/.adminjs (нужны devDeps: @adminjs/bundler, babel).
RUN npm run build

# --- ЭТАП 2: ЗАПУСК (Production) ---
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
# Не пересобирать AdminJS-бандл при старте — используем прекомпилированный.
ENV ADMIN_JS_SKIP_BUNDLE=true
COPY package*.json ./
RUN npm install --omit=dev

# Весь собранный код (включая dist/.adminjs, dist/models, dist/scripts) уже
# лежит в dist/ — копируем одной командой. Миграции/сидеры/sequelize-cli
# больше не используются: схема создаётся из моделей скриптом db:create,
# а наполнение — db:seed (запускаются вручную при первом развёртывании,
# например: `node dist/scripts/db-create.js && node dist/scripts/db-seed.js`).
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/server.js"]