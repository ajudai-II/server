import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  createdAt: Date;
}
