import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsVehicle } from '@/lib/logistics/models';

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId') || 'default';
    const status = searchParams.get('status');
    const query: any = { companyId };
    if (status) query.status = status;
    const vehicles = await LsVehicle.find(query).sort({ vehicleNumber: 1 }).lean();
    return NextResponse.json({ vehicles });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { companyId = 'default', ...data } = body;
    const vehicle = await LsVehicle.create({ ...data, companyId });
    return NextResponse.json({ vehicle }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
