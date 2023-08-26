import * as bcrypt from 'bcryptjs';
import IEncrypter from '../types/Encrypter';

export default class Encrypter implements IEncrypter {
  private salt = bcrypt.genSaltSync(10);

  encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}