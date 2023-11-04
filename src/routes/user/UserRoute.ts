import registerValidation from "../../middlewares/RegisterValidation";
import UserController from "../../controllers/User/UserController";

import { Router } from "express";
import isCPFValid from "../../middlewares/CpfValidator";
import editValidation from "../../middlewares/EditValidation";

const userRoutes = Router();

userRoutes.post("/login", UserController.login).bind(UserController);
userRoutes.post("/register", registerValidation, UserController.register).bind(UserController);
userRoutes.put("/edit/:id", isCPFValid, editValidation, UserController.editUser).bind(UserController);

export default userRoutes;
