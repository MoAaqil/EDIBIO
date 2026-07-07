'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCustomerStore } from '@/lib/store/customer';
import { ShoppingBag, Search, Store as StoreIcon } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Fallback Mock Data ────────────────────────────────────────────────────────
const ALL_MOCK_PRODUCTS = [
  { _id: 'p1', name: 'Organic Premium Basmati Rice', price: 145, mrp: 180, storeName: 'Raj Supermarket', storeId: 's1', category: 'grocery', image: '🌾', unit: 'kg' },
  { _id: 'p2', name: 'Wireless Bluetooth Headset v5.3', price: 1499, mrp: 2999, storeName: 'Elite Electronics', storeId: 's2', category: 'electronics', image: '🎧', unit: 'units' },
  { _id: 'p3', name: 'Classic Leather Casual Shoes', price: 899, mrp: 1499, storeName: 'Vogue Boutique', storeId: 's3', category: 'fashion', image: '👟', unit: 'pair' },
  { _id: 'p4', name: 'Cold Pressed Sunflower Oil 1L', price: 185, mrp: 220, storeName: 'Raj Supermarket', storeId: 's1', category: 'grocery', image: '🌻', unit: 'litre' },
];

const ALL_MOCK_STORES = [
  { _id: 's1', name: 'Raj Supermarket', slug: 'raj-supermarket', category: 'grocery', city: 'Bangalore', logo: '🛒', rating: 4.8 },
  { _id: 's2', name: 'Elite Electronics', slug: 'elite-electronics', category: 'electronics', city: 'Bangalore', logo: '💻', rating: 4.7 },
  { _id: 's3', name: 'Vogue Boutique', slug: 'vogue-boutique', category: 'fashion', city: 'Bangalore', logo: '👗', rating: 4.9 },
];

// ── Inner component that uses useSearchParams ─────────────────────────────────
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const filterType = searchParams.get('filter') || 'products';

  const { addToCart } = useCustomerStore();
  const [products, setProducts] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function doSearch() {
      setLoading(true);
      try {
        if (filterType === 'stores') {
          const res = await fetch(`/api/stores?q=${encodeURIComponent(query)}&category=${encodeURIComponent(categoryFilter)}`);
          const data = await res.json();
          if (data && data.length > 0) { setStores(data); setLoading(false); return; }
        } else {
          const res = await fetch(`/api/products?q=${encodeURIComponent(query)}&category=${encodeURIComponent(categoryFilter)}`);
          const data = await res.json();
          if (data && data.length > 0) { setProducts(data); setLoading(false); return; }
        }
      } catch (err) {
        console.warn('API error, falling back to mock search data');
      }

      // Fallback search filter on mock data
      if (filterType === 'stores') {
        const filtered = ALL_MOCK_STORES.filter(s => {
          const matchesQuery = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.city.toLowerCase().includes(query.toLowerCase());
          const matchesCat = !categoryFilter || s.category === categoryFilter;
          return matchesQuery && matchesCat;
        });
        setStores(filtered);
      } else {
        const filtered = ALL_MOCK_PRODUCTS.filter(p => {
          const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.storeName.toLowerCase().includes(query.toLowerCase());
          const matchesCat = !categoryFilter || p.category === categoryFilter;
          return matchesQuery && matchesCat;
        });
        setProducts(filtered);
      }
      setLoading(false);
    }
    doSearch();
  }, [query, categoryFilter, filterType]);

  const handleAdd = (p: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: p._id,
      storeId: p.storeId || 's1',
      name: p.name,
      image: p.image,
      price: p.price,
      mrp: p.mrp,
      stockQty: 50,
      qty: 1,
      unit: p.unit || 'units'
    });
    toast.success(`${p.name} added to cart!`);
  };

  return (
    <div className="container" style={searchPageWrapperStyle}>
      <div style={searchHeaderSectionStyle}>
        <h1 style={titleStyle}>
          {query ? `Search Results for "${query}"` : categoryFilter ? `Category: ${categoryFilter.toUpperCase()}` : 'Browse Catalog'}
        </h1>
        <div style={filterToggleStyle}>
          <Link href={`/search?q=${query}&category=${categoryFilter}&filter=products`} style={filterType === 'products' ? activeFilterLinkStyle : filterLinkStyle}>
            Products
          </Link>
          <Link href={`/search?q=${query}&category=${categoryFilter}&filter=stores`} style={filterType === 'stores' ? activeFilterLinkStyle : filterLinkStyle}>
            Stores
          </Link>
        </div>
      </div>

      {loading ? (
        <div style={centerStateStyle}>
          <div className="spinner"></div>
          <p style={{ marginTop: '16px', color: '#64748b' }}>Searching EdiStore catalog...</p>
        </div>
      ) : filterType === 'stores' ? (
        stores.length === 0 ? (
          <div style={centerStateStyle}>
            <StoreIcon size={64} color="#94a3b8" />
            <p style={{ marginTop: '16px', fontWeight: '600' }}>No stores matching your query found.</p>
          </div>
        ) : (
          <div style={storesGridStyle}>
            {stores.map((s) => (
              <Link key={s._id} href={`/store/${s.slug}`} style={storeCardStyle}>
                <div style={storeIconStyle}>{s.logo}</div>
                <div>
                  <h3 style={storeNameStyle}>{s.name}</h3>
                  <div style={storeMetaStyle}>
                    <span style={{ color: '#fbbf24' }}>★ {s.rating}</span>
                    <span>•</span>
                    <span>{s.city}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : products.length === 0 ? (
        <div style={centerStateStyle}>
          <Search size={64} color="#94a3b8" />
          <p style={{ marginTop: '16px', fontWeight: '600' }}>No products matching your search found.</p>
        </div>
      ) : (
        <div style={productsGridStyle}>
          {products.map((p) => (
            <div key={p._id} style={productCardStyle}>
              <Link href={`/product/${p._id}`}>
                <div style={productImgWrapperStyle}>
                  <span style={productEmojiStyle}>{p.image}</span>
                </div>
                <div style={productBodyStyle}>
                  <span style={productStoreLabelStyle}>{p.storeName}</span>
                  <h3 style={productNameStyle}>{p.name}</h3>
                  <div style={productPriceRowStyle}>
                    <div>
                      <span style={productPriceStyle}>{formatPrice(p.price)}</span>
                      <span style={productMrpStyle}>{formatPrice(p.mrp)}</span>
                    </div>
                    <button onClick={(e) => handleAdd(p, e)} style={addCartButtonStyle}>
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Outer Page Export — wraps in Suspense (required for useSearchParams) ──────
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: '80px 0' }}>
        <div className="spinner"></div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const searchPageWrapperStyle: React.CSSProperties = {
  paddingTop: '40px',
  paddingBottom: '80px',
  flex: 1,
};

const searchHeaderSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '20px',
  marginBottom: '32px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
};

const filterToggleStyle: React.CSSProperties = {
  display: 'flex',
  backgroundColor: '#f1f5f9',
  padding: '4px',
  borderRadius: '12px',
};

const filterLinkStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#64748b',
};

const activeFilterLinkStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '600',
  backgroundColor: '#ffffff',
  color: '#4f46e5',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
};

const centerStateStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 0',
  color: '#64748b',
};

const productsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: '24px',
};

const productCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
};

const productImgWrapperStyle: React.CSSProperties = {
  height: '180px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #f1f5f9',
};

const productEmojiStyle: React.CSSProperties = {
  fontSize: '64px',
};

const productBodyStyle: React.CSSProperties = {
  padding: '16px',
};

const productStoreLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#6366f1',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '6px',
};

const productNameStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '1.4',
  height: '40px',
  overflow: 'hidden',
  marginBottom: '12px',
};

const productPriceRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const productPriceStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '800',
  color: '#0f172a',
};

const productMrpStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#94a3b8',
  textDecoration: 'line-through',
  marginLeft: '8px',
};

const addCartButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: 'white',
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const storesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '24px',
};

const storeCardStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '16px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
};

const storeIconStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: '#f1f5f9',
  fontSize: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const storeNameStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '700',
  fontFamily: "'Outfit', sans-serif",
  color: '#0f172a',
};

const storeMetaStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  fontSize: '12px',
  color: '#64748b',
  marginTop: '4px',
};
