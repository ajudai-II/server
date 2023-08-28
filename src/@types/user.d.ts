import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  cpf: string;
  password: string;
  createdAt: Date;
}
