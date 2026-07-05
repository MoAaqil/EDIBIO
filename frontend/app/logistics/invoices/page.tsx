'use client';
import React, { useEffect, useState } from 'react';
import { useActiveCompany } from '@/lib/store';
import { StatusBadge } from '@/components/logistics/StatusBadge';
import { Search, Plus, FileText, DollarSign, Calendar, RefreshCw, X, Save, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { LogisticsInvoice, LoadDocument } from '@/lib/logistics/types';

export default function InvoicesPage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const [invoices, setInvoices] = useState<LogisticsInvoice[]>([]);
  const [loads, setLoads] = useState<LoadDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [loadId, setLoadId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const [invRes, loadsRes] = await Promise.all([
        fetch(`/api/logistics/invoices?companyId=${companyId}`),
        fetch(`/api/logistics/loads?companyId=${companyId}`)
      ]);

      if (invRes.ok) {
        const invData = await invRes.json();
        setInvoices(invData.invoices || []);
      }
      if (loadsRes.ok) {
        const lData = await loadsRes.json();
        setLoads(lData.loads || []);
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [companyId]);

  const handleAddInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loadId || !amount || !dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    const selectedLoad = loads.find(l => l._id === loadId);

    try {
      const parsedAmount = parseFloat(amount);
      const tax = parsedAmount * 0.08; // 8% flat logistics state tax
      const totalAmount = parsedAmount + tax;

      const res = await fetch('/api/logistics/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId,
          loadId,
          loadNumber: selectedLoad ? selectedLoad.loadNumber : 'unknown',
          customerName: selectedLoad ? selectedLoad.customerName : 'unknown',
          customerCompany: selectedLoad ? selectedLoad.customerCompany : undefined,
          customerEmail: selectedLoad ? selectedLoad.customerEmail : undefined,
          amount: parsedAmount,
          tax,
          totalAmount,
          status: 'sent',
          dueDate: new Date(dueDate).toISOString()
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create invoice');
      }

      toast.success('Logistics Invoice created successfully');
      setLoadId('');
      setAmount('');
      setDueDate('');
      setShowAddModal(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculations
  const totalInvoiced = invoices.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const collected = invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const outstanding = invoices.filter(i => i.status !== 'paid').reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-955 overflow-y-auto no-scrollbar">
      {/* Financial ledger metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Total Invoiced</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              ${totalInvoiced.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-10 h-10 bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-350 rounded-xl flex items-center justify-center">
            <FileText size={20} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block">Payments Collected</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-450 mt-1 block">
              ${collected.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-650 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl flex items-center justify-center">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-wider block">Outstanding Balance</span>
            <span className="text-xl font-extrabold text-rose-600 dark:text-rose-455 mt-1 block">
              ${outstanding.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-10 h-10 bg-rose-50 text-rose-650 dark:bg-rose-955/20 dark:text-rose-400 rounded-xl flex items-center justify-center">
            <ShieldAlert size={20} />
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-755 text-white font-bold rounded-2xl shadow-md p-4 text-sm transition-all"
        >
          <Plus size={18} />
          <span>New Client Invoice</span>
        </button>
      </div>

      {/* Invoice Ledger table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-left">
        <div className="px-5 py-4 border-b border-slate-150 dark:border-slate-850 font-black text-sm text-slate-900 dark:text-white">
          Client Billing Ledger
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850/40 border-b border-slate-200 dark:border-slate-850 text-[10px] font-black text-slate-455 uppercase tracking-wider">
                <th className="px-5 py-4">Invoice #</th>
                <th className="px-5 py-4">Customer Name</th>
                <th className="px-5 py-4">Load Ref</th>
                <th className="px-5 py-4">Base Fare</th>
                <th className="px-5 py-4">Tax (8%)</th>
                <th className="px-5 py-4">Total Bill</th>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-350">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-slate-400 font-bold">
                    <RefreshCw size={18} className="animate-spin text-blue-500 mx-auto mb-2" />
                    <span>Loading billing ledger...</span>
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-slate-400 font-bold border-dashed">
                    No client bills created yet.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-all">
                    <td className="px-5 py-4 font-black text-slate-900 dark:text-white">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{inv.customerName}</div>
                      {inv.customerCompany && (
                        <div className="text-[10px] text-slate-500 mt-0.5">{inv.customerCompany}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {inv.loadNumber}
                    </td>
                    <td className="px-5 py-4">
                      ${inv.amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      ${(inv.tax || 0).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 font-black text-slate-900 dark:text-white">
                      ${inv.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-500">
                      {new Date(inv.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={inv.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-850 shrink-0">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                <span>Issue Logistics Invoice</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddInvoice} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Load/Shipment *</label>
                <select
                  value={loadId}
                  onChange={(e) => setLoadId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Choose Load...</option>
                  {loads
                    .filter(l => l.status === 'delivered')
                    .map(l => (
                      <option key={l._id} value={l._id}>{l.loadNumber} - {l.customerName} ({l.commodity})</option>
                    ))}
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">Only completed/delivered shipments are eligible for invoicing.</span>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Base Amount ($) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 3500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Due Date *</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-850">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-250 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-755 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/10"
                >
                  <Save size={14} />
                  <span>{submitting ? 'Generating...' : 'Issue Invoice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
