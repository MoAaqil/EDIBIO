import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, signInWithRedirect, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeFirestore, CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyB_G7hMlne_xi1JWBE1KrmLFmYW7QfRQhQ',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'zb-books-65c4b.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'zb-books-65c4b',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'zb-books-65c4b.firebasestorage.app',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '13902044374',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:13902044374:web:8257279aaf590a4984bd77',
    measurementId: "G-GRC947BQQG"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

if (typeof window !== 'undefined') {
    console.log('[Firebase] Initialized for project:', firebaseConfig.projectId);
    console.log('[Firebase] Authorized Domains requirement: Ensure edibio-app.vercel.app is added in Firebase console.');
}

// Initialize Firestore with settings for offline support
const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

if (typeof window !== 'undefined') {
    import('firebase/firestore').then(({ enableMultiTabIndexedDbPersistence }) => {
        enableMultiTabIndexedDbPersistence(db).catch((err) => {
            if (err.code === 'failed-precondition') {
                console.warn('Firestore persistence failed: Multiple tabs open');
            } else if (err.code === 'unimplemented') {
                console.warn('Firestore persistence failed: Browser does not support it');
            } else {
                console.warn('Firestore persistence error:', err);
            }
        });
    });
}

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { app, auth, db, googleProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, signInWithRedirect, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword };
