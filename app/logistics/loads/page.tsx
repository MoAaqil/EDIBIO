'use client';
import React, { useEffect, useState } from 'react';
import { useActiveCompany } from '@/lib/store';
import { StatusBadge } from '@/components/logistics/StatusBadge';
import CreateLoadModal from '@/components/logistics/CreateLoadModal';
import { Search, Plus, Calendar, Filter, Navigation, RefreshCw, DollarSign, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoadDocument } from '@/lib/logistics/types';

export default function LoadsPage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const [loads, setLoads] = useState<LoadDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchLoads = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/logistics/loads?companyId=${companyId}`);
      if (!res.ok) throw new Error('Failed to fetch loads');
      const data = await res.json();
      setLoads(data.loads || []);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load shipments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, [companyId]);

  const filteredLoads = loads.filter(l => {
    const matchesSearch =
      l.loadNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.pickupCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.deliveryCity.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate totals
  const totalLoads = loads.length;
  const inTransitLoads = loads.filter(l => l.status === 'in_transit').length;
  const deliveredLoads = loads.filter(l => l.status === 'delivered').length;
  const delayedLoads = loads.filter(l => l.status === 'delayed').length;

  return (
    <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-950 overflow-y-auto no-scrollbar">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Total Shipments</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{totalLoads}</span>
          </div>
          <div className="w-10 h-10 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-350 rounded-xl flex items-center justify-center">
            <Package size={20} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block">In Transit</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-450 mt-1 block">{inTransitLoads}</span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl flex items-center justify-center">
            <Navigation size={18} className="rotate-45" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-wider block">Delivered</span>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-450 mt-1 block">{deliveredLoads}</span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 rounded-xl flex items-center justify-center">
            <Calendar size={18} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider block">Delayed</span>
            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-450 mt-1 block">{delayedLoads}</span>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-450 rounded-xl flex items-center justify-center">
            <RefreshCw size={18} />
          </div>
        </div>
      </div>

      {/* Control panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by number, customer, origin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold rounded-xl focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold rounded-xl focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-755 rounded-xl shadow-md transition-all w-full sm:w-auto justify-center"
        >
          <Plus size={16} />
          <span>New Shipment</span>
        </button>
      </div>

      {/* Shipments Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-left">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850/40 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-450 uppercase tracking-wider">
                <th className="px-5 py-4">Load #</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Route (Origin → Dest)</th>
                <th className="px-5 py-4">Driver / Truck</th>
                <th className="px-5 py-4">Cargo / Weight</th>
                <th className="px-5 py-4">Base Rate</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs font-medium text-slate-800 dark:text-slate-350">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400 font-semibold">
                    <RefreshCw size={18} className="animate-spin text-blue-500 mx-auto mb-2" />
                    <span>Loading shipments ledger...</span>
                  </td>
                </tr>
              ) : filteredLoads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 font-bold border-dashed">
                    No shipments found matching filters.
                  </td>
                </tr>
              ) : (
                filteredLoads.map((load) => (
                  <tr key={load._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-all">
                    <td className="px-5 py-4 font-black text-slate-900 dark:text-white">
                      {load.loadNumber}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{load.customerName}</div>
                      {load.customerCompany && (
                        <div className="text-[10px] text-slate-500 mt-0.5">{load.customerCompany}</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 dark:text-white">{load.pickupCity}</span>
                        <span className="text-slate-400">→</span>
                        <span className="font-bold text-slate-900 dark:text-white">{load.deliveryCity}</span>
                      </div>
                      <div className="text-[10px] text-slate-450 mt-1">
                        Est. {load.distanceKm || 1200} Km
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{load.driverName || '—'}</div>
                      {load.vehicleNumber && (
                        <div className="text-[10px] text-slate-500 mt-0.5">Truck: {load.vehicleNumber}</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{load.commodity}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{load.weightKg?.toLocaleString()} Kg</div>
                    </td>
                    <td className="px-5 py-4 font-extrabold text-slate-900 dark:text-white">
                      ${(load.baseRate || 0).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={load.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Load Modal */}
      <CreateLoadModal
        companyId={companyId}
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={() => fetchLoads()}
      />
    </div>
  );
}
