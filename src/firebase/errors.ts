import { auth } from './config';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const rawMessage = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: rawMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error Log:', JSON.stringify(errInfo));
  throw new Error(rawMessage);
}

export function isFirestorePermissionError(error: unknown): boolean {
  if (!error) return false;
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('Missing or insufficient permissions') ||
    message.includes('permission-denied') ||
    message.includes('insufficient permissions')
  );
}

/**
 * Maps Firebase Auth error codes into human-readable Indonesian error messages.
 * Never silences or hides the original Firebase error code.
 */
export function mapAuthErrorMessage(errorCode: string, rawError?: any): string {
  // Always log original Firebase error in console for debugging
  console.error('[Firebase Auth Original Error Code]:', errorCode);
  if (rawError) {
    console.error('[Firebase Auth Original Error Object]:', rawError);
  }

  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Format email tidak valid. Periksa kembali penulisan alamat email Anda.';

    case 'auth/user-disabled':
      return 'Akun ini telah dinonaktifkan oleh administrator. Silakan hubungi bantuan.';

    case 'auth/user-not-found':
      return 'Akun dengan email ini tidak ditemukan. Silakan periksa kembali email Anda atau daftar akun baru.';

    case 'auth/wrong-password':
      return 'Kata sandi salah. Silakan coba lagi atau gunakan fitur Lupa Password.';

    case 'auth/invalid-credential':
      return 'Email atau kata sandi tidak cocok. Silakan periksa kembali kredensial login Anda.';

    case 'auth/email-already-in-use':
      return 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.';

    case 'auth/weak-password':
      return 'Password terlalu lemah. Gunakan minimal 6 karakter kombinasi huruf dan angka.';

    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan gagal. Akses ke akun ini dinonaktifkan sementara untuk keamanan. Silakan tunggu beberapa menit atau reset password Anda.';

    case 'auth/network-request-failed':
      return 'Koneksi internet bermasalah. Periksa koneksi jaringan Anda dan coba lagi.';

    case 'auth/operation-not-allowed':
      return 'Metode login Email/Password belum diaktifkan di Firebase Console. Harap aktifkan provider Email/Password di tab Authentication -> Sign-in method pada konsol Firebase.';

    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    case 'auth/api-key-not-valid':
      return 'Firebase API Key tidak valid. Periksa nilai API Key pada konfigurasi Firebase Anda.';

    case 'auth/app-not-authorized':
      return 'Aplikasi/domain ini belum diizinkan oleh Firebase Authentication. Pastikan domain hosting telah ditambahkan ke Authorized Domains di Firebase Console.';

    case 'auth/configuration-not-found':
      return 'Konfigurasi Firebase Authentication tidak ditemukan atau belum diinisialisasi pada proyek Firebase ini.';

    case 'auth/internal-error':
      return 'Terjadi kesalahan internal pada server Firebase. Silakan coba sesaat lagi.';

    default:
      // For any unmapped/unknown error codes: explicitly show "Firebase error: [error code]"
      if (errorCode && errorCode.trim()) {
        return `Firebase error: [${errorCode}]`;
      }
      if (rawError instanceof Error && rawError.message) {
        return `Firebase error: [${rawError.message}]`;
      }
      return 'Firebase error: [unknown-error]';
  }
}
