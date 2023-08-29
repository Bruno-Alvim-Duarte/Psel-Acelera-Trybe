import { Router } from 'express';
import accountRouter from './account.routes';
import transactionRouter from './transaction.routes';

const router = Router();

router.use('/account', accountRouter);
router.use('/transaction', transactionRouter);

export default router;
