import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { EdistoreUserData } from '@/lib/db/models/User';
import { StoreData } from '@/lib/db/models/Store';
import { ProductData } from '@/lib/db/models/Product';
import { OrderData } from '@/lib/db/models/Order';
import { EdibioConnectionData } from '@/lib/db/models/EdibioConnection';

export async function POST(request: Request) {
  try {
    const { uid, email, name, photoUrl } = await request.json();
    if (!uid || !email) {
      return NextResponse.json({ error: 'Missing required parameters (uid, email)' }, { status: 400 });
    }

    await dbConnect();
    
    // Check if user already exists in MongoDB under this Google UID
    let user = await EdistoreUserData.findOne({ _id: uid });
    
    if (!user) {
      // Check if a seller user with the same email already exists (registered via email/password)
      const existingEmailUser = await EdistoreUserData.findOne({ email: email.toLowerCase(), role: 'seller' });
      if (existingEmailUser) {
        const oldUserId = existingEmailUser._id;
        const userObj = existingEmailUser.toObject();
        
        // Delete the old record (since _id is immutable in MongoDB)
        await EdistoreUserData.deleteOne({ _id: oldUserId });
        
        // Recreate the user with the new Google UID
        user = new EdistoreUserData({
          ...userObj,
          _id: uid,
          photoUrl: photoUrl || userObj.photoUrl || ''
        });
        await user.save();
        
        // Migrate all database records linked to the old seller ID
        await StoreData.updateMany({ sellerId: oldUserId }, { sellerId: uid });
        await ProductData.updateMany({ sellerId: oldUserId }, { sellerId: uid });
        await OrderData.updateMany({ sellerId: oldUserId }, { sellerId: uid });
        await EdibioConnectionData.updateMany({ sellerId: oldUserId }, { sellerId: uid });
        await EdibioConnectionData.updateMany({ edibioUserId: oldUserId }, { edibioUserId: uid });
        
      } else {
        return NextResponse.json({ error: 'No partner store registered under this email. Please request store approval first.' }, { status: 404 });
      }
    }

    // Load store details linked to this seller
    const store = await StoreData.findOne({ sellerId: user._id });
    
    return NextResponse.json({ user, store });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
