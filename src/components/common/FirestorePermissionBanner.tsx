import React, { useState } from 'react';
import { ShieldAlert, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export const FIRESTORE_RULES_TEXT = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // User profiles (users/{uid})
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }

    // Store profiles (stores/{storeId})
    match /stores/{storeId} {
      allow create: if isAuthenticated();
      allow read, update: if isAuthenticated();
      allow delete: if false;

      // Subcollections
      match /categories/{categoryId} {
        allow read, write: if isAuthenticated();
      }

      match /products/{productId} {
        allow read, write: if isAuthenticated();
      }

      match /transactions/{transactionId} {
        allow read, create, update: if isAuthenticated();
        allow delete: if false;
      }
    }

    // Root-level categories
    match /categories/{categoryId} {
      allow read, write: if isAuthenticated();
    }

    // Root-level products
    match /products/{productId} {
      allow read, write: if isAuthenticated();
    }

    // Root-level transactions
    match /transactions/{transactionId} {
      allow read, create: if isAuthenticated();
      allow update: if isAuthenticated();
      allow delete: if false;
    }

    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`;

export const FirestorePermissionBanner: React.FC<{
  errorDetails?: string;
  onRetry?: () => void;
}> = ({ errorDetails, onRetry }) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FIRESTORE_RULES_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="p-4 bg-amber-50 border-2 border-amber-300/80 rounded-2xl text-amber-950 space-y-3 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-200/70 rounded-xl shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5 text-amber-800" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-amber-900">
            Perlu Pembaruan Firestore Security Rules di Firebase Console
          </h4>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            Database Firestore menolak akses (<em>Missing or insufficient permissions</em>) karena aturan keamanan di konsol Firebase Anda belum mengizinkan baca/tulis koleksi <code>products</code> dan <code>transactions</code>.
          </p>
          {errorDetails && (
            <p className="text-[11px] font-mono text-amber-700/80 mt-1 break-all">
              Detail: {errorDetails}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white/80 border border-amber-200 rounded-xl p-3 text-xs space-y-2 text-stone-700">
        <div className="font-semibold text-stone-900">Langkah Cepat Memperbaiki:</div>
        <ol className="list-decimal list-inside space-y-1 text-stone-600 pl-1">
          <li>
            Buka tab <strong>Rules</strong> di konsol Firebase:{' '}
            <a
              href="https://console.firebase.google.com/project/kasirpintarwebid/firestore/rules"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 underline inline-flex items-center gap-1 hover:text-emerald-800"
            >
              Buka Firestore Rules <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>Salin kode aturan yang sudah disiapkan di bawah ini.</li>
          <li>Ganti seluruh isi editor di Firebase dengan aturan ini, lalu klik tombol <strong>Publish</strong>.</li>
        </ol>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleCopy}
            className="text-xs gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Aturan Berhasil Disalin!' : 'Salin Aturan Security Rules'}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="text-xs"
          >
            {showCode ? 'Sembunyikan Kode' : 'Lihat Kode Aturan'}
          </Button>

          {onRetry && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="text-xs ml-auto"
            >
              Coba Muat Ulang Data
            </Button>
          )}
        </div>

        {showCode && (
          <pre className="mt-2 p-3 bg-stone-900 text-emerald-400 rounded-lg text-[11px] overflow-x-auto font-mono max-h-60">
            {FIRESTORE_RULES_TEXT}
          </pre>
        )}
      </div>
    </div>
  );
};
