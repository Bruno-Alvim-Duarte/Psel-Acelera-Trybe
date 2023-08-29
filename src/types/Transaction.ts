export default interface ITransaction {
  id?: number;
  accountId: number;
  date: string ;
  value: number;
  cashback: number;
}
