import type { Request, Response } from "express";
import { prisma } from "../../../../lib/db";

export const getFieldsService = async (
  req: Request<any, any, any>,
  res: Response,
  next: Function
) => {
  const user = req.session.user!;
  const fields = await prisma.field.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  res.json({
    fields,
  });
};
