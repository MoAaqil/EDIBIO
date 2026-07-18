'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Trash2, Calendar, Clock, Video, Search, FileVideo, Copy, Plus } from 'lucide-react';
import { formatDate, formatDuration, copyToClipboard } from '@/lib/utils';
import api from '@/lib/api';
import { toast } from '@/components/ui/toaster';

export default function RecordingsPage() {
  const router = useRouter();
  const [recordings, setRecordings] = useState<any[]>([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { fetchRecordings(); }, []);

  const fetchRecordings = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/recordings');
      setRecordings(res.data.recordings || []);
    } catch { /* silent */ }
    finally { setIsLoading(false); }
  };

  const deleteRecording = async (id: string) => {
    if (!confirm('Delete this recording permanently?')) return;
    try {
      await api.delete(`/recordings/${id}`);
      toast({ title: 'Recording deleted' });
      fetchRecordings();
    } catch { /* silent */ }
  };

  const handleShare = (rec: any) => {
    copyToClipboard(`${window.location.origin}/meet/${rec.meetingId?.roomId}`);
    toast({ title: '📋 Meeting link copied!' });
  };

  const filtered = recordings.filter(rec => {
    const title = rec.meetingId?.title || 'Recorded Meeting';
    const q = searchQuery.toLowerCase();
    return title.toLowerCase().includes(q) || rec._id.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: 0 }}>Recordings</h1>
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>View, play, and share your recorded sessions.</p>
        </div>
      </div>

      {/* ── Search bar ── */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #EAECEF',
          borderRadius: 16,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search recordings…"
            className="input pl-10"
            style={{ height: 38, fontSize: 13 }}
          />
        </div>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="empty-state">
          <div className="w-10 h-10 border-[3px] border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>Loading recordings…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state" style={{ paddingTop: 80, paddingBottom: 80 }}>
          {/* Large illustrative icon */}
          <div
            className="flex items-center justify-center mb-6"
            style={{
              width: 72, height: 72, background: '#F3F4F6',
              borderRadius: 20, border: '1px solid #EAECEF',
            }}
          >
            <FileVideo size={32} style={{ color: '#9CA3AF' }} />
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>
            No recordings yet
          </h3>
          <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 300, margin: '0 auto 28px', lineHeight: 1.6 }}>
            Start a meeting to create your first recording. Recordings appear here automatically once enabled.
          </p>
          <button
            onClick={() => router.push('/home/meetings')}
            className="btn-primary"
            style={{ height: 42, padding: '0 24px', fontSize: 14 }}
          >
            <Play size={16} />
            Start a Meeting
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((rec, i) => {
              const title = rec.meetingId?.title || 'Recorded Meeting';
              return (
                <motion.div
                  key={rec._id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.18, delay: i * 0.04 }}
                  className="card-lift overflow-hidden"
                  style={{ display: 'flex', flexDirection: 'column', padding: 0 }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{ background: '#0F172A', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '18px 18px 0 0' }}
                  >
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(99,102,241,0.1) 100%)' }}
                    />

                    {/* Play button */}
                    <div
                      className="relative z-10 flex items-center justify-center rounded-full transition-transform cursor-pointer"
                      style={{
                        width: 48, height: 48,
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(8px)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                    >
                      <Play size={20} style={{ color: '#fff', marginLeft: 2 }} fill="white" />
                    </div>

                    {/* Duration badge */}
                    {rec.duration && (
                      <span
                        className="absolute bottom-2.5 right-2.5 font-mono"
                        style={{
                          background: 'rgba(0,0,0,0.55)',
                          color: '#fff', fontSize: 10, fontWeight: 600,
                          padding: '2px 6px', borderRadius: 6,
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {formatDuration(rec.duration * 60)}
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: '0 0 6px' }} className="line-clamp-1">
                        {title}
                      </h4>
                      <div className="flex items-center gap-3" style={{ fontSize: 12, color: '#6B7280' }}>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} style={{ color: '#9CA3AF' }} />
                          {formatDate(rec.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Video size={12} style={{ color: '#9CA3AF' }} />
                          {rec.meetingId?.roomId || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid #F3F4F6' }}>
                      <button
                        onClick={() => handleShare(rec)}
                        className="flex-1 btn-secondary"
                        style={{ height: 34, fontSize: 12, padding: '0 12px' }}
                      >
                        <Copy size={13} />
                        Share Link
                      </button>
                      <button
                        onClick={() => deleteRecording(rec._id)}
                        className="flex items-center justify-center rounded-xl transition-colors"
                        style={{ width: 34, height: 34, border: '1px solid #E5E7EB', color: '#EF4444', background: '#FFFFFF' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.borderColor = '#FECACA'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                        title="Delete recording"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
