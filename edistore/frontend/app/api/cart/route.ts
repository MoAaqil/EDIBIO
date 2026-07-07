import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { CartData } from '@/lib/db/models/Cart';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    await dbConnect();
    const cart = await CartData.findById(userId);
    
    if (!cart) {
      // Return empty cart structure if not found in DB yet
      return NextResponse.json({ _id: userId, items: [] });
    }

    return NextResponse.json(cart);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, merge } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId in request body' }, { status: 400 });
    }

    await dbConnect();

    let finalItems = items || [];

    if (merge) {
      const existingCart = await CartData.findById(userId);
      if (existingCart && existingCart.items && existingCart.items.length > 0) {
        const mergedMap = new Map<string, any>();
        
        // Populate existing items
        for (const item of existingCart.items) {
          mergedMap.set(item.productId, { ...item.toObject() });
        }

        // Merge incoming items
        for (const newItem of finalItems) {
          if (mergedMap.has(newItem.productId)) {
            const existing = mergedMap.get(newItem.productId);
            existing.qty += newItem.qty; // Combine quantities
            mergedMap.set(newItem.productId, existing);
          } else {
            mergedMap.set(newItem.productId, newItem);
          }
        }

        finalItems = Array.from(mergedMap.values());
      }
    }

    // Upsert database cart
    const updatedCart = await CartData.findByIdAndUpdate(
      userId,
      { items: finalItems },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedCart);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    await dbConnect();
    
    // Clear cart items instead of fully deleting document to preserve the document placeholder
    const clearedCart = await CartData.findByIdAndUpdate(
      userId,
      { items: [] },
      { new: true }
    );

    return NextResponse.json({ success: true, cart: clearedCart });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
