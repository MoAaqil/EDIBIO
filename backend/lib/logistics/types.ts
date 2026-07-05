// ============================================================
// LoadSwift Logistics Module — Type Definitions
// Isolated from ERP — uses separate ls_ MongoDB collections
// ============================================================

export type LoadStatus = 'upcoming' | 'in_transit' | 'delivered' | 'delayed' | 'cancelled';
export type DriverStatus = 'available' | 'on_trip' | 'off_duty' | 'suspended';
export type VehicleStatus = 'active' | 'maintenance' | 'idle' | 'retired';
export type EventType =
  | 'pickup_scheduled' | 'picked_up' | 'in_transit'
  | 'checkpoint_arrived' | 'checkpoint_departed'
  | 'delivered' | 'delay_reported' | 'document_uploaded';

// ── GPS Tracking Ping ───────────────────────────────────────
export interface TrackingPing {
  _id?: string;
  loadId: string;
  driverId: string;
  lat: number;
  lng: number;
  speed: number;        // km/h
  heading: number;      // 0-360 degrees
  battery?: number;     // 0-100
  network?: string;     // 'wifi' | '4g' | '3g'
  timestamp: string;    // ISO
  accuracy?: number;    // meters
}

// ── Load / Shipment ─────────────────────────────────────────
export interface LoadDocument {
  _id?: string;
  loadNumber: string;
  status: LoadStatus;

  // Customer
  customerId?: string;
  customerName: string;
  customerCompany?: string;
  customerPhone?: string;
  customerEmail?: string;

  // Route
  pickupAddress: string;
  pickupCity: string;
  pickupLat?: number;
  pickupLng?: number;
  pickupDate: string;

  deliveryAddress: string;
  deliveryCity: string;
  deliveryLat?: number;
  deliveryLng?: number;
  deliveryDate: string;

  // Cargo
  commodity: string;
  weightKg: number;
  volumeCbm?: number;
  specialInstructions?: string;

  // Assignment
  driverId?: string;
  driverName?: string;
  vehicleId?: string;
  vehicleNumber?: string;

  // Financials
  baseRate: number;
  fuelCost?: number;
  fuelRebate?: number;
  tollCost?: number;
  taxes?: number;
  commission?: number;
  netPayout?: number;
  grossRevenue?: number;
  profitMargin?: number;

  // Distance & ETA
  distanceKm?: number;
  etaHours?: number;
  currentEta?: string;   // ISO datetime

  // Live tracking
  currentLat?: number;
  currentLng?: number;
  lastPing?: string;     // ISO

  // Meta
  companyId: string;     // ERP company ID (for isolation)
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// ── Transit Timeline Event ──────────────────────────────────
export interface LoadEvent {
  _id?: string;
  loadId: string;
  type: EventType;
  timestamp: string;
  lat?: number;
  lng?: number;
  locationName?: string;
  driverId?: string;
  driverName?: string;
  notes?: string;
  photos?: string[];
  createdBy?: string;
}

// ── Driver Profile ──────────────────────────────────────────
export interface Driver {
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  photoUrl?: string;
  licenseNumber: string;
  licenseExpiry: string;
  insuranceExpiry?: string;
  medicalExpiry?: string;
  status: DriverStatus;
  rating?: number;         // 1-5
  totalLoads?: number;
  totalKm?: number;
  companyId: string;
  currentLoadId?: string;
  currentLat?: number;
  currentLng?: number;
  createdAt: string;
  updatedAt: string;
}

// ── Vehicle / Fleet ─────────────────────────────────────────
export interface Vehicle {
  _id?: string;
  vehicleNumber: string;
  type: string;          // 'truck' | 'trailer' | 'van' | 'flatbed'
  make: string;
  model: string;
  year: number;
  vin?: string;
  registrationNumber?: string;
  registrationExpiry?: string;
  insuranceExpiry?: string;
  capacityTons: number;
  status: VehicleStatus;
  currentDriverId?: string;
  currentDriverName?: string;
  currentLoadId?: string;
  odometerKm?: number;
  fuelType?: string;     // 'diesel' | 'petrol' | 'cng' | 'electric'
  fuelEfficiency?: number; // km/L
  companyId: string;
  createdAt: string;
  updatedAt: string;
  nextMaintenanceDue?: string;
  nextMaintenanceKm?: number;
}

// ── Fuel Transaction ────────────────────────────────────────
export interface FuelTransaction {
  _id?: string;
  vehicleId: string;
  vehicleNumber: string;
  driverId?: string;
  driverName?: string;
  loadId?: string;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  odometer: number;
  station?: string;
  paymentMethod?: string;
  receiptUrl?: string;
  date: string;
  companyId: string;
  createdAt: string;
}

// ── Maintenance Record ──────────────────────────────────────
export interface MaintenanceRecord {
  _id?: string;
  vehicleId: string;
  vehicleNumber: string;
  type: string;   // 'oil_change' | 'tire' | 'brake' | 'inspection' | 'repair' | 'other'
  description: string;
  cost: number;
  odometer?: number;
  serviceCenter?: string;
  date: string;
  nextDueDate?: string;
  nextDueOdometer?: number;
  status: 'scheduled' | 'in_progress' | 'completed';
  companyId: string;
  createdAt: string;
}

// ── Invoice ─────────────────────────────────────────────────
export interface LogisticsInvoice {
  _id?: string;
  invoiceNumber: string;
  loadId: string;
  loadNumber: string;
  customerName: string;
  customerCompany?: string;
  customerEmail?: string;
  amount: number;
  tax: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  paidDate?: string;
  companyId: string;
  createdAt: string;
}

// ── Analytics ───────────────────────────────────────────────
export interface LogisticsAnalytics {
  totalLoads: number;
  activeLoads: number;
  deliveredLoads: number;
  delayedLoads: number;
  totalRevenue: number;
  totalProfit: number;
  avgProfitMargin: number;
  totalDistanceKm: number;
  avgCostPerKm: number;
  onTimeDeliveryRate: number;
  topDrivers: { name: string; loads: number; rating: number }[];
  monthlyRevenue: { month: string; revenue: number; loads: number }[];
  loadsByStatus: { status: string; count: number }[];
}

// ── Zustand Store Types ─────────────────────────────────────
export interface LogisticsState {
  // Data
  loads: LoadDocument[];
  drivers: Driver[];
  vehicles: Vehicle[];
  fuelTransactions: FuelTransaction[];
  maintenanceRecords: MaintenanceRecord[];
  invoices: LogisticsInvoice[];
  analytics: LogisticsAnalytics | null;

  // UI State
  selectedLoad: LoadDocument | null;
  selectedLoadEvents: LoadEvent[];
  selectedLoadTracking: TrackingPing | null;
  activeFilter: 'all' | 'in_transit' | 'delivered' | 'upcoming' | 'delayed';
  searchQuery: string;
  isLoading: boolean;
  sidebarCollapsed: boolean;

  // Actions
  setLoads: (loads: LoadDocument[]) => void;
  setSelectedLoad: (load: LoadDocument | null) => void;
  setSelectedLoadEvents: (events: LoadEvent[]) => void;
  setSelectedLoadTracking: (ping: TrackingPing | null) => void;
  setActiveFilter: (filter: LogisticsState['activeFilter']) => void;
  setSearchQuery: (q: string) => void;
  setDrivers: (drivers: Driver[]) => void;
  setVehicles: (vehicles: Vehicle[]) => void;
  setAnalytics: (a: LogisticsAnalytics) => void;
  setIsLoading: (v: boolean) => void;
  setSidebarCollapsed: (v: boolean) => void;
  addLoad: (load: LoadDocument) => void;
  updateLoad: (id: string, updates: Partial<LoadDocument>) => void;
}
