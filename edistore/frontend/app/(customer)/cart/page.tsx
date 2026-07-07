'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/store/customer';
import { formatPrice } from '@/lib/utils';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { cart, cartCount, cartTotal, updateQty, removeFromCart, clearCart } = useCustomerStore();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={emptyWrapperStyle}>
        <ShoppingBag size={80} color="#94a3b8" />
        <h1 style={emptyTitleStyle}>Your Shopping Cart is Empty</h1>
        <p style={emptyDescStyle}>Add products from your local supermarket, fashion, or electronic stores to start shopping.</p>
        <Link href="/" className="btn btn-primary" style={{ padding: '12px 24px' }}>
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={cartWrapperStyle}>
      <h1 style={titleStyle}>Shopping Cart ({cartCount} items)</h1>

      <div style={cartFlexStyle}>
        {/* Left Side: Items List */}
        <div style={itemsListContainerStyle}>
          {cart.map((item) => (
            <div key={item.productId} style={cartItemStyle}>
              <div style={itemImgStyle}>
                <span style={{ fontSize: '40px' }}>{item.image}</span>
              </div>
              <div style={itemInfoStyle}>
                <h3 style={itemNameStyle}>{item.name}</h3>
                <span style={itemPriceStyle}>{formatPrice(item.price)} / {item.unit}</span>
              </div>
              <div style={itemControlsStyle}>
                <div style={qtySelectorStyle}>
                  <button onClick={() => updateQty(item.productId, item.qty - 1)} style={qtyButtonStyle}>-</button>
                  <span style={qtyValueStyle}>{item.qty}</span>
                  <button onClick={() => updateQty(item.productId, item.qty + 1)} style={qtyButtonStyle}>+</button>
                </div>
                <span style={itemTotalStyle}>{formatPrice(item.price * item.qty)}</span>
                <button onClick={() => {
                  removeFromCart(item.productId);
                  toast.success('Removed from cart');
                }} style={deleteButtonStyle}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div style={cartActionsStyle}>
            <Link href="/" style={backShoppingLinkStyle}>
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
            <button onClick={() => {
              clearCart();
              toast.success('Cart cleared');
            }} style={clearButtonStyle}>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div style={summaryContainerStyle}>
          <h2 style={summaryTitleStyle}>Order Summary</h2>
          
          <div style={summaryRowStyle}>
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          
          <div style={summaryRowStyle}>
            <span>Shipping Charges</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>FREE</span>
          </div>

          <div style={dividerStyle}></div>

          <div style={totalRowStyle}>
            <span>Grand Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <button onClick={handleCheckout} style={checkoutButtonStyle}>
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const emptyWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 20px',
  textAlign: 'center',
  flex: 1,
};

const emptyTitleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginTop: '24px',
  marginBottom: '8px',
};

const emptyDescStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#64748b',
  maxWidth: '400px',
  lineHeight: '1.5',
  marginBottom: '24px',
};

const cartWrapperStyle: React.CSSProperties = {
  paddingTop: '40px',
  paddingBottom: '80px',
  flex: 1,
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '900',
  marginBottom: '32px',
};

const cartFlexStyle: React.CSSProperties = {
  display: 'flex',
  gap: '32px',
  flexWrap: 'wrap',
};

const itemsListContainerStyle: React.CSSProperties = {
  flex: 1.8,
  minWidth: '320px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const cartItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '16px',
  gap: '16px',
  flexWrap: 'wrap',
};

const itemImgStyle: React.CSSProperties = {
  width: '72px',
  height: '72px',
  borderRadius: '12px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const itemInfoStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '150px',
};

const itemNameStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '600',
  color: '#0f172a',
  marginBottom: '4px',
};

const itemPriceStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
};

const itemControlsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
};

const qtySelectorStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#f8fafc',
};

const qtyButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: 'transparent',
  fontWeight: '700',
  cursor: 'pointer',
};

const qtyValueStyle: React.CSSProperties = {
  padding: '0px 8px',
  fontWeight: '700',
  minWidth: '20px',
  textAlign: 'center',
  fontSize: '14px',
};

const itemTotalStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#0f172a',
  minWidth: '80px',
  textAlign: 'right',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#94a3b8',
  cursor: 'pointer',
  transition: 'color 0.2s',
};

const cartActionsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px',
};

const backShoppingLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#4f46e5',
};

const clearButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#ef4444',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
};

// Summary Styles
const summaryContainerStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '300px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '20px',
  padding: '24px',
  alignSelf: 'flex-start',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
};

const summaryTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  marginBottom: '20px',
};

const summaryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  color: '#475569',
  marginBottom: '16px',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  margin: '16px 0',
};

const totalRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '18px',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '24px',
};

const checkoutButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: 'white',
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};
