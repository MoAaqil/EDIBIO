import mongoose, { Schema } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).admin_mongoose;

if (!cached) {
  cached = (global as any).admin_mongoose = { conn: null, promise: null };
}

export async function getConnections() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongooseInstance) => {
      const edibioDb = mongooseInstance.connection; // default db (test)
      const edistoreDb = edibioDb.useDb('edistore'); // edistore db
      
      // ── EDIBIO BILLING SCHEMAS ──
      const EdibioUserSchema = new Schema({
        _id: String,
        email: String,
        name: String,
        phone: String,
        role: String,
        createdAt: String,
        subscriptionType: String,
        subscriptionExpiresAt: String,
      }, { strict: false, collection: 'users' });

      const CompanySchema = new Schema({
        _id: String,
        userId: String,
        name: String,
        type: String,
        gstNumber: String,
        phone: String,
        email: String,
        city: String,
        state: String,
        createdAt: String,
      }, { strict: false, collection: 'companies' });

      // ── EDISTORE SCHEMAS ──
      const EdistoreUserSchema = new Schema({
        _id: String,
        email: String,
        name: String,
        phone: String,
        role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' },
        sellerStatus: { type: String, enum: ['pending', 'approved', 'rejected'] },
      }, { strict: false, timestamps: true, collection: 'edistoreusers' });

      const StoreSchema = new Schema({
        _id: String,
        sellerId: String,
        name: String,
        slug: String,
        description: String,
        category: String,
        city: String,
        state: String,
        phone: String,
        email: String,
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
        isPending: { type: Boolean, default: true },
      }, { strict: false, timestamps: true, collection: 'stores' });

      // Register Models on connections (crucial for multi-database Mongoose setup)
      const EdibioUser = edibioDb.models.User || edibioDb.model('User', EdibioUserSchema);
      const Company = edibioDb.models.Company || edibioDb.model('Company', CompanySchema);
      
      const EdistoreUser = edistoreDb.models.EdistoreUser || edistoreDb.model('EdistoreUser', EdistoreUserSchema);
      const Store = edistoreDb.models.Store || edistoreDb.model('Store', StoreSchema);

      return {
        edibioDb,
        edistoreDb,
        EdibioUser,
        Company,
        EdistoreUser,
        Store
      };
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
