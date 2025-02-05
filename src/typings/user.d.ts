import { ObjectId } from 'mongoose';
import { Request } from 'express';

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
}

export interface IPost {
  _id?: ObjectId;
  userId: any;
  title: string;
  content: string;
}
export interface IPostDTO {
  id: ObjectId;
  title: string;
  content: string;
  author: {
    id: ObjectId;
    name: string;
    email: string;
    avatar: string;
  };
}

export interface AuthenticatedUser {
  id: string;
  role: 'Admin' | 'Editor' | 'User'; // Adjust based on your roles
  iat: number;
  exp: number;
}
