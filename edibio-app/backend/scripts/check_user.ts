import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/MONGODB_URI="?([^"\n\r]+)"?/);
        if (match) MONGODB_URI = match[1];
    }
}

const UserSchema = new mongoose.Schema({ _id: String }, { strict: false });
const UserData = mongoose.models.User || mongoose.model('User', UserSchema, 'users');

async function checkUser() {
    await mongoose.connect(MONGODB_URI!);
    const users = await UserData.find({});
    console.log('Total Users:', users.length);
    users.forEach(u => console.log(`- ${u._id} (${u.get('name')})`));
    process.exit(0);
}

checkUser();
