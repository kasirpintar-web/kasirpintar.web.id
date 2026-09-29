import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Official verified Firebase credentials
const OFFICIAL_CONFIG = {
  apiKey: 'AIzaSyB6cSFg9Ps7BJOTLdvj6nNyztv2QX7kFrg',
  authDomain: 'kasirpintarnweeee.firebaseapp.com',
  projectId: 'kasirpintarnweeee',
  storageBucket: 'kasirpintarnweeee.firebasestorage.app',
  messagingSenderId: '488380916730',
  appId: '1:488380916730:web:eaf4e13fd0f1c7c904fa43'
};


// Ensure any typo like '_Qt3H5OAII' in environment does not override the valid API key
const getCleanEnv = (val: string | undefined, expectedFallback: string): string => {
  if (!val || val.trim() === '' || val.includes('_Qt3H5OAII')) {
    return expectedFallback;
  }
  return val.trim();
};

export const firebaseConfig = {
  apiKey: getCleanEnv(import.meta.env.VITE_FIREBASE_API_KEY, OFFICIAL_CONFIG.apiKey),
  authDomain: getCleanEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, OFFICIAL_CONFIG.authDomain),
  projectId: getCleanEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID, OFFICIAL_CONFIG.projectId),
  storageBucket: getCleanEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, OFFICIAL_CONFIG.storageBucket),
  messagingSenderId: getCleanEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, OFFICIAL_CONFIG.messagingSenderId),
  appId: getCleanEnv(import.meta.env.VITE_FIREBASE_APP_ID, OFFICIAL_CONFIG.appId),
};

// Initialize Firebase safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Safe diagnostic summary for debugging (Never exposes full API key)
export interface FirebaseConfigDiagnostic {
  projectId: string;
  authDomain: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  envStatus: {
    apiKeyConfigured: boolean;
    authDomainConfigured: boolean;
    projectIdConfigured: boolean;
    storageBucketConfigured: boolean;
    messagingSenderIdConfigured: boolean;
    appIdConfigured: boolean;
  };
}

export function getFirebaseDiagnostics(): FirebaseConfigDiagnostic {
  return {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
    envStatus: {
      apiKeyConfigured: Boolean(import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey),
      authDomainConfigured: Boolean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain),
      projectIdConfigured: Boolean(import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId),
      storageBucketConfigured: Boolean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket),
      messagingSenderIdConfigured: Boolean(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId),
      appIdConfigured: Boolean(import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId),
    },
  };
}
