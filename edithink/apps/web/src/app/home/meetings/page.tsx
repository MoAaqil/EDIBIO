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
      <span className="badge-active">
        <span className="dot-active" style={{ width: 6, height: 6 }} />
        Active
      </span>
    );
  if (status === 'scheduled')
    return (
      <span className="badge-scheduled">
        <span className="dot-scheduled" style={{ width: 6, height: 6 }} />
        Scheduled
      </span>
    );
  return (
    <span className="badge-ended">Ended</span>
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
          <h1 style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: 0 }}>Meetings</h1>
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>View, create, and manage your video calls.</p>
        </div>
        <button onClick={createMeeting} className="btn-primary">
          <Plus size={16} />
          New Instant Meeting
        </button>
      </div>

      {/* ── Filters Bar ── */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
        style={{
          background: '#FFFFFF',
          border: '1px solid #EAECEF',
          borderRadius: 16,
          padding: '12px 16px',
        }}
      >
        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-lg"
          style={{ background: '#F3F4F6', flexShrink: 0 }}
        >
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
              style={{
                background: activeTab === t.id ? '#FFFFFF' : 'transparent',
                color: activeTab === t.id ? '#111827' : '#6B7280',
                boxShadow: activeTab === t.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title or ID…"
            className="input pl-10"
            style={{ height: 38, fontSize: 13 }}
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
        <div className="empty-state">
          <div className="empty-state-icon">
            <Video size={24} style={{ color: '#9CA3AF' }} />
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>No meetings found</h3>
          <p style={{ fontSize: 13, color: '#6B7280', maxWidth: 280, margin: '0 auto 20px' }}>
            Start a new instant meeting or schedule one in the calendar.
          </p>
          <button onClick={createMeeting} className="btn-primary" style={{ height: 38, padding: '0 16px', fontSize: 13 }}>
            <Plus size={15} />
            New Instant Meeting
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((m, i) => (
              <motion.div
                key={m._id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, delay: i * 0.03 }}
                className="card-lift"
                style={{ padding: '20px 24px' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                  {/* Left: Icon + Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Status icon */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-xl"
                      style={{
                        width: 44, height: 44,
                        background: m.status === 'active'
                          ? 'rgba(34,197,94,0.1)'
                          : m.status === 'scheduled'
                            ? '#EEF4FF'
                            : '#F3F4F6',
                      }}
                    >
                      <Video
                        size={20}
                        style={{
                          color: m.status === 'active'
                            ? '#22C55E'
                            : m.status === 'scheduled'
                              ? '#2563EB'
                              : '#9CA3AF',
                        }}
                      />
                    </div>

                    {/* Text block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: 0 }} className="truncate">
                          {m.title}
                        </h3>
                        <StatusBadge status={m.status} />
                      </div>

                      <div className="flex items-center gap-3 flex-wrap" style={{ fontSize: 12, color: '#6B7280' }}>
                        <span
                          className="font-mono"
                          style={{
                            background: '#F3F4F6',
                            color: '#374151',
                            padding: '1px 8px',
                            borderRadius: 6,
                            fontSize: 11,
                          }}
                        >
                          {m.roomId}
                        </span>
                        {m.scheduledAt ? (
                          <>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} style={{ color: '#9CA3AF' }} />
                              {formatDate(m.scheduledAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} style={{ color: '#9CA3AF' }} />
                              {formatTime(m.scheduledAt)}
                            </span>
                          </>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock size={12} style={{ color: '#9CA3AF' }} />
                            Instant
                          </span>
                        )}
                        {m.participants?.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Users size={12} style={{ color: '#9CA3AF' }} />
                            {m.participants.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                    <button
                      onClick={() => handleCopy(m.inviteLink, m._id)}
                      className="btn-secondary"
                      style={{ height: 38, padding: '0 14px', fontSize: 13 }}
                    >
                      <Copy size={14} />
                      {copiedId === m._id ? 'Copied!' : 'Copy Link'}
                    </button>

                    {m.status !== 'ended' && m.status !== 'cancelled' && (
                      <>
                        <button
                          onClick={() => router.push(`/meet/${m.roomId}`)}
                          className="btn-primary"
                          style={{ height: 38, padding: '0 18px', fontSize: 13 }}
                        >
                          <Play size={14} style={{ fill: '#fff' }} />
                          Join
                        </button>
                        <button
                          onClick={() => cancelMeeting(m._id)}
                          className="flex items-center justify-center rounded-xl transition-colors"
                          style={{
                            width: 38, height: 38,
                            border: '1px solid #E5E7EB',
                            color: '#EF4444',
                            background: '#FFFFFF',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#FEF2F2';
                            e.currentTarget.style.borderColor = '#FECACA';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
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
