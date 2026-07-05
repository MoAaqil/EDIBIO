import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { CompanyData } from '@/lib/models';

export const dynamic = 'force-dynamic';

// GET: Fetch delivery app orders for a company
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const companyId = searchParams.get('companyId');

        if (!companyId) {
            return NextResponse.json({ error: 'companyId is required' }, { status: 400 });
        }

        await dbConnect();

        const company = await CompanyData.findById(companyId).lean() as any;
        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }

        return NextResponse.json({ appOrders: company.appOrders || [] }, { status: 200 });
    } catch (error: any) {
        console.error('Webhook GET error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

// POST: Add a new delivery order (Webhook Endpoint for Swiggy/Zomato/Direct App)
export async function POST(req: Request) {
    try {
        const payload = await req.json();
        const { companyId, channel, customer, phone, address, items, total } = payload;

        // Basic validation
        if (!companyId || !channel || !customer || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'Missing required fields: companyId, channel, customer, and non-empty items array' }, { status: 400 });
        }

        await dbConnect();

        const company = await CompanyData.findById(companyId);
        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }

        // Calculate total if not provided
        const computedTotal = typeof total === 'number' 
            ? total 
            : items.reduce((sum: number, it: any) => sum + ((it.price || 0) * (it.qty || 1)), 0);

        const newOrder = {
            id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
            channel,
            customer,
            phone: phone || '',
            address: address || '',
            items: items.map((it: any) => ({
                name: it.name,
                qty: it.qty || 1,
                price: it.price || 0,
                notes: it.notes || ''
            })),
            total: computedTotal,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Push new order to MongoDB
        await CompanyData.updateOne(
            { _id: companyId },
            { $push: { appOrders: newOrder } }
        );

        return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
    } catch (error: any) {
        console.error('Webhook POST error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
