import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import {
  Calculator,
  Package,
  Receipt,
  BarChart,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const ProductPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE404]/30 border border-yellow-400 text-[#4A2E18] text-xs font-bold uppercase">
            Solusi Kasir Digital Terpadu
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Produk Aplikasi Kasir Pintar
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Satu aplikasi web terintegrasi untuk menangani semua aspek operasional penjualan toko
            dan warung UMKM Anda dengan cepat, akurat, dan tanpa biaya lisensi.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#4A2E18] flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">1. Mesin Kasir POS Interaktif</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Tampilan kasir modern dengan kartu produk berbasis grid, pencarian instan, dan filter kategori.
              Kasir dapat memasukkan produk ke keranjang belanja hanya dalam hitungan detik.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Pencegahan checkout bila uang pembayaran kurang
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Perhitungan otomatis kembalian tunai secara presisi
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Pemberitahuan stok produk habis (Out of Stock lock)
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#4A2E18] flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">2. Manajemen Stok & Katalog Produk</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Atur harga jual, harga modal (HPP), dan stok awal produk Anda. Upload foto produk
              secara langsung ke Cloudinary tanpa memberatkan server lokal Anda.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Pengurangan stok atomik mencegah selisih barang
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Pengelompokan berdasarkan kategori custom toko
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Dukungan status produk aktif / dinonaktifkan
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#4A2E18] flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">3. Struk Pembayaran Digital & JPG</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Hasilkan struk belanja beresolusi tinggi dalam format JPG yang dilengkapi dengan logo toko,
              nama toko, alamat, telepon, nomor invoice unik, dan catatan footer resmi.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Dibuat menggunakan render Canvas asli (bukan screenshot buram)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Download instan file struk-INV-xxxx.jpg
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Bisa langsung dikirimkan ke nomor WhatsApp pelanggan
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#4A2E18] flex items-center justify-center">
              <BarChart className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">4. Laporan Keuangan & Estimasi Profit</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Analisis pendapatan harian, mingguan, dan bulanan secara otomatis. Laporan real-time
              hanya menghitung transaksi berstatus completed sehingga data omset selalu akurat.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Perhitungan laba kotor / profit jika harga modal diisi
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Grafik visual performa penjualan 7 hari terakhir
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Daftar produk paling laku (Best Seller)
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-[#FFE404] to-yellow-300 text-[#2E1A0C] text-center space-y-4 shadow-lg shadow-yellow-400/20">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Coba Aplikasi Kasir Pintar Sekarang</h3>
          <p className="text-sm sm:text-base font-medium max-w-xl mx-auto">
            Semua fitur di atas siap digunakan tanpa biaya pendaftaran, tanpa biaya bulanan, dan tanpa iklan yang mengganggu.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="font-bold">
                Daftar & Buat Toko Gratis <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
