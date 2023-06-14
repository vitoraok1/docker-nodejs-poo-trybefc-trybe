import { IUserModel } from '../Interfaces/UserModel.interface';
import { Encrypter } from '../Interfaces/Encrypter';
import { TokenGenerator } from '../Interfaces/TokenGenerator';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator,
  ) { }

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findUser(email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const validPassword = await this.encrypter.compare(password, user.password);

    if (!validPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = await this.tokenGenerator.generate(user);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
