'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCT_CATEGORIES } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCustomerStore } from '@/lib/store/customer';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Fallback Fallback Products if DB has none ──────────────────────────────────
const FALLBACK_STORES = [
  { _id: 's1', name: 'Raj Supermarket', slug: 'raj-supermarket', category: 'grocery', city: 'Bangalore', logo: '🛒', rating: 4.8 },
  { _id: 's2', name: 'Elite Electronics', slug: 'elite-electronics', category: 'electronics', city: 'Bangalore', logo: '💻', rating: 4.7 },
  { _id: 's3', name: 'Vogue Boutique', slug: 'vogue-boutique', category: 'fashion', city: 'Bangalore', logo: '👗', rating: 4.9 },
];

const FALLBACK_PRODUCTS = [
  { _id: 'p1', name: 'Organic Premium Basmati Rice', price: 145, mrp: 180, storeName: 'Raj Supermarket', image: '🌾', rating: 4.8, category: 'grocery' },
  { _id: 'p2', name: 'Wireless Bluetooth Headset v5.3', price: 1499, mrp: 2999, storeName: 'Elite Electronics', image: '🎧', rating: 4.5, category: 'electronics' },
  { _id: 'p3', name: 'Classic Leather Casual Shoes', price: 899, mrp: 1499, storeName: 'Vogue Boutique', image: '👟', rating: 4.7, category: 'fashion' },
  { _id: 'p4', name: 'Cold Pressed Sunflower Oil 1L', price: 185, mrp: 220, storeName: 'Raj Supermarket', image: '🌻', rating: 4.6, category: 'grocery' },
];

export default function HomePage() {
  const { addToCart } = useCustomerStore();
  const [stores, setStores] = useState<any[]>(FALLBACK_STORES);
  const [products, setProducts] = useState<any[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Big Billion Electronic Deals",
      desc: "Min. 50% Off on Earphones, Smartwatches & Mobile Accessories.",
      tag: "MEGA SALE",
      color: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
      emoji: "⚡",
      link: "/search?category=electronics"
    },
    {
      title: "Fresh Harvest Supermarket",
      desc: "Delivered fresh from local markets in 2 Hours. Flat 20% Off.",
      tag: "DAILY STAPLES",
      color: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
      emoji: "🍎",
      link: "/search?category=grocery"
    },
    {
      title: "Summer Wardrobe Refresh",
      desc: "Latest Trends in Casual Wear, Shoes & Clothing. Up to 60% Off.",
      tag: "FASHION SPOTLIGHT",
      color: "linear-gradient(135deg, #581c87 0%, #a855f7 100%)",
      emoji: "👕",
      link: "/search?category=fashion"
    }
  ];

  // Auto scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Fetch real database records
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [resProducts, resStores] = await Promise.all([
          fetch('/api/products').then(r => r.json().catch(() => null)),
          fetch('/api/stores?active=true').then(r => r.json().catch(() => null))
        ]);
        if (resProducts && resProducts.length > 0) {
          setProducts(resProducts.slice(0, 8));
        }
        if (resStores && resStores.length > 0) {
          setStores(resStores.slice(0, 6));
        }
      } catch (err) {
        console.warn('Backend database offline or unlinked, showing local catalogue products');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleQuickAdd = (p: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: p._id,
      storeId: p.storeId || 's1',
      name: p.name,
      image: p.image || '📦',
      price: p.price,
      mrp: p.mrp || p.price,
      stockQty: 100,
      qty: 1,
      unit: p.unit || 'units'
    });
    toast.success(`${p.name} added to cart!`);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div style={homeWrapperStyle}>
      {/* ── 1. Top Categories Shortcut Row (Flipkart-Style) ── */}
      <section style={categoryBarSectionStyle}>
        <div className="container" style={categoryBarContainerStyle}>
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/search?category=${cat.id}`} style={categoryItemStyle} className="category-bar-item">
              <div style={categoryCircleStyle}>{cat.icon}</div>
              <span style={categoryNameTextStyle}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 2. Flipkart-Style Sliding Hero Banner Carousel ── */}
      <section style={{ padding: '12px 0 24px' }}>
        <div className="container">
          <div style={{ ...carouselSlideStyle, background: slides[currentSlide].color }}>
            <button onClick={prevSlide} style={carouselArrowLeftStyle} className="carousel-btn">
              <ChevronLeft size={24} />
            </button>

            <div style={carouselContentStyle}>
              <div style={carouselBadgeStyle}>{slides[currentSlide].tag}</div>
              <h1 style={carouselTitleStyle}>
                {slides[currentSlide].title} <span style={{ fontSize: '42px' }}>{slides[currentSlide].emoji}</span>
              </h1>
              <p style={carouselDescStyle}>{slides[currentSlide].desc}</p>
              <Link href={slides[currentSlide].link} className="btn btn-primary" style={carouselBuyButtonStyle}>
                <span>Shop This Deal</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <button onClick={nextSlide} style={carouselArrowRightStyle} className="carousel-btn">
              <ChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div style={indicatorContainerStyle}>
              {slides.map((_, idx) => (
                <span 
                  key={idx} 
                  onClick={() => setCurrentSlide(idx)}
                  style={indicatorDotStyle(idx === currentSlide)} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Features & Trust Metrics Row ── */}
      <section style={featuresSectionStyle}>
        <div className="container" style={featuresContainerStyle}>
          <div style={featureCardStyle}>
            <div style={featureIconWrapperStyle('#dbeafe')}>
              <Truck size={22} color="#2563eb" />
            </div>
            <div>
              <h4 style={featureTitleStyle}>Lightning Fast Delivery</h4>
              <p style={featureDescStyle}>Sourced and packed locally, delivered directly to your home.</p>
            </div>
          </div>

          <div style={featureCardStyle}>
            <div style={featureIconWrapperStyle('#d1fae5')}>
              <ShieldCheck size={22} color="#059669" />
            </div>
            <div>
              <h4 style={featureTitleStyle}>100% Secure Checkout</h4>
              <p style={featureDescStyle}>Secure settlements using UPI, Netbanking, or Cash on Delivery.</p>
            </div>
          </div>

          <div style={featureCardStyle}>
            <div style={featureIconWrapperStyle('#fef3c7')}>
              <Sparkles size={22} color="#d97706" />
            </div>
            <div>
              <h4 style={featureTitleStyle}>Verified Neighborhood Stores</h4>
              <p style={featureDescStyle}>Shop from trusted neighborhood merchants with genuine products.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Deals of the Day / Products Shelf ── */}
      <section style={sectionBgStyle}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>Deals of the Day 🔥</h2>
              <p style={sectionSubTextStyle}>Top offers from verified local merchants near you.</p>
            </div>
            <Link href="/search" style={seeAllLinkStyle}>See All Products</Link>
          </div>

          <div style={productsGridStyle}>
            {products.map((p) => {
              const discountPercent = p.mrp && p.mrp > p.price 
                ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
                : 0;

              return (
                <div key={p._id} style={productCardStyle} className="product-card">
                  <Link href={`/product/${p._id}`}>
                    <div style={productImgWrapperStyle}>
                      <span style={productEmojiStyle}>{p.image || '📦'}</span>
                      {discountPercent > 0 && (
                        <div style={discountTagStyle}>{discountPercent}% OFF</div>
                      )}
                    </div>
                    <div style={productBodyStyle}>
                      <span style={productStoreLabelStyle}>{p.storeName || 'Local Merchant'}</span>
                      <h3 style={productNameStyle}>{p.name}</h3>
                      
                      <div style={ratingRowStyle}>
                        <div style={ratingBadgeStyle}>
                          <span>{p.rating || '4.5'}</span>
                          <Star size={10} fill="white" color="white" />
                        </div>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>(Verified Store)</span>
                      </div>

                      <div style={productPriceRowStyle}>
                        <div>
                          <span style={productPriceStyle}>{formatPrice(p.price)}</span>
                          {p.mrp && p.mrp > p.price && (
                            <span style={productMrpStyle}>{formatPrice(p.mrp)}</span>
                          )}
                        </div>
                        <button onClick={(e) => handleQuickAdd(p, e)} style={addCartButtonStyle} className="btn-add-cart">
                          <ShoppingBag size={15} />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Trending Local Stores ── */}
      <section style={sectionStyle}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>Trending Local Stores 🏪</h2>
              <p style={sectionSubTextStyle}>Explore local storefront catalogs linked directly with billing POS ledger tables.</p>
            </div>
            <Link href="/search?filter=stores" style={seeAllLinkStyle}>All Stores</Link>
          </div>

          <div style={storesGridStyle}>
            {stores.map((s) => (
              <Link key={s._id} href={`/store/${s.slug}`} style={storeCardStyle} className="store-card">
                <div style={storeIconStyle}>{s.logo || '🏪'}</div>
                <div>
                  <h3 style={storeNameStyle}>{s.name}</h3>
                  <div style={storeMetaStyle}>
                    <span style={{ color: '#059669', fontWeight: 'bold' }}>★ {s.rating || '4.7'}</span>
                    <span>•</span>
                    <span style={{ textTransform: 'capitalize' }}>{s.category}</span>
                    <span>•</span>
                    <span>{s.city}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Styles & Responsive Tokens ──
const homeWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#f1f5f9',
};

const categoryBarSectionStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e2e8f0',
  padding: '16px 0',
  overflowX: 'auto',
};

const categoryBarContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  minWidth: '600px', // Prevents squeezing categories on small viewports
};

const categoryItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  flex: 1,
  textDecoration: 'none',
};

const categoryCircleStyle: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  transition: 'transform 0.2s',
};

const categoryNameTextStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#334155',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

// Carousel Banner
const carouselSlideStyle: React.CSSProperties = {
  position: 'relative',
  borderRadius: '24px',
  padding: '48px 64px',
  color: '#ffffff',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '260px',
  transition: 'background 0.5s ease-in-out',
};

const carouselArrowLeftStyle: React.CSSProperties = {
  position: 'absolute',
  left: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(4px)',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const carouselArrowRightStyle: React.CSSProperties = {
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(4px)',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const carouselContentStyle: React.CSSProperties = {
  maxWidth: '520px',
  textAlign: 'left',
};

const carouselBadgeStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  fontSize: '9px',
  fontWeight: '800',
  letterSpacing: '1px',
  padding: '4px 10px',
  borderRadius: '100px',
  width: 'fit-content',
  marginBottom: '16px',
};

const carouselTitleStyle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: '900',
  lineHeight: '1.2',
  marginBottom: '12px',
  fontFamily: "'Outfit', sans-serif",
};

const carouselDescStyle: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '24px',
};

const carouselBuyButtonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '14px',
  fontWeight: '700',
  backgroundColor: '#ffffff',
  color: '#0f172a',
  border: 'none',
  borderRadius: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
};

const indicatorContainerStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '8px',
};

const indicatorDotStyle = (active: boolean): React.CSSProperties => ({
  width: active ? '20px' : '8px',
  height: '8px',
  borderRadius: '4px',
  backgroundColor: active ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
});

// Features Row
const featuresSectionStyle: React.CSSProperties = {
  padding: '24px 0',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e2e8f0',
};

const featuresContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '24px',
  flexWrap: 'wrap',
};

const featureCardStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flex: 1,
  minWidth: '240px',
};

const featureIconWrapperStyle = (bg: string): React.CSSProperties => ({
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  backgroundColor: bg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const featureTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '2px',
};

const featureDescStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  lineHeight: '1.4',
};

// Section Wrappers
const sectionStyle: React.CSSProperties = {
  padding: '48px 0',
  backgroundColor: '#ffffff',
};

const sectionBgStyle: React.CSSProperties = {
  padding: '48px 0',
};

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  marginBottom: '28px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '22px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '900',
  color: '#0f172a',
};

const sectionSubTextStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginTop: '4px',
};

const seeAllLinkStyle: React.CSSProperties = {
  color: '#4f46e5',
  fontWeight: '700',
  fontSize: '13px',
  textDecoration: 'none',
};

// Grid Lists
const productsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '20px',
};

const productCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
  position: 'relative',
  textDecoration: 'none',
  color: 'inherit',
};

const productImgWrapperStyle: React.CSSProperties = {
  height: '160px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #f1f5f9',
  position: 'relative',
};

const productEmojiStyle: React.CSSProperties = {
  fontSize: '56px',
};

const discountTagStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  left: '12px',
  backgroundColor: '#34a853',
  color: '#ffffff',
  fontSize: '9px',
  fontWeight: '800',
  padding: '4px 8px',
  borderRadius: '6px',
};

const productBodyStyle: React.CSSProperties = {
  padding: '16px',
};

const productStoreLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: '700',
  color: '#4f46e5',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '4px',
};

const productNameStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '600',
  lineHeight: '1.4',
  color: '#1e293b',
  height: '36px',
  overflow: 'hidden',
  marginBottom: '8px',
};

const ratingRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
};

const ratingBadgeStyle: React.CSSProperties = {
  backgroundColor: '#34a853',
  color: '#ffffff',
  fontSize: '10px',
  fontWeight: '800',
  padding: '2px 6px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const productPriceRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const productPriceStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '800',
  color: '#0f172a',
};

const productMrpStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#94a3b8',
  textDecoration: 'line-through',
  marginLeft: '6px',
};

const addCartButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  border: 'none',
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const storesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '20px',
};

const storeCardStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '16px',
  textDecoration: 'none',
  color: 'inherit',
  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
};

const storeIconStyle: React.CSSProperties = {
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  backgroundColor: '#f1f5f9',
  fontSize: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const storeNameStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  fontFamily: "'Outfit', sans-serif",
  color: '#0f172a',
};

const storeMetaStyle: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
  fontSize: '11px',
  color: '#64748b',
  marginTop: '4px',
};
