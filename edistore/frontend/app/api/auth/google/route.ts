import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { EdistoreUserData } from '@/lib/db/models/User';

export async function POST(request: Request) {
  try {
    const { uid, email, name, photoUrl } = await request.json();
    if (!uid || !email || !name) {
      return NextResponse.json({ error: 'Missing required parameters (uid, email, name)' }, { status: 400 });
    }

    await dbConnect();
    
    // Check if user already exists in MongoDB under this Firebase UID
    let user = await EdistoreUserData.findOne({ _id: uid });
    
    if (!user) {
      // Check if a user with the same email already exists (e.g. from password registration)
      const existingEmailUser = await EdistoreUserData.findOne({ email: email.toLowerCase() });
      if (existingEmailUser) {
        // Mongoose doesn't allow direct _id changes since it is immutable.
        // We delete the old record and create a new record with the Google uid.
        const userObj = existingEmailUser.toObject();
        await EdistoreUserData.deleteOne({ _id: userObj._id });
        
        user = new EdistoreUserData({
          ...userObj,
          _id: uid,
          photoUrl: photoUrl || userObj.photoUrl || ''
        });
        await user.save();
      } else {
        // Create a new user record
        user = new EdistoreUserData({
          _id: uid,
          name,
          email: email.toLowerCase(),
          role: 'customer',
          photoUrl: photoUrl || '',
          addresses: [],
          wishlist: []
        });
        await user.save();
      }
    } else {
      // Update name or photoUrl if they have changed or were not set
      let updated = false;
      if (photoUrl && user.photoUrl !== photoUrl) {
        user.photoUrl = photoUrl;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    }

    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
