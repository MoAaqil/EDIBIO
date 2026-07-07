import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { StoreData } from '@/lib/db/models/Store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');
    const query = searchParams.get('q');
    const sellerId = searchParams.get('sellerId');
    const slug = searchParams.get('slug');

    await dbConnect();

    const filter: any = {};
    if (active === 'true') filter.isActive = true;
    if (category) filter.category = category;
    if (sellerId) filter.sellerId = sellerId;
    if (slug) filter.slug = slug;
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } }
      ];
    }

    const stores = await StoreData.find(filter).sort({ rating: -1 });
    return NextResponse.json(stores);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    const store = new StoreData({
      _id: body.slug || 'store_' + Math.random().toString(36).slice(2),
      ...body
    });

    await store.save();
    return NextResponse.json(store, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
