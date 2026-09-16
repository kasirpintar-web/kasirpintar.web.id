import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import {
  Calculator,
  Package,
  Boxes,
  ReceiptText,
  BarChart3,
  Receipt,
  Settings,
  Sparkles,
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      id: 'kasir',
      icon: Calculator,
      title: 'Fitur Kasir POS Modern',
      desc: 'Point of sale interaktif dengan tombol besar sentuh ramah smartphone, cart real-time, validasi nominal pembayaran, dan hitung kembalian instan.',
      highlights: ['Pencarian cepat barcode/nama', 'Kalkulasi kembalian otomatis', 'Satu ketukan tambah ke keranjang'],
    },
    {
      id: 'produk',
      icon: Package,
      title: 'Katalog & Kategori Produk',
      desc: 'Pengaturan produk mudah dengan foto Cloudinary, klasifikasi kategori (Makanan, Minuman, Sembako, dll), status aktif, serta harga beli dan jual.',
      highlights: ['Upload gambar produk instan', 'Kelola kategori tak terbatas', 'Pengaturan status aktif/non-aktif'],
    },
    {
      id: 'stok',
      icon: Boxes,
      title: 'Manajemen & Sinkronisasi Stok',
      desc: 'Pembaruan stok atomik dengan Firestore transactions. Mencegah stok minus dan mengembalikan stok barang jika nota transaksi dibatalkan.',
      highlights: ['Perlindungan stok habis (0)', 'Deteksi otomatis stok menipis', 'Pemulihan stok saat transaksi dibatalkan'],
    },
    {
      id: 'transaksi',
      icon: ReceiptText,
      title: 'Riwayat Transaksi & Pembatalan',
      desc: 'Pencatatan lengkap semua transaksi penjualan dengan nomor invoice unik, detail kasir, waktu transaksi Asia/Jakarta, dan audit pembatalan.',
      highlights: ['Format invoice INV-YYYYMMDD-XXXX', 'Fitur pembatalan transaksi dengan log', 'Snapshot harga dan nama barang'],
    },
    {
      id: 'laporan',
      icon: BarChart3,
      title: 'Laporan Penjualan & Profit',
      desc: 'Visualisasi grafik omset 7 hari terakhir, total transaksi completed, rekapitulasi harian/mingguan/bulanan, dan analisis laba kotor.',
      highlights: ['Filter periode fleksibel', 'Grafik omset harian', 'Data real-time dari Firestore'],
    },
    {
      id: 'struk',
      icon: Receipt,
      title: 'Struk Belanja Digital & JPG',
      desc: 'Pembuatan gambar struk JPG berstandar struk kasir termal langsung di browser. Dilengkapi logo toko dan tombol kirim rincian belanja ke WhatsApp.',
      highlights: ['Ekspor ke file struk-INV.jpg', 'Tampilan logo dan identitas toko', 'Tombol bagikan WhatsApp cepat'],
    },
    {
      id: 'settings',
      icon: Settings,
      title: 'Pengaturan Profil Toko',
      desc: 'Kustomisasi nama toko, upload logo resmi ke Cloudinary, alamat toko, nomor kontak WhatsApp, serta teks footer struk belanja.',
      highlights: ['Upload logo toko bebas', 'Kustomisasi catatan kaki nota', 'Data otomatis tampil di struk'],
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE404]/30 border border-yellow-400 text-[#4A2E18] text-xs font-bold uppercase">
            Fitur Unggulan POS UMKM
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Fitur Lengkap Kasir Pintar
          </h1>
          <p className="text-base sm:text-lg text-stone-600">
            Didesain khusus untuk efisiensi bisnis toko fisik maupun online.
            Semua fitur bekerja secara harmonis dalam satu aplikasi kasir yang praktis.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#4A2E18] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">{item.desc}</p>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-700">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center py-12 px-6 rounded-3xl bg-stone-900 text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Semua Fitur Kasir Ini Siap Membantu Tokomu</h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
            Tidak ada batasan transaksi dan tidak ada biaya tersembunyi.
            Daftarkan tokomu sekarang dalam hitungan detik.
          </p>
          <div>
            <Link to="/register">
              <Button size="lg" variant="primary" className="font-bold">
                <Sparkles className="w-5 h-5 mr-2" />
                Mulai Gunakan Kasir Pintar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
