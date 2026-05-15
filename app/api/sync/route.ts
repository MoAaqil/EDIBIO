import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { UserData, CompanyData, PartyData, ProductData, InvoiceData, ExpenseData } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
         const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const role = searchParams.get('role');
        const reqCompanyId = searchParams.get('companyId');

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        await dbConnect();

        // Check if user exists
        const user = await UserData.findById(userId).lean();
        if (!user) {
            return NextResponse.json({
                payload: {
                    companies: [], parties: [], products: [], invoices: [], expenses: [],
                    agencyClients: [], agencyProjects: [], templates: [], hsnCache: [],
                    aiApiKey: '', aiUsageCount: 0, primarySwapCount: 0
                },
                updatedAt: 0,
                isNewUser: true
            }, { status: 200 });
        }

        // Fetch user's companies to get company IDs
        let companies = await CompanyData.find({ userId }).lean();
        let companyIds = companies.map((c: any) => c._id);

        if (role === 'staff' || role === 'manager') {
             if (!reqCompanyId) return NextResponse.json({ error: 'companyId required for team members' }, { status: 400 });
             
             // Check if they are in the team array (extra safety)
             const targetCompany = companies.find((c: any) => c._id === reqCompanyId);
             if (!targetCompany || !targetCompany.team?.some((t: any) => t.role === role)) {
                 return NextResponse.json({ error: 'Unauthorized company access' }, { status: 403 });
             }

             // Restrict to only the active company for this staff member
             companies = [targetCompany];
             companyIds = [reqCompanyId];
        }

        // Fetch all related data ONLY for the allowed companyIds
        const [parties, products, invoices, expenses] = await Promise.all([
            PartyData.find({ companyId: { $in: companyIds } }).lean(),
            ProductData.find({ companyId: { $in: companyIds } }).lean(),
            InvoiceData.find({ companyId: { $in: companyIds } }).lean(),
            ExpenseData.find({ companyId: { $in: companyIds } }).lean()
        ]);

        // Transform _id to id to match frontend Zustand expectations
        const formatDocs = (docs: any[]) => docs.map((d: any) => {
            const { _id, __v, ...rest } = d;
            return { id: _id, ...rest };
        });

        // The exact payload structure Zustand expects
        const payload: any = {
            companies: formatDocs(companies),
            parties: formatDocs(parties),
            products: formatDocs(products),
            invoices: formatDocs(invoices),
            expenses: formatDocs(expenses),
            // Stub empty for models not ported yet but requested by Zustand
            agencyClients: [],
            agencyProjects: [],
            templates: [],
            hsnCache: [],
            aiApiKey: '',
            aiUsageCount: 0,
            primarySwapCount: 0
        };

        // Staff members do not receive the owner's full User object with billing history etc
        if (role !== 'staff' && role !== 'manager') {
            payload.user = { ...user, uid: user._id, id: undefined, _id: undefined, __v: undefined };
        }

        // Get max updatedAt across all collections to serve as "cloudTime"
        let cloudTime = 0;
        const allDocs = [user, ...companies, ...parties, ...products, ...invoices, ...expenses];
        allDocs.forEach((d: any) => {
             if (d.updatedAt) {
                 const time = new Date(d.updatedAt).getTime();
                 if (time > cloudTime) cloudTime = time;
             }
        });

        return NextResponse.json({
            payload,
            updatedAt: cloudTime || Date.now()
        });
    } catch (error: any) {
        console.error('GET /api/sync error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId, role, companyId: reqCompanyId, payload, localTime } = await req.json();

        if (!userId || !payload) {
            return NextResponse.json({ error: 'Missing userId or payload' }, { status: 400 });
        }

        await dbConnect();

        // 1. Concurrency Check (Temporarily disabled for migration stability)
        /*
        const existingUser = await UserData.findById(userId).select('updatedAt').lean();
        if (existingUser && existingUser.updatedAt && localTime > 0) {
             const cloudTime = new Date(existingUser.updatedAt).getTime();
             if (cloudTime > localTime + 5000) { 
                 return NextResponse.json({ error: 'Conflict: Cloud is newer. Use Force Sync.' }, { status: 409 });
             }
        }
        */

        // 2. Perform Upserts efficiently
        const syncCollection = async (Model: any, items: any[], filter: any, optionalRefField?: { name: string, value: string }) => {
            const incomingIds = (items || []).map(item => item.id || item._id);
            
            // Delete items not in incoming payload but belonging to this scope
            await Model.deleteMany({ ...filter, _id: { $nin: incomingIds } });

            if (!items || items.length === 0) return;

            const ops = items.map(item => {
                const doc = { ...item };
                const docId = doc.id || doc._id;
                delete doc.id;
                delete doc._id;
                
                if (optionalRefField) {
                    doc[optionalRefField.name] = optionalRefField.value;
                }

                // Standardize updatedAt to ISO string for MongoDB
                if (doc.updatedAt && typeof doc.updatedAt === 'number') {
                    doc.updatedAt = new Date(doc.updatedAt).toISOString();
                }

                return {
                    updateOne: {
                        filter: { _id: docId },
                        update: { $set: doc },
                        upsert: true
                    }
                };
            });
            await Model.bulkWrite(ops);
        };

        let { user, companies, parties, products, invoices, expenses } = payload;
        const isStaff = role === 'staff' || role === 'manager';

        companies = companies || [];
        parties = parties || [];
        products = products || [];
        invoices = invoices || [];
        expenses = expenses || [];
        
        console.log(`[Sync] User: ${userId} (${role}), Companies: ${companies.length}`);
        if (companies.length > 0) {
            console.log(`[Sync] Company Names: ${companies.map((c: any) => c.name).join(', ')}`);
        }

        // Upsert User (only if Owner)
        if (!isStaff && user) {
            const userDoc = { ...user, _id: user.uid };
            delete userDoc.uid;
            delete userDoc.id;
            await UserData.findByIdAndUpdate(userId, { $set: userDoc }, { upsert: true });
        }

        // Sync child collections
        // For companies, a staff can only sync their assigned company. An owner syncs all their companies.
        const companyFilter = isStaff ? { _id: reqCompanyId, userId } : { userId };
        await syncCollection(CompanyData, companies, companyFilter, { name: 'userId', value: userId });

        // For other data, we filter by the allowed companyIds
        const allowedCompanyIds = isStaff ? [reqCompanyId] : companies.map((c: any) => c.id);
        const dataFilter = { companyId: { $in: allowedCompanyIds } };

        await syncCollection(PartyData, parties, dataFilter);
        await syncCollection(ProductData, products, dataFilter);
        await syncCollection(InvoiceData, invoices, dataFilter);
        await syncCollection(ExpenseData, expenses, dataFilter);

        return NextResponse.json({ success: true, updatedAt: Date.now() });

    } catch (error: any) {
        console.error('POST /api/sync error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
