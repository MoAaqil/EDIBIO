import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { UserData, CompanyData, PartyData, ProductData, InvoiceData, ExpenseData } from '@/lib/models';

export async function POST(req: Request) {
    try {
        const { action, userId, companyId } = await req.json();

        if (!userId || !action) {
            return NextResponse.json({ error: 'userId and action are required' }, { status: 400 });
        }

        await dbConnect();

        switch (action) {
            case 'WIPE_ACCOUNT':
                // Completely erase all data belonging to this user
                // 1. Get all companies of the user
                const companies = await CompanyData.find({ userId }).select('_id').lean();
                const companyIds = companies.map((c: any) => c._id);

                // 2. Delete all child data
                await Promise.all([
                    PartyData.deleteMany({ companyId: { $in: companyIds } }),
                    ProductData.deleteMany({ companyId: { $in: companyIds } }),
                    InvoiceData.deleteMany({ companyId: { $in: companyIds } }),
                    ExpenseData.deleteMany({ companyId: { $in: companyIds } }),
                    CompanyData.deleteMany({ userId })
                ]);

                // 3. Reset User object but keep the user identity
                await UserData.findByIdAndUpdate(userId, { 
                    $set: { 
                        updatedAt: new Date().toISOString() 
                    } 
                });

                return NextResponse.json({ message: 'Account wiped successfully' });

            case 'DELETE_COMPANY':
                if (!companyId) return NextResponse.json({ error: 'companyId required' }, { status: 400 });

                // Delete all data associated with this specific company
                await Promise.all([
                    PartyData.deleteMany({ companyId }),
                    ProductData.deleteMany({ companyId }),
                    InvoiceData.deleteMany({ companyId }),
                    ExpenseData.deleteMany({ companyId }),
                    CompanyData.findByIdAndDelete(companyId)
                ]);

                // Bump user version to trigger sync
                await UserData.findByIdAndUpdate(userId, { 
                    $set: { updatedAt: new Date().toISOString() } 
                });

                return NextResponse.json({ message: 'Company deleted successfully' });

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Admin Action Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
