import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  createdAt: Date;
}
