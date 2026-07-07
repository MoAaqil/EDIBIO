'use client';
import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { Driver, Vehicle } from '@/lib/logistics/types';
import toast from 'react-hot-toast';

interface CreateLoadModalProps {
  companyId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newLoad: any) => void;
}

export default function CreateLoadModal({ companyId, isOpen, onClose, onSuccess }: CreateLoadModalProps) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupCity, setPickupCity] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const [commodity, setCommodity] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [volumeCbm, setVolumeCbm] = useState('');

  const [driverId, setDriverId] = useState('');
  const [vehicleId, setVehicleId] = useState('');

  const [baseRate, setBaseRate] = useState('');
  const [fuelCost, setFuelCost] = useState('');
  const [tollCost, setTollCost] = useState('');

  const [submitting, setSubmitting] = useState(false);

  // Fetch drivers and vehicles
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const [driversRes, vehiclesRes] = await Promise.all([
          fetch(`/api/logistics/drivers?companyId=${companyId}`),
          fetch(`/api/logistics/vehicles?companyId=${companyId}`)
        ]);

        if (driversRes.ok) {
          const dData = await driversRes.json();
          setDrivers(dData.drivers || []);
        }
        if (vehiclesRes.ok) {
          const vData = await vehiclesRes.json();
          setVehicles(vData.vehicles || []);
        }
      } catch (e) {
        console.error('Error fetching drivers/vehicles', e);
      }
    };

    fetchData();
  }, [isOpen, companyId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !pickupAddress || !pickupCity || !pickupDate || !deliveryAddress || !deliveryCity || !deliveryDate || !commodity || !weightKg || !baseRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    const selectedDriver = drivers.find(d => d._id === driverId);
    const selectedVehicle = vehicles.find(v => v._id === vehicleId);

    const loadData = {
      companyId,
      customerName,
      customerCompany,
      customerPhone,
      customerEmail,
      pickupAddress,
      pickupCity,
      pickupDate: new Date(pickupDate).toISOString(),
      deliveryAddress,
      deliveryCity,
      deliveryDate: new Date(deliveryDate).toISOString(),
      commodity,
      weightKg: parseFloat(weightKg),
      volumeCbm: volumeCbm ? parseFloat(volumeCbm) : undefined,
      driverId: driverId || undefined,
      driverName: selectedDriver ? selectedDriver.name : undefined,
      vehicleId: vehicleId || undefined,
      vehicleNumber: selectedVehicle ? selectedVehicle.vehicleNumber : undefined,
      baseRate: parseFloat(baseRate),
      fuelCost: fuelCost ? parseFloat(fuelCost) : 0,
      tollCost: tollCost ? parseFloat(tollCost) : 0,
      status: 'upcoming' as const,
      // Default coordinates (procedural mock values matching cities)
      pickupLat: 41.8781 + (Math.random() - 0.5) * 5,
      pickupLng: -87.6298 + (Math.random() - 0.5) * 5,
      deliveryLat: 32.7767 + (Math.random() - 0.5) * 5,
      deliveryLng: -96.7970 + (Math.random() - 0.5) * 5,
      distanceKm: Math.round(500 + Math.random() * 1500)
    };

    try {
      const res = await fetch('/api/logistics/loads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loadData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create load');
      }

      const data = await res.json();
      toast.success('Load created successfully!');
      onSuccess(data.load);
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/60 shrink-0 rounded-t-3xl">
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Plus size={18} className="text-blue-500" />
            <span>Create New Shipment / Load</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          {/* Section 1: Customer */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-blue-500 uppercase tracking-wider">1. Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Wayfair Inc"
                  value={customerCompany}
                  onChange={(e) => setCustomerCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Phone / Mobile</label>
                <input
                  type="text"
                  placeholder="e.g. +1 (555) 019"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Origin & Destination */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-850">
            <h3 className="text-xs font-black text-blue-500 uppercase tracking-wider">2. Route & Scheduling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin */}
              <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-850/30 border border-slate-200/60 dark:border-slate-800 rounded-2xl">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block">Pickup Details</span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Full Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100 Main St, Chicago, IL"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">City / Region *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chicago"
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Date & Time *</label>
                    <input
                      type="datetime-local"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Destination */}
              <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-850/30 border border-slate-200/60 dark:border-slate-800 rounded-2xl">
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-wider block">Delivery Details</span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Full Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2300 Stemmons Fwy, Dallas, TX"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">City / Region *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dallas"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Date & Time *</label>
                    <input
                      type="datetime-local"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Cargo & Carrier Assignment */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-850">
            <h3 className="text-xs font-black text-blue-500 uppercase tracking-wider">3. Cargo & Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Commodity *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat Pack Furniture"
                      value={commodity}
                      onChange={(e) => setCommodity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Weight (Kg) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 14000"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Driver Assignment</label>
                <select
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {drivers
                    .filter(d => d.status === 'available')
                    .map(d => (
                      <option key={d._id} value={d._id}>{d.name} ({d.rating || 4.5} ★)</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Vehicle Assignment</label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {vehicles
                    .filter(v => v.status === 'active' || v.status === 'idle')
                    .map(v => (
                      <option key={v._id} value={v._id}>{v.vehicleNumber} - {v.make} ({v.type})</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Base Rate ($) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 3500"
                  value={baseRate}
                  onChange={(e) => setBaseRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Estimated Fuel Cost ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={fuelCost}
                  onChange={(e) => setFuelCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-850 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-bold rounded-2xl text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-750 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50"
            >
              <Save size={15} />
              <span>{submitting ? 'Saving...' : 'Save Shipment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
