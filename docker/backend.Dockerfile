FROM node:20

WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend/prisma ./prisma
COPY backend/src ./src

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]CMD ["npm", "run", "dev"]