import { Request } from 'express';
import { AuthenticatedUser } from './user';
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser;
  }
}
