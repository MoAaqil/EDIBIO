import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { UserData } from '@/lib/models';

export async function PATCH(req: Request) {
    try {
        const { userId, plan, expiry, aiApiKey } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        await dbConnect();

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
