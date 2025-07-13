import type { Request, Response } from "express";

export const logoutService = async (
  req: Request<any, any, any>,
  res: Response,
  next: Function
) => {
  req.session.destroy((err) => {
    if (err) throw new Error("msg: Logout failed");
    res.clearCookie("session-id");
    res.sendStatus(200);
  });
};
