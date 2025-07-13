import { Router } from "express";
import fieldsController from "./fields/fields.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import authController from "./auth/auth.controller";

const appController = Router({ mergeParams: true });

appController.use("/auth", authController);
appController.use(authMiddleware(true));
appController.use("/field", fieldsController);

export default appController;
