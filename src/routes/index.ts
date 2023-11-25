import { Router } from "express";
import userRoutes from "./user/UserRoute";
import donationRoutes from "./donation/DonationRoute";
import tokenRoutes from "./token/TokenRoute";

const routes = Router();

routes.use(userRoutes);
routes.use(donationRoutes);
routes.use(tokenRoutes);

export default routes;
