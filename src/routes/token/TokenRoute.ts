import TokenController from "../../controllers/Token/TokenController";
import { Router } from "express";

const tokenRoutes = Router();

tokenRoutes.post("/refresh-token", TokenController.refreshToken);

export default tokenRoutes;