import { Request, Response, NextFunction } from "express";
import Donation from "@src/models/Donation";

export default function DonationValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, description, amount, isValidated, donator } = req.body;
    if (title) {
      console.log(title);
    }
  } catch (error) {
    console.error(error);
  }
}
