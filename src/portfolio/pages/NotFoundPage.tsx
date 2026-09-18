import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { PageSEO } from '../components/PageSEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-16 bg-black text-neutral-100">
      <PageSEO
        title="Halaman Tidak Ditemukan"
        description="Halaman yang Anda cari tidak tersedia di portfolio Logis Denis Prabowo."
        path="/portofolio-ldp/404"
      />

      <div className="max-w-md w-full p-8 rounded-2xl bg-neutral-950 border border-neutral-850 text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-xl bg-black border border-yellow-400 flex items-center justify-center mx-auto text-yellow-400">
          <span className="text-2xl font-black">404</span>
        </div>

        <div>
          <h1 className="text-xl font-black text-white">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
            Halaman yang Anda tuju tidak tersedia atau tautan telah dipindahkan. Gunakan launcher navigasi untuk kembali.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/portofolio-ldp"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4 stroke-[2.5]" />
            <span>Kembali ke Beranda</span>
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-neutral-300 hover:text-white text-xs font-bold border border-neutral-800 hover:border-yellow-400 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Halaman Sebelumnya</span>
          </button>
        </div>
      </div>
    </div>
  );
};
