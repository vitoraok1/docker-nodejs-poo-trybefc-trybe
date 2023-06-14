import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/Users.interface';
import { TokenGenerator } from '../Interfaces/TokenGenerator';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;

  generate(user: IUser): string {
    const token = this.jwt.sign({ id: user.id }, JWT_SECRET);
    return token;
  }
}
