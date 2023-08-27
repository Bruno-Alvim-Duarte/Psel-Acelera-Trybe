import { Request, Response, Router } from 'express';
import AccountController from '../controllers/account.controller';
import Middlewares from '../middlewares';

const accountController = new AccountController();

const accountRouter = Router();

accountRouter.post(
  '/',
  Middlewares.validateCreateAccount,

  (req: Request, res: Response) => accountController.create(req, res),
);
accountRouter.post(
  '/login',
  Middlewares.validateLogin,

  (req: Request, res: Response) => accountController.login(req, res),
);
export default accountRouter;
