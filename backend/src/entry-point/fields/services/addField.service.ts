import type { Request, Response } from "express";
import { AddFieldSchema } from "../../../../types/schemas/addField.schema";
import { prisma } from "../../../../lib/db";

export const addFieldService = async (
  req: Request<any, any, AddFieldSchema>,
  res: Response,
  next: Function
) => {
  const user = req.session.user!;
  const { area, description, feature, name } = req.body;

  const field = await prisma.field.create({
    data: {
      id: feature.id ? `${feature.id}` : undefined,
      user: {
        connect: {
          id: user.id,
        },
      },
      description,
      name,
      area,
      geojson: feature,
    },
  });
  res.json({ field });
};
