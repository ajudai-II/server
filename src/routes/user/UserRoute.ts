import registerValidation from "../../middlewares/RegisterValidation";
import UserController from "../../controllers/User/UserController";

import { Router } from "express";
import isCPFValid from "../../middlewares/CpfValidator";
import editValidation from "../../middlewares/EditValidation";

const userRoutes = Router();

userRoutes.post("/login", UserController.login).bind(UserController);
userRoutes.post("/register", registerValidation, UserController.register).bind(UserController);
userRoutes.put("/my-account/:id", isCPFValid, editValidation, UserController.editUser).bind(UserController);
userRoutes.get("/get/:id", UserController.getUser).bind(UserController);
userRoutes.delete("/delete/:id", UserController.deleteUser).bind(UserController);
userRoutes.post("/my-address/:id", UserController.addAddress).bind(UserController);
export default userRoutes;
