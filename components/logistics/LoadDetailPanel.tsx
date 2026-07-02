'use client';
import React, { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import {
  MapPin,
  Calendar,
  DollarSign,
  User,
  Truck,
  FileText,
  Clock,
  Compass,
  Paperclip,
  Plus,
  Send,
  Trash2,
  AlertTriangle,
  Briefcase
} from 'lucide-react';
import { LoadDocument, LoadEvent } from '@/lib/logistics/types';
import { useLogisticsStore } from '@/lib/logistics/store';
import toast from 'react-hot-toast';

interface LoadDetailPanelProps {
  load: LoadDocument;
  onUpdate: (loadId: string, updates: Partial<LoadDocument>) => void;
  onDelete: (loadId: string) => void;
}

export default function LoadDetailPanel({ load, onUpdate, onDelete }: LoadDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'timeline' | 'docs' | 'financials'>('info');
  const [events, setEvents] = useState<LoadEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false);

  // New Event Form State
  const [showAddEvent, setShowAddEvent] = useState<boolean>(false);
  const [eventType, setEventType] = useState<string>('checkpoint_arrived');
  const [eventLocation, setEventLocation] = useState<string>('');
  const [eventNotes, setEventNotes] = useState<string>('');
  const [submittingEvent, setSubmittingEvent] = useState<boolean>(false);

  // New Doc Form State
  const [docName, setDocName] = useState<string>('');
  const [docs, setDocs] = useState<{ name: string; size: string; date: string }[]>([
    { name: 'Bill_of_Lading_Signed.pdf', size: '1.4 MB', date: '2026-05-28' },
    { name: 'Insurance_Certificate_Carrier.pdf', size: '450 KB', date: '2026-05-27' }
  ]);

  // Fetch events on mount or when load ID changes
  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const res = await fetch(`/api/logistics/loads/${load._id}`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data.events || []);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load transit events');
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    if (load._id) {
      fetchEvents();
    }
  }, [load._id]);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventLocation) {
      toast.error('Please enter a location name');
      return;
    }
    setSubmittingEvent(true);
    try {
      const res = await fetch('/api/logistics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loadId: load._id,
          type: eventType,
          locationName: eventLocation,
          notes: eventNotes,
          driverId: load.driverId,
          driverName: load.driverName,
          timestamp: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error('Failed to create event');
      toast.success('Event logged successfully');
      setEventLocation('');
      setEventNotes('');
      setShowAddEvent(false);

      // Refresh events and parent data
      fetchEvents();
      // If event status changes state, update parent load status locally
      let nextStatus = load.status;
      if (eventType === 'picked_up') nextStatus = 'in_transit';
      else if (eventType === 'delivered') nextStatus = 'delivered';
      else if (eventType === 'delay_reported') nextStatus = 'delayed';
      
      onUpdate(load._id!, { status: nextStatus });
    } catch (err: any) {
      toast.error(err.message || 'Error logging event');
    } finally {
      setSubmittingEvent(false);
    }
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) return;
    setDocs([
      ...docs,
      {
        name: docName.endsWith('.pdf') ? docName : `${docName}.pdf`,
        size: '120 KB',
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setDocName('');
    toast.success('Document uploaded successfully (Simulation)');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this load? This action is permanent.')) {
      onDelete(load._id!);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Detail Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-850 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-slate-900/60">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-base font-black text-slate-900 dark:text-white">{load.loadNumber}</h2>
            <StatusBadge status={load.status} />
          </div>
          <p className="text-xs text-slate-500 mt-1 font-semibold">{load.commodity}</p>
        </div>

        <button
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all"
          title="Delete load"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Detail Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-850 shrink-0 px-2 bg-slate-50/50 dark:bg-slate-900/20">
        {(['info', 'timeline', 'docs', 'financials'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-xs font-bold border-b-2 capitalize transition-all
              ${activeTab === tab
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-450 hover:text-slate-700 dark:hover:text-slate-250'
              }
            `}
          >
            {tab === 'docs' ? 'Documents' : tab}
          </button>
        ))}
      </div>

      {/* Scrollable Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
        {/* INFO TAB */}
        {activeTab === 'info' && (
          <div className="space-y-6 text-left">
            {/* Customer Section */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={16} className="text-blue-500" />
                <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Customer</h3>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{load.customerName}</p>
              {load.customerCompany && (
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{load.customerCompany}</p>
              )}
              <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-750 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Phone</span>
                  <span className="text-slate-800 dark:text-slate-350 font-bold">{load.customerPhone || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Email</span>
                  <span className="text-slate-800 dark:text-slate-350 font-bold truncate block">{load.customerEmail || '—'}</span>
                </div>
              </div>
            </div>

            {/* Route Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-450 uppercase tracking-wider">Route Coordinates</h3>
              <div className="relative pl-6 space-y-4">
                <div className="absolute left-[5px] top-[7px] bottom-[7px] w-0.5 bg-slate-200 dark:bg-slate-800" />
                
                {/* Pickup */}
                <div className="relative">
                  <span className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none">Origin (Pickup)</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{load.pickupAddress}</p>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">
                      Scheduled: {new Date(load.pickupDate).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Delivery */}
                <div className="relative">
                  <span className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white ring-1 ring-rose-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none">Destination (Delivery)</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{load.deliveryAddress}</p>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">
                      Scheduled: {new Date(load.deliveryDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carrier Assignment */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <User size={16} className="text-blue-500" />
                <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Assignment</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Driver</span>
                  <span className="text-slate-800 dark:text-slate-350 font-bold">{load.driverName || 'Unassigned'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Vehicle/Truck</span>
                  <span className="text-slate-800 dark:text-slate-350 font-bold">{load.vehicleNumber || 'Unassigned'}</span>
                </div>
              </div>
            </div>

            {/* Cargo / Load specifications */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Truck size={16} className="text-blue-500" />
                <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Cargo Info</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Commodity</span>
                  <span className="text-slate-800 dark:text-slate-350 font-bold truncate block">{load.commodity}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Weight</span>
                  <span className="text-slate-800 dark:text-slate-350 font-bold">{load.weightKg?.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Volume</span>
                  <span className="text-slate-800 dark:text-slate-350 font-bold">{load.volumeCbm || '—'} cbm</span>
                </div>
              </div>
              {load.specialInstructions && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-750 text-xs">
                  <span className="text-slate-400 font-semibold block mb-1">Special Instructions</span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                    {load.specialInstructions}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-450 uppercase tracking-wider">Transit Events</h3>
              <button
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-750"
              >
                <Plus size={14} />
                <span>Log Event</span>
              </button>
            </div>

            {/* Event Form */}
            {showAddEvent && (
              <form onSubmit={handleAddEvent} className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Event Type</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      <option value="checkpoint_arrived">Arrived Checkpoint</option>
                      <option value="checkpoint_departed">Departed Checkpoint</option>
                      <option value="picked_up">Picked Up (In Transit)</option>
                      <option value="delivered">Delivered</option>
                      <option value="delay_reported">Report Delay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Location Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Memphis Terminal"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Notes / Description</label>
                  <textarea
                    rows={2}
                    placeholder="Provide incident or checkpoint notes..."
                    value={eventNotes}
                    onChange={(e) => setEventNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowAddEvent(false)}
                    className="px-3 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingEvent}
                    className="px-3 py-2 bg-blue-600 text-white font-bold rounded-xl flex items-center gap-1"
                  >
                    <Send size={12} />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            )}

            {/* Event List */}
            {loadingEvents ? (
              <div className="py-8 text-center text-xs text-slate-400 font-semibold">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 font-semibold border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                No events recorded for this load yet.
              </div>
            ) : (
              <div className="relative pl-6 space-y-5">
                <div className="absolute left-[5px] top-[8px] bottom-[8px] w-0.5 bg-slate-200 dark:bg-slate-800" />
                {events.map((ev, index) => (
                  <div key={ev._id || index} className="relative">
                    <span className="absolute -left-[24px] top-1.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-50 dark:ring-blue-900/30" />
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-slate-800 dark:text-slate-250 capitalize">
                          {ev.type.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(ev.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}{' '}
                          {new Date(ev.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-500 mt-0.5">{ev.locationName}</p>
                      {ev.notes && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800 leading-relaxed">
                          {ev.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'docs' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xs font-black text-slate-450 uppercase tracking-wider">Cargo & Transit Documents</h3>

            {/* Document Form */}
            <form onSubmit={handleAddDocument} className="flex gap-2">
              <input
                type="text"
                placeholder="Document name (e.g. POD_Signed)"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-750 text-white font-bold rounded-xl text-xs flex items-center gap-1 shrink-0 shadow-sm"
              >
                <Plus size={14} />
                <span>Upload</span>
              </button>
            </form>

            {/* Document List */}
            <div className="space-y-2">
              {docs.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{doc.name}</p>
                      <p className="text-[10px] text-slate-450 font-medium mt-0.5">
                        {doc.size} • Uploaded {doc.date}
                      </p>
                    </div>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success(`Downloading ${doc.name}...`);
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline px-2.5 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FINANCIALS TAB */}
        {activeTab === 'financials' && (
          <div className="space-y-6 text-left">
            <h3 className="text-xs font-black text-slate-450 uppercase tracking-wider">Financial Accounts</h3>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-3 rounded-2xl">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block">Gross Revenue</span>
                <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 mt-1 block">
                  ${(load.grossRevenue || load.baseRate || 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 p-3 rounded-2xl">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider block">Driver Payout</span>
                <span className="text-sm font-extrabold text-indigo-700 dark:text-indigo-400 mt-1 block">
                  ${(load.netPayout || 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 p-3 rounded-2xl">
                <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Profit Margin</span>
                <span className="text-sm font-extrabold text-slate-700 dark:text-slate-300 mt-1 block">
                  {load.profitMargin || '19.5'}%
                </span>
              </div>
            </div>

            {/* Financial Ledger */}
            <div className="bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
              <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-750">
                Itemized Breakdown
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-750 font-medium">
                <div className="flex items-center justify-between p-3.5">
                  <span className="text-slate-500 font-bold">Base Rate</span>
                  <span className="text-slate-800 dark:text-slate-200 font-extrabold">${(load.baseRate || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="text-slate-500 font-bold">Fuel Cost</span>
                  <span className="text-slate-800 dark:text-slate-200 font-extrabold">${(load.fuelCost || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="text-slate-500 font-bold">Fuel Rebate</span>
                  <span className="text-slate-800 dark:text-slate-200 font-extrabold">+${(load.fuelRebate || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="text-slate-500 font-bold">Tolls & Scale Costs</span>
                  <span className="text-slate-800 dark:text-slate-200 font-extrabold">${(load.tollCost || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="text-slate-500 font-bold">Taxes</span>
                  <span className="text-slate-800 dark:text-slate-200 font-extrabold">${(load.taxes || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-slate-100/50 dark:bg-slate-800/40">
                  <span className="text-slate-900 dark:text-white font-extrabold">Net Profit</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">
                    ${Math.max(0, (load.grossRevenue || load.baseRate || 0) - ((load.netPayout || 0) + (load.tollCost || 0) + (load.fuelCost || 0))).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
