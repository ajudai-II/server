import DonationController from "../../controllers/Donation/DonationController";
import { Router } from "express";

const donationRoutes = Router();

donationRoutes.get("/donation/:id", DonationController.getDonation).bind(DonationController);
donationRoutes.get("/donations", DonationController.getAllDonations).bind(DonationController);
donationRoutes.get("/user-donations", DonationController.getAllDonationsByDonator).bind(DonationController);
donationRoutes
  .post("/create-donation", DonationController.createDonation)
  .bind(DonationController);
donationRoutes.patch("/update-donation/:id", DonationController.updateDonation).bind(DonationController);
donationRoutes.delete("/delete-donation/:id", DonationController.deleteDonation).bind(DonationController);

export default donationRoutes;
