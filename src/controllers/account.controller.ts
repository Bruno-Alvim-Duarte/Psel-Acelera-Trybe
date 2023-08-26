import AccountService from "../services/account.service";
import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";


export default class AccountController {
  constructor(
    private accountService = new AccountService()
  ) {}
  
  async create(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.accountService.create(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.accountService.login(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}