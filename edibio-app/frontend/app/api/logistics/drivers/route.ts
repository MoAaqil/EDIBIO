import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsDriver } from '@/lib/logistics/models';

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId') || 'default';
    const status = searchParams.get('status');
    const query: any = { companyId };
    if (status) query.status = status;
    const drivers = await LsDriver.find(query).sort({ name: 1 }).lean();
    return NextResponse.json({ drivers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { companyId = 'default', ...data } = body;
    const driver = await LsDriver.create({ ...data, companyId });
    return NextResponse.json({ driver }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
