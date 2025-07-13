import { Request, Response } from "express";
import { statusCodes } from "../constants/status-codes";

const authMiddleware = (mustLogin?: boolean) => {
  return (req: Request, res: Response, next: Function) => {
    if (
      mustLogin != null &&
      ((mustLogin == true && !req.session.user) ||
        (mustLogin == false && req.session.user))
    ) {
      res.status(statusCodes.unauthorized).json({ message: "Unauthorized" });
      return;
    }
    next();
  };
};

export default authMiddleware;
