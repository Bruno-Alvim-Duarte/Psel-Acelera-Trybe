import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TransactionService from '../services/transaction.service';

export default class TransactionController {
  constructor(
    private transactionService = new TransactionService(),
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { id, value, cashback, date } = req.body;
      const serviceResponse = await this
        .transactionService.create({ accountId: id, value, cashback, date });
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const serviceResponse = await this.transactionService.getAll(+id);
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}
