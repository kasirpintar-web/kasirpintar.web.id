import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import {
  getUserProfile,
  getStore,
  createUserWithStore,
  ensureUserAndStoreExist,
} from '../firebase/db';
import { mapAuthErrorMessage } from '../firebase/errors';
import { UserProfile, Store } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  store: Store | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, storeName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshStore: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  ensureStoreProvisioned: () => Promise<Store | null>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Fetch profile and store data (dengan auto-provisioning jika dokumen belum ada di Firestore)
  const loadUserData = async (uid: string, userHint?: FirebaseUser | null) => {
    try {
      let profile = await getUserProfile(uid);
      let storeData: Store | null = null;
      if (profile?.storeId) {
        storeData = await getStore(profile.storeId);
      }

      // Jika user profile atau store belum ada di Firestore (misal user daftar manual via console atau error sebelumnya):
      // OTOMATIS buatkan dokumen toko dan profil di Firestore tanpa perlu campur tangan admin!
      if (!profile || !storeData) {
        console.log('[AuthContext] Profile or store missing in Firestore, auto-provisioning for user:', uid);
        const email = userHint?.email || currentUser?.email || auth.currentUser?.email || '';
        const name = userHint?.displayName || currentUser?.displayName || auth.currentUser?.displayName || '';
        const autoResult = await ensureUserAndStoreExist(uid, email, name);
        profile = autoResult.userProfile;
        storeData = autoResult.store;
      }

      setUserProfile(profile);
      setStore(storeData);
      return profile;
    } catch (err) {
      console.error('[Firestore Error] Failed to load or auto-provision user profile/store:', err);
      throw err;
    }
  };

  const ensureStoreProvisioned = async (): Promise<Store | null> => {
    if (store) return store;
    const user = currentUser || auth.currentUser;
    if (!user) return null;
    try {
      const autoResult = await ensureUserAndStoreExist(
        user.uid,
        user.email || '',
        user.displayName
      );
      setUserProfile(autoResult.userProfile);
      setStore(autoResult.store);
      return autoResult.store;
    } catch (err) {
      console.error('ensureStoreProvisioned failed:', err);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await loadUserData(currentUser.uid, currentUser);
    }
  };

  const refreshStore = async () => {
    if (userProfile?.storeId) {
      const storeData = await getStore(userProfile.storeId);
      setStore(storeData);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          await loadUserData(user.uid, user);
        } catch (err) {
          console.warn('Could not auto-load profile for session user:', err);
        }
      } else {
        setUserProfile(null);
        setStore(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 1. LOGIN (Separates Auth failure vs Firestore Profile failure)
  const login = async (email: string, pass: string) => {
    setError(null);
    let authenticatedUser: FirebaseUser | null = null;

    // STEP A: Firebase Authentication
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
      authenticatedUser = res.user;
    } catch (err: any) {
      // Must not discard error.code, and log explicitly to console
      const errorCode = err?.code || 'auth/unknown';
      const errorMessage = err?.message || 'Authentication error';
      console.error('Firebase Auth error code:', errorCode);
      console.error('Firebase Auth error message:', errorMessage);
      console.error('Firebase Auth full error:', err);

      const msg = mapAuthErrorMessage(errorCode, err);
      setError(msg);
      throw new Error(msg);
    }

    // STEP B: Firestore Profile Retrieval (users/{uid}) & Auto-provisioning
    if (authenticatedUser) {
      try {
        await loadUserData(authenticatedUser.uid, authenticatedUser);
      } catch (firestoreErr: any) {
        console.error('Firestore users/{uid} profile error:', firestoreErr);
        const message = `Gagal memuat atau membuat data toko di Firestore: ${firestoreErr.message || 'Izin akses ditolak'}. Periksa Firestore Security Rules.`;
        setError(message);
        throw new Error(message);
      }
    }
  };

  // 2. REGISTER (Firebase Auth -> users/{uid} & stores/{storeId})
  const register = async (
    name: string,
    email: string,
    pass: string,
    storeName: string
  ) => {
    setError(null);
    let authenticatedUser: FirebaseUser | null = null;

    // Step A: Firebase Auth User Creation
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      authenticatedUser = res.user;
    } catch (err: any) {
      const errorCode = err?.code || 'auth/unknown';
      const errorMessage = err?.message || 'Registration error';
      console.error('Firebase Auth error code:', errorCode);
      console.error('Firebase Auth error message:', errorMessage);
      console.error('Firebase Auth full error:', err);

      const msg = mapAuthErrorMessage(errorCode, err);
      setError(msg);
      throw new Error(msg);
    }

    // Step B: Firestore Store & User Profile Creation
    if (authenticatedUser) {
      try {
        const { userProfile: newProfile, store: newStore } = await createUserWithStore(
          authenticatedUser.uid,
          name,
          email.trim(),
          storeName
        );
        setUserProfile(newProfile);
        setStore(newStore);
      } catch (firestoreErr: any) {
        console.error('Firestore creation after register failed:', firestoreErr);
        const msg = `Akun autentikasi berhasil dibuat, tetapi gagal menginisialisasi data toko di Firestore: ${firestoreErr.message || 'Periksa Firestore Security Rules'}.`;
        setError(msg);
        throw new Error(msg);
      }
    }
  };

  const logout = async () => {
    setError(null);
    await signOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
    setStore(null);
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      const errorCode = err?.code || 'auth/unknown';
      console.error('Firebase Auth error code:', errorCode);
      console.error('Firebase Auth error message:', err?.message);
      const msg = mapAuthErrorMessage(errorCode, err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const value = useMemo(
    () => ({
      currentUser,
      userProfile,
      store,
      loading,
      login,
      register,
      logout,
      resetPassword,
      refreshStore,
      refreshProfile,
      refreshUserProfile: refreshProfile,
      ensureStoreProvisioned,
      error,
      clearError,
    }),
    [currentUser, userProfile, store, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
