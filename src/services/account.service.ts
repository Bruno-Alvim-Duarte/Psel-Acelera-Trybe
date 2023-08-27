import { ServiceResponse } from '../types/ServiceResponse';
import AccountModel from '../models/account.model';
import IAccount from '../types/IAccount';
import Encrypter from '../utils/Encrypter';
import ILoginRequest from '../types/LoginRequest';
import TokenGenerator from '../utils/TokenGenerator';
import IUpdateRequest from '../types/UpdateRequest';

const NOT_FOUND_MESSAGE = 'Account does not exists';

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
      return { status: 'INVALID_DATA', data: { message: NOT_FOUND_MESSAGE } };
    }

    const encryptedPassword = await this.Encrypter.encrypt(account.password);
    const createdAccount = await this.accountModel
      .create({ ...account, password: encryptedPassword });
    return { status: 'CREATED', data: createdAccount };
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
      return { status: 'INVALID_DATA', data: { message: NOT_FOUND_MESSAGE } };
    }

    const isPasswordCorrect = await this.Encrypter.compare(password, existsAccount.password);
    if (!isPasswordCorrect) {
      return { status: 'INVALID_DATA', data: { message: 'Password does not match' } };
    }

    const token = this.TokenGenerator.generateToken({ id: existsAccount.id });

    return { status: 'SUCCESSFUL', data: token };
  }

  async update(updateRequest: IUpdateRequest): Promise<ServiceResponse<IAccount>> {
    const { id, name, email, password, status } = updateRequest;

    const encryptedPassword = await this.Encrypter.encrypt(password);
    const didUpdate = await this.accountModel
      .update(+id, { name, email, password: encryptedPassword, status });
    if (didUpdate[0] === 0) {
      return { status: 'INVALID_DATA', data: { message: NOT_FOUND_MESSAGE } };
    }
    const updatedAccount = await this.accountModel.findById(+id) as IAccount;
    return { status: 'SUCCESSFUL', data: updatedAccount };
  }

  async delete(id: number): Promise<ServiceResponse<null>> {
    const deletedAccount = await this.accountModel.delete(id);
    if (deletedAccount[0] === 0) {
      return { status: 'INVALID_DATA', data: { message: NOT_FOUND_MESSAGE } };
    }
    return { status: 'DELETED', data: null };
  }
}
