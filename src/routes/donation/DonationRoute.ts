import DonationController from "../../controllers/Donation/DonationController";
import { Router } from "express";

const donationRoutes = Router();

donationRoutes
  .post("/create-donation", DonationController.createDonation)
  .bind(DonationController);

export default donationRoutes;
