import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { ProductData } from '@/lib/db/models/Product';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const query = searchParams.get('q');
    const sellerId = searchParams.get('sellerId');
    const storeId = searchParams.get('storeId');

    await dbConnect();

    const filter: any = {};
    if (!sellerId && !storeId) {
      filter.isActive = true;
    }
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (sellerId) filter.sellerId = sellerId;
    if (storeId) filter.storeId = storeId;
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    const products = await ProductData.find(filter).sort({ createdAt: -1 }).limit(40);
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    const product = new ProductData({
      _id: body._id || 'prod_' + Math.random().toString(36).slice(2),
      ...body
    });

    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
