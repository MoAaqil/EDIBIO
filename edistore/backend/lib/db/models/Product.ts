import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  _id: { type: String, required: true }, // generated unique ID
  storeId: { type: String, required: true, ref: 'Store', index: true },
  sellerId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  category: { type: String, required: true, index: true },
  brand: { type: String },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  gstRate: { type: Number, default: 0 },
  hsnCode: { type: String },
  stockQty: { type: Number, default: 0 },
  unit: { type: String, default: 'units' },
  tags: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  weight: { type: Number }, // in kg
  length: { type: Number }, // in cm
  breadth: { type: Number }, // in cm
  height: { type: Number }, // in cm
  variants: {
    type: [{
      sku: { type: String, required: true },
      attributes: { type: Map, of: String }, // e.g. { size: "XL", color: "Black" }
      price: { type: Number, required: true },
      mrp: { type: Number, required: true },
      stockQty: { type: Number, default: 0 }
    }],
    default: []
  },
}, { timestamps: true });

// Compound indexes
ProductSchema.index({ storeId: 1, isActive: 1 });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export const ProductData = mongoose.models.Product || mongoose.model('Product', ProductSchema);
