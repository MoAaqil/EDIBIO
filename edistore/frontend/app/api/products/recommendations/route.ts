import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { OrderData } from '@/lib/db/models/Order';
import { ProductData } from '@/lib/db/models/Product';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const recentIdsStr = searchParams.get('recentIds');

    await dbConnect();

    // Case 1: Recently Viewed Product details
    if (recentIdsStr) {
      const recentIds = recentIdsStr.split(',').filter(Boolean);
      const products = await ProductData.find({ _id: { $in: recentIds } });
      return NextResponse.json(products);
    }

    // Case 2: Frequently Bought Together
    if (productId) {
      // Find orders containing this product
      const matchingOrders = await OrderData.find({
        'items.productId': productId
      }).limit(50); // limit lookup size for speed

      const coOccurrenceMap: Record<string, number> = {};

      for (const order of matchingOrders) {
        for (const item of order.items) {
          if (item.productId !== productId) {
            coOccurrenceMap[item.productId] = (coOccurrenceMap[item.productId] || 0) + 1;
          }
        }
      }

      // Sort items by frequency count descending
      const sortedCoOccurrences = Object.entries(coOccurrenceMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(entry => entry[0]);

      let recommendations = [];
      if (sortedCoOccurrences.length > 0) {
        recommendations = await ProductData.find({ _id: { $in: sortedCoOccurrences } });
      }

      // Fallback: If we couldn't find enough co-occurring recommendations, backfill with same-category items
      if (recommendations.length < 4) {
        const targetProduct = await ProductData.findById(productId);
        if (targetProduct) {
          const backfill = await ProductData.find({
            category: targetProduct.category,
            _id: { $ne: productId, $asVal: sortedCoOccurrences }
          }).limit(4 - recommendations.length);
          recommendations = [...recommendations, ...backfill];
        }
      }

      // Final backfill: if still less than 4, get general popular products
      if (recommendations.length < 4) {
        const generalPopular = await ProductData.find({ _id: { $ne: productId } }).limit(4 - recommendations.length);
        recommendations = [...recommendations, ...generalPopular];
      }

      return NextResponse.json(recommendations.slice(0, 4));
    }

    return NextResponse.json({ error: 'Missing parameters. Provide productId or recentIds.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
