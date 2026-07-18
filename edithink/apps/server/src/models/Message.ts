import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  roomId: string;
  userId?: mongoose.Types.ObjectId;
  senderName?: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'file' | 'voice' | 'gif' | 'code' | 'system';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  threadId?: mongoose.Types.ObjectId;
  replyCount: number;
  reactions: Array<{
    emoji: string;
    users: mongoose.Types.ObjectId[];
  }>;
  mentions: mongoose.Types.ObjectId[];
  isPinned: boolean;
  isEdited: boolean;
  editedAt?: Date;
  deletedAt?: Date;
  isDeleted: boolean;
  readBy: mongoose.Types.ObjectId[];
  twitchStyle: boolean; // Auto-fade after duration
  fadeAfterSeconds: number;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    roomId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    senderName: { type: String },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'image', 'video', 'file', 'voice', 'gif', 'code', 'system'],
      default: 'text',
    },
    fileUrl: String,
    fileName: String,
    fileSize: Number,
    mimeType: String,
    threadId: { type: Schema.Types.ObjectId, ref: 'Message' },
    replyCount: { type: Number, default: 0 },
    reactions: [
      {
        emoji: String,
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      },
    ],
    mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isPinned: { type: Boolean, default: false },
    isEdited: { type: Boolean, default: false },
    editedAt: Date,
    deletedAt: Date,
    isDeleted: { type: Boolean, default: false },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    twitchStyle: { type: Boolean, default: true },
    fadeAfterSeconds: { type: Number, default: 30 },
  },
  { timestamps: true }
);

messageSchema.index({ roomId: 1, createdAt: -1 });
messageSchema.index({ threadId: 1 });
messageSchema.index({ userId: 1 });

export const Message = mongoose.model<IMessage>('Message', messageSchema);
