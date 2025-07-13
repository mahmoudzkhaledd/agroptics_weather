import { z } from "zod";

// Linear ring: at least 4 positions and first == last
const Position = z.array(z.number()).min(2);

const LinearRing = z
  .array(Position)
  .refine((coords) => coords.length >= 4, {
    message: "Linear ring must have at least 4 positions.",
  })
  .refine(
    (coords) =>
      coords.length > 0 &&
      coords[0][0] === coords[coords.length - 1][0] &&
      coords[0][1] === coords[coords.length - 1][1],
    {
      message: "First and last position in a linear ring must be the same.",
    }
  );

// Polygon geometry
const Polygon = z.object({
  type: z.literal("Polygon"),
  coordinates: z.array(LinearRing),
});

// Feature schema based on example
export const featureSchema = z.object({
  id: z.string().or(z.number()).optional(),
  type: z.literal("Feature"),
  properties: z.record(z.string(), z.any()),
  geometry: Polygon,
});

export type FeatureSchema = z.infer<typeof featureSchema>;
