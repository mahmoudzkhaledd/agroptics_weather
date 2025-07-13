import { z } from "zod";

export const getFieldWeatherSchema = z.object({
  fieldId: z.string(),
});

export type GetFieldWeatherSchema = z.infer<typeof getFieldWeatherSchema>;
