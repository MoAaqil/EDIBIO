import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { EdistoreUserData } from '@/lib/db/models/User';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone } = await request.json();
    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: 'Please enter all required fields' }, { status: 400 });
    }

    await dbConnect();
    const existing = await EdistoreUserData.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Email address already registered' }, { status: 409 });
    }

    const newUser = new EdistoreUserData({
      _id: 'user_' + Math.random().toString(36).slice(2) + Date.now().toString(36),
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: 'customer',
      addresses: [],
      wishlist: []
    });

    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
