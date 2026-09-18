import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { contactData } from '../data/portfolioData';

export const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = (path: string) => {
    if (path === '/portofolio-ldp' || path === '/portofolio-ldp/') return 'Beranda';
    if (path.startsWith('/portofolio-ldp/tentang')) return 'Tentang Saya';
    if (path.startsWith('/portofolio-ldp/project/kasir-pintar')) return 'Project: Kasir Pintar';
    if (path.startsWith('/portofolio-ldp/project/dicelup-ayam-crispy')) return "Project: D'Celup Ayam Crispy";
    if (path.startsWith('/portofolio-ldp/project')) return 'Koleksi Project';
    if (path.startsWith('/portofolio-ldp/skill')) return 'Keahlian Teknis';
    if (path.startsWith('/portofolio-ldp/jasa')) return 'Jasa Pembuatan Website';
    if (path.startsWith('/portofolio-ldp/kontak')) return 'Kontak';
    return 'Portfolio';
  };

  const currentTitle = getPageTitle(location.pathname);
  const waLink = `https://wa.me/${contactData.whatsappInternational}?text=${encodeURIComponent(contactData.defaultWaMessage)}`;

  return (
    <header
      id="top-header"
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/90 border-b border-neutral-800/80 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <Link
          to="/portofolio-ldp"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-xl"
        >
          <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-sm tracking-wider shadow-md group-hover:bg-yellow-300 transition-colors">
            LP
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors tracking-tight">
              Logis Denis Prabowo
            </span>
            <span className="text-[11px] text-neutral-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
              AI-Assisted Web Developer
            </span>
          </div>
        </Link>

        {/* Center Route Breadcrumb/Badge (Desktop) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
          <span className="font-medium">{currentTitle}</span>
        </div>

        {/* Action button: WhatsApp CTA */}
        <div className="flex items-center gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold transition-all shadow-md active:scale-95"
            aria-label="Hubungi WhatsApp Logis Denis Prabowo"
          >
            <MessageCircle className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            <span>Chat WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
