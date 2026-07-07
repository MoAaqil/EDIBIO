'use client';
import { useState, useEffect } from 'react';
import { PenTool, Check, Save } from 'lucide-react';
import { useStore, useActiveCompany } from '@/lib/store';

export default function CustomInvoicePage() {
    const company = useActiveCompany();
    const { updateCompany } = useStore();

    const [labels, setLabels] = useState({
        invoiceTitle: 'INVOICE',
        invoiceNo: 'Invoice No',
        date: 'Date',
        dueDate: 'Due Date',
        billedTo: 'To',
        paymentMethod: 'Payment Method',
        footerTerms: 'Thank you for your business. Goods once sold will not be taken back without proper bill.'
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (company?.customLabels) {
            setLabels(prev => ({ ...prev, ...company.customLabels }));
        }
    }, [company]);

    const handleSave = () => {
        if (!company) return;
        setIsSaving(true);
        setTimeout(() => {
            updateCompany(company.id, { customLabels: labels });
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 500);
    };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>

            <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D3748 100%)', padding: '32px 40px', borderRadius: 20, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <PenTool size={28} color="#4285F4" />
                        Invoice Field Customization
                    </h1>
                    <p style={{ color: '#CBD5E0', fontSize: 14, maxWidth: 600, lineHeight: 1.6 }}>
                        Take full control over your billing formats by renaming the standard labels. Perfect for businesses needing regional language terms or specific document headers (e.g., 'Tax Invoice', 'Bill of Supply').
                    </p>
                </div>
            </div>

            <div className="custom-invoice-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: 24 }}>
                {/* Left Frame: Editor Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div className="custom-invoice-card" style={{ background: 'white', padding: 32, borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1A202C', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #E2E8F0' }}>Standard Label Setup</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                            {[
                                { k: 'invoiceTitle', label: 'Main Document Title', p: 'e.g. INVOICE, TAX INVOICE' },
                                { k: 'invoiceNo', label: 'Invoice Number Label', p: 'e.g. Invoice No, Bill #' },
                                { k: 'date', label: 'Billing Date Label', p: 'e.g. Date, Issued On' },
                                { k: 'dueDate', label: 'Due Date Label', p: 'e.g. Due Date, Valid Till' },
                                { k: 'billedTo', label: 'Customer Name Prefix', p: 'e.g. To, Billed To' },
                                { k: 'paymentMethod', label: 'Payment Method Label', p: 'e.g. Payment Method, Mode' },
                            ].map(item => (
                                <div key={item.k} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568' }}>{item.label}</label>
                                    <input
                                        type="text"
                                        value={(labels as any)[item.k]}
                                        onChange={e => setLabels({ ...labels, [item.k]: e.target.value })}
                                        className="e-input"
                                        placeholder={item.p}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="custom-invoice-card" style={{ background: 'white', padding: 32, borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1A202C', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #E2E8F0' }}>Global Terms & Conditions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568' }}>Default Printed Footer</label>
                            <textarea
                                value={labels.footerTerms}
                                onChange={e => setLabels({ ...labels, footerTerms: e.target.value })}
                                className="e-input"
                                style={{ height: 120, resize: 'none' }}
                                placeholder="Enter global terms & conditions that append to every print template."
                            />
                            <span style={{ fontSize: 11, color: '#A0AEC0' }}>This acts as a fallback if the user does not specify a manual receipt description.</span>
                        </div>
                    </div>
                </div>

                {/* Right Frame: Live Preview Mapping */}
                <div className="preview-container">
                    <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', position: 'sticky', top: 80, overflow: 'hidden' }}>
                        <div style={{ background: '#F8FAFC', padding: '16px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 13, fontWeight: 800, color: '#4A5568' }}>Reference Document</span>
                            <span style={{ fontSize: 10, background: '#E2E8F0', padding: '4px 8px', borderRadius: 6, fontWeight: 600 }}>PREVIEW</span>
                        </div>

                        <div style={{ padding: 32, fontFamily: 'serif', background: 'white' }}>
                            <h3 style={{ fontSize: 28, fontWeight: 900, color: '#1A202C', marginBottom: 24, letterSpacing: '-0.5px' }}>{labels.invoiceTitle || 'DOCUMENT'}</h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div>
                                        <span style={{ fontSize: 11, color: '#718096', fontWeight: 600 }}>{labels.invoiceNo || 'REF #'}</span>
                                        <div style={{ fontSize: 14, fontWeight: 700 }}>#XX-99382</div>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 11, color: '#718096', fontWeight: 600 }}>{labels.date || 'DATE'}</span>
                                        <div style={{ fontSize: 14, fontWeight: 700 }}>12 Jan 2026</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'right' }}>
                                    <div>
                                        <span style={{ fontSize: 11, color: '#718096', fontWeight: 600 }}>{labels.billedTo || 'CUSTOMER'}</span>
                                        <div style={{ fontSize: 14, fontWeight: 700 }}>Random Walk-in</div>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 11, color: '#718096', fontWeight: 600 }}>{labels.paymentMethod || 'PAYMENT'}</span>
                                        <div style={{ fontSize: 14, fontWeight: 700 }}>Cash</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: 100, border: '2px dashed #E2E8F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                                <span style={{ fontSize: 12, color: '#A0AEC0', fontWeight: 600 }}>Line Items Area</span>
                            </div>

                            <div style={{ marginTop: 20 }}>
                                <p style={{ fontSize: 10, color: '#718096', fontStyle: 'italic', lineHeight: 1.6 }}>{labels.footerTerms || '...'}</p>
                            </div>
                        </div>

                        <div style={{ padding: 24, borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                            <button
                                onClick={handleSave}
                                style={{
                                    width: '100%', padding: '14px 24px', borderRadius: 12, fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', cursor: 'pointer',
                                    background: saved ? '#34A853' : '#4285F4', color: 'white', transition: 'all 0.2s',
                                    boxShadow: saved ? '0 4px 12px rgba(52,168,83,0.3)' : '0 4px 12px rgba(66,133,244,0.3)',
                                }}
                            >
                                {saved ? <Check size={18} /> : <Save size={18} />}
                                {isSaving ? 'Saving...' : saved ? 'Labels Configured!' : 'Save Field Mapping'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .custom-invoice-layout { grid-template-columns: 1fr !important; }
                    .preview-container { order: -1; }
                    .preview-container > div { position: relative !important; top: 0 !important; }
                }
                @media (max-width: 639px) {
                    h1 { fontSize: 22px !important; }
                    .custom-invoice-card { padding: 24px !important; }
                }
            `}</style>
        </div>
    );
}
