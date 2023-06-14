import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService: UserService,
  ) { }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);

    if (token.status !== 'SUCCESSFUL') {
      return res.status(401).json(token.data);
    }

    return res.status(200).json(token.data);
  };
}
