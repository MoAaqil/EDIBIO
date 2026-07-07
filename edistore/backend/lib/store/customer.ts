'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, EdistoreUser } from '../types';

// ---------------------------------------------------------------------------
// State & Actions interface
// ---------------------------------------------------------------------------

interface CustomerState {
  // ── Auth ─────────────────────────────────────────────────────────────────
  user: EdistoreUser | null;
  isAuthenticated: boolean;

  // ── Cart ─────────────────────────────────────────────────────────────────
  cart: CartItem[];
  /** Total number of individual units across all cart lines. */
  cartCount: number;
  /** Total price (in base currency units) across all cart lines. */
  cartTotal: number;

  // ── Wishlist ──────────────────────────────────────────────────────────────
  /** Array of product IDs the user has wishlisted. */
  wishlist: string[];

  // ── UI ────────────────────────────────────────────────────────────────────
  isCartOpen: boolean;
  isAuthModalOpen: boolean;

  // ── Actions — Auth ────────────────────────────────────────────────────────
  setUser: (user: EdistoreUser | null) => void;

  // ── Actions — Cart ────────────────────────────────────────────────────────
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;

  // ── Actions — Wishlist ────────────────────────────────────────────────────
  toggleWishlist: (productId: string) => void;

  // ── Actions — UI ──────────────────────────────────────────────────────────
  setCartOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeCartDerived(cart: CartItem[]): { cartCount: number; cartTotal: number } {
  return cart.reduce(
    (acc, item) => ({
      cartCount: acc.cartCount + item.qty,
      cartTotal: acc.cartTotal + item.price * item.qty,
    }),
    { cartCount: 0, cartTotal: 0 }
  );
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      // ── Initial state ──────────────────────────────────────────────────────
      user: null,
      isAuthenticated: false,

      cart: [],
      cartCount: 0,
      cartTotal: 0,

      wishlist: [],

      isCartOpen: false,
      isAuthModalOpen: false,

      // ── Auth actions ───────────────────────────────────────────────────────
      setUser: (user) =>
        set({
          user,
          isAuthenticated: user !== null,
        }),

      // ── Cart actions ───────────────────────────────────────────────────────
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((c) => c.productId === item.productId);
          let updatedCart: CartItem[];

          if (existing) {
            // Increment quantity if the item is already in the cart
            updatedCart = state.cart.map((c) =>
              c.productId === item.productId
                ? { ...c, qty: c.qty + item.qty }
                : c
            );
          } else {
            updatedCart = [...state.cart, item];
          }

          return { cart: updatedCart, ...computeCartDerived(updatedCart) };
        }),

      removeFromCart: (productId) =>
        set((state) => {
          const updatedCart = state.cart.filter((c) => c.productId !== productId);
          return { cart: updatedCart, ...computeCartDerived(updatedCart) };
        }),

      updateQty: (productId, qty) =>
        set((state) => {
          let updatedCart: CartItem[];

          if (qty <= 0) {
            // Remove the item if qty drops to zero or below
            updatedCart = state.cart.filter((c) => c.productId !== productId);
          } else {
            updatedCart = state.cart.map((c) =>
              c.productId === productId ? { ...c, qty } : c
            );
          }

          return { cart: updatedCart, ...computeCartDerived(updatedCart) };
        }),

      clearCart: () =>
        set({ cart: [], cartCount: 0, cartTotal: 0 }),

      // ── Wishlist actions ───────────────────────────────────────────────────
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),

      // ── UI actions ─────────────────────────────────────────────────────────
      setCartOpen: (open) => set({ isCartOpen: open }),
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
    }),
    {
      name: 'edistore-customer',

      // Use localStorage so cart/wishlist survive page refresh.
      // (For guests the data clears when the user manually clears browser storage.)
      storage: createJSONStorage(() => localStorage),

      // Only persist cart and wishlist — auth state and UI flags are ephemeral.
      partialize: (state) => ({
        cart: state.cart,
        cartCount: state.cartCount,
        cartTotal: state.cartTotal,
        wishlist: state.wishlist,
      }),

      // Re-compute derived cart fields after rehydration to ensure consistency.
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { cartCount, cartTotal } = computeCartDerived(state.cart);
          state.cartCount = cartCount;
          state.cartTotal = cartTotal;
        }
      },
    }
  )
);
