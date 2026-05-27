import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { UserData, CompanyData, InvoiceData } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();

        // Fetch all users
        const users = await UserData.find({}).lean();
        
        // Fetch all companies
        const companies = await CompanyData.find({}).lean();
        
        // Fetch invoice counts and totals per company
        // We'll aggregate to avoid massive data transfer
        const invoiceStats = await InvoiceData.aggregate([
            {
                $group: {
                    _id: '$companyId',
                    count: { $sum: 1 },
                    total: { $sum: '$grandTotal' }
                }
            }
        ]);

        const statsMap = new Map();
        invoiceStats.forEach(stat => {
            statsMap.set(stat._id, { count: stat.count, total: stat.total });
        });

        const usersMap = new Map(users.map((u: any) => [u._id, u]));
        const accounts = users.map((u: any) => {
            const userCompanies = companies.filter((c: any) => c.userId === u._id);
            return {
                docId: u._id,
                uid: u._id,
                email: u.email,
                name: u.name || 'Unknown',
                phone: u.phone || 'N/A',
                plan: u.subscriptionType || u.plan || 'free',
                planExpiry: u.subscriptionExpiresAt || null,
                updatedAt: u.updatedAt,
                aiApiKey: u.aiApiKey || '',
                companies: userCompanies.map((c: any) => ({
                    id: c._id,
                    name: c.name,
                    type: c.type,
                    invoices: statsMap.get(c._id)?.count || 0
                })),
                totalInvoices: userCompanies.reduce((acc, c) => acc + (statsMap.get(c._id)?.count || 0), 0),
                revenue: userCompanies.reduce((acc, c) => acc + (statsMap.get(c._id)?.total || 0), 0),
                rawUser: u
            };
        });

        const unlinkedCompanies = companies.filter((c: any) => !c.userId || !usersMap.has(c.userId));
        if (unlinkedCompanies.length > 0) {
            accounts.push({
                docId: 'unlinked_stores',
                uid: 'unlinked_stores',
                email: 'unlinked@edibio.app',
                name: 'Unlinked / Orphaned Stores',
                phone: 'N/A',
                plan: 'free',
                planExpiry: null,
                updatedAt: new Date().toISOString(),
                aiApiKey: '',
                companies: unlinkedCompanies.map((c: any) => ({
                    id: c._id,
                    name: c.name,
                    type: c.type,
                    invoices: statsMap.get(c._id)?.count || 0
                })),
                totalInvoices: unlinkedCompanies.reduce((acc, c) => acc + (statsMap.get(c._id)?.count || 0), 0),
                revenue: unlinkedCompanies.reduce((acc, c) => acc + (statsMap.get(c._id)?.total || 0), 0),
                rawUser: { _id: 'unlinked_stores', email: 'unlinked@edibio.app', name: 'Unlinked Stores' }
            });
        }

        return NextResponse.json({ accounts });
    } catch (error: any) {
        console.error('Admin Data Fetch Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
