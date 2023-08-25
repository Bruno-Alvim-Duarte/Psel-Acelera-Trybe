import AccountModel from '../models/account.model';
import IAccount from '../types/Account';

export default class AccountService {
  constructor(
    private accountModel = new AccountModel()
  ) {}
}