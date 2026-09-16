import React from 'react';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-stone-200 pb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full uppercase">
            <FileText className="w-3.5 h-3.5" />
            Ketentuan Layanan
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900">
            Syarat & Ketentuan Penggunaan
          </h1>
          <p className="text-xs text-stone-500">Berlaku efektif sejak: 15 September 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xs space-y-6 text-stone-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">1. Ketentuan Umum</h2>
            <p>
              Dengan mendaftar dan mengakses situs <strong>kasirpintar.web.id</strong>, Anda menyatakan
              setuju untuk terikat dengan syarat dan ketentuan ini. Kasir Pintar berhak memperbarui
              ketentuan sewaktu-waktu demi peningkatan mutu layanan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">2. Tanggung Jawab Akun</h2>
            <p>
              Anda bertanggung jawab penuh untuk menjaga kerahasiaan password akun dan setiap aktivitas
              yang terjadi di bawah akun toko Anda. Kasir Pintar tidak bertanggung jawab atas kerugian akibat
              kelalaian pemilik akun dalam menjaga kredensial login.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">3. Penggunaan yang Diperbolehkan</h2>
            <p>
              Layanan Kasir Pintar disediakan khusus untuk pencatatan transaksi kasir, stok, dan laporan
              usaha legal di wilayah Republik Indonesia. Dilarang menggunakan sistem untuk mencatat atau
              memperjualbelikan barang atau jasa terlarang menurut hukum yang berlaku.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">4. Ketersediaan Layanan</h2>
            <p>
              Kami berusaha semaksimal mungkin menjaga layanan tetap online 24/7. Namun, pemeliharaan
              sistem berkala atau gangguan jaringan cloud pihak ketiga dapat terjadi. Pengguna disarankan
              secara rutin memeriksa dan mengunduh laporan transaksi toko.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">5. Kontak Bantuan</h2>
            <p>
              Pertanyaan atau sanggahan terkait ketentuan layanan dapat disampaikan melalui:
              <br />
              <strong>Email:</strong> kasirpintarwebid@gmail.com
              <br />
              <strong>WhatsApp:</strong> 082379474173
              <br />
              <strong>Alamat:</strong> Indramayu, Jawa Barat
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
