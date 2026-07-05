import mongoose, { Schema } from 'mongoose';

// ── STORE SCHEMA ──────────────────────────────────────────────────────
const StoreSchema = new Schema({
  _id: { type: String, required: true },
  sellerId: { type: String, required: true, index: true },
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
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  isPending: { type: Boolean, default: false },
  bankDetails: {
    bankName: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    ifsc: { type: String },
    upiId: { type: String }
  }
}, { timestamps: true });

// ── PRODUCT SCHEMA ────────────────────────────────────────────────────
const ProductSchema = new Schema({
  _id: { type: String, required: true },
  storeId: { type: String, required: true, index: true },
  sellerId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  image: { type: String },
  category: { type: String, required: true },
  brand: { type: String, default: 'Generics' },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  gstRate: { type: Number, default: 0 },
  stockQty: { type: Number, default: 0 },
  unit: { type: String, default: 'units' },
  tags: { type: [String], default: [] },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  weight: { type: Number },
  length: { type: Number },
  breadth: { type: Number },
  height: { type: Number },
}, { timestamps: true });

// ── ORDER SCHEMA ──────────────────────────────────────────────────────
const OrderSchema = new Schema({
  _id: { type: String, required: true },
  orderNumber: { type: String, required: true },
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  storeId: { type: String, required: true, index: true },
  storeName: { type: String },
  sellerId: { type: String, required: true, index: true },
  items: { type: Array, default: [] },
  subtotal: { type: Number, default: 0 },
  shippingCharge: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  commissionRate: { type: Number, default: 0.05 },
  commissionAmount: { type: Number, default: 0 },
  paymentMethod: { type: String, default: 'cod' },
  paymentStatus: { type: String, default: 'pending' },
  shippingAddress: { type: Object },
  status: { type: String, default: 'placed' },
  tracking: {
    carrier: { type: String },
    awb: { type: String },
    trackingUrl: { type: String },
    events: { type: Array, default: [] }
  },
  timeline: { type: Array, default: [] }
}, { timestamps: true });

// ── CONNECTION SCHEMA ─────────────────────────────────────────────────
const EdibioConnectionSchema = new Schema({
  _id: { type: String, required: true },
  sellerId: { type: String, required: true, index: true },
  storeId: { type: String, required: true, index: true },
  edibioUserId: { type: String, required: true },
  edibioCompanyId: { type: String, required: true, unique: true },
  apiKey: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastSyncAt: { type: String },
  productsSynced: { type: Number, default: 0 }
}, { timestamps: true });

// Clear Mongoose cache in development
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.EdistoreStore;
  delete mongoose.models.EdistoreProduct;
  delete mongoose.models.EdistoreOrder;
  delete mongoose.models.EdibioConnection;
}

const edistoreDb = mongoose.connection.useDb('edistore', { useCache: true });

export const EdistoreStoreData = edistoreDb.models.EdistoreStore || edistoreDb.model('EdistoreStore', StoreSchema, 'stores');
export const EdistoreProductData = edistoreDb.models.EdistoreProduct || edistoreDb.model('EdistoreProduct', ProductSchema, 'products');
export const EdistoreOrderData = edistoreDb.models.EdistoreOrder || edistoreDb.model('EdistoreOrder', OrderSchema, 'orders');
export const EdibioConnectionData = edistoreDb.models.EdibioConnection || edistoreDb.model('EdibioConnection', EdibioConnectionSchema, 'edibioconnections');
