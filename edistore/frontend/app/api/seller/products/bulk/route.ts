import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { ProductData } from '@/lib/db/models/Product';

// Simple CSV Parser Helper
function parseCSV(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  return lines.map(line => {
    // Basic CSV cell extraction (handles simple comma separation)
    const result: string[] = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    result.push(currentCell.trim());
    return result;
  });
}

// Bulk Product Import Handler
export async function POST(request: Request) {
  try {
    const { csvText, sellerId, storeId } = await request.json();

    if (!csvText || !sellerId || !storeId) {
      return NextResponse.json({ error: 'Missing csvText, sellerId, or storeId' }, { status: 400 });
    }

    await dbConnect();

    const rows = parseCSV(csvText);
    if (rows.length < 2) {
      return NextResponse.json({ error: 'CSV must contain at least a header row and one data row' }, { status: 400 });
    }

    const headers = rows[0].map(h => h.toLowerCase().replace(/['"]/g, ''));
    const importedProducts = [];

    // Map columns index
    const nameIdx = headers.indexOf('name');
    const descIdx = headers.indexOf('description');
    const categoryIdx = headers.indexOf('category');
    const brandIdx = headers.indexOf('brand');
    const priceIdx = headers.indexOf('price');
    const mrpIdx = headers.indexOf('mrp');
    const stockIdx = headers.indexOf('stock');
    const unitIdx = headers.indexOf('unit');

    if (nameIdx === -1 || priceIdx === -1 || mrpIdx === -1 || categoryIdx === -1) {
      return NextResponse.json({ 
        error: 'Missing required CSV headers. Must include: name, price, mrp, category' 
      }, { status: 400 });
    }

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < headers.length) continue; // skip incomplete rows

      const name = row[nameIdx];
      const description = descIdx !== -1 ? row[descIdx] : 'No description provided';
      const category = row[categoryIdx];
      const brand = brandIdx !== -1 ? row[brandIdx] : '';
      const price = Number(row[priceIdx] || 0);
      const mrp = Number(row[mrpIdx] || price);
      const stockQty = stockIdx !== -1 ? Number(row[stockIdx] || 0) : 10;
      const unit = unitIdx !== -1 ? row[unitIdx] : 'units';

      if (!name || price <= 0 || !category) continue; // skip invalid row data

      const productId = 'prod_' + Math.random().toString(36).slice(2);
      const productPayload = {
        _id: productId,
        storeId,
        sellerId,
        name,
        description,
        category,
        brand,
        price,
        mrp,
        stockQty,
        unit,
        isActive: true,
        isFeatured: false,
        variants: []
      };

      const product = new ProductData(productPayload);
      await product.save();
      importedProducts.push(product);
    }

    console.log(`[Bulk Import] Successfully parsed and imported ${importedProducts.length} products to store ${storeId}`);
    return NextResponse.json({ 
      success: true, 
      count: importedProducts.length, 
      products: importedProducts 
    }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
