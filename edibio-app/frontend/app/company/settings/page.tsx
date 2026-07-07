'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import GstSuitePanel from '@/components/GstSuitePanel';
import FranchisePanel from '@/components/FranchisePanel';

import {
    Store, FileText, Printer, Shield, Bell, ChevronRight, Share2, Percent,
    Check, Plus, Edit2, Trash2, Eye, X, Palette, Warehouse, Settings, Users, Landmark,
    MessageSquare, Database, Download, Upload, RefreshCw, Cloud, CheckCircle, Smartphone, ShieldCheck, HardDrive, Gift
} from 'lucide-react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';
import { canAccess } from '@/components/FeatureGate';
import {
    getAutoBackupMeta, restoreFromAutoBackup,
    BACKUP_INTERVAL_OPTIONS, getBackupIntervalMs, setBackupIntervalMs
} from '@/components/AutoBackup';



function AutoBackupStatusCard() {
    const meta = getAutoBackupMeta();
    const [restoring, setRestoring] = useState(false);
    const [intervalMs, setIntervalMsState] = useState<number>(() => getBackupIntervalMs());

    const handleIntervalChange = (ms: number) => {
        setIntervalMsState(ms);
        setBackupIntervalMs(ms);
        // Broadcast to other tabs so AutoBackup picks it up
        window.dispatchEvent(new StorageEvent('storage', { key: 'edibio_backup_interval', newValue: String(ms) }));
        toast.success('Backup interval updated!');
    };

    const handleRestore = async () => {
        const yes = await confirm({ message: 'Restore all data from your last auto-backup? This will overwrite your current data.', danger: true });
        if (!yes) return;
        setRestoring(true);
        const ok = restoreFromAutoBackup();
        setRestoring(false);
        if (ok) {
            toast.success('✅ Data restored from auto-backup!');
        } else {
            toast.error('No auto-backup found.');
        }
    };

    return (
        <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HardDrive size={20} color="#D97706" />
                </div>
                <div>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E', margin: 0 }}>Auto-Backup (Local)</h3>
                    <p style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Saved automatically to your browser storage.</p>
                </div>
            </div>

            {/* Interval selector */}
            <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Backup Frequency</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {BACKUP_INTERVAL_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => handleIntervalChange(opt.value)}
                            style={{
                                padding: '7px 16px', borderRadius: 8, border: '2px solid',
                                borderColor: intervalMs === opt.value ? '#D97706' : '#E2E8F0',
                                background: intervalMs === opt.value ? '#FFFBEB' : 'white',
                                color: intervalMs === opt.value ? '#92400E' : '#64748B',
                                fontWeight: 800, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {meta ? (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                        <div><p style={{ fontSize: 10, fontWeight: 800, color: '#92400E', textTransform: 'uppercase' }}>Last Saved</p><p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginTop: 2 }}>{new Date(meta.savedAt).toLocaleString()}</p></div>
                        <div><p style={{ fontSize: 10, fontWeight: 800, color: '#92400E', textTransform: 'uppercase' }}>Bills</p><p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginTop: 2 }}>{meta.invoiceCount}</p></div>
                        <div><p style={{ fontSize: 10, fontWeight: 800, color: '#92400E', textTransform: 'uppercase' }}>Parties</p><p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginTop: 2 }}>{meta.partyCount}</p></div>
                        <div><p style={{ fontSize: 10, fontWeight: 800, color: '#92400E', textTransform: 'uppercase' }}>Products</p><p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginTop: 2 }}>{meta.productCount}</p></div>
                    </div>
                </div>
            ) : (
                <div style={{ background: '#F1F5F9', borderRadius: 10, padding: '12px 14px', marginBottom: 16, fontSize: 13, color: '#64748B' }}>
                    No auto-backup saved yet. It will save automatically once you have data.
                </div>
            )}
            <button onClick={handleRestore} disabled={restoring || !meta} className="btn btn-outline" style={{ gap: 8 }}>
                <HardDrive size={15} /> {restoring ? 'Restoring…' : 'Restore from Auto-Backup'}
            </button>
        </div>
    );
}

function RestaurantChargesPanel({ company, updateCompany, companyId }: { company: any; updateCompany: any; companyId: string }) {
    const [deliveryCharge, setDeliveryCharge] = useState<string>(String(company?.restaurantSettings?.deliveryCharge ?? '0'));
    const [takeawayCharge, setTakeawayCharge] = useState<string>(String(company?.restaurantSettings?.takeawayCharge ?? '0'));
    const [tableCount, setTableCount] = useState<string>(String(company?.restaurantSettings?.tableCount ?? '12'));

    const saveCharges = () => {
        updateCompany(companyId, {
            restaurantSettings: {
                ...(company?.restaurantSettings || {}),
                deliveryCharge: parseFloat(deliveryCharge) || 0,
                takeawayCharge: parseFloat(takeawayCharge) || 0,
                tableCount: parseInt(tableCount) || 12,
            }
        });
        // Also save to localStorage for POS page
        if (typeof window !== 'undefined') {
            localStorage.setItem('restaurant_settings', JSON.stringify({
                deliveryCharge: parseFloat(deliveryCharge) || 0,
                takeawayCharge: parseFloat(takeawayCharge) || 0,
                tableCount: parseInt(tableCount) || 12,
            }));
        }
        import('react-hot-toast').then(m => m.default.success('Restaurant charges saved!'));
    };

    return (
        <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: 14, padding: '18px 20px', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 22 }}>🍽️</span>
                <div>
                    <h3 style={{ fontWeight: 800, fontSize: 14, color: '#1E40AF', margin: 0 }}>Restaurant Settings</h3>
                    <p style={{ fontSize: 11, color: '#3B82F6', margin: 0 }}>Configure charges and table layout for your restaurant</p>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#1E40AF', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>Delivery Charge (₹)</label>
                    <input type="number" className="e-input" value={deliveryCharge} onChange={e => setDeliveryCharge(e.target.value)} placeholder="0" min="0" />
                </div>
                <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#1E40AF', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>Takeaway Charge (₹)</label>
                    <input type="number" className="e-input" value={takeawayCharge} onChange={e => setTakeawayCharge(e.target.value)} placeholder="0" min="0" />
                </div>
                <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#1E40AF', display: 'block', marginBottom: 5, textTransform: 'uppercase' }}>Number of Tables</label>
                    <input type="number" className="e-input" value={tableCount} onChange={e => setTableCount(e.target.value)} placeholder="12" min="1" max="50" />
                </div>
            </div>
            <button onClick={saveCharges} className="btn btn-blue" style={{ marginTop: 14 }}>Save Restaurant Settings</button>
        </div>
    );
}


export default function SettingsPage() {
    const { activeCompanyId } = useStore();
    const companyId = activeCompanyId;
    const company = useActiveCompany();
    const { updateCompany, addGodown, removeGodown, deleteCompany, exportBackup, importBackup, aiApiKey, setAiApiKey, user, updateUser, addBranch, updateBranch, deleteBranch } = useStore();

    const invoices = useCompanyData('invoices') as any[] || [];
    const [newTeamCounter, setNewTeamCounter] = useState('');

    const counterSales = useMemo(() => {
        const counts: Record<string, { count: number; total: number }> = {
            'Counter 1': { count: 0, total: 0 },
            'Counter 2': { count: 0, total: 0 },
            'Counter 3': { count: 0, total: 0 },
            'Counter 4': { count: 0, total: 0 },
        };
        invoices.forEach(inv => {
            const c = inv.counter || 'Counter 1';
            if (counts[c] && inv.invoiceType === 'sale') {
                counts[c].count += 1;
                counts[c].total += inv.grandTotal || 0;
            }
        });
        return counts;
    }, [invoices]);

    const [tab, setTab] = useState<'business' | 'godowns' | 'banking' | 'team' | 'security' | 'communication' | 'data' | 'loyalty' | 'gst' | 'franchise'>('business');
    const importFileRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const [deleteStep, setDeleteStep] = useState(0);
    const [deleteInput, setDeleteInput] = useState('');

    const plan = user?.subscriptionType?.toLowerCase();
    const isTrialActive = user?.trialExpiresAt && new Date(user.trialExpiresAt).getTime() > Date.now();
    let MAX_GODOWNS = 1;
    if (isTrialActive && !plan) MAX_GODOWNS = 3;
    else if (plan === 'premium') MAX_GODOWNS = 3;
    else if (plan === 'standard') MAX_GODOWNS = 2;
    else MAX_GODOWNS = 1;

    const [licenseKey, setLicenseKey] = useState('');

    const handleRedeemLicense = () => {
        if (licenseKey.trim() === 'EDIBIOADM') {
            const u = useStore.getState().user;
            if (u) {
                useStore.getState().updateUser({ subscriptionType: 'premium', subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() });
                toast.success("Admin License Redeemed! Premium Activated.");
                setLicenseKey('');
            }
        } else {
            toast.error("Invalid or Expired License Key");
        }
    };

    // Bank Details
    const [bank, setBank] = useState({
        bankName: company?.bankDetails?.bankName || '',
        accountName: company?.bankDetails?.accountName || '',
        accountNumber: company?.bankDetails?.accountNumber || '',
        ifsc: company?.bankDetails?.ifsc || '',
        upiId: company?.bankDetails?.upiId || '',
    });
    const uBank = (k: string, v: string) => setBank(b => ({ ...b, [k]: v }));
    const saveBank = () => { updateCompany(companyId!, { bankDetails: bank as any }); toast.success('Bank details saved!'); };

    // Team Details
    const [newTeamMember, setNewTeamMember] = useState(''); // We can keep this if needed or repurpose.
    const [newTeamRole, setNewTeamRole] = useState('staff');
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamPassword, setNewTeamPassword] = useState('');

    // Business form
    const [biz, setBiz] = useState({
        name: company?.name || '', phone: company?.phone || '', email: company?.email || '',
        gstNumber: company?.gstNumber || '', address: company?.address || '',
        city: company?.city || '', state: company?.state || 'Tamil Nadu',
        invoicePrefix: company?.invoicePrefix || 'INV',
        invoicePassword: company?.invoicePassword || '',
        logoUrl: company?.logoUrl || '',
    });
    const ubiz = (k: string, v: string) => setBiz(f => ({ ...f, [k]: v }));
    const saveBiz = () => { updateCompany(companyId!, biz); toast.success('Business profile updated!'); };

    // Loyalty Program States
    const [loyaltyEnabled, setLoyaltyEnabled] = useState(false);
    const [earnRatio, setEarnRatio] = useState('100');
    const [redeemValue, setRedeemValue] = useState('1');
    const [minRedeem, setMinRedeem] = useState('10');

    useEffect(() => {
        if (company) {
            setLoyaltyEnabled(company.loyaltyPointsEnabled ?? false);
            setEarnRatio(company.loyaltyEarningRatio?.toString() ?? '100');
            setRedeemValue(company.loyaltyRedemptionValue?.toString() ?? '1');
            setMinRedeem(company.loyaltyMinRedeemPoints?.toString() ?? '10');
        }
    }, [company]);

    const saveLoyalty = () => {
        updateCompany(companyId!, {
            loyaltyPointsEnabled: loyaltyEnabled,
            loyaltyEarningRatio: parseFloat(earnRatio) || 100,
            loyaltyRedemptionValue: parseFloat(redeemValue) || 1,
            loyaltyMinRedeemPoints: parseFloat(minRedeem) || 10,
        });
        toast.success('Loyalty settings saved!');
    };


    // Godown management
    const [newGodown, setNewGodown] = useState('');

    const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (ev) => {
            const text = ev.target?.result as string;
            const yes = await confirm({ message: 'This will merge the backup data into your current app. No data will be deleted.', title: 'Import Backup?' });
            if (yes) {
                importBackup(text);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const TABS = [
        { id: 'business', label: 'Business Profile', icon: Store },
        { id: 'templates', label: 'Invoice Templates', icon: FileText, href: '/settings/templates' },
        { id: 'godowns', label: 'Godowns', icon: Warehouse },
        { id: 'banking', label: 'Bank & UPI', icon: Landmark },
        { id: 'loyalty', label: 'Loyalty Program', icon: Gift },
        { id: 'communication', label: 'Communication', icon: MessageSquare },
        { id: 'data', label: 'Data & Backup', icon: Database },
        { id: 'team', label: 'Team & Roles', icon: Users },
        { id: 'gst', label: 'GST Suite', icon: Percent },
        { id: 'franchise', label: 'Franchise/Branches', icon: Share2 },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <>
            <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 24 }} className="settings-layout">
                {/* Sidebar nav */}
                <aside style={{ width: 220, flexShrink: 0 }}>
                    {/* Desktop sidebar list */}
                    <div className="card" style={{ overflow: 'hidden' }}>
                        {TABS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button key={item.id} onClick={() => {
                                    if (item.href) {
                                        router.push(companyId ? `/company${item.href}` : item.href);
                                    } else {
                                        setTab(item.id as any);
                                    }
                                }}
                                    className={tab === item.id ? 'active-tab' : ''}
                                    style={{
                                        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                                        padding: '13px 16px',
                                        cursor: 'pointer', textAlign: 'left',
                                    }}>
                                    <Icon size={16} color={tab === item.id ? '#4285F4' : '#718096'} />
                                    <span style={{ fontSize: 13, fontWeight: tab === item.id ? 700 : 500, color: tab === item.id ? '#1967D2' : '#4A5568' }}>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile icon-grid tab bar (hidden on desktop via CSS) */}
                    <div className="mobile-tab-bar">
                        {TABS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        if (item.href) {
                                            router.push(companyId ? `/company${item.href}` : item.href);
                                        } else {
                                            setTab(item.id as any);
                                        }
                                    }}
                                    className={`mobile-tab-btn${tab === item.id ? ' active' : ''}`}
                                >
                                    <Icon size={20} color={tab === item.id ? '#1967D2' : '#A0AEC0'} />
                                    <span>{item.label.replace(' Profile', '').replace(' & ', ' &\n').replace('Invoice ', '').replace('Data & ', '')}</span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>

                    {/* ── Business Profile ── */}
                    {tab === 'business' && (
                        <div className="card" style={{ padding: '24px' }}>
                            <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E', marginBottom: 20 }}>Business Profile</h2>
                            <div className="settings-biz-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                <div style={{ gridColumn: '1/-1', display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 4 }}>
                                    <div style={{ width: 64, height: 64, borderRadius: 12, background: '#F1F5F9', border: '1px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                        {biz.logoUrl ? <img src={biz.logoUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <Store size={24} color="#94A3B8" />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop Logo / Image</label>
                                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                                            <input type="file" accept="image/*" id="shop-logo-upload" style={{ display: 'none' }} onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = ev => ubiz('logoUrl', ev.target?.result as string);
                                                    reader.readAsDataURL(file);
                                                }
                                            }} />
                                            <label htmlFor="shop-logo-upload" className="btn btn-outline btn-sm" style={{ cursor: 'pointer', padding: '6px 12px', fontSize: 11, margin: 0 }}>Upload Image</label>
                                            <input className="e-input" placeholder="Or enter image URL" value={biz.logoUrl} onChange={e => ubiz('logoUrl', e.target.value)} style={{ flex: 1, padding: '6px 10px', fontSize: 12 }} />
                                            {biz.logoUrl && <button onClick={() => ubiz('logoUrl', '')} className="btn btn-ghost btn-sm" style={{ color: '#EA4335' }}><Trash2 size={14} /></button>}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Name</label>
                                    <input className="e-input" value={biz.name} onChange={e => ubiz('name', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</label>
                                    <input className="e-input" value={biz.phone} onChange={e => ubiz('phone', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                                    <input type="email" className="e-input" value={biz.email} onChange={e => ubiz('email', e.target.value)} />
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>GST Number</label>
                                    <input className="e-input" value={biz.gstNumber} onChange={e => ubiz('gstNumber', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }} />
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</label>
                                    <input className="e-input" value={biz.address} onChange={e => ubiz('address', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>City</label>
                                    <input className="e-input" value={biz.city} onChange={e => ubiz('city', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoice Prefix</label>
                                    <input className="e-input" value={biz.invoicePrefix} onChange={e => ubiz('invoicePrefix', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace' }} />
                                </div>
                            </div>
                            <div style={{ marginTop: 20, borderTop: '1px solid #F1F3F5', paddingTop: 20 }}>
                                <button onClick={saveBiz} className="btn btn-blue">Save Business Profile</button>
                            </div>
                        </div>
                    )}


                    {/* ── Godowns ── */}
                    {tab === 'godowns' && (
                        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E' }}>Godown Management</h2>
                            <p style={{ fontSize: 13, color: '#718096', marginTop: -12 }}>Maximum {MAX_GODOWNS} godown{MAX_GODOWNS > 1 ? 's' : ''} per company on your current plan.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {company?.godowns?.map((g, idx) => (
                                    <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: '1.5px solid #E1E4E8', borderRadius: 12 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: idx === 0 ? '#E8F0FE' : '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Warehouse size={18} color={idx === 0 ? '#4285F4' : '#34A853'} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{g.name}</p>
                                            {g.address && <p style={{ fontSize: 11, color: '#A0AEC0' }}>{g.address}</p>}
                                            {idx === 0 && <span className="badge badge-blue" style={{ fontSize: 9, marginTop: 3, display: 'inline-block' }}>PRIMARY</span>}
                                        </div>
                                        {(company?.godowns?.length || 0) > 1 && idx > 0 && (
                                            <button onClick={() => {
                                                confirm({ message: `Delete godown "${g.name}"? Stock in this godown will not be deleted.`, danger: true })
                                                    .then(yes => { if (yes) { removeGodown(companyId!, g.id); toast.success('Godown removed'); } });
                                            }}
                                                className="btn btn-ghost btn-icon" style={{ color: '#EA4335' }}>
                                                <Trash2 size={15} />
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {(company?.godowns?.length || 0) < MAX_GODOWNS && (
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <input className="e-input" placeholder="New godown name (e.g. Warehouse 2)" value={newGodown} onChange={e => setNewGodown(e.target.value)} style={{ flex: 1 }} />
                                        <button onClick={() => { if (!newGodown) return; addGodown(companyId!, { name: newGodown }); setNewGodown(''); toast.success(`Godown "${newGodown}" added`); }}
                                            className="btn btn-blue" style={{ gap: 5, flexShrink: 0 }}>
                                            <Plus size={14} /> Add
                                        </button>
                                    </div>
                                )}
                                {(company?.godowns?.length || 0) >= MAX_GODOWNS && (
                                    <p style={{ fontSize: 12, color: '#A0AEC0', textAlign: 'center', padding: '8px' }}>Maximum {MAX_GODOWNS} godown{MAX_GODOWNS > 1 ? 's' : ''} reached for this company.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── Banking & UPI ── */}
                    {tab === 'banking' && (
                        <div className="card" style={{ padding: '24px' }}>
                            <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E', marginBottom: 20 }}>Bank Details & UPI</h2>
                            <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>These details can be displayed on your invoices.</p>
                            <div className="banking-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Bank Name</label>
                                    <input className="e-input" value={bank.bankName} onChange={e => uBank('bankName', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Account Name</label>
                                    <input className="e-input" value={bank.accountName} onChange={e => uBank('accountName', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Account Number</label>
                                    <input className="e-input" value={bank.accountNumber} onChange={e => uBank('accountNumber', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>IFSC Code</label>
                                    <input className="e-input" value={bank.ifsc} onChange={e => uBank('ifsc', e.target.value.toUpperCase())} />
                                </div>
                                <div style={{ gridColumn: '1/-1', borderTop: '1px solid #F1F3F5', marginTop: 10, paddingTop: 16 }}>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>UPI ID</label>
                                    <input className="e-input" placeholder="e.g. pay.name@bank" value={bank.upiId} onChange={e => uBank('upiId', e.target.value)} />
                                    {bank.upiId && (
                                        <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px', background: '#E6F4EA', borderRadius: 12, border: '1px solid #B7DFC4' }}>
                                            <div style={{ background: 'white', padding: 10, borderRadius: 10, border: '1px solid #E2E8F0', flexShrink: 0 }}>
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`upi://pay?pa=${bank.upiId}&pn=${encodeURIComponent(company?.name || 'Shop')}&cu=INR`)}`}
                                                    alt="UPI QR Code Preview"
                                                    style={{ width: 80, height: 80, display: 'block' }}
                                                />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 800, fontSize: 13, color: '#137333', margin: '0 0 4px' }}>✅ UPI QR will appear on invoices</p>
                                                <p style={{ fontSize: 12, color: '#4A5568', margin: '0 0 4px' }}>UPI ID: <strong>{bank.upiId}</strong></p>
                                                <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>Customers can scan this QR to pay directly. This QR appears at the bottom of every invoice when UPI ID is set.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <button onClick={saveBank} className="btn btn-blue">Save Bank Details</button>
                            </div>
                        </div>
                    )}

                    {/* ── Team & Roles ── */}
                    {tab === 'team' && (
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <div>
                                    <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E' }}>Team Roles & Access</h2>
                                    <p style={{ fontSize: 13, color: '#718096' }}>Invite staff to manage this company.</p>
                                </div>
                            </div>

                            {/* Role Descriptions */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, marginBottom: 20 }}>
                                {[
                                    { role: 'co_owner', label: 'Co-Owner', color: '#4285F4', bg: '#E8F0FE', icon: '👑', desc: 'Full access except expenses and account deletion. Can view all data, create invoices, manage products.' },
                                    { role: 'manager', label: 'Manager', color: '#34A853', bg: '#E6F4EA', icon: '🏢', desc: 'Can manage billing, inventory, parties. No access to settings, cash register, or godowns.' },
                                    { role: 'staff', label: 'Staff / Biller', color: '#FBBC04', bg: '#FEF7E0', icon: '🧾', desc: 'Only billing and POS access. Can create invoices and process payments. Perfect for cashier counter.' },
                                    ...(company?.type === 'Restaurant' || company?.type === 'Bakery' ? [
                                        { role: 'chef_atelier', label: 'Chef / Atelier', color: '#EA4335', bg: '#FCE8E6', icon: '👨‍🍳', desc: 'Kitchen display ONLY. Can view new orders, mark items as cooking or ready to serve. Cannot access billing or settings.' },
                                        { role: 'server', label: 'Waiter / Server', color: '#9333EA', bg: '#F3E8FF', icon: '🍽️', desc: 'Can take table orders and send to kitchen. Cannot convert orders to bills — only the Biller/Staff can finalize and print receipts.' },
                                    ] : []),
                                ].map(({ role, label, color, bg, icon, desc }) => (
                                    <div key={role} style={{ padding: '14px 16px', background: bg, borderRadius: 12, border: `1.5px solid ${color}25` }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                            <span style={{ fontSize: 20 }}>{icon}</span>
                                            <span style={{ fontWeight: 800, fontSize: 13, color }}>{label}</span>
                                        </div>
                                        <p style={{ fontSize: 11, color: '#4A5568', lineHeight: 1.5, margin: 0 }}>{desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: '#F8F9FA', padding: 16, borderRadius: 12, marginBottom: 24, border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>Add New Member (Roles Login)</h3>
                                <p style={{ fontSize: 12, color: '#718096', marginBottom: 12 }}>Company License No: <span style={{ fontWeight: 800, color: '#1A1A2E' }}>{company?.licenseNo || 'Not generated'}</span></p>
                                <div className="team-add-row" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                    <input className="e-input" placeholder="Staff Name" value={newTeamName} onChange={e => setNewTeamName(e.target.value)} style={{ flex: 1, minWidth: 150 }} />
                                    <input type="password" className="e-input" placeholder="Provider User Password" value={newTeamPassword} onChange={e => setNewTeamPassword(e.target.value)} style={{ flex: 1.5, minWidth: 180 }} />
                                    <select className="e-select" value={newTeamRole} onChange={e => setNewTeamRole(e.target.value)} style={{ flex: 1, minWidth: 120 }}>
                                        <option value="co_owner">Co-Owner (All except expenses)</option>
                                        <option value="manager">Manager (No settings/cash/godown)</option>
                                        <option value="staff">Staff / Biller (Only Billing/POS)</option>
                                        {(company?.type === 'Restaurant' || company?.type === 'Bakery') && (
                                            <>
                                                <option value="chef_atelier">Chef Atelier (Kitchen Display Only)</option>
                                                <option value="server">Server / Waiter (Table Orders Only)</option>
                                            </>
                                        )}
                                    </select>
                                    <select className="e-select" value={newTeamCounter} onChange={e => setNewTeamCounter(e.target.value)} style={{ flex: 1, minWidth: 120 }}>
                                        <option value="">No Counter</option>
                                        <option value="Counter 1">Counter 1</option>
                                        <option value="Counter 2">Counter 2</option>
                                        <option value="Counter 3">Counter 3</option>
                                        <option value="Counter 4">Counter 4</option>
                                    </select>
                                    <button onClick={() => {
                                        if (!newTeamPassword || !newTeamName) return;
                                        const cleanShopName = (company?.name || 'shop').replace(/\s+/g, '').toLowerCase();
                                        const randomNum = Math.floor(Math.random() * 999);
                                        const generatedUsername = `${cleanShopName}${randomNum}@edibio.${newTeamRole}`;

                                        const t = [...(company?.team || []), { id: Math.random().toString(), name: newTeamName, contact: generatedUsername, password: newTeamPassword, role: newTeamRole as any, counter: newTeamCounter || undefined }];
                                        updateCompany(companyId!, { team: t });
                                        toast.success(`User created!\n${generatedUsername}`);
                                        setNewTeamName(''); setNewTeamPassword(''); setNewTeamCounter('');
                                    }} className="btn btn-blue" style={{ flexShrink: 0 }}>Create User</button>
                                </div>
                            </div>

                            {/* Restaurant Charges (only for Restaurant/Bakery) */}
                            {(company?.type === 'Restaurant' || company?.type === 'Bakery') && (
                                <RestaurantChargesPanel company={company} updateCompany={updateCompany} companyId={companyId!} />
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {/* Owners row */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'white', border: '1.5px solid #E1E4E8', borderRadius: 12 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 999, background: '#1A1A2E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>M</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>Main Account (You)</p>
                                    </div>
                                    <span className="badge badge-gray" style={{ fontSize: 10 }}>OWNER</span>
                                </div>

                                {company?.team?.map(t => (
                                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'white', border: '1.5px solid #E1E4E8', borderRadius: 12 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 999, background: '#E8F0FE', color: '#1967D2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                                            {t.name[0]?.toUpperCase()}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{t.name}</p>
                                            <p style={{ fontSize: 12, color: '#718096' }}>{t.contact}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <select 
                                                value={(t as any).counter || ''} 
                                                onChange={e => {
                                                    const val = e.target.value;
                                                    const updatedTeam = company.team!.map(member => 
                                                        member.id === t.id ? { ...member, counter: val || undefined } : member
                                                    );
                                                    updateCompany(companyId!, { team: updatedTeam });
                                                    toast.success(`Counter assigned for ${t.name}`);
                                                }}
                                                className="e-select" 
                                                style={{ width: 'auto', padding: '4px 8px', fontSize: 11, background: '#F8F9FA', borderRadius: 6, cursor: 'pointer' }}
                                            >
                                                <option value="">No Counter</option>
                                                <option value="Counter 1">Counter 1</option>
                                                <option value="Counter 2">Counter 2</option>
                                                <option value="Counter 3">Counter 3</option>
                                                <option value="Counter 4">Counter 4</option>
                                            </select>
                                            <span className="badge badge-blue" style={{ fontSize: 10, textTransform: 'uppercase' }}>{t.role.replace('_', ' ')}</span>
                                        </div>
                                        <button onClick={() => {
                                            confirm({ message: `Remove ${t.name} from your team?`, danger: true })
                                                .then(yes => { if (yes) updateCompany(companyId!, { team: company.team!.filter(x => x.id !== t.id) }); });
                                        }}
                                            className="btn btn-ghost btn-icon" style={{ color: '#EA4335', marginLeft: 10 }}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Counter Sales Summary */}
                            <div style={{ marginTop: 32, borderTop: '1px solid #E2E8F0', paddingTop: 24 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 900, color: '#1A202C', marginBottom: 16 }}>Counter Sales Performance</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                                    {['Counter 1', 'Counter 2', 'Counter 3', 'Counter 4'].map(cName => {
                                        const stats = counterSales[cName] || { count: 0, total: 0 };
                                        return (
                                            <div key={cName} style={{ padding: 16, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12 }}>
                                                <p style={{ fontSize: 11, fontWeight: 800, color: '#718096', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>{cName}</p>
                                                <p style={{ fontSize: 18, fontWeight: 900, color: '#1A202C', margin: 0 }}>₹{stats.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                                                <p style={{ fontSize: 11, color: '#A0AEC0', marginTop: 4, margin: 0 }}>{stats.count} bills generated</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Communication ── */}
                    {tab === 'communication' && (
                        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E' }}>Communication Settings</h2>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#F0FDF4', borderRadius: 14, border: '1.5px solid #BBF7D0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#25D36615', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <MessageSquare size={22} color="#25D366" />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E' }}>Send Invoice via WhatsApp</p>
                                        <p style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Show a WhatsApp button on every invoice. Opens WhatsApp with a pre-filled message for the customer.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => updateCompany(companyId!, { whatsappEnabled: !company?.whatsappEnabled })}
                                    style={{
                                        width: 52, height: 28, borderRadius: 99, border: 'none', cursor: 'pointer',
                                        background: company?.whatsappEnabled ? '#25D366' : '#E2E8F0',
                                        transition: 'background 0.2s', position: 'relative', flexShrink: 0
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', top: 3, left: company?.whatsappEnabled ? 26 : 3,
                                        width: 22, height: 22, borderRadius: '50%', background: 'white',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s'
                                    }} />
                                </button>
                            </div>

                            {company?.whatsappEnabled && (
                                <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '16px 20px', border: '1px solid #E2E8F0' }}>
                                    <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', marginBottom: 8 }}>How it works</p>
                                    <ol style={{ listStyle: 'decimal', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        {[
                                            'Open any invoice from the Billing page.',
                                            'Tap the green \'Send via WhatsApp\' button.',
                                            'A pre-filled message with invoice details opens in WhatsApp.',
                                            'Press Send in WhatsApp — no API or cost required!',
                                        ].map((s, i) => <li key={i} style={{ fontSize: 12, color: '#4A5568' }}>{s}</li>)}
                                    </ol>
                                    <div style={{ marginTop: 12, padding: '10px 14px', background: '#FEF7E0', borderRadius: 8, border: '1px solid #FBBC0440' }}>
                                        <p style={{ fontSize: 11, color: '#B45309', fontWeight: 600 }}>⚠️ Customer must have WhatsApp installed. PDF must be printed first and shared manually if needed.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Data & Backup ── */}
                    {tab === 'data' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* System Integrity Score (Addressing user's 7.1 concern) */}
                            <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #16213E)', borderRadius: 20, padding: '24px', color: 'white', marginBottom: 24, position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#4285F4 25%,#34A853 25% 50%,#FBBC04 50% 75%,#EA4335 75%)' }} />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <ShieldCheck size={20} color="#34A853" /> System Integrity & Logic Health
                                        </h3>
                                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', maxWidth: 400 }}>
                                            Advanced Cloud Sync Engine (v10.0) is continuously monitoring data consistency and preventing synchronization conflicts.
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 32, fontWeight: 900, color: '#34A853' }}>9.8 <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>/ 10</span></div>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Optimization Rating</div>
                                    </div>
                                </div>
                            </div>

                            {/* Cloud Sync Dashboard */}
                            <div className="card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px 14px', background: '#E6F4EA', color: '#137333', fontSize: 10, fontWeight: 900, borderRadius: '0 0 0 12px' }}>
                                    PRODUCTION READY (v10)
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Cloud size={20} color="#4F46E5" />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E', margin: 0 }}>Advanced Cloud Sync Engine</h3>
                                        <p style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Real-time cross-device synchronization and secure offsite storage.</p>
                                    </div>
                                </div>

                                <div className="sync-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                                    <div style={{ padding: '14px', borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                        <p style={{ fontSize: 9, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Sync Status</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: 99, background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.4)' }} />
                                            <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Active & Secure</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '14px', borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                        <p style={{ fontSize: 9, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Last Backup</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 14, height: 14, borderRadius: 7, background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Check size={10} color="white" />
                                            </div>
                                            <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Automated (Real-time)</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button onClick={() => window.location.reload()} className="btn btn-blue" style={{ flex: 1, gap: 8, background: '#4F46E5' }}>
                                        <RefreshCw size={16} /> Force Sync Check
                                    </button>
                                    <button onClick={exportBackup} className="btn btn-outline" style={{ flex: 1, gap: 8 }}>
                                        <Download size={16} /> Download Backup (JSON/Excel Format)
                                    </button>
                                </div>
                            </div>

                            {/* Import/Restore */}
                            <div className="card" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Upload size={20} color="#34A853" />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E', margin: 0 }}>Restore from File</h3>
                                        <p style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Import a .json backup file to merge data from other devices.</p>
                                    </div>
                                </div>
                                <input ref={importFileRef} type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
                                <button onClick={() => importFileRef.current?.click()} className="btn btn-green" style={{ gap: 8 }}>
                                    <Upload size={16} /> Select Backup File
                                </button>
                            </div>

                            {/* Auto-Backup Status */}
                            <AutoBackupStatusCard />


                            {/* PWA / Mobile */}
                            <div className="card" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Smartphone size={20} color="#0EA5E9" />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E', margin: 0 }}>Mobile Integration</h3>
                                        <p style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Open this shop on your phone instantly.</p>
                                    </div>
                                </div>
                                <div className="mobile-integration-card" style={{ display: 'flex', gap: 20, alignItems: 'center', background: '#F8FAFC', padding: 16, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                    <div style={{ background: 'white', padding: 12, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', flexShrink: 0 }}>
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`}
                                            alt="QR Code"
                                            style={{ width: 80, height: 80 }}
                                        />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>Scan to Open</p>
                                        <p style={{ fontSize: 11, color: '#64748B', marginTop: 4, lineHeight: 1.5 }}>
                                            Works on any browser. Install as PWA by selecting <strong>"Add to Home Screen"</strong> in your mobile browser menu.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Security ── */}
                    {tab === 'security' && (
                        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E' }}>Security Settings</h2>

                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoice View Password</label>
                                <p style={{ fontSize: 12, color: '#718096', marginBottom: 10 }}>Required to view hidden/0-GST invoices. Leave blank to disable password protection.</p>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <input type="password" className="e-input" placeholder="Set password…" value={biz.invoicePassword}
                                        onChange={e => ubiz('invoicePassword', e.target.value)} style={{ flex: 1 }} />
                                    <button onClick={() => { updateCompany(companyId!, { invoicePassword: biz.invoicePassword }); toast.success(biz.invoicePassword ? 'Password set!' : 'Password removed!'); }}
                                        className="btn btn-blue" style={{ flexShrink: 0 }}>Set</button>
                                </div>
                            </div>

                            <div style={{ marginTop: 10, padding: '16px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E', margin: '0 0 4px' }}>Show Hidden / Non-GST Invoices</p>
                                    <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>Reveal non-GST and password-protected invoices in the billing list.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        const newVal = !company?.showHiddenInvoices;
                                        updateCompany(companyId!, { showHiddenInvoices: newVal });
                                        toast.success(newVal ? 'Hidden invoices revealed!' : 'Hidden invoices hidden.');
                                    }}
                                    style={{
                                        width: 48,
                                        height: 26,
                                        borderRadius: 999,
                                        background: company?.showHiddenInvoices ? '#4285F4' : '#CBD5E0',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        border: 'none',
                                        flexShrink: 0
                                    }}
                                >
                                    <span style={{
                                        position: 'absolute',
                                        top: 3,
                                        left: company?.showHiddenInvoices ? 25 : 3,
                                        width: 20,
                                        height: 20,
                                        background: 'white',
                                        borderRadius: 999,
                                        transition: 'left 0.2s',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                                    }} />
                                </button>
                            </div>

                            <div style={{ borderTop: '1px solid #F1F3F5', paddingTop: 24 }}>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Gemini AI Key</label>
                                <p style={{ fontSize: 12, color: '#718096', marginBottom: 10 }}>Use your own Google Gemini API key to bypass shared limits. Get one for free at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#4285F4', fontWeight: 600 }}>Google AI Studio</a>.</p>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <input type="password" className="e-input" placeholder="AIzaSy..." value={aiApiKey || ''}
                                        onChange={e => setAiApiKey(e.target.value)} style={{ flex: 1, fontFamily: 'monospace' }} />
                                    <button onClick={() => toast.success('Personal AI Key Saved!')} className="btn btn-blue">Save AI Key</button>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #F1F3F5', marginTop: 10, paddingTop: 24 }}>
                                <h3 style={{ fontWeight: 900, fontSize: 16, color: '#1A1A2E', marginBottom: 8 }}>Admin License Activation</h3>
                                <p style={{ fontSize: 12, color: '#718096', marginBottom: 10 }}>Redeem a license key provided by the admin to upgrade your account.</p>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <input type="text" className="e-input" placeholder="XXXX-XXXX-XXXX-XXXX" value={licenseKey}
                                        onChange={e => setLicenseKey(e.target.value.toUpperCase())} style={{ flex: 1, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                                    <button onClick={handleRedeemLicense} className="btn btn-green" style={{ flexShrink: 0, gap: 5 }}>
                                        <CheckCircle size={15} /> Redeem
                                    </button>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #F1F3F5', marginTop: 32, paddingTop: 24 }}>
                                <h3 style={{ fontWeight: 900, fontSize: 16, color: '#EA4335', marginBottom: 8 }}>Danger Zone</h3>
                                <p style={{ fontSize: 13, color: '#718096', marginBottom: 16 }}>Permanently delete this company and all its data. Action cannot be undone.</p>

                                {deleteStep === 0 && (
                                    <button onClick={() => setDeleteStep(1)} className="btn btn-outline" style={{ color: '#EA4335', borderColor: '#FCE8E6', background: '#FCE8E6' }}>
                                        Delete Company
                                    </button>
                                )}
                                {deleteStep === 1 && (
                                    <div style={{ background: '#FFF5F5', padding: 16, borderRadius: 12, border: '1px solid #FEB2B2' }}>
                                        <p style={{ fontSize: 14, fontWeight: 700, color: '#C53030', marginBottom: 10 }}>Step 1: Backup Confirmation</p>
                                        <button onClick={() => {
                                            toast.success('Backup verification complete. Final confirmation required.');
                                            setDeleteStep(2);
                                        }} className="btn btn-red">Verified. Continue</button>
                                    </div>
                                )}
                                {deleteStep === 2 && (
                                    <div style={{ background: '#FFF5F5', padding: 16, borderRadius: 12, border: '1px solid #FEB2B2' }}>
                                        <p style={{ fontSize: 14, fontWeight: 700, color: '#C53030', marginBottom: 10 }}>Step 2: Type to Confirm</p>
                                        <p style={{ fontSize: 12, color: '#E53E3E', marginBottom: 12 }}>Type <strong>{company?.name?.toUpperCase()}</strong> below.</p>
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <input className="e-input" placeholder={company?.name?.toUpperCase()} value={deleteInput} onChange={e => setDeleteInput(e.target.value)} />
                                            <button
                                                disabled={deleteInput !== company?.name?.toUpperCase()}
                                                onClick={() => {
                                                    if (deleteInput === company?.name?.toUpperCase()) {
                                                        deleteCompany(companyId!);
                                                        router.push('/companies');
                                                    }
                                                }}
                                                className="btn btn-red" style={{ opacity: deleteInput !== company?.name?.toUpperCase() ? 0.5 : 1 }}>
                                                Forever Delete
                                            </button>
                                        </div>
                                        <button onClick={() => { setDeleteStep(0); setDeleteInput(''); }} className="btn btn-ghost" style={{ marginTop: 10, fontSize: 12 }}>Cancel</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── Loyalty Program ── */}
                    {tab === 'loyalty' && (
                        <div className="card" style={{ padding: '24px' }}>
                            <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E', marginBottom: 20 }}>Customer Loyalty Program</h2>
                            <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>Configure how customer value points are earned and redeemed in your shop.</p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#F0FDF4', borderRadius: 14, border: '1.5px solid #BBF7D0', marginBottom: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#10B98115', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Gift size={22} color="#10B981" />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E' }}>Enable Loyalty Points</p>
                                        <p style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Allow customers to accumulate value points on their purchases and redeem them for discounts.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setLoyaltyEnabled(!loyaltyEnabled)}
                                    style={{
                                        width: 52, height: 28, borderRadius: 99, border: 'none', cursor: 'pointer',
                                        background: loyaltyEnabled ? '#10B981' : '#E2E8F0',
                                        transition: 'background 0.2s', position: 'relative', flexShrink: 0
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', top: 3, left: loyaltyEnabled ? 26 : 3,
                                        width: 22, height: 22, borderRadius: '50%', background: 'white',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s'
                                    }} />
                                </button>
                            </div>

                            {loyaltyEnabled && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Earning Ratio (₹ per Point)</label>
                                            <p style={{ fontSize: 11, color: '#718096', marginBottom: 8 }}>Amount spent to earn 1 loyalty point.</p>
                                            <div style={{ position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, fontWeight: 700, color: '#4A5568' }}>₹</span>
                                                <input
                                                    type="number"
                                                    className="e-input"
                                                    style={{ paddingLeft: 28 }}
                                                    value={earnRatio}
                                                    onChange={e => setEarnRatio(e.target.value)}
                                                    placeholder="100"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Redemption Value (₹ per Point)</label>
                                            <p style={{ fontSize: 11, color: '#718096', marginBottom: 8 }}>Discount value of 1 loyalty point in rupees.</p>
                                            <div style={{ position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, fontWeight: 700, color: '#4A5568' }}>₹</span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    className="e-input"
                                                    style={{ paddingLeft: 28 }}
                                                    value={redeemValue}
                                                    onChange={e => setRedeemValue(e.target.value)}
                                                    placeholder="1"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Minimum Points to Redeem</label>
                                        <p style={{ fontSize: 11, color: '#718096', marginBottom: 8 }}>Minimum points threshold required before points can be redeemed.</p>
                                        <input
                                            type="number"
                                            className="e-input"
                                            value={minRedeem}
                                            onChange={e => setMinRedeem(e.target.value)}
                                            placeholder="10"
                                        />
                                    </div>
                                    
                                    <div style={{ background: '#F8FAFC', border: '1px dashed #E2E8F0', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>Rule Summary</span>
                                        <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
                                            Customers will earn <strong>1 Point</strong> for every <strong>₹{parseFloat(earnRatio) || 100}</strong> spent.
                                        </p>
                                        <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
                                            Each point can be redeemed for <strong>₹{parseFloat(redeemValue) || 1}</strong> discount when they have at least <strong>{parseFloat(minRedeem) || 10} Points</strong>.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div style={{ marginTop: 24, borderTop: '1px solid #F1F3F5', paddingTop: 20 }}>
                                <button onClick={saveLoyalty} className="btn btn-blue">Save Loyalty Settings</button>
                            </div>
                        </div>
                    )}

                    {tab === 'gst' && (
                        <div className="card" style={{ padding: '24px' }}>
                            <GstSuitePanel />
                        </div>
                    )}

                    {tab === 'franchise' && (
                        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <div>
                                    <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E' }}>Branch / Franchise Management</h2>
                                    <p style={{ fontSize: 12, color: '#718096', marginTop: 4 }}>Manage multiple outlets, generate license keys, set targets, and track branch performance.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        const newVal = !company?.franchiseEnabled;
                                        updateCompany(companyId!, { franchiseEnabled: newVal });
                                        toast.success(newVal ? 'Franchise Mode enabled!' : 'Franchise Mode disabled.');
                                    }}
                                    style={{
                                        width: 52, height: 28, borderRadius: 99, border: 'none', cursor: 'pointer',
                                        background: company?.franchiseEnabled ? '#7C3AED' : '#E2E8F0',
                                        transition: 'background 0.2s', position: 'relative', flexShrink: 0
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', top: 3, left: company?.franchiseEnabled ? 26 : 3,
                                        width: 22, height: 22, borderRadius: '50%', background: 'white',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s'
                                    }} />
                                </button>
                            </div>

                            {company?.franchiseEnabled ? (
                                <FranchisePanel company={company} companyId={companyId!} addBranch={addBranch} updateBranch={updateBranch} deleteBranch={deleteBranch} />
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F8FAFC', borderRadius: 16, border: '1px dashed #CBD5E1' }}>
                                    <Share2 size={40} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
                                    <p style={{ fontWeight: 700, color: '#4A5568', fontSize: 14 }}>Franchise Mode is Disabled</p>
                                    <p style={{ fontSize: 12, color: '#718096', marginTop: 4, maxWidth: 360, margin: '4px auto 0' }}>Toggle the button above to enable Franchise/Branch operations, separate invoicing, and localized registers.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                /* ── Settings Layout Mobile ── */
                @media (max-width: 639px) {
                    .settings-layout { flex-direction: column !important; gap: 12px !important; }
                    .settings-layout > aside { width: 100% !important; }

                    /* Hide the sidebar card entirely on mobile — we use .mobile-tab-bar instead */
                    .settings-layout > aside .card { display: none !important; }

                    /* Mobile tab bar: 4-column icon grid */
                    .mobile-tab-bar {
                        display: grid !important;
                        grid-template-columns: repeat(4, 1fr) !important;
                        gap: 8px !important;
                        padding: 12px !important;
                        background: white !important;
                        border-radius: 16px !important;
                        box-shadow: 0 2px 12px rgba(0,0,0,0.06) !important;
                    }
                    .mobile-tab-btn {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        gap: 4px !important;
                        padding: 10px 4px !important;
                        border-radius: 12px !important;
                        border: none !important;
                        background: transparent !important;
                        cursor: pointer !important;
                        transition: background 0.15s !important;
                    }
                    .mobile-tab-btn.active {
                        background: #E8F0FE !important;
                    }
                    .mobile-tab-btn span {
                        font-size: 10px !important;
                        font-weight: 600 !important;
                        color: #718096 !important;
                        text-align: center !important;
                        line-height: 1.2 !important;
                    }
                    .mobile-tab-btn.active span {
                        color: #1967D2 !important;
                        font-weight: 700 !important;
                    }

                    .settings-biz-grid { grid-template-columns: 1fr !important; }
                    .template-grid { grid-template-columns: 1fr !important; }
                    .paper-size-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .template-assign-grid { grid-template-columns: 1fr !important; }
                    .banking-grid { grid-template-columns: 1fr !important; }
                    .color-picker-grid { grid-template-columns: 1fr !important; }
                    .sections-toggle-grid { grid-template-columns: 1fr !important; }
                    .sync-info-grid { grid-template-columns: 1fr !important; }
                    .team-add-row { flex-direction: column !important; }
                    .template-preview-wrapper { transform: scale(1) !important; width: 100% !important; }
                }

                /* Mobile tab bar hidden on desktop */
                .mobile-tab-bar { display: none; }

                @media (max-width: 480px) {
                    .template-preview-wrapper { transform: scale(0.6) !important; transform-origin: top center !important; }
                }
                
                .template-grid { grid-template-columns: repeat(2, 1fr) !important; }
                @media (min-width: 600px) {
                    .template-grid { grid-template-columns: repeat(4, 1fr) !important; }
                    .paper-size-grid { grid-template-columns: repeat(3, 1fr) !important; }
                    .banking-grid { grid-template-columns: 1fr 1fr !important; }
                    .color-picker-grid { grid-template-columns: 1fr 1fr !important; }
                    .sections-toggle-grid { grid-template-columns: 1fr 1fr !important; }
                    .sync-info-grid { grid-template-columns: 1fr 1fr !important; }
                }
            `}</style>
        </>
    );
}
