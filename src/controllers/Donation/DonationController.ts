import { Request, Response } from "express";
import Donation from "../../models/Donation";
import { IDonation } from "@src/@types/donation";

class DonationController {
  public async createDonation(req: Request, res: Response) {
    try {
      const { title, description, amount, isValidated, donator }: IDonation = req.body;

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

  public async updateDonation(req: Request, res: Response) {
    try {
      const { title, description, amount, isValidated, donator }: IDonation = req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: "Doação não encontrada" });
      }

      const update = await Donation.findByIdAndUpdate(id, { title, description, amount, isValidated, donator, last_update: Date.now() }, { new: true })

      return res.status(200).send({ message: "Donation atualizada", data: update });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error", error });
    }
  }

  public async getDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: "Doação não encontrada" });
      }

      const find = await Donation.findById(id);

      if (!find) {
        return res.status(400).send({ message: "Doação não encontrada" });
      }

      return res.status(200).send({ data: find });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error", error });
    }
  }

  public async getAllDonations(req: Request, res: Response) {
    try {
      const find = await Donation.find();

      if (!find) {
        return res.status(400).send({ message: "Doação não encontrada" });
      }

      return res.status(200).send({ data: find });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error", error });
    }
  }

  public async deleteDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: "Doação não encontrada" });
      }

      const find = await Donation.findByIdAndDelete(id);

      if (!find) {
        return res.status(400).send({ message: "Doação não encontrada" });
      }

      return res.status(200).send({ message: "Doação deletada" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error", error });
    }
  }
}

export default new DonationController();
