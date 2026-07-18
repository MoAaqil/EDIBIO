'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCustomerStore } from '@/lib/store/customer';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ArrowLeft, CheckCircle, CreditCard, Landmark, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, user } = useCustomerStore();
  
  // Checkout state
  const [addressName, setAddressName] = useState(user?.name || '');
  const [addressPhone, setAddressPhone] = useState(user?.phone || '');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any[] | null>(null);
  const [storesMap, setStoresMap] = useState<{ [id: string]: any }>({});
  const [userPoints, setUserPoints] = useState(0);
  const [redeemApplied, setRedeemApplied] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWallet, setUseWallet] = useState(false);

  useEffect(() => {
    async function fetchUserPoints() {
      if (user?.uid) {
        try {
          const res = await fetch(`/api/users/${user.uid}`);
          if (res.ok) {
            const data = await res.json();
            setUserPoints(data.ediPoints || 0);
            setWalletBalance(data.walletBalance || 0);
          }
        } catch (err) {
          console.error('Error fetching user points:', err);
        }
      }
    }
    fetchUserPoints();
  }, [user]);

  useEffect(() => {
    async function fetchStoreNames() {
      const uniqueIds = Array.from(new Set(cart.map(item => item.storeId)));
      const newStoresMap: typeof storesMap = {};
      for (const id of uniqueIds) {
        try {
          const res = await fetch(`/api/stores/${id}`);
          if (res.ok) {
            const data = await res.json();
            newStoresMap[id] = data;
          } else {
            newStoresMap[id] = { name: 'Unknown Merchant' };
          }
        } catch {
          newStoresMap[id] = { name: 'Unknown Merchant' };
        }
      }
      setStoresMap(newStoresMap);
    }
    if (cart.length > 0) {
      fetchStoreNames();
    }
  }, [cart]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must login before checking out.');
      return;
    }
    if (!line1 || !city || !state || !pincode || !addressName || !addressPhone) {
      toast.error('Please fill in complete shipping address details.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Processing transaction...');

    try {
      if (cart.length === 0) {
        throw new Error('Cart is empty.');
      }

      const pointsDiscount = redeemApplied ? Math.min(userPoints, cartTotal) : 0;
      const afterPointsTotal = cartTotal - pointsDiscount;
      const walletDiscount = useWallet ? Math.min(walletBalance, afterPointsTotal) : 0;

      // Create Order payload in database format
      const orderPayload = {
        customerId: user.uid,
        customerName: addressName,
        customerPhone: addressPhone,
        items: cart,
        paymentMethod,
        redeemPoints: pointsDiscount,
        walletDeduction: walletDiscount,
        shippingAddress: {
          name: addressName,
          phone: addressPhone,
          line1,
          city,
          state,
          pincode
        }
      };

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json();
        throw new Error(errData.error || 'Failed to submit orders to database.');
      }

      const result = await orderRes.json();

      clearCart();
      setOrderSuccess(result.orders || []);
      toast.success('Orders placed successfully!', { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'Payment gateway connection error.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container" style={successWrapperStyle}>
        <CheckCircle size={80} color="#10b981" />
        <h1 style={successTitleStyle}>Order Placed Successfully!</h1>
        <div style={{ marginBottom: '24px', maxWidth: '520px', width: '100%' }}>
          <p style={successDescStyle}>
            Your checkout was successful. Because you purchased from different sellers, your checkout has been split into individual seller orders:
          </p>
          <div style={splitOrdersBoxStyle}>
            {orderSuccess.map((ord: any) => (
              <div key={ord._id || ord.orderNumber} style={splitOrderRowStyle}>
                <span style={{ fontWeight: '700', color: '#1e293b' }}>{ord.orderNumber}</span>
                <span style={{ color: '#64748b' }}>({ord.storeName || 'Merchant'})</span>
              </div>
            ))}
          </div>
        </div>
        <div style={successActionsStyle}>
          <button onClick={() => router.push(`/orders`)} className="btn btn-primary" style={{ padding: '12px 24px' }}>
            Track My Orders
          </button>
          <button onClick={() => router.push('/')} className="btn btn-outline" style={{ padding: '12px 24px' }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={successWrapperStyle}>
        <ShoppingBag size={80} color="#4f46e5" />
        <h1 style={successTitleStyle}>Checkout Requires Account Login</h1>
        <p style={successDescStyle}>
          You must checkout only after login to your EdiStore account to track your orders, saved addresses, and earn Edi Points.
        </p>
        <button onClick={() => router.push('/login')} className="btn btn-primary" style={{ marginTop: '16px', padding: '12px 24px' }}>
          Go to Login / Register Page
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={successWrapperStyle}>
        <ShoppingBag size={80} color="#94a3b8" />
        <h1 style={successTitleStyle}>Checkout is Empty</h1>
        <p style={successDescStyle}>Go back to add products to your cart before proceeding.</p>
        <button onClick={() => router.push('/')} className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={checkoutWrapperStyle}>
      <button onClick={() => router.back()} style={backButtonStyle}>
        <ArrowLeft size={16} />
        <span>Back to Cart</span>
      </button>

      <h1 style={titleStyle}>Checkout Shipment</h1>

      <form onSubmit={handlePlaceOrder} style={checkoutFlexStyle}>
        {/* Left: Shipping Address & Payments */}
        <div style={formLeftStyle}>
          <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h2 style={sectionTitleStyle}>1. Shipping & Delivery Address</h2>
            <div style={formGridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Receiver's Name</label>
                <input 
                  type="text" 
                  value={addressName} 
                  onChange={e => setAddressName(e.target.value)} 
                  className="input" 
                  placeholder="Enter name"
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Phone Number</label>
                <input 
                  type="tel" 
                  value={addressPhone} 
                  onChange={e => setAddressPhone(e.target.value)} 
                  className="input" 
                  placeholder="10-digit number"
                  required
                />
              </div>

              <div style={inputGroupStyleFull}>
                <label style={labelStyle}>Flat/Street Address</label>
                <input 
                  type="text" 
                  value={line1} 
                  onChange={e => setLine1(e.target.value)} 
                  className="input" 
                  placeholder="House No, Building, Street name..."
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>City</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={e => setCity(e.target.value)} 
                  className="input" 
                  placeholder="City"
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>State</label>
                <input 
                  type="text" 
                  value={state} 
                  onChange={e => setState(e.target.value)} 
                  className="input" 
                  placeholder="State"
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Pincode</label>
                <input 
                  type="text" 
                  value={pincode} 
                  onChange={e => setPincode(e.target.value)} 
                  className="input" 
                  placeholder="6-digit pincode"
                  required
                />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h2 style={sectionTitleStyle}>2. Choose Payment Method</h2>
            
            <div style={paymentOptionGridStyle}>
              <div 
                onClick={() => setPaymentMethod('razorpay')}
                style={paymentCardStyle(paymentMethod === 'razorpay')}
              >
                <div style={payHeaderStyle}>
                  <CreditCard size={20} color={paymentMethod === 'razorpay' ? '#4f46e5' : '#64748b'} />
                  <span style={payTitleStyle}>Online Payment (Razorpay)</span>
                </div>
                <p style={payDescStyle}>Pay securely via UPI, Cards, Wallets or Netbanking.</p>
              </div>

              <div 
                onClick={() => setPaymentMethod('cod')}
                style={paymentCardStyle(paymentMethod === 'cod')}
              >
                <div style={payHeaderStyle}>
                  <Landmark size={20} color={paymentMethod === 'cod' ? '#4f46e5' : '#64748b'} />
                  <span style={payTitleStyle}>Cash on Delivery (COD)</span>
                </div>
                <p style={payDescStyle}>Pay cash when the package is delivered to your address.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cart Summary / Placing Order */}
        <div style={summaryColumnStyle}>
          <div className="card" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
            <h2 style={summaryTitleStyle}>Order Checkout Summary</h2>
            
            <div style={itemsListStyle}>
              {Object.entries(
                cart.reduce((acc, item) => {
                  if (!acc[item.storeId]) acc[item.storeId] = [];
                  acc[item.storeId].push(item);
                  return acc;
                }, {} as { [storeId: string]: typeof cart })
              ).map(([storeId, storeItems]) => {
                const storeName = storesMap[storeId]?.name || 'Local Merchant';
                return (
                  <div key={storeId} style={storeGroupWrapperStyle}>
                    <h3 style={storeGroupTitleStyle}>{storeName}</h3>
                    <div style={storeGroupItemsStyle}>
                      {storeItems.map(item => (
                        <div key={item.productId} style={summaryItemRowStyle}>
                          <span style={itemTextNameStyle}>{item.name} (x{item.qty})</span>
                          <span>{formatPrice(item.price * item.qty)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={dividerStyle}></div>

            <div style={priceRowStyle}>
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <div style={priceRowStyle}>
              <span>Shipping</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>FREE</span>
            </div>

            {userPoints > 0 && (
              <div style={redemptionBoxStyle}>
                <label style={redemptionLabelStyle}>
                  <input
                    type="checkbox"
                    checked={redeemApplied}
                    onChange={(e) => setRedeemApplied(e.target.checked)}
                    style={checkboxStyle}
                  />
                  <span>Redeem Edi Points (Available: {userPoints})</span>
                </label>
                {redeemApplied && (
                  <div style={priceRowStyle}>
                    <span style={{ color: '#ea4335', fontWeight: '600' }}>Points Discount</span>
                    <span style={{ color: '#ea4335', fontWeight: '600' }}>-{formatPrice(Math.min(userPoints, cartTotal))}</span>
                  </div>
                )}
              </div>
            )}

            {walletBalance > 0 && (
              <div style={{ ...redemptionBoxStyle, marginTop: '12px' }}>
                <label style={redemptionLabelStyle}>
                  <input
                    type="checkbox"
                    checked={useWallet}
                    onChange={(e) => setUseWallet(e.target.checked)}
                    style={checkboxStyle}
                  />
                  <span>Redeem Wallet Balance (Available: {formatPrice(walletBalance)})</span>
                </label>
                {useWallet && (
                  <div style={priceRowStyle}>
                    <span style={{ color: '#ea4335', fontWeight: '600' }}>Wallet Discount</span>
                    <span style={{ color: '#ea4335', fontWeight: '600' }}>-{formatPrice(Math.min(walletBalance, cartTotal - (redeemApplied ? Math.min(userPoints, cartTotal) : 0)))}</span>
                  </div>
                )}
              </div>
            )}

            <div style={dividerStyle}></div>

            <div style={totalRowStyle}>
              <span>Grand Total</span>
              <span>
                {formatPrice(
                  Math.max(
                    0,
                    cartTotal - 
                    (redeemApplied ? Math.min(userPoints, cartTotal) : 0) - 
                    (useWallet ? Math.min(walletBalance, cartTotal - (redeemApplied ? Math.min(userPoints, cartTotal) : 0)) : 0)
                  )
                )}
              </span>
            </div>

            <button type="submit" disabled={loading} style={placeOrderButtonStyle}>
              {loading ? 'Processing Transaction...' : 'Place Order & Pay'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Styles
const successWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 20px',
  textAlign: 'center',
  flex: 1,
};

const successTitleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginTop: '24px',
  marginBottom: '12px',
};

const successDescStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#64748b',
  maxWidth: '480px',
  lineHeight: '1.6',
  marginBottom: '32px',
};

const successActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
};

const checkoutWrapperStyle: React.CSSProperties = {
  paddingTop: '32px',
  paddingBottom: '80px',
  flex: 1,
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

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '900',
  marginBottom: '32px',
};

const checkoutFlexStyle: React.CSSProperties = {
  display: 'flex',
  gap: '32px',
  flexWrap: 'wrap',
};

const formLeftStyle: React.CSSProperties = {
  flex: 1.8,
  minWidth: '320px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  marginBottom: '24px',
  color: '#0f172a',
};

const formGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const inputGroupStyleFull: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  gridColumn: 'span 2',
};

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '600',
  color: '#334155',
  fontFamily: "'Outfit', sans-serif",
};

const paymentOptionGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const paymentCardStyle = (isActive: boolean): React.CSSProperties => ({
  border: `2px solid ${isActive ? '#4f46e5' : '#e2e8f0'}`,
  borderRadius: '16px',
  padding: '18px',
  cursor: 'pointer',
  backgroundColor: isActive ? '#f5f3ff' : '#ffffff',
  transition: 'all 0.2s',
});

const payHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '6px',
};

const payTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#0f172a',
};

const payDescStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginLeft: '32px',
};

// Summary Column
const summaryColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '300px',
};

const summaryTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  marginBottom: '20px',
};

const itemsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  maxHeight: '200px',
  overflowY: 'auto',
  paddingRight: '6px',
};

const summaryItemRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  color: '#475569',
};

const itemTextNameStyle: React.CSSProperties = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '200px',
};

const priceRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  color: '#475569',
  marginBottom: '12px',
};

const totalRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '18px',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '24px',
};

const placeOrderButtonStyle: React.CSSProperties = {
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '15px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  textAlign: 'center',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  margin: '16px 0',
};

const storeGroupWrapperStyle: React.CSSProperties = {
  marginBottom: '16px',
  paddingBottom: '12px',
  borderBottom: '1px solid #f1f5f9',
};

const storeGroupTitleStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '800',
  color: '#4f46e5',
  textTransform: 'uppercase',
  marginBottom: '8px',
  fontFamily: "'Outfit', sans-serif",
};

const storeGroupItemsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  paddingLeft: '8px',
};

const splitOrdersBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '16px',
  backgroundColor: '#f8fafc',
  padding: '16px',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  textAlign: 'left',
};

const splitOrderRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
};

const redemptionBoxStyle: React.CSSProperties = {
  backgroundColor: '#f5f3ff',
  border: '1px dashed #c084fc',
  borderRadius: '10px',
  padding: '12px',
  marginTop: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const redemptionLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  fontWeight: '700',
  color: '#5b21b6',
  cursor: 'pointer',
};

const checkboxStyle: React.CSSProperties = {
  cursor: 'pointer',
  width: '16px',
  height: '16px',
  accentColor: '#6d28d9',
};
