'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCustomerStore } from '@/lib/store/customer';
import { ShoppingBag, ArrowLeft, Heart, Shield, Award, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Fallback Product Details ──────────────────────────────────────────────────
const MOCK_PRODUCTS_MAP: Record<string, any> = {
  p1: { _id: 'p1', name: 'Organic Premium Basmati Rice', price: 145, mrp: 180, storeName: 'Raj Supermarket', storeId: 's1', category: 'grocery', image: '🌾', description: 'Grown naturally in the foothills of Himalayas, our premium organic basmati rice is aged for 2 years to develop a rich aroma and fluffy structure when cooked. Cleaned and packed in state-of-the-art facilities.', brand: 'EdiFresh', unit: 'kg', rating: 4.8 },
  p2: { _id: 'p2', name: 'Wireless Bluetooth Headset v5.3', price: 1499, mrp: 2999, storeName: 'Elite Electronics', storeId: 's2', category: 'electronics', image: '🎧', description: 'Experience pure acoustic clarity with dynamic bass output and active noise cancellation. Features a massive 40-hour playback support, fast type-C charging, and integrated touch controls for media & phone calls.', brand: 'EdiAudio', unit: 'units', rating: 4.5 },
  p3: { _id: 'p3', name: 'Classic Leather Casual Shoes', price: 899, mrp: 1499, storeName: 'Vogue Boutique', storeId: 's3', category: 'fashion', image: '👟', description: 'Perfect pair for your smart-casual attire. Crafted with high-grade synthetic leather and featuring double cushioning, these shoes offer premium style combined with all-day foot support. Resistant to wear and tear.', brand: 'EdiStep', unit: 'pair', rating: 4.7 },
  p4: { _id: 'p4', name: 'Cold Pressed Sunflower Oil 1L', price: 185, mrp: 220, storeName: 'Raj Supermarket', storeId: 's1', category: 'grocery', image: '🌻', description: 'Cold-pressed sunflower oil manufactured using clean organic sunflower seeds. Rich in vitamin E, low in saturated fats, and featuring a high smoke point which makes it ideal for healthy Indian cooking and frying.', brand: 'EdiFresh', unit: 'litre', rating: 4.6 }
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist } = useCustomerStore();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if (data && data._id) {
          setProduct(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API error fetching product details, using fallback mock details');
      }

      // Fallback details
      const idStr = String(productId);
      const mock = MOCK_PRODUCTS_MAP[idStr] || MOCK_PRODUCTS_MAP.p1;
      setProduct(mock);
      setLoading(false);
    }
    fetchProduct();
  }, [productId]);

  const handleAdd = () => {
    if (!product) return;
    addToCart({
      productId: product._id,
      storeId: product.storeId || 's1',
      name: product.name,
      image: product.image,
      price: product.price,
      mrp: product.mrp,
      stockQty: 50,
      qty: quantity,
      unit: product.unit || 'units'
    });
    toast.success(`${quantity} ${product.unit} of ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div style={centerWrapperStyle}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#64748b' }}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={centerWrapperStyle}>
        <p>Product not found.</p>
        <button className="btn btn-primary" onClick={() => router.push('/')} style={{ marginTop: '20px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product._id);

  return (
    <div className="container" style={wrapperStyle}>
      <button onClick={() => router.back()} style={backButtonStyle}>
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <div style={productFlexStyle}>
        {/* Left: Product Image */}
        <div style={imgContainerStyle}>
          <span style={emojiStyle}>{product.image}</span>
        </div>

        {/* Right: Product Meta Details */}
        <div style={metaContainerStyle}>
          <span style={storeLabelStyle}>{product.storeName}</span>
          <h1 style={titleStyle}>{product.name}</h1>
          
          {product.brand && (
            <p style={brandStyle}>Brand: <strong style={{ color: '#0f172a' }}>{product.brand}</strong></p>
          )}

          <div style={priceContainerStyle}>
            <span style={priceStyle}>{formatPrice(product.price)}</span>
            <span style={mrpStyle}>{formatPrice(product.mrp)}</span>
            <span style={discountBadgeStyle}>
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
            </span>
          </div>

          <div style={dividerStyle}></div>

          <p style={descriptionStyle}>{product.description}</p>

          <div style={dividerStyle}></div>

          {/* Quantity Controls & Call to Action */}
          <div style={actionRowStyle}>
            <div style={qtySelectorStyle}>
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                style={qtyButtonStyle}
              >
                -
              </button>
              <span style={qtyValueStyle}>{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)} 
                style={qtyButtonStyle}
              >
                +
              </button>
            </div>

            <button onClick={handleAdd} style={addCartButtonStyle}>
              <ShoppingBag size={20} />
              <span>Add to Cart</span>
            </button>

            <button 
              onClick={() => {
                toggleWishlist(product._id);
                toast.success(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist');
              }} 
              style={wishlistButtonStyle(isWishlisted)}
            >
              <Heart size={20} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : '#64748b'} />
            </button>
          </div>

          {/* Quality Seals */}
          <div style={badgeGridStyle}>
            <div style={badgeCardStyle}>
              <Shield size={18} color="#4f46e5" />
              <span>Secured Checkout</span>
            </div>
            <div style={badgeCardStyle}>
              <Award size={18} color="#059669" />
              <span>100% Original</span>
            </div>
            <div style={badgeCardStyle}>
              <HelpCircle size={18} color="#d97706" />
              <span>Assisted Store Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const centerWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: '80px 0',
};

const wrapperStyle: React.CSSProperties = {
  paddingTop: '32px',
  paddingBottom: '80px',
};

const backButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'transparent',
  color: '#64748b',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '24px',
  cursor: 'pointer',
};

const productFlexStyle: React.CSSProperties = {
  display: 'flex',
  gap: '48px',
  flexWrap: 'wrap',
};

const imgContainerStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '320px',
  height: '400px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const emojiStyle: React.CSSProperties = {
  fontSize: '160px',
};

const metaContainerStyle: React.CSSProperties = {
  flex: 1.2,
  minWidth: '320px',
  display: 'flex',
  flexDirection: 'column',
};

const storeLabelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#6366f1',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '8px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '32px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '900',
  lineHeight: '1.2',
  color: '#0f172a',
  marginBottom: '8px',
};

const brandStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#64748b',
  marginBottom: '16px',
};

const priceContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: '12px',
  marginBottom: '24px',
};

const priceStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '800',
  color: '#0f172a',
};

const mrpStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#94a3b8',
  textDecoration: 'line-through',
};

const discountBadgeStyle: React.CSSProperties = {
  backgroundColor: '#fee2e2',
  color: '#ef4444',
  padding: '4px 10px',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: '700',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  margin: '20px 0',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#475569',
  lineHeight: '1.6',
};

const actionRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

const qtySelectorStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#f8fafc',
};

const qtyButtonStyle: React.CSSProperties = {
  padding: '10px 18px',
  backgroundColor: 'transparent',
  fontWeight: '700',
  cursor: 'pointer',
  fontSize: '16px',
};

const qtyValueStyle: React.CSSProperties = {
  padding: '0 12px',
  fontWeight: '700',
  fontSize: '15px',
  minWidth: '24px',
  textAlign: 'center',
};

const addCartButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: 'white',
  padding: '12px 28px',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

const wishlistButtonStyle = (isWish: boolean): React.CSSProperties => ({
  backgroundColor: isWish ? '#fee2e2' : '#f8fafc',
  border: `1px solid ${isWish ? '#fca5a5' : '#e2e8f0'}`,
  width: '46px',
  height: '46px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s',
});

const badgeGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '16px',
  marginTop: '32px',
};

const badgeCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px',
  borderRadius: '12px',
  backgroundColor: '#f8fafc',
  fontSize: '12px',
  fontWeight: '600',
  color: '#475569',
  border: '1px solid #f1f5f9',
};
