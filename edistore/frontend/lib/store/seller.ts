'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { EdistoreUser, Store, Product, Order, Notification } from '../types';

// ---------------------------------------------------------------------------
// State & Actions interface
// ---------------------------------------------------------------------------

interface SellerState {
  // ── Data ─────────────────────────────────────────────────────────────────
  user: EdistoreUser | null;
  store: Store | null;
  products: Product[];
  orders: Order[];
  notifications: Notification[];
  unreadCount: number;

  // ── UI ────────────────────────────────────────────────────────────────────
  isLoading: boolean;

  // ── Actions — Auth ────────────────────────────────────────────────────────
  setUser: (user: EdistoreUser | null) => void;

  // ── Actions — Store ───────────────────────────────────────────────────────
  setStore: (store: Store | null) => void;

  // ── Actions — Products ────────────────────────────────────────────────────
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // ── Actions — Orders ──────────────────────────────────────────────────────
  setOrders: (orders: Order[]) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;

  // ── Actions — Notifications ───────────────────────────────────────────────
  setNotifications: (notifications: Notification[]) => void;
  markNotificationsRead: () => void;

  // ── Actions — UI ──────────────────────────────────────────────────────────
  setLoading: (loading: boolean) => void;
}

// ---------------------------------------------------------------------------
// Store (Persisted to survive refresh)
// ---------------------------------------------------------------------------

export const useSellerStore = create<SellerState>()(
  persist(
    (set) => ({
      // ── Initial state ──────────────────────────────────────────────────────────
      user: null,
      store: null,
      products: [],
      orders: [],
      notifications: [],
      unreadCount: 0,
      isLoading: false,

      // ── Auth ───────────────────────────────────────────────────────────────────
      setUser: (user) => set({ user }),

      // ── Store ──────────────────────────────────────────────────────────────────
      setStore: (store) => set({ store }),

      // ── Products ───────────────────────────────────────────────────────────────
      setProducts: (products) => set({ products }),

      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products],
        })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p._id === id ? { ...p, ...updates } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
        })),

      // ── Orders ─────────────────────────────────────────────────────────────────
      setOrders: (orders) => set({ orders }),

      updateOrder: (id, updates) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o._id === id ? { ...o, ...updates } : o
          ),
        })),

      // ── Notifications ───────────────────────────────────────────────────────────
      setNotifications: (notifications) =>
        set({
          notifications,
          unreadCount: notifications.filter((n) => !n.isRead).length,
        }),

      markNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        })),

      // ── UI ──────────────────────────────────────────────────────────────────────
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'edistore-seller',
      storage: createJSONStorage(() => localStorage),
      // Only persist auth user and store details — dynamic arrays are fetched fresh
      partialize: (state) => ({
        user: state.user,
        store: state.store,
      }),
    }
  )
);
