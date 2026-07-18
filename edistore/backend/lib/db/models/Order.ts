import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  _id: { type: String, required: true }, // generated unique ID
  orderNumber: { type: String, required: true, unique: true, index: true },
  customerId: { type: String, required: true, index: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  storeId: { type: String, required: true, ref: 'Store', index: true },
  storeName: { type: String, required: true },
  sellerId: { type: String, required: true, index: true },
  items: {
    type: [{
      productId: { type: String, required: true },
      name: { type: String, required: true },
      image: { type: String },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      mrp: { type: Number, required: true },
      gstRate: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      variantSku: { type: String },
      selectedAttributes: { type: Map, of: String }
    }],
    required: true
  },
  subtotal: { type: Number, required: true },
  shippingCharge: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  commissionRate: { type: Number, required: true },
  commissionAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['razorpay', 'cod'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  shippingAddress: {
    id: { type: String },
    label: { type: String },
    name: { type: String },
    phone: { type: String },
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'return_requested', 'returned'],
    default: 'placed'
  },
  tracking: {
    carrier: { type: String },
    awb: { type: String },
    trackingUrl: { type: String },
    lastUpdated: { type: String },
    events: {
      type: [{
        timestamp: { type: String, required: true },
        status: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true }
      }],
      default: []
    }
  },
  timeline: {
    type: [{
      status: { type: String, required: true },
      timestamp: { type: String, required: true },
      note: { type: String }
    }],
    default: []
  },
  notes: { type: String }
}, { timestamps: true });

// Compound indexes
OrderSchema.index({ customerId: 1, createdAt: -1 });
OrderSchema.index({ sellerId: 1, createdAt: -1 });

export const OrderData = mongoose.models.Order || mongoose.model('Order', OrderSchema);
