import { Feature, Polygon } from "geojson";
import { FieldType } from "./field.type";

export type StyleType = "positron" | "satellite";

export type MapPropsType = {
  mapboxDraw: MapboxDraw | null;

  selectedFeatureId: string | null;
  selectedStyle: StyleType;
  isDrawing: boolean;
  hiddenFields: Set<string>;
  mapRef: React.RefObject<maplibregl.Map | null>;
  controls: {
    setAddedFeature: (feature: FieldType) => void;
    changeStyle: (style: StyleType) => void;
    startDrawing: () => void;
    stopDrawing: () => void;
    deleteSelected: () => void;
    deleteAll: () => void;
    deleteFeature: (featureId: string) => void;
    setSelectedFeatureId: (featureId: string) => void;
    jumpToField: (featureId: string | number) => void;
    toggleFieldVisibility: (fieldId: string) => void;
  };
};
export type PolygonFeature = Feature<Polygon, { area: number; name?: string }>;
