import { uploadImage } from "../../middlewares/UploadImage";
import DonationController from "../../controllers/Donation/DonationController";
import { Router } from "express";
import multer, { memoryStorage } from "multer";

const donationRoutes = Router();

const Multer = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single('imageUrl');

donationRoutes.get("/donation/:id", DonationController.getDonation).bind(DonationController);
donationRoutes.get("/donations", DonationController.getAllDonations).bind(DonationController);
donationRoutes.get("/user-donations/:id", DonationController.getAllDonationsByDonator).bind(DonationController);
donationRoutes
  .post("/create-donation", Multer, uploadImage, DonationController.createDonation)
  .bind(DonationController);
donationRoutes.patch("/update-donation/:id", DonationController.updateDonation).bind(DonationController);
donationRoutes.delete("/delete-donation/:id", DonationController.deleteDonation).bind(DonationController);

export default donationRoutes;