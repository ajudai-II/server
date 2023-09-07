import { Request, Response, NextFunction } from "express";

function registerValidation(req: Request, res: Response, next: NextFunction) {
  const { name, email, phone, cpf, password } = req.body;

  if (!name || !email || !phone || !cpf || !password) {
    return res.status(400).send({ message: "Preencha todos os campos!" });
  }

  if (!password) {
    return res.status(400).send({ message: "Por favor preencha a senha" });
  }

  if (password.length < 8) {
    return res.status(400).send({ message: 'A senha deve ter no mínimo 8 caracteres.' });
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return res.status(400).send({ message: 'A senha deve conter letras maiúsculas e minúsculas.' });
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return res.status(400).send({ message: 'A senha deve conter um caractere especial.' });
  }

  const numberNoCharacter = phone.replace(/\(.*?\)|-/g, "");

  req.body.phone = numberNoCharacter;

  next();
}

export default registerValidation;