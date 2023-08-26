import { Request, Response } from "express";

export default {
  login(req: Request, res: Response) {
    return res.send({ message: "Login route" });
  },
};
