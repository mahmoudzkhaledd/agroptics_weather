echo "Waiting for MySQL to be ready..."

echo "MySQL is ready — pushing Prisma schema..."
bunx prisma db push
echo "Prisma schema pushed successfully."

exec bun run src/index.ts