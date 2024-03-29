import registerValidation from "../../middlewares/RegisterValidation";
import UserController from "../../controllers/User/UserController";
import { Router } from "express";
import isCPFValid from "../../middlewares/CpfValidator";
import editValidation from "../../middlewares/EditValidation";
import { uploadImage } from "../../middlewares/UploadImage";
import multer, { memoryStorage } from "multer";

const userRoutes = Router();

const Multer = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

userRoutes.post("/login", UserController.login).bind(UserController);
userRoutes
  .post("/register", registerValidation, UserController.register)
  .bind(UserController);
userRoutes
  .put(
    "/edit/:id",
    Multer.single("picture"),
    uploadImage,
    isCPFValid,
    editValidation,
    UserController.editUser
  )
  .bind(UserController);
userRoutes.get("/get/:id", UserController.getUser).bind(UserController);
userRoutes
  .post("/my-address/:id", UserController.addAddress)
  .bind(UserController);
  userRoutes
  .post("/delete-account/:id", UserController.deleteUser)
  .bind(UserController);
userRoutes.post("/recovery-password", UserController.recoveryCode).bind(UserController);
userRoutes.post("/verify-code", UserController.verifyRecoveryCode).bind(UserController);
userRoutes.put("/change-password", UserController.changePassword).bind(UserController);

export default userRoutes;
