import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Target, Users, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE404]/30 border border-yellow-400 text-[#4A2E18] text-xs font-bold uppercase">
            Tentang Kasir Pintar
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Mendukung Kemandirian UMKM Indonesia
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Sejak 2019, Kasir Pintar (kasirpintar.web.id) berkomitmen menghadirkan teknologi kasir dan
            manajemen toko berbasis web yang praktis, cepat, dan terjangkau bagi para pelaku usaha di seluruh nusantara.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-xs space-y-6 text-stone-700 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900">Perjalanan Kami</h2>
          <p>
            Usaha Mikro, Kecil, dan Menengah (UMKM) adalah tulang punggung perekonomian Indonesia.
            Namun, banyak pemilik warung, kios, dan toko kelontong masih menghadapi kendala saat mencatat
            pembukuan manual: buku nota yang hilang, stok barang yang tidak sinkron, serta kesulitan
            mengetahui laba bersih sebenarnya.
          </p>
          <p>
            Banyak aplikasi kasir di pasaran memberlakukan biaya langganan bulanan mahal, memerlukan
            perangkat keras khusus, atau membatasi jumlah produk secara ketat. Kasir Pintar lahir
            untuk mendobrak batasan tersebut dengan menyediakan aplikasi kasir yang dapat langsung dibuka
            dari browser HP, tablet, maupun laptop secara gratis.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#4A2E18] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Misi Utama</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Mempermudah operasional transaksi dan pencatatan keuangan toko melalui digitalisasi
              yang inklusif dan tanpa beban biaya.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#4A2E18] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Fokus UMKM</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Desain dan alur kerja aplikasi dibuat sesederhana mungkin agar nyaman digunakan siapa saja,
              dari pemilik toko pemula hingga kasir berpengalaman.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#4A2E18] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Kualitas & Keamanan</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Didukung arsitektur Google Cloud & Firebase modern dengan keamanan data terisolasi untuk
              menjaga privasi setiap toko.
            </p>
          </div>
        </div>

        {/* Location Note */}
        <div className="p-6 rounded-2xl bg-stone-100 border border-stone-200 text-center space-y-2">
          <p className="text-xs font-semibold text-stone-500 uppercase">Kantor & Komunitas</p>
          <p className="text-sm font-bold text-stone-800">Indramayu, Jawa Barat, Indonesia</p>
          <p className="text-xs text-stone-600">
            Email: kasirpintarwebid@gmail.com • WhatsApp: 082379474173
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link to="/register">
            <Button size="lg" variant="primary" className="font-bold">
              Bergabung Bersama Kasir Pintar <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
