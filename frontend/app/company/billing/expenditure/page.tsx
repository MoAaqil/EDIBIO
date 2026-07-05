'use client';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore, useCompanyData } from '@/lib/store';
import { ArrowLeft, ScanLine, Tag, TrendingUp, IndianRupee, PieChart, Download, Printer } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExpenditurePage() {
    const router = useRouter();
    const invoices = useCompanyData('invoices') as any[];
    const products = useCompanyData('products') as any[];

    const [barcodeInput, setBarcodeInput] = useState('');
    const [scannedBills, setScannedBills] = useState<any[]>([]);

    // Auto focus the scanner input on load and allow continuous scanning
    useEffect(() => {
        const input = document.getElementById('barcode-scanner');
        if (input) input.focus();
    }, []);

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        const value = barcodeInput.trim();
        if (!value) return;

        // Find invoice by barcode (invoiceNumber)
        const found = invoices.find(inv => inv.invoiceNumber.toLowerCase() === value.toLowerCase() || inv.id === value);
        if (found) {
            if (scannedBills.find(b => b.id === found.id)) {
                toast.error('This bill has already been scanned today.');
            } else {
                setScannedBills([found, ...scannedBills]);
            }
        } else {
            toast.error('Bill not found in the database. Please check the barcode.');
        }
        setBarcodeInput(''); // Clear input for next scan
    };

    const removeBill = (id: string) => {
        setScannedBills(scannedBills.filter(b => b.id !== id));
    };

    // Computations based on scanned bills
    const { totalSales, totalProfit, totalItemsCount, aggregatedProducts } = useMemo(() => {
        let sales = 0;
        let profit = 0;
        let itemCount = 0;
        const prodMap: Record<string, { qty: number, amount: number, type: string }> = {};

        scannedBills.forEach(bill => {
            sales += bill.grandTotal;
            if (bill.invoiceType === 'sale') {
                bill.items.forEach((item: any) => {
                    itemCount += item.qty;

                    // Attempt to calculate profit if purchase price is known from master products list
                    const masterProduct = products.find((p: any) => p.name === item.name || p.barcode === item.barcode);
                    const purchasePrice = masterProduct?.purchasePrice || (item.rate * 0.7); // Fallback: Assume 30% margin if purchase price unknown
                    const itemProfit = item.amount - (purchasePrice * item.qty);
                    profit += itemProfit > 0 ? itemProfit : 0;

                    if (prodMap[item.name]) {
                        prodMap[item.name].qty += item.qty;
                        prodMap[item.name].amount += item.amount;
                    } else {
                        prodMap[item.name] = {
                            qty: item.qty,
                            amount: item.amount,
                            type: masterProduct?.category || 'General Product'
                        };
                    }
                });
            }
        });

        // Convert aggregated products to sorted array
        const aggProductsArray = Object.entries(prodMap)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.qty - a.qty); // Sort by highest quantity sold

        return {
            totalSales: sales,
            totalProfit: profit,
            totalItemsCount: itemCount,
            aggregatedProducts: aggProductsArray
        };
    }, [scannedBills, products]);

    const handleExportCsv = () => {
        if (aggregatedProducts.length === 0) return toast.error('No data to export.');
        const lines = [
            `Expenditure Tally Report`,
            `Total Sales, ₹${totalSales.toFixed(2)}`,
            `Total Units, ${totalItemsCount}`,
            `Estimated Profit, ₹${totalProfit.toFixed(2)}`,
            ``,
            `Product Name,Category,Quantity,Amount Sold`
        ];
        aggregatedProducts.forEach(p => {
            lines.push(`"${p.name}","${p.type}",${p.qty},${p.amount.toFixed(2)}`);
        });
        const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Expenditure_Tally_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePrintPdf = () => {
        if (scannedBills.length === 0) return toast.error('No bills scanned.');
        window.print();
    };

    return (
        <div style={{ minHeight: '100dvh', background: '#F8FAFC', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <div className="exp-header" style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <button onClick={() => router.back()} style={{ border: 'none', background: 'white', padding: 10, borderRadius: 12, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <ArrowLeft size={20} color="#4A5568" />
                    </button>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A202C', margin: 0 }}>Expenditure Tally</h1>
                        <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>Scan barcodes from today's physical bills to tally totals</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }} className="hide-on-print">
                    <button onClick={handleExportCsv} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', fontWeight: 600, color: '#4A5568', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <Download size={16} /> Excel (CSV)
                    </button>
                    <button onClick={handlePrintPdf} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, border: 'none', background: '#4285F4', fontWeight: 600, color: 'white', cursor: 'pointer', boxShadow: '0 4px 12px rgba(66,133,244,0.2)' }}>
                        <Printer size={16} /> Print Report
                    </button>
                </div>

                {/* Scanner Input */}
                <form onSubmit={handleScan} className="exp-search" style={{ position: 'relative', width: 340, maxWidth: '100%' }}>
                    <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                        <ScanLine size={18} color="#4285F4" />
                    </div>
                    <input
                        id="barcode-scanner"
                        autoFocus
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        placeholder="Scan Bill Barcode here..."
                        style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 999, border: '2px solid #E2E8F0', outline: 'none', fontSize: 15, fontWeight: 700, background: 'white', boxShadow: '0 4px 12px rgba(66,133,244,0.1)' }}
                    />
                    <button type="submit" style={{ display: 'none' }}>Scan</button>
                </form>
            </div>

            <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 24, flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* Left Side: Scanned Bills & Aggregated Products */}
                <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 24 }}>

                    {/* Aggregated Products Analysis */}
                    <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <div style={{ background: '#EBF4FF', padding: 8, borderRadius: 8 }}><Tag size={18} color="#4285F4" /></div>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2D3748', margin: 0 }}>Products Sold Tracker</h2>
                        </div>

                        {aggregatedProducts.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
                                <ScanLine size={40} style={{ opacity: 0.2, marginBottom: 12 }} />
                                <p style={{ margin: 0, fontWeight: 600 }}>No products tracked yet.</p>
                                <p style={{ fontSize: 12, margin: '4px 0 0' }}>Scan a bill to see product similarities and breakdown.</p>
                            </div>
                        ) : (
                            <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 8 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
                                        <tr style={{ borderBottom: '2px solid #EDF2F7' }}>
                                            <th style={{ padding: '12px 0', fontSize: 12, color: '#718096', fontWeight: 800 }}>PRODUCT NAME</th>
                                            <th style={{ padding: '12px 0', fontSize: 12, color: '#718096', fontWeight: 800 }}>TYPE/CATEGORY</th>
                                            <th style={{ padding: '12px 0', fontSize: 12, color: '#718096', fontWeight: 800, textAlign: 'center' }}>QTY SOLD</th>
                                            <th style={{ padding: '12px 0', fontSize: 12, color: '#718096', fontWeight: 800, textAlign: 'right' }}>AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {aggregatedProducts.map((prod, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #F7FAFC' }}>
                                                <td style={{ padding: '14px 0', fontWeight: 700, color: '#2D3748' }}>{prod.name}</td>
                                                <td style={{ padding: '14px 0', fontSize: 13, color: '#A0AEC0' }}>{prod.type}</td>
                                                <td style={{ padding: '14px 0', textAlign: 'center' }}>
                                                    <span style={{ background: '#FEEBC8', color: '#DD6B20', padding: '4px 12px', borderRadius: 999, fontWeight: 800, fontSize: 12 }}>{prod.qty} Items</span>
                                                </td>
                                                <td style={{ padding: '14px 0', textAlign: 'right', fontWeight: 800, color: '#1A202C' }}>₹{prod.amount.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Scanned Bills History */}
                    <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#2D3748', margin: '0 0 16px 0' }}>Scan History ({scannedBills.length} Bills)</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 400, overflowY: 'auto' }}>
                            {scannedBills.map(bill => (
                                <div key={bill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #EDF2F7' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <span style={{ fontWeight: 800, color: '#1A202C' }}>{bill.invoiceNumber}</span>
                                        <span style={{ fontSize: 12, color: '#718096' }}>{bill.partyName || 'Cash Customer'} • {bill.items?.length || 0} items</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <span style={{ fontWeight: 800, color: '#38A169', fontSize: 15 }}>₹{bill.grandTotal.toFixed(2)}</span>
                                        <button onClick={() => removeBill(bill.id)} className="hide-on-print" style={{ border: 'none', background: 'transparent', color: '#FC8181', cursor: 'pointer', fontSize: 12, fontWeight: 800 }}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Totals & Profit Analysis */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)', borderRadius: 20, padding: 32, color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}>
                        <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                            <TrendingUp size={140} />
                        </div>

                        <p style={{ fontSize: 14, fontWeight: 700, color: '#A0AEC0', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Tally Sales</p>
                        <h1 style={{ fontSize: 48, fontWeight: 900, margin: '0 0 32px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <IndianRupee size={40} color="#4285F4" />
                            {totalSales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </h1>

                        <div style={{ display: 'flex', gap: 20 }}>
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 16, backdropFilter: 'blur(10px)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <PieChart size={16} color="#48BB78" />
                                    <p style={{ margin: 0, fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>Estimated Profit</p>
                                </div>
                                <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#48BB78' }}>
                                    ₹{totalProfit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </p>
                            </div>

                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 16, backdropFilter: 'blur(10px)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <Tag size={16} color="#F6E05E" />
                                    <p style={{ margin: 0, fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>Total Units Sold</p>
                                </div>
                                <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#F6E05E' }}>
                                    {totalItemsCount}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#1A202C' }}>How it works:</h3>
                        <p style={{ margin: 0, fontSize: 13, color: '#718096', lineHeight: 1.6 }}>
                            1. Pick up a printed invoice returned by a customer or for daily tally.<br />
                            2. Use your barcode scanner to scan the printed barcode on the top left of the bill.<br />
                            3. The system instantly breaks down items sold across all scanned bills to calculate your aggregated profits, quantities, and totals on the fly!
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    .hide-on-print { display: none !important; }
                    body { background: white !important; }
                    div { box-shadow: none !important; }
                }
                @media (max-width: 1024px) {
                    div[style*="flex-direction: row"] {
                        flex-direction: column !important;
                    }
                }
                @media (max-width: 768px) {
                    .exp-header { flex-direction: column; align-items: flex-start !important; }
                    .exp-search { width: 100% !important; }
                }
            `}</style>
        </div>
    );
}
