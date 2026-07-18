import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { OrderData } from '@/lib/db/models/Order';
import { EdistoreUserData } from '@/lib/db/models/User';
import { createShiprocketOrder } from '@/lib/shiprocket';

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

      if (body.status === 'confirmed' && originalOrder.status !== 'confirmed') {
        try {
          // Construct Shiprocket Order payload
          const srPayload = {
            order_id: originalOrder.orderNumber,
            order_date: new Date(originalOrder.createdAt).toISOString().split('T')[0],
            pickup_location: originalOrder.storeName || 'Primary Store',
            billing_customer_name: originalOrder.customerName,
            billing_address: originalOrder.shippingAddress.line1 || 'Primary Street',
            billing_city: originalOrder.shippingAddress.city || 'Bangalore',
            billing_pincode: originalOrder.shippingAddress.pincode || '560001',
            billing_state: originalOrder.shippingAddress.state || 'Karnataka',
            billing_country: 'India',
            billing_email: 'customer@edibio.com',
            billing_phone: originalOrder.customerPhone || '9999999999',
            shipping_is_billing: true,
            order_items: originalOrder.items.map((it: any) => ({
              name: it.name,
              sku: it.productId,
              units: it.qty,
              selling_price: it.price
            })),
            payment_method: originalOrder.paymentMethod === 'cod' ? 'COD' : 'Prepaid' as const,
            sub_total: originalOrder.totalAmount,
            length: 15,
            breadth: 15,
            height: 10,
            weight: 0.5
          };

          const srResponse = await createShiprocketOrder(srPayload);
          if (srResponse && srResponse.success) {
            body.tracking = {
              carrier: srResponse.courier_name,
              awb: srResponse.awb_code,
              trackingUrl: `https://shiprocket.co/tracking/${srResponse.awb_code}`,
              lastUpdated: new Date().toISOString(),
              events: []
            };
            notes = `Store accepted the order. Automated courier label assigned successfully: ${srResponse.courier_name} AWB: ${srResponse.awb_code}`;
          }
        } catch (srErr: any) {
          console.error('[Shiprocket Integration Error]:', srErr.message);
          notes = `Store accepted the order. Warning: Shiprocket label allocation failed: ${srErr.message}`;
        }
      } else if (body.status === 'delivered' && originalOrder.status !== 'delivered') {
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
