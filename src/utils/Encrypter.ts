import * as bcrypt from 'bcryptjs';
import IEncrypter from '../types/Encrypter';

export default class Encrypter implements IEncrypter {
  private salt = bcrypt.genSaltSync(10);
  private encrypter = bcrypt;

  encrypt(value: string): Promise<string> {
    return this.encrypter.hash(value, this.salt);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return this.encrypter.compare(value, hash);
  }
}
