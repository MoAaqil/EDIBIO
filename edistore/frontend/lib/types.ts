// ─────────────────────────────────────────────
//  EdiStore — Shared TypeScript Types
// ─────────────────────────────────────────────

// ── User ─────────────────────────────────────

export type UserRole = 'customer' | 'seller' | 'admin';

export interface Address {
  id: string;
  label: string; // e.g. 'Home', 'Work'
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface EdistoreUser {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  photoUrl?: string;
  role: UserRole;
  addresses: Address[];
  wishlist: string[]; // product IDs
  fcmToken?: string;
  createdAt: string;
}

// ── Store ─────────────────────────────────────

export interface Store {
  _id: string;
  sellerId: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  category: string;
  city: string;
  state: string;
  gstNumber?: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  totalSales: number;
  isVerified: boolean;
  isActive: boolean;
  isPending: boolean;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    ifsc: string;
    upiId: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ── Product ───────────────────────────────────

export interface Product {
  _id: string;
  storeId: string;
  sellerId: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  brand?: string;
  price: number;
  mrp: number;
  gstRate: number;
  hsnCode?: string;
  stockQty: number;
  unit: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  weight?: number;   // kg
  length?: number;   // cm
  breadth?: number;  // cm
  height?: number;   // cm
  createdAt: string;
  updatedAt: string;
}

// ── Order ─────────────────────────────────────

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  qty: number;
  price: number;
  mrp: number;
  gstRate: number;
  totalPrice: number;
}

export interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

export interface OrderTracking {
  carrier?: string;
  awb?: string;
  trackingUrl?: string;
  lastUpdated?: string;
  events: TrackingEvent[];
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'return_requested'
  | 'returned';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  storeId: string;
  storeName: string;
  sellerId: string;
  items: OrderItem[];
  subtotal: number;
  shippingCharge: number;
  discount: number;
  totalAmount: number;
  commissionRate: number;
  commissionAmount: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  shippingAddress: Address;
  status: OrderStatus;
  tracking: OrderTracking;
  timeline: OrderTimeline[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Cart ──────────────────────────────────────

export interface CartItem {
  productId: string;
  storeId: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  stockQty: number;
  qty: number;
  unit: string;
}

// ── Review ────────────────────────────────────

export interface Review {
  _id: string;
  productId: string;
  storeId: string;
  customerId: string;
  customerName: string;
  customerPhoto?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  body: string;
  images?: string[];
  sellerReply?: string;
  sellerReplyAt?: string;
  createdAt: string;
}

// ── Notification ──────────────────────────────

export type NotificationType =
  | 'order_placed'
  | 'order_confirmed'
  | 'order_packed'
  | 'order_shipped'
  | 'order_delivered'
  | 'payment_received'
  | 'new_review'
  | 'low_stock'
  | 'seller_approved'
  | 'seller_rejected';

export interface Notification {
  _id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

// ── Shipping Label ────────────────────────────

export interface ShippingLabel {
  orderNumber: string;
  sellerName: string;
  sellerAddress: string;
  sellerPhone: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  pincode: string;
  weight?: number;
  items: string[];
  qrData: string;
}

// ── Commission Rates ──────────────────────────

export const COMMISSION_RATES: Record<string, number> = {
  grocery: 0.04,
  electronics: 0.03,
  mobile: 0.025,
  fashion: 0.09,
  beauty: 0.07,
  home_kitchen: 0.07,
  books: 0.10,
  sports: 0.06,
  toys: 0.06,
  automotive: 0.05,
  health: 0.07,
  default: 0.08,
};

// ── Product Categories ────────────────────────

export interface ProductCategory {
  id: string;
  name: string;
  icon: string; // emoji
  description: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'grocery',      name: 'Grocery & Staples',     icon: '🛒', description: 'Fresh produce, packaged foods, and daily essentials' },
  { id: 'electronics',  name: 'Electronics',           icon: '💻', description: 'Laptops, TVs, home appliances, and accessories' },
  { id: 'mobile',       name: 'Mobiles & Tablets',     icon: '📱', description: 'Smartphones, tablets, and mobile accessories' },
  { id: 'fashion',      name: 'Fashion & Clothing',    icon: '👗', description: 'Apparel, footwear, and accessories for all ages' },
  { id: 'beauty',       name: 'Beauty & Personal Care',icon: '💄', description: 'Skincare, haircare, and wellness products' },
  { id: 'home_kitchen', name: 'Home & Kitchen',        icon: '🏠', description: 'Furniture, kitchenware, and home décor' },
  { id: 'books',        name: 'Books & Stationery',    icon: '📚', description: 'Books, notebooks, and office supplies' },
  { id: 'sports',       name: 'Sports & Fitness',      icon: '🏋️', description: 'Gym equipment, sportswear, and outdoor gear' },
  { id: 'toys',         name: 'Toys & Baby',           icon: '🧸', description: 'Toys, games, and baby care products' },
  { id: 'automotive',   name: 'Automotive',            icon: '🚗', description: 'Car accessories, tools, and spare parts' },
  { id: 'health',       name: 'Health & Wellness',     icon: '💊', description: 'Medicines, supplements, and medical devices' },
];

// ── Indian States & UTs ───────────────────────

export const INDIAN_STATES: string[] = [
  // 28 States
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  // 8 Union Territories
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];
