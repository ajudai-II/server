import { IAddress, IUser } from "./user";

interface IDonator extends Document {
  name: string;
  email: string;
  phone: string;
  _id: string;
  address: IAddress[];
}

interface IDonation extends Document {
  title: string;
  description: string;
  amount: number;
  category: string;
  picture: string;
  donator: IDonator;
  isValidated: boolean;
}
