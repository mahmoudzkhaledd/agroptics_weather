import type { Request, Response } from "express";
import { DeleteServiceSchema } from "../../../../types/schemas/deleteService.schema";
import { prisma } from "../../../../lib/db";

export const deleteFieldService = async (
  req: Request<any, any, any, DeleteServiceSchema>,
  res: Response,
  next: Function
) => {
  const user = req.session.user!;
  const { fieldId } = req.query;
  console.log({ fieldId });
  const tmp = await prisma.field.findUnique({
    where: { id: fieldId, userId: user.id },
  });
  if (!tmp) throw new Error("msg: Field not found");
  await prisma.field.delete({
    where: { id: fieldId },
  });
  res.json({
    msg: "Field deleted successfully",
  });
};
