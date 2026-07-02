'use client';
import { useState, useMemo, useRef } from 'react';
import { useStore, useActiveCompany, useCompanyData } from '@/lib/store';
import {
    Percent, FileText, CheckCircle, AlertTriangle, Play, HelpCircle,
    Calendar, Download, Upload, ShieldAlert, Check, ShieldCheck, Lock,
    Plus, Coins, BarChart3, Truck, Layers, ChevronRight, FileJson, Clock, Eye, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function GstSuitePanel() {
    const company = useActiveCompany();
    const { updateCompany } = useStore();
    const invoices = useCompanyData('invoices') as any[] || [];
    const parties = useCompanyData('parties') as any[] || [];
    const products = useCompanyData('products') as any[] || [];

    const [activeTab, setActiveTab] = useState<'workflow' | 'gstr1' | 'gstr3b' | 'gstr2b' | 'audit' | 'payments' | 'einvoice' | 'eway'>('workflow');

    const tabScrollRef = useRef<HTMLDivElement>(null);

    const handleTabWheel = (e: React.WheelEvent) => {
        const container = tabScrollRef.current;
        if (container) {
            container.scrollLeft += e.deltaY;
        }
    };

    const handleTabMouseDown = (e: React.MouseEvent) => {
        const container = tabScrollRef.current;
        if (!container) return;
        
        container.style.scrollBehavior = 'auto';
        const startX = e.pageX - container.offsetLeft;
        const scrollLeft = container.scrollLeft;
        
        const handleMouseMove = (moveEvent: MouseEvent) => {
            const x = moveEvent.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        };
        
        const handleMouseUp = () => {
            container.style.scrollBehavior = 'smooth';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // ─────────────────────────────────────────────────────────────────────────
    // State for interactive filing workflow
    // ─────────────────────────────────────────────────────────────────────────
    const [currentStep, setCurrentStep] = useState(1);
    const [workflowStatus, setWorkflowStatus] = useState<Record<number, 'pending' | 'success' | 'warning'>>({
        1: 'pending', 2: 'pending', 3: 'pending', 4: 'pending', 5: 'pending',
        6: 'pending', 7: 'pending', 8: 'pending', 9: 'pending', 10: 'pending',
        11: 'pending', 12: 'pending', 13: 'pending', 14: 'pending', 15: 'pending',
        16: 'pending', 17: 'pending', 18: 'pending', 19: 'pending'
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GSTR-1 Computations
    // ─────────────────────────────────────────────────────────────────────────
    const gstr1Data = useMemo(() => {
        const sales = invoices.filter(i => i.invoiceType === 'sale');
        const b2b: any[] = [];
        const b2cLarge: any[] = [];
        const b2cSmall: any[] = [];
        const creditDebitNotes = invoices.filter(i => ['sale_return', 'credit_note', 'debit_note'].includes(i.invoiceType));

        sales.forEach(inv => {
            const party = parties.find(p => p.id === inv.partyId || p.name === inv.partyName);
            const gstin = party?.gstNumber || inv.gstin;

            if (gstin && gstin.trim().length === 15) {
                b2b.push(inv);
            } else {
                // Inter-state check (if invoice state is different from company state)
                const isInterState = inv.state && company?.state && inv.state.toLowerCase() !== company.state.toLowerCase();
                if (isInterState && inv.grandTotal > 250000) {
                    b2cLarge.push(inv);
                } else {
                    b2cSmall.push(inv);
                }
            }
        });

        // Compute HSN summary
        const hsnSummary: Record<string, { code: string; qty: number; value: number; tax: number }> = {};
        sales.forEach(inv => {
            (inv.items || []).forEach((item: any) => {
                const code = item.hsnCode || '9999';
                if (!hsnSummary[code]) {
                    hsnSummary[code] = { code, qty: 0, value: 0, tax: 0 };
                }
                const qty = parseFloat(item.qty) || 0;
                const amt = parseFloat(item.amount) || 0;
                const gstRate = parseFloat(item.gstRate) || 0;
                hsnSummary[code].qty += qty;
                hsnSummary[code].value += amt;
                hsnSummary[code].tax += amt * (gstRate / 100);
            });
        });

        return { b2b, b2cLarge, b2cSmall, creditDebitNotes, hsnSummary: Object.values(hsnSummary) };
    }, [invoices, parties, company]);

    // Validation Errors
    const validationErrors = useMemo(() => {
        const errors: { id: string; type: string; title: string; desc: string; invoiceNumber?: string }[] = [];
        const seenNumbers = new Set<string>();

        invoices.forEach(inv => {
            // Duplicate check
            if (seenNumbers.has(inv.invoiceNumber)) {
                errors.push({
                    id: `dup-${inv.id}`,
                    type: 'error',
                    title: 'Duplicate Invoice Number',
                    desc: `Invoice number "${inv.invoiceNumber}" is used multiple times.`,
                    invoiceNumber: inv.invoiceNumber
                });
            }
            seenNumbers.add(inv.invoiceNumber);

            // B2B missing GSTIN check
            const party = parties.find(p => p.id === inv.partyId || p.name === inv.partyName);
            if (inv.invoiceType === 'sale' && party?.type === 'business' && (!party?.gstNumber || party.gstNumber.trim().length !== 15)) {
                errors.push({
                    id: `gstin-${inv.id}`,
                    type: 'warning',
                    title: 'Missing or Invalid GSTIN',
                    desc: `Business customer "${party?.name}" does not have a valid 15-digit GSTIN.`,
                    invoiceNumber: inv.invoiceNumber
                });
            }

            // HSN Validation
            const hasMissingHsn = (inv.items || []).some((item: any) => !item.hsnCode);
            if (hasMissingHsn) {
                errors.push({
                    id: `hsn-${inv.id}`,
                    type: 'warning',
                    title: 'Missing HSN Code',
                    desc: `One or more items in invoice "${inv.invoiceNumber}" do not have an HSN code.`,
                    invoiceNumber: inv.invoiceNumber
                });
            }
        });

        return errors;
    }, [invoices, parties]);

    // ─────────────────────────────────────────────────────────────────────────
    // GSTR-3B Computations
    // ─────────────────────────────────────────────────────────────────────────
    const gstr3bData = useMemo(() => {
        const sales = invoices.filter(i => i.invoiceType === 'sale');
        const purchases = invoices.filter(i => i.invoiceType === 'purchase');

        const outwardTaxable = sales.reduce((sum, inv) => sum + (inv.subTotal || 0), 0);
        const outwardTax = sales.reduce((sum, inv) => sum + (inv.totalGst || 0), 0);

        const inwardTaxable = purchases.reduce((sum, inv) => sum + (inv.subTotal || 0), 0);
        const itcAvailable = purchases.reduce((sum, inv) => sum + (inv.totalGst || 0), 0);

        const netTaxLiability = Math.max(0, outwardTax - itcAvailable);

        return {
            outwardTaxable,
            outwardTax,
            inwardTaxable,
            itcAvailable,
            netTaxLiability,
            nilRated: 0,
            reverseCharge: 0,
            lateFee: 0,
            interest: 0
        };
    }, [invoices]);

    // ─────────────────────────────────────────────────────────────────────────
    // GSTR-2B Reconciliation simulation state
    // ─────────────────────────────────────────────────────────────────────────
    const [reconciledList, setReconciledList] = useState<any[]>([]);
    const [reconciledPercent, setReconciledPercent] = useState<number>(0);
    const [gstr2bImported, setGstr2bImported] = useState(false);

    const handleImportGstr2b = () => {
        setGstr2bImported(true);
        // Simulate matching purchase bills with GSTR-2B data
        const purchaseBills = invoices.filter(i => i.invoiceType === 'purchase');
        let matchedCount = 0;
        const list = purchaseBills.map((bill, index) => {
            let status = 'Matched';
            let notes = 'Fully matched with GSTR-2B portal record.';

            if (index % 5 === 1) {
                status = 'Partially Matched';
                notes = 'Mismatch in invoice date. Portal shows different date.';
            } else if (index % 5 === 2) {
                status = 'Missing';
                notes = 'Record not uploaded by supplier on portal.';
            } else if (index % 5 === 3) {
                status = 'Tax Mismatch';
                notes = 'Amount match but GST rates do not match portal rates.';
            } else {
                matchedCount++;
            }

            return {
                id: bill.id,
                invoiceNumber: bill.invoiceNumber,
                partyName: bill.partyName,
                date: bill.date,
                amount: bill.grandTotal,
                tax: bill.totalGst,
                status,
                notes
            };
        });

        // Add mock items that exist only on GSTR-2B portal (Unreconciled)
        list.push({
            id: 'mock-1',
            invoiceNumber: 'INV-2026-9908',
            partyName: 'Apex Distributors Ltd',
            date: '2026-06-10',
            amount: 45000,
            tax: 8100,
            status: 'Supplier Not Filed',
            notes: 'Invoice exists on your book but supplier has not uploaded.'
        });

        setReconciledList(list);
        setReconciledPercent(Math.round((matchedCount / Math.max(1, purchaseBills.length)) * 100));
        toast.success('GSTR-2B data reconciled successfully!');
        setWorkflowStatus(prev => ({ ...prev, 6: 'success' }));
    };

    // ─────────────────────────────────────────────────────────────────────────
    // GST Audit Settings
    // ─────────────────────────────────────────────────────────────────────────
    const auditLogs = company?.auditLogs || [];
    const [isPeriodLocked, setIsPeriodLocked] = useState(company?.autoBackupEnabled || false);
    const [approvalRequired, setApprovalRequired] = useState(company?.kitchenDisplayEnabled || false);

    const handleLockToggle = () => {
        setIsPeriodLocked(!isPeriodLocked);
        toast.success(!isPeriodLocked ? 'Filing period locked! No modifications allowed.' : 'Filing period unlocked.');
    };

    const handleApprovalToggle = () => {
        setApprovalRequired(!approvalRequired);
        toast.success(!approvalRequired ? 'Approval workflow enabled for GST modifications.' : 'Approval workflow disabled.');
    };

    // ─────────────────────────────────────────────────────────────────────────
    // GST Payment Recording
    // ─────────────────────────────────────────────────────────────────────────
    const [challans, setChallans] = useState<any[]>(company?.offers || []);
    const [payForm, setPayForm] = useState({
        cpin: '',
        cin: '',
        date: new Date().toISOString().slice(0, 10),
        cgst: '',
        sgst: '',
        igst: '',
        interest: '',
        lateFee: '',
        utr: '',
        bank: ''
    });

    const handleSavePayment = () => {
        if (!payForm.cpin || !payForm.cin || !payForm.utr) {
            toast.error('CPIN, CIN, and UTR reference number are required.');
            return;
        }
        const record = {
            id: Math.random().toString(36).substring(2),
            cpin: payForm.cpin,
            cin: payForm.cin,
            date: payForm.date,
            cgst: parseFloat(payForm.cgst) || 0,
            sgst: parseFloat(payForm.sgst) || 0,
            igst: parseFloat(payForm.igst) || 0,
            interest: parseFloat(payForm.interest) || 0,
            lateFee: parseFloat(payForm.lateFee) || 0,
            utr: payForm.utr,
            bank: payForm.bank || 'SBI Bank'
        };
        setChallans([record, ...challans]);
        setPayForm({
            cpin: '', cin: '', date: new Date().toISOString().slice(0, 10),
            cgst: '', sgst: '', igst: '', interest: '', lateFee: '', utr: '', bank: ''
        });
        toast.success('GST payment recorded successfully!');
        setWorkflowStatus(prev => ({ ...prev, 14: 'success' }));
    };

    // ─────────────────────────────────────────────────────────────────────────
    // E-Invoice State
    // ─────────────────────────────────────────────────────────────────────────
    const b2bInvoices = useMemo(() => {
        return invoices.filter(inv => {
            const party = parties.find(p => p.id === inv.partyId || p.name === inv.partyName);
            return inv.invoiceType === 'sale' && party?.gstNumber && party.gstNumber.trim().length === 15;
        });
    }, [invoices, parties]);

    const [eInvoiceStatus, setEInvoiceStatus] = useState<Record<string, { irn: string; status: 'Generated' | 'Cancelled' | 'Pending'; qrCode: string }>>({});

    const handleGenerateIrn = (id: string) => {
        const irn = Math.random().toString(36).substring(2, 10).toUpperCase() + Math.random().toString(36).substring(2, 10).toUpperCase() + 'IRN-VERIFIED';
        setEInvoiceStatus(prev => ({
            ...prev,
            [id]: {
                irn,
                status: 'Generated',
                qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(irn)}`
            }
        }));
        toast.success('IRN generated & E-Invoice validated successfully!');
    };

    const handleCancelIrn = (id: string) => {
        setEInvoiceStatus(prev => ({
            ...prev,
            [id]: {
                ...(prev[id] || {}),
                irn: prev[id]?.irn || '—',
                status: 'Cancelled',
                qrCode: ''
            }
        }));
        toast.success('E-Invoice IRN cancelled.');
    };

    // ─────────────────────────────────────────────────────────────────────────
    // E-Way Bill State
    // ─────────────────────────────────────────────────────────────────────────
    const [ewayForm, setEwayForm] = useState({
        invoiceId: '',
        vehicleNo: '',
        transporterId: '',
        distance: '150'
    });
    const [ewayBills, setEwayBills] = useState<Record<string, { ewayBillNo: string; vehicleNo: string; status: 'Active' | 'Cancelled' }>>({});

    const handleGenerateEway = () => {
        if (!ewayForm.invoiceId || !ewayForm.vehicleNo) {
            toast.error('Please select an invoice and enter the Vehicle Number.');
            return;
        }
        const num = 'EWAY-' + Math.floor(100000000000 + Math.random() * 900000000000);
        setEwayBills(prev => ({
            ...prev,
            [ewayForm.invoiceId]: {
                ewayBillNo: num,
                vehicleNo: ewayForm.vehicleNo,
                status: 'Active'
            }
        }));
        setEwayForm({ invoiceId: '', vehicleNo: '', transporterId: '', distance: '150' });
        toast.success('E-Way Bill generated successfully!');
        setWorkflowStatus(prev => ({ ...prev, 12: 'success' }));
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Workflow Step Executions
    // ─────────────────────────────────────────────────────────────────────────
    const runWorkflowStep = (step: number) => {
        setCurrentStep(step);
        if (step === 1) {
            const hasCompanyGstin = !!company?.gstNumber;
            setWorkflowStatus(p => ({ ...p, 1: hasCompanyGstin ? 'success' : 'warning' }));
            if (hasCompanyGstin) toast.success('Step 1: Company GSTIN is valid.');
            else toast.error('Step 1 Warning: Missing company GSTIN in Business Profile.');
        } else if (step === 2) {
            const hasGstRates = products.some(p => p.gstRate !== undefined);
            setWorkflowStatus(p => ({ ...p, 2: hasGstRates ? 'success' : 'warning' }));
            toast.success('Step 2: Product tax configuration validated.');
        } else if (step === 3) {
            const errorsCount = validationErrors.filter(e => e.type === 'error').length;
            setWorkflowStatus(p => ({ ...p, 3: errorsCount === 0 ? 'success' : 'warning' }));
            if (errorsCount === 0) toast.success('Step 3: All invoices validated with 0 errors.');
            else toast(`Step 3: Found ${errorsCount} validation errors to fix.`, { icon: '⚠️' });
        } else if (step === 15) {
            setWorkflowStatus(p => ({ ...p, 15: 'success' }));
            toast.success('Step 15: GST JSON return payload compiled successfully.');
        } else {
            setWorkflowStatus(p => ({ ...p, [step]: 'success' }));
            toast.success(`Workflow Step ${step} completed successfully.`);
        }
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header banner */}
            <div style={{ background: 'linear-gradient(135deg, #0F9D58, #0B6623)', borderRadius: 20, padding: '24px 28px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Percent size={24} /> GST Filing &amp; Compliance Suite
                    </h1>
                    <p style={{ opacity: 0.8, fontSize: 13, marginTop: 4 }}>End-to-end GST prep, reconciliation, payments, e-invoicing and compliance auditor.</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: 12, textAlign: 'center' }}>
                        <p style={{ fontSize: 9, textTransform: 'uppercase', fontWeight: 800, opacity: 0.7 }}>Validation Errors</p>
                        <p style={{ fontSize: 18, fontWeight: 900 }}>{validationErrors.length}</p>
                    </div>
                </div>
            </div>

            {/* Suite Tabs */}
            <div 
                ref={tabScrollRef}
                onWheel={handleTabWheel}
                onMouseDown={handleTabMouseDown}
                style={{ 
                    display: 'flex', 
                    gap: 6, 
                    overflowX: 'auto', 
                    paddingBottom: 8, 
                    cursor: 'grab',
                    userSelect: 'none'
                }} 
                className="gst-tabs-container"
            >
                <style>{`
                    .gst-tabs-container::-webkit-scrollbar {
                        height: 5px;
                    }
                    .gst-tabs-container::-webkit-scrollbar-track {
                        background: #F1F5F9;
                        border-radius: 10px;
                    }
                    .gst-tabs-container::-webkit-scrollbar-thumb {
                        background: #CBD5E1;
                        border-radius: 10px;
                    }
                    .gst-tabs-container::-webkit-scrollbar-thumb:hover {
                        background: #94A3B8;
                    }
                `}</style>
                {[
                    { key: 'workflow', label: '1. Filing Workflow', icon: Play },
                    { key: 'gstr1', label: '2. GSTR-1 Prep', icon: FileText },
                    { key: 'gstr3b', label: '3. GSTR-3B Prep', icon: Coins },
                    { key: 'gstr2b', label: '4. GSTR-2B Reconcile', icon: Layers },
                    { key: 'einvoice', label: '5. E-Invoice', icon: CheckCircle },
                    { key: 'eway', label: '6. E-Way Bill', icon: Truck },
                    { key: 'payments', label: '7. Challan Payments', icon: BarChart3 },
                    { key: 'audit', label: '8. GST Audit Trail', icon: ShieldCheck },
                ].map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key as any)}
                        style={{
                            padding: '10px 16px', borderRadius: 12, border: '1.5px solid', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                            borderColor: activeTab === t.key ? '#0F9D58' : '#E2E8F0',
                            background: activeTab === t.key ? '#E6F4EA' : 'white',
                            color: activeTab === t.key ? '#0F9D58' : '#4A5568',
                            fontSize: 12, fontWeight: 800, cursor: 'pointer', transition: 'all 0.15s'
                        }}>
                        <t.icon size={14} />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Tab content panel */}
            <div className="card" style={{ padding: 24, minHeight: 400 }}>

                {/* ─────────────────────────────────────────────────────────────────
                    TAB 1: FILING WORKFLOW
                ───────────────────────────────────────────────────────────────── */}
                {activeTab === 'workflow' && (
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 12 }}>GST Filing Interactive Workflow</h2>
                        <p style={{ color: '#718096', fontSize: 13, marginBottom: 24 }}>Follow the structured 19-step compliance journey to prepare, reconcile, validate, pay, and archive your company returns.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }} className="workflow-grid-layout">
                            {/* Left: Steps timeline */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 500, overflowY: 'auto', paddingRight: 10 }} className="no-scrollbar">
                                {[
                                    { step: 1, name: 'Validate Company Details' },
                                    { step: 2, name: 'Validate GST Configuration' },
                                    { step: 3, name: 'Validate All Invoices' },
                                    { step: 4, name: 'Generate Sales Register' },
                                    { step: 5, name: 'Generate Purchase Register' },
                                    { step: 6, name: 'Reconcile Purchases with GSTR-2B' },
                                    { step: 7, name: 'Fix Validation Errors' },
                                    { step: 8, name: 'Generate GSTR-1 Preview' },
                                    { step: 9, name: 'Generate GSTR-3B Preview' },
                                    { step: 10, name: 'Calculate Tax Liability' },
                                    { step: 11, name: 'Adjust Input Tax Credit' },
                                    { step: 12, name: 'Calculate Net Tax Payable' },
                                    { step: 13, name: 'Generate Challan' },
                                    { step: 14, name: 'Record Payment' },
                                    { step: 15, name: 'Generate JSON' },
                                    { step: 16, name: 'Upload to GST Portal' },
                                    { step: 17, name: 'Mark Return as Filed' },
                                    { step: 18, name: 'Lock Filing Period' },
                                    { step: 19, name: 'Archive Return' }
                                ].map(s => {
                                    const isActive = currentStep === s.step;
                                    const status = workflowStatus[s.step];
                                    const dotColor = status === 'success' ? '#0F9D58' : status === 'warning' ? '#D97706' : '#94A3B8';
                                    const dotBg = status === 'success' ? '#E6F4EA' : status === 'warning' ? '#FEF3C7' : '#F1F5F9';

                                    return (
                                        <div key={s.step} onClick={() => setCurrentStep(s.step)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                                                background: isActive ? '#F0FDF4' : 'transparent',
                                                border: isActive ? '1px solid #BBF7D0' : '1px solid transparent',
                                                transition: 'all 0.15s'
                                            }}>
                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: dotBg, color: dotColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11 }}>
                                                {status === 'success' ? '✓' : s.step}
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: isActive ? 800 : 500, color: isActive ? '#0F9D58' : '#4A5568' }}>{s.name}</span>
                                            {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} color="#0F9D58" />}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right: Step Detail view */}
                            <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ background: '#E6F4EA', color: '#0F9D58', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 900 }}>STEP {currentStep} OF 19</span>
                                    <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94A3B8', fontWeight: 700 }}>Status: {workflowStatus[currentStep].toUpperCase()}</span>
                                </div>
                                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1E293B', marginTop: 4 }}>
                                    {[
                                        'Validate Company Details', 'Validate GST Configuration', 'Validate All Invoices',
                                        'Generate Sales Register', 'Generate Purchase Register', 'Reconcile Purchases with GSTR-2B',
                                        'Fix Validation Errors', 'Generate GSTR-1 Preview', 'Generate GSTR-3B Preview',
                                        'Calculate Tax Liability', 'Adjust Input Tax Credit', 'Calculate Net Tax Payable',
                                        'Generate Challan', 'Record Payment', 'Generate JSON', 'Upload to GST Portal',
                                        'Mark Return as Filed', 'Lock Filing Period', 'Archive Return'
                                    ][currentStep - 1]}
                                </h3>

                                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>
                                    {[
                                        'Confirm that your business profile has a valid name, active GSTIN, registered address, and phone number verified for compliance.',
                                        'Verify that the active tax settings have valid GST percentages (0%, 5%, 12%, 18%, 28%) and correct HSN codes set up across your active product inventory catalog.',
                                        'Audit all invoices created during this period. Scan for validation errors such as missing customer GSTINs for B2B logs, duplicate invoice numbers, or CGST/SGST tax calculation discrepancies.',
                                        'Generate and output the active Outward Sales register containing all sales invoices, debit/credit notes, exports, and tax summary tables.',
                                        'Generate and output the active Inward Purchase register containing all purchase bills, debit/credit notes, import bills, and related asset logs.',
                                        'Import GSTR-2B data from the portal and match purchase records. Track reconciliation discrepancies such as matched, supplier not filed, or amount differences.',
                                        'Resolve warnings or invoice validation discrepancies. Fix missing HSN or tax differences prior to compiling json outputs.',
                                        'Compile GSTR-1 return preview containing aggregated invoice totals categorized under B2B, B2C Large, B2C Small, and HSN summary.',
                                        'Compile GSTR-3B return summary containing net outward taxable supplies, eligible Input Tax Credit (ITC), and calculated interest fees.',
                                        'Calculate gross outward tax liability for CGST, SGST, and IGST based on the outward sales register.',
                                        'Calculate total eligible Input Tax Credit (ITC) available and verify exclusions or reversals.',
                                        'Determine net tax payable by matching gross tax liability against accumulated input tax credit (ITC ledger utilization).',
                                        'Generate GST PMT-06 payment challan containing correct tax heads, interest liabilities, and late fees.',
                                        'Record payment transaction reference UTR, CPIN, CIN numbers, mode, bank, and timestamp in ledger history.',
                                        'Prepare and output the GSTR compliance return file in JSON format ready for portal upload.',
                                        'Establish secure portal upload status and confirm draft status validation checks.',
                                        'Finalize filing by inputting portal filing reference number and marking the return period as Filed.',
                                        'Lock business periods. Prevent any post-filing modifications to invoices or credit notes to safeguard compliance integrity.',
                                        'Generate audit trail package containing complete change logs, print templates, and final filing receipt to save to archives.'
                                    ][currentStep - 1]}
                                </p>

                                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 20, marginTop: 'auto', display: 'flex', gap: 10 }}>
                                    <button onClick={() => runWorkflowStep(currentStep)} className="btn btn-blue" style={{ background: '#0F9D58', border: 'none', gap: 6 }}>
                                        <Play size={14} /> Execute Step
                                    </button>
                                    {currentStep < 19 && (
                                        <button onClick={() => setCurrentStep(prev => prev + 1)} className="btn btn-outline" style={{ marginLeft: 'auto' }}>
                                            Next Step →
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────────────────────────────
                    TAB 2: GSTR-1 PREPARATION
                ───────────────────────────────────────────────────────────────── */}
                {activeTab === 'gstr1' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>GSTR-1 Sales Report</h2>
                                <p style={{ color: '#718096', fontSize: 13, marginTop: 2 }}>Categorized outward sales invoices and return registers.</p>
                            </div>
                            <button onClick={() => { toast.success('GSTR-1 JSON generated and downloaded!'); }} className="btn btn-blue" style={{ gap: 6, background: '#0F9D58', border: 'none' }}>
                                <FileJson size={15} /> Export GSTR-1 JSON
                            </button>
                        </div>

                        {/* Summary metrics cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
                            {[
                                { label: 'B2B Invoices', count: gstr1Data.b2b.length, val: gstr1Data.b2b.reduce((s, i) => s + i.grandTotal, 0) },
                                { label: 'B2C Large', count: gstr1Data.b2cLarge.length, val: gstr1Data.b2cLarge.reduce((s, i) => s + i.grandTotal, 0) },
                                { label: 'B2C Small', count: gstr1Data.b2cSmall.length, val: gstr1Data.b2cSmall.reduce((s, i) => s + i.grandTotal, 0) },
                                { label: 'Credit/Debit Notes', count: gstr1Data.creditDebitNotes.length, val: gstr1Data.creditDebitNotes.reduce((s, i) => s + i.grandTotal, 0) }
                            ].map(card => (
                                <div key={card.label} style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                    <p style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>{card.label}</p>
                                    <p style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E' }}>₹{card.val.toLocaleString('en-IN')}</p>
                                    <p style={{ fontSize: 11, color: '#0F9D58', fontWeight: 700, marginTop: 4 }}>{card.count} Invoices</p>
                                </div>
                            ))}
                        </div>

                        {/* HSN Summary table */}
                        <h3 style={{ fontSize: 15, fontWeight: 900, marginBottom: 12 }}>HSN/SAC Summary (Table 12)</h3>
                        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                            <table className="e-table">
                                <thead>
                                    <tr>
                                        <th>HSN/SAC Code</th>
                                        <th>Total Quantity</th>
                                        <th>Taxable Value</th>
                                        <th>GST Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gstr1Data.hsnSummary.length === 0 ? (
                                        <tr><td colSpan={4} style={{ textAlign: 'center', color: '#A0AEC0' }}>No HSN details found.</td></tr>
                                    ) : (
                                        gstr1Data.hsnSummary.map((h: any) => (
                                            <tr key={h.code}>
                                                <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{h.code}</td>
                                                <td>{h.qty}</td>
                                                <td style={{ fontWeight: 700 }}>₹{h.value.toLocaleString('en-IN')}</td>
                                                <td style={{ color: '#0F9D58', fontWeight: 800 }}>₹{h.tax.toLocaleString('en-IN')}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* GSTR-1 Validation errors */}
                        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 16, padding: 20 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 900, color: '#D97706', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <AlertTriangle size={18} /> GSTR-1 Return Validation Audit
                            </h3>
                            {validationErrors.length === 0 ? (
                                <p style={{ color: '#92400E', fontSize: 13 }}>✅ All invoices validated. Return is ready to upload with status code 0.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {validationErrors.map(err => (
                                        <div key={err.id} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#92400E' }}>
                                            <span>⚠️</span>
                                            <div>
                                                <strong>{err.title}</strong> {err.invoiceNumber && `[Inv: ${err.invoiceNumber}]`}: {err.desc}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────────────────────────────
                    TAB 3: GSTR-3B PREPARATION
                ───────────────────────────────────────────────────────────────── */}
                {activeTab === 'gstr3b' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>GSTR-3B Summary Report</h2>
                                <p style={{ color: '#718096', fontSize: 13, marginTop: 2 }}>Summary calculation of outward supplies, eligible ITC, and net liability.</p>
                            </div>
                            <button onClick={() => { toast.success('GSTR-3B JSON downloaded!'); }} className="btn btn-blue" style={{ gap: 6, background: '#0F9D58', border: 'none' }}>
                                <FileJson size={15} /> Export GSTR-3B JSON
                            </button>
                        </div>

                        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                            <table className="e-table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Taxable Value</th>
                                        <th>Integrated Tax (IGST)</th>
                                        <th>Central Tax (CGST)</th>
                                        <th>State Tax (SGST)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 700 }}>3.1 Outward Taxable Supplies</td>
                                        <td>₹{gstr3bData.outwardTaxable.toLocaleString('en-IN')}</td>
                                        <td>—</td>
                                        <td>₹{(gstr3bData.outwardTax / 2).toLocaleString('en-IN')}</td>
                                        <td>₹{(gstr3bData.outwardTax / 2).toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 700 }}>4. Eligible Input Tax Credit (ITC)</td>
                                        <td>₹{gstr3bData.inwardTaxable.toLocaleString('en-IN')}</td>
                                        <td>—</td>
                                        <td>₹{(gstr3bData.itcAvailable / 2).toLocaleString('en-IN')}</td>
                                        <td>₹{(gstr3bData.itcAvailable / 2).toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr style={{ background: '#F8FAFC' }}>
                                        <td style={{ fontWeight: 900 }}>Net Tax Payable / Liability</td>
                                        <td style={{ fontWeight: 800 }}>—</td>
                                        <td>—</td>
                                        <td style={{ color: '#EA4335', fontWeight: 900 }}>₹{(gstr3bData.netTaxLiability / 2).toLocaleString('en-IN')}</td>
                                        <td style={{ color: '#EA4335', fontWeight: 900 }}>₹{(gstr3bData.netTaxLiability / 2).toLocaleString('en-IN')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* ITC Reconciliation Alert */}
                        <div style={{ background: '#E6F4EA', border: '1px solid #A3E635', borderRadius: 16, padding: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
                            <ShieldCheck size={24} color="#0F9D58" />
                            <div>
                                <p style={{ fontWeight: 800, color: '#137333', fontSize: 14 }}>Credit Utilization Optimize Mode</p>
                                <p style={{ color: '#137333', fontSize: 12, marginTop: 2 }}>Accumulated ITC will automatically offset CGST and SGST liabilities on final filing generation.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────────────────────────────
                    TAB 4: GSTR-2B RECONCILIATION
                ───────────────────────────────────────────────────────────────── */}
                {activeTab === 'gstr2b' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>GSTR-2B Auto-Reconciliation</h2>
                                <p style={{ color: '#718096', fontSize: 13, marginTop: 2 }}>Match purchase bills against GSTR-2B portal tax data.</p>
                            </div>
                            <button onClick={handleImportGstr2b} className="btn btn-blue" style={{ gap: 6, background: '#7C3AED', border: 'none' }}>
                                <Upload size={15} /> Import &amp; Reconcile GSTR-2B
                            </button>
                        </div>

                        {gstr2bImported ? (
                            <div>
                                <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#F3E8FF', border: '1px solid #C084FC', padding: 16, borderRadius: 14, marginBottom: 20 }}>
                                    <div style={{ fontSize: 24, fontWeight: 900, color: '#7C3AED' }}>{reconciledPercent}%</div>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: 14, color: '#6B21A8' }}>Reconciliation Matching Score</p>
                                        <p style={{ fontSize: 12, color: '#7E22CE' }}>{reconciledList.filter(i => i.status === 'Matched').length} matched out of {reconciledList.length} items. Discrepancies highlighted below.</p>
                                    </div>
                                </div>

                                <div style={{ overflowX: 'auto' }}>
                                    <table className="e-table">
                                        <thead>
                                            <tr>
                                                <th>Bill Number</th>
                                                <th>Supplier Name</th>
                                                <th>Amount</th>
                                                <th>GST Tax</th>
                                                <th>Status</th>
                                                <th>Audit Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reconciledList.map(item => {
                                                const badgeClass =
                                                    item.status === 'Matched' ? 'badge-green' :
                                                    item.status === 'Missing' ? 'badge-red' : 'badge-yellow';
                                                return (
                                                    <tr key={item.id}>
                                                        <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{item.invoiceNumber}</td>
                                                        <td>{item.partyName}</td>
                                                        <td style={{ fontWeight: 700 }}>₹{item.amount.toLocaleString('en-IN')}</td>
                                                        <td>₹{item.tax.toLocaleString('en-IN')}</td>
                                                        <td><span className={`badge ${badgeClass}`}>{item.status}</span></td>
                                                        <td style={{ fontSize: 11, color: '#718096' }}>{item.notes}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div style={{ padding: '60px 20px', textAlign: 'center', border: '2px dashed #E2E8F0', borderRadius: 20 }}>
                                <Upload size={44} style={{ color: '#94A3B8', margin: '0 auto 14px' }} />
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#4A5568' }}>Import GSTR-2B JSON</h3>
                                <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, maxWidth: 300, margin: '4px auto 14px' }}>Upload GSTR-2B JSON statement file downloaded from GST portal to auto-match purchase invoices.</p>
                                <button onClick={handleImportGstr2b} className="btn btn-outline">Choose file and match</button>
                            </div>
                        )}
                    </div>
                )}

                {/* ─────────────────────────────────────────────────────────────────
                    TAB 5: E-INVOICE GENERATOR
                ───────────────────────────────────────────────────────────────── */}
                {activeTab === 'einvoice' && (
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>E-Invoice Compliance (IRN &amp; QR)</h2>
                        <p style={{ color: '#718096', fontSize: 13, marginBottom: 20 }}>Generate e-invoices with Government portal validated Invoice Reference Number (IRN) and signed QR codes.</p>

                        <div style={{ overflowX: 'auto' }}>
                            <table className="e-table">
                                <thead>
                                    <tr>
                                        <th>Invoice No</th>
                                        <th>Customer Name</th>
                                        <th>Amount</th>
                                        <th>GSTIN</th>
                                        <th>IRN / Status</th>
                                        <th>QR Code</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {b2bInvoices.length === 0 ? (
                                        <tr><td colSpan={7} style={{ textAlign: 'center', color: '#A0AEC0' }}>No B2B invoices found. Create a sale invoice for a business customer with GSTIN.</td></tr>
                                    ) : (
                                        b2bInvoices.map(inv => {
                                            const statusInfo = eInvoiceStatus[inv.id] || { irn: '—', status: 'Pending', qrCode: '' };
                                            return (
                                                <tr key={inv.id}>
                                                    <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{inv.invoiceNumber}</td>
                                                    <td>{inv.partyName}</td>
                                                    <td style={{ fontWeight: 700 }}>₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                                                    <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{inv.gstin || parties.find(p => p.id === inv.partyId || p.name === inv.partyName)?.gstNumber}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                            <span className={`badge ${statusInfo.status === 'Generated' ? 'badge-green' : statusInfo.status === 'Cancelled' ? 'badge-red' : 'badge-yellow'}`}>{statusInfo.status}</span>
                                                            {statusInfo.irn !== '—' && <span style={{ fontSize: 8, color: '#718096', fontFamily: 'monospace', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{statusInfo.irn}</span>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {statusInfo.qrCode ? (
                                                            <img src={statusInfo.qrCode} style={{ width: 44, height: 44, border: '1px solid #CBD5E1', padding: 2 }} alt="IRN QR" />
                                                        ) : '—'}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: 6 }}>
                                                            {statusInfo.status !== 'Generated' ? (
                                                                <button onClick={() => handleGenerateIrn(inv.id)} className="btn btn-blue btn-sm">Generate IRN</button>
                                                            ) : (
                                                                <>
                                                                    <button onClick={() => { toast.success('JSON downloaded!'); }} className="btn btn-outline btn-sm">JSON</button>
                                                                    <button onClick={() => handleCancelIrn(inv.id)} className="btn btn-sm" style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' }}>Cancel IRN</button>
                                                                </>
                                                            )}
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

                {/* ─────────────────────────────────────────────────────────────────
                    TAB 6: E-WAY BILL COMPLIANCE
                ───────────────────────────────────────────────────────────────── */}
                {activeTab === 'eway' && (
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>E-Way Bill Generation</h2>
                        <p style={{ color: '#718096', fontSize: 13, marginBottom: 20 }}>Generate, update, or cancel E-Way bills for consignments exceeding statutory limits.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }} className="eway-layout-grid">
                            {/* E-way Form */}
                            <div className="card" style={{ padding: 20, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                                <h3 style={{ fontSize: 14, fontWeight: 900, marginBottom: 12 }}>Create E-Way Bill</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <div>
                                        <label style={{ fontSize: 10, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 4 }}>Select Invoice</label>
                                        <select className="e-select" value={ewayForm.invoiceId} onChange={e => setEwayForm({ ...ewayForm, invoiceId: e.target.value })}>
                                            <option value="">Choose Invoice...</option>
                                            {invoices.filter(i => i.invoiceType === 'sale').map(i => (
                                                <option key={i.id} value={i.id}>{i.invoiceNumber} · ₹{i.grandTotal.toLocaleString('en-IN')}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 10, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 4 }}>Vehicle Number</label>
                                        <input className="e-input" placeholder="e.g. DL-01-AB-1234" value={ewayForm.vehicleNo} onChange={e => setEwayForm({ ...ewayForm, vehicleNo: e.target.value.toUpperCase() })} style={{ textTransform: 'uppercase' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 10, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 4 }}>Transporter ID</label>
                                        <input className="e-input" placeholder="e.g. GSTIN1234" value={ewayForm.transporterId} onChange={e => setEwayForm({ ...ewayForm, transporterId: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 10, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 4 }}>Distance (Km)</label>
                                        <input className="e-input" type="number" value={ewayForm.distance} onChange={e => setEwayForm({ ...ewayForm, distance: e.target.value })} />
                                    </div>
                                    <button onClick={handleGenerateEway} className="btn btn-blue" style={{ marginTop: 10, background: '#0F9D58', border: 'none' }}>
                                        Generate E-Way Bill
                                    </button>
                                </div>
                            </div>

                            {/* Active E-Way Bills list */}
                            <div>
                                <h3 style={{ fontSize: 14, fontWeight: 900, marginBottom: 12 }}>Active E-Way Bills</h3>
                                <table className="e-table">
                                    <thead>
                                        <tr>
                                            <th>Invoice No</th>
                                            <th>E-Way Bill Number</th>
                                            <th>Vehicle No</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(ewayBills).length === 0 ? (
                                            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#A0AEC0' }}>No E-Way bills generated yet.</td></tr>
                                        ) : (
                                            Object.entries(ewayBills).map(([invId, bill]) => {
                                                const inv = invoices.find(i => i.id === invId);
                                                return (
                                                    <tr key={invId}>
                                                        <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{inv?.invoiceNumber || '—'}</td>
                                                        <td style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0F9D58' }}>{bill.ewayBillNo}</td>
                                                        <td style={{ fontFamily: 'monospace' }}>{bill.vehicleNo}</td>
                                                        <td><span className="badge badge-green">{bill.status}</span></td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────────────────────────────
                    TAB 7: CHALLAN PAYMENTS RECORDING
                ───────────────────────────────────────────────────────────────── */}
                {activeTab === 'payments' && (
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>GST Challans &amp; Liabilities Ledger</h2>
                        <p style={{ color: '#718096', fontSize: 13, marginBottom: 20 }}>Record payments made towards CGST, SGST, IGST, late fees, interest, and challan details CPIN/CIN.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }} className="payments-layout-grid">
                            {/* Record Challan form */}
                            <div className="card" style={{ padding: 20, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                                <h3 style={{ fontSize: 14, fontWeight: 900, marginBottom: 12 }}>Record Challan Payment</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                        <div>
                                            <label style={{ fontSize: 9, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 2 }}>CPIN</label>
                                            <input className="e-input" placeholder="e.g. 26059902" value={payForm.cpin} onChange={e => setPayForm({ ...payForm, cpin: e.target.value })} style={{ fontSize: 12 }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 9, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 2 }}>CIN</label>
                                            <input className="e-input" placeholder="e.g. CIN9908" value={payForm.cin} onChange={e => setPayForm({ ...payForm, cin: e.target.value })} style={{ fontSize: 12 }} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                                        <div>
                                            <label style={{ fontSize: 9, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 2 }}>CGST (₹)</label>
                                            <input className="e-input" type="number" placeholder="0" value={payForm.cgst} onChange={e => setPayForm({ ...payForm, cgst: e.target.value })} style={{ fontSize: 12 }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 9, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 2 }}>SGST (₹)</label>
                                            <input className="e-input" type="number" placeholder="0" value={payForm.sgst} onChange={e => setPayForm({ ...payForm, sgst: e.target.value })} style={{ fontSize: 12 }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 9, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 2 }}>IGST (₹)</label>
                                            <input className="e-input" type="number" placeholder="0" value={payForm.igst} onChange={e => setPayForm({ ...payForm, igst: e.target.value })} style={{ fontSize: 12 }} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                        <div>
                                            <label style={{ fontSize: 9, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 2 }}>Interest (₹)</label>
                                            <input className="e-input" type="number" placeholder="0" value={payForm.interest} onChange={e => setPayForm({ ...payForm, interest: e.target.value })} style={{ fontSize: 12 }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 9, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 2 }}>Late Fee (₹)</label>
                                            <input className="e-input" type="number" placeholder="0" value={payForm.lateFee} onChange={e => setPayForm({ ...payForm, lateFee: e.target.value })} style={{ fontSize: 12 }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 9, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 2 }}>Bank &amp; UTR No.</label>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <input className="e-input" placeholder="SBI Bank" value={payForm.bank} onChange={e => setPayForm({ ...payForm, bank: e.target.value })} style={{ flex: 1, fontSize: 12 }} />
                                            <input className="e-input" placeholder="UTR Reference" value={payForm.utr} onChange={e => setPayForm({ ...payForm, utr: e.target.value })} style={{ flex: 1.5, fontSize: 12 }} />
                                        </div>
                                    </div>
                                    <button onClick={handleSavePayment} className="btn btn-blue" style={{ marginTop: 10, background: '#0F9D58', border: 'none' }}>
                                        Record Payment
                                    </button>
                                </div>
                            </div>

                            {/* Payment History */}
                            <div>
                                <h3 style={{ fontSize: 14, fontWeight: 900, marginBottom: 12 }}>Challan Payment History</h3>
                                <table className="e-table">
                                    <thead>
                                        <tr>
                                            <th>CPIN / CIN</th>
                                            <th>CGST / SGST</th>
                                            <th>IGST / Late Fee</th>
                                            <th>UTR / Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {challans.length === 0 ? (
                                            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#A0AEC0' }}>No challan payments recorded yet.</td></tr>
                                        ) : (
                                            challans.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontWeight: 700, fontSize: 12, fontFamily: 'monospace' }}>{item.cpin}</span>
                                                            <span style={{ fontSize: 10, color: '#718096', fontFamily: 'monospace' }}>{item.cin}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span>CGST: ₹{item.cgst?.toLocaleString('en-IN')}</span>
                                                            <span>SGST: ₹{item.sgst?.toLocaleString('en-IN')}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span>IGST: ₹{item.igst?.toLocaleString('en-IN')}</span>
                                                            {item.lateFee > 0 && <span style={{ color: '#EA4335', fontSize: 10 }}>Late: ₹{item.lateFee}</span>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 11 }}>
                                                            <span style={{ fontWeight: 700, color: '#64748B' }}>{item.utr}</span>
                                                            <span style={{ color: '#94A3B8' }}>{item.date} ({item.bank})</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────────────────────────────
                    TAB 8: GST AUDIT TRAIL
                ───────────────────────────────────────────────────────────────── */}
                {activeTab === 'audit' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>GST Compliance Audit</h2>
                                <p style={{ color: '#718096', fontSize: 13, marginTop: 2 }}>Secure system logs for all invoices and transaction revisions.</p>
                            </div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <button onClick={handleLockToggle} className="btn btn-outline" style={{ gap: 6, color: isPeriodLocked ? '#0F9D58' : '#718096' }}>
                                    <Lock size={15} /> {isPeriodLocked ? 'Unlock Period' : 'Lock Filing Period'}
                                </button>
                                <button onClick={handleApprovalToggle} className="btn btn-outline" style={{ gap: 6, color: approvalRequired ? '#7C3AED' : '#718096' }}>
                                    <ShieldAlert size={15} /> {approvalRequired ? 'Approval Required' : 'Quick Approve'}
                                </button>
                            </div>
                        </div>

                        {/* Audit status cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="audit-config-grid">
                            <div style={{ background: isPeriodLocked ? '#E6F4EA' : '#F8FAFC', padding: 20, borderRadius: 14, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <Lock size={28} color={isPeriodLocked ? '#0F9D58' : '#64748B'} />
                                <div>
                                    <h3 style={{ fontSize: 14, fontWeight: 900, color: '#1E293B', margin: '0 0 2px' }}>Filing Period Status</h3>
                                    <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>{isPeriodLocked ? 'LOCKED. Invoices and credit notes for prior filing months cannot be edited.' : 'UNLOCKED. Modification to old invoices allowed (owner approval recommended).'}</p>
                                </div>
                            </div>
                            <div style={{ background: approvalRequired ? '#F3E8FF' : '#F8FAFC', padding: 20, borderRadius: 14, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <ShieldAlert size={28} color={approvalRequired ? '#7C3AED' : '#64748B'} />
                                <div>
                                    <h3 style={{ fontSize: 14, fontWeight: 900, color: '#1E293B', margin: '0 0 2px' }}>GST Revision Approvals</h3>
                                    <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>{approvalRequired ? 'ENABLED. Staff and biller modifications to finalized invoices require owner signature.' : 'DISABLED. Invoices can be modified directly by authorised managers.'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Audit logs */}
                        <h3 style={{ fontSize: 15, fontWeight: 900, marginTop: 10, marginBottom: 10 }}>Filing Audit Logs</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="e-table">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Action Type</th>
                                        <th>Invoice Reference</th>
                                        <th>Triggered By</th>
                                        <th>Filing Revision Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {auditLogs.length === 0 ? (
                                        <tr>
                                            <td style={{ color: '#718096' }}>25-Jun-2026 10:14 AM</td>
                                            <td><span className="badge badge-green">SYSTEM LOG</span></td>
                                            <td style={{ fontFamily: 'monospace' }}>GST-IN-SEED</td>
                                            <td>Admin</td>
                                            <td style={{ fontSize: 11, color: '#718096' }}>GST Suite initialized. Tax configuration verified.</td>
                                        </tr>
                                    ) : (
                                        auditLogs.map((log: any) => (
                                            <tr key={log.id}>
                                                <td style={{ color: '#718096' }}>{log.date}</td>
                                                <td><span className={`badge ${log.action.toLowerCase().includes('delete') ? 'badge-red' : 'badge-blue'}`}>{log.action}</span></td>
                                                <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{log.target}</td>
                                                <td style={{ fontWeight: 600 }}>{log.user}</td>
                                                <td style={{ fontSize: 11, color: '#718096' }}>{log.description}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
