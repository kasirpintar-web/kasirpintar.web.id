import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import {
  Calculator,
  PackageCheck,
  Receipt,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Sparkles,
  ArrowRight,
  Store,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-radial from-amber-50/80 via-stone-50 to-stone-50 py-16 sm:py-24 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE404]/30 border border-yellow-400/50 text-[#4A2E18] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Website Kasir Gratis Untuk UMKM Indonesia
              </div>

              {/* H1 Requirement: Homepage H1 must be 'Kasir Pintar' */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Kasir Pintar
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A2E18] mt-2">
                  Aplikasi Kasir UMKM & Kelola Toko Tanpa Biaya
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Tinggalkan pencatatan nota manual buku. <strong>Kasir Pintar</strong> hadir sebagai
                solusi <strong>aplikasi kasir gratis</strong> berbasis web untuk warung, toko
                kelontong, cafe, kios, dan bisnis online Anda. Kelola transaksi kasir, stok produk,
                cetak struk JPG, dan pantau laporan penjualan secara real-time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto text-base gap-2">
                    <Sparkles className="w-5 h-5" />
                    Mulai Gratis Sekarang
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                    Masuk ke Toko
                  </Button>
                </Link>
              </div>

              {/* Guarantees */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-stone-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Gratis Selamanya
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Tanpa Download APK Rumit
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Bisa di HP, Tablet & Laptop
                </span>
              </div>
            </div>

            {/* Right: Live Interactive Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md rounded-3xl bg-white p-5 shadow-xl border border-stone-200">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Kasir POS Preview
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Live Aktif
                  </span>
                </div>

                {/* Sample POS Screen */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#FFE404] flex items-center justify-center font-bold text-xs text-[#4A2E18]">
                        KP
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">Warung Berkah Jaya</p>
                        <p className="text-[10px] text-stone-500">No. Invoice: INV-20260915-001</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">Rp 48.000</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-stone-100">
                      <div>
                        <p className="font-semibold text-stone-800">Kopi Susu Gula Aren</p>
                        <p className="text-[10px] text-stone-500">2x @ Rp 15.000</p>
                      </div>
                      <span className="font-bold text-stone-900">Rp 30.000</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-stone-100">
                      <div>
                        <p className="font-semibold text-stone-800">Roti Panggang Coklat</p>
                        <p className="text-[10px] text-stone-500">1x @ Rp 18.000</p>
                      </div>
                      <span className="font-bold text-stone-900">Rp 18.000</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 space-y-1 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Total Belanja:</span>
                      <span className="font-extrabold text-stone-900 text-sm">Rp 48.000</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Bayar Tunai:</span>
                      <span className="font-bold text-stone-800">Rp 50.000</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Kembalian:</span>
                      <span>Rp 2.000</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <div className="w-full py-2.5 px-3 rounded-xl bg-[#FFE404] text-[#2E1A0C] font-bold text-xs flex items-center justify-center gap-2 shadow-xs">
                      <Receipt className="w-4 h-4" />
                      Transaksi Selesai • Cetak Struk JPG
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target UMKM Audience */}
      <section className="py-12 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-stone-500 mb-6">
            Dibuat Khusus Untuk Segala Jenis Usaha UMKM Indonesia
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {[
              { title: 'Warung & Kios', icon: Store },
              { title: 'Cafe & Minuman', icon: Calculator },
              { title: 'Toko Kelontong', icon: PackageCheck },
              { title: 'Pakaian & Fashion', icon: Sparkles },
              { title: 'Online Shop', icon: Smartphone },
              { title: 'Jasa & Bengkel', icon: HeartHandshake },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:border-amber-200 transition-colors"
                >
                  <div className="w-9 h-9 mx-auto rounded-xl bg-amber-100 text-[#4A2E18] flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-stone-800">{item.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fitur Utama Section */}
      <section className="py-16 sm:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/60 px-3 py-1 rounded-full">
              Fitur Lengkap & Mudah Digunakan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
              Segala Kebutuhan Kasir Toko Ada di Sini
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Kasir Pintar dirancang dengan antarmuka yang bersih, cepat, dan ramah pengguna
              sehingga kasir atau pemilik toko dapat langsung menggunakannya tanpa perlu pelatihan lama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: 'Point of Sale (Kasir Cepat)',
                desc: 'Tambahkan produk ke keranjang hanya dengan satu klik. Perhitungan otomatis subtotal, total, dan kembalian tunai tanpa kalkulator manual.',
              },
              {
                icon: PackageCheck,
                title: 'Manajemen Produk & Stok Atomik',
                desc: 'Kelola kategori produk, harga modal, harga jual, dan stok. Stok berkurang secara sinkron saat checkout dan otomatis kembali jika transaksi dibatalkan.',
              },
              {
                icon: Receipt,
                title: 'Struk Belanja JPG & WhatsApp',
                desc: 'Cetak dan download struk resmi berformat JPG langsung dengan logo dan kontak tokomu, serta bagikan rincian belanja via WhatsApp pelanggan.',
              },
              {
                icon: BarChart3,
                title: 'Laporan Penjualan & Profit',
                desc: 'Pantau grafik omset hari ini, minggu ini, dan bulan ini. Ketahui produk terlaris dan estimasi keuntungan bersih toko secara akurat.',
              },
              {
                icon: Smartphone,
                title: 'Responsif & Mobile-First',
                desc: 'Gunakan dengan nyaman dari smartphone Android/iPhone kasir Anda, tablet kasir, ataupun komputer kasir di toko.',
              },
              {
                icon: ShieldCheck,
                title: 'Aman & Terisolasi Cloud',
                desc: 'Data tokomu aman di Cloud Firestore dengan sistem multi-tenant terisolasi. Hanya kamu yang dapat mengakses data penjualanmu.',
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFE404]/30 text-[#4A2E18] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#4A2E18]" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">{f.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-[#4A2E18] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Siap Majukan Usaha Toko Anda Bersama Kasir Pintar?
          </h2>
          <p className="text-base text-stone-300 max-w-2xl mx-auto">
            Daftar gratis dalam waktu 1 menit. Tanpa syarat kartu kredit, langsung buat toko dan mulai
            mencatat penjualan hari ini juga.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link to="/register">
              <Button size="lg" variant="primary" className="text-base">
                Daftar Toko Gratis Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-base bg-white/10 text-white border-white/20 hover:bg-white/20">
                Konsultasi WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
