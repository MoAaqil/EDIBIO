import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { OrderData } from '@/lib/db/models/Order';
import { EdistoreUserData } from '@/lib/db/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { awb, current_status, scans } = body;

    if (!awb) {
      return NextResponse.json({ error: 'Missing AWB code' }, { status: 400 });
    }

    await dbConnect();

    // Find the order matching this AWB code
    const order = await OrderData.findOne({ 'tracking.awb': awb });
    if (!order) {
      return NextResponse.json({ error: 'Order matching AWB not found' }, { status: 404 });
    }

    // Map Shiprocket tracking status strings to EdiStore statuses
    let newStatus = order.status;
    const statusUpper = String(current_status).toUpperCase();

    if (statusUpper.includes('DELIVERED')) {
      newStatus = 'delivered';
    } else if (statusUpper.includes('OUT FOR DELIVERY')) {
      newStatus = 'out_for_delivery';
    } else if (statusUpper.includes('PICKED UP') || statusUpper.includes('IN TRANSIT') || statusUpper.includes('SHIPPED')) {
      newStatus = 'shipped';
    } else if (statusUpper.includes('CANCELLED')) {
      newStatus = 'cancelled';
    } else if (statusUpper.includes('RTO') || statusUpper.includes('RETURNED')) {
      newStatus = 'returned';
    }

    // Update tracking events history
    const trackingEvents = Array.isArray(scans) ? scans.map((s: any) => ({
      timestamp: s.date || new Date().toISOString(),
      status: s.activity || current_status,
      location: s.location || 'Hub',
      description: s.activity || current_status
    })) : [];

    const statusChanged = newStatus !== order.status;
    const pointsChange = Math.floor(order.totalAmount / 100);

    // Apply Edi Points updates on state transitions via Webhook
    if (statusChanged) {
      let notes = `Logistics status updated: ${current_status}`;

      if (newStatus === 'delivered' && order.status !== 'delivered') {
        if (pointsChange > 0) {
          await EdistoreUserData.findByIdAndUpdate(
            order.customerId,
            { $inc: { ediPoints: pointsChange } }
          );
          notes = `Shipment delivered. Awarded ${pointsChange} Edi Points via automated logistics webhook!`;
        }
      } else if (
        (newStatus === 'cancelled' || newStatus === 'returned') && 
        order.status === 'delivered'
      ) {
        if (pointsChange > 0) {
          await EdistoreUserData.findByIdAndUpdate(
            order.customerId,
            { $inc: { ediPoints: -pointsChange } }
          );
          notes = `Shipment returned/cancelled. Deducted ${pointsChange} Edi Points via automated logistics webhook.`;
        }
      }

      // Record state change timeline event
      order.timeline.push({
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: notes
      });
      order.status = newStatus;
    }

    // Update courier events
    order.tracking.events = trackingEvents;
    order.tracking.lastUpdated = new Date().toISOString();

    await order.save();
    console.log(`[Shiprocket Webhook] Successfully processed tracking update for AWB: ${awb}. New Status: ${newStatus}`);

    return NextResponse.json({ success: true, status: newStatus });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
