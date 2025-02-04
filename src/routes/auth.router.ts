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
    const token = user.token;

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.redirect('/profile');
  },
);

authRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['upser:email'] }),
);

authRouter.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    const user = req.user as any;
    const token = user.token;

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.redirect('/profile');
  },
);

export { authRouter };
