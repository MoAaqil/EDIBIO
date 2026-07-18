import mongoose, { Schema, Document } from 'mongoose';

export interface IRecording extends Document {
  _id: mongoose.Types.ObjectId;
  meetingId: mongoose.Types.ObjectId;
  roomId: string;
  hostId: mongoose.Types.ObjectId;
  title: string;
  url: string;
  thumbnailUrl?: string;
  duration: number;
  fileSize: number;
  mimeType: string;
  status: 'processing' | 'ready' | 'failed';
  storageType: 'local' | 'cloud';
  transcriptUrl?: string;
  transcriptText?: string;
  aiSummary?: string;
  actionItems?: string[];
  highlights?: Array<{
    timestamp: number;
    description: string;
    duration: number;
  }>;
  bookmarks?: Array<{
    timestamp: number;
    label: string;
    userId: mongoose.Types.ObjectId;
  }>;
  isPublic: boolean;
  sharedWith: mongoose.Types.ObjectId[];
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const recordingSchema = new Schema<IRecording>(
  {
    meetingId: { type: Schema.Types.ObjectId, ref: 'Meeting', required: true, index: true },
    roomId: { type: String, required: true },
    hostId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: String,
    duration: { type: Number, default: 0 },
    fileSize: { type: Number, default: 0 },
    mimeType: { type: String, default: 'video/webm' },
    status: {
      type: String,
      enum: ['processing', 'ready', 'failed'],
      default: 'processing',
    },
    storageType: { type: String, enum: ['local', 'cloud'], default: 'cloud' },
    transcriptUrl: String,
    transcriptText: String,
    aiSummary: String,
    actionItems: [String],
    highlights: [
      {
        timestamp: Number,
        description: String,
        duration: Number,
      },
    ],
    bookmarks: [
      {
        timestamp: Number,
        label: String,
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    isPublic: { type: Boolean, default: false },
    sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downloadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Recording = mongoose.model<IRecording>('Recording', recordingSchema);

// Notification Model
export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: 'meeting_start' | 'meeting_invite' | 'meeting_reminder' | 'recording_ready' | 
        'mention' | 'chat_message' | 'system' | 'join_request';
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['meeting_start', 'meeting_invite', 'meeting_reminder', 'recording_ready', 
             'mention', 'chat_message', 'system', 'join_request'],
      required: true,
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    data: Schema.Types.Mixed,
    isRead: { type: Boolean, default: false },
    link: String,
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
