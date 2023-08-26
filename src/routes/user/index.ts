import UserController from "../../controllers/User/UserController";

import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/login", UserController.login).bind(UserController);
userRoutes.post("/register", UserController.register).bind(UserController);

export default userRoutes;
