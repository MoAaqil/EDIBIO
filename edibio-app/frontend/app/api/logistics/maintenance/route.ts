import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsMaintenance } from '@/lib/logistics/models';

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId') || 'default';
    const limit = parseInt(searchParams.get('limit') || '100');

    const logs = await LsMaintenance.find({ companyId })
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ logs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { companyId = 'default', ...data } = body;

    if (!data.vehicleId || !data.type || !data.cost || !data.date) {
      return NextResponse.json({ error: 'Missing required maintenance fields' }, { status: 400 });
    }

    const log = await LsMaintenance.create({ ...data, companyId });
    return NextResponse.json({ log }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
