import { z } from "zod";

export const deleteServiceSchema = z.object({
  fieldId: z.string(),
});

export type DeleteServiceSchema = z.infer<typeof deleteServiceSchema>;
