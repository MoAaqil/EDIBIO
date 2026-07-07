// ============================================================
// LoadSwift — MongoDB Models (separate ls_ collections)
// Uses same MongoDB Atlas connection via lib/mongodb.ts
// ============================================================

import mongoose, { Schema, model, models } from 'mongoose';

// ── Load / Shipment ─────────────────────────────────────────
const LoadSchema = new Schema({
  loadNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ['upcoming', 'in_transit', 'delivered', 'delayed', 'cancelled'], default: 'upcoming' },

  customerId: String,
  customerName: { type: String, required: true },
  customerCompany: String,
  customerPhone: String,
  customerEmail: String,

  pickupAddress: { type: String, required: true },
  pickupCity: { type: String, required: true },
  pickupLat: Number,
  pickupLng: Number,
  pickupDate: { type: String, required: true },

  deliveryAddress: { type: String, required: true },
  deliveryCity: { type: String, required: true },
  deliveryLat: Number,
  deliveryLng: Number,
  deliveryDate: { type: String, required: true },

  commodity: { type: String, required: true },
  weightKg: { type: Number, required: true },
  volumeCbm: Number,
  specialInstructions: String,

  driverId: String,
  driverName: String,
  vehicleId: String,
  vehicleNumber: String,

  baseRate: { type: Number, default: 0 },
  fuelCost: { type: Number, default: 0 },
  fuelRebate: { type: Number, default: 0 },
  tollCost: { type: Number, default: 0 },
  taxes: { type: Number, default: 0 },
  commission: { type: Number, default: 0 },
  netPayout: { type: Number, default: 0 },
  grossRevenue: { type: Number, default: 0 },
  profitMargin: { type: Number, default: 0 },

  distanceKm: Number,
  etaHours: Number,
  currentEta: String,

  currentLat: Number,
  currentLng: Number,
  lastPing: String,

  companyId: { type: String, required: true, index: true },
  notes: String,
}, { timestamps: true, collection: 'ls_loads' });

// ── Load Event / Timeline ───────────────────────────────────
const LoadEventSchema = new Schema({
  loadId: { type: String, required: true, index: true },
  type: { type: String, required: true },
  timestamp: { type: String, required: true },
  lat: Number,
  lng: Number,
  locationName: String,
  driverId: String,
  driverName: String,
  notes: String,
  photos: [String],
  createdBy: String,
}, { timestamps: true, collection: 'ls_events' });

// ── GPS Tracking ────────────────────────────────────────────
const TrackingSchema = new Schema({
  loadId: { type: String, required: true, index: true },
  driverId: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  speed: { type: Number, default: 0 },
  heading: { type: Number, default: 0 },
  battery: Number,
  network: String,
  accuracy: Number,
  timestamp: { type: String, required: true },
}, { timestamps: true, collection: 'ls_tracking' });

// ── Driver Profile ──────────────────────────────────────────
const DriverSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  photoUrl: String,
  licenseNumber: { type: String, required: true },
  licenseExpiry: { type: String, required: true },
  insuranceExpiry: String,
  medicalExpiry: String,
  status: { type: String, enum: ['available', 'on_trip', 'off_duty', 'suspended'], default: 'available' },
  rating: { type: Number, default: 4.5 },
  totalLoads: { type: Number, default: 0 },
  totalKm: { type: Number, default: 0 },
  companyId: { type: String, required: true, index: true },
  currentLoadId: String,
  currentLat: Number,
  currentLng: Number,
}, { timestamps: true, collection: 'ls_drivers' });

// ── Vehicle / Fleet ─────────────────────────────────────────
const VehicleSchema = new Schema({
  vehicleNumber: { type: String, required: true },
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: String,
  registrationNumber: String,
  registrationExpiry: String,
  insuranceExpiry: String,
  capacityTons: { type: Number, required: true },
  status: { type: String, enum: ['active', 'maintenance', 'idle', 'retired'], default: 'active' },
  currentDriverId: String,
  currentDriverName: String,
  currentLoadId: String,
  odometerKm: { type: Number, default: 0 },
  fuelType: { type: String, default: 'diesel' },
  fuelEfficiency: Number,
  companyId: { type: String, required: true, index: true },
  nextMaintenanceDue: String,
  nextMaintenanceKm: Number,
}, { timestamps: true, collection: 'ls_vehicles' });

// ── Fuel Transaction ────────────────────────────────────────
const FuelTransactionSchema = new Schema({
  vehicleId: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  driverId: String,
  driverName: String,
  loadId: String,
  liters: { type: Number, required: true },
  pricePerLiter: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  odometer: { type: Number, required: true },
  station: String,
  paymentMethod: String,
  receiptUrl: String,
  date: { type: String, required: true },
  companyId: { type: String, required: true, index: true },
}, { timestamps: true, collection: 'ls_fuel' });

// ── Maintenance Record ──────────────────────────────────────
const MaintenanceSchema = new Schema({
  vehicleId: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  odometer: Number,
  serviceCenter: String,
  date: { type: String, required: true },
  nextDueDate: String,
  nextDueOdometer: Number,
  status: { type: String, enum: ['scheduled', 'in_progress', 'completed'], default: 'scheduled' },
  companyId: { type: String, required: true, index: true },
}, { timestamps: true, collection: 'ls_maintenance' });

// ── Invoice ─────────────────────────────────────────────────
const InvoiceSchema = new Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  loadId: { type: String, required: true },
  loadNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  customerCompany: String,
  customerEmail: String,
  amount: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'sent', 'paid', 'overdue'], default: 'draft' },
  dueDate: { type: String, required: true },
  paidDate: String,
  companyId: { type: String, required: true, index: true },
}, { timestamps: true, collection: 'ls_invoices' });

// ── Export Models ───────────────────────────────────────────
export const LsLoad = models.LsLoad || model('LsLoad', LoadSchema);
export const LsLoadEvent = models.LsLoadEvent || model('LsLoadEvent', LoadEventSchema);
export const LsTracking = models.LsTracking || model('LsTracking', TrackingSchema);
export const LsDriver = models.LsDriver || model('LsDriver', DriverSchema);
export const LsVehicle = models.LsVehicle || model('LsVehicle', VehicleSchema);
export const LsFuel = models.LsFuel || model('LsFuel', FuelTransactionSchema);
export const LsMaintenance = models.LsMaintenance || model('LsMaintenance', MaintenanceSchema);
export const LsInvoice = models.LsInvoice || model('LsInvoice', InvoiceSchema);
