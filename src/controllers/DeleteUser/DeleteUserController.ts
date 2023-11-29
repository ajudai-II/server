import { Request, Response } from "express";
import User from "../../models/User";

class DeleteAccountController {
  public async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      await User.findByIdAndDelete(userId);

      return res.status(200).redirect('/login');
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro interno", error });
    }
  }
}

class CreateUserController {
  public async createUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const newUser = new User({
        username,
        email,
        password,
      });

      await newUser.save();
      return res.status(201).redirect('/login');
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro interno", error });
    }
  }
}

export { DeleteAccountController, CreateUserController };