'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';
import { Users, CreditCard, ShoppingCart, Activity, ShieldAlert, Key, Download, Trash2, PowerOff, FileSpreadsheet, Eye, Search, X, Package, Database, BarChart, List, User, Mail, Phone, Building } from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list');
    const [stats, setStats] = useState({ totalUsers: 0, paidUsers: 0, totalSales: 0, aiUsers: 0 });
    const [analyticsData, setAnalyticsData] = useState<{ signups: any[], sales: any[] }>({ signups: [], sales: [] });
    const [otpModal, setOtpModal] = useState<{ isOpen: boolean, companyId: string, docId: string, phone: string, entityLabel: string } | null>(null);
    const [otpInput, setOtpInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewingData, setViewingData] = useState<any>(null);
    const [promotingUser, setPromotingUser] = useState<any>(null);
    const [selectedPlan, setSelectedPlan] = useState<string>('standard');
    const [renewMonths, setRenewMonths] = useState(12);
    const [saving, setSaving] = useState(false);
    const [editCompanyModal, setEditCompanyModal] = useState<any>(null);
    const [companyFormData, setCompanyFormData] = useState({ companyName: '', companyType: '', companyPhone: '', companyGst: '' });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/data');
            if (!res.ok) throw new Error('Failed to fetch MongoDB admin data');
            const { accounts } = await res.json();

            let tUsers = accounts.length;
            let pUsers = 0;
            let tSales = 0;
            let tAi = 0;

            const signupStats: Record<string, number> = {};
            const salesStats: Record<string, number> = {};

            accounts.forEach((userObj: any) => {
                const plan = userObj.plan;
                if (plan !== 'free' && plan !== 'Free Trial' && plan !== 'expired_subscription') {
                    pUsers++;
                }

                tSales += userObj.totalInvoices || 0;
                if (userObj.aiApiKey) tAi++;

                const createdDate = userObj.updatedAt ? new Date(userObj.updatedAt).toISOString().split('T')[0] : 'Unknown';
                signupStats[createdDate] = (signupStats[createdDate] || 0) + 1;
            });

            // Recharts format
            const signups = Object.entries(signupStats).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)).slice(-15);
            const sales = Object.entries(salesStats).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)).slice(-15);

            setUsersList(accounts.sort((a: any, b: any) => (b.updatedAt || 0) - (a.updatedAt || 0)));
            setStats({ totalUsers: tUsers, paidUsers: pUsers, totalSales: tSales, aiUsers: tAi });
            setAnalyticsData({ signups, sales });
        } catch (err) {
            console.error('Error fetching admin stats:', err);
            toast.error('Failed to load MongoDB results');
        } finally {
            setLoading(false);
        }
    };

    const handleProvideAPI = async (docId: string) => {
        const key = prompt('Enter the exclusive AI API key for this user:');
        if (!key && key !== '') return;

        try {
            const res = await fetch('/api/admin/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: docId, aiApiKey: key })
            });

            if (!res.ok) throw new Error('Failed to update Key');
            toast.success('API Key updated successfully.');
            fetchAccounts();
        } catch (err) {
            toast.error('Failed to update API Key');
        }
    };

    const handleTerminate = async (docId: string) => {
        const yes = await confirm({ message: 'Are you sure you want to terminate the plan for this user? They will revert to basic.', danger: true });
        if (!yes) return;

        try {
            const res = await fetch('/api/admin/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: docId, plan: 'free' })
            });

            if (!res.ok) throw new Error('Failed to update MongoDB');
            toast.success('Plan terminated successfully.');
            fetchAccounts();
        } catch (err) {
            toast.error('Failed to terminate plan');
        }
    };

    const handleApplyPlan = async () => {
        if (!promotingUser) return;
        setSaving(true);
        try {
            const expiry = selectedPlan !== 'free'
                ? new Date(Date.now() + renewMonths * 30 * 86400000).toISOString()
                : null;
            
            const res = await fetch('/api/admin/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: promotingUser.docId,
                    plan: selectedPlan,
                    expiry
                })
            });

            if (!res.ok) throw new Error('Failed to update MongoDB');

            toast.success(`Plan updated to ${selectedPlan} for ${promotingUser.name}`);
            setPromotingUser(null);
            fetchAccounts();
        } catch (err) { 
            toast.error('Failed to update plan'); 
        } finally { 
            setSaving(false); 
        }
    };

    const handleSaveCompany = async () => {
        if (!editCompanyModal) return;
        setSaving(true);
        try {
            const res = await fetch('/api/admin/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: editCompanyModal.userId,
                    companyId: editCompanyModal.id,
                    ...companyFormData
                })
            });
            if (!res.ok) throw new Error('Failed to update company');
            toast.success('Company updated successfully');
            setEditCompanyModal(null);
            fetchAccounts();
        } catch (err) {
            toast.error('Update failed');
        } finally {
            setSaving(false);
        }
    };

    const handleDownloadReport = (co: any, user: any) => {
        const printWindow = window.open('', '', 'width=800,height=600');
        if (!printWindow) return toast.error('Popup blocked');
        printWindow.document.write(`
            <html><head><title>${co.name} Report</title>
            <style>body{font-family:sans-serif;padding:40px;color:#333;line-height:1.6}h1{color:#1A1A2E;margin-bottom:5px}hr{border:0;border-top:1px solid #eee;margin:20px 0}</style>
            </head><body>
            <h1>${co.name}</h1>
            <p><strong>Owner:</strong> ${user.name} (${user.email})</p>
            <p><strong>Plan:</strong> ${user.plan}</p>
            <hr/>
            <h3>Company Details</h3>
            <p><strong>Type:</strong> ${co.type || 'N/A'}</p>
            <p><strong>GST Number:</strong> ${co.gstNumber || 'N/A'}</p>
            <p><strong>Phone:</strong> ${co.phone || 'N/A'}</p>
            <p><strong>Total Invoices:</strong> ${co.invoices || 0}</p>
            <hr/>
            <p style="font-size:12px;color:#888;">Generated by Edibio Admin Panel • ${new Date().toLocaleString()}</p>
            <script>window.onload = function() { window.print(); window.close(); }</script>
            </body></html>
        `);
        printWindow.document.close();
    };

    const requestDeleteOTP = async (docId: string, companyId: string, companyName: string, userPhone: string) => {
        const yes = await confirm({ message: `Warning: You are about to completely delete the company "${companyName}". Send OTP to ${userPhone}?`, danger: true });
        if (!yes) return;
        toast.success(`OTP sent to ${userPhone}. Simulation: 123456`, { duration: 5000 });
        setOtpModal({ isOpen: true, companyId, docId, phone: userPhone, entityLabel: companyName });
    };

    const requestDeleteUserOTP = async (docId: string, userEmail: string, userPhone: string) => {
        const yes = await confirm({ message: `Warning: You are about to permanently WIPE the ENTIRE ACCOUNT for ${userEmail}. Send OTP to ${userPhone}?`, danger: true });
        if (!yes) return;
        toast.success(`OTP sent to ${userPhone}. Simulation: 123456`, { duration: 5000 });
        setOtpModal({ isOpen: true, companyId: 'DELETE_USER', docId, phone: userPhone, entityLabel: `User Account ${userEmail}` });
    };

    const confirmDelete = async () => {
        if (otpInput !== '123456') {
            toast.error('Invalid OTP.');
            return;
        }

        const { docId, companyId, entityLabel } = otpModal!;
        try {
            setLoading(true);
            setOtpModal(null);
            setOtpInput('');

            const action = companyId === 'DELETE_USER' ? 'WIPE_ACCOUNT' : 'DELETE_COMPANY';
            const res = await fetch('/api/admin/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, userId: docId, companyId: companyId === 'DELETE_USER' ? undefined : companyId })
            });

            if (!res.ok) throw new Error('Action failed');

            toast.success(`Successfully processed ${action} for ${entityLabel}`);
            fetchAccounts();
        } catch (err) {
            toast.error('Failed to perform deletion.');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = usersList.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.docId?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: '60dvh', color: '#64748B', fontWeight: 600 }}>Loading control center data...</div>;
    }

    return (
        <div>
            <style>{`
                .adm-page-title { font-size: 26px; }
                .adm-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px; }
                .adm-stats-card { background: white; padding: 16px; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 10px; }
                .adm-stats-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .adm-toggle-row { display: flex; gap: 10px; margin-bottom: 20px; }
                .adm-user-card { background: white; border-radius: 16px; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #F1F5F9; margin-bottom: 12px; }
                .adm-user-top { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; border-bottom: 1px solid #F8FAFC; padding-bottom: 12px; }
                .adm-user-info { flex: 1; min-width: 0; }
                .adm-user-name { font-size: 15px; font-weight: 800; color: #1A1A2E; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
                .adm-user-meta { display: flex; gap: 10px; margin-top: 5px; flex-wrap: wrap; }
                .adm-user-meta span { font-size: 11px; color: #64748B; display: flex; align-items: center; gap: 3px; }
                .adm-actions { display: flex; gap: 6px; flex-wrap: wrap; }
                .adm-action-btn { padding: 7px 10px; border-radius: 8px; border: none; cursor: pointer; display: flex; gap: 4px; align-items: center; font-size: 11px; font-weight: 700; white-space: nowrap; }
                @media (max-width: 639px) {
                    .adm-page-title { font-size: 20px !important; }
                    .adm-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
                    .adm-stats-card { padding: 12px; }
                    .adm-toggle-row { gap: 6px; }
                    .adm-toggle-row .btn { font-size: 12px; padding: 8px 10px; flex: 1; max-width: none !important; }
                    .adm-user-top { flex-wrap: wrap; }
                    .adm-actions { flex-wrap: wrap; }
                }
                @media (min-width: 640px) {
                    .adm-stats-grid { grid-template-columns: repeat(4, 1fr); }
                }
            `}</style>
            {/* Page Header */}
            <div style={{ marginBottom: 20 }}>
                <h1 className="adm-page-title" style={{ fontWeight: 900, color: '#1A1A2E', letterSpacing: '-0.01em' }}>Admin Control Center</h1>
                <p style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>Manage user accounts, subscriptions, and system-wide AI provisioning.</p>
            </div>
            <div style={{ position: 'relative', marginBottom: 24 }}>
                <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={15} />
                <input className="e-input" placeholder="Search by name, email, or phone..." style={{ paddingLeft: 38, height: 42 }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            {/* Stats Cards */}
            <div className="adm-stats-grid">
                {[
                    { label: 'Total Accounts', value: stats.totalUsers, bg: '#E0E7FF', iconColor: '#4338CA', Icon: Users },
                    { label: 'Paid Plans', value: stats.paidUsers, bg: '#DCFCE7', iconColor: '#15803D', Icon: CreditCard },
                    { label: 'Total Invoices', value: stats.totalSales, bg: '#FFF7ED', iconColor: '#C2410C', Icon: ShoppingCart },
                    { label: 'AI Provisioned', value: stats.aiUsers, bg: '#F3E8FF', iconColor: '#7E22CE', Icon: Activity },
                ].map(({ label, value, bg, iconColor, Icon }) => (
                    <div key={label} className="adm-stats-card">
                        <div className="adm-stats-icon" style={{ background: bg }}><Icon size={20} color={iconColor} /></div>
                        <div>
                            <p style={{ fontSize: 11, color: '#64748B', fontWeight: 700 }}>{label}</p>
                            <h3 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginTop: 2 }}>{value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Toggle */}
            <div className="adm-toggle-row">
                <button onClick={() => setViewMode('list')} className={`btn ${viewMode === 'list' ? 'btn-blue' : 'btn-outline'}`} style={{ gap: 6, height: 40, borderRadius: 10, flex: 1, maxWidth: 200, fontSize: 13 }}>
                    <List size={16} /> User Accounts
                </button>
                <button onClick={() => setViewMode('analytics')} className={`btn ${viewMode === 'analytics' ? 'btn-blue' : 'btn-outline'}`} style={{ gap: 6, height: 40, borderRadius: 10, flex: 1, maxWidth: 200, fontSize: 13 }}>
                    <BarChart size={16} /> Diagnostics
                </button>
            </div>

            {viewMode === 'list' ? (
                /* Master Account List */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>
                        Showing {filteredUsers.length} of {usersList.length} global accounts
                    </div>
                    {filteredUsers.map(userObj => (
                        <div key={userObj.docId} style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            {/* USER HEADER */}
                            <div className="admin-user-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, borderBottom: '1px solid #F1F5F9', paddingBottom: 16, marginBottom: 16 }}>
                                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                                    <div style={{ width: 50, height: 50, borderRadius: 12, background: 'linear-gradient(135deg, #1A1A2E, #4285F4)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 20 }}>
                                        {userObj.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                            {userObj.name}
                                            <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 20, background: userObj.plan === 'expired_subscription' ? '#FEE2E2' : '#E0E7FF', color: userObj.plan === 'expired_subscription' ? '#991B1B' : '#3730A3', fontSize: 11, fontWeight: 700, textTransform: 'capitalize' }}>
                                                {userObj.plan}
                                            </span>
                                        </h3>
                                        <div className="admin-user-meta" style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B' }}><Mail size={14} /> {userObj.email}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B' }}><Phone size={14} /> {userObj.phone}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B' }} title="Doc ID"><Key size={14} /> {userObj.docId.substring(0, 10)}...</div>
                                        </div>
                                    </div>
                                </div>
                            {/* Actions */}
                            <div className="adm-actions">
                                <button onClick={() => setViewingData(userObj)} className="adm-action-btn" style={{ background: '#F5F3FF', color: '#7C3AED' }}><Eye size={13} /> View JSON</button>
                                <button onClick={() => handleProvideAPI(userObj.docId)} className="adm-action-btn" style={{ background: userObj.aiApiKey ? '#F0FDF4' : 'white', color: userObj.aiApiKey ? '#16A34A' : '#64748B', border: '1px solid #E2E8F0' }}><Key size={13} /> {userObj.aiApiKey ? 'API Active' : 'Assign API'}</button>
                                <button onClick={() => { setPromotingUser(userObj); setSelectedPlan(userObj.plan === 'expired_subscription' ? 'standard' : userObj.plan); }} className="adm-action-btn" style={{ background: '#EDE9FE', color: '#7C3AED' }}><CreditCard size={13} /> Change Plan</button>
                                <button onClick={() => handleTerminate(userObj.docId)} className="adm-action-btn" style={{ background: '#FFF7ED', color: '#EA580C' }}><PowerOff size={13} /> Demote</button>
                                <button onClick={() => requestDeleteUserOTP(userObj.docId, userObj.email, userObj.phone)} className="adm-action-btn" style={{ background: '#FEF2F2', color: '#DC2626' }}><Trash2 size={13} /> Wipe</button>
                            </div>
                            </div>

                            {/* COMPANIES UNDER THIS USER */}
                            <div>
                                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#475569', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Building size={16} /> Attached Companies ({userObj.companies.length})
                                </h4>
                                {userObj.companies.length === 0 ? (
                                    <div style={{ padding: 16, background: '#F8FAFC', borderRadius: 12, color: '#94A3B8', fontSize: 13 }}>No active companies under this account. ({userObj.invoicesCount} global invoices generated pre-company binding)</div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                                        {userObj.companies.map((co: any) => {
                                            const coInvoices = co.invoices || 0;
                                            return (
                                                <div key={co.id} style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, background: '#F8FAFC', position: 'relative' }}>
                                                    <h5 style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E', marginBottom: 4, paddingRight: 30 }}>{co.name}</h5>
                                                    <p style={{ fontSize: 12, color: '#64748B', marginBottom: 2 }}>Type: {co.type || 'N/A'}</p>
                                                    <p style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>Invoices Generated: <strong>{coInvoices}</strong></p>
                                                    <p style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' }}>{co.id}</p>
                                                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 4 }}>
                                                        <button
                                                            onClick={() => {
                                                                setEditCompanyModal({ ...co, userId: userObj.docId });
                                                                setCompanyFormData({ companyName: co.name, companyType: co.type || '', companyPhone: co.phone || '', companyGst: co.gstNumber || '' });
                                                            }}
                                                            style={{ background: 'none', border: 'none', color: '#4285F4', cursor: 'pointer', padding: 4 }}
                                                            title="Edit Company"
                                                        >
                                                            <Key size={16} /> {/* Or another icon like Edit2 if available */}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDownloadReport(co, userObj)}
                                                            style={{ background: 'none', border: 'none', color: '#10B981', cursor: 'pointer', padding: 4 }}
                                                            title="Download PDF Report"
                                                        >
                                                            <Download size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => requestDeleteOTP(userObj.docId, co.id, co.name, userObj.phone)}
                                                            style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 4 }}
                                                            title="Delete this specific company"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Analytics Section */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                    <div style={{ background: 'white', padding: 24, borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, color: '#1A1A2E' }}>User Activity (Last 15 Syncs)</h3>
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <AreaChart data={analyticsData.signups}>
                                    <defs>
                                        <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                                    <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="count" stroke="#4285F4" strokeWidth={3} fillOpacity={1} fill="url(#colorSignups)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: 24, borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, color: '#1A1A2E' }}>Invoicing Volume (Last 15 Days)</h3>
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <ReBarChart data={analyticsData.sales}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                                    <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="count" fill="#34A853" radius={[6, 6, 0, 0]} barSize={24} />
                                </ReBarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* OTP Modal */}
            {otpModal && (
                <div className="modal-overlay" style={{ padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setOtpModal(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 400, padding: 30, textAlign: 'center' }}>
                        <div style={{ width: 64, height: 64, borderRadius: 999, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><ShieldAlert color="#DC2626" size={32} /></div>
                        <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Permanent Deletion</h3>
                        <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Enter verification OTP sent to <strong>{otpModal.phone}</strong> to erase <b>{otpModal.entityLabel}</b></p>
                        <input className="e-input" placeholder="123456" value={otpInput} onChange={e => setOtpInput(e.target.value)} style={{ textAlign: 'center', fontSize: 24, letterSpacing: 8, marginBottom: 20 }} />
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={() => setOtpModal(null)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                            <button onClick={confirmDelete} className="btn btn-blue" style={{ flex: 1, background: '#DC2626' }}>Erase Target</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Plan Modal */}
            {promotingUser && (
                <div className="modal-overlay" onClick={() => setPromotingUser(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
                        <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontWeight: 900, fontSize: 16 }}>Assign / Renew Plan</p>
                                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{promotingUser.name} • {promotingUser.email}</p>
                            </div>
                            <button onClick={() => setPromotingUser(null)} className="btn btn-ghost btn-icon"><X size={16} /></button>
                        </div>
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <p style={{ fontSize: 11, fontWeight: 800, color: '#374151', marginBottom: 10 }}>Select New Plan</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                                    {[
                                        { id: 'free', label: 'Free', color: '#64748B', bg: '#F1F5F9' },
                                        { id: 'standard', label: 'Standard', color: '#4338CA', bg: '#EEF2FF' },
                                        { id: 'premium', label: 'Premium', color: '#B45309', bg: '#FEF3C7' },
                                    ].map(p => (
                                        <button 
                                            key={p.id} 
                                            onClick={() => setSelectedPlan(p.id)}
                                            style={{ 
                                                padding: '12px', 
                                                borderRadius: '12px', 
                                                border: `2px solid ${selectedPlan === p.id ? p.color : '#E2E8F0'}`,
                                                background: selectedPlan === p.id ? p.bg : 'white',
                                                color: p.color,
                                                fontWeight: 800,
                                                fontSize: 12,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedPlan !== 'free' && (
                                <div>
                                    <p style={{ fontSize: 11, fontWeight: 800, color: '#374151', marginBottom: 10 }}>Subscription Period</p>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        {[1, 3, 6, 12, 24].map(m => (
                                            <button 
                                                key={m} 
                                                onClick={() => setRenewMonths(m)}
                                                style={{ 
                                                    padding: '8px 14px', 
                                                    borderRadius: '8px', 
                                                    border: `2px solid ${renewMonths === m ? '#4285F4' : '#E2E8F0'}`,
                                                    background: renewMonths === m ? '#E8F0FE' : 'white',
                                                    color: renewMonths === m ? '#1D4ED8' : '#64748B',
                                                    fontWeight: 700,
                                                    fontSize: 12,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {m}M
                                            </button>
                                        ))}
                                    </div>
                                    <p style={{ fontSize: 10, color: '#94A3B8', marginTop: 10 }}>
                                        Valid until: <strong style={{ color: '#374151' }}>{new Date(Date.now() + renewMonths * 30 * 86400000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '16px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 10 }}>
                            <button onClick={() => setPromotingUser(null)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                            <button onClick={handleApplyPlan} disabled={saving} className="btn btn-blue" style={{ flex: 2 }}>{saving ? 'Processing...' : 'Save Subscription'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Company Modal */}
            {editCompanyModal && (
                <div className="modal-overlay" onClick={() => setEditCompanyModal(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
                        <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontWeight: 900, fontSize: 16 }}>Edit Company</p>
                            </div>
                            <button onClick={() => setEditCompanyModal(null)} className="btn btn-ghost btn-icon"><X size={16} /></button>
                        </div>
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Company Name</label>
                                <input className="e-input" value={companyFormData.companyName} onChange={e => setCompanyFormData({ ...companyFormData, companyName: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Company Type</label>
                                <input className="e-input" value={companyFormData.companyType} onChange={e => setCompanyFormData({ ...companyFormData, companyType: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Phone Number</label>
                                <input className="e-input" value={companyFormData.companyPhone} onChange={e => setCompanyFormData({ ...companyFormData, companyPhone: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>GST Number</label>
                                <input className="e-input" value={companyFormData.companyGst} onChange={e => setCompanyFormData({ ...companyFormData, companyGst: e.target.value })} />
                            </div>
                        </div>
                        <div style={{ padding: '16px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 10 }}>
                            <button onClick={() => setEditCompanyModal(null)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                            <button onClick={handleSaveCompany} disabled={saving} className="btn btn-blue" style={{ flex: 1 }}>{saving ? 'Saving...' : 'Save'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Browser Modal */}
            {viewingData && (
                <div className="modal-overlay" style={{ padding: '20px' }} onClick={() => setViewingData(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 840, maxHeight: '85dvh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, background: '#F5F3FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}><Database size={20} /></div>
                                <div><h3 style={{ fontWeight: 800, fontSize: 18 }}>Raw Data</h3><p style={{ fontSize: 12, color: '#64748B' }}>Doc: {viewingData.docId}</p></div>
                            </div>
                            <button onClick={() => setViewingData(null)} className="btn btn-ghost btn-icon"><X /></button>
                        </div>
                        <div style={{ flex: 1, background: '#0F172A', color: '#10B981', padding: 24, overflow: 'auto', fontSize: 13, fontFamily: 'monospace' }}>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                {JSON.stringify(viewingData, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
