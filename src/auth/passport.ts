import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from '../db/User.model';
import jwt from 'jsonwebtoken';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        $or: [{ email: profile.emails?.[0].value }, { googleId: profile.id }],
      });

      if (!user) {
        user = await new User({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          avatar: profile.photos?.[0].value,
          googleId: profile.id,
          role: 'User', // Default role
        }).save();
      } else if (!user.googleId) {
        // user might have register with different auth method (basic/github)
        user.googleId = profile.id;
        await user.save();
      }
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: '1h',
        },
      );
      done(null, { user, token });
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    async (accessToken: any, _refreshToken: any, profile: any, done: any) => {
      let user = await User.findOne({
        $or: [{ email: profile.emails?.[0].value }, { githubId: profile.id }],
      });
      if (!user) {
        user = await new User({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          avatar: profile.photos?.[0].value,
          role: 'User', // Default role
        }).save();
      } else if (!user.githubId) {
        user.githubId = profile.id;
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: '1h',
        },
      );
      done(null, { user, token });
    },
  ),
);

export default passport;
