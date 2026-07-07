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


const CompanySchema = new mongoose.Schema({
    name: String,
    userId: String
}, { strict: false });

const CompanyData = mongoose.models.Company || mongoose.model('Company', CompanySchema, 'companies');

async function checkCompanies() {
    if (!MONGODB_URI) {
        console.error('MONGODB_URI is missing');
        process.exit(1);
    }
    try {
        await mongoose.connect(MONGODB_URI);
        const cos = await CompanyData.find({});
        console.log('Total companies in DB:', cos.length);
        cos.forEach((c, i) => {
            console.log(`${i+1}. ${c.get('name')} (id: ${c.get('_id')}, Owner: ${c.get('userId')})`);
        });
    } catch (err) {
        console.error('DB Check Error:', err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

checkCompanies();
