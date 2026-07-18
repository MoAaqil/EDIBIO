import mongoose from 'mongoose';
import { Router } from 'express';
import { z } from 'zod';
import QRCode from 'qrcode';
import { Meeting } from '../models/Meeting.js';
import { Notification } from '../models/Recording.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { generateRoomId } from '../utils/helpers.js';
import { config } from '../config/env.js';
import { generateMeetingToken } from '../utils/jwt.js';

export const meetingRouter = Router();
meetingRouter.use(requireAuth);

const createMeetingSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  password: z.string().min(4).max(50).optional(),
  scheduledAt: z.string().datetime().optional(),
  duration: z.number().min(1).max(480).optional(),
  type: z.enum(['instant', 'scheduled', 'recurring']).default('instant'),
  timezone: z.string().default('UTC'),
  settings: z.object({
    waitingRoom: z.boolean().default(false),
    muteOnEntry: z.boolean().default(false),
    allowScreenShare: z.boolean().default(true),
    allowRecording: z.boolean().default(true),
    allowChat: z.boolean().default(true),
    allowReactions: z.boolean().default(true),
    maxParticipants: z.number().min(2).max(1000).default(100),
    requirePassword: z.boolean().default(false),
  }).optional(),
  recurringRule: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly']),
    interval: z.number().min(1).max(52),
    endDate: z.string().datetime().optional(),
    daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  }).optional(),
});

// GET /api/meetings - List user's meetings
meetingRouter.get('/', asyncHandler(async (req: any, res: any) => {
  const { status, limit = 20, page = 1 } = req.query;
  const userId = req.user._id;
  
  const filter: any = { 
    $or: [{ hostId: userId }, { participants: userId }] 
  };
  if (status) filter.status = status;
  
  const skip = (Number(page) - 1) * Number(limit);
  
  const [meetings, total] = await Promise.all([
    Meeting.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('hostId', 'name avatar email'),
    Meeting.countDocuments(filter),
  ]);
  
  res.json({ 
    success: true, 
    meetings, 
    pagination: { total, page: Number(page), limit: Number(limit) } 
  });
}));

// POST /api/meetings - Create meeting
meetingRouter.post('/', asyncHandler(async (req: any, res: any) => {
  const data = createMeetingSchema.parse(req.body);
  const roomId = generateRoomId();
  const inviteLink = `${config.FRONTEND_URL}/meet/${roomId}`;
  
  const meeting = await Meeting.create({
    ...data,
    roomId,
    hostId: req.user._id,
    inviteLink,
    status: data.type === 'instant' ? 'active' : 'scheduled',
  });

  // Create notification for scheduled meetings
  if (meeting.status === 'scheduled') {
    await Notification.create({
      userId: req.user._id,
      type: 'meeting_invite',
      title: 'Meeting Scheduled',
      body: `"${meeting.title}" has been scheduled for ${new Date(meeting.scheduledAt!).toLocaleString()}`,
      link: '/home/calendar',
      data: { meetingId: meeting._id, roomId: meeting.roomId }
    });
  }
  
  // Generate QR code
  const qrCode = await QRCode.toDataURL(inviteLink);
  
  res.status(201).json({
    success: true,
    meeting,
    inviteLink,
    qrCode,
    meetingToken: generateMeetingToken(roomId, req.user._id.toString(), 'host'),
  });
}));

// GET /api/meetings/upcoming
meetingRouter.get('/upcoming', asyncHandler(async (req: any, res: any) => {
  const userId = req.user._id;
  const now = new Date();
  
  const meetings = await Meeting.find({
    $or: [{ hostId: userId }, { participants: userId }],
    status: 'scheduled',
    scheduledAt: { $gte: now },
  })
    .sort({ scheduledAt: 1 })
    .limit(10)
    .populate('hostId', 'name avatar email');
  
  res.json({ success: true, meetings });
}));

// GET /api/meetings/:id
meetingRouter.get('/:id', asyncHandler(async (req: any, res: any) => {
  const isObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
  const query = isObjectId
    ? { $or: [{ _id: req.params.id }, { roomId: req.params.id }] }
    : { roomId: req.params.id };

  const meeting = await Meeting.findOne(query).populate('hostId', 'name avatar email');
  
  if (!meeting) throw new AppError('Meeting not found', 404);
  
  res.json({ success: true, meeting });
}));

// POST /api/meetings/:roomId/join
meetingRouter.post('/:roomId/join', asyncHandler(async (req: any, res: any) => {
  const { password } = req.body;
  const meeting = await Meeting.findOne({ roomId: req.params.roomId });
  
  if (!meeting) throw new AppError('Meeting not found', 404);
  if (meeting.status === 'ended') throw new AppError('Meeting has ended', 400);
  if (meeting.status === 'cancelled') throw new AppError('Meeting was cancelled', 400);
  
  if (meeting.settings.requirePassword && meeting.password) {
    if (!password || password !== meeting.password) {
      throw new AppError('Incorrect meeting password', 401);
    }
  }
  
  // Add participant (use .some() for proper ObjectId comparison)
  if (!meeting.participants.some((id: any) => id.toString() === req.user._id.toString())) {
    meeting.participants.push(req.user._id);
    await meeting.save();
  }
  
  const role = meeting.hostId.toString() === req.user._id.toString() ? 'host' : 'participant';
  const meetingToken = generateMeetingToken(meeting.roomId, req.user._id.toString(), role);
  
  res.json({ 
    success: true, 
    meeting,
    meetingToken,
    role,
    livekitUrl: config.LIVEKIT_URL,
  });
}));

// PATCH /api/meetings/:id
meetingRouter.patch('/:id', asyncHandler(async (req: any, res: any) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) throw new AppError('Meeting not found', 404);
  if (meeting.hostId.toString() !== req.user._id.toString()) {
    throw new AppError('Only the host can update this meeting', 403);
  }
  
  const updates = createMeetingSchema.partial().parse(req.body);
  Object.assign(meeting, updates);
  await meeting.save();
  
  res.json({ success: true, meeting });
}));

// DELETE /api/meetings/:id
meetingRouter.delete('/:id', asyncHandler(async (req: any, res: any) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) throw new AppError('Meeting not found', 404);
  if (meeting.hostId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Only the host can delete this meeting', 403);
  }
  
  meeting.status = 'cancelled';
  await meeting.save();
  
  res.json({ success: true, message: 'Meeting cancelled' });
}));

// POST /api/meetings/:id/end
meetingRouter.post('/:id/end', asyncHandler(async (req: any, res: any) => {
  const meeting = await Meeting.findOne({ 
    $or: [{ _id: req.params.id }, { roomId: req.params.id }] 
  });
  if (!meeting) throw new AppError('Meeting not found', 404);
  if (meeting.hostId.toString() !== req.user._id.toString()) {
    throw new AppError('Only the host can end this meeting', 403);
  }
  
  meeting.status = 'ended';
  meeting.endedAt = new Date();
  if (meeting.scheduledAt || meeting.createdAt) {
    const startTime = (meeting.scheduledAt || meeting.createdAt).getTime();
    meeting.duration = Math.round(
      (meeting.endedAt!.getTime() - startTime) / 60000
    );
  }
  await meeting.save();
  
  res.json({ success: true, message: 'Meeting ended' });
}));

// GET /api/meetings/:roomId/qr
meetingRouter.get('/:roomId/qr', asyncHandler(async (req: any, res: any) => {
  const meeting = await Meeting.findOne({ roomId: req.params.roomId });
  if (!meeting) throw new AppError('Meeting not found', 404);
  
  const qrCode = await QRCode.toDataURL(meeting.inviteLink, {
    width: 300,
    margin: 2,
    color: { dark: '#1D4ED8', light: '#FFFFFF' },
  });
  
  res.json({ success: true, qrCode, inviteLink: meeting.inviteLink });
}));
