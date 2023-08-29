import User from "../../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

class UserController {
  public async register(req: Request, res: Response) {
    try {
      const { name, email, phone, cpf, password } = req.body;

      const searchEmail = await User.findOne({ email });

      if (searchEmail) {
        return res.status(400).send({ message: "Email em uso!" });
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const hashPassword = await bcrypt.hash(password, 10);

      const saveUser = new User({
        name,
        email,
        phone,
        cpf,
        password: hashPassword,
      });

      await saveUser.save();

      return res.status(200).send({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  public login(req: Request, res: Response) {
    return res.send({ message: "Login route" });
  }
}

export default new UserController();
