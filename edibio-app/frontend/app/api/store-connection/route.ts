import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { EdibioConnectionData, EdistoreStoreData, EdistoreProductData, EdistoreOrderData } from '@/lib/edistore-models';
import { CompanyData } from '@/lib/models';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return NextResponse.json({ error: 'companyId is required' }, { status: 400 });
    }

    await dbConnect();
    const connection = await EdibioConnectionData.findOne({ edibioCompanyId: companyId }).lean();
    if (!connection) {
      return NextResponse.json({ connected: false });
    }

    const store = await EdistoreStoreData.findById(connection.storeId).lean();
    if (!store) {
      return NextResponse.json({ connected: false });
    }

    // Fetch catalog count and total orders count
    const [productsCount, ordersCount, products, orders] = await Promise.all([
      EdistoreProductData.countDocuments({ storeId: store._id }),
      EdistoreOrderData.countDocuments({ storeId: store._id }),
      EdistoreProductData.find({ storeId: store._id }).lean(),
      EdistoreOrderData.find({ storeId: store._id }).lean()
    ]);

    return NextResponse.json({ 
      connected: true, 
      connection, 
      store, 
      productsCount, 
      ordersCount,
      products,
      orders
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyId, userId, action, storeName, category, city, state, phone, email, storeId, bankDetails } = body;

    if (!companyId || !userId || !action) {
      return NextResponse.json({ error: 'companyId, userId, and action are required' }, { status: 400 });
    }

    await dbConnect();

    if (action === 'create') {
      if (!storeName || !category || !city || !state || !phone || !email) {
        return NextResponse.json({ error: 'Please enter all store profile fields' }, { status: 400 });
      }

      // Check if this company already has a connection
      const existingConn = await EdibioConnectionData.findOne({ edibioCompanyId: companyId });
      if (existingConn) {
        return NextResponse.json({ error: 'Company already connected to a store' }, { status: 400 });
      }

      const generatedStoreId = 'store_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      const generatedSlug = storeName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      // Create Store
      const newStore = new EdistoreStoreData({
        _id: generatedStoreId,
        sellerId: userId,
        name: storeName,
        slug: generatedSlug || generatedStoreId,
        description: `Connected store for Edibio company: ${storeName}`,
        logo: '🏪',
        banner: '',
        category,
        city,
        state,
        phone,
        email: email.toLowerCase(),
        rating: 5.0,
        reviewCount: 0,
        totalSales: 0,
        isVerified: true,
        isActive: true,
        isPending: false,
        bankDetails: bankDetails || {
          bankName: 'HDFC Bank',
          accountName: storeName,
          accountNumber: '5010029382104',
          ifsc: 'HDFC0001203',
          upiId: 'store@okhdfc'
        }
      });

      // Create Connection
      const newConnection = new EdibioConnectionData({
        _id: 'conn_' + Math.random().toString(36).slice(2),
        sellerId: userId,
        storeId: generatedStoreId,
        edibioUserId: userId,
        edibioCompanyId: companyId,
        apiKey: 'key_' + Math.random().toString(36).slice(2),
        isActive: true,
        lastSyncAt: new Date().toISOString(),
        productsSynced: 0
      });

      await newStore.save();
      await newConnection.save();

      return NextResponse.json({ 
        success: true, 
        store: newStore, 
        connection: newConnection 
      });
    }

    if (action === 'link') {
      if (!storeId) {
        return NextResponse.json({ error: 'storeId is required to link an existing store' }, { status: 400 });
      }

      let store = await EdistoreStoreData.findById(storeId);
      if (!store) {
        store = await EdistoreStoreData.findOne({ slug: storeId.trim() });
      }
      if (!store) {
        store = await EdistoreStoreData.findOne({ email: storeId.toLowerCase().trim() });
      }
      if (!store) {
        return NextResponse.json({ error: 'Store not found on EdiStore. Verify the ID, slug, or email entered.' }, { status: 404 });
      }

      // Check if company already linked
      const existingConn = await EdibioConnectionData.findOne({ edibioCompanyId: companyId });
      if (existingConn) {
        return NextResponse.json({ error: 'Company already connected to a store' }, { status: 400 });
      }

      const newConnection = new EdibioConnectionData({
        _id: 'conn_' + Math.random().toString(36).slice(2),
        sellerId: store.sellerId,
        storeId: store._id,
        edibioUserId: userId,
        edibioCompanyId: companyId,
        apiKey: 'key_' + Math.random().toString(36).slice(2),
        isActive: true,
        lastSyncAt: new Date().toISOString(),
        productsSynced: 0
      });

      await newConnection.save();
      return NextResponse.json({ 
        success: true, 
        store, 
        connection: newConnection 
      });
    }

    if (action === 'disconnect') {
      await EdibioConnectionData.deleteOne({ edibioCompanyId: companyId });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
