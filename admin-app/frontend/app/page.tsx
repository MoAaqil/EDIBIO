'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  Building, 
  ShoppingBag, 
  Store, 
  ShieldAlert, 
  RefreshCw, 
  Search, 
  Check, 
  X, 
  Info,
  Clock,
  Sliders
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'billing' | 'edistore'>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  
  // Registration data state
  const [regData, setRegData] = useState<{
    billing: {
      users: any[];
      companies: any[];
      totalUsers: number;
      totalCompanies: number;
    };
    edistore: {
      users: any[];
      stores: any[];
      orders: any[];
      products: any[];
      totalUsers: number;
      totalStores: number;
      pendingApprovals: number;
    };
  }>({
    billing: { users: [], companies: [], totalUsers: 0, totalCompanies: 0 },
    edistore: { users: [], stores: [], orders: [], products: [], totalUsers: 0, totalStores: 0, pendingApprovals: 0 }
  });

  // Modal States
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [gstrInvoices, setGstrInvoices] = useState<any[]>([]);
  const [gstrPeriod, setGstrPeriod] = useState('07-2026'); // default July 2026
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [showGstrModal, setShowGstrModal] = useState(false);

  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [showStoreModal, setShowStoreModal] = useState(false);

  // Fetch registrations
  const fetchRegistrations = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const res = await fetch('/api/registrations');
      const json = await res.json();
      if (json.success) {
        setRegData(json.data);
      } else {
        showToast(json.error || 'Failed to fetch data', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error connecting to api backend', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 4000);
  };

  // Perform Store Status Actions
  const handleStoreAction = async (storeId: string, action: 'approve' | 'reject' | 'toggleVerify' | 'toggleActive') => {
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId, action })
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || 'Store registration updated', 'success');
        // Reload data to reflect change
        fetchRegistrations(true);
      } else {
        showToast(json.error || 'Action failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to process database action', 'error');
    }
  };

  // Update subscription plan tier
  const handleUpdatePlan = async (userId: string, plan: string) => {
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updatePlan', userId, plan })
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || 'Subscription tier updated', 'success');
        fetchRegistrations(true);
      } else {
        showToast(json.error || 'Failed to update subscription', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Connection failure', 'error');
    }
  };

  // Delete company completely
  const handleDeleteCompany = async (companyId: string, companyName: string) => {
    const doubleConfirm = window.confirm(`CAUTION: Are you sure you want to completely delete the company "${companyName}"? This removes the company profile and deletes all invoices, inventory, parties, and expenses inside it. This action is irreversible!`);
    if (!doubleConfirm) return;

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteCompany', companyId })
      });
      const json = await res.json();
      if (json.success) {
        showToast('Company and all ledger tables deleted successfully', 'success');
        fetchRegistrations(true);
      } else {
        showToast(json.error || 'Failed to delete company', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Connection failed', 'error');
    }
  };

  // Delete company operational data (ledger purge)
  const handleDeleteCompanyData = async (companyId: string, companyName: string) => {
    const doubleConfirm = window.confirm(`Are you sure you want to clear/purge all transaction data (invoices, products, parties, expenses) inside "${companyName}"? The company account will remain active, but its database will be wiped.`);
    if (!doubleConfirm) return;

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteCompanyData', companyId })
      });
      const json = await res.json();
      if (json.success) {
        showToast('Company database transaction registers purged successfully', 'success');
        fetchRegistrations(true);
      } else {
        showToast(json.error || 'Failed to purge data', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Connection failed', 'error');
    }
  };

  // Delete user account completely
  const handleDeleteAccount = async (userId: string, userName: string) => {
    const doubleConfirm = window.confirm(`DANGER: Are you sure you want to delete the operator account "${userName}"? This will delete their login user credentials, all their registered companies, and all company database records. This is a complete purge.`);
    if (!doubleConfirm) return;

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteAccount', userId })
      });
      const json = await res.json();
      if (json.success) {
        showToast('Operator user and all associated outlets deleted completely', 'success');
        fetchRegistrations(true);
      } else {
        showToast(json.error || 'Failed to delete account', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Connection failed', 'error');
    }
  };

  // Delete e-commerce store completely
  const handleDeleteStore = async (storeId: string, storeName: string) => {
    const doubleConfirm = window.confirm(`CAUTION: Are you sure you want to delete the online store storefront "${storeName}"? This removes the digital store listings and all customer orders logs.`);
    if (!doubleConfirm) return;

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteStore', storeId })
      });
      const json = await res.json();
      if (json.success) {
        showToast('Storefront and order history deleted successfully', 'success');
        fetchRegistrations(true);
      } else {
        showToast(json.error || 'Failed to delete store', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Connection failed', 'error');
    }
  };

  // Open GSTR Audit Modal
  const handleOpenGstr = async (company: any) => {
    setSelectedCompany(company);
    setShowGstrModal(true);
    setLoadingInvoices(true);
    try {
      const res = await fetch(`/api/registrations?companyId=${company._id}`);
      const json = await res.json();
      if (json.success) {
        setGstrInvoices(json.invoices || []);
      } else {
        showToast(json.error || 'Failed to load company invoices', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error loading company data', 'error');
    } finally {
      setLoadingInvoices(false);
    }
  };

  // GSTR-1 & GSTR-3B Generators & File Exporters
  const downloadGstr1File = () => {
    if (!selectedCompany) return;
    const saleInvoices = gstrInvoices.filter(i => i.invoiceType === 'sale' && i.isGstBill);
    const b2b: any[] = [];
    const b2cs: any[] = [];

    saleInvoices.forEach(i => {
      if (i.partyGst) {
        b2b.push({
          ctin: i.partyGst,
          inv: [{
            inum: i.invoiceNumber,
            dt: i.date.split('-').reverse().join('-'),
            val: i.grandTotal,
            pos: i.isInterState ? "99" : "33",
            rchrg: "N",
            inv_typ: "R",
            itms: i.items?.map((it: any, idx: number) => ({
              num: idx + 1,
              itm_det: {
                ty: it.hsnCode || "S",
                hsn_sc: it.hsnCode || "0000",
                txval: it.taxableAmt || it.totalPrice || 0,
                rt: it.gstRate || 0,
                iamt: i.isInterState ? (i.totalIgst || 0) : 0,
                camt: !i.isInterState ? (i.totalCgst || 0) : 0,
                samt: !i.isInterState ? (i.totalSgst || 0) : 0,
                csamt: i.totalCess || 0
              }
            }))
          }]
        });
      } else {
        b2cs.push({
          sply_ty: i.isInterState ? "INTER" : "INTRA",
          rt: i.items?.[0]?.gstRate || 0,
          typ: "OE",
          pos: i.isInterState ? "99" : "33",
          txval: i.taxableAmount || i.subTotal || 0,
          iamt: i.totalIgst || 0,
          camt: i.totalCgst || 0,
          samt: i.totalSgst || 0,
          csamt: i.totalCess || 0
        });
      }
    });

    const gstr1Obj = {
      gstin: selectedCompany.gstNumber || "GSTIN_REQUIRED",
      fp: gstrPeriod.replace('-', ''), // format MMYYYY
      gt: 0.0,
      cur_gt: 0.0,
      b2b,
      b2cs
    };

    const blob = new Blob([JSON.stringify(gstr1Obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GSTR1_${selectedCompany.name.replace(/\s+/g, '_')}_${gstrPeriod}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadGstr3bFile = () => {
    if (!selectedCompany) return;
    const saleInvoices = gstrInvoices.filter(i => i.invoiceType === 'sale');
    const taxableValue = saleInvoices.reduce((sum, i) => sum + (i.taxableAmount || i.subTotal || 0), 0);
    const cgst = saleInvoices.reduce((sum, i) => sum + (i.totalCgst || 0), 0);
    const sgst = saleInvoices.reduce((sum, i) => sum + (i.totalSgst || 0), 0);
    const igst = saleInvoices.reduce((sum, i) => sum + (i.totalIgst || 0), 0);
    const cess = saleInvoices.reduce((sum, i) => sum + (i.totalCess || 0), 0);

    const gstr3bObj = {
      gstin: selectedCompany.gstNumber || "GSTIN_REQUIRED",
      fp: gstrPeriod.replace('-', ''),
      sec31: {
        outward_taxable: {
          txval: taxableValue,
          iamt: igst,
          camt: cgst,
          samt: sgst,
          csamt: cess
        }
      }
    };

    const blob = new Blob([JSON.stringify(gstr3bObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GSTR3B_${selectedCompany.name.replace(/\s+/g, '_')}_${gstrPeriod}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Format Date String helper
  const formatDate = (dateStr: any) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return String(dateStr).split('T')[0] || String(dateStr);
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return String(dateStr);
    }
  };

  // Filters billing users/companies
  const filteredBilling = regData.billing.users.filter(user => {
    const query = searchQuery.toLowerCase();
    const matchesUser = user.name?.toLowerCase().includes(query) || user.email?.toLowerCase().includes(query) || user.phone?.includes(query);
    
    // Find related company
    const relatedCompany = regData.billing.companies.find(c => c.userId === user._id);
    const matchesCompany = relatedCompany ? relatedCompany.name?.toLowerCase().includes(query) || relatedCompany.gstNumber?.toLowerCase().includes(query) : false;
    
    return matchesUser || matchesCompany;
  });

  // Filters edistore stores
  const filteredEdistore = regData.edistore.stores.filter(store => {
    const query = searchQuery.toLowerCase();
    const seller = regData.edistore.users.find(u => u._id === store.sellerId);
    
    const matchesStore = store.name?.toLowerCase().includes(query) || store.category?.toLowerCase().includes(query) || store.city?.toLowerCase().includes(query) || store.email?.toLowerCase().includes(query);
    const matchesSeller = seller ? seller.name?.toLowerCase().includes(query) || seller.email?.toLowerCase().includes(query) : false;
    
    return matchesStore || matchesSeller;
  });

  return (
    <div className="admin-container">
      {/* Toast Alert */}
      {toast.message && (
        <div className="toast-msg" style={{ borderLeft: `4px solid ${toast.type === 'success' ? 'var(--success)' : 'var(--danger)'}` }}>
          {toast.message}
        </div>
      )}

      {/* Header bar */}
      <header className="admin-header">
        <a href="#" className="admin-logo">
          Edibio<span>Suite</span> <small style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>ADMIN CENTER</small>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => fetchRegistrations(true)} className="btn-action" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} disabled={refreshing}>
            <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
            <span>{refreshing ? 'Refreshing...' : 'Sync Data'}</span>
          </button>
          <div className="system-tag">
            <span className="status-dot"></span>
            <span>Atlas Connection Pool Active</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Tab Selection */}
        <div className="tabs-container">
          <button onClick={() => { setActiveTab('overview'); setSearchQuery(''); }} className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}>
            <Sliders size={16} />
            <span>Overview</span>
          </button>
          <button onClick={() => { setActiveTab('billing'); setSearchQuery(''); }} className={`tab-btn ${activeTab === 'billing' ? 'active' : ''}`}>
            <Building size={16} />
            <span>Billing Registrations ({regData.billing.totalUsers})</span>
          </button>
          <button onClick={() => { setActiveTab('edistore'); setSearchQuery(''); }} className={`tab-btn ${activeTab === 'edistore' ? 'active' : ''}`}>
            <ShoppingBag size={16} />
            <span>E-Commerce Stores ({regData.edistore.totalStores})</span>
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '16px' }}>
            <RefreshCw size={32} className="animate-spin" style={{ color: 'var(--primary)' }} />
            <p style={{ color: 'var(--text-sub)', fontSize: '14px' }}>Loading registration details from Atlas Cluster...</p>
          </div>
        ) : (
          <>
            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div>
                {/* Metrics Cards */}
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="metric-label">Billing Accounts</span>
                      <Users size={16} color="var(--info)" />
                    </div>
                    <span className="metric-val">{regData.billing.totalUsers}</span>
                    <span className="metric-sub">Registered POS Operators</span>
                  </div>

                  <div className="metric-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="metric-label">Billing Companies</span>
                      <Building size={16} color="var(--info)" />
                    </div>
                    <span className="metric-val">{regData.billing.totalCompanies}</span>
                    <span className="metric-sub">Physical Outlets/Branches</span>
                  </div>

                  <div className="metric-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="metric-label">E-Commerce Users</span>
                      <Users size={16} color="var(--warning)" />
                    </div>
                    <span className="metric-val">{regData.edistore.totalUsers}</span>
                    <span className="metric-sub">Customers & Sellers Online</span>
                  </div>

                  <div className="metric-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="metric-label">E-Commerce Stores</span>
                      <Store size={16} color="var(--warning)" />
                    </div>
                    <span className="metric-val">{regData.edistore.totalStores}</span>
                    <span className="metric-sub">Listed Digital Storefronts</span>
                  </div>

                  <div className="metric-card" style={regData.edistore.pendingApprovals > 0 ? { borderColor: 'var(--warning)', boxShadow: '0 0 10px rgba(245, 158, 11, 0.1)' } : {}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="metric-label">Pending Approvals</span>
                      <ShieldAlert size={16} color="var(--warning)" />
                    </div>
                    <span className="metric-val" style={regData.edistore.pendingApprovals > 0 ? { color: 'var(--warning)' } : {}}>{regData.edistore.pendingApprovals}</span>
                    <span className="metric-sub">Sellers Awaiting Validation</span>
                  </div>
                </div>

                {/* SVG Chart visualization for registration metrics */}
                <div className="chart-box">
                  <div className="chart-title">Registration Metrics Split</div>
                  <div className="chart-svg-wrap">
                    <svg viewBox="0 0 600 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="billingGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--info)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--info)" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="storeGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--warning)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--warning)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Chart Grid Lines */}
                      <line x1="0" y1="0" x2="600" y2="0" stroke="var(--border-glass)" strokeWidth="1" />
                      <line x1="0" y1="40" x2="600" y2="40" stroke="var(--border-glass)" strokeWidth="1" />
                      <line x1="0" y1="80" x2="600" y2="80" stroke="var(--border-glass)" strokeWidth="1" />
                      <line x1="0" y1="120" x2="600" y2="120" stroke="var(--border-glass)" strokeWidth="2" />
                      
                      {/* Billing Graph Area */}
                      <path d="M 0 120 Q 150 70 300 40 T 600 20 L 600 120 Z" fill="url(#billingGrad)" />
                      <path d="M 0 120 Q 150 70 300 40 T 600 20" fill="none" stroke="var(--info)" strokeWidth="3" />
                      
                      {/* E-store Graph Area */}
                      <path d="M 0 120 Q 150 95 300 65 T 600 35 L 600 120 Z" fill="url(#storeGrad)" />
                      <path d="M 0 120 Q 150 95 300 65 T 600 35" fill="none" stroke="var(--warning)" strokeWidth="3" />
                      
                      {/* Data Point Nodes */}
                      <circle cx="300" cy="40" r="5" fill="var(--info)" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="300" cy="65" r="5" fill="var(--warning)" stroke="#ffffff" strokeWidth="2" />
                      
                      {/* Legend / Text labels */}
                      <text x="315" y="38" fill="var(--text-main)" fontSize="10" fontWeight="700">Billing POS Growth</text>
                      <text x="315" y="70" fill="var(--text-main)" fontSize="10" fontWeight="700">E-Store Marketplace Growth</text>
                    </svg>
                  </div>
                </div>

                {/* System check panel */}
                <div className="section-card">
                  <h3 style={{ fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info size={16} color="var(--primary)" />
                    <span>Admin Operations Console</span>
                  </h3>
                  <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                    This console provides full oversight over the interconnected databases. Click the tabs above to access detailed accounts. In the **E-Commerce Stores** tab, you can verify sellers or approve pending store registration requests.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div style={{ background: 'var(--bg-deep)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                      <strong style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>Database Splitting Configuration</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        - Default connection context represents Billing users and local outlets.<br />
                        - Re-scoped collection context ('edistore') represents customer/seller accounts and virtual marketplaces.
                      </span>
                    </div>
                    <div style={{ background: 'var(--bg-deep)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                      <strong style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>Synchronization Verification</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        - Shared cluster architecture ensures latency-free inventory replication.<br />
                        - User accounts mapped via Firebase Auth ID fields across products.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── BILLING TAB ── */}
            {activeTab === 'billing' && (
              <div className="section-card">
                <div className="section-hdr">
                  <h2 className="section-title">Edibio POS Billing Registrations</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Search size={16} color="var(--text-muted)" style={{ marginRight: '-36px', zIndex: 1, position: 'relative' }} />
                    <input 
                      type="text" 
                      placeholder="Search accounts or companies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>

                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Operator Name / Contact</th>
                        <th>Registered Company Outlets</th>
                        <th>Outlet Details</th>
                        <th>Subscription Tier</th>
                        <th>Signed Up</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBilling.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                            No billing registrations found matching '{searchQuery}'
                          </td>
                        </tr>
                      ) : (
                        filteredBilling.map((user) => {
                          const companies = regData.billing.companies.filter(c => c.userId === user._id);
                          return (
                            <tr key={user._id}>
                              <td>
                                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{user.name || 'Unnamed Operator'}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Email: {user.email}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Phone: {user.phone || 'N/A'}</div>
                              </td>
                              <td>
                                {companies.length === 0 ? (
                                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No registered companies</span>
                                ) : (
                                  companies.map((c, i) => (
                                    <div key={c._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: i < companies.length - 1 ? '12px' : '0', borderBottom: i < companies.length - 1 ? '1px dashed var(--border-glass)' : 'none', paddingBottom: i < companies.length - 1 ? '8px' : '0', gap: '16px' }}>
                                      <div>
                                        <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '13px' }}>🏢 {c.name}</span>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Type: {c.type || 'Retail'} | GST: {c.gstNumber || 'Unregistered'}</div>
                                      </div>
                                      <div style={{ display: 'flex', gap: '6px' }}>
                                        <button 
                                          onClick={() => handleOpenGstr(c)}
                                          className="btn-action" 
                                          style={{ padding: '3px 6px', fontSize: '10px', color: 'var(--primary)', borderColor: 'var(--primary-glow)' }}
                                          title="View / File GSTR Auditing Reports"
                                        >
                                          GSTR Auditing
                                        </button>
                                        <button 
                                          onClick={() => handleDeleteCompanyData(c._id, c.name)} 
                                          className="btn-action" 
                                          style={{ padding: '3px 6px', fontSize: '10px', color: 'var(--warning)', borderColor: 'var(--warning-glow)' }}
                                          title="Wipe database logs inside company"
                                        >
                                          Purge Data
                                        </button>
                                        <button 
                                          onClick={() => handleDeleteCompany(c._id, c.name)} 
                                          className="btn-action reject" 
                                          style={{ padding: '3px 6px', fontSize: '10px' }}
                                          title="Delete company completely"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </td>
                              <td>
                                {companies.length === 0 ? (
                                  <span style={{ color: 'var(--text-muted)' }}>—</span>
                                ) : (
                                  companies.map((c, i) => (
                                    <div key={c._id} style={{ fontSize: '11px', marginBottom: i < companies.length - 1 ? '12px' : '0' }}>
                                      <div>Phone: {c.phone || 'N/A'}</div>
                                      <div>Loc: {c.city ? `${c.city}, ${c.state || ''}` : 'N/A'}</div>
                                    </div>
                                  ))
                                )}
                              </td>
                              <td>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100px' }}>
                                  <select
                                    value={user.subscriptionType || 'BASIC'}
                                    onChange={(e) => handleUpdatePlan(user._id, e.target.value)}
                                    style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)', fontSize: '11px', fontWeight: '700', cursor: 'pointer', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}
                                  >
                                    <option value="BASIC">BASIC</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="PRO">PRO</option>
                                  </select>
                                  {user.subscriptionExpiresAt && (
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                                      Expires: {formatDate(user.subscriptionExpiresAt)}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td>{formatDate(user.createdAt)}</td>
                              <td>
                                <button 
                                  onClick={() => handleDeleteAccount(user._id, user.name)}
                                  className="btn-action reject"
                                  style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px' }}
                                >
                                  <X size={12} />
                                  <span>Delete Account</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── EDISTORE TAB ── */}
            {activeTab === 'edistore' && (
              <div className="section-card">
                <div className="section-hdr">
                  <h2 className="section-title">EdiStore E-commerce Storefronts</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Search size={16} color="var(--text-muted)" style={{ marginRight: '-36px', zIndex: 1, position: 'relative' }} />
                    <input 
                      type="text" 
                      placeholder="Search storefront name, type, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>

                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Store Details</th>
                        <th>Seller Credentials</th>
                        <th>Classification / Location</th>
                        <th>Platform Status</th>
                        <th>Verification Control</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEdistore.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                            No e-commerce stores found matching '{searchQuery}'
                          </td>
                        </tr>
                      ) : (
                        filteredEdistore.map((store) => {
                          const seller = regData.edistore.users.find(u => u._id === store.sellerId);
                          return (
                            <tr key={store._id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <span style={{ fontSize: '24px' }}>{store.logo || '🏪'}</span>
                                  <div>
                                    <strong style={{ color: 'var(--text-main)', fontSize: '14px' }}>{store.name}</strong>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Slug: /{store.slug}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {seller ? (
                                  <div>
                                    <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>{seller.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Email: {seller.email}</div>
                                  </div>
                                ) : (
                                  <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Unknown Seller ID</span>
                                )}
                              </td>
                              <td>
                                <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>{store.category?.toUpperCase()}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>City: {store.city}, {store.state}</div>
                              </td>
                              <td>
                                {store.isPending ? (
                                  <span className="badge pending">Awaiting Verification</span>
                                ) : store.isActive ? (
                                  <span className="badge approved">Active Storefront</span>
                                ) : (
                                  <span className="badge rejected">Deactivated</span>
                                )}
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className={`badge ${store.isVerified ? 'approved' : 'rejected'}`}>
                                    {store.isVerified ? 'VERIFIED' : 'UNVERIFIED'}
                                  </span>
                                  <button 
                                    onClick={() => handleStoreAction(store._id, 'toggleVerify')} 
                                    className="btn-action" 
                                    style={{ padding: '3px 6px', fontSize: '9px' }}
                                    title="Toggle Verification status"
                                  >
                                    Toggle Verify
                                  </button>
                                </div>
                              </td>
                              <td>
                                <div className="btn-action-wrap" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                  <button 
                                    onClick={() => { setSelectedStore(store); setShowStoreModal(true); }} 
                                    className="btn-action"
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', borderColor: 'var(--primary-glow)' }}
                                    title="View catalog, payouts commission ledger and logistics shipping requirements"
                                  >
                                    <span>Ledger & Orders</span>
                                  </button>

                                  {store.isPending ? (
                                    <>
                                      <button 
                                        onClick={() => handleStoreAction(store._id, 'approve')} 
                                        className="btn-action approve"
                                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                      >
                                        <Check size={11} />
                                        <span>Approve</span>
                                      </button>
                                      <button 
                                        onClick={() => handleStoreAction(store._id, 'reject')} 
                                        className="btn-action reject"
                                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                      >
                                        <X size={11} />
                                        <span>Reject</span>
                                      </button>
                                    </>
                                  ) : (
                                    <button 
                                      onClick={() => handleStoreAction(store._id, 'toggleActive')} 
                                      className="btn-action"
                                      style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                    >
                                      <span>{store.isActive ? 'Deactivate' : 'Activate'}</span>
                                    </button>
                                  )}

                                  <button 
                                    onClick={() => handleDeleteStore(store._id, store.name)} 
                                    className="btn-action reject"
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                    title="Delete store completely"
                                  >
                                    <X size={11} />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
            {/* GSTR Filing Modal */}
            {showGstrModal && selectedCompany && (
              <div style={modalOverlayStyle}>
                <div style={modalContentStyle}>
                  <div style={modalHeaderStyle}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }}>🏢 GSTR Indian Auditing Center: {selectedCompany.name}</h3>
                    <button onClick={() => setShowGstrModal(false)} className="btn-action reject" style={{ padding: '6px' }}><X size={16} /></button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', background: 'var(--bg-deep)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                      <div style={{ flex: 1 }}>
                        <strong>GSTIN:</strong> <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{selectedCompany.gstNumber || 'UNREGISTERED'}</span>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, marginRight: '8px' }}>Auditing Period:</label>
                        <select 
                          value={gstrPeriod} 
                          onChange={(e) => setGstrPeriod(e.target.value)}
                          style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                        >
                          <option value="07-2026">July 2026</option>
                          <option value="06-2026">June 2026</option>
                          <option value="05-2026">May 2026</option>
                        </select>
                      </div>
                    </div>

                    {loadingInvoices ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', gap: '12px' }}>
                        <RefreshCw size={24} className="spin-icon" style={{ animation: 'spin 2s linear infinite' }} />
                        <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>Compiling company invoices ledger from Atlas...</p>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                          <div className="card" style={{ padding: '16px', border: '1px solid var(--border-glass)', borderRadius: '10px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Invoices</span>
                            <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px' }}>{gstrInvoices.length} bills</div>
                          </div>
                          <div className="card" style={{ padding: '16px', border: '1px solid var(--border-glass)', borderRadius: '10px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Taxable Turnover</span>
                            <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px', color: 'var(--success)' }}>
                              ₹{gstrInvoices.filter(i => i.invoiceType === 'sale').reduce((sum, i) => sum + (i.taxableAmount || i.subTotal || 0), 0).toFixed(0)}
                            </div>
                          </div>
                          <div className="card" style={{ padding: '16px', border: '1px solid var(--border-glass)', borderRadius: '10px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>GST Liability</span>
                            <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>
                              ₹{gstrInvoices.filter(i => i.invoiceType === 'sale').reduce((sum, i) => sum + (i.totalGst || 0), 0).toFixed(0)}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                          <button onClick={downloadGstr1File} className="btn-action approve" style={{ flex: 1, padding: '12px', fontWeight: 'bold' }}>
                            📥 Export GSTR-1 (JSON Format)
                          </button>
                          <button onClick={downloadGstr3bFile} className="btn-action approve" style={{ flex: 1, padding: '12px', fontWeight: 'bold' }}>
                            📥 Export GSTR-3B (Filing JSON)
                          </button>
                        </div>
                        
                        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '12px', borderRadius: '8px', color: '#166534', fontSize: '11px', lineHeight: '1.4' }}>
                          <strong>Indian Tax Filing Notice:</strong> GSTR-1 (Sales Inward Ledger) must be submitted by the 11th of each month, and GSTR-3B (Summary Tax liability statement) by the 20th. These files are fully structured in the official GSTN offline utility format.
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <style>{`
                  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
              </div>
            )}

            {/* Store Ledger & Details Modal */}
            {showStoreModal && selectedStore && (() => {
              const storeOrders = regData.edistore.orders.filter((o: any) => o.storeId === selectedStore._id);
              const storeProducts = regData.edistore.products.filter((p: any) => p.storeId === selectedStore._id);
              const totalSales = storeOrders.filter((o: any) => o.paymentStatus === 'paid').reduce((sum: number, o: any) => sum + o.totalAmount, 0);
              const totalCommission = storeOrders.filter((o: any) => o.paymentStatus === 'paid').reduce((sum: number, o: any) => sum + (o.commissionAmount || (o.totalAmount * 0.05)), 0);
              const netPayout = totalSales - totalCommission;
              
              // Count orders needing courier/shipping
              const needsShippingOrders = storeOrders.filter((o: any) => o.status !== 'delivered' && o.status !== 'cancelled' && o.shippingAddress && o.shippingAddress.line1);

              return (
                <div style={modalOverlayStyle}>
                  <div style={{ ...modalContentStyle, maxWidth: '800px' }}>
                    <div style={modalHeaderStyle}>
                      <h3 style={{ fontSize: '18px', fontWeight: 800 }}>🏪 Store Ledger & Order Hub: {selectedStore.name}</h3>
                      <button onClick={() => setShowStoreModal(false)} className="btn-action reject" style={{ padding: '6px' }}><X size={16} /></button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
                      {/* Revenue Overview Ledger */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                        <div className="card" style={{ padding: '16px', border: '1px solid var(--border-glass)', borderRadius: '10px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gross Sales (Paid)</span>
                          <div style={{ fontSize: '22px', fontWeight: 900, marginTop: '4px', color: 'var(--text-main)' }}>₹{totalSales.toFixed(0)}</div>
                        </div>
                        <div className="card" style={{ padding: '16px', border: '1px solid var(--border-glass)', borderRadius: '10px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Avg Commission Rate</span>
                          <div style={{ fontSize: '22px', fontWeight: 900, marginTop: '4px', color: 'var(--warning)' }}>5%</div>
                        </div>
                        <div className="card" style={{ padding: '16px', border: '1px solid var(--border-glass)', borderRadius: '10px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Platform Commissions</span>
                          <div style={{ fontSize: '22px', fontWeight: 900, marginTop: '4px', color: 'var(--danger)' }}>₹{totalCommission.toFixed(0)}</div>
                        </div>
                        <div className="card" style={{ padding: '16px', border: '1px solid var(--border-glass)', borderRadius: '10px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Net Payout Disbursed</span>
                          <div style={{ fontSize: '22px', fontWeight: 900, marginTop: '4px', color: 'var(--success)' }}>₹{netPayout.toFixed(0)}</div>
                        </div>
                      </div>

                      {/* Shipping alert if courier is needed */}
                      {needsShippingOrders.length > 0 && (
                        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '14px', borderRadius: '10px', color: '#1E40AF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🚚</span>
                            <span style={{ fontSize: '12px', fontWeight: 700 }}>{needsShippingOrders.length} Order(s) Awaiting Courier/Shipping Services!</span>
                          </div>
                          <span className="badge basic" style={{ backgroundColor: '#2563EB', color: '#FFFFFF', padding: '4px 10px' }}>Urgent Logistics</span>
                        </div>
                      )}

                      {/* Orders Log */}
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>Storefront Sales Registries</h4>
                        {storeOrders.length === 0 ? (
                          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '12px 0' }}>No customer orders logged yet.</p>
                        ) : (
                          <div className="table-wrap">
                            <table className="admin-table" style={{ fontSize: '12px' }}>
                              <thead>
                                <tr>
                                  <th>Order No</th>
                                  <th>Customer</th>
                                  <th>Amount</th>
                                  <th>Comms Retained</th>
                                  <th>Logistics / Shipping</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {storeOrders.map((o: any) => {
                                  const commAmt = o.commissionAmount || (o.totalAmount * 0.05);
                                  const requiresCourier = o.shippingAddress && o.shippingAddress.line1;
                                  return (
                                    <tr key={o._id}>
                                      <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{o.orderNumber}</td>
                                      <td>
                                        <div>{o.customerName}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{o.customerPhone}</div>
                                      </td>
                                      <td style={{ fontWeight: 'bold' }}>₹{o.totalAmount}</td>
                                      <td style={{ color: 'var(--danger)', fontWeight: 600 }}>₹{commAmt.toFixed(0)}</td>
                                      <td>
                                        {requiresCourier ? (
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span style={{ color: '#2563EB', fontWeight: 'bold', fontSize: '10px' }}>🚚 COURIER REQUIRED</span>
                                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', lineHeight: '1.2' }}>
                                              {o.shippingAddress.line1}, {o.shippingAddress.city} - {o.shippingAddress.pincode}
                                            </span>
                                          </div>
                                        ) : (
                                          <span style={{ color: 'var(--text-muted)' }}>Self Pickup / Local</span>
                                        )}
                                      </td>
                                      <td>
                                        <span className={`badge ${o.status === 'delivered' ? 'approved' : o.status === 'placed' ? 'pending' : 'basic'}`}>
                                          {o.status}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Products Listings */}
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>Active Catalog Listings ({storeProducts.length})</h4>
                        {storeProducts.length === 0 ? (
                          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '12px 0' }}>No products listed on storefront.</p>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                            {storeProducts.map((p: any) => (
                              <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid var(--border-glass)', borderRadius: '8px', background: 'var(--bg-deep)' }}>
                                <span style={{ fontSize: '20px' }}>{p.image || '📦'}</span>
                                <div>
                                  <div style={{ fontWeight: 'bold', fontSize: '12px', color: 'var(--text-main)' }}>{p.name}</div>
                                  <div style={{ fontSize: '11px', color: 'var(--text-sub)', marginTop: '2px' }}>Price: <strong>₹{p.price}</strong> • Stock: {p.stockQty} {p.unit}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
      </main>

      <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--border-glass)', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
        <span>Edibio Suite Unified Admin Dashboard v1.0.0</span>
        <span>© 2026 Edibio Technologies Pvt. Ltd. All rights reserved.</span>
      </footer>
    </div>
  );
}

// Modal Styles
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.4)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px'
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-surface)',
  border: '1px solid var(--border-glass)',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '640px',
  padding: '24px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  color: 'var(--text-main)'
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid var(--border-glass)',
  paddingBottom: '16px',
  marginBottom: '16px'
};
