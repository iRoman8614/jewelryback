# Dockerfile
# --- ЭТАП 1: СБОРКА (Builder) ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- ЭТАП 2: ЗАПУСК (Production) ---
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=dev

# Копируем собранный код
COPY --from=builder /app/dist ./dist

# Копируем sequelize-cli конфиг и конфиг БД
COPY --from=builder /app/.sequelizerc ./.sequelizerc
COPY --from=builder /app/config ./config

# Копируем всё необходимое для sequelize-cli ИЗ ИСХОДНИКОВ В ИСХОДНИКИ
COPY --from=builder /app/src/migrations ./src/migrations
COPY --from=builder /app/src/seeders ./src/seeders
COPY --from=builder /app/src/models ./src/models

EXPOSE 5000
CMD ["node", "dist/server.js"]