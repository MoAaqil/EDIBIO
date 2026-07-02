'use client';
import React, { useEffect, useState } from 'react';
import { useActiveCompany } from '@/lib/store';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Compass, DollarSign, Navigation, Calendar, Award, RefreshCw, BarChart3, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { LogisticsAnalytics } from '@/lib/logistics/types';

const COLORS = ['#6366F1', '#10B981', '#64748B', '#F59E0B', '#EF4444'];

export default function AnalyticsPage() {
  const company = useActiveCompany();
  const companyId = company?.id || '';

  const [analytics, setAnalytics] = useState<LogisticsAnalytics | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/logistics/analytics?companyId=${companyId}`);
      if (!res.ok) throw new Error('Failed to fetch analytics');
      const data = await res.json();
      setAnalytics(data.analytics || null);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load analytics dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [companyId]);

  if (loading || !analytics) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 min-h-screen">
        <RefreshCw size={24} className="animate-spin text-blue-500 mb-2" />
        <span className="text-xs text-slate-400 font-bold">Computing logistics reports...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-955 overflow-y-auto no-scrollbar">
      {/* Analytics KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {/* Rev */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Total Revenue</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              ${analytics.totalRevenue.toLocaleString()}
            </span>
          </div>
          <div className="w-10 h-10 bg-indigo-50 text-indigo-650 dark:bg-indigo-950/20 dark:text-indigo-400 rounded-xl flex items-center justify-center">
            <DollarSign size={20} />
          </div>
        </div>

        {/* Profit */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block">Net profit</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-450 mt-1 block">
              ${analytics.totalProfit.toLocaleString()}
            </span>
            <span className="text-[9px] font-bold text-emerald-500 mt-1 block">
              {analytics.avgProfitMargin.toFixed(1)}% margin
            </span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-650 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
        </div>

        {/* Distance */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Distance Driven</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              {analytics.totalDistanceKm.toLocaleString()} Km
            </span>
            <span className="text-[9px] font-bold text-slate-400 mt-1 block">
              Cost: ${analytics.avgCostPerKm.toFixed(2)}/Km
            </span>
          </div>
          <div className="w-10 h-10 bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-350 rounded-xl flex items-center justify-center">
            <Navigation size={18} className="rotate-45" />
          </div>
        </div>

        {/* On Time Rate */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-wider block">On-Time Deliveries</span>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-450 mt-1 block">
              {analytics.onTimeDeliveryRate}%
            </span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 dark:bg-blue-955/20 dark:text-blue-400 rounded-xl flex items-center justify-center">
            <Calendar size={18} />
          </div>
        </div>
      </div>

      {/* Chart grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Trend Area Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm lg:col-span-2 flex flex-col h-[350px]">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <BarChart3 size={16} className="text-blue-500" />
            <span>Monthly Revenue trend</span>
          </h3>
          <div className="flex-1 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Load Status Pie chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex flex-col h-[350px]">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Loads Status Breakdown
          </h3>
          <div className="flex-1 w-full text-xs flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.loadsByStatus.filter(item => item.count > 0)}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="status"
                >
                  {analytics.loadsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconSize={8} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Driver Ratings Board */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-5 text-left">
        <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Award size={16} className="text-blue-500" />
          <span>Top Driver Performance Ratings</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-150 dark:border-slate-800 text-[10px] font-black text-slate-450 uppercase tracking-wider">
                <th className="pb-3 pr-4 text-left">Driver Name</th>
                <th className="pb-3 px-4 text-center">Completed Deliveries</th>
                <th className="pb-3 pl-4 text-right">Satisfied Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-750 dark:text-slate-350">
              {analytics.topDrivers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-slate-400 font-medium">No drivers trip logs recorded.</td>
                </tr>
              ) : (
                analytics.topDrivers.map((driver, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 pr-4 text-left font-bold text-slate-900 dark:text-white">{driver.name}</td>
                    <td className="py-3.5 px-4 text-center">{driver.loads} Loads</td>
                    <td className="py-3.5 pl-4 text-right font-black text-emerald-600 dark:text-emerald-400">
                      {driver.rating.toFixed(2)} ★
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
