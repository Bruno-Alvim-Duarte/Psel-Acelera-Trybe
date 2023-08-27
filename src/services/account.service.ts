import { ServiceResponse } from '../types/ServiceResponse';
import AccountModel from '../models/account.model';
import IAccount from '../types/IAccount';
import Encrypter from '../utils/Encrypter';
import ILoginRequest from '../types/LoginRequest';
import TokenGenerator from '../utils/TokenGenerator';

export default class AccountService {
  private Encrypter = new Encrypter();
  private TokenGenerator = new TokenGenerator();

  constructor(
    private accountModel = new AccountModel(),
  ) {}

  async create(account: IAccount): Promise<ServiceResponse<IAccount>> {
    const { CPF, CNPJ } = account;
    let existsAccount;
    if (CPF) {
      existsAccount = await this.accountModel.findByCPF(CPF);
    } else if (CNPJ) {
      existsAccount = await this.accountModel.findByCNPJ(CNPJ);
    }

    if (existsAccount) {
      return { status: 'INVALID_DATA', data: { message: 'Account already exists' } };
    }

    const encryptedPassword = await this.Encrypter.encrypt(account.password);
    const createdAccount = await this.accountModel
      .create({ ...account, password: encryptedPassword });
    return { status: 'SUCCESSFUL', data: createdAccount };
  }

  async login(loginRequest: ILoginRequest): Promise<ServiceResponse<string>> {
    const { CPF, CNPJ, password } = loginRequest;
    let existsAccount;
    if (CPF) {
      existsAccount = await this.accountModel.findByCPF(CPF);
    } else if (CNPJ) {
      existsAccount = await this.accountModel.findByCNPJ(CNPJ);
    }

    if (!existsAccount) {
      return { status: 'INVALID_DATA', data: { message: 'Account does not exists' } };
    }

    const isPasswordCorrect = await this.Encrypter.compare(password, existsAccount.password);
    if (!isPasswordCorrect) {
      return { status: 'INVALID_DATA', data: { message: 'Password does not match' } };
    }

    const token = this.TokenGenerator.generateToken({ id: existsAccount.id });

    return { status: 'SUCCESSFUL', data: token };
  }
}
