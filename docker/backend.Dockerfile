FROM node:20

WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate

EXPOSE 4000
CMD ["npm", "run", "dev"]
