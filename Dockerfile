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
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.sequelizerc ./.sequelizerc
COPY --from=builder /app/config ./config
COPY --from=builder /app/src/migrations ./src/migrations
COPY --from=builder /app/src/seeders ./src/seeders
COPY --from=builder /app/src/models ./src/models
EXPOSE 5000
CMD ["node", "dist/server.js"]