import { getApps, initializeApp, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging as firebaseGetMessaging, isSupported } from 'firebase/messaging';

const isMock = (val: string | undefined) => !val || val === '' || val.startsWith('mock-');

const firebaseConfig = {
  apiKey: isMock(process.env.NEXT_PUBLIC_FIREBASE_API_KEY) ? 'AIzaSyB_G7hMlne_xi1JWBE1KrmLFmYW7QfRQhQ' : process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: isMock(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) ? 'zb-books-65c4b.firebaseapp.com' : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: isMock(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) ? 'zb-books-65c4b' : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: isMock(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) ? 'zb-books-65c4b.firebasestorage.app' : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: isMock(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) ? '13902044374' : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: isMock(process.env.NEXT_PUBLIC_FIREBASE_APP_ID) ? '1:13902044374:web:8257279aaf590a4984bd77' : process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// ---------------------------------------------------------------------------
// App — singleton guard
// ---------------------------------------------------------------------------
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ---------------------------------------------------------------------------
// Firestore — enable offline persistence (IndexedDB)
// ---------------------------------------------------------------------------
const db = getFirestore(app);

// Offline persistence is only available in the browser and must be enabled
// once per app lifecycle. Swallow the "already enabled" error gracefully.
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err: { code: string }) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open — persistence can only be enabled in one tab at a time.
      console.warn('[Firestore] Offline persistence failed: multiple tabs open.');
    } else if (err.code === 'unimplemented') {
      // The browser does not support all of the features required for persistence.
      console.warn('[Firestore] Offline persistence is not supported in this browser.');
    } else {
      console.error('[Firestore] Failed to enable offline persistence:', err);
    }
  });
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------
const storage = getStorage(app);

// ---------------------------------------------------------------------------
// FCM — lazy, browser-only, VAPID-guarded
// ---------------------------------------------------------------------------
/**
 * Returns the Firebase Cloud Messaging instance.
 * Returns `null` when:
 *  - Called outside the browser (SSR / API routes)
 *  - The browser does not support FCM
 *  - NEXT_PUBLIC_FIREBASE_VAPID_KEY is not configured
 */
async function getMessagingInstance() {
  if (typeof window === 'undefined') return null;

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.warn('[FCM] NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set — messaging disabled.');
    return null;
  }

  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn('[FCM] Messaging is not supported in this browser.');
      return null;
    }
    return firebaseGetMessaging(app);
  } catch (err) {
    console.error('[FCM] Failed to initialise messaging:', err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export {
  app,
  auth,
  db,
  storage,
  googleProvider,
  // Auth helpers — re-exported so consumers don't need to import from firebase/auth
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  // FCM
  getMessagingInstance as getMessaging,
};
