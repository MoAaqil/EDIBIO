'use client';

import { useState, useEffect } from 'react';
import { useStore, useActiveCompany } from '@/lib/store';
import { 
  ShoppingBag, IndianRupee, Clock, PackageCheck, 
  Settings, Plus, Trash2, CheckCircle2, AlertCircle, 
  Sparkles, Building, Landmark, MapPin, Globe, RefreshCw,
  ExternalLink, Eye, ArrowUpRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const getEdistoreUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
  }
  return 'https://edistore.vercel.app';
};

export default function OnlineStorePage() {
  const { user, activeCompanyId, products: erpProducts } = useStore();
  const company = useActiveCompany();

  // State
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [storeData, setStoreData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'orders' | 'settlements'>('overview');

  // Connection forms
  const [linkStoreId, setLinkStoreId] = useState('');
  const [storeName, setStoreName] = useState(company?.name || '');
  const [category, setCategory] = useState('grocery');
  const [city, setCity] = useState(company?.city || 'Bangalore');
  const [state, setState] = useState(company?.state || 'Karnataka');
  const [phone, setPhone] = useState(company?.phone || '9876543210');
  const [email, setEmail] = useState(company?.email || 'partner@example.com');

  // Bank details
  const [bankName, setBankName] = useState('HDFC Bank');
  const [accountNumber, setAccountNumber] = useState('5010029382104');
  const [ifsc, setIFSC] = useState('HDFC0001203');
  const [upiId, setUPIId] = useState('rajsuper@okhdfc');

  // Product Add Form
  const [selectedErpProductId, setSelectedErpProductId] = useState('');
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodCategory, setProdCategory] = useState('grocery');
  const [prodPrice, setProdPrice] = useState('');
  const [prodMrp, setProdMrp] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodUnit, setProdUnit] = useState('kg');
  const [prodEmoji, setProdEmoji] = useState('📦');

  useEffect(() => {
    if (activeCompanyId) {
      checkStoreConnection();
    }
  }, [activeCompanyId]);

  // Fetch connection status
  async function checkStoreConnection() {
    setLoading(true);
    try {
      const res = await fetch(`/api/store-connection?companyId=${activeCompanyId}`);
      const data = await res.json();
      if (data.connected) {
        setConnected(true);
        setStoreData(data.store);
        setProducts(data.products || []);
        setOrders(data.orders || []);
        
        // Pre-fill bank details if they exist in store
        if (data.store.bankDetails) {
          setBankName(data.store.bankDetails.bankName || 'HDFC Bank');
          setAccountNumber(data.store.bankDetails.accountNumber || '5010029382104');
          setIFSC(data.store.bankDetails.ifsc || 'HDFC0001203');
          setUPIId(data.store.bankDetails.upiId || 'rajsuper@okhdfc');
        }
      } else {
        setConnected(false);
        setStoreData(null);
      }
    } catch (err) {
      console.error('Failed to query store link status:', err);
      toast.error('Could not load online store status.');
    } finally {
      setLoading(false);
    }
  }

  // Pre-fill Add Product form when selecting an ERP product
  const handleErpProductChange = (productId: string) => {
    setSelectedErpProductId(productId);
    if (!productId) {
      setProdName('');
      setProdDesc('');
      setProdPrice('');
      setProdMrp('');
      setProdStock('');
      setProdUnit('units');
      return;
    }

    const item = erpProducts.find((p: any) => p.id === productId);
    if (item) {
      setProdName(item.name || '');
      setProdDesc(item.description || `Fresh premium ${item.name}`);
      setProdPrice(String(item.sellingPrice || ''));
      setProdMrp(String(item.mrp || item.sellingPrice || ''));
      setProdStock(String(item.stockQty || ''));
      setProdUnit(item.unit || 'units');
      setProdCategory(item.category?.toLowerCase() || 'grocery');
    }
  };

  // Create new EdiStore Shop
  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !phone || !email || !city || !state || !accountNumber || !ifsc) {
      toast.error('Please enter all required fields.');
      return;
    }

    // Basic IFSC pattern verification
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(ifsc.toUpperCase())) {
      toast.error('Invalid bank IFSC Code. (Format example: HDFC0001203)');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Creating your online store...');
    try {
      const res = await fetch('/api/store-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: activeCompanyId,
          userId: user?.uid || 'user_demo',
          action: 'create',
          storeName,
          category,
          city,
          state,
          phone,
          email,
          bankDetails: {
            bankName,
            accountName: storeName,
            accountNumber,
            ifsc: ifsc.toUpperCase(),
            upiId
          }
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('EdiStore shop connected successfully!', { id: toastId });
        checkStoreConnection();
      } else {
        toast.error(data.error || 'Failed to instantiate store.', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Network error: ' + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Link to existing store
  const handleLinkStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkStoreId.trim()) {
      toast.error('Please enter your EdiStore Shop ID.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Linking existing EdiStore shop...');
    try {
      const res = await fetch('/api/store-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: activeCompanyId,
          userId: user?.uid || 'user_demo',
          action: 'link',
          storeId: linkStoreId.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Linked to existing EdiStore shop successfully!', { id: toastId });
        checkStoreConnection();
      } else {
        toast.error(data.error || 'Linking failed.', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Error: ' + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Disconnect connection
  const handleDisconnect = async () => {
    const confirm = window.confirm('Are you sure you want to disconnect your EdiStore online store? Your products and orders won\'t be deleted, but they won\'t sync to this company ERP anymore.');
    if (!confirm) return;

    setLoading(true);
    try {
      const res = await fetch('/api/store-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: activeCompanyId,
          userId: user?.uid || 'user_demo',
          action: 'disconnect'
        })
      });
      if (res.ok) {
        toast.success('Disconnected store links.');
        setConnected(false);
        setStoreData(null);
      } else {
        toast.error('Disconnect failed.');
      }
    } catch (err) {
      toast.error('Network error.');
    } finally {
      setLoading(false);
    }
  };

  // Add Product to Store
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodMrp || !prodStock) {
      toast.error('Fill in all required product fields');
      return;
    }

    const priceVal = parseFloat(prodPrice);
    const mrpVal = parseFloat(prodMrp);

    if (priceVal > mrpVal) {
      toast.error('Selling price cannot exceed Maximum Retail Price (MRP)');
      return;
    }

    const toastId = toast.loading('Publishing listing to EdiStore storefront...');
    try {
      // Standalone edistore URI shares the same products endpoint, and we connect directly
      // POST directly to the shared API
      const res = await fetch(`${getEdistoreUrl()}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: storeData._id,
          sellerId: storeData.sellerId,
          name: prodName,
          description: prodDesc,
          image: prodEmoji,
          images: [prodEmoji],
          category: prodCategory,
          price: priceVal,
          mrp: mrpVal,
          stockQty: parseInt(prodStock),
          unit: prodUnit,
          tags: [prodName.toLowerCase(), prodCategory],
          isActive: true
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Listing added to your customer storefront catalog!', { id: toastId });
        setProducts(prev => [data, ...prev]);
        
        // Reset product form
        setSelectedErpProductId('');
        setProdName('');
        setProdDesc('');
        setProdPrice('');
        setProdMrp('');
        setProdStock('');
        setProdEmoji('📦');
      } else {
        toast.error(data.error || 'Failed to list product.', { id: toastId });
      }
    } catch (err: any) {
      // Fallback relative call if remote port differs
      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            storeId: storeData._id,
            sellerId: storeData.sellerId,
            name: prodName,
            description: prodDesc,
            image: prodEmoji,
            images: [prodEmoji],
            category: prodCategory,
            price: priceVal,
            mrp: mrpVal,
            stockQty: parseInt(prodStock),
            unit: prodUnit,
            tags: [prodName.toLowerCase(), prodCategory],
            isActive: true
          })
        });
        const data = await res.json();
        if (res.ok) {
          toast.success('Listing added to your customer storefront catalog!', { id: toastId });
          setProducts(prev => [data, ...prev]);
        } else {
          toast.error(data.error || 'Failed to list product.', { id: toastId });
        }
      } catch (innerErr) {
        toast.error('Connection issue. Ensure EdiStore is running on port 3001.', { id: toastId });
      }
    }
  };

  // Delete product from store
  const handleDeleteProduct = async (id: string) => {
    const confirm = window.confirm('Delete product listing from storefront catalog?');
    if (!confirm) return;

    try {
      const res = await fetch(`${getEdistoreUrl()}/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
        toast.success('Product deleted.');
      } else {
        // Retry with relative path
        const res2 = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res2.ok) {
          setProducts(prev => prev.filter(p => p._id !== id));
          toast.success('Product deleted.');
        } else {
          toast.error('Failed to delete listing.');
        }
      }
    } catch (err) {
      toast.error('Connection failed.');
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const toastId = toast.loading(`Updating order status to ${status}...`);
    try {
      const res = await fetch(`${getEdistoreUrl()}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? data : o));
        toast.success(`Order status updated to ${status} in database`, { id: toastId });
      } else {
        toast.error('Failed to update status.', { id: toastId });
      }
    } catch (err) {
      toast.error('Failed to contact order server.', { id: toastId });
    }
  };

  // Save Payout/Bank Settings
  const handleSaveBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !accountNumber || !ifsc || !upiId) {
      toast.error('Please enter all settlements details');
      return;
    }

    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(ifsc.toUpperCase())) {
      toast.error('Invalid bank IFSC Code. (Format example: HDFC0001203)');
      return;
    }

    const toastId = toast.loading('Saving settlements account details...');
    try {
      const res = await fetch(`${getEdistoreUrl()}/api/stores/${storeData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankDetails: {
            bankName,
            accountName: storeData.name,
            accountNumber,
            ifsc: ifsc.toUpperCase(),
            upiId
          }
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStoreData(data);
        toast.success('Payout settlements bank details saved securely in database!', { id: toastId });
      } else {
        toast.error('Failed to update settlements settings.', { id: toastId });
      }
    } catch (err) {
      toast.error('Could not save to settlements database.', { id: toastId });
    }
  };

  if (loading) {
    return (
      <div style={spinnerContainerStyle}>
        <RefreshCw size={40} className="spin-icon" style={{ animation: 'spin 2s linear infinite' }} />
        <p style={{ marginTop: 16, color: '#64748b', fontWeight: 600 }}>Syncing store ledger from database...</p>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // RENDER: Not Connected State
  if (!connected) {
    return (
      <div style={containerStyle}>
        <div className="card" style={{ padding: 40, border: '1px solid #E2E8F0', borderRadius: 24, background: '#FFFFFF', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid #F1F5F9', paddingBottom: 24, marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4285F4' }}>
              <ShoppingBag size={32} />
            </div>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1E293B' }}>EdiStore online Store Integration</h2>
              <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>List your products on EdiStore, capture neighborhood orders, and receive payouts settlements.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {/* Form A: Create store */}
            <div style={{ flex: 1.2, minWidth: 320 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={18} color="#EA4335" />
                Create a New Online Store
              </h3>

              <form onSubmit={handleCreateStore} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Store Name *</label>
                  <input type="text" className="e-input" value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="Raj Supermarket" required />
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>Store Category *</label>
                    <select className="e-select" value={category} onChange={e => setCategory(e.target.value)}>
                      <option value="grocery">Grocery & Fresh Foods</option>
                      <option value="electronics">Electronics & Audio</option>
                      <option value="fashion">Fashion & Clothing</option>
                      <option value="home">Home & Kitchen</option>
                      <option value="beauty">Beauty & Cosmetics</option>
                    </select>
                  </div>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>helpline Phone *</label>
                    <input type="tel" className="e-input" value={phone} onChange={e => setPhone(e.target.value)} required />
                  </div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>helpline Email Address *</label>
                  <input type="email" className="e-input" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>City *</label>
                    <input type="text" className="e-input" value={city} onChange={e => setCity(e.target.value)} required />
                  </div>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>State *</label>
                    <input type="text" className="e-input" value={state} onChange={e => setState(e.target.value)} required />
                  </div>
                </div>

                {/* Bank credentials */}
                <div style={{ background: '#F8FAFC', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', marginTop: 12 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: '#334155', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Landmark size={14} color="#34A853" />
                    Payout Settlements Bank Account
                  </h4>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ ...inputGroupStyle, flex: 1 }}>
                      <label style={labelStyle}>Bank Name</label>
                      <input type="text" className="e-input" value={bankName} onChange={e => setBankName(e.target.value)} required />
                    </div>
                    <div style={{ ...inputGroupStyle, flex: 1.2 }}>
                      <label style={labelStyle}>IFSC Code</label>
                      <input type="text" className="e-input" value={ifsc} onChange={e => setIFSC(e.target.value)} placeholder="HDFC0001203" required />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ ...inputGroupStyle, flex: 1 }}>
                      <label style={labelStyle}>Account Number</label>
                      <input type="text" className="e-input" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} required />
                    </div>
                    <div style={{ ...inputGroupStyle, flex: 1 }}>
                      <label style={labelStyle}>Settlements UPI ID</label>
                      <input type="text" className="e-input" value={upiId} onChange={e => setUPIId(e.target.value)} required />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-green" style={{ padding: 14, borderRadius: 12, fontWeight: 'bold', marginTop: 12 }}>
                  Register & Connect Online Store
                </button>
              </form>
            </div>

            {/* Vertical separator */}
            <div style={{ width: 1, backgroundColor: '#E2E8F0', alignSelf: 'stretch' }} />

            {/* Form B: Link existing */}
            <div style={{ flex: 0.8, minWidth: 280, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Globe size={18} color="#4285F4" />
                Link an Existing Store
              </h3>
              <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.5, marginBottom: 20 }}>
                If you have already registered a store via the standalone EdiStore Partner Dashboard, enter your EdiStore ID or slug here to sync it to this ERP.
              </p>

              <form onSubmit={handleLinkStore} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>EdiStore Shop ID, Slug or Email *</label>
                  <input 
                    type="text" 
                    className="e-input" 
                    value={linkStoreId} 
                    onChange={e => setLinkStoreId(e.target.value)} 
                    placeholder="e.g., store-slug or store-email" 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-outline" style={{ padding: 14, borderRadius: 12, fontWeight: 'bold', color: '#4285F4', borderColor: '#4285F4' }}>
                  Link Edistore Shop
                </button>
              </form>

              <div style={{ marginTop: 'auto', paddingTop: 40, borderTop: '1px dashed #E2E8F0', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <AlertCircle size={16} color="#4285F4" style={{ marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>
                  Linking is instant. Syncing pulls all existing product catalogs and orders log immediately from the MongoDB cloud server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Connected / Dashboard State
  return (
    <div style={containerStyle}>
      {/* Top Banner details */}
      <div className="card" style={{ padding: 24, border: '1px solid #E2E8F0', borderRadius: 16, backgroundColor: '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 32 }}>🏪</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A' }}>{storeData?.name}</h2>
              <span style={{ backgroundColor: '#E6F4EA', color: '#137333', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999 }}>Active</span>
            </div>
            <p style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>
              slug: <strong style={{ color: '#4285F4' }}>{storeData?.slug}</strong> • category: {storeData?.category} • Connected with ERP
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <a href={`${getEdistoreUrl()}/store/${storeData?.slug}`} target="_blank" className="btn btn-outline btn-sm" style={{ borderColor: '#E2E8F0', color: '#4A5568', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Storefront Link</span>
            <ExternalLink size={12} />
          </a>
          <button onClick={handleDisconnect} className="btn btn-ghost btn-sm" style={{ color: '#EA4335', borderColor: '#FCE8E6' }}>
            Disconnect Store
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', gap: 24, marginTop: 8 }}>
        <button onClick={() => setActiveTab('overview')} style={tabButtonStyle(activeTab === 'overview')}>
          Overview Dashboard
        </button>
        <button onClick={() => setActiveTab('catalog')} style={tabButtonStyle(activeTab === 'catalog')}>
          Storefront Catalog ({products.length})
        </button>
        <button onClick={() => setActiveTab('orders')} style={tabButtonStyle(activeTab === 'orders')}>
          Customer Orders ({orders.length})
        </button>
        <button onClick={() => setActiveTab('settlements')} style={tabButtonStyle(activeTab === 'settlements')}>
          Payout Settlements
        </button>
      </div>

      {/* RENDER ACTIVE TAB */}
      
      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            <div className="card" style={statCardStyle('#34A853')}>
              <div style={statHeaderStyle}>
                <span style={statTitleStyle}>Today's Revenue</span>
                <IndianRupee size={20} color="#34A853" />
              </div>
              <span style={statValueStyle}>
                {formatPrice(
                  orders
                    .filter((o: any) => {
                      const today = new Date();
                      today.setHours(0,0,0,0);
                      return new Date(o.createdAt) >= today && o.paymentStatus === 'paid';
                    })
                    .reduce((sum: number, o: any) => sum + o.totalAmount, 0)
                )}
              </span>
            </div>

            <div className="card" style={statCardStyle('#4285F4')}>
              <div style={statHeaderStyle}>
                <span style={statTitleStyle}>Listed Products</span>
                <ShoppingBag size={20} color="#4285F4" />
              </div>
              <span style={statValueStyle}>{products.filter(p => p.isActive).length} items</span>
            </div>

            <div className="card" style={statCardStyle('#FBBC04')}>
              <div style={statHeaderStyle}>
                <span style={statTitleStyle}>Pending Orders</span>
                <Clock size={20} color="#FBBC04" />
              </div>
              <span style={statValueStyle}>{orders.filter(o => o.status === 'placed').length} orders</span>
            </div>

            <div className="card" style={statCardStyle('#EA4335')}>
              <div style={statHeaderStyle}>
                <span style={statTitleStyle}>Total Earnings</span>
                <PackageCheck size={20} color="#EA4335" />
              </div>
              <span style={statValueStyle}>
                {formatPrice(
                  orders
                    .filter((o: any) => o.paymentStatus === 'paid')
                    .reduce((sum: number, o: any) => sum + o.totalAmount, 0) || storeData?.totalSales || 0
                )}
              </span>
            </div>
          </div>

          {/* Recent Orders table */}
          <div className="card" style={{ padding: 24, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 20 }}>Recent Customer Placements</h3>
            {orders.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748B', padding: 24, fontSize: 13 }}>No orders recorded yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <th style={thStyle}>Order Code</th>
                      <th style={thStyle}>Customer</th>
                      <th style={thStyle}>Bill Amount</th>
                      <th style={thStyle}>Payment Status</th>
                      <th style={thStyle}>Order Status</th>
                      <th style={thStyle}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((o: any) => (
                      <tr key={o._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ ...tdStyle, fontWeight: '700', color: '#4285F4' }}>{o.orderNumber}</td>
                        <td style={tdStyle}>{o.customerName}</td>
                        <td style={{ ...tdStyle, fontWeight: '700' }}>{formatPrice(o.totalAmount)}</td>
                        <td style={tdStyle}>
                          <span style={badgeStyle(o.paymentStatus === 'paid' ? '#34A853' : '#FBBC04')}>
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <span style={badgeStyle(
                            o.status === 'delivered' ? '#34A853' : 
                            o.status === 'placed' ? '#FBBC04' : '#4285F4'
                          )}>
                            {o.status}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, color: '#64748B' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. CATALOG TAB */}
      {activeTab === 'catalog' && (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* Add product from ERP inventory list */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div className="card" style={{ padding: 24, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plus size={18} color="#34A853" />
                List Item from ERP Inventory
              </h3>

              <div style={{ ...inputGroupStyle, marginBottom: 20 }}>
                <label style={labelStyle}>Select ERP Inventory Item *</label>
                <select 
                  className="e-select" 
                  value={selectedErpProductId} 
                  onChange={e => handleErpProductChange(e.target.value)}
                >
                  <option value="">-- Click to choose item --</option>
                  {erpProducts.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Qty: {p.stockQty || 0} • Price: ₹{p.sellingPrice})
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Storefront Title *</label>
                  <input type="text" className="e-input" value={prodName} onChange={e => setProdName(e.target.value)} placeholder="Organic Cherry Tomatoes" required />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Product Description *</label>
                  <textarea className="e-input" value={prodDesc} onChange={e => setProdDesc(e.target.value)} placeholder="Fresh organically grown red tomatoes..." style={{ minHeight: 80 }} />
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>Store Category *</label>
                    <select className="e-select" value={prodCategory} onChange={e => setProdCategory(e.target.value)}>
                      <option value="grocery">Grocery & Fresh Foods</option>
                      <option value="electronics">Electronics & Audio</option>
                      <option value="fashion">Fashion & Clothing</option>
                      <option value="home">Home & Kitchen</option>
                      <option value="beauty">Beauty & Cosmetics</option>
                    </select>
                  </div>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>Emoji Icon</label>
                    <input type="text" className="e-input" value={prodEmoji} onChange={e => setProdEmoji(e.target.value)} placeholder="🍅" />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>Selling Price (₹) *</label>
                    <input type="number" className="e-input" value={prodPrice} onChange={e => setProdPrice(e.target.value)} placeholder="140" required />
                  </div>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>MRP (₹) *</label>
                    <input type="number" className="e-input" value={prodMrp} onChange={e => setProdMrp(e.target.value)} placeholder="180" required />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>Stock Qty *</label>
                    <input type="number" className="e-input" value={prodStock} onChange={e => setProdStock(e.target.value)} placeholder="50" required />
                  </div>
                  <div style={{ ...inputGroupStyle, flex: 1 }}>
                    <label style={labelStyle}>Unit Label *</label>
                    <input type="text" className="e-input" value={prodUnit} onChange={e => setProdUnit(e.target.value)} placeholder="kg, packet" required />
                  </div>
                </div>

                <button type="submit" className="btn btn-blue" style={{ padding: 12, borderRadius: 10, fontWeight: 'bold', marginTop: 12 }}>
                  List Product on EdiStore
                </button>
              </form>
            </div>
          </div>

          {/* Catalog items list */}
          <div style={{ flex: 1.5, minWidth: 360 }}>
            <div className="card" style={{ padding: 24, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>Active Listings catalog</h3>

              {products.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748B', padding: 24, fontSize: 13 }}>No products published on store catalog yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {products.map((p) => (
                    <div key={p._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, border: '1px solid #F1F5F9', borderRadius: 12, background: '#F8FAFC' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 24 }}>{p.image || '📦'}</span>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 'bold', color: '#1E293B' }}>{p.name}</p>
                          <p style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                            Price: <strong>₹{p.price}</strong> • Stock: {p.stockQty} {p.unit} • Category: {p.category}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteProduct(p._id)} style={{ color: '#EA4335', padding: 8, background: 'transparent', cursor: 'pointer' }} title="Delete listing">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="card" style={{ padding: 24, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 20 }}>Manage Customer orders</h3>
          
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748B', padding: 24, fontSize: 13 }}>No customer orders placed yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {orders.map((o) => (
                <div key={o._id} style={{ border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden' }}>
                  {/* Order header banner */}
                  <div style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 'bold', color: '#0F172A' }}>{o.orderNumber}</span>
                      <span style={{ marginLeft: 12, color: '#64748B', fontSize: 12 }}>{new Date(o.createdAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 'bold', color: '#1E293B', marginRight: 16 }}>
                        Bill: {formatPrice(o.totalAmount)} ({o.paymentMethod.toUpperCase()})
                      </span>
                      <span style={badgeStyle(o.paymentStatus === 'paid' ? '#34A853' : '#FBBC04')}>
                        Payment: {o.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Order details body */}
                  <div style={{ padding: 20, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1.2, minWidth: 280 }}>
                      <h4 style={{ fontSize: 12, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>Items ordered</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {o.items?.map((item: any, idx: number) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                            <span>{item.image || '📦'} {item.name} <strong>x {item.qty}</strong></span>
                            <span>{formatPrice(item.price * item.qty)}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ borderTop: '1px dashed #E2E8F0', marginTop: 12, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 'bold' }}>
                        <span>Total Items Value</span>
                        <span>{formatPrice(o.totalAmount)}</span>
                      </div>
                    </div>

                    <div style={{ width: 1, backgroundColor: '#F1F5F9', alignSelf: 'stretch' }} />

                    <div style={{ flex: 1, minWidth: 240 }}>
                      <h4 style={{ fontSize: 12, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>Delivery Address</h4>
                      <p style={{ fontSize: 13, fontWeight: 'bold', color: '#1E293B' }}>{o.shippingAddress?.name}</p>
                      <p style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>{o.shippingAddress?.line1}</p>
                      <p style={{ fontSize: 13, color: '#475569' }}>{o.shippingAddress?.city}, {o.shippingAddress?.state} - {o.shippingAddress?.pincode}</p>
                      <p style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Phone: {o.shippingAddress?.phone}</p>
                    </div>

                    <div style={{ width: 1, backgroundColor: '#F1F5F9', alignSelf: 'stretch' }} />

                    <div style={{ flex: 0.8, minWidth: 180, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <h4 style={{ fontSize: 12, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>Set Delivery Status</h4>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button 
                          onClick={() => handleUpdateOrderStatus(o._id, 'confirmed')} 
                          style={statusActionButtonStyle(o.status === 'confirmed', '#4285F4')}
                        >
                          Confirm Order
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus(o._id, 'packed')} 
                          style={statusActionButtonStyle(o.status === 'packed', '#FBBC04')}
                        >
                          Pack items
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus(o._id, 'shipped')} 
                          style={statusActionButtonStyle(o.status === 'shipped', '#9333EA')}
                        >
                          Ship Parcel
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus(o._id, 'delivered')} 
                          style={statusActionButtonStyle(o.status === 'delivered', '#34A853')}
                        >
                          Mark Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. SETTLEMENTS TAB */}
      {activeTab === 'settlements' && (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1.5, minWidth: 320 }}>
            <div className="card" style={{ padding: 28, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <Landmark size={24} color="#34A853" />
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>Settlements Bank Account</h3>
              </div>
              <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.5, marginBottom: 24 }}>
                All transaction payouts from online credit payments (Razorpay/UPI) are calculated daily and routed directly to this designated bank account within 24 hours.
              </p>

              <form onSubmit={handleSaveBank} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Bank Name *</label>
                  <input type="text" className="e-input" value={bankName} onChange={e => setBankName(e.target.value)} required />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Beneficiary Account Name *</label>
                  <input type="text" className="e-input" value={storeData?.name || ''} disabled style={{ backgroundColor: '#F8FAFC', color: '#64748B' }} />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>IFSC Code *</label>
                  <input type="text" className="e-input" value={ifsc} onChange={e => setIFSC(e.target.value)} placeholder="HDFC0001203" required />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Bank Account Number *</label>
                  <input type="text" className="e-input" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} required />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Settlements UPI ID *</label>
                  <input type="text" className="e-input" value={upiId} onChange={e => setUPIId(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-green" style={{ padding: 14, borderRadius: 12, fontWeight: 'bold', marginTop: 12 }}>
                  Save Settlements Configuration
                </button>
              </form>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <div className="card" style={{ padding: 24, background: '#E6F4EA', border: '1px solid #A8DAB5', borderRadius: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#137333', marginBottom: 12 }}>
                <CheckCircle2 size={20} />
                <h4 style={{ fontSize: 14, fontWeight: 800 }}>Account Status Verified</h4>
              </div>
              <p style={{ color: '#137333', fontSize: 12, lineHeight: 1.5 }}>
                Your payout settlement channel is connected and healthy. Test settlements are disbursed within 24 hours of successful delivery updates.
              </p>
            </div>

            <div className="card" style={{ padding: 24, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, marginTop: 24 }}>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Settlement Terms</h4>
              <ul style={{ paddingLeft: 16, color: '#475569', fontSize: 12, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Platform commissions average 3-5% based on item categorizations.</li>
                <li>Cash on Delivery (COD) items are settled at delivery.</li>
                <li>Verify your account credentials carefully to avoid settlement failures.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers
function formatPrice(val: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
}

// Styles
const spinnerContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh',
  width: '100%'
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  padding: '12px 4px'
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: '700',
  color: '#475569',
  fontFamily: "'Outfit', sans-serif"
};

const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '12px 16px',
  fontSize: 14,
  fontWeight: '700',
  color: isActive ? '#4285F4' : '#64748B',
  border: 'none',
  borderBottom: isActive ? '3px solid #4285F4' : '3px solid transparent',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.15s'
});

const statCardStyle = (accentColor: string): React.CSSProperties => ({
  padding: 24,
  backgroundColor: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderTop: `4px solid ${accentColor}`,
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
});

const statHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const statTitleStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: '700',
  color: '#64748B',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const statValueStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: '900',
  color: '#0F172A',
  fontFamily: "'Outfit', sans-serif"
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left'
};

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: 11,
  fontWeight: '700',
  color: '#64748B',
  textTransform: 'uppercase'
};

const tdStyle: React.CSSProperties = {
  padding: '16px',
  fontSize: 13,
  color: '#334155'
};

const badgeStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color + '15',
  color: color,
  padding: '2px 8px',
  borderRadius: 99,
  fontSize: 11,
  fontWeight: '700',
  textTransform: 'capitalize',
  display: 'inline-block'
});

const statusActionButtonStyle = (isActive: boolean, color: string): React.CSSProperties => ({
  padding: '8px 12px',
  fontSize: 12,
  fontWeight: '700',
  borderRadius: 8,
  border: `1px solid ${color}`,
  backgroundColor: isActive ? color : 'transparent',
  color: isActive ? '#FFFFFF' : color,
  cursor: 'pointer',
  transition: 'all 0.15s'
});
