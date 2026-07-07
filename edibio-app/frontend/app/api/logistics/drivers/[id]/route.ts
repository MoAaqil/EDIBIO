import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsDriver } from '@/lib/logistics/models';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await params;
    const driver = await LsDriver.findById(id).lean();
    if (!driver) return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
    return NextResponse.json({ driver });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await params;
    const body = await req.json();
    const driver = await LsDriver.findByIdAndUpdate(id, body, { new: true }).lean();
    return NextResponse.json({ driver });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await params;
    await LsDriver.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
