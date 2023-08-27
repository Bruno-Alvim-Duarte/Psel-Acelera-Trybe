import { JwtPayload } from 'jsonwebtoken';

export default interface ITokenGenerator {
  generateToken(payload: { id: number }): string;
  verifyToken(token: string): JwtPayload | string;
}
