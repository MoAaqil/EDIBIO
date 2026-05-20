'use client';
import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore, useActiveCompany } from '@/lib/store';
import { formatDate, amountInWords } from '@/lib/utils';
import { ArrowLeft, Share2, Printer, Trash2, MessageSquare, EyeOff, Check, Phone, ChevronRight, Copy, Settings2, X, Download } from 'lucide-react';
import Link from 'next/link';
import { InvoicePrintTemplate } from '@/components/InvoicePrintTemplate';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';

function InvoiceDetailInner() {
    const searchParams = useSearchParams();
    const invoiceId = searchParams.get('id');
    const router = useRouter();
    const { invoices, deleteInvoice, updateInvoice } = useStore();
    const company = useActiveCompany();
    const inv = invoices.find(i => i.id === invoiceId);

    const [passwordInput, setPasswordInput] = useState('');
    const [unlocked, setUnlocked] = useState(!inv?.isHidden);
    const [showPwPrompt, setShowPwPrompt] = useState(!!inv?.isHidden);
    const autoPrint = searchParams.get('print') === 'true';

    const [overrideTheme, setOverrideTheme] = useState(company?.templateTheme || 'classic');
    const [overrideCols, setOverrideCols] = useState<any>({ sn: true, hsn: true, rate: true, discount: true, tax: true, showQrCode: true, amountInWords: true, ...company?.templateColumns });
    const [showOptions, setShowOptions] = useState(false);
    const [showSharePdfModal, setShowSharePdfModal] = useState(false);

    useEffect(() => {
        if (autoPrint && unlocked && inv) {
            const t = setTimeout(() => window.print(), 800);
            return () => clearTimeout(t);
        }
    }, [autoPrint, unlocked, inv]);

    if (!inv) return (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ color: '#A0AEC0' }}>Invoice not found.</p>
            <Link href={`/company/billing`} className="btn btn-blue btn-sm" style={{ display: 'inline-flex', marginTop: 12, textDecoration: 'none' }}>Back to Bills</Link>
        </div>
    );

    const verifyPw = () => {
        if (!company?.invoicePassword || passwordInput === company.invoicePassword) {
            setUnlocked(true); setShowPwPrompt(false);
        } else toast.error('Incorrect password');
    };

    const handleDelete = async () => {
        const yes = await confirm({ message: 'Delete this invoice permanently?', danger: true });
        if (yes) { deleteInvoice(inv.id); router.replace(`/company/billing`); }
    };

    const handleMarkPaid = () => {
        updateInvoice(inv.id, { paymentStatus: 'paid', amountPaid: inv.grandTotal, balanceDue: 0 });
    };

    const handlePrint = () => window.print();
    const handleDuplicate = () => {
        router.push(`/company/billing/new?type=${inv.invoiceType}&duplicateId=${inv.id}`);
    };

    const handleWhatsApp = () => {
        const rawPhone = inv.partyPhone?.replace(/\D/g, '');
        if (!rawPhone) { toast.error('Customer phone number required for WhatsApp'); return; }
        const phone = rawPhone.startsWith('91') && rawPhone.length === 12 ? rawPhone : '91' + rawPhone.slice(-10);
        let itemsText = '';
        inv.items.forEach((item: any) => {
            itemsText += `• *${item.name}* × ${item.qty} ${item.unit} — ₹${item.amount.toLocaleString('en-IN')}\n`;
        });
        const msg = `🧾 *INVOICE: ${inv.invoiceNumber}*\n\n*${company?.name || 'Store'}*\nDate: ${inv.date}\n\n--------------------------------\nHello *${inv.partyName || 'Customer'}*, \nThank you for your business!\n\n*ITEMS:*\n${itemsText}--------------------------------\n*SUBTOTAL:* ₹${inv.subTotal?.toLocaleString('en-IN') || 0}\n*TAX / GST:* ₹${inv.totalGst?.toLocaleString('en-IN') || 0}\n*GRAND TOTAL: ₹${inv.grandTotal.toLocaleString('en-IN')}*\n\n${inv.balanceDue > 0 ? `⚠️ *BALANCE DUE: ₹${inv.balanceDue.toLocaleString('en-IN')}*` : '✅ *STATUS: FULLY PAID*'}\n\n_Sent via Edibio Cloud_`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    const handleShareOrDownloadPDF = async (mode: 'download' | 'share') => {
        const loadToast = toast.loading(mode === 'share' ? 'Preparing PDF to share...' : 'Generating PDF...');
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const element = document.getElementById('invoice-print');
            if (!element) throw new Error('Invoice container not found');
            
            const originalStyle = element.getAttribute('style') || '';
            // Force exactly 794px width (A4 equivalent) with no extra margins, paddings, or shadow offsets
            element.setAttribute('style', originalStyle + '; background: white; width: 794px; padding: 0; margin: 0; box-shadow: none; overflow: visible;');

            // Temporarily replace min-height with auto to avoid vertical page splits/blank pages
            const vhElements = element.querySelectorAll('[style*="min-height"], [style*="minHeight"]');
            const originalMinHeights: { el: Element; style: string | null }[] = [];
            vhElements.forEach(el => {
                originalMinHeights.push({ el, style: el.getAttribute('style') });
                const currStyle = el.getAttribute('style') || '';
                const replaced = currStyle
                    .replace(/min-height\s*:\s*[^;]+/gi, 'min-height: auto')
                    .replace(/minHeight\s*:\s*[^;]+/gi, 'min-height: auto');
                el.setAttribute('style', replaced);
            });

            const opt = {
                margin: 0,
                filename: `${inv.invoiceNumber || 'Invoice'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true, 
                    logging: false,
                    letterRendering: true,
                    scrollX: 0,
                    scrollY: 0
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            if (mode === 'share') {
                const pdfBlob = await html2pdf().set(opt).from(element).output('blob');
                
                // Restore original styles
                element.setAttribute('style', originalStyle);
                originalMinHeights.forEach(item => {
                    if (item.style !== null) item.el.setAttribute('style', item.style);
                    else item.el.removeAttribute('style');
                });

                toast.dismiss(loadToast);

                const file = new File([pdfBlob], `${inv.invoiceNumber || 'Invoice'}.pdf`, { type: 'application/pdf' });
                
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: `Invoice ${inv.invoiceNumber}`,
                        text: `🧾 Invoice ${inv.invoiceNumber} from ${company?.name || 'Store'}`
                    });
                    toast.success('Shared successfully!');
                } else {
                    const downloadUrl = URL.createObjectURL(pdfBlob);
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = `${inv.invoiceNumber || 'Invoice'}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(downloadUrl);
                    
                    setShowSharePdfModal(true);
                }
            } else {
                await html2pdf().set(opt).from(element).save();
                
                // Restore original styles
                element.setAttribute('style', originalStyle);
                originalMinHeights.forEach(item => {
                    if (item.style !== null) item.el.setAttribute('style', item.style);
                    else item.el.removeAttribute('style');
                });
                
                toast.success('PDF downloaded successfully!', { id: loadToast });
            }
        } catch (err) {
            console.error('PDF operations failed:', err);
            toast.error('Failed to process PDF. Opening print...', { id: loadToast });
            window.print();
        }
    };

    const handleDownloadPDF = () => handleShareOrDownloadPDF('download');
    const handleWhatsAppPDF = () => {
        const rawPhone = inv.partyPhone?.replace(/\D/g, '');
        if (!rawPhone) { toast.error('Customer phone number required for WhatsApp'); return; }
        handleShareOrDownloadPDF('share');
    };

    if (showPwPrompt && !unlocked) {
        return (
            <div style={{ maxWidth: 380, margin: '80px auto', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <EyeOff size={28} color="#7C3AED" />
                </div>
                <h2 style={{ fontWeight: 900, fontSize: 20, color: '#1A1A2E', marginBottom: 8 }}>Protected Invoice</h2>
                <p style={{ color: '#718096', fontSize: 13, marginBottom: 24 }}>This invoice requires a password to view</p>
                <input className="e-input" type="password" autoFocus placeholder="Enter invoice password"
                    value={passwordInput} onChange={e => setPasswordInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && verifyPw()} style={{ marginBottom: 12 }} />
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => router.back()} className="btn btn-outline" style={{ flex: 1 }}>Go Back</button>
                    <button onClick={verifyPw} className="btn btn-blue" style={{ flex: 1 }}>Unlock</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
                <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
                    <button onClick={() => router.back()} className="btn btn-ghost btn-sm" style={{ gap: 6, color: '#718096' }}>
                        <ArrowLeft size={15} /> Back
                    </button>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {inv.paymentStatus !== 'paid' && (
                            <button onClick={handleMarkPaid} className="btn btn-green btn-sm" style={{ gap: 5 }}>
                                <Check size={13} /> Mark Paid
                            </button>
                        )}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                                onClick={() => document.getElementById('wa-dropdown')?.classList.toggle('show')}
                                className="btn btn-sm"
                                style={{ gap: 5, background: '#25D366', color: 'white', borderRadius: 10, fontWeight: 800 }}
                            >
                                <MessageSquare size={13} /> Share Bill <ChevronRight size={12} style={{ transform: 'rotate(90deg)' }} />
                            </button>
                            <div id="wa-dropdown" className="wa-dropdown-content" style={{ position: 'absolute', top: '100%', right: 0, background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', borderRadius: 14, zIndex: 10, display: 'none', padding: '12px 0', minWidth: 200, marginTop: 8, border: '1px solid #E2E8F0' }}>
                                <div style={{ padding: '0 16px 8px', fontSize: 10, fontWeight: 900, color: '#A0AEC0', textTransform: 'uppercase' }}>WhatsApp Sharing</div>
                                <button onClick={() => { handleWhatsApp(); document.getElementById('wa-dropdown')?.classList.remove('show'); }} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#2D3748', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <MessageSquare size={14} color="#25D366" /> Send as Text Message
                                </button>
                                <button onClick={() => { handleWhatsAppPDF(); document.getElementById('wa-dropdown')?.classList.remove('show'); }} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#2D3748', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Printer size={14} color="#4285F4" /> Send as PDF File
                                </button>
                            </div>
                        </div>
                        <button onClick={handleDuplicate} className="btn btn-outline btn-sm" style={{ gap: 5 }}>
                            <Copy size={13} /> Duplicate Bill
                        </button>
                        <button onClick={handleDownloadPDF} className="btn btn-outline btn-sm" style={{ gap: 5, borderColor: '#4285F4', color: '#1A73E8' }}>
                            <Download size={13} /> Download PDF
                        </button>
                        <button onClick={handlePrint} className="btn btn-blue btn-sm" style={{ gap: 5, boxShadow: '0 4px 12px rgba(66,133,244,0.3)' }}>
                            <Printer size={13} /> Print / PDF
                        </button>
                        <button onClick={() => setShowOptions(v => !v)} className="btn btn-outline btn-sm" style={{ gap: 5 }}>
                            <Settings2 size={13} /> Print Settings
                        </button>
                        <button onClick={handleDelete} className="btn btn-sm" style={{ gap: 5, background: '#FCE8E6', color: '#C5221F', borderRadius: 10 }}>
                            <Trash2 size={13} /> Delete
                        </button>
                    </div>
                </div>

                {showOptions && (
                    <div className="no-print card" style={{ padding: 20, marginBottom: 20, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A202C', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Settings2 size={16} color="#4285F4" /> Override Print Settings</h3>
                            <button onClick={() => setShowOptions(false)} className="btn btn-ghost btn-icon"><EyeOff size={16} /></button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Design Template</label>
                                <select className="e-select" value={overrideTheme} onChange={e => setOverrideTheme(e.target.value)}>
                                    <option value="classic">Classic (Professional)</option>
                                    <option value="creative">Creative (Dark Sidebar)</option>
                                    <option value="modern">Modern Edge (Blue Header)</option>
                                    <option value="waves">Smooth Waves (Gradient)</option>
                                    <option value="minimalist">Minimal Clean (Spaced)</option>
                                    <option value="bold_orange">Bold Retail (Orange)</option>
                                    <option value="luxe_gold">Luxe Gold (Dark Premium)</option>
                                    <option value="vibrant">Vibrant Blue (Playful)</option>
                                    <option value="retro">Retro (Typewriter)</option>
                                    <option value="quick_bill">Quick Thermal Style</option>
                                    <option value="beige_dark">Beige & Dark (Design Studio)</option>
                                    <option value="sea_green">Sea Green (Rounded)</option>
                                    <option value="formal_quote">Formal Quote (Grey Boxed)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Columns to Show</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {[
                                        { id: 'sn', label: 'S.No' }, { id: 'hsn', label: 'HSN' },
                                        { id: 'rate', label: 'Rate' }, { id: 'discount', label: 'Discount' },
                                        { id: 'tax', label: 'Tax/GST' }
                                    ].map(col => (
                                        <button key={col.id} onClick={() => setOverrideCols((p: any) => ({ ...p, [col.id]: !p[col.id] }))}
                                            style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid', borderColor: overrideCols[col.id] ? '#4285F4' : '#E2E8F0', background: overrideCols[col.id] ? '#E8F0FE' : 'white', color: overrideCols[col.id] ? '#1967D2' : '#718096', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: '0.15s' }}>
                                            {col.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Other Options</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    <button onClick={() => setOverrideCols((p: any) => ({ ...p, showQrCode: !p.showQrCode }))}
                                        style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid', borderColor: overrideCols.showQrCode ? '#34A853' : '#E2E8F0', background: overrideCols.showQrCode ? '#E6F4EA' : 'white', color: overrideCols.showQrCode ? '#137333' : '#718096', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                                        UPI QR Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div id="invoice-print" style={{ overflow: 'hidden', paddingBottom: 60 }}>
                    <InvoicePrintTemplate invoice={inv} company={{ ...company, templateTheme: overrideTheme, templateColumns: { ...company?.templateColumns, ...overrideCols } }} copies={1} />
                </div>
            </div>

            {showSharePdfModal && (
                <div className="no-print modal-overlay" onClick={() => setShowSharePdfModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 440, padding: 0, borderRadius: 16, overflow: 'hidden' }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg,#1E293B,#0F172A)', color: 'white' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 16, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Share2 size={16} /> Share Bill as PDF
                            </h3>
                            <button onClick={() => setShowSharePdfModal(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, padding: 6, cursor: 'pointer', color: 'white', display: 'flex' }}><X size={16} /></button>
                        </div>
                        <div style={{ padding: '20px 24px' }}>
                            <p style={{ color: '#4A5568', fontSize: 13, fontWeight: 700, margin: '0 0 16px' }}>Follow these simple steps to share this bill:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                                {[
                                    { step: 1, text: "Click 'Download PDF File' to download the PDF file directly to your system." },
                                    { step: 2, text: `Click 'Open WhatsApp Chat' to start the message with ${inv.partyName || 'the customer'}.` },
                                    { step: 3, text: "Attach or drag & drop the saved PDF bill into the WhatsApp conversation." }
                                ].map(s => (
                                    <div key={s.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#E8F0FE', color: '#1A73E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>
                                            {s.step}
                                        </div>
                                        <p style={{ fontSize: 13, color: '#4A5568', margin: 0, lineHeight: '1.45', fontWeight: 600 }}>{s.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <button onClick={handleDownloadPDF} className="btn btn-blue" style={{ flex: 1, gap: 6, fontWeight: 800 }}>
                                    <Download size={14} /> Download PDF File
                                </button>
                                <button onClick={() => {
                                    const rawPhone = inv.partyPhone?.replace(/\D/g, '');
                                    const phone = rawPhone.startsWith('91') && rawPhone.length === 12 ? rawPhone : '91' + rawPhone.slice(-10);
                                    window.open(`https://wa.me/${phone}`, '_blank');
                                }} style={{ flex: 1, gap: 6, background: '#25D366', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MessageSquare size={14} /> Open WhatsApp Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @media print {
                  .no-print { display: none !important; }
                  .app-sidebar, .app-topbar, .bottom-nav { display: none !important; }
                  .app-main { margin-left: 0 !important; padding: 0 !important; }
                  .app-content { padding: 0 !important; }
                  #invoice-print { box-shadow: none !important; border: none !important; }
                }
                .wa-dropdown-content.show { display: block !important; }
                .wa-dropdown-content button:hover { background: #F7FAFC; color: #4285F4; }
            `}</style>
        </>
    );
}

export default function InvoiceDetailPage() {
    return (
        <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading invoice...</div>}>
            <InvoiceDetailInner />
        </Suspense>
    );
}
