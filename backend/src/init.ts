import express, { NextFunction, Request, Response, Router } from "express";
import session from "express-session";
import { redisClient } from "../lib/redis";
import { loggerMiddleware } from "../middlewares/logger.middleware";
import { extractError } from "../utils/app-utils";
import { prisma } from "../lib/db";
import cors from "cors";

import { RedisStore } from "connect-redis";

async function seedDB() {
  const tmpUser = await prisma.user.findFirst();
  if (tmpUser) return;
  await prisma.user.create({
    data: {
      username: "Mahmoud_Khaled",
    },
  });
}

export async function initServer(entryRouter: Router) {
  const app = express();
  app.use(express.json());
  app.use(loggerMiddleware);
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  await seedDB();
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET ?? "",
      resave: false,
      saveUninitialized: false,
      name: "session-id",
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  app.use("/api", entryRouter);
  app.all("/{*any}", (req, res, next) => {
    res.status(404).json({
      msg: "Sorry, This route does not exist.",
    });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({ error: "Invalid JSON format." });
      return;
    }
    res.status(400).json({
      error: extractError(err),
    });
  });
  return app;
}
