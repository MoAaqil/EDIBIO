import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { StoreData } from '@/lib/db/models/Store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    await dbConnect();

    const store = await StoreData.findById(storeId);
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    return NextResponse.json(store);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    const body = await request.json();
    await dbConnect();

    const store = await StoreData.findByIdAndUpdate(storeId, body, { new: true });
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    return NextResponse.json(store);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
