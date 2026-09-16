import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Check, Sparkles, Heart } from 'lucide-react';

export const PricingPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE404]/30 border border-yellow-400 text-[#4A2E18] text-xs font-bold uppercase">
            Transparan & Tanpa Biaya Tersembunyi
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Paket Harga Kasir Pintar
          </h1>
          <p className="text-base sm:text-lg text-stone-600">
            Kami percaya teknologi kasir modern harus dapat dinikmati oleh seluruh pelaku UMKM
            Indonesia tanpa beban biaya lisensi mahal.
          </p>
        </div>

        {/* Honest Free Pricing Card */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl border-2 border-[#FFE404] shadow-xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FFE404] text-[#2E1A0C] font-extrabold text-xs px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
            100% Gratis Untuk UMKM
          </div>
          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-black text-stone-900">Paket UMKM Merdeka</h3>
            <p className="text-stone-600 text-sm">
              Akses penuh ke seluruh sistem kasir, manajemen produk, stok, cetak struk, dan laporan.
            </p>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-5xl font-black text-stone-900 tracking-tight">Rp 0</span>
              <span className="text-stone-500 font-medium">/ selamanya</span>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 space-y-3.5 mb-8 text-sm text-stone-700">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Transaksi kasir POS tanpa batas per hari</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Katalog produk dan kategori tidak dibatasi</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Upload foto produk & logo toko ke Cloudinary</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Download struk thermal JPG & kirim WhatsApp</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Rekapitulasi omset harian, mingguan, & bulanan</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Penyimpanan cloud Firestore aman multi-tenant</span>
            </div>
          </div>

          <Link to="/register">
            <Button size="lg" variant="primary" className="w-full text-base font-bold shadow-md shadow-yellow-400/20">
              <Sparkles className="w-5 h-5 mr-2" />
              Daftar Sekarang Tanpa Biaya
            </Button>
          </Link>
        </div>

        {/* Honest Transparency Note */}
        <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-900 mb-1">
            <Heart className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-stone-900">Kenapa Kasir Pintar Gratis?</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Misi Kasir Pintar adalah memberdayakan jutaan UMKM Indonesia agar dapat bertransformasi ke era digital
            tanpa terbebani biaya langganan bulanan software yang mahal. Anda tidak perlu memasukkan kartu kredit
            atau khawatir akan tagihan tersembunyi.
          </p>
        </div>
      </div>
    </div>
  );
};
