import { Router, Request, Response } from 'express';
import { userController } from '../../controllers/users.controller';

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await userController.getUsers();
  res.json({
    success: true,
    data: users,
  });
});

userRouter.post('/', async (req: Request, res: Response) => {
  const { email, name, password, role = 'User' } = req.body;
  try {
    const result = await userController.createUser({
      name,
      email,
      role,
      password,
    });
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    let message = 'Error Creating A User';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({
      success: false,
      message,
    });
  }
});

export { userRouter };
