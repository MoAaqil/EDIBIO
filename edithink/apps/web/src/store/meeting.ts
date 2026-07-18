import { create } from 'zustand';

interface MeetingStore {
  roomId: string | null;
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  isHandRaised: boolean;
  isChatOpen: boolean;
  isParticipantsOpen: boolean;
  isWhiteboardOpen: boolean;
  isAIOpen: boolean;
  viewMode: 'gallery' | 'speaker' | 'presentation';
  chatMode: 'panel' | 'overlay'; // Twitch-style overlay vs side panel
  chatFadeSeconds: number;
  participants: Participant[];
  pinnedParticipantId: string | null;
  messages: Message[];
  connectionQuality: 'excellent' | 'good' | 'poor' | 'disconnected';
  
  setRoomId: (id: string | null) => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  toggleScreenShare: () => void;
  toggleRecording: () => void;
  toggleHand: () => void;
  toggleChat: () => void;
  toggleParticipants: () => void;
  toggleWhiteboard: () => void;
  toggleAI: () => void;
  setViewMode: (mode: 'gallery' | 'speaker' | 'presentation') => void;
  setChatMode: (mode: 'panel' | 'overlay') => void;
  setChatFadeSeconds: (secs: number) => void;
  addParticipant: (p: Participant) => void;
  removeParticipant: (socketId: string) => void;
  updateParticipant: (socketId: string, updates: Partial<Participant>) => void;
  pinParticipant: (id: string | null) => void;
  addMessage: (msg: Message) => void;
  setConnectionQuality: (q: 'excellent' | 'good' | 'poor' | 'disconnected') => void;
  reset: () => void;
}

export interface Participant {
  socketId: string;
  userId?: string;
  name: string;
  avatar?: string;
  profileColor?: string; // user-chosen color for their card border
  isMuted: boolean;
  isCameraOff: boolean;
  isHandRaised: boolean;
  isScreenSharing: boolean;
  isHost?: boolean;
  stream?: MediaStream;
}

export interface Message {
  _id: string;
  userId: string;
  senderSocketId?: string;
  content: string;
  type: string;
  user: { name: string; avatar?: string };
  createdAt: string;
  twitchStyle: boolean;
  fadeAfterSeconds: number;
}

const initialState = {
  roomId: null,
  isMuted: false,
  isCameraOff: false,
  isScreenSharing: false,
  isRecording: false,
  isHandRaised: false,
  isChatOpen: false,
  isParticipantsOpen: false,
  isWhiteboardOpen: false,
  isAIOpen: false,
  viewMode: 'gallery' as const,
  chatMode: 'overlay' as const,
  chatFadeSeconds: 30,
  participants: [],
  pinnedParticipantId: null,
  messages: [],
  connectionQuality: 'excellent' as const,
};

export const useMeetingStore = create<MeetingStore>((set) => ({
  ...initialState,
  
  setRoomId: (id) => set({ roomId: id }),
  toggleMute: () => set(s => ({ isMuted: !s.isMuted })),
  toggleCamera: () => set(s => ({ isCameraOff: !s.isCameraOff })),
  toggleScreenShare: () => set(s => ({ isScreenSharing: !s.isScreenSharing })),
  toggleRecording: () => set(s => ({ isRecording: !s.isRecording })),
  toggleHand: () => set(s => ({ isHandRaised: !s.isHandRaised })),
  toggleChat: () => set(s => ({ isChatOpen: !s.isChatOpen })),
  toggleParticipants: () => set(s => ({ isParticipantsOpen: !s.isParticipantsOpen })),
  toggleWhiteboard: () => set(s => ({ isWhiteboardOpen: !s.isWhiteboardOpen })),
  toggleAI: () => set(s => ({ isAIOpen: !s.isAIOpen })),
  setViewMode: (viewMode) => set({ viewMode }),
  setChatMode: (chatMode) => set({ chatMode }),
  setChatFadeSeconds: (chatFadeSeconds) => set({ chatFadeSeconds }),
  addParticipant: (p) => set(s => ({ participants: [...s.participants, p] })),
  removeParticipant: (socketId) => set(s => ({ 
    participants: s.participants.filter(p => p.socketId !== socketId) 
  })),
  updateParticipant: (socketId, updates) => set(s => ({
    participants: s.participants.map(p => p.socketId === socketId ? { ...p, ...updates } : p),
  })),
  pinParticipant: (id) => set({ pinnedParticipantId: id }),
  addMessage: (msg) => set(s => ({ messages: [...s.messages.slice(-200), msg] })),
  setConnectionQuality: (connectionQuality) => set({ connectionQuality }),
  reset: () => set(initialState),
}));
