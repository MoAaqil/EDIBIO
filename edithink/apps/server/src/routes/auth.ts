import { Router } from 'express';
import passport from 'passport';
import { z } from 'zod';
import { User } from '../models/User.js';
import { Organization } from '../models/Organization.js';
import { hashPassword } from '../utils/bcrypt.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { generateOTP, generateInviteCode } from '../utils/helpers.js';
import { sendOTPEmail, sendMagicLinkEmail, sendWelcomeEmail } from '../services/email/index.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { config } from '../config/env.js';

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  organizationName: z.string().min(2).max(100).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/auth/register
authRouter.post('/register', asyncHandler(async (req: any, res: any) => {
  const data = registerSchema.parse(req.body);
  
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) throw new AppError('Email already in use', 409);
  
  const passwordHash = await hashPassword(data.password);
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
  
  const user = await User.create({
    name: data.name,
    email: data.email.toLowerCase(),
    passwordHash,
    otpCode: otp,
    otpExpiry,
    isVerified: false,
  });
  
  // Create organization if requested
  if (data.organizationName) {
    const slug = data.organizationName.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50);
    const org = await Organization.create({
      name: data.organizationName,
      slug: `${slug}-${Math.random().toString(36).substring(2, 6)}`,
      ownerId: user._id,
      members: [{ userId: user._id, role: 'owner' }],
      inviteCode: generateInviteCode(),
    });
    user.organizationId = org._id;
    await user.save();
  }
  
  await sendOTPEmail(user.email, user.name, otp);
  
  res.status(201).json({
    success: true,
    message: 'Account created. Please verify your email.',
    userId: user._id,
  });
}));

// POST /api/auth/login
authRouter.post('/login', asyncHandler(async (req: any, res: any, next: any) => {
  const data = loginSchema.parse(req.body);
  
  passport.authenticate('local', { session: false }, async (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return next(new AppError(info?.message || 'Invalid credentials', 401));
    if (!user.isVerified) return next(new AppError('Please verify your email first', 403));
    if (user.isBanned) return next(new AppError('Account suspended', 403));
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 5) user.refreshTokens.shift(); // Keep last 5
    user.status = 'online';
    await user.save();
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.json({
      success: true,
      accessToken,
      user: user.toJSON(),
    });
  })(req, res, next);
}));

// POST /api/auth/verify-otp
authRouter.post('/verify-otp', asyncHandler(async (req: any, res: any) => {
  const { userId, otp } = z.object({
    userId: z.string(),
    otp: z.string().length(6),
  }).parse(req.body);
  
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);
  if (user.isVerified) throw new AppError('Already verified', 400);
  if (!user.otpCode || !user.otpExpiry) throw new AppError('No OTP found', 400);
  if (user.otpExpiry < new Date()) throw new AppError('OTP expired', 400);
  if (user.otpCode !== otp) throw new AppError('Invalid OTP', 400);
  
  user.isVerified = true;
  user.otpCode = undefined;
  user.otpExpiry = undefined;
  await user.save();
  
  await sendWelcomeEmail(user.email, user.name);
  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshTokens.push(refreshToken);
  await user.save();
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  
  res.json({ success: true, accessToken, user: user.toJSON() });
}));

// POST /api/auth/resend-otp
authRouter.post('/resend-otp', asyncHandler(async (req: any, res: any) => {
  const { userId } = z.object({ userId: z.string() }).parse(req.body);
  
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);
  if (user.isVerified) throw new AppError('Already verified', 400);
  
  const otp = generateOTP();
  user.otpCode = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  
  await sendOTPEmail(user.email, user.name, otp);
  
  res.json({ success: true, message: 'OTP sent' });
}));

// POST /api/auth/forgot-password
authRouter.post('/forgot-password', asyncHandler(async (req: any, res: any) => {
  const { email } = z.object({ email: z.string().email() }).parse(req.body);
  
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    // Don't reveal if email exists
    return res.json({ success: true, message: 'If that email exists, an OTP has been sent.' });
  }
  
  const otp = generateOTP();
  user.otpCode = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  
  await sendOTPEmail(user.email, user.name, otp, 'password-reset');
  
  res.json({ 
    success: true, 
    message: 'If that email exists, an OTP has been sent.',
    userId: user._id,
  });
}));

// POST /api/auth/reset-password
authRouter.post('/reset-password', asyncHandler(async (req: any, res: any) => {
  const { userId, otp, newPassword } = z.object({
    userId: z.string(),
    otp: z.string().length(6),
    newPassword: z.string().min(8),
  }).parse(req.body);
  
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);
  if (!user.otpCode || !user.otpExpiry) throw new AppError('No OTP found', 400);
  if (user.otpExpiry < new Date()) throw new AppError('OTP expired', 400);
  if (user.otpCode !== otp) throw new AppError('Invalid OTP', 400);
  
  user.passwordHash = await hashPassword(newPassword);
  user.otpCode = undefined;
  user.otpExpiry = undefined;
  user.refreshTokens = []; // Invalidate all sessions
  await user.save();
  
  res.json({ success: true, message: 'Password reset successfully' });
}));

// POST /api/auth/refresh
authRouter.post('/refresh', asyncHandler(async (req: any, res: any) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!token) throw new AppError('Refresh token required', 401);
  
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new AppError('Invalid or expired refresh token', 401);
  }
  
  const user = await User.findById(payload.sub);
  if (!user || !user.refreshTokens.includes(token)) {
    throw new AppError('Invalid refresh token', 401);
  }
  
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  
  // Rotate refresh token
  user.refreshTokens = user.refreshTokens.filter(t => t !== token);
  user.refreshTokens.push(newRefreshToken);
  await user.save();
  
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  
  res.json({ success: true, accessToken: newAccessToken });
}));

// POST /api/auth/logout
authRouter.post('/logout', requireAuth, asyncHandler(async (req: any, res: any) => {
  const token = req.cookies?.refreshToken;
  const user = req.user;
  
  if (token) {
    user.refreshTokens = user.refreshTokens.filter((t: string) => t !== token);
  }
  user.status = 'offline';
  await user.save();
  
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
}));

// POST /api/auth/magic-link
authRouter.post('/magic-link', asyncHandler(async (req: any, res: any) => {
  const { email } = z.object({ email: z.string().email() }).parse(req.body);
  
  let user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    user = await User.create({
      email: email.toLowerCase(),
      name: email.split('@')[0],
      isVerified: true,
    });
  }
  
  const token = generateAccessToken(user);
  const magicLink = `${config.FRONTEND_URL}/auth/magic?token=${token}`;
  
  await sendMagicLinkEmail(email, magicLink);
  
  res.json({ success: true, message: 'Magic link sent to your email' });
}));

// Google OAuth
authRouter.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

authRouter.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${config.FRONTEND_URL}/login?error=oauth_failed` }),
  asyncHandler(async (req: any, res: any) => {
    const user = req.user;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshTokens.push(refreshToken);
    await user.save();
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.redirect(`${config.FRONTEND_URL}/auth/callback?token=${accessToken}`);
  })
);

// GitHub OAuth
authRouter.get('/github',
  passport.authenticate('github', { scope: ['user:email'], session: false })
);

authRouter.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${config.FRONTEND_URL}/login?error=oauth_failed` }),
  asyncHandler(async (req: any, res: any) => {
    const user = req.user;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshTokens.push(refreshToken);
    await user.save();
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.redirect(`${config.FRONTEND_URL}/auth/callback?token=${accessToken}`);
  })
);

// GET /api/auth/me
authRouter.get('/me', requireAuth, asyncHandler(async (req: any, res: any) => {
  res.json({ success: true, user: req.user.toJSON() });
}));
