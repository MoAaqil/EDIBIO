import { Router } from 'express';
import { z } from 'zod';
import { Organization } from '../models/Organization.js';
import { User } from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { generateInviteCode, generateSlug } from '../utils/helpers.js';
import { config } from '../config/env.js';

export const organizationRouter = Router();
organizationRouter.use(requireAuth);

// POST /api/organizations
organizationRouter.post('/', asyncHandler(async (req: any, res: any) => {
  const { name, description } = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
  }).parse(req.body);
  
  const baseSlug = generateSlug(name);
  const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
  
  const org = await Organization.create({
    name,
    description,
    slug,
    ownerId: req.user._id,
    members: [{ userId: req.user._id, role: 'owner' }],
    inviteCode: generateInviteCode(),
  });
  
  await User.findByIdAndUpdate(req.user._id, { organizationId: org._id });
  
  res.status(201).json({ success: true, organization: org });
}));

// GET /api/organizations/:id
organizationRouter.get('/:id', asyncHandler(async (req: any, res: any) => {
  const org = await Organization.findById(req.params.id)
    .populate('members.userId', 'name email avatar status');
  
  if (!org) throw new AppError('Organization not found', 404);
  
  const isMember = org.members.some(m => m.userId._id.toString() === req.user._id.toString());
  if (!isMember && req.user.role !== 'admin') {
    throw new AppError('Access denied', 403);
  }
  
  res.json({ success: true, organization: org });
}));

// POST /api/organizations/join
organizationRouter.post('/join', asyncHandler(async (req: any, res: any) => {
  const { inviteCode } = z.object({ inviteCode: z.string() }).parse(req.body);
  
  const org = await Organization.findOne({ inviteCode });
  if (!org) throw new AppError('Invalid invite code', 404);
  if (!org.isActive) throw new AppError('Organization is inactive', 400);
  
  const isMember = org.members.some(m => m.userId.toString() === req.user._id.toString());
  if (isMember) throw new AppError('Already a member', 400);
  
  if (org.members.length >= org.settings.maxMembers) {
    throw new AppError('Organization has reached max member limit', 400);
  }
  
  org.members.push({ userId: req.user._id, role: 'member', joinedAt: new Date() });
  await org.save();
  
  await User.findByIdAndUpdate(req.user._id, { organizationId: org._id });
  
  res.json({ success: true, organization: org });
}));

// GET /api/organizations/:id/members
organizationRouter.get('/:id/members', asyncHandler(async (req: any, res: any) => {
  const org = await Organization.findById(req.params.id)
    .populate('members.userId', 'name email avatar status role lastSeen');
  
  if (!org) throw new AppError('Organization not found', 404);
  
  res.json({ success: true, members: org.members });
}));

// POST /api/organizations/:id/invite
organizationRouter.post('/:id/invite', asyncHandler(async (req: any, res: any) => {
  const org = await Organization.findById(req.params.id);
  if (!org) throw new AppError('Organization not found', 404);
  
  const adminMember = org.members.find(m => m.userId.toString() === req.user._id.toString());
  if (!adminMember || !['owner', 'admin'].includes(adminMember.role)) {
    throw new AppError('Only admins can invite members', 403);
  }
  
  // Rotate invite code
  org.inviteCode = generateInviteCode();
  await org.save();
  
  res.json({ 
    success: true, 
    inviteCode: org.inviteCode,
    inviteLink: `${config.FRONTEND_URL}/join?code=${org.inviteCode}`,
  });
}));
