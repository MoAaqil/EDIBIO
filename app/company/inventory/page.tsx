'use client';
import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import { canAccess } from '@/components/FeatureGate';
import { UNITS, GST_RATES, fetchHsnOnline, predictStockDays } from '@/lib/utils';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import {
    Plus, Search, Package, Trash2, Edit2, AlertTriangle,
    Download, Upload, ScanLine, Warehouse, ArrowUp, ArrowDown, X, ArrowRightLeft, History
} from 'lucide-react'; // Trigger HMR rebuild
import PurchaseBillsTab from './PurchaseBillsTab';
import StockLedgerTab from './StockLedgerTab';
import AIAddItemModal from '@/components/AIAddItemModal';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';

function InventoryRow({ p, companyId, onDelete, onEdit, godowns, isSelected, onToggle, invoices }: any) {
    const isLow = p.stockQty <= p.lowStockAlertQty;
    const daysLeft = predictStockDays(p.stockQty, invoices, p.id);

    return (
        <tr className={isSelected ? 'selected-row' : ''} style={{ backgroundColor: isSelected ? '#F0F4F8' : 'transparent', transition: 'all 0.15s' }}>
            <td onClick={(e) => e.stopPropagation()} style={{ width: 40, textAlign: 'center' }}>
                <input type="checkbox" checked={isSelected} onChange={() => onToggle(p.id)} style={{ cursor: 'pointer', transform: 'scale(1.2)' }} />
            </td>
            <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FEF7E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#B45309', flexShrink: 0, boxShadow: 'inset 0 0 0 1px rgba(180,83,9,0.1)' }}>
                        {p.name[0]}
                    </div>
                    <div>
                        <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{p.name}</p>
                        {p.barcode && <p style={{ fontSize: 10, color: '#A0AEC0', fontFamily: 'monospace' }}>{p.barcode}</p>}
                    </div>
                </div>
            </td>
            <td style={{ fontSize: 11, color: '#718096', fontFamily: 'monospace' }}>{p.hsnCode || <span style={{ color: '#A0AEC0' }}>—</span>}</td>
            <td>
                <span className="badge badge-gray">{p.category || '—'}</span>
            </td>
            <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 800, color: isLow ? '#EA4335' : '#1A1A2E', fontSize: 14 }}>{p.stockQty}</span>
                        <span style={{ fontSize: 11, color: '#A0AEC0' }}>{p.unit}</span>
                        {isLow && <AlertTriangle size={13} color="#FBBC04" />}
                    </div>
                    {daysLeft !== null && (
                        <p style={{ fontSize: 10, color: daysLeft < 7 ? '#EA4335' : '#34A853', fontWeight: 700 }}>
                            Est. {daysLeft} days left
                        </p>
                    )}
                </div>
            </td>
            <td style={{ fontSize: 11, color: '#718096' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Warehouse size={10} /> {godowns?.find((g: any) => g.id === p.godownId)?.name || godowns?.[0]?.name || '—'}
                </span>
            </td>
            <td style={{ fontWeight: 700 }}>₹{p.purchasePrice.toLocaleString('en-IN')}</td>
            <td style={{ fontWeight: 800, color: '#34A853' }}>₹{p.sellingPrice.toLocaleString('en-IN')}</td>
            <td><span className="badge badge-blue">{p.gstRate}%</span></td>
            <td>
                <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => onEdit(p)} className="btn btn-ghost btn-icon" style={{ padding: 6, color: '#4285F4' }}><Edit2 size={13} /></button>
                    <button onClick={() => onDelete(p.id)} className="btn btn-ghost btn-icon" style={{ padding: 6, color: '#EA4335' }}><Trash2 size={13} /></button>
                </div>
            </td>
        </tr>
    );
}

export default function InventoryPage() {
    const { activeCompanyId } = useStore();
    const companyId = activeCompanyId;
    const company = useActiveCompany();
    const products = useCompanyData('products') as Product[];
    const invoices = useCompanyData('invoices') as any[];
    const { addProduct, updateProduct, deleteProduct, addToHsnCache } = useStore();

    const [search, setSearch] = useState('');
    const [godownFilter, setGodownFilter] = useState('all');
    const [showAdd, setShowAdd] = useState(false);
    const [showAIAdd, setShowAIAdd] = useState(false);
    const [activeTab, setActiveTab] = useState<'items' | 'purchases' | 'ledger'>('items');

    // Import states
    const [showImport, setShowImport] = useState(false);
    const [importGodownId, setImportGodownId] = useState(company?.godowns?.[0]?.id || '');

    // Transfer states
    const [showTransfer, setShowTransfer] = useState(false);
    const [transferFrom, setTransferFrom] = useState(company?.godowns?.[0]?.id || '');
    const [transferTo, setTransferTo] = useState(company?.godowns?.[1]?.id || '');

    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [hsnLoading, setHsnLoading] = useState(false);

    const emptyForm = { name: '', barcode: '', category: '', hsnCode: '', unit: 'pcs', purchasePrice: '', sellingPrice: '', mrp: '', stockQty: '', lowStockAlertQty: '5', gstRate: '0', taxIncluded: false, godownId: company?.godowns?.[0]?.id || '', brand: '', description: '', imageUrl: '' };
    const [form, setForm] = useState<any>(emptyForm);
    const up = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

    const filtered = products.filter(p => {
        if (godownFilter !== 'all' && p.godownId !== godownFilter && !(godownFilter === company?.godowns?.[0]?.id && !p.godownId)) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !(p.barcode || '').includes(search) && !(p.category || '').toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) return;
        const yes = await confirm({
            title: `Delete ${selectedItems.length} items?`,
            message: `This will permanently remove ${selectedItems.length} items from your inventory and can't be undone. Are you sure?`,
            danger: true
        });
        if (yes) {
            selectedItems.forEach(id => deleteProduct(id));
            setSelectedItems([]);
            toast.success(`${selectedItems.length} items deleted`);
        }
    };

    const toggleItemSelection = (id: string) => {
        setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleAllSelection = () => {
        if (filtered.length > 0 && selectedItems.length === filtered.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filtered.map(p => p.id));
        }
    };

    const stockValue = products.reduce((a: number, p) => a + p.stockQty * p.purchasePrice, 0);
    const lowStock = products.filter(p => p.stockQty <= p.lowStockAlertQty);

    const handleHsnFetch = async () => {
        if (!form.hsnCode) { toast.error('Enter HSN code first'); return; }
        setHsnLoading(true);
        const res = await fetchHsnOnline(form.hsnCode);
        setHsnLoading(false);
        if (res) {
            toast.success(`HSN ${form.hsnCode}: ${res.description} · GST ${res.gstRate}%`);
            up('gstRate', String(res.gstRate));
            addToHsnCache({ code: form.hsnCode, description: res.description, gstRate: res.gstRate as any, source: 'api' });
        } else {
            toast.error('HSN not found online. Please enter GST rate manually.');
        }
    };

    const handleSave = () => {
        if (!form.name) { toast.error('Item name required'); return; }
        const data = {
            companyId: companyId!,
            name: form.name, barcode: form.barcode, category: form.category,
            hsnCode: form.hsnCode, unit: form.unit, imageUrl: form.imageUrl,
            purchasePrice: parseFloat(form.purchasePrice) || 0,
            sellingPrice: parseFloat(form.sellingPrice) || 0,
            mrp: parseFloat(form.mrp) || 0,
            stockQty: parseFloat(form.stockQty) || 0,
            lowStockAlertQty: parseFloat(form.lowStockAlertQty) || 5,
            gstRate: parseFloat(form.gstRate) as any || 0,
            cessRate: 0, taxIncluded: form.taxIncluded,
            godownId: form.godownId || company?.godowns?.[0]?.id,
            brand: form.brand, description: form.description,
        };
        if (editProduct) { updateProduct(editProduct.id, data); setEditProduct(null); toast.success('Item updated'); }
        else { addProduct(data); toast.success('Item added to inventory'); }
        setShowAdd(false); setForm(emptyForm);
    };

    const openEdit = (p: Product) => { setEditProduct(p); setForm({ ...p, purchasePrice: String(p.purchasePrice), sellingPrice: String(p.sellingPrice), mrp: String(p.mrp || ''), stockQty: String(p.stockQty), lowStockAlertQty: String(p.lowStockAlertQty), gstRate: String(p.gstRate), imageUrl: p.imageUrl || '' }); setShowAdd(true); };
    const handleDelete = async (id: string) => {
        const yes = await confirm({ message: 'This item and its stock data will be permanently removed.', danger: true });
        if (yes) { deleteProduct(id); toast.success('Item deleted'); }
    };

    const handleGeminiScanned = (items: any[]) => {
        setShowAIAdd(false);
        let addedCount = 0;

        const parseNum = (v: any) => {
            if (v === undefined || v === null) return 0;
            // Handle currency symbols, commas, and spaces common in OCR
            const s = String(v).replace(/[₹$,\s]/g, '').replace(/[^0-9.]/g, '');
            return parseFloat(s) || 0;
        };

        items.forEach(item => {
            const name = item.name || item.item || item.product;
            if (!name) return;

            const price = parseNum(item.price ?? item.rate ?? item.unitPrice ?? 0);
            const qty = parseNum(item.qty ?? item.quantity) || 1;
            const gst = parseNum(item.gst ?? 0);

            addProduct({
                companyId: companyId!,
                name: String(name).substring(0, 100),
                barcode: '',
                category: 'AI Scanned',
                hsnCode: item.hsn || '',
                unit: item.unit || 'pcs',
                imageUrl: '',
                purchasePrice: price,
                sellingPrice: price,
                mrp: price,
                stockQty: qty,
                lowStockAlertQty: 5,
                gstRate: gst as any,
                cessRate: 0,
                taxIncluded: false,
                godownId: company?.godowns?.[0]?.id || '',
                brand: '',
                description: ''
            });
            addedCount++;
        });

        if (addedCount > 0) {
            toast.success(`🎉 AI added ${addedCount} items to your inventory!`);
        } else {
            toast.error('Could not detect any valid product names or prices. Try a clearer image.');
        }
    };

    const exportCSV = () => {
        const header = 'Name,Barcode,Category,HSN,Unit,Purchase Price,Selling Price,MRP,Stock,Low Stock Alert,GST Rate,Image URL\n';
        const rows = products.map(p => `"${p.name}","${p.barcode || ''}","${p.category || ''}","${p.hsnCode || ''}","${p.unit}",${p.purchasePrice},${p.sellingPrice},${p.mrp || ''},${p.stockQty},${p.lowStockAlertQty},${p.gstRate},"${p.imageUrl || ''}"`).join('\n');
        const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'edibio_inventory.csv'; a.click(); URL.revokeObjectURL(url);
    };

    const importRef = useRef<HTMLInputElement>(null);
    const { importProductsBulk } = useStore();

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            const text = ev.target?.result as string;

            // Native CSV parser handling commas inside quotes
            const parseCSVLine = (line: string) => {
                const result = [];
                let current = '';
                let inQuotes = false;
                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    if (char === '"' && line[i + 1] === '"') { current += '"'; i++; } // Escaped quote
                    else if (char === '"') inQuotes = !inQuotes; // Toggle quote state
                    else if (char === ',' && !inQuotes) { result.push(current.trim()); current = ''; } // Delimiter
                    else current += char;
                }
                result.push(current.trim());
                return result;
            };

            const rows = text.split('\n').filter(Boolean).map(r => r.trim());
            const parsedData: Omit<Product, 'id'>[] = [];

            // Skip header row
            for (let r = 1; r < rows.length; r++) {
                if (!rows[r]) continue;
                const cols = parseCSVLine(rows[r]);
                if (!cols[0]) continue;

                parsedData.push({
                    companyId: companyId!,
                    name: cols[0],
                    barcode: cols[1] || '',
                    category: cols[2] || 'Imported',
                    hsnCode: cols[3] || '',
                    unit: cols[4] || 'pcs',
                    purchasePrice: parseFloat(cols[5]) || 0,
                    sellingPrice: parseFloat(cols[6]) || 0,
                    mrp: parseFloat(cols[7]) || 0,
                    stockQty: parseFloat(cols[8]) || 0,
                    lowStockAlertQty: parseFloat(cols[9]) || 5,
                    gstRate: parseFloat(cols[10]) as any || 0,
                    imageUrl: cols[11] || '',
                    cessRate: 0,
                    taxIncluded: false,
                    godownId: importGodownId
                });
            }

            if (parsedData.length > 0) {
                importProductsBulk(parsedData);
                toast.success(`Succesfully imported ${parsedData.length} items in bulk!`);
            } else {
                toast.error('No valid valid data found in CSV.');
            }
            setShowImport(false);
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const transferRef = useRef<HTMLInputElement>(null);
    const handleTransferProcess = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        if (transferFrom === transferTo) { toast.error('From and To godowns cannot be the same'); return; }

        const reader = new FileReader();
        reader.onload = ev => {
            const text = ev.target?.result as string;
            // Expected CSV format: ItemNameOrBarcode, TransferQty
            const rows = text.split('\n').slice(1).filter(Boolean);
            let successTransfers = 0;
            const missedItems: string[] = [];

            rows.forEach(row => {
                const cols = row.split(',').map(c => c.replace(/^"|"$/g, '').trim());
                const query = cols[0];
                const trfQty = parseFloat(cols[1]);

                if (!query || isNaN(trfQty) || trfQty <= 0) return;

                // Find source product
                const sourceProduct = products.find(p => (p.godownId === transferFrom || (!p.godownId && transferFrom === company?.godowns?.[0]?.id)) && (p.name.toLowerCase() === query.toLowerCase() || p.barcode === query));

                if (sourceProduct && sourceProduct.stockQty >= trfQty) {
                    // deduct from source
                    updateProduct(sourceProduct.id, { stockQty: sourceProduct.stockQty - trfQty });

                    // Find or create in destination
                    const destProduct = products.find(p => p.godownId === transferTo && (p.name.toLowerCase() === sourceProduct.name.toLowerCase() || p.barcode === sourceProduct.barcode));
                    if (destProduct) {
                        updateProduct(destProduct.id, { stockQty: destProduct.stockQty + trfQty });
                    } else {
                        // Create clone
                        const { id: _, ...cloneInfo } = sourceProduct;
                        addProduct({ ...cloneInfo, godownId: transferTo, stockQty: trfQty });
                    }
                    successTransfers++;
                } else {
                    missedItems.push(query);
                }
            });

            if (missedItems.length > 0) {
                toast(`✅ ${successTransfers} transferred. ⚠️ Not found: ${missedItems.slice(0, 3).join(', ')}${missedItems.length > 3 ? '…' : ''}`, { duration: 5000 });
            } else {
                toast.success(`Successfully transferred ${successTransfers} items.`);
            }
            setShowTransfer(false);
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const godowns = company?.godowns || [];

    return (
        <>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 8, borderBottom: '1px solid #E2E8F0', paddingBottom: 0, overflowX: 'auto' }}>
                    <button onClick={() => setActiveTab('items')} style={{ background: 'none', border: 'none', padding: '10px 20px', fontWeight: activeTab === 'items' ? 900 : 600, color: activeTab === 'items' ? '#1A1A2E' : '#A0AEC0', borderBottom: activeTab === 'items' ? '3px solid #4285F4' : '3px solid transparent', cursor: 'pointer', fontSize: 13, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>Stock Items</button>
                    <button onClick={() => setActiveTab('purchases')} style={{ background: 'none', border: 'none', padding: '10px 20px', fontWeight: activeTab === 'purchases' ? 900 : 600, color: activeTab === 'purchases' ? '#1A1A2E' : '#A0AEC0', borderBottom: activeTab === 'purchases' ? '3px solid #4285F4' : '3px solid transparent', cursor: 'pointer', fontSize: 13, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>Purchase Bills</button>
                    <button onClick={() => setActiveTab('ledger')} style={{ background: 'none', border: 'none', padding: '10px 20px', fontWeight: activeTab === 'ledger' ? 900 : 600, color: activeTab === 'ledger' ? '#1A1A2E' : '#A0AEC0', borderBottom: activeTab === 'ledger' ? '3px solid #4285F4' : '3px solid transparent', cursor: 'pointer', fontSize: 13, transition: 'all 0.2s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <History size={14} /> Stock Ledger & Ageing
                    </button>
                </div>

                {activeTab === 'purchases' ? (
                    <PurchaseBillsTab />
                ) : activeTab === 'ledger' ? (
                    <StockLedgerTab />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Header stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
                            {[
                                { l: 'Total Items', v: String(products.length), icon: Package, color: '#FBBC04' },
                                { l: 'Stock Value', v: `₹${stockValue.toLocaleString('en-IN')}`, icon: ArrowUp, color: '#34A853' },
                                { l: 'Low Stock', v: String(lowStock.length), icon: AlertTriangle, color: '#EA4335' },
                            ].map(({ l, v, icon: Icon, color }) => (
                                <div key={l} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icon size={20} color={color} />
                                    </div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <p style={{ fontSize: 10, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{l}</p>
                                        <p style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{v}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Controls */}
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                                <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                                <input className="e-input" placeholder="Search items, barcode…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
                            </div>
                            {/* Godown filter */}
                            {godowns.length > 1 && (
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <button onClick={() => setGodownFilter('all')} className={`godown-chip ${godownFilter === 'all' ? 'active' : ''}`}>
                                        All
                                    </button>
                                    {godowns.map(g => (
                                        <button key={g.id} onClick={() => setGodownFilter(g.id)} className={`godown-chip ${godownFilter === g.id ? 'active' : ''}`}>
                                            <Warehouse size={11} /> {g.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button onClick={() => { exportCSV(); }} className="btn btn-outline btn-sm" style={{ gap: 5 }}><Download size={13} /> Export</button>
                            <button onClick={() => setShowImport(true)} className="btn btn-outline btn-sm" style={{ gap: 5 }}><Upload size={13} /> Import CSV</button>
                            {godowns.length > 1 && (
                                <button onClick={() => setShowTransfer(true)} className="btn btn-outline btn-sm" style={{ gap: 5, color: '#9333EA', borderColor: '#E9D8FD', background: '#FAF5FF' }}>
                                    <ArrowRightLeft size={13} /> Stock Transfer
                                </button>
                            )}
                            {selectedItems.length > 0 && (
                                <button onClick={handleBulkDelete} className="btn btn-sm" style={{ gap: 5, background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' }}>
                                    <Trash2 size={13} /> Delete ({selectedItems.length})
                                </button>
                            )}
                            <button onClick={() => {
                                if (!canAccess('ai_scanner', useStore.getState().user, useStore.getState().isDemo)) {
                                    toast('AI Scanning requires the Premium Plan. Upgrade in Subscription settings.', { icon: '🔒' });
                                    return;
                                }
                                setShowAIAdd(true);
                            }} className="btn btn-sm" style={{ background: canAccess('ai_scanner', useStore.getState().user, useStore.getState().isDemo) ? 'linear-gradient(135deg, #1A1A2E, #4285F4)' : '#E2E8F0', color: canAccess('ai_scanner', useStore.getState().user, useStore.getState().isDemo) ? 'white' : '#A0AEC0', borderColor: canAccess('ai_scanner', useStore.getState().user, useStore.getState().isDemo) ? '#1A1A2E' : '#E2E8F0', gap: 5, cursor: canAccess('ai_scanner', useStore.getState().user, useStore.getState().isDemo) ? 'pointer' : 'not-allowed' }}>
                                <ScanLine size={13} /> AI Scan Item {!canAccess('ai_scanner', useStore.getState().user, useStore.getState().isDemo) && '🔒'}
                            </button>
                            <button onClick={() => { setEditProduct(null); setForm(emptyForm); setShowAdd(true); }} className="btn btn-blue btn-sm" style={{ gap: 5 }}>
                                <Plus size={13} /> Add Item
                            </button>
                        </div>

                        {/* Table */}
                        <div className="card" style={{ overflow: 'hidden' }}>
                            {filtered.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '56px 20px' }}>
                                    <Package size={44} style={{ color: '#E1E4E8', margin: '0 auto 12px' }} />
                                    <p style={{ color: '#A0AEC0', fontWeight: 600, fontSize: 14 }}>No items yet</p>
                                    <button onClick={() => setShowAdd(true)} className="btn btn-blue btn-sm" style={{ display: 'inline-flex', marginTop: 12, gap: 5 }}>
                                        <Plus size={13} /> Add First Item
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="desktop-table" style={{ overflowX: 'auto' }}>
                                        <table className="e-table" style={{ minWidth: 800 }}>
                                            <thead><tr>
                                                <th style={{ width: 40, textAlign: 'center' }}>
                                                    <input type="checkbox" checked={filtered.length > 0 && selectedItems.length === filtered.length} onChange={toggleAllSelection} style={{ cursor: 'pointer', transform: 'scale(1.2)' }} />
                                                </th>
                                                <th>Item</th><th>HSN</th><th>Category</th><th>Stock</th><th>Godown</th><th>Purchase</th><th>Selling</th><th>GST</th><th>Actions</th>
                                            </tr></thead>
                                            <tbody>
                                                {filtered.map(p => <InventoryRow key={p.id} p={p} companyId={companyId} onDelete={handleDelete} onEdit={openEdit} godowns={godowns} isSelected={selectedItems.includes(p.id)} onToggle={toggleItemSelection} invoices={invoices} />)}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mobile-list">
                                        {filtered.length > 0 && (
                                            <div style={{ padding: '12px 16px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <input type="checkbox" checked={selectedItems.length === filtered.length} onChange={toggleAllSelection} style={{ cursor: 'pointer', transform: 'scale(1.2)' }} />
                                                <span style={{ fontSize: 13, fontWeight: 700, color: '#4A5568' }}>Select All Items</span>
                                            </div>
                                        )}
                                        {filtered.map(p => {
                                            const isSelected = selectedItems.includes(p.id);
                                            const daysLeft = predictStockDays(p.stockQty, invoices, p.id);
                                            return (
                                                <div key={p.id} onClick={() => toggleItemSelection(p.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderBottom: '1px solid #F1F3F5', background: isSelected ? '#F8FBFF' : 'white', cursor: 'pointer', transition: 'background 0.2s' }}>
                                                    <input type="checkbox" checked={isSelected} onChange={() => { }} style={{ cursor: 'pointer', transform: 'scale(1.2)', flexShrink: 0 }} />
                                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #FEF7E0, #FFFBEB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#B45309', flexShrink: 0, fontSize: 16 }}>{p.name[0]}</div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <p style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                                                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                                            <span className="badge badge-gray" style={{ fontSize: 9 }}>{p.unit}</span>
                                                            <span className="badge badge-blue" style={{ fontSize: 9 }}>GST {p.gstRate}%</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'right', flexShrink: 0, maxWidth: 100 }}>
                                                        <p style={{ fontWeight: 900, fontSize: 15, color: '#34A853', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>₹{p.sellingPrice}</p>
                                                        <p style={{ fontSize: 11, fontWeight: 700, color: p.stockQty <= p.lowStockAlertQty ? '#EA4335' : '#718096', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.stockQty} in stock</p>
                                                        {daysLeft !== null && <p style={{ fontSize: 9, color: daysLeft < 7 ? '#EA4335' : '#34A853', fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Est. {daysLeft}d</p>}
                                                        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 4 }}>
                                                            <button onClick={(e) => { e.stopPropagation(); openEdit(p); }} className="btn btn-ghost btn-icon" style={{ padding: 4, color: '#4285F4' }}><Edit2 size={14} /></button>
                                                            <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} className="btn btn-ghost btn-icon" style={{ padding: 4, color: '#EA4335' }}><Trash2 size={14} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showAdd && (
                    <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                        <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 580 }}>
                            <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E' }}>{editProduct ? 'Edit Item' : 'Add New Item'}</h3>
                                <button onClick={() => { setShowAdd(false); setEditProduct(null); }} className="btn btn-ghost btn-icon"><X size={18} /></button>
                            </div>
                            <div style={{ overflowY: 'auto', padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div style={{ gridColumn: '1/-1' }}>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item Name *</label>
                                        <input className="e-input" placeholder="e.g. Basmati Rice (5kg)" value={form.name} onChange={e => up('name', e.target.value)} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                                        <input className="e-input" placeholder="Grocery, Snacks…" value={form.category} onChange={e => up('category', e.target.value)} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item Image</label>
                                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                            {form.imageUrl && <img src={form.imageUrl} style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} />}
                                            <input type="file" accept="image/*" onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = ev => up('imageUrl', ev.target?.result as string);
                                                    reader.readAsDataURL(file);
                                                }
                                            }} style={{ display: 'none' }} id="inv-img-upload" />
                                            <label htmlFor="inv-img-upload" className="btn btn-outline btn-sm" style={{ cursor: 'pointer', flexShrink: 0, padding: '0 8px', fontSize: 11 }}>Upload</label>
                                            <input className="e-input" placeholder="Or URL" value={form.imageUrl} onChange={e => up('imageUrl', e.target.value)} style={{ flex: 1, padding: '6px 10px', fontSize: 12 }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unit</label>
                                        <select className="e-select" value={form.unit} onChange={e => up('unit', e.target.value)}>
                                            {UNITS.map(u => <option key={u}>{u}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>HSN Code</label>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <input className="e-input" placeholder="e.g. 1006" value={form.hsnCode} onChange={e => up('hsnCode', e.target.value)} style={{ flex: 1 }} />
                                            <button onClick={handleHsnFetch} disabled={hsnLoading} className="btn btn-blue btn-sm" style={{ flexShrink: 0, padding: '0 10px' }}>
                                                {hsnLoading ? '…' : 'Fetch'}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>GST Rate</label>
                                        <select className="e-select" value={form.gstRate} onChange={e => up('gstRate', e.target.value)}>
                                            {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Barcode</label>
                                        <input className="e-input" placeholder="Scan or enter barcode" value={form.barcode} onChange={e => up('barcode', e.target.value)} style={{ fontFamily: 'monospace' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Purchase Price ₹</label>
                                        <input type="number" className="e-input" placeholder="0.00" value={form.purchasePrice} onChange={e => up('purchasePrice', e.target.value)} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Selling Price ₹</label>
                                        <input type="number" className="e-input" placeholder="0.00" value={form.sellingPrice} onChange={e => up('sellingPrice', e.target.value)} />
                                        {form.purchasePrice && form.sellingPrice && (
                                            <p style={{ fontSize: 10, color: '#34A853', fontWeight: 700, marginTop: 4 }}>
                                                Margin: ₹{(parseFloat(form.sellingPrice) - parseFloat(form.purchasePrice)).toFixed(2)} ({((parseFloat(form.sellingPrice) - parseFloat(form.purchasePrice)) / parseFloat(form.purchasePrice) * 100).toFixed(1)}%)
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Stock</label>
                                        <input type="number" className="e-input" placeholder="0" value={form.stockQty} onChange={e => up('stockQty', e.target.value)} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Low Stock Alert at</label>
                                        <input type="number" className="e-input" placeholder="5" value={form.lowStockAlertQty} onChange={e => up('lowStockAlertQty', e.target.value)} />
                                    </div>
                                    {godowns.length > 1 && (
                                        <div style={{ gridColumn: '1/-1' }}>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Godown</label>
                                            <select className="e-select" value={form.godownId} onChange={e => up('godownId', e.target.value)}>
                                                {godowns.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                            </select>
                                        </div>
                                    )}
                                    {/* Tax included toggle */}
                                    <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <button onClick={() => up('taxIncluded', !form.taxIncluded)}
                                            style={{ width: 40, height: 22, borderRadius: 999, border: 'none', cursor: 'pointer', background: form.taxIncluded ? '#34A853' : '#CBD5E0', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                                            <span style={{ position: 'absolute', top: 2, left: form.taxIncluded ? 18 : 2, width: 18, height: 18, background: 'white', borderRadius: 999, transition: 'left 0.2s' }} />
                                        </button>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: '#4A5568' }}>GST included in selling price</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '14px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button onClick={() => { setShowAdd(false); setEditProduct(null); }} className="btn btn-outline">Cancel</button>
                                <button onClick={handleSave} className="btn btn-blue">{editProduct ? 'Update Item' : 'Add Item'}</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Import Modal */}
                {showImport && (
                    <div className="modal-overlay" onClick={() => setShowImport(false)}>
                        <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
                            <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3 style={{ fontWeight: 900, fontSize: 17 }}>Bulk Import Stocks</h3>
                                <button onClick={() => setShowImport(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                            </div>
                            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <p style={{ fontSize: 13, color: '#718096' }}>Upload a CSV file to add multiple items at once.</p>
                                {godowns.length > 0 && (
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Select Godown for Import</label>
                                        <select className="e-select" value={importGodownId} onChange={e => setImportGodownId(e.target.value)}>
                                            {godowns.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                        </select>
                                    </div>
                                )}
                                <button onClick={() => importRef.current?.click()} className="btn btn-blue" style={{ width: '100%', justifyContent: 'center' }}>
                                    Choose CSV File
                                </button>
                                <input ref={importRef} type="file" accept=".csv" onChange={handleImport} style={{ display: 'none' }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Transfer Modal */}
                {showTransfer && (
                    <div className="modal-overlay" onClick={() => setShowTransfer(false)}>
                        <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 450 }}>
                            <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3 style={{ fontWeight: 900, fontSize: 17 }}>Transfer Stocks</h3>
                                <button onClick={() => setShowTransfer(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                            </div>
                            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <p style={{ fontSize: 13, color: '#718096', marginBottom: 10 }}>Transfer quantities from one Godown to another by uploading an excel/CSV sheet. <br /><br /><strong>Format:</strong> Row 1 Headers, Col 1 = Barcode/Name, Col 2 = Transfer Qty.</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: 10, alignItems: 'center' }}>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>From Godown</label>
                                        <select className="e-select" value={transferFrom} onChange={e => setTransferFrom(e.target.value)}>
                                            {godowns.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: 18 }}><ArrowRightLeft size={16} color="#A0AEC0" /></div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>To Godown</label>
                                        <select className="e-select" value={transferTo} onChange={e => setTransferTo(e.target.value)}>
                                            {godowns.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <button onClick={() => transferRef.current?.click()} className="btn btn-blue" style={{ width: '100%', justifyContent: 'center', marginTop: 10, background: '#9333EA', color: '#fff' }}>
                                    Upload Transfer CSV
                                </button>
                                <input ref={transferRef} type="file" accept=".csv" onChange={handleTransferProcess} style={{ display: 'none' }} />
                            </div>
                        </div>
                    </div>
                )}
                {showAIAdd && (
                    <AIAddItemModal onClose={() => setShowAIAdd(false)} onGeminiScanned={handleGeminiScanned} />
                )}


            </div>

            <style>{`
                .desktop-table { display: none; }
                .mobile-list { display: block; }
                @media (min-width: 768px) {
                  .desktop-table { display: block; }
                  .mobile-list { display: none; }
                }
            `}</style>
        </>
    );
}
