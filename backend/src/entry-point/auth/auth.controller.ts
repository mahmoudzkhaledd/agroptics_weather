import { Router } from "express";
import { verifySessionService } from "./services/verifySession.service";
import { loginService } from "./services/login.service";
import { logoutService } from "./services/logout.service";

const authController = Router({ mergeParams: true });

authController.use("/verify-session", verifySessionService);
authController.use("/logout", logoutService);
authController.use("/login", loginService);

export default authController;
