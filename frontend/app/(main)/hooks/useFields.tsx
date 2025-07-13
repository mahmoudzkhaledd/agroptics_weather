import { useQuery } from "@tanstack/react-query";

import { useMap } from "../_components/map-provider";
import { axiosClient } from "@/lib/axios";
import { FieldType } from "@/types/field.type";
import { useEffect } from "react";

export default function useFields(enabled = true) {
  const { mapboxDraw, hiddenFields } = useMap();

  const q = useQuery({
    queryKey: ["get-user-fields"],
    queryFn: async () => await fetchFields(),
    enabled: enabled,
  });

  const fetchFields = async (): Promise<FieldType[]> => {
    if (!mapboxDraw) return [];
    mapboxDraw.deleteAll();
    const fields = (await axiosClient.get<{ fields: FieldType[] }>("/field"))
      .data?.fields;

    for (const f of fields) {
      f.geojson.id = f.id;
      f.fetched = true;
      // Only add fields that are not hidden
      if (!hiddenFields.has(f.id)) {
        mapboxDraw.add(f.geojson);
      }
    }
    return fields;
  };

  useEffect(() => {
    if (!mapboxDraw) return;
    console.log("refecttttttttt", mapboxDraw);
    q.refetch({});
  }, [mapboxDraw]);

  return q;
}
