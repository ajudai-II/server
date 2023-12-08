import { IAddress, IUser } from "../@types/user";
import mongoose, { Schema } from "mongoose";

const AddressSchema: Schema<IAddress> = new Schema({
  cep: { type: String, required: true },
  uf: { type: String, required: true },
  city: { type: String, required: true },
  neighborhood: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String, required: false },
});

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  phone: { type: String, required: true },
  cpf: { type: String, required: true },
  password: { type: String, required: true },
  addresses: [AddressSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser>("User", UserSchema);

