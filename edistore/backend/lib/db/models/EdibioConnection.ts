import mongoose, { Schema } from 'mongoose';

const EdibioConnectionSchema = new Schema({
  _id: { type: String, required: true },
  sellerId: { type: String, required: true, index: true },
  storeId: { type: String, required: true, index: true },
  edibioUserId: { type: String, required: true },
  edibioCompanyId: { type: String, required: true },
  apiKey: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastSyncAt: { type: String },
  productsSynced: { type: Number, default: 0 }
}, { timestamps: true });

export const EdibioConnectionData = mongoose.models.EdibioConnection || mongoose.model('EdibioConnection', EdibioConnectionSchema);
