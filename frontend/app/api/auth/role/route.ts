import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { CompanyData } from '@/lib/models';
import { UserData } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { licenseNo, email, password } = await req.json();

        if (!licenseNo || !email || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        await dbConnect();

        // Find the company by licenseNo
        const company = await CompanyData.findOne({ licenseNo }).lean();
        if (!company) {
            return NextResponse.json({ error: 'Invalid License No' }, { status: 404 });
        }

        // Check the team array inside the company document
        const teamMember = (company.team || []).find((t: any) => 
            (t.contact === email || t.name === email) && t.password === password
        );

        if (!teamMember) {
            return NextResponse.json({ error: 'Invalid Username or Password' }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            company,
            teamMember,
            ownerUid: company.userId
        });

    } catch (error: any) {
        console.error('Role Auth Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
