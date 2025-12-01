FROM node:20

WORKDIR /app/frontend

# Копируем весь frontend (чтобы получить исходный код)
COPY frontend/package*.json ./
RUN npm install

# Копируем исходный код ПОСЛЕ npm install
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/*.config.* ./
COPY frontend/*.json ./

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
