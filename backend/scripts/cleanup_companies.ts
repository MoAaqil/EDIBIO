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

const CompanySchema = new mongoose.Schema({ userId: String, name: String }, { strict: false });
const CompanyData = mongoose.models.Company || mongoose.model('Company', CompanySchema, 'companies');

async function cleanup() {
    await mongoose.connect(MONGODB_URI!);
    const userId = 'rdXqQ8Wyc4NkQPH1BFI64xC7pV93';
    
    // Find all companies for this user
    const cos = await CompanyData.find({ userId });
    console.log('Found companies:', cos.map(c => c.get('name')));
    
    // Delete all except SETBACK
    const toDelete = cos.filter(c => c.get('name') !== 'SETBACK');
    console.log('Deleting:', toDelete.map(c => c.get('name')));
    
    for (const c of toDelete) {
        await CompanyData.deleteOne({ _id: c._id });
    }
    
    console.log('Cleanup done.');
    process.exit(0);
}

cleanup();
