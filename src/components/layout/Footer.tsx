import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="https://cdn.phototourl.com/member/2026-09-15-fdac8264-8204-4be8-b302-30fb9cb8827d.png"
                alt="Kasir Pintar Logo"
                className="h-10 w-auto brightness-110"
              />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Website Kasir UMKM Gratis! Solusi modern, praktis, dan terpercaya untuk mengelola
              transaksi, stok produk, cetak struk, dan laporan penjualan usaha Anda.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFE404]/10 text-[#FFE404] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#FFE404] animate-pulse"></span>
              Aplikasi Kasir Gratis Untuk UMKM
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Halaman Utama</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/product" className="hover:text-[#FFE404] transition-colors">
                  Produk & Fitur
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-[#FFE404] transition-colors">
                  Fitur Unggulan POS
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#FFE404] transition-colors">
                  Harga (100% Gratis)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFE404] transition-colors">
                  Tentang Kasir Pintar
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFE404] transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Kebijakan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Informasi Legal</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/privacy" className="hover:text-[#FFE404] transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#FFE404] transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-[#FFE404] transition-colors">
                  Kebijakan Layanan & Refund
                </Link>
              </li>
              <li>
                <a
                  href="https://kasirpintar.web.id/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFE404] transition-colors inline-flex items-center gap-1"
                >
                  Sitemap XML <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kontak Resmi</h4>
            <div className="space-y-2.5 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFE404] shrink-0 mt-0.5" />
                <span>Indramayu, Jawa Barat</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFE404] shrink-0" />
                <a
                  href="mailto:kasirpintarwebid@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  kasirpintarwebid@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFE404] shrink-0" />
                <a
                  href="https://wa.me/6282379474173"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors font-medium text-white"
                >
                  082379474173 (WhatsApp)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© KasirPintar.web.id Since 2019. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="text-stone-400">
            Dibuat untuk memajukan Usaha Mikro, Kecil, dan Menengah (UMKM) Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
