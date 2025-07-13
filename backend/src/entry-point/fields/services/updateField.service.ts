import type { Request, Response } from "express";
import { UpdateFieldSchema } from "../../../../types/schemas/updateField.schema";
import { prisma } from "../../../../lib/db";

export const updateFieldService = async (
  req: Request<any, any, UpdateFieldSchema>,
  res: Response,
  next: Function
) => {
  const { description, name, id } = req.body;
  const user = req.session.user!;
  const tmpField = await prisma.field.findUnique({
    where: { id: id, userId: user.id },
  });
  if (!tmpField) throw new Error("msg: Field not found");
  await prisma.field.update({
    where: { id: tmpField.id },
    data: {
      name,
      description,
    },
  });
  res.json({
    msg: "Field data updated successfully",
  });
};
