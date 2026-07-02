'use client';
// ============================================================
// LoadSwift — Zustand Store
// Isolated from ERP store (separate store instance)
// ============================================================

import { create } from 'zustand';
import type {
  LogisticsState, LoadDocument, LoadEvent, TrackingPing,
  Driver, Vehicle, FuelTransaction, MaintenanceRecord,
  LogisticsInvoice, LogisticsAnalytics
} from './types';

export const useLogisticsStore = create<LogisticsState>((set) => ({
  // ── Data ────────────────────────────────────────────────
  loads: [],
  drivers: [],
  vehicles: [],
  fuelTransactions: [],
  maintenanceRecords: [],
  invoices: [],
  analytics: null,

  // ── UI State ─────────────────────────────────────────────
  selectedLoad: null,
  selectedLoadEvents: [],
  selectedLoadTracking: null,
  activeFilter: 'all',
  searchQuery: '',
  isLoading: false,
  sidebarCollapsed: false,

  // ── Actions ───────────────────────────────────────────────
  setLoads: (loads) => set({ loads }),
  setSelectedLoad: (load) => set({ selectedLoad: load }),
  setSelectedLoadEvents: (events) => set({ selectedLoadEvents: events }),
  setSelectedLoadTracking: (ping) => set({ selectedLoadTracking: ping }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setDrivers: (drivers) => set({ drivers }),
  setVehicles: (vehicles) => set({ vehicles }),
  setAnalytics: (analytics) => set({ analytics }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

  addLoad: (load) => set((state) => ({ loads: [load, ...state.loads] })),
  updateLoad: (id, updates) => set((state) => ({
    loads: state.loads.map(l => l._id === id ? { ...l, ...updates } : l),
    selectedLoad: state.selectedLoad?._id === id
      ? { ...state.selectedLoad, ...updates }
      : state.selectedLoad,
  })),
}));
