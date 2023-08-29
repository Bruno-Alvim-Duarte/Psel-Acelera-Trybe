import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import TokenGenerator from '../utils/TokenGenerator';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class Middlewares {
  private static TokenGenerator = new TokenGenerator();

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
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'Name, email and password is required' });
    }

    if (CPF || CNPJ) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'CPF or CNPJ cannot be updated' });
    }

    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { CPF, CNPJ, password } = req.body;

    if (!CPF && !CNPJ) {
      return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: 'CPF or CNPJ is required' });
    }

    if (CPF?.length !== 11 && CNPJ?.length !== 14) {
      return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: 'CPF or CNPJ is invalid' });
    }

    if (!password) {
      return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: 'Password is required' });
    }

    next();
  }

  static JWTAuth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
    }

    try {
      const payload = Middlewares.TokenGenerator.verifyToken(authorization) as JwtPayload;

      req.body.id = payload.id;

      next();
    } catch (err) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token must be a valid token' });
    }
  }

  static validateCreateTransaction(req: Request, res: Response, next: NextFunction) {
    const { value, cashback, date } = req.body;
    if (!value || !cashback || !date) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'Value, cashback and date is required' });
    }
    if (typeof value !== 'number' || typeof cashback !== 'number') {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'Value and cashback must be a number' });
    }
    if (value <= 0 || cashback <= 0) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'Value and cashback must be greater than 0' });
    }
    if (typeof date !== 'string' || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'Date must be a string and must be in the format YYYY-MM-DD' });
    }
    next();
  }
}
