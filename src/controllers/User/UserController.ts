/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Request, Response } from "express";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IUser } from "@src/@types/user";
dotenv.config({ path: "/server" });

class UserController {
  public async register(req: Request, res: Response) {
    try {
      const { name, email, phone, cpf, password } = req.body;
      const searchEmail = await User.findOne({ email });

      if (searchEmail) {
        return res.status(400).send({ message: "Email em uso!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const saveUser = new User({
        name,
        email,
        phone,
        cpf,
        password: hashedPassword,
      });

      await saveUser.save();

      return res.status(200).send({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Preencha os campos corretamente" });
      }

      const userVerify = await User.findOne<Promise<IUser>>({ email: email });

      if (!userVerify) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const validyPassword = await bcrypt.compare(password, userVerify.password);

      if (userVerify && validyPassword) {
        const token = jwt.sign(
          { userId: userVerify._id, userEmail: userVerify.email },
          process.env.JWT_SECRET!,
          {
            expiresIn: "1h",
          }
        );

        return res
          .status(200)
          .json({ token, email: userVerify.email, _id: userVerify._id });
      } else {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  public async editUser(req: Request, res: Response) {
    try {
      const {name, email, phone, cpf, password} = req.body;
      const {id} = req.params;
      const { imageUrl }: any = req.file ? req.file : "";
      const searchUser = await User.findByIdAndUpdate(id, {name, email, phone, cpf, password, imageUrl}); 
      if (!searchUser) {
        return res.status(404).json({message: "Usuário não encontrado"});
      }
      return res.status(200).json({message: "Usuário atualizado com sucesso"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } 
}

export default new UserController();
