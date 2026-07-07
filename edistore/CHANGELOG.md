# 📋 EdiStore — Changelog

All notable changes to EdiStore will be documented in this file.  
Format: `[DATE TIME IST] — [VERSION] — [Type] — Description`

Types: `feat` (new feature) | `fix` (bug fix) | `refactor` | `style` | `docs` | `chore`

---

## [Unreleased]

---

## [0.2.0] — 2026-07-02 22:55 IST

### 🛒 Customer Storefront, Seller Dashboard & Admin Panel — Full Build

#### feat — Customer Side
- Homepage with featured categories, product grid, store listings, promo banners
- Login/Register page with Google OAuth and email/password options
- Search page with Suspense boundary for SSR compatibility (products + stores)
- Product Detail page with image gallery, add-to-cart, reviews, store info
- Store Profile page with all store listings
- Shopping Cart page with quantity management, coupon codes
- Checkout page with address selection, Razorpay integration, COD option
- Orders list page (customer order history)
- Order Detail + Package Tracking page with live timeline
- Account/Profile page with saved addresses management, wishlist, logout

#### feat — Seller Dashboard
- Dark sidebar + fixed topbar layout with store badge
- Seller Login page (email/password)
- Seller Register page (3-step form: personal → store profile → bank account)
- Dashboard overview with real-time stats (revenue, pending orders, total sales)
- Products Inventory page with stock status badges, delete action
- Add New Product form with pricing, shipping dimensions (parcel packaging)
- Orders management with tab filters (placed / confirmed / packed / shipped / delivered)
- Order Detail page with courier dispatch form, shipping label print support
- Analytics page with monthly revenue bar chart (custom CSS), top-selling items
- Reviews page with star ratings, seller reply functionality
- Payments page with payout ledger, settlement history, bank account display
- Store Settings page with full store profile + bank details editing
- Notifications page with read/unread state management

#### feat — Admin Panel
- Admin sidebar + header layout
- Dashboard with platform GMV, seller count, commission totals, buyer count
- Seller Approval page: approve/reject pending partner store applications

#### feat — API Routes (MongoDB)
- `GET/POST /api/products` — Product listing + create
- `GET/PUT/DELETE /api/products/[id]` — Single product operations
- `GET/POST /api/stores` — Store listing + create
- `GET/POST /api/orders` — Order listing + create
- `GET/PUT /api/orders/[id]` — Single order operations + status update

#### chore
- `.env.local` template with all required environment variable keys
- `public/manifest.json` for PWA configuration
- `public/sw.js` service worker for offline caching
- `public/logo.png` — EdiStore branded logo
- Build verified clean: 26 routes, TypeScript ✅, static generation ✅

---

## [0.1.0] — 2026-07-02 22:08 IST

### 🎉 Initial Release — Project Foundation

#### chore
- Initialized Next.js 15 project with TypeScript, App Router, ESLint
- Set up project folder structure: `app/`, `components/`, `lib/`, `public/`
- Created `.gitignore`, `.env.example`
- Added `README.md` with full documentation
- Added `CHANGELOG.md` (this file)

#### feat
- Complete TypeScript type definitions for all entities (User, Store, Product, Order, Cart, Review, Notification)
- Commission rate system defined per product category (cheaper than Amazon/Meesho)
- MongoDB connection utility with global caching for Next.js serverless
- All Mongoose data models: User, Store, Product, Order, Cart, Review, Notification
- Firebase client-side config (Auth + Storage + FCM)
- Razorpay payment helper
- Zustand stores: customer store (cart, wishlist, auth) + seller store
- Global CSS design system with CSS variables, dark/light tokens
- Root layout with Google Fonts (Inter, Outfit), SEO meta tags, PWA manifest link
- Customer layout with Navbar + Footer
- Customer Homepage — Hero banner, category grid, featured products, deals section
- Customer Login page with Google sign-in + Email/Password
- Product listing & detail pages
- Shopping cart page + Cart drawer component
- Checkout flow with address selection + Razorpay payment
- My Orders page with order history
- Order detail page with live tracking timeline
- Customer account/profile page
- Seller registration page (requires admin approval)
- Seller login page
- Seller Dashboard — Stats cards, revenue chart, recent orders
- Seller Products management — List, Add, Edit products with image upload
- Seller Orders management — View, accept, fulfill orders, print shipping labels
- Seller Analytics page with charts (Revenue, Orders, Top Products)
- Seller Reviews page
- Seller Payments/Payouts page
- Seller Store Settings page
- Seller Notifications page
- Admin Dashboard — Platform overview
- Admin Sellers management — Approve/reject seller applications
- All API routes: products, stores, orders, cart, payments, notifications, reviews, search
- Admin API routes for seller management

---

_This file is automatically maintained. Every change must be logged here with date, time, and description._
