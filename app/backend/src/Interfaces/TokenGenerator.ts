import IUser from './Users.interface';

export interface TokenGenerator {
  generate(user: IUser): string
}
