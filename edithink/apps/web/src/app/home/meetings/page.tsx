'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Plus, Search, Calendar, Clock,
  Copy, Trash2, Play, Users
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { formatDate, formatTime, copyToClipboard } from '@/lib/utils';
import api from '@/lib/api';
import { toast } from '@/components/ui/toaster';

type TabType = 'all' | 'scheduled' | 'ended';

function StatusBadge({ status }: { status: string }) {
  if (status === 'active')
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft" />
        Active
      </span>
    );
  if (status === 'scheduled')
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        Scheduled
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      Ended
    </span>
  );
}

export default function MeetingsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [meetings, setMeetings]     = useState<any[]>([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab]   = useState<TabType>('all');
  const [copiedId, setCopiedId]     = useState<string | null>(null);

  useEffect(() => { fetchMeetings(); }, []);

  const fetchMeetings = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/meetings');
      setMeetings(res.data.meetings || []);
    } catch { /* silent */ }
    finally { setIsLoading(false); }
  };

  const createMeeting = async () => {
    try {
      const res = await api.post('/meetings', { title: `${user?.name}'s Meeting`, type: 'instant' });
      router.push(`/meet/${res.data.meeting.roomId}`);
    } catch { /* silent */ }
  };

  const cancelMeeting = async (id: string) => {
    if (!confirm('Cancel this meeting?')) return;
    try {
      await api.delete(`/meetings/${id}`);
      toast({ title: 'Meeting cancelled', description: 'The meeting has been removed.' });
      fetchMeetings();
    } catch { /* silent */ }
  };

  const handleCopy = async (link: string, id: string) => {
    copyToClipboard(link);
    setCopiedId(id);
    toast({ title: '📋 Invite link copied!' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = meetings.filter(m => {
    const q = searchQuery.toLowerCase();
    const matches = m.title.toLowerCase().includes(q) || m.roomId.toLowerCase().includes(q);
    if (activeTab === 'all') return matches;
    if (activeTab === 'scheduled') return matches && m.status === 'scheduled';
    if (activeTab === 'ended') return matches && (m.status === 'ended' || m.status === 'cancelled');
    return matches;
  });

  const tabs: { id: TabType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'scheduled', label: 'Upcoming' },
    { id: 'ended', label: 'Past' },
  ];

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#0F172A', margin: 0 }}>Meetings</h1>
          <p className="text-md" style={{ color: '#64748B', marginTop: 6, fontWeight: 500 }}>View, create, and manage your video calls.</p>
        </div>
        <button onClick={createMeeting} className="btn-primary">
          <Plus size={16} />
          New Instant Meeting
        </button>
      </div>

      {/* ── Filters Bar ── */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 card shadow-sm"
        style={{ background: '#FFFFFF' }}
      >
        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-[12px]"
          style={{ background: '#FAFAFB', border: '1px solid #ECECEC', flexShrink: 0 }}
        >
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="px-4 py-2 rounded-[8px] text-sm font-semibold transition-all"
              style={{
                background: activeTab === t.id ? '#FFFFFF' : 'transparent',
                color: activeTab === t.id ? '#0F172A' : '#64748B',
                boxShadow: activeTab === t.id ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                border: activeTab === t.id ? '1px solid #ECECEC' : '1px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title or ID…"
            className="input pl-11"
            style={{ height: 42, fontSize: 13 }}
          />
        </div>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="empty-state">
          <div className="w-10 h-10 border-[3px] border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>Loading meetings…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state p-8 md:p-12">
          <div className="empty-state-icon">
            <Video size={24} style={{ color: '#9CA3AF' }} />
          </div>
          <h3 className="text-xl font-semibold" style={{ color: '#0F172A', margin: '0 0 6px' }}>No meetings found</h3>
          <p className="text-sm" style={{ color: '#64748B', maxWidth: 280, margin: '0 auto 20px' }}>
            Start a new instant meeting or schedule one in the calendar.
          </p>
          <button onClick={createMeeting} className="btn-primary" style={{ height: 40, padding: '0 16px', fontSize: 13 }}>
            <Plus size={15} />
            New Instant Meeting
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((m, i) => (
              <motion.div
                key={m._id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="card-lift"
                style={{ padding: '24px' }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Left: Icon + Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Status icon */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-2xl border border-transparent shadow-sm transition-transform group-hover:scale-105"
                      style={{
                        width: 48, height: 48,
                        background: m.status === 'active'
                          ? 'rgba(34,197,94,0.08)'
                          : m.status === 'scheduled'
                            ? '#EEF4FF'
                            : '#FAFAFB',
                        borderColor: m.status === 'active'
                          ? 'rgba(34,197,94,0.2)'
                          : m.status === 'scheduled'
                            ? '#DBEAFE'
                            : '#ECECEC',
                      }}
                    >
                      <Video
                        size={22}
                        fill={m.status === 'active' || m.status === 'scheduled' ? 'currentColor' : 'none'}
                        style={{
                          color: m.status === 'active'
                            ? '#22C55E'
                            : m.status === 'scheduled'
                              ? '#2563EB'
                              : '#64748B',
                        }}
                      />
                    </div>

                    {/* Text block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-semibold" style={{ color: '#0F172A', margin: 0 }}>
                          {m.title}
                        </h3>
                        <StatusBadge status={m.status} />
                      </div>

                      <div className="flex items-center gap-4 flex-wrap text-sm" style={{ color: '#64748B', fontWeight: 500 }}>
                        <span
                          className="font-mono text-xs font-semibold px-2 py-0.5 rounded-[6px]"
                          style={{ background: '#FAFAFB', border: '1px solid #ECECEC', color: '#0F172A' }}
                        >
                          {m.roomId}
                        </span>
                        {m.scheduledAt ? (
                          <>
                            <span className="flex items-center gap-1.5">
                              <Calendar size={13} style={{ color: '#64748B' }} />
                              {formatDate(m.scheduledAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={13} style={{ color: '#64748B' }} />
                              {formatTime(m.scheduledAt)}
                            </span>
                          </>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} style={{ color: '#64748B' }} />
                            Instant
                          </span>
                        )}

                        {/* Avatars Stack */}
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2.5 overflow-hidden">
                            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">JD</div>
                            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">AS</div>
                            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">MK</div>
                          </div>
                          <span className="text-xs font-semibold" style={{ color: '#64748B' }}>
                            +{m.participants?.length > 0 ? m.participants.length : 3} participants
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
                    <button
                      onClick={() => handleCopy(m.inviteLink, m._id)}
                      className="btn-secondary"
                      style={{ height: 40, padding: '0 16px', fontSize: 13 }}
                    >
                      <Copy size={14} />
                      {copiedId === m._id ? 'Copied!' : 'Copy Link'}
                    </button>

                    {m.status !== 'ended' && m.status !== 'cancelled' && (
                      <>
                        <button
                          onClick={() => router.push(`/meet/${m.roomId}`)}
                          className="btn-primary"
                          style={{ height: 40, padding: '0 18px', fontSize: 13 }}
                        >
                          <Play size={14} fill="currentColor" />
                          Join
                        </button>
                        <button
                          onClick={() => cancelMeeting(m._id)}
                          className="flex items-center justify-center rounded-xl transition-colors border"
                          style={{
                            width: 40, height: 40,
                            borderColor: '#ECECEC',
                            color: '#EF4444',
                            background: '#FFFFFF',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#FEF2F2';
                            e.currentTarget.style.borderColor = '#FECACA';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#ECECEC';
                          }}
                          title="Cancel meeting"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
