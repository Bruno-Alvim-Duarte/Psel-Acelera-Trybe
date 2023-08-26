import * as jwt from 'jsonwebtoken';
import ITokenGenerator from '../types/TokenGenerator';

export default class TokenGenerator implements ITokenGenerator {
  private generator = jwt;

  generateToken(payload: any): string {
    return this.generator.sign(payload, process.env.JWT_SECRET as string || 'jwt_secret', { expiresIn: '1d', algorithm: 'HS256' });
  }

  verifyToken(token: string): any {
    return this.generator.verify(token, process.env.JWT_SECRET as string || 'jwt_secret');
  }
}