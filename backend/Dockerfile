FROM oven/bun:1

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json bun.lock ./ 
COPY prisma ./prisma          
COPY init-db.sh ./init-db.sh

RUN bun install 
RUN bunx prisma generate

COPY . .
CMD ["sh", "./init-db.sh"]
