import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateStore } from '../../firebase/db';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
  Store,
  Upload,
  Save,
  CheckCircle2,
  Shield,
  User,
  Globe,
  Info,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { store, userProfile, currentUser, refreshStore, refreshProfile, refreshUserProfile, ensureStoreProvisioned } = useAuth();

  const [storeName, setStoreName] = useState(store?.name || '');
  const [address, setAddress] = useState(store?.address || '');
  const [phone, setPhone] = useState(store?.phone || '');
  const [email, setEmail] = useState(store?.email || currentUser?.email || '');
  const [receiptFooter, setReceiptFooter] = useState(
    store?.receiptFooter || 'Terima kasih telah berbelanja di toko kami!'
  );
  const [logoUrl, setLogoUrl] = useState(store?.logoUrl || '');

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sinkronkan form saat data store berhasil dimuat dari Firestore
  React.useEffect(() => {
    if (store) {
      if (store.name) setStoreName(store.name);
      if (store.address) setAddress(store.address);
      if (store.phone) setPhone(store.phone);
      if (store.email) setEmail(store.email);
      if (store.receiptFooter) setReceiptFooter(store.receiptFooter);
      if (store.logoUrl) setLogoUrl(store.logoUrl);
    }
  }, [store]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingLogo(true);
      const url = await uploadImageToCloudinary(file, 'logo');
      setLogoUrl(url);
    } catch (err: any) {
      alert(err.message || 'Gagal mengunggah logo ke Cloudinary');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let currentStore = store;
    if (!currentStore && currentUser) {
      currentStore = await ensureStoreProvisioned();
    }
    if (!currentStore) {
      setErrorMessage('Data toko belum siap. Silakan muat ulang halaman.');
      return;
    }

    try {
      setIsSaving(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      await updateStore(currentStore.id, {
        name: storeName.trim() || currentStore.name,
        address: address.trim(),
        phone: phone.trim(),
        email: email.trim(),
        receiptFooter: receiptFooter.trim(),
        logoUrl: logoUrl.trim(),
      });

      if (refreshStore) await refreshStore();
      if (refreshProfile) await refreshProfile();
      if (refreshUserProfile && refreshUserProfile !== refreshProfile) await refreshUserProfile();

      setSuccessMessage('Pengaturan toko dan logo berhasil disimpan!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      let msg = err.message || 'Gagal menyimpan pengaturan toko.';
      try {
        const parsed = JSON.parse(msg);
        if (parsed.error) msg = parsed.error;
      } catch (_) {}
      setErrorMessage(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">Pengaturan Toko</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Atur profil toko, logo, kontak, dan catatan struk pembelian
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Store Profile Card */}
        <Card>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100 font-bold text-stone-900">
            <Store className="w-5 h-5 text-[#4A2E18]" />
            Identitas Toko & Struk
          </div>

          <div className="space-y-4">
            {/* Logo Upload */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Logo Toko (Muncul di Struk Pembayaran)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center shrink-0">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo Toko" className="w-full h-full object-contain p-1" />
                  ) : (
                    <Store className="w-6 h-6 text-stone-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="store-logo-input"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="store-logo-input"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {isUploadingLogo ? 'Mengunggah...' : 'Pilih Logo Toko'}
                  </label>
                  <p className="text-[10px] text-stone-400 mt-1">
                    Gunakan logo format PNG transparan atau JPG persegi. Maksimal 3MB.
                  </p>
                </div>
              </div>
            </div>

            <Input
              label="Nama Toko"
              placeholder="Contoh: Toko Berkah Mandiri"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />

            <Input
              label="Alamat Toko"
              placeholder="Contoh: Jl. Ahmad Yani No. 12, Indramayu"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Nomor Telepon / WhatsApp"
                placeholder="Contoh: 082379474173"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                label="Email Toko"
                type="email"
                placeholder="kontak@tokoberkah.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Catatan Footer Struk
              </label>
              <input
                type="text"
                placeholder="Contoh: Barang yang sudah dibeli tidak dapat ditukar"
                value={receiptFooter}
                onChange={(e) => setReceiptFooter(e.target.value)}
                className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/20 focus:border-[#4A2E18]"
              />
              <p className="text-[10px] text-stone-400 mt-1">
                Teks ini akan tercetak di bagian paling bawah struk JPG dan rincian WhatsApp pelanggan.
              </p>
            </div>
          </div>
        </Card>

        {/* User Account Info */}
        <Card>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100 font-bold text-stone-900">
            <User className="w-5 h-5 text-[#4A2E18]" />
            Akun Pemilik Toko
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-stone-500 font-medium">Nama Pemilik</span>
              <p className="font-bold text-stone-900 mt-0.5">{userProfile?.name}</p>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Email Login</span>
              <p className="font-bold text-stone-900 mt-0.5">{currentUser?.email}</p>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Peran (Role)</span>
              <p className="font-bold text-amber-800 capitalize mt-0.5">{userProfile?.role || 'Owner'}</p>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="gap-2 shadow-xs"
            isLoading={isSaving}
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
};
