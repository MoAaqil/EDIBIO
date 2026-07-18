'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Calendar, Plus, Link as LinkIcon,
  Clock, Copy, ArrowRight, VideoOff
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { formatTime, copyToClipboard } from '@/lib/utils';
import api from '@/lib/api';
import { toast } from '@/components/ui/toaster';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [joinId, setJoinId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchUpcomingMeetings();
  }, []);

  const fetchUpcomingMeetings = async () => {
    setIsFetching(true);
    try {
      const res = await api.get('/meetings?status=scheduled&limit=5');
      setUpcomingMeetings(res.data.meetings || []);
    } catch (err) {
      console.error('Failed to fetch upcoming meetings:', err);
    } finally {
      setIsFetching(false);
    }
  };

  const createMeeting = async () => {
    setIsCreating(true);
    try {
      const res = await api.post('/meetings', { title: `${user?.name}'s Meeting` });
      router.push(`/meet/${res.data.meeting.roomId}`);
    } catch (err) {
      console.error(err);
      setIsCreating(false);
    }
  };

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinId.trim()) {
      router.push(`/meet/${joinId.trim()}`);
    }
  };

  const handleCopy = (link: string) => {
    copyToClipboard(link);
    toast({ title: '📋 Invite link copied!' });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* ── Welcome Header ── */}
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: 0 }}>
          Good afternoon, {user?.name.split(' ')[0]}
        </h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
          Ready to connect? Start a meeting or join an upcoming one.
        </p>
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card: New Meeting */}
        <div
          onClick={createMeeting}
          className="card-lift"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.02) 0%, rgba(99,102,241,0.01) 100%)',
            minHeight: 180,
          }}
        >
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{ width: 48, height: 48, background: '#2563EB', color: '#FFFFFF' }}
          >
            <Video size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>
              New Meeting
            </h3>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
              Start a new instant video session
            </p>
          </div>
        </div>

        {/* Card: Join Meeting */}
        <div
          className="card"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 180,
          }}
        >
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{ width: 48, height: 48, background: '#F3F4F6', color: '#6B7280' }}
          >
            <LinkIcon size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 12 }}>
              Join Meeting
            </h3>
            <form onSubmit={joinMeeting} className="flex gap-2">
              <input
                value={joinId}
                onChange={e => setJoinId(e.target.value)}
                placeholder="EDT-XXX-XXX"
                className="input"
                style={{ height: 38, fontSize: 13, textTransform: 'uppercase' }}
              />
              <button
                type="submit"
                disabled={!joinId.trim()}
                className="btn-primary"
                style={{ width: 38, height: 38, minWidth: 38, padding: 0, justifyContent: 'center' }}
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Card: Schedule */}
        <div
          onClick={() => router.push('/home/calendar')}
          className="card-lift"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 180,
          }}
        >
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{ width: 48, height: 48, background: '#F3F4F6', color: '#6B7280' }}
          >
            <Calendar size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>
              Schedule
            </h3>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
              Plan a future meeting on calendar
            </p>
          </div>
        </div>
      </div>

      {/* ── Upcoming Meetings ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0 }}>Upcoming</h2>
          <button
            onClick={() => router.push('/home/calendar')}
            className="text-xs font-semibold hover:underline"
            style={{ color: '#2563EB' }}
          >
            View Calendar
          </button>
        </div>

        {isFetching ? (
          <div className="empty-state">
            <div className="w-8 h-8 border-[3px] border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
            <p style={{ fontSize: 13, color: '#9CA3AF' }}>Loading agenda…</p>
          </div>
        ) : upcomingMeetings.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: 40, paddingBottom: 40 }}>
            <div className="empty-state-icon">
              <VideoOff size={22} style={{ color: '#9CA3AF' }} />
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>No upcoming meetings</h4>
            <p style={{ fontSize: 13, color: '#6B7280', maxWidth: 260, margin: '0 auto 16px' }}>
              Schedule meetings using the Calendar view or create an instant room above.
            </p>
            <button
              onClick={() => router.push('/home/calendar')}
              className="btn-secondary"
              style={{ height: 34, fontSize: 12, padding: '0 14px' }}
            >
              Go to Calendar
            </button>
          </div>
        ) : (
          <div className="card overflow-hidden" style={{ padding: 0 }}>
            <div className="divide-y divide-slate-100">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting._id}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/50"
                >
                  <div className="flex items-start gap-4">
                    {/* Date Block */}
                    <div
                      className="flex flex-col items-center justify-center rounded-xl flex-shrink-0"
                      style={{ width: 48, height: 48, background: '#EEF4FF', color: '#2563EB' }}
                    >
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {meeting.scheduledAt ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(meeting.scheduledAt)) : 'N/A'}
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.1, marginTop: 1 }}>
                        {meeting.scheduledAt ? new Date(meeting.scheduledAt).getDate() : ''}
                      </span>
                    </div>

                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>
                        {meeting.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock size={12} style={{ color: '#9CA3AF' }} />
                          {meeting.scheduledAt ? formatTime(meeting.scheduledAt) : 'N/A'}
                        </span>
                        <span
                          className="font-mono"
                          style={{
                            background: '#F3F4F6', color: '#374151',
                            padding: '1px 6px', borderRadius: 6, fontSize: 10,
                          }}
                        >
                          {meeting.roomId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(meeting.inviteLink)}
                      className="btn-secondary hidden sm:inline-flex"
                      style={{ height: 34, padding: '0 12px', fontSize: 12 }}
                    >
                      <Copy size={13} />
                      Copy Link
                    </button>
                    <button
                      onClick={() => router.push(`/meet/${meeting.roomId}`)}
                      className="btn-primary"
                      style={{ height: 34, padding: '0 16px', fontSize: 12 }}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
