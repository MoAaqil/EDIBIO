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

const CompanySchema = new mongoose.Schema({}, { strict: false });
const CompanyData = mongoose.models.Company || mongoose.model('Company', CompanySchema, 'companies');

async function debug() {
    console.log('Using URI:', MONGODB_URI?.substring(0, 20) + '...');
    await mongoose.connect(MONGODB_URI!);
    const cos = await CompanyData.find({});
    console.log('Total documents:', cos.length);
    cos.forEach((c, i) => {
        console.log(`${i+1}. Name: "${c.get('name')}", User: "${c.get('userId')}"`);
    });
    process.exit(0);
}

debug();
