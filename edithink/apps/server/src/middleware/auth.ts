import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AppError } from './errorHandler.js';
import type { IUser } from '../models/User.js';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
    if (err) return next(err);
    if (!user) return next(new AppError('Authentication required', 401));
    if (user.isBanned) return next(new AppError('Your account has been suspended', 403));
    req.user = user;
    next();
  })(req, res, next);
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as IUser;
    if (!user) return next(new AppError('Authentication required', 401));
    if (!roles.includes(user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }
    next();
  };
}

export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
    if (user) req.user = user;
    next();
  })(req, res, next);
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
