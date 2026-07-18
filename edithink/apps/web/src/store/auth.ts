import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  status: string;
  organizationId?: string;
  theme: string;
  isVerified: boolean;
  profileColor?: string; // hex color chosen by the user for their card
  meetingPreferences: {
    defaultCamera: boolean;
    defaultMic: boolean;
    blurBackground: boolean;
    virtualBackground?: string;
    noiseSupression: boolean;
  };
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setProfileColor: (color: string) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isLoading: false,
      isAuthenticated: false,
      
      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setToken: (token) => {
        localStorage.setItem('accessToken', token);
        set({ accessToken: token, isAuthenticated: true });
      },

      setProfileColor: (color) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, profileColor: color } });
        }
      },
      
      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch {}
        localStorage.removeItem('accessToken');
        set({ user: null, accessToken: null, isAuthenticated: false });
        window.location.href = '/login';
      },
      
      refreshUser: async () => {
        try {
          set({ isLoading: true });
          const res = await api.get('/auth/me');
          set({ user: res.data.user, isAuthenticated: true });
        } catch {
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'edithink-auth',
      partialize: (state) => ({ 
        user: state.user, 
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
