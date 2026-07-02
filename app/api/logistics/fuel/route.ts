import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsFuel, LsVehicle } from '@/lib/logistics/models';

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId') || 'default';
    const limit = parseInt(searchParams.get('limit') || '100');

    const transactions = await LsFuel.find({ companyId })
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ transactions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { companyId = 'default', ...data } = body;

    if (!data.vehicleId || !data.liters || !data.pricePerLiter || !data.totalCost || !data.odometer) {
      return NextResponse.json({ error: 'Missing required fuel fields' }, { status: 400 });
    }

    const transaction = await LsFuel.create({ ...data, companyId });

    // Proactively update odometer in the corresponding vehicle
    await LsVehicle.findByIdAndUpdate(data.vehicleId, {
      $max: { odometerKm: data.odometer }
    });

    return NextResponse.json({ transaction }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
