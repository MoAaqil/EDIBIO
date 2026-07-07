import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { OrderData } from '@/lib/db/models/Order';
import { StoreData } from '@/lib/db/models/Store';
import { PaymentData } from '@/lib/db/models/Payment';
import { EdistoreUserData } from '@/lib/db/models/User';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const sellerId = searchParams.get('sellerId');

    await dbConnect();

    const filter: any = {};
    if (customerId) filter.customerId = customerId;
    if (sellerId) filter.sellerId = sellerId;

    const orders = await OrderData.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

const getCommissionRate = (category: string) => {
  const cat = category?.toLowerCase();
  if (cat === 'grocery') return 0.04;
  if (cat === 'electronics') return 0.03;
  if (cat === 'mobile') return 0.025;
  if (cat === 'fashion') return 0.09;
  if (cat === 'beauty') return 0.07;
  if (cat === 'home') return 0.07;
  return 0.08;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      customerId, 
      customerName, 
      customerPhone, 
      items, 
      paymentMethod, 
      shippingAddress,
      razorpayOrderId,
      razorpayPaymentId,
      redeemPoints // optional Edi Points to redeem (1 point = ₹1 discount)
    } = body;

    // Enforce authentication for checkout
    if (!customerId || customerId.startsWith('guest_')) {
      return NextResponse.json({ error: 'Checkout requires a verified logged-in account.' }, { status: 401 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    await dbConnect();

    // Verify user profile and Edi Points if points redemption is requested
    const pointsToRedeem = Number(redeemPoints) || 0;
    if (pointsToRedeem > 0) {
      const user = await EdistoreUserData.findById(customerId);
      if (!user) {
        return NextResponse.json({ error: 'User profile not found.' }, { status: 404 });
      }
      if (user.ediPoints < pointsToRedeem) {
        return NextResponse.json({ error: `Insufficient Edi Points. Available: ${user.ediPoints}` }, { status: 400 });
      }
      
      // Deduct the points from user profile in database
      await EdistoreUserData.findByIdAndUpdate(customerId, { $inc: { ediPoints: -pointsToRedeem } });
    }

    // 1. Group items by storeId
    const itemsByStore = new Map<string, any[]>();
    for (const item of items) {
      const storeId = item.storeId;
      if (!storeId) {
        return NextResponse.json({ error: `Item ${item.name} is missing a storeId` }, { status: 400 });
      }
      if (!itemsByStore.has(storeId)) {
        itemsByStore.set(storeId, []);
      }
      itemsByStore.get(storeId)!.push(item);
    }

    // Compute consolidated subtotal first to distribute discounts proportionally
    let consolidatedSubtotal = 0;
    const storeGroupEntries = Array.from(itemsByStore.entries());
    const storeSubtotals = new Map<string, number>();

    for (const [storeId, storeItems] of storeGroupEntries) {
      const subtotal = storeItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
      storeSubtotals.set(storeId, subtotal);
      consolidatedSubtotal += subtotal;
    }

    const createdOrders = [];
    const createdOrderIds = [];
    let discountAppliedSoFar = 0;
    let consolidatedFinalTotal = 0;

    // 2. Loop through each store's items and create split orders
    for (let i = 0; i < storeGroupEntries.length; i++) {
      const [storeId, storeItems] = storeGroupEntries[i];
      const store = await StoreData.findById(storeId);
      if (!store) {
        return NextResponse.json({ error: `Store with ID ${storeId} not found` }, { status: 404 });
      }

      const storeName = store.name;
      const sellerId = store.sellerId;
      const category = store.category || 'other';

      const subtotal = storeSubtotals.get(storeId) || 0;

      // Distribute points discount proportionally (1 point = ₹1)
      let orderDiscount = 0;
      if (pointsToRedeem > 0 && consolidatedSubtotal > 0) {
        if (i === storeGroupEntries.length - 1) {
          // Last order gets the remaining portion of the points discount
          orderDiscount = pointsToRedeem - discountAppliedSoFar;
        } else {
          orderDiscount = Math.floor(pointsToRedeem * (subtotal / consolidatedSubtotal));
          discountAppliedSoFar += orderDiscount;
        }
      }

      // Clamp discount to the subtotal amount
      orderDiscount = Math.min(orderDiscount, subtotal);
      const totalAmount = subtotal - orderDiscount;
      consolidatedFinalTotal += totalAmount;

      const commRate = getCommissionRate(category);
      const commAmount = totalAmount * commRate;

      const orderId = 'ord_' + Math.random().toString(36).slice(2);
      const orderNumber = 'EDI-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);

      // Create Order payload in database format
      const orderPayload = {
        _id: orderId,
        orderNumber,
        customerId,
        customerName: customerName || 'Verified Customer',
        customerPhone: customerPhone || '0000000000',
        storeId,
        storeName,
        sellerId,
        items: storeItems.map(item => ({
          productId: item.productId,
          name: item.name,
          image: item.image || '📦',
          qty: item.qty,
          price: item.price,
          mrp: item.mrp || item.price,
          gstRate: category === 'grocery' ? 5 : 18,
          totalPrice: item.price * item.qty
        })),
        subtotal,
        shippingCharge: 0,
        discount: orderDiscount,
        totalAmount,
        commissionRate: commRate * 100,
        commissionAmount: commAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'razorpay' ? 'paid' : 'pending',
        razorpayOrderId,
        razorpayPaymentId,
        shippingAddress,
        status: 'placed',
        timeline: [{
          status: 'placed',
          timestamp: new Date().toISOString(),
          note: `Order placed. Redeemed ${orderDiscount} Edi Points.`
        }]
      };

      const order = new OrderData(orderPayload);
      await order.save();
      
      createdOrders.push(order);
      createdOrderIds.push(orderId);
    }

    // 3. Create a consolidated Payment record
    const paymentId = 'pay_' + Math.random().toString(36).slice(2);
    const payment = new PaymentData({
      _id: paymentId,
      orderIds: createdOrderIds,
      customerId,
      amount: consolidatedFinalTotal,
      method: paymentMethod,
      status: paymentMethod === 'razorpay' ? 'paid' : 'pending',
      razorpayOrderId,
      razorpayPaymentId
    });

    await payment.save();

    return NextResponse.json({ 
      success: true, 
      paymentId, 
      orders: createdOrders 
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
