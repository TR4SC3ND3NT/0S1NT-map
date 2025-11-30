FROM node:20-alpine

WORKDIR /usr/src/app

COPY backend/package*.json ./backend/

WORKDIR /usr/src/app/backend

RUN npm install

COPY backend/prisma ./prisma
COPY backend/src ./src

RUN npx prisma generate
RUN npx prisma migrate dev --name init

EXPOSE 4000

CMD ["npm", "run", "dev"]