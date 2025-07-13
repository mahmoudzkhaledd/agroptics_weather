"use client";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import maplibregl from "maplibre-gl";
import * as turf from "@turf/turf";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { MapPropsType, PolygonFeature, StyleType } from "@/types/map.type";
import AddFieldDialog from "./add-field-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { FieldType } from "@/types/field.type";

const MapContext = createContext<MapPropsType | undefined>(undefined);
export const useMap = () => useContext(MapContext)!;

export default function MapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapRef = useRef<maplibregl.Map>(null);
  const drawRef = useRef<MapboxDraw>(null);
  const queryClient = useQueryClient();

  const [isDrawing, setIsDrawing] = useState(false);
  const [addedFeature, setAddedFeature] = useState<FieldType | null>(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(
    null
  );
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("positron");
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());

  const onCreate = ({ features }: { features: PolygonFeature[] }) => {
    if (features.length == 0) return;

    const feature = features[features.length - 1];
    if (feature.geometry.type !== "Polygon") {
      drawRef.current?.delete(feature.id as string);
      return;
    }

    const areaSqMeters = turf.area(feature);
    const areaAcres = +(areaSqMeters / 4046.8564224).toFixed(2);

    const updatedFeature: FieldType = {
      area: areaAcres,
      name: "",
      description: "",
      geojson: {
        ...feature,
        properties: { ...feature.properties, area: areaAcres },
      },
      id: feature.id as string,
    };

    drawRef.current?.delete(feature.id as string);

    setAddedFeature(updatedFeature);
  };

  const initDraw = () => {
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {},
      modes: {
        ...MapboxDraw.modes,
        simple_select: {
          ...MapboxDraw.modes.simple_select,
          onDrag: (state, e) => {},
        },
        direct_select: {
          ...MapboxDraw.modes.direct_select,
          onDrag: (state, e) => {},
        },
      },
    });

    const patchedStyles = (draw as any).options.styles.map((style: any) => {
      if (Array.isArray(style.paint?.["line-dasharray"])) {
        delete style.paint["line-dasharray"];
      }
      return style;
    });
    (draw as any).options.styles = patchedStyles;
    drawRef.current = draw;
    mapRef.current?.addControl(draw as any);
  };

  const initMap = (style: StyleType) => {
    const map = new maplibregl.Map({
      container: "map-container",
      style: style === "satellite" ? "/Satellite.json" : "/Positron.json",
      center: [-91.874, 42.76],
      zoom: 15,
    });

    mapRef.current = map;

    initDraw();

    const createListener = map.on("draw.create", onCreate);

    const doubleClickListener = map.on("dblclick", (e) => {
      const point = turf.point([e.lngLat.lng, e.lngLat.lat]);

      const queryData = queryClient.getQueryData<FieldType[]>([
        "get-user-fields",
      ]);

      const clicked = queryData?.find((f) =>
        turf.booleanPointInPolygon(point, f.geojson)
      );

      if (clicked) {
        setSelectedFeatureId(clicked.id as string);
        setAddedFeature(clicked);
      }
    });

    const selectListner = map.on("draw.selectionchange", (e) => {
      const selected = e.features?.[e.features.length - 1]?.id || null;
      setSelectedFeatureId(selected as string | null);
    });

    const modeChangeListner = map.on("draw.modechange", (e) => {
      setIsDrawing(e.mode === "draw_polygon");
    });

    return {
      map,
      createListener,
      doubleClickListener,
      selectListner,
      modeChangeListner,
    };
  };

  const changeStyle = (newStyle: StyleType) => {
    if (mapRef.current && newStyle !== selectedStyle) {
      const styleUrl =
        newStyle === "satellite" ? "/Satellite.json" : "/Positron.json";
      mapRef.current.setStyle(styleUrl);
      setSelectedStyle(newStyle);
      localStorage.setItem("style", newStyle);
    }
  };

  const startDrawing = () => {
    drawRef.current?.changeMode("draw_polygon");
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    drawRef.current?.changeMode("simple_select");
    setIsDrawing(false);
  };

  const deleteSelected = () => {
    if (selectedFeatureId) {
      drawRef.current?.delete(selectedFeatureId);
      setSelectedFeatureId(null);
    }
  };

  const deleteFeature = (id: string) => {
    drawRef.current?.delete(id);
    setSelectedFeatureId(null);
  };

  const deleteAll = () => {
    drawRef.current?.deleteAll();
    setSelectedFeatureId(null);
  };

  const jumpToField = (featureId: string | number) => {
    const feature = drawRef.current?.get(`${featureId}`);
    if (!feature || !mapRef.current) return;

    const bbox = turf.bbox(feature);
    mapRef.current.fitBounds(
      [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ],
      { padding: 40, duration: 500, zoom: 18 }
    );
  };

  const handleClose = () => setAddedFeature(null);

  const toggleFieldVisibility = (fieldId: string) => {
    const newHiddenFields = new Set(hiddenFields);
    if (newHiddenFields.has(fieldId)) {
      newHiddenFields.delete(fieldId);
      // Show the field by adding it back to the map
      const queryData = queryClient.getQueryData<FieldType[]>([
        "get-user-fields",
      ]);
      const field = queryData?.find((f) => f.id === fieldId);
      if (field && drawRef.current) {
        drawRef.current.add(field.geojson);
      }
    } else {
      newHiddenFields.add(fieldId);
      // Hide the field by removing it from the map
      if (drawRef.current) {
        drawRef.current.delete(fieldId);
      }
    }
    setHiddenFields(newHiddenFields);
  };

  const contextValue: MapPropsType = {
    mapboxDraw: drawRef.current!,
    selectedFeatureId,
    isDrawing,
    selectedStyle,
    hiddenFields,
    mapRef,
    controls: {
      deleteFeature,
      startDrawing,
      stopDrawing,
      deleteSelected,
      deleteAll,
      changeStyle,
      jumpToField,
      setSelectedFeatureId,
      setAddedFeature,
      toggleFieldVisibility,
    },
  };

  useEffect(() => {
    const storedStyle =
      (localStorage.getItem("style") as StyleType) || "positron";
    setSelectedStyle(storedStyle);
    const {
      map,
      createListener,
      doubleClickListener,
      selectListner,
      modeChangeListner,
    } = initMap(storedStyle);

    return () => {
      createListener.unsubscribe();
      doubleClickListener.unsubscribe();
      selectListner.unsubscribe();
      modeChangeListner.unsubscribe();
      if (drawRef.current) {
        map.removeControl(drawRef.current as any);
      }
      map.remove();
    };
  }, []);
  return (
    <MapContext.Provider value={contextValue}>
      {addedFeature && (
        <AddFieldDialog feature={addedFeature} onClose={handleClose} />
      )}
      {children}
    </MapContext.Provider>
  );
}
