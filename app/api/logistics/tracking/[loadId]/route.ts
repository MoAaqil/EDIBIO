import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsTracking, LsLoadEvent } from '@/lib/logistics/models';

export async function GET(req: NextRequest, { params }: { params: Promise<{ loadId: string }> }) {
  try {
    await connectMongo();
    const { loadId } = await params;

    if (!loadId) {
      return NextResponse.json({ error: 'loadId is required' }, { status: 400 });
    }

    // Get all tracking pings for this load, sorted chronologically
    const pings = await LsTracking.find({ loadId })
      .sort({ timestamp: 1 })
      .lean();

    // Also fetch events related to this load
    const events = await LsLoadEvent.find({ loadId })
      .sort({ timestamp: -1 })
      .lean();

    return NextResponse.json({ pings, events });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
