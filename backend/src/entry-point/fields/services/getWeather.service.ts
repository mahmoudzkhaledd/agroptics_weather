import type { Request, Response } from "express";
import { GetFieldWeatherSchema } from "../../../../types/schemas/getFieldWeather.schema";
import { prisma } from "../../../../lib/db";
import axios from "axios";
import { findNearestStation, getFieldCentroid } from "../utils/fieldUtils";
export const getWeatherService = async (
  req: Request<any, any, any, GetFieldWeatherSchema>,
  res: Response,
  next: Function
) => {
  const { fieldId } = req.query;
  const user = req.session.user!;
  const field = await prisma.field.findUnique({
    where: { id: fieldId, userId: user.id },
  });
  if (!field) throw new Error("msg: Field not found!");
  const centroid = getFieldCentroid(field.geojson);
  const nearestStation = findNearestStation(centroid);

  if (!nearestStation) throw new Error("msg: No near station found!");
  const wRes = await axios.get(nearestStation.url);
  res.json({
    weatherData: wRes.data,
  });
};
