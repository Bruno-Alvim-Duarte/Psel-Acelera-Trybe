export default interface IAccount {
  id: number;
  name: string;
  password: string;
  status: boolean;
  CPF?: string;
  CNPJ?: string;
}