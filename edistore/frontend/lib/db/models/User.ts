import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  _id: { type: String, required: true }, // Mapped from Firebase Auth uid
  email: { type: String, required: true, index: true },
  name: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' },
  photoUrl: { type: String },
  addresses: { type: Array, default: [] },
  wishlist: { type: [String], default: [] }, // array of product IDs
  fcmToken: { type: String },
  sellerStatus: { type: String, enum: ['pending', 'approved', 'rejected'] }, // only applicable for roles applying to be sellers
  ediPoints: { type: Number, default: 0 },
  walletBalance: { type: Number, default: 0 },
}, { timestamps: true });

export const EdistoreUserData = mongoose.models.EdistoreUser || mongoose.model('EdistoreUser', UserSchema);
