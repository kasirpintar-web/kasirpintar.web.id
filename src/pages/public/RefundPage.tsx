import React from 'react';
import { RefreshCw } from 'lucide-react';

export const RefundPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-stone-200 pb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full uppercase">
            <RefreshCw className="w-3.5 h-3.5" />
            Kebijakan Layanan
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900">
            Kebijakan Layanan & Refund
          </h1>
          <p className="text-xs text-stone-500">Terakhir diperbarui: 15 September 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xs space-y-6 text-stone-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">1. Layanan Kasir Gratis</h2>
            <p>
              Aplikasi Kasir Pintar (<strong>kasirpintar.web.id</strong>) disediakan secara 100% gratis
              untuk mendukung para pelaku UMKM Indonesia. Tidak ada biaya pendaftaran, biaya transaksi bulanan,
              maupun potongan biaya per struk belanja.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">2. Kebijakan Refund</h2>
            <p>
              Karena layanan dasar Kasir Pintar saat ini tidak memungut biaya lisensi atau biaya berlangganan
              apapun dari pengguna, maka tidak ada mekanisme pengembalian dana (refund) yang berlaku untuk paket gratis.
            </p>
            <p>
              Jika di masa depan tersedia layanan integrasi pihak ketiga berbayar (seperti integrasi hardware
              atau SMS gateway khusus), ketentuan refund untuk modul tersebut akan dicantumkan secara transparan
              sebelum pembayaran diproses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-stone-900">3. Hubungi Kami</h2>
            <p>
              Untuk pertanyaan lebih lanjut mengenai kebijakan layanan kami, Anda dapat menghubungi tim kami di:
              <br />
              <strong>Email:</strong> kasirpintarwebid@gmail.com
              <br />
              <strong>WhatsApp:</strong> 082379474173
              <br />
              <strong>Lokasi:</strong> Indramayu, Jawa Barat
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
