'use client';
import { useState, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import { canAccess } from '@/components/FeatureGate';
import { UNITS, GST_RATES, fetchHsnOnline, predictStockDays } from '@/lib/utils';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import {
    Plus, Search, Package, Trash2, Edit2, AlertTriangle,
    Download, Upload, ScanLine, Warehouse, ArrowUp, ArrowDown, X, ArrowRightLeft, History, Calendar, ShoppingCart, Gift, QrCode
} from 'lucide-react'; // Trigger HMR rebuild
import PurchaseBillsTab from './PurchaseBillsTab';
import StockLedgerTab from './StockLedgerTab';
import QrLabelModal from '@/components/QrLabelModal';
import AIAddItemModal from '@/components/AIAddItemModal';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';

function InventoryRow({ p, companyId, onDelete, onEdit, godowns, isSelected, onToggle, invoices, offers, onQrSelect, company, isSubBranch }: any) {
    const isLow = p.stockQty <= p.lowStockAlertQty;
    const daysLeft = predictStockDays(p.stockQty, invoices, p.id);
    const today = new Date().toISOString().slice(0, 10);
    const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    const batches = p.batches || [];
    const hasExpired = batches.some((b: any) => b.expiryDate && b.expiryDate < today);
    const expiringSoon = !hasExpired && batches.some((b: any) => b.expiryDate && b.expiryDate >= today && b.expiryDate <= in30);

    const matchingOffers = (offers || []).filter((o: any) => 
        (o.type === 'bogo' && (o.buyProductId === p.id || o.getProductId === p.id)) ||
        (o.type === 'discount' && o.buyProductId === p.id) ||
        (o.type === 'combo' && o.comboProductIds?.includes(p.id))
    );

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
                        <Link href={`/company/inventory/${p.id}`} style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', textDecoration: 'none' }}>
                            {p.name}
                        </Link>
                        {p.barcode && <p style={{ fontSize: 10, color: '#A0AEC0', fontFamily: 'monospace' }}>{p.barcode}</p>}
                        <div style={{ display: 'flex', gap: 4, marginTop: 2, flexWrap: 'wrap' }}>
                            {hasExpired && <span style={{ fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 4, background: '#FEE2E2', color: '#DC2626' }}>EXPIRED BATCH</span>}
                            {expiringSoon && <span style={{ fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 4, background: '#FEF3C7', color: '#D97706' }}>EXPIRING SOON</span>}
                            {matchingOffers.map((o: any) => (
                                <span key={o.id} style={{ fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 4, background: '#E6FFFA', color: '#00A389', border: '1px solid #B2F5EA' }}>
                                    🎁 {o.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </td>
            <td style={{ fontSize: 11, color: '#718096', fontFamily: 'monospace' }}>{p.hsnCode || <span style={{ color: '#A0AEC0' }}>—</span>}</td>
            <td>
                <span className="badge badge-gray">{p.category || '—'}</span>
            </td>
            <td>
                {company?.franchiseEnabled && !isSubBranch ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontWeight: 800, color: isLow ? '#EA4335' : '#1A1A2E', fontSize: 13 }}>Total: {p.stockQty}</span>
                            <span style={{ fontSize: 11, color: '#A0AEC0' }}>{p.unit}</span>
                            {isLow && <AlertTriangle size={13} color="#FBBC04" />}
                        </div>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 220 }}>
                            {(company.branches || []).map((b: any) => {
                                const bQty = p.branchStock?.[b.id] ?? 0;
                                return (
                                    <span key={b.id} style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: '#F1F5F9', color: '#4A5568', border: '1px solid #E2E8F0', display: 'inline-block' }}>
                                        {b.name}: {bQty}
                                    </span>
                                );
                            })}
                        </div>

                        {daysLeft !== null && (
                            <p style={{ fontSize: 10, color: daysLeft < 7 ? '#EA4335' : '#34A853', fontWeight: 700 }}>
                                Est. {daysLeft} days left
                            </p>
                        )}
                    </div>
                ) : (
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
                )}
            </td>
            <td style={{ fontSize: 11, color: '#718096' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Warehouse size={10} /> {p.godownDisplayList || godowns?.find((g: any) => g.id === p.godownId)?.name || godowns?.[0]?.name || '—'}
                </span>
            </td>
            <td style={{ fontWeight: 700 }}>₹{p.purchasePrice.toLocaleString('en-IN')}</td>
            <td style={{ fontWeight: 800, color: '#34A853' }}>
                <div>₹{p.sellingPrice.toLocaleString('en-IN')}</div>
                {company?.franchiseEnabled && !isSubBranch && p.branchPrice && Object.keys(p.branchPrice).length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
                        {Object.entries(p.branchPrice).map(([bId, price]) => {
                            const branchName = company?.branches?.find((b: any) => b.id === bId)?.name || 'Branch';
                            return (
                                <span key={bId} style={{ fontSize: 8, color: '#4A5568', background: '#E6FFFA', padding: '1px 4px', borderRadius: 4, border: '1px solid #B2F5EA', display: 'inline-block', width: 'fit-content' }}>
                                    {branchName}: ₹{price}
                                </span>
                            );
                        })}
                    </div>
                )}
            </td>
            <td><span className="badge badge-blue">{p.gstRate}%</span></td>
            <td>
                <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => onQrSelect(p)} className="btn btn-ghost btn-icon" style={{ padding: 6, color: '#9333EA' }} title="Generate QR Label"><QrCode size={13} /></button>
                    <button onClick={() => onEdit(p)} className="btn btn-ghost btn-icon" style={{ padding: 6, color: '#4285F4' }}><Edit2 size={13} /></button>
                    <button onClick={() => onDelete(p.id)} className="btn btn-ghost btn-icon" style={{ padding: 6, color: '#EA4335' }}><Trash2 size={13} /></button>
                </div>
            </td>
        </tr>
    );
}

export default function InventoryPage() {
    const { 
        activeCompanyId, activeBranchId, isSubBranchLogin, stockTransfers = [], 
        addStockTransfer, approveStockTransfer, rejectStockTransfer,
        addProduct, updateProduct, deleteProduct, addToHsnCache, appendStockLog 
    } = useStore();
    const companyId = activeCompanyId;
    const company = useActiveCompany();
    const products = useCompanyData('products') as Product[];
    const invoices = useCompanyData('invoices') as any[];

    const [search, setSearch] = useState('');
    const [godownFilter, setGodownFilter] = useState('all');
    const [showAdd, setShowAdd] = useState(false);
    const [showAIAdd, setShowAIAdd] = useState(false);
    
    // Branch transfer modal states
    const [showBranchTransferModal, setShowBranchTransferModal] = useState(false);
    const [transferProductId, setTransferProductId] = useState('');
    const [transferFromBranchId, setTransferFromBranchId] = useState('');
    const [transferToBranchId, setTransferToBranchId] = useState('');
    const [transferQty, setTransferQty] = useState('');
    const [activeTab, setActiveTab] = useState<'items' | 'purchases' | 'ledger' | 'offers' | 'transfers'>('items');

    // Derive canScan once from reactive hook — avoids SSR/hydration mismatch from useStore.getState() in render
    const { user: storeUser, isDemo: storeIsDemo } = useStore();
    const canScan = canAccess('ai_scanner', storeUser, storeIsDemo);

    // Import states
    const [showImport, setShowImport] = useState(false);
    const [importGodownId, setImportGodownId] = useState(company?.godowns?.[0]?.id || '');

    // Transfer states
    const [showTransfer, setShowTransfer] = useState(false);
    const [transferFrom, setTransferFrom] = useState(company?.godowns?.[0]?.id || '');
    const [transferTo, setTransferTo] = useState(company?.godowns?.[1]?.id || '');

    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [selectedQrProduct, setSelectedQrProduct] = useState<Product | null>(null);
    const [hsnLoading, setHsnLoading] = useState(false);

    const emptyForm = { name: '', barcode: '', category: '', hsnCode: '', unit: 'pcs', purchasePrice: '', sellingPrice: '', mrp: '', stockQty: '', lowStockAlertQty: '5', gstRate: '0', taxIncluded: false, godownId: company?.godowns?.[0]?.id || '', brand: '', description: '', imageUrl: '', branchStock: {}, branchPrice: {} };
    const [form, setForm] = useState<any>(emptyForm);
    const up = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

    const filtered = products.filter(p => {
        if (godownFilter !== 'all' && p.godownId !== godownFilter && !(godownFilter === company?.godowns?.[0]?.id && !p.godownId)) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !(p.barcode || '').includes(search) && !(p.category || '').toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    // Group products by name to prevent double entries in the list
    const groupedFiltered = useMemo(() => {
        const groups: Record<string, {
            primaryProduct: Product;
            allProducts: Product[];
            combinedQty: number;
            godownNames: string[];
        }> = {};

        filtered.forEach(p => {
            const key = p.name.trim().toLowerCase();
            if (!groups[key]) {
                const gNames: string[] = [];
                const gId = p.godownId || company?.godowns?.[0]?.id;
                const gName = company?.godowns?.find(g => g.id === gId)?.name || '—';
                groups[key] = {
                    primaryProduct: p,
                    allProducts: [p],
                    combinedQty: p.stockQty,
                    godownNames: [gName]
                };
            } else {
                groups[key].allProducts.push(p);
                groups[key].combinedQty += p.stockQty;
                const gId = p.godownId || company?.godowns?.[0]?.id;
                const gName = company?.godowns?.find(g => g.id === gId)?.name || '—';
                if (!groups[key].godownNames.includes(gName)) {
                    groups[key].godownNames.push(gName);
                }
            }
        });

        return Object.values(groups).map(g => {
            return {
                ...g.primaryProduct,
                stockQty: g.combinedQty,
                godownDisplayList: g.godownNames.join(', '),
                originalProductIds: g.allProducts.map(p => p.id)
            };
        });
    }, [filtered, company]);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) return;
        const yes = await confirm({
            title: `Delete ${selectedItems.length} items?`,
            message: `This will permanently remove ${selectedItems.length} items and their associated stock entries from all godowns. Are you sure?`,
            danger: true
        });
        if (yes) {
            const selectedNames = products.filter(p => selectedItems.includes(p.id)).map(p => p.name.toLowerCase());
            const allMatchingProducts = products.filter(p => selectedNames.includes(p.name.toLowerCase()));
            allMatchingProducts.forEach(p => deleteProduct(p.id));
            setSelectedItems([]);
            toast.success(`Deleted ${selectedNames.length} items from all godowns`);
        }
    };

    const toggleItemSelection = (id: string) => {
        setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleAllSelection = () => {
        if (groupedFiltered.length > 0 && selectedItems.length === groupedFiltered.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(groupedFiltered.map((g: any) => g.id));
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
            branchStock: form.branchStock || {},
            branchPrice: form.branchPrice || {}
        };
        if (editProduct) {
            const sameNameProducts = products.filter(p => p.name.toLowerCase() === editProduct.name.toLowerCase());
            sameNameProducts.forEach(p => {
                if (p.id === editProduct.id) {
                    updateProduct(p.id, data);
                } else {
                    const { stockQty, godownId, ...sharedDetails } = data;
                    updateProduct(p.id, sharedDetails);
                }
            });
            setEditProduct(null);
            toast.success('Item details updated across all godowns');
        } else {
            addProduct(data);
            toast.success('Item added to inventory');
        }
        setShowAdd(false); setForm(emptyForm);
    };

    const openEdit = (p: Product) => { setEditProduct(p); setForm({ ...p, purchasePrice: String(p.purchasePrice), sellingPrice: String(p.sellingPrice), mrp: String(p.mrp || ''), stockQty: String(p.stockQty), lowStockAlertQty: String(p.lowStockAlertQty), gstRate: String(p.gstRate), imageUrl: p.imageUrl || '', branchStock: p.branchStock || {}, branchPrice: p.branchPrice || {} }); setShowAdd(true); };
    const handleDelete = async (id: string) => {
        const itemToDelete = products.find(p => p.id === id);
        if (!itemToDelete) return;
        const yes = await confirm({ message: `All entries for "${itemToDelete.name}" across all godowns will be permanently removed.`, danger: true });
        if (yes) {
            const sameNameProducts = products.filter(p => p.name.toLowerCase() === itemToDelete.name.toLowerCase());
            sameNameProducts.forEach(p => deleteProduct(p.id));
            toast.success('Item deleted from all godowns');
        }
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
                    const fromName = company?.godowns?.find(g => g.id === transferFrom)?.name || 'source godown';
                    const toName = company?.godowns?.find(g => g.id === transferTo)?.name || 'destination godown';

                    // deduct from source
                    updateProduct(sourceProduct.id, { stockQty: sourceProduct.stockQty - trfQty });
                    appendStockLog(sourceProduct.id, {
                        date: new Date().toISOString().slice(0, 10),
                        time: new Date().toTimeString().slice(0, 5),
                        type: 'out',
                        qty: trfQty,
                        reason: `Transfer to ${toName}`,
                        balanceAfter: sourceProduct.stockQty - trfQty,
                    });

                    // Find or create in destination
                    const destProduct = products.find(p => p.godownId === transferTo && (p.name.toLowerCase() === sourceProduct.name.toLowerCase() || p.barcode === sourceProduct.barcode));
                    if (destProduct) {
                        updateProduct(destProduct.id, { stockQty: destProduct.stockQty + trfQty });
                        appendStockLog(destProduct.id, {
                            date: new Date().toISOString().slice(0, 10),
                            time: new Date().toTimeString().slice(0, 5),
                            type: 'in',
                            qty: trfQty,
                            reason: `Transfer from ${fromName}`,
                            balanceAfter: destProduct.stockQty + trfQty,
                        });
                    } else {
                        // Create clone with opening transfer log
                        const { id: _, ...cloneInfo } = sourceProduct;
                        const initialLogs = [{
                            id: Math.random().toString(36).substring(2),
                            date: new Date().toISOString().slice(0, 10),
                            time: new Date().toTimeString().slice(0, 5),
                            type: 'in' as const,
                            qty: trfQty,
                            reason: `Transfer from ${fromName}`,
                            balanceAfter: trfQty,
                        }];
                        addProduct({ ...cloneInfo, godownId: transferTo, stockQty: trfQty, stockLogs: initialLogs });
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
                {/* Tabs — Mobile: fixed 2-row grid, Desktop: underline tabs */}
                <div className="inv-tab-bar">
                    <button onClick={() => setActiveTab('items')} className={`inv-tab-btn${activeTab === 'items' ? ' inv-tab-active' : ''}`}>
                        <Package size={13} />
                        Stock Items
                    </button>
                    <button onClick={() => setActiveTab('purchases')} className={`inv-tab-btn${activeTab === 'purchases' ? ' inv-tab-active' : ''}`}>
                        <ArrowDown size={13} />
                        Purchase Bills
                    </button>
                    <button onClick={() => setActiveTab('ledger')} className={`inv-tab-btn${activeTab === 'ledger' ? ' inv-tab-active' : ''}`}>
                        <History size={13} />
                        Ledger
                    </button>
                    <button onClick={() => setActiveTab('offers')} className={`inv-tab-btn${activeTab === 'offers' ? ' inv-tab-active' : ''}`}>
                        <Gift size={13} />
                        <span className="desktop-only-inline">Schemes & Offers</span>
                        <span className="mobile-only-inline">Offers</span>
                    </button>
                    {company?.franchiseEnabled && (
                        <button onClick={() => setActiveTab('transfers')} className={`inv-tab-btn${activeTab === 'transfers' ? ' inv-tab-active' : ''}`}>
                            <ArrowRightLeft size={13} />
                            Transfers
                        </button>
                    )}
                </div>

                {activeTab === 'purchases' ? (
                    <PurchaseBillsTab />
                ) : activeTab === 'ledger' ? (
                    <StockLedgerTab />
                ) : activeTab === 'offers' ? (
                    <OffersTab />
                ) : activeTab === 'transfers' ? (
                    <BranchTransfersTab />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Header stats */}
                        <div className="inv-stats-grid">
                            {[
                                { l: 'Total Items', v: String(products.length), icon: Package, color: '#FBBC04' },
                                { l: 'Stock Value', v: `₹${stockValue.toLocaleString('en-IN')}`, icon: ArrowUp, color: '#34A853' },
                                { l: 'Low Stock', v: String(lowStock.length), icon: AlertTriangle, color: '#EA4335' },
                            ].map(({ l, v, icon: Icon, color }) => (
                                <div key={l} className="card inv-stats-card">
                                    <div className="inv-stats-icon-wrapper" style={{ background: color + '15' }}>
                                        <Icon size={14} color={color} />
                                    </div>
                                    <div style={{ minWidth: 0, flex: 1, width: '100%' }}>
                                        <p className="inv-stats-label">{l}</p>
                                        <p className="inv-stats-value">{v}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="controls-container">
                            <div className="search-bar-wrapper">
                                <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                                <input className="e-input" placeholder="Search items, barcode…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34, width: '100%' }} />
                            </div>
                            
                            {/* Godown filter */}
                            {godowns.length > 1 && (
                                <div className="godown-filters-container">
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

                            <button onClick={() => { exportCSV(); }} className="btn btn-outline btn-sm btn-sec" style={{ gap: 5 }}><Download size={13} /> Export</button>
                            <button onClick={() => setShowImport(true)} className="btn btn-outline btn-sm btn-sec" style={{ gap: 5 }}><Upload size={13} /> Import CSV</button>
                            
                            <Link href="/company/inventory/expiry" className="btn btn-outline btn-sm btn-sec" style={{ gap: 5, color: '#D97706', borderColor: '#FDE68A', background: '#FFFBEB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Calendar size={13} /> Expiry
                            </Link>
                            
                            <Link href="/company/inventory/purchase-orders" className="btn btn-outline btn-sm btn-sec" style={{ gap: 5, color: '#7C3AED', borderColor: '#E9D5FF', background: '#FAF5FF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShoppingCart size={13} /> Purchase Orders
                            </Link>
                            
                            {godowns.length > 1 && (
                                <button onClick={() => setShowTransfer(true)} className="btn btn-outline btn-sm btn-sec" style={{ gap: 5, color: '#9333EA', borderColor: '#E9D8FD', background: '#FAF5FF' }}>
                                    <ArrowRightLeft size={13} /> Transfer
                                </button>
                            )}

                            {selectedItems.length > 0 && (
                                <button onClick={handleBulkDelete} className="btn btn-sm btn-danger-action" style={{ gap: 5, background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' }}>
                                    <Trash2 size={13} /> Delete ({selectedItems.length})
                                </button>
                            )}

                            <button onClick={() => {
                                if (!canScan) {
                                    toast('AI Scanning requires the Premium Plan. Upgrade in Subscription settings.', { icon: '🔒' });
                                    return;
                                }
                                setShowAIAdd(true);
                            }} className="btn btn-sm btn-primary-action" style={{ background: canScan ? 'linear-gradient(135deg, #1A1A2E, #4285F4)' : '#E2E8F0', color: canScan ? 'white' : '#A0AEC0', borderColor: canScan ? '#1A1A2E' : '#E2E8F0', gap: 5, cursor: canScan ? 'pointer' : 'not-allowed' }}>
                                <ScanLine size={13} /> AI Scan Item {!canScan && '🔒'}
                            </button>

                            <button onClick={() => { setEditProduct(null); setForm(emptyForm); setShowAdd(true); }} className="btn btn-blue btn-sm btn-primary-action" style={{ gap: 5 }}>
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
                                                    <input type="checkbox" checked={groupedFiltered.length > 0 && selectedItems.length === groupedFiltered.length} onChange={toggleAllSelection} style={{ cursor: 'pointer', transform: 'scale(1.2)' }} />
                                                </th>
                                                <th>Item</th><th>HSN</th><th>Category</th><th>Stock</th><th>Godown</th><th>Purchase</th><th>Selling</th><th>GST</th><th>Actions</th>
                                            </tr></thead>
                                            <tbody>
                                                {groupedFiltered.map((p: any) => <InventoryRow key={p.id} p={p} companyId={companyId} onDelete={handleDelete} onEdit={openEdit} godowns={godowns} isSelected={selectedItems.includes(p.id)} onToggle={toggleItemSelection} invoices={invoices} offers={company?.offers || []} onQrSelect={setSelectedQrProduct} company={company} isSubBranch={isSubBranchLogin} />)}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mobile-list">
                                        {groupedFiltered.length > 0 && (
                                            <div style={{ padding: '12px 16px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <input type="checkbox" checked={selectedItems.length === groupedFiltered.length} onChange={toggleAllSelection} style={{ cursor: 'pointer', transform: 'scale(1.2)' }} />
                                                <span style={{ fontSize: 13, fontWeight: 700, color: '#4A5568' }}>Select All Items</span>
                                            </div>
                                        )}
                                        {groupedFiltered.map((p: any) => {
                                            const isSelected = selectedItems.includes(p.id);
                                            const daysLeft = predictStockDays(p.stockQty, invoices, p.id);
                                            return (
                                                <div key={p.id} onClick={() => toggleItemSelection(p.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid #F1F3F5', background: isSelected ? '#F8FBFF' : 'white', cursor: 'pointer', transition: 'background 0.2s' }}>
                                                    <input type="checkbox" checked={isSelected} onChange={() => { }} style={{ cursor: 'pointer', transform: 'scale(1.1)', flexShrink: 0 }} onClick={e => e.stopPropagation()} />
                                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #FEF7E0, #FFFBEB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#B45309', flexShrink: 0, fontSize: 14 }}>{p.name[0]}</div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <p style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                                                        <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexWrap: 'wrap' }}>
                                                            <span className="badge badge-gray" style={{ fontSize: 9, padding: '1px 4px' }}>{p.unit}</span>
                                                            <span className="badge badge-blue" style={{ fontSize: 9, padding: '1px 4px' }}>GST {p.gstRate}%</span>
                                                            {(company?.offers || []).filter((o: any) => 
                                                                (o.type === 'bogo' && (o.buyProductId === p.id || o.getProductId === p.id)) ||
                                                                (o.type === 'discount' && o.buyProductId === p.id) ||
                                                                (o.type === 'combo' && o.comboProductIds?.includes(p.id))
                                                            ).map((o: any) => (
                                                                <span key={o.id} style={{ fontSize: 8, fontWeight: 800, padding: '1px 4px', borderRadius: 4, background: '#E6FFFA', color: '#00A389', border: '1px solid #B2F5EA' }}>
                                                                    🎁 {o.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        {company?.franchiseEnabled && !isSubBranchLogin && (
                                                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                                                                <span style={{ fontSize: 8, fontWeight: 800, padding: '2px 5px', borderRadius: 4, background: '#F1F5F9', color: '#475569' }}>
                                                                    Total: {p.stockQty}
                                                                </span>
                                                                {(company.branches || []).map((b: any) => (
                                                                    <span key={b.id} style={{ fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 4, background: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE' }}>
                                                                        📍 {b.name}: {p.branchStock?.[b.id] ?? 0}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minHeight: 48 }}>
                                                        <div>
                                                            <p style={{ fontWeight: 900, fontSize: 14, color: '#34A853', margin: 0 }}>₹{p.sellingPrice}</p>
                                                            {(!company?.franchiseEnabled || isSubBranchLogin) && (
                                                                <p style={{ fontSize: 10, fontWeight: 700, color: p.stockQty <= p.lowStockAlertQty ? '#EA4335' : '#718096', margin: '2px 0 0' }}>{p.stockQty} in stock</p>
                                                            )}
                                                            {daysLeft !== null && <p style={{ fontSize: 9, color: daysLeft < 7 ? '#EA4335' : '#34A853', fontWeight: 800, margin: '2px 0 0' }}>Est. {daysLeft}d</p>}
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
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
                                    {company?.franchiseEnabled && (
                                        <div style={{ gridColumn: '1/-1', borderTop: '1px solid #E2E8F0', paddingTop: 14, marginTop: 4 }}>
                                            <h4 style={{ fontSize: 11, fontWeight: 800, color: '#1A1A2E', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Branch Inventory & Price Overrides</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                {(company.branches || []).map((b: any) => {
                                                    const bStock = form.branchStock?.[b.id] ?? '';
                                                    const bPrice = form.branchPrice?.[b.id] ?? '';
                                                    return (
                                                        <div key={b.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 10, alignItems: 'center', background: '#F8FAFC', padding: 10, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                                                            <span style={{ fontSize: 12, fontWeight: 700, color: '#2D3748' }}>📍 {b.name}</span>
                                                            <div>
                                                                <label style={{ fontSize: 9, fontWeight: 700, color: '#718096', display: 'block', marginBottom: 2 }}>BRANCH STOCK</label>
                                                                <input
                                                                    type="number"
                                                                    className="e-input"
                                                                    style={{ padding: '6px 10px', fontSize: 12 }}
                                                                    placeholder="0"
                                                                    value={bStock}
                                                                    onChange={e => {
                                                                        const nextStock = { ...(form.branchStock || {}) };
                                                                        nextStock[b.id] = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
                                                                        up('branchStock', nextStock);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label style={{ fontSize: 9, fontWeight: 700, color: '#718096', display: 'block', marginBottom: 2 }}>SELLING PRICE</label>
                                                                <input
                                                                    type="number"
                                                                    className="e-input"
                                                                    style={{ padding: '6px 10px', fontSize: 12 }}
                                                                    placeholder={`Default ₹${form.sellingPrice || 0}`}
                                                                    value={bPrice}
                                                                    onChange={e => {
                                                                        const nextPrice = { ...(form.branchPrice || {}) };
                                                                        if (e.target.value === '') {
                                                                            delete nextPrice[b.id];
                                                                        } else {
                                                                            nextPrice[b.id] = parseFloat(e.target.value) || 0;
                                                                        }
                                                                        up('branchPrice', nextPrice);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
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

                /* ── Dynamic responsive label visibility ── */
                .mobile-only-inline { display: inline; }
                .desktop-only-inline { display: none; }
                @media (min-width: 640px) {
                    .mobile-only-inline { display: none; }
                    .desktop-only-inline { display: inline; }
                }

                /* ── Inventory tab bar ─────────────────────────────── */
                .inv-tab-bar {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 6px;
                    background: #F1F5F9;
                    border-radius: 14px;
                    padding: 5px;
                    margin-bottom: 4px;
                }
                .inv-tab-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    padding: 8px 6px;
                    border: none;
                    border-radius: 10px;
                    background: transparent;
                    font-size: 11px;
                    font-weight: 700;
                    color: #718096;
                    cursor: pointer;
                    transition: all 0.18s cubic-bezier(0.4,0,0.2,1);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .inv-tab-active {
                    background: white;
                    color: #1A1A2E;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                @media (min-width: 480px) and (max-width: 639px) {
                    .inv-tab-bar {
                        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    }
                }

                @media (min-width: 640px) {
                    .inv-tab-bar {
                        display: flex;
                        grid-template-columns: unset;
                        gap: 0;
                        background: transparent;
                        border-radius: 0;
                        padding: 0;
                        border-bottom: 1px solid #E2E8F0;
                        margin-bottom: 8px;
                    }
                    .inv-tab-btn {
                        padding: 10px 20px;
                        border-radius: 0;
                        background: none;
                        font-size: 13px;
                        font-weight: 600;
                        color: #A0AEC0;
                        border-bottom: 3px solid transparent;
                        box-shadow: none;
                        overflow: visible;
                    }
                    .inv-tab-active {
                        background: none;
                        color: #1A1A2E;
                        font-weight: 900;
                        border-bottom: 3px solid #4285F4;
                        box-shadow: none;
                    }
                }

                /* ── Compact Header Stats (Mobile friendly columns) ── */
                .inv-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    width: 100%;
                }
                .inv-stats-card {
                    padding: 8px 6px !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    text-align: center;
                    gap: 4px !important;
                    border-radius: 12px !important;
                    min-width: 0;
                }
                .inv-stats-icon-wrapper {
                    width: 28px !important;
                    height: 28px !important;
                    border-radius: 8px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    margin-bottom: 2px;
                }
                .inv-stats-label {
                    font-size: 8px !important;
                    font-weight: 700;
                    color: #A0AEC0;
                    text-transform: uppercase;
                    margin: 0 !important;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                }
                .inv-stats-value {
                    font-size: 13px !important;
                    font-weight: 900;
                    color: #1A1A2E;
                    margin: 0 !important;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                }

                @media (min-width: 640px) {
                    .inv-stats-grid {
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                        gap: 14px;
                    }
                    .inv-stats-card {
                        padding: 18px 20px !important;
                        flex-direction: row !important;
                        align-items: center !important;
                        text-align: left;
                        gap: 14px !important;
                        border-radius: 16px !important;
                    }
                    .inv-stats-icon-wrapper {
                        width: 44px !important;
                        height: 44px !important;
                        border-radius: 12px !important;
                        margin-bottom: 0;
                    }
                    .inv-stats-label {
                        font-size: 10px !important;
                        margin-bottom: 4px !important;
                    }
                    .inv-stats-value {
                        font-size: 20px !important;
                    }
                }

                /* ── Controls & Flat Actions layout ── */
                .controls-container {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;
                }
                .search-bar-wrapper {
                    flex: 1;
                    min-width: 200px;
                    position: relative;
                }
                .godown-filters-container {
                    display: flex;
                    gap: 6px;
                }

                @media (max-width: 767px) {
                    .controls-container {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 8px;
                        width: 100%;
                    }
                    .search-bar-wrapper {
                        grid-column: span 2;
                        width: 100%;
                        min-width: 0;
                    }
                    .godown-filters-container {
                        grid-column: span 2;
                        gap: 8px;
                        overflow-x: auto;
                        padding-bottom: 4px;
                        scrollbar-width: none;
                    }
                    .godown-filters-container::-webkit-scrollbar {
                        display: none;
                    }
                    .btn-primary-action {
                        grid-column: span 1;
                        width: 100%;
                        height: 38px;
                        font-size: 12px !important;
                        justify-content: center;
                    }
                    .btn-danger-action {
                        grid-column: span 2;
                        width: 100%;
                        height: 38px;
                        font-size: 12px !important;
                        justify-content: center;
                    }
                    .btn-sec {
                        grid-column: span 1;
                        width: 100%;
                        height: 34px;
                        font-size: 11px !important;
                        justify-content: center;
                    }
                }

                .godown-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px 12px;
                    border-radius: 20px;
                    border: 1.5px solid #E2E8F0;
                    background: white;
                    font-size: 12px;
                    font-weight: 700;
                    color: #718096;
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .godown-chip.active {
                    background: #EBF4FF;
                    color: #4285F4;
                    border-color: #4285F4;
                }
            `}</style>
            {selectedQrProduct && (
                <QrLabelModal
                    product={selectedQrProduct}
                    company={company}
                    onClose={() => setSelectedQrProduct(null)}
                />
            )}
        </>
    );
}

function OffersTab() {
    const { activeCompanyId, addOfferScheme, deleteOfferScheme } = useStore();
    const company = useActiveCompany();
    const products = useCompanyData('products') as Product[];
    
    const [showAddOffer, setShowAddOffer] = useState(false);
    const [offerType, setOfferType] = useState<'bogo' | 'discount' | 'combo'>('bogo');
    const [offerName, setOfferName] = useState('');
    
    // BOGO inputs
    const [buyProduct, setBuyProduct] = useState('');
    const [buyQty, setBuyQty] = useState('1');
    const [getProduct, setGetProduct] = useState('');
    const [getQty, setGetQty] = useState('1');
    const [bogoDiscount, setBogoDiscount] = useState('100'); // 100% discount on the getProduct

    // Discount inputs
    const [discProduct, setDiscProduct] = useState('');
    const [discPercent, setDiscPercent] = useState('50'); // e.g. 50%

    // Combo inputs
    const [comboProducts, setComboProducts] = useState<string[]>([]);
    const [comboPrice, setComboPrice] = useState('');

    const activeOffers = company?.offers || [];

    const handleCreateOffer = () => {
        if (!offerName.trim()) { toast.error('Enter an offer name'); return; }
        
        let offerData: any = {
            type: offerType,
            name: offerName,
            isActive: true
        };

        if (offerType === 'bogo') {
            if (!buyProduct || !getProduct) { toast.error('Please select both buy and get products'); return; }
            offerData.buyProductId = buyProduct;
            offerData.buyQty = parseInt(buyQty) || 1;
            offerData.getProductId = getProduct;
            offerData.getQty = parseInt(getQty) || 1;
            offerData.discountPercent = parseFloat(bogoDiscount) || 100;
        } else if (offerType === 'discount') {
            if (!discProduct) { toast.error('Please select a product'); return; }
            offerData.buyProductId = discProduct; // reuse buyProductId
            offerData.discountPercent = parseFloat(discPercent) || 50;
        } else if (offerType === 'combo') {
            if (comboProducts.length < 2) { toast.error('Please select at least 2 products for the combo'); return; }
            if (!comboPrice || parseFloat(comboPrice) <= 0) { toast.error('Enter a valid combo price'); return; }
            offerData.comboProductIds = comboProducts;
            offerData.comboPrice = parseFloat(comboPrice) || 0;
        }

        addOfferScheme(activeCompanyId!, offerData);
        toast.success(`Offer "${offerName}" created successfully!`);
        setShowAddOffer(false);
        // Reset form
        setOfferName('');
        setBuyProduct('');
        setBuyQty('1');
        setGetProduct('');
        setGetQty('1');
        setBogoDiscount('100');
        setDiscProduct('');
        setDiscPercent('50');
        setComboProducts([]);
        setComboPrice('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E', margin: 0 }}>Schemes & Offers Manager</h2>
                    <p style={{ fontSize: 13, color: '#718096', margin: '4px 0 0' }}>Configure BOGO, percentage discounts, and combo bundle offers for your catalog.</p>
                </div>
                <button onClick={() => setShowAddOffer(true)} className="btn btn-blue btn-sm" style={{ gap: 5 }}>
                    <Plus size={13} /> Create Offer
                </button>
            </div>

            {/* Active Offers List */}
            <div className="card" style={{ padding: 20 }}>
                {activeOffers.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <Gift size={40} style={{ color: '#E2E8F0', margin: '0 auto 12px' }} />
                        <p style={{ color: '#A0AEC0', fontWeight: 600, fontSize: 14, margin: 0 }}>No active offers configured yet.</p>
                        <button onClick={() => setShowAddOffer(true)} className="btn btn-blue btn-sm" style={{ display: 'inline-flex', marginTop: 12, gap: 5 }}>
                            <Plus size={13} /> Add Offer
                        </button>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="e-table">
                            <thead>
                                <tr>
                                    <th>Offer Name</th>
                                    <th>Type</th>
                                    <th>Details</th>
                                    <th style={{ width: 100, textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeOffers.map((o: any) => {
                                    let detailsText = '';
                                    if (o.type === 'bogo') {
                                        const buyP = products.find(p => p.id === o.buyProductId)?.name || 'Unknown Item';
                                        const getP = products.find(p => p.id === o.getProductId)?.name || 'Unknown Item';
                                        detailsText = `Buy ${o.buyQty} of "${buyP}" and get ${o.getQty} of "${getP}" at ${o.discountPercent}% off`;
                                    } else if (o.type === 'discount') {
                                        const buyP = products.find(p => p.id === o.buyProductId)?.name || 'Unknown Item';
                                        detailsText = `Flat ${o.discountPercent}% Off on "${buyP}"`;
                                    } else if (o.type === 'combo') {
                                        const itemsText = o.comboProductIds.map((pid: string) => products.find(p => p.id === pid)?.name || 'Unknown Item').join(' + ');
                                        detailsText = `Get [ ${itemsText} ] together for a combo price of ₹${o.comboPrice}`;
                                    }

                                    return (
                                        <tr key={o.id}>
                                            <td style={{ fontWeight: 800, color: '#1A1A2E' }}>{o.name}</td>
                                            <td>
                                                <span className={`badge ${o.type === 'bogo' ? 'badge-green' : o.type === 'discount' ? 'badge-blue' : 'badge-gray'}`} style={{ textTransform: 'uppercase' }}>
                                                    {o.type}
                                                </span>
                                            </td>
                                            <td style={{ fontSize: 13, color: '#4A5568' }}>{detailsText}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button onClick={() => deleteOfferScheme(activeCompanyId!, o.id)} className="btn btn-ghost btn-icon" style={{ color: '#EA4335', padding: 6 }}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Offer Modal */}
            {showAddOffer && (
                <div className="modal-overlay" onClick={() => setShowAddOffer(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17, color: '#1A1A2E', margin: 0 }}>Create Promotional Offer</h3>
                            <button onClick={() => setShowAddOffer(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <div style={{ overflowY: 'auto', padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Offer Name *</label>
                                <input className="e-input" placeholder="e.g. Soap Buy 1 Get 1 Free" value={offerName} onChange={e => setOfferName(e.target.value)} />
                            </div>

                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Offer Type</label>
                                <div style={{ display: 'flex', gap: 8, background: '#EDF2F7', padding: 4, borderRadius: 10 }}>
                                    {[
                                        { key: 'bogo', label: 'BOGO / Free' },
                                        { key: 'discount', label: 'Flat % Off' },
                                        { key: 'combo', label: 'Combo Deal' }
                                    ].map(t => (
                                        <button key={t.key} onClick={() => setOfferType(t.key as any)}
                                            style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 12, background: offerType === t.key ? '#4285F4' : 'transparent', color: offerType === t.key ? 'white' : '#718096', transition: 'all 0.15s' }}>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* BOGO Inputs */}
                            {offerType === 'bogo' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
                                        <div>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Buy Product *</label>
                                            <select className="e-select" value={buyProduct} onChange={e => setBuyProduct(e.target.value)}>
                                                <option value="">Select Product...</option>
                                                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Qty *</label>
                                            <input type="number" min="1" className="e-input" value={buyQty} onChange={e => setBuyQty(e.target.value)} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
                                        <div>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Get Product *</label>
                                            <select className="e-select" value={getProduct} onChange={e => setGetProduct(e.target.value)}>
                                                <option value="">Select Product...</option>
                                                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Qty *</label>
                                            <input type="number" min="1" className="e-input" value={getQty} onChange={e => setGetQty(e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Discount % on Free Product (100 = Free) *</label>
                                        <input type="number" min="1" max="100" className="e-input" value={bogoDiscount} onChange={e => setBogoDiscount(e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {/* Flat % Off Inputs */}
                            {offerType === 'discount' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Select Product *</label>
                                        <select className="e-select" value={discProduct} onChange={e => setDiscProduct(e.target.value)}>
                                            <option value="">Select Product...</option>
                                            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Discount Percentage (%) *</label>
                                        <input type="number" min="1" max="100" className="e-input" value={discPercent} onChange={e => setDiscPercent(e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {/* Combo Pack Inputs */}
                            {offerType === 'combo' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Products in Combo *</label>
                                        <p style={{ fontSize: 11, color: '#718096', marginBottom: 8 }}>Hold Ctrl (or Cmd) to select multiple products.</p>
                                        <select
                                            multiple
                                            className="e-select"
                                            style={{ height: 160 }}
                                            value={comboProducts}
                                            onChange={e => {
                                                const opts = Array.from(e.target.selectedOptions, o => o.value);
                                                setComboProducts(opts);
                                            }}
                                        >
                                            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Combo Package Price (₹) *</label>
                                        <input type="number" min="1" className="e-input" placeholder="Combo Total Price" value={comboPrice} onChange={e => setComboPrice(e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '14px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 10, justifyContent: 'flex-end', flexShrink: 0 }}>
                            <button onClick={() => setShowAddOffer(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleCreateOffer} className="btn btn-blue">Save Offer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function BranchTransfersTab() {
    const { 
        activeCompanyId, activeBranchId, isSubBranchLogin, stockTransfers = [], 
        addStockTransfer, approveStockTransfer, rejectStockTransfer, products 
    } = useStore();
    const company = useActiveCompany();
    const companyId = activeCompanyId;

    const [showModal, setShowModal] = useState(false);
    const [productId, setProductId] = useState('');
    const [fromBranchId, setFromBranchId] = useState('');
    const [toBranchId, setToBranchId] = useState('');
    const [qty, setQty] = useState('');

    const filteredTransfers = useMemo(() => {
        const companyTransfers = (stockTransfers || []).filter(t => t.companyId === companyId);
        if (isSubBranchLogin) {
            return companyTransfers.filter(t => t.fromBranchId === activeBranchId || t.toBranchId === activeBranchId);
        }
        return companyTransfers;
    }, [stockTransfers, companyId, isSubBranchLogin, activeBranchId]);

    const handleCreateTransfer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!productId || !fromBranchId || !toBranchId || !qty) {
            toast.error('All fields are required');
            return;
        }
        if (fromBranchId === toBranchId) {
            toast.error('Source and destination branches cannot be the same');
            return;
        }
        const transferQtyNum = parseFloat(qty);
        if (isNaN(transferQtyNum) || transferQtyNum <= 0) {
            toast.error('Invalid quantity');
            return;
        }

        const selectedProduct = products.find(p => p.id === productId);
        if (!selectedProduct) {
            toast.error('Product not found');
            return;
        }

        const sourceStock = isSubBranchLogin 
            ? (selectedProduct.branchStock?.[fromBranchId] ?? 0)
            : (fromBranchId === 'head_office' ? selectedProduct.stockQty : (selectedProduct.branchStock?.[fromBranchId] ?? 0));
        
        if (sourceStock < transferQtyNum) {
            toast.error(`Insufficient stock in source branch/office. Available: ${sourceStock}`);
            return;
        }

        addStockTransfer({
            companyId: companyId!,
            fromBranchId,
            toBranchId,
            productId,
            productName: selectedProduct.name,
            qty: transferQtyNum
        });

        toast.success('Stock transfer request submitted!');
        setShowModal(false);
        setProductId('');
        setQty('');
        setToBranchId('');
    };

    const getBranchName = (id: string) => {
        if (id === 'head_office' || !id) return 'Head Office';
        return company?.branches?.find((b: any) => b.id === id)?.name || 'Unknown Branch';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E' }}>Branch Stock Movements</h3>
                <button onClick={() => {
                    setShowModal(true);
                    if (isSubBranchLogin) {
                        setFromBranchId(activeBranchId || '');
                    }
                }} className="btn btn-blue btn-sm" style={{ gap: 5 }}>
                    <Plus size={13} /> Request Transfer
                </button>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                {filteredTransfers.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
                        <ArrowRightLeft size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                        <p style={{ fontWeight: 600 }}>No stock transfers found</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="e-table" style={{ minWidth: 600 }}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Product</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Qty</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransfers.map((t) => {
                                    const statusColors: Record<'pending' | 'approved' | 'rejected', { bg: string; text: string }> = {
                                        pending: { bg: '#FEF3C7', text: '#D97706' },
                                        approved: { bg: '#D1FAE5', text: '#059669' },
                                        rejected: { bg: '#FEE2E2', text: '#DC2626' }
                                    };
                                    const colors = statusColors[t.status] || { bg: '#F3F4F6', text: '#374151' };

                                    return (
                                        <tr key={t.id}>
                                            <td style={{ fontSize: 12, color: '#718096' }}>
                                                {new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td style={{ fontWeight: 700 }}>{t.productName}</td>
                                            <td>{getBranchName(t.fromBranchId)}</td>
                                            <td>{getBranchName(t.toBranchId)}</td>
                                            <td style={{ fontWeight: 800 }}>{t.qty}</td>
                                            <td>
                                                <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 999, background: colors.bg, color: colors.text, textTransform: 'uppercase' }}>
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td>
                                                {t.status === 'pending' && (
                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                        {!isSubBranchLogin ? (
                                                            <>
                                                                <button onClick={() => {
                                                                    approveStockTransfer(t.id);
                                                                    toast.success('Transfer request approved!');
                                                                }} className="btn btn-sm btn-blue" style={{ padding: '4px 8px', fontSize: 11, background: '#10B981', border: 'none' }}>
                                                                    Approve
                                                                </button>
                                                                <button onClick={() => {
                                                                    rejectStockTransfer(t.id);
                                                                    toast.success('Transfer request rejected');
                                                                }} className="btn btn-sm btn-outline" style={{ padding: '4px 8px', fontSize: 11, color: '#EF4444', borderColor: '#FCA5A5' }}>
                                                                    Reject
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <span style={{ fontSize: 11, color: '#A0AEC0', fontStyle: 'italic' }}>Pending HO Approval</span>
                                                        )}
                                                    </div>
                                                )}
                                                {t.status !== 'pending' && <span style={{ fontSize: 11, color: '#A0AEC0' }}>Processed</span>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 450 }}>
                        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 17 }}>New Transfer Request</h3>
                            <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-icon"><X size={18} /></button>
                        </div>
                        <form onSubmit={handleCreateTransfer} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Select Product</label>
                                <select className="e-select" value={productId} onChange={e => setProductId(e.target.value)} required>
                                    <option value="">-- Choose Product --</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} (Available: {isSubBranchLogin ? (p.branchStock?.[activeBranchId || ''] ?? 0) : p.stockQty})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>From Branch</label>
                                    {isSubBranchLogin ? (
                                        <input className="e-input" value={getBranchName(activeBranchId || '')} disabled style={{ background: '#F3F4F6' }} />
                                    ) : (
                                        <select className="e-select" value={fromBranchId} onChange={e => setFromBranchId(e.target.value)} required>
                                            <option value="">-- Source --</option>
                                            <option value="head_office">Head Office</option>
                                            {(company?.branches || []).map((b: any) => (
                                                <option key={b.id} value={b.id}>{b.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>To Branch</label>
                                    <select className="e-select" value={toBranchId} onChange={e => setToBranchId(e.target.value)} required>
                                        <option value="">-- Destination --</option>
                                        <option value="head_office">Head Office</option>
                                        {(company?.branches || []).map((b: any) => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>Transfer Quantity</label>
                                <input type="number" className="e-input" placeholder="Enter transfer qty" value={qty} onChange={e => setQty(e.target.value)} required />
                            </div>

                            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                                <button type="submit" className="btn btn-blue">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
