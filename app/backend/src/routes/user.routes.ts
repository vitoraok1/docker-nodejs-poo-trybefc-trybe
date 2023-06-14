import { Router, Request, Response } from 'express';

import UserService from '../services/UserService';
import UsersController from '../controllers/UserController';
import UserModel from '../models/UserModel';

import LoginValidations from '../middlewares/LoginValidations';
import AuthValidations from '../middlewares/AuthValidation';
import TokenGeneratorJwt from '../services/TokenGeneratorJwt';
import EncrypterBcryptService from '../services/EncrypterBcryptService';

const encrypter = new EncrypterBcryptService();
const tokenGenerator = new TokenGeneratorJwt();

const userModel = new UserModel();
const userService = new UserService(userModel, encrypter, tokenGenerator);
const userController = new UsersController(userService);

const router = Router();

router.post(
  '/login',
  LoginValidations,
  (req: Request, res: Response) =>
    userController.login(req, res),
);

router.get('/login/role', AuthValidations, async (_req: Request, res: Response) => {
  const userLogin = await userModel.findUserById(res.locals.user.id);
  res.status(200).json({ role: userLogin?.role });
});

export default router;
