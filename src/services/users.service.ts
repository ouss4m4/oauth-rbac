import { IUserDocument, User } from '../db/User.model';
import { IUserDomain } from '../typings/user';

class UserService {
  async getUsers(): Promise<IUserDomain[]> {
    const users = await User.find({});
    return users.map(this.toDomain);
  }

  async createUser(user: IUserDomain): Promise<IUserDomain> {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return this.toDomain(savedUser);
  }

  private toDomain(user: IUserDocument): IUserDomain {
    return {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  }
}

const usersService = new UserService();
export { usersService };
