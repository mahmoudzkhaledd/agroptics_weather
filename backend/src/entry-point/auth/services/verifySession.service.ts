import type { Request, Response } from "express";

export const verifySessionService = async (
  req: Request<any, any, any>,
  res: Response,
  next: Function
) => {
  res.json({
    user: req.session.user,
  });
};
