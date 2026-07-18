import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash?: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'admin' | 'superadmin';
  status: 'online' | 'away' | 'busy' | 'offline';
  isVerified: boolean;
  isBanned: boolean;
  googleId?: string;
  githubId?: string;
  organizationId?: mongoose.Types.ObjectId;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  otpCode?: string;
  otpExpiry?: Date;
  refreshTokens: string[];
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  meetingPreferences: {
    defaultCamera: boolean;
    defaultMic: boolean;
    blurBackground: boolean;
    virtualBackground?: string;
    noiseSupression: boolean;
  };
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true,
      index: true
    },
    passwordHash: String,
    name: { type: String, required: true, trim: true },
    avatar: String,
    bio: String,
    role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
    status: { 
      type: String, 
      enum: ['online', 'away', 'busy', 'offline'], 
      default: 'offline' 
    },
    isVerified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    googleId: { type: String, sparse: true, unique: true },
    githubId: { type: String, sparse: true, unique: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    twoFactorSecret: String,
    twoFactorEnabled: { type: Boolean, default: false },
    otpCode: String,
    otpExpiry: Date,
    refreshTokens: [String],
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    notificationsEnabled: { type: Boolean, default: true },
    meetingPreferences: {
      defaultCamera: { type: Boolean, default: true },
      defaultMic: { type: Boolean, default: true },
      blurBackground: { type: Boolean, default: false },
      virtualBackground: String,
      noiseSupression: { type: Boolean, default: true },
    },
    lastSeen: Date,
  },
  { timestamps: true }
);

userSchema.index({ organizationId: 1 });
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.otpCode;
  delete obj.twoFactorSecret;
  delete obj.refreshTokens;
  return obj;
};

export const User = mongoose.model<IUser>('User', userSchema);
