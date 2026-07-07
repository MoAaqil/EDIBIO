import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsLoad, LsLoadEvent } from '@/lib/logistics/models';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await params;
    const load = await LsLoad.findById(id).lean();
    if (!load) return NextResponse.json({ error: 'Load not found' }, { status: 404 });
    const events = await LsLoadEvent.find({ loadId: id }).sort({ timestamp: 1 }).lean();
    return NextResponse.json({ load, events });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await params;
    const body = await req.json();
    const load = await LsLoad.findByIdAndUpdate(id, { ...body, updatedAt: new Date().toISOString() }, { new: true }).lean();
    return NextResponse.json({ load });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await params;
    await LsLoad.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
