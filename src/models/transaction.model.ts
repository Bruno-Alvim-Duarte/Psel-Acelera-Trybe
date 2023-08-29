import ITransaction from '../types/Transaction';
import SequelizeTransaction from '../database/models/Transaction';

export default class TransactionModel {
  private sequelizeTransaction = SequelizeTransaction;

  async create(transaction: ITransaction) {
    return this.sequelizeTransaction.create(transaction);
  }

  async getAll(accountId: number) {
    return this.sequelizeTransaction.findAll({ where: { accountId } });
  }
}
