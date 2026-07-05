import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { LsInvoice } from '@/lib/logistics/models';

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId') || 'default';
    const limit = parseInt(searchParams.get('limit') || '100');

    const invoices = await LsInvoice.find({ companyId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ invoices });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { companyId = 'default', ...data } = body;

    if (!data.loadId || !data.amount || !data.totalAmount) {
      return NextResponse.json({ error: 'Missing loadId, amount, or totalAmount' }, { status: 400 });
    }

    // Auto-generate invoice number if not provided
    if (!data.invoiceNumber) {
      const count = await LsInvoice.countDocuments({ companyId });
      data.invoiceNumber = `INV-LS-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    }

    const invoice = await LsInvoice.create({ ...data, companyId });
    return NextResponse.json({ invoice }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
