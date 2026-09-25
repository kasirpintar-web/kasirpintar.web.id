import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState<string>((location.state as any)?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const { login, resetPassword, currentUser } = useAuth();
  const navigate = useNavigate();

  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown';

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password) {
      setFormError('Silakan isi email dan password Anda.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      // The error message from AuthContext preserves error code & details
      console.error('[Login Catch Error]:', err);
      setFormError(err.message || 'Gagal masuk. Periksa email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);

    if (!forgotEmail.trim()) {
      setForgotError('Masukkan email Anda.');
      return;
    }

    try {
      setForgotLoading(true);
      await resetPassword(forgotEmail);
      setForgotSuccess(true);
    } catch (err: any) {
      setForgotError(err.message || 'Gagal mengirim email reset password.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 px-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img
              src="https://cdn.phototourl.com/member/2026-09-15-fdac8264-8204-4be8-b302-30fb9cb8827d.png"
              alt="Kasir Pintar"
              className="h-10 mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight pt-2">
            Masuk ke Toko Anda
          </h1>
          <p className="text-xs text-stone-500">
            Akses dashboard kasir, produk, dan laporan penjualan tokomu
          </p>
        </div>

        {/* Detailed Error Box (Preserves and displays exact Firebase error) */}
        {formError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold">{formError}</p>
                {formError.includes('operation-not-allowed') && (
                  <p className="text-[11px] text-red-600 bg-white/60 p-2 rounded-lg mt-1 border border-red-200">
                    💡 <strong>Solusi:</strong> Buka <em>Firebase Console &gt; Authentication &gt; Sign-in method</em>, lalu aktifkan provider <strong>Email/Password</strong>.
                  </p>
                )}
                {formError.includes('app-not-authorized') && (
                  <p className="text-[11px] text-red-600 bg-white/60 p-2 rounded-lg mt-1 border border-red-200">
                    💡 <strong>Solusi:</strong> Tambahkan domain <code>{currentHostname}</code> ke <em>Firebase Console &gt; Authentication &gt; Settings &gt; Authorized domains</em>.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Alamat Email"
            type="email"
            placeholder="nama@tokomu.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <div>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password akun"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 hover:text-stone-700 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
            <div className="flex justify-end pt-1.5">
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotSuccess(false);
                  setForgotError(null);
                  setForgotModalOpen(true);
                }}
                className="text-xs font-semibold text-[#4A2E18] hover:underline"
              >
                Lupa Password?
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center text-sm font-bold mt-2"
            isLoading={loading}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Masuk Sekarang
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-stone-100 text-xs text-stone-600">
          Belum memiliki akun toko?{' '}
          <Link to="/register" className="font-bold text-[#4A2E18] hover:underline">
            Daftar Gratis Sekarang
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Atur Ulang Password"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-stone-600">
            Masukkan alamat email akun Kasir Pintar Anda. Kami akan mengirimkan tautan untuk mengatur
            ulang password Anda.
          </p>

          {forgotSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Email Terkirim!
              </div>
              <p>Periksa kotak masuk atau spam email Anda untuk instruksi reset password.</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => setForgotModalOpen(false)}
              >
                Tutup
              </Button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {forgotError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">
                  {forgotError}
                </div>
              )}
              <Input
                label="Email Akun"
                type="email"
                placeholder="nama@tokomu.com"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setForgotModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  isLoading={forgotLoading}
                >
                  Kirim Tautan
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};
