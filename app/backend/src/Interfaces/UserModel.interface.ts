import IUser from './Users.interface';

export type IUserModel = {
  findUser(email: string): Promise<IUser | null>;
};
