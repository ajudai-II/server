import { Router } from "express";
import userRoutes from "./user/UserRoute";
import donationRoutes from "./donation/DonationRoute";

const routes = Router();

routes.use(userRoutes);
routes.use(donationRoutes);

export default routes;
