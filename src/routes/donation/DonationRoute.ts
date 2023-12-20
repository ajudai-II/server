import DonationController from "../../controllers/Donation/DonationController";
import { Router } from "express";
import { uploadImage } from "../../middlewares/UploadImage";
import multer, { memoryStorage } from "multer";

const donationRoutes = Router();

const Multer = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

donationRoutes
  .get("/donation/:id", DonationController.getDonation)
  .bind(DonationController);
donationRoutes
  .get("/donations", DonationController.getAllDonations)
  .bind(DonationController);
donationRoutes
  .get("/user-donations/:id", DonationController.getAllDonationsByDonator)
  .bind(DonationController);
donationRoutes
  .get("/donations", DonationController.getAllDonations)
  .bind(DonationController);
donationRoutes
  .get("/top-donations", DonationController.getLastDonations)
  .bind(DonationController);
donationRoutes
  .post(
    "/create-donation",
    Multer.single("picture"),
    uploadImage,
    DonationController.createDonation
  )
  .bind(DonationController);
donationRoutes
  .patch(
    "/update-donation/:id",
    Multer.single("picture"),
    uploadImage,
    DonationController.updateDonation
  )
  .bind(DonationController);
donationRoutes
  .delete("/delete-donation/:id", DonationController.deleteDonation)
  .bind(DonationController);
donationRoutes
  .get("/categories/:categoryName", DonationController.getDonationsByCategory)
  .bind(DonationController);
donationRoutes
  .get("/", DonationController.getAllDonations)
  .bind(DonationController);

export default donationRoutes;
