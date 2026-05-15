'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore, useUserCompanies } from '@/lib/store';
import toast from 'react-hot-toast';
import { Plus, Power, KeyRound, ChevronRight, Check, X, Warehouse, Trash2, LogOut, Sparkles, Package, FileText, Building2, ArrowRight, Lock } from 'lucide-react';
import { canAccess } from '@/components/FeatureGate';

const COMPANY_COLORS = ['#4285F4', '#34A853', '#EA4335', '#FBBC04', '#9333EA', '#F59E0B'];
const BUSINESS_TYPES = ['Supermarket', 'Grocery Store', 'Restaurant', 'Retail Shop', 'Pharmacy', 'Electronics', 'Clothing', 'Wholesale', 'Digital Agency', 'Other'];

export default function CompaniesPage() {
    const router = useRouter();
    const { addCompany, deleteCompany, setActiveCompany, user, logout, isHydrating, isDemo } = useStore();
    const companies = useUserCompanies();
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [onboardStep, setOnboardStep] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem('edibio_onboarded') && companies.length === 0 && !isHydrating) {
            setTimeout(() => setShowOnboarding(true), 800);
        }
    }, [companies.length, isHydrating]);

    const finishOnboarding = () => {
        localStorage.setItem('edibio_onboarded', '1');
        setShowOnboarding(false);
        setShowAdd(true);
    };

    // Redirect admin to dashboard
    useEffect(() => {
        if (user?.role === 'admin') {
            router.replace('/admin');
        }
    }, [user, router]);

    // Modal states
    const [showAdd, setShowAdd] = useState(false);

    // Delete step state
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    const plan = user?.subscriptionType?.toLowerCase();
    const isTrialActive = user?.trialExpiresAt && new Date(user.trialExpiresAt).getTime() > Date.now();
    let MAX_COMPANIES = 1;
    if (isTrialActive && !plan) MAX_COMPANIES = 5;
    else if (plan === 'premium') MAX_COMPANIES = 5;
    else if (plan === 'standard') MAX_COMPANIES = 3;
    else MAX_COMPANIES = 1;

    const [form, setForm] = useState({
        name: '', type: 'Supermarket', gstNumber: '', phone: '', email: '',
        address: '', city: '', state: 'Tamil Nadu', pincode: '',
        invoicePrefix: 'INV', colorAccent: '#4285F4',
    });

    const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSelect = (id: string, isLocked: boolean) => {
        if (isLocked) {
            toast.error(`Your current plan only supports ${MAX_COMPANIES} company. Upgrade to unlock!`);
            router.push('/subscription');
            return;
        }
        const co = companies.find(c => c.id === id);
        setActiveCompany(id);
        router.push(`/company/dashboard`);
    };

    const handleAdd = () => {
        if (!form.name || !form.phone) { toast.error('Company name and phone are required'); return; }
        if (companies.length >= MAX_COMPANIES) {
            toast.error(`Your plan limits you to ${MAX_COMPANIES} company. Upgrade to Premium to add more.`);
            return;
        }
        const co = addCompany({ ...form, currency: 'INR', templateId: 'classic', financialYear: '2024-25' } as any);
        setShowAdd(false);
        setForm({ name: '', type: 'Supermarket', gstNumber: '', phone: '', email: '', address: '', city: '', state: 'Tamil Nadu', pincode: '', invoicePrefix: 'INV', colorAccent: '#4285F4' });
        handleSelect(co.id, false);
    };

    return (
        <div style={{ minHeight: '100dvh', background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            {/* 3D Floating Orbs */}
            <div style={{ position: 'absolute', top: -150, left: -150, width: 500, height: 500, background: '#4285F4', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: -150, right: -150, width: 600, height: 600, background: '#EA4335', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '30%', left: '30%', width: 400, height: 400, background: '#FBBC04', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%', zIndex: 0 }} />

            {/* 4-color top bar */}
            <div style={{ height: 5, background: 'linear-gradient(90deg,#4285F4 25%,#34A853 25% 50%,#FBBC04 50% 75%,#EA4335 75%)' }} />

            {/* Header */}
            <header style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(225, 228, 232, 0.6)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 24px rgba(0,0,0,0.02)', zIndex: 10, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Image src="/logo.png" alt="Edibio" width={36} height={36} style={{ borderRadius: 10 }} />
                    <div>
                        <p style={{ fontWeight: 900, fontSize: 16, color: '#1A1A2E' }}>Edibio</p>
                        <p style={{ fontSize: 11, color: '#A0AEC0', marginTop: 1 }} className="mobile-hide">Supermarket Management</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{user?.name}</p>
                        <p style={{ fontSize: 11, color: '#A0AEC0' }} className="mobile-hide">{user?.email}</p>
                    </div>
                    <button onClick={() => { logout(); router.replace('/login'); }}
                        className="btn btn-ghost btn-icon" title="Logout">
                        <LogOut size={18} color="#EA4335" />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main style={{ flex: 1, padding: '40px 24px', maxWidth: 900, margin: '0 auto', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative' }}>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1A1A2E', marginBottom: 8, marginTop: 24 }}>
                        {isHydrating ? 'Syncing Your Business...' : 'Welcome Back, ' + (user?.name?.split(' ')[0] || 'User')}
                    </h1>
                    <p style={{ color: '#718096', fontSize: 15 }}>
                        {isHydrating ? 'Connecting to secure cloud vault and local IndexedDB...' : 'Select a business to manage or restore from a previous backup file.'}
                    </p>

                    {/* Quick Restore helper */}
                    {!isHydrating && companies.length === 0 && (
                        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                            <p style={{ fontSize: 13, color: '#EA4335', fontWeight: 700 }}>Can't see your companies? (Cloud Sync is slow or offline)</p>
                            <input
                                type="file"
                                accept=".json"
                                style={{ display: 'none' }}
                                id="restore-file-btn"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            const content = e.target?.result as string;
                                            const { importBackup } = useStore.getState();
                                            importBackup(content);
                                            toast.success('Local data restored from backup!');
                                        };
                                        reader.readAsText(file);
                                    }
                                }}
                            />
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                                <button
                                    onClick={() => {
                                        if (typeof (window as any).forceEdibioCloudSync === 'function') {
                                            (window as any).forceEdibioCloudSync().then(() => {
                                                setTimeout(() => window.location.reload(), 1000);
                                            });
                                        } else {
                                            window.location.reload();
                                        }
                                    }}
                                    style={{ background: 'linear-gradient(135deg, #4285F4, #1967D2)', color: 'white', border: 'none', padding: '10px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(66,133,244,0.3)' }}
                                >
                                    <LogOut size={16} style={{ transform: 'rotate(180deg)' }} /> Force Cloud Sync
                                </button>
                                <button
                                    onClick={() => document.getElementById('restore-file-btn')?.click()}
                                    style={{ background: '#34A853', color: 'white', border: 'none', padding: '10px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(52,168,83,0.2)' }}
                                >
                                    <FileText size={16} /> Restore Local Backup
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {isHydrating ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                        <div style={{ width: 40, height: 40, border: '4px solid #E2E8F0', borderTop: '4px solid #4285F4', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, justifyContent: 'center' }}>
                        {/* Existing companies */}
                        {companies.map((co, idx) => {
                            const isLocked = idx >= MAX_COMPANIES;
                            return (
                                <div key={co.id} className="company-card-3d" onClick={() => handleSelect(co.id, isLocked)}
                                    style={{ position: 'relative' }}>

                                    {/* Lock Overlay */}
                                    {isLocked && (
                                        <div style={{ position: 'absolute', inset: -2, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', borderRadius: 26, zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                            <div style={{ padding: 12, background: '#FDEDE8', borderRadius: 99, color: '#EA4335', marginBottom: 10, boxShadow: '0 4px 12px rgba(234,67,53,0.2)' }}><Lock size={24} /></div>
                                            <p style={{ fontWeight: 900, fontSize: 14, color: '#1A1A2E', margin: 0 }}>Company Locked</p>
                                            <p style={{ fontSize: 11, color: '#718096', padding: '0 16px', marginTop: 4, marginBottom: 10 }}>Upgrade your plan to unlock this company slot.</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const s = useStore.getState();
                                                    const swapCount = s.primarySwapCount || 0;

                                                    if (swapCount >= 2) {
                                                        toast.error('Limit reached! You can only swap the primary company 2 times.');
                                                        return;
                                                    }

                                                    const arr = [...(s.companies || [])];
                                                    const coIdx = arr.findIndex(c => c.id === co.id);
                                                    if (coIdx > -1) {
                                                        const [item] = arr.splice(coIdx, 1);
                                                        arr.unshift(item);

                                                        // Important: Make sure the store persists companies AND the swap count
                                                        useStore.setState({ companies: arr });
                                                        s.setPrimarySwapCount(swapCount + 1);

                                                        toast.success(`${co.name} set as primary. (${2 - (swapCount + 1)} swaps remaining)`);
                                                    }
                                                }}
                                                style={{ padding: '6px 12px', background: 'white', color: '#4285F4', border: '1px solid #E2E8F0', borderRadius: 20, fontSize: 11, fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                                Set as Primary
                                            </button>
                                        </div>
                                    )}

                                    {/* Delete btn */}
                                    <button onClick={e => { e.stopPropagation(); setDeletingId(co.id); setDeleteConfirmText(''); }}
                                        style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, zIndex: 10 }}>
                                        <X size={14} color="#A0AEC0" />
                                    </button>

                                    {/* Company avatar */}
                                    <div style={{
                                        width: 60, height: 60, borderRadius: 16, marginBottom: 8,
                                        background: `linear-gradient(135deg, ${co.colorAccent}, ${co.colorAccent}99)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 24, fontWeight: 900, color: 'white',
                                        boxShadow: `0 8px 24px ${co.colorAccent}40`,
                                    }}>
                                        {co.name[0]}
                                    </div>

                                    <p style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E', marginBottom: 4 }}>{co.name}</p>
                                    <p style={{ fontSize: 12, color: '#718096', marginBottom: 8 }}>{co.type}</p>

                                    {/* Godowns */}
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 8 }}>
                                        {co.godowns?.map(g => (
                                            <span key={g.id} className="godown-chip" style={{ fontSize: 10 }}>
                                                <Warehouse size={10} /> {g.name}
                                            </span>
                                        ))}
                                    </div>

                                    {co.gstNumber && (
                                        <p style={{ fontSize: 10, color: '#A0AEC0', fontFamily: 'monospace' }}>GST: {co.gstNumber}</p>
                                    )}

                                    <div className="btn-3d-play"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, padding: '10px 16px', fontSize: 13, fontWeight: 700, borderRadius: 12, background: isLocked ? '#CBD5E0' : co.colorAccent, color: 'white', boxShadow: isLocked ? 'none' : `0 8px 16px ${co.colorAccent}40, inset 0 2px 4px rgba(255,255,255,0.4)` }}>
                                        {isLocked ? 'Locked' : 'Open'} <ChevronRight size={14} />
                                    </div>
                                </div>
                            );
                        })}

                        {/* Add company */}
                        {companies.length < MAX_COMPANIES && (
                            <div className="company-card-3d add-card-3d" onClick={() => setShowAdd(true)}
                                style={{ minHeight: 180, justifyContent: 'center', flexDirection: 'column', display: 'flex', alignItems: 'center', gap: 12, border: '2px dashed rgba(160, 174, 192, 0.4)', background: 'rgba(255,255,255,0.4)' }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14, border: '2px dashed #CBD5E0',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Plus size={22} color="#A0AEC0" />
                                </div>
                                <p style={{ fontWeight: 700, fontSize: 14, color: '#718096' }}>Add Company</p>
                                <p style={{ fontSize: 11, color: '#A0AEC0' }}>{MAX_COMPANIES - companies.length} slot{MAX_COMPANIES - companies.length !== 1 ? 's' : ''} remaining</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* ── 2-Step Verification Delete Modal ── */}
            {deletingId && (
                <div className="modal-overlay" onClick={() => setDeletingId(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                            <div style={{ width: 64, height: 64, borderRadius: 999, background: '#FEF2F2', border: '8px solid #FFF5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                <Trash2 size={24} color="#DC2626" />
                            </div>
                            <h3 style={{ fontWeight: 900, fontSize: 20, color: '#1A1A2E', marginBottom: 8 }}>Danger Zone</h3>
                            <p style={{ color: '#718096', fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
                                WARNING: This will initiate a backup and flag this company for deletion. All associated data will be removed from your device.
                            </p>

                            <div style={{ background: '#F7FAFC', border: '1px solid #E2E8F0', padding: 16, borderRadius: 12, marginBottom: 20, textAlign: 'left' }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                                    To verify, type <strong>confirm</strong> below:
                                </label>
                                <input className="e-input" value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)} placeholder="Type confirm" style={{ borderColor: deleteConfirmText === 'confirm' ? '#38A169' : '' }} />
                            </div>

                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={() => setDeletingId(null)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                                <button onClick={() => {
                                    if (deleteConfirmText === 'confirm') {
                                        deleteCompany(deletingId);
                                        setDeletingId(null);
                                    }
                                }} disabled={deleteConfirmText.toLowerCase() !== 'confirm'} className="btn btn-blue" style={{ flex: 1, background: deleteConfirmText.toLowerCase() === 'confirm' ? '#DC2626' : '#E2E8F0', color: deleteConfirmText.toLowerCase() === 'confirm' ? 'white' : '#A0AEC0' }}>
                                    Delete Company
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── First-Time Onboarding Wizard ── */}
            {showOnboarding && (
                <div className="modal-overlay" style={{ zIndex: 3000 }}>
                    <div className="modal-box" style={{ maxWidth: 480, borderRadius: 28, overflow: 'hidden', padding: 0 }} onClick={e => e.stopPropagation()}>
                        {/* Header gradient */}
                        <div style={{ background: 'linear-gradient(135deg,#1A1A2E,#16213E)', padding: '32px 32px 24px', textAlign: 'center', position: 'relative' }}>
                            <div style={{ height: 4, background: 'linear-gradient(90deg,#4285F4 25%,#34A853 25% 50%,#FBBC04 50% 75%,#EA4335 75%)', position: 'absolute', top: 0, left: 0, right: 0 }} />
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#4285F4,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(66,133,244,0.4)' }}>
                                <Sparkles size={28} color="white" />
                            </div>
                            <h2 style={{ color: 'white', fontWeight: 900, fontSize: 22, margin: '0 0 8px' }}>Welcome to Edibio! 🎉</h2>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>Your powerful store management platform. Let's set you up in 3 easy steps.</p>
                            {/* Step dots */}
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} style={{ width: i === onboardStep ? 24 : 8, height: 8, borderRadius: 99, background: i <= onboardStep ? '#4285F4' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
                                ))}
                            </div>
                        </div>

                        <div style={{ padding: '28px 32px' }}>
                            {onboardStep === 0 && (
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                                        {[
                                            { icon: <Building2 size={20} color="#4285F4" />, title: 'Create your business', desc: 'Add your company name, GST, and branding', color: '#E8F0FE' },
                                            { icon: <Package size={20} color="#34A853" />, title: 'Add your products', desc: 'Bulk import or add items with prices & stock', color: '#E6F4EA' },
                                            { icon: <FileText size={20} color="#FBBC04" />, title: 'Create your first bill', desc: 'Professional GST invoices in seconds', color: '#FEF7E0' },
                                        ].map((s, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, background: s.color }}>
                                                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
                                                <div>
                                                    <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', margin: 0 }}>{s.title}</p>
                                                    <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>{s.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setOnboardStep(1)} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#4285F4,#1967D2)', color: 'white', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        Get Started <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}
                            {onboardStep === 1 && (
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: 72, height: 72, borderRadius: 20, background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                        <Building2 size={36} color="#4285F4" />
                                    </div>
                                    <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E', marginBottom: 8 }}>Step 1: Add your business</h3>
                                    <p style={{ color: '#718096', fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>
                                        Give your business a name, choose your type (supermarket, retail, restaurant, etc.) and optionally add your GST number for tax invoices.
                                    </p>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <button onClick={() => setOnboardStep(0)} style={{ flex: 1, padding: '12px', background: '#F1F5F9', color: '#718096', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Back</button>
                                        <button onClick={() => setOnboardStep(2)} style={{ flex: 2, padding: '12px', background: 'linear-gradient(135deg,#4285F4,#1967D2)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                            Got it <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {onboardStep === 2 && (
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                        <Check size={36} color="#34A853" />
                                    </div>
                                    <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E', marginBottom: 8 }}>You're all set! 🚀</h3>
                                    <p style={{ color: '#718096', fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>
                                        Once you create your company, add products to inventory, then start creating fast GST bills in seconds. Let's create your first company now!
                                    </p>
                                    <button onClick={finishOnboarding} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#34A853,#16A34A)', color: 'white', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        <Building2 size={18} /> Create My Business
                                    </button>
                                </div>
                            )}
                            <button onClick={() => { localStorage.setItem('edibio_onboarded', '1'); setShowOnboarding(false); }} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: '#A0AEC0', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Skip for now</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Add Company Modal ── */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 540, maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E' }}>Add New Company</h3>
                            <button onClick={() => setShowAdd(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>

                        <div style={{ overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                            {/* Colors */}
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand Color</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {COMPANY_COLORS.map(c => (
                                        <button key={c} onClick={() => update('colorAccent', c)}
                                            style={{
                                                width: 32, height: 32, borderRadius: 8, background: c, border: 'none', cursor: 'pointer',
                                                boxShadow: form.colorAccent === c ? `0 0 0 3px white, 0 0 0 5px ${c}` : 'none',
                                                transition: 'box-shadow 0.15s',
                                            }}>
                                            {form.colorAccent === c && <Check size={14} color="white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Company Name *</label>
                                <input className="e-input" placeholder="e.g. Sharma Supermarket" value={form.name} onChange={e => update('name', e.target.value)} />
                            </div>

                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Business Type</label>
                                <select className="e-select" value={form.type} onChange={e => update('type', e.target.value)}>
                                    {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Phone *</label>
                                    <input className="e-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Email</label>
                                    <input className="e-input" type="email" placeholder="store@gmail.com" value={form.email} onChange={e => update('email', e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>GST Number</label>
                                <input className="e-input" placeholder="22AAAAA0000A1Z5" value={form.gstNumber} onChange={e => update('gstNumber', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }} />
                            </div>

                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Address</label>
                                <input className="e-input" placeholder="Shop address" value={form.address} onChange={e => update('address', e.target.value)} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>City</label>
                                    <input className="e-input" placeholder="Chennai" value={form.city} onChange={e => update('city', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Invoice Prefix</label>
                                    <input className="e-input" placeholder="INV" value={form.invoicePrefix} onChange={e => update('invoicePrefix', e.target.value.toUpperCase())} style={{ fontFamily: 'monospace' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '16px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowAdd(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleAdd} className="btn btn-blue">Create Company</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .company-card-3d {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    border-radius: 24px;
                    padding: 24px;
                    cursor: pointer;
                    box-shadow: 0 16px 32px rgba(0,0,0,0.04), inset 0 2px 8px rgba(255,255,255,1), -8px 8px 16px rgba(0,0,0,0.02);
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                    transform: perspective(1000px) rotateX(0) rotateY(0) translateZ(0);
                    transform-style: preserve-3d;
                    z-index: 10;
                }
                .company-card-3d:hover {
                    transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateZ(20px) translateY(-8px);
                    box-shadow: 20px 30px 60px rgba(0,0,0,0.08), inset 0 2px 8px rgba(255,255,255,1);
                    border-color: rgba(255,255,255,1);
                    z-index: 20;
                }
                .add-card-3d {
                    box-shadow: none !important;
                }
                .add-card-3d:hover {
                    border-color: #4285F4 !important;
                    background: rgba(255, 255, 255, 0.8) !important;
                    transform: translateY(-4px) !important;
                }
                .btn-3d-play {
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .company-card-3d:hover .btn-3d-play {
                    transform: translateZ(15px);
                }
                @media (max-width: 639px) {
                  .mobile-hide { display: none !important; }
                }
            `}</style>
        </div>
    );
}
