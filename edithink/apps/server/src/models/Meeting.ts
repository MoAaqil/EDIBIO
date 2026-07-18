import mongoose, { Schema, Document } from 'mongoose';

export interface IMeeting extends Document {
  _id: mongoose.Types.ObjectId;
  roomId: string;
  title: string;
  description?: string;
  hostId: mongoose.Types.ObjectId;
  organizationId?: mongoose.Types.ObjectId;
  password?: string;
  status: 'scheduled' | 'active' | 'ended' | 'cancelled';
  type: 'instant' | 'scheduled' | 'recurring';
  scheduledAt?: Date;
  endedAt?: Date;
  duration?: number;
  settings: {
    waitingRoom: boolean;
    muteOnEntry: boolean;
    allowScreenShare: boolean;
    allowRecording: boolean;
    allowChat: boolean;
    allowReactions: boolean;
    maxParticipants: number;
    requirePassword: boolean;
  };
  recurringRule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
    daysOfWeek?: number[];
  };
  timezone: string;
  participants: mongoose.Types.ObjectId[];
  recordingUrl?: string;
  transcriptUrl?: string;
  summary?: string;
  aiSummary?: string;
  actionItems?: string[];
  inviteLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const meetingSchema = new Schema<IMeeting>(
  {
    roomId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: String,
    hostId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    password: String,
    status: {
      type: String,
      enum: ['scheduled', 'active', 'ended', 'cancelled'],
      default: 'scheduled',
      index: true,
    },
    type: { type: String, enum: ['instant', 'scheduled', 'recurring'], default: 'instant' },
    scheduledAt: Date,
    endedAt: Date,
    duration: Number,
    settings: {
      waitingRoom: { type: Boolean, default: false },
      muteOnEntry: { type: Boolean, default: false },
      allowScreenShare: { type: Boolean, default: true },
      allowRecording: { type: Boolean, default: true },
      allowChat: { type: Boolean, default: true },
      allowReactions: { type: Boolean, default: true },
      maxParticipants: { type: Number, default: 100 },
      requirePassword: { type: Boolean, default: false },
    },
    recurringRule: {
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly'] },
      interval: Number,
      endDate: Date,
      daysOfWeek: [Number],
    },
    timezone: { type: String, default: 'UTC' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    recordingUrl: String,
    transcriptUrl: String,
    summary: String,
    aiSummary: String,
    actionItems: [String],
    inviteLink: { type: String, required: true },
  },
  { timestamps: true }
);

meetingSchema.index({ hostId: 1, status: 1 });
meetingSchema.index({ organizationId: 1 });
meetingSchema.index({ scheduledAt: 1 });

export const Meeting = mongoose.model<IMeeting>('Meeting', meetingSchema);
