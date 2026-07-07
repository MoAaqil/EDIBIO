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

const CompanySchema = new mongoose.Schema({ userId: String }, { strict: false });
const CompanyData = mongoose.models.Company || mongoose.model('Company', CompanySchema, 'companies');

async function wipe() {
    await mongoose.connect(MONGODB_URI!);
    const userId = 'rdXqQ8Wyc4NkQPH1BFI64xC7pV93';
    const res = await CompanyData.deleteMany({ userId });
    console.log('Deleted companies:', res.deletedCount);
    process.exit(0);
}

wipe();
