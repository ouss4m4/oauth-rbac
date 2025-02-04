import { Router } from 'express';
import passport from '../auth/passport';

const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user as any;
    res.json({ success: true, token: user.token, user: user.user });
  },
);

authRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
);

authRouter.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    const user = req.user as any;
    res.json({ success: true, token: user.token, user: user.user });
  },
);

export { authRouter };
