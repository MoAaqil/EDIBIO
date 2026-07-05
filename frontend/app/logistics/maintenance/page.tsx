'use client';
import React, { useEffect, useState } from 'react';
import { useActiveCompany } from '@/lib/store';
import { StatusBadge } from '@/components/logistics/StatusBadge';
import { Search, Plus, Wrench, DollarSign, Calendar, RefreshCw, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { MaintenanceRecord, Vehicle } from '@/lib/logistics/types';

export default function MaintenancePage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const [logs, setLogs] = useState<MaintenanceRecord[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [vehicleId, setVehicleId] = useState('');
  const [type, setType] = useState('oil_change');
  const [cost, setCost] = useState('');
  const [odometer, setOdometer] = useState('');
  const [description, setDescription] = useState('');
  const [serviceCenter, setServiceCenter] = useState('');
  const [status, setStatus] = useState('scheduled');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const [maintRes, vehiclesRes] = await Promise.all([
        fetch(`/api/logistics/maintenance?companyId=${companyId}`),
        fetch(`/api/logistics/vehicles?companyId=${companyId}`)
      ]);

      if (maintRes.ok) {
        const maintData = await maintRes.json();
        setLogs(maintData.logs || []);
      }
      if (vehiclesRes.ok) {
        const vData = await vehiclesRes.json();
        setVehicles(vData.vehicles || []);
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to load maintenance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [companyId]);

  const handleAddMaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleId || !type || !cost || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    const selectedVehicle = vehicles.find(v => v._id === vehicleId);

    try {
      const res = await fetch('/api/logistics/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId,
          vehicleId,
          vehicleNumber: selectedVehicle ? selectedVehicle.vehicleNumber : 'unknown',
          type,
          cost: parseFloat(cost),
          odometer: odometer ? parseFloat(odometer) : undefined,
          description,
          serviceCenter,
          status,
          date: new Date().toISOString()
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to log maintenance record');
      }

      toast.success('Maintenance record logged successfully');
      setVehicleId('');
      setType('oil_change');
      setCost('');
      setOdometer('');
      setDescription('');
      setServiceCenter('');
      setStatus('scheduled');
      setShowAddModal(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculations
  const totalCost = logs.reduce((acc, curr) => acc + (curr.cost || 0), 0);
  const activeJobs = logs.filter(l => l.status === 'in_progress').length;
  const completedJobs = logs.filter(l => l.status === 'completed').length;

  return (
    <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-950 overflow-y-auto no-scrollbar">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Total Service Spend</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-10 h-10 bg-indigo-50 text-indigo-650 dark:bg-indigo-950/20 dark:text-indigo-400 rounded-xl flex items-center justify-center">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider block">Active Repairs</span>
            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-450 mt-1 block">{activeJobs}</span>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-450 rounded-xl flex items-center justify-center">
            <RefreshCw size={18} className="animate-spin text-amber-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block">Completed Services</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-450 mt-1 block">{completedJobs}</span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl flex items-center justify-center">
            <Wrench size={18} />
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-755 text-white font-bold rounded-2xl shadow-md p-4 text-sm transition-all"
        >
          <Plus size={18} />
          <span>Log Maintenance Task</span>
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-left">
        <div className="px-5 py-4 border-b border-slate-150 dark:border-slate-850 font-black text-sm text-slate-900 dark:text-white">
          Maintenance Records Ledger
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850/40 border-b border-slate-200 dark:border-slate-850 text-[10px] font-black text-slate-455 uppercase tracking-wider">
                <th className="px-5 py-4">Service Date</th>
                <th className="px-5 py-4">Vehicle #</th>
                <th className="px-5 py-4">Task Type</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Service Center</th>
                <th className="px-5 py-4">Total Cost</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-350">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400 font-bold">
                    <RefreshCw size={18} className="animate-spin text-blue-500 mx-auto mb-2" />
                    <span>Loading logs...</span>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 font-bold border-dashed">
                    No maintenance records logged yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-all">
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {new Date(log.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {log.vehicleNumber}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white capitalize">
                      {log.type.replace('_', ' ')}
                    </td>
                    <td className="px-5 py-4 truncate max-w-[200px] font-medium text-slate-500">
                      {log.description}
                    </td>
                    <td className="px-5 py-4 truncate max-w-[150px] font-semibold text-slate-500">
                      {log.serviceCenter || '—'}
                    </td>
                    <td className="px-5 py-4 font-black text-slate-900 dark:text-white">
                      ${log.cost.toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={log.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Maintenance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-850 shrink-0">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Wrench size={18} className="text-blue-500" />
                <span>Log Maintenance Task</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMaint} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Vehicle *</label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Choose Asset...</option>
                  {vehicles.map(v => (
                    <option key={v._id} value={v._id}>{v.vehicleNumber} ({v.make} {v.model})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Service Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="oil_change">Oil Change & Lube</option>
                    <option value="tire">Tire Swap/Balance</option>
                    <option value="brake">Brake Service</option>
                    <option value="inspection">Safety Inspection</option>
                    <option value="repair">Mechanical Repair</option>
                    <option value="other">Other Diagnostic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Service Cost ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 350"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Odometer (Km)</label>
                  <input
                    type="number"
                    placeholder="e.g. 120500"
                    value={odometer}
                    onChange={(e) => setOdometer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Job Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Service Center / Garage Name</label>
                <input
                  type="text"
                  placeholder="e.g. TA Truck Service, Chicago IL"
                  value={serviceCenter}
                  onChange={(e) => setServiceCenter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Description / Notes *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Details of replacements, checks, or failures..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  <span>{submitting ? 'Logging...' : 'Log Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
