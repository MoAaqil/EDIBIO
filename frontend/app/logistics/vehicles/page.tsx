'use client';
import React, { useEffect, useState } from 'react';
import { useActiveCompany } from '@/lib/store';
import { StatusBadge } from '@/components/logistics/StatusBadge';
import { Search, Plus, Truck, Settings, Calendar, AlertTriangle, RefreshCw, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { Vehicle } from '@/lib/logistics/types';

export default function VehiclesPage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [type, setType] = useState('truck');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [capacityTons, setCapacityTons] = useState('');
  const [vin, setVin] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchVehicles = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/logistics/vehicles?companyId=${companyId}`);
      if (!res.ok) throw new Error('Failed to fetch fleet assets');
      const data = await res.json();
      setVehicles(data.vehicles || []);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load fleet assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [companyId]);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleNumber || !make || !model || !capacityTons) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/logistics/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId,
          vehicleNumber,
          type,
          make,
          model,
          year: Number(year),
          capacityTons: parseFloat(capacityTons),
          vin,
          status: 'active'
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to register asset');
      }

      toast.success('Fleet asset registered successfully');
      setVehicleNumber('');
      setType('truck');
      setMake('');
      setModel('');
      setCapacityTons('');
      setVin('');
      setShowAddModal(false);
      fetchVehicles();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredVehicles = vehicles.filter(v =>
    v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-950 overflow-y-auto no-scrollbar">
      {/* Control panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search fleet by ID, model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-955 text-xs font-semibold rounded-xl focus:outline-none"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-755 rounded-xl shadow-md transition-all w-full sm:w-auto justify-center"
        >
          <Plus size={16} />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Fleet Grid */}
      {loading ? (
        <div className="py-24 text-center text-xs text-slate-400 font-semibold flex flex-col items-center gap-2">
          <RefreshCw size={18} className="animate-spin text-blue-500" />
          <span>Loading fleet list...</span>
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-450 border-2 border-dashed border-slate-200 rounded-3xl bg-white p-6">
          No fleet assets registered. Click "Add Asset" to begin.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Truck size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                      {vehicle.vehicleNumber}
                    </h3>
                    <StatusBadge status={vehicle.status} />
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5 capitalize">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                    Class: {vehicle.type}
                  </p>
                </div>
              </div>

              {/* Stats block */}
              <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-850/20 border-y border-slate-100 dark:border-slate-850 grid grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <span className="text-[10px] text-slate-450 block uppercase tracking-wider font-bold">Odometer</span>
                  <span className="text-slate-850 dark:text-slate-200 mt-1 block">
                    {(vehicle.odometerKm || 0).toLocaleString()} Km
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-450 block uppercase tracking-wider font-bold">Capacity Limits</span>
                  <span className="text-slate-850 dark:text-slate-200 mt-1 block">
                    {vehicle.capacityTons} Tons
                  </span>
                </div>
              </div>

              {/* Maintenance Schedule & Assignment footer */}
              <div className="p-4 space-y-3 mt-auto text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">Assigned Driver</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-250">
                    {vehicle.currentDriverName || 'Unassigned'}
                  </span>
                </div>

                {vehicle.nextMaintenanceDue && (
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-850">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Calendar size={13} />
                      <span>Service Due</span>
                    </span>
                    <span className="font-bold text-slate-650 dark:text-slate-350">
                      {new Date(vehicle.nextMaintenanceDue).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-850 shrink-0">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Truck size={18} className="text-blue-500" />
                <span>Register Fleet Vehicle / Asset</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="p-6 space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Vehicle/Asset ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TRK-105"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Asset Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="truck">Semi Truck / Tractor</option>
                    <option value="trailer">Dry Van Trailer</option>
                    <option value="flatbed">Flatbed Trailer</option>
                    <option value="van">Reefer (Refrigerated)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Manufacturer/Make *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Peterbilt"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Year *</label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 579 Ultraloft"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Capacity (Tons) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 24"
                    value={capacityTons}
                    onChange={(e) => setCapacityTons(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">VIN (Vehicle Identification Number)</label>
                <input
                  type="text"
                  placeholder="17-digit alphanumeric code"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  <span>{submitting ? 'Registering...' : 'Register'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
