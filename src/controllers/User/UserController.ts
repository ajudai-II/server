import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { IAddress, IUser } from "@src/@types/user";
import { sendRecoveryCode } from "../../services/mail";

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

      const validyPassword = await bcrypt.compare(
        password,
        userVerify.password
      );

      if (userVerify && validyPassword) {
        const token = generateAccessToken(userVerify?.name);
        const refresh_token = generateRefreshToken(userVerify?.name);

        return res.status(200).json({
          token,
          refresh_token,
          email: userVerify.email,
          _id: userVerify._id,
        });
      } else {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const searchUser = await User.findById(id, { password: 0 });
      if (!searchUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(searchUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async editUser(req: Request, res: Response) {
    try {
      const { name, email, phone, cpf, password } = req.body;
      const { id } = req.params;
      const { picture }: any = req.file ? req.file : "";
      const searchUser = await User.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        cpf,
        password,
        picture,
      });
      searchUser?.save();

      if (!searchUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const searchUser = await User.findById(id);
      if (!searchUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        searchUser.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Senha inválida" });
      }

      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async addAddress(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { cep, uf, city, neighborhood, street, number, complement } =
        req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (!user.addresses) {
        user.addresses = [];
      }

      if (user.addresses.length >= 3) {
        return res
          .status(400)
          .json({ message: "Limite de endereços atingido" });
      }

      const isAddressDuplicate = user.addresses.some(
        (address) =>
          address.cep === cep &&
          address.uf === uf &&
          address.city === city &&
          address.neighborhood === neighborhood &&
          address.street === street &&
          address.number === number &&
          address.complement === complement
      );

      if (isAddressDuplicate) {
        return res.status(400).json({ message: "Endereço já cadastrado" });
      }

      const newAddress: IAddress = {
        cep,
        uf,
        city,
        neighborhood,
        street,
        number,
        complement,
      };

      console.log(newAddress);

      user.addresses.push(newAddress);

      await user.save();

      return res
        .status(201)
        .json({ message: "Endereço adicionado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async recoveryCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const randomCode = Math.floor(1000 + Math.random() * 9000);

      user.recoveryCode = randomCode.toString();

      await user.save();

      await sendRecoveryCode(user.email, randomCode);

      return res
        .status(200)
        .json({ message: "Código de recuperação enviado com sucesso" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao enviar o código de recuperação" });
    }
  }

  public async verifyRecoveryCode(req: Request, res: Response) {
    try {
      const { recoveryCode } = req.body;
      const user = await User.findOne({ recoveryCode });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Código de recuperação inválido" });
      }

      user.recoveryCode = undefined;

      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      console.log(user.id);

      return res.status(200).json({
        message: "Código de recuperação válido",
        token,
        userId: user._id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  public async changePassword(req: Request, res: Response) {
    try {
      const { password, id } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate(id, { password: hashedPassword });
      await User.findByIdAndUpdate(id, { $inc: { tokenVersion: 1 } });

      return res.status(200).json({ message: "Senha alterada com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new UserController();
