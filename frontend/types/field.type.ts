import { PolygonFeature } from "./map.type";

export type FieldType = {
  id: string;
  name: string;
  description: string;
  geojson: PolygonFeature;
  area: number;
  fetched?: boolean;
};
