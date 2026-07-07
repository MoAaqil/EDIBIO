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

async function wipeAll() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB.');
        
        if (!mongoose.connection.db) {
            throw new Error('Database connection not established.');
        }
        const collections = await mongoose.connection.db.collections();
        for (const collection of collections) {
            await collection.deleteMany({});
            console.log(`Cleared collection: ${collection.collectionName}`);
        }
        
        console.log('Database wiped completely.');
    } catch (e) {
        console.error('Error wiping database:', e);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

wipeAll();
