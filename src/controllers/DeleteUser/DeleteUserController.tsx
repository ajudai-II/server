import { Request, Response } from "express";
import User from "../../models/User";

class UserController {
  public async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      await User.findByIdAndDelete(userId);

      return res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro interno", error });
    }
  }
}

export default new UserController();
