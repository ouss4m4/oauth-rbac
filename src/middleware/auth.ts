import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from '../typings/user';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as AuthenticatedUser;
    req.user = decoded;
    console.log();
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid token' });
    return;
  }
};
