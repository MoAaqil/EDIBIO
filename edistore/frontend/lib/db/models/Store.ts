import mongoose, { Schema } from 'mongoose';

const StoreSchema = new Schema({
  _id: { type: String, required: true }, // generated slug or uid
  sellerId: { type: String, required: true, ref: 'EdistoreUser', index: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  logo: { type: String },
  banner: { type: String },
  category: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  gstNumber: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  isPending: { type: Boolean, default: true },
  razorpayAccountId: { type: String },
  bankDetails: {
    bankName: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    ifsc: { type: String },
    upiId: { type: String }
  }
}, { timestamps: true });

export const StoreData = mongoose.models.Store || mongoose.model('Store', StoreSchema);
