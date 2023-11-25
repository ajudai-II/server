import { Request, Response, ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateAccessToken } from "../../jwt/jwt";

dotenv.config({ path: "/server" });

class JWTTokensController {
  public async refreshToken(req: Request, res: Response): Promise<any> {
    try {
      const refreshToken = req.body.token;

      if (refreshToken == null) return res.status(401);

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken(user.name);
        res.json({ accessToken: accessToken });
      });
    } catch (error) {
      console.error("Erro ao gerar token de acesso", error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    }

  }
}

export default new JWTTokensController();