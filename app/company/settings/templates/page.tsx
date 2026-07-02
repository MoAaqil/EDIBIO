'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, FileText, Check, LayoutTemplate, X, Columns, Minimize2, Scaling } from 'lucide-react';
import { useStore, useActiveCompany } from '@/lib/store';
import { InvoicePrintTemplate } from '@/components/InvoicePrintTemplate';
import toast from 'react-hot-toast';

const mockInvoice = {
    invoiceNumber: "INV-DEMO-001",
    date: new Date().toISOString().slice(0, 10),
    partyName: "Valued Customer",
    partyPhone: "9876543210",
    grandTotal: 1250.00,
    subTotal: 1100.00,
    totalDiscount: 50.00,
    totalGst: 200.00,
    roundOff: 0,
    items: [
        { name: "Premium Quality Basmati Rice", qty: 2, unit: "Kg", rate: 500, amount: 1000, hsnCode: "1006", discountAmt: 50, totalGst: 180 },
        { name: "Organic Honey 500g", qty: 1, unit: "Box", rate: 100, amount: 100, hsnCode: "0409", discountAmt: 0, totalGst: 20 },
    ]
};

const THEMES = [
    { id: 'classic', label: 'Classic' },
    { id: 'creative', label: 'Creative (Pinterest)' },
    { id: 'modern', label: 'Modern Edge' },
    { id: 'waves', label: 'Smooth Waves' },
    { id: 'minimalist', label: 'Minimal Clean' },
    { id: 'vibrant', label: 'Vibrant Blue' },
    { id: 'quick_bill', label: 'Quick POS Thermal' },
    { id: 'sea_green', label: 'Sea Green' },
    { id: 'formal_quote', label: 'Formal Quote' },
];

const PAGE_SIZE_OPTIONS = [
    { key: 'A4', label: 'A4 Standard' },
    { key: 'A5', label: 'A5 Medium' },
    { key: 'A6', label: 'A6 Small' },
    { key: '3inch', label: '3-Inch POS' },
];

const COLUMN_OPTIONS = [
    { key: 'sn', label: 'S.No' },
    { key: 'hsn', label: 'HSN' },
    { key: 'rate', label: 'Rate' },
    { key: 'discount', label: 'Discount' },
    { key: 'tax', label: 'Tax %' },
];

const PRESET_COLORS = [
    { name: 'Sapphire Blue', hex: '#1E40AF' },
    { name: 'Emerald Green', hex: '#059669' },
    { name: 'Crimson Red', hex: '#DC2626' },
    { name: 'Luxe Gold', hex: '#D97706' },
    { name: 'Teal Green', hex: '#0D9488' },
    { name: 'Vibrant Indigo', hex: '#4F46E5' },
    { name: 'Charcoal Dark', hex: '#1F2937' },
    { name: 'Rose Petal', hex: '#E11D48' },
];

export default function TemplateSettingsPage() {
    const router = useRouter();
    const company = useActiveCompany();
    const { updateCompany } = useStore();

    const [theme, setTheme] = useState('classic');
    const [columns, setColumns] = useState({
        sn: true,
        hsn: true,
        rate: true,
        discount: true,
        tax: true,
        showLogo: true,
        showQrCode: true,
        showTerms: true,
        showSignature: true,
    });
    const [pageSize, setPageSize] = useState('A4');
    const [logoUrl, setLogoUrl] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [billingTheme, setBillingTheme] = useState('classic');
    const [quickBillingTheme, setQuickBillingTheme] = useState('classic');
    const [themeColor, setThemeColor] = useState('');
    const [customLabels, setCustomLabels] = useState({
        invoiceTitle: 'TAX INVOICE',
        invoiceNo: 'Invoice No',
        date: 'Date',
        dueDate: 'Due Date',
        billedTo: 'Billed To',
        paymentMethod: 'Payment Method',
        footerTerms: 'Thank you for your business!',
    });
    
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.48);

    useEffect(() => {
        if (company) {
            setTheme(company.templateTheme || 'classic');
            if (company.templateColumns) {
                setColumns(prev => ({ ...prev, ...company.templateColumns }));
            }
            setPageSize(company.templatePageSize || 'A4');
            setLogoUrl(company.logoUrl || '');
            setQrCodeUrl(company.bankDetails?.qrCodeUrl || '');
            setBillingTheme(company.templateTheme || 'classic');
            setQuickBillingTheme(company.quickBillingTheme || 'classic');
            setThemeColor(company.templateThemeColor || '');
            if (company.customLabels) {
                setCustomLabels(prev => ({ ...prev, ...company.customLabels }));
            }
        }
    }, [company]);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width } = entries[0].contentRect;
                // A4 is 210mm ~ 794px width. We dynamically scale it to fit.
                setScale(width / 794);
            }
        });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSave = () => {
        if (!company) return;
        updateCompany(company.id, {
            templateTheme: billingTheme,
            quickBillingTheme: quickBillingTheme,
            templateColumns: columns,
            templatePageSize: pageSize,
            logoUrl: logoUrl,
            templateThemeColor: themeColor,
            customLabels: customLabels,
            bankDetails: {
                ...(company.bankDetails || { bankName: '', accountName: '', accountNumber: '', ifsc: '', upiId: '' }),
                qrCodeUrl: qrCodeUrl
            }
        });
        toast.success('Invoice template settings saved successfully.');
        router.push('/company/settings');
    };

    if (!company) return null;

    return (
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A2E', letterSpacing: '-0.02em', margin: 0 }}>Invoice Templates</h1>
                    <p style={{ fontSize: 13, color: '#718096', marginTop: 4 }}>Customize how your bills appear to your customers.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => router.push(company ? `/company/settings` : '/settings')} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', padding: '12px 24px', fontSize: 14 }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} className="btn btn-blue" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', fontSize: 14, boxShadow: '0 4px 16px rgba(66, 133, 244, 0.3)' }}>
                        <Save size={18} /> Save Settings
                    </button>
                </div>
            </div>

            <div className="template-grid-main">
                {/* Left: Configuration */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    
                    {/* Theme Selector */}
                    <div className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #E8F0FE, #D2E3FC)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <LayoutTemplate size={20} color="#1967D2" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Select Blueprint</h3>
                                <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>The core layout design</p>
                            </div>
                        </div>

                        <div className="theme-options-grid">
                            {THEMES.map(t => {
                                const active = theme === t.id;
                                const isBilling = billingTheme === t.id;
                                const isQuick = quickBillingTheme === t.id;
                                return (
                                    <div 
                                        key={t.id} 
                                        onClick={() => setTheme(t.id)}
                                        className={`theme-chip ${active ? 'active' : ''}`}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="theme-icon-box" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9', color: '#64748B' }}>
                                                <FileText size={18} />
                                            </div>
                                            {active && <div className="active-dot"><Check size={10} /></div>}
                                        </div>
                                        <span className="theme-label">{t.label}</span>
                                        {(isBilling || isQuick) && (
                                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                                                {isBilling && <span style={{ fontSize: 9, background: '#EBF8FF', color: '#2B6CB0', padding: '2px 6px', borderRadius: 4, fontWeight: 800 }}>Billing</span>}
                                                {isQuick && <span style={{ fontSize: 9, background: '#E6FFFA', color: '#2C7A7B', padding: '2px 6px', borderRadius: 4, fontWeight: 800 }}>Quick</span>}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Usage Configuration */}
                        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #EDF2F7', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <h4 style={{ fontSize: 13, fontWeight: 800, color: '#4A5568', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Apply this layout to:</h4>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: '#1A1A2E', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={billingTheme === theme}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setBillingTheme(theme);
                                            } else {
                                                setBillingTheme('classic');
                                            }
                                        }}
                                        style={{ width: 18, height: 18, cursor: 'pointer' }}
                                    />
                                    Billing (Manual Invoice)
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: '#1A1A2E', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={quickBillingTheme === theme}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setQuickBillingTheme(theme);
                                            } else {
                                                setQuickBillingTheme('classic');
                                            }
                                        }}
                                        style={{ width: 18, height: 18, cursor: 'pointer' }}
                                    />
                                    Quick Billing
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Template Customizer Color Card */}
                    <div className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: 20, height: 20, borderRadius: '50%', background: themeColor || '#4285F4', transition: 'background 0.2s' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Template Color</h3>
                                <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>Apply custom branding tones</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {PRESET_COLORS.map(c => {
                                    const active = themeColor === c.hex;
                                    return (
                                        <button
                                            key={c.hex}
                                            type="button"
                                            onClick={() => setThemeColor(c.hex)}
                                            title={c.name}
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 10,
                                                background: c.hex,
                                                border: active ? '3px solid #1A1A2E' : '1px solid #E2E8F0',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                boxShadow: active ? '0 4px 10px rgba(0,0,0,0.15)' : 'none',
                                                transform: active ? 'scale(1.1)' : 'scale(1)',
                                                transition: 'all 0.15s'
                                            }}
                                        >
                                            {active && <Check size={14} />}
                                        </button>
                                    );
                                })}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F8FAFC', padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input
                                        type="color"
                                        value={themeColor || '#4285F4'}
                                        onChange={e => setThemeColor(e.target.value)}
                                        style={{ width: 32, height: 32, padding: 0, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'transparent' }}
                                    />
                                    <span>Custom Palette Color</span>
                                </label>
                                {themeColor && (
                                    <button
                                        type="button"
                                        onClick={() => setThemeColor('')}
                                        style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#E53E3E', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
                                    >
                                        Reset to Default
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Template Document Label Card */}
                    <div className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FAF5FF, #E9D5FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <LayoutTemplate size={20} color="#7C3AED" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Custom Template Creations</h3>
                                <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>Rename standard printed labels</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                            {[
                                { key: 'invoiceTitle', label: 'Document Title', placeholder: 'e.g. TAX INVOICE' },
                                { key: 'invoiceNo', label: 'Invoice No. Label', placeholder: 'e.g. Invoice No.' },
                                { key: 'date', label: 'Date Label', placeholder: 'e.g. Date' },
                                { key: 'dueDate', label: 'Due Date Label', placeholder: 'e.g. Due Date' },
                                { key: 'billedTo', label: 'Billed To Label', placeholder: 'e.g. Billed To' },
                                { key: 'paymentMethod', label: 'Payment Method Label', placeholder: 'e.g. Payment Method' },
                            ].map(f => (
                                <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <label style={{ fontSize: 11, fontWeight: 800, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{f.label}</label>
                                    <input
                                        type="text"
                                        value={(customLabels as any)[f.key]}
                                        placeholder={f.placeholder}
                                        onChange={e => setCustomLabels({ ...customLabels, [f.key]: e.target.value })}
                                        className="e-input"
                                        style={{ fontSize: 12, padding: '8px 12px' }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Default Footer Terms</label>
                            <textarea
                                value={customLabels.footerTerms}
                                onChange={e => setCustomLabels({ ...customLabels, footerTerms: e.target.value })}
                                placeholder="Enter global terms & conditions or notes."
                                className="e-input"
                                style={{ fontSize: 12, padding: '8px 12px', height: 60, resize: 'none' }}
                            />
                        </div>
                    </div>

                    {/* Shop Assets Card */}
                    <div className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FFFDF5, #FEF3C7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText size={20} color="#D97706" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Shop Assets</h3>
                                <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>Upload shop logo and payment QR code</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {/* Logo Upload */}
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: '#4A5568', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop Logo</label>
                                <div
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={e => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = ev => setLogoUrl(ev.target?.result as string);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    style={{
                                        border: '2px dashed #CBD5E0',
                                        borderRadius: 12,
                                        padding: 16,
                                        textAlign: 'center',
                                        background: '#F8FAFC',
                                        cursor: 'pointer',
                                        minHeight: 120,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onClick={() => document.getElementById('logo-file-input')?.click()}
                                >
                                    {logoUrl ? (
                                        <>
                                            <img src={logoUrl} alt="Logo" style={{ maxHeight: 80, objectFit: 'contain' }} />
                                            <button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setLogoUrl('');
                                                }}
                                                style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', padding: 4, cursor: 'pointer', color: '#E53E3E' }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <div style={{ fontSize: 11, color: '#718096' }}>
                                            <span style={{ fontWeight: 800, color: '#4285F4' }}>Drag & drop</span> or click to upload Shop Logo
                                        </div>
                                    )}
                                    <input
                                        id="logo-file-input"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = ev => setLogoUrl(ev.target?.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* QR Code Upload */}
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: '#4A5568', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>UPI QR Code</label>
                                <div
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={e => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = ev => setQrCodeUrl(ev.target?.result as string);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    style={{
                                        border: '2px dashed #CBD5E0',
                                        borderRadius: 12,
                                        padding: 16,
                                        textAlign: 'center',
                                        background: '#F8FAFC',
                                        cursor: 'pointer',
                                        minHeight: 120,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onClick={() => document.getElementById('qr-file-input')?.click()}
                                >
                                    {qrCodeUrl ? (
                                        <>
                                            <img src={qrCodeUrl} alt="QR Code" style={{ maxHeight: 80, objectFit: 'contain' }} />
                                            <button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setQrCodeUrl('');
                                                }}
                                                style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', padding: 4, cursor: 'pointer', color: '#E53E3E' }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <div style={{ fontSize: 11, color: '#718096' }}>
                                            <span style={{ fontWeight: 800, color: '#4285F4' }}>Drag & drop</span> or click to upload UPI QR Code
                                        </div>
                                    )}
                                    <input
                                        id="qr-file-input"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = ev => setQrCodeUrl(ev.target?.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columns Selector */}
                    <div className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Columns size={20} color="#166534" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Table Columns</h3>
                                <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>Toggle fields shown in bill items</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {COLUMN_OPTIONS.map(opt => {
                                const active = (columns as any)[opt.key];
                                return (
                                    <div 
                                        key={opt.key}
                                        onClick={() => setColumns({...columns, [opt.key]: !active})}
                                        className={`column-toggle ${active ? 'active' : ''}`}
                                    >
                                        <div className="checkbox-box">
                                            {active && <Check size={10} />}
                                        </div>
                                        <span>{opt.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #EDF2F7' }}>
                            <p style={{ fontSize: 11, fontWeight: 800, color: '#4A5568', textTransform: 'uppercase', marginBottom: 12 }}>Show / Hide Layout Components</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                {[
                                    { key: 'showLogo', label: 'Shop Logo' },
                                    { key: 'showQrCode', label: 'UPI QR Code' },
                                    { key: 'showTerms', label: 'Terms & Conditions' },
                                    { key: 'showSignature', label: 'Signature Block' },
                                ].map(opt => {
                                    const active = (columns as any)[opt.key];
                                    return (
                                        <div 
                                            key={opt.key}
                                            onClick={() => setColumns({...columns, [opt.key]: !active})}
                                            className={`column-toggle ${active ? 'active' : ''}`}
                                        >
                                            <div className="checkbox-box">
                                                {active && <Check size={10} />}
                                            </div>
                                            <span>{opt.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Page Size Selector */}
                    <div className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FFF5F5, #FED7D7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Scaling size={20} color="#C53030" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Print Paper Size</h3>
                                <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>Select paper dimensions for printing</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {PAGE_SIZE_OPTIONS.map(opt => {
                                const active = pageSize === opt.key;
                                return (
                                    <div 
                                        key={opt.key}
                                        onClick={() => setPageSize(opt.key)}
                                        className={`column-toggle ${active ? 'active' : ''}`}
                                    >
                                        <div className="checkbox-box">
                                            {active && <Check size={10} />}
                                        </div>
                                        <span>{opt.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Preview */}
                <div className="preview-section">
                    <div className="preview-card">
                        <div className="preview-header">
                            <div className="live-indicator">
                                <div className="blink-dot"></div>
                                <span>Live Engine Render</span>
                            </div>
                        </div>
                        
                        <div className="preview-viewport" ref={containerRef}>
                            <div className="preview-content" style={{ transform: `scale(${scale})` }}>
                                <InvoicePrintTemplate
                                    invoice={mockInvoice}
                                    company={{ 
                                        ...company, 
                                        templateTheme: theme, 
                                        templateColumns: columns, 
                                        templatePageSize: pageSize,
                                        logoUrl: logoUrl,
                                        templateThemeColor: themeColor,
                                        customLabels: customLabels,
                                        bankDetails: {
                                            ...(company.bankDetails || { bankName: '', accountName: '', accountNumber: '', ifsc: '', upiId: '' }),
                                            qrCodeUrl: qrCodeUrl
                                        }
                                    }}
                                    copies={1}
                                    previewMode={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .template-grid-main { display: grid; grid-template-columns: 1fr; gap: 24px; }
                
                .theme-options-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
                .theme-chip { 
                    padding: 16px; border: 2px solid #E2E8F0; border-radius: 16px; cursor: pointer; transition: all 0.2s;
                    background: white; display: flex; flex-direction: column; gap: 10px;
                }
                .theme-chip.active { border-color: #4285F4; background: #F8FAFC; box-shadow: 0 4px 12px rgba(66, 133, 244, 0.1); transform: translateY(-2px); }
                .theme-icon-box { 
                    width: 32, height: 32; borderRadius: 8px; display: flex; align-items: center; justify-content: center;
                    background: #F1F5F9; color: #64748B;
                }
                .theme-chip.active .theme-icon-box { background: #E8F0FE; color: #4285F4; }
                .active-dot { width: 18px; height: 18px; background: #4285F4; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; }
                .theme-label { font-size: 13px; font-weight: 700; color: #4A5568; }
                .theme-chip.active .theme-label { color: #1A1A2E; }

                .column-toggle {
                    display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 99px;
                    border: 1.5px solid #E2E8F0; background: #F8FAFC; cursor: pointer; transition: all 0.2s;
                    font-size: 12px; font-weight: 700; color: #718096;
                }
                .column-toggle.active { border-color: #4285F4; background: #E8F0FE; color: #4285F4; }
                .checkbox-box { 
                    width: 16px; height: 16px; border: 2px solid #CBD5E0; border-radius: 4px; 
                    display: flex; align-items: center; justify-content: center;
                }
                .column-toggle.active .checkbox-box { border: none; background: #4285F4; color: white; }

                .preview-section { position: relative; }
                .preview-card { 
                    background: #F8FAFC; border-radius: 20px; border: 1px solid #E2E8F0; padding: 24px;
                    display: flex; flex-direction: column; align-items: center;
                }
                .preview-header { margin-bottom: 20px; }
                .live-indicator { 
                    display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: white;
                    border-radius: 99px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); font-size: 11px; font-weight: 800; color: #718096;
                }
                .blink-dot { width: 8px; height: 8px; background: #34A853; border-radius: 50%; animation: blink 1.5s infinite; }
                @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

                .preview-viewport {
                    width: 100%; aspect-ratio: 210/297; background: white; border-radius: 4px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.06); overflow: hidden; position: relative;
                }
                .preview-content {
                    position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm;
                    transform-origin: top left; pointer-events: none;
                }

                @media (min-width: 1024px) {
                    .template-grid-main { grid-template-columns: 1fr 420px; gap: 40px; }
                    .preview-section { position: sticky; top: 24px; height: calc(100vh - 48px); overflow: hidden; }
                }

                @media (max-width: 1024px) {
                    .preview-viewport { max-width: 500px; margin: 0 auto; }
                }
            `}</style>
        </div>
    );
}
