'use client';
import React, { useEffect, useState } from 'react';
import { useActiveCompany } from '@/lib/store';
import { Search, Plus, Fuel, DollarSign, Calendar, Wrench, RefreshCw, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { FuelTransaction, Vehicle } from '@/lib/logistics/types';

export default function FuelPage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const [transactions, setTransactions] = useState<FuelTransaction[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [vehicleId, setVehicleId] = useState('');
  const [liters, setLiters] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('');
  const [odometer, setOdometer] = useState('');
  const [station, setStation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Fuel Card');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const [fuelRes, vehiclesRes] = await Promise.all([
        fetch(`/api/logistics/fuel?companyId=${companyId}`),
        fetch(`/api/logistics/vehicles?companyId=${companyId}`)
      ]);

      if (fuelRes.ok) {
        const fuelData = await fuelRes.json();
        setTransactions(fuelData.transactions || []);
      }
      if (vehiclesRes.ok) {
        const vData = await vehiclesRes.json();
        setVehicles(vData.vehicles || []);
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to load fuel records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [companyId]);

  const handleAddFuel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleId || !liters || !pricePerLiter || !odometer) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    const selectedVehicle = vehicles.find(v => v._id === vehicleId);

    try {
      const res = await fetch('/api/logistics/fuel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId,
          vehicleId,
          vehicleNumber: selectedVehicle ? selectedVehicle.vehicleNumber : 'unknown',
          liters: parseFloat(liters),
          pricePerLiter: parseFloat(pricePerLiter),
          totalCost: parseFloat(liters) * parseFloat(pricePerLiter),
          odometer: parseFloat(odometer),
          station,
          paymentMethod,
          date: new Date().toISOString()
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to log fuel transaction');
      }

      toast.success('Fuel transaction logged successfully');
      setVehicleId('');
      setLiters('');
      setPricePerLiter('');
      setOdometer('');
      setStation('');
      setPaymentMethod('Fuel Card');
      setShowAddModal(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculations
  const totalLiters = transactions.reduce((acc, curr) => acc + (curr.liters || 0), 0);
  const totalCost = transactions.reduce((acc, curr) => acc + (curr.totalCost || 0), 0);

  return (
    <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-950 overflow-y-auto no-scrollbar">
      {/* Summary KPI Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Total Fuel Cost</span>
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
            <span className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Total Liters Filled</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              {totalLiters.toLocaleString()} Liters
            </span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-650 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl flex items-center justify-center">
            <Fuel size={20} />
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-755 text-white font-bold rounded-2xl shadow-md p-4 text-sm transition-all"
        >
          <Plus size={18} />
          <span>Log Fuel Purchase</span>
        </button>
      </div>

      {/* Fuel logs table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-left">
        <div className="px-5 py-4 border-b border-slate-150 dark:border-slate-850 font-black text-sm text-slate-900 dark:text-white">
          Fuel Transactions Ledger
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850/40 border-b border-slate-200 dark:border-slate-850 text-[10px] font-black text-slate-455 uppercase tracking-wider">
                <th className="px-5 py-4">Refueling Date</th>
                <th className="px-5 py-4">Vehicle #</th>
                <th className="px-5 py-4">Liters</th>
                <th className="px-5 py-4">Price per Liter</th>
                <th className="px-5 py-4">Total Cost</th>
                <th className="px-5 py-4">Odometer</th>
                <th className="px-5 py-4">Station Location</th>
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
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 font-bold border-dashed">
                    No fuel logs recorded yet.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-all">
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {t.vehicleNumber}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      {t.liters} L
                    </td>
                    <td className="px-5 py-4 font-bold">
                      ${t.pricePerLiter.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 font-black text-slate-900 dark:text-white">
                      ${t.totalCost.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 font-bold">
                      {t.odometer?.toLocaleString()} Km
                    </td>
                    <td className="px-5 py-4 truncate max-w-[150px] font-semibold text-slate-500">
                      {t.station || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Fuel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-850 shrink-0">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Fuel size={18} className="text-blue-500" />
                <span>Log Refueling Transaction</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddFuel} className="p-6 space-y-4 text-left">
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
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Liters Filled *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 250"
                    value={liters}
                    onChange={(e) => setLiters(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Price per Liter ($) *</label>
                  <input
                    type="number"
                    step="0.001"
                    required
                    placeholder="e.g. 1.25"
                    value={pricePerLiter}
                    onChange={(e) => setPricePerLiter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Odometer Reading (Km) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 120500"
                    value={odometer}
                    onChange={(e) => setOdometer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="Fuel Card">Fuel Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Company Card">Company Card</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fuel Station & Location</label>
                <input
                  type="text"
                  placeholder="e.g. Loves Travel Stop #321, Memphis TN"
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-750 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/10"
                >
                  <Save size={14} />
                  <span>{submitting ? 'Logging...' : 'Log Purchase'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
