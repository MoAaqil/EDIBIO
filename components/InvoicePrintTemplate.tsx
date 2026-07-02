import React from 'react';
import { formatDate, amountInWords } from '@/lib/utils';
import Barcode from 'react-barcode';
import { useStore } from '@/lib/store';

export const InvoicePrintTemplate = ({ invoice, company, copies = 1, previewMode = false, themeOverride }: { invoice: any, company: any, copies?: number, previewMode?: boolean, themeOverride?: string }) => {
    if (!invoice) return null;

    const templates = useStore.getState().templates;
    const activeTemplate = templates?.find((t: any) => t.id === company?.templateId) || templates?.[0];

    const theme = themeOverride || company?.templateTheme || 'classic';
    const showColumns = company?.templateColumns || { sn: true, hsn: true, discount: true, tax: true, rate: true };
    const themeColor = company?.templateThemeColor || '';
    const showLogo = company?.templateColumns?.showLogo !== false;
    const showQrCode = (!!company?.bankDetails?.upiId || !!company?.bankDetails?.qrCodeUrl) && (
        company?.templateColumns?.showQrCode !== undefined 
            ? company.templateColumns.showQrCode 
            : (activeTemplate ? activeTemplate.showQrCode : true) // default to true if template showQrCode is not explicitly false
    );
    const labels = company?.customLabels || {};

    const upiLink = (showQrCode && company?.bankDetails?.upiId) ? `upi://pay?pa=${company.bankDetails.upiId}&pn=${encodeURIComponent(company.name)}&am=${invoice.grandTotal.toFixed(2)}&cu=INR` : null;
    const qrUrl = company?.bankDetails?.qrCodeUrl || (upiLink ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiLink)}` : null);

    let lTitle = labels.invoiceTitle || 'TAX INVOICE';
    let lNo = labels.invoiceNo || 'Invoice No';
    let lDate = labels.date || 'Date';
    let lDueDate = labels.dueDate || 'Due Date';

    if (invoice.invoiceType) {
        if (invoice.invoiceType === 'sale') {
            lTitle = labels.invoiceTitle || 'TAX INVOICE';
        } else {
            const typeLabels: Record<string, string> = {
                estimate: 'ESTIMATE',
                proforma: 'PROFORMA INVOICE',
                delivery_challan: 'DELIVERY CHALLAN',
                purchase: 'PURCHASE BILL',
                sale_return: 'CREDIT NOTE',
                purchase_return: 'DEBIT NOTE',
                credit_note: 'CREDIT NOTE',
                debit_note: 'DEBIT NOTE',
            };
            lTitle = typeLabels[invoice.invoiceType] || invoice.invoiceType.toUpperCase();

            const typeNoLabels: Record<string, string> = {
                estimate: 'Estimate No',
                proforma: 'Proforma No',
                delivery_challan: 'Challan No',
                purchase: 'Bill No',
                sale_return: 'Return No',
                purchase_return: 'Return No',
                credit_note: 'Note No',
                debit_note: 'Note No',
            };
            lNo = typeNoLabels[invoice.invoiceType] || 'No';

            const typeDateLabels: Record<string, string> = {
                estimate: 'Estimate Date',
                proforma: 'Proforma Date',
                delivery_challan: 'Challan Date',
                purchase: 'Bill Date',
                sale_return: 'Return Date',
                purchase_return: 'Return Date',
                credit_note: 'Note Date',
                debit_note: 'Note Date',
            };
            lDate = typeDateLabels[invoice.invoiceType] || 'Date';

            const typeDueDateLabels: Record<string, string> = {
                estimate: 'Validity Date',
                proforma: 'Validity Date',
            };
            lDueDate = typeDueDateLabels[invoice.invoiceType] || 'Due Date';
        }
    }

    const lBilledTo = labels.billedTo || 'Billed To';
    const lPayment = labels.paymentMethod || 'Payment Method';
    const defaultFooter = labels.footerTerms || 'Thank you for your business!';

    const FooterBrand = () => (
        <div className="invoice-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20, borderTop: '3px solid #E2E8F0', paddingBottom: 10, pageBreakInside: 'avoid', background: 'transparent' }}>
            <div>
                <p style={{ fontSize: 11, color: '#A0AEC0', marginBottom: 12 }}>{defaultFooter}</p>
                <img src="/logo.png" alt="Edibio" style={{ height: 120, width: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
            <div style={{ paddingBottom: 4 }}>
                <Barcode value={invoice.invoiceNumber || 'INV-000'} width={1.2} height={40} fontSize={12} fontWeight="bold" displayValue={true} margin={0} background="transparent" />
            </div>
        </div>
    );

    // Split payment display helper
    const METHOD_ICONS: Record<string, string> = { cash: '💵', upi: '📱', card: '💳', bank: '🏦', cheque: '📝', neft: '🔁', rtgs: '🔄', credit: '🤝' };
    const PaymentMethodDisplay = ({ style }: { style?: React.CSSProperties }) => {
        if (invoice.splitPayments && invoice.splitPayments.length > 1) {
            return (
                <div style={style}>
                    {invoice.splitPayments.map((sp: any, i: number) => (
                        <span key={i} style={{ display: 'inline-block', marginRight: 6, fontSize: 12, fontWeight: 700 }}>
                            {METHOD_ICONS[sp.method] || '💰'} {sp.method.charAt(0).toUpperCase() + sp.method.slice(1)} ₹{sp.amount.toLocaleString('en-IN')}
                            {i < invoice.splitPayments.length - 1 ? ' +' : ''}
                        </span>
                    ))}
                </div>
            );
        }
        return <span style={style}>{METHOD_ICONS[invoice.paymentMethod] || ''} {invoice.paymentMethod || 'Cash'}</span>;
    };




    const ItemsTableModern = ({ headerColor, textColor = 'white' }: { headerColor: string, textColor?: string }) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
                <tr style={{ background: headerColor, color: textColor }}>
                    {showColumns.sn && <th style={{ textAlign: 'left', padding: '12px 14px', borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}>SN</th>}
                    <th style={{ textAlign: 'left', padding: '12px 14px' }}>Item Description</th>
                    {showColumns.rate && <th style={{ textAlign: 'right', padding: '12px 14px' }}>Rate</th>}
                    <th style={{ textAlign: 'center', padding: '12px 14px' }}>Qty</th>
                    <th style={{ textAlign: 'right', padding: '12px 14px', borderTopRightRadius: 6, borderBottomRightRadius: 6 }}>Amount</th>
                </tr>
            </thead>
            <tbody>
                {invoice.items.map((item: any, i: number) => (
                    <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', color: '#1A202C' }}>
                        {showColumns.sn && <td style={{ padding: '16px 14px', color: '#718096' }}>{i + 1}</td>}
                        <td style={{ padding: '16px 14px', fontWeight: 700 }}>{item.name}</td>
                        {showColumns.rate && <td style={{ padding: '16px 14px', textAlign: 'right' }}>{item.rate.toFixed(2)}</td>}
                        <td style={{ padding: '16px 14px', textAlign: 'center', fontWeight: 600 }}>{item.qty} {item.unit}</td>
                        <td style={{ padding: '16px 14px', textAlign: 'right', fontWeight: 900 }}>{item.amount.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const TotalsBlock = () => {
        const gstHalf = invoice.totalGst > 0 ? invoice.totalGst / 2 : 0;
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 16 }}>
                <div>
                    {qrUrl && (
                        <div style={{ padding: '10px', background: 'white', borderRadius: 8, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content' }}>
                            <img src={qrUrl} alt="UPI QR Code" style={{ width: 100, height: 100, marginBottom: 4 }} />
                            <span style={{ fontSize: 10, fontWeight: 800, color: '#4A5568' }}>SCAN TO PAY</span>
                        </div>
                    )}
                </div>
                <div className="totals-block" style={{ width: '100%', maxWidth: 280, fontSize: 13, background: 'transparent', padding: '16px 0', borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ color: '#4A5568' }}>Subtotal</span>
                        <span style={{ fontWeight: 700 }}>₹{invoice.subTotal.toFixed(2)}</span>
                    </div>
                    {invoice.totalGst > 0 && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ color: '#4A5568', fontSize: 12 }}>CGST</span>
                                <span style={{ fontWeight: 600, fontSize: 12 }}>+₹{gstHalf.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ color: '#4A5568', fontSize: 12 }}>SGST</span>
                                <span style={{ fontWeight: 600, fontSize: 12 }}>+₹{gstHalf.toFixed(2)}</span>
                            </div>
                        </>
                    )}
                    {invoice.roundOff !== 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ color: '#4A5568' }}>Round Off</span>
                        <span style={{ fontWeight: 700 }}>{invoice.roundOff > 0 ? '+' : ''}₹{invoice.roundOff.toFixed(2)}</span>
                    </div>}
                    {invoice.pointsValueRedeemed > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#E53E3E', fontWeight: 600 }}>
                        <span>Loyalty Redeem</span>
                        <span>-₹{invoice.pointsValueRedeemed.toFixed(2)}</span>
                    </div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '2px dashed #E2E8F0' }}>
                        <span style={{ fontWeight: 900, fontSize: 18 }}>Total</span>
                        <span style={{ fontWeight: 900, fontSize: 18, color: '#2D3748' }}>₹{invoice.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <p style={{ fontSize: 10, color: '#A0AEC0', fontStyle: 'italic', textAlign: 'right', marginTop: 6, lineHeight: 1.4 }}>
                        {amountInWords(invoice.grandTotal)}
                    </p>
                </div>
            </div>
        );
    };

    // ==========================================
    // THEME 1: CLASSIC (Traditional & Professional)
    // ==========================================
    const renderClassic = (copyIndex: number) => (
        <div key={`classic-${copyIndex}`} style={{ fontFamily: 'Arial, sans-serif', width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: 'white', color: 'black', position: 'relative', overflow: 'hidden', padding: '40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', marginBottom: 24, borderBottom: `2px solid ${themeColor || 'black'}`, paddingBottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 60, objectFit: 'contain', marginBottom: 8 }} />}
                <h1 style={{ fontSize: 26, fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px', color: themeColor || 'black' }}>{company?.name || 'Company Name'}</h1>
                <p style={{ fontSize: 12, margin: '0 0 4px 0' }}>{company?.address || 'Address Line 1'}, {company?.city || 'City'}</p>
                <p style={{ fontSize: 12, margin: '0 0 4px 0' }}>Phone: {company?.phone || 'N/A'}</p>
                {company?.gstNumber && <p style={{ fontSize: 12, margin: '0 0 4px 0', fontWeight: 'bold' }}>GSTIN: {company.gstNumber}</p>}
            </div>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 'bold', textDecoration: 'underline', textTransform: 'uppercase', margin: 0, color: themeColor || 'black' }}>{lTitle}</h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: 12, border: `1px solid ${themeColor || 'black'}`, padding: 12 }}>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 6px', fontWeight: 'bold' }}>{lBilledTo}:</p>
                    <p style={{ margin: '0 0 4px' }}>{invoice.partyName || 'Cash Customer'}</p>
                    {invoice.partyPhone && <p style={{ margin: '0 0 4px' }}>Phone: {invoice.partyPhone}</p>}
                    {invoice.billingAddress && <p style={{ margin: '0 0 4px' }}>Address: {invoice.billingAddress}</p>}
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                    <table style={{ width: '100%', maxWidth: 220, marginLeft: 'auto' }}>
                        <tbody>
                            <tr><td style={{ fontWeight: 'bold', textAlign: 'left', padding: '2px 0' }}>{lNo}:</td><td style={{ textAlign: 'right' }}>{invoice.invoiceNumber}</td></tr>
                            <tr><td style={{ fontWeight: 'bold', textAlign: 'left', padding: '2px 0' }}>{lDate}:</td><td style={{ textAlign: 'right' }}>{formatDate(invoice.date)}</td></tr>
                            <tr><td style={{ fontWeight: 'bold', textAlign: 'left', padding: '2px 0' }}>{lPayment}:</td><td style={{ textAlign: 'right' }}>{invoice.paymentMethod || 'Cash'}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: '1px solid black' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        {showColumns.sn && <th style={{ border: '1px solid black', padding: '12px 4px', textAlign: 'center' }}>SN</th>}
                        <th style={{ border: '1px solid black', padding: '12px 10px', textAlign: 'left' }}>Description of Goods</th>
                        {showColumns.rate && <th style={{ border: '1px solid black', padding: '12px 4px', textAlign: 'right' }}>Rate</th>}
                        <th style={{ border: '1px solid black', padding: '12px 4px', textAlign: 'center' }}>Qty</th>
                        <th style={{ border: '1px solid black', padding: '12px 10px', textAlign: 'right' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item: any, i: number) => (
                        <tr key={i}>
                            {showColumns.sn && <td style={{ border: '1px solid black', padding: '12px 4px', textAlign: 'center' }}>{i + 1}</td>}
                            <td style={{ border: '1px solid black', padding: '12px 10px', fontWeight: 'bold' }}>{item.name}</td>
                            {showColumns.rate && <td style={{ border: '1px solid black', padding: '12px 4px', textAlign: 'right' }}>{item.rate.toFixed(2)}</td>}
                            <td style={{ border: '1px solid black', padding: '12px 4px', textAlign: 'center' }}>{item.qty} {item.unit}</td>
                            <td style={{ border: '1px solid black', padding: '12px 10px', textAlign: 'right', fontWeight: 'bold' }}>{item.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                <div style={{ width: '45%' }}>
                    <p style={{ margin: '0 0 8px', fontSize: 11, fontStyle: 'italic' }}>Amount in Words: <br />{amountInWords(invoice.grandTotal)}</p>
                    {qrUrl && (
                        <div style={{ padding: '6px', background: 'white', borderRadius: 8, border: '1.5px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content', margin: '12px 0 0' }}>
                            <img src={qrUrl} alt="UPI QR Code" style={{ width: 90, height: 90, marginBottom: 4 }} />
                            <span style={{ fontSize: 9, fontWeight: 'bold', color: 'black' }}>SCAN TO PAY (UPI)</span>
                        </div>
                    )}
                    <div style={{ border: '1px solid black', padding: 8, marginTop: 16 }}>
                        <p style={{ margin: '0 0 4px', fontWeight: 'bold', fontSize: 11 }}>Terms & Conditions:</p>
                        <p style={{ margin: 0, fontSize: 10, whiteSpace: 'pre-wrap' }}>{invoice.notes || defaultFooter}</p>
                    </div>
                </div>
                <div style={{ width: '40%' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <tbody>
                            <tr><td style={{ padding: '6px 8px', border: '1px solid black', fontWeight: 'bold' }}>Subtotal</td><td style={{ padding: '6px 8px', border: '1px solid black', textAlign: 'right' }}>{invoice.subTotal.toFixed(2)}</td></tr>
                            {invoice.totalGst > 0 && (
                                <>
                                    <tr><td style={{ padding: '4px 8px', border: '1px solid black', fontSize: 11 }}>CGST</td><td style={{ padding: '4px 8px', border: '1px solid black', textAlign: 'right', fontSize: 11 }}>+{(invoice.totalGst / 2).toFixed(2)}</td></tr>
                                    <tr><td style={{ padding: '4px 8px', border: '1px solid black', fontSize: 11 }}>SGST</td><td style={{ padding: '4px 8px', border: '1px solid black', textAlign: 'right', fontSize: 11 }}>+{(invoice.totalGst / 2).toFixed(2)}</td></tr>
                                </>
                            )}
                            {invoice.roundOff !== 0 && <tr><td style={{ padding: '6px 8px', border: '1px solid black' }}>Round Off</td><td style={{ padding: '6px 8px', border: '1px solid black', textAlign: 'right' }}>{invoice.roundOff.toFixed(2)}</td></tr>}
                            {invoice.pointsValueRedeemed > 0 && <tr><td style={{ padding: '6px 8px', border: '1px solid black', color: '#DC2626', fontWeight: 'bold' }}>Loyalty Redeem</td><td style={{ padding: '6px 8px', border: '1px solid black', textAlign: 'right', color: '#DC2626', fontWeight: 'bold' }}>-₹{invoice.pointsValueRedeemed.toFixed(2)}</td></tr>}
                            <tr><td style={{ padding: '8px 8px', border: '1px solid black', fontWeight: 'bold', fontSize: 16 }}>Grand Total</td><td style={{ padding: '8px 8px', border: '1px solid black', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>₹{invoice.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <FooterBrand />
        </div>
    );

    // ==========================================
    // THEME 2: CREATIVE (Dark Left Column)
    // ==========================================
    const renderCreative = (copyIndex: number) => (
        <div key={`creative-${copyIndex}`} className="theme-container theme-creative" style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: '#F8FAFC', color: '#1A202C', position: 'relative', overflow: 'hidden', padding: '24px', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div className="creative-layout" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div className="creative-sidebar" style={{ width: 130, flexShrink: 0, background: themeColor || '#1A202C', color: 'white', padding: '40px 16px 24px', borderRadius: '12px', wordBreak: 'break-word' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', marginBottom: 2 }}>{lDate}</p>
                    <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 20 }}>{formatDate(invoice.date)}</p>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', marginBottom: 2 }}>{lDueDate}</p>
                    <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 32 }}>{invoice.paymentStatus === 'paid' ? 'Paid' : 'Upon Receipt'}</p>
                    <div style={{ width: 24, height: 1, background: '#4A5568', marginBottom: 32 }} />
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', marginBottom: 2 }}>{lBilledTo}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{invoice.partyName || 'Cash Customer'}</p>
                    <p style={{ fontSize: 11, color: '#CBD5E0', lineHeight: 1.5 }}>{invoice.partyPhone && <>{invoice.partyPhone}<br /></>}{invoice.billingAddress}</p>
                </div>
                <div style={{ flex: 1, minWidth: 280, paddingTop: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ textAlign: 'right', marginBottom: 20, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px 0', color: themeColor || '#1A202C' }}>{company?.name || 'Your Company Name'}</p>
                            <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>{company?.city}</p>
                            <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>{company?.phone}</p>
                            <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>{company?.gstNumber ? `GSTIN: ${company.gstNumber}` : ''}</p>
                        </div>
                        {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 50, objectFit: 'contain' }} />}
                    </div>
                    <h1 style={{ fontSize: 36, fontWeight: 900, margin: '10px 0 0', letterSpacing: '-1px', color: themeColor || '#1A202C' }}>{lTitle}</h1>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#A0AEC0', marginBottom: 24 }}>#{invoice.invoiceNumber}</p>
                    <div style={{ background: 'white', minHeight: 200, padding: '24px', borderRadius: 12, borderTop: `4px solid ${themeColor || '#1A202C'}`, overflowX: 'auto' }}>
                        <ItemsTableModern headerColor="#F7FAFC" textColor="#4A5568" />
                        <TotalsBlock />
                        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
                            <p style={{ fontSize: 11, color: '#A0AEC0', whiteSpace: 'pre-wrap' }}>{invoice.notes || defaultFooter}</p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: 40 }}>
                        <FooterBrand />
                    </div>
                </div>
            </div>
        </div>
    );

    // ==========================================
    // THEME 3: MODERN EDGE (Blue Accents)
    // ==========================================
    const renderModern = (copyIndex: number) => (
        <div key={`modern-${copyIndex}`} style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: 'white', color: '#2D3748', position: 'relative', overflow: 'hidden', padding: '0 0 24px 0', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', background: themeColor || '#4285F4', color: 'white', padding: '40px 40px', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: 40, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-1px' }}>{lTitle}</h1>
                    <p style={{ fontSize: 15, margin: 0, opacity: 0.9 }}>{lNo}: <b>{invoice.invoiceNumber}</b></p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px 0' }}>{company?.name}</p>
                        <p style={{ fontSize: 12, margin: 0, opacity: 0.8 }}>{company?.address}, {company?.city}</p>
                        <p style={{ fontSize: 12, margin: 0, opacity: 0.8 }}>{company?.phone}</p>
                        {company?.gstNumber && <p style={{ fontSize: 12, margin: 0, opacity: 0.8 }}>GSTIN: {company.gstNumber}</p>}
                    </div>
                    {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 60, objectFit: 'contain', background: 'white', padding: 4, borderRadius: 8 }} />}
                </div>
            </div>

            <div style={{ padding: '40px 40px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ fontSize: 12, fontWeight: 800, color: themeColor || '#4285F4', textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>{lBilledTo}</p>
                    <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 4px 0' }}>{invoice.partyName || 'Cash Customer'}</p>
                    <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>{invoice.partyPhone}</p>
                    <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>{invoice.billingAddress}</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', gap: 40 }}>
                    <div>
                        <p style={{ fontSize: 12, fontWeight: 800, color: themeColor || '#4285F4', textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>{lDate}</p>
                        <p style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{formatDate(invoice.date)}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: 12, fontWeight: 800, color: themeColor || '#4285F4', textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>{lPayment}</p>
                        <PaymentMethodDisplay style={{ fontSize: 15, fontWeight: 700 }} />
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 40px' }}>
                <ItemsTableModern headerColor={themeColor ? themeColor + '15' : '#E8F0FE'} textColor={themeColor || '#1967D2'} />
                <TotalsBlock />
                <div style={{ marginTop: 40, padding: 24, background: '#F8FAFC', borderRadius: 8, borderLeft: `4px solid ${themeColor || '#4285F4'}` }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: themeColor || '#4285F4', margin: '0 0 8px 0' }}>Terms & Remarks</p>
                    <p style={{ fontSize: 12, color: '#4A5568', margin: 0, whiteSpace: 'pre-wrap' }}>{invoice.notes || defaultFooter}</p>
                </div>
            </div>

            <div style={{ padding: '0 40px', marginTop: 'auto' }}>
                <FooterBrand />
            </div>
        </div>
    );

    // ==========================================
    // THEME 4: WAVES (Playful & Smooth)
    // ==========================================
    const renderWaves = (copyIndex: number) => (
        <div key={`waves-${copyIndex}`} style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: '#FAFAFA', color: '#1A202C', position: 'relative', overflow: 'hidden', padding: '0 0 24px 0', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: themeColor ? `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}CC 100%)` : 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', color: 'white', padding: '40px 40px 60px', borderBottomLeftRadius: '50% 20%', borderBottomRightRadius: '50% 20%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: 280, background: 'rgba(255,255,255,0.2)', padding: 20, borderRadius: 16, backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: 12 }}>
                        {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 40, objectFit: 'contain', background: 'white', padding: 4, borderRadius: 8 }} />}
                        <div>
                            <p style={{ fontSize: 16, fontWeight: 900, margin: '0 0 4px 0' }}>{company?.name}</p>
                            <p style={{ fontSize: 11, margin: 0 }}>{company?.city} • {company?.phone}</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h1 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 4px 0', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>{lTitle}</h1>
                        <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{lNo}: {invoice.invoiceNumber}</p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '40px', marginTop: -20 }}>
                <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                    <div style={{ flex: 1, background: 'white', padding: 20, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <p style={{ fontSize: 11, color: themeColor || '#FF6B6B', textTransform: 'uppercase', fontWeight: 800, margin: '0 0 8px 0' }}>{lBilledTo}</p>
                        <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 4px 0', color: '#2D3748' }}>{invoice.partyName || 'Cash / Walk-in Customer'}</p>
                        <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>{invoice.partyPhone}</p>
                    </div>
                    <div style={{ flex: 1, background: 'white', padding: 20, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: '#A0AEC0', fontWeight: 800 }}>{lDate}</span>
                            <span style={{ fontSize: 14, fontWeight: 700 }}>{formatDate(invoice.date)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: '#A0AEC0', fontWeight: 800 }}>{lPayment}</span>
                            <span style={{ fontSize: 14, fontWeight: 700 }}>{invoice.paymentMethod || 'Cash'}</span>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: 24, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <ItemsTableModern headerColor={themeColor ? themeColor + '15' : '#FFF5F5'} textColor={themeColor || '#E53E3E'} />
                    <TotalsBlock />
                </div>

                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <p style={{ fontSize: 11, color: '#718096', fontStyle: 'italic' }}>{invoice.notes || defaultFooter}</p>
                </div>
            </div>

            <div style={{ padding: '0 40px', marginTop: 'auto' }}>
                <FooterBrand />
            </div>
        </div>
    );

    // ==========================================
    // THEME 5: QUICK BILL (Simple, Space-efficient)
    // ==========================================
    const renderQuickBill = (titleIndex: number) => {
        const titles = ['ORIGINAL FOR RECIPIENT', 'DUPLICATE FOR SUPPLIER', 'TRIPLICATE FOR TRANSPORT'];
        const printTitle = titles[titleIndex] || titles[0];

        return (
            <div key={`quick_bill-${titleIndex}`} style={{ padding: '40px', background: 'white', color: 'black', fontFamily: 'Arial, sans-serif', width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', boxSizing: 'border-box', position: 'relative' }}>
                {previewMode ? null : <p style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', border: `1px solid ${themeColor || 'black'}`, display: 'inline-block', padding: '2px 8px', position: 'absolute', top: 40, right: 40, textTransform: 'uppercase', color: themeColor || 'black' }}>{printTitle}</p>}

                <div style={{ textAlign: 'center', marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 50, objectFit: 'contain', marginBottom: 8 }} />}
                    <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0, textTransform: 'uppercase', color: themeColor || 'black' }}>{company?.name || 'Your Company'}</h1>
                    <p style={{ fontSize: 12, margin: '4px 0 0' }}>{company?.address || 'Shop Address'}, {company?.city || ''}</p>
                    <p style={{ fontSize: 12, margin: '2px 0 0' }}>Phone: {company?.phone} {company?.gstNumber ? `| GSTIN: ${company?.gstNumber}` : ''}</p>
                    <p style={{ fontSize: 14, fontWeight: 'bold', margin: '8px 0 0', textTransform: 'uppercase', letterSpacing: '1px', color: themeColor || 'black' }}>{lTitle}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `2px solid ${themeColor || 'black'}`, borderBottom: `2px solid ${themeColor || 'black'}`, padding: '10px 0', fontSize: 12 }}>
                    <div>
                        <p><b>{lBilledTo}:</b> {invoice.partyName || 'Cash / Walk-in'}</p>
                        {invoice.partyPhone && <p>Phone: {invoice.partyPhone}</p>}
                        {invoice.billingAddress && <p>Address: {invoice.billingAddress}</p>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p><b>{lNo}:</b> {invoice.invoiceNumber}</p>
                        <p><b>{lDate}:</b> {formatDate(invoice.date)}</p>
                        {invoice.stateOfSupply && <p><b>State of Supply:</b> {invoice.stateOfSupply}</p>}
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: 12 }}>
                    <thead>
                        <tr style={{ borderBottom: `1px solid ${themeColor || 'black'}` }}>
                            <th style={{ textAlign: 'left', padding: '8px 4px' }}>SN</th>
                            <th style={{ textAlign: 'left', padding: '8px 4px' }}>Description of Goods</th>
                            {showColumns.hsn && <th style={{ textAlign: 'center', padding: '8px 4px' }}>HSN</th>}
                            <th style={{ textAlign: 'right', padding: '8px 4px' }}>Qty</th>
                            {showColumns.rate && <th style={{ textAlign: 'right', padding: '8px 4px' }}>Rate</th>}
                            {showColumns.discount && <th style={{ textAlign: 'right', padding: '8px 4px' }}>Disc</th>}
                            {showColumns.tax && <th style={{ textAlign: 'right', padding: '8px 4px' }}>Tax</th>}
                            <th style={{ textAlign: 'right', padding: '8px 4px' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item: any, i: number) => (
                            <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '8px 4px' }}>{i + 1}</td>
                                <td style={{ padding: '8px 4px' }}>{item.name}</td>
                                {showColumns.hsn && <td style={{ textAlign: 'center', padding: '8px 4px' }}>{item.hsnCode}</td>}
                                <td style={{ textAlign: 'right', padding: '8px 4px' }}>{item.qty} {item.unit}</td>
                                {showColumns.rate && <td style={{ textAlign: 'right', padding: '8px 4px' }}>{item.rate.toFixed(2)}</td>}
                                {showColumns.discount && <td style={{ textAlign: 'right', padding: '8px 4px' }}>{item.discountAmt.toFixed(2)}</td>}
                                {showColumns.tax && <td style={{ textAlign: 'right', padding: '8px 4px' }}>{item.totalGst.toFixed(2)}</td>}
                                <td style={{ textAlign: 'right', padding: '8px 4px' }}>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, fontSize: 12 }}>
                    <table style={{ width: 300 }}>
                        <tbody>
                            <tr><td>Sub Total:</td><td style={{ textAlign: 'right' }}>{invoice.subTotal.toFixed(2)}</td></tr>
                            {invoice.totalDiscount > 0 && <tr><td>Discount:</td><td style={{ textAlign: 'right' }}>-{invoice.totalDiscount.toFixed(2)}</td></tr>}
                            {invoice.totalGst > 0 && <tr><td>GST:</td><td style={{ textAlign: 'right' }}>+{invoice.totalGst.toFixed(2)}</td></tr>}
                            {invoice.roundOff !== 0 && <tr><td>Round Off:</td><td style={{ textAlign: 'right' }}>{invoice.roundOff > 0 ? '+' : ''}{invoice.roundOff.toFixed(2)}</td></tr>}
                            {invoice.pointsValueRedeemed > 0 && <tr><td style={{ color: '#DC2626', fontWeight: 'bold' }}>Loyalty Redeem:</td><td style={{ textAlign: 'right', color: '#DC2626', fontWeight: 'bold' }}>-{invoice.pointsValueRedeemed.toFixed(2)}</td></tr>}
                            <tr style={{ fontWeight: 'bold', fontSize: 14 }}><td>Grand Total:</td><td style={{ textAlign: 'right' }}>{invoice.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: 40, fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        {qrUrl && (
                            <div style={{ padding: '6px', background: 'white', borderRadius: 6, border: '1px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content', marginBottom: 12 }}>
                                <img src={qrUrl} alt="UPI QR Code" style={{ width: 85, height: 85, marginBottom: 4 }} />
                                <span style={{ fontSize: 8, fontWeight: 'bold', color: 'black' }}>SCAN TO PAY (UPI)</span>
                            </div>
                        )}
                        <p><b>Terms & Conditions:</b></p>
                        <p>1. Goods once sold will not be taken back.</p>
                        <p>2. Subject to local jurisdiction.</p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <p>For {company?.name}</p>
                        <p style={{ marginTop: 40 }}>Authorized Signatory</p>
                    </div>
                </div>
                {previewMode ? null : <div style={{ height: 40 }} />}
            </div>
        )
    };

    // ==========================================
    // THEME 6: MINIMALIST (Clean & Spaced)
    // ==========================================
    const renderMinimalist = (copyIndex: number) => (
        <div key={`minimalist-${copyIndex}`} style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: 'white', color: '#1A202C', position: 'relative', overflow: 'hidden', padding: '60px 50px', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 60 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: '4px', margin: '0 0 16px 0', textTransform: 'uppercase', color: themeColor || '#718096' }}>{lTitle}</h1>
                    <p style={{ fontSize: 13, margin: '0 0 4px', fontWeight: 600 }}>{lNo}: {invoice.invoiceNumber}</p>
                    <p style={{ fontSize: 13, margin: 0, color: '#718096' }}>{lDate}: {formatDate(invoice.date)}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 40, objectFit: 'contain', marginBottom: 12 }} />}
                    <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 12px 0', color: themeColor || '#1A202C' }}>{company?.name}</h2>
                    <p style={{ fontSize: 12, margin: '0 0 4px', color: '#4A5568' }}>{company?.address}</p>
                    <p style={{ fontSize: 12, margin: '0 0 4px', color: '#4A5568' }}>{company?.city}</p>
                    <p style={{ fontSize: 12, margin: '0', color: '#4A5568' }}>{company?.phone}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 60, marginBottom: 50 }}>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: themeColor || '#A0AEC0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{lBilledTo}</p>
                    <p style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0' }}>{invoice.partyName || 'Walk-in Customer'}</p>
                    {invoice.partyPhone && <p style={{ fontSize: 13, margin: '0 0 4px', color: '#718096' }}>{invoice.partyPhone}</p>}
                    {invoice.billingAddress && <p style={{ fontSize: 13, margin: 0, color: '#718096' }}>{invoice.billingAddress}</p>}
                </div>
            </div>

            <div style={{ flex: 1 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                            <th style={{ textAlign: 'left', padding: '16px 0', color: '#A0AEC0', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: '1px' }}>Description</th>
                            <th style={{ textAlign: 'center', padding: '16px 0', color: '#A0AEC0', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: '1px' }}>Qty</th>
                            {showColumns.rate && <th style={{ textAlign: 'right', padding: '16px 0', color: '#A0AEC0', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: '1px' }}>Rate</th>}
                            <th style={{ textAlign: 'right', padding: '16px 0', color: '#A0AEC0', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: '1px' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item: any, i: number) => (
                            <tr key={i} style={{ borderBottom: '1px solid #F7FAFC' }}>
                                <td style={{ padding: '20px 0', fontWeight: 500 }}>{item.name}</td>
                                <td style={{ padding: '20px 0', textAlign: 'center', color: '#718096' }}>{item.qty} {item.unit}</td>
                                {showColumns.rate && <td style={{ padding: '20px 0', textAlign: 'right', color: '#718096' }}>{item.rate.toFixed(2)}</td>}
                                <td style={{ padding: '20px 0', textAlign: 'right', fontWeight: 600 }}>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TotalsBlock />
            </div>

            <div style={{ marginTop: 60, paddingTop: 30, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ fontSize: 11, color: '#A0AEC0', width: '60%', lineHeight: 1.6 }}>{invoice.notes || defaultFooter}</p>
                <FooterBrand />
            </div>
        </div>
    );

    // ==========================================
    // THEME 7: BOLD RETAIL (Orange/Dark Contrast)
    // ==========================================
    const renderBoldOrange = (copyIndex: number) => (
        <div key={copyIndex} style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: '#FFFAFA', color: '#1A202C', position: 'relative', overflow: 'hidden', padding: '0', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#DD6B20', color: 'white', padding: '40px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: 36, fontWeight: 900, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>{lTitle}</h1>
                    <p style={{ fontSize: 16, margin: 0, fontWeight: 700, opacity: 0.9 }}>#{invoice.invoiceNumber}</p>
                </div>
                {company?.logo ? <img src={company.logo} alt="Logo" style={{ height: 50, objectFit: 'contain', background: 'white', padding: 8, borderRadius: 8 }} /> : <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>{company?.name}</h2>}
            </div>

            <div style={{ padding: '40px 50px', display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #FEEBC8' }}>
                <div style={{ width: '45%' }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#DD6B20', textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>{lBilledTo}</p>
                    <p style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px 0' }}>{invoice.partyName || 'Cash Customer'}</p>
                    <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>{invoice.partyPhone}</p>
                    <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>{invoice.billingAddress}</p>
                </div>
                <div style={{ width: '45%', textAlign: 'right' }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#DD6B20', textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>Company details</p>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px 0' }}>{company?.name}</p>
                    <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>{company?.address}, {company?.city}</p>
                    <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>{company?.phone}</p>
                </div>
            </div>

            <div style={{ padding: '40px 50px', flex: 1 }}>
                <ItemsTableModern headerColor="#FBD38D" textColor="#9C4221" />
                <TotalsBlock />
            </div>

            <div style={{ background: '#2D3748', color: 'white', padding: '30px 50px', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 11, color: '#A0AEC0', margin: 0, maxWidth: '60%' }}>{invoice.notes || defaultFooter}</p>
                    <FooterBrand />
                </div>
            </div>
        </div>
    );

    const renderElegant = (copyIndex: number) => (
        <div key={copyIndex} style={{ fontFamily: "'Outfit', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: 'white', color: '#111827', position: 'relative', overflow: 'hidden', padding: '0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#111827', color: 'white', padding: '60px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: 44, fontWeight: 300, margin: '0 0 10px 0', letterSpacing: '2px' }}>{lTitle}</h1>
                    <p style={{ fontSize: 14, margin: 0, opacity: 0.8 }}>{lNo === 'Invoice No' ? 'No.' : lNo} {invoice.invoiceNumber} | {formatDate(invoice.date)}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 4px 0' }}>{company?.name}</h2>
                    <p style={{ fontSize: 12, opacity: 0.7 }}>{company?.city}</p>
                </div>
            </div>
            <div style={{ padding: '50px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
                    <div>
                        <p style={{ fontSize: 10, fontWeight: 900, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 12 }}>{lBilledTo}</p>
                        <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{invoice.partyName || 'Valued Customer'}</p>
                        <p style={{ fontSize: 13, color: '#6B7280' }}>{invoice.partyPhone}</p>
                    </div>
                </div>
                <ItemsTableModern headerColor="#1F2937" textColor="#FFFFFF" />
                <TotalsBlock />
            </div>
            <div style={{ padding: '0 50px 40px' }}>
                <FooterBrand />
            </div>
        </div>
    );

    const renderVibrant = (copyIndex: number) => (
        <div key={`vibrant-${copyIndex}`} style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: '#FFFFFF', color: themeColor || '#1E3A8A', position: 'relative', overflow: 'hidden', padding: '0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: themeColor ? themeColor + '10' : '#EFF6FF', padding: '50px', borderBottom: `4px solid ${themeColor || '#3B82F6'}`, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: 40, fontWeight: 900, color: themeColor || '#1E40AF', margin: '0 0 8px 0' }}>{lTitle}</h1>
                    <div style={{ display: 'inline-block', background: themeColor || '#3B82F6', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>#{invoice.invoiceNumber}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 16 }}>
                    {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 50, objectFit: 'contain' }} />}
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 24, fontWeight: 900, color: themeColor || '#1E40AF', margin: '0 0 4px 0' }}>{company?.name}</p>
                        <p style={{ fontSize: 13, color: themeColor || '#60A5FA' }}>{company?.phone}</p>
                    </div>
                </div>
            </div>
            <div style={{ padding: '50px', flex: 1 }}>
                <ItemsTableModern headerColor={themeColor ? themeColor + '15' : '#DBEAFE'} textColor={themeColor || '#1E40AF'} />
                <TotalsBlock />
            </div>
            <div style={{ padding: '0 50px 40px' }}>
                <FooterBrand />
            </div>
        </div>
    );

    const renderRetro = (copyIndex: number) => (
        <div key={copyIndex} style={{ fontFamily: "'Courier Prime', monospace", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: '#FDFCF0', color: '#000000', padding: '60px', boxSizing: 'border-box', position: 'relative', border: '1px solid #D1D5DB' }}>
            <div style={{ textAlign: 'center', marginBottom: 40, borderBottom: '2px dashed #000' }}>
                <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: '0 0 10px' }}>{company?.name}</h1>
                <p style={{ fontSize: 14 }}>{company?.address}, {company?.city}</p>
                <p style={{ fontSize: 14 }}>TEL: {company?.phone}</p>
                <p style={{ fontSize: 14, fontWeight: 'bold', margin: '10px 0 0', textTransform: 'uppercase' }}>*** {lTitle} ***</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                <div>
                    <p>TO: {invoice.partyName}</p>
                    <p>PH: {invoice.partyPhone}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p>{lNo.toUpperCase()}: {invoice.invoiceNumber}</p>
                    <p>{lDate.toUpperCase()}: {formatDate(invoice.date)}</p>
                </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #000', borderTop: '1px solid #000' }}>
                        <th style={{ textAlign: 'left', padding: '10px' }}>ITEM</th>
                        <th style={{ textAlign: 'center', padding: '10px' }}>QTY</th>
                        <th style={{ textAlign: 'right', padding: '10px' }}>PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((it: any, i: number) => (
                        <tr key={i}>
                            <td style={{ padding: '8px 10px' }}>{it.name}</td>
                            <td style={{ padding: '8px 10px', textAlign: 'center' }}>{it.qty}</td>
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>{it.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: 'right', borderTop: '2px solid #000', paddingTop: 10 }}>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>TOTAL: INR {invoice.grandTotal.toFixed(2)}</p>
            </div>
            <div style={{ marginTop: 50 }}>
                <p>SIGNATURE: ____________________</p>
            </div>
        </div>
    );

    const pageSize = company?.templatePageSize || 'A4';

    const getPageSizeStyles = () => {
        switch (pageSize) {
            case 'A5':
                return {
                    width: '148mm',
                    minHeight: '210mm',
                    padding: '20px',
                    fontSize: '11px',
                };
            case 'A6':
                return {
                    width: '105mm',
                    minHeight: '148mm',
                    padding: '12px',
                    fontSize: '9px',
                };
            case '3inch':
                return {
                    width: '80mm',
                    minHeight: 'auto',
                    padding: '8px',
                    fontSize: '10px',
                };
            case 'A4':
            default:
                return {
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '40px',
                    fontSize: '13px',
                };
        }
    };

    const sizeConfig = getPageSizeStyles();

    const renderCopyRaw = (copyIndex: number) => {
        switch (theme) {
            case 'quick_bill': return renderQuickBill(copyIndex);
            case 'minimalist': return renderMinimalist(copyIndex);
            case 'bold_orange': return renderBoldOrange(copyIndex);
            case 'elegant': return renderElegant(copyIndex);
            case 'vibrant': return renderVibrant(copyIndex);
            case 'retro': return renderRetro(copyIndex);
            case 'classic': return renderClassic(copyIndex);
            case 'modern': return renderModern(copyIndex);
            case 'waves': return renderWaves(copyIndex);
            case 'luxe_gold': return renderLuxeGold(copyIndex);
            case 'beige_dark': return renderBeigeDark(copyIndex);
            case 'sea_green': return renderSeaGreen(copyIndex);
            case 'formal_quote': return renderFormalQuote(copyIndex);
            case 'creative':
            default: return renderCreative(copyIndex);
        }
    };

    const renderCopy = (copyIndex: number) => {
        const element = renderCopyRaw(copyIndex);
        if (!element) return null;

        const mergedStyle = {
            ...element.props.style,
            maxWidth: sizeConfig.width,
            width: '100%',
            minHeight: sizeConfig.minHeight,
        };

        if (pageSize === 'A5') {
            mergedStyle.padding = '20px';
        } else if (pageSize === 'A6') {
            mergedStyle.padding = '12px';
        } else if (pageSize === '3inch') {
            mergedStyle.padding = '8px';
        }

        return React.cloneElement(element, {
            style: mergedStyle,
            className: `${element.props.className || ''} page-size-${pageSize.toLowerCase()}`
        });
    };

    const renderBeigeDark = (copyIndex: number) => (
        <div key={copyIndex} style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: '#D9CDB8', color: '#1B2129', position: 'relative', overflow: 'hidden', padding: '0', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '50px 50px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    {company?.logo ? <img src={company.logo} alt="Logo" style={{ height: 60, marginBottom: 10 }} /> : <div style={{ fontSize: 24, fontWeight: 900 }}>{company?.name}</div>}
                    <h1 style={{ fontSize: 52, fontWeight: 900, margin: '20px 0 10px 0', letterSpacing: '-1px' }}>{lTitle}</h1>
                    <table style={{ fontSize: 13, fontWeight: 700 }}>
                        <tbody>
                            <tr><td style={{ paddingRight: 10 }}>{lNo}.</td><td>{invoice.invoiceNumber}</td></tr>
                            <tr><td style={{ paddingRight: 10 }}>{lDate}.</td><td>{formatDate(invoice.date)}</td></tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ textAlign: 'right', marginTop: 80 }}>
                    <p style={{ fontSize: 13, fontWeight: 800, margin: '0 0 4px 0' }}>{lBilledTo}.</p>
                    <p style={{ fontSize: 18, fontWeight: 900, margin: '0 0 8px 0' }}>{invoice.partyName || 'Cash Customer'}</p>
                    <p style={{ fontSize: 12, margin: 0 }}>{invoice.partyPhone}</p>
                    <p style={{ fontSize: 12, margin: 0, maxWidth: 200, display: 'inline-block' }}>{invoice.billingAddress}</p>
                </div>
            </div>

            <div style={{ padding: '20px 50px', flex: 1 }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 13, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                    <thead>
                        <tr style={{ background: '#1B2129', color: 'white' }}>
                            <th style={{ textAlign: 'center', padding: '16px', width: '10%' }}>Qty</th>
                            <th style={{ textAlign: 'left', padding: '16px' }}>Item Description</th>
                            <th style={{ textAlign: 'right', padding: '16px' }}>Price</th>
                            <th style={{ textAlign: 'right', padding: '16px' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((it: any, i: number) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? '#EADDC4' : '#D9CDB8' }}>
                                <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 800 }}>{it.qty}</td>
                                <td style={{ padding: '14px 16px', fontWeight: 700 }}>{it.name}</td>
                                <td style={{ padding: '14px 16px', textAlign: 'right' }}>{it.rate.toFixed(2)}</td>
                                <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 800 }}>{it.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 0 20px' }}>
                    <div style={{ width: '45%' }}>
                        <p style={{ fontSize: 14, fontWeight: 900, margin: '0 0 10px 0' }}>Payment Method</p>
                        <PaymentMethodDisplay style={{ fontSize: 12, margin: '0 0 4px 0', display: 'block' }} />
                        <p style={{ fontSize: 12, margin: '0 0 4px 0' }}>Method: {invoice.paymentMethod || 'Cash / Bank Transfer'}</p>
                        {company?.bankDetails?.upiId && <p style={{ fontSize: 12, margin: '0 0 4px 0' }}>UPI: {company.bankDetails.upiId}</p>}
                    </div>
                    <div style={{ width: '45%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, fontWeight: 700 }}>
                            <span>Sub-Total:</span><span>{invoice.subTotal.toFixed(2)}</span>
                        </div>
                        {invoice.totalGst > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14, fontWeight: 700 }}>
                            <span>Tax Vat:</span><span>{invoice.totalGst.toFixed(2)}</span>
                        </div>}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 16, fontWeight: 900 }}>Total:</span>
                            <span style={{ fontSize: 18, fontWeight: 900, background: '#1B2129', color: 'white', padding: '10px 24px', borderRadius: '30px' }}>
                                {invoice.grandTotal.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 40, borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 20 }}>
                    <div style={{ width: '45%', fontSize: 12, lineHeight: 1.6 }}>
                        <p style={{ margin: '0 0 4px', fontWeight: 800 }}>{company?.name}</p>
                        <p style={{ margin: '0 0 4px' }}>TEL: {company?.phone}</p>
                        <p style={{ margin: 0 }}>{company?.address}, {company?.city}</p>
                    </div>
                    <div style={{ width: '45%', textAlign: 'right' }}>
                        <p style={{ fontSize: 14, fontWeight: 900, margin: '0 0 4px' }}>Terms & Condition.</p>
                        <p style={{ fontSize: 10, margin: 0 }}>{invoice.notes || defaultFooter}</p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 50px 30px' }}>
                <FooterBrand />
            </div>

            {/* Wavy bottom decoration */}
            <div style={{ height: 40, background: '#1B2129', width: '100%' }}></div>
        </div>
    );

    const renderSeaGreen = (copyIndex: number) => (
        <div key={`sea_green-${copyIndex}`} style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: '#F1F5F9', color: '#1E293B', position: 'relative', overflow: 'hidden', padding: '0', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: themeColor || '#45C4A0', color: 'white', padding: '50px 40px', paddingBottom: '70px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 50, objectFit: 'contain', background: 'white', padding: 4, borderRadius: 8 }} />}
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{company?.name}</div>
                            <h1 style={{ fontSize: 40, fontWeight: 900, margin: '0 0 10px', letterSpacing: '-2px' }}>{lTitle}.</h1>
                            <p style={{ fontSize: 16, fontWeight: 600 }}>{lNo === 'Invoice No' ? 'No.' : lNo} {invoice.invoiceNumber}</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', paddingTop: 40 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, margin: '0 0 4px' }}>{lDate}:</p>
                        <p style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>{formatDate(invoice.date)}</p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 40px', flex: 1, marginTop: '-40px' }}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', flex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <p style={{ fontSize: 13, fontWeight: 800, color: themeColor || '#45C4A0', textTransform: 'uppercase', marginBottom: 8 }}>{lBilledTo}:</p>
                        <p style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 12 }}>{invoice.partyName || 'Customer'}</p>
                        <p style={{ fontSize: 12, color: '#64748B', display: 'flex', gap: 8, marginBottom: 4 }}><strong style={{ width: 60 }}>Phone:</strong> {invoice.partyPhone || '-'}</p>
                        <p style={{ fontSize: 12, color: '#64748B', display: 'flex', gap: 8 }}><strong style={{ width: 60 }}>Addr:</strong> {invoice.billingAddress || '-'}</p>
                    </div>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', flex: 0.8, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <p style={{ fontSize: 13, fontWeight: 800, color: themeColor || '#45C4A0', textTransform: 'uppercase', marginBottom: 8 }}>Payment Info:</p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>{invoice.paymentMethod || 'Cash'}</p>
                        {company?.bankDetails?.upiId && <p style={{ fontSize: 12, color: '#64748B', display: 'flex', gap: 8, marginBottom: 4 }}><strong style={{ width: 40 }}>UPI:</strong> {company.bankDetails.upiId}</p>}

                        <div style={{ background: themeColor ? themeColor + '15' : '#E8F6F3', padding: '10px 16px', borderRadius: '10px', display: 'inline-block', marginTop: 10 }}>
                            <span style={{ fontSize: 12, fontWeight: 800, color: themeColor || '#45C4A0', marginRight: 10 }}>Amount Due:</span>
                            <span style={{ fontSize: 18, fontWeight: 900, color: '#1E293B' }}>₹{invoice.grandTotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: themeColor || '#45C4A0', color: 'white' }}>
                                <th style={{ textAlign: 'center', padding: '14px', width: '10%' }}>No.</th>
                                <th style={{ textAlign: 'left', padding: '14px' }}>Product Description</th>
                                <th style={{ textAlign: 'right', padding: '14px' }}>Price</th>
                                <th style={{ textAlign: 'center', padding: '14px' }}>Qty</th>
                                <th style={{ textAlign: 'right', padding: '14px' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((it: any, i: number) => (
                                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                    <td style={{ padding: '14px', textAlign: 'center', color: '#64748B' }}>{(i + 1).toString().padStart(2, '0')}</td>
                                    <td style={{ padding: '14px', fontWeight: 700 }}>{it.name}</td>
                                    <td style={{ padding: '14px', textAlign: 'right', color: '#64748B' }}>{it.rate.toFixed(2)}</td>
                                    <td style={{ padding: '14px', textAlign: 'center' }}>{it.qty}</td>
                                    <td style={{ padding: '14px', textAlign: 'right', fontWeight: 700 }}>{it.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 24px', background: '#F8FAFC' }}>
                        <div style={{ background: themeColor || '#45C4A0', color: 'white', padding: '10px 24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span style={{ fontSize: 14, fontWeight: 600 }}>Total Due:</span>
                            <span style={{ fontSize: 20, fontWeight: 900 }}>₹{invoice.grandTotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
                    <div style={{ background: themeColor || '#45C4A0', color: 'white', padding: '20px', borderRadius: '16px', flex: 1 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 8px 0' }}>Terms & Conditions:</h4>
                        <p style={{ fontSize: 11, lineHeight: 1.5, margin: 0, opacity: 0.9 }}>{invoice.notes || defaultFooter}</p>
                    </div>
                    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <div style={{ borderBottom: '2px solid #CBD5E1', width: 200, marginBottom: 10 }}></div>
                        <p style={{ fontSize: 14, fontWeight: 800, color: '#1E293B', margin: '0 0 2px' }}>{company?.name || 'Administrator'}</p>
                        <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Authorized Signatory</p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '30px 40px', background: 'white', marginTop: 40 }}>
                <FooterBrand />
            </div>
            <div style={{ height: 20, background: themeColor || '#45C4A0', width: '100%' }}></div>
        </div>
    );

    const renderFormalQuote = (copyIndex: number) => (
        <div key={`formal_quote-${copyIndex}`} style={{ fontFamily: "Arial, sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: 'white', color: 'black', position: 'relative', overflow: 'hidden', padding: '50px', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
                <div>
                    {showLogo && (company?.logoUrl || company?.logo) && <img src={company.logoUrl || company.logo} alt="Logo" style={{ height: 60, marginBottom: 10, objectFit: 'contain' }} />}
                    <h2 style={{ fontSize: 20, fontWeight: 'bold', margin: '0 0 10px 0', color: themeColor || 'black' }}>{company?.name || '[Company Name]'}</h2>
                    <p style={{ fontSize: 12, margin: '0 0 4px 0' }}>{company?.address || '[Street Address]'}</p>
                    <p style={{ fontSize: 12, margin: '0 0 4px 0' }}>{company?.city || '[City, ST ZIP]'}</p>
                    <p style={{ fontSize: 12, margin: '0 0 4px 0' }}>Phone: {company?.phone || '(000) 000-0000'}</p>
                    {company?.gstNumber && <p style={{ fontSize: 12, margin: '0 0 4px 0' }}>GSTIN: {company?.gstNumber}</p>}
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h1 style={{ fontSize: 36, fontWeight: 'bold', color: themeColor || '#1F2937', margin: '0 0 20px 0', letterSpacing: '1px' }}>{lTitle}</h1>
                    <table style={{ borderCollapse: 'collapse', fontSize: 12, float: 'right', width: 250, border: `1px solid ${themeColor || 'black'}` }}>
                        <tbody>
                            <tr>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '6px', fontWeight: 'bold', background: themeColor ? themeColor + '20' : '#E5E7EB', width: '50%', color: themeColor || 'black' }}>{lNo} #</td>
                                <td style={{ border: '1px solid black', padding: '6px', textAlign: 'center' }}>{invoice.invoiceNumber}</td>
                            </tr>
                            <tr>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '6px', fontWeight: 'bold', background: themeColor ? themeColor + '20' : '#E5E7EB', color: themeColor || 'black' }}>DATE</td>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '6px', textAlign: 'center' }}>{formatDate(invoice.date)}</td>
                            </tr>
                            <tr>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '6px', fontWeight: 'bold', background: themeColor ? themeColor + '20' : '#E5E7EB', color: themeColor || 'black' }}>CUSTOMER ID</td>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '6px', textAlign: 'center' }}>{invoice.partyId || 'CASH'}</td>
                            </tr>
                            <tr>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '6px', fontWeight: 'bold', background: themeColor ? themeColor + '20' : '#E5E7EB', color: themeColor || 'black' }}>VALID UNTIL</td>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '6px', textAlign: 'center' }}>{invoice.dueDate ? formatDate(invoice.dueDate) : '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                <div style={{ width: '45%' }}>
                    <div style={{ background: themeColor ? themeColor + '20' : '#E5E7EB', padding: '6px 10px', fontWeight: 'bold', border: `1px solid ${themeColor || 'black'}`, borderBottom: 'none', fontSize: 12, color: themeColor || 'black' }}>CUSTOMER INFO</div>
                    <div style={{ border: `1px solid ${themeColor || 'black'}`, padding: '10px', fontSize: 12, minHeight: 80 }}>
                        <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>{invoice.partyName || '[Name]'}</p>
                        <p style={{ margin: '0 0 4px' }}>Phone: {invoice.partyPhone || '[Phone]'}</p>
                        <p style={{ margin: '0 0 4px' }}>{invoice.billingAddress || '[Address]'}</p>
                    </div>
                </div>
                <div style={{ width: '45%' }}>
                    <div style={{ paddingTop: 30, textAlign: 'right', fontSize: 12, fontStyle: 'italic' }}>
                        Prepared By: ____________________
                    </div>
                </div>
            </div>

            {invoice.notes && (
                <div style={{ marginBottom: 30 }}>
                    <div style={{ background: themeColor ? themeColor + '20' : '#E5E7EB', padding: '6px 10px', fontWeight: 'bold', border: `1px solid ${themeColor || 'black'}`, borderBottom: 'none', fontSize: 12, color: themeColor || 'black' }}>DESCRIPTION OF WORK / NOTES</div>
                    <div style={{ border: `1px solid ${themeColor || 'black'}`, padding: '10px', fontSize: 12, minHeight: 60, whiteSpace: 'pre-wrap' }}>
                        {invoice.notes}
                    </div>
                </div>
            )}

            <div style={{ flex: 1 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, border: `1px solid ${themeColor || 'black'}` }}>
                    <thead>
                        <tr style={{ background: themeColor ? themeColor + '20' : '#E5E7EB', color: themeColor || 'black' }}>
                            <th style={{ border: `1px solid ${themeColor || 'black'}`, padding: '8px 10px', textAlign: 'left' }}>ITEMIZED COSTS</th>
                            <th style={{ border: `1px solid ${themeColor || 'black'}`, padding: '8px 10px', textAlign: 'center', width: '10%' }}>QTY</th>
                            <th style={{ border: `1px solid ${themeColor || 'black'}`, padding: '8px 10px', textAlign: 'right', width: '15%' }}>UNIT PRICE</th>
                            <th style={{ border: `1px solid ${themeColor || 'black'}`, padding: '8px 10px', textAlign: 'right', width: '15%' }}>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((it: any, i: number) => (
                            <tr key={i}>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, borderBottom: 'none', borderTop: 'none', padding: '6px 10px' }}>{it.name}</td>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, borderBottom: 'none', borderTop: 'none', padding: '6px 10px', textAlign: 'center' }}>{it.qty}</td>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, borderBottom: 'none', borderTop: 'none', padding: '6px 10px', textAlign: 'right' }}>{it.rate.toFixed(2)}</td>
                                <td style={{ border: `1px solid ${themeColor || 'black'}`, borderBottom: 'none', borderTop: 'none', padding: '6px 10px', textAlign: 'right' }}>{it.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                        {/* Fill empty space if few items */}
                        {Array.from({ length: Math.max(0, 10 - invoice.items.length) }).map((_, i) => (
                            <tr key={'empty-' + i}>
                                <td style={{ borderLeft: `1px solid ${themeColor || 'black'}`, borderRight: `1px solid ${themeColor || 'black'}`, padding: '12px' }}></td>
                                <td style={{ borderLeft: `1px solid ${themeColor || 'black'}`, borderRight: `1px solid ${themeColor || 'black'}`, padding: '12px' }}></td>
                                <td style={{ borderLeft: `1px solid ${themeColor || 'black'}`, borderRight: `1px solid ${themeColor || 'black'}`, padding: '12px' }}></td>
                                <td style={{ borderLeft: `1px solid ${themeColor || 'black'}`, borderRight: `1px solid ${themeColor || 'black'}`, padding: '12px' }}></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2} rowSpan={3} style={{ border: `1px solid ${themeColor || 'black'}`, padding: '10px', textAlign: 'center', fontStyle: 'italic', fontSize: 13, verticalAlign: 'middle' }}>
                                Thank you for your business!
                            </td>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '8px 10px', fontWeight: 'bold' }}>SUBTOTAL</td>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '8px 10px', textAlign: 'right', fontWeight: 'bold' }}>{invoice.subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '8px 10px', fontWeight: 'bold', background: themeColor ? themeColor + '20' : '#E5E7EB', color: themeColor || 'black' }}>CGST / SGST</td>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '8px 10px', textAlign: 'right', background: themeColor ? themeColor + '20' : '#E5E7EB' }}>{invoice.totalGst.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '10px', fontWeight: 'bold', fontSize: 14, color: themeColor || 'black' }}>TOTAL {lTitle}</td>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, padding: '10px', textAlign: 'right', fontWeight: 'bold', fontSize: 14, color: themeColor || 'black' }}>₹{invoice.grandTotal.toLocaleString('en-IN')}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div style={{ marginTop: 30, fontSize: 11 }}>
                <p style={{ margin: '0 0 10px 0' }}>This quotation is not a contract or a bill. It is our best guess at the total price for the service and goods described above. The customer will be billed after indicating acceptance of this quote. Payment will be due prior to the delivery of service and goods.</p>
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Customer Acceptance</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${themeColor || 'black'}` }}>
                    <tbody>
                        <tr>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, height: 40, width: '40%', verticalAlign: 'bottom', padding: 4 }}>Signature</td>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, height: 40, width: '40%', verticalAlign: 'bottom', padding: 4 }}>Printed Name</td>
                            <td style={{ border: `1px solid ${themeColor || 'black'}`, height: 40, width: '20%', verticalAlign: 'bottom', padding: 4 }}>Date</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20, borderTop: '3px solid #E2E8F0', paddingBottom: 10, pageBreakInside: 'avoid' }}>
                <div>
                    <p style={{ fontSize: 11, color: '#A0AEC0', marginBottom: 16 }}>{defaultFooter}</p>
                    <img src="/logo.png" alt="Edibio" style={{ height: 44, width: 'auto', objectFit: 'contain', display: 'block' }} />
                </div>
                <div style={{ paddingBottom: 4 }}>
                    <Barcode value={invoice.invoiceNumber || 'INV-000'} width={1.2} height={40} fontSize={12} fontWeight="bold" displayValue={true} margin={0} background="transparent" />
                </div>
            </div>
        </div>
    );


    const renderLuxeGold = (copyIndex: number) => (
        <div key={copyIndex} style={{ fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '210mm', minHeight: '100vh', margin: '0 auto', background: '#0F172A', color: '#F1F5F9', position: 'relative', overflow: 'hidden', padding: '0', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', padding: '60px 40px', borderBottom: '2px solid #CA8A04' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: 44, fontWeight: 900, background: 'linear-gradient(to right, #FDE047, #CA8A04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 10px 0' }}>{lTitle}</h1>
                        <p style={{ fontSize: 16, color: '#94A3B8' }}>#{invoice.invoiceNumber} | {formatDate(invoice.date)}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ fontSize: 28, fontWeight: 200, letterSpacing: '2px', color: '#FDE047' }}>{company?.name}</h2>
                        <p style={{ fontSize: 13, color: '#94A3B8' }}>{company?.city}</p>
                    </div>
                </div>
            </div>
            <div style={{ padding: '40px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40, background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 800, color: '#CA8A04', textTransform: 'uppercase', marginBottom: 12 }}>{lBilledTo}</p>
                        <p style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>{invoice.partyName || 'Premium Client'}</p>
                        <p style={{ fontSize: 13, color: '#94A3B8' }}>{invoice.partyPhone}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 11, fontWeight: 800, color: '#CA8A04', textTransform: 'uppercase', marginBottom: 12 }}>Invoice Summary</p>
                        <p style={{ fontSize: 13, color: '#94A3B8' }}>Status: <span style={{ color: '#FDE047' }}>{(invoice.paymentStatus || 'unpaid').toUpperCase()}</span></p>
                        <p style={{ fontSize: 13, color: '#94A3B8' }}>Method: {invoice.paymentMethod}</p>
                    </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                        <tr style={{ color: '#CA8A04', borderBottom: '2px solid #CA8A04' }}>
                            <th style={{ textAlign: 'left', padding: '16px 0' }}>DESCRIPTION</th>
                            <th style={{ textAlign: 'center', padding: '16px 0' }}>QTY</th>
                            <th style={{ textAlign: 'right', padding: '16px 0' }}>RATE</th>
                            <th style={{ textAlign: 'right', padding: '16px 0' }}>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((it: any, i: number) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '20px 0', fontWeight: 600, color: 'white' }}>{it.name}</td>
                                <td style={{ padding: '20px 0', textAlign: 'center' }}>{it.qty}</td>
                                <td style={{ padding: '20px 0', textAlign: 'right' }}>{it.rate.toFixed(2)}</td>
                                <td style={{ padding: '20px 0', textAlign: 'right', fontWeight: 900, color: '#FDE047' }}>{it.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
                    <div style={{ width: 300, background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                            <span style={{ color: '#94A3B8' }}>Subtotal</span>
                            <span style={{ color: 'white' }}>₹{invoice.subTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>TOTAL</span>
                            <span style={{ fontSize: 18, fontWeight: 900, color: '#FDE047' }}>₹{invoice.grandTotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ padding: '40px', background: '#1E293B', borderTop: '4px solid #CA8A04', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{invoice.notes || defaultFooter}</p>
                <FooterBrand />
            </div>
        </div>
    );

    return (
        <div className={previewMode ? '' : 'print-only'} style={{ width: '100%' }}>
            {Array.from({ length: copies }).map((_, i) => (
                <React.Fragment key={`${theme}-${i}`}>
                    {renderCopy(i)}
                    {i < copies - 1 && <div style={{ pageBreakBefore: 'always' }} />}
                </React.Fragment>
            ))}

            <style>{`
                @media (max-width: 768px) {
                    .theme-container { padding: 15px !important; }
                    .creative-layout { flex-direction: column !important; }
                    .creative-sidebar { width: 100% !important; border-radius: 12px !important; margin-bottom: 20px; }
                    .totals-block { max-width: 100% !important; margin-top: 10px !important; }
                    h1 { fontSize: 28px !important; }
                    .invoice-footer { flex-direction: column !important; align-items: center !important; gap: 20px; text-align: center; }
                    .theme-creative .creative-sidebar { padding: 20px !important; }
                }
                @media print {
                   .invoice-footer { position: fixed; bottom: 10px; left: 40px; right: 40px; background: white !important; }
                   @page {
                      size: ${pageSize === '3inch' ? '80mm auto' : pageSize};
                      margin: 0;
                   }
                   body {
                      margin: 0;
                      padding: 0;
                   }
                }
                
                /* Size overrides */
                .page-size-a5, .page-size-a5 * {
                    font-size: 11px !important;
                }
                .page-size-a5 td, .page-size-a5 th {
                    padding: 8px 6px !important;
                }
                .page-size-a5 h1, .page-size-a5 h1 * {
                    font-size: 24px !important;
                }
                .page-size-a5 h2, .page-size-a5 h2 * {
                    font-size: 18px !important;
                }
                .page-size-a5 h3, .page-size-a5 h3 * {
                    font-size: 14px !important;
                }
                .page-size-a5 .theme-container, .page-size-a5 [style*="padding: 50px"], .page-size-a5 [style*="padding: 40px"] {
                    padding: 20px !important;
                }
                
                .page-size-a6, .page-size-a6 * {
                    font-size: 9px !important;
                }
                .page-size-a6 td, .page-size-a6 th {
                    padding: 4px 2px !important;
                }
                .page-size-a6 h1, .page-size-a6 h1 * {
                    font-size: 16px !important;
                }
                .page-size-a6 h2, .page-size-a6 h2 * {
                    font-size: 13px !important;
                }
                .page-size-a6 h3, .page-size-a6 h3 * {
                    font-size: 11px !important;
                }
                .page-size-a6 img, .page-size-a6 svg {
                    max-height: 40px !important;
                }
                .page-size-a6 .theme-container, .page-size-a6 [style*="padding: 50px"], .page-size-a6 [style*="padding: 40px"], .page-size-a6 [style*="padding: 30px"] {
                    padding: 10px !important;
                }
                
                .page-size-3inch, .page-size-3inch * {
                    font-size: 10px !important;
                    font-family: monospace !important;
                }
                .page-size-3inch td, .page-size-3inch th {
                    padding: 4px 2px !important;
                }
                .page-size-3inch h1, .page-size-3inch h1 * {
                    font-size: 14px !important;
                }
                .page-size-3inch h2, .page-size-3inch h2 * {
                    font-size: 12px !important;
                }
                .page-size-3inch h3, .page-size-3inch h3 * {
                    font-size: 11px !important;
                }
                .page-size-3inch img, .page-size-3inch svg {
                    max-height: 35px !important;
                }
                .page-size-3inch .creative-layout, .page-size-3inch .elegant-layout, .page-size-3inch .modern-layout {
                    flex-direction: column !important;
                }
                .page-size-3inch .creative-sidebar {
                    width: 100% !important;
                    padding: 10px !important;
                    margin-bottom: 10px !important;
                }
                .page-size-3inch .theme-container, .page-size-3inch [style*="padding: 50px"], .page-size-3inch [style*="padding: 40px"], .page-size-3inch [style*="padding: 30px"], .page-size-3inch [style*="padding: 20px"] {
                    padding: 6px !important;
                }
            `}</style>
        </div>
    );
};
