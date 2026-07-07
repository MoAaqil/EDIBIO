'use client';
import { useState } from 'react';
import { useStore, useCompanyData } from '@/lib/store';
import type { AgencyClient } from '@/lib/types';
import { Plus, Search, Users, Edit2, Trash2, Mail, Phone, ExternalLink, X, FileText, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';
import Link from 'next/link';

export default function AgencyClientsPage() {
    const { activeCompanyId, addAgencyClient, updateAgencyClient, deleteAgencyClient } = useStore();
    const clients = useCompanyData('agencyClients') as AgencyClient[];

    const [search, setSearch] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [editClient, setEditClient] = useState<AgencyClient | null>(null);

    const emptyForm = {
        clientName: '', businessName: '', email: '', phone: '', whatsapp: '',
        country: 'India', address: '', gstNumber: '', notes: '', contractValue: '', paymentTerms: 'Net 30'
    };
    const [form, setForm] = useState<any>(emptyForm);
    const up = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

    const filtered = clients.filter(c =>
        c.clientName.toLowerCase().includes(search.toLowerCase()) ||
        (c.businessName && c.businessName.toLowerCase().includes(search.toLowerCase())) ||
        (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
    );

    const handleSave = () => {
        if (!form.clientName) { toast.error('Client name is required'); return; }
        const data = {
            companyId: activeCompanyId!,
            clientName: form.clientName,
            businessName: form.businessName,
            email: form.email,
            phone: form.phone,
            whatsapp: form.whatsapp,
            country: form.country,
            address: form.address,
            gstNumber: form.gstNumber,
            notes: form.notes,
            contractValue: parseFloat(form.contractValue) || 0,
            paymentTerms: form.paymentTerms,
        };
        if (editClient) {
            updateAgencyClient(editClient.id, data);
            setEditClient(null);
        } else {
            addAgencyClient(data);
        }
        setShowAdd(false);
        setForm(emptyForm);
    };

    const openEdit = (c: AgencyClient) => {
        setEditClient(c);
        setForm({ ...c, contractValue: String(c.contractValue || '') });
        setShowAdd(true);
    };

    const handleDelete = async (id: string) => {
        const yes = await confirm({
            message: 'Delete this client? This will affect related projects/invoices if any.',
            danger: true
        });
        if (yes) {
            deleteAgencyClient(id);
            toast.success('Client deleted');
        }
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Users size={24} color="#1967D2" />
                    </div>
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Total Clients</p>
                        <p style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E' }}>{clients.length}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                    <input className="e-input" placeholder="Search clients by name, business, or email..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 38 }} />
                </div>
                <button onClick={() => { setEditClient(null); setForm(emptyForm); setShowAdd(true); }} className="btn btn-blue" style={{ gap: 6 }}>
                    <Plus size={16} /> Add Client
                </button>
            </div>

            {filtered.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
                    <Users size={48} color="#E2E8F0" style={{ margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1A1A2E', marginBottom: 8 }}>No Clients Found</h3>
                    <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>Add your first client to start managing projects and billing.</p>
                    <button onClick={() => { setEditClient(null); setForm(emptyForm); setShowAdd(true); }} className="btn btn-blue" style={{ display: 'inline-flex' }}>Add First Client</button>
                </div>
            ) : (
                <div className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="e-table" style={{ minWidth: 900 }}>
                            <thead>
                                <tr>
                                    <th>Client</th>
                                    <th>Contact</th>
                                    <th>Contract Value</th>
                                    <th>Payment Terms</th>
                                    <th>Quick Actions</th>
                                    <th style={{ textAlign: 'right' }}>Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(c => (
                                    <tr key={c.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F8F9FA', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#1A1A2E', fontSize: 16 }}>
                                                    {c.clientName[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E' }}>{c.clientName}</p>
                                                    {c.businessName && <p style={{ fontSize: 12, color: '#718096', display: 'flex', alignItems: 'center', gap: 4 }}><Briefcase size={12} /> {c.businessName}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {c.email && <p style={{ fontSize: 12, color: '#4A5568', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}><Mail size={12} /> {c.email}</p>}
                                            {c.phone && <p style={{ fontSize: 12, color: '#4A5568', display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} /> {c.phone}</p>}
                                        </td>
                                        <td>
                                            {c.contractValue ? (
                                                <span style={{ fontWeight: 800, color: '#34A853', fontSize: 14 }}>₹{c.contractValue.toLocaleString('en-IN')}</span>
                                            ) : <span style={{ color: '#A0AEC0' }}>-</span>}
                                        </td>
                                        <td>
                                            <span className="badge badge-gray">{c.paymentTerms || 'Default'}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <Link href={`/company/billing/new?client=${c.id}`} className="btn btn-outline btn-sm" style={{ padding: '4px 8px', fontSize: 11, gap: 4 }}><FileText size={12} /> Invoice</Link>
                                                <Link href={`/company/agency-projects?new=${c.id}`} className="btn btn-outline btn-sm" style={{ padding: '4px 8px', fontSize: 11, gap: 4 }}><Plus size={12} /> Project</Link>
                                                <Link href={`/portal?clientId=${c.id}`} target="_blank" className="btn btn-outline btn-sm" style={{ padding: '4px 8px', fontSize: 11, gap: 4, background: '#F8F9FA' }}><ExternalLink size={12} /> Portal</Link>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button onClick={() => openEdit(c)} className="btn btn-ghost btn-icon" style={{ padding: 6 }}><Edit2 size={16} color="#4285F4" /></button>
                                            <button onClick={() => handleDelete(c.id)} className="btn btn-ghost btn-icon" style={{ padding: 6 }}><Trash2 size={16} color="#EA4335" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 650 }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E' }}>{editClient ? 'Edit Client' : 'Add New Client'}</h3>
                            <button onClick={() => { setShowAdd(false); setEditClient(null); }} className="btn btn-ghost btn-icon"><X size={20} /></button>
                        </div>
                        <div className="modal-scroll-body" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Client Full Name *</label>
                                    <input className="e-input" placeholder="e.g. John Doe" value={form.clientName} onChange={e => up('clientName', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Business / Company Name</label>
                                    <input className="e-input" placeholder="e.g. Acme Corp" value={form.businessName} onChange={e => up('businessName', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Email Address</label>
                                    <input type="email" className="e-input" placeholder="john@example.com" value={form.email} onChange={e => up('email', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Phone Number</label>
                                    <input className="e-input" placeholder="+91..." value={form.phone} onChange={e => up('phone', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>WhatsApp Number</label>
                                    <input className="e-input" placeholder="+91..." value={form.whatsapp} onChange={e => up('whatsapp', e.target.value)} />
                                </div>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Address</label>
                                    <textarea className="e-input" placeholder="Full address..." value={form.address} onChange={e => up('address', e.target.value)} rows={2} style={{ resize: 'vertical' }} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Country</label>
                                    <input className="e-input" value={form.country} onChange={e => up('country', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>GST Number (Optional)</label>
                                    <input className="e-input" placeholder="22AAAAA0000A1Z5" value={form.gstNumber} onChange={e => up('gstNumber', e.target.value.toUpperCase())} />
                                </div>

                                <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
                                    <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E', marginBottom: 12 }}>Contract & Billing Defaults</h4>
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Contract Value (₹)</label>
                                    <input type="number" className="e-input" placeholder="0.00" value={form.contractValue} onChange={e => up('contractValue', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Payment Terms</label>
                                    <select className="e-select" value={form.paymentTerms} onChange={e => up('paymentTerms', e.target.value)}>
                                        <option value="Due on Receipt">Due on Receipt</option>
                                        <option value="Net 15">Net 15</option>
                                        <option value="Net 30">Net 30</option>
                                        <option value="Net 45">Net 45</option>
                                        <option value="Net 60">Net 60</option>
                                    </select>
                                </div>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Notes</label>
                                    <textarea className="e-input" placeholder="Internal notes about the client..." value={form.notes} onChange={e => up('notes', e.target.value)} rows={3} style={{ resize: 'vertical' }} />
                                </div>

                            </div>
                        </div>
                        <div style={{ padding: '16px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 12, justifyContent: 'flex-end', background: '#F8F9FA' }}>
                            <button onClick={() => { setShowAdd(false); setEditClient(null); }} className="btn btn-outline" style={{ background: 'white' }}>Cancel</button>
                            <button onClick={handleSave} className="btn btn-blue">{editClient ? 'Save Changes' : 'Create Client'}</button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                @media (max-width: 639px) {
                    .modal-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
