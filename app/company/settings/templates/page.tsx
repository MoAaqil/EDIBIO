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
    { id: 'bold_orange', label: 'Bold Retail' },
    { id: 'luxe_gold', label: 'Luxe Gold' },
    { id: 'vibrant', label: 'Vibrant Blue' },
    { id: 'retro', label: 'Retro Typewriter' },
    { id: 'quick_bill', label: 'Quick POS Thermal' },
    { id: 'beige_dark', label: 'Beige & Dark' },
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
    });
    const [pageSize, setPageSize] = useState('A4');
    
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.48);

    useEffect(() => {
        if (company) {
            setTheme(company.templateTheme || 'classic');
            if (company.templateColumns) {
                setColumns(company.templateColumns);
            }
            setPageSize(company.templatePageSize || 'A4');
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
            templateTheme: theme,
            templateColumns: columns,
            templatePageSize: pageSize,
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
                <button onClick={handleSave} className="btn btn-blue" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', fontSize: 14, boxShadow: '0 4px 16px rgba(66, 133, 244, 0.3)' }}>
                    <Save size={18} /> Save Settings
                </button>
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
                                return (
                                    <div 
                                        key={t.id} 
                                        onClick={() => setTheme(t.id)}
                                        className={`theme-chip ${active ? 'active' : ''}`}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="theme-icon-box">
                                                <FileText size={18} />
                                            </div>
                                            {active && <div className="active-dot"><Check size={10} /></div>}
                                        </div>
                                        <span className="theme-label">{t.label}</span>
                                    </div>
                                );
                            })}
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
                                    company={{ ...company, templateTheme: theme, templateColumns: columns, templatePageSize: pageSize }}
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
                    background: white; display: flex; flexDirection: column; gap: 10px;
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
