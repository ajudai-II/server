import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

async function editValidation(req: Request, res: Response, next: NextFunction) {
    const { phone, password } = req.body;

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
      const hashedPassword = await bcrypt.hash(password, 10);
    
      req.body.phone = numberNoCharacter;
      req.body.password = hashedPassword;
    
      next();
}

export default editValidation;