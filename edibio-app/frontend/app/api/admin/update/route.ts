import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { UserData, CompanyData } from '@/lib/models';

export async function PATCH(req: Request) {
    try {
        const { userId, companyId, plan, expiry, aiApiKey, companyName, companyType, companyPhone, companyGst } = await req.json();

        if (!userId && !companyId) {
            return NextResponse.json({ error: 'userId or companyId is required' }, { status: 400 });
        }

        await dbConnect();

        if (companyId) {
            const updateData: any = { updatedAt: new Date().toISOString() };
            if (companyName) updateData.name = companyName;
            if (companyType) updateData.type = companyType;
            if (companyPhone !== undefined) updateData.phone = companyPhone;
            if (companyGst !== undefined) updateData.gstNumber = companyGst;

            const comp = await CompanyData.findByIdAndUpdate(companyId, { $set: updateData }, { new: true });
            
            if (userId) {
                await UserData.findByIdAndUpdate(userId, { $set: { updatedAt: new Date().toISOString() } });
            }
            return NextResponse.json({ success: true, company: comp });
        }

        const updateData: any = {
            updatedAt: new Date().toISOString()
        };

        if (plan) {
            updateData.subscriptionType = plan;
            updateData.plan = plan === 'free' ? 'expired_subscription' : plan;
        }

        if (expiry) {
            updateData.subscriptionExpiresAt = expiry;
        }

        if (aiApiKey !== undefined) {
            updateData.aiApiKey = aiApiKey;
        }

        // Update the user document in MongoDB
        const user = await UserData.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found in MongoDB' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        console.error('Admin Update Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
