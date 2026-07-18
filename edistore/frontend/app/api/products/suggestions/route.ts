import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { ProductData } from '@/lib/db/models/Product';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json([]);
    }

    await dbConnect();

    // Find products matching name prefix or substring
    const suggestions = await ProductData.find({
      name: { $regex: '^' + query, $options: 'i' },
      isActive: true
    })
    .select('name category')
    .limit(10);

    // If prefix matches are less than 5, backfill with substring matches
    if (suggestions.length < 5) {
      const ids = suggestions.map(s => s._id);
      const substringMatches = await ProductData.find({
        name: { $regex: query, $options: 'i' },
        _id: { $notin: ids },
        isActive: true
      })
      .select('name category')
      .limit(10 - suggestions.length);
      
      return NextResponse.json([...suggestions, ...substringMatches]);
    }

    return NextResponse.json(suggestions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
