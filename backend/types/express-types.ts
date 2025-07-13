// types/express-session/index.d.ts
import "express-session";

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      username: string;

      [key: string]: any;
    };
  }
}
