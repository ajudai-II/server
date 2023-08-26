import SessionController from "../controllers/Session/SessionController";
import { Router } from "express";

const Routes = Router();

Routes.post("/login", SessionController.login);

export default Routes;
