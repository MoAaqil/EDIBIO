'use client';
import { useState } from 'react';
import { Share2, Plus, Edit2, Trash2, Key, Check, CreditCard, Loader2, Sparkles, Building, Printer, Target, Landmark, X } from 'lucide-react';
import type { Branch } from '@/lib/types';
import toast from 'react-hot-toast';

interface FranchisePanelProps {
    company: any;
    companyId: string;
    addBranch: (companyId: string, b: Omit<Branch, 'id' | 'licenseKey'>) => void;
    updateBranch: (companyId: string, id: string, upd: Partial<Branch>) => void;
    deleteBranch: (companyId: string, id: string) => void;
}

export default function FranchisePanel({ company, companyId, addBranch, updateBranch, deleteBranch }: FranchisePanelProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
    const [paymentStep, setPaymentStep] = useState<'none' | 'paying' | 'success' | 'form' | 'review'>('form');
    const [useCompanyPrefix, setUseCompanyPrefix] = useState(true);
    
    const [gstOption, setGstOption] = useState<'optionA' | 'optionB'>('optionA');

    const emptyForm = {
        name: '', gstin: '', address: '', phone: '', email: '',
        managerName: '', warehouseName: '',
        bankName: '', accountNumber: '', ifsc: '', upiId: '',
        printerSettings: 'Thermal 80mm', invoiceSeries: '',
        dailyTarget: '', monthlyTarget: '', revenueGoal: '', profitGoal: ''
    };
    const [form, setForm] = useState(emptyForm);
    const up = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const openAdd = () => {
        setEditingBranch(null);
        setForm(emptyForm);
        setUseCompanyPrefix(true);
        setPaymentStep('form');
        setShowModal(true);
    };

    const openEdit = (b: Branch) => {
        setEditingBranch(b);
        const prefixSame = !b.invoiceSeries || b.invoiceSeries === company?.invoicePrefix;
        setUseCompanyPrefix(prefixSame);
        setForm({
            name: b.name || '', gstin: b.gstin || '', address: b.address || '',
            phone: b.phone || '', email: b.email || '', managerName: b.managerName || '',
            warehouseName: b.warehouseName || '',
            bankName: b.bankDetails?.bankName || '',
            accountNumber: b.bankDetails?.accountNumber || '',
            ifsc: b.bankDetails?.ifsc || '',
            upiId: b.bankDetails?.upiId || '',
            printerSettings: b.printerSettings || 'Thermal 80mm',
            invoiceSeries: b.invoiceSeries || '',
            dailyTarget: b.dailyTarget ? String(b.dailyTarget) : '',
            monthlyTarget: b.monthlyTarget ? String(b.monthlyTarget) : '',
            revenueGoal: b.revenueGoal ? String(b.revenueGoal) : '',
            profitGoal: b.profitGoal ? String(b.profitGoal) : ''
        });
        setPaymentStep('form');
        setShowModal(true);
    };

    const startPayment = () => {
        setPaymentStep('paying');
        setTimeout(() => {
            setPaymentStep('success');
            setTimeout(() => {
                handleSave(true);
            }, 1000);
        }, 1500);
    };

    const handleSave = (isPaid = false) => {
        if (!form.name) {
            toast.error('Branch name is required');
            return;
        }

        const branchPayload = {
            name: form.name,
            gstin: gstOption === 'optionA' ? form.gstin : company.gstNumber,
            address: form.address || undefined,
            phone: form.phone || undefined,
            email: form.email || undefined,
            managerName: form.managerName || undefined,
            warehouseName: form.warehouseName || undefined,
            bankDetails: form.bankName ? {
                bankName: form.bankName,
                accountNumber: form.accountNumber,
                ifsc: form.ifsc,
                upiId: form.upiId || undefined
            } : undefined,
            printerSettings: form.printerSettings || undefined,
            invoiceSeries: useCompanyPrefix ? (company?.invoicePrefix || 'INV') : (form.invoiceSeries || undefined),
            dailyTarget: parseFloat(form.dailyTarget) || undefined,
            monthlyTarget: parseFloat(form.monthlyTarget) || undefined,
            revenueGoal: parseFloat(form.revenueGoal) || undefined,
            profitGoal: parseFloat(form.profitGoal) || undefined
        };

        if (editingBranch) {
            updateBranch(companyId, editingBranch.id, branchPayload);
            toast.success('Branch updated successfully!');
            setShowModal(false);
        } else {
            if (!isPaid) {
                setPaymentStep('review');
                return;
            }
            addBranch(companyId, branchPayload);
            toast.success('New Branch added successfully!');
            setShowModal(false);
        }
    };

    const handleDelete = (id: string, name: string) => {
        const first = confirm(`Step 1 of 2: Are you sure you want to delete the franchise outlet "${name}"?`);
        if (!first) return;

        const second = confirm(`Step 2 of 2: WARNING: Deleting "${name}" is permanent and cannot be undone. Are you absolutely sure you want to proceed?`);
        if (!second) return;

        deleteBranch(companyId, id);
        toast.success(`Franchise outlet "${name}" removed successfully.`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header / Config */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📍 Franchise Outlets</h3>
                    <p style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Currently managing {(company.branches || []).length} branches.</p>
                </div>
                <button onClick={openAdd} className="btn btn-blue" style={{ gap: 6, background: '#7C3AED', border: 'none', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)' }}>
                    <Plus size={15} /> Add Outlet
                </button>
            </div>

            {/* GST Policy Configuration */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: 18, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h4 style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E', margin: 0 }}>GST Compliance Option</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[
                        { key: 'optionA', label: 'Option A: Separate GSTINs', desc: 'Each branch has its own registered GSTIN and files GST returns independently.' },
                        { key: 'optionB', label: 'Option B: Single Shared GSTIN', desc: 'Branches share the main company GSTIN. Reports are grouped by location.' }
                    ].map(opt => (
                        <div key={opt.key} onClick={() => setGstOption(opt.key as any)} style={{
                            padding: '12px 14px', borderRadius: 12, border: '2px solid',
                            borderColor: gstOption === opt.key ? '#7C3AED' : '#E2E8F0',
                            background: gstOption === opt.key ? '#FAF5FF' : 'white',
                            cursor: 'pointer', transition: 'all 0.15s'
                        }}>
                            <p style={{ fontWeight: 800, fontSize: 12, color: gstOption === opt.key ? '#7C3AED' : '#4A5568', margin: '0 0 4px' }}>{opt.label}</p>
                            <p style={{ fontSize: 11, color: '#718096', margin: 0, lineHeight: 1.4 }}>{opt.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Branches List */}
            {(company.branches || []).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 20px', background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                    <Building size={32} color="#CBD5E0" style={{ margin: '0 auto 10px' }} />
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#718096' }}>No branches created yet</p>
                    <p style={{ fontSize: 11, color: '#A0AEC0', marginTop: 2 }}>Click the "Add Outlet" button above to register your first sub-branch.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                    {(company.branches || []).map((b: Branch) => (
                        <div key={b.id} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 style={{ fontWeight: 800, fontSize: 15, color: '#1A1A2E', margin: 0 }}>{b.name}</h4>
                                    {b.managerName && <p style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Manager: <strong>{b.managerName}</strong></p>}
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <button onClick={() => openEdit(b)} className="btn btn-ghost btn-sm btn-icon" style={{ color: '#7C3AED' }}><Edit2 size={13} /></button>
                                    <button onClick={() => handleDelete(b.id, b.name)} className="btn btn-ghost btn-sm btn-icon" style={{ color: '#EA4335' }}><Trash2 size={13} /></button>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #F1F3F5', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: '#4A5568' }}>
                                <div>📍 <span style={{ color: '#718096' }}>Address:</span> {b.address || '—'}</div>
                                <div>📞 <span style={{ color: '#718096' }}>Phone:</span> {b.phone || '—'}</div>
                                <div>💼 <span style={{ color: '#718096' }}>GSTIN:</span> <span style={{ fontFamily: 'monospace' }}>{b.gstin || '—'}</span></div>
                                <div>📦 <span style={{ color: '#718096' }}>Series prefix:</span> <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{b.invoiceSeries || '—'}</span></div>
                            </div>

                            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                <Key size={14} color="#7C3AED" />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 10, color: '#718096', margin: 0, textTransform: 'uppercase', fontWeight: 800 }}>Franchise License Key</p>
                                    <p style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 700, color: '#1A1A2E', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.licenseKey}</p>
                                </div>
                                <button onClick={() => { navigator.clipboard.writeText(b.licenseKey); toast.success('License key copied!'); }} className="btn btn-ghost btn-xs" style={{ color: '#7C3AED', fontWeight: 'bold', fontSize: 10 }}>Copy</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add / Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 560, maxHeight: '90dvh', display: 'flex', flexDirection: 'column', padding: 0 }}>
                        <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>{editingBranch ? 'Edit Outlet settings' : 'Add Franchise Outlet'}</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#718096' }}><X size={18} /></button>
                        </div>

                        {/* Payment Flow for adding outlet */}
                        {paymentStep === 'paying' && (
                            <div style={{ padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                                <Loader2 size={36} color="#7C3AED" className="animate-spin" />
                                <p style={{ fontSize: 14, fontWeight: 700, color: '#4A5568' }}>Processing secure payment of ₹2,000...</p>
                            </div>
                        )}

                        {paymentStep === 'success' && (
                            <div style={{ padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, color: '#0F9D58' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Check size={24} color="#0F9D58" />
                                </div>
                                <p style={{ fontSize: 15, fontWeight: 800 }}>Payment Received Successfully!</p>
                            </div>
                        )}

                        {paymentStep === 'form' && (
                            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }} className="no-scrollbar">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    
                                    {/* Section 1: Basic Info */}
                                    <div>
                                        <h4 style={{ fontSize: 11, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Building size={12} /> Basic Shop Info</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                            <div style={{ gridColumn: '1 / -1' }}>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Shop / Outlet Name *</label>
                                                <input className="e-input" placeholder="e.g. ABC Bakery - Chennai" value={form.name} onChange={e => up('name', e.target.value)} />
                                            </div>
                                            {gstOption === 'optionA' && (
                                                <div>
                                                    <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>GSTIN (Independent)</label>
                                                    <input className="e-input" style={{ fontFamily: 'monospace' }} placeholder="33AAAAA0000A1Z0" value={form.gstin} onChange={e => up('gstin', e.target.value.toUpperCase())} />
                                                </div>
                                            )}
                                            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#4A5568', cursor: 'pointer' }}>
                                                    <input type="checkbox" checked={useCompanyPrefix} onChange={e => {
                                                        const checked = e.target.checked;
                                                        setUseCompanyPrefix(checked);
                                                        if (checked) {
                                                            up('invoiceSeries', company?.invoicePrefix || 'INV');
                                                        } else {
                                                            up('invoiceSeries', '');
                                                        }
                                                    }} style={{ width: 15, height: 15, accentColor: '#7C3AED' }} />
                                                    Use same Invoice Prefix as Company ({company?.invoicePrefix || 'INV'})
                                                </label>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Invoice Series Prefix</label>
                                                <input 
                                                    className="e-input" 
                                                    style={{ fontFamily: 'monospace', background: useCompanyPrefix ? '#F3F4F6' : 'white' }} 
                                                    placeholder="e.g. CHN" 
                                                    value={useCompanyPrefix ? (company?.invoicePrefix || 'INV') : form.invoiceSeries} 
                                                    onChange={e => up('invoiceSeries', e.target.value.toUpperCase())} 
                                                    disabled={useCompanyPrefix}
                                                />
                                            </div>
                                            <div style={{ gridColumn: '1 / -1' }}>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Address</label>
                                                <input className="e-input" placeholder="Shop Address..." value={form.address} onChange={e => up('address', e.target.value)} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Phone</label>
                                                <input className="e-input" placeholder="+91..." value={form.phone} onChange={e => up('phone', e.target.value)} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Email</label>
                                                <input type="email" className="e-input" placeholder="branch@domain.com" value={form.email} onChange={e => up('email', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Management & Printer */}
                                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
                                        <h4 style={{ fontSize: 11, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Printer size={12} /> Management &amp; Settings</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Assigned Manager</label>
                                                <input className="e-input" placeholder="e.g. Ahmed" value={form.managerName} onChange={e => up('managerName', e.target.value)} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Warehouse / Godown Name</label>
                                                <input className="e-input" placeholder="e.g. Chennai WH" value={form.warehouseName} onChange={e => up('warehouseName', e.target.value)} />
                                            </div>
                                            <div style={{ gridColumn: '1 / -1' }}>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Printer Settings</label>
                                                <input className="e-input" placeholder="e.g. Thermal 80mm - USB" value={form.printerSettings} onChange={e => up('printerSettings', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Bank Details */}
                                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
                                        <h4 style={{ fontSize: 11, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Landmark size={12} /> Bank Account Details</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Bank Name</label>
                                                <input className="e-input" placeholder="e.g. HDFC Bank" value={form.bankName} onChange={e => up('bankName', e.target.value)} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Account Number</label>
                                                <input className="e-input" placeholder="1234567890" value={form.accountNumber} onChange={e => up('accountNumber', e.target.value)} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>IFSC Code</label>
                                                <input className="e-input" style={{ fontFamily: 'monospace' }} placeholder="HDFC0001234" value={form.ifsc} onChange={e => up('ifsc', e.target.value.toUpperCase())} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>UPI ID (Optional)</label>
                                                <input className="e-input" placeholder="upi@bank" value={form.upiId} onChange={e => up('upiId', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 4: Targets & Goals */}
                                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
                                        <h4 style={{ fontSize: 11, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Target size={12} /> Sales Targets &amp; Goals</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Daily Sales Target (₹)</label>
                                                <input type="number" className="e-input" placeholder="e.g. 20000" value={form.dailyTarget} onChange={e => up('dailyTarget', e.target.value)} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Monthly Sales Target (₹)</label>
                                                <input type="number" className="e-input" placeholder="e.g. 500000" value={form.monthlyTarget} onChange={e => up('monthlyTarget', e.target.value)} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Revenue Goal (₹)</label>
                                                <input type="number" className="e-input" placeholder="e.g. 6000000" value={form.revenueGoal} onChange={e => up('revenueGoal', e.target.value)} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 10, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 4 }}>Profit Goal (₹)</label>
                                                <input type="number" className="e-input" placeholder="e.g. 1200000" value={form.profitGoal} onChange={e => up('profitGoal', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ borderTop: '1px solid #E2E8F0', padding: '20px 0 0', display: 'flex', gap: 10, marginTop: 24 }}>
                                    <button onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1, height: 40 }}>Cancel</button>
                                    <button onClick={() => handleSave(false)} className="btn btn-blue" style={{ flex: 1, background: '#7C3AED', border: 'none', height: 40, justifyContent: 'center' }}>
                                        {editingBranch ? 'Save Outlet' : 'Proceed to Payment'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {paymentStep === 'review' && (
                            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }} className="no-scrollbar">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', padding: '16px', borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <CreditCard size={20} color="#7C3AED" />
                                        <div>
                                            <p style={{ fontWeight: 800, fontSize: 13, color: '#5B21B6', margin: 0 }}>Review Details &amp; Proceed to Payment</p>
                                            <p style={{ fontSize: 11, color: '#7C3AED', margin: 0 }}>Please review the exact address and outlet settings before activating.</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, border: '1.5px solid #E2E8F0', padding: 18, borderRadius: 14, background: '#F8FAFC' }}>
                                        <div>
                                            <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', margin: '0 0 2px' }}>Outlet Name</p>
                                            <p style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>{form.name}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', margin: '0 0 2px' }}>Exact Address</p>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: '#2D3748', margin: 0, lineHeight: 1.4 }}>{form.address || '—'}</p>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                            <div>
                                                <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', margin: '0 0 2px' }}>Assigned Manager</p>
                                                <p style={{ fontSize: 12, fontWeight: 700, color: '#2D3748', margin: 0 }}>{form.managerName || '—'}</p>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', margin: '0 0 2px' }}>Phone</p>
                                                <p style={{ fontSize: 12, fontWeight: 700, color: '#2D3748', margin: 0 }}>{form.phone || '—'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', margin: '0 0 2px' }}>Invoice Series Prefix</p>
                                            <p style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 800, color: '#7C3AED', margin: 0 }}>
                                                {useCompanyPrefix ? `${company?.invoicePrefix || 'INV'} (Same as Company)` : form.invoiceSeries || '—'}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ padding: '16px 20px', background: '#FAF5FF', border: '1.5px solid #E9D5FF', borderRadius: 14, textAlign: 'center', marginTop: 8 }}>
                                        <p style={{ fontSize: 13, color: '#7C3AED', margin: '0 0 4px', fontWeight: 700 }}>One-time Activation Fee</p>
                                        <p style={{ fontSize: 24, fontWeight: 900, color: '#5B21B6', margin: 0 }}>₹2,000</p>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #E2E8F0', padding: '20px 0 0', display: 'flex', gap: 10, marginTop: 24 }}>
                                    <button onClick={() => setPaymentStep('form')} className="btn btn-outline" style={{ flex: 1, height: 40 }}>← Edit Details</button>
                                    <button onClick={startPayment} className="btn btn-blue" style={{ flex: 1, background: '#7C3AED', border: 'none', height: 40, justifyContent: 'center', fontWeight: 900 }}>Pay ₹2,000 &amp; Activate</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
