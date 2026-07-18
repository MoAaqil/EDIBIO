import { v4 as uuidv4 } from 'uuid';

export function generateRoomId(): string {
  // Format: XXX-XXX-XXX (e.g., EDT-482-916)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const genSegment = () => {
    let seg = '';
    for (let i = 0; i < 3; i++) {
      seg += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return seg;
  };
  return `${genSegment()}-${genSegment()}-${genSegment()}`;
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateInviteCode(): string {
  return uuidv4().replace(/-/g, '').substring(0, 12).toUpperCase();
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
