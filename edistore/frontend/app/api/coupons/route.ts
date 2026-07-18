import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { CouponData } from '@/lib/db/models/Coupon';

// Get coupon details (validation)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const subtotal = Number(searchParams.get('subtotal') || 0);

    if (!code) {
      return NextResponse.json({ error: 'Coupon code parameter is required' }, { status: 400 });
    }

    await dbConnect();

    const coupon = await CouponData.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      return NextResponse.json({ valid: false, message: 'Invalid or inactive coupon code' });
    }

    // Expiry check
    if (new Date(coupon.expiryDate) < new Date()) {
      return NextResponse.json({ valid: false, message: 'Coupon code has expired' });
    }

    // Min purchase constraint
    if (subtotal < coupon.minPurchaseAmount) {
      return NextResponse.json({ 
        valid: false, 
        message: `Minimum purchase of ₹${coupon.minPurchaseAmount} is required for this coupon` 
      });
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      message: `Coupon applied successfully!`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Create new coupon
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, discountType, discountValue, minPurchaseAmount, expiryDate } = body;

    if (!code || !discountType || !discountValue || !expiryDate) {
      return NextResponse.json({ error: 'Missing required coupon fields' }, { status: 400 });
    }

    await dbConnect();

    const existing = await CouponData.findOne({ code: code.toUpperCase() });
    if (existing) {
      return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
    }

    const coupon = new CouponData({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minPurchaseAmount: minPurchaseAmount || 0,
      expiryDate: new Date(expiryDate),
      isActive: true
    });

    await coupon.save();
    return NextResponse.json({ success: true, coupon }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
