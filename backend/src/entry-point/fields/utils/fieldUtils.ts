import { polygon, centroid, point, distance } from "@turf/turf";
import { Station } from "../../../../types/station.type";
import stations from "../../../../constants/stations.json";
export function getFieldCentroid(field: any): [number, number] {
  const fieldPolygon = polygon(field.geometry.coordinates);
  const fieldCentroid = centroid(fieldPolygon);
  return fieldCentroid.geometry.coordinates as [number, number];
}
export function findNearestStation([lon, lat]: [
  number,
  number
]): Station | null {
  const fieldPoint = point([lon, lat]);
  let closest: Station | null = null;
  let minDist = Infinity;

  for (const station of stations.stations) {
    const stationPoint = point([station.longitude, station.latitude]);
    const dist = distance(fieldPoint, stationPoint);
    if (dist < minDist) {
      minDist = dist;
      closest = station;
    }
  }

  return closest;
}
