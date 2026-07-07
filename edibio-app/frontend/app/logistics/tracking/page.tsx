'use client';
import React, { useEffect, useState } from 'react';
import { useStore, useActiveCompany } from '@/lib/store';
import { useLogisticsStore } from '@/lib/logistics/store';
import { LoadCard } from '@/components/logistics/LoadCard';
import LoadDetailPanel from '@/components/logistics/LoadDetailPanel';
import MapView from '@/components/logistics/MapView';
import CreateLoadModal from '@/components/logistics/CreateLoadModal';
import { Search, Plus, Compass, Filter, RefreshCcw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TrackingPage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const {
    loads,
    setLoads,
    selectedLoad,
    setSelectedLoad,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    isLoading,
    setIsLoading,
    addLoad,
    updateLoad
  } = useLogisticsStore();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchLoads = async () => {
    if (!companyId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/logistics/loads?companyId=${companyId}`);
      if (!res.ok) throw new Error('Failed to fetch loads');
      const data = await res.json();
      setLoads(data.loads || []);

      // Keep selected load synced if it exists
      if (selectedLoad) {
        const freshSelected = data.loads.find((l: any) => l._id === selectedLoad._id);
        if (freshSelected) setSelectedLoad(freshSelected);
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to load shipments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, [companyId]);

  // Handle updates from detail panel
  const handleUpdateLoad = (loadId: string, updates: any) => {
    updateLoad(loadId, updates);
  };

  // Handle deletions from detail panel
  const handleDeleteLoad = async (loadId: string) => {
    const toastId = toast.loading('Deleting shipment...');
    try {
      const res = await fetch(`/api/api/logistics/loads/${loadId}`, {
        method: 'DELETE'
      });
      // Wait, is it /api/api or /api/logistics? Let's check our API route path.
      // The API route is /api/logistics/loads/[id]/route.ts
      // So fetch should go to `/api/logistics/loads/${loadId}`
      const response = await fetch(`/api/logistics/loads/${loadId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Delete request failed');

      toast.success('Shipment deleted successfully', { id: toastId });
      setSelectedLoad(null);
      fetchLoads();
    } catch (e: any) {
      toast.error(e.message || 'Error deleting load', { id: toastId });
    }
  };

  const filteredLoads = loads.filter((load) => {
    // 1. Search Query Filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      load.loadNumber.toLowerCase().includes(query) ||
      load.customerName.toLowerCase().includes(query) ||
      load.pickupCity.toLowerCase().includes(query) ||
      load.deliveryCity.toLowerCase().includes(query) ||
      (load.driverName || '').toLowerCase().includes(query);

    // 2. Status Tab Filter
    const matchesStatus =
      activeFilter === 'all' || load.status === activeFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-slate-100 overflow-hidden">
      {/* Panel 1: Load List (320px) */}
      <div className="w-full lg:w-80 flex flex-col border-r border-slate-200 bg-slate-50 shrink-0 h-full">
        {/* Search & Actions Header */}
        <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search shipments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 text-xs font-semibold rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="p-2 bg-blue-600 hover:bg-blue-750 text-white rounded-xl shadow-md transition-all shrink-0"
              title="Create Load"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Filter Navigation Slider */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px] font-bold">
            {(['all', 'in_transit', 'upcoming', 'delayed', 'delivered'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1.5 rounded-lg border whitespace-nowrap transition-all capitalize
                  ${activeFilter === filter
                    ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-850 dark:border-slate-800'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-350 hover:text-slate-850'
                  }
                `}
              >
                {filter.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Load List Content */}
        <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-400 font-semibold flex flex-col items-center gap-2">
              <RefreshCcw size={16} className="animate-spin text-blue-500" />
              <span>Loading shipments...</span>
            </div>
          ) : filteredLoads.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-3xl p-6">
              No shipments found. Click "+" to create one.
            </div>
          ) : (
            filteredLoads.map((load) => (
              <LoadCard
                key={load._id}
                load={load}
                selected={selectedLoad?._id === load._id}
                onClick={() => setSelectedLoad(load)}
              />
            ))
          )}
        </div>
      </div>

      {/* Panel 2: Detail Panel (flex-1) */}
      <div className="flex-1 flex flex-col min-w-0 h-full border-r border-slate-200">
        {selectedLoad ? (
          <LoadDetailPanel
            load={selectedLoad}
            onUpdate={handleUpdateLoad}
            onDelete={handleDeleteLoad}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mb-4">
              <Compass size={32} className="animate-pulse" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1">No Shipment Selected</h3>
            <p className="text-xs text-slate-450 max-w-[280px] leading-relaxed">
              Select a load from the left panel to display cargo, customer invoice files, and route checkpoint milestones.
            </p>
          </div>
        )}
      </div>

      {/* Panel 3: Map View (440px) */}
      <div className="hidden xl:block w-[440px] shrink-0 h-full bg-slate-900 border-l border-slate-200">
        {selectedLoad ? (
          <MapView
            key={selectedLoad._id}
            pickupLat={selectedLoad.pickupLat}
            pickupLng={selectedLoad.pickupLng}
            deliveryLat={selectedLoad.deliveryLat}
            deliveryLng={selectedLoad.deliveryLng}
            currentLat={selectedLoad.currentLat}
            currentLng={selectedLoad.currentLng}
            pickupCity={selectedLoad.pickupCity}
            deliveryCity={selectedLoad.deliveryCity}
            loadNumber={selectedLoad.loadNumber}
            status={selectedLoad.status}
          />
        ) : (
          <MapView />
        )}
      </div>

      {/* Create Load Modal */}
      <CreateLoadModal
        companyId={companyId}
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={(newLoad) => {
          addLoad(newLoad);
          setSelectedLoad(newLoad);
          fetchLoads();
        }}
      />
    </div>
  );
}
