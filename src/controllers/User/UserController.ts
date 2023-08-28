import User from "../../models/User";
import { Request, Response } from "express";

class UserController {
  public register(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body;

    const saveUser = new User({
      name,
      email,
      cpf,
      password,
    });
    saveUser.save();

    return res.status(200).send({ message: "Usuário criado com sucesso!" });
  }

  public login(req: Request, res: Response) {
    return res.send({ message: "Login route" });
  }
}

export default new UserController();
