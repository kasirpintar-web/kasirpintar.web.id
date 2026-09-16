import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-stone-200 pb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Keamanan & Privasi Pengguna
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900">
            Kebijakan Privasi Kasir Pintar
          </h1>
          <p className="text-xs text-stone-500">Terakhir diperbarui: 15 September 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xs space-y-6 text-stone-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">1. Pengantar</h2>
            <p>
              Kasir Pintar (<strong>kasirpintar.web.id</strong>) menghormati dan melindungi hak privasi
              seluruh pengguna layanan aplikasi kasir kami. Kebijakan ini menjelaskan bagaimana kami mengumpulkan,
              menggunakan, dan menjaga kerahasiaan informasi bisnis dan data pribadi Anda.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">2. Data yang Dikumpulkan</h2>
            <p>Ketika Anda mendaftar dan menggunakan Kasir Pintar, kami mengumpulkan data yang diperlukan untuk operasional toko Anda:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
              <li>Informasi Akun: Nama lengkap, alamat email, dan password terenkripsi.</li>
              <li>Profil Toko: Nama toko, alamat usaha, nomor telepon, logo toko, dan catatan struk.</li>
              <li>Data Produk & Transaksi: Daftar produk, harga modal, harga jual, stok barang, riwayat transaksi penjualan, dan invoice toko Anda.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">3. Isolasi Data Multi-Tenant</h2>
            <p>
              Kami menerapkan pemisahan data tingkat toko (<strong>multi-tenant isolation</strong>).
              Setiap toko memiliki identitas unik (<code>storeId</code>) yang diisolasi sehingga pemilik toko
              atau kasir lain tidak dapat membaca, mengubah, atau mengakses data penjualan toko Anda.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">4. Penyimpanan dan Layanan Pihak Ketiga</h2>
            <p>
              Aplikasi Kasir Pintar menggunakan infrastruktur terpercaya:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
              <li><strong>Google Firebase Firestore & Auth:</strong> Untuk autentikasi aman dan database cloud terenkripsi.</li>
              <li><strong>Cloudinary:</strong> Untuk penyimpanan aset gambar produk dan logo toko Anda secara aman dan cepat.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">5. Kontak Privasi</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin mengajukan penghapusan
              akun, hubungi kami di:
            </p>
            <p className="font-semibold text-stone-900">
              Email: kasirpintarwebid@gmail.com • WhatsApp: 082379474173<br />
              Alamat: Indramayu, Jawa Barat
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
