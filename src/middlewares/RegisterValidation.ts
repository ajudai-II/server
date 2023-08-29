import { Request, Response, NextFunction } from "express";

function registerValidation(req: Request, res: Response, next: NextFunction) {
  const { name, email, phone, cpf, password } = req.body;

  if (!name || !email || !phone || !cpf || !password) {
    return res.status(400).send({ message: "Preencha todos os campos!" });
  }

  const numberNoCharacter = phone.replace(/\(.*?\)|-/g, "");

  req.body.phone = numberNoCharacter;

  next();
}

export default registerValidation;