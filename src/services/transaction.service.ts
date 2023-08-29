import { ServiceResponse } from '../types/ServiceResponse';
import AccountModel from '../models/account.model';
import ITransaction from '../types/Transaction';
import TransactionModel from '../models/transaction.model';

export default class TransactionService {
  constructor(
    private accountModel = new AccountModel(),
    private transactionModel = new TransactionModel(),
  ) {

  }

  async create(transaction: ITransaction): Promise<ServiceResponse<ITransaction>> {
    const account = await this.accountModel.findById(transaction.accountId);
    if (!account || account.status === false) {
      return {
        status: 'NOT_FOUND',
        data: {
          message: 'Conta não encontrada',
        },
      };
    }
    const transacationCreated = await this.transactionModel.create(transaction);
    return {
      status: 'CREATED',
      data: transacationCreated,
    };
  }

  async getAll(accountId: number): Promise<ServiceResponse<ITransaction[]>> {
    const account = await this.accountModel.findById(accountId);
    if (!account || account.status === false) {
      return {
        status: 'NOT_FOUND',
        data: {
          message: 'Conta não encontrada',
        },
      };
    }
    const transactions = await this.transactionModel.getAll(accountId);
    return {
      status: 'SUCCESSFUL',
      data: transactions,
    };
  }
}
