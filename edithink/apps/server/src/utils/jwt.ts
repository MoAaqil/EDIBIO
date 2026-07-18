import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import type { IUser } from '../models/User.js';

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function generateAccessToken(user: IUser): string {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN as any }
  );
}

export function generateRefreshToken(user: IUser): string {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role },
    config.JWT_REFRESH_SECRET,
    { expiresIn: config.JWT_REFRESH_EXPIRES_IN as any }
  );
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, config.JWT_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, config.JWT_REFRESH_SECRET) as TokenPayload;
}

export function generateMeetingToken(roomId: string, userId: string, role: string): string {
  return jwt.sign(
    { roomId, userId, role },
    config.JWT_SECRET,
    { expiresIn: '4h' }
  );
}
