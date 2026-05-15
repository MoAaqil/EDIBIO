import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { UserData } from '@/lib/models';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            plan,
            amount,
            billingCycle,
            userId,
            simulated
        } = await req.json();

        if (!userId || !plan || !amount || !billingCycle) {
            return NextResponse.json({ error: 'Missing logic fields' }, { status: 400 });
        }

        await dbConnect();

        // If simulated, bypass signature check and perform the DB update
        if (!simulated) {
             const key_secret = process.env.RAZORPAY_KEY_SECRET;
             if (!key_secret) {
                  return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
             }

             const body = razorpay_order_id + '|' + razorpay_payment_id;
             const expectedSignature = crypto
                  .createHmac('sha256', key_secret)
                  .update(body.toString())
                  .digest('hex');

             if (expectedSignature !== razorpay_signature) {
                  console.error('[Verify] Signature mismatch! Expected:', expectedSignature, 'Got:', razorpay_signature);
                  return NextResponse.json({ error: 'Payment signature invalid. Please contact support.' }, { status: 400 });
             }
        }

        // Calculate new expiry date based on the plan
        const currentDate = new Date();
        const expiryDate = new Date();
        if (billingCycle === 'yearly') {
             expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        } else {
             expiryDate.setMonth(expiryDate.getMonth() + 1);
        }

        const newPayment = {
             plan,
             amount,
             date: currentDate.toISOString(),
             billingCycle,
             status: 'paid',
             id: razorpay_payment_id || `simulated_${Date.now()}`
        };

        // Securely update the User document in MongoDB.
        // upsert: true — creates the user document if they haven't synced to MongoDB yet
        // (e.g. they registered via Firebase Auth but haven't triggered a full data sync)
        const updatedUser = await UserData.findByIdAndUpdate(
             userId,
             {
                  $set: {
                       _id: userId,
                       subscriptionType: plan.toLowerCase(),
                       subscriptionExpiresAt: expiryDate.toISOString(),
                       trialExpiresAt: null,
                  },
                  $push: {
                       paymentHistory: {
                             $each: [newPayment],
                             $position: 0
                       }
                  }
             },
             { new: true, upsert: true, setDefaultsOnInsert: true }
        ).lean();

        if (!updatedUser) {
             return NextResponse.json({ error: 'Database error: could not update user' }, { status: 500 });
        }

        return NextResponse.json({
             success: true,
             message: 'Payment verified successfully and plan updated.',
             updatedUser
        });

    } catch (error: any) {
        console.error('Verify Payment Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
