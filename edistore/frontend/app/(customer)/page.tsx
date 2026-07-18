'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { PRODUCT_CATEGORIES } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCustomerStore } from '@/lib/store/customer';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, ChevronLeft, ChevronRight, Star, Zap, Tag, Gift, Clock, TrendingUp, Store, Heart, BadgeCheck, RotateCcw, ShieldAlert, Laptop, Smartphone, Shirt, BookOpen, Dumbbell, Gamepad2, Car, Activity, Home, ArrowLeftRight, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Fallback Data ──────────────────────────────────────────────────────────
const FALLBACK_STORES = [
  { _id: 's1', name: 'Raj Supermarket', slug: 'raj-supermarket', category: 'grocery', city: 'Bangalore', logo: '🏪', rating: 4.8, productCount: 240, banner: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80)' },
  { _id: 's2', name: 'Elite Electronics', slug: 'elite-electronics', category: 'electronics', city: 'Bangalore', logo: '💻', rating: 4.7, productCount: 185, banner: 'url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80)' },
  { _id: 's3', name: 'Vogue Boutique', slug: 'vogue-boutique', category: 'fashion', city: 'Bangalore', logo: '👗', rating: 4.9, productCount: 320, banner: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=500&q=80)' },
  { _id: 's4', name: 'FreshMart Daily', slug: 'freshmart-daily', category: 'grocery', city: 'Hyderabad', logo: '🥬', rating: 4.6, productCount: 190, banner: 'url(https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=500&q=80)' },
  { _id: 's5', name: 'TechWorld Pro', slug: 'techworld-pro', category: 'electronics', city: 'Mumbai', logo: '📱', rating: 4.8, productCount: 420, banner: 'url(https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=500&q=80)' },
  { _id: 's6', name: 'HomeStyle Decor', slug: 'homestyle-decor', category: 'home_kitchen', city: 'Delhi', logo: '🏠', rating: 4.5, productCount: 150, banner: 'url(https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80)' },
];

const FALLBACK_PRODUCTS = [
  { _id: 'p1', name: 'Organic Premium Basmati Rice', price: 145, mrp: 180, storeName: 'Raj Supermarket', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', rating: 4.8, reviews: 1250, category: 'grocery', delivery: 'Tomorrow' },
  { _id: 'p2', name: 'Wireless Bluetooth Headset v5.3', price: 1499, mrp: 2999, storeName: 'Elite Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', rating: 4.5, reviews: 890, category: 'electronics', delivery: 'Today' },
  { _id: 'p3', name: 'Classic Leather Casual Shoes', price: 899, mrp: 1499, storeName: 'Vogue Boutique', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', rating: 4.7, reviews: 620, category: 'fashion', delivery: 'Tomorrow' },
  { _id: 'p4', name: 'Cold Pressed Sunflower Oil 1L', price: 185, mrp: 220, storeName: 'Raj Supermarket', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', rating: 4.6, reviews: 450, category: 'grocery', delivery: 'Today' },
  { _id: 'p5', name: 'Smart LED Desk Lamp Pro', price: 699, mrp: 1299, storeName: 'TechWorld Pro', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80', rating: 4.4, reviews: 310, category: 'electronics', delivery: 'Tomorrow' },
  { _id: 'p6', name: 'Ayurvedic Herbal Face Serum', price: 349, mrp: 599, storeName: 'NatureCraft', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80', rating: 4.9, reviews: 2100, category: 'health', delivery: 'Today' },
];

const TRENDING_PRODUCTS = [
  { _id: 't1', name: 'iPhone 15 Pro Case Ultra', price: 299, mrp: 699, storeName: 'TechWorld Pro', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80', rating: 4.8, reviews: 3400, category: 'electronics', delivery: 'Today' },
  { _id: 't2', name: 'Handwoven Cotton Saree', price: 1299, mrp: 2499, storeName: 'Vogue Boutique', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', rating: 4.9, reviews: 890, category: 'fashion', delivery: 'Tomorrow' },
  { _id: 't3', name: 'Stainless Steel Water Bottle', price: 399, mrp: 799, storeName: 'HomeStyle Decor', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80', rating: 4.6, reviews: 1580, category: 'home_kitchen', delivery: 'Today' },
  { _id: 't4', name: 'Organic Green Tea (100g)', price: 249, mrp: 399, storeName: 'FreshMart Daily', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80', rating: 4.7, reviews: 720, category: 'grocery', delivery: 'Today' },
  { _id: 't5', name: 'Yoga Mat Premium Anti-Slip', price: 799, mrp: 1499, storeName: 'SportZone', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80', rating: 4.8, reviews: 1210, category: 'sports', delivery: 'Tomorrow' },
];

const NEW_ARRIVALS = [
  { _id: 'n1', name: 'Bamboo Cutting Board Set', price: 549, mrp: 999, storeName: 'HomeStyle Decor', image: 'https://images.unsplash.com/photo-1594385208974-2e75f9d8a81a?auto=format&fit=crop&w=600&q=80', rating: 4.5, reviews: 45, category: 'home_kitchen', delivery: 'Tomorrow', isNew: true },
  { _id: 'n2', name: 'Vitamin C Brightening Cream', price: 449, mrp: 799, storeName: 'NatureCraft', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80', rating: 4.7, reviews: 28, category: 'health', delivery: 'Today', isNew: true },
  { _id: 'n3', name: 'Mechanical Gaming Keyboard', price: 2499, mrp: 3999, storeName: 'Elite Electronics', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80', rating: 4.6, reviews: 67, category: 'electronics', delivery: 'Tomorrow', isNew: true },
  { _id: 'n4', name: 'Denim Jogger Pants', price: 799, mrp: 1299, storeName: 'Vogue Boutique', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80', rating: 4.4, reviews: 52, category: 'fashion', delivery: 'Tomorrow', isNew: true },
  { _id: 'n5', name: 'Mango Pickle Premium', price: 189, mrp: 250, storeName: 'Raj Supermarket', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', rating: 4.8, reviews: 190, category: 'grocery', delivery: 'Today', isNew: true },
];

const RECENTLY_VIEWED = [
  { _id: 'p2', name: 'Wireless Bluetooth Headset v5.3', price: 1499, mrp: 2999, storeName: 'Elite Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', rating: 4.5, reviews: 890, category: 'electronics', delivery: 'Today' },
  { _id: 'p4', name: 'Cold Pressed Sunflower Oil 1L', price: 185, mrp: 220, storeName: 'Raj Supermarket', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', rating: 4.6, reviews: 450, category: 'grocery', delivery: 'Today' },
];

const CONTINUE_SHOPPING = [
  { _id: 'p1', name: 'Organic Premium Basmati Rice', price: 145, mrp: 180, storeName: 'Raj Supermarket', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', rating: 4.8, reviews: 1250, category: 'grocery', progress: 65 },
  { _id: 'p3', name: 'Classic Leather Casual Shoes', price: 899, mrp: 1499, storeName: 'Vogue Boutique', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', rating: 4.7, reviews: 620, category: 'fashion', progress: 30 },
];

const BRAND_LOGOS = [
  { name: 'Apple', color: '#000000', text: '' },
  { name: 'Samsung', color: '#074ca3', text: 'SAMSUNG' },
  { name: 'Sony', color: '#000000', text: 'SONY' },
  { name: 'Nike', color: '#111111', text: 'NIKE' },
  { name: 'Adidas', color: '#000000', text: 'adidas' },
  { name: 'Puma', color: '#000000', text: 'PUMA' },
  { name: 'Boat', color: '#ff0000', text: 'boAt' },
  { name: 'Dell', color: '#007dbd', text: 'DELL' },
];

function getCategoryIllustration(id: string) {
  const size = 18;
  switch (id) {
    case 'grocery':      return <ShoppingBag size={size} color="#34A853" />;
    case 'electronics':  return <Laptop size={size} color="#4285F4" />;
    case 'mobile':       return <Smartphone size={size} color="#4285F4" />;
    case 'fashion':      return <Shirt size={size} color="#EA4335" />;
    case 'beauty':       return <Sparkles size={size} color="#a855f7" />;
    case 'home_kitchen': return <Home size={size} color="#f97316" />;
    case 'books':        return <BookOpen size={size} color="#0284c7" />;
    case 'sports':       return <Dumbbell size={size} color="#dc2626" />;
    case 'toys':         return <Gamepad2 size={size} color="#ec4899" />;
    case 'automotive':   return <Car size={size} color="#475569" />;
    case 'health':       return <Activity size={size} color="#059669" />;
    default:             return <span>📦</span>;
  }
}

function useCountdown(targetHours = 8) {
  const end = useRef(Date.now() + targetHours * 3600 * 1000);
  const [timeLeft, setTimeLeft] = useState({ h: targetHours, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, end.current - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

// ── Denser Product Card for Mobile ──
function ProductCard({ p, onAddToCart }: { p: any; onAddToCart: (p: any, e: React.MouseEvent) => void }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useCustomerStore();
  const isWishlisted = wishlist.some((item) => item.productId === p._id);

  const discountPercent = p.mrp && p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  const ediPointsEarned = Math.round(p.price * 0.02);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(p._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({ productId: p._id, storeId: p.storeId || 's1', name: p.name, price: p.price, image: p.image || '📦' });
      toast.success('Added to wishlist', { icon: '❤️' });
    }
  };

  return (
    <div style={productCardStyle} className="product-card">
      <div style={cardTopRowStyle}>
        {discountPercent > 0 ? (
          <span style={discountTagStyle}>{discountPercent}% OFF</span>
        ) : <span />}
        <button onClick={handleWishlistToggle} style={wishlistOverlayStyle} title="Wishlist">
          <Heart size={14} color="#ef4444" fill={isWishlisted ? "#ef4444" : "none"} />
        </button>
      </div>

      <Link href={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div style={productImgWrapperStyle}>
          {p.image?.startsWith('http') ? (
            <img src={p.image} alt={p.name} style={productImgTagStyle} />
          ) : (
            <span style={productEmojiStyle}>{p.image || '📦'}</span>
          )}
          {p.isNew && <div style={newTagStyle}>NEW</div>}
        </div>

        <div style={productBodyStyle}>
          {/* Stars & Rating */}
          <div style={ratingRowStyle}>
            <div style={{ display: 'flex', gap: '0.5px', color: '#FBBC04' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={9} fill={i < Math.floor(p.rating || 4.5) ? "#FBBC04" : "none"} color="#FBBC04" />
              ))}
            </div>
            <span style={reviewCountStyle}>{p.rating || '4.5'}</span>
          </div>

          <h3 style={productNameStyle}>{p.name}</h3>
          <span style={productStoreLabelStyle}>Seller: {p.storeName}</span>

          <div style={productPriceRowStyle}>
            <span style={productPriceStyle}>{formatPrice(p.price)}</span>
            {p.mrp && p.mrp > p.price && (
              <span style={productMrpStyle}>{formatPrice(p.mrp)}</span>
            )}
          </div>

          <div style={deliveryRowStyle}>
            <span style={deliveryTextStyle}>Free Delivery {p.delivery || 'Tomorrow'}</span>
          </div>

          <div style={pointsRowStyle}>
            <span>Earn ⭐{ediPointsEarned} Edi Points</span>
          </div>
        </div>
      </Link>

      <div style={cardActionsStyle}>
        <button onClick={(e) => onAddToCart(p, e)} style={addCartBtnStyle}>🛒 Add</button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { addToCart } = useCustomerStore();
  const [stores, setStores] = useState<any[]>(FALLBACK_STORES);
  const [products, setProducts] = useState<any[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timer = useCountdown(8);

  const slides = [
    { title: "Big Billion Electronic Deals", desc: "Min. 50% Off on Earphones, Accessories & Gadgets.", tag: "MEGA SALE", image: "/images/banners/banner_electronics.jpg", link: "/search?category=electronics" },
    { title: "Fresh Harvest Supermarket", desc: "Delivered fresh from local markets in 2 Hours. Flat 20% Off.", tag: "DAILY STAPLES", image: "/images/banners/banner_grocery.jpg", link: "/search?category=grocery" },
    { title: "Summer Wardrobe Refresh", desc: "Latest Trends in Casual Wear & Shoes. Up to 60% Off.", tag: "FASHION SPOTLIGHT", image: "/images/banners/banner_fashion.jpg", link: "/search?category=fashion" },
  ];

  // Tiny icons in offer cards to reinforce details
  const offerCards = [
    { icon: <Zap size={16} color="#f59e0b" />, title: "⚡ Flash Sale", desc: "Up to 80% off ends midnight", bg: "#fef3c7", border: "#fde68a", color: "#92400e", link: "/search?category=electronics" },
    { icon: <Tag size={16} color="#10b981" />, title: "🎟 Coupon", desc: "Use SAVE20 for extra ₹200 off", bg: "#d1fae5", border: "#a7f3d0", color: "#065f46", link: "/search" },
    { icon: <Gift size={16} color="#8b5cf6" />, title: "🎁 New User Offer", desc: "First order: Flat 15% off", bg: "#ede9fe", border: "#ddd6fe", color: "#5b21b6", link: "/login" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [resProducts, resStores] = await Promise.all([
          fetch('/api/products').then(r => r.json().catch(() => null)),
          fetch('/api/stores?active=true').then(r => r.json().catch(() => null)),
        ]);
        if (resProducts && resProducts.length > 0) setProducts(resProducts.slice(0, 8));
        if (resStores && resStores.length > 0) setStores(resStores.slice(0, 6));
      } catch {
        // fallback set
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleQuickAdd = (p: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ productId: p._id, storeId: p.storeId || 's1', name: p.name, image: p.image || '📦', price: p.price, mrp: p.mrp || p.price, stockQty: 100, qty: 1, unit: p.unit || 'units' });
    toast.success(`Added to cart!`);
  };

  const nextSlide = () => setCurrentSlide(p => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + slides.length) % slides.length);

  return (
    <div style={homeWrapperStyle}>

      {/* ── 1. Category Row (Horizontal Scroll with snap and edge fades) ── */}
      <section style={categoryBarSectionStyle} className="category-scroll-container">
        <div style={categoryBarContainerStyle}>
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/search?category=${cat.id}`} style={categoryItemStyle} className="category-bar-item">
              <div style={categorySquareStyle} className="category-card">
                {getCategoryIllustration(cat.id)}
              </div>
              <span style={categoryNameTextStyle}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 2. Shorter Hero Banner with Black Gradient Overlay ── */}
      <section style={{ padding: '12px 0 0' }}>
        <div className="container">
          <div style={heroRowStyle}>
            <div style={{ ...carouselSlideStyle, backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.1) 100%), url(${slides[currentSlide].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <button onClick={prevSlide} style={carouselArrowStyle('left')} className="carousel-btn"><ChevronLeft size={16} /></button>
              
              <div style={carouselContentStyle}>
                <div style={carouselBadgeStyle}>{slides[currentSlide].tag}</div>
                <h1 style={carouselTitleStyle}>{slides[currentSlide].title}</h1>
                <p style={carouselDescStyle}>{slides[currentSlide].desc}</p>
                <Link href={slides[currentSlide].link} style={carouselBuyButtonStyle}>
                  Shop Now →
                </Link>
              </div>

              <button onClick={nextSlide} style={carouselArrowStyle('right')} className="carousel-btn"><ChevronRight size={16} /></button>
              <div style={indicatorContainerStyle}>
                {slides.map((_, idx) => (<span key={idx} onClick={() => setCurrentSlide(idx)} style={indicatorDotStyle(idx === currentSlide)} />))}
              </div>
            </div>

            {/* Side offer cards (hidden on small mobile screens automatically via CSS) */}
            <div style={offerCardsColumnStyle} className="offer-cards-column">
              {offerCards.map((card, idx) => (
                <Link key={idx} href={card.link} style={{ ...offerCardStyle, backgroundColor: card.bg, border: `1px solid ${card.border}`, textDecoration: 'none' }}>
                  <div style={offerIconStyle}>{card.icon}</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: card.color, fontFamily: "'Outfit', sans-serif" }}>{card.title}</div>
                    <div style={{ fontSize: '10px', color: card.color, opacity: 0.8, marginTop: '2px' }}>{card.desc}</div>
                  </div>
                  <ArrowRight size={12} color={card.color} style={{ marginLeft: 'auto', flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Trust Badges (Premium Circular Backgrounds) ── */}
      <section style={trustIndicatorsRowStyle}>
        <div className="container" style={trustRowInnerStyle}>
          <div style={trustBadgeCardStyle}><span style={badgeCircleStyle}>🛡️</span> Secure Payments</div>
          <div style={trustBadgeCardStyle}><span style={badgeCircleStyle}>↩️</span> Easy Returns</div>
          <div style={trustBadgeCardStyle}><span style={badgeCircleStyle}>✔</span> Verified Sellers</div>
          <div style={trustBadgeCardStyle}><span style={badgeCircleStyle}>📦</span> Genuine Products</div>
        </div>
      </section>

      {/* ── 4. 🔥 Flash Deals (Scarcity countdown + Carousel layout on mobile) ── */}
      <section style={sectionBgStyle}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={sectionTitleStyle}>🔥 Flash Deals</h2>
              <div style={timerBoxStyle}>
                <Clock size={12} color="#ef4444" />
                <span style={timerSegStyle}>{String(timer.h).padStart(2, '0')}</span>
                <span style={timerSepStyle}>:</span>
                <span style={timerSegStyle}>{String(timer.m).padStart(2, '0')}</span>
                <span style={timerSepStyle}>:</span>
                <span style={timerSegStyle}>{String(timer.s).padStart(2, '0')}</span>
              </div>
              <span style={scarcityBadgeStyle}>⚡ 23 left</span>
              <span style={sellingFastTextStyle}>Selling Fast</span>
            </div>
            <Link href="/search" style={seeAllLinkStyle}>See All →</Link>
          </div>
          {/* Horizontal scroll layout on mobile, grid on desktop */}
          <div className="products-horizontal-shelf" style={productsShelfStyle}>
            {(products.length > 0 ? products : FALLBACK_PRODUCTS).slice(0, 6).map((p) => (
              <div key={p._id} style={{ minWidth: '150px', flexShrink: 0 }}>
                <ProductCard p={p} onAddToCart={handleQuickAdd} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. 🛍 Recommended for You (Horizontal shelf) ── */}
      <section style={{ ...sectionStyle, borderTop: '8px solid #f1f5f9' }}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>🛍 Recommended</h2>
              <p style={sectionSubTextStyle}>Personalized recommendations based on preferences.</p>
            </div>
            <Link href="/search" style={seeAllLinkStyle}>View All →</Link>
          </div>
          <div className="products-horizontal-shelf" style={productsShelfStyle}>
            {TRENDING_PRODUCTS.map((p) => (
              <div key={p._id} style={{ minWidth: '150px', flexShrink: 0 }}>
                <ProductCard p={p} onAddToCart={handleQuickAdd} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ⭐ Top Rated (Horizontal shelf) ── */}
      <section style={{ ...sectionBgStyle, borderTop: '8px solid #f1f5f9' }}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>⭐ Top Rated</h2>
              <p style={sectionSubTextStyle}>Highest rated items by verified neighborhood buyers.</p>
            </div>
            <Link href="/search" style={seeAllLinkStyle}>View All →</Link>
          </div>
          <div className="products-horizontal-shelf" style={productsShelfStyle}>
            {[...FALLBACK_PRODUCTS].sort((a,b) => b.rating - a.rating).slice(0, 6).map((p) => (
              <div key={p._id} style={{ minWidth: '150px', flexShrink: 0 }}>
                <ProductCard p={p} onAddToCart={handleQuickAdd} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. 🆕 New Arrivals (Horizontal shelf) ── */}
      <section style={{ ...sectionStyle, borderTop: '8px solid #f1f5f9' }}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>🆕 New Arrivals</h2>
              <p style={sectionSubTextStyle}>Fresh catalog arrivals straight from neighborhood stores.</p>
            </div>
            <Link href="/search" style={seeAllLinkStyle}>View All →</Link>
          </div>
          <div className="products-horizontal-shelf" style={productsShelfStyle}>
            {NEW_ARRIVALS.map((p) => (
              <div key={p._id} style={{ minWidth: '150px', flexShrink: 0 }}>
                <ProductCard p={p} onAddToCart={handleQuickAdd} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. 📍 Nearby Stores ── */}
      <section style={{ ...sectionBgStyle, borderTop: '8px solid #f1f5f9' }}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>📍 Nearby Neighborhood Stores</h2>
              <p style={sectionSubTextStyle}>Sellers within 5 km delivering directly to you.</p>
            </div>
            <Link href="/search?filter=stores" style={seeAllLinkStyle}>All Near Me →</Link>
          </div>
          <div style={storesGridStyle}>
            {stores.slice(0, 3).map((s) => (
              <Link key={s._id} href={`/store/${s.slug}`} style={richStoreCardStyle} className="store-card">
                <div style={{ ...storeCardBannerStyle, backgroundImage: s.banner, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <span style={{ fontSize: '26px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.logo || '🏪'}</span>
                </div>
                <div style={storeCardBodyStyle}>
                  <h3 style={storeNameStyle}>{s.name}</h3>
                  <div style={storeMetaRowStyle}>
                    <span style={storeRatingStyle}>★ {s.rating || '4.7'}</span>
                    <span style={storeCategoryBadgeStyle}>{s.category}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: '600' }}>
                    📍 2.3 km Away &nbsp;·&nbsp; {s.productCount || 150} Products Available &nbsp;·&nbsp; <span style={{ color: '#10b981' }}>Open Now</span>
                  </div>
                  <div style={visitStoreBtnStyle}>Visit Storefront →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. 📦 Recently Viewed Products (Horizontal shelf) ── */}
      <section style={{ ...sectionStyle, borderTop: '8px solid #f1f5f9' }}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>📦 Recently Viewed Products</h2>
            </div>
          </div>
          <div className="products-horizontal-shelf" style={productsShelfStyle}>
            {RECENTLY_VIEWED.map((p) => (
              <div key={p._id} style={{ minWidth: '150px', flexShrink: 0 }}>
                <ProductCard p={p} onAddToCart={handleQuickAdd} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. 🕒 Continue Shopping (Horizontal shelf) ── */}
      <section style={{ ...sectionBgStyle, borderTop: '8px solid #f1f5f9' }}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>🕒 Continue Shopping</h2>
            </div>
          </div>
          <div className="products-horizontal-shelf" style={productsShelfStyle}>
            {CONTINUE_SHOPPING.map((p: any) => (
              <div key={p._id} style={{ minWidth: '150px', flexShrink: 0 }}>
                <div style={productCardStyle} className="product-card">
                  <Link href={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={productImgWrapperStyle}>
                      {p.image?.startsWith('http') ? (
                        <img src={p.image} alt={p.name} style={productImgTagStyle} />
                      ) : (
                        <span style={productEmojiStyle}>{p.image || '📦'}</span>
                      )}
                      <div style={progressOverlayContainerStyle}>
                        <div style={progressOverlayLabelStyle}>{p.progress}% viewed</div>
                        <div style={{ ...progressOverlayBarStyle, width: `${p.progress}%` }}></div>
                      </div>
                    </div>
                    <div style={productBodyStyle}>
                      <h3 style={productNameStyle}>{p.name}</h3>
                      <span style={{ ...productPriceStyle, display: 'block', marginTop: '6px' }}>{formatPrice(p.price)}</span>
                    </div>
                  </Link>
                  <div style={{ padding: '10px 14px', borderTop: '1px solid #f1f5f9' }}>
                    <Link href={`/product/${p._id}`} style={{ ...buyNowBtnStyle, display: 'block' }}>Resume Catalog</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Shop By Brand (Illustrative Logos Grid) ── */}
      <section style={{ ...sectionStyle, borderTop: '8px solid #f1f5f9' }}>
        <div className="container">
          <h2 style={{ ...sectionTitleStyle, marginBottom: '24px' }}>🏆 Shop by Popular Brands</h2>
          <div style={brandGridContainerStyle}>
            {BRAND_LOGOS.map((b) => (
              <div key={b.name} style={{ ...brandLogoCardStyle, borderTop: `4px solid ${b.color}` }}>
                <span style={brandLogoTextStyle}>{b.text}</span>
                <span style={brandNameLabelStyle}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Edi Points Loyalty Promotion ── */}
      <section style={pointsBannerStyle}>
        <div className="container" style={pointsBannerInnerStyle}>
          <div>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>⭐</div>
            <h2 style={{ fontSize: '22px', fontWeight: '900', fontFamily: "'Outfit', sans-serif", marginBottom: '8px' }}>Earn Edi Points on Every Order</h2>
            <p style={{ fontSize: '14px', opacity: 0.85, maxWidth: '480px', lineHeight: '1.5' }}>
              1 Edi Point = ₹1 off. Earn points automatically on every purchase and redeem them on your next order — no expiry, no minimum.
            </p>
          </div>
          <Link href="/login" style={pointsBannerBtnStyle}>Join EdiStore Free →</Link>
        </div>
      </section>

    </div>
  );
}

// ══════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════

const homeWrapperStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#f1f5f9' };

// Category Bar
const categoryBarSectionStyle: React.CSSProperties = { backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 0', overflowX: 'auto' };
const categoryBarContainerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'flex-start', gap: '16px', padding: '0 16px' };
const categoryItemStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textDecoration: 'none', cursor: 'pointer', flexShrink: 0 };
const categorySquareStyle: React.CSSProperties = { width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', cursor: 'pointer' };
const categoryNameTextStyle: React.CSSProperties = { fontSize: '10px', fontWeight: '700', color: '#334155', textAlign: 'center', whiteSpace: 'nowrap' };

// Hero (Shorter responsive design with copy space)
const heroRowStyle: React.CSSProperties = { display: 'flex', gap: '16px', alignItems: 'stretch' };
const carouselSlideStyle: React.CSSProperties = { position: 'relative', borderRadius: '16px', padding: '24px 32px', color: '#ffffff', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minHeight: '170px', transition: 'background 0.5s ease-in-out' };
const carouselArrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({ position: 'absolute', [side]: '8px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(2px)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.7 });
const carouselContentStyle: React.CSSProperties = { maxWidth: '65%' };
const carouselBadgeStyle: React.CSSProperties = { backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '8px', fontWeight: '800', letterSpacing: '0.8px', padding: '2px 8px', borderRadius: '100px', width: 'fit-content', marginBottom: '8px' };
const carouselTitleStyle: React.CSSProperties = { fontSize: '20px', fontWeight: '900', lineHeight: '1.2', marginBottom: '6px', fontFamily: "'Outfit', sans-serif", color: '#ffffff' };
const carouselDescStyle: React.CSSProperties = { fontSize: '11px', lineHeight: '1.4', color: 'rgba(255,255,255,0.9)', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' };
const carouselBuyButtonStyle: React.CSSProperties = { padding: '8px 18px', fontSize: '11px', fontWeight: '700', backgroundColor: '#ffffff', color: '#0f172a', border: 'none', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', width: 'fit-content', whiteSpace: 'nowrap' };
const indicatorContainerStyle: React.CSSProperties = { position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' };
const indicatorDotStyle = (active: boolean): React.CSSProperties => ({ width: active ? '12px' : '4px', height: '4px', borderRadius: '2px', backgroundColor: active ? '#ffffff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s ease' });

const offerCardsColumnStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px', width: '220px', flexShrink: 0 };
const offerCardStyle: React.CSSProperties = { borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flex: 1, cursor: 'pointer', transition: 'transform 0.2s' };
const offerIconStyle: React.CSSProperties = { width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };

// Trust Badge Circular Styles
const trustIndicatorsRowStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '10px 0',
  borderBottom: '1px solid #e2e8f0',
  borderTop: '1px solid #e2e8f0'
};
const trustRowInnerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px'
};
const trustBadgeCardStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#334155',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: "'Inter', sans-serif"
};
const badgeCircleStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#f1f5f9',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px'
};

// Section wrappers
const sectionStyle: React.CSSProperties = { padding: '24px 0', backgroundColor: '#ffffff' };
const sectionBgStyle: React.CSSProperties = { padding: '24px 0', backgroundColor: '#f8fafc' };
const sectionHeaderStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px', padding: '0 16px' };
const sectionTitleStyle: React.CSSProperties = { fontSize: '16px', fontFamily: "'Outfit', sans-serif", fontWeight: '900', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' };
const sectionSubTextStyle: React.CSSProperties = { fontSize: '10px', color: '#64748b', marginTop: '2px' };
const seeAllLinkStyle: React.CSSProperties = { color: '#4285F4', fontWeight: '700', fontSize: '12px', textDecoration: 'none', whiteSpace: 'nowrap' };

// Scarcity elements
const scarcityBadgeStyle: React.CSSProperties = { backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' };
const sellingFastTextStyle: React.CSSProperties = { color: '#f59e0b', fontSize: '9px', fontWeight: '800' };

// Flash Deals Timer
const timerBoxStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '4px 8px' };
const timerSegStyle: React.CSSProperties = { backgroundColor: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: '800', padding: '1px 4px', borderRadius: '4px', minWidth: '18px', textAlign: 'center' };
const timerSepStyle: React.CSSProperties = { color: '#ef4444', fontWeight: '800', fontSize: '11px' };

// Product Horizontal Shelf (indicates swipe content on mobile)
const productsShelfStyle: React.CSSProperties = { display: 'flex', gap: '12px', overflowX: 'auto', padding: '4px 16px 12px', scrollSnapType: 'x mandatory' };

// Shorter and Denser Product Card
const productCardStyle: React.CSSProperties = { width: '150px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', position: 'relative', display: 'flex', flexDirection: 'column', scrollSnapAlign: 'start' };
const cardTopRowStyle: React.CSSProperties = { position: 'absolute', top: '6px', left: '6px', right: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 };
const wishlistOverlayStyle: React.CSSProperties = { backgroundColor: '#ffffff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', cursor: 'pointer', outline: 'none' };

const productImgWrapperStyle: React.CSSProperties = { height: '110px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid #f1f5f9', overflow: 'hidden' };
const productImgTagStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
const productEmojiStyle: React.CSSProperties = { fontSize: '36px' };
const discountTagStyle: React.CSSProperties = { backgroundColor: '#10b981', color: '#ffffff', fontSize: '8px', fontWeight: '800', padding: '2px 5px', borderRadius: '4px' };
const newTagStyle: React.CSSProperties = { position: 'absolute', bottom: '6px', right: '6px', backgroundColor: '#8b5cf6', color: '#ffffff', fontSize: '8px', fontWeight: '800', padding: '2px 5px', borderRadius: '4px' };
const productBodyStyle: React.CSSProperties = { padding: '8px 10px', flex: 1 };
const productStoreLabelStyle: React.CSSProperties = { fontSize: '8px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' };
const productNameStyle: React.CSSProperties = { fontSize: '11px', fontWeight: '700', lineHeight: '1.3', color: '#1e293b', height: '28px', overflow: 'hidden', marginBottom: '3px' };
const ratingRowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' };
const reviewCountStyle: React.CSSProperties = { fontSize: '9px', color: '#64748b', fontWeight: '600' };
const deliveryRowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '3px' };
const deliveryTextStyle: React.CSSProperties = { fontSize: '9px', color: '#10b981', fontWeight: '700' };
const pointsRowStyle: React.CSSProperties = { fontSize: '9px', fontWeight: '700', color: '#7c3aed', backgroundColor: '#f5f3ff', padding: '1px 4px', borderRadius: '3px', display: 'inline-block', marginBottom: '4px' };

const productPriceRowStyle: React.CSSProperties = { display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '3px' };
const productPriceStyle: React.CSSProperties = { fontSize: '13px', fontWeight: '800', color: '#0f172a' };
const productMrpStyle: React.CSSProperties = { fontSize: '9px', color: '#94a3b8', textDecoration: 'line-through' };
const cardActionsStyle: React.CSSProperties = { padding: '8px 10px', borderTop: '1px solid #f1f5f9' };
const addCartBtnStyle: React.CSSProperties = { width: '100%', backgroundColor: '#4285F4', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: '700', padding: '6px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' };
const buyNowBtnStyle: React.CSSProperties = { flex: 1, backgroundColor: '#FBBC04', color: '#1a1a2e', borderRadius: '6px', fontSize: '9px', fontWeight: '800', padding: '6px 0', textDecoration: 'none', textAlign: 'center' };

// Rich Store Cards
const storesGridStyle: React.CSSProperties = { display: 'flex', gap: '12px', overflowX: 'auto', padding: '4px 16px 12px' };
const richStoreCardStyle: React.CSSProperties = { minWidth: '220px', flexShrink: 0, backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'all 0.2s' };
const storeCardBannerStyle: React.CSSProperties = { height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const storeCardBodyStyle: React.CSSProperties = { padding: '10px 12px' };
const storeNameStyle: React.CSSProperties = { fontSize: '12px', fontWeight: '800', fontFamily: "'Outfit', sans-serif", color: '#0f172a', marginBottom: '4px' };
const storeMetaRowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' };
const storeRatingStyle: React.CSSProperties = { fontSize: '11px', fontWeight: '800', color: '#f59e0b' };
const storeCategoryBadgeStyle: React.CSSProperties = { fontSize: '9px', fontWeight: '700', backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '1px 6px', borderRadius: '4px', textTransform: 'capitalize' };
const visitStoreBtnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '6px', fontSize: '11px', fontWeight: '700', color: '#4285F4' };

// Brand Logos Grid
const brandGridContainerStyle: React.CSSProperties = { display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 16px 12px' };
const brandLogoCardStyle: React.CSSProperties = { minWidth: '90px', flexShrink: 0, backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', textAlign: 'center' };
const brandLogoTextStyle: React.CSSProperties = { fontSize: '18px', fontWeight: '900', color: '#0f172a', fontFamily: "'Outfit', sans-serif" };
const brandNameLabelStyle: React.CSSProperties = { fontSize: '9px', fontWeight: '700', color: '#64748b' };

// Continue shopping progress style
const progressOverlayContainerStyle: React.CSSProperties = { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', padding: '2px 6px', display: 'flex', flexDirection: 'column', gap: '1px' };
const progressOverlayLabelStyle: React.CSSProperties = { fontSize: '8px', fontWeight: '700', color: '#ffffff' };
const progressOverlayBarStyle: React.CSSProperties = { height: '2px', backgroundColor: '#FBBC04', borderRadius: '1px' };

// Edi Points Banner
const pointsBannerStyle: React.CSSProperties = { background: 'linear-gradient(135deg, #1e3a8a 0%, #4285F4 100%)', color: '#ffffff', padding: '36px 0' };
const pointsBannerInnerStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', padding: '0 16px' };
const pointsBannerBtnStyle: React.CSSProperties = { backgroundColor: '#FBBC04', color: '#1a1a2e', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', fontSize: '13px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 };
