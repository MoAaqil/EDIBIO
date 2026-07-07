'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import type { AgencyClient, AgencyProject, Invoice } from '@/lib/types';
import { Briefcase, CreditCard, FileText, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function ClientPortalContent() {
    const searchParams = useSearchParams();
    const clientId = searchParams.get('clientId');
    const { agencyClients, agencyProjects, invoices, companies } = useStore();

    const [client, setClient] = useState<AgencyClient | null>(null);
    const [projects, setProjects] = useState<AgencyProject[]>([]);
    const [clientInvoices, setClientInvoices] = useState<Invoice[]>([]);
    const [company, setCompany] = useState<any>(null);

    useEffect(() => {
        if (!clientId) return;
        const c = agencyClients.find(x => x.id === clientId);
        if (c) {
            setClient(c);
            setProjects(agencyProjects.filter(p => p.clientId === c.id));
            setClientInvoices(invoices.filter(i => i.partyId === c.id));
            setCompany(companies.find(comp => comp.id === c.companyId));
        }
    }, [clientId, agencyClients, agencyProjects, invoices, companies]);

    if (!clientId) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Invalid Portal Link...</div>;
    }

    if (!client) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Loading Portal...</div>;
    }

    const totalInvoiced = clientInvoices.reduce((a, i) => a + i.grandTotal, 0);
    const totalPaid = clientInvoices.reduce((a, i) => a + i.amountPaid, 0);
    const balanceDue = totalInvoiced - totalPaid;

    return (
        <div style={{ minHeight: '100dvh', background: '#F8FAFC', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, background: 'white', padding: '24px 32px', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 60, height: 60, borderRadius: 16, background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <Image src="/logo.png" alt="Company Logo" width={40} height={40} />
                        </div>
                        <div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client Portal</p>
                            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E', margin: 0 }}>{company?.name || 'Agency'}</h1>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 13, color: '#718096' }}>Welcome back,</p>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>{client.clientName} {client.businessName ? `(${client.businessName})` : ''}</h2>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 20 }}>
                    {/* Summary Cards */}
                    <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)', borderRadius: 20, padding: 24, color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <CreditCard size={100} style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.1 }} />
                        <p style={{ fontSize: 13, color: '#A0AEC0', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Outstanding Balance</p>
                        <h2 style={{ fontSize: 36, fontWeight: 900, margin: 0, color: balanceDue > 0 ? '#EA4335' : '#34A853' }}>
                            ₹{balanceDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </h2>
                        {balanceDue > 0 && <button className="btn" style={{ background: 'white', color: '#1A1A2E', marginTop: 16, border: 'none', fontWeight: 800 }}>Pay Now</button>}
                    </div>

                    <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ background: '#E8F0FE', padding: 10, borderRadius: 12 }}><Briefcase size={20} color="#4285F4" /></div>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Active Projects</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {projects.filter(p => p.status === 'ongoing').length === 0 ? (
                                <p style={{ fontSize: 13, color: '#718096' }}>No active projects.</p>
                            ) : projects.filter(p => p.status === 'ongoing').map(p => (
                                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F3F5', paddingBottom: 12 }}>
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>{p.projectName}</p>
                                        <p style={{ fontSize: 11, color: '#A0AEC0', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {p.deadline ? `Due ${new Date(p.deadline).toLocaleDateString()}` : 'No deadline'}</p>
                                    </div>
                                    <span className="badge badge-blue">In Progress</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Invoices */}
                <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ background: '#FEF3C7', padding: 10, borderRadius: 12 }}><FileText size={20} color="#D97706" /></div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Invoices & Billing History</h3>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #F1F3F5' }}>
                                    <th style={{ padding: '12px 16px', fontSize: 12, color: '#718096', fontWeight: 800 }}>INV #</th>
                                    <th style={{ padding: '12px 16px', fontSize: 12, color: '#718096', fontWeight: 800 }}>DATE</th>
                                    <th style={{ padding: '12px 16px', fontSize: 12, color: '#718096', fontWeight: 800 }}>AMOUNT</th>
                                    <th style={{ padding: '12px 16px', fontSize: 12, color: '#718096', fontWeight: 800 }}>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientInvoices.length === 0 ? (
                                    <tr><td colSpan={4} style={{ padding: 20, textAlign: 'center', color: '#A0AEC0', fontSize: 13 }}>No invoices found.</td></tr>
                                ) : clientInvoices.map(inv => (
                                    <tr key={inv.id} style={{ borderBottom: '1px solid #F8F9FA' }}>
                                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#4285F4', fontSize: 13 }}>{inv.invoiceNumber}</td>
                                        <td style={{ padding: '14px 16px', color: '#4A5568', fontSize: 13 }}>{new Date(inv.date).toLocaleDateString()}</td>
                                        <td style={{ padding: '14px 16px', fontWeight: 800, color: '#1A1A2E', fontSize: 14 }}>₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <span className={`badge ${inv.paymentStatus === 'paid' ? 'badge-green' : inv.paymentStatus === 'partial' ? 'badge-blue' : 'badge-red'}`} style={{ textTransform: 'capitalize' }}>
                                                {inv.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function ClientPortalPage() {
    return (
        <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading Portal...</div>}>
            <ClientPortalContent />
        </Suspense>
    );
}
