import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  _id: { type: String, required: true }, // generated unique ID
  productId: { type: String, required: true, index: true },
  storeId: { type: String, required: true, index: true },
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhoto: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String },
  body: { type: String, required: true },
  images: { type: [String], default: [] },
  sellerReply: { type: String },
  sellerReplyAt: { type: String },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

export const ReviewData = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
