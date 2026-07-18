import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  ownerId: mongoose.Types.ObjectId;
  plan: 'free' | 'pro' | 'enterprise';
  members: Array<{
    userId: mongoose.Types.ObjectId;
    role: 'owner' | 'admin' | 'member' | 'guest';
    joinedAt: Date;
  }>;
  settings: {
    allowGuestJoin: boolean;
    requireApproval: boolean;
    maxMembers: number;
    ssoEnabled: boolean;
    domain?: string;
  };
  inviteCode: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    logo: String,
    description: String,
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: {
          type: String,
          enum: ['owner', 'admin', 'member', 'guest'],
          default: 'member',
        },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    settings: {
      allowGuestJoin: { type: Boolean, default: true },
      requireApproval: { type: Boolean, default: false },
      maxMembers: { type: Number, default: 50 },
      ssoEnabled: { type: Boolean, default: false },
      domain: String,
    },
    inviteCode: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

organizationSchema.index({ ownerId: 1 });
organizationSchema.index({ 'members.userId': 1 });

export const Organization = mongoose.model<IOrganization>('Organization', organizationSchema);
