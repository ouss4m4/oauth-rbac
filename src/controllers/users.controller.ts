import { usersService } from '../services/users.service';
import { ICreateUserDTO, IUserDomain, IUserDTO } from '../typings/user';
import bcrypt from 'bcryptjs';
class UserController {
  async getUsers(): Promise<IUserDTO[]> {
    const users = await usersService.getUsers();
    return users.map((user) => this.toDTO(user));
  }

  async createUser({
    name = '',
    email = '',
    avatar = '',
    role = 'User',
    password,
  }: ICreateUserDTO): Promise<IUserDTO> {
    if (!email || !name || !password) {
      throw new Error('Email and Name required');
    }
    let salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const createdUser = await usersService.createUser({
      name,
      email,
      avatar,
      role,
      password,
    });

    return this.toDTO(createdUser);
  }

  private toDTO(user: IUserDomain): IUserDTO {
    return {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    };
  }
}

const userController = new UserController();
export { userController };
