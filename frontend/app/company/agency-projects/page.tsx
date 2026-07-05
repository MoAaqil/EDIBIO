'use client';
import { useState, Suspense } from 'react';
import { useStore, useCompanyData, useActiveCompany } from '@/lib/store';
import type { AgencyProject, AgencyClient, ProjectMilestone, BillingType, ProjectStatus } from '@/lib/types';
import { Plus, Search, Edit2, Trash2, Calendar, FileText, Briefcase, CheckCircle, Clock, X, Users, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { confirm } from '@/components/ConfirmDialog';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function AgencyProjectsContent() {
    const searchParams = useSearchParams();
    const newForClient = searchParams.get('new');
    const { activeCompanyId, addAgencyProject, updateAgencyProject, deleteAgencyProject } = useStore();
    const company = useActiveCompany();
    const projects = useCompanyData('agencyProjects') as AgencyProject[];
    const clients = useCompanyData('agencyClients') as AgencyClient[];

    const [search, setSearch] = useState('');
    const [showAdd, setShowAdd] = useState(!!newForClient);
    const [editProject, setEditProject] = useState<AgencyProject | null>(null);

    const emptyForm = {
        clientId: newForClient || '',
        projectName: '',
        serviceType: 'Web Development',
        billingType: 'one_time' as BillingType,
        projectPrice: '',
        startDate: new Date().toISOString().split('T')[0],
        deadline: '',
        assignedTeamMemberId: '',
        status: 'ongoing' as ProjectStatus,
        milestones: [] as ProjectMilestone[],
        hasRetainer: false,
        retainerAmount: '',
        retainerFrequency: 'monthly' as 'monthly' | 'yearly',
    };
    const [form, setForm] = useState<any>(emptyForm);
    const up = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

    const filtered = projects.filter(p =>
        p.projectName.toLowerCase().includes(search.toLowerCase()) ||
        p.serviceType.toLowerCase().includes(search.toLowerCase())
    );

    const getClientName = (id: string) => clients.find(c => c.id === id)?.clientName || 'Unknown Client';
    const getTeamMemberName = (id: string) => company?.team?.find(t => t.id === id)?.name || 'Unassigned';

    const handleSave = () => {
        if (!form.projectName || !form.clientId) { toast.error('Project name and Client are required'); return; }
        const data = {
            companyId: activeCompanyId!,
            clientId: form.clientId,
            projectName: form.projectName,
            serviceType: form.serviceType,
            billingType: form.billingType,
            projectPrice: parseFloat(form.projectPrice) || 0,
            startDate: form.startDate,
            deadline: form.deadline,
            assignedTeamMemberId: form.assignedTeamMemberId,
            status: form.status,
            milestones: form.milestones,
            hasRetainer: form.hasRetainer,
            retainerAmount: parseFloat(form.retainerAmount) || 0,
            retainerFrequency: form.retainerFrequency,
        };
        if (editProject) {
            updateAgencyProject(editProject.id, data);
            setEditProject(null);
        } else {
            addAgencyProject(data);
        }
        setShowAdd(false);
        setForm(emptyForm);
    };

    const openEdit = (p: AgencyProject) => {
        setEditProject(p);
        setForm({
            ...p,
            projectPrice: String(p.projectPrice || ''),
            retainerAmount: String(p.retainerAmount || ''),
        });
        setShowAdd(true);
    };

    const handleDelete = async (id: string) => {
        const yes = await confirm({ message: 'Delete this project?', danger: true });
        if (yes) {
            deleteAgencyProject(id);
            toast.success('Project deleted');
        }
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Briefcase size={24} color="#D97706" />
                    </div>
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Active Projects</p>
                        <p style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E' }}>{projects.filter(p => p.status === 'ongoing').length}</p>
                    </div>
                </div>
                <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle size={24} color="#15803D" />
                    </div>
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', marginBottom: 4 }}>Completed</p>
                        <p style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E' }}>{projects.filter(p => p.status === 'completed').length}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }} />
                    <input className="e-input" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 38 }} />
                </div>
                <button onClick={() => { setEditProject(null); setForm(emptyForm); setShowAdd(true); }} className="btn btn-blue" style={{ gap: 6, background: '#F59E0B' }}>
                    <Plus size={16} /> New Project
                </button>
            </div>

            {filtered.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
                    <Briefcase size={48} color="#E2E8F0" style={{ margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1A1A2E', marginBottom: 8 }}>No Projects Found</h3>
                    <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>Create a new project to start tracking your work and billing clients.</p>
                    <button onClick={() => { setEditProject(null); setForm(emptyForm); setShowAdd(true); }} className="btn btn-blue" style={{ display: 'inline-flex', background: '#F59E0B' }}>Create First Project</button>
                </div>
            ) : (
                <div className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="e-table" style={{ minWidth: 900 }}>
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Client</th>
                                    <th>Status</th>
                                    <th>Value & Billing</th>
                                    <th>Timeline</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(p => (
                                    <tr key={p.id}>
                                        <td>
                                            <p style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E' }}>{p.projectName}</p>
                                            <p style={{ fontSize: 12, color: '#718096', display: 'flex', alignItems: 'center', gap: 4 }}><span className="badge badge-gray">{p.serviceType}</span></p>
                                        </td>
                                        <td>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: '#4A5568' }}>{getClientName(p.clientId)}</p>
                                            {p.assignedTeamMemberId && <p style={{ fontSize: 11, color: '#A0AEC0', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {getTeamMemberName(p.assignedTeamMemberId)}</p>}
                                        </td>
                                        <td>
                                            <span className={`badge ${p.status === 'completed' ? 'badge-green' : p.status === 'on_hold' ? 'badge-red' : 'badge-blue'}`}>
                                                {p.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <p style={{ fontWeight: 800, color: '#34A853', fontSize: 14 }}>₹{p.projectPrice.toLocaleString('en-IN')}</p>
                                            <p style={{ fontSize: 11, color: '#718096', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                                <DollarSign size={12} /> {p.billingType.replace('_', ' ').toUpperCase()}
                                            </p>
                                        </td>
                                        <td>
                                            <p style={{ fontSize: 12, color: '#4A5568', display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {new Date(p.startDate).toLocaleDateString()}</p>
                                            {p.deadline && <p style={{ fontSize: 12, color: '#EA4335', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontWeight: 600 }}><Clock size={12} /> {new Date(p.deadline).toLocaleDateString()}</p>}
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <Link href={`/company/billing/new?project=${p.id}&client=${p.clientId}`} className="btn btn-outline btn-sm" style={{ padding: '4px 8px', fontSize: 11, gap: 4, marginRight: 8 }}><FileText size={12} /> Bill</Link>
                                            <button onClick={() => openEdit(p)} className="btn btn-ghost btn-icon" style={{ padding: 6 }}><Edit2 size={16} color="#4285F4" /></button>
                                            <button onClick={() => handleDelete(p.id)} className="btn btn-ghost btn-icon" style={{ padding: 6 }}><Trash2 size={16} color="#EA4335" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modals */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 700 }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E1E4E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1A1A2E' }}>{editProject ? 'Edit Project' : 'New Project'}</h3>
                            <button onClick={() => { setShowAdd(false); setEditProject(null); }} className="btn btn-ghost btn-icon"><X size={20} /></button>
                        </div>
                        <div className="modal-scroll-body" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Project Name *</label>
                                    <input className="e-input" placeholder="e.g. Acme Corp Website Redesign" value={form.projectName} onChange={e => up('projectName', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Client *</label>
                                    <select className="e-select" value={form.clientId} onChange={e => up('clientId', e.target.value)}>
                                        <option value="" disabled>Select Client...</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.clientName} {c.businessName ? `(${c.businessName})` : ''}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Service Type</label>
                                    <select className="e-select" value={form.serviceType} onChange={e => up('serviceType', e.target.value)}>
                                        <option value="Web Development">Web Development</option>
                                        <option value="App Development">App Development</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="SEO">SEO</option>
                                        <option value="Social Media Marketing">Social Media Marketing</option>
                                        <option value="Content Creation">Content Creation</option>
                                        <option value="Consulting">Consulting</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Start Date</label>
                                    <input type="date" className="e-input" value={form.startDate} onChange={e => up('startDate', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Deadline (Optional)</label>
                                    <input type="date" className="e-input" value={form.deadline} onChange={e => up('deadline', e.target.value)} />
                                </div>

                                <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
                                    <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E', marginBottom: 12 }}>Financials & Billing</h4>
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Total Value / Price (₹)</label>
                                    <input type="number" className="e-input" placeholder="0.00" value={form.projectPrice} onChange={e => up('projectPrice', e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Billing Type</label>
                                    <select className="e-select" value={form.billingType} onChange={e => up('billingType', e.target.value)}>
                                        <option value="one_time">One Time</option>
                                        <option value="milestone">Milestone Based</option>
                                        <option value="retainer">Monthly/Yearly Retainer</option>
                                        <option value="hourly">Hourly Basis</option>
                                    </select>
                                </div>

                                {form.billingType === 'retainer' && (
                                    <>
                                        <div>
                                            <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Retainer Amount (₹)</label>
                                            <input type="number" className="e-input" placeholder="0.00" value={form.retainerAmount} onChange={e => up('retainerAmount', e.target.value)} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Frequency</label>
                                            <select className="e-select" value={form.retainerFrequency} onChange={e => up('retainerFrequency', e.target.value)}>
                                                <option value="monthly">Monthly</option>
                                                <option value="yearly">Yearly</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
                                    <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E', marginBottom: 12 }}>Management</h4>
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Assign Team Member</label>
                                    <select className="e-select" value={form.assignedTeamMemberId} onChange={e => up('assignedTeamMemberId', e.target.value)}>
                                        <option value="">Unassigned</option>
                                        {company?.team?.map(t => <option key={t.id} value={t.id}>{t.name} ({t.role})</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Project Status</label>
                                    <select className="e-select" value={form.status} onChange={e => up('status', e.target.value)}>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                        <option value="on_hold">On Hold</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div style={{ padding: '16px 24px', borderTop: '1px solid #E1E4E8', display: 'flex', gap: 12, justifyContent: 'flex-end', background: '#F8F9FA' }}>
                            <button onClick={() => { setShowAdd(false); setEditProject(null); }} className="btn btn-outline" style={{ background: 'white' }}>Cancel</button>
                            <button onClick={handleSave} className="btn btn-blue" style={{ background: '#F59E0B' }}>{editProject ? 'Save Changes' : 'Create Project'}</button>
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

export default function AgencyProjectsPage() {
    return (
        <Suspense fallback={<div>Loading Projects...</div>}>
            <AgencyProjectsContent />
        </Suspense>
    );
}
