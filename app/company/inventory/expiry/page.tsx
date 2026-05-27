'use client';
import { useRouter } from 'next/navigation';
import { useCompanyData } from '@/lib/store';
import type { Product, Batch } from '@/lib/types';
import { ArrowLeft, AlertTriangle, Calendar, Package } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ExpiryCalendarPage() {
    const router = useRouter();
    const products = useCompanyData('products') as Product[];

    const today = new Date().toISOString().slice(0, 10);
    const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    const in90 = new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10);

    // Flatten all batches with product info
    type BatchEntry = Batch & { productName: string; productId: string; unit: string };
    const allBatches: BatchEntry[] = [];
    products.forEach(p => {
        (p.batches || []).forEach(b => {
            if (b.expiryDate) {
                allBatches.push({ ...b, productName: p.name, productId: p.id, unit: p.unit });
            }
        });
    });

    const daysUntil = (d: string) => Math.floor((new Date(d).getTime() - Date.now()) / 86400000);

    const expired    = allBatches.filter(b => b.expiryDate! < today).sort((a, b) => a.expiryDate!.localeCompare(b.expiryDate!));
    const soon       = allBatches.filter(b => b.expiryDate! >= today && b.expiryDate! <= in30).sort((a, b) => a.expiryDate!.localeCompare(b.expiryDate!));
    const upcoming   = allBatches.filter(b => b.expiryDate! > in30 && b.expiryDate! <= in90).sort((a, b) => a.expiryDate!.localeCompare(b.expiryDate!));
    const safe       = allBatches.filter(b => b.expiryDate! > in90).sort((a, b) => a.expiryDate!.localeCompare(b.expiryDate!));

    const Section = ({ title, items, color, bg, badge }: { title: string; items: BatchEntry[]; color: string; bg: string; badge: string }) => {
        if (items.length === 0) return null;
        return (
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ padding: '4px 12px', borderRadius: 8, background: bg, color, fontWeight: 800, fontSize: 12 }}>{badge}</span>
                    <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>{title}</h2>
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>({items.length})</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map(b => (
                        <div key={b.id} onClick={() => router.push(`/company/inventory/${b.productId}`)}
                            style={{ background: 'white', border: `1.5px solid ${bg}`, borderLeft: `4px solid ${color}`, borderRadius: 12, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)')}
                            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                        >
                            <div>
                                <p style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E', marginBottom: 2 }}>{b.productName}</p>
                                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#718096' }}>
                                    <span>Batch: <strong>{b.batchNo}</strong></span>
                                    <span>Qty: <strong>{b.qty} {b.unit}</strong></span>
                                    {b.mfgDate && <span>Mfg: {formatDate(b.mfgDate)}</span>}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: 900, fontSize: 15, color, margin: 0 }}>
                                    {daysUntil(b.expiryDate!) < 0 ? `${Math.abs(daysUntil(b.expiryDate!))} days ago` : `${daysUntil(b.expiryDate!)} days left`}
                                </p>
                                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{formatDate(b.expiryDate!)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#718096', display: 'flex' }}>
                    <ArrowLeft size={20} />
                </button>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={22} color="#D97706" />
                </div>
                <div>
                    <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E', margin: 0 }}>Expiry Calendar</h1>
                    <p style={{ fontSize: 12, color: '#718096', margin: '2px 0 0' }}>All batches sorted by expiry date · click a batch to manage</p>
                </div>
            </div>

            {/* Summary pills */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                {[
                    { label: `${expired.length} Expired`, color: '#DC2626', bg: '#FEE2E2' },
                    { label: `${soon.length} Expiring ≤30d`, color: '#D97706', bg: '#FEF3C7' },
                    { label: `${upcoming.length} Within 90d`, color: '#4285F4', bg: '#DBEAFE' },
                    { label: `${safe.length} Safe`, color: '#34A853', bg: '#DCFCE7' },
                ].map(s => (
                    <span key={s.label} style={{ padding: '6px 14px', borderRadius: 8, background: s.bg, color: s.color, fontWeight: 800, fontSize: 13 }}>{s.label}</span>
                ))}
            </div>

            {allBatches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: '#A0AEC0' }}>
                    <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                    <p style={{ fontWeight: 700, fontSize: 16 }}>No batches with expiry dates found</p>
                    <p style={{ fontSize: 13 }}>Add batches with expiry dates from the product detail page.</p>
                </div>
            ) : (
                <>
                    <Section title="Expired"           items={expired}  color="#DC2626" bg="#FEE2E2" badge="🔴 EXPIRED" />
                    <Section title="Expiring within 30 days" items={soon} color="#D97706" bg="#FEF3C7" badge="🟡 SOON" />
                    <Section title="Expiring within 90 days" items={upcoming} color="#4285F4" bg="#DBEAFE" badge="🔵 UPCOMING" />
                    <Section title="Safe (beyond 90 days)" items={safe} color="#34A853" bg="#DCFCE7" badge="🟢 SAFE" />
                </>
            )}
        </div>
    );
}
