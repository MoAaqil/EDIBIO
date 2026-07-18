import { Router } from 'express';
import { z } from 'zod';
import { User } from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';

export const userRouter = Router();
userRouter.use(requireAuth);

// GET /api/users/me
userRouter.get('/me', asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.user._id).populate('organizationId', 'name slug logo plan');
  res.json({ success: true, user: user?.toJSON() });
}));

// PATCH /api/users/me
userRouter.patch('/me', asyncHandler(async (req: any, res: any) => {
  const updateSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    bio: z.string().max(500).optional(),
    avatar: z.string().url().optional(),
    language: z.string().optional(),
    timezone: z.string().optional(),
    theme: z.enum(['light', 'dark', 'system']).optional(),
    notificationsEnabled: z.boolean().optional(),
    status: z.enum(['online', 'away', 'busy', 'offline']).optional(),
    meetingPreferences: z.object({
      defaultCamera: z.boolean().optional(),
      defaultMic: z.boolean().optional(),
      blurBackground: z.boolean().optional(),
      virtualBackground: z.string().optional(),
      noiseSupression: z.boolean().optional(),
    }).optional(),
  });
  
  const updates = updateSchema.parse(req.body);
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
  
  res.json({ success: true, user: user?.toJSON() });
}));

// POST /api/users/me/change-password
userRouter.post('/me/change-password', asyncHandler(async (req: any, res: any) => {
  const { currentPassword, newPassword } = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(8),
  }).parse(req.body);
  
  const user = await User.findById(req.user._id);
  if (!user || !user.passwordHash) throw new AppError('No password set', 400);
  
  const isValid = await comparePassword(currentPassword, user.passwordHash);
  if (!isValid) throw new AppError('Current password is incorrect', 401);
  
  user.passwordHash = await hashPassword(newPassword);
  user.refreshTokens = []; // Invalidate all sessions
  await user.save();
  
  res.json({ success: true, message: 'Password changed successfully' });
}));

// GET /api/users/search
userRouter.get('/search', asyncHandler(async (req: any, res: any) => {
  const { q, limit = 10 } = req.query;
  if (!q || String(q).length < 2) {
    return res.json({ success: true, users: [] });
  }
  
  const users = await User.find({
    $or: [
      { name: { $regex: String(q), $options: 'i' } },
      { email: { $regex: String(q), $options: 'i' } },
    ],
    isBanned: false,
  })
    .select('name email avatar status')
    .limit(Number(limit));
  
  res.json({ success: true, users });
}));

// GET /api/users/:id
userRouter.get('/:id', asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.params.id)
    .select('name email avatar bio status lastSeen role');
  
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, user });
}));
