export interface IUserDTO {
  name: string;
  email: string;
  avatar?: string;
  role: 'Admin' | 'Editor' | 'User';
}

export interface IUserDomain extends IUserDTO {
  googleId?: string | null;
  githubId?: string | null;
}

export interface ICreateUserDTO extends IUserDTO {
  password: string;
  confirmPassword: string;
}
