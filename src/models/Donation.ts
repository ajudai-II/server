import mongoose, { Schema } from "mongoose";
import { IDonation } from "@src/@types/donation";

const DonationSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  isValidated: { type: Boolean, required: true },
  donator: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  last_update: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IDonation>("Donation", DonationSchema);
