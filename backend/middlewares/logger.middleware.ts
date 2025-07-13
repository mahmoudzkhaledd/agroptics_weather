import type { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodEmojis: Record<string, string> = {
    GET: "📥",
    POST: "📝",
    PUT: "🛠️",
    PATCH: "🔄",
    DELETE: "🗑️",
    OPTIONS: "⚙️",
  };

  const methodEmoji = methodEmojis[req.method] || "❓";

  console.log(
    `${new Date().toISOString()} ${methodEmoji} ${req.method} ${
      req.originalUrl
    }`
  );
  next();
};
