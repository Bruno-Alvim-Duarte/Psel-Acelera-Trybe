export default interface ITokenGenerator {
  generateToken(payload: any): string;
  verifyToken(token: string): any;
}