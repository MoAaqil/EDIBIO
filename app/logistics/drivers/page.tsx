'use client';
import React, { useEffect, useState } from 'react';
import { useActiveCompany } from '@/lib/store';
import { StatusBadge } from '@/components/logistics/StatusBadge';
import { Search, Plus, Phone, Mail, Award, CheckCircle, RefreshCw, X, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Driver } from '@/lib/logistics/types';

export default function DriversPage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchDrivers = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/logistics/drivers?companyId=${companyId}`);
      if (!res.ok) throw new Error('Failed to fetch drivers');
      const data = await res.json();
      setDrivers(data.drivers || []);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load drivers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [companyId]);

  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !licenseNumber || !licenseExpiry) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/logistics/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId,
          name,
          phone,
          email,
          licenseNumber,
          licenseExpiry,
          status: 'available'
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create driver');
      }

      toast.success('Driver registered successfully');
      setName('');
      setPhone('');
      setEmail('');
      setLicenseNumber('');
      setLicenseExpiry('');
      setShowAddModal(false);
      fetchDrivers();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.phone.includes(searchQuery) ||
    d.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-950 overflow-y-auto no-scrollbar">
      {/* Control panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search drivers by name, CDL #, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-955 text-xs font-semibold rounded-xl focus:outline-none"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-750 rounded-xl shadow-md transition-all w-full sm:w-auto justify-center"
        >
          <Plus size={16} />
          <span>Hire Driver</span>
        </button>
      </div>

      {/* Drivers List */}
      {loading ? (
        <div className="py-24 text-center text-xs text-slate-400 font-semibold flex flex-col items-center gap-2">
          <RefreshCw size={18} className="animate-spin text-blue-500" />
          <span>Loading driver directory...</span>
        </div>
      ) : filteredDrivers.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-450 border-2 border-dashed border-slate-200 rounded-3xl bg-white p-6">
          No drivers registered. Click "Hire Driver" to begin.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredDrivers.map((driver) => (
            <div
              key={driver._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {/* Profile Card Header */}
              <div className="p-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden shrink-0 flex items-center justify-center font-bold text-slate-700 dark:text-white text-lg">
                  {driver.photoUrl ? (
                    <img src={driver.photoUrl} alt={driver.name} className="w-full h-full object-cover" />
                  ) : (
                    driver.name[0].toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">{driver.name}</h3>
                    <StatusBadge status={driver.status} />
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">CDL: {driver.licenseNumber}</p>
                  
                  {/* Rating Badge */}
                  <div className="flex items-center gap-1.5 mt-2 bg-slate-50 dark:bg-slate-850 px-2 py-0.5 rounded-full border border-slate-100 dark:border-slate-800 w-fit">
                    <Award size={12} className="text-amber-500 shrink-0" />
                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-350">{driver.rating || 4.5}</span>
                  </div>
                </div>
              </div>

              {/* Stats Block */}
              <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-850/20 border-y border-slate-100 dark:border-slate-850 grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Total Trips</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 block">{driver.totalLoads || 0}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Distance driven</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                    {(driver.totalKm || 0).toLocaleString()} Km
                  </span>
                </div>
              </div>

              {/* Contacts info footer */}
              <div className="p-4 space-y-2 mt-auto text-xs">
                <div className="flex items-center gap-2 text-slate-650 dark:text-slate-400">
                  <Phone size={14} className="text-slate-400" />
                  <span className="font-semibold">{driver.phone}</span>
                </div>
                {driver.email && (
                  <div className="flex items-center gap-2 text-slate-650 dark:text-slate-400">
                    <Mail size={14} className="text-slate-400" />
                    <span className="font-semibold truncate block">{driver.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hire Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-850 shrink-0">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck size={18} className="text-blue-500" />
                <span>Hire New Fleet Driver</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddDriver} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Driver Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +1 (555) 019"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. john@loadswift.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">CDL License Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CDL-TX98231"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">License Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={licenseExpiry}
                    onChange={(e) => setLicenseExpiry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-750 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-md shadow-blue-500/10"
                >
                  <span>{submitting ? 'Hiring...' : 'Confirm Hire'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
