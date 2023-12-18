import { IUser } from "./user";

interface IDonator extends Document {
  name: string;
  email: string;
  phone: string;
  adress: string;
  _id: string;
}

interface IDonation extends Document {
  title: string;
  description: string;
  amount: number;
  category: string;
  isValidated: boolean;
  donator: IDonator;
  category: string;
}
