import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { EdistoreUserData } from '@/lib/db/models/User';
import { StoreData } from '@/lib/db/models/Store';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await dbConnect();
    const user = await EdistoreUserData.findOne({ email: email.toLowerCase(), password, role: 'seller' });
    if (!user) {
      return NextResponse.json({ error: 'Invalid partner email or password' }, { status: 401 });
    }

    const store = await StoreData.findOne({ sellerId: user._id });
    return NextResponse.json({ user, store });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
