import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  picture: string;
  addresses: IAddress[];
  createdAt: Date;
  recoveryCode?: string;
}

export interface IAddress {
  cep: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
}
