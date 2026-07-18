'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useMeetingStore } from '@/store/meeting';
import { useAuthStore } from '@/store/auth';

export function useWebRTC(roomId: string) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  
  const { isMuted, isCameraOff, toggleMute, toggleCamera, toggleScreenShare, updateParticipant } = useMeetingStore();
  const { user } = useAuthStore();

  // ICE servers configuration (uses TURN for production NAT traversal)
  const iceServers = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    ...(process.env.NEXT_PUBLIC_TURN_URL ? [{
      urls: process.env.NEXT_PUBLIC_TURN_URL,
      username: process.env.NEXT_PUBLIC_TURN_USERNAME,
      credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
    }] : []),
  ];

  // Initialize local media stream
  useEffect(() => {
    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
            facingMode: 'user',
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 48000,
          },
        });
        
        localStreamRef.current = stream;
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Failed to access media devices:', err);
        // Try audio-only fallback
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          localStreamRef.current = audioStream;
          setLocalStream(audioStream);
        } catch {}
      }
    }
    
    initMedia();
    
    return () => {
      localStreamRef.current?.getTracks().forEach(track => track.stop());
      screenStreamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Toggle mute
  useEffect(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
    }
  }, [isMuted]);

  // Toggle camera
  useEffect(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !isCameraOff;
      });
    }
  }, [isCameraOff]);

  // Start screen sharing (4K quality — Discord-style)
  const startScreenShare = useCallback(async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          // Request highest possible quality (4K if available)
          width: { ideal: 3840, max: 3840 },
          height: { ideal: 2160, max: 2160 },
          frameRate: { ideal: 60, max: 60 },
          // @ts-ignore - non-standard cursor option
          cursor: 'always',
        },
        audio: {
          // Capture system audio (where browser allows)
          echoCancellation: false,
          noiseSuppression: false,
          sampleRate: 48000,
        },
      });
      
      screenStreamRef.current = displayStream;
      setScreenStream(displayStream);
      
      // Handle user stopping via browser UI
      displayStream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare();
      });
      
      return displayStream;
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        console.log('Screen share denied by user');
      } else if (err.name === 'NotReadableError') {
        // DRM protected content
        alert('Unable to share this content due to copyright protection. Please share a different window or tab.');
      }
      throw err;
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
      setScreenStream(null);
    }
    useMeetingStore.getState().toggleScreenShare();
  }, []);

  // Create peer connection for a remote participant
  const createPeerConnection = useCallback((peerId: string, socket: any) => {
    if (peerConnections.current.has(peerId)) {
      return peerConnections.current.get(peerId)!;
    }

    const pc = new RTCPeerConnection({ iceServers });
    
    // Add local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current!);
      });
    }
    
    // ICE candidate handler
    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit('webrtc:ice-candidate', {
          targetId: peerId,
          candidate: event.candidate,
        });
      }
    };
    
    // Remote track handler
    pc.ontrack = (event) => {
      const remoteStream = event.streams[0];
      updateParticipant(peerId, { stream: remoteStream });
    };
    
    // Connection state monitoring
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed') {
        pc.restartIce();
      }
    };
    
    peerConnections.current.set(peerId, pc);
    return pc;
  }, [updateParticipant]);

  // Handle WebRTC offer (called from socket handlers)
  const handleOffer = useCallback(async (fromId: string, offer: RTCSessionDescriptionInit, socket: any) => {
    const pc = createPeerConnection(fromId, socket);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit('webrtc:answer', { targetId: fromId, answer });
  }, [createPeerConnection]);

  // Handle WebRTC answer
  const handleAnswer = useCallback(async (fromId: string, answer: RTCSessionDescriptionInit) => {
    const pc = peerConnections.current.get(fromId);
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }, []);

  // Handle ICE candidate
  const handleIceCandidate = useCallback(async (fromId: string, candidate: RTCIceCandidateInit) => {
    const pc = peerConnections.current.get(fromId);
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }, []);

  return {
    localStream,
    screenStream,
    localVideoRef,
    startScreenShare,
    stopScreenShare,
    createPeerConnection,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
  };
}
