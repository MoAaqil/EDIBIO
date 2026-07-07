'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCustomerStore } from '@/lib/store/customer';
import { ShoppingBag, Store, MapPin, Phone, Mail, Award, ArrowLeft, Star, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export default function StoreDetailPage({ params }: StorePageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { addToCart } = useCustomerStore();

  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStoreAndProducts() {
      try {
        setLoading(true);
        // Fetch store details by slug
        const storeRes = await fetch(`/api/stores?slug=${slug}`);
        if (!storeRes.ok) throw new Error('Failed to load store');
        const storeData = await storeRes.json();
        
        if (!storeData || storeData.length === 0) {
          setError('Store not found.');
          setLoading(false);
          return;
        }

        const activeStore = storeData[0];
        setStore(activeStore);

        // Fetch products for this store
        const prodRes = await fetch(`/api/products?storeId=${activeStore._id}`);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData || []);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to query details.');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadStoreAndProducts();
    }
  }, [slug]);

  const handleQuickAdd = (p: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: p._id,
      storeId: store._id,
      name: p.name,
      image: p.image,
      price: p.price,
      mrp: p.mrp,
      stockQty: p.stockQty || 50,
      qty: 1,
      unit: p.unit || 'units'
    });
    toast.success(`${p.name} added to cart!`);
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={loaderStyle}></div>
          <p style={{ color: '#94a3b8', marginTop: '20px', fontFamily: "'Outfit', sans-serif" }}>Loading Store Catalog...</p>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div style={containerStyle}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px', maxWidth: '500px' }}>
          <div style={errorIconStyle}>⚠️</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#f87171', marginBottom: '12px', fontFamily: "'Outfit', sans-serif" }}>Store Offline</h2>
          <p style={{ color: '#94a3b8', marginBottom: '24px', lineHeight: '1.6' }}>{error || 'This store profile is currently unavailable or has been disconnected.'}</p>
          <Link href="/" style={backButtonStyle}>
            <ArrowLeft size={16} />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Banner & Header */}
      <div style={bannerStyle}>
        <div className="container" style={headerContainerStyle}>
          <Link href="/" style={backHeaderButtonStyle}>
            <ArrowLeft size={16} />
            <span>Back to Marketplace</span>
          </Link>

          <div style={storeHeaderCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={storeLogoStyle}>{store.logo || '🏪'}</div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h1 style={storeNameStyle}>{store.name}</h1>
                  {store.isVerified && (
                    <span style={badgeStyle} title="Verified Merchant Partner">
                      <Award size={12} />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                
                <p style={storeDescStyle}>{store.description}</p>

                <div style={metaRowStyle}>
                  <span style={ratingBadgeStyle}>
                    <Star size={12} fill="#fbbf24" color="#fbbf24" />
                    <span>{store.rating?.toFixed(1) || '5.0'}</span>
                  </span>
                  <span style={dividerStyle}>|</span>
                  <span style={metaItemStyle}>
                    <MapPin size={14} />
                    <span>{store.city}, {store.state}</span>
                  </span>
                  <span style={dividerStyle}>|</span>
                  <span style={metaItemStyle}>
                    <Phone size={14} />
                    <span>{store.phone}</span>
                  </span>
                  {store.email && (
                    <>
                      <span style={dividerStyle}>|</span>
                      <span style={metaItemStyle}>
                        <Mail size={14} />
                        <span>{store.email}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Catalog list */}
      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={catalogHeaderStyle}>
          <div>
            <h2 style={catalogTitleStyle}>Store Catalog</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Showing {products.length} active listings published from ERP system</p>
          </div>
          <div style={syncStatusStyle}>
            <span style={syncDotStyle}></span>
            <span>Real-time POS Linked</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>No Products Available</h3>
            <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '380px', margin: '0 auto' }}>
              This store hasn't published any items to their storefront catalog yet. Check back soon!
            </p>
          </div>
        ) : (
          <div style={productsGridStyle}>
            {products.map((p) => (
              <div key={p._id} style={productCardStyle} className="product-card">
                <Link href={`/product/${p._id}`}>
                  <div style={productImgWrapperStyle}>
                    <span style={productEmojiStyle}>{p.image || '📦'}</span>
                  </div>
                  <div style={productBodyStyle}>
                    <span style={categoryLabelStyle}>{p.category}</span>
                    <h3 style={productNameStyle}>{p.name}</h3>
                    {p.description && <p style={productDescStyle}>{p.description}</p>}
                    <div style={productPriceRowStyle}>
                      <div>
                        <span style={productPriceStyle}>{formatPrice(p.price)}</span>
                        {p.mrp > p.price && (
                          <span style={productMrpStyle}>{formatPrice(p.mrp)}</span>
                        )}
                        <span style={unitStyle}>/ {p.unit || 'pcs'}</span>
                      </div>
                      <button onClick={(e) => handleQuickAdd(p, e)} style={addCartButtonStyle}>
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
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
};

const bannerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
  padding: '30px 20px 40px 20px',
  color: 'white',
};

const headerContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const backHeaderButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: '#cbd5e1',
  fontSize: '14px',
  fontWeight: '600',
  width: 'fit-content',
};

const storeHeaderCardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  borderRadius: '24px',
  padding: '30px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const storeLogoStyle: React.CSSProperties = {
  width: '80px',
  height: '80px',
  borderRadius: '20px',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '40px',
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
};

const storeNameStyle: React.CSSProperties = {
  fontSize: '28px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#ffffff',
  lineHeight: '1.2',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: 'rgba(34, 197, 94, 0.2)',
  color: '#4ade80',
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: '700',
  border: '1px solid rgba(34, 197, 94, 0.3)',
};

const storeDescStyle: React.CSSProperties = {
  color: '#cbd5e1',
  fontSize: '14px',
  lineHeight: '1.5',
  marginBottom: '16px',
  maxWidth: '800px',
};

const metaRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
  fontSize: '13px',
  color: '#94a3b8',
};

const ratingBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: 'rgba(251, 191, 36, 0.15)',
  color: '#fbbf24',
  padding: '3px 8px',
  borderRadius: '6px',
  fontWeight: '700',
};

const metaItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const dividerStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.2)',
};

const catalogHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '30px',
  flexWrap: 'wrap',
  gap: '16px',
};

const catalogTitleStyle: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: '800',
  fontFamily: "'Outfit', sans-serif",
  color: '#0f172a',
};

const syncStatusStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#f1f5f9',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600',
  color: '#475569',
};

const syncDotStyle: React.CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#22c55e',
  animation: 'pulse 1.5s infinite ease-in-out',
};

const productsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '24px',
};

const productCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.02)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  border: '1px solid #f1f5f9',
};

const productImgWrapperStyle: React.CSSProperties = {
  height: '180px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '60px',
  borderBottom: '1px solid #f1f5f9',
};

const productEmojiStyle: React.CSSProperties = {
  transition: 'transform 0.3s',
};

const productBodyStyle: React.CSSProperties = {
  padding: '20px',
};

const categoryLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  fontWeight: '700',
  color: '#4f46e5',
  letterSpacing: '0.05em',
  display: 'block',
  marginBottom: '6px',
};

const productNameStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '6px',
  lineHeight: '1.3',
  fontFamily: "'Outfit', sans-serif",
};

const productDescStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '1.4',
  marginBottom: '16px',
  height: '36px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

const productPriceRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px',
};

const productPriceStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '800',
  color: '#0f172a',
};

const productMrpStyle: React.CSSProperties = {
  fontSize: '13px',
  textDecoration: 'line-through',
  color: '#94a3b8',
  marginLeft: '6px',
};

const unitStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginLeft: '4px',
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
  transition: 'background-color 0.2s',
  border: 'none',
};

const emptyStateStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '60px 20px',
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
  border: '1px solid #f1f5f9',
};

const loaderStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid #e2e8f0',
  borderTopColor: '#4f46e5',
  borderRadius: '50%',
  display: 'inline-block',
  animation: 'spin 1s linear infinite',
};

const errorIconStyle: React.CSSProperties = {
  fontSize: '48px',
  marginBottom: '20px',
};

const backButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#4f46e5',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '14px',
};
