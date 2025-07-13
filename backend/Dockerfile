FROM oven/bun:1

# Install OS dependencies
RUN apt-get update -y && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package manager files
COPY package.json bun.lock ./ 
COPY prisma ./prisma          

# Install dependencies AND devDependencies
RUN bun install 
RUN bunx prisma generate

# Copy the rest of the application
COPY . .

# Start the compiled server using Node.js
CMD ["bun","run","src/index.ts"]
