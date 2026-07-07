import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new Schema({
  _id: { type: String, required: true }, // generated unique ID
  userId: { type: String, required: true, index: true }, // Target user (customer, seller, or admin)
  type: {
    type: String,
    enum: [
      'order_placed',
      'order_confirmed',
      'order_packed',
      'order_shipped',
      'order_delivered',
      'payment_received',
      'new_review',
      'low_stock',
      'seller_approved',
      'seller_rejected'
    ],
    required: true
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  data: { type: Object }, // extra deep-linking data
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export const NotificationData = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
