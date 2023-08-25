import { Request, Response, Router } from "express";
import AccountController from "../controllers/account.controller";
import Middlewares from "../middlewares";

const accountController = new AccountController();

const accountRouter = Router();

accountRouter.post('/', Middlewares.validateAccount, (req: Request, res: Response) => accountController.create(req, res));

export default accountRouter
