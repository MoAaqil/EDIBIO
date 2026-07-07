import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsTracking, LsLoad, LsLoadEvent } from '@/lib/logistics/models';

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { loadId, driverId, lat, lng, speed, heading, battery, network, accuracy } = body;

    if (!loadId || !lat || !lng) {
      return NextResponse.json({ error: 'loadId, lat, and lng are required' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // 1. Create tracking ping
    const ping = await LsTracking.create({
      loadId,
      driverId: driverId || 'unknown',
      lat,
      lng,
      speed: speed || 0,
      heading: heading || 0,
      battery,
      network,
      accuracy,
      timestamp,
    });

    // 2. Update current position in Load
    await LsLoad.findByIdAndUpdate(loadId, {
      currentLat: lat,
      currentLng: lng,
      lastPing: timestamp,
    });

    return NextResponse.json({ success: true, ping }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
