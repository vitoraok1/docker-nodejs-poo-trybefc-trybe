import IUser from '../Interfaces/Users.interface';
import Users from '../database/models/Users';

export default class UserModel {
  private model = Users;

  async findUser(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    };
  }

  async findUserById(id: number): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    };
  }
}
