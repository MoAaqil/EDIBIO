import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsLoad } from '@/lib/logistics/models';

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId') || 'default';
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');

    const query: any = { companyId };
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { loadNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { pickupCity: { $regex: search, $options: 'i' } },
        { deliveryCity: { $regex: search, $options: 'i' } },
        { driverName: { $regex: search, $options: 'i' } },
      ];
    }

    const loads = await LsLoad.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ loads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { companyId = 'default', ...data } = body;

    // Auto-generate load number if not provided
    if (!data.loadNumber) {
      const count = await LsLoad.countDocuments({ companyId });
      data.loadNumber = `LS-${String(count + 1001).padStart(5, '0')}`;
    }

    const load = await LsLoad.create({ ...data, companyId });
    return NextResponse.json({ load }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
