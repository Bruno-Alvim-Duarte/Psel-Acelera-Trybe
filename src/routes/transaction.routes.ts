import { Request, Response, Router } from 'express';
import Middlewares from '../middlewares';
import TransactionController from '../controllers/transaction.controller';

const transactionController = new TransactionController();

const transactionRouter = Router();

transactionRouter.post(
  '/',
  Middlewares.JWTAuth,
  Middlewares.validateCreateTransaction,
  (req: Request, res: Response) => transactionController.create(req, res),
);

export default transactionRouter;
