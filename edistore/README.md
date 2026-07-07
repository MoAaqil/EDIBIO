# 🛒 EdiStore — E-Commerce Marketplace

> An Amazon-style full-stack e-commerce platform built for Indian businesses.  
> Seller-friendly · Customer-first · Integrates with EDIBIO billing software.

---

## 📦 Project Overview

EdiStore is a complete two-sided marketplace:

- **Customer Side** — Browse products, add to cart, checkout, track orders
- **Seller Dashboard** — Manage products, orders, analytics, payouts
- **Admin Panel** — Approve sellers, moderate listings, manage the platform

### 🔗 EDIBIO Integration _(Coming in Phase 2)_
EDIBIO business owners can connect their inventory to EdiStore. When a sale happens on EdiStore, a sale invoice is automatically created in EDIBIO and stock is deducted.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS + CSS Variables |
| State | Zustand |
| Database | MongoDB Atlas (shared with EDIBIO, separate collections) |
| Auth | Firebase Authentication |
| Storage | Firebase Storage (product images) |
| Payments | Razorpay |
| Push Notifications | Firebase Cloud Messaging (FCM) |
| Icons | Lucide React |
| Animations | Framer Motion |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- Firebase project (Auth + Storage + FCM)
- Razorpay account

### Installation

```bash
# Clone / navigate to the project
cd edistore

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in all values in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🌿 Environment Variables

Create `.env.local` with the following:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Firebase (Server-side)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key

# Firebase (Client-side / Public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=   # For FCM push notifications

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=EdiStore
```

---

## 📁 Folder Structure

```
edistore/
├── app/
│   ├── (customer)/          # Customer-facing storefront
│   ├── (seller)/            # Seller dashboard
│   ├── (admin)/             # Admin panel
│   └── api/                 # Backend API routes
├── components/
│   ├── customer/            # Customer UI components
│   ├── seller/              # Seller dashboard components
│   └── shared/              # Shared components
├── lib/
│   ├── db/
│   │   ├── mongodb.ts       # DB connection
│   │   └── models/          # All Mongoose models
│   ├── store/               # Zustand stores
│   ├── firebase.ts
│   ├── razorpay.ts
│   ├── types.ts
│   └── utils.ts
└── public/
    ├── manifest.json
    └── sw.js
```

---

## 💰 Commission Structure

EdiStore charges a platform commission on each completed sale — cheaper than Amazon and Meesho:

| Category | EdiStore | Amazon India | Meesho |
|----------|---------|-------------|--------|
| Grocery & Staples | **4%** | 6–8% | 5% |
| Electronics | **3%** | 5–8% | 3% |
| Mobile Phones | **2.5%** | 4% | 3% |
| Fashion & Clothing | **9%** | 12–15% | 8–10% |
| Beauty & Personal Care | **7%** | 10% | 8% |
| Home & Kitchen | **7%** | 10–12% | 8% |
| Books & Stationery | **10%** | 15% | — |
| Sports & Fitness | **6%** | 8% | — |
| Toys & Baby | **6%** | 8% | — |
| Health & Wellness | **7%** | 10% | — |
| Default / Others | **8%** | 12% | — |

---

## 📦 Shipping & Packaging

Sellers dispatch orders using their **own courier services**. EdiStore provides:
- Printable shipping labels with QR code, seller address, customer address
- Standard packaging size guidelines
- Sellers enter their courier AWB number to mark orders as shipped
- Customers can track by AWB number

---

## 📅 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a complete history of changes.

---

## 🤝 Contributing

This project is proprietary. For issues, please contact the development team.

---

## 📄 License

Proprietary — Edibio Technologies Pvt. Ltd. All rights reserved.
