import mongoose, { Schema } from 'mongoose';

const CartSchema = new Schema({
  _id: { type: String, required: true }, // userId (Firebase uid)
  items: {
    type: [{
      productId: { type: String, required: true },
      storeId: { type: String, required: true },
      name: { type: String, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      mrp: { type: Number, required: true },
      stockQty: { type: Number, required: true },
      qty: { type: Number, required: true },
      unit: { type: String, default: 'units' }
    }],
    default: []
  }
}, { timestamps: true });

export const CartData = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
