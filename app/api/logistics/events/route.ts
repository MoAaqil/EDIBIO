import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsLoadEvent, LsLoad } from '@/lib/logistics/models';

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { loadId, type, timestamp = new Date().toISOString(), lat, lng, locationName, notes, photos, driverId, driverName, createdBy } = body;

    if (!loadId || !type) {
      return NextResponse.json({ error: 'loadId and type are required' }, { status: 400 });
    }

    const event = await LsLoadEvent.create({
      loadId,
      type,
      timestamp,
      lat,
      lng,
      locationName,
      notes,
      photos,
      driverId,
      driverName,
      createdBy,
    });

    // Proactively update load status if event type corresponds to a state change
    let statusUpdate = '';
    if (type === 'picked_up') statusUpdate = 'in_transit';
    else if (type === 'delivered') statusUpdate = 'delivered';
    else if (type === 'delay_reported') statusUpdate = 'delayed';

    if (statusUpdate) {
      await LsLoad.findByIdAndUpdate(loadId, { status: statusUpdate });
    }

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
