import { Router } from "express";
import { addFieldService } from "./services/addField.service";
import { getFieldsService } from "./services/getField.service";
import { deleteFieldService } from "./services/deleteField.service";
import { zodMiddleware } from "../../../middlewares/zodMiddleware";
import { addFieldSchema } from "../../../types/schemas/addField.schema";
import { deleteServiceSchema } from "../../../types/schemas/deleteService.schema";
import { updateFieldService } from "./services/updateField.service";
import { updateFieldSchema } from "../../../types/schemas/updateField.schema";
import { getFieldWeatherSchema } from "../../../types/schemas/getFieldWeather.schema";
import { getWeatherService } from "./services/getWeather.service";

const fieldsController = Router({ mergeParams: true });
fieldsController
  .route("/")
  .post(zodMiddleware(addFieldSchema), addFieldService)
  .get(getFieldsService)
  .delete(zodMiddleware(deleteServiceSchema, "query"), deleteFieldService)
  .put(zodMiddleware(updateFieldSchema, "body"), updateFieldService);
fieldsController.get(
  "/weather",
  zodMiddleware(getFieldWeatherSchema, "query"),
  getWeatherService
);
export default fieldsController;
