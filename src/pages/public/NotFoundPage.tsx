import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-amber-100 text-[#4A2E18] flex items-center justify-center font-black text-3xl mb-6 shadow-xs">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-sm text-stone-600 max-w-md mb-8">
        Halaman yang Anda cari mungkin telah dipindahkan, diubah namanya, atau tidak tersedia.
      </p>
      <div className="flex gap-3">
        <Link to="/">
          <Button variant="primary">
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </Link>
        <button onClick={() => window.history.back()} type="button">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>
        </button>
      </div>
    </div>
  );
};
