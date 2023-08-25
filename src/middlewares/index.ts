import { Request, Response, NextFunction } from 'express';

export default class Middlewares {

  static validateAccount(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, CPF, CNPJ } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password is required' });
    }

    if (!CPF && !CNPJ) {
      return res.status(400).json({ message: 'CPF or CNPJ is required' });
    }

    next();
  }
}