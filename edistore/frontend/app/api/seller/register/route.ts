import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { EdistoreUserData } from '@/lib/db/models/User';
import { StoreData } from '@/lib/db/models/Store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fullName, email, password, phone, 
      storeName, storeDesc, category, city, state, gstNumber,
      bankName, accountNumber, ifsc, upiId,
      uid
    } = body;

    if (!fullName || !email || !password || !phone || !storeName || !storeDesc || !city || !state) {
      return NextResponse.json({ error: 'Please enter all required store profile fields' }, { status: 400 });
    }

    await dbConnect();
    const existing = await EdistoreUserData.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const sellerId = uid || ('seller_' + Math.random().toString(36).slice(2) + Date.now().toString(36));
    const storeId = 'store_' + Math.random().toString(36).slice(2);

    const user = new EdistoreUserData({
      _id: sellerId,
      name: fullName,
      email: email.toLowerCase(),
      password,
      phone,
      role: 'seller',
      sellerStatus: 'approved', // Auto approve for instant demo/testing usability
      addresses: [],
      wishlist: []
    });

    const slug = storeName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const store = new StoreData({
      _id: storeId,
      sellerId: sellerId,
      name: storeName,
      slug: slug || storeId,
      description: storeDesc,
      logo: '🏪',
      banner: '',
      category,
      city,
      state,
      gstNumber,
      phone,
      email: email.toLowerCase(),
      rating: 5.0,
      reviewCount: 1,
      totalSales: 0,
      isVerified: true,
      isActive: true,
      isPending: false,
      bankDetails: {
        bankName,
        accountName: fullName,
        accountNumber,
        ifsc,
        upiId
      }
    });

    await user.save();
    await store.save();

    return NextResponse.json({ user, store }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
