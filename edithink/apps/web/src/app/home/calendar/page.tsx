'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Plus, X, Clock,
  Calendar, Copy, Trash2, Video, Link2, Users
} from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { formatDate, formatTime, copyToClipboard } from '@/lib/utils';
import { toast } from '@/components/ui/toaster';

/* ─────────────── helpers ─────────────── */
const MONTHS    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_S    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAYS_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const HOURS     = Array.from({ length: 17 }, (_, i) => i + 6); // 06–22

const EVENT_COLORS = [
  { bg: '#EFF6FF', border: '#BFDBFE', bar: '#3B82F6', text: '#1D4ED8' },
  { bg: '#F5F3FF', border: '#DDD6FE', bar: '#8B5CF6', text: '#6D28D9' },
  { bg: '#FFF0F3', border: '#FECDD3', bar: '#F43F5E', text: '#BE123C' },
  { bg: '#F0FDF4', border: '#BBF7D0', bar: '#22C55E', text: '#15803D' },
  { bg: '#FFFBEB', border: '#FDE68A', bar: '#F59E0B', text: '#B45309' },
];

function getWeekStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
}
function addDays(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}
function fmtHour(h: number) { return `${String(h).padStart(2,'0')}:00`; }
function getColor(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
  return EVENT_COLORS[Math.abs(h) % EVENT_COLORS.length];
}

const SLOT_H = 64; // px per hour row

export default function CalendarPage() {
  const router  = useRouter();
  const { user } = useAuthStore();
  const today   = new Date();

  const [weekStart, setWeekStart] = useState(getWeekStart(today));
  const [meetings, setMeetings]   = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  /* form */
  const [title, setTitle]           = useState('');
  const [date, setDate]             = useState('');
  const [time, setTime]             = useState('');
  const [duration, setDuration]     = useState('60');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError]   = useState('');

  useEffect(() => { fetchMeetings(); }, []);

  const fetchMeetings = async () => {
    setIsLoading(true);
    try {
      const r = await api.get('/meetings?status=scheduled');
      setMeetings(r.data.meetings || []);
    } catch { /* silent */ }
    finally { setIsLoading(false); }
  };

  const deleteMeeting = async (id: string) => {
    if (!confirm('Cancel this meeting?')) return;
    try {
      await api.delete(`/meetings/${id}`);
      setSelectedMeeting(null);
      toast({ title: 'Meeting cancelled' });
      fetchMeetings();
    } catch { /* silent */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) { setFormError('Please fill all required fields'); return; }
    setIsSubmitting(true); setFormError('');
    try {
      await api.post('/meetings', {
        title,
        scheduledAt: new Date(`${date}T${time}`).toISOString(),
        duration: Number(duration),
        description,
        type: 'scheduled',
      });
      setShowModal(false);
      setTitle(''); setDate(''); setTime(''); setDuration('60'); setDescription('');
      toast({ title: '📅 Meeting scheduled!', description: `"${title}" added to your calendar.` });
      fetchMeetings();
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to schedule meeting');
    } finally { setIsSubmitting(false); }
  };

  const weekDays   = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekEnd    = addDays(weekStart, 6);

  const isToday    = (d: Date) =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth()    === today.getMonth()    &&
    d.getDate()     === today.getDate();

  const getMeetingsForHour = (day: Date, hour: number) =>
    meetings.filter(m => {
      if (!m.scheduledAt) return false;
      const d = new Date(m.scheduledAt);
      return d.getFullYear() === day.getFullYear() &&
             d.getMonth()    === day.getMonth()    &&
             d.getDate()     === day.getDate()     &&
             d.getHours()    === hour;
    });

  const getMeetingsForDay  = (day: Date) =>
    meetings.filter(m => {
      if (!m.scheduledAt) return false;
      const d = new Date(m.scheduledAt);
      return d.getFullYear() === day.getFullYear() &&
             d.getMonth()    === day.getMonth()    &&
             d.getDate()     === day.getDate();
    });

  /* Agenda: today + tomorrow */
  const agendaToday = meetings
    .filter(m => {
      if (!m.scheduledAt) return false;
      const d = new Date(m.scheduledAt);
      return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    })
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  const tomorrow = addDays(today, 1);
  const agendaTomorrow = meetings
    .filter(m => {
      if (!m.scheduledAt) return false;
      const d = new Date(m.scheduledAt);
      return d.getDate() === tomorrow.getDate() && d.getMonth() === tomorrow.getMonth() && d.getFullYear() === tomorrow.getFullYear();
    })
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  return (
    /* Full bleed — remove layout's padding via negative margin */
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)', margin: '-32px -40px', overflow: 'hidden' }}>

      {/* ══ Top Bar ══ */}
      <div
        className="flex-shrink-0 flex flex-wrap items-center gap-3 px-6 py-3"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #EAECEF' }}
      >
        {/* Week nav */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl"
          style={{ background: '#F3F4F6' }}
        >
          <button
            onClick={() => setWeekStart(addDays(weekStart, -7))}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white"
            style={{ color: '#6B7280' }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setWeekStart(getWeekStart(today))}
            className="px-3 h-8 rounded-lg text-xs font-semibold transition-colors hover:bg-white"
            style={{ color: '#374151' }}
          >
            Today
          </button>
          <button
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white"
            style={{ color: '#6B7280' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <h2 className="font-semibold" style={{ fontSize: 15, color: '#111827' }}>
          {MONTHS[weekStart.getMonth()]} {weekStart.getFullYear()}
        </h2>

        <div className="flex-1" />

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
          style={{ height: 38, padding: '0 16px', fontSize: 13 }}
        >
          <Plus size={15} />
          Add Event
        </button>
      </div>

      {/* ══ Body: Grid + Agenda ══ */}
      <div className="flex flex-1 overflow-hidden">

        {/* Week Grid */}
        <div className="flex-1 overflow-auto" style={{ background: '#FFFFFF' }}>
          <div style={{ minWidth: 680 }}>

            {/* Day headers */}
            <div
              className="grid sticky top-0 z-20"
              style={{
                gridTemplateColumns: '52px repeat(7,1fr)',
                background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid #EAECEF',
              }}
            >
              <div style={{ borderRight: '1px solid #EAECEF' }} />
              {weekDays.map((day, i) => {
                const count   = getMeetingsForDay(day).length;
                const isTd    = isToday(day);
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center py-3"
                    style={{
                      borderRight: i < 6 ? '1px solid #EAECEF' : 'none',
                      background: isTd ? '#F8FBFF' : 'transparent',
                    }}
                  >
                    <span
                      className="text-xs font-semibold uppercase tracking-wide mb-1"
                      style={{ color: isTd ? '#2563EB' : '#9CA3AF', fontSize: 10 }}
                    >
                      {DAYS_S[day.getDay()]}
                    </span>
                    <span
                      className="flex items-center justify-center font-bold"
                      style={{
                        width: 32, height: 32, borderRadius: '50%',
                        fontSize: 13,
                        background: isTd ? '#2563EB' : 'transparent',
                        color: isTd ? '#FFFFFF' : '#111827',
                        border: isTd ? '2px solid #2563EB' : '2px solid transparent',
                      }}
                    >
                      {day.getDate()}
                    </span>
                    {count > 0 && (
                      <span
                        className="mt-1 font-semibold"
                        style={{
                          fontSize: 9, color: '#2563EB',
                          background: '#EEF4FF', padding: '1px 6px', borderRadius: 10,
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Time rows */}
            {HOURS.map(hour => (
              <div
                key={hour}
                className="grid"
                style={{ gridTemplateColumns: '52px repeat(7,1fr)', height: SLOT_H }}
              >
                {/* Time label */}
                <div
                  className="flex items-start justify-end pr-2 pt-2"
                  style={{ borderRight: '1px solid #EAECEF' }}
                >
                  <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>{fmtHour(hour)}</span>
                </div>

                {/* Day cells */}
                {weekDays.map((day, di) => {
                  const slotMeetings = getMeetingsForHour(day, hour);
                  const isTd         = isToday(day);
                  const nowHour      = today.getHours();
                  const nowPct       = (today.getMinutes() / 60) * 100;
                  const showLine     = isTd && nowHour === hour;

                  return (
                    <div
                      key={di}
                      className="relative"
                      style={{
                        borderRight: di < 6 ? '1px solid #EAECEF' : 'none',
                        borderBottom: '1px solid #F9FAFB',
                        background: isTd ? '#FAFCFF' : 'transparent',
                      }}
                    >
                      {/* Now line */}
                      {showLine && (
                        <div
                          className="absolute left-0 right-0 z-10 pointer-events-none flex items-center"
                          style={{ top: `${nowPct}%` }}
                        >
                          <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse-soft" style={{ background: '#2563EB', marginLeft: -4 }} />
                          <div className="flex-1 h-px" style={{ background: '#2563EB' }} />
                        </div>
                      )}

                      {/* Meeting blocks — Google Calendar style */}
                      {slotMeetings.map((m, mi) => {
                        const col     = getColor(m._id || m.title);
                        const startMin = new Date(m.scheduledAt).getMinutes();
                        const topPct   = (startMin / 60) * 100;
                        const heightPx = Math.max(40, ((m.duration || 60) / 60) * SLOT_H - 3);
                        return (
                          <div
                            key={m._id || mi}
                            onClick={() => setSelectedMeeting(m)}
                            className="absolute left-1 right-1 overflow-hidden cursor-pointer transition-all"
                            style={{
                              top: `${topPct}%`,
                              height: heightPx,
                              background: col.bg,
                              border: `1px solid ${col.border}`,
                              borderRadius: 10,
                              borderLeft: `3px solid ${col.bar}`,
                              padding: '4px 8px',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <p style={{ fontSize: 10, fontWeight: 600, color: col.text, lineHeight: 1.3 }} className="truncate">
                              {m.title}
                            </p>
                            <p style={{ fontSize: 9, color: col.text, opacity: 0.75 }} className="flex items-center gap-1">
                              <Clock size={9} />
                              {new Date(m.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {(m.participants?.length > 0) && (
                              <p style={{ fontSize: 9, color: col.text, opacity: 0.7 }} className="flex items-center gap-1">
                                <Users size={9} />
                                {m.participants.length}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ══ Agenda Sidebar ══ */}
        <div
          className="hidden xl:flex flex-col flex-shrink-0 overflow-y-auto"
          style={{
            width: 280,
            borderLeft: '1px solid #EAECEF',
            background: '#F8FAFC',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
            style={{
              background: 'rgba(248,250,252,0.95)',
              backdropFilter: 'blur(8px)',
              borderBottom: '1px solid #EAECEF',
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Agenda
            </span>
            <span
              style={{
                fontSize: 10, fontWeight: 600,
                color: '#2563EB', background: '#EEF4FF',
                padding: '2px 8px', borderRadius: 20,
              }}
            >
              Today & Tomorrow
            </span>
          </div>

          <div className="p-4 space-y-6">
            {/* Today section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', display: 'inline-block' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Today
                </span>
              </div>
              {agendaToday.length === 0 ? (
                <div
                  className="text-center py-6"
                  style={{
                    background: '#FFFFFF', border: '1px solid #EAECEF',
                    borderRadius: 14, color: '#9CA3AF', fontSize: 12,
                  }}
                >
                  No meetings today
                </div>
              ) : (
                <div className="space-y-2 pl-3" style={{ borderLeft: '2px solid #E5E7EB' }}>
                  {agendaToday.map(m => {
                    const col = getColor(m._id || m.title);
                    return (
                      <div
                        key={m._id}
                        onClick={() => setSelectedMeeting(m)}
                        className="cursor-pointer transition-all"
                        style={{
                          background: '#FFFFFF', border: `1px solid #EAECEF`,
                          borderRadius: 12, padding: '10px 12px',
                          borderLeft: `3px solid ${col.bar}`,
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                          e.currentTarget.style.borderColor = col.border;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = '#EAECEF';
                        }}
                      >
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 4 }} className="truncate">{m.title}</p>
                        <p style={{ fontSize: 11, color: '#6B7280' }} className="flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(m.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {m.duration && <span style={{ color: '#9CA3AF' }}>  ·  {m.duration} min</span>}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tomorrow section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#9CA3AF', display: 'inline-block' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Tomorrow
                </span>
              </div>
              {agendaTomorrow.length === 0 ? (
                <div
                  className="text-center py-6"
                  style={{
                    background: '#FFFFFF', border: '1px solid #EAECEF',
                    borderRadius: 14, color: '#9CA3AF', fontSize: 12,
                  }}
                >
                  No meetings tomorrow
                </div>
              ) : (
                <div className="space-y-2 pl-3" style={{ borderLeft: '2px solid #E5E7EB' }}>
                  {agendaTomorrow.map(m => {
                    const col = getColor(m._id || m.title);
                    return (
                      <div
                        key={m._id}
                        onClick={() => setSelectedMeeting(m)}
                        className="cursor-pointer transition-all"
                        style={{
                          background: '#FFFFFF', border: '1px solid #EAECEF',
                          borderRadius: 12, padding: '10px 12px',
                          borderLeft: `3px solid ${col.bar}`,
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                          e.currentTarget.style.borderColor = col.border;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = '#EAECEF';
                        }}
                      >
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 4 }} className="truncate">{m.title}</p>
                        <p style={{ fontSize: 11, color: '#6B7280' }} className="flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(m.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {m.duration && <span style={{ color: '#9CA3AF' }}>  ·  {m.duration} min</span>}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ Detail Popover ══ */}
      <AnimatePresence>
        {selectedMeeting && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSelectedMeeting(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.16 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              style={{
                background: '#FFFFFF', border: '1px solid #EAECEF',
                borderRadius: 20, width: '100%', maxWidth: 440,
                boxShadow: '0 20px 60px rgba(0,0,0,0.14)',
                margin: 16, overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-5" style={{ borderBottom: '1px solid #F3F4F6' }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>
                    {selectedMeeting.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 11, fontWeight: 600,
                      background: selectedMeeting.status === 'active' ? '#DCFCE7' : '#EEF4FF',
                      color: selectedMeeting.status === 'active' ? '#16A34A' : '#2563EB',
                      padding: '2px 10px', borderRadius: 20, display: 'inline-block',
                    }}
                  >
                    {selectedMeeting.status === 'active' ? '● Active' : `● ${selectedMeeting.status}`}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMeeting(null)}
                  className="flex items-center justify-center rounded-xl transition-colors ml-4 flex-shrink-0"
                  style={{ width: 32, height: 32, color: '#6B7280' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Info rows */}
              <div className="p-5 space-y-3" style={{ fontSize: 13, color: '#374151' }}>
                <div className="flex items-center gap-3">
                  <Calendar size={16} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                  <span>
                    {DAYS_FULL[new Date(selectedMeeting.scheduledAt).getDay()]}, {formatDate(selectedMeeting.scheduledAt)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                  <span>
                    {formatTime(selectedMeeting.scheduledAt)} → {formatTime(new Date(new Date(selectedMeeting.scheduledAt).getTime() + (selectedMeeting.duration || 60) * 60000))}
                    <span style={{ color: '#9CA3AF' }}> ({selectedMeeting.duration || 60} min)</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Link2 size={16} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                  <code
                    style={{
                      background: '#F3F4F6', color: '#374151',
                      padding: '2px 8px', borderRadius: 6, fontSize: 11,
                    }}
                  >
                    {selectedMeeting.roomId}
                  </code>
                </div>
                {selectedMeeting.description && (
                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 12, marginTop: 4 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Notes</p>
                    <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, background: '#F9FAFB', padding: '10px 12px', borderRadius: 10, border: '1px solid #EAECEF' }}>
                      {selectedMeeting.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 px-5 pb-5" style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16 }}>
                {(user?._id === selectedMeeting.hostId || user?._id === selectedMeeting.hostId?._id) && (
                  <button
                    onClick={() => deleteMeeting(selectedMeeting._id)}
                    className="flex items-center justify-center rounded-xl transition-colors"
                    style={{ width: 40, height: 40, color: '#EF4444', border: '1px solid #E5E7EB' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.borderColor = '#FECACA'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <div className="flex-1" />
                <button
                  onClick={() => {
                    copyToClipboard(selectedMeeting.inviteLink);
                    toast({ title: '📋 Invite link copied!' });
                  }}
                  className="btn-secondary"
                  style={{ height: 40, padding: '0 16px', fontSize: 13 }}
                >
                  <Copy size={14} />
                  Copy Link
                </button>
                <button
                  onClick={() => router.push(`/meet/${selectedMeeting.roomId}`)}
                  className="btn-primary"
                  style={{ height: 40, padding: '0 20px', fontSize: 13 }}
                >
                  <Video size={14} />
                  Join
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══ Add Meeting Modal ══ */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.16 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              style={{
                background: '#FFFFFF', border: '1px solid #EAECEF',
                borderRadius: 20, width: '100%', maxWidth: 440,
                boxShadow: '0 20px 60px rgba(0,0,0,0.14)', margin: 16, overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F3F4F6' }}>
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{ width: 32, height: 32, background: '#111827' }}
                  >
                    <Plus size={16} style={{ color: '#fff' }} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Schedule Event</span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex items-center justify-center rounded-xl transition-colors"
                  style={{ width: 32, height: 32, color: '#6B7280' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {formError && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#DC2626' }}>
                    {formError}
                  </div>
                )}

                {/* Title */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                    Title *
                  </label>
                  <input
                    required value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Weekly Team Standup"
                    className="input"
                    style={{ height: 42 }}
                  />
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                      Date *
                    </label>
                    <input
                      required type="date" value={date} onChange={e => setDate(e.target.value)}
                      className="input" style={{ height: 42 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                      Time *
                    </label>
                    <input
                      required type="time" value={time} onChange={e => setTime(e.target.value)}
                      className="input" style={{ height: 42 }}
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                    Duration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[['15','15 min'],['30','30 min'],['45','45 min'],['60','1 hour'],['90','1.5 hr'],['120','2 hours']].map(([v, l]) => (
                      <button
                        key={v} type="button" onClick={() => setDuration(v)}
                        className="py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          border: `1px solid ${duration === v ? '#2563EB' : '#E5E7EB'}`,
                          background: duration === v ? '#EEF4FF' : '#FFFFFF',
                          color: duration === v ? '#2563EB' : '#374151',
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                    Notes
                  </label>
                  <textarea
                    value={description} onChange={e => setDescription(e.target.value)}
                    placeholder="Add agenda or details…" rows={2}
                    className="input"
                    style={{ height: 'auto', resize: 'none', paddingTop: 10, paddingBottom: 10 }}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                  <button
                    type="button" onClick={() => setShowModal(false)}
                    className="btn-secondary flex-1"
                    style={{ height: 44 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="btn-primary flex-1"
                    style={{ height: 44, opacity: isSubmitting ? 0.6 : 1 }}
                  >
                    {isSubmitting ? 'Saving…' : 'Schedule'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
