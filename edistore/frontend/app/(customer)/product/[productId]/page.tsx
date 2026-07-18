'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCustomerStore } from '@/lib/store/customer';
import { ShoppingBag, ArrowLeft, Heart, Shield, Award, HelpCircle, Star, Info, CheckCircle, Tag, Zap, PlayCircle, RotateCcw, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Fallback Rich Mock Product Details with Image Galleries & Specifications ──
const MOCK_PRODUCTS_MAP: Record<string, any> = {
  p1: {
    _id: 'p1',
    name: 'Organic Premium Basmati Rice',
    price: 145,
    mrp: 180,
    storeName: 'Raj Supermarket',
    storeId: 's1',
    category: 'grocery',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Grown naturally in the foothills of Himalayas, our premium organic basmati rice is aged for 2 years to develop a rich aroma and fluffy structure when cooked. Cleaned and packed in state-of-the-art facilities.',
    brand: 'EdiFresh',
    unit: 'kg',
    rating: 4.8,
    reviews: 1250,
    delivery: 'Tomorrow',
    specifications: {
      'Pack Size': '1 kg',
      'Shelf Life': '24 Months',
      'Country of Origin': 'India',
      'Ingredient Type': 'Organic Basmati Rice',
      'Cuisine': 'Indian'
    },
    offers: [
      'Flat ₹30 off on UPI payments above ₹499.',
      'Buy 2 Get 1 Free on all EdiFresh grocery staples.'
    ],
    coupons: [
      { code: 'RICE10', desc: 'Save 10% on basmati essentials' }
    ],
    reviewsList: [
      { name: 'Rahul S.', rating: 5, verified: true, date: '7 Jul 2026', comment: 'Fragrant and extremely long grains. Cooks very well.', images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100'] },
      { name: 'Priya K.', rating: 4, verified: true, date: '5 Jul 2026', comment: 'Great quality, but packaging could be slightly stronger.', images: [] }
    ]
  },
  p2: {
    _id: 'p2',
    name: 'Wireless Bluetooth Headset v5.3',
    price: 1499,
    mrp: 2999,
    storeName: 'Elite Electronics',
    storeId: 's2',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Experience pure acoustic clarity with dynamic bass output and active noise cancellation. Features a massive 40-hour playback support, fast type-C charging, and integrated touch controls for media & phone calls.',
    brand: 'EdiAudio',
    unit: 'units',
    rating: 4.5,
    reviews: 890,
    delivery: 'Today',
    specifications: {
      'Driver Size': '40mm Neodymium',
      'Bluetooth Version': 'v5.3',
      'Battery Capacity': '600 mAh (40 Hrs)',
      'Waterproof Rating': 'IPX5 Sweatproof',
      'Warranty': '1 Year Brand Warranty'
    },
    offers: [
      'Get 5% Cashback up to ₹150 using Axis Bank credit cards.',
      'No Cost EMI available on selected credit cards.'
    ],
    coupons: [
      { code: 'ELEC100', desc: 'Save flat ₹100 on sound electronics' }
    ],
    reviewsList: [
      { name: 'Amit D.', rating: 5, verified: true, date: '6 Jul 2026', comment: 'Best headphones at this price. Bass is super deep!', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'] },
      { name: 'Sneha P.', rating: 4, verified: false, date: '3 Jul 2026', comment: 'Battery life is amazing, noise cancellation is decent.', images: [] }
    ]
  },
  p3: {
    _id: 'p3',
    name: 'Classic Leather Casual Shoes',
    price: 899,
    mrp: 1499,
    storeName: 'Vogue Boutique',
    storeId: 's3',
    category: 'fashion',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Perfect pair for your smart-casual attire. Crafted with high-grade synthetic leather and featuring double cushioning, these shoes offer premium style combined with all-day foot support. Resistant to wear and tear.',
    brand: 'EdiStep',
    unit: 'pair',
    rating: 4.7,
    reviews: 620,
    delivery: 'Tomorrow',
    specifications: {
      'Outer Material': 'Premium Synthetic Leather',
      'Sole Material': 'TPR Anti-Slip',
      'Closure Type': 'Lace-Up',
      'Occasion': 'Smart Casual',
      'Product Weight': '680g (Pair)'
    },
    offers: [
      'Get extra 10% off on fashion orders above ₹1499.',
      'Free return & exchange policy within 7 days.'
    ],
    coupons: [
      { code: 'STEP50', desc: 'Flat ₹50 off on shoe collections' }
    ],
    reviewsList: [
      { name: 'Karan J.', rating: 5, verified: true, date: '7 Jul 2026', comment: 'Fit is perfect and material feels very high-grade.', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'] },
      { name: 'Megha L.', rating: 4, verified: true, date: '4 Jul 2026', comment: 'Comfortable to wear all day long. Value for money.', images: [] }
    ]
  },
  p4: {
    _id: 'p4',
    name: 'Cold Pressed Sunflower Oil 1L',
    price: 185,
    mrp: 220,
    storeName: 'Raj Supermarket',
    storeId: 's1',
    category: 'grocery',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Cold-pressed sunflower oil manufactured using clean organic sunflower seeds. Rich in vitamin E, low in saturated fats, and featuring a high smoke point which makes it ideal for healthy Indian cooking and frying.',
    brand: 'EdiFresh',
    unit: 'litre',
    rating: 4.6,
    reviews: 450,
    delivery: 'Today',
    specifications: {
      'Volume': '1 Litre',
      'Shelf Life': '12 Months',
      'Extraction Method': 'Cold Pressed / Wood Pressed',
      'Type': 'Sunflower Oil'
    },
    offers: [
      'Save flat ₹20 when buying combined with groceries.'
    ],
    coupons: [
      { code: 'OIL15', desc: 'Flat ₹15 off on oil staples' }
    ],
    reviewsList: [
      { name: 'Vikram A.', rating: 5, verified: true, date: '1 Jul 2026', comment: 'Light and premium oil. Does not feel greasy at all.', images: [] }
    ]
  }
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const router = useRouter();
  const { user, addToCart, wishlist, toggleWishlist } = useCustomerStore();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Gallery states
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  // Variant States
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Q&A States
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestionText, setNewQuestionText] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const idStr = String(productId);
      const mock = MOCK_PRODUCTS_MAP[idStr] || MOCK_PRODUCTS_MAP.p1;
      
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if (data && data._id) {
          // Merge API results with mock images/specifications if missing
          setProduct({ ...mock, ...data });
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API error fetching product details, using fallback details');
      }

      setProduct(mock);
      setLoading(false);
    }
    fetchProduct();
  }, [productId]);

  // Load static mock Q&A
  useEffect(() => {
    if (!product?._id) return;
    setQuestions([
      { _id: 'q1', questionText: 'Is this product original brand or local replica?', customerName: 'Rohan Verma', createdAt: new Date(Date.now() - 3*86400000).toISOString(), answers: [{ answerText: 'This is 100% original brand product verified by EdiStore and the local partner store.', responderName: product.storeName }] },
      { _id: 'q2', questionText: 'How long does the delivery take in Bangalore?', customerName: 'Arjun Sen', createdAt: new Date(Date.now() - 5*86400000).toISOString(), answers: [{ answerText: 'Orders within Bangalore are delivered same day or next morning based on store distance.', responderName: 'EdiStore Courier Support' }] }
    ]);
  }, [product]);

  if (loading || !product) {
    return (
      <div style={centerWrapperStyle}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#64748b' }}>Loading product catalog details...</p>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.productId === product._id);
  const discountPercent = product.mrp && product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const productImagesList = product.images || [product.image];

  const handleAdd = () => {
    addToCart({
      productId: product._id,
      storeId: product.storeId || 's1',
      name: product.name,
      image: productImagesList[0] || '📦',
      price: product.price,
      mrp: product.mrp || product.price,
      stockQty: 100,
      qty: quantity,
      unit: product.unit || 'units'
    });
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    const newQ = {
      _id: 'q_' + Math.random(),
      questionText: newQuestionText,
      customerName: user?.name || 'Customer',
      createdAt: new Date().toISOString(),
      answers: []
    };
    setQuestions([newQ, ...questions]);
    setNewQuestionText('');
    toast.success('Question posted successfully!');
  };

  // Zoom magnifier effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center' });
  };

  return (
    <div className="container" style={wrapperStyle}>
      <button onClick={() => router.back()} style={backButtonStyle}>
        <ArrowLeft size={16} /> <span>Back to search results</span>
      </button>

      <div style={productFlexStyle}>
        
        {/* ─── Left Column: Premium Multi-Image Gallery with Hover Zoom ─── */}
        <div style={galleryColumnStyle}>
          {/* Main display container */}
          <div style={mainImageFrameStyle} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {productImagesList[activeImageIdx]?.startsWith('http') ? (
              <img
                src={productImagesList[activeImageIdx]}
                alt={product.name}
                style={{ ...mainImageTagStyle, ...zoomStyle }}
              />
            ) : (
              <div style={{ ...emojiDisplayWrapper, ...zoomStyle }}>{productImagesList[activeImageIdx]}</div>
            )}

            {/* Video & 360 Overlay triggers */}
            <div style={videoTogglesContainerStyle}>
              <button onClick={() => toast('Loading 360° photorealistic model... (coming soon)', { icon: '🔄' })} style={toggleBtnStyle}>
                🔄 360° View
              </button>
              <button onClick={() => toast.success('Playing product video demonstration...')} style={toggleBtnStyle}>
                <PlayCircle size={13} /> Play Video
              </button>
            </div>
          </div>

          {/* Thumbnail track */}
          <div style={thumbnailTrackStyle}>
            {productImagesList.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                style={thumbnailFrameStyle(idx === activeImageIdx)}
              >
                {img.startsWith('http') ? (
                  <img src={img} alt="thumbnail" style={thumbImgStyle} />
                ) : (
                  <span style={{ fontSize: '18px' }}>{img}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Right Column: Meta & Actions ─── */}
        <div style={metaContainerStyle}>
          <span style={storeLabelStyle}>Verified Merchant: {product.storeName}</span>
          <h1 style={titleStyle}>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '800', backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '2px 8px', borderRadius: '6px' }}>
              Brand: {product.brand || 'Edistore Fresh'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontSize: '13px', fontWeight: '800' }}>
              ★ {product.rating || '4.6'} <span style={{ color: '#64748b', fontWeight: '600' }}>({product.reviews || 220} global ratings)</span>
            </div>
          </div>

          <div style={priceContainerStyle}>
            <span style={priceStyle}>{formatPrice(product.price)}</span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span style={mrpStyle}>{formatPrice(product.mrp)}</span>
                <span style={discountBadgeStyle}>{discountPercent}% OFF</span>
              </>
            )}
          </div>

          {/* Bank Offers / Coupons */}
          <div style={offersCardStyle}>
            <h4 style={{ fontSize: '12px', fontWeight: '900', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Tag size={14} color="#10b981" /> Bank Offers & Coupons
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {product.offers?.map((offer: string, idx: number) => (
                <div key={idx} style={offerRowStyle}>✓ {offer}</div>
              ))}
              {product.coupons?.map((c: any) => (
                <div key={c.code} style={couponRowStyle}>
                  Code: <span style={couponCodeBadge}>{c.code}</span> · {c.desc}
                </div>
              ))}
            </div>
          </div>

          <div style={dividerStyle}></div>
          <p style={descriptionStyle}>{product.description}</p>
          <div style={dividerStyle}></div>

          {/* Call to Actions */}
          <div style={actionRowStyle}>
            <div style={qtySelectorStyle}>
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} style={qtyButtonStyle}>-</button>
              <span style={qtyValueStyle}>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)} style={qtyButtonStyle}>+</button>
            </div>

            <button onClick={handleAdd} style={addCartButtonStyle}>
              <ShoppingBag size={18} />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => {
                toggleWishlist(product._id);
                toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', { icon: '❤️' });
              }}
              style={wishlistButtonStyle(isWishlisted)}
            >
              <Heart size={18} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : '#64748b'} />
            </button>
          </div>

          {/* Trust assurances block */}
          <div style={badgeGridStyle}>
            <div style={badgeCardStyle}><Shield size={16} color="#4285F4" /> <span>Secure Payments</span></div>
            <div style={badgeCardStyle}><Award size={16} color="#34A853" /> <span>100% Genuine</span></div>
            <div style={badgeCardStyle}><RotateCcw size={16} color="#ef4444" /> <span>Easy Returns</span></div>
          </div>
        </div>
      </div>

      {/* ─── Specifications Section ─── */}
      <section style={detailsSectionStyle}>
        <h2 style={detailsTitleStyle}>Product Specifications</h2>
        <table style={specsTableStyle}>
          <tbody>
            {Object.entries(product.specifications || {}).map(([key, val]: any) => (
              <tr key={key} style={specsRowStyle}>
                <td style={specsKeyStyle}>{key}</td>
                <td style={specsValStyle}>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ─── Customer Q&A Section ─── */}
      <section style={detailsSectionStyle}>
        <h2 style={detailsTitleStyle}>Customer Q&A</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {questions.map(q => (
            <div key={q._id} style={qaBlockStyle}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                <span style={{ color: '#4285F4' }}>Q:</span> {q.questionText}
              </p>
              {q.answers.map((a: any, i: number) => (
                <p key={i} style={{ fontSize: '12px', color: '#475569', marginLeft: '16px', marginTop: '4px' }}>
                  <span style={{ color: '#34A853', fontWeight: '700' }}>A:</span> {a.answerText} · <span style={{ color: '#94a3b8' }}>answered by {a.responderName}</span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Customer Reviews Section ─── */}
      <section style={detailsSectionStyle}>
        <h2 style={detailsTitleStyle}>Customer Reviews</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {product.reviewsList?.map((review: any, idx: number) => (
            <div key={idx} style={reviewBlockStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b' }}>{review.name}</span>
                {review.verified && <span style={verifiedBadgeStyle}>⭐ Verified Purchase</span>}
                <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: 'auto' }}>{review.date}</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', color: '#FBBC04', marginBottom: '6px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill={i < review.rating ? '#FBBC04' : 'none'} color="#FBBC04" />
                ))}
              </div>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>"{review.comment}"</p>
              {review.images?.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  {review.images.map((img: string, i: number) => (
                    <img key={i} src={img} alt="review-attach" style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════

const centerWrapperStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '80px 20px', textAlign: 'center' };
const wrapperStyle: React.CSSProperties = { paddingTop: '32px', paddingBottom: '80px' };
const backButtonStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: '700', marginBottom: '24px', cursor: 'pointer' };

const productFlexStyle: React.CSSProperties = { display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' };

// Image Gallery styles
const galleryColumnStyle: React.CSSProperties = { flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px' };
const mainImageFrameStyle: React.CSSProperties = { width: '100%', height: '380px', border: '1px solid #e2e8f0', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', backgroundColor: '#f8fafc' };
const mainImageTagStyle: React.CSSProperties = { width: '90%', height: '90%', objectFit: 'contain', transition: 'transform 0.1s ease' };
const emojiDisplayWrapper: React.CSSProperties = { fontSize: '120px', transition: 'transform 0.1s ease' };

const videoTogglesContainerStyle: React.CSSProperties = { position: 'absolute', bottom: '12px', right: '12px', display: 'flex', gap: '8px' };
const toggleBtnStyle: React.CSSProperties = { backgroundColor: 'rgba(15, 23, 42, 0.75)', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' };

const thumbnailTrackStyle: React.CSSProperties = { display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' };
const thumbnailFrameStyle = (active: boolean): React.CSSProperties => ({ width: '56px', height: '56px', borderRadius: '10px', border: active ? '2.5px solid #4285F4' : '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '4px', cursor: 'pointer' });
const thumbImgStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'contain' };

const metaContainerStyle: React.CSSProperties = { flex: 1.2, minWidth: '320px', display: 'flex', flexDirection: 'column' };
const storeLabelStyle: React.CSSProperties = { fontSize: '11px', fontWeight: '800', color: '#4285F4', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' };
const titleStyle: React.CSSProperties = { fontSize: '26px', fontFamily: "'Outfit', sans-serif", fontWeight: '900', color: '#0f172a', lineHeight: '1.3', marginBottom: '8px' };

const priceContainerStyle: React.CSSProperties = { display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' };
const priceStyle: React.CSSProperties = { fontSize: '26px', fontWeight: '800', color: '#0f172a' };
const mrpStyle: React.CSSProperties = { fontSize: '15px', color: '#94a3b8', textDecoration: 'line-through' };
const discountBadgeStyle: React.CSSProperties = { backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '11px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px' };

const offersCardStyle: React.CSSProperties = { border: '1px solid #e2e8f0', borderRadius: '14px', padding: '14px', backgroundColor: '#f8fafc', marginBottom: '16px' };
const offerRowStyle: React.CSSProperties = { fontSize: '11px', color: '#475569', lineHeight: '1.4' };
const couponRowStyle: React.CSSProperties = { fontSize: '11px', color: '#475569', marginTop: '6px', fontWeight: '600' };
const couponCodeBadge: React.CSSProperties = { backgroundColor: '#eff6ff', border: '1px dashed #2563eb', color: '#2563eb', padding: '1px 6px', borderRadius: '5px', fontWeight: '800' };

const dividerStyle: React.CSSProperties = { borderBottom: '1px solid #f1f5f9', margin: '16px 0' };
const descriptionStyle: React.CSSProperties = { fontSize: '14px', color: '#475569', lineHeight: '1.6' };

const actionRowStyle: React.CSSProperties = { display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' };
const qtySelectorStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: '10px', backgroundColor: '#f8fafc', overflow: 'hidden' };
const qtyButtonStyle: React.CSSProperties = { padding: '8px 14px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700' };
const qtyValueStyle: React.CSSProperties = { padding: '0 8px', fontSize: '13px', fontWeight: '700', minWidth: '20px', textAlign: 'center' };
const addCartButtonStyle: React.CSSProperties = { backgroundColor: '#4285F4', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '11px 24px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' };
const wishlistButtonStyle = (isWish: boolean): React.CSSProperties => ({ backgroundColor: isWish ? '#fee2e2' : '#f8fafc', border: `1.5px solid ${isWish ? '#fca5a5' : '#e2e8f0'}`, borderRadius: '10px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' });

const badgeGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '24px' };
const badgeCardStyle: React.CSSProperties = { padding: '10px', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#475569', backgroundColor: '#f8fafc' };

// Specifications & Q&A / Review Sections
const detailsSectionStyle: React.CSSProperties = { marginTop: '48px', borderTop: '1px solid #e2e8f0', paddingTop: '28px' };
const detailsTitleStyle: React.CSSProperties = { fontSize: '18px', fontFamily: "'Outfit', sans-serif", fontWeight: '900', color: '#0f172a', marginBottom: '16px' };

const specsTableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '13px' };
const specsRowStyle: React.CSSProperties = { borderBottom: '1px solid #f1f5f9' };
const specsKeyStyle: React.CSSProperties = { padding: '10px 14px', fontWeight: '700', color: '#475569', width: '30%', backgroundColor: '#f8fafc' };
const specsValStyle: React.CSSProperties = { padding: '10px 14px', color: '#1e293b' };

const qaBlockStyle: React.CSSProperties = { padding: '14px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#f8fafc' };
const reviewBlockStyle: React.CSSProperties = { padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#ffffff' };
const verifiedBadgeStyle: React.CSSProperties = { backgroundColor: '#d1fae5', color: '#059669', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '5px' };
