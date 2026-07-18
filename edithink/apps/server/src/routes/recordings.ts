import { Router } from 'express';
import { Recording, Notification } from '../models/Recording.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

export const recordingRouter = Router();
recordingRouter.use(requireAuth);

recordingRouter.get('/', asyncHandler(async (req: any, res: any) => {
  const { limit = 20, page = 1 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  
  const [recordings, total] = await Promise.all([
    Recording.find({ 
      $or: [{ hostId: req.user._id }, { sharedWith: req.user._id }],
      status: 'ready',
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('meetingId', 'title'),
    Recording.countDocuments({ hostId: req.user._id }),
  ]);
  
  res.json({ success: true, recordings, pagination: { total, page: Number(page), limit: Number(limit) } });
}));

// ── Stub routes (MUST be before /:id to avoid being caught by the parameterized route) ──
recordingRouter.get('/analytics', asyncHandler(async (_req: any, res: any) => res.json({ success: true, analytics: {} })));
recordingRouter.get('/notifications', asyncHandler(async (_req: any, res: any) => res.json({ success: true, notifications: [] })));
recordingRouter.get('/admin', asyncHandler(async (_req: any, res: any) => res.json({ success: true })));
recordingRouter.get('/files', asyncHandler(async (_req: any, res: any) => res.json({ success: true, files: [] })));

recordingRouter.get('/:id', asyncHandler(async (req: any, res: any) => {
  const recording = await Recording.findById(req.params.id).populate('meetingId', 'title hostId');
  if (!recording) throw new AppError('Recording not found', 404);
  
  const isOwner = recording.hostId.toString() === req.user._id.toString();
  const isShared = recording.sharedWith.some((id: any) => id.toString() === req.user._id.toString());
  if (!isOwner && !isShared && !recording.isPublic) {
    throw new AppError('Access denied', 403);
  }
  
  recording.downloadCount++;
  await recording.save();
  
  res.json({ success: true, recording });
}));

recordingRouter.delete('/:id', asyncHandler(async (req: any, res: any) => {
  const recording = await Recording.findById(req.params.id);
  if (!recording) throw new AppError('Recording not found', 404);
  if (recording.hostId.toString() !== req.user._id.toString()) {
    throw new AppError('Only the owner can delete this recording', 403);
  }
  
  await recording.deleteOne();
  res.json({ success: true, message: 'Recording deleted' });
}));

export const notificationRouter = Router();
notificationRouter.use(requireAuth);

notificationRouter.get('/', asyncHandler(async (req: any, res: any) => {
  const notifications = await Notification.find({ 
    userId: req.user._id 
  }).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, notifications });
}));

// IMPORTANT: /read-all must be before /:id
notificationRouter.patch('/read-all', asyncHandler(async (req: any, res: any) => {
  await Notification.updateMany(
    { userId: req.user._id, isRead: false },
    { isRead: true }
  );
  res.json({ success: true });
}));

notificationRouter.patch('/:id/read', asyncHandler(async (req: any, res: any) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ success: true });
}));

export const fileRouter = Router();
fileRouter.use(requireAuth);
fileRouter.get('/', asyncHandler(async (_req: any, res: any) => res.json({ success: true, files: [] })));

export const analyticsRouter = Router();
analyticsRouter.use(requireAuth);
analyticsRouter.get('/meetings', asyncHandler(async (req: any, res: any) => {
  const { Meeting } = await import('../models/Meeting.js');
  const userId = req.user._id;
  const [total, active, ended] = await Promise.all([
    Meeting.countDocuments({ $or: [{ hostId: userId }, { participants: userId }] }),
    Meeting.countDocuments({ $or: [{ hostId: userId }, { participants: userId }], status: 'active' }),
    Meeting.countDocuments({ $or: [{ hostId: userId }, { participants: userId }], status: 'ended' }),
  ]);
  res.json({ success: true, analytics: { total, active, ended } });
}));

export const adminRouter = Router();
adminRouter.use(requireAuth);
adminRouter.get('/stats', asyncHandler(async (_req: any, res: any) => {
  const [users, meetings, orgs] = await Promise.all([
    (await import('../models/User.js')).User.countDocuments(),
    (await import('../models/Meeting.js')).Meeting.countDocuments(),
    (await import('../models/Organization.js')).Organization.countDocuments(),
  ]);
  res.json({ success: true, stats: { users, meetings, organizations: orgs } });
}));
