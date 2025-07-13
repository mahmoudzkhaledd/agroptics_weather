import { z } from "zod";
import { addFieldSchema } from "./addField.schema";

export const updateFieldSchema = addFieldSchema
  .omit({
    feature: true,
    area: true,
  })
  .extend({
    id: z.string(),
  });

export type UpdateFieldSchema = z.infer<typeof updateFieldSchema>;
