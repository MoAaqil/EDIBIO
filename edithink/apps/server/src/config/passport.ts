import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from '../models/User.js';
import { comparePassword } from '../utils/bcrypt.js';
import { config } from './env.js';

export function setupPassport(): void {
  // JWT Strategy
  passport.use(new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub).select('-passwordHash');
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  ));

  // Local Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user || !user.passwordHash) {
          return done(null, false, { message: 'Invalid credentials' });
        }
        const isValid = await comparePassword(password, user.passwordHash);
        if (!isValid) {
          return done(null, false, { message: 'Invalid credentials' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // Google OAuth Strategy
  if (config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: `${config.BACKEND_URL}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = await User.findOne({ email: profile.emails?.[0]?.value });
            if (user) {
              user.googleId = profile.id;
              await user.save();
            } else {
              user = await User.create({
                googleId: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.displayName,
                avatar: profile.photos?.[0]?.value,
                isVerified: true,
              });
            }
          }
          return done(null, user);
        } catch (err) {
          return done(err as Error);
        }
      }
    ));
  }

  // GitHub OAuth Strategy
  if (config.GITHUB_CLIENT_ID && config.GITHUB_CLIENT_SECRET) {
    passport.use(new GitHubStrategy(
      {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: `${config.BACKEND_URL}/api/auth/github/callback`,
        scope: ['user:email'],
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          let user = await User.findOne({ githubId: profile.id });
          if (!user) {
            const email = profile.emails?.[0]?.value;
            if (email) {
              user = await User.findOne({ email });
              if (user) {
                user.githubId = profile.id;
                await user.save();
              }
            }
            if (!user) {
              user = await User.create({
                githubId: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.displayName || profile.username,
                avatar: profile.photos?.[0]?.value,
                isVerified: true,
              });
            }
          }
          return done(null, user);
        } catch (err) {
          return done(err as Error);
        }
      }
    ));
  }

  passport.serializeUser((user: any, done) => done(null, user._id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id).select('-passwordHash');
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
