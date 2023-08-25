import { ServiceResponse } from '../types/ServiceResponse';
import AccountModel from '../models/account.model';
import IAccount from '../types/IAccount';

export default class AccountService {
  constructor(
    private accountModel = new AccountModel()
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
      return { status: 'INVALID_DATA', data: {message: 'Account already exists'}  };
    }
      const createdAccount = await this.accountModel.create(account);
      return { status: 'SUCCESSFUL', data: createdAccount };
  }
}