import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { OrderData } from '@/lib/db/models/Order';
import { EdistoreUserData } from '@/lib/db/models/User';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    await dbConnect();
    const order = await OrderData.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const body = await request.json();
    await dbConnect();

    // Fetch the original order first to update the timeline and ediPoints correctly
    const originalOrder = await OrderData.findById(orderId);
    if (!originalOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Handle Edi Points adjustment on status transitions
    const pointsChange = Math.floor(originalOrder.totalAmount / 100);

    if (body.status && body.status !== originalOrder.status) {
      let notes = body.note || `Order status updated to ${body.status}`;

      if (body.status === 'delivered' && originalOrder.status !== 'delivered') {
        // Award Edi Points on delivery (₹100 = 1 Point)
        if (pointsChange > 0) {
          await EdistoreUserData.findByIdAndUpdate(
            originalOrder.customerId,
            { $inc: { ediPoints: pointsChange } }
          );
          notes = `Order delivered successfully. Awarded ${pointsChange} Edi Points!`;
        }
      } else if (
        (body.status === 'cancelled' || body.status === 'returned') && 
        originalOrder.status === 'delivered'
      ) {
        // Deduct points on cancellation/return of a delivered order
        if (pointsChange > 0) {
          await EdistoreUserData.findByIdAndUpdate(
            originalOrder.customerId,
            { $inc: { ediPoints: -pointsChange } }
          );
          notes = `Order ${body.status}. Deducted ${pointsChange} Edi Points from account.`;
        }
      }

      const newEvent = {
        status: body.status,
        timestamp: new Date().toISOString(),
        note: notes
      };
      body.$push = { timeline: newEvent };
    }

    const order = await OrderData.findByIdAndUpdate(orderId, body, { new: true });
    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
