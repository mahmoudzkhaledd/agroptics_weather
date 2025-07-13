import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? "0"),
  },
  // username: process.env.REDIS_USERNAME,
  // password: process.env.REDIS_PASSWORD,
});
redisClient.on("error", (err) => {
  console.log(err);
  process.exit(1);
});
await redisClient.connect();
export { redisClient };
