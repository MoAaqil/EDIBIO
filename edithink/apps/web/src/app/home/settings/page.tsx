'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import {
  User as UserIcon, Shield, Sparkles, Check, AlertCircle
} from 'lucide-react';
import api from '@/lib/api';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'preferences'>('profile');

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');

  // Preference Settings
  const [cameraPref, setCameraPref] = useState(user?.meetingPreferences?.defaultCamera ?? true);
  const [micPref, setMicPref] = useState(user?.meetingPreferences?.defaultMic ?? true);
  const [noisePref, setNoisePref] = useState(user?.meetingPreferences?.noiseSupression ?? false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const res = await api.patch('/users/me', { name, avatar });
      setUser(res.data.user);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    setPwError('');
    setPwSuccess(false);

    try {
      await api.post('/users/me/change-password', { currentPassword, newPassword });
      setPwSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err: any) {
      setPwError(err.response?.data?.error || 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const res = await api.patch('/users/me', {
        meetingPreferences: {
          defaultCamera: cameraPref,
          defaultMic: micPref,
          noiseSupression: noisePref,
          blurBackground: user?.meetingPreferences?.blurBackground ?? false
        }
      });
      setUser(res.data.user);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.response?.data?.error || 'Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: 0 }}>Account Settings</h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>Manage your profile, security options, and call preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="card" style={{ padding: 12, height: 'fit-content', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { id: 'profile', label: 'My Profile', icon: UserIcon },
            { id: 'security', label: 'Security & Sign In', icon: Shield },
            { id: 'preferences', label: 'Call Preferences', icon: Sparkles }
          ].map(section => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                style={{ border: 'none', background: 'transparent', textAlign: 'left', width: '100%' }}
              >
                <section.icon size={16} />
                <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500 }}>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <div className="md:col-span-3 card" style={{ padding: 24 }}>
          {activeSection === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', borderBottom: '1px solid #EAECEF', paddingBottom: 12, margin: 0 }}>
                My Profile
              </h2>

              {saveSuccess && (
                <div style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#16A34A', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={16} /> Profile updated successfully!
                </div>
              )}
              {saveError && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#DC2626', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertCircle size={16} /> {saveError}
                </div>
              )}

              <div className="space-y-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  Email Address (Cannot change)
                </label>
                <input
                  disabled
                  value={user?.email}
                  className="input"
                  style={{ background: '#F3F4F6', color: '#9CA3AF', cursor: 'not-allowed', height: 42 }}
                />
              </div>

              <div className="space-y-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  Display Name
                </label>
                <input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Aaqil Ezio"
                  className="input"
                  style={{ height: 42 }}
                />
              </div>

              <div className="space-y-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  Avatar Image URL (Optional)
                </label>
                <input
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="input"
                  style={{ height: 42 }}
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary"
                style={{ height: 42, opacity: isSaving ? 0.6 : 1 }}
              >
                {isSaving ? 'Saving Changes…' : 'Save Profile Details'}
              </button>
            </form>
          )}

          {activeSection === 'security' && (
            <form onSubmit={handleChangePassword} className="space-y-5">
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', borderBottom: '1px solid #EAECEF', paddingBottom: 12, margin: 0 }}>
                Update Password
              </h2>

              {pwSuccess && (
                <div style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#16A34A', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={16} /> Password changed successfully!
                </div>
              )}
              {pwError && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#DC2626', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertCircle size={16} /> {pwError}
                </div>
              )}

              <div className="space-y-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  Current Password
                </label>
                <input
                  required
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="input"
                  style={{ height: 42 }}
                />
              </div>

              <div className="space-y-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  New Password
                </label>
                <input
                  required
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="input"
                  style={{ height: 42 }}
                />
              </div>

              <div className="space-y-1.5">
                <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  Confirm New Password
                </label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="input"
                  style={{ height: 42 }}
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="btn-primary"
                style={{ height: 42, opacity: isChangingPassword ? 0.6 : 1 }}
              >
                {isChangingPassword ? 'Changing Password…' : 'Change Password'}
              </button>
            </form>
          )}

          {activeSection === 'preferences' && (
            <div className="space-y-5">
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', borderBottom: '1px solid #EAECEF', paddingBottom: 12, margin: 0 }}>
                Meeting Preferences
              </h2>

              {saveSuccess && (
                <div style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#16A34A', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={16} /> Preferences saved!
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Turn Camera On by Default</div>
                    <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Join new meetings with your camera enabled.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={cameraPref}
                    onChange={e => setCameraPref(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-350"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Turn Microphone On by Default</div>
                    <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Join new meetings with your microphone enabled.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={micPref}
                    onChange={e => setMicPref(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-350"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Enable Noise Suppression</div>
                    <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Reduce background static noise during calls.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={noisePref}
                    onChange={e => setNoisePref(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-350"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSavePreferences}
                disabled={isSaving}
                className="btn-primary"
                style={{ height: 42, opacity: isSaving ? 0.6 : 1, marginTop: 12 }}
              >
                {isSaving ? 'Saving…' : 'Save Preferences'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
