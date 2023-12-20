import { Request, Response } from "express";
import Donation from "../../models/Donation";
import { IDonation, IDonator } from "@src/@types/donation";
import User from "../../models/User";
const PAGE_SIZE = 10;

class DonationController {
  public async createDonation(req: Request, res: Response) {
    try {
      const { title, description, amount, category, id } = req.body;
      const { picture }: any = req.file ? req.file : "";
      const user = await User.findById(id);
      console.log(id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const lastAddress = user.addresses.length > 0 ? user.addresses[user.addresses.length - 1] : null;

      const saveDonation = new Donation({
        title,
        description,
        amount,
        category,
        picture,
        donator: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          _id: user.id,
          address: lastAddress
        },
        isValidated: true,
      });

      await saveDonation.save();

      console.log(saveDonation);

      return res.status(201).send({ message: "Donation created" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error", error });
    }
  }

  public async updateDonation(req: Request, res: Response) {
    try {
      const { title, description, amount, isValidated, donator }: IDonation =
        req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: "Doação não encontrada" });
      }

      const update = await Donation.findByIdAndUpdate(
        id,
        {
          title,
          description,
          amount,
          isValidated,
          donator,
          last_update: Date.now(),
        },
        { new: true }
      );

      return res
        .status(200)
        .send({ message: "Donation atualizada", data: update });
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

  public async getAllDonationsByDonator(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { page = 1 } = req.query;
      const skip = (Number(page) - 1) * PAGE_SIZE;

      const find = await Donation.find({ "donator._id": id })
        .skip(skip)
        .limit(PAGE_SIZE);

      if (!find) {
        return res.status(400).send({ message: "Doação não encontrada" });
      }

      return res.status(200).send({ data: find });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error", error });
    }
  }

  public async getDonationsByCategory(req: Request, res: Response) {
    try {
      const { categoryName } = req.params;
      const { page = 1 } = req.query;
      const skip = (Number(page) - 1) * PAGE_SIZE;

      const find = await Donation.find({ category: categoryName })
        .skip(skip)
        .limit(PAGE_SIZE);

      if (!find) {
        return res
          .status(400)
          .send({ message: "Doações não encontradas para esta categoria" });
      }

      return res.status(200).send({ data: find });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error", error });
    }
  }
}

export default new DonationController();
