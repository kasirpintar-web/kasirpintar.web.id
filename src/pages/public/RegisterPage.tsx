import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User, Store, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { register, currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || !email.trim() || !storeName.trim() || !password) {
      setFormError('Semua kolom wajib diisi.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Konfirmasi password tidak cocok.');
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password, storeName);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('[Register Catch Error]:', err);
      setFormError(err.message || 'Pendaftaran gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 flex justify-center items-center">
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
            Buat Toko Baru Gratis
          </h1>
          <p className="text-xs text-stone-500">
            Daftarkan bisnis Anda dan mulai kelola kasir dalam 1 menit
          </p>
        </div>

        {formError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <span>{formError}</span>
              {formError.includes('operation-not-allowed') && (
                <p className="text-[11px] text-red-600 bg-white/60 p-2 rounded-lg mt-1 border border-red-200">
                  💡 <strong>Solusi:</strong> Buka <em>Firebase Console &gt; Authentication &gt; Sign-in method</em>, lalu aktifkan provider <strong>Email/Password</strong>.
                </p>
              )}
              {(formError.includes('terdaftar') || formError.includes('already-in-use')) && (
                <div className="pt-1.5">
                  <button
                    type="button"
                    onClick={() => navigate('/login', { state: { email } })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                  >
                    Masuk ke Akun Sekarang &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Nama Lengkap Pemilik"
            placeholder="Contoh: Hendra Wijaya"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Nama Toko / Usaha"
            placeholder="Contoh: Warung Berkah / Cafe Kopi"
            required
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            leftIcon={<Store className="w-4 h-4" />}
          />

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

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Minimal 6 karakter"
            required
            autoComplete="new-password"
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

          <Input
            label="Konfirmasi Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Ulangi password di atas"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <div className="text-[11px] text-stone-500 leading-normal pt-1">
            Dengan mendaftar, Anda menyetujui{' '}
            <Link to="/terms" target="_blank" className="text-[#4A2E18] underline font-medium">
              Syarat & Ketentuan
            </Link>{' '}
            serta{' '}
            <Link to="/privacy" target="_blank" className="text-[#4A2E18] underline font-medium">
              Kebijakan Privasi
            </Link>{' '}
            Kasir Pintar.
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center text-sm font-bold mt-2"
            isLoading={loading}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Daftar & Buat Toko Gratis
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-stone-100 text-xs text-stone-600">
          Sudah punya akun toko?{' '}
          <Link to="/login" className="font-bold text-[#4A2E18] hover:underline">
            Masuk di Sini
          </Link>
        </div>
      </div>
    </div>
  );
};
