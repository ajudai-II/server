import { Request, Response } from "express";
import User from "../../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config({ path: "/server" });

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

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Preencha os campos corretamente" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: 1,
        email: "exemplo@email.com",
        password: hashedPassword,
      };

      if (email === user.email && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id, userEmail: user.email }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });

        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new UserController();
