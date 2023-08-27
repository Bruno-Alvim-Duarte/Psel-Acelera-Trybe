import { Request, Response, NextFunction } from 'express';

export default class Middlewares {
  static validateCreateAccount(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, CPF, CNPJ } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password is required' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email is invalid' });
    }

    if (!CPF && !CNPJ) {
      return res.status(400).json({ message: 'CPF or CNPJ is required' });
    }

    if (CPF?.length !== 11 && CNPJ?.length !== 14) {
      return res.status(400).json({ message: 'CPF or CNPJ is invalid' });
    }

    next();
  }

  static validateUpdateAccount(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, CPF, CNPJ } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password is required' });
    }

    if (CPF || CNPJ) {
      return res.status(400).json({ message: 'CPF or CNPJ cannot be updated' });
    }

    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { CPF, CNPJ, password } = req.body;

    if (!CPF && !CNPJ) {
      return res.status(400).json({ message: 'CPF or CNPJ is required' });
    }

    if (CPF?.length !== 11 && CNPJ?.length !== 14) {
      return res.status(400).json({ message: 'CPF or CNPJ is invalid' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    next();
  }
}
