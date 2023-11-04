/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from "express";

interface IValidateCPF extends Request {
  cpf: string;
}

function isCPFValid(req: Request, res: Response, next: NextFunction) {
  const { cpf }: IValidateCPF = req.body;

  if (!cpf) {
    return res.status(400).send({ message: "Insira o CPF!" });
  }

  const cleanedCPF = cpf.replace(/\D/g, "");

  if (cleanedCPF.length !== 11) {
    return res.status(403).send({ message: "CPF menor que 11 caracteres" });
  }

  if (/^(\d)\1+$/.test(cleanedCPF)) {
    return res.status(403).send({ message: "CPF inválido" });
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanedCPF.charAt(9))) {
    return res.status(403).send({ message: "CPF inválido" });
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanedCPF.charAt(10))) {
    return res.status(403).send({ message: "CPF inválido" });
  }

  req.body.cpf = cleanedCPF;

  next();
}

export default isCPFValid;
