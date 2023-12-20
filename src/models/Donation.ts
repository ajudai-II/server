import mongoose, { Schema } from "mongoose";
import { IDonation } from "@src/@types/donation";

const DonatorSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  _id: { type: String, required: true },
  address: { type: String, required: true },
});

const DonationSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true},
  isValidated: { type: Boolean, required: true },
  donator: { type: mongoose.Schema.Types.ObjectId, ref: "Donator", required: true },
  picture: { type: String, required: true },
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