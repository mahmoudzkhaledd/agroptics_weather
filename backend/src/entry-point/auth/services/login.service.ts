import type { Request, Response } from "express";
import { prisma } from "../../../../lib/db";

export const loginService = async (
  req: Request<any, any, any>,
  res: Response,
  next: Function
) => {
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error("msg: Invalid login credentials");
  }
  req.session.user = {
    id: user.id,
    username: user?.username,
  };

  res.json({ message: "Logged in successfully", sessionId: req.session.id });
};
