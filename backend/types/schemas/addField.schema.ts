import { z } from "zod";
import { featureSchema } from "./feature.schema";

export const addFieldSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name must not exceed 20 characters" }),

  description: z
    .string()
    .max(200, { message: "Description must not exceed 200 characters" }),

  area: z
    .number({ message: "Area must be a number" })
    .positive({ message: "Area must be a positive number" })
    .max(100, { message: "Area must not exceed 100 acres" }),
  feature: featureSchema,
});

export type AddFieldSchema = z.infer<typeof addFieldSchema>;
