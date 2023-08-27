import IAccount from '../types/IAccount';
import SequelizeAccount from '../database/models/Account';

export default class AccountModel {
  private sequelizeAccount = SequelizeAccount;

  async create(account: Omit<IAccount, 'id'>) {
    return this.sequelizeAccount.create({ ...account, status: true });
  }

  async findByCPF(CPF: string) {
    return this.sequelizeAccount.findOne({ where: { CPF } });
  }

  async findByCNPJ(CNPJ: string) {
    return this.sequelizeAccount.findOne({ where: { CNPJ } });
  }
}
