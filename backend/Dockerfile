FROM node:alpine

RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json prisma ./
COPY tsconfig.json ./
COPY . .

ENV DATABASE_URL="postgresql://user:pass@db:54329/clinicdb?schema=public"
RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 5100
CMD ["npm", "run", "dev"]