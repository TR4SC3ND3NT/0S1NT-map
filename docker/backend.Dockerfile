FROM node:20-alpine

WORKDIR /usr/src/app

COPY backend/package*.json ./backend/

WORKDIR /usr/src/app/backend

RUN npm install

COPY backend/prisma ./prisma
COPY backend/src ./src

ENV DATABASE_URL="postgresql://osint:osintpassword@db:5432/osintmap"

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]