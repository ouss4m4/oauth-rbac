import { Router, Request, Response } from 'express';
import { postController } from '../../controllers/posts.controller';
import { authenticateJWT } from '../../middleware/auth';
import { AuthenticatedUser } from '../../typings/user';
import { authorizeRole } from '../../middleware/authorizeRole';

const postRouter = Router();

postRouter.get('/', async (req: Request, res: Response) => {
  const users = await postController.getPosts();
  res.json({
    success: true,
    data: users,
  });
});

postRouter.post(
  '/',
  authenticateJWT,
  authorizeRole(['Admin']),
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized', success: false });
      return;
    }
    const userId = (req.user as AuthenticatedUser).id;
    const { title = '', content = '' } = req.body;
    try {
      const result = await postController.createPost({
        title,
        userId,
        content,
      });
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error(error);
      let message = 'Error Creating A Post';
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        success: false,
        message,
      });
    }
  },
);

export { postRouter };
