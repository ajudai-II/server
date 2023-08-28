import { IUser } from "../@types/user";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new mongoose.Schema({
  name: { type: { type: String, required: true }, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser>("User", UserSchema);
