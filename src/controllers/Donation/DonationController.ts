import { Request, Response } from "express";
import Donation from "../../models/Donation";

class DonationController {
  public async createDonation(req: Request, res: Response) {
    try {
      const { title, description, amount, isValidated, donator } = req.body;

      const saveDonation = new Donation({
        title,
        description,
        amount,
        isValidated,
        donator,
      });

      await saveDonation.save();
      return res.status(201).send({ message: "Donation created" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error", error });
    }
  }
}

export default new DonationController();
